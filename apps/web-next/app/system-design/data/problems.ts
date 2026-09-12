export interface ReferenceNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  label?: string;
  subtitle?: string;
  rationale?: string;
}

export interface ReferenceEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface SystemDesignProblem {
  id: string;
  slug: string;
  title: string;
  company: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Product Systems" | "Distributed Systems" | "Data Systems" | "Infrastructure" | "Fundamentals";
  description: string;
  scale: string;
  budget: string;
  maxBudgetUsd: number;
  estimatedTime: string;
  requirements: string[];
  constraints: string[];
  validationRules: {
    requiredNodeTypes: string[];
    requiredConnections?: Array<{ from: string[]; to: string[]; label?: string }>;
    minNodes?: number;
    maxBudgetUsd?: number;
  };
  starterNodes?: Array<{ id: string; type: string; position: { x: number; y: number }; label?: string }>;
  starterEdges?: Array<{ id: string; source: string; target: string; label?: string }>;
  referenceWorkflow?: {
    nodes: ReferenceNode[];
    edges: ReferenceEdge[];
    explanation?: string;
  };
}

export const systemDesignProblems: SystemDesignProblem[] = [
  {
    id: "gmail-spam-filter",
    slug: "gmail-spam-filter",
    title: "Gmail Spam Filter",
    company: "Google",
    difficulty: "Easy",
    category: "Product Systems",
    description: "Design a real-time email ingestion and spam classification pipeline capable of evaluating incoming messages with ML heuristics, rule-based fallbacks, and user feedback telemetry.",
    scale: "100M+ emails/day · 50ms latency SLA",
    budget: "$3,000/month",
    maxBudgetUsd: 3000,
    estimatedTime: "25–35 min",
    requirements: [
      "Classify every incoming email before delivering to inbox in < 100ms",
      "Support high-throughput stream ingestion for incoming SMTP traffic",
      "Rule-based fallback engine when ML inference models are degraded",
      "User feedback telemetry loop (spam/not-spam clicks) to retrain models",
      "System metrics, quarantine storage, and error alerting"
    ],
    constraints: [
      "Total estimated architecture cost must stay under $3,000/month",
      "Must include Client / Ingestion source, Load Balancer or Gateway, and Compute Service",
      "Must connect a Message Queue / Stream (Kafka or Queue) for asynchronous feedback processing",
      "Must include Persistent Storage or Database for quarantine & classification rules",
      "Compute engine must have both input from gateway and output to storage/queues"
    ],
    validationRules: {
      requiredNodeTypes: ["load_balancer", "backend", "kafka", "postgres", "object_storage"],
      requiredConnections: [
        { from: ["browser", "mobile", "desktop", "dns"], to: ["load_balancer", "api_gateway"] },
        { from: ["load_balancer", "api_gateway"], to: ["backend", "microservice", "server"] },
        { from: ["backend", "microservice", "server"], to: ["kafka", "rabbitmq", "queue"] },
        { from: ["backend", "microservice", "server"], to: ["postgres", "mysql", "mongodb", "nosql"] }
      ],
      minNodes: 5,
      maxBudgetUsd: 3000
    },
    starterNodes: [
      { id: "client-mail", type: "desktop", position: { x: 50, y: 220 }, label: "Mail Sender" },
      { id: "gateway-smtp", type: "api_gateway", position: { x: 380, y: 220 }, label: "SMTP Gateway" }
    ],
    starterEdges: [
      { id: "e1", source: "client-mail", target: "gateway-smtp", label: "SMTP / TLS" }
    ],
    referenceWorkflow: {
      explanation: "A high-throughput email classification pipeline routing SMTP traffic through ML inference with an instant rule-based fallback, quarantine blob storage, and an asynchronous Kafka telemetry loop for model retraining.",
      nodes: [
        { id: "ref-sender", type: "desktop", position: { x: 40, y: 220 }, label: "Mail Senders / MTAs", subtitle: "SMTP Traffic Source", rationale: "External SMTP client senders delivering inbound email messages to the Google MX records." },
        { id: "ref-dns", type: "dns", position: { x: 360, y: 220 }, label: "DNS MX Routing", subtitle: "Edge DNS Resolver", rationale: "Routes incoming SMTP connection requests to regional edge gateways with geo-DNS load balancing." },
        { id: "ref-smtp-gw", type: "api_gateway", position: { x: 680, y: 220 }, label: "SMTP Edge Gateway", subtitle: "TLS Termination & SPF/DKIM", rationale: "Terminates inbound TLS sessions, validates SPF/DKIM/DMARC headers, and rate-limits abusive connections." },
        { id: "ref-lb", type: "load_balancer", position: { x: 1000, y: 220 }, label: "Ingestion Load Balancer", subtitle: "L7 Traffic Distribution", rationale: "Evenly balances parsed email payloads across redundant ML classification worker clusters." },
        { id: "ref-classifier", type: "backend", position: { x: 1320, y: 220 }, label: "ML Spam Classifier", subtitle: "Inference Engine (<50ms)", rationale: "Scores incoming email features against trained deep learning heuristics in sub-50ms latency." },
        { id: "ref-fallback", type: "microservice", position: { x: 1320, y: 410 }, label: "Rule Fallback Engine", subtitle: "Deterministic RegEx / Blocklists", rationale: "Provides continuous fail-open/fail-closed classification when ML inference clusters experience high load or degradation." },
        { id: "ref-monitoring", type: "auth", position: { x: 1320, y: 50 }, label: "Telemetry & Alerting", subtitle: "Prometheus & SLO Watcher", rationale: "Continuously tracks classification error rates, p99 latency, and model drift anomalies in real time." },
        { id: "ref-quarantine-db", type: "postgres", position: { x: 1680, y: 220 }, label: "Rules & Policy DB", subtitle: "Sender Reputation & Rules", rationale: "Relational store for user blocklists, custom filter policies, sender reputation history, and quarantine metadata." },
        { id: "ref-blob-storage", type: "object_storage", position: { x: 1680, y: 50 }, label: "Quarantine Blob Storage", subtitle: "Encrypted Sandbox Store", rationale: "Safely persists quarantined spam payloads and suspicious attachments away from user inboxes." },
        { id: "ref-feedback-stream", type: "kafka", position: { x: 1680, y: 410 }, label: "User Feedback Stream", subtitle: "Kafka Telemetry Queue", rationale: "Buffers user 'Report Spam' and 'Not Spam' actions for asynchronous model retraining and evaluation." }
      ],
      edges: [
        { id: "re-1", source: "ref-sender", target: "ref-dns", label: "Lookup" },
        { id: "re-2", source: "ref-dns", target: "ref-smtp-gw", label: "SMTP / TLS" },
        { id: "re-3", source: "ref-smtp-gw", target: "ref-lb", label: "Validated Payloads" },
        { id: "re-4", source: "ref-lb", target: "ref-classifier", label: "Evaluate" },
        { id: "re-5", source: "ref-classifier", target: "ref-fallback", label: "Fallback on Degrade" },
        { id: "re-6", source: "ref-classifier", target: "ref-monitoring", label: "Emit Metrics" },
        { id: "re-7", source: "ref-classifier", target: "ref-quarantine-db", label: "Policy & Quarantine State" },
        { id: "re-8", source: "ref-classifier", target: "ref-blob-storage", label: "Quarantined Blobs" },
        { id: "re-9", source: "ref-fallback", target: "ref-feedback-stream", label: "Rule Telemetry" },
        { id: "re-10", source: "ref-feedback-stream", target: "ref-quarantine-db", label: "Model Retraining Loop" }
      ]
    }
  },
  {
    id: "url-shortener",
    slug: "url-shortener",
    title: "URL Shortener",
    company: "Bitly",
    difficulty: "Easy",
    category: "Fundamentals",
    description: "Build a high-performance URL shortening service like TinyURL or Bitly that generates 7-character aliases, handles 100:1 read-to-write ratios, and caches hot redirect lookups.",
    scale: "100M URLs/month · 10B redirects/month",
    budget: "$800/month",
    maxBudgetUsd: 800,
    estimatedTime: "20–30 min",
    requirements: [
      "Generate unique, non-predictable 7-character shortened URLs",
      "Redirect user within 15ms latency p99",
      "High availability: 99.99% uptime with read-heavy optimization",
      "Analytics telemetry on click counts and geographic origins"
    ],
    constraints: [
      "Monthly infrastructure cost under $800/month",
      "Must include an in-memory cache (Redis / Memcached) for top 20% hot URLs",
      "Relational or NoSQL database with secondary indexing for fast lookups",
      "Load balancer routing traffic to redundant backend nodes"
    ],
    validationRules: {
      requiredNodeTypes: ["load_balancer", "backend", "redis", "postgres"],
      requiredConnections: [
        { from: ["load_balancer", "api_gateway"], to: ["backend", "microservice"] },
        { from: ["backend", "microservice"], to: ["redis", "memcached"] },
        { from: ["backend", "microservice"], to: ["postgres", "nosql", "mysql"] }
      ],
      minNodes: 4,
      maxBudgetUsd: 800
    },
    referenceWorkflow: {
      explanation: "A high-read 100:1 URL redirect pipeline caching hot aliases in Redis with sub-15ms p99 response times and backing persistence in PostgreSQL.",
      nodes: [
        { id: "ref-client-url", type: "browser", position: { x: 50, y: 220 }, label: "Web / Mobile Client", subtitle: "Redirect & Create Traffic", rationale: "End users requesting short link redirects or submitting long URLs for shortening." },
        { id: "ref-cdn-url", type: "cdn", position: { x: 370, y: 220 }, label: "Edge CDN / DNS", subtitle: "Static Asset & Geo Edge", rationale: "Terminates global SSL connections and serves cached static web assets close to users." },
        { id: "ref-lb-url", type: "load_balancer", position: { x: 690, y: 220 }, label: "L7 Load Balancer", subtitle: "Round-robin & Health Check", rationale: "Distributes read/write traffic evenly across stateless backend URL redirect instances." },
        { id: "ref-backend-url", type: "backend", position: { x: 1010, y: 220 }, label: "URL Service Cluster", subtitle: "Base62 Hash & Redirect", rationale: "Generates unique 7-char Base62 keys and handles HTTP 301/302 redirect responses." },
        { id: "ref-redis-url", type: "redis", position: { x: 1350, y: 110 }, label: "Redis Hot Cache", subtitle: "Top 20% Hot Short Links", rationale: "In-memory cache absorbing 80%+ of redirect lookups with sub-5ms latency." },
        { id: "ref-db-url", type: "postgres", position: { x: 1350, y: 330 }, label: "PostgreSQL Database", subtitle: "Primary URL Store & Index", rationale: "Persistent relational store with unique B-tree index on short_key." }
      ],
      edges: [
        { id: "re-u1", source: "ref-client-url", target: "ref-cdn-url", label: "HTTPS / GET" },
        { id: "re-u2", source: "ref-cdn-url", target: "ref-lb-url", label: "Proxied Requests" },
        { id: "re-u3", source: "ref-lb-url", target: "ref-backend-url", label: "Route" },
        { id: "re-u4", source: "ref-backend-url", target: "ref-redis-url", label: "Cache Lookup" },
        { id: "re-u5", source: "ref-backend-url", target: "ref-db-url", label: "DB Fallback / Insert" }
      ]
    }
  },
  {
    id: "rate-limiter",
    slug: "rate-limiter",
    title: "Distributed Rate Limiter",
    company: "Cloudflare",
    difficulty: "Easy",
    category: "Infrastructure",
    description: "Design an edge-tier rate limiting system to protect APIs against abuse, credential stuffing, and DDoS using sliding-window counter algorithms and fast distributed caches.",
    scale: "50,000 requests/sec · < 2ms latency penalty",
    budget: "$1,200/month",
    maxBudgetUsd: 1200,
    estimatedTime: "20–30 min",
    requirements: [
      "Support customizable limits per IP, User ID, and API Key",
      "Sub-2ms check latency with distributed synchronization",
      "Graceful degradation to allow traffic if rate limiter cluster fails (fail-open)",
      "Return HTTP 429 Too Many Requests with Retry-After header"
    ],
    constraints: [
      "Cost within $1,200/month",
      "Edge Reverse Proxy or API Gateway connected to distributed cache",
      "In-memory store (Redis / Memcached) for sliding window timestamps",
      "Centralized rule storage (Database) for policy configuration"
    ],
    validationRules: {
      requiredNodeTypes: ["api_gateway", "redis", "backend", "postgres"],
      minNodes: 4,
      maxBudgetUsd: 1200
    },
    referenceWorkflow: {
      explanation: "An edge-tier sliding window counter architecture validating rate limits in sub-2ms using in-memory Redis token buckets with fallback to origin policy stores.",
      nodes: [
        { id: "ref-client-rl", type: "browser", position: { x: 50, y: 220 }, label: "API Consumer / Client", subtitle: "Public API Requests", rationale: "External client applications and users submitting high-frequency API traffic." },
        { id: "ref-gw-rl", type: "api_gateway", position: { x: 380, y: 220 }, label: "Edge API Gateway", subtitle: "Sliding Window Check", rationale: "Inspects incoming API keys and client IPs, enforcing rate limits before proxying downstream." },
        { id: "ref-redis-rl", type: "redis", position: { x: 720, y: 100 }, label: "Redis Counter Store", subtitle: "Sliding Window Buckets", rationale: "High-throughput in-memory Redis cluster executing atomic Lua scripts for token checks in <2ms." },
        { id: "ref-backend-rl", type: "backend", position: { x: 720, y: 340 }, label: "Downstream API Services", subtitle: "Protected App Core", rationale: "Upstream application compute instances receiving only legitimate, un-throttled requests." },
        { id: "ref-db-rl", type: "postgres", position: { x: 1060, y: 220 }, label: "Policy & Tier DB", subtitle: "Tier Quota Definitions", rationale: "Stores customer subscription tiers, per-route rate limits, and client whitelists." }
      ],
      edges: [
        { id: "re-r1", source: "ref-client-rl", target: "ref-gw-rl", label: "API Calls" },
        { id: "re-r2", source: "ref-gw-rl", target: "ref-redis-rl", label: "Evaluate Token Bucket" },
        { id: "re-r3", source: "ref-gw-rl", target: "ref-backend-rl", label: "Allowed Traffic (200 OK)" },
        { id: "re-r4", source: "ref-backend-rl", target: "ref-db-rl", label: "Sync Policies" }
      ]
    }
  },
  {
    id: "notification-system",
    slug: "notification-system",
    title: "Scalable Notification System",
    company: "Uber",
    difficulty: "Medium",
    category: "Product Systems",
    description: "Architect a multi-channel notification engine supporting iOS APNS, Android FCM, SMS (Twilio), and transactional emails with priority routing and deduplication.",
    scale: "10M+ notifications/day · Global delivery",
    budget: "$2,500/month",
    maxBudgetUsd: 2500,
    estimatedTime: "30–45 min",
    requirements: [
      "Multi-channel fan-out: Push, SMS, Email, and In-App inbox",
      "Priority tiers: OTP & emergency alerts bypass promotional queues",
      "User preference filtering and quiet hour rate limiting",
      "Idempotent delivery preventing duplicate notifications"
    ],
    constraints: [
      "Total cost under $2,500/month",
      "Dedicated message queue (Kafka / RabbitMQ / Queue) to prevent backpressure",
      "Worker pool / microservices for provider dispatch",
      "Third-party external API integration nodes for gateways (APNs/FCM/Twilio)"
    ],
    validationRules: {
      requiredNodeTypes: ["api_gateway", "backend", "kafka", "external_api", "postgres"],
      minNodes: 5,
      maxBudgetUsd: 2500
    },
    referenceWorkflow: {
      explanation: "A decoupled notification engine separating high-priority transactional alerts from bulk broadcasts via partitioned Kafka topics and worker pools with third-party gateway dispatch.",
      nodes: [
        { id: "ref-client-notif", type: "mobile", position: { x: 50, y: 220 }, label: "Internal Services & Apps", subtitle: "Notification Triggers", rationale: "Backend microservices emitting OTP, trip update, and marketing notification events." },
        { id: "ref-gw-notif", type: "api_gateway", position: { x: 370, y: 220 }, label: "Notification Gateway", subtitle: "Auth & Deduplication", rationale: "Validates payload schema, performs idempotency checks, and enforces user quiet-hour preferences." },
        { id: "ref-kafka-notif", type: "kafka", position: { x: 690, y: 220 }, label: "Kafka Priority Queues", subtitle: "Priority / High / Low Topics", rationale: "Buffers notification messages into distinct priority topics so OTPs bypass marketing backpressure." },
        { id: "ref-workers-notif", type: "backend", position: { x: 1010, y: 220 }, label: "Dispatch Worker Cluster", subtitle: "Provider Orchestration", rationale: "Consumes queued notifications, formats templates, and dispatches to appropriate carrier APIs." },
        { id: "ref-apis-notif", type: "external_api", position: { x: 1350, y: 110 }, label: "External Providers (APNs/FCM)", subtitle: "Push, SMS, Email Gateways", rationale: "Apple APNs, Google FCM, Twilio SMS, and SendGrid email delivery endpoints." },
        { id: "ref-db-notif", type: "postgres", position: { x: 1350, y: 330 }, label: "Notification & Template DB", subtitle: "Delivery Logs & Preferences", rationale: "Stores user device tokens, notification settings, localized templates, and delivery status logs." }
      ],
      edges: [
        { id: "re-n1", source: "ref-client-notif", target: "ref-gw-notif", label: "Trigger Event" },
        { id: "re-n2", source: "ref-gw-notif", target: "ref-kafka-notif", label: "Enqueue by Priority" },
        { id: "re-n3", source: "ref-kafka-notif", target: "ref-workers-notif", label: "Worker Pull" },
        { id: "re-n4", source: "ref-workers-notif", target: "ref-apis-notif", label: "HTTP API Push" },
        { id: "re-n5", source: "ref-workers-notif", target: "ref-db-notif", label: "Log Delivery State" }
      ]
    }
  },
  {
    id: "distributed-cache",
    slug: "distributed-cache",
    title: "Distributed Cache Cluster",
    company: "Amazon",
    difficulty: "Medium",
    category: "Distributed Systems",
    description: "Design a distributed in-memory key-value caching system supporting consistent hashing, replication, write-through/write-back policies, and LRU eviction.",
    scale: "1M operations/sec · 500GB cache cluster",
    budget: "$4,000/month",
    maxBudgetUsd: 4000,
    estimatedTime: "30–45 min",
    requirements: [
      "Sub-millisecond read/write latency at 99.9th percentile",
      "Consistent hashing with virtual nodes to minimize rebalancing keys",
      "Master-replica redundancy with automated failover",
      "Configurable eviction policies: LRU, LFU, and TTL expiration"
    ],
    constraints: [
      "Cost limit: $4,000/month",
      "Multiple cache nodes (Redis / Memcached) partitioned logically",
      "Load Balancer or Proxy for client key routing",
      "Persistent backing database for cache misses"
    ],
    validationRules: {
      requiredNodeTypes: ["load_balancer", "redis", "backend", "postgres"],
      minNodes: 4,
      maxBudgetUsd: 4000
    },
    referenceWorkflow: {
      explanation: "A distributed caching cluster using consistent hashing rings across replicated in-memory Redis nodes with automatic failover and backing database hydration.",
      nodes: [
        { id: "ref-client-dc", type: "browser", position: { x: 50, y: 220 }, label: "Client Applications", subtitle: "Read/Write Traffic", rationale: "Application microservices issuing key-value read and write queries." },
        { id: "ref-proxy-dc", type: "load_balancer", position: { x: 370, y: 220 }, label: "Consistent Hash Router", subtitle: "Virtual Node Partitioning", rationale: "Hashes query keys along a ring of virtual nodes and routes traffic to the designated cache shard." },
        { id: "ref-cache-dc", type: "redis", position: { x: 710, y: 100 }, label: "Redis Cluster Shards", subtitle: "Master-Replica Nodes", rationale: "In-memory key-value storage shards with asynchronous replication and LRU memory eviction." },
        { id: "ref-backend-dc", type: "backend", position: { x: 710, y: 340 }, label: "Cache Miss Hydrator", subtitle: "Write-through / Read-through", rationale: "Handles cache misses by querying the persistent store and repopulating cache keys." },
        { id: "ref-db-dc", type: "postgres", position: { x: 1050, y: 220 }, label: "Backing PostgreSQL DB", subtitle: "Source of Truth Store", rationale: "Durable relational database holding the complete persistent dataset." }
      ],
      edges: [
        { id: "re-dc1", source: "ref-client-dc", target: "ref-proxy-dc", label: "GET / SET Key" },
        { id: "re-dc2", source: "ref-proxy-dc", target: "ref-cache-dc", label: "Direct Shard Query" },
        { id: "re-dc3", source: "ref-proxy-dc", target: "ref-backend-dc", label: "Cache Miss" },
        { id: "re-dc4", source: "ref-backend-dc", target: "ref-db-dc", label: "Hydrate" },
        { id: "re-dc5", source: "ref-backend-dc", target: "ref-cache-dc", label: "Set Key" }
      ]
    }
  },
  {
    id: "file-storage-system",
    slug: "file-storage-system",
    title: "Cloud File Storage (Dropbox)",
    company: "Dropbox",
    difficulty: "Medium",
    category: "Data Systems",
    description: "Design a cloud sync and file storage architecture featuring block-level chunking, deduplication, delta synchronization, and metadata version control.",
    scale: "50PB storage · 500M registered users",
    budget: "$15,000/month",
    maxBudgetUsd: 15000,
    estimatedTime: "35–50 min",
    requirements: [
      "Chunk large files into 4MB blocks to support resumable uploads",
      "Content-addressed deduplication (SHA-256 hash per block)",
      "Instant metadata sync across all connected user devices",
      "99.999999999% (11 9's) data durability"
    ],
    constraints: [
      "Budget ceiling: $15,000/month",
      "Object Storage (Blob storage) for file chunks",
      "Relational or Document DB for metadata, directories, and revision trees",
      "Message queue for change notification fanout to client sync workers"
    ],
    validationRules: {
      requiredNodeTypes: ["api_gateway", "backend", "object_storage", "postgres", "kafka"],
      minNodes: 5,
      maxBudgetUsd: 15000
    },
    referenceWorkflow: {
      explanation: "A block-level cloud file sync architecture chunking files into SHA-256 deduplicated blocks saved in Object Storage while metadata and version DAGs are stored in PostgreSQL with Kafka sync notifications.",
      nodes: [
        { id: "ref-client-fs", type: "desktop", position: { x: 50, y: 220 }, label: "Sync Client Agent", subtitle: "Desktop & Mobile Watcher", rationale: "Local client detecting file system changes and chunking modified files into 4MB blocks." },
        { id: "ref-gw-fs", type: "api_gateway", position: { x: 370, y: 220 }, label: "Upload & Sync Gateway", subtitle: "Chunk Hash Validator", rationale: "Validates chunk SHA-256 hashes against existing blocks for instant deduplication." },
        { id: "ref-backend-fs", type: "backend", position: { x: 690, y: 220 }, label: "Block & Metadata Service", subtitle: "Version DAG & Chunk Index", rationale: "Coordinates chunk indexing, reconstructs file manifests, and handles delta sync diffs." },
        { id: "ref-s3-fs", type: "object_storage", position: { x: 1030, y: 100 }, label: "S3 Object Storage", subtitle: "Encrypted 4MB Chunks", rationale: "Durable multi-region object storage persisting deduplicated file blocks with 11 9's durability." },
        { id: "ref-db-fs", type: "postgres", position: { x: 1030, y: 340 }, label: "Metadata & Version DB", subtitle: "Directory Trees & Revisions", rationale: "Relational store tracking user namespaces, file version trees, permissions, and chunk maps." },
        { id: "ref-kafka-fs", type: "kafka", position: { x: 1370, y: 220 }, label: "Sync Notification Stream", subtitle: "Kafka Change Feed", rationale: "Broadcasts real-time file modification events to connected client devices via WebSockets." }
      ],
      edges: [
        { id: "re-f1", source: "ref-client-fs", target: "ref-gw-fs", label: "Upload Chunks" },
        { id: "re-f2", source: "ref-gw-fs", target: "ref-backend-fs", label: "Chunk Hashes" },
        { id: "re-f3", source: "ref-backend-fs", target: "ref-s3-fs", label: "Write Chunks" },
        { id: "re-f4", source: "ref-backend-fs", target: "ref-db-fs", label: "Update File Manifest" },
        { id: "re-f5", source: "ref-backend-fs", target: "ref-kafka-fs", label: "Publish Change Event" }
      ]
    }
  },
  {
    id: "youtube-recommendation-system",
    slug: "youtube-recommendation-system",
    title: "YouTube Video Recommendation Engine",
    company: "YouTube",
    difficulty: "Hard",
    category: "Product Systems",
    description: "Design YouTube's two-stage recommendation pipeline: candidate generation (filtering millions to hundreds) followed by ranking & scoring for personalized user home feeds.",
    scale: "500M Daily Active Users · 1B+ hours watched/day",
    budget: "$50,000/month",
    maxBudgetUsd: 50000,
    estimatedTime: "45–60 min",
    requirements: [
      "Candidate Generation: Retrieve ~500 candidates from billions in < 20ms",
      "Ranking Model: Score candidates using feature store & user telemetry",
      "Near-instantaneous feedback integration when user watches or skips",
      "Diverse results preventing narrow filter bubbles"
    ],
    constraints: [
      "Budget within $50,000/month",
      "Edge CDN and API Gateway for video catalog distribution",
      "Stream ingestion (Kafka) for view history and interaction telemetry",
      "Fast feature store / cache (Redis) and Search / Embedding index",
      "Persistent data lake / DB for watch history and content catalog"
    ],
    validationRules: {
      requiredNodeTypes: ["cdn", "api_gateway", "backend", "kafka", "redis", "search", "nosql"],
      minNodes: 6,
      maxBudgetUsd: 50000
    },
    referenceWorkflow: {
      explanation: "A two-stage deep learning recommendation pipeline combining sub-20ms vector candidate retrieval with deep ranking scoring, real-time Kafka telemetry, and Redis feature caches.",
      nodes: [
        { id: "ref-user-yt", type: "browser", position: { x: 50, y: 220 }, label: "YouTube Viewers", subtitle: "Mobile, Web & TV Clients", rationale: "End users consuming personalized recommendation home feeds and watch next carousels." },
        { id: "ref-cdn-yt", type: "cdn", position: { x: 370, y: 220 }, label: "Global Edge CDN", subtitle: "Video & Thumbnail Edge", rationale: "Delivers cached thumbnails and video segments close to users with minimum TTFB latency." },
        { id: "ref-gw-yt", type: "api_gateway", position: { x: 690, y: 220 }, label: "Recommendation Gateway", subtitle: "Context & Rate Limiter", rationale: "Authenticates requests and injects real-time device, country, and time-of-day contextual features." },
        { id: "ref-candidate-yt", type: "backend", position: { x: 1010, y: 100 }, label: "Candidate Generation", subtitle: "Two-Tower ANN Retrieval", rationale: "Filters catalog of billions of videos down to top 500 candidate IDs in <20ms using vector embeddings." },
        { id: "ref-ranking-yt", type: "backend", position: { x: 1010, y: 340 }, label: "Deep Ranking Model", subtitle: "CTR & Watch Time Predictor", rationale: "Ranks 500 candidates by predicting user click probability and expected watch time using rich features." },
        { id: "ref-embeddings-yt", type: "search", position: { x: 1350, y: 100 }, label: "Vector Search Index", subtitle: "HNSW / ScaNN Embeddings", rationale: "In-memory approximate nearest neighbor vector search index for candidate filtering." },
        { id: "ref-features-yt", type: "redis", position: { x: 1350, y: 220 }, label: "Redis Feature Store", subtitle: "Real-Time User History", rationale: "Ultra-fast feature store serving user recent watch sequence and video freshness metadata." },
        { id: "ref-stream-yt", type: "kafka", position: { x: 1350, y: 340 }, label: "Watch & Click Stream", subtitle: "Kafka Event Telemetry", rationale: "Buffers user interactions (watch duration, impressions, skips) for real-time model retraining." }
      ],
      edges: [
        { id: "re-yt1", source: "ref-user-yt", target: "ref-cdn-yt", label: "Request Feed" },
        { id: "re-yt2", source: "ref-cdn-yt", target: "ref-gw-yt", label: "Proxied Feed API" },
        { id: "re-yt3", source: "ref-gw-yt", target: "ref-candidate-yt", label: "Retrieve 500 Candidates" },
        { id: "re-yt4", source: "ref-candidate-yt", target: "ref-embeddings-yt", label: "Vector Search (<20ms)" },
        { id: "re-yt5", source: "ref-candidate-yt", target: "ref-ranking-yt", label: "Send Candidates" },
        { id: "re-yt6", source: "ref-ranking-yt", target: "ref-features-yt", label: "Fetch Features" },
        { id: "re-yt7", source: "ref-user-yt", target: "ref-stream-yt", label: "Log Telemetry" }
      ]
    }
  },
  {
    id: "netflix-recommendation-system",
    slug: "netflix-recommendation-system",
    title: "Netflix Home Page Recommendation",
    company: "Netflix",
    difficulty: "Hard",
    category: "Product Systems",
    description: "Design Netflix's personalized row generation system that curates customized titles, tailored artwork thumbnails, and dynamic row rankings for every member profile.",
    scale: "250M paid subscribers · 150M row requests/day",
    budget: "$40,000/month",
    maxBudgetUsd: 40000,
    estimatedTime: "40–60 min",
    requirements: [
      "Sub-100ms cold-start page assembly across TV, mobile, and web",
      "Dynamic row hierarchy based on contextual signals (time, device, location)",
      "Bandit algorithms for personalized artwork selection per movie",
      "Offline matrix factorization combined with real-time stream scoring"
    ],
    constraints: [
      "Cost threshold: $40,000/month",
      "Global CDN for media assets and artwork",
      "Microservice orchestration mesh with fallback fallback caching",
      "High-speed distributed cache for profile state and recommendation pre-computation"
    ],
    validationRules: {
      requiredNodeTypes: ["cdn", "load_balancer", "microservice", "redis", "object_storage", "nosql"],
      minNodes: 5,
      maxBudgetUsd: 40000
    },
    referenceWorkflow: {
      explanation: "A microservice page curation pipeline fetching precomputed row candidates from EVCache, personalizing artwork thumbnails with contextual bandits, and delivering rich metadata from Cassandra.",
      nodes: [
        { id: "ref-client-nfx", type: "browser", position: { x: 50, y: 220 }, label: "Member Profile / App", subtitle: "Smart TV, Web & Mobile", rationale: "Subscriber device initiating home page loads and thumbnail asset requests." },
        { id: "ref-cdn-nfx", type: "cdn", position: { x: 370, y: 220 }, label: "Open Connect CDN", subtitle: "Edge Artwork & Video Stream", rationale: "Netflix edge caching appliance delivering personalized video thumbnails and preview streams." },
        { id: "ref-zuul-nfx", type: "load_balancer", position: { x: 690, y: 220 }, label: "Zuul Edge Router", subtitle: "Dynamic Routing & Auth", rationale: "Terminates mTLS sessions, applies client device routing filters, and prevents traffic surges." },
        { id: "ref-page-nfx", type: "microservice", position: { x: 1010, y: 220 }, label: "Page Assembly Service", subtitle: "Row Ranker & Composer", rationale: "Coordinates parallel microservice queries to assemble Top 10, Continue Watching, and genre rows in <100ms." },
        { id: "ref-artwork-nfx", type: "microservice", position: { x: 1010, y: 80 }, label: "Bandit Artwork Service", subtitle: "Multi-Armed Bandit Engine", rationale: "Dynamically picks the highest-converting video cover image tailored to the member taste profile." },
        { id: "ref-cache-nfx", type: "redis", position: { x: 1350, y: 80 }, label: "EVCache In-Memory Store", subtitle: "Precomputed Recommendations", rationale: "Sub-millisecond in-memory cache holding precomputed offline recommendation candidate rows." },
        { id: "ref-catalog-nfx", type: "nosql", position: { x: 1350, y: 220 }, label: "Cassandra Metadata DB", subtitle: "Show Details & Cast Info", rationale: "Distributed NoSQL database storing title details, video tags, maturity ratings, and watch progress." },
        { id: "ref-storage-nfx", type: "object_storage", position: { x: 1350, y: 360 }, label: "S3 Artwork Storage", subtitle: "Multi-Variant Image Assets", rationale: "Object storage containing dozens of tailored artwork cuts and high-res video posters per title." }
      ],
      edges: [
        { id: "re-nx1", source: "ref-client-nfx", target: "ref-cdn-nfx", label: "Fetch Assets" },
        { id: "re-nx2", source: "ref-client-nfx", target: "ref-zuul-nfx", label: "GET /home/rows" },
        { id: "re-nx3", source: "ref-zuul-nfx", target: "ref-page-nfx", label: "Assemble Rows" },
        { id: "re-nx4", source: "ref-page-nfx", target: "ref-artwork-nfx", label: "Select Thumbnail" },
        { id: "re-nx5", source: "ref-page-nfx", target: "ref-cache-nfx", label: "Get Candidates" },
        { id: "re-nx6", source: "ref-page-nfx", target: "ref-catalog-nfx", label: "Hydrate Metadata" },
        { id: "re-nx7", source: "ref-artwork-nfx", target: "ref-storage-nfx", label: "Read Image Cuts" }
      ]
    }
  },
  {
    id: "uber-eta-prediction",
    slug: "uber-eta-prediction",
    title: "Real-Time Ride Matching & ETA Prediction",
    company: "Uber",
    difficulty: "Hard",
    category: "Distributed Systems",
    description: "Architect Uber's dispatch and routing system combining geospatial H3 hex indexing, live GPS driver telemetry, graph routing engines, and surge pricing calculators.",
    scale: "20M trips/day · 5M active drivers sending GPS every 4s",
    budget: "$25,000/month",
    maxBudgetUsd: 25000,
    estimatedTime: "45–60 min",
    requirements: [
      "Process 1.25M GPS location pings per second with < 500ms lag",
      "Geospatial lookup: find nearest 10 available drivers within 3km in < 15ms",
      "ETA graph pathfinding considering historical and live traffic congestion",
      "Atomic lock on driver matching to prevent race conditions across riders"
    ],
    constraints: [
      "Budget limit: $25,000/month",
      "Persistent WebSocket / TCP connections for driver location streams",
      "High-throughput message streaming buffer (Kafka)",
      "In-memory spatial index (Redis Geospatial / memory store)",
      "Transactional DB for ride state and payment settlement"
    ],
    validationRules: {
      requiredNodeTypes: ["load_balancer", "backend", "kafka", "redis", "postgres"],
      minNodes: 5,
      maxBudgetUsd: 25000
    },
    referenceWorkflow: {
      explanation: "A real-time geospatial dispatch architecture streaming driver GPS into Kafka, updating H3 hex indexes in Redis, and executing graph routing ETA computations before atomic ride confirmation.",
      nodes: [
        { id: "ref-rider-ub", type: "mobile", position: { x: 50, y: 220 }, label: "Rider & Driver Apps", subtitle: "Live GPS & Ride Requests", rationale: "Mobile apps continuously broadcasting GPS location telemetry and requesting trip matches." },
        { id: "ref-lb-ub", type: "load_balancer", position: { x: 370, y: 220 }, label: "Edge TCP Load Balancer", subtitle: "Connection Load Balancing", rationale: "Distributes persistent socket connections across backend gateway instances." },
        { id: "ref-gateway-ub", type: "backend", position: { x: 690, y: 220 }, label: "WebSocket Gateway", subtitle: "Session & Ping Ingestion", rationale: "Maintains millions of live duplex WebSockets, decrypting driver telemetry." },
        { id: "ref-kafka-ub", type: "kafka", position: { x: 1010, y: 100 }, label: "GPS Telemetry Stream", subtitle: "Kafka High-Throughput Topic", rationale: "Buffers 1.25M GPS pings per second for spatial indexing and historical traffic analysis." },
        { id: "ref-spatial-ub", type: "redis", position: { x: 1350, y: 100 }, label: "H3 Geospatial Index", subtitle: "Redis Hex Shards (<15ms)", rationale: "In-memory spatial index partitioning driver locations into Uber H3 hexagonal bins for instant neighbor queries." },
        { id: "ref-matching-ub", type: "backend", position: { x: 1010, y: 340 }, label: "Dispatch Matching Engine", subtitle: "Bipartite Graph Matching", rationale: "Computes optimal supply-demand matching and acquires distributed locks to assign trips." },
        { id: "ref-db-ub", type: "postgres", position: { x: 1350, y: 340 }, label: "Trip & Payment DB", subtitle: "PostgreSQL Ledger", rationale: "ACID-compliant transactional store for active trip state, rider receipts, and driver earnings." }
      ],
      edges: [
        { id: "re-ub1", source: "ref-rider-ub", target: "ref-lb-ub", label: "GPS Stream (4s)" },
        { id: "re-ub2", source: "ref-lb-ub", target: "ref-gateway-ub", label: "TCP / Sockets" },
        { id: "re-ub3", source: "ref-gateway-ub", target: "ref-kafka-ub", label: "Ingest GPS" },
        { id: "re-ub4", source: "ref-kafka-ub", target: "ref-spatial-ub", label: "Update H3 Index" },
        { id: "re-ub5", source: "ref-gateway-ub", target: "ref-matching-ub", label: "Request Ride" },
        { id: "re-ub6", source: "ref-matching-ub", target: "ref-spatial-ub", label: "Find Nearest Drivers" },
        { id: "re-ub7", source: "ref-matching-ub", target: "ref-db-ub", label: "Lock & Confirm Ride" }
      ]
    }
  },
  {
    id: "stripe-fraud-detection",
    slug: "stripe-fraud-detection",
    title: "Real-Time Payment Fraud Detection (Radar)",
    company: "Stripe",
    difficulty: "Hard",
    category: "Data Systems",
    description: "Design an ultra-low latency payment risk engine evaluating global network behavioral signals, velocity counters, and ML risk scoring before transaction authorization.",
    scale: "10,000 transactions/sec · < 80ms hard evaluation budget",
    budget: "$30,000/month",
    maxBudgetUsd: 30000,
    estimatedTime: "40–60 min",
    requirements: [
      "Evaluate transactions against thousands of fraud rules in < 50ms",
      "Global velocity counters (e.g., cards per IP in 10 mins)",
      "Asynchronous risk graph construction without blocking payment flow",
      "Zero-downtime rule updates and dynamic merchant risk thresholds"
    ],
    constraints: [
      "Budget: $30,000/month",
      "API Gateway with strict TLS termination and mutual auth",
      "Dual path architecture: Synchronous decision path + Asynchronous feature pipeline",
      "In-memory ultra-fast cache for velocity checks",
      "Audit-proof immutable logging database"
    ],
    validationRules: {
      requiredNodeTypes: ["api_gateway", "backend", "redis", "kafka", "postgres"],
      minNodes: 5,
      maxBudgetUsd: 30000
    },
    referenceWorkflow: {
      explanation: "A dual-path payment risk evaluation architecture: sub-50ms synchronous rule execution with Redis velocity counters alongside asynchronous Kafka risk graph aggregation and immutable PostgreSQL audit logs.",
      nodes: [
        { id: "ref-merchant-st", type: "browser", position: { x: 50, y: 220 }, label: "Merchant Checkout", subtitle: "Charge Authorization API", rationale: "E-commerce apps submitting customer card charges requiring real-time fraud scoring." },
        { id: "ref-gw-st", type: "api_gateway", position: { x: 370, y: 220 }, label: "Stripe API Gateway", subtitle: "TLS Termination & Auth", rationale: "Validates API keys, terminates TLS with hardware security, and initiates evaluation pipeline." },
        { id: "ref-radar-st", type: "backend", position: { x: 690, y: 220 }, label: "Radar ML Scorer (<50ms)", subtitle: "Risk Score Inference", rationale: "Scores transaction features against machine learning models and merchant custom rules within 50ms." },
        { id: "ref-velocity-st", type: "redis", position: { x: 1010, y: 100 }, label: "Redis Velocity Cache", subtitle: "Sliding Window Velocity", rationale: "Tracks card, IP, and fingerprint transaction frequencies across 1m, 10m, and 24h sliding windows." },
        { id: "ref-kafka-st", type: "kafka", position: { x: 1010, y: 340 }, label: "Audit & Training Stream", subtitle: "Async Feature Pipeline", rationale: "Feeds transaction telemetry to background graph engines and risk model training pipelines." },
        { id: "ref-rules-st", type: "postgres", position: { x: 1350, y: 100 }, label: "Rules & Policy DB", subtitle: "Merchant Radar Rules", rationale: "PostgreSQL database holding merchant blocklists, 3D Secure rules, and custom allowlists." },
        { id: "ref-audit-st", type: "postgres", position: { x: 1350, y: 340 }, label: "Immutable Audit Ledger", subtitle: "Compliance & Dispute History", rationale: "Tamper-evident audit store recording every charge decision for dispute resolution and compliance." }
      ],
      edges: [
        { id: "re-st1", source: "ref-merchant-st", target: "ref-gw-st", label: "POST /charges" },
        { id: "re-st2", source: "ref-gw-st", target: "ref-radar-st", label: "Evaluate Risk" },
        { id: "re-st3", source: "ref-radar-st", target: "ref-velocity-st", label: "Check Velocity" },
        { id: "re-st4", source: "ref-radar-st", target: "ref-rules-st", label: "Match Custom Rules" },
        { id: "re-st5", source: "ref-radar-st", target: "ref-kafka-st", label: "Async Telemetry" },
        { id: "re-st6", source: "ref-kafka-st", target: "ref-audit-st", label: "Persist Audit Record" }
      ]
    }
  },
  {
    id: "google-autocomplete",
    slug: "google-autocomplete",
    title: "Typeahead Search Autocomplete",
    company: "Google",
    difficulty: "Medium",
    category: "Fundamentals",
    description: "Design a high-availability typeahead suggestion service returning top 5 search completions within 20ms of every keystroke using distributed trie structures.",
    scale: "5 Billion queries/day · 20ms keystroke SLA",
    budget: "$10,000/month",
    maxBudgetUsd: 10000,
    estimatedTime: "30–45 min",
    requirements: [
      "Real-time suggestion response in < 20ms",
      "Prefix matching ranked by global & personal query popularity",
      "Offline frequency aggregation and daily dictionary rebuilds",
      "Edge caching of top 100k hot prefixes"
    ],
    constraints: [
      "Cost limit: $10,000/month",
      "CDN edge caching for popular single & double letter prefixes",
      "Dedicated in-memory Trie index servers",
      "Batch stream processing to update query frequency tables"
    ],
    validationRules: {
      requiredNodeTypes: ["cdn", "load_balancer", "backend", "redis", "nosql"],
      minNodes: 4,
      maxBudgetUsd: 10000
    },
    referenceWorkflow: {
      explanation: "A sub-20ms prefix search architecture serving single-character prefixes from CDN edge caches, distributed in-memory Trie index nodes, and NoSQL frequency analytics.",
      nodes: [
        { id: "ref-user-g", type: "browser", position: { x: 50, y: 220 }, label: "Search Clients", subtitle: "Keystroke Query Traffic", rationale: "End-user browser or mobile app emitting debounced prefix search queries on every keystroke." },
        { id: "ref-cdn-g", type: "cdn", position: { x: 370, y: 220 }, label: "Edge CDN Cache", subtitle: "Top 100k Hot Prefixes", rationale: "Absorbs 40%+ of global autocomplete keystrokes (e.g. 'y', 'gm', 'am') directly at edge points of presence." },
        { id: "ref-lb-g", type: "load_balancer", position: { x: 690, y: 220 }, label: "Prefix Load Balancer", subtitle: "L7 Shard Router", rationale: "Routes prefix search queries across distributed in-memory Trie search partition clusters." },
        { id: "ref-trie-g", type: "backend", position: { x: 1010, y: 220 }, label: "Trie Index Server", subtitle: "In-Memory Prefix Trees", rationale: "Traverses compressed radix/trie trees holding top 5 suggestions per prefix in sub-10ms." },
        { id: "ref-cache-g", type: "redis", position: { x: 1350, y: 100 }, label: "Trending Query Cache", subtitle: "Redis Real-Time Boost", rationale: "In-memory cache boosting breaking news and fast-rising trending queries in suggestion results." },
        { id: "ref-db-g", type: "nosql", position: { x: 1350, y: 340 }, label: "Query Frequency DB", subtitle: "Historical Aggregations", rationale: "Persistent NoSQL store recording global query frequency counters for daily Trie regeneration." }
      ],
      edges: [
        { id: "re-g1", source: "ref-user-g", target: "ref-cdn-g", label: "Keystroke /complete?q=" },
        { id: "re-g2", source: "ref-cdn-g", target: "ref-lb-g", label: "Cache Miss" },
        { id: "re-g3", source: "ref-lb-g", target: "ref-trie-g", label: "Route to Trie Partition" },
        { id: "re-g4", source: "ref-trie-g", target: "ref-cache-g", label: "Check Trending Boost" },
        { id: "re-g5", source: "ref-trie-g", target: "ref-db-g", label: "Sync Frequencies" }
      ]
    }
  },
  {
    id: "amazon-product-recommendation",
    slug: "amazon-product-recommendation",
    title: "Amazon Item-to-Item Collaborative Filter",
    company: "Amazon",
    difficulty: "Medium",
    category: "Product Systems",
    description: "Design the 'Customers who bought this also bought' recommendation engine scaling to hundreds of millions of catalog products with precomputed item similarities.",
    scale: "300M active customers · 400M products catalog",
    budget: "$35,000/month",
    maxBudgetUsd: 35000,
    estimatedTime: "35–50 min",
    requirements: [
      "Fast item correlation lookups on every product detail page (< 30ms)",
      "Offline co-occurrence matrix computation across purchase baskets",
      "Real-time filtering of out-of-stock and user-purchased items",
      "A/B testing framework support for diverse recommendation algorithms"
    ],
    constraints: [
      "Budget: $35,000/month",
      "High-throughput key-value or document database for product catalog",
      "Fast cache for top-selling product recommendations",
      "Stream processing for real-time shopping cart additions"
    ],
    validationRules: {
      requiredNodeTypes: ["api_gateway", "microservice", "redis", "nosql", "kafka"],
      minNodes: 5,
      maxBudgetUsd: 35000
    },
    referenceWorkflow: {
      explanation: "An item-to-item collaborative filtering architecture precomputing co-occurrence matrix product similarities in DynamoDB, serving hot recommendations from Redis, and streaming live shopping cart additions through Kafka.",
      nodes: [
        { id: "ref-buyer-amz", type: "browser", position: { x: 50, y: 220 }, label: "Shopper / App Client", subtitle: "Product Detail Page Views", rationale: "Shopper loading product pages and looking at 'Customers who bought this also bought' carousels." },
        { id: "ref-gw-amz", type: "api_gateway", position: { x: 370, y: 220 }, label: "Commerce API Gateway", subtitle: "Session & Cart Ingestion", rationale: "Validates customer session tokens and aggregates product recommendations with live inventory state." },
        { id: "ref-recs-amz", type: "microservice", position: { x: 690, y: 220 }, label: "Recs Orchestrator", subtitle: "Filter & Rank Candidates", rationale: "Filters out out-of-stock and previously purchased products, ranking top 10 similar items in <30ms." },
        { id: "ref-cache-amz", type: "redis", position: { x: 1010, y: 100 }, label: "Top Recs Cache", subtitle: "Redis Hot Product Cache", rationale: "Serves precomputed recommendations for top 20% high-traffic products with sub-5ms latency." },
        { id: "ref-cooccur-amz", type: "nosql", position: { x: 1010, y: 340 }, label: "Item Similarity Matrix", subtitle: "DynamoDB Co-occurrence", rationale: "Fast key-value store holding precomputed offline basket co-occurrence similarity scores." },
        { id: "ref-kafka-amz", type: "kafka", position: { x: 1350, y: 220 }, label: "Purchase & Cart Stream", subtitle: "Real-Time Telemetry Feed", rationale: "Streams cart additions and order completions to update similarity weights and inventory in real time." }
      ],
      edges: [
        { id: "re-az1", source: "ref-buyer-amz", target: "ref-gw-amz", label: "GET /products/{id}/recs" },
        { id: "re-az2", source: "ref-gw-amz", target: "ref-recs-amz", label: "Resolve Similar Items" },
        { id: "re-az3", source: "ref-recs-amz", target: "ref-cache-amz", label: "Cache Lookup (<5ms)" },
        { id: "re-az4", source: "ref-recs-amz", target: "ref-cooccur-amz", label: "Fetch Item Matrix" },
        { id: "re-az5", source: "ref-gw-amz", target: "ref-kafka-amz", label: "Publish Cart Event" }
      ]
    }
  },
  {
    id: "instagram-feed",
    slug: "instagram-feed",
    title: "Instagram News Feed & Photo Publishing",
    company: "Meta",
    difficulty: "Medium",
    category: "Product Systems",
    description: "Design Instagram's timeline generation system supporting photo/video uploads, fanout-on-write for regular users, and fanout-on-read for celebrity accounts.",
    scale: "1B+ Monthly Active Users · 500M stories/day",
    budget: "$45,000/month",
    maxBudgetUsd: 45000,
    estimatedTime: "35–50 min",
    requirements: [
      "Publish photos & videos with asynchronous transcoding pipelines",
      "Deliver home timeline to users with < 150ms latency",
      "Hybrid fanout strategy: push model for normal users, pull model for VIPs (>1M followers)",
      "Image/video media delivery via global edge CDN"
    ],
    constraints: [
      "Monthly cost within $45,000/month",
      "CDN edge network for image/video streaming",
      "Object storage for original and resized photo assets",
      "In-memory feed cache storing precomputed timelines (Redis)",
      "Relational / Document DB for social graph and post metadata"
    ],
    validationRules: {
      requiredNodeTypes: ["cdn", "api_gateway", "backend", "redis", "object_storage", "postgres"],
      minNodes: 6,
      maxBudgetUsd: 45000
    },
    referenceWorkflow: {
      explanation: "A hybrid fanout social feed architecture delivering home timelines from Redis in <150ms with S3 media asset storage, global CDN edge delivery, and PostgreSQL social graphs.",
      nodes: [
        { id: "ref-client-ig", type: "mobile", position: { x: 50, y: 220 }, label: "Instagram App Users", subtitle: "Uploads & Timeline Feed", rationale: "Mobile users publishing photos and scrolling chronological/ranked home timelines." },
        { id: "ref-cdn-ig", type: "cdn", position: { x: 370, y: 220 }, label: "Edge Media CDN", subtitle: "Photos, Reels & Stories", rationale: "Caches image thumbnails and transcoded video segments worldwide close to followers." },
        { id: "ref-gw-ig", type: "api_gateway", position: { x: 690, y: 220 }, label: "Edge API Gateway", subtitle: "Session & Upload Router", rationale: "Routes upload streams to media transcoders and feed requests to timeline generators." },
        { id: "ref-feed-ig", type: "backend", position: { x: 1010, y: 220 }, label: "Timeline Fanout Worker", subtitle: "Hybrid Push/Pull Model", rationale: "Pushes posts into follower feed caches on write (fanout-on-write) while merging celebrity posts on read." },
        { id: "ref-redis-ig", type: "redis", position: { x: 1350, y: 80 }, label: "User Feed Cache (Redis)", subtitle: "Precomputed Timeline Lists", rationale: "Stores top 800 post IDs per user timeline in sorted sets for sub-10ms home feed pagination." },
        { id: "ref-s3-ig", type: "object_storage", position: { x: 1350, y: 220 }, label: "S3 Media Storage", subtitle: "Photos & Resized Variants", rationale: "Durable object storage preserving original high-res uploads and multiple WebP image resolutions." },
        { id: "ref-db-ig", type: "postgres", position: { x: 1350, y: 360 }, label: "Social Graph & Post DB", subtitle: "Followers & Post Metadata", rationale: "Relational store tracking user followers, likes, comments, and post location tags." }
      ],
      edges: [
        { id: "re-ig1", source: "ref-client-ig", target: "ref-cdn-ig", label: "Stream Media" },
        { id: "re-ig2", source: "ref-client-ig", target: "ref-gw-ig", label: "Publish / Read Feed" },
        { id: "re-ig3", source: "ref-gw-ig", target: "ref-feed-ig", label: "Fanout Event" },
        { id: "re-ig4", source: "ref-feed-ig", target: "ref-redis-ig", label: "Update Feed Cache" },
        { id: "re-ig5", source: "ref-gw-ig", target: "ref-s3-ig", label: "Upload Images" },
        { id: "re-ig6", source: "ref-feed-ig", target: "ref-db-ig", label: "Query Follow Graph" }
      ]
    }
  },
  {
    id: "x-trending-topics",
    slug: "x-trending-topics",
    title: "X (Twitter) Real-Time Trending Topics",
    company: "Twitter / X",
    difficulty: "Medium",
    category: "Data Systems",
    description: "Design a real-time stream processing pipeline to identify velocity spikes in hashtags and topics across regions with decay algorithms to prevent stale trends.",
    scale: "500M tweets/day · 5-minute sliding trend detection",
    budget: "$20,000/month",
    maxBudgetUsd: 20000,
    estimatedTime: "35–50 min",
    requirements: [
      "Detect trending topic spikes within 60 seconds of real-world events",
      "Filter spam, bot coordinated bursts, and sensitive keywords",
      "Localize trends by country, city, and user interest graph",
      "Exponential time-decay algorithm to retire fading topics"
    ],
    constraints: [
      "Budget: $20,000/month",
      "Distributed event streaming (Kafka) for tweet stream ingestion",
      "Stream processing compute cluster",
      "Fast in-memory cache for regional top-50 leaderboards",
      "NoSQL / Relational database for historical trend archival"
    ],
    validationRules: {
      requiredNodeTypes: ["api_gateway", "backend", "kafka", "redis", "nosql"],
      minNodes: 5,
      maxBudgetUsd: 20000
    },
    referenceWorkflow: {
      explanation: "A real-time trend detection pipeline ingesting 500M tweets/day through Kafka, computing sliding-window frequency velocity in stream workers, and serving regional leaderboards from Redis.",
      nodes: [
        { id: "ref-client-x", type: "browser", position: { x: 50, y: 220 }, label: "X Clients & Mobile", subtitle: "Tweets & Trends Widget", rationale: "Users publishing posts with hashtags and viewing localized 'What's happening' trend lists." },
        { id: "ref-gw-x", type: "api_gateway", position: { x: 370, y: 220 }, label: "Tweet Ingestion Gateway", subtitle: "Tokenization & Bot Filter", rationale: "Tokenizes tweet text, strips stop words, extracts hashtags, and filters known bot accounts." },
        { id: "ref-kafka-x", type: "kafka", position: { x: 690, y: 220 }, label: "Firehose Event Stream", subtitle: "Kafka Region Partitioned", rationale: "Partitions tokenized topic streams by geographic location and language for parallel stream processing." },
        { id: "ref-flink-x", type: "backend", position: { x: 1010, y: 220 }, label: "Sliding Window Velocity", subtitle: "Decay & Z-Score Anomaly", rationale: "Computes 5-minute hashtag velocity against 24-hour historical baseline using exponential time decay." },
        { id: "ref-redis-x", type: "redis", position: { x: 1350, y: 100 }, label: "Regional Trends Cache", subtitle: "Top 50 Ranked Leaderboards", rationale: "In-memory sorted sets serving sub-5ms queries for localized trending topic leaderboards." },
        { id: "ref-db-x", type: "nosql", position: { x: 1350, y: 340 }, label: "Trend History DB", subtitle: "Historical Analytics Store", rationale: "NoSQL document database storing historical trend lifecycles, peak velocities, and audit logs." }
      ],
      edges: [
        { id: "re-x1", source: "ref-client-x", target: "ref-gw-x", label: "POST /tweets" },
        { id: "re-x2", source: "ref-gw-x", target: "ref-kafka-x", label: "Publish Token Stream" },
        { id: "re-x3", source: "ref-kafka-x", target: "ref-flink-x", label: "Stream Window (5m)" },
        { id: "re-x4", source: "ref-flink-x", target: "ref-redis-x", label: "Update Top 50 Rankings" },
        { id: "re-x5", source: "ref-flink-x", target: "ref-db-x", label: "Archive Trend Data" },
        { id: "re-x6", source: "ref-client-x", target: "ref-redis-x", label: "Fetch Live Trends" }
      ]
    }
  },
  {
    id: "whatsapp-messaging",
    slug: "whatsapp-messaging",
    title: "WhatsApp 1-on-1 & Group Chat",
    company: "Meta",
    difficulty: "Hard",
    category: "Distributed Systems",
    description: "Design an end-to-end encrypted instant messaging platform supporting persistent connections, ephemeral delivery receipts, and efficient group message fan-out.",
    scale: "2 Billion users · 100 Billion messages/day",
    budget: "$30,000/month",
    maxBudgetUsd: 30000,
    estimatedTime: "45–60 min",
    requirements: [
      "Sub-second real-time message delivery over flaky mobile connections",
      "Delivery status receipts: Sent (✓), Delivered (✓✓), Read (blue ✓✓)",
      "Store-and-forward offline buffer for disconnected devices",
      "Group chats up to 1,024 members with decentralized fan-out"
    ],
    constraints: [
      "Budget ceiling: $30,000/month",
      "Gateway cluster maintaining millions of concurrent WebSocket/TCP connections",
      "Fast session routing cache (Redis) mapping user IDs to active gateway servers",
      "Ephemeral message queue buffer (Kafka / Queue) for offline delivery",
      "Secure key store and user profile DB"
    ],
    validationRules: {
      requiredNodeTypes: ["load_balancer", "backend", "redis", "queue", "postgres"],
      minNodes: 5,
      maxBudgetUsd: 30000
    },
    referenceWorkflow: {
      explanation: "An instant messaging architecture maintaining persistent WebSocket connections, routing active chat sessions via Redis, buffering offline messages in queues, and syncing cryptographic pre-keys via PostgreSQL.",
      nodes: [
        { id: "ref-client-wa", type: "mobile", position: { x: 50, y: 220 }, label: "WhatsApp Clients", subtitle: "End-to-End Encrypted Apps", rationale: "Mobile and desktop clients exchanging Signal-protocol encrypted message packets." },
        { id: "ref-lb-wa", type: "load_balancer", position: { x: 370, y: 220 }, label: "L4 TCP Load Balancer", subtitle: "TLS & Connection Splitting", rationale: "Balances millions of persistent duplex TCP sessions across distributed connection gateway nodes." },
        { id: "ref-gateways-wa", type: "backend", position: { x: 690, y: 220 }, label: "Chat Gateway Cluster", subtitle: "Erlang/Elixir Socket Nodes", rationale: "Lightweight connection handlers maintaining active device sockets and delivering messages." },
        { id: "ref-sessions-wa", type: "redis", position: { x: 1010, y: 100 }, label: "Session Registry (Redis)", subtitle: "User-to-Server Mapping", rationale: "In-memory mapping storing which gateway server ID currently holds each recipient's socket." },
        { id: "ref-queue-wa", type: "queue", position: { x: 1010, y: 340 }, label: "Offline Message Queue", subtitle: "Store & Forward Buffer", rationale: "Ephemeral queue holding messages for offline recipients until their device reconnects." },
        { id: "ref-db-wa", type: "postgres", position: { x: 1350, y: 220 }, label: "Account & Pre-Key DB", subtitle: "E2E Identity & Group State", rationale: "Durable PostgreSQL store for public cryptographic pre-keys, user profiles, and group membership rosters." }
      ],
      edges: [
        { id: "re-w1", source: "ref-client-wa", target: "ref-lb-wa", label: "Persistent TCP" },
        { id: "re-w2", source: "ref-lb-wa", target: "ref-gateways-wa", label: "Route Sockets" },
        { id: "re-w3", source: "ref-gateways-wa", target: "ref-sessions-wa", label: "Lookup Recipient Socket" },
        { id: "re-w4", source: "ref-gateways-wa", target: "ref-queue-wa", label: "Buffer if Offline" },
        { id: "re-w5", source: "ref-gateways-wa", target: "ref-db-wa", label: "Verify Pre-Keys" }
      ]
    }
  },
  {
    id: "distributed-web-crawler",
    slug: "distributed-web-crawler",
    title: "Distributed Web Crawler",
    company: "Google",
    difficulty: "Hard",
    category: "Distributed Systems",
    description: "Architect a scalable web crawler that downloads, parses, deduplicates, and indexes billions of web pages while strictly respecting robots.txt and politeness policies.",
    scale: "10 Billion pages/month · 5,000 pages/sec download rate",
    budget: "$25,000/month",
    maxBudgetUsd: 25000,
    estimatedTime: "40–60 min",
    requirements: [
      "Frontier URL manager ensuring host-level politeness delays",
      "Content deduplication using 64-bit SimHash / MinHash fingerprints",
      "DNS caching layer to eliminate domain resolution bottlenecks",
      "Raw HTML blob storage + extracted link graph pipeline"
    ],
    constraints: [
      "Budget: $25,000/month",
      "Distributed priority queue for URL frontier management",
      "Worker cluster for fetching and parsing HTML",
      "DNS cache server cluster",
      "Object storage for raw HTML snapshots",
      "NoSQL database for crawled metadata and document checksums"
    ],
    validationRules: {
      requiredNodeTypes: ["dns", "backend", "queue", "object_storage", "nosql"],
      minNodes: 5,
      maxBudgetUsd: 25000
    },
    referenceWorkflow: {
      explanation: "A high-scale web crawling pipeline using a polite URL frontier priority queue, dedicated DNS cache clusters, worker fetchers with SimHash deduplication, and S3 raw HTML storage.",
      nodes: [
        { id: "ref-frontier-cr", type: "queue", position: { x: 50, y: 220 }, label: "URL Frontier Queue", subtitle: "Politeness & Priority Queues", rationale: "Manages host-partitioned queues enforcing 1-second politeness delays between requests to the same domain." },
        { id: "ref-dns-cr", type: "dns", position: { x: 370, y: 100 }, label: "DNS Cache Cluster", subtitle: "Local Unbound DNS Layer", rationale: "Eliminates internet DNS resolution bottlenecks by caching domain-to-IP lookups locally." },
        { id: "ref-fetcher-cr", type: "backend", position: { x: 690, y: 220 }, label: "Web Fetcher & Parser", subtitle: "Async HTML Scraper", rationale: "Downloads HTML pages, parses DOM trees, extracts outgoing hyperlinks, and computes 64-bit SimHash checksums." },
        { id: "ref-s3-cr", type: "object_storage", position: { x: 1030, y: 100 }, label: "Raw HTML Blob Store", subtitle: "Compressed Page Storage", rationale: "Durable S3 object storage persisting compressed Gzip raw HTML page snapshots." },
        { id: "ref-db-cr", type: "nosql", position: { x: 1030, y: 340 }, label: "Doc & Fingerprint DB", subtitle: "SimHash & Crawl Metadata", rationale: "High-throughput database recording visited URL hashes, last-modified dates, and deduplication fingerprints." }
      ],
      edges: [
        { id: "re-c1", source: "ref-frontier-cr", target: "ref-fetcher-cr", label: "Pull Next URL" },
        { id: "re-c2", source: "ref-fetcher-cr", target: "ref-dns-cr", label: "Resolve Host IP" },
        { id: "re-c3", source: "ref-fetcher-cr", target: "ref-s3-cr", label: "Save Raw HTML" },
        { id: "re-c4", source: "ref-fetcher-cr", target: "ref-db-cr", label: "Save Checksum & Metadata" },
        { id: "re-c5", source: "ref-fetcher-cr", target: "ref-frontier-cr", label: "Enqueue Discovered Links" }
      ]
    }
  },
  {
    id: "search-engine-indexer",
    slug: "search-engine-indexer",
    title: "Search Engine Inverted Indexer",
    company: "Elastic",
    difficulty: "Hard",
    category: "Data Systems",
    description: "Design an inverted index and full-text search cluster supporting tokenization, TF-IDF / BM25 ranking, and distributed partition query execution.",
    scale: "1 Billion documents · 50,000 search queries/sec",
    budget: "$30,000/month",
    maxBudgetUsd: 30000,
    estimatedTime: "40–60 min",
    requirements: [
      "Fast keyword search query resolution in < 30ms",
      "Inverted index sharding with replica segment merging",
      "Document ingestion pipeline with NLP stemming and stop-word filtering",
      "Distributed scatter-gather query coordinator"
    ],
    constraints: [
      "Budget: $30,000/month",
      "Load balancer routing search queries to query coordinators",
      "Dedicated Search Engine nodes (Elastic/Search index cluster)",
      "Document storage database for full document retrieval",
      "Message queue for continuous document update ingestion"
    ],
    validationRules: {
      requiredNodeTypes: ["load_balancer", "backend", "search", "nosql", "kafka"],
      minNodes: 5,
      maxBudgetUsd: 30000
    },
    referenceWorkflow: {
      explanation: "A full-text search architecture streaming document updates through Kafka into inverted index shards with BM25 ranking and distributed scatter-gather query coordinators.",
      nodes: [
        { id: "ref-client-se", type: "browser", position: { x: 50, y: 220 }, label: "Search Clients", subtitle: "Full-Text Query Traffic", rationale: "Applications and users issuing complex multi-term boolean and keyword search queries." },
        { id: "ref-lb-se", type: "load_balancer", position: { x: 370, y: 220 }, label: "Query Load Balancer", subtitle: "L7 Traffic Distribution", rationale: "Distributes incoming search queries across stateless query coordinator instances." },
        { id: "ref-coord-se", type: "backend", position: { x: 690, y: 220 }, label: "Scatter-Gather Coordinator", subtitle: "Query Plan & Aggregation", rationale: "Fans out queries to index shards in parallel and merges ranked BM25 score result lists in <30ms." },
        { id: "ref-search-se", type: "search", position: { x: 1030, y: 100 }, label: "Inverted Index Shards", subtitle: "Lucene / Search Segments", rationale: "In-memory inverted posting lists mapping token terms to document IDs with TF-IDF weights." },
        { id: "ref-db-se", type: "nosql", position: { x: 1030, y: 340 }, label: "Primary Document Store", subtitle: "Complete JSON Documents", rationale: "Durable document store returning full document bodies for top matching search hits." },
        { id: "ref-kafka-se", type: "kafka", position: { x: 1370, y: 220 }, label: "Doc Ingestion Stream", subtitle: "Kafka Indexing Pipeline", rationale: "Streams newly added or modified documents to background index worker nodes." }
      ],
      edges: [
        { id: "re-se1", source: "ref-client-se", target: "ref-lb-se", label: "Execute Search Query" },
        { id: "re-se2", source: "ref-lb-se", target: "ref-coord-se", label: "Route Query" },
        { id: "re-se3", source: "ref-coord-se", target: "ref-search-se", label: "Scatter to Shards" },
        { id: "re-se4", source: "ref-coord-se", target: "ref-db-se", label: "Fetch Top Document Bodies" },
        { id: "re-se5", source: "ref-kafka-se", target: "ref-search-se", label: "Ingest & Re-Index" }
      ]
    }
  },
  {
    id: "distributed-logging-system",
    slug: "distributed-logging-system",
    title: "Distributed Centralized Logging (ELK/Datadog)",
    company: "Datadog",
    difficulty: "Medium",
    category: "Infrastructure",
    description: "Design a high-volume log aggregation pipeline that collects application stdout/syslogs across thousands of microservices, parses JSON structures, and supports real-time search.",
    scale: "10 TB logs/day · 100,000 events/sec peak",
    budget: "$8,000/month",
    maxBudgetUsd: 8000,
    estimatedTime: "30–45 min",
    requirements: [
      "Reliable backpressure-safe log ingestion agents",
      "Log indexing with configurable retention tiers (7 days hot, 90 days warm, 1 yr cold)",
      "Real-time alerting triggers on error spikes",
      "Full-text log search with filtering by service, trace ID, and log level"
    ],
    constraints: [
      "Cost under $8,000/month",
      "Message queue buffer (Kafka) to decouple producers from indexing speed",
      "Log processing / enrichment worker nodes",
      "Search Engine cluster for fast querying",
      "Object storage for cold log archival"
    ],
    validationRules: {
      requiredNodeTypes: ["api_gateway", "backend", "kafka", "search", "object_storage"],
      minNodes: 5,
      maxBudgetUsd: 8000
    },
    referenceWorkflow: {
      explanation: "A high-volume telemetry logging architecture streaming log records through Kafka, enriching structured JSON with worker clusters, and partitioning logs across OpenSearch and cold S3 archives.",
      nodes: [
        { id: "ref-agents-log", type: "desktop", position: { x: 50, y: 220 }, label: "Log Shipper Agents", subtitle: "Fluentbit & Microservices", rationale: "Agents on application nodes tailing stdout and shipping structured log JSON payloads." },
        { id: "ref-gw-log", type: "api_gateway", position: { x: 370, y: 220 }, label: "Ingestion API Gateway", subtitle: "Batching & Backpressure", rationale: "Authenticates log shippers and enforces ingestion rate limits during traffic surges." },
        { id: "ref-kafka-log", type: "kafka", position: { x: 690, y: 220 }, label: "Log Stream Buffer (Kafka)", subtitle: "High-Throughput Topics", rationale: "Decouples high-volume log producers from downstream indexing pipelines with zero log drop." },
        { id: "ref-indexer-log", type: "backend", position: { x: 1010, y: 220 }, label: "Log Enrichment Workers", subtitle: "Logstash / Rust Indexers", rationale: "Parses log traces, masks PII / secrets, and routes records to hot/cold storage tiers." },
        { id: "ref-search-log", type: "search", position: { x: 1350, y: 100 }, label: "OpenSearch Index Cluster", subtitle: "7-Day Hot Search Tier", rationale: "Distributed search cluster indexing log fields for real-time investigation and error alerting." },
        { id: "ref-s3-log", type: "object_storage", position: { x: 1350, y: 340 }, label: "S3 Cold Log Archive", subtitle: "Parquet Compressed Cold Store", rationale: "Long-term durable object storage retaining compressed logs for 1 year compliance." }
      ],
      edges: [
        { id: "re-l1", source: "ref-agents-log", target: "ref-gw-log", label: "Push Batched Logs" },
        { id: "re-l2", source: "ref-gw-log", target: "ref-kafka-log", label: "Publish Log Events" },
        { id: "re-l3", source: "ref-kafka-log", target: "ref-indexer-log", label: "Consume Stream" },
        { id: "re-l4", source: "ref-indexer-log", target: "ref-search-log", label: "Index Hot Logs" },
        { id: "re-l5", source: "ref-indexer-log", target: "ref-s3-log", label: "Compress & Archive" }
      ]
    }
  },
  {
    id: "metrics-monitoring-system",
    slug: "metrics-monitoring-system",
    title: "Time-Series Metrics Monitoring (Prometheus)",
    company: "Prometheus",
    difficulty: "Medium",
    category: "Infrastructure",
    description: "Design a time-series telemetry monitoring system supporting pull/push metric collection, downsampling rollups, PromQL-style aggregation, and pager duty alerting.",
    scale: "50 Million metrics collected/minute · 1-year data retention",
    budget: "$6,000/month",
    maxBudgetUsd: 6000,
    estimatedTime: "30–45 min",
    requirements: [
      "High-density time-series data compression (Gorilla / DoubleDelta encoding)",
      "Automated downsampling from 10s raw to 5m, 1h, and 1d rollups",
      "Fast dashboard query rendering for Grafana visualization",
      "Rule evaluation engine triggering alerts on anomaly thresholds"
    ],
    constraints: [
      "Cost limit: $6,000/month",
      "Time-series database / NoSQL for metric storage",
      "Query & ingestion service layer",
      "In-memory cache for recent hot metrics",
      "Alerting notification service dispatch"
    ],
    validationRules: {
      requiredNodeTypes: ["load_balancer", "backend", "nosql", "redis", "auth"],
      minNodes: 4,
      maxBudgetUsd: 6000
    },
    referenceWorkflow: {
      explanation: "A metrics monitoring architecture scraping telemetry from app targets, caching recent samples in Redis, storing compressed time-series in VictoriaMetrics/NoSQL, and firing alerts via Alertmanager.",
      nodes: [
        { id: "ref-targets-prom", type: "desktop", position: { x: 50, y: 220 }, label: "Monitored App Targets", subtitle: "HTTP /metrics Endpoints", rationale: "Microservice endpoints exposing Prometheus OpenMetrics text telemetry." },
        { id: "ref-lb-prom", type: "load_balancer", position: { x: 370, y: 220 }, label: "Scrape Load Balancer", subtitle: "Target Discovery & Scrape", rationale: "Orchestrates periodic 15-second scraping intervals across server instances." },
        { id: "ref-prom-prom", type: "backend", position: { x: 690, y: 220 }, label: "Prometheus Server Core", subtitle: "Ingestion & Rule Evaluator", rationale: "Evaluates PromQL alert rules and compresses metric timestamps using Gorilla encoding." },
        { id: "ref-redis-prom", type: "redis", position: { x: 1010, y: 100 }, label: "Recent Metrics Buffer", subtitle: "Hot 2-Hour Ring Buffer", rationale: "Ultra-fast in-memory cache rendering live Grafana dashboard metrics without hitting disk." },
        { id: "ref-alert-prom", type: "auth", position: { x: 1010, y: 340 }, label: "Alertmanager Dispatch", subtitle: "Slack, PagerDuty & Webhooks", rationale: "Deduplicates, groups, and routes active threshold alerts to on-call engineering teams." },
        { id: "ref-tsdb-prom", type: "nosql", position: { x: 1350, y: 220 }, label: "Long-Term TSDB Storage", subtitle: "Downsampled 1-Year Store", rationale: "Compressed long-term time-series storage with automated 5m, 1h, and 1d downsampling rollups." }
      ],
      edges: [
        { id: "re-p1", source: "ref-targets-prom", target: "ref-lb-prom", label: "Scrape /metrics" },
        { id: "re-p2", source: "ref-lb-prom", target: "ref-prom-prom", label: "Ingest Samples" },
        { id: "re-p3", source: "ref-prom-prom", target: "ref-redis-prom", label: "Write Hot Buffer" },
        { id: "re-p4", source: "ref-prom-prom", target: "ref-alert-prom", label: "Trigger Alerts" },
        { id: "re-p5", source: "ref-prom-prom", target: "ref-tsdb-prom", label: "Persist Long-Term" }
      ]
    }
  },
  {
    id: "job-scheduler",
    slug: "job-scheduler",
    title: "Distributed Cron & Job Scheduler",
    company: "Temporal",
    difficulty: "Medium",
    category: "Distributed Systems",
    description: "Design a fault-tolerant distributed job orchestrator capable of triggering millions of delayed, recurring, and dependency-chained background tasks with at-least-once guarantees.",
    scale: "5 Million jobs executed/day · Millisecond trigger precision",
    budget: "$5,000/month",
    maxBudgetUsd: 5000,
    estimatedTime: "30–45 min",
    requirements: [
      "Schedule one-time delayed jobs and recurring cron intervals",
      "Worker pull model with heartbeat monitoring and automatic retry on failure",
      "DAG execution for multi-step dependent workflow chains",
      "Distributed lock to prevent duplicate execution across leader partitions"
    ],
    constraints: [
      "Cost ceiling: $5,000/month",
      "Message queue (Kafka / Queue) for task distribution to worker pools",
      "Relational / NoSQL database for job definitions, state, and execution history",
      "In-memory store (Redis) for distributed leader election and timers"
    ],
    validationRules: {
      requiredNodeTypes: ["api_gateway", "backend", "queue", "redis", "postgres"],
      minNodes: 5,
      maxBudgetUsd: 5000
    },
    referenceWorkflow: {
      explanation: "A fault-tolerant distributed scheduler using Redis hierarchical timing wheels for millisecond precision, message queues for worker task distribution, and PostgreSQL for DAG execution state.",
      nodes: [
        { id: "ref-client-job", type: "browser", position: { x: 50, y: 220 }, label: "Triggering Services", subtitle: "Job Submission Clients", rationale: "Applications and services registering delayed tasks or recurring cron definitions." },
        { id: "ref-gw-job", type: "api_gateway", position: { x: 370, y: 220 }, label: "Schedule API Gateway", subtitle: "Job Registration & Auth", rationale: "Validates job schemas, assigns unique execution IDs, and confirms idempotency keys." },
        { id: "ref-leader-job", type: "backend", position: { x: 690, y: 220 }, label: "Scheduler Coordinator", subtitle: "Hashed Time Wheel Engine", rationale: "Leader cluster polling time wheels and dispatching due tasks to worker queues precisely on time." },
        { id: "ref-redis-job", type: "redis", position: { x: 1010, y: 100 }, label: "Timer Wheel & Lock (Redis)", subtitle: "Sorted Sets & Redlock", rationale: "In-memory sorted sets indexed by target execution timestamps with distributed leader locking." },
        { id: "ref-queue-job", type: "queue", position: { x: 1010, y: 340 }, label: "Task Execution Queue", subtitle: "Worker Distribution Queue", rationale: "Buffers triggered tasks for worker consumption, preventing job dropped during peak spikes." },
        { id: "ref-workers-job", type: "backend", position: { x: 1350, y: 340 }, label: "Task Worker Cluster", subtitle: "Job Execution & Retries", rationale: "Pulls tasks from queue, executes background logic, sends heartbeats, and handles exponential retries." },
        { id: "ref-db-job", type: "postgres", position: { x: 1350, y: 100 }, label: "Job State & History DB", subtitle: "DAG Definitions & Logs", rationale: "Durable PostgreSQL database recording task definitions, execution logs, and output payloads." }
      ],
      edges: [
        { id: "re-j1", source: "ref-client-job", target: "ref-gw-job", label: "POST /jobs/schedule" },
        { id: "re-j2", source: "ref-gw-job", target: "ref-leader-job", label: "Register Task" },
        { id: "re-j3", source: "ref-leader-job", target: "ref-redis-job", label: "Schedule Timer Slot" },
        { id: "re-j4", source: "ref-leader-job", target: "ref-queue-job", label: "Enqueue Triggered Task" },
        { id: "re-j5", source: "ref-queue-job", target: "ref-workers-job", label: "Worker Pull Task" },
        { id: "re-j6", source: "ref-workers-job", target: "ref-db-job", label: "Record Result Status" }
      ]
    }
  }
];

// Helper to look up a problem by slug
export function getProblemBySlug(slug: string): SystemDesignProblem | undefined {
  return systemDesignProblems.find((p) => p.slug === slug || p.id === slug);
}

// Component cost estimation mapping (per month)
export const nodeCostMap: Record<string, number> = {
  browser: 0,
  mobile: 0,
  desktop: 0,
  dns: 15,
  cdn: 120,
  load_balancer: 45,
  api_gateway: 60,
  reverse_proxy: 30,
  server: 120,
  backend: 180,
  microservice: 150,
  serverless: 50,
  container: 90,
  postgres: 350,
  mysql: 300,
  mongodb: 320,
  sql: 280,
  nosql: 340,
  redis: 200,
  memcached: 160,
  kafka: 450,
  rabbitmq: 250,
  queue: 80,
  object_storage: 220,
  file_storage: 180,
  auth: 90,
  search: 400,
  external_api: 100,
  custom: 75,
};

export function calculateArchitectureCost(nodes: Array<{ data?: { type?: string } }>): number {
  return nodes.reduce((sum, n) => {
    const type = n.data?.type || "custom";
    return sum + (nodeCostMap[type] || 50);
  }, 0);
}
