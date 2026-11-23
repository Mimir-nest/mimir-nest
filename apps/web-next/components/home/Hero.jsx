import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PixelWorld } from "@/components/pixel/World";

// what each building in the world stands for; the legend doubles as navigation
const LEGEND = [
  { c: "#FF794A", l: "Campus", to: "Study tools", href: "/#study" },
  { c: "#A78BFA", l: "Library", to: "Learning", href: "/#learn" },
  { c: "#18A8F5", l: "Lab", to: "Build", href: "/#build" },
  { c: "#8BE34A", l: "Field", to: "Prepare", href: "/#prepare" },
];

const TICKS = Array.from({ length: 7 }, (_, i) => i * 40);

const Hero = () => (
  <section className="relative overflow-hidden border-b border-line">
    <div aria-hidden className="grid-fine grid-fade absolute inset-0" />
    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:pb-24 lg:pt-36">
      <div>
        <Link href="/arena" className="group inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5">
          <span aria-hidden className="px-blink size-2 bg-good" />
          <span className="font-pixel text-[9px] uppercase tracking-wider text-fg">New</span>
          <span className="font-mono text-xs text-on-surface-variant group-hover:text-fg">Bug Squash Arena is live →</span>
        </Link>
        <h1 className="display mt-6 text-[2.75rem] leading-[1] text-balance sm:text-6xl xl:text-7xl">
          Everything you need to <span className="text-surface-tint">learn</span>, build &amp; launch.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant">
          MimirNest is an open-source platform for students: study tools, free courses, project ideas and placement prep, in one small world. No paywalls, no sign-up to start.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/#journey" className="pop px-hover inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Start exploring <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/placement-dsa" className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-panel px-6 py-3 text-sm text-on-surface-variant hover:border-fg hover:text-fg">
            Prepare for placements
          </Link>
        </div>
        <dl className="mt-10 grid max-w-md grid-cols-3 border-y border-line font-mono text-xs">
          {[["Price", "Free"], ["Source", "Open, MIT"], ["Sign-up", "Optional"]].map(([k, v], i) => (
            <div key={k} className={`py-3 ${i ? "border-l border-line pl-4" : ""}`}>
              <dt className="annot uppercase">{k}</dt>
              <dd className="mt-1 text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className="relative">
        {/* blueprint rulers around the illustration */}
        <div aria-hidden className="annot mb-1.5 hidden justify-between pl-1 sm:flex">{TICKS.map(t => <span key={t}>{String(t).padStart(3, "0")}</span>)}</div>
        <div className="frame bg-panel">
          <PixelWorld />
        </div>
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="annot uppercase">Legend</span>
          {LEGEND.map(g => (
            <Link key={g.l} href={g.href} className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-fg">
              <span aria-hidden className="size-2.5" style={{ background: g.c }} />
              {g.l} <span className="text-outline">→ {g.to}</span>
            </Link>
          ))}
        </figcaption>
      </figure>
    </div>
  </section>
);

export default Hero;
