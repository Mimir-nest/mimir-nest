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
      { id: "gateway-smtp", type: "api_gateway", position: { x: 300, y: 220 }, label: "SMTP Gateway" }
    ],
    starterEdges: [
      { id: "e1", source: "client-mail", target: "gateway-smtp", label: "SMTP / TLS" }
    ]
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
