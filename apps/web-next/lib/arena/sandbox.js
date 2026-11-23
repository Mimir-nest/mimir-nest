// eslint-disable-next-line no-control-regex -- stripping terminal colour codes is the point
const ANSI = /\x1b\[[0-9;?]*[A-Za-z]/g;
const SPINNER = /^\s*[\\|/-]\s*$/; // npm's progress spinner frames
const TAP_RESULT = /^(not )?ok \d+ - (.+?)(?: # (SKIP|TODO).*)?$/;

/** Top-level node:test TAP result line -> { name, passed } (subtests are indented and ignored). */
export function parseTapLine(line) {
  const m = line.match(TAP_RESULT);
  return m ? { name: m[2], passed: !m[1] } : null;
}

/** { "src/a.ts": "..." } -> WebContainer FileSystemTree */
export function toTree(files) {
  const root = {};
  for (const [path, contents] of Object.entries(files)) {
    const parts = path.split("/");
    let node = root;
    for (const dir of parts.slice(0, -1)) {
      node[dir] ??= { directory: {} };
      node = node[dir].directory;
    }
    node[parts.at(-1)] = { file: { contents } };
  }
  return root;
}

/** Stable sha256 over every file under `prefix`, path-sorted. */
export async function sha256Files(files, prefix) {
  const body = Object.keys(files)
    .filter((p) => p.startsWith(prefix))
    .sort()
    .map((p) => `${p}\0${files[p]}\0`)
    .join("");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

let bootPromise;
/** WebContainer.boot() may only run once per page, so share one instance (survives Strict Mode remounts). */
export function bootSandbox() {
  bootPromise ??= import("@webcontainer/api").then(({ WebContainer }) => WebContainer.boot());
  return bootPromise;
}

/**
 * Runs `cmd` (e.g. "npm run test:graders"), calling onLine per output line; resolves to the exit code.
 * shell: run through jsh so builtins (ls, cd), pipes and && work. onProc gets the process so callers can kill() it.
 */
export async function runCommand(wc, cmd, onLine, { shell = false, onProc } = {}) {
  const [bin, ...args] = shell ? ["jsh", "-c", cmd] : cmd.trim().split(/\s+/);
  const proc = await wc.spawn(bin, args, { env: { NO_COLOR: "1", FORCE_COLOR: "0" } });
  onProc?.(proc);
  let buffer = "";
  const piped = proc.output.pipeTo(
    new WritableStream({
      write(chunk) {
        buffer += chunk.replace(ANSI, "");
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop();
        lines.filter((l) => !SPINNER.test(l)).forEach(onLine);
      },
    }),
  );
  const code = await proc.exit;
  await piped.catch(() => {});
  if (buffer && !SPINNER.test(buffer)) onLine(buffer);
  return code;
}
