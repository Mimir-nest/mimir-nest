// MimirNest pixel-art system: every sprite is a character map drawn as SVG rects on an integer grid.
// Scene colours are fixed on purpose so the art reads the same in light and dark themes.

const PAL = {
  K: "#17191D", W: "#FFFFFF", C: "#FFF6DC", B: "#18A8F5", D: "#0B7CC4", b: "#BFE9FF", Y: "#00C7E8",
  L: "#C6F27A", G: "#8BE34A", g: "#3FAE4A", P: "#7C5CE6", p: "#A78BFA", A: "#FFB52E", O: "#FF794A",
  R: "#FFB3D1", r: "#E5484D", y: "#FFD34E", s: "#C9CED6", S: "#8F98A3", m: "#B98A5A", t: "#8A5A35", k: "#F2C9A0",
};

/** draws a character map; horizontal runs of one colour merge into one rect */
export const PALETTE = PAL;

export function Sprite({ x = 0, y = 0, rows, pal = {}, s = 1 }) {
  const out = [];
  rows.forEach((row, ry) => {
    let rx = 0;
    while (rx < row.length) {
      const ch = row[rx];
      let run = 1;
      while (rx + run < row.length && row[rx + run] === ch) run++;
      const fill = pal[ch] ?? PAL[ch];
      if (ch !== "." && fill) out.push(<rect key={`${ry}-${rx}`} x={x + rx * s} y={y + ry * s} width={run * s} height={s} fill={fill} />);
      rx += run;
    }
  });
  return <g>{out}</g>;
}

// small deterministic generator so server and client render identical scenes
function rng(seed) {
  let v = seed * 9301 + 49297;
  return () => ((v = (v * 9301 + 49297) % 233280) / 233280);
}

export const SPRITES = {
  owl: ["K........K", "KK......KK", "KmmmmmmmmK", "KWWWmmWWWK", "KWKWmmWKWK", "KWWWAAWWWK", "KmmmAAmmmK", "KmCCCCCCmK", "KmCtCCtCmK", "KmCCCCCCmK", ".KmmmmmmK.", "..AA..AA.."],
  nest: [".tmtmtmtmtmtmt..", "tmtmtmtmtmtmtmtm", ".ttmtmtmtmtmtmt.", "..tttttttttttt.."],
  books: ["..PPPPPPPPPP..", "..PWWWWWWWWP..", "..PPPPPPPPPP..", ".DDDDDDDDDDDD.", ".DWWWWWWWWWWD.", ".DDDDDDDDDDDD.", "gggggggggggggg", "gWWWWWWWWWWWWg", "gggggggggggggg"],
  laptop: ["..KKKKKKKKKKKKKK..", "..KDDDDDDDDDDDDK..", "..KDLLLDDDDDDDDK..", "..KDDDyyyyDDDDDK..", "..KDDDDDDWWWDDDK..", "..KDLLLLDDDDDDDK..", "..KDDDDDDDDDDDDK..", "..KKKKKKKKKKKKKK..", "ssssssssssssssssss", ".SSSSSSSSSSSSSSSS."],
  clock: ["..KKKKKK..", ".KWWWWWWK.", "KWWWKWWWWK", "KWWWKWWWWK", "KWWWKKKWWK", "KWWWWWWWWK", "KWWWWWWWWK", ".KWWWWWWK.", "..KKKKKK..", ".rr....rr."],
  trophy: ["AAAAAAAAAA", "A.AyyyyA.A", "A.AyyyyA.A", ".AAyyyyAA.", "...AyyA...", "....AA....", "....AA....", "..tttttt..", "..tttttt.."],
  cap: [".....KK.....", "...KKKKKK...", "KKKKKKKKKKKK", "...KKKKKK.y.", "...KKKKKK.y.", "..........yy"],
  envelope: ["KKKKKKKKKKKK", "KKWWWWWWWWKK", "KWKWWWWWWKWK", "KWWKWWWWKWWK", "KWWWKKKKWWWK", "KWWWWWWWWWWK", "KKKKKKKKKKKK"],
  gift: ["...rr.rr..", "....rrr...", "rrrrrrrrrr", "PPPPrrPPPP", "PPPPrrPPPP", "PPPPrrPPPP", "PPPPrrPPPP", "PPPPrrPPPP"],
  coin: [".AAAA.", "AyyyyA", "AyAAyA", "AyAAyA", "AyyyyA", ".AAAA."],
  shield: ["DDDDDDDDD", "DBBBBBBBD", "DBBBWBBBD", "DBBWWWBBD", "DBBBWBBBD", ".DBBBBBD.", "..DBBBD..", "...DBD...", "....D...."],
  doc: ["KKKKKK..", "KWWWWKK.", "KWWWWWKK", "KWDDDDWK", "KWWWWWWK", "KWDDDDWK", "KWWWWWWK", "KWDDWWWK", "KKKKKKKK"],
  chat: [".LLLLLLLL.", "LLLLLLLLLL", "LLKLLKLLKL", "LLLLLLLLLL", ".LLLLLLLL.", "..LL......", ".L........"],
  map: ["yyyyyyyyyyyy", "yGGyyyyyyyyy", "yGrrryyyyBBy", "yyyyryyyBBBy", "yyyyrrrryyyy", "yGGyyyyrryyy", "yGGGyyyyrKyy", "yyyyyyyyyyyy"],
  server: ["KKKKKKKKKK", "KssssssLsK", "KSSSSSSSSK", "KKKKKKKKKK", "KssssssGsK", "KSSSSSSSSK", "KKKKKKKKKK", "KssssssAsK", "KSSSSSSSSK", "KKKKKKKKKK"],
  flag: ["K.......", "KOOOOO..", "KOOOOOO.", "KOOOOO..", "K.......", "K.......", "K.......", "KK......"],
  bug: ["..K....K..", "...K..K...", "..rrrrrr..", "KrrKrrKrrK", ".rrrrrrrr.", "KrrKrrKrrK", "..rrrrrr..", ".K......K."],
  calc: ["KKKKKKKK", "KLLLLLLK", "KLLLLLLK", "KKKKKKKK", "KWKWKWKK", "KKKKKKKK", "KWKWKOKK", "KKKKKKKK", "KWKWKOKK", "KKKKKKKK"],
  keyboard: ["KKKKKKKKKKKKKK", "KWKWKWKWKWKWKK", "KKKKKKKKKKKKKK", "KKWKWKWKWKWKWK", "KKKKKKKKKKKKKK", "KKKWWWWWWWWKKK", "KKKKKKKKKKKKKK"],
  blocks: ["....AAAA......", "....AyyA......", "....AAAA......", "..DDDDggggg...", "..DBBDgLLLg...", "..DDDDggggg...", "PPPPPPOOOOOOO.", "PppppPOyyyyyO.", "PPPPPPOOOOOOO."],
  star: ["..y..", ".yyy.", "yyyyy", ".yyy.", ".y.y."],
  cloud: ["......WWWW........", "...WWWWWWWWW......", "..WWWWWWWWWWWWW...", ".WWWWWWWWWWWWWWWW.", "WWWWWWWWWWWWWWWWWW", ".bbbbbbbbbbbbbbbb."],
  sun: ["....yyyy....", "..yyyyyyyy..", ".yyyyyyyyyy.", ".yyAAAAAAyy.", "yyAAAAAAAAyy", "yyAAAAAAAAyy", "yyAAAAAAAAyy", "yyAAAAAAAAyy", ".yyAAAAAAyy.", ".yyyyyyyyyy.", "..yyyyyyyy..", "....yyyy...."],
};

function Building({ x, w, h, base, body, roof }) {
  const y = base - h, win = [];
  for (let wy = y + 3; wy < base - 5; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 4) win.push(<rect key={`${wx}-${wy}`} x={wx} y={wy} width={2} height={2} fill={(wx + wy) % 3 ? "#FFFFFF" : "#FFE45C"} />);
  return <g><rect x={x - 1} y={y - 2} width={w + 2} height={2} fill={roof} /><rect x={x} y={y} width={w} height={h} fill={body} /><rect x={x + w - 2} y={y} width={2} height={h} fill="#000000" opacity={0.1} />{win}</g>;
}

/** a stepped hill: columns `step` wide whose tops follow smoothed noise */
function Ridge({ w, base, amp, step = 4, color, seed, bottom }) {
  const r = rng(seed), pts = Array.from({ length: Math.ceil(w / step) + 3 }, () => r()), cols = [];
  for (let i = 0; i * step < w; i++) {
    const top = Math.round(base - ((pts[i] + pts[i + 1] * 2 + pts[i + 2]) / 4) * amp);
    cols.push(<rect key={i} x={i * step} y={top} width={step} height={bottom - top} fill={color} />);
  }
  return <g>{cols}</g>;
}

function Flowers({ w, y0, y1, n, seed }) {
  const r = rng(seed), cols = ["#FFFFFF", "#FFE45C", "#FFB3D1"];
  return <g>{Array.from({ length: n }, (_, i) => {
    const x = Math.round(4 + r() * (w - 8)), y = Math.round(y0 + r() * (y1 - y0)), c = cols[i % 3];
    return <g key={i}><rect x={x} y={y - 1} width={1} height={3} fill={c} /><rect x={x - 1} y={y} width={3} height={1} fill={c} /></g>;
  })}</g>;
}

const SKYLINES = {
  blue: ["#BFE9FF", "#8DD4FA", "#18A8F5"], violet: ["#DCD0FF", "#C2B0FD", "#A78BFA"],
  green: ["#D9F5BC", "#B5EC85", "#8BE34A"], amber: ["#FFEBB0", "#FFD34E", "#FF794A"],
};

/** sky, clouds, sun, a pixel city, hills and a flowered field; props stand on the field */
function Landscape({ w, h, ground, seed, tint = "blue", city = true }) {
  const r = rng(seed + 3), tones = SKYLINES[tint], blds = [];
  if (city) for (let x = 2, i = 0; x < w - 10; i++) {
    const bw = 10 + Math.round(r() * 10), bh = 14 + Math.round(r() * 26);
    blds.push(<Building key={x} x={x} w={bw} h={bh} base={ground - 6} body={tones[i % 2]} roof={tones[2]} />);
    x += bw + 3 + Math.round(r() * 8);
  }
  return (
    <>
      <rect width={w} height={h} fill="#00C7E8" /><rect y={ground * 0.55} width={w} height={h} fill="#18A8F5" opacity={0.3} />
      <Sprite x={18 + (seed % 5) * 8} y={10} rows={SPRITES.cloud} /><Sprite x={w * 0.45} y={6} rows={SPRITES.cloud} /><Sprite x={w - 44} y={8} rows={SPRITES.sun} />
      {city && <g opacity={0.9}>{blds}</g>}
      <Ridge w={w} base={ground - 2} amp={8} color="#3FAE4A" seed={seed} bottom={h} />
      <rect y={ground} width={w} height={h - ground} fill="#C6F27A" />
      <Flowers w={w} y0={ground + 4} y1={h - 2} n={Math.round(w / 6)} seed={seed + 1} />
    </>
  );
}

export function Scene({ w, h, label, children, className = "", cover = false }) {
  // cover: fill a fixed-size box and crop the edges, like object-fit: cover
  return <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio={cover ? "xMidYMax slice" : undefined} className={`pixel-art block w-full ${cover ? "h-full" : "h-auto"} ${className}`} shapeRendering="crispEdges" role="img" aria-label={label}>{children}</svg>;
}

/** stands a sprite on the ground line */
const Prop = ({ name, x, ground, s = 2, pal, lift = 0 }) => <Sprite x={x} y={ground - SPRITES[name].length * s - lift} rows={SPRITES[name]} s={s} pal={pal} />;

/** the brand mark: the owl in its nest on a stack of books */
function OwlNest({ x, ground, s = 2 }) {
  const booksH = SPRITES.books.length * s, nestH = SPRITES.nest.length * s;
  return (
    <g>
      <Prop name="books" x={x} ground={ground} s={s} />
      <Prop name="owl" x={x + 2 * s} ground={ground} s={s} lift={booksH + nestH - 3 * s} />
      <Prop name="nest" x={x - s} ground={ground} s={s} lift={booksH - s} />
    </g>
  );
}

/** per-section scenes: [prop, x] pairs on a 320×120 field; the owl is always there */
const KINDS = {
  home: { tint: "blue", label: "A pixel-art city at midday: the MimirNest owl sits in its nest on a stack of books, between a laptop, a trophy, a map and a flag", props: [["laptop", 40], ["trophy", 120], ["map", 218], ["flag", 278]] },
  study: { tint: "green", label: "A pixel-art field with the MimirNest owl, a clock, a calculator and a keyboard", props: [["clock", 36], ["calc", 86], ["keyboard", 214], ["star", 284]] },
  prepare: { tint: "blue", label: "A pixel-art city with the MimirNest owl, a laptop of code, a server rack and a trophy", props: [["server", 30], ["laptop", 70], ["trophy", 212], ["flag", 272]] },
  build: { tint: "amber", label: "A pixel-art building site with the MimirNest owl, stacked blocks and a route map", props: [["blocks", 30], ["map", 82], ["laptop", 204], ["flag", 276]] },
  learn: { tint: "violet", label: "A pixel-art campus with the MimirNest owl, a graduation cap and books", props: [["cap", 36], ["doc", 90], ["books", 210], ["star", 278]] },
  resources: { tint: "amber", label: "A pixel-art street with the MimirNest owl, an envelope, a gift and coins", props: [["envelope", 34], ["gift", 88], ["coin", 214], ["coin", 236], ["coin", 258]] },
  project: { tint: "violet", label: "A pixel-art city with the MimirNest owl, a shield, a document and a chat bubble", props: [["shield", 36], ["doc", 84], ["chat", 212], ["flag", 276]] },
  arena: { tint: "blue", label: "A pixel-art city with the MimirNest owl, a laptop and a bug to squash", props: [["bug", 40], ["laptop", 76], ["server", 214], ["bug", 268]] },
  interview: { tint: "violet", label: "A pixel-art city with the MimirNest owl, a laptop and chat bubbles", props: [["chat", 34], ["laptop", 74], ["chat", 214], ["trophy", 270]] },
};

export function PixelScene({ kind = "home", h = 120, className = "", cover = false }) {
  const k = KINDS[kind] ?? KINDS.home, w = 320, ground = h - 22;
  return (
    <Scene w={w} h={h} label={k.label} className={className} cover={cover}>
      <Landscape w={w} h={h} ground={ground} seed={kind.length * 7} tint={k.tint} />
      {k.props.map(([name, x], i) => <Prop key={i} name={name} x={x} ground={ground + 2} />)}
      <OwlNest x={146} ground={ground + 2} />
    </Scene>
  );
}

/** a thin landscape used as a section divider */
export function PixelStrip({ seed = 5, tint = "blue" }) {
  return (
    <Scene w={320} h={40} label="A thin pixel-art landscape: sky, a cloud, a small city and a lime field">
      <Landscape w={320} h={40} ground={32} seed={seed} tint={tint} city={false} />
    </Scene>
  );
}

const ICON_PAL = { cloud: { W: "#29A9F5", b: "#087BCB" } };
export const ICON_NAMES = Object.keys(SPRITES);

/** a small pixel icon, centred in a square viewBox */
export function PixelIcon({ name, size = 28, className = "" }) {
  const rows = SPRITES[name] ?? SPRITES.star;
  const w = Math.max(...rows.map(r => r.length)), h = rows.length, side = Math.max(w, h);
  return (
    <svg viewBox={`${-(side - w) / 2} ${-(side - h) / 2} ${side} ${side}`} width={size} height={size} shapeRendering="crispEdges" aria-hidden className={`pixel-art shrink-0 ${className}`}>
      <Sprite rows={rows} pal={ICON_PAL[name]} />
    </svg>
  );
}

export function Logo({ size = 24 }) {
  return <img src="/logo/logo.png" width={size} height={size} alt="" aria-hidden className="shrink-0" />;
}
