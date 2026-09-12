"use client";

import { useCallback, useEffect, useRef, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  reconnectEdge,
  useReactFlow,
} from "@xyflow/react";
import {
  ArrowLeftRight,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cloud,
  Database,
  FileBox,
  GitBranch,
  Globe,
  HardDrive,
  Layers3,
  MessageSquare,
  MoreHorizontal,
  Network,
  Pencil,
  Plus,
  Redo2,
  RotateCcw,
  Save,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TerminalSquare,
  Trash2,
  Undo2,
  X,
  Zap,
  Activity,
  DollarSign,
  AlertCircle,
  ExternalLink,
  Award,
} from "lucide-react";
import {
  getProblemBySlug,
  calculateArchitectureCost,
  systemDesignProblems,
} from "../system-design/data/problems";

const icons = {
  browser: Globe,
  mobile: Smartphone,
  desktop: TerminalSquare,
  dns: Network,
  cdn: Cloud,
  load_balancer: GitBranch,
  api_gateway: ArrowLeftRight,
  reverse_proxy: ArrowLeftRight,
  server: Server,
  backend: Boxes,
  microservice: Layers3,
  serverless: Zap,
  container: Boxes,
  postgres: Database,
  mysql: Database,
  mongodb: Database,
  sql: Database,
  nosql: Database,
  redis: Zap,
  memcached: Zap,
  kafka: MessageSquare,
  rabbitmq: MessageSquare,
  queue: MessageSquare,
  object_storage: FileBox,
  file_storage: HardDrive,
  auth: ShieldCheck,
  search: Search,
  external_api: Globe,
  custom: Sparkles,
};
const groups = [
  [
    "Client",
    [
      ["browser", "Browser", "Web Client"],
      ["mobile", "Mobile App", "Mobile Client"],
      ["desktop", "Desktop App", "Desktop Client"],
    ],
  ],
  [
    "Network",
    [
      ["dns", "DNS", "Name Resolution"],
      ["cdn", "CDN", "Edge Network"],
      ["load_balancer", "Load Balancer", "Traffic Router"],
      ["api_gateway", "API Gateway", "API Entry Point"],
      ["reverse_proxy", "Reverse Proxy", "Traffic Proxy"],
    ],
  ],
  [
    "Compute",
    [
      ["server", "Server", "Compute Instance"],
      ["backend", "Backend Service", "Application Service"],
      ["microservice", "Microservice", "Service Boundary"],
      ["serverless", "Serverless Function", "Event Function"],
      ["container", "Container", "Containerized App"],
    ],
  ],
  [
    "Database",
    [
      ["postgres", "PostgreSQL", "Relational Database"],
      ["mysql", "MySQL", "Relational Database"],
      ["mongodb", "MongoDB", "Document Database"],
      ["sql", "SQL Database", "Relational Database"],
      ["nosql", "NoSQL Database", "Non-relational Database"],
    ],
  ],
  [
    "Cache",
    [
      ["redis", "Redis", "In-memory Cache"],
      ["memcached", "Memcached", "Distributed Cache"],
    ],
  ],
  [
    "Messaging",
    [
      ["kafka", "Kafka", "Event Streaming"],
      ["rabbitmq", "RabbitMQ", "Message Broker"],
      ["queue", "Message Queue", "Async Queue"],
    ],
  ],
  [
    "Storage",
    [
      ["object_storage", "Object Storage", "Blob Storage"],
      ["file_storage", "File Storage", "File System"],
    ],
  ],
  [
    "Other",
    [
      ["auth", "Authentication Service", "Identity Provider"],
      ["search", "Search Engine", "Full-text Search"],
      ["external_api", "External API", "Third-party Service"],
      ["custom", "Custom Component", "System Component"],
    ],
  ],
];
const registry = Object.fromEntries(
  groups.flatMap(([category, items]) =>
    items.map(([type, label, subtitle]) => [
      type,
      { type, label, subtitle, category },
    ]),
  ),
);
const node = (id, type, position) => ({
  id,
  type: "system",
  position,
  data: { ...registry[type], description: "" },
});
const initialNodes = [
  node("browser", "browser", { x: 30, y: 210 }),
  node("lb", "load_balancer", { x: 290, y: 210 }),
  node("gateway", "api_gateway", { x: 550, y: 210 }),
  node("backend", "backend", { x: 810, y: 210 }),
  node("postgres", "postgres", { x: 1080, y: 80 }),
  node("redis", "redis", { x: 1080, y: 210 }),
  node("kafka", "kafka", { x: 1080, y: 340 }),
];
const initialEdges = [
  ["browser-lb", "browser", "lb", "HTTPS"],
  ["lb-gateway", "lb", "gateway", ""],
  ["gateway-backend", "gateway", "backend", "REST"],
  ["backend-postgres", "backend", "postgres", "Read / Write"],
  ["backend-redis", "backend", "redis", "TCP"],
  ["backend-kafka", "backend", "kafka", "Events"],
].map(([id, source, target, label]) => ({
  id,
  source,
  target,
  label,
  type: "smoothstep",
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed, color: "#ff7657" },
}));

function SystemDesignNode({ data, selected }) {
  const Icon = icons[data.type] || Sparkles;
  return (
    <div className={`sd-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Left} />
      <div className="sd-icon">
        <Icon size={16} />
      </div>
      <div>
        <strong>{data.label}</strong>
        <small>{data.subtitle}</small>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
const nodeTypes = { system: SystemDesignNode };
const defaultEdgeOptions = {
  type: "smoothstep",
  animated: true,
  reconnectable: true,
  markerEnd: { type: MarkerType.ArrowClosed, color: "#ff7657" },
};
const connectionLineStyle = {
  stroke: "#ffb09e",
  strokeWidth: 2,
  filter: "drop-shadow(0 0 5px #ff765799)",
};
const snapGrid = [20, 20];
const proOptions = { hideAttribution: true };
function Sidebar({ onAdd }) {
  const [query, setQuery] = useState("");
  const drag = (event, type) => {
    event.dataTransfer.setData("system-design", type);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside className="sidebar">
      <div className="side-title">
        <div>
          <em>LIBRARY</em>
          <h2>Components</h2>
        </div>
        <MoreHorizontal size={17} />
      </div>
      <label className="search">
        <Search size={14} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components"
        />
        <kbd>/</kbd>
      </label>
      <div className="component-list">
        {groups.map(([category, items]) => {
          const filtered = items.filter(([, label, subtitle]) =>
            `${label} ${subtitle}`.toLowerCase().includes(query.toLowerCase()),
          );
          if (!filtered.length) return null;
          return (
            <section key={category}>
              <div className="category">
                {category}
                <span>{filtered.length}</span>
              </div>
              {filtered.map(([type, label, subtitle]) => {
                const Icon = icons[type];
                return (
                  <button
                    key={type}
                    draggable
                    onDragStart={(event) => drag(event, type)}
                    onClick={() => onAdd(type)}
                  >
                    <i>
                      <Icon size={15} />
                    </i>
                    <span>
                      <b>{label}</b>
                      <small>{subtitle}</small>
                    </span>
                    <Plus className="plus" size={14} />
                  </button>
                );
              })}
            </section>
          );
        })}
      </div>
      <footer>
        <span /> Drag to add to canvas
      </footer>
    </aside>
  );
}
function Properties({ selection, onUpdate, onClose, onDelete }) {
  if (!selection) return null;
  const nodeSelected = selection.kind === "node";
  const item = selection.item;
  const Icon = nodeSelected ? icons[item.data.type] || Sparkles : null;
  return (
    <aside className="properties">
      <div className="side-title">
        <div>
          <em>INSPECTOR</em>
          <h2>{nodeSelected ? "Node properties" : "Connection properties"}</h2>
        </div>
        <button onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <div className="property-body">
        {nodeSelected ? (
          <>
            <div className="preview">
              <i>
                <Icon size={17} />
              </i>
              <div>
                <b>{item.data.label}</b>
                <small>{item.data.category}</small>
              </div>
            </div>
            <Field
              label="Name"
              value={item.data.label}
              update={(value) => onUpdate({ label: value })}
            />
            <Field
              label="Subtitle"
              value={item.data.subtitle}
              update={(value) => onUpdate({ subtitle: value })}
            />
            <label>
              Description
              <textarea
                value={item.data.description || ""}
                onChange={(event) =>
                  onUpdate({ description: event.target.value })
                }
                placeholder="Describe this component..."
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Connection label
              <select
                value={item.label || ""}
                onChange={(event) => onUpdate({ label: event.target.value })}
              >
                <option value="">No label</option>
                {[
                  "HTTP",
                  "HTTPS",
                  "REST",
                  "GraphQL",
                  "gRPC",
                  "WebSocket",
                  "TCP",
                  "Read",
                  "Write",
                  "Events",
                  "Async",
                ].map((label) => (
                  <option key={label}>{label}</option>
                ))}
              </select>
            </label>
            <label>
              Description
              <textarea
                value={item.data?.description || ""}
                onChange={(event) =>
                  onUpdate({ description: event.target.value })
                }
                placeholder="Describe this connection..."
              />
            </label>
          </>
        )}
        <button className="delete-property" onClick={onDelete}>
          <Trash2 size={14} />
          Delete {nodeSelected ? "node" : "connection"}
        </button>
      </div>
    </aside>
  );
}
function Field({ label, value, update }) {
  return (
    <label>
      {label}
      <input
        value={value || ""}
        onChange={(event) => update(event.target.value)}
      />
    </label>
  );
}
// ── Helper: Evaluate Architecture Constraints for Challenge ──
function evaluateChallengeConstraints(challenge, nodes, edges) {
  if (!challenge) return { allPassed: false, results: [], totalCost: 0 };

  const nodeTypes = new Set(nodes.map((n) => n.data?.type).filter(Boolean));
  const totalCost = calculateArchitectureCost(nodes);
  const results = [];

  // 1. Cost constraint
  const maxBudget = challenge.maxBudgetUsd || 5000;
  const costPassed = totalCost <= maxBudget && totalCost > 0;
  results.push({
    id: "cost",
    label: `Cost within budget ($${totalCost.toLocaleString()}/mo ≤ $${maxBudget.toLocaleString()}/mo)`,
    passed: costPassed,
  });

  // 2. Component tier requirements
  const reqTypes = challenge.validationRules?.requiredNodeTypes || [];
  reqTypes.forEach((reqType) => {
    let passed = false;
    let label = reqType;

    if (reqType === "load_balancer") {
      passed = nodeTypes.has("load_balancer") || nodeTypes.has("api_gateway") || nodeTypes.has("reverse_proxy");
      label = "Load Balancer / API Gateway";
    } else if (reqType === "backend") {
      passed = nodeTypes.has("backend") || nodeTypes.has("microservice") || nodeTypes.has("server") || nodeTypes.has("serverless") || nodeTypes.has("container");
      label = "Compute / Backend Service";
    } else if (reqType === "postgres") {
      passed = nodeTypes.has("postgres") || nodeTypes.has("mysql") || nodeTypes.has("sql") || nodeTypes.has("mongodb") || nodeTypes.has("nosql");
      label = "Database (SQL / NoSQL)";
    } else if (reqType === "redis") {
      passed = nodeTypes.has("redis") || nodeTypes.has("memcached");
      label = "In-Memory Cache (Redis / Memcached)";
    } else if (reqType === "kafka") {
      passed = nodeTypes.has("kafka") || nodeTypes.has("rabbitmq") || nodeTypes.has("queue");
      label = "Message Stream / Queue (Kafka / RabbitMQ)";
    } else if (reqType === "object_storage") {
      passed = nodeTypes.has("object_storage") || nodeTypes.has("file_storage");
      label = "Blob / Object Storage";
    } else if (reqType === "search") {
      passed = nodeTypes.has("search");
      label = "Search Engine Indexer";
    } else if (reqType === "cdn") {
      passed = nodeTypes.has("cdn");
      label = "CDN Edge Network";
    } else if (reqType === "dns") {
      passed = nodeTypes.has("dns");
      label = "DNS Service";
    } else if (reqType === "auth") {
      passed = nodeTypes.has("auth");
      label = "Authentication Service";
    } else {
      passed = nodeTypes.has(reqType);
      label = reqType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }

    results.push({
      id: `req-${reqType}`,
      label: `Includes ${label}`,
      passed,
    });
  });

  // 3. Minimum component threshold
  const minNodes = challenge.validationRules?.minNodes || 4;
  results.push({
    id: "min-nodes",
    label: `Contains at least ${minNodes} components (${nodes.length} placed)`,
    passed: nodes.length >= minNodes,
  });

  // 4. Edge connectivity
  const hasConnections = edges.length >= Math.max(2, Math.floor(nodes.length / 2));
  results.push({
    id: "connections",
    label: `Tier connectivity established (${edges.length} active connections)`,
    passed: hasConnections,
  });

  const allPassed = results.every((r) => r.passed);
  return { allPassed, results, totalCost };
}

// ── Challenge Overlay Panel ──
function ChallengePanel({ challenge, validation, onValidate, isCollapsed, setIsCollapsed }) {
  if (!challenge) return null;

  const passedCount = validation.results.filter((r) => r.passed).length;
  const totalCount = validation.results.length;

  if (isCollapsed) {
    return (
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3 p-2.5 px-3.5 rounded-xl bg-[#121617]/95 border border-[#293032] backdrop-blur-md shadow-2xl text-xs font-mono text-[#e9eeeb]">
        <div className="w-2 h-2 rounded-full bg-[#ff7657] animate-pulse" />
        <div className="flex items-center gap-2">
          <strong className="text-[#e1e7e3]">{challenge.title}</strong>
          <span className="text-[#687678]">·</span>
          <span className="text-emerald-400 font-semibold">{passedCount}/{totalCount} Passed</span>
        </div>
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-1 text-[#9aa6a5] hover:text-[#e1e7e3] transition-colors rounded hover:bg-white/5 border-none bg-transparent cursor-pointer"
          title="Expand Challenge Panel"
        >
          <ChevronDown size={15} />
        </button>
      </div>
    );
  }

  const maxBudget = challenge.maxBudgetUsd || 5000;
  const isOverBudget = validation.totalCost > maxBudget;

  return (
    <div className="absolute top-4 left-4 z-20 w-80 sm:w-96 rounded-2xl bg-[#121617]/95 border border-[#293032] backdrop-blur-md shadow-2xl overflow-hidden font-sans text-xs text-[#e9eeeb] max-h-[calc(100vh-140px)] flex flex-col">
      {/* Panel Header */}
      <div className="p-3.5 px-4 bg-[#161c1d] border-b border-[#293032] flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 truncate">
          <div className="w-2 h-2 rounded-full bg-[#ff7657] shrink-0" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff7657] font-semibold">
            {challenge.company} Challenge
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
            challenge.difficulty === "Easy"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : challenge.difficulty === "Hard"
              ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
          }`}>
            {challenge.difficulty}
          </span>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-[#9aa6a5] hover:text-[#e1e7e3] transition-colors rounded hover:bg-white/5 border-none bg-transparent cursor-pointer"
            title="Collapse Challenge Panel"
          >
            <ChevronUp size={15} />
          </button>
        </div>
      </div>

      {/* Challenge Title & Stats */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        <div>
          <h3 className="text-sm font-bold text-[#e1e7e3] tracking-tight">
            {challenge.title}
          </h3>
          <p className="text-[11px] text-[#9aa6a5] leading-relaxed mt-1">
            {challenge.description}
          </p>
        </div>

        {/* Live Scale & Budget */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className="p-2 rounded-lg bg-[#0c0f10] border border-[#293032]">
            <span className="text-[#687678] block mb-0.5">Scale SLA</span>
            <span className="text-[#e1e7e3] font-semibold truncate block" title={challenge.scale}>
              {challenge.scale.split("·")[0].trim()}
            </span>
          </div>

          <div className={`p-2 rounded-lg bg-[#0c0f10] border ${
            isOverBudget ? "border-rose-500/40 text-rose-400" : "border-[#293032] text-emerald-400"
          }`}>
            <span className="text-[#687678] block mb-0.5">Cost vs Budget</span>
            <span className="font-semibold block truncate">
              ${validation.totalCost.toLocaleString()} / {challenge.budget}
            </span>
          </div>
        </div>

        {/* Architecture Constraints List */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-[#9aa6a5]">
            <span className="uppercase tracking-wider">Architecture Constraints</span>
            <span className={validation.allPassed ? "text-emerald-400" : "text-[#ff7657]"}>
              {passedCount}/{totalCount}
            </span>
          </div>

          <div className="space-y-1.5">
            {validation.results.map((rule) => (
              <div
                key={rule.id}
                className={`p-2 px-2.5 rounded-lg border text-[11px] flex items-start gap-2 transition-all ${
                  rule.passed
                    ? "bg-emerald-500/5 border-emerald-500/25 text-[#e1e7e3]"
                    : "bg-[#0c0f10] border-[#293032] text-[#9aa6a5]"
                }`}
              >
                {rule.passed ? (
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-[#687678] shrink-0 mt-0.5" />
                )}
                <span className="leading-snug flex-1">{rule.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Validate / Complete Button */}
      <div className="p-3.5 bg-[#161c1d] border-t border-[#293032] flex items-center justify-between gap-2 shrink-0">
        <Link
          href={`/system-design/problems/${challenge.slug}`}
          className="text-[11px] font-mono text-[#9aa6a5] hover:text-[#e1e7e3] transition-colors"
        >
          View Specs ↗
        </Link>

        <button
          onClick={onValidate}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer border-none shadow-md ${
            validation.allPassed
              ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20"
              : "bg-[#ff7657] hover:bg-[#ff8a6f] text-black shadow-[#ff7657]/20"
          }`}
        >
          {validation.allPassed ? "Complete ✓" : "Validate"}
        </button>
      </div>
    </div>
  );
}

// ── Completion Success Modal ──
function CompletionModal({ challenge, validation, onClose, onNextChallenge }) {
  if (!challenge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-w-md w-full p-6 sm:p-7 rounded-2xl bg-[#121617] border border-[#293032] shadow-2xl space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
          <Award size={28} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Challenge Complete
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#e1e7e3] tracking-tight">
            {challenge.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#9aa6a5] leading-relaxed">
            All required architecture constraints, tier connectivity, and monthly cost thresholds have been successfully satisfied.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0c0f10] border border-[#293032] grid grid-cols-2 gap-2 text-xs font-mono">
          <div>
            <span className="text-[#687678] block text-[10px]">Monthly Architecture Cost</span>
            <span className="text-emerald-400 font-bold">
              ${validation.totalCost.toLocaleString()}/mo
            </span>
          </div>
          <div>
            <span className="text-[#687678] block text-[10px]">Constraints Passed</span>
            <span className="text-[#e1e7e3] font-bold">
              {validation.results.length}/{validation.results.length} (100%)
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-[#161c1d] hover:bg-[#1f2728] border border-[#293032] text-xs font-mono font-medium text-[#e1e7e3] transition-colors cursor-pointer"
          >
            Keep Designing
          </button>

          {onNextChallenge ? (
            <button
              onClick={onNextChallenge}
              className="w-full py-2.5 px-4 rounded-xl bg-[#ff7657] hover:bg-[#ff8a6f] text-black font-bold text-xs font-mono tracking-wider uppercase transition-all cursor-pointer border-none shadow-lg shadow-[#ff7657]/20"
            >
              Next Challenge →
            </button>
          ) : (
            <Link
              href="/system-design/problems"
              className="w-full py-2.5 px-4 rounded-xl bg-[#ff7657] hover:bg-[#ff8a6f] text-black font-bold text-xs font-mono tracking-wider uppercase transition-all text-center no-underline"
            >
              All Problems
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Toolbar({
  title,
  setTitle,
  undo,
  redo,
  canUndo,
  canRedo,
  onDelete,
  onSave,
  onFit,
  onZoom,
  activeChallenge,
}) {
  const Button = ({ label, children, ...props }) => (
    <button className="tool" title={label} {...props}>
      {children}
    </button>
  );
  return (
    <header>
      <div className="brand">
        <Link href="/" className="brand-link" aria-label="Go to Mimir Nest home">
          <img className="brand-logo" src="/logo/logo.png" alt="Mimir Nest" />
          <div>
            <b>Mimir <span>Nest</span></b>
            <small>Developer workspace</small>
          </div>
        </Link>
      </div>
      <div className="playground-heading">
        <strong>System Design Playground</strong>
        <small>{activeChallenge ? `${activeChallenge.title} Challenge` : "Architecture canvas"}</small>
      </div>
      <div className="diagram-title">
        <Pencil size={13} />
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <ChevronDown size={14} />
      </div>
      <div className="actions">
        {activeChallenge && (
          <Link
            href="/system-design/problems"
            className="px-3 py-1.5 rounded-lg bg-[#161c1d] border border-[#293032] text-xs font-mono text-[#9aa6a5] hover:text-[#e1e7e3] transition-colors no-underline hidden md:inline-flex items-center gap-1 mr-2"
          >
            <span>Challenges</span>
            <ExternalLink size={12} />
          </Link>
        )}
        <Button label="Undo" onClick={undo} disabled={!canUndo}>
          <Undo2 size={16} />
        </Button>
        <Button label="Redo" onClick={redo} disabled={!canRedo}>
          <Redo2 size={16} />
        </Button>
        <i />
        <Button label="Zoom in" onClick={() => onZoom(1.2)}>
          <Plus size={16} />
        </Button>
        <Button label="Zoom out" onClick={() => onZoom(0.8)}>
          <span className="minus">-</span>
        </Button>
        <Button label="Fit view" onClick={onFit}>
          <RotateCcw size={15} />
        </Button>
        <i />
        <Button label="Delete selected" onClick={onDelete}>
          <Trash2 size={16} />
        </Button>
        <button className="save" onClick={onSave}>
          <Save size={15} /> Save
        </button>
      </div>
    </header>
  );
}

function Editor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeSlug = searchParams.get("challenge");
  const activeChallenge = useMemo(() => {
    return challengeSlug ? getProblemBySlug(challengeSlug) : null;
  }, [challengeSlug]);

  const [nodes, setNodes] = useState(initialNodes);
  const [loading, setloading] = useState(false);
  const [edges, setEdges] = useState(initialEdges);
  const [title, setTitle] = useState(
    activeChallenge ? `${activeChallenge.title} Architecture` : "Checkout architecture"
  );
  const [selection, setSelection] = useState(null);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [saved, setSaved] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [isChallengePanelCollapsed, setIsChallengePanelCollapsed] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  const reactFlow = useReactFlow();
  const dragStart = useRef(null);
  const clipboard = useRef(null);

  // Live architecture validation against active challenge
  const validation = useMemo(() => {
    return evaluateChallengeConstraints(activeChallenge, nodes, edges);
  }, [activeChallenge, nodes, edges]);

  // Load starter nodes when challenge changes
  useEffect(() => {
    if (activeChallenge) {
      setTitle(`${activeChallenge.title} Architecture`);
      if (activeChallenge.starterNodes && activeChallenge.starterNodes.length > 0) {
        const customNodes = activeChallenge.starterNodes.map((sn) =>
          node(sn.id, sn.type, sn.position)
        );
        setNodes(customNodes);
        if (activeChallenge.starterEdges) {
          const customEdges = activeChallenge.starterEdges.map((se) => ({
            id: se.id,
            source: se.source,
            target: se.target,
            label: se.label || "",
            type: "smoothstep",
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed, color: "#ff7657" },
          }));
          setEdges(customEdges);
        } else {
          setEdges([]);
        }
      }
    }
  }, [activeChallenge]);

  const handleValidate = () => {
    if (validation.allPassed) {
      setIsCompletedModalOpen(true);
    } else {
      setIsChallengePanelCollapsed(false);
    }
  };

  const handleNextChallenge = () => {
    setIsCompletedModalOpen(false);
    if (!activeChallenge) return;
    const currIdx = systemDesignProblems.findIndex((p) => p.slug === activeChallenge.slug);
    const nextIdx = (currIdx + 1) % systemDesignProblems.length;
    const nextProblem = systemDesignProblems[nextIdx];
    router.push(`/playground?challenge=${nextProblem.slug}`);
  };

  const snapshot = useCallback(() => ({ nodes, edges }), [nodes, edges]);
  const history = useCallback(
    (state = snapshot()) => {
      setPast((items) => [...items.slice(-29), state]);
      setFuture([]);
    },
    [snapshot],
  );
  const onNodesChange = useCallback(
    (changes) => {
      if (changes.some((change) => change.type === "remove")) history();
      setNodes((items) => applyNodeChanges(changes, items));
    },
    [history],
  );
  const onEdgesChange = useCallback(
    (changes) => {
      if (changes.some((change) => change.type === "remove")) history();
      setEdges((items) => applyEdgeChanges(changes, items));
    },
    [history],
  );
  const add = useCallback(
    (type, position = { x: 180, y: 160 }) => {
      history();
      setNodes((items) => [
        ...items,
        node(`${type}-${Date.now()}`, type, position),
      ]);
    },
    [history],
  );
  const remove = useCallback(() => {
    if (!selection) return;
    history();
    if (selection.kind === "node") {
      setNodes((items) =>
        items.filter((item) => item.id !== selection.item.id),
      );
      setEdges((items) =>
        items.filter(
          (item) =>
            item.source !== selection.item.id &&
            item.target !== selection.item.id,
        ),
      );
    } else
      setEdges((items) =>
        items.filter((item) => item.id !== selection.item.id),
      );
    setSelection(null);
  }, [selection, history]);
  const undo = useCallback(() => {
    if (!past.length) return;
    const previous = past[past.length - 1];
    setFuture((items) => [{ nodes, edges }, ...items]);
    setPast((items) => items.slice(0, -1));
    setNodes(previous.nodes);
    setEdges(previous.edges);
    setSelection(null);
  }, [past, nodes, edges]);
  const redo = useCallback(() => {
    if (!future.length) return;
    const next = future[0];
    setPast((items) => [...items, { nodes, edges }]);
    setFuture((items) => items.slice(1));
    setNodes(next.nodes);
    setEdges(next.edges);
    setSelection(null);
  }, [future, nodes, edges]);
  const update = useCallback(
    (changes) => {
      if (!selection) return;
      if (selection.kind === "node")
        setNodes((items) =>
          items.map((item) =>
            item.id === selection.item.id
              ? { ...item, data: { ...item.data, ...changes } }
              : item,
          ),
        );
      else
        setEdges((items) =>
          items.map((item) =>
            item.id === selection.item.id
              ? { ...item, ...changes, data: { ...item.data, ...changes } }
              : item,
          ),
        );
      setSelection((current) => ({
        ...current,
        item:
          selection.kind === "node"
            ? {
                ...selection.item,
                data: { ...selection.item.data, ...changes },
              }
            : { ...selection.item, ...changes },
      }));
    },
    [selection],
  );
  const onSelectionChange = useCallback(({ nodes: selectedNodes, edges: selectedEdges }) => {
    const selectedNode = selectedNodes[0];
    const selectedEdge = selectedEdges[0];
    const nextSelection = selectedNode
      ? { kind: "node", item: selectedNode }
      : selectedEdge
        ? { kind: "edge", item: selectedEdge }
        : null;

    setSelection((current) => {
      if (
        current?.kind === nextSelection?.kind &&
        current?.item.id === nextSelection?.item.id
      ) {
        return current;
      }
      return nextSelection;
    });
  }, []);
  const duplicate = useCallback(() => {
    if (!selection || selection.kind !== "node") return;
    const source = selection.item;
    clipboard.current = source;
    history();
    setNodes((items) => [
      ...items,
      {
        ...source,
        id: `${source.data.type}-${Date.now()}`,
        position: { x: source.position.x + 40, y: source.position.y + 40 },
        data: { ...source.data },
      },
    ]);
  }, [selection, history]);
  const openContextMenu = useCallback((event, kind, item) => {
    event.preventDefault();
    event.stopPropagation();
    setSelection({ kind, item });
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      kind,
    });
  }, []);
  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  useEffect(() => {
    // Only load generic canvasstate if not opening a specific challenge
    if (!challengeSlug && localStorage.getItem("canvasstate")) {
      try {
        const data = localStorage.getItem("canvasstate");
        const parsed = JSON.parse(data);
        if (parsed.nodes) setNodes(parsed.nodes);
        if (parsed.edges) setEdges(parsed.edges);
      } catch (e) {
        console.debug("Failed to restore canvas state:", e);
      }
    }
  }, [challengeSlug]);

  useEffect(() => {
    const key = (event) => {
      const mod = event.metaKey || event.ctrlKey;
      if (mod && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (mod && event.key.toLowerCase() === "d") {
        event.preventDefault();
        duplicate();
      } else if (
        mod &&
        event.key.toLowerCase() === "c" &&
        selection?.kind === "node"
      )
        clipboard.current = selection.item;
      else if (mod && event.key.toLowerCase() === "v" && clipboard.current) {
        event.preventDefault();
        const source = clipboard.current;
        history();
        setNodes((items) => [
          ...items,
          {
            ...source,
            id: `${source.data.type}-${Date.now()}`,
            position: { x: source.position.x + 40, y: source.position.y + 40 },
            data: { ...source.data },
          },
        ]);
      } else if (
        (event.key === "Delete" || event.key === "Backspace") &&
        selection
      ) {
        event.preventDefault();
        remove();
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [undo, redo, duplicate, remove, selection, history]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-[#0c0f10] text-[#9aa6a5] font-mono text-sm">
          Loading canvas...
        </div>
      ) : (
        <div className="editor">
          <Toolbar
            title={title}
            setTitle={setTitle}
            undo={undo}
            redo={redo}
            canUndo={past.length > 0}
            canRedo={future.length > 0}
            onDelete={remove}
            onFit={() => reactFlow.fitView({ padding: 0.2, duration: 350 })}
            onZoom={(factor) => reactFlow.zoomIn({ duration: 180, factor })}
            onSave={() => {
              localStorage.setItem(
                "canvasstate",
                JSON.stringify({ nodes, edges, viewport: reactFlow.getViewport() })
              );
              setSaved(true);
              setTimeout(() => setSaved(false), 1600);
            }}
            activeChallenge={activeChallenge}
          />
          <div className="body">
            <Sidebar onAdd={add} />
            <main
              className="canvas relative"
              onClick={closeContextMenu}
              onDrop={(event) => {
                event.preventDefault();
                const type = event.dataTransfer.getData("system-design");
                if (type)
                  add(
                    type,
                    reactFlow.screenToFlowPosition({
                      x: event.clientX,
                      y: event.clientY,
                    }),
                  );
              }}
              onDragOver={(event) => {
                event.preventDefault();
              }}
            >
              {/* Challenge Floating Overlay */}
              {activeChallenge && (
                <ChallengePanel
                  challenge={activeChallenge}
                  validation={validation}
                  onValidate={handleValidate}
                  isCollapsed={isChallengePanelCollapsed}
                  setIsCollapsed={setIsChallengePanelCollapsed}
                />
              )}

              <div className="canvas-label">
                <span /> LIVE CANVAS{" "}
                <small>Drag components from the library to begin</small>
              </div>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={(connection) => {
                  history();
                  setEdges((items) =>
                    addEdge(
                      {
                        ...connection,
                        id: `edge-${Date.now()}`,
                        type: "smoothstep",
                        animated: true,
                        markerEnd: {
                          type: MarkerType.ArrowClosed,
                          color: "#ff7657",
                        },
                      },
                      items,
                    ),
                  );
                }}
                onReconnect={(oldEdge, newConnection) => {
                  history();
                  setEdges((items) => reconnectEdge(oldEdge, newConnection, items));
                }}
                onNodeDragStart={() => {
                  dragStart.current = snapshot();
                }}
                onNodeDragStop={() => {
                  if (dragStart.current) {
                    history(dragStart.current);
                    dragStart.current = null;
                  }
                }}
                onSelectionChange={onSelectionChange}
                onNodeContextMenu={(event, item) =>
                  openContextMenu(event, "node", item)
                }
                onEdgeContextMenu={(event, item) =>
                  openContextMenu(event, "edge", item)
                }
                onPaneContextMenu={closeContextMenu}
                connectionLineStyle={connectionLineStyle}
                snapToGrid
                snapGrid={snapGrid}
                fitView
                selectionOnDrag
                panOnDrag={[1, 2]}
                defaultEdgeOptions={defaultEdgeOptions}
                proOptions={proOptions}
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={20}
                  size={1.2}
                  color="#30383a"
                />
                <Controls showInteractive={false} />
                <MiniMap
                  nodeColor={(item) =>
                    item.data?.category === "Database" ? "#5b8def" : "#ff7657"
                  }
                  maskColor="rgba(9,11,12,.72)"
                  pannable
                  zoomable
                />
              </ReactFlow>
              {contextMenu && (
                <div
                  className="context-menu"
                  style={{ left: contextMenu.x, top: contextMenu.y }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      remove();
                      closeContextMenu();
                    }}
                  >
                    <Trash2 size={14} />
                    Delete {contextMenu.kind === "node" ? "node" : "connection"}
                  </button>
                </div>
              )}
            </main>
            <Properties
              selection={selection}
              onUpdate={update}
              onClose={() => setSelection(null)}
              onDelete={remove}
            />
          </div>
          {saved && (
            <div className="toast">
              <Check size={15} /> Diagram saved to browser
            </div>
          )}

          {/* Completion Modal */}
          {isCompletedModalOpen && (
            <CompletionModal
              challenge={activeChallenge}
              validation={validation}
              onClose={() => setIsCompletedModalOpen(false)}
              onNextChallenge={handleNextChallenge}
            />
          )}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        .editor {
          --bg: #0c0f10;
          --panel: #121617;
          --line: #293032;
          --text: #e9eeeb;
          --orange: #ff7657;
          display: flex;
          flex-direction: column;
          height: 100vh;
          min-height: 620px;
          background: var(--bg);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }
        header {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 0 20px;
          border-bottom: 1px solid var(--line);
          background: #101415;
          flex: none;
        }
        .brand,
        .diagram-title,
        .actions {
          display: flex;
          align-items: center;
        }
        .brand {
          gap: 10px;
          min-width: 205px;
        }
        .brand-link {
          display: flex;
          align-items: center;
          gap: 10px;
          color: inherit;
          text-decoration: none;
        }
        .brand b,
        .brand small {
          display: block;
        }
        .brand b {
          font-size: 13px;
        }
        .brand b span {
          color: var(--orange);
        }
        .brand small {
          font-size: 11px;
          color: #687678;
          margin-top: 3px;
          font-family: "SFMono-Regular", Consolas, monospace;
        }
        .brandmark {
          width: 25px;
          height: 25px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px;
        }
        .brandmark span {
          background: var(--orange);
          border-radius: 2px;
        }
        .brandmark span:nth-child(2),
        .brandmark span:nth-child(3) {
          opacity: 0.46;
        }
        .brand-logo {
          width: 30px;
          height: 30px;
          object-fit: contain;
          flex: none;
        }
        .playground-heading {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-left: 20px;
          border-left: 1px solid var(--line);
        }
        .playground-heading strong {
          color: #e1e7e3;
          font-size: 13px;
          font-weight: 650;
        }
        .playground-heading small {
          color: #687678;
          font: 10px "SFMono-Regular", Consolas, monospace;
        }
        .diagram-title {
          gap: 8px;
          color: #7d8989;
          padding: 8px 10px;
        }
        .diagram-title input {
          width: 190px;
          border: 0;
          outline: 0;
          background: none;
          color: #e1e7e3;
          font: 600 13px Inter, ui-sans-serif, system-ui, sans-serif;
        }
        .actions {
          gap: 5px;
          margin-left: auto;
        }
        .tool,
        .properties button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 0;
          color: #9aa6a5;
          width: 31px;
          height: 31px;
          border-radius: 5px;
          cursor: pointer;
        }
        .tool:hover,
        .properties button:hover {
          color: var(--text);
          background: #242b2c;
        }
        .tool:disabled {
          opacity: 0.3;
        }
        .actions > i {
          height: 20px;
          width: 1px;
          background: var(--line);
          margin: 0 7px;
        }
        .minus {
          font-size: 20px;
        }
        .save {
          display: flex;
          gap: 7px;
          align-items: center;
          margin-left: 9px;
          padding: 9px 14px;
          border: 0;
          border-radius: 5px;
          background: var(--orange);
          color: #17110f;
          font: 700 12px Inter, ui-sans-serif, system-ui, sans-serif;
          cursor: pointer;
        }
        .body {
          display: flex;
          flex: 1;
          min-height: 0;
        }
        .sidebar,
        .properties {
          width: 260px;
          flex: none;
          background: var(--panel);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .sidebar {
          border-right: 1px solid var(--line);
        }
        .properties {
          border-left: 1px solid var(--line);
        }
        .side-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 18px 16px;
          color: #798685;
        }
        .side-title h2 {
          font: 650 15px Inter, ui-sans-serif, system-ui, sans-serif;
          color: var(--text);
          margin: 5px 0 0;
        }
        .side-title em {
          font: 10px "SFMono-Regular", Consolas, monospace;
          letter-spacing: 0.14em;
          font-style: normal;
        }
        .search {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 34px;
          margin: 0 14px 14px;
          padding: 0 9px;
          color: #758384;
          background: #0d1112;
          border: 1px solid var(--line);
          border-radius: 5px;
        }
        .search input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: none;
          color: var(--text);
          font: 11px "SFMono-Regular", Consolas, monospace;
        }
        .search kbd {
          font-size: 10px;
          border: 1px solid #30393a;
          padding: 2px 5px;
          border-radius: 3px;
          color: #687675;
        }
        .component-list {
          overflow: auto;
          padding: 0 9px 14px;
        }
        .component-list section {
          margin-bottom: 17px;
        }
        .category {
          display: flex;
          justify-content: space-between;
          padding: 0 8px 7px;
          color: #7d8a89;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 10px;
        }
        .category span {
          color: #526061;
        }
        .component-list button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 8px;
          background: none;
          border: 1px solid transparent;
          border-radius: 5px;
          color: var(--text);
          text-align: left;
          cursor: grab;
        }
        .component-list button:hover {
          background: #1c2324;
          border-color: #2e3939;
        }
        .component-list button i,
        .preview i {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          flex: none;
          border-radius: 5px;
          background: #202829;
          color: #ff866b;
          font-style: normal;
        }
        .component-list b,
        .component-list small,
        .preview b,
        .preview small {
          display: block;
        }
        .component-list b,
        .preview b {
          font-size: 11px;
          font-weight: 500;
        }
        .component-list small,
        .preview small {
          color: #748081;
          font-size: 10px;
          margin-top: 3px;
        }
        .plus {
          margin-left: auto;
          color: #566263;
          opacity: 0;
        }
        .component-list button:hover .plus {
          opacity: 1;
        }
        .sidebar footer {
          margin-top: auto;
          border-top: 1px solid var(--line);
          padding: 13px 17px;
          color: #687575;
          font-size: 10px;
        }
        .sidebar footer span,
        .canvas-label span {
          display: inline-block;
          width: 6px;
          height: 6px;
          margin-right: 7px;
          border-radius: 50%;
          background: #71bd8e;
        }
        .canvas {
          position: relative;
          flex: 1;
          min-width: 0;
          background:
            radial-gradient(circle at 48% 42%, #ff76570d, transparent 34%),
            radial-gradient(circle at 84% 82%, #5b8def0a, transparent 28%),
            #0b0e0f;
        }
        .canvas-label {
          position: absolute;
          z-index: 5;
          top: 17px;
          left: 20px;
          color: #8c9998;
          font-size: 10px;
          letter-spacing: 0.08em;
          pointer-events: none;
        }
        .canvas-label small {
          color: #4d5b5d;
          letter-spacing: 0;
          margin-left: 10px;
        }
        .sd-node {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 196px;
          min-height: 58px;
          padding: 10px 13px;
          background: #151b1c;
          border: 1px solid #303c3d;
          border-radius: 7px;
          box-shadow: 0 7px 18px #0003;
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
        }
        .sd-node:hover {
          border-color: #6a7776;
          transform: translateY(-1px);
          box-shadow: 0 8px 22px #0005, 0 0 14px #ff76571a;
        }
        .sd-node.selected {
          border-color: var(--orange);
          box-shadow: 0 0 0 2px #ff76572e, 0 0 20px #ff765733;
        }
        .sd-node strong,
        .sd-node small {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sd-node strong {
          font-size: 12px;
        }
        .sd-node small {
          color: #849291;
          font-size: 10px;
          margin-top: 4px;
        }
        .sd-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 31px;
          height: 31px;
          flex: none;
          border-radius: 6px;
          color: var(--orange);
          background: #29201d;
        }
        .sd-node .react-flow__handle {
          width: 7px;
          height: 7px;
          background: #253032;
          border: 2px solid #73817f;
        }
        .react-flow__edge-path {
          stroke: #ff7657;
          stroke-width: 1.7;
          filter: drop-shadow(0 0 3px #ff765766);
        }
        .react-flow__edge.animated .react-flow__edge-path {
          stroke-dasharray: 7 5;
          animation: sd-edge-flow 0.75s linear infinite;
        }
        @keyframes sd-edge-flow {
          to {
            stroke-dashoffset: -12;
          }
        }
        .react-flow__edge.selected .react-flow__edge-path {
          stroke: #ffb09e;
          stroke-width: 2.5;
          filter: drop-shadow(0 0 4px #ff765799);
        }
        .react-flow__edge-text {
          fill: #aab6b3;
          font: 10px monospace;
        }
        .react-flow__edge-textbg {
          fill: #151b1c;
          stroke: #344041;
        }
        .react-flow__controls {
          bottom: 18px;
          left: 18px;
          box-shadow: none;
          border: 1px solid var(--line);
          border-radius: 6px;
          overflow: hidden;
        }
        .react-flow__controls-button {
          width: 28px;
          height: 28px;
          background: #151b1c;
          border-bottom: 1px solid var(--line);
          fill: #aab5b2;
        }
        .react-flow__minimap {
          bottom: 18px;
          right: 18px;
          border: 1px solid var(--line);
          border-radius: 7px;
          overflow: hidden;
          background: #121819;
        }
        .property-body {
          padding: 0 17px;
          overflow: auto;
        }
        .preview {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 0 18px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 18px;
        }
        .properties label {
          display: block;
          margin-bottom: 17px;
          color: #879493;
          font-size: 10px;
          letter-spacing: 0.04em;
        }
        .properties input,
        .properties select,
        .properties textarea {
          display: block;
          width: 100%;
          margin-top: 7px;
          padding: 9px 10px;
          color: #e3eae7;
          background: #0c1112;
          border: 1px solid #2d3839;
          border-radius: 5px;
          outline: 0;
          font: 11px monospace;
        }
        .properties input:focus,
        .properties select:focus,
        .properties textarea:focus {
          border-color: var(--orange);
        }
        .delete-property {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          margin: 5px 0 20px;
          padding: 9px 10px;
          border: 1px solid #633c3b;
          border-radius: 5px;
          background: #241719;
          color: #e88b82;
          font: 11px monospace;
          cursor: pointer;
        }
        .delete-property:hover {
          border-color: #a9534c;
          background: #321c1d;
          color: #ffaaa0;
        }
        .context-menu {
          position: fixed;
          z-index: 30;
          min-width: 156px;
          padding: 4px;
          background: #151b1c;
          border: 1px solid #3a4748;
          border-radius: 6px;
          box-shadow: 0 12px 28px #0009;
        }
        .context-menu button {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 9px;
          border: 0;
          border-radius: 4px;
          background: none;
          color: #e88b82;
          font: 11px monospace;
          text-align: left;
          cursor: pointer;
        }
        .context-menu button:hover {
          background: #321c1d;
          color: #ffaaa0;
        }
        .properties textarea {
          height: 110px;
          resize: vertical;
        }
        .toast {
          position: fixed;
          right: 22px;
          bottom: 22px;
          display: flex;
          gap: 8px;
          padding: 11px 14px;
          background: #1a2921;
          border: 1px solid #365c43;
          border-radius: 5px;
          color: #a9d8b6;
          font-size: 11px;
        }
        @media (max-width: 900px) {
          .sidebar {
            width: 220px;
          }
          .properties {
            width: 230px;
          }
          .brand {
            min-width: auto;
          }
          .diagram-title {
            display: none;
          }
        }
        @media (max-width: 680px) {
          .sidebar {
            width: 58px;
          }
          .side-title {
            padding: 16px 12px;
          }
          .side-title > div,
          .search,
          .category,
          .component-list button span:not(.plus),
          .component-list button .plus,
          .sidebar footer {
            display: none;
          }
          .brand small {
            display: none;
          }
          .playground-heading {
            display: none;
          }
          .brand b {
            white-space: nowrap;
          }
          .component-list button {
            justify-content: center;
          }
          .properties {
            position: absolute;
            z-index: 20;
            right: 0;
            top: 64px;
            bottom: 0;
            box-shadow: -10px 0 30px #0008;
          }
          .actions i,
          .actions .tool:nth-of-type(3),
          .actions .tool:nth-of-type(4) {
            display: none;
          }
          .save {
            padding: 8px;
          }
          .canvas-label small {
            display: none;
          }
        }
      `}</style>
    </div>}</>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-[#0e1213] text-[#e1e7e3] font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#ff7657] animate-ping" />
          <span>Loading System Design Canvas...</span>
        </div>
      </div>
    }>
      <ReactFlowProvider>
        <Editor />
      </ReactFlowProvider>
    </Suspense>
  );
}
