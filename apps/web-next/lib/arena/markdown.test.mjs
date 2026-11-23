// node --test lib/arena/markdown.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseBlocks, parseInline } from "./markdown.js";

test("parseBlocks groups ticket markdown into blocks", () => {
  const md = "Intro line\n\n### Log\n\n```\na\n\nb\n```\n\n> q1\n> q2\n\n- one\n- two\n";
  assert.deepEqual(parseBlocks(md), [
    { type: "paragraph", lines: ["Intro line"] },
    { type: "heading", level: 3, lines: ["Log"] },
    { type: "code", lines: ["a", "", "b"] },
    { type: "quote", lines: ["q1", "q2"] },
    { type: "list", lines: ["one", "two"] },
  ]);
});

test("parseInline splits bold and code", () => {
  assert.deepEqual(parseInline("x **b** `c` y"), [
    { type: "text", text: "x " },
    { type: "bold", text: "b" },
    { type: "text", text: " " },
    { type: "code", text: "c" },
    { type: "text", text: " y" },
  ]);
});
