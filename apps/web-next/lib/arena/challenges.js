import fs from "fs";
import path from "path";

// Challenges live at the repo root (frontend/challenges); Next runs with cwd = apps/web-next.
const CHALLENGES_DIR = path.join(process.cwd(), "..", "..", "challenges");

// Only these are mounted into the browser sandbox; everything else (e.g. .solution/) stays server-side.
const MOUNT_ROOTS = ["package.json", "package-lock.json", "src", "test", "__graders__", "tickets"];
const RUNNABLE_LANGUAGES = ["typescript", "javascript"];

// shortcut: mimir.yaml is flat `key: value` pairs; switch to a real YAML parser if it ever nests.
function parseFlatYaml(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

function readTicket(dir, incidentId) {
  const file = path.join(dir, "tickets", `${incidentId}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function readMeta(slug) {
  const dir = path.join(CHALLENGES_DIR, slug);
  const yamlPath = path.join(dir, "mimir.yaml");
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(yamlPath)) return null;
  const y = parseFlatYaml(fs.readFileSync(yamlPath, "utf8"));
  const ticket = readTicket(dir, y.incident_id);
  return {
    slug,
    incidentId: y.incident_id,
    title: y.title,
    severity: y.severity,
    bugClass: y.bug_class,
    language: y.language,
    difficulty: y.difficulty,
    estimatedMinutes: Number(y.estimated_minutes),
    mode: y.mode,
    visibleTestCmd: y.visible_test_cmd,
    hiddenTestCmd: y.hidden_test_cmd,
    postmortemSlug: y.postmortem_slug,
    report: ticket.split(/\r?\n/)[0] ?? "",
    live: RUNNABLE_LANGUAGES.includes(y.language) && fs.existsSync(path.join(dir, "package.json")),
  };
}

export function listChallenges() {
  if (!fs.existsSync(CHALLENGES_DIR)) return [];
  return fs
    .readdirSync(CHALLENGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => readMeta(d.name))
    .filter(Boolean)
    .sort((a, b) => Number(b.live) - Number(a.live) || a.incidentId.localeCompare(b.incidentId));
}

export const getChallengeMeta = readMeta;

/** Meta + ticket markdown + every mountable file as { "src/limiter.ts": "..." }. */
export function getChallenge(slug) {
  const meta = readMeta(slug);
  if (!meta?.live) return null;
  const dir = path.join(CHALLENGES_DIR, slug);
  const files = {};
  const walk = (rel) => {
    const abs = path.join(dir, rel);
    if (!fs.existsSync(abs)) return;
    if (fs.statSync(abs).isDirectory()) {
      for (const name of fs.readdirSync(abs)) walk(path.posix.join(rel, name));
    } else {
      files[rel] = fs.readFileSync(abs, "utf8");
    }
  };
  MOUNT_ROOTS.forEach(walk);
  return { meta, ticket: readTicket(dir, meta.incidentId), files };
}
