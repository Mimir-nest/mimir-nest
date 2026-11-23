import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/tools";
import { PixelIcon, PixelScene } from "@/components/pixel";

const byKey = Object.fromEntries(categories.map((c) => [c.key, c.items]));
const tool = (path) => categories.flatMap((c) => c.items).find((i) => i.path === path);

function Head({ n, kicker, title, lead, className = "" }) {
  return (
    <div className={className}>
      <p className="kicker">{n} · {kicker}</p>
      <h2 className="display mt-3 text-[2.1rem] leading-[1.06] text-balance sm:text-5xl">{title}</h2>
      {lead && <p className="mt-4 max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg">{lead}</p>}
    </div>
  );
}

const Arrow = () => <ArrowRight aria-hidden className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />;

/* ── 01 Journey: five stops, each backed by the tools that actually exist ── */
const STOPS = [
  { step: "Learn", color: "#A78BFA", icon: "cap", text: "Free courses and theory you can read in order.", tools: [...byKey.learn, tool("/system-design-guide")] },
  { step: "Practice", color: "#FF794A", icon: "clock", text: "Small daily tools that keep study on track.", tools: byKey.study },
  { step: "Build", color: "#18A8F5", icon: "blocks", text: "Pick a project, follow a path, ship it.", tools: byKey.build },
  { step: "Prepare", color: "#8BE34A", icon: "trophy", text: "DSA, system design and interview drills.", tools: byKey.prepare.filter((t) => t.path !== "/system-design-guide") },
  { step: "Launch", color: "#FFD34E", icon: "flag", text: "Claim student perks and step into interviews.", tools: byKey.resources },
];
const MAX = Math.max(...STOPS.map((s) => s.tools.length));

export function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-16 overflow-hidden border-b border-line">
      <div aria-hidden className="grid-coarse grid-fade-x absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <Head n="01" kicker="The journey" title="Five stops from first lecture to first offer." lead="MimirNest is laid out like the path most students walk. Start anywhere; every stop links to the tools built for it." />
          {/* chart: one pixel block per real tool at each stop */}
          <figure className="pop rounded-2xl bg-panel p-5">
            <figcaption className="flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-wide text-fg">Tools at each stop</span>
              <span className="annot">1 block = 1 tool</span>
            </figcaption>
            <div className="mt-4 grid grid-cols-5 items-end gap-3" style={{ height: MAX * 22 + 8 }}>
              {STOPS.map((s, i) => (
                <div key={s.step} className="flex flex-col-reverse gap-1">
                  {s.tools.map((t, j) => (
                    <Link key={t.path} href={t.path} title={t.name} aria-label={`${s.step}: ${t.name}`}
                      className="px-bar block h-[18px] border-2 border-pop hover:brightness-110" style={{ background: s.color, animationDelay: `${i * 0.12 + j * 0.05}s` }} />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-5 gap-3 border-t border-line pt-2">
              {STOPS.map((s) => <span key={s.step} className="annot truncate uppercase">{s.step} · {s.tools.length}</span>)}
            </div>
          </figure>
        </div>

        <ol className="relative mt-14 grid gap-4 md:grid-cols-5">
          <div aria-hidden className="rule-dashed absolute left-6 right-6 top-6 hidden md:block" />
          {STOPS.map((s, i) => (
            <li key={s.step} className="relative">
              <span className="relative z-10 grid size-12 place-items-center rounded-xl border-2 border-pop" style={{ background: s.color }}>
                <PixelIcon name={s.icon} size={28} />
              </span>
              <p className="mt-4 font-pixel text-[10px] uppercase tracking-wider text-fg">{String(i + 1).padStart(2, "0")} {s.step}</p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{s.text}</p>
              <ul className="mt-3 space-y-1">
                {s.tools.map((t) => (
                  <li key={t.path}><Link href={t.path} className="group inline-flex items-center gap-1 text-sm text-fg underline decoration-line underline-offset-4 hover:decoration-accent">{t.name}<Arrow /></Link></li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 02 Study: the tools sit on a desk like three little devices ── */
const DEVICE = { "/cgpa": "#FF794A", "/pomodoro": "#FFD34E", "/typing": "#8BE34A" };

export function StudySection() {
  return (
    <section id="study" className="relative scroll-mt-16 overflow-hidden border-b border-line bg-panel2">
      <div aria-hidden className="grid-dots absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
        <Head n="02" kicker="Study tools" title="Tools for everyday college life." lead="Work out the CGPA you need, sit down for a focused session, and get faster at the keyboard. Each tool does one job." />
        <div className="grid gap-5 sm:grid-cols-3 sm:items-start">
          {byKey.study.map((t, i) => (
            <Link key={t.path} href={t.path} className={`pop px-hover group flex flex-col overflow-hidden rounded-2xl bg-panel ${i === 1 ? "sm:mt-10" : i === 2 ? "sm:mt-4" : ""}`}>
              {/* the device's screen */}
              <div className="seg relative grid h-28 place-items-center border-b-2 border-pop" style={{ backgroundColor: DEVICE[t.path] }}>
                <span className="grid size-16 place-items-center rounded-lg bg-[#ffffffcc]"><PixelIcon name={t.pixel} size={40} /></span>
                <span aria-hidden className="px-blink absolute right-2 top-2 size-1.5 bg-[#17191D]" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-fg">{t.name}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{t.description}</p>
                <p className="mt-3 flex items-center gap-1 font-mono text-xs text-surface-tint">{t.path}<Arrow /></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 03 Learn: a bookshelf where every spine is a real resource ── */
const BOOKS = [
  { path: "/courses", color: "#A78BFA", h: "h-64", label: "Free courses" },
  { path: "/system-design-guide", color: "#18A8F5", h: "h-72", label: "System design guide" },
  { path: "/system-design", color: "#FFD34E", h: "h-60", label: "500+ system design Q&A" },
  { path: "/blog", color: "#8BE34A", h: "h-56", label: "The blog" },
  { path: "/roadmaps", color: "#FF794A", h: "h-[15rem]", label: "Roadmaps" },
];

export function LearnSection() {
  return (
    <section id="learn" className="relative scroll-mt-16 overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <div className="order-2 lg:order-1">
          <div className="flex items-end gap-2 overflow-x-auto px-2 pb-0 pt-4 sm:gap-3">
            {BOOKS.map((b) => (
              <Link key={b.path} href={b.path} className={`group relative flex w-16 shrink-0 flex-col items-center justify-between rounded-t-md border-2 border-b-0 border-pop px-2 py-3 transition-transform hover:-translate-y-2 sm:w-20 ${b.h}`} style={{ background: b.color }}>
                <span aria-hidden className="h-2 w-full bg-[#17191D]/25" />
                <span className="font-pixel text-[9px] uppercase leading-relaxed text-[#17191D] [writing-mode:vertical-rl] rotate-180">{b.label}</span>
                <span aria-hidden className="h-2 w-full bg-[#17191D]/25" />
              </Link>
            ))}
            <div aria-hidden className="ml-2 hidden shrink-0 sm:block"><PixelIcon name="owl" size={56} /></div>
          </div>
          {/* the shelf */}
          <div aria-hidden className="h-4 border-2 border-pop bg-[#8A5A35]" />
          <div aria-hidden className="mx-4 h-6 border-x-2 border-pop" />
        </div>
        <Head className="order-1 lg:order-2" n="03" kicker="Learning resources" title="A free library, shelved by topic." lead="Curated courses from universities and educators, a chapter-by-chapter system design guide, interview Q&A and the MimirNest blog. Pull any spine off the shelf." />
      </div>
    </section>
  );
}

/* ── 04 Build: a blueprint of how a project goes from idea to shipped ── */
const PHASES = [["Idea", "Pick a project brief", "/projects"], ["Plan", "Follow a roadmap", "/roadmaps"], ["Design", "Sketch the architecture", "/playground"], ["Ship", "Put it in your portfolio", "/projects"]];

export function BuildSection() {
  return (
    <section id="build" className="relative scroll-mt-16 overflow-hidden border-b border-line bg-panel">
      <div aria-hidden className="grid-blueprint absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Head n="04" kicker="Build" title="Turn ideas into projects." lead="Project ideas to start from, roadmaps to follow, and a canvas to draw your system before you write it." />
          <p className="annot max-w-xs uppercase">Sheet 04 / Project lifecycle — drawn on a 16px grid, major lines every 80px</p>
        </div>

        <ol className="mt-12 grid gap-0 md:grid-cols-4">
          {PHASES.map(([name, what, href], i) => (
            <li key={name} className="relative">
              <Link href={href} className="group flex h-full flex-col border-2 border-dashed border-surface-tint/60 bg-panel/90 p-5 hover:border-solid hover:border-surface-tint md:-ml-[2px] md:first:ml-0">
                <span className="annot">x:{String(i * 240).padStart(4, "0")} y:0080</span>
                <span className="mt-3 font-pixel text-[11px] uppercase text-surface-tint">{String(i + 1).padStart(2, "0")} {name}</span>
                <span className="mt-2 text-sm text-on-surface-variant">{what}</span>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-fg">{href}<Arrow /></span>
              </Link>
              {i < PHASES.length - 1 && <span aria-hidden className="absolute -right-2 top-1/2 z-10 hidden size-3 -translate-y-1/2 border-2 border-surface-tint bg-panel md:block" />}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {byKey.build.map((t) => (
            <Link key={t.path} href={t.path} className="group flex items-center gap-4 rounded-2xl border border-line bg-panel p-4 hover:border-fg">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accentsoft"><PixelIcon name={t.pixel} size={30} /></span>
              <span className="min-w-0"><span className="block font-semibold text-fg">{t.name}</span><span className="block truncate text-sm text-on-surface-variant">{t.description}</span></span>
            </Link>
          ))}
          <Link href="/playground" className="group flex items-center gap-4 rounded-2xl border border-line bg-panel p-4 hover:border-fg">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accentsoft"><PixelIcon name="server" size={30} /></span>
            <span className="min-w-0"><span className="block font-semibold text-fg">Design playground</span><span className="block truncate text-sm text-on-surface-variant">Drag components onto a canvas</span></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 05 Prepare: the prep tracks shown as a terminal session ── */
export function PrepareSection() {
  const tracks = byKey.prepare;
  return (
    <section id="prepare" className="relative scroll-mt-16 overflow-hidden border-b border-line bg-panel2">
      <div aria-hidden className="grid-fine grid-fade absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <Head n="05" kicker="Placement prep" title="Get ready for placements." lead="Company-wise DSA, real incidents to debug, system design problems and non-technical interview prep." />
          <div className="frame mt-8"><PixelScene kind="prepare" h={100} /></div>
        </div>
        <div className="pop self-start overflow-hidden rounded-2xl bg-[#0A0A0A] text-[#E5E5E5]">
          <div className="flex items-center gap-2 border-b-2 border-pop bg-[#171717] px-4 py-2.5">
            {["#E5484D", "#FFD34E", "#8BE34A"].map((c) => <span key={c} aria-hidden className="size-2.5" style={{ background: c }} />)}
            <span className="ml-2 font-mono text-xs text-[#A3A3A3]">~/mimirnest/prepare</span>
          </div>
          <div className="space-y-1 p-4 font-mono text-[13px]">
            <p className="text-[#A3A3A3]">$ <span className="text-[#E5E5E5]">ls tracks/</span></p>
            <ul className="mt-2">
              {tracks.map((t) => (
                <li key={t.path}>
                  <Link href={t.path} className="group flex items-center gap-3 rounded px-2 py-2 hover:bg-[#171717]">
                    <span aria-hidden className={`size-2 shrink-0 ${t.badge ? "bg-[#FFD34E]" : "bg-[#8BE34A]"}`} />
                    <span className="w-48 shrink-0 truncate text-[#FFFFFF] sm:w-56">{t.name}</span>
                    <span className="hidden min-w-0 flex-1 truncate text-[#A3A3A3] sm:block">{t.description}</span>
                    {t.badge ? <span className="shrink-0 text-[11px] uppercase text-[#FFD34E]">{t.badge}</span> : <span className="shrink-0 text-[#18A8F5] opacity-0 transition-opacity group-hover:opacity-100">open →</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="pt-2 text-[#A3A3A3]">$ <span aria-hidden className="px-blink inline-block h-3.5 w-2 translate-y-0.5 bg-[#E5E5E5]" /></p>
          </div>
        </div>
      </div>
    </section>
  );
}
