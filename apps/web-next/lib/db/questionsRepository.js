import path from "node:path";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";

let dbInstance = null;
let cachedJsonQuestions = null;

function getDb() {
  if (dbInstance) return dbInstance;

  const dbPath = path.resolve(process.cwd(), "lib", "db", "interview_prep.db");
  if (fs.existsSync(dbPath)) {
    try {
      dbInstance = new DatabaseSync(dbPath, { open: true });
      return dbInstance;
    } catch (err) {
      console.warn("Failed to open SQLite database directly, falling back to JSON:", err.message);
    }
  }
  return null;
}

function getJsonFallback() {
  if (cachedJsonQuestions) return cachedJsonQuestions;

  const jsonPaths = [
    path.resolve(process.cwd(), "public", "content", "interview-prep", "questions.json"),
    path.resolve(process.cwd(), "..", "api", "content", "interview-prep", "questions.json"),
  ];

  for (const p of jsonPaths) {
    if (fs.existsSync(p)) {
      try {
        const raw = fs.readFileSync(p, "utf-8");
        cachedJsonQuestions = JSON.parse(raw);
        return cachedJsonQuestions;
      } catch (e) {
        console.warn(`Error reading JSON from ${p}:`, e.message);
      }
    }
  }

  return [];
}

export const questionsRepository = {
  /**
   * Dynamic combinable query across all dimensions with search
   */
  queryQuestions({
    company,
    category,
    difficulty,
    industry,
    role,
    interview_stage,
    q,
    limit = 100,
    offset = 0,
    sort = "question_id ASC",
  } = {}) {
    const db = getDb();

    if (db) {
      const conditions = [];
      const params = [];

      if (company && company !== "all") {
        conditions.push("company = ?");
        params.push(company);
      }
      if (category && category !== "all") {
        conditions.push("category = ?");
        params.push(category);
      }
      if (difficulty && difficulty !== "all") {
        conditions.push("difficulty = ?");
        params.push(difficulty);
      }
      if (industry && industry !== "all") {
        conditions.push("industry = ?");
        params.push(industry);
      }
      if (role && role !== "all") {
        conditions.push("role = ?");
        params.push(role);
      }
      if (interview_stage && interview_stage !== "all") {
        conditions.push("interview_stage = ?");
        params.push(interview_stage);
      }
      if (q && q.trim()) {
        const term = `%${q.trim()}%`;
        conditions.push(
          "(question LIKE ? OR company LIKE ? OR category LIKE ? OR skills LIKE ? OR tags LIKE ?)"
        );
        params.push(term, term, term, term, term);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

      // Total count query
      const countStmt = db.prepare(`SELECT COUNT(*) as count FROM questions ${whereClause}`);
      const countResult = countStmt.get(...params);
      const total = countResult ? countResult.count : 0;

      // Sanitized order by
      const safeSort = ["id ASC", "id DESC", "question_id ASC", "question_id DESC", "difficulty ASC"].includes(sort)
        ? sort
        : "question_id ASC";

      // Paged select
      const selectSql = `
        SELECT * FROM questions
        ${whereClause}
        ORDER BY ${safeSort}
        LIMIT ? OFFSET ?
      `;
      const selectStmt = db.prepare(selectSql);
      const rows = selectStmt.all(...params, Number(limit), Number(offset));

      return {
        questions: rows,
        total,
        limit: Number(limit),
        offset: Number(offset),
      };
    }

    // JSON fallback for environments where SQLite file is unavailable
    let data = [...getJsonFallback()];

    if (company && company !== "all") {
      data = data.filter((item) => item.company.toLowerCase() === company.toLowerCase());
    }
    if (category && category !== "all") {
      data = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    if (difficulty && difficulty !== "all") {
      data = data.filter((item) => item.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    if (industry && industry !== "all") {
      data = data.filter((item) => item.industry.toLowerCase() === industry.toLowerCase());
    }
    if (role && role !== "all") {
      data = data.filter((item) => item.role.toLowerCase() === role.toLowerCase());
    }
    if (interview_stage && interview_stage !== "all") {
      data = data.filter((item) => item.interview_stage.toLowerCase() === interview_stage.toLowerCase());
    }
    if (q && q.trim()) {
      const query = q.trim().toLowerCase();
      data = data.filter((item) =>
        (item.question || "").toLowerCase().includes(query) ||
        (item.company || "").toLowerCase().includes(query) ||
        (item.category || "").toLowerCase().includes(query) ||
        (item.skills || "").toLowerCase().includes(query) ||
        (item.tags || "").toLowerCase().includes(query)
      );
    }

    const total = data.length;
    const paged = data.slice(Number(offset), Number(offset) + Number(limit));

    return {
      questions: paged,
      total,
      limit: Number(limit),
      offset: Number(offset),
    };
  },

  /**
   * Get single question by question_id (e.g. MIMIR-0001)
   */
  getQuestionById(questionId) {
    if (!questionId) return null;
    const db = getDb();

    if (db) {
      const stmt = db.prepare("SELECT * FROM questions WHERE question_id = ? OR id = ? LIMIT 1");
      const row = stmt.get(questionId, Number(questionId) || 0);
      return row || null;
    }

    const all = getJsonFallback();
    return all.find(
      (q) => q.question_id?.toLowerCase() === questionId.toLowerCase() || String(q.id) === String(questionId)
    ) || null;
  },

  /**
   * Get aggregated companies for the Company browsing section
   * Returns all 20 companies with metadata, industry, question counts, categories, and difficulty distribution
   */
  getCompanies() {
    const db = getDb();
    if (db) {
      const rows = db.prepare(`
        SELECT
          company,
          company_industry,
          category,
          difficulty
        FROM questions
      `).all();

      const companyMap = new Map();

      for (const row of rows) {
        if (!companyMap.has(row.company)) {
          companyMap.set(row.company, {
            name: row.company,
            industry: row.company_industry,
            totalQuestions: 0,
            categories: new Set(),
            difficulties: { Easy: 0, Medium: 0, Hard: 0, Expert: 0 },
          });
        }
        const comp = companyMap.get(row.company);
        comp.totalQuestions++;
        if (row.category) comp.categories.add(row.category);
        if (comp.difficulties[row.difficulty] !== undefined) {
          comp.difficulties[row.difficulty]++;
        }
      }

      return Array.from(companyMap.values()).map((c) => ({
        ...c,
        categories: Array.from(c.categories),
      })).sort((a, b) => a.name.localeCompare(b.name));
    }

    // JSON fallback
    const all = getJsonFallback();
    const companyMap = new Map();
    for (const q of all) {
      if (!companyMap.has(q.company)) {
        companyMap.set(q.company, {
          name: q.company,
          industry: q.company_industry || q.industry,
          totalQuestions: 0,
          categories: new Set(),
          difficulties: { Easy: 0, Medium: 0, Hard: 0, Expert: 0 },
        });
      }
      const comp = companyMap.get(q.company);
      comp.totalQuestions++;
      if (q.category) comp.categories.add(q.category);
      if (comp.difficulties[q.difficulty] !== undefined) {
        comp.difficulties[q.difficulty]++;
      }
    }

    return Array.from(companyMap.values()).map((c) => ({
      ...c,
      categories: Array.from(c.categories),
    })).sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Get dynamic distinct filter options
   */
  getFilterOptions() {
    const db = getDb();
    if (db) {
      const companies = db.prepare("SELECT DISTINCT company FROM questions ORDER BY company ASC").all().map((r) => r.company);
      const categories = db.prepare("SELECT DISTINCT category FROM questions ORDER BY category ASC").all().map((r) => r.category);
      const difficulties = ["Easy", "Medium", "Hard", "Expert"];
      const industries = db.prepare("SELECT DISTINCT industry FROM questions ORDER BY industry ASC").all().map((r) => r.industry);
      const roles = db.prepare("SELECT DISTINCT role FROM questions ORDER BY role ASC").all().map((r) => r.role);
      const stages = db.prepare("SELECT DISTINCT interview_stage FROM questions ORDER BY interview_stage ASC").all().map((r) => r.interview_stage);

      return { companies, categories, difficulties, industries, roles, stages };
    }

    const all = getJsonFallback();
    return {
      companies: Array.from(new Set(all.map((q) => q.company))).sort(),
      categories: Array.from(new Set(all.map((q) => q.category))).sort(),
      difficulties: ["Easy", "Medium", "Hard", "Expert"],
      industries: Array.from(new Set(all.map((q) => q.industry))).sort(),
      roles: Array.from(new Set(all.map((q) => q.role))).sort(),
      stages: Array.from(new Set(all.map((q) => q.interview_stage))).sort(),
    };
  },

  /**
   * Get dashboard statistics
   */
  getStats() {
    const db = getDb();
    if (db) {
      const totalRow = db.prepare("SELECT COUNT(*) as count FROM questions").get();
      const companyCount = db.prepare("SELECT COUNT(DISTINCT company) as count FROM questions").get();
      const diffRows = db.prepare("SELECT difficulty, COUNT(*) as count FROM questions GROUP BY difficulty").all();
      const catRows = db.prepare("SELECT category, COUNT(*) as count FROM questions GROUP BY category").all();
      const statusRows = db.prepare("SELECT quality_status, COUNT(*) as count FROM questions GROUP BY quality_status").all();

      const diffMap = { Easy: 0, Medium: 0, Hard: 0, Expert: 0 };
      for (const r of diffRows) {
        if (diffMap[r.difficulty] !== undefined) diffMap[r.difficulty] = r.count;
      }

      const catMap = {};
      for (const r of catRows) {
        catMap[r.category] = r.count;
      }

      const statusMap = {};
      for (const r of statusRows) {
        statusMap[r.quality_status] = r.count;
      }

      return {
        totalQuestions: totalRow.count,
        totalCompanies: companyCount.count,
        difficultyBreakdown: diffMap,
        categoryBreakdown: catMap,
        qualityStatusBreakdown: statusMap,
      };
    }

    const all = getJsonFallback();
    const diffMap = { Easy: 0, Medium: 0, Hard: 0, Expert: 0 };
    const catMap = {};
    const statusMap = {};
    for (const q of all) {
      if (diffMap[q.difficulty] !== undefined) diffMap[q.difficulty]++;
      catMap[q.category] = (catMap[q.category] || 0) + 1;
      statusMap[q.quality_status] = (statusMap[q.quality_status] || 0) + 1;
    }

    return {
      totalQuestions: all.length,
      totalCompanies: new Set(all.map((q) => q.company)).size,
      difficultyBreakdown: diffMap,
      categoryBreakdown: catMap,
      qualityStatusBreakdown: statusMap,
    };
  },
};
