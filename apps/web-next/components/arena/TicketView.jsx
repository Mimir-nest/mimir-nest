import { parseBlocks, parseInline } from "@/lib/arena/markdown";

function Inline({ text }) {
  return parseInline(text).map((s, i) =>
    s.type === "code" ? (
      <code key={i} className="font-mono text-[12px] px-1 rounded bg-surface-container-high text-mn-primary">
        {s.text}
      </code>
    ) : s.type === "bold" ? (
      <strong key={i} className="font-semibold text-mn-primary">
        {s.text}
      </strong>
    ) : (
      s.text
    ),
  );
}

/** Renders an incident ticket (markdown) as the question panel. */
export default function TicketView({ markdown }) {
  return (
    <article className="space-y-3 text-[13px] leading-relaxed text-on-surface-variant">
      {parseBlocks(markdown).map((b, i) => {
        const text = b.lines.join(" ");
        switch (b.type) {
          case "heading":
            return b.level <= 2 ? (
              <h2 key={i} className="text-base font-semibold text-mn-primary">
                <Inline text={text} />
              </h2>
            ) : (
              <h3 key={i} className="pt-2 font-label-caps text-[11px] uppercase tracking-widest text-mn-primary">
                <Inline text={text} />
              </h3>
            );
          case "code":
            return (
              <pre key={i} className="overflow-x-auto rounded-md border border-outline-variant bg-mn-background p-2 font-mono text-[11px] leading-snug">
                {b.lines.join("\n")}
              </pre>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-2 border-surface-tint/60 pl-3 italic">
                <Inline text={text} />
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="list-disc space-y-1 pl-5">
                {b.lines.map((l, j) => (
                  <li key={j}>
                    <Inline text={l} />
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i}>
                <Inline text={text} />
              </p>
            );
        }
      })}
    </article>
  );
}
