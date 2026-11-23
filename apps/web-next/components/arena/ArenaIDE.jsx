"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import {
  Files,
  FileText,
  Maximize2,
  Minimize2,
  Square,
  X,
  Play,
  FlaskConical,
  Timer,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Loader2,
  Lock,
  ChevronRight,
  Github,
  FolderOpen,
  TerminalSquare,
  AlertTriangle,
} from "lucide-react";
import { Toaster } from "sonner";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { bootSandbox, parseTapLine, runCommand, sha256Files, toTree } from "@/lib/arena/sandbox";
import { recordCompletion, signInWithGitHub, supabase, useSession } from "@/lib/arena/supabase";
import { SeverityPill } from "./SeverityPill";
import TicketView from "./TicketView";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const READ_ONLY = (p) => p.startsWith("test/") || p.startsWith("__graders__/") || p.startsWith("tickets/") || p.startsWith("package");
const HIDDEN = (p) => p.startsWith("__graders__/");
const LANG = { ts: "typescript", js: "javascript", json: "json", md: "markdown" };
// VS Code-style file icons: brand-coloured language badges, like the Material Icon Theme.
const FILE_ICONS = {
  ts: { label: "TS", bg: "#3178C6", fg: "#fff" },
  tsx: { label: "TSX", bg: "#3178C6", fg: "#fff" },
  js: { label: "JS", bg: "#F7DF1E", fg: "#000" },
  jsx: { label: "JSX", bg: "#61DAFB", fg: "#000" },
  mjs: { label: "JS", bg: "#F7DF1E", fg: "#000" },
  html: { label: "<>", bg: "#E34F26", fg: "#fff" },
  css: { label: "#", bg: "#1572B6", fg: "#fff" },
  py: { label: "PY", bg: "#3776AB", fg: "#FFD43B" },
  go: { label: "GO", bg: "#00ADD8", fg: "#fff" },
  json: { label: "{}", fg: "#F5C518" },
  md: { label: "M↓", fg: "#519ABA" },
  yaml: { label: "!", fg: "#CB171E" },
  yml: { label: "!", fg: "#CB171E" },
};
const NPM = { label: "npm", bg: "#CB3837", fg: "#fff" };
const TEST_FILE = /\.(test|spec|grader)\.[jt]sx?$/;

function FileIcon({ path, className }) {
  const name = path.split("/").at(-1);
  const icon = name.startsWith("package") && name.endsWith(".json") ? NPM : FILE_ICONS[name.split(".").at(-1)] ?? { label: "•", fg: "#8b8b8b" };
  return (
    <span
      aria-hidden
      className={cn("relative inline-grid place-items-center w-4 h-4 shrink-0 rounded-[3px] font-mono font-bold leading-none tracking-tighter", icon.label.length > 2 ? "text-[6px]" : "text-[8px]", className)}
      style={{ background: icon.bg ?? "transparent", color: icon.fg }}
    >
      {icon.label}
      {/* test files get a small green dot, like VS Code's test-file icon variants */}
      {TEST_FILE.test(name) && <span className="absolute -right-0.5 -bottom-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-mn-background" />}
    </span>
  );
}

const FOLDER_COLOR = { src: "text-emerald-400", test: "text-sky-400", tests: "text-sky-400", __graders__: "text-violet-400" };
const lineTone = (line) =>
  line.startsWith("$") ? "text-mn-primary font-semibold" : /^(✗|not ok)/.test(line) ? "text-error" : /^(✓|ok \d)/.test(line) ? "text-emerald-400" : "text-on-surface-variant";
const handleCls = "bg-outline-variant hover:bg-surface-tint/60 data-[resize-handle-state=drag]:bg-surface-tint transition-colors";

function defineTheme(monaco) {
  // Colours are the site's tokens from tailwind.config.js / globals.css.
  monaco.editor.defineTheme("mimir", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#0F1010",
      "editor.lineHighlightBackground": "#151616",
      "editorCursor.foreground": "#FF5A36",
      "editor.selectionBackground": "#FF5A3633",
      "editorLineNumber.foreground": "#5D5B56",
      "editorLineNumber.activeForeground": "#F4F1EA",
      "editorWidget.background": "#151616",
      "editorWidget.border": "#242525",
      focusBorder: "#FF5A36",
    },
  });
  // Syntax errors only: the editor has no node typings, the sandbox is the source of truth.
  const ts = monaco.languages.typescript;
  ts.typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true });
  ts.typescriptDefaults.setCompilerOptions({ ...ts.typescriptDefaults.getCompilerOptions(), allowImportingTsExtensions: true, noEmit: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext });
}

function useInterviewTimer(slug, minutes) {
  const key = `arena:interview:${slug}`;
  const [startedAt, setStartedAt] = useState(null);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    setStartedAt(Number(localStorage.getItem(key)) || null);
  }, [key]);
  useEffect(() => {
    if (!startedAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startedAt]);
  const toggle = () => {
    if (startedAt) localStorage.removeItem(key);
    else localStorage.setItem(key, String(Date.now()));
    setStartedAt(startedAt ? null : Date.now());
  };
  const left = startedAt ? Math.max(0, minutes * 60 - Math.floor((now - startedAt) / 1000)) : null;
  return { on: Boolean(startedAt), left, toggle };
}

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function ArenaIDE({ meta, initialFiles }) {
  const slug = meta.slug;
  const ticketPath = Object.keys(initialFiles).find((p) => p.startsWith("tickets/"));
  const [files, setFiles] = useState(initialFiles);
  const firstSrc = Object.keys(initialFiles).sort().find((p) => p.startsWith("src/"));
  const [openTabs, setOpenTabs] = useState(firstSrc ? [firstSrc] : []);
  const [active, setActive] = useState(firstSrc ?? null);
  const [leftPanel, setLeftPanel] = useState(ticketPath ? "ticket" : "files"); // null = collapsed
  const [showTests, setShowTests] = useState(false);
  const [bottomTab, setBottomTab] = useState("terminal");
  const [command, setCommand] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const rootRef = useRef(null);
  const procRef = useRef(null);
  const termRef = useRef(null);
  const busyRef = useRef(false); // sync guard: double clicks / two Ctrl+Enter handlers land before `busy` re-renders
  const [consoleLines, setConsoleLines] = useState([]);
  const [tests, setTests] = useState([]); // { suite, name, passed }
  const [suiteState, setSuiteState] = useState({}); // suite -> "running" | "passed" | "failed"
  const [problems, setProblems] = useState({}); // path -> markers
  const [status, setStatus] = useState("booting");
  const [busy, setBusy] = useState(false);
  const [passed, setPassed] = useState(false);
  const wcRef = useRef(null);
  const writtenRef = useRef({ ...initialFiles });
  const session = useSession();
  const timer = useInterviewTimer(slug, meta.mode === "interview" ? 60 : 45);

  const log = useCallback((line) => setConsoleLines((l) => [...l.slice(-1500), line]), []);

  // Restore saved edits + start time, then boot the sandbox and install dependencies.
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`arena:files:${slug}`) || "{}");
    const merged = { ...initialFiles, ...Object.fromEntries(Object.entries(saved).filter(([p]) => p.startsWith("src/"))) };
    setFiles(merged);
    if (!localStorage.getItem(`arena:started:${slug}`)) localStorage.setItem(`arena:started:${slug}`, String(Date.now()));
    setPassed(localStorage.getItem(`arena:passed:${slug}`) === "1");

    if (!window.crossOriginIsolated) {
      setStatus("unsupported");
      return;
    }
    let cancelled = false;
    setConsoleLines([]); // Strict Mode runs this twice; don't show the boot log twice
    (async () => {
      try {
        log("$ booting sandbox…");
        const wc = await bootSandbox();
        if (cancelled) return;
        await wc.mount(toTree(merged));
        writtenRef.current = { ...merged };
        setStatus("installing");
        log("$ npm ci");
        const code = await runCommand(wc, "npm ci", log);
        if (code !== 0) throw new Error(`npm ci exited with ${code}`);
        wcRef.current = wc;
        setStatus("ready");
        log("✓ sandbox ready. Run (visible tests) or Run Tests (visible + hidden graders), Ctrl/Cmd+Enter.");
      } catch (err) {
        log(`✗ ${err.message}`);
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, initialFiles, log]);

  const editFile = (path, value) => {
    setFiles((f) => {
      const next = { ...f, [path]: value };
      const srcEdits = Object.fromEntries(Object.entries(next).filter(([p, c]) => p.startsWith("src/") && c !== initialFiles[p]));
      localStorage.setItem(`arena:files:${slug}`, JSON.stringify(srcEdits));
      return next;
    });
  };

  const syncFiles = async () => {
    const tampered = Object.keys(initialFiles).filter((p) => (p.startsWith("test/") || HIDDEN(p)) && files[p] !== initialFiles[p]);
    if (tampered.length) throw new Error("graders are read-only");
    for (const [path, content] of Object.entries(files)) {
      if (writtenRef.current[path] !== content) {
        await wcRef.current.fs.writeFile(path, content);
        writtenRef.current[path] = content;
      }
    }
  };

  const runSuite = async (suite, cmd) => {
    setSuiteState((s) => ({ ...s, [suite]: "running" }));
    log(`$ ${cmd}`);
    const code = await runCommand(
      wcRef.current,
      cmd,
      (line) => {
        log(line);
        const result = parseTapLine(line);
        if (result) setTests((t) => [...t, { suite, ...result }]);
      },
      { onProc: (p) => (procRef.current = p) },
    );
    setSuiteState((s) => ({ ...s, [suite]: code === 0 ? "passed" : "failed" }));
    return code === 0;
  };

  const run = async (withGraders) => {
    if (status !== "ready" || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setTests([]);
    setSuiteState({});
    setShowTests(true);
    setBottomTab("terminal");
    try {
      await syncFiles();
      const visibleOk = await runSuite("visible", meta.visibleTestCmd);
      if (!withGraders) return;
      if (!visibleOk) {
        log("✗ visible suite failed; fix it before the graders run.");
        return;
      }
      if (await runSuite("hidden", meta.hiddenTestCmd)) await onAllGradersPass();
    } catch (err) {
      log(`✗ ${err.message}`);
      toast.error(err.message);
    } finally {
      procRef.current = null;
      busyRef.current = false;
      setBusy(false);
    }
  };

  const runTerminal = async (e) => {
    e.preventDefault();
    const cmd = command.trim();
    if (!cmd || status !== "ready" || busyRef.current) return;
    setCommand("");
    if (cmd === "clear") return setConsoleLines([]);
    busyRef.current = true;
    setBusy(true);
    log(`$ ${cmd}`);
    try {
      await syncFiles(); // so the shell sees your latest edits
      const code = await runCommand(wcRef.current, cmd, log, { shell: true, onProc: (p) => (procRef.current = p) });
      if (code !== 0) log(`exit code ${code}`);
    } catch (err) {
      log(`✗ ${err.message}`);
    } finally {
      procRef.current = null;
      busyRef.current = false;
      setBusy(false);
    }
  };

  // Scroll only the terminal pane; scrollIntoView also scrolls the page (and returns a Promise in new Chrome).
  useEffect(() => {
    const el = termRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [consoleLines, bottomTab]);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);
  const toggleFullscreen = () =>
    document.fullscreenElement ? document.exitFullscreen() : rootRef.current.requestFullscreen().catch((err) => toast.error(err.message));

  const onAllGradersPass = async () => {
    localStorage.setItem(`arena:passed:${slug}`, "1");
    setPassed(true);
    const startedAt = Number(localStorage.getItem(`arena:started:${slug}`)) || Date.now();
    const row = {
      slug,
      src_sha256: await sha256Files(files, "src/"),
      duration_s: Math.round((Date.now() - startedAt) / 1000),
      mode: timer.on ? "interview" : meta.mode,
    };
    let note = "Sign in with GitHub to record your completion.";
    if (supabase) {
      try {
        const { recorded } = await recordCompletion(row);
        if (recorded) note = "Completion recorded.";
      } catch (err) {
        note = `Couldn't record completion: ${err.message}`;
      }
    } else {
      note = "Supabase isn't configured, so this completion was not recorded.";
    }
    toast.success("All hidden graders pass", {
      description: note,
      action: { label: "Write the autopsy", onClick: () => (window.location.href = `/arena/incident/${slug}/autopsy`) },
      duration: 10000,
    });
  };

  // Latest `run` for the Monaco command and the window shortcut.
  const runRef = useRef(run);
  runRef.current = run;
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        runRef.current(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openFile = (path) => {
    setOpenTabs((t) => (t.includes(path) ? t : [...t, path]));
    setActive(path);
  };
  const closeTab = (path) => {
    setOpenTabs((t) => {
      const next = t.filter((p) => p !== path);
      if (active === path) setActive(next.at(-1) ?? null);
      return next;
    });
  };

  const tree = useMemo(() => {
    const groups = {};
    for (const p of Object.keys(files).filter((p) => !HIDDEN(p) && !p.startsWith("tickets/")).sort()) {
      const dir = p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "";
      (groups[dir] ??= []).push(p);
    }
    return Object.entries(groups).sort(([a], [b]) => (a === "" ? 1 : b === "" ? -1 : a.localeCompare(b)));
  }, [files]);

  const problemList = Object.entries(problems).flatMap(([path, markers]) => markers.map((m) => ({ path, ...m })));
  const hiddenTotal = tests.filter((t) => t.suite === "hidden").length;
  const hiddenPassed = tests.filter((t) => t.suite === "hidden" && t.passed).length;
  const passedCount = tests.filter((t) => t.passed).length;
  const ready = status === "ready" && !busy;
  const statusLabel = { booting: "Booting sandbox", installing: "Installing dependencies", ready: busy ? "Running" : "Ready", error: "Sandbox error", unsupported: "Browser not supported" }[status];
  const panelHeader = "flex items-center justify-between gap-2 px-3 h-9 shrink-0 border-b border-outline-variant";
  const panelTitle = "font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant";
  const iconBtn = "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 text-xs text-on-surface-variant hover:text-mn-primary hover:border-surface-tint/40 transition-colors";

  return (
    <div
      ref={rootRef}
      className={cn("flex flex-col bg-mn-background text-on-surface-variant", fullscreen ? "h-screen" : "h-[calc(100dvh-4rem)] md:h-[calc(100dvh-72px)]")}
    >
      {/* Toasts render outside the fullscreen element, so mount a second Toaster inside it. */}
      {fullscreen && <Toaster position="top-right" theme="dark" />}

      {/* Top bar */}
      <div className="flex items-center gap-3 px-3 md:px-4 h-12 shrink-0 border-b border-outline-variant bg-surface-container-low">
        <a href="/arena" className="text-xs text-on-surface-variant hover:text-mn-primary transition-colors">Arena</a>
        <ChevronRight className="w-3.5 h-3.5 text-outline shrink-0" aria-hidden />
        <span className="hidden sm:inline font-mono text-xs text-on-surface-variant">{meta.incidentId}</span>
        <SeverityPill severity={meta.severity} />
        <h1 className="text-sm font-semibold text-mn-primary truncate">{meta.title}</h1>

        <div className="ml-auto flex items-center gap-2 shrink-0">
          {timer.on && (
            <span
              role="timer"
              className={cn(
                "font-mono text-xs px-2.5 py-1 rounded-md border tabular-nums",
                timer.left <= 120 ? "text-error border-error/40 bg-error/10" : timer.left <= 600 ? "text-surface-tint border-surface-tint/40" : "text-mn-primary border-border",
              )}
            >
              {timer.left === 0 ? "time's up" : fmt(timer.left)}
            </span>
          )}
          <button type="button" onClick={timer.toggle} aria-pressed={timer.on} title="Interview mode" className={cn(iconBtn, timer.on && "text-surface-tint border-surface-tint/40")}>
            <Timer className="w-3.5 h-3.5" aria-hidden /> <span className="hidden lg:inline">Interview mode</span>
          </button>
          {passed && (
            <a href={`/arena/incident/${slug}/autopsy`} className="hidden md:inline px-3 py-1.5 rounded-lg border border-surface-tint/50 text-xs font-medium text-surface-tint hover:bg-surface-tint/10 transition-colors">
              Autopsy unlocked →
            </a>
          )}
          {supabase && !session && (
            <button type="button" onClick={signInWithGitHub} title="Sign in with GitHub" className={iconBtn}>
              <Github className="w-3.5 h-3.5" aria-hidden /> <span className="hidden lg:inline">Sign in</span>
            </button>
          )}
          <span className="w-px h-5 bg-outline-variant mx-1" aria-hidden />
          <button
            type="button"
            disabled={!ready}
            onClick={() => run(false)}
            title="Run the visible tests"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface-container text-xs font-medium text-mn-primary hover:border-surface-tint/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-3.5 h-3.5" aria-hidden /> Run
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={() => run(true)}
            title="Run visible + hidden graders (Ctrl/Cmd + Enter)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-tint text-mn-background text-xs font-semibold shadow-[0_0_20px_-6px] shadow-surface-tint/60 hover:bg-primary-fixed disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed transition-colors"
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden /> : <FlaskConical className="w-3.5 h-3.5" aria-hidden />} Run Tests
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit full screen" : "Full screen IDE"}
            title={fullscreen ? "Exit full screen (Esc)" : "Full screen IDE"}
            className="p-1.5 rounded-lg border border-border/60 text-on-surface-variant hover:text-mn-primary transition-colors"
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" aria-hidden /> : <Maximize2 className="w-3.5 h-3.5" aria-hidden />}
          </button>
        </div>
      </div>

      {timer.on && (
        <p className="px-4 py-1.5 text-xs text-on-surface-variant bg-surface-tint/5 border-b border-surface-tint/20">
          Interview mode: no AI assistants. We can&apos;t enforce it; we&apos;re asking.
        </p>
      )}

      <div className="flex flex-1 min-h-0">
        {/* Activity rail */}
        <nav aria-label="Panels" className="w-12 shrink-0 flex flex-col items-center gap-1 py-2 border-r border-outline-variant bg-surface-container-low">
          {[
            ticketPath && { id: "ticket", icon: FileText, label: "Incident ticket", pressed: leftPanel === "ticket", onClick: () => setLeftPanel((p) => (p === "ticket" ? null : "ticket")) },
            { id: "files", icon: Files, label: "Challenge files", pressed: leftPanel === "files", onClick: () => setLeftPanel((p) => (p === "files" ? null : "files")) },
            { id: "tests", icon: FlaskConical, label: "Test results", pressed: showTests, onClick: () => setShowTests((s) => !s) },
          ]
            .filter(Boolean)
            .map(({ id, icon: Icon, label, pressed, onClick }) => (
              <button
                key={id}
                type="button"
                aria-label={label}
                title={label}
                aria-pressed={pressed}
                onClick={onClick}
                className={cn(
                  "relative p-2 rounded-lg transition-colors",
                  pressed
                    ? "text-surface-tint bg-surface-container before:absolute before:-left-1.5 before:top-1.5 before:bottom-1.5 before:w-0.5 before:rounded-full before:bg-surface-tint"
                    : "text-on-surface-variant hover:text-mn-primary hover:bg-surface-container",
                )}
              >
                <Icon className="w-5 h-5" aria-hidden />
              </button>
            ))}
        </nav>

        <ResizablePanelGroup direction="horizontal" autoSaveId="arena-ide-h" className="flex-1 min-w-0">
          {leftPanel && (
            <>
              <ResizablePanel id="left" order={1} defaultSize={26} minSize={15} maxSize={45} className="flex flex-col bg-surface-container-low">
                {leftPanel === "ticket" ? (
                  <aside aria-label="Incident ticket" className="flex flex-col h-full min-h-0">
                    <div className={panelHeader}>
                      <span className={panelTitle}>Incident {meta.incidentId}</span>
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                      <TicketView markdown={files[ticketPath] ?? ""} />
                    </div>
                  </aside>
                ) : (
                  <aside aria-label="Challenge files" className="flex flex-col h-full min-h-0">
                    <div className={panelHeader}>
                      <span className={panelTitle}>Explorer</span>
                      <button
                        type="button"
                        aria-label="Reset my changes"
                        title="Reset my changes"
                        onClick={() => {
                          if (!confirm("Discard your edits to src/ and start over?")) return;
                          localStorage.removeItem(`arena:files:${slug}`);
                          window.location.reload();
                        }}
                        className="p-1 rounded text-on-surface-variant hover:text-mn-primary hover:bg-surface-container transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden />
                      </button>
                    </div>
                    <div className="flex-1 overflow-auto py-1 text-[13px]">
                      {tree.map(([dir, paths]) => (
                        <div key={dir || "root"}>
                          {dir && (
                            <div className="flex items-center gap-1.5 px-3 pt-2 pb-1 text-xs text-on-surface-variant">
                              <FolderOpen className={cn("w-3.5 h-3.5", FOLDER_COLOR[dir.split("/").at(-1)] ?? "text-amber-400")} aria-hidden /> {dir}
                            </div>
                          )}
                          {paths.map((p) => {
                            return (
                              <button
                                key={p}
                                type="button"
                                onClick={() => openFile(p)}
                                className={cn(
                                  "w-full flex items-center gap-1.5 text-left py-1 pr-2 border-l-2 transition-colors",
                                  dir ? "pl-7" : "pl-3",
                                  active === p
                                    ? "bg-surface-container-high text-mn-primary border-surface-tint"
                                    : "border-transparent text-on-surface-variant hover:bg-surface-container hover:text-mn-primary",
                                )}
                              >
                                <FileIcon path={p} />
                                <span className="truncate">{p.split("/").at(-1)}</span>
                                {files[p] !== initialFiles[p] && <span className="w-1.5 h-1.5 rounded-full bg-surface-tint shrink-0" aria-label="modified" />}
                                {READ_ONLY(p) && <Lock className="w-3 h-3 ml-auto shrink-0 text-outline" aria-label="read-only" />}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                      <p className="mx-3 mt-4 p-2.5 rounded-md border border-dashed border-outline-variant text-[11px] leading-relaxed text-outline">
                        Fix the bug in <span className="font-mono text-on-surface-variant">src/</span>. Hidden graders run on Run Tests.
                      </p>
                    </div>
                  </aside>
                )}
              </ResizablePanel>
              <ResizableHandle className={handleCls} />
            </>
          )}

          {/* Editor + bottom panel */}
          <ResizablePanel id="main" order={2} defaultSize={52} minSize={30} className="min-w-0">
            <ResizablePanelGroup direction="vertical" autoSaveId="arena-ide-v">
              <ResizablePanel id="editor" order={1} defaultSize={70} minSize={20} className="flex flex-col min-h-0">
                <div className="flex h-9 shrink-0 overflow-x-auto border-b border-outline-variant bg-surface-container-low" role="tablist" aria-label="Open files">
                  {openTabs.map((p) => {
                    return (
                      <div
                        key={p}
                        className={cn(
                          "group flex items-center gap-1.5 pl-3 pr-1.5 text-xs border-r border-outline-variant whitespace-nowrap border-t-2 transition-colors",
                          active === p ? "bg-mn-background text-mn-primary border-t-surface-tint" : "border-t-transparent text-on-surface-variant hover:text-mn-primary",
                        )}
                      >
                        <button type="button" role="tab" aria-selected={active === p} onClick={() => setActive(p)} className="flex items-center gap-1.5 h-full">
                          <FileIcon path={p} />
                          {p.split("/").at(-1)}
                          {files[p] !== initialFiles[p] && <span className="w-1.5 h-1.5 rounded-full bg-surface-tint" aria-label="modified" />}
                          {READ_ONLY(p) && <Lock className="w-3 h-3 text-outline" aria-label="read-only" />}
                        </button>
                        <button
                          type="button"
                          aria-label={`Close ${p}`}
                          onClick={() => closeTab(p)}
                          className={cn("p-0.5 rounded hover:bg-surface-container-high hover:text-mn-primary", active === p ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100")}
                        >
                          <X className="w-3 h-3" aria-hidden />
                        </button>
                      </div>
                    );
                  })}
                </div>
                {active && (
                  <div className="px-4 h-6 shrink-0 flex items-center gap-1 font-mono text-[11px] text-outline bg-mn-background border-b border-outline-variant/50">
                    {active.split("/").map((seg, i, all) => (
                      <span key={i} className="flex items-center gap-1">
                        {i > 0 && <ChevronRight className="w-3 h-3" aria-hidden />}
                        <span className={i === all.length - 1 ? "text-on-surface-variant" : undefined}>{seg}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex-1 min-h-0">
                  {active ? (
                    <Editor
                      path={active}
                      value={files[active]}
                      language={LANG[active.split(".").at(-1)] ?? "plaintext"}
                      theme="mimir"
                      beforeMount={defineTheme}
                      loading={<Loader2 className="w-5 h-5 animate-spin text-outline" aria-label="Loading editor" />}
                      onMount={(editor, monaco) => editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => runRef.current(true))}
                      onChange={(v) => !READ_ONLY(active) && editFile(active, v ?? "")}
                      onValidate={(markers) => setProblems((p) => ({ ...p, [active]: markers.filter((m) => m.severity >= 4) }))}
                      options={{
                        readOnly: READ_ONLY(active),
                        readOnlyMessage: { value: "This file is read-only. Fix the bug in src/." },
                        fontSize: 13,
                        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                        lineHeight: 20,
                        padding: { top: 12 },
                        minimap: { enabled: false },
                        renderLineHighlight: "all",
                        cursorBlinking: "smooth",
                        smoothScrolling: true,
                        bracketPairColorization: { enabled: true },
                        guides: { bracketPairs: true, indentation: true },
                        wordWrap: active.endsWith(".md") ? "on" : "off",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        unicodeHighlight: { ambiguousCharacters: false },
                      }}
                    />
                  ) : (
                    <div className="h-full grid place-items-center text-center text-sm text-on-surface-variant">
                      <div className="space-y-2">
                        <Files className="w-8 h-8 mx-auto text-outline" aria-hidden />
                        <p>Open a file from the explorer.</p>
                        <p className="text-xs text-outline">
                          <kbd className="px-1.5 py-0.5 rounded border border-outline-variant font-mono">Ctrl</kbd> +{" "}
                          <kbd className="px-1.5 py-0.5 rounded border border-outline-variant font-mono">Enter</kbd> runs every test
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </ResizablePanel>

              <ResizableHandle className={handleCls} />

              {/* Bottom panel */}
              <ResizablePanel id="bottom" order={2} defaultSize={30} minSize={10} className="flex flex-col bg-surface-container-low">
                <div className="flex items-center gap-4 px-3 h-9 shrink-0 border-b border-outline-variant text-xs" role="tablist" aria-label="Output">
                  {[
                    ["terminal", "Terminal", TerminalSquare],
                    ["problems", "Problems", AlertTriangle],
                  ].map(([id, label, Icon]) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={bottomTab === id}
                      onClick={() => setBottomTab(id)}
                      className={cn(
                        "flex items-center gap-1.5 h-full border-b-2 uppercase tracking-wider text-[11px] transition-colors",
                        bottomTab === id ? "border-surface-tint text-mn-primary" : "border-transparent text-on-surface-variant hover:text-mn-primary",
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden /> {label}
                      {id === "problems" && problemList.length > 0 && (
                        <span className="px-1.5 rounded-full bg-error/15 text-error text-[10px] font-semibold">{problemList.length}</span>
                      )}
                    </button>
                  ))}
                  {busy && (
                    <button type="button" onClick={() => procRef.current?.kill()} className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded border border-error/40 text-error hover:bg-error/10">
                      <Square className="w-3 h-3" aria-hidden /> Stop
                    </button>
                  )}
                  {bottomTab === "terminal" && !busy && (
                    <button type="button" onClick={() => setConsoleLines([])} className="ml-auto text-on-surface-variant hover:text-mn-primary" title="Clear terminal">
                      Clear
                    </button>
                  )}
                </div>

                <div ref={termRef} className="flex-1 overflow-auto p-3 font-mono text-xs leading-relaxed bg-mn-background/60" aria-live="polite">
                  {bottomTab === "terminal" && (
                    <>
                      {status === "unsupported" ? (
                        <p className="text-on-surface-variant">
                          This page needs cross-origin isolation (Chrome, Edge or Firefox on desktop). Reload the page; if it persists, your browser can&apos;t run the in-browser sandbox.
                        </p>
                      ) : (
                        consoleLines.map((line, i) => (
                          <div key={i} className={cn("whitespace-pre-wrap break-words", lineTone(line))}>
                            {line || " "}
                          </div>
                        ))
                      )}
                      <form onSubmit={runTerminal} className="flex items-center gap-2 pt-1">
                        <span className="text-surface-tint" aria-hidden>
                          ❯
                        </span>
                        <input
                          value={command}
                          onChange={(e) => setCommand(e.target.value)}
                          disabled={status !== "ready" || busy}
                          aria-label="Terminal command"
                          placeholder={status !== "ready" ? "sandbox starting…" : busy ? "running… (Stop to cancel)" : 'ls, npm test, node -e "…", clear'}
                          spellCheck={false}
                          autoComplete="off"
                          className="flex-1 bg-transparent text-mn-primary outline-none placeholder:text-outline disabled:opacity-50"
                        />
                      </form>
                    </>
                  )}
                  {bottomTab === "problems" &&
                    (problemList.length ? (
                      problemList.map((m, i) => (
                        <button key={i} type="button" onClick={() => openFile(m.path)} className="flex items-start gap-2 w-full text-left py-0.5 text-on-surface-variant hover:text-mn-primary">
                          <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-error" aria-hidden />
                          <span>
                            {m.message} <span className="text-outline">{m.path}:{m.startLineNumber}:{m.startColumn}</span>
                          </span>
                        </button>
                      ))
                    ) : (
                      <p className="flex items-center gap-2 text-outline">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden /> No problems in open files.
                      </p>
                    ))}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          {/* Tests */}
          {showTests && (
            <>
              <ResizableHandle className={handleCls} />
              <ResizablePanel id="tests" order={3} defaultSize={22} minSize={14} maxSize={40} className="flex flex-col bg-surface-container-low">
                <aside aria-label="Test results" className="flex flex-col h-full min-h-0">
                  <div className={panelHeader}>
                    <span className={cn(panelTitle, tests.length > 0 && (passedCount === tests.length ? "text-emerald-400" : "text-error"))}>
                      Tests{tests.length ? ` · ${passedCount}/${tests.length} passed` : ""}
                    </span>
                    <button type="button" aria-label="Close test results" onClick={() => setShowTests(false)} className="p-1 rounded text-on-surface-variant hover:text-mn-primary hover:bg-surface-container">
                      <X className="w-3.5 h-3.5" aria-hidden />
                    </button>
                  </div>
                  {tests.length > 0 && (
                    <div className="h-1 shrink-0 bg-error/30" aria-hidden>
                      <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(passedCount / tests.length) * 100}%` }} />
                    </div>
                  )}
                  <div className="flex-1 overflow-auto p-3 text-xs leading-relaxed" aria-live="polite">
                    <div className="space-y-4">
                      {["visible", "hidden"].map((suite) => {
                        const st = suiteState[suite];
                        return (
                          <div
                            key={suite}
                            className={cn(
                              "rounded-lg border bg-mn-background/60 transition-colors",
                              st === "passed" ? "border-emerald-500/50 bg-emerald-500/5" : st === "failed" ? "border-error/50 bg-error/5" : "border-outline-variant",
                            )}
                          >
                            <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-outline-variant">
                              <span className="font-medium text-mn-primary">{suite === "visible" ? "Visible suite" : "Hidden graders"}</span>
                              {st === "running" ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-on-surface-variant" aria-label="running" />
                              ) : st ? (
                                <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase", st === "passed" ? "bg-emerald-500/15 text-emerald-400" : "bg-error/15 text-error")}>{st}</span>
                              ) : (
                                <span className="text-[10px] uppercase text-outline">not run</span>
                              )}
                            </div>
                            <div className="p-2 font-mono">
                              {tests
                                .filter((t) => t.suite === suite)
                                .map((t, i) => (
                                  <div key={i} className="flex items-start gap-2 px-1 py-1 rounded hover:bg-surface-container">
                                    {t.passed ? (
                                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" aria-label="passed" />
                                    ) : (
                                      <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-error" aria-label="failed" />
                                    )}
                                    <span className={t.passed ? "text-emerald-300" : "text-error"}>{t.name}</span>
                                  </div>
                                ))}
                              {!st && <div className="px-1 py-1 text-outline">{suite === "visible" ? "Press Run or Run Tests." : "Runs after the visible suite passes."}</div>}
                            </div>
                          </div>
                        );
                      })}
                      {hiddenTotal > 0 && hiddenPassed === hiddenTotal && suiteState.hidden === "passed" && (
                        <a href={`/arena/incident/${slug}/autopsy`} className="flex items-center gap-2 p-3 rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-medium hover:bg-emerald-500/15">
                          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden /> All {hiddenTotal} hidden graders pass. Write the autopsy →
                        </a>
                      )}
                    </div>
                  </div>
                </aside>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 px-3 h-6 shrink-0 border-t border-outline-variant bg-surface-container-low font-mono text-[11px] text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          {status === "ready" && !busy ? (
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden />
          ) : status === "error" || status === "unsupported" ? (
            <span className="w-2 h-2 rounded-full bg-error" aria-hidden />
          ) : (
            <Loader2 className="w-3 h-3 animate-spin" aria-hidden />
          )}
          {statusLabel}
        </span>
        {tests.length > 0 && (
          <span className={passedCount === tests.length ? "text-emerald-400" : "text-error"}>
            {passedCount}/{tests.length} tests passing
          </span>
        )}
        {problemList.length > 0 && <span className="text-error">{problemList.length} problems</span>}
        <span className="ml-auto hidden sm:inline">{active ? (LANG[active.split(".").at(-1)] ?? "plaintext") : ""}</span>
        <span className="hidden sm:inline text-outline">Ctrl+Enter · grade</span>
      </div>
    </div>
  );
}
