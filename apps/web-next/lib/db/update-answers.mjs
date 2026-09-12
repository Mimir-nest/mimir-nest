/**
 * Update answers in existing SQLite DB from questions.json (no delete needed)
 * Run with: node lib/db/update-answers.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsonPath = path.resolve(__dirname, "..", "..", "..", "api", "content", "interview-prep", "questions.json");
console.log("Reading JSON from:", jsonPath);

const records = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
console.log(`Loaded ${records.length} records.`);

const dbPath = path.resolve(__dirname, "interview_prep.db");
const db = new DatabaseSync(dbPath, { open: true });

function serialize(val) {
  if (Array.isArray(val)) return JSON.stringify(val);
  if (val == null) return "";
  return String(val);
}

const updateStmt = db.prepare(`
  UPDATE questions SET
    short_answer = ?,
    detailed_answer = ?,
    strong_answer_signals = ?,
    common_mistakes = ?,
    follow_ups = ?,
    evaluation_rubric = ?,
    quality_status = ?
  WHERE question_id = ?
`);

db.exec("BEGIN TRANSACTION;");
let updated = 0;
for (const q of records) {
  const result = updateStmt.run(
    serialize(q.short_answer),
    serialize(q.detailed_answer),
    serialize(q.strong_answer_signals),
    serialize(q.common_mistakes),
    serialize(q.follow_ups),
    serialize(q.evaluation_rubric),
    q.quality_status || "ai_draft_review_required",
    q.question_id
  );
  if (result.changes > 0) updated++;
}
db.exec("COMMIT;");

console.log(`Updated ${updated} rows in ${dbPath}`);

// Verify
const check = db.prepare(`
  SELECT 
    COUNT(*) as total,
    COUNT(CASE WHEN short_answer != '' AND short_answer != '""' THEN 1 END) as answered
  FROM questions
`).get();
console.log(`Verification: total=${check.total}, with_answers=${check.answered}`);

// Sample check
const sample = db.prepare("SELECT question_id, short_answer FROM questions WHERE question_id = 'MIMIR-0001'").get();
console.log("\nSample MIMIR-0001 short_answer (first 100 chars):");
console.log((sample?.short_answer || "").substring(0, 100));

// Mirror to public/content
const publicDir = path.resolve(__dirname, "..", "..", "public", "content", "interview-prep");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "questions.json"), JSON.stringify(records, null, 2), "utf-8");
console.log("\nMirrored to public/content/interview-prep/questions.json");
