/**
 * Reseed SQLite database from the updated questions.json
 * Run with: node lib/db/reseed-from-json.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsonPath = path.resolve(__dirname, "..", "..", "..", "api", "content", "interview-prep", "questions.json");
console.log("Reading JSON from:", jsonPath);

if (!fs.existsSync(jsonPath)) {
  throw new Error("questions.json not found at: " + jsonPath);
}

const records = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
console.log(`Loaded ${records.length} records.`);

const dbPath = path.resolve(__dirname, "interview_prep.db");
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log("Deleted old DB.");
}

const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT UNIQUE NOT NULL,
    company TEXT NOT NULL,
    company_industry TEXT NOT NULL,
    role TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    industry TEXT NOT NULL,
    question TEXT NOT NULL,
    short_answer TEXT DEFAULT '',
    detailed_answer TEXT DEFAULT '',
    strong_answer_signals TEXT DEFAULT '',
    common_mistakes TEXT DEFAULT '',
    follow_ups TEXT DEFAULT '',
    evaluation_rubric TEXT DEFAULT '',
    skills TEXT DEFAULT '',
    tags TEXT DEFAULT '',
    interview_stage TEXT DEFAULT '',
    expected_time TEXT DEFAULT '',
    source TEXT DEFAULT '',
    license_usage_rights TEXT DEFAULT '',
    quality_status TEXT DEFAULT 'draft_review_required',
    last_reviewed TEXT DEFAULT ''
  );
  CREATE INDEX IF NOT EXISTS idx_questions_company ON questions(company);
  CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
  CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
  CREATE INDEX IF NOT EXISTS idx_questions_industry ON questions(industry);
  CREATE INDEX IF NOT EXISTS idx_questions_role ON questions(role);
  CREATE INDEX IF NOT EXISTS idx_questions_quality_status ON questions(quality_status);
`);

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO questions (
    question_id, company, company_industry, role, category, subcategory,
    difficulty, industry, question, short_answer, detailed_answer,
    strong_answer_signals, common_mistakes, follow_ups, evaluation_rubric,
    skills, tags, interview_stage, expected_time, source,
    license_usage_rights, quality_status, last_reviewed
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Serialize arrays as JSON strings for storage
function serialize(val) {
  if (Array.isArray(val)) return JSON.stringify(val);
  if (val == null) return "";
  return String(val);
}

db.exec("BEGIN TRANSACTION;");
for (const q of records) {
  insertStmt.run(
    q.question_id || "",
    q.company || "",
    q.company_industry || "",
    q.role || "",
    q.category || "",
    q.subcategory || "",
    q.difficulty || "",
    q.industry || "",
    q.question || "",
    serialize(q.short_answer),
    serialize(q.detailed_answer),
    serialize(q.strong_answer_signals),
    serialize(q.common_mistakes),
    serialize(q.follow_ups),
    serialize(q.evaluation_rubric),
    serialize(q.skills),
    serialize(q.tags),
    serialize(q.interview_stage),
    serialize(q.expected_time),
    serialize(q.source),
    serialize(q.license_usage_rights),
    q.quality_status || "ai_draft_review_required",
    serialize(q.last_reviewed)
  );
}
db.exec("COMMIT;");

console.log(`Inserted ${records.length} records into ${dbPath}`);

// Also mirror to public/content for JSON fallback
const publicDir = path.resolve(__dirname, "..", "..", "public", "content", "interview-prep");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "questions.json"), JSON.stringify(records, null, 2), "utf-8");
console.log("Mirrored to public/content/interview-prep/questions.json");

// Verify
const check = db.prepare("SELECT COUNT(*) as cnt, COUNT(CASE WHEN short_answer != '' THEN 1 END) as answered FROM questions").get();
console.log(`\nVerification: total=${check.cnt}, with_answers=${check.answered}`);
