// System Design Guide — Architecture & Distributed Systems Curriculum

export const chapters = [
  {
    id: "getting-started",
    label: "Getting Started",
    color: "#FF5A36",
    icon: "🚀",
    topics: ["what-is-system-design"],
  },
  {
    id: "chapter-i",
    label: "Chapter I — Networking & Infrastructure",
    color: "#FF7A5A",
    icon: "🌐",
    topics: [
      "ip",
      "osi-model",
      "tcp-and-udp",
      "dns",
      "load-balancing",
      "clustering",
      "caching",
      "cdn",
      "proxy",
      "availability",
      "scalability",
      "storage",
    ],
  },
  {
    id: "chapter-ii",
    label: "Chapter II — Databases",
    color: "#E84D9C",
    icon: "🗄️",
    topics: [
      "databases-and-dbms",
      "sql-databases",
      "nosql-databases",
      "sql-vs-nosql",
      "database-replication",
      "indexes",
      "normalization",
      "acid-base",
      "cap-theorem",
      "pacelc",
      "transactions",
      "distributed-transactions",
      "sharding",
      "consistent-hashing",
      "database-federation",
    ],
  },
  {
    id: "chapter-iii",
    label: "Chapter III — Architecture",
    color: "#7C3AED",
    icon: "🏗️",
    topics: [
      "n-tier-architecture",
      "message-brokers",
      "message-queues",
      "publish-subscribe",
      "esb",
      "monoliths-microservices",
      "event-driven",
      "event-sourcing",
      "cqrs",
      "api-gateway",
      "rest-graphql-grpc",
      "long-polling-ws-sse",
    ],
  },
  {
    id: "chapter-iv",
    label: "Chapter IV — Advanced Topics",
    color: "#059669",
    icon: "⚡",
    topics: [
      "geohashing-quadtrees",
      "circuit-breaker",
      "rate-limiting",
      "service-discovery",
      "sla-slo-sli",
      "disaster-recovery",
      "vms-containers",
      "oauth-oidc",
      "sso",
      "ssl-tls",
    ],
  },
  {
    id: "chapter-v",
    label: "Chapter V — System Design Interviews",
    color: "#D97706",
    icon: "🎯",
    topics: [
      "interview-framework",
      "url-shortener",
      "whatsapp",
      "twitter",
      "netflix",
      "uber",
    ],
  },
];

export const topics = {
  "what-is-system-design": {
    id: "what-is-system-design",
    title: "What is System Design?",
    chapter: "getting-started",
    emoji: "💡",
    summary: "The process of defining architecture, interfaces, and data for a system.",
    content: [
      {
        type: "p",
        text: "System design is the process of defining the architecture, interfaces, and data for a system that satisfies specific requirements. System design meets the needs of your business or organization through coherent and efficient systems. It requires a systematic approach to building and engineering systems.",
      },
      {
        type: "p",
        text: "A good system design requires us to think about everything, from infrastructure all the way down to the data and how it's stored.",
      },
      {
        type: "h3",
        text: "Why is System Design so important?",
      },
      {
        type: "p",
        text: "System design helps us define a solution that meets the business requirements. It is one of the earliest decisions we can make when building a system. Often it is essential to think from a high level as these decisions are very difficult to correct later. It also makes it easier to reason about and manage architectural changes as the system evolves.",
      },
    ],
  },
  ip: {
    id: "ip",
    title: "IP Addresses",
    chapter: "chapter-i",
    emoji: "📡",
    summary: "Unique identifiers that allow devices to communicate over the internet.",
    content: [
      {
        type: "p",
        text: "An IP address is a unique address that identifies a device on the internet or a local network. IP stands for \"Internet Protocol\", which is the set of rules governing the format of data sent via the internet or local network.",
      },
      { type: "h3", text: "Versions" },
      {
        type: "list",
        items: [
          "**IPv4**: 32-bit numeric dot-decimal notation. Allows ~4 billion addresses. Example: `102.22.192.181`",
          "**IPv6**: 128-bit alphanumeric hexadecimal. Provides ~340 undecillion addresses. Example: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`",
        ],
      },
      { type: "h3", text: "Types of IP Addresses" },
      {
        type: "list",
        items: [
          "**Public**: One primary address associated with a whole network — same IP for all connected devices.",
          "**Private**: Unique IP assigned to each device in your local network by the router.",
          "**Static**: Manually created, does not change. Used for servers, geo-location services.",
          "**Dynamic**: Assigned by DHCP server, changes over time. Most common for consumer use.",
        ],
      },
    ],
  },
  "osi-model": {
    id: "osi-model",
    title: "OSI Model",
    chapter: "chapter-i",
    emoji: "📶",
    summary: "A 7-layer conceptual model for network communication between systems.",
    image: "/images/system-design/osi-model.png",
    content: [
      {
        type: "p",
        text: "The OSI Model is a logical and conceptual model that defines network communication used by systems open to interconnection and communication with other systems. It can be seen as a universal language for computer networking, splitting communication into 7 abstract layers.",
      },
      { type: "h3", text: "Why does the OSI model matter?" },
      {
        type: "list",
        items: [
          "Makes troubleshooting easier and helps identify threats across the entire stack.",
          "Encourages hardware manufacturers to create interoperable networking products.",
          "Essential for developing a security-first mindset.",
          "Separates a complex function into simpler components.",
        ],
      },
      { type: "h3", text: "The 7 Layers (Top to Bottom)" },
      {
        type: "table",
        headers: ["Layer", "Name", "Responsibility"],
        rows: [
          ["7", "Application", "HTTP, SMTP — directly interacts with user data"],
          ["6", "Presentation", "Translation, encryption, compression"],
          ["5", "Session", "Opens, manages, and closes communication sessions"],
          ["4", "Transport", "End-to-end communication; segments and reassembles data"],
          ["3", "Network", "Routing packets between different networks"],
          ["2", "Data Link", "Data transfer within the same network (frames)"],
          ["1", "Physical", "Physical cables and switches; converts data to bit stream"],
        ],
      },
    ],
  },
  "tcp-and-udp": {
    id: "tcp-and-udp",
    title: "TCP and UDP",
    chapter: "chapter-i",
    emoji: "🔌",
    summary: "Two core transport-layer protocols with different reliability guarantees.",
    content: [
      { type: "h3", text: "TCP (Transmission Control Protocol)" },
      {
        type: "p",
        text: "TCP is connection-oriented — once a connection is established, data can be transmitted in both directions. TCP has built-in error-checking and guarantees delivery in the order it was sent.",
      },
      { type: "h3", text: "UDP (User Datagram Protocol)" },
      {
        type: "p",
        text: "UDP is a simpler, connectionless protocol where error-checking and recovery are not required. Data is continuously sent to the recipient, whether or not they receive it. Preferred for real-time communications like video streaming and VoIP.",
      },
      { type: "h3", text: "TCP vs UDP Comparison" },
      {
        type: "table",
        headers: ["Feature", "TCP", "UDP"],
        rows: [
          ["Connection", "Requires established connection", "Connectionless protocol"],
          ["Delivery guarantee", "Yes", "No"],
          ["Re-transmission", "Yes — lost packets re-sent", "No"],
          ["Speed", "Slower", "Faster"],
          ["Broadcasting", "Not supported", "Supported"],
          ["Use cases", "HTTPS, HTTP, SMTP, FTP", "Video streaming, DNS, VoIP"],
        ],
      },
    ],
  },
  dns: {
    id: "dns",
    title: "Domain Name System (DNS)",
    chapter: "chapter-i",
    emoji: "🌍",
    summary: "A hierarchical naming system that translates domain names to IP addresses.",
    image: "/images/system-design/how-dns-works.png",
    content: [
      {
        type: "p",
        text: "DNS is a hierarchical and decentralized naming system used for translating human-readable domain names (e.g. google.com) to IP addresses. Without DNS, you'd need to remember IP addresses like `122.250.192.232` for every website.",
      },
      { type: "h3", text: "DNS Lookup (8 Steps)" },
      {
        type: "list",
        items: [
          "Client types a domain into browser → query sent to DNS resolver",
          "Resolver queries a DNS root nameserver",
          "Root server responds with Top-Level Domain (TLD) address",
          "Resolver queries the `.com` TLD nameserver",
          "TLD responds with the domain's authoritative nameserver",
          "Resolver queries the authoritative nameserver",
          "Authoritative nameserver returns the IP address",
          "Resolver returns IP to client → browser can now load the page",
        ],
      },
      { type: "h3", text: "Record Types" },
      {
        type: "list",
        items: [
          "**A** — Maps domain to IPv4 address",
          "**AAAA** — Maps domain to IPv6 address",
          "**CNAME** — Alias: forwards one domain to another",
          "**MX** — Mail exchanger: directs email",
          "**TXT** — Stores text notes (used for email security, verification)",
          "**NS** — Name server records",
          "**PTR** — Reverse DNS lookup",
        ],
      },
      { type: "h3", text: "Popular DNS Services" },
      {
        type: "list",
        items: ["Route53 (AWS)", "Cloudflare DNS", "Google Cloud DNS", "Azure DNS"],
      },
    ],
  },
  "load-balancing": {
    id: "load-balancing",
    title: "Load Balancing",
    chapter: "chapter-i",
    emoji: "⚖️",
    summary: "Distributes incoming traffic across multiple servers for high availability.",
    image: "/images/system-design/load-balancer.png",
    content: [
      {
        type: "p",
        text: "Load balancing distributes incoming network traffic across multiple resources ensuring high availability and reliability by sending requests only to resources that are online.",
      },
      { type: "h3", text: "Routing Algorithms" },
      {
        type: "list",
        items: [
          "**Round-robin**: Requests distributed to servers in rotation",
          "**Weighted Round-robin**: Accounts for different server capacities using weights",
          "**Least Connections**: Routes to server with fewest active connections",
          "**Least Response Time**: Combines fastest response time + fewest connections",
          "**Hashing**: Distributes based on client IP or request URL",
        ],
      },
      { type: "h3", text: "Types" },
      {
        type: "list",
        items: [
          "**Software**: Flexible, cost-effective, configurable (e.g. Nginx, HAProxy)",
          "**Hardware**: Physical devices, high volume but expensive",
          "**DNS**: Distributes via DNS records; doesn't check server health",
        ],
      },
      { type: "h3", text: "Key Features" },
      {
        type: "list",
        items: [
          "Autoscaling — spins resources up/down with demand",
          "Sticky sessions — assigns same user to same server",
          "Health checks — removes unhealthy nodes from pool",
          "SSL termination — handles encrypted connections",
        ],
      },
      { type: "h3", text: "Advantages" },
      {
        type: "list",
        items: ["Scalability", "Redundancy", "Flexibility", "Efficiency"],
      },
    ],
  },
  clustering: {
    id: "clustering",
    title: "Clustering",
    chapter: "chapter-i",
    emoji: "🖥️",
    summary: "Group of computers working together as a single system for redundancy and performance.",
    image: "/images/system-design/cluster.png",
    content: [
      {
        type: "p",
        text: "A computer cluster is a group of two or more computers (nodes) that run in parallel to achieve a common goal, leveraging combined memory and processing power.",
      },
      { type: "h3", text: "Cluster Types" },
      {
        type: "list",
        items: [
          "**Highly available / fail-over** — Ensures uptime when nodes fail",
          "**Load balancing** — Distributes workload across nodes",
          "**High-performance computing** — Parallel processing for computation-heavy tasks",
        ],
      },
      { type: "h3", text: "Configurations" },
      {
        type: "list",
        items: [
          "**Active-Active**: All nodes serve traffic simultaneously. Achieves load balancing and improves throughput.",
          "**Active-Passive**: One active node, one standby. If active fails, passive takes over.",
        ],
      },
      { type: "h3", text: "Advantages" },
      {
        type: "list",
        items: ["High availability", "Scalability", "Performance", "Cost-effective"],
      },
    ],
  },
  caching: {
    id: "caching",
    title: "Caching",
    chapter: "chapter-i",
    emoji: "⚡",
    summary: "Stores frequently accessed data in fast memory to reduce latency and database load.",
    image: "/images/system-design/caching.png",
    content: [
      {
        type: "quote",
        text: '"There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton',
      },
      {
        type: "p",
        text: "A cache's primary purpose is to increase data retrieval performance by reducing the need to access the underlying slower storage layer. Caches take advantage of the locality of reference principle: recently requested data is likely to be requested again.",
      },
      { type: "h3", text: "Cache Invalidation Strategies" },
      {
        type: "list",
        items: [
          "**Write-through**: Data written to cache AND database simultaneously. Consistent, but higher write latency.",
          "**Write-around**: Data written directly to database, bypassing cache. Reduces cache pollution but higher read latency on cache miss.",
          "**Write-back**: Data written to cache only; synced to database asynchronously. Fast writes but risk of data loss.",
        ],
      },
      { type: "h3", text: "Eviction Policies" },
      {
        type: "list",
        items: [
          "**LRU** (Least Recently Used) — Most common; evicts least recently accessed items",
          "**LFU** (Least Frequently Used) — Evicts least often accessed items",
          "**FIFO** — Evicts oldest item first",
          "**Random Replacement** — Randomly selects item to evict",
        ],
      },
      { type: "h3", text: "When NOT to use caching" },
      {
        type: "list",
        items: [
          "Data changes too frequently — cached version becomes stale immediately",
          "Cache access is as slow as primary storage",
          "Requests have low repetition (high randomness)",
        ],
      },
      { type: "h3", text: "Popular Cache Technologies" },
      {
        type: "list",
        items: ["Redis", "Memcached", "Amazon ElastiCache", "Aerospike"],
      },
    ],
  },
  cdn: {
    id: "cdn",
    title: "Content Delivery Network (CDN)",
    chapter: "chapter-i",
    emoji: "🗺️",
    summary: "Geographically distributed servers that deliver static content close to users.",
    image: "/images/system-design/cdn.png",
    content: [
      {
        type: "p",
        text: "A CDN is a geographically distributed group of servers that work together to provide fast delivery of internet content — primarily static files such as HTML/CSS/JS, photos, and videos.",
      },
      { type: "h3", text: "How CDN Works" },
      {
        type: "p",
        text: "The origin server contains the original content. Edge servers are distributed worldwide. A CDN stores cached content in multiple edge locations, so users are served from nearby servers, reducing latency significantly.",
      },
      { type: "h3", text: "Types" },
      {
        type: "list",
        items: [
          "**Push CDN**: Content is pushed to the CDN whenever it changes. Good for sites with small traffic or infrequently updated content.",
          "**Pull CDN**: Cache is updated on request — when a user requests content, the CDN fetches it from origin if not cached. Good for heavy traffic sites.",
        ],
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "Reduced latency — content served from nearby edge locations",
          "Increased availability and redundancy",
          "Reduced bandwidth costs",
          "Improved security",
        ],
      },
    ],
  },
  proxy: {
    id: "proxy",
    title: "Proxy Servers",
    chapter: "chapter-i",
    emoji: "🔀",
    summary: "Intermediary servers that sit between clients and backend servers.",
    content: [
      {
        type: "p",
        text: "A proxy server is an intermediary piece of hardware/software sitting between the client and the backend server, used to filter requests, log requests, or transform them.",
      },
      { type: "h3", text: "Forward Proxy" },
      {
        type: "p",
        text: "Sits in front of client machines. When clients request resources, the proxy intercepts and communicates on their behalf. Provides anonymity, can block/allow access to content.",
      },
      { type: "h3", text: "Reverse Proxy" },
      {
        type: "p",
        text: "Sits in front of origin servers. Clients never communicate directly with the backend server. Used for improved security, caching, SSL encryption, and load balancing.",
      },
      { type: "h3", text: "Key Difference" },
      {
        type: "p",
        text: "**Forward proxy** = protects client identity from servers. **Reverse proxy** = protects server identity from clients. A reverse proxy can act as a load balancer, but a load balancer cannot act as a reverse proxy.",
      },
    ],
  },
  availability: {
    id: "availability",
    title: "Availability",
    chapter: "chapter-i",
    emoji: "📊",
    summary: "The percentage of time a system remains operational under normal conditions.",
    content: [
      {
        type: "p",
        text: "Availability is the time a system remains operational to perform its required function in a specific period, expressed as a percentage of uptime.",
      },
      { type: "h3", text: "The Nines of Availability" },
      {
        type: "table",
        headers: ["Availability", "Downtime (Year)", "Downtime (Month)", "Downtime (Week)"],
        rows: [
          ["99% (two nines)", "3.65 days", "7.20 hours", "1.68 hours"],
          ["99.9% (three nines)", "8.77 hours", "43.8 minutes", "10.1 minutes"],
          ["99.99% (four nines)", "52.6 minutes", "4.32 minutes", "1.01 minutes"],
          ["99.999% (five nines)", "5.25 minutes", "25.9 seconds", "6.05 seconds"],
        ],
      },
      { type: "h3", text: "Sequence vs Parallel" },
      {
        type: "list",
        items: [
          "**In Sequence**: Overall availability = Foo × Bar (decreases with each component)",
          "**In Parallel**: Overall availability = 1 - (1-Foo)(1-Bar) (increases with redundancy)",
        ],
      },
      { type: "h3", text: "High Availability vs Fault Tolerance" },
      {
        type: "p",
        text: "Fault-tolerant systems have zero service interruption but much higher cost (full hardware redundancy). Highly available systems have minimal interruption with lower cost.",
      },
    ],
  },
  scalability: {
    id: "scalability",
    title: "Scalability",
    chapter: "chapter-i",
    emoji: "📈",
    summary: "How well a system handles growth by adding or removing resources.",
    image: "/images/system-design/scalability.png",
    content: [
      {
        type: "p",
        text: "Scalability is the measure of how well a system responds to changes by adding or removing resources to meet demands.",
      },
      { type: "h3", text: "Vertical Scaling (Scale Up)" },
      {
        type: "p",
        text: "Adding more power to an existing machine (more CPU, RAM, storage).",
      },
      {
        type: "table",
        headers: ["Advantages", "Disadvantages"],
        rows: [
          ["Simple to implement", "Risk of high downtime"],
          ["Easier to manage", "Harder to upgrade beyond hardware limits"],
          ["Data consistent", "Single point of failure"],
        ],
      },
      { type: "h3", text: "Horizontal Scaling (Scale Out)" },
      {
        type: "p",
        text: "Adding more machines to the system, distributing load across them.",
      },
      {
        type: "table",
        headers: ["Advantages", "Disadvantages"],
        rows: [
          ["Increased redundancy", "Increased complexity"],
          ["Better fault tolerance", "Potential data inconsistency"],
          ["Flexible and efficient", "Increased load on downstream services"],
        ],
      },
    ],
  },
  storage: {
    id: "storage",
    title: "Storage",
    chapter: "chapter-i",
    emoji: "💾",
    summary: "Storage types: file, block, object, and distributed file systems.",
    content: [
      { type: "h3", text: "RAID Levels" },
      {
        type: "list",
        items: [
          "**RAID 0** (Striping): Data split evenly across drives — high performance, no redundancy",
          "**RAID 1** (Mirroring): Exact copies on 2+ drives — survives single drive failure",
          "**RAID 5**: Striping with parity — needs 3+ drives, good balance of performance + safety",
          "**RAID 10**: Striping + Mirroring — best performance and redundancy, most expensive",
        ],
      },
      { type: "h3", text: "Storage Types" },
      {
        type: "list",
        items: [
          "**File Storage**: Hierarchical directory structure (e.g. Amazon EFS, Azure Files)",
          "**Block Storage**: Data in fixed-size blocks with unique IDs (e.g. Amazon EBS)",
          "**Object Storage**: Data as objects in a flat repository (e.g. Amazon S3, GCS)",
          "**NAS**: Network Attached Storage — central storage accessible over a network",
          "**HDFS**: Hadoop Distributed File System — designed for large datasets on commodity hardware",
        ],
      },
    ],
  },
  "databases-and-dbms": {
    id: "databases-and-dbms",
    title: "Databases & DBMS",
    chapter: "chapter-ii",
    emoji: "🗃️",
    summary: "Organized collections of data managed by a Database Management System.",
    image: "/images/system-design/database-types.png",
    content: [
      {
        type: "p",
        text: "A database is an organized collection of structured data typically stored electronically. A DBMS (Database Management System) serves as the interface between the database and applications, enabling retrieval, update, and management of data.",
      },
      { type: "h3", text: "Core Components" },
      {
        type: "list",
        items: [
          "**Schema**: Defines the structure of data — what types of data can go where",
          "**Table**: Collection of rows and columns (like a spreadsheet)",
          "**Column**: A set of data values of a particular type",
          "**Row**: A single record with related values",
        ],
      },
      { type: "h3", text: "Database Types" },
      {
        type: "list",
        items: [
          "**SQL / Relational** — Structured tables, ACID compliance",
          "**NoSQL / Document** — Flexible JSON-like documents (MongoDB)",
          "**NoSQL / Key-Value** — Simple key-value pairs (Redis)",
          "**NoSQL / Graph** — Nodes and edges (Neo4j)",
          "**NoSQL / Time Series** — Optimized for timestamped data (InfluxDB)",
          "**NoSQL / Wide Column** — Column families for big data (Cassandra)",
        ],
      },
    ],
  },
  "sql-databases": {
    id: "sql-databases",
    title: "SQL Databases",
    chapter: "chapter-ii",
    emoji: "📋",
    summary: "Relational databases with predefined schemas and ACID compliance.",
    content: [
      {
        type: "p",
        text: "SQL (relational) databases store data as tables with rows and columns, with predefined relationships between them. They use primary keys and foreign keys for data integrity. SQL databases follow the ACID consistency model.",
      },
      { type: "h3", text: "Advantages" },
      {
        type: "list",
        items: ["Simple and accurate", "Easy accessibility", "Strong data consistency", "Flexible querying with SQL"],
      },
      { type: "h3", text: "Disadvantages" },
      {
        type: "list",
        items: [
          "Expensive to maintain at scale",
          "Difficult schema evolution",
          "Performance hits from joins and denormalization",
          "Difficult to scale horizontally",
        ],
      },
      { type: "h3", text: "Key Concepts" },
      {
        type: "list",
        items: [
          "**Materialized Views**: Pre-computed query results stored for fast retrieval",
          "**N+1 Query Problem**: N additional SQL queries executed when one would suffice; fixed with eager loading",
        ],
      },
      { type: "h3", text: "Popular SQL Databases" },
      {
        type: "list",
        items: ["PostgreSQL", "MySQL", "MariaDB", "Amazon Aurora"],
      },
    ],
  },
  "nosql-databases": {
    id: "nosql-databases",
    title: "NoSQL Databases",
    chapter: "chapter-ii",
    emoji: "📂",
    summary: "Non-relational databases offering flexibility, scale, and varied data models.",
    content: [
      {
        type: "p",
        text: "NoSQL databases don't use SQL as their primary data access language. They don't require a pre-defined schema and follow the BASE consistency model. They are designed for scalability and high performance.",
      },
      { type: "h3", text: "Document Stores" },
      {
        type: "list",
        items: [
          "Stores data as JSON-like documents",
          "Flexible, schemaless, horizontally scalable",
          "Examples: MongoDB, CouchDB, Amazon DocumentDB",
        ],
      },
      { type: "h3", text: "Key-Value Stores" },
      {
        type: "list",
        items: [
          "Simplest NoSQL type — stores data as key-value pairs",
          "Extremely fast lookups, great for sessions and caching",
          "Examples: Redis, Memcached, Amazon DynamoDB",
        ],
      },
      { type: "h3", text: "Graph Databases" },
      {
        type: "list",
        items: [
          "Uses nodes, edges, and properties to represent relationships",
          "Excellent for social networks, recommendation engines, fraud detection",
          "Examples: Neo4j, Amazon Neptune, ArangoDB",
        ],
      },
      { type: "h3", text: "Time Series" },
      {
        type: "list",
        items: [
          "Optimized for timestamped data — fast insertion and retrieval",
          "Use cases: IoT, metrics, monitoring, financial trends",
          "Examples: InfluxDB, Apache Druid",
        ],
      },
      { type: "h3", text: "Wide Column" },
      {
        type: "list",
        items: [
          "Schema-agnostic, data stored in column families",
          "Handles petabytes of data, great for real-time big data",
          "Examples: Apache Cassandra, Google BigTable, ScyllaDB",
        ],
      },
    ],
  },
  "sql-vs-nosql": {
    id: "sql-vs-nosql",
    title: "SQL vs NoSQL",
    chapter: "chapter-ii",
    emoji: "⚔️",
    summary: "When to choose SQL relational databases versus NoSQL non-relational databases.",
    content: [
      { type: "h3", text: "High-Level Comparison" },
      {
        type: "table",
        headers: ["Aspect", "SQL", "NoSQL"],
        rows: [
          ["Schema", "Fixed, predefined", "Dynamic, flexible"],
          ["Consistency", "ACID", "BASE (eventual)"],
          ["Scalability", "Vertical (mostly)", "Horizontal"],
          ["Query Language", "SQL", "Database-specific APIs"],
          ["Joins", "Native support", "Limited/manual"],
          ["Use Cases", "Transactions, analytics", "Real-time, big data, unstructured"],
        ],
      },
      { type: "h3", text: "Use SQL when..." },
      {
        type: "list",
        items: [
          "Your data is structured with clear relationships",
          "You need strong consistency (financial transactions)",
          "Complex queries and joins are frequent",
          "Your schema is unlikely to change often",
        ],
      },
      { type: "h3", text: "Use NoSQL when..." },
      {
        type: "list",
        items: [
          "Your data is unstructured or semi-structured",
          "You need to scale horizontally to huge volumes",
          "Rapid development with evolving schemas",
          "High-throughput, low-latency access patterns",
        ],
      },
    ],
  },
  "database-replication": {
    id: "database-replication",
    title: "Database Replication",
    chapter: "chapter-ii",
    emoji: "🔁",
    summary: "Copying data across multiple database instances for redundancy and performance.",
    content: [
      {
        type: "p",
        text: "Database replication is the process of copying data from one database to one or more databases to increase availability, reliability, and fault tolerance.",
      },
      { type: "h3", text: "Replication Strategies" },
      {
        type: "list",
        items: [
          "**Master-Slave (Primary-Replica)**: All writes go to master; slaves handle reads. If master fails, a slave is promoted.",
          "**Master-Master**: Multiple masters accept writes; they sync with each other. More complex conflict resolution needed.",
          "**Synchronous**: Write confirmed only after all replicas acknowledge. Strong consistency but higher latency.",
          "**Asynchronous**: Write confirmed immediately; replicas update eventually. Lower latency but potential data loss.",
        ],
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "High availability — continue serving reads even if master fails",
          "Improved read performance — distribute reads across replicas",
          "Disaster recovery — replicas in different geographic regions",
        ],
      },
    ],
  },
  indexes: {
    id: "indexes",
    title: "Database Indexes",
    chapter: "chapter-ii",
    emoji: "🔍",
    summary: "Data structures that speed up data retrieval at the cost of extra write overhead.",
    content: [
      {
        type: "p",
        text: "An index is a data structure that improves the speed of data retrieval operations. It works like the index of a book — instead of scanning every row, the DB uses the index to quickly locate the data.",
      },
      { type: "h3", text: "Index Types" },
      {
        type: "list",
        items: [
          "**Clustered Index**: Physically sorts and stores data rows in the table based on the index key. Only one per table.",
          "**Non-Clustered Index**: Separate structure that points to data rows. Multiple allowed per table.",
          "**Composite Index**: Index on multiple columns together.",
          "**Full-Text Index**: Enables fast text search.",
          "**Partial Index**: Indexes only a subset of rows based on a condition.",
        ],
      },
      { type: "h3", text: "Trade-offs" },
      {
        type: "list",
        items: [
          "✅ Greatly speeds up SELECT queries",
          "❌ Slows down INSERT, UPDATE, DELETE operations",
          "❌ Requires additional storage space",
          "❌ Too many indexes can hurt overall performance",
        ],
      },
    ],
  },
  normalization: {
    id: "normalization",
    title: "Normalization & Denormalization",
    chapter: "chapter-ii",
    emoji: "📐",
    summary: "Organizing or intentionally duplicating data for correctness or performance.",
    content: [
      { type: "h3", text: "Normalization" },
      {
        type: "p",
        text: "Normalization organizes database tables to reduce redundancy and improve data integrity. It follows Normal Forms (1NF, 2NF, 3NF, BCNF) — each form eliminates specific types of data anomalies.",
      },
      {
        type: "list",
        items: [
          "**1NF**: Eliminate duplicate columns; create separate tables for related data",
          "**2NF**: Meet 1NF + remove partial dependencies on composite primary key",
          "**3NF**: Meet 2NF + remove transitive dependencies",
          "**BCNF**: Stricter version of 3NF",
        ],
      },
      { type: "h3", text: "Denormalization" },
      {
        type: "p",
        text: "Intentionally introducing redundancy by combining tables or adding duplicate data to improve read performance at the cost of write performance and storage.",
      },
      {
        type: "list",
        items: [
          "✅ Reduces expensive JOIN operations",
          "✅ Improves read query performance significantly",
          "❌ Increases storage requirements",
          "❌ Risk of data inconsistency",
        ],
      },
    ],
  },
  "acid-base": {
    id: "acid-base",
    title: "ACID & BASE Models",
    chapter: "chapter-ii",
    emoji: "🧪",
    summary: "Two contrasting consistency models: strict ACID vs flexible BASE.",
    content: [
      { type: "h3", text: "ACID (used by SQL databases)" },
      {
        type: "list",
        items: [
          "**Atomicity**: Transaction either fully completes or fully fails — no partial updates",
          "**Consistency**: Database transitions from one valid state to another; all constraints maintained",
          "**Isolation**: Concurrent transactions execute as if sequential; no interference",
          "**Durability**: Committed transactions persist even after system failures",
        ],
      },
      { type: "h3", text: "BASE (used by NoSQL databases)" },
      {
        type: "list",
        items: [
          "**Basically Available**: System guarantees availability, but may return stale data",
          "**Soft state**: State of the system may change over time, even without new input",
          "**Eventually Consistent**: System will become consistent over time — not immediately",
        ],
      },
      { type: "h3", text: "When to use which?" },
      {
        type: "list",
        items: [
          "ACID: Banking, e-commerce, medical records — anywhere data correctness is critical",
          "BASE: Social media feeds, analytics, recommendation systems — high availability matters more",
        ],
      },
    ],
  },
  "cap-theorem": {
    id: "cap-theorem",
    title: "CAP Theorem",
    chapter: "chapter-ii",
    emoji: "🔺",
    summary: "A distributed system can only guarantee two of: Consistency, Availability, Partition tolerance.",
    content: [
      {
        type: "p",
        text: "The CAP theorem (Brewer's theorem) states that a distributed system can only provide two of the following three guarantees simultaneously:",
      },
      {
        type: "list",
        items: [
          "**Consistency (C)**: Every read receives the most recent write or an error",
          "**Availability (A)**: Every request receives a response (not necessarily the most recent data)",
          "**Partition Tolerance (P)**: System continues operating despite network partitions between nodes",
        ],
      },
      {
        type: "p",
        text: "In practice, network partitions are inevitable in distributed systems. So you must choose between **CP** (consistency + partition tolerance) or **AP** (availability + partition tolerance).",
      },
      { type: "h3", text: "Real-world Examples" },
      {
        type: "table",
        headers: ["Type", "Examples", "Trade-off"],
        rows: [
          ["CP", "HBase, Zookeeper, MongoDB", "May reject requests during partition"],
          ["AP", "Cassandra, CouchDB, DynamoDB", "May return stale data during partition"],
          ["CA", "PostgreSQL, MySQL", "Only possible without partitions (single node)"],
        ],
      },
    ],
  },
  pacelc: {
    id: "pacelc",
    title: "PACELC Theorem",
    chapter: "chapter-ii",
    emoji: "🔷",
    summary: "Extension of CAP that also considers latency vs consistency tradeoffs without partitions.",
    content: [
      {
        type: "p",
        text: "PACELC extends CAP by also considering the latency vs consistency trade-off when the system is running normally (no partitions):",
      },
      {
        type: "list",
        items: [
          "If there is a **Partition (P)**, choose between **Availability (A)** or **Consistency (C)**",
          "**Else (E)** (no partition), choose between **Latency (L)** or **Consistency (C)**",
        ],
      },
      { type: "h3", text: "Examples" },
      {
        type: "table",
        headers: ["System", "Partition Behavior", "Normal Behavior"],
        rows: [
          ["DynamoDB", "AP — favors availability", "EL — favors low latency"],
          ["Cassandra", "AP — favors availability", "EL — favors low latency"],
          ["MongoDB", "CP — favors consistency", "EC — favors consistency"],
        ],
      },
    ],
  },
  transactions: {
    id: "transactions",
    title: "Transactions",
    chapter: "chapter-ii",
    emoji: "💳",
    summary: "A unit of work that must be executed as an atomic all-or-nothing operation.",
    content: [
      {
        type: "p",
        text: "A transaction is a sequence of operations performed as a single logical unit of work. Transactions follow ACID properties to ensure data integrity.",
      },
      { type: "h3", text: "Transaction States" },
      {
        type: "list",
        items: [
          "**Active**: Transaction is being executed",
          "**Partially Committed**: After last operation, before commit",
          "**Committed**: Successfully completed; changes are permanent",
          "**Failed**: Abnormal termination; must be rolled back",
          "**Aborted**: Rolled back; database restored to previous state",
        ],
      },
      { type: "h3", text: "Isolation Levels" },
      {
        type: "list",
        items: [
          "**Read Uncommitted**: Can read uncommitted changes (dirty reads possible)",
          "**Read Committed**: Only committed data is read (most common default)",
          "**Repeatable Read**: Same data returned for same query within transaction",
          "**Serializable**: Strictest — transactions appear sequential",
        ],
      },
    ],
  },
  "distributed-transactions": {
    id: "distributed-transactions",
    title: "Distributed Transactions",
    chapter: "chapter-ii",
    emoji: "🌐",
    summary: "Managing ACID properties across multiple distributed database nodes.",
    content: [
      {
        type: "p",
        text: "Distributed transactions span multiple nodes or services and must maintain ACID properties across all of them — which is challenging in distributed systems.",
      },
      { type: "h3", text: "Two-Phase Commit (2PC)" },
      {
        type: "list",
        items: [
          "**Phase 1 (Prepare)**: Coordinator asks all participants if they can commit",
          "**Phase 2 (Commit/Abort)**: If all participants agree, coordinator sends commit; otherwise abort",
          "Problem: Blocking if coordinator fails between phases",
        ],
      },
      { type: "h3", text: "Three-Phase Commit (3PC)" },
      {
        type: "p",
        text: "Adds a pre-commit phase to reduce blocking issues of 2PC, but still not perfect under network partitions.",
      },
      { type: "h3", text: "Saga Pattern" },
      {
        type: "p",
        text: "Break long-running transactions into a sequence of local transactions. Each step publishes an event; if a step fails, compensating transactions are executed to undo previous steps.",
      },
    ],
  },
  sharding: {
    id: "sharding",
    title: "Sharding",
    chapter: "chapter-ii",
    emoji: "🔨",
    summary: "Partitioning data across multiple database instances for horizontal scaling.",
    content: [
      {
        type: "p",
        text: "Sharding (horizontal partitioning) splits a large database into smaller pieces called shards, each hosted on a separate server. This enables horizontal scaling beyond what a single machine can handle.",
      },
      { type: "h3", text: "Sharding Strategies" },
      {
        type: "list",
        items: [
          "**Range-based**: Partition by value range (e.g. user IDs 1-1M on shard 1, 1M-2M on shard 2)",
          "**Hash-based**: Apply hash function to partition key to determine shard",
          "**Directory-based**: Lookup table maps keys to shard locations",
          "**Geographic**: Data sharded by user's geographic location",
        ],
      },
      { type: "h3", text: "Trade-offs" },
      {
        type: "list",
        items: [
          "✅ Enables horizontal scaling to handle massive datasets",
          "✅ Reduces query response time per shard",
          "❌ Cross-shard queries are expensive and complex",
          "❌ Rebalancing shards when adding/removing nodes is difficult",
          "❌ Application code becomes more complex",
        ],
      },
    ],
  },
  "consistent-hashing": {
    id: "consistent-hashing",
    title: "Consistent Hashing",
    chapter: "chapter-ii",
    emoji: "🔄",
    summary: "A hashing technique that minimizes remapping when nodes are added or removed.",
    content: [
      {
        type: "p",
        text: "Consistent hashing is a distributed hashing scheme that maps both data and servers to a virtual ring. When a server is added or removed, only a small fraction of keys need to be remapped — not all of them.",
      },
      { type: "h3", text: "How it works" },
      {
        type: "list",
        items: [
          "All servers and keys are hashed to positions on a circular ring",
          "Each key is assigned to the first server clockwise from its position",
          "Adding a server only takes keys from its immediate clockwise neighbor",
          "Removing a server only redistributes its keys to the next clockwise server",
        ],
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "Only K/N keys remapped when a node changes (K=keys, N=nodes)",
          "Enables smooth scaling of distributed caches and databases",
          "Used in: Cassandra, DynamoDB, Amazon S3, Akamai CDN",
        ],
      },
      { type: "h3", text: "Virtual Nodes" },
      {
        type: "p",
        text: "Each physical server is assigned multiple virtual positions on the ring to improve load distribution. More virtual nodes = more even distribution.",
      },
    ],
  },
  "database-federation": {
    id: "database-federation",
    title: "Database Federation",
    chapter: "chapter-ii",
    emoji: "🏛️",
    summary: "Splitting databases by function to reduce load and improve performance.",
    content: [
      {
        type: "p",
        text: "Database federation (functional partitioning) splits a database into multiple databases based on functionality. For example, separating users, products, and orders into separate databases.",
      },
      { type: "h3", text: "Advantages" },
      {
        type: "list",
        items: [
          "Smaller database sizes per service → better cache hit ratios",
          "Less read/write traffic to each database",
          "Can write in parallel — less replication lag",
          "Each team owns their database independently",
        ],
      },
      { type: "h3", text: "Disadvantages" },
      {
        type: "list",
        items: [
          "Cross-database joins require application-level logic",
          "More complex application code",
          "Higher latency for operations requiring data from multiple databases",
        ],
      },
    ],
  },
  "n-tier-architecture": {
    id: "n-tier-architecture",
    title: "N-Tier Architecture",
    chapter: "chapter-iii",
    emoji: "🏢",
    summary: "Separating application concerns into distinct physical or logical tiers.",
    content: [
      {
        type: "p",
        text: "N-tier architecture organizes applications into multiple layers (tiers), each with a specific role. The most common is 3-tier: presentation, application/logic, and data.",
      },
      { type: "h3", text: "Common Tiers" },
      {
        type: "list",
        items: [
          "**Presentation Tier**: User interface (browser, mobile app)",
          "**Application Tier**: Business logic, APIs, processing",
          "**Data Tier**: Database servers, storage",
        ],
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "Each tier can be scaled independently",
          "Separation of concerns improves maintainability",
          "Enhanced security — data tier not directly accessible from presentation tier",
          "Teams can work on different tiers simultaneously",
        ],
      },
    ],
  },
  "message-brokers": {
    id: "message-brokers",
    title: "Message Brokers",
    chapter: "chapter-iii",
    emoji: "📬",
    summary: "Middleware that translates messages between applications using different protocols.",
    content: [
      {
        type: "p",
        text: "A message broker is software that enables services and applications to communicate with each other using messages. It validates, stores, routes, and delivers messages to appropriate destinations.",
      },
      { type: "h3", text: "Common Messaging Patterns" },
      {
        type: "list",
        items: [
          "**Point-to-Point**: One sender → one receiver (queue-based)",
          "**Publish-Subscribe**: One publisher → many subscribers (topic-based)",
        ],
      },
      { type: "h3", text: "Popular Message Brokers" },
      {
        type: "list",
        items: [
          "**Apache Kafka**: High-throughput, durable, distributed streaming",
          "**RabbitMQ**: Flexible routing, multiple messaging protocols",
          "**Amazon SQS**: Managed queue service by AWS",
          "**Google Pub/Sub**: Managed pub/sub by GCP",
        ],
      },
    ],
  },
  "message-queues": {
    id: "message-queues",
    title: "Message Queues",
    chapter: "chapter-iii",
    emoji: "📤",
    summary: "FIFO queues that decouple producers from consumers for async processing.",
    content: [
      {
        type: "p",
        text: "A message queue is a form of asynchronous service-to-service communication used to decouple producers from consumers. Messages are stored until the consumer is ready to process them.",
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "**Decoupling**: Producer and consumer don't need to be available simultaneously",
          "**Reliability**: Messages persist until acknowledged",
          "**Peak shaving**: Handle traffic spikes without overwhelming consumers",
          "**Retry logic**: Failed messages can be retried automatically",
        ],
      },
      { type: "h3", text: "Use Cases" },
      {
        type: "list",
        items: [
          "Email notifications / background jobs",
          "Order processing systems",
          "Image/video processing pipelines",
          "Microservice communication",
        ],
      },
    ],
  },
  "publish-subscribe": {
    id: "publish-subscribe",
    title: "Publish-Subscribe",
    chapter: "chapter-iii",
    emoji: "📢",
    summary: "Messaging pattern where publishers send to topics and subscribers receive selectively.",
    content: [
      {
        type: "p",
        text: "In the Pub/Sub pattern, publishers send messages to topics (not to specific consumers). Subscribers register interest in specific topics and receive all messages published to those topics.",
      },
      { type: "h3", text: "Key Characteristics" },
      {
        type: "list",
        items: [
          "Publishers and subscribers are fully decoupled",
          "One message can be delivered to multiple subscribers",
          "Subscribers can subscribe/unsubscribe at any time",
          "Messages can be filtered by topic or content",
        ],
      },
      { type: "h3", text: "Advantages" },
      {
        type: "list",
        items: [
          "Eliminates polling — push-based delivery",
          "Easy to add new consumers without changing publisher",
          "Supports fan-out patterns (broadcast to many)",
          "Great for real-time event-driven systems",
        ],
      },
    ],
  },
  esb: {
    id: "esb",
    title: "Enterprise Service Bus (ESB)",
    chapter: "chapter-iii",
    emoji: "🚌",
    summary: "Centralized middleware for integrating multiple enterprise applications.",
    content: [
      {
        type: "p",
        text: "An ESB is a centralized software bus used to connect various services and applications within an organization. It handles message routing, transformation, and integration between disparate systems.",
      },
      { type: "h3", text: "Features" },
      {
        type: "list",
        items: [
          "Protocol transformation (REST → SOAP, XML → JSON)",
          "Message routing and filtering",
          "Service orchestration",
          "Load balancing and failover",
        ],
      },
      { type: "h3", text: "Trade-offs vs Microservices" },
      {
        type: "p",
        text: "ESBs can become a bottleneck and single point of failure. Modern microservices architectures prefer lightweight messaging (Kafka, RabbitMQ) without a centralized bus.",
      },
    ],
  },
  "monoliths-microservices": {
    id: "monoliths-microservices",
    title: "Monoliths & Microservices",
    chapter: "chapter-iii",
    emoji: "🧩",
    summary: "Two fundamental architectural styles for building applications.",
    content: [
      { type: "h3", text: "Monolithic Architecture" },
      {
        type: "p",
        text: "All components of an application are packaged together as a single deployable unit. Simple to develop initially but becomes harder to scale and maintain as it grows.",
      },
      {
        type: "table",
        headers: ["Monolith Pros", "Monolith Cons"],
        rows: [
          ["Simple to develop and deploy", "Hard to scale individual components"],
          ["Easy local testing", "Entire app redeploys on any change"],
          ["No distributed system complexity", "Technology lock-in for whole codebase"],
        ],
      },
      { type: "h3", text: "Microservices Architecture" },
      {
        type: "p",
        text: "Application broken into small, independent services that communicate via APIs. Each service has its own database and can be deployed independently.",
      },
      {
        type: "table",
        headers: ["Microservices Pros", "Microservices Cons"],
        rows: [
          ["Independent deployments", "Distributed system complexity"],
          ["Technology flexibility per service", "Network latency between services"],
          ["Fault isolation", "Data consistency challenges"],
          ["Independent scaling per service", "Harder to test end-to-end"],
        ],
      },
    ],
  },
  "event-driven": {
    id: "event-driven",
    title: "Event-Driven Architecture",
    chapter: "chapter-iii",
    emoji: "⚡",
    summary: "Services communicate through events instead of direct API calls.",
    content: [
      {
        type: "p",
        text: "Event-Driven Architecture (EDA) is a software design paradigm where services communicate by producing and consuming events. Services are decoupled — they don't call each other directly.",
      },
      { type: "h3", text: "Key Components" },
      {
        type: "list",
        items: [
          "**Event Producers**: Generate events when state changes (e.g. order placed)",
          "**Event Broker**: Receives and routes events (e.g. Kafka, RabbitMQ)",
          "**Event Consumers**: React to relevant events (e.g. notification service)",
        ],
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "Loose coupling between services",
          "Easy to add new consumers without modifying producers",
          "Natural fit for real-time, asynchronous workflows",
          "Better scalability and resilience",
        ],
      },
    ],
  },
  "event-sourcing": {
    id: "event-sourcing",
    title: "Event Sourcing",
    chapter: "chapter-iii",
    emoji: "📝",
    summary: "Store state as an immutable log of events rather than current state.",
    content: [
      {
        type: "p",
        text: "Event sourcing stores application state as an immutable sequence of events. Instead of storing the current state, you store every event that led to it. Current state is derived by replaying events.",
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "Complete audit log of all changes — perfect traceability",
          "Can reconstruct state at any point in time",
          "Event log can drive multiple read models (projections)",
          "Natural fit for financial and compliance systems",
        ],
      },
      { type: "h3", text: "Challenges" },
      {
        type: "list",
        items: [
          "Querying current state requires replaying events (solved with snapshots)",
          "Event schema evolution is tricky",
          "Higher storage requirements",
          "Conceptually different from CRUD thinking",
        ],
      },
    ],
  },
  cqrs: {
    id: "cqrs",
    title: "CQRS",
    chapter: "chapter-iii",
    emoji: "✂️",
    summary: "Separate read (Query) and write (Command) operations into distinct models.",
    content: [
      {
        type: "p",
        text: "Command and Query Responsibility Segregation (CQRS) separates the data modification operations (Commands) from the data retrieval operations (Queries). Each uses a different model, data store, or even service.",
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "Read and write sides can be optimized and scaled independently",
          "Read models can be denormalized for fast queries",
          "Write models can enforce business rules and consistency",
          "Natural complement to Event Sourcing",
        ],
      },
      { type: "h3", text: "Trade-offs" },
      {
        type: "list",
        items: [
          "Increased architectural complexity",
          "Eventual consistency between read and write models",
          "More code to maintain (two separate models)",
        ],
      },
    ],
  },
  "api-gateway": {
    id: "api-gateway",
    title: "API Gateway",
    chapter: "chapter-iii",
    emoji: "🚪",
    summary: "A single entry point for clients to communicate with multiple microservices.",
    content: [
      {
        type: "p",
        text: "An API Gateway acts as a reverse proxy that routes client requests to appropriate microservices. It aggregates results and returns them as a single response, handling cross-cutting concerns centrally.",
      },
      { type: "h3", text: "Key Responsibilities" },
      {
        type: "list",
        items: [
          "**Authentication & Authorization**: Validate tokens before routing",
          "**Rate Limiting**: Protect backend services from abuse",
          "**Load Balancing**: Distribute requests across service instances",
          "**Request/Response Transformation**: Adapt request formats",
          "**Caching**: Cache responses from backend services",
          "**Logging & Monitoring**: Centralized observability",
          "**SSL Termination**: Handle HTTPS at the gateway",
        ],
      },
      { type: "h3", text: "Popular API Gateways" },
      {
        type: "list",
        items: ["Amazon API Gateway", "Kong", "NGINX", "Traefik", "Apigee", "Azure API Management"],
      },
    ],
  },
  "rest-graphql-grpc": {
    id: "rest-graphql-grpc",
    title: "REST, GraphQL & gRPC",
    chapter: "chapter-iii",
    emoji: "🔗",
    summary: "Three major API paradigms — each with different trade-offs.",
    content: [
      { type: "h3", text: "REST (Representational State Transfer)" },
      {
        type: "list",
        items: [
          "Stateless, resource-based API style using HTTP verbs (GET, POST, PUT, DELETE)",
          "Easy to understand, widely supported, cacheable",
          "Problem: over-fetching (too much data) or under-fetching (multiple trips needed)",
        ],
      },
      { type: "h3", text: "GraphQL" },
      {
        type: "list",
        items: [
          "Client specifies exactly what data it needs in a single query",
          "Eliminates over/under-fetching problems",
          "Single endpoint (`/graphql`), strongly typed schema",
          "Great for complex, nested data and multiple clients with different data needs",
        ],
      },
      { type: "h3", text: "gRPC (Google Remote Procedure Call)" },
      {
        type: "list",
        items: [
          "Uses HTTP/2 and Protocol Buffers (binary format) for ultra-fast communication",
          "Strongly typed contracts via `.proto` files",
          "Excellent for internal microservice-to-microservice communication",
          "Supports streaming (server-streaming, client-streaming, bidirectional)",
        ],
      },
      {
        type: "table",
        headers: ["", "REST", "GraphQL", "gRPC"],
        rows: [
          ["Protocol", "HTTP/1.1+", "HTTP", "HTTP/2"],
          ["Format", "JSON/XML", "JSON", "Protocol Buffers"],
          ["Best for", "Public APIs", "Flexible clients", "Internal microservices"],
          ["Caching", "Easy (HTTP)", "Complex", "Not built-in"],
        ],
      },
    ],
  },
  "long-polling-ws-sse": {
    id: "long-polling-ws-sse",
    title: "Long Polling, WebSockets & SSE",
    chapter: "chapter-iii",
    emoji: "📡",
    summary: "Techniques for real-time communication between client and server.",
    content: [
      { type: "h3", text: "Long Polling" },
      {
        type: "p",
        text: "Client sends a request and the server holds it open until data is available, then responds. Client immediately sends another request. Simpler than WebSockets but more overhead.",
      },
      { type: "h3", text: "WebSockets" },
      {
        type: "p",
        text: "Full-duplex communication over a single persistent TCP connection. Either party can send messages at any time. Ideal for real-time applications like chat, games, and live dashboards.",
      },
      { type: "h3", text: "Server-Sent Events (SSE)" },
      {
        type: "p",
        text: "One-way channel: server pushes updates to client over HTTP. Simpler than WebSockets when you only need server-to-client communication (e.g. live feeds, notifications).",
      },
      {
        type: "table",
        headers: ["Feature", "Long Polling", "WebSockets", "SSE"],
        rows: [
          ["Direction", "Bi-directional", "Full-duplex", "Server → Client only"],
          ["Protocol", "HTTP", "WS / WSS", "HTTP"],
          ["Overhead", "High (new request each time)", "Low", "Low"],
          ["Best for", "Simple polling", "Chat, games", "Notifications, live feeds"],
        ],
      },
    ],
  },
  "geohashing-quadtrees": {
    id: "geohashing-quadtrees",
    title: "Geohashing & Quadtrees",
    chapter: "chapter-iv",
    emoji: "🗺️",
    summary: "Data structures for encoding geographic location and enabling proximity queries.",
    content: [
      { type: "h3", text: "Geohashing" },
      {
        type: "p",
        text: "Geohashing encodes geographic coordinates (latitude, longitude) into a short string. Nearby locations share common prefixes. Used for proximity searches without complex spatial queries.",
      },
      { type: "h3", text: "Quadtrees" },
      {
        type: "p",
        text: "A quadtree recursively subdivides 2D space into four quadrants. Each node represents a geographic region. Used in databases like PostgreSQL (with PostGIS) and map applications for efficient spatial queries.",
      },
      { type: "h3", text: "Use Cases" },
      {
        type: "list",
        items: [
          "Finding nearby restaurants/drivers (Uber, Lyft)",
          "Location-based search (Yelp, Google Maps)",
          "Clustering map markers at different zoom levels",
          "Spatial indexing in geographic databases",
        ],
      },
    ],
  },
  "circuit-breaker": {
    id: "circuit-breaker",
    title: "Circuit Breaker",
    chapter: "chapter-iv",
    emoji: "🔌",
    summary: "Prevents cascading failures by stopping calls to failing services.",
    content: [
      {
        type: "p",
        text: "The Circuit Breaker pattern prevents a system from repeatedly calling a failing service, which would cascade failures across the system. Named after electrical circuit breakers.",
      },
      { type: "h3", text: "Three States" },
      {
        type: "list",
        items: [
          "**Closed** (normal): Requests pass through. Failure count is tracked.",
          "**Open** (tripped): All requests fail immediately without calling the service. Timer starts.",
          "**Half-Open** (testing): A few requests allowed through to test if service recovered. If successful → Closed; if failing → back to Open.",
        ],
      },
      { type: "h3", text: "Benefits" },
      {
        type: "list",
        items: [
          "Prevents cascading failures across microservices",
          "Gives failing services time to recover",
          "Improves system resilience and user experience",
          "Implemented in: Netflix Hystrix, Resilience4j, Istio",
        ],
      },
    ],
  },
  "rate-limiting": {
    id: "rate-limiting",
    title: "Rate Limiting",
    chapter: "chapter-iv",
    emoji: "🚦",
    summary: "Controls how many requests a client can make within a time window.",
    content: [
      {
        type: "p",
        text: "Rate limiting controls the rate of requests a client can make to a service, protecting it from abuse, DDoS attacks, and ensuring fair usage.",
      },
      { type: "h3", text: "Common Algorithms" },
      {
        type: "list",
        items: [
          "**Token Bucket**: Tokens added at fixed rate; each request consumes a token. Allows bursts up to bucket size.",
          "**Leaky Bucket**: Requests processed at a fixed rate; excess queued or dropped. Smooths out bursts.",
          "**Fixed Window Counter**: Count requests in fixed time windows. Simple but allows burst at window edges.",
          "**Sliding Window Log**: Track timestamps of each request in a rolling window. More accurate but memory-intensive.",
          "**Sliding Window Counter**: Hybrid — approximates sliding window using fixed window data. Good balance.",
        ],
      },
      { type: "h3", text: "Rate Limit Response" },
      {
        type: "p",
        text: "When rate limit exceeded: return HTTP 429 (Too Many Requests) with a `Retry-After` header indicating when the client can try again.",
      },
    ],
  },
  "service-discovery": {
    id: "service-discovery",
    title: "Service Discovery",
    chapter: "chapter-iv",
    emoji: "🔭",
    summary: "Mechanism for services to automatically find each other in a dynamic environment.",
    content: [
      {
        type: "p",
        text: "Service discovery allows services to find and communicate with each other without hard-coding network locations. Essential in dynamic environments like Kubernetes where instances come and go.",
      },
      { type: "h3", text: "Client-Side Discovery" },
      {
        type: "p",
        text: "Client queries a service registry (e.g. Eureka), gets a list of available instances, and selects one using a load balancing algorithm. More complex client logic, but more control.",
      },
      { type: "h3", text: "Server-Side Discovery" },
      {
        type: "p",
        text: "Client sends request to a load balancer/router, which queries the registry and forwards to the correct instance. Simpler client, more infrastructure needed.",
      },
      { type: "h3", text: "Service Registry Tools" },
      {
        type: "list",
        items: ["Consul", "Eureka (Netflix)", "etcd", "Zookeeper", "Kubernetes Service DNS"],
      },
    ],
  },
  "sla-slo-sli": {
    id: "sla-slo-sli",
    title: "SLA, SLO & SLI",
    chapter: "chapter-iv",
    emoji: "📜",
    summary: "Service reliability agreements, objectives, and indicators for measuring system health.",
    content: [
      { type: "h3", text: "SLI (Service Level Indicator)" },
      {
        type: "p",
        text: "A measurable metric that reflects the health of a service. Examples: request latency, error rate, availability percentage, throughput.",
      },
      { type: "h3", text: "SLO (Service Level Objective)" },
      {
        type: "p",
        text: "A target value or range for an SLI. Example: 'P99 latency < 200ms' or '99.9% availability'. Internal goals your team commits to.",
      },
      { type: "h3", text: "SLA (Service Level Agreement)" },
      {
        type: "p",
        text: "A formal contract with customers that specifies what happens if SLOs aren't met (refunds, credits, penalties). More conservative than internal SLOs.",
      },
      { type: "h3", text: "Error Budgets" },
      {
        type: "p",
        text: "If your SLO is 99.9% availability, your error budget is 0.1% downtime (~8.7 hours/year). Teams can spend this budget on risky deployments; when exhausted, freeze deployments until it replenishes.",
      },
    ],
  },
  "disaster-recovery": {
    id: "disaster-recovery",
    title: "Disaster Recovery",
    chapter: "chapter-iv",
    emoji: "🆘",
    summary: "Strategies to restore service after catastrophic failures or data loss.",
    content: [
      {
        type: "p",
        text: "Disaster recovery (DR) involves strategies and procedures to resume operations after catastrophic events like data center failures, natural disasters, or ransomware attacks.",
      },
      { type: "h3", text: "Key Metrics" },
      {
        type: "list",
        items: [
          "**RTO (Recovery Time Objective)**: Maximum acceptable downtime before service must be restored",
          "**RPO (Recovery Point Objective)**: Maximum acceptable data loss measured in time (e.g. 1 hour of data)",
        ],
      },
      { type: "h3", text: "DR Strategies (Cold → Hot)" },
      {
        type: "list",
        items: [
          "**Backup & Restore**: Cheapest. Restore from backups. High RTO/RPO.",
          "**Pilot Light**: Minimal replica running; scale up when needed. Medium RTO/RPO.",
          "**Warm Standby**: Scaled-down but fully functional replica. Lower RTO/RPO.",
          "**Multi-Site Active-Active**: Full replica running and serving traffic. Minimal RTO/RPO but most expensive.",
        ],
      },
    ],
  },
  "vms-containers": {
    id: "vms-containers",
    title: "VMs & Containers",
    chapter: "chapter-iv",
    emoji: "📦",
    summary: "Virtualization technologies for isolating and running application workloads.",
    content: [
      { type: "h3", text: "Virtual Machines (VMs)" },
      {
        type: "p",
        text: "VMs emulate full hardware systems using a hypervisor. Each VM has its own OS, making them heavy but fully isolated. Boot time: minutes. Excellent isolation and security.",
      },
      { type: "h3", text: "Containers" },
      {
        type: "p",
        text: "Containers package an application with its dependencies and share the host OS kernel. Lightweight, start in seconds, and highly portable. Docker is the dominant container runtime.",
      },
      {
        type: "table",
        headers: ["Aspect", "VMs", "Containers"],
        rows: [
          ["Isolation", "Full OS isolation", "Process-level isolation"],
          ["Size", "GBs", "MBs"],
          ["Startup time", "Minutes", "Seconds"],
          ["Overhead", "High", "Low"],
          ["Portability", "Limited", "Highly portable"],
          ["Use case", "Legacy apps, strict isolation", "Microservices, CI/CD"],
        ],
      },
    ],
  },
  "oauth-oidc": {
    id: "oauth-oidc",
    title: "OAuth 2.0 & OpenID Connect",
    chapter: "chapter-iv",
    emoji: "🔑",
    summary: "Industry-standard protocols for authorization and authentication.",
    content: [
      { type: "h3", text: "OAuth 2.0" },
      {
        type: "p",
        text: "An authorization framework that lets users grant third-party applications limited access to their resources without exposing credentials. Uses access tokens.",
      },
      { type: "h3", text: "OAuth 2.0 Grant Types" },
      {
        type: "list",
        items: [
          "**Authorization Code**: Most secure; used for server-side apps",
          "**PKCE (Proof Key for Code Exchange)**: Authorization code flow for SPAs and mobile apps",
          "**Client Credentials**: Machine-to-machine communication",
          "**Implicit**: Deprecated; tokens returned directly to browser",
        ],
      },
      { type: "h3", text: "OpenID Connect (OIDC)" },
      {
        type: "p",
        text: "An identity layer built on top of OAuth 2.0. While OAuth handles authorization (what you can do), OIDC handles authentication (who you are). Adds an ID Token (JWT) with user information.",
      },
    ],
  },
  sso: {
    id: "sso",
    title: "Single Sign-On (SSO)",
    chapter: "chapter-iv",
    emoji: "🎫",
    summary: "One login granting access to multiple applications or services.",
    content: [
      {
        type: "p",
        text: "SSO allows users to authenticate once and gain access to multiple related systems without re-authenticating for each one. A central identity provider (IdP) handles authentication.",
      },
      { type: "h3", text: "How SSO Works" },
      {
        type: "list",
        items: [
          "User visits Application A and is redirected to the IdP (e.g. Okta, Auth0, Google)",
          "User authenticates with the IdP",
          "IdP issues a token/session and redirects back to Application A",
          "When user visits Application B, IdP recognizes the active session — no re-login needed",
        ],
      },
      { type: "h3", text: "Common SSO Protocols" },
      {
        type: "list",
        items: [
          "**SAML 2.0**: XML-based, widely used in enterprise",
          "**OAuth 2.0 + OIDC**: Modern web and mobile apps",
          "**Kerberos**: Common in Windows/Active Directory environments",
        ],
      },
    ],
  },
  "ssl-tls": {
    id: "ssl-tls",
    title: "SSL, TLS & mTLS",
    chapter: "chapter-iv",
    emoji: "🔒",
    summary: "Cryptographic protocols for securing communications over networks.",
    content: [
      { type: "h3", text: "SSL / TLS" },
      {
        type: "p",
        text: "TLS (Transport Layer Security) and its predecessor SSL encrypt communications between client and server. When you see HTTPS, TLS is in use. Provides confidentiality, integrity, and server authentication.",
      },
      { type: "h3", text: "TLS Handshake" },
      {
        type: "list",
        items: [
          "Client sends supported cipher suites and TLS version",
          "Server responds with certificate and selected cipher suite",
          "Client verifies server certificate with a CA",
          "Session keys are established using asymmetric encryption",
          "All subsequent communication uses symmetric encryption",
        ],
      },
      { type: "h3", text: "mTLS (Mutual TLS)" },
      {
        type: "p",
        text: "Both client AND server authenticate each other using certificates. Used in zero-trust security models and microservice-to-microservice communication (e.g. via Istio service mesh).",
      },
    ],
  },
  "interview-framework": {
    id: "interview-framework",
    title: "System Design Interview Framework",
    chapter: "chapter-v",
    emoji: "🗺️",
    summary: "A structured approach to tackle system design interview questions.",
    content: [
      {
        type: "p",
        text: "System design interviews test your ability to design large-scale distributed systems. Follow this structured framework to organize your thinking:",
      },
      { type: "h3", text: "Step 1: Clarify Requirements (5 min)" },
      {
        type: "list",
        items: [
          "Functional requirements: What does the system do?",
          "Non-functional: Scale, latency, availability, consistency needs",
          "Ask about expected users, requests per second, data volume",
        ],
      },
      { type: "h3", text: "Step 2: Capacity Estimation (5 min)" },
      {
        type: "list",
        items: [
          "Estimate reads/writes per second",
          "Storage requirements (data size × retention)",
          "Bandwidth requirements",
          "Memory needed for caching",
        ],
      },
      { type: "h3", text: "Step 3: High-Level Design (10-15 min)" },
      {
        type: "list",
        items: [
          "Draw major components: clients, API layer, services, databases, caches",
          "Define API endpoints",
          "Choose SQL vs NoSQL and justify the choice",
        ],
      },
      { type: "h3", text: "Step 4: Deep Dive (10-15 min)" },
      {
        type: "list",
        items: [
          "Focus on most critical/complex components",
          "Discuss scaling strategies, bottlenecks",
          "Handle edge cases and failure scenarios",
        ],
      },
      { type: "h3", text: "Step 5: Review & Wrap-up (5 min)" },
      {
        type: "list",
        items: [
          "Identify bottlenecks and how to address them",
          "Discuss monitoring, alerting, and operations",
          "Summarize key trade-offs you made",
        ],
      },
    ],
  },
  "url-shortener": {
    id: "url-shortener",
    title: "Design: URL Shortener",
    chapter: "chapter-v",
    emoji: "🔗",
    summary: "Design a URL shortening service like bit.ly or TinyURL.",
    content: [
      { type: "h3", text: "Requirements" },
      {
        type: "list",
        items: [
          "Shorten long URLs → short unique codes (e.g. bit.ly/abc123)",
          "Redirect short URL → original URL",
          "Analytics: click counts, geographic distribution",
          "Scale: 100M URLs created/day, 10B redirects/day",
        ],
      },
      { type: "h3", text: "Core Design" },
      {
        type: "list",
        items: [
          "**Encoding**: Base62 (a-z, A-Z, 0-9) → 7 characters gives 62⁷ ≈ 3.5 trillion unique URLs",
          "**Database**: Store mapping of short code → original URL with metadata",
          "**Cache**: Redis cache for hot URLs — most links follow 80/20 rule",
          "**Redirect**: HTTP 301 (permanent) or 302 (temporary, for analytics)",
        ],
      },
      { type: "h3", text: "Scaling Considerations" },
      {
        type: "list",
        items: [
          "Read-heavy system → aggressively cache popular URLs",
          "Distributed ID generation (Snowflake) to avoid collisions",
          "CDN for globally distributed redirect speed",
          "Rate limiting to prevent abuse",
        ],
      },
    ],
  },
  whatsapp: {
    id: "whatsapp",
    title: "Design: WhatsApp",
    chapter: "chapter-v",
    emoji: "💬",
    summary: "Design a real-time messaging system like WhatsApp.",
    content: [
      { type: "h3", text: "Requirements" },
      {
        type: "list",
        items: [
          "1-on-1 and group messaging",
          "Real-time delivery with read receipts",
          "Media sharing (images, videos, audio)",
          "Online/offline presence indicators",
          "Scale: 2B users, 100B messages/day",
        ],
      },
      { type: "h3", text: "Core Components" },
      {
        type: "list",
        items: [
          "**WebSocket Server**: Persistent connections for real-time messaging",
          "**Message Store**: Cassandra — excellent for time-series, high write throughput",
          "**User Service**: Manages user profiles and presence status",
          "**Notification Service**: Push notifications for offline users (APNs, FCM)",
          "**Media Service**: S3 for storage, CDN for distribution",
        ],
      },
      { type: "h3", text: "Message Delivery Flow" },
      {
        type: "list",
        items: [
          "Sender sends message to WebSocket server",
          "Server stores message in Cassandra",
          "If recipient online: deliver via WebSocket",
          "If offline: queue message → push notification → deliver on reconnect",
          "Sender gets delivery receipt; recipient gets 'seen' receipt on read",
        ],
      },
    ],
  },
  twitter: {
    id: "twitter",
    title: "Design: Twitter",
    chapter: "chapter-v",
    emoji: "🐦",
    summary: "Design a social media platform with tweets, timelines, and followers.",
    content: [
      { type: "h3", text: "Requirements" },
      {
        type: "list",
        items: [
          "Post tweets (text, images, videos)",
          "Follow/unfollow users",
          "View personalized home timeline",
          "Scale: 500M users, 150M DAU, 500M tweets/day",
        ],
      },
      { type: "h3", text: "Timeline Approaches" },
      {
        type: "list",
        items: [
          "**Fan-out on write (Push)**: When a tweet is posted, push it to all followers' timelines immediately. Fast reads, slow writes. Good for non-celebrities.",
          "**Fan-out on read (Pull)**: Compute timeline on read by fetching from all followed users. Slow reads, fast writes. Good for celebrities with millions of followers.",
          "**Hybrid**: Use push for regular users, pull for celebrity accounts (>X followers).",
        ],
      },
      { type: "h3", text: "Key Design Decisions" },
      {
        type: "list",
        items: [
          "**Tweet Storage**: Cassandra for tweets (time-series, high write throughput)",
          "**Timeline Cache**: Redis sorted sets for home timelines",
          "**Search**: Elasticsearch for full-text tweet search",
          "**Media**: S3 + CDN for images and videos",
        ],
      },
    ],
  },
  netflix: {
    id: "netflix",
    title: "Design: Netflix",
    chapter: "chapter-v",
    emoji: "🎬",
    summary: "Design a video streaming platform at Netflix scale.",
    content: [
      { type: "h3", text: "Requirements" },
      {
        type: "list",
        items: [
          "Stream video content to millions of simultaneous viewers",
          "Support multiple devices, resolutions, and network conditions",
          "Content recommendation engine",
          "Scale: 220M subscribers, 15% of global internet bandwidth",
        ],
      },
      { type: "h3", text: "Core Architecture" },
      {
        type: "list",
        items: [
          "**Encoding Pipeline**: Videos transcoded into multiple resolutions/codecs (H.264, VP9, HEVC) and bitrates via AWS Elastic Transcoder",
          "**CDN (Open Connect)**: Netflix's proprietary CDN with servers inside ISPs. Videos cached close to users.",
          "**Adaptive Bitrate Streaming (ABR)**: Client switches quality based on network speed",
          "**Microservices**: 700+ microservices on AWS — each team owns their service",
        ],
      },
      { type: "h3", text: "Reliability Patterns" },
      {
        type: "list",
        items: [
          "**Chaos Monkey**: Randomly terminates instances to test resilience",
          "**Circuit Breakers**: Hystrix prevents cascading failures",
          "**Fallback**: Serve cached/static content if recommendation service is down",
        ],
      },
    ],
  },
  uber: {
    id: "uber",
    title: "Design: Uber",
    chapter: "chapter-v",
    emoji: "🚗",
    summary: "Design a ride-sharing platform with real-time location matching.",
    content: [
      { type: "h3", text: "Requirements" },
      {
        type: "list",
        items: [
          "Match riders with nearby drivers in real-time",
          "Track driver locations continuously",
          "Calculate fares and ETAs",
          "Scale: 100M users, 40M rides/day, global",
        ],
      },
      { type: "h3", text: "Location Tracking" },
      {
        type: "list",
        items: [
          "Drivers send GPS updates every 5-10 seconds",
          "Location data stored in Redis (in-memory, fast updates)",
          "Geohashing to group drivers by geographic area",
          "Quadtrees for efficient nearest-driver search",
        ],
      },
      { type: "h3", text: "Matching Algorithm" },
      {
        type: "list",
        items: [
          "Rider requests ride → find drivers in nearby geohash cells",
          "Filter by availability, rating, car type",
          "Offer ride to closest driver → timeout if no response → try next",
          "ETA calculation using road network graph (Dijkstra/A*)",
        ],
      },
      { type: "h3", text: "Key Technologies" },
      {
        type: "list",
        items: [
          "**Redis**: Driver location store with geospatial commands",
          "**Kafka**: Stream location updates and ride events",
          "**Cassandra**: Trip history and user data",
          "**Maps API**: Google Maps / Mapbox for routing and ETAs",
        ],
      },
    ],
  },
};
