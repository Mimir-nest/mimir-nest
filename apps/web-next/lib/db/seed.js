import fs from "node:fs";
import path from "node:path";
import { parse } from "node:path";
import { DatabaseSync } from "node:sqlite";

// CSV parser supporting quoted strings and multiline text
function parseCSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        insideQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentField);
        currentField = "";
      } else if (char === "\r" && nextChar === "\n") {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
        i++;
      } else if (char === "\n" || char === "\r") {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map((h) => h.trim().replace(/^\uFEFF/, ""));
  const data = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 1 && row[0].trim() === "") continue;
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c] !== undefined ? row[c].trim() : "";
    }
    data.push(obj);
  }

  return data;
}

export function seedDatabase() {
  const csvPath = "C:\\Users\\moham\\Downloads\\mimirnest_first_400_company_questions.csv";
  console.log(`Reading CSV dataset from: ${csvPath}`);

  if (!fs.existsSync(csvPath)) {
    throw new Error(`Source CSV not found at ${csvPath}`);
  }

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const records = parseCSV(csvContent);
  console.log(`Parsed ${records.length} records from CSV.`);

  if (records.length !== 400) {
    console.warn(`Warning: Expected 400 records, got ${records.length}`);
  }

  // Ensure directories exist
  const dbDir = path.resolve(process.cwd(), "lib", "db");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.resolve(dbDir, "interview_prep.db");
  if (fs.existsSync(dbPath)) {
    try {
      fs.unlinkSync(dbPath);
    } catch (e) {
      console.warn("Could not delete existing DB file, will overwrite table:", e.message);
    }
  }

  const db = new DatabaseSync(dbPath);

  // Create table schema supporting all 23 fields
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
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?
    )
  `);

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
      q.short_answer || "",
      q.detailed_answer || "",
      q.strong_answer_signals || "",
      q.common_mistakes || "",
      q.follow_ups || "",
      q.evaluation_rubric || "",
      q.skills || "",
      q.tags || "",
      q.interview_stage || "",
      q.expected_time || "",
      q.source || "",
      q.license_usage_rights || "",
      q.quality_status || "draft_review_required",
      q.last_reviewed || ""
    );
  }
  db.exec("COMMIT;");

  console.log(`Successfully inserted ${records.length} records into SQLite database at: ${dbPath}`);

  // Also write to web-next public/content/interview-prep/questions.json
  const publicContentDir = path.resolve(process.cwd(), "public", "content", "interview-prep");
  if (!fs.existsSync(publicContentDir)) {
    fs.mkdirSync(publicContentDir, { recursive: true });
  }
  fs.writeFileSync(
    path.resolve(publicContentDir, "questions.json"),
    JSON.stringify(records, null, 2),
    "utf-8"
  );
  console.log(`Saved JSON mirror to: ${path.resolve(publicContentDir, "questions.json")}`);

  // Also write to apps/api/content/interview-prep/questions.json if apps/api exists
  const apiContentDir = path.resolve(process.cwd(), "..", "api", "content", "interview-prep");
  if (fs.existsSync(path.resolve(process.cwd(), "..", "api"))) {
    if (!fs.existsSync(apiContentDir)) {
      fs.mkdirSync(apiContentDir, { recursive: true });
    }
    fs.writeFileSync(
      path.resolve(apiContentDir, "questions.json"),
      JSON.stringify(records, null, 2),
      "utf-8"
    );
    console.log(`Saved API content mirror to: ${path.resolve(apiContentDir, "questions.json")}`);
  }

  return { total: records.length, dbPath };
}

// Execute if run directly
seedDatabase();
