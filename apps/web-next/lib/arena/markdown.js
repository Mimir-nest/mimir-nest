// shortcut: covers only what incident tickets use (headings, paragraphs, > quotes, - lists, ``` code, **bold**, `code`); swap for react-markdown if tickets grow tables/links.

/** Markdown -> [{ type: "heading"|"paragraph"|"quote"|"list"|"code", level?, lines }] */
export function parseBlocks(md) {
  const blocks = [];
  let open = null; // block that following lines of the same type merge into
  const lines = md.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    if (line.startsWith("```")) {
      const code = [];
      while (++i < lines.length && !lines[i].startsWith("```")) code.push(lines[i]);
      blocks.push({ type: "code", lines: code });
      open = null;
    } else if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      blocks.push({ type: "heading", level: m[1].length, lines: [m[2]] });
      open = null;
    } else if (!line.trim()) {
      open = null;
    } else {
      const quote = line.match(/^>\s?(.*)$/);
      const item = line.match(/^\s*[-*]\s+(.*)$/);
      const type = quote ? "quote" : item ? "list" : "paragraph";
      const text = quote ? quote[1] : item ? item[1] : line;
      if (open?.type === type) open.lines.push(text);
      else blocks.push((open = { type, lines: [text] }));
    }
  }
  return blocks;
}

/** "a **b** `c`" -> [{ type: "text"|"bold"|"code", text }] */
export function parseInline(text) {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/)
    .filter(Boolean)
    .map((part) =>
      part.length > 4 && part.startsWith("**") && part.endsWith("**")
        ? { type: "bold", text: part.slice(2, -2) }
        : part.length > 2 && part.startsWith("`") && part.endsWith("`")
          ? { type: "code", text: part.slice(1, -1) }
          : { type: "text", text: part },
    );
}
