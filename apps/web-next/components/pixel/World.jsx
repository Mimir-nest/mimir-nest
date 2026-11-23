// The hero's living pixel world: a small campus where students learn, build and head out to launch.
// Motion is CSS only (see the px-* classes in globals.css) and stops under prefers-reduced-motion.
import { Sprite, SPRITES } from "@/components/pixel";

const W = 240, H = 180, GROUND = 142;

// a student: shared upper body, two leg frames swapped every half second while walking
const BODY = ["..KKKK..", ".KKKKKK.", ".KkkkkK.", "..kkkk..", "..kkkk..", ".SSSSSS.", "kSSSSSSk", "kSSSSSSk", ".SSSSSS.", ".DDDDDD."];
const LEGS_A = [".DD..DD.", "DD....DD", "KK....KK"];
const LEGS_B = ["..DDDD..", "..D..D..", "..KK.KK."];
const SITTING = ["..KKKK..", ".KKKKKK.", ".KkkkkK.", "..kkkk..", "..kkkk..", ".SSSSSS.", "kSSSSSSk", "kSSSSSSk", ".SSSSSS.", ".DDDDDDD", "......DD", "......KK"];

function Student({ shirt, walk, delay, y = GROUND + 2, flip = false }) {
  const pal = { S: shirt };
  const h = (BODY.length + LEGS_A.length) * 1;
  const figure = (
    <g transform={flip ? "translate(8 0) scale(-1 1)" : undefined}>
      <Sprite rows={BODY} pal={pal} />
      <g className="px-f1"><Sprite y={BODY.length} rows={LEGS_A} pal={pal} /></g>
      <g className="px-f2"><Sprite y={BODY.length} rows={LEGS_B} pal={pal} /></g>
    </g>
  );
  return (
    <g className={walk} style={{ animationDelay: delay }}>
      <g transform={`translate(0 ${y - h})`}>{figure}</g>
    </g>
  );
}

function Window({ x, y, on = true, blink, delay }) {
  return <rect x={x} y={y} width={3} height={3} fill={on ? "#FFD34E" : "#BFE9FF"} className={blink ? "px-blink" : undefined} style={blink ? { animationDelay: delay } : undefined} />;
}

/** the campus: a columned hall with a stepped roof, a clock and a flag */
function Campus({ x }) {
  const cols = [0, 1, 2, 3, 4].map(i => <rect key={i} x={x + 6 + i * 10} y={GROUND - 34} width={4} height={28} fill="#FFFFFF" />);
  return (
    <g>
      {/* stepped pediment, narrow at the top */}
      {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={x + 25 - i * 5} y={GROUND - 50 + i * 2} width={10 + i * 10} height={2} fill="#FF794A" />)}
      <rect x={x} y={GROUND - 38} width={60} height={4} fill="#FF794A" />
      <rect x={x + 2} y={GROUND - 34} width={56} height={34} fill="#FFE7D6" />
      {cols}
      <rect x={x} y={GROUND - 6} width={60} height={6} fill="#E8C9B0" />
      <rect x={x + 24} y={GROUND - 16} width={12} height={16} fill="#8A5A35" />
      {/* clock in the pediment */}
      <rect x={x + 27} y={GROUND - 48} width={6} height={6} fill="#FFFFFF" /><rect x={x + 29} y={GROUND - 47} width={1} height={3} fill="#17191D" /><rect x={x + 29} y={GROUND - 45} width={3} height={1} fill="#17191D" />
      {/* flagpole and a flag that flickers between two frames */}
      <rect x={x + 30} y={GROUND - 66} width={1} height={16} fill="#17191D" />
      <g className="px-f1"><rect x={x + 31} y={GROUND - 66} width={8} height={5} fill="#FFD34E" /></g>
      <g className="px-f2"><rect x={x + 31} y={GROUND - 66} width={7} height={4} fill="#FFD34E" /><rect x={x + 38} y={GROUND - 65} width={1} height={3} fill="#FFD34E" /></g>
      <text x={x + 30} y={GROUND - 34.8} fontFamily="var(--font-pixel)" fontSize={3} fill="#FFFFFF" textAnchor="middle">CAMPUS</text>
    </g>
  );
}

/** the library tower: lit windows, a few of them blinking */
function Library({ x }) {
  const wins = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) {
    const i = r * 4 + c;
    wins.push(<Window key={i} x={x + 4 + c * 6} y={GROUND - 64 + r * 7} on={(i * 7) % 5 !== 0} blink={i % 6 === 2} delay={`${(i % 5) * 0.4}s`} />);
  }
  return (
    <g>
      <rect x={x - 1} y={GROUND - 72} width={32} height={3} fill="#7C5CE6" />
      <rect x={x} y={GROUND - 69} width={30} height={69} fill="#A78BFA" />
      <rect x={x + 26} y={GROUND - 69} width={4} height={69} fill="#000000" opacity={0.12} />
      {wins}
      <rect x={x + 11} y={GROUND - 10} width={8} height={10} fill="#17191D" opacity={0.75} />
      <rect x={x + 3} y={GROUND - 78} width={24} height={6} fill="#FFFFFF" />
      <text x={x + 15} y={GROUND - 73.6} fontFamily="var(--font-pixel)" fontSize={3} fill="#7C5CE6" textAnchor="middle">LIBRARY</text>
    </g>
  );
}

/** the lab: a low block with a rooftop antenna light */
function Lab({ x }) {
  return (
    <g>
      <rect x={x} y={GROUND - 30} width={36} height={30} fill="#BFE9FF" />
      <rect x={x - 1} y={GROUND - 32} width={38} height={2} fill="#18A8F5" />
      {[0, 1, 2, 3].map(c => <rect key={c} x={x + 3 + c * 8} y={GROUND - 24} width={6} height={8} fill="#18A8F5" />)}
      <rect x={x + 14} y={GROUND - 12} width={8} height={12} fill="#0B7CC4" />
      <rect x={x + 30} y={GROUND - 42} width={1} height={10} fill="#17191D" />
      <rect x={x + 29} y={GROUND - 44} width={3} height={2} fill="#E5484D" className="px-blink" />
      <rect x={x + 6} y={GROUND - 30} width={12} height={4} fill="#FFFFFF" />
      <text x={x + 12} y={GROUND - 26.6} fontFamily="var(--font-pixel)" fontSize={3} fill="#0B7CC4" textAnchor="middle">LAB</text>
    </g>
  );
}

const TREE = ["...GGGG...", ".GGGGGGGG.", "GGgGGGGgGG", "GGGGGgGGGG", "GgGGGGGGgG", ".GGGgGGGG.", "..GGGGGG..", "....tt....", "....tt....", "....tt....", "...tttt..."];

function Tree({ x, s = 2 }) {
  return <Sprite x={x} y={GROUND - TREE.length * s} rows={TREE} s={s} />;
}

/** a desk with a computer whose code lines blink, and a student working at it */
function Workstation({ x }) {
  const y = GROUND + 18;
  return (
    <g>
      <rect x={x} y={y - 10} width={30} height={2} fill="#8A5A35" /><rect x={x + 2} y={y - 8} width={2} height={8} fill="#8A5A35" /><rect x={x + 26} y={y - 8} width={2} height={8} fill="#8A5A35" />
      <rect x={x + 8} y={y - 24} width={18} height={13} fill="#17191D" />
      <rect x={x + 9} y={y - 23} width={16} height={11} fill="#0B7CC4" />
      <rect x={x + 10} y={y - 21} width={8} height={1} fill="#C6F27A" />
      <rect x={x + 10} y={y - 19} width={11} height={1} fill="#FFFFFF" />
      <rect x={x + 12} y={y - 17} width={6} height={1} fill="#FFD34E" />
      <rect x={x + 19} y={y - 17} width={2} height={1} fill="#FFFFFF" className="px-blink" />
      <rect x={x + 15} y={y - 11} width={4} height={1} fill="#17191D" />
      <g transform={`translate(${x - 6} ${y - 12})`}><Sprite rows={SITTING} pal={{ S: "#FF794A" }} /></g>
    </g>
  );
}

function Cloud({ y, cls, delay }) {
  return <g className={cls} style={{ animationDelay: delay }}><Sprite y={y} rows={SPRITES.cloud} /></g>;
}

export function PixelWorld({ className = "" }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`pixel-art block h-auto w-full ${className}`} shapeRendering="crispEdges" role="img"
      aria-label="An animated pixel-art campus: students walk past a columned hall, a library and a lab while the MimirNest owl watches from a tree and a student codes at a desk">
      <defs>
        <pattern id="mn-sky-grid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0H0V8" fill="none" stroke="#FFFFFF" strokeWidth="0.25" opacity="0.35" /></pattern>
        <clipPath id="mn-world"><rect width={W} height={H} /></clipPath>
      </defs>
      <g clipPath="url(#mn-world)">
        <rect width={W} height={H} fill="#00C7E8" />
        <rect y={70} width={W} height={H - 70} fill="#18A8F5" opacity={0.25} />
        <rect width={W} height={GROUND} fill="url(#mn-sky-grid)" />
        <Sprite x={196} y={12} rows={SPRITES.sun} />
        <Cloud y={14} cls="px-drift" delay="-6s" />
        <Cloud y={30} cls="px-drift-slow" delay="-40s" />
        <Cloud y={8} cls="px-drift-slow" delay="-10s" />

        {/* distant city */}
        {[[4, 26], [18, 40], [34, 30], [120, 44], [136, 32], [150, 50], [206, 36], [220, 46]].map(([x, h]) => (
          <g key={x}><rect x={x} y={GROUND - 8 - h} width={12} height={h} fill="#DCD0FF" />
            {Array.from({ length: Math.floor(h / 6) }, (_, i) => <rect key={i} x={x + 3} y={GROUND - 4 - h + i * 6} width={2} height={2} fill="#FFFFFF" />)}</g>
        ))}
        <rect y={GROUND - 8} width={W} height={8} fill="#8BE34A" />
        {[0, 16, 40, 66, 92, 118, 150, 178, 204, 228].map((x, i) => <rect key={x} x={x} y={GROUND - 10 - (i % 3) * 2} width={14} height={4 + (i % 3) * 2} fill="#3FAE4A" />)}

        <Campus x={8} />
        <Tree x={72} />
        {/* the owl lives in this tree */}
        <g className="px-bob"><Sprite x={78} y={GROUND - 30} rows={SPRITES.owl} s={1} /></g>
        <Library x={98} />
        <Tree x={132} s={1.5} />
        <Lab x={150} />
        <Tree x={194} />
        <Sprite x={214} y={GROUND - 16} rows={SPRITES.flag} s={2} />

        {/* path, field and flowers */}
        <rect y={GROUND} width={W} height={H - GROUND} fill="#C6F27A" />
        <rect y={GROUND} width={W} height={6} fill="#F2E3B3" />
        <rect y={GROUND + 6} width={W} height={1} fill="#E0CC8E" />
        {Array.from({ length: 30 }, (_, i) => <rect key={i} x={(i * 37) % W} y={GROUND + 10 + ((i * 13) % 26)} width={1} height={1} fill={["#FFFFFF", "#FFD34E", "#FFB3D1"][i % 3]} />)}

        <Student shirt="#7C5CE6" walk="px-walk-r" delay="-4s" />
        <Student shirt="#0B7CC4" walk="px-walk-l" delay="-18s" flip />
        <Student shirt="#3FAE4A" walk="px-walk-r" delay="-15s" />

        <Workstation x={186} />
        <Sprite x={18} y={GROUND + 10} rows={SPRITES.books} s={1} />
        <Sprite x={44} y={GROUND + 12} rows={SPRITES.trophy} s={1} />
        <Sprite x={110} y={GROUND + 14} rows={SPRITES.map} s={1} />
      </g>
    </svg>
  );
}
