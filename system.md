# system-design-interview-question
# 500+ System Design Interview Questions & Answers (Basic to Advanced)

A single, self-contained reference of system design interview questions **with answers** - from the absolute basics (what is scalability?) all the way to staff/principal-level distributed systems topics - organized by topic so you can prep in order or jump straight to your weak areas.

**Total questions in this file: 502+**, every one with a concise, interview-ready answer.

## 📌 How to use this README

- Questions are grouped into **24 sections**, roughly ordered from *fundamentals* to *advanced/staff-level*.
- Every question has a **short, direct answer** (2-5 sentences) written to be a quick refresher, not a full essay - use it to jog your memory fast before an interview, then go deeper via the linked videos/your own notes on any topic you're weak on.
- Each section also starts with a small, **hand-verified** list of real YouTube channels/playlists that are the best free resources for that topic, for when you want a full video walkthrough instead of a text answer.
- **A note on video links:** links are given per-section rather than per-question. Attaching a unique, verified YouTube link to each of the 500+ individual questions isn't reliably possible - most specific interview-style questions have no single matching video, and guessing plausible-looking URLs risks giving you broken or simply made-up links. Every channel linked below is real and active, so searching the question text on YouTube (or within these channels) will almost always surface a directly relevant video.
- For the 'Design X' case-study questions (Section 20), the answers are intentionally brief - a sketch of the key components and the core design decision - not a full interview-length breakdown. Use them as a mental outline, then practice talking through the full design yourself.
- ⭐ Star this repo if it helps your prep, and feel free to open a PR to add topics, questions, or expand answers.

## 🎥 Best Overall YouTube Channels for System Design (verified)

- **[Gaurav Sen](https://www.youtube.com/@gkcs)** - Best for fundamentals & concepts; his System Design Playlist builds ideas up step by step.
- **[ByteByteGo](https://www.youtube.com/@ByteByteGo)** - From the authors of the *System Design Interview* book series - excellent visual explainers.
- **[Hussein Nasser](https://www.youtube.com/@hnasr)** - Best for deep backend/networking/database internals (protocols, Postgres locks, TCP, etc.).
- **[Hello Interview](https://www.youtube.com/@hello_interview)** - Best for realistic, structured HLD/LLD interview walkthroughs by ex-FAANG interviewers.
- **[Tech Dummies - Narendra L](https://www.youtube.com/c/TechDummiesNarendraL)** - Great mix of HLD and LLD case-study walkthroughs.

---

## 📚 Table of Contents

- [1. System Design Fundamentals (Basic)](#1-system-design-fundamentals-basic) (30 questions)
- [2. Scalability & Load Balancing](#2-scalability-load-balancing) (25 questions)
- [3. Networking & Communication Protocols](#3-networking-communication-protocols) (25 questions)
- [4. Caching](#4-caching) (20 questions)
- [5. Relational (SQL) Databases](#5-relational-sql-databases) (20 questions)
- [6. NoSQL Databases](#6-nosql-databases) (20 questions)
- [7. Database Replication, Sharding & Partitioning](#7-database-replication-sharding-partitioning) (20 questions)
- [8. CAP Theorem & Consistency Models](#8-cap-theorem-consistency-models) (15 questions)
- [9. Message Queues & Event-Driven Architecture](#9-message-queues-event-driven-architecture) (20 questions)
- [10. Microservices Architecture](#10-microservices-architecture) (25 questions)
- [11. API Design & Gateways](#11-api-design-gateways) (18 questions)
- [12. Distributed Systems Concepts](#12-distributed-systems-concepts) (25 questions)
- [13. Consensus Algorithms & Distributed Transactions](#13-consensus-algorithms-distributed-transactions) (15 questions)
- [14. Security in System Design](#14-security-in-system-design) (20 questions)
- [15. Rate Limiting & Throttling](#15-rate-limiting-throttling) (10 questions)
- [16. Search Systems](#16-search-systems) (10 questions)
- [17. Notification Systems](#17-notification-systems) (8 questions)
- [18. Storage Systems & CDN](#18-storage-systems-cdn) (11 questions)
- [19. Monitoring, Logging & Observability](#19-monitoring-logging-observability) (15 questions)
- [20. High-Level Design (HLD) Case Studies - 'Design X' Questions](#20-high-level-design-hld-case-studies-design-x-questions) (68 questions)
- [21. Low-Level Design (LLD) & Object-Oriented Design](#21-low-level-design-lld-object-oriented-design) (30 questions)
- [22. Behavioral & Soft-Skill Aspects of System Design Interviews](#22-behavioral-soft-skill-aspects-of-system-design-interviews) (12 questions)
- [23. Advanced & Staff+ Level Topics](#23-advanced-staff-level-topics) (25 questions)
- [24. Rapid-Fire & Tricky Conceptual Questions](#24-rapid-fire-tricky-conceptual-questions) (15 questions)

---

## 1. System Design Fundamentals (Basic)

**📺 Recommended videos for this section:**
- [Gaurav Sen - System Design Playlist](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**1. What is system design and why does it matter for interviews?**

System design is the process of defining the architecture, components, APIs, and data flow of a software system to meet given functional and non-functional requirements (scale, reliability, latency, cost). Interviews use it to see how you reason about ambiguity, trade-offs, and real-world constraints — not just whether you know buzzwords.

**2. What is the difference between High-Level Design (HLD) and Low-Level Design (LLD)?**

HLD focuses on the overall architecture: services, databases, caches, queues, and how they interact (the 'boxes and arrows'). LLD focuses on the internal implementation of a single component: classes, interfaces, data structures, and design patterns. HLD answers 'what pieces do we need and how do they talk?'; LLD answers 'how exactly is each piece built?'

**3. What is scalability? How is it different from performance?**

Scalability is a system's ability to handle increasing load (users, data, traffic) by adding resources, without a proportional drop in performance. Performance is how fast the system responds under a given load. A system can be fast at low load (good performance) but not scalable if it collapses as load grows.

**4. What is the difference between vertical scaling and horizontal scaling?**

Vertical scaling (scale-up) means adding more CPU/RAM/disk to a single machine — simple but has a hard ceiling and a single point of failure. Horizontal scaling (scale-out) means adding more machines and distributing load across them — more complex (needs load balancing, coordination) but scales almost indefinitely and improves fault tolerance.

**5. What is latency? How is it different from throughput?**

Latency is the time taken to complete a single operation (e.g., time for one request to get a response). Throughput is the number of operations completed per unit time (e.g., requests/sec). A system can have high throughput but high latency per request (batching), or low latency but limited throughput.

**6. What is availability? How is it measured (the 'nines')?**

Availability is the percentage of time a system is operational and able to serve requests, usually expressed in 'nines': 99.9% ('three nines') allows ~8.7 hours of downtime/year, 99.99% allows ~52 minutes/year, 99.999% allows ~5 minutes/year. Higher availability requires redundancy, failover, and often exponentially more engineering effort/cost.

**7. What is reliability, and how is it different from availability?**

Reliability is the probability a system performs correctly over a period of time without failure — it's about correctness of behavior. Availability is about uptime — whether the system is reachable at all. A system can be available (responds) but unreliable (returns wrong/corrupted data).

**8. What is fault tolerance?**

Fault tolerance is a system's ability to continue operating correctly even when some of its components fail, typically achieved through redundancy (replicas), failover mechanisms, and graceful degradation, so a single component failure doesn't cause a full outage.

**9. What is redundancy and why is it needed in distributed systems?**

Redundancy means having duplicate components (servers, databases, network paths) so that if one fails, another can take over. It's needed because hardware, software, and networks fail regularly at scale; redundancy converts individual failures into non-events for the end user.

**10. What is a single point of failure (SPOF), and how do you eliminate one?**

A SPOF is any component whose failure brings down the whole system (e.g., one database instance, one load balancer). You eliminate it by adding redundancy — multiple instances behind a load balancer, database replicas with automatic failover, and multi-AZ/multi-region deployment.

**11. What is throughput and how do you estimate it for a system?**

Throughput is the rate of successfully processed operations (requests/sec, writes/sec). You estimate it by taking expected user counts, actions per user, and peak-to-average traffic ratios, then dividing by time (e.g., DAU × actions/day / 86,400 seconds, multiplied by a peak factor like 2–3x).

**12. What is the difference between a monolithic and a distributed architecture?**

A monolith runs all functionality as a single deployable unit on one or few machines, sharing memory and a single codebase — simple to build/deploy but hard to scale specific parts independently. A distributed architecture splits functionality across multiple independent services/machines communicating over a network, enabling independent scaling and deployment at the cost of added complexity (network calls, partial failures, consistency).

**13. What are the key non-functional requirements to clarify in a system design interview?**

Scale (users, requests/sec, data volume), latency targets, availability/consistency needs, read vs. write ratio, durability guarantees, cost constraints, and security/compliance requirements. Clarifying these early shapes every subsequent design decision.

**14. How do you approach back-of-the-envelope estimation (traffic, storage, bandwidth)?**

Start from known/assumed inputs (DAU, requests per user, average object size), derive QPS (queries per second) by dividing daily volume by 86,400 and applying a peak multiplier, estimate storage by multiplying record size by record count and retention period, and estimate bandwidth by multiplying QPS by average payload size.

**15. What is the difference between a client-server and a peer-to-peer architecture?**

In client-server, clients request services from a central server (or cluster) which is authoritative for data/logic. In peer-to-peer, nodes act as both clients and servers, sharing resources directly with each other with no central authority (e.g., BitTorrent), which can scale well but complicates consistency and trust.

**16. What is a stateless vs. stateful service, and why do stateless services scale better?**

A stateless service keeps no session/user data between requests — any instance can handle any request, making horizontal scaling and failover trivial (just add more instances behind a load balancer). A stateful service holds data in memory or local disk tied to a specific instance, requiring sticky sessions or external state stores to scale safely.

**17. What is elasticity in cloud computing?**

Elasticity is the ability to automatically provision and de-provision compute/storage resources in response to real-time load, so the system scales up during traffic spikes and scales down (saving cost) during quiet periods — usually implemented via auto-scaling groups tied to metrics like CPU or queue depth.

**18. What is graceful degradation in system design?**

Graceful degradation means a system continues to provide partial or reduced functionality when parts of it fail or are overloaded, instead of failing completely — e.g., showing cached/stale recommendations when the recommendation service is down, rather than showing an error page.

**19. What is the difference between throughput-oriented and latency-oriented systems?**

Throughput-oriented systems (e.g., batch analytics pipelines) optimize for maximum total work done per unit time, tolerating higher per-item delay via batching. Latency-oriented systems (e.g., online APIs, trading systems) optimize for minimizing response time per individual request, even if that means lower overall efficiency.

**20. What is a service level agreement (SLA), SLO, and SLI?**

An SLI (Service Level Indicator) is a measured metric (e.g., 99th percentile latency). An SLO (Service Level Objective) is an internal target for that metric (e.g., p99 < 200ms). An SLA (Service Level Agreement) is an external, often contractual, commitment to customers with defined consequences if not met.

**21. What are the four steps of a typical system design interview framework?**

1) Clarify functional and non-functional requirements and estimate scale. 2) Define the API/data model. 3) Sketch a high-level architecture (services, DB, cache, queue). 4) Deep-dive into bottlenecks, scaling, and trade-offs the interviewer cares most about.

**22. How do you clarify requirements before jumping into a design?**

Ask about core use cases in scope, expected scale (users, QPS, data size), read/write ratio, latency and availability expectations, consistency requirements, and any constraints (budget, existing tech stack) — this prevents designing the wrong system entirely.

**23. What is capacity estimation and why is it important?**

Capacity estimation is calculating expected QPS, storage, memory, and bandwidth needs upfront. It's important because it drives concrete architectural decisions — e.g., whether you need sharding, how many cache nodes you need, or whether a single SQL database is even feasible.

**24. What is the difference between functional and non-functional requirements?**

Functional requirements describe what the system does (e.g., 'users can post a tweet'). Non-functional requirements describe how well it does it (e.g., latency, availability, scalability, security) — both must be captured, but non-functional requirements usually drive the harder architectural decisions.

**25. How do you decide between build vs. buy for a component in system design?**

Weigh factors like time-to-market, in-house expertise, differentiation value (is this your core competency?), total cost of ownership, and vendor lock-in risk. Commodity infrastructure (message queues, databases) is usually 'bought' (managed services), while core business logic is usually 'built'.

**26. What is a bottleneck in a system, and how do you identify one?**

A bottleneck is the component that limits overall system throughput/latency because everything else is waiting on it. You identify it via load testing, profiling, and monitoring (CPU, memory, I/O, queue depth per component) to find which resource saturates first under increasing load.

**27. What is the difference between synchronous and asynchronous communication?**

Synchronous communication means the caller blocks and waits for a response before proceeding (e.g., a REST call). Asynchronous communication means the caller sends a request/message and continues without waiting, processing the result later (e.g., via a message queue or callback) — improving throughput and decoupling at the cost of added complexity.

**28. What is idempotency and why does it matter in distributed systems?**

An idempotent operation produces the same result no matter how many times it's applied (e.g., 'set balance to $100' vs. 'add $10'). It matters because networks are unreliable — clients often retry requests, and idempotency ensures retries don't cause duplicate side effects like double charges.

**29. What is back-pressure in a system, and why is it necessary?**

Back-pressure is a mechanism where a downstream component signals an upstream producer to slow down when it can't keep up, preventing unbounded queue growth, memory exhaustion, and cascading failure — implemented via bounded queues, flow-control protocols, or explicit rate signaling.

**30. What is the CAP theorem, in simple terms?**

CAP theorem states that during a network partition, a distributed system must choose between Consistency (every read sees the latest write) and Availability (every request gets a response) — you cannot guarantee both simultaneously when nodes can't communicate. Outside of a partition, both are typically achievable.

---

## 2. Scalability & Load Balancing

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**31. What is a load balancer and why is it needed?**

A load balancer distributes incoming traffic across multiple backend servers so no single server is overwhelmed. It's needed for scalability (spread load), high availability (route around failed servers), and simpler operations (add/remove servers without client changes).

**32. What is the difference between Layer 4 and Layer 7 load balancing?**

Layer 4 (transport layer) load balancing routes traffic based on IP and TCP/UDP port info without inspecting the payload — fast and protocol-agnostic. Layer 7 (application layer) load balancing inspects HTTP headers, cookies, or URLs to make smarter routing decisions (e.g., route /api to one cluster, /static to another) at the cost of more CPU overhead.

**33. What are common load balancing algorithms (round robin, least connections, IP hash)?**

Round robin cycles through servers in order; weighted round robin gives more traffic to stronger servers; least connections routes to the server with fewest active connections; least response time considers latency too; IP hash routes based on a hash of the client IP for session stickiness.

**34. What is a reverse proxy, and how is it different from a load balancer?**

A reverse proxy sits in front of backend servers and forwards client requests to them, often adding caching, SSL termination, and compression — it may or may not distribute load across multiple servers. A load balancer's primary job is specifically distributing traffic across multiple backend instances; in practice, many products (like Nginx or HAProxy) do both.

**35. What is a forward proxy vs. a reverse proxy?**

A forward proxy sits in front of clients and forwards their requests to the internet on their behalf (hides the client from the server, e.g., corporate proxies). A reverse proxy sits in front of servers and forwards client requests to them (hides the server from the client).

**36. What is DNS load balancing?**

DNS load balancing returns different IP addresses for the same domain name to different clients (round robin or geo-based), spreading traffic across multiple servers or data centers at the DNS resolution step — coarse-grained and slow to react to failures due to DNS caching/TTL.

**37. What is health checking in a load balancer?**

Health checking is the load balancer periodically pinging backend servers (via TCP connect, HTTP endpoint, etc.) to verify they're alive and responsive, automatically removing unhealthy servers from the rotation and re-adding them once they recover.

**38. What is sticky session (session affinity) and when would you use it?**

Sticky sessions route all requests from a given client to the same backend server (via cookie or IP hash), used when session state is stored in server memory rather than an external store. It's generally discouraged in favor of stateless services with externalized session storage (e.g., Redis) for better scalability.

**39. How does a load balancer handle failover?**

The load balancer continuously health-checks backends; when one fails checks, it's marked unhealthy and removed from routing until it passes checks again, ensuring traffic is only sent to working instances — combined with redundant load balancers themselves (often via DNS or virtual IP failover) to avoid the LB being a SPOF.

**40. What is horizontal scaling with auto-scaling groups?**

An auto-scaling group automatically adds or removes server instances based on metrics like CPU utilization, request count, or queue depth, ensuring the fleet size matches current demand — reducing cost during low traffic and maintaining performance during spikes.

**41. What is the difference between active-active and active-passive scaling?**

In active-active, multiple instances/regions all serve live traffic simultaneously, maximizing resource use and providing instant failover. In active-passive, a standby instance/region sits idle (or does minimal work) and only takes over when the active one fails — simpler consistency but wastes idle capacity and has slower failover.

**42. What is a hot spot in a distributed system and how do you resolve it?**

A hot spot is when one shard/partition/node receives disproportionately more traffic than others (e.g., a viral post's data on one shard), causing it to become a bottleneck while others are underutilized. Fixes include better shard key design, adding a random suffix to spread keys, caching hot items, or dynamically splitting hot partitions.

**43. How do you scale a read-heavy system vs. a write-heavy system?**

For read-heavy systems, add caching layers and read replicas to spread read load. For write-heavy systems, use sharding to parallelize writes, write-optimized data stores (log-structured merge trees), and asynchronous processing (queues) to smooth write bursts, since replicas don't help write scalability.

**44. What is connection pooling, and why is it important at scale?**

Connection pooling maintains a reusable pool of open database/network connections instead of creating a new one per request, which is expensive (TCP handshake, auth). It's important at scale because it drastically reduces latency and resource usage under high concurrent load.

**45. What is the thundering herd problem, and how do you mitigate it?**

Thundering herd happens when many clients/threads simultaneously wake up and hit a resource at once (e.g., all cache entries expiring at the same time, causing a flood to the database). Mitigations include staggered/jittered TTLs, request coalescing (single flight), and locks so only one request repopulates the cache while others wait.

**46. What is a service mesh, and how does it relate to load balancing?**

A service mesh (e.g., Istio, Linkerd) is an infrastructure layer of sidecar proxies that handles service-to-service traffic, including client-side load balancing, retries, circuit breaking, and observability — moving load-balancing logic out of application code into infrastructure.

**47. How do global server load balancers (GSLB) work across regions?**

GSLB uses DNS or anycast IP routing combined with health checks and latency/geo data to direct users to the nearest or healthiest data center/region, providing both performance (lower latency) and disaster recovery (route away from a failed region).

**48. What is the difference between scaling up a database vs. scaling out?**

Scaling up a database means giving it a bigger machine (more CPU/RAM/faster disks) — simple but has diminishing returns and a hard ceiling. Scaling out means sharding data across multiple database instances — enables near-limitless growth but requires application-level routing logic and complicates cross-shard queries/transactions.

**49. How do you design a system to handle traffic spikes (e.g., flash sales)?**

Use auto-scaling with pre-warmed capacity, queue incoming requests (message queue) to smooth bursts, apply rate limiting/waiting rooms, cache aggressively, use a CDN for static content, and pre-compute/pre-provision inventory locks to avoid database contention at the exact sale start time.

**50. What is a circuit breaker pattern and how does it help scalability?**

A circuit breaker monitors calls to a downstream service and 'trips open' after repeated failures, immediately failing fast (or returning a fallback) instead of letting requests pile up and time out, preventing cascading failures and giving the downstream service time to recover.

**51. What is bulkheading in distributed systems design?**

Bulkheading isolates resources (thread pools, connection pools) per downstream dependency so that if one dependency becomes slow/overloaded, it can't exhaust shared resources and take down calls to unrelated, healthy dependencies — named after ship compartments that contain flooding.

**52. What is the retry storm problem and how do you prevent it?**

A retry storm happens when many clients simultaneously retry failed requests to an already-overloaded service, making the overload worse and delaying recovery. Prevention includes exponential backoff with jitter, capping max retries, and combining retries with circuit breakers.

**53. What is graceful shutdown / connection draining in load-balanced systems?**

When taking a server instance out of rotation (deploy, scale-down), the load balancer stops sending new requests to it but lets existing in-flight requests finish ('drain') before terminating it, avoiding dropped requests during deploys or scale-in events.

**54. How do you scale WebSocket connections across multiple servers?**

Use a load balancer that supports sticky, long-lived connections, keep connection state minimal/externalized (e.g., in Redis), and use a pub/sub backbone (Redis Pub/Sub, Kafka) so a message sent by any server can be broadcast to the specific server holding the target user's connection.

**55. How would you design a system for 1 million concurrent users?**

Combine horizontal scaling with stateless application servers behind load balancers, aggressive caching (CDN + application cache), database read replicas and sharding for write scale, asynchronous processing via queues for non-critical work, and connection-efficient protocols (HTTP/2, WebSockets) with autoscaling to absorb variable load.

---

## 3. Networking & Communication Protocols

**📺 Recommended videos for this section:**
- [Hussein Nasser](https://www.youtube.com/@hnasr)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**56. What happens when you type a URL into a browser and press Enter?**

The browser checks its cache/does a DNS lookup to resolve the domain to an IP, establishes a TCP connection (with TLS handshake for HTTPS) to that IP, sends an HTTP request, the server processes it and sends back an HTTP response, and the browser parses/renders the HTML, fetching additional resources (CSS, JS, images) along the way.

**57. What is the difference between TCP and UDP?**

TCP is connection-oriented, reliable, ordered, and has flow/congestion control — it retransmits lost packets, at the cost of latency overhead. UDP is connectionless and unreliable — packets can be lost or arrive out of order, but it has minimal overhead, making it ideal for real-time use cases like video streaming or gaming where speed matters more than perfect delivery.

**58. What is the three-way handshake in TCP?**

The client sends a SYN packet, the server responds with SYN-ACK, and the client responds with ACK — after this handshake, a reliable, full-duplex connection is established between client and server before any application data is sent.

**59. What is HTTP and how does it differ from HTTPS?**

HTTP is the application-layer protocol for transferring web content in plain text over TCP. HTTPS is HTTP layered over TLS/SSL, encrypting the traffic so it can't be read or tampered with in transit, and also authenticating the server's identity via certificates.

**60. What is the difference between HTTP/1.1, HTTP/2 and HTTP/3?**

HTTP/1.1 sends requests over separate (or serially reused) TCP connections, suffering head-of-line blocking. HTTP/2 introduces multiplexing (many requests over one TCP connection), header compression, and server push, greatly reducing latency. HTTP/3 replaces TCP with QUIC (over UDP), eliminating TCP-level head-of-line blocking and speeding up connection setup.

**61. What is QUIC and why does HTTP/3 use it?**

QUIC is a transport protocol built on UDP that combines the reliability of TCP with built-in TLS encryption and faster connection establishment (0-RTT/1-RTT handshakes), and — crucially — multiplexes streams so packet loss on one stream doesn't block others, which is why HTTP/3 adopted it to fix TCP's head-of-line blocking.

**62. What is a WebSocket and how is it different from HTTP polling?**

A WebSocket is a persistent, full-duplex connection over a single TCP socket that allows the server to push data to the client at any time without the client re-requesting it. HTTP polling requires the client to repeatedly send new HTTP requests to check for updates, which is far less efficient and has higher latency.

**63. What is long polling vs. short polling vs. WebSockets vs. Server-Sent Events?**

Short polling: client repeatedly requests at fixed intervals, wasteful when nothing changed. Long polling: server holds the request open until new data is available, then responds — fewer wasted requests but still per-message overhead. WebSockets: a persistent bidirectional connection, most efficient for frequent two-way updates. Server-Sent Events (SSE): a persistent one-way (server-to-client) stream over plain HTTP, simpler than WebSockets when the client doesn't need to push data back.

**64. What is gRPC and when would you choose it over REST?**

gRPC is an RPC framework using HTTP/2 and Protocol Buffers for compact, strongly-typed, binary communication with built-in support for streaming. You'd choose it over REST for internal service-to-service communication where performance and strict contracts matter, though REST/JSON remains more common for public-facing APIs due to easier debugging and browser support.

**65. What is the difference between REST and SOAP?**

REST is an architectural style using standard HTTP verbs and typically JSON, favoring simplicity and statelessness. SOAP is a strict, XML-based protocol with a formal contract (WSDL), built-in error handling, and support for stricter security/transaction standards — more common in legacy enterprise/financial systems, while REST dominates modern web APIs.

**66. What is a TLS/SSL handshake and why does it matter for security and latency?**

The TLS handshake negotiates the encryption algorithm, exchanges certificates to authenticate the server, and establishes shared session keys before any encrypted data is sent. It matters for security (prevents eavesdropping/tampering) but adds round trips (latency), which is why session resumption and TLS 1.3's 0-RTT/1-RTT handshakes are used to speed it up.

**67. What is DNS and how does DNS resolution work step by step?**

DNS translates human-readable domain names into IP addresses. Resolution: the browser checks local cache, then a resolver (often the ISP's) queries a root nameserver, which points to a TLD nameserver (e.g., .com), which points to the authoritative nameserver for the domain, which returns the actual IP — results are cached at each layer based on TTL.

**68. What is a CDN and how does it reduce latency?**

A Content Delivery Network is a geographically distributed set of edge servers that cache and serve content close to the end user, reducing latency by avoiding a round trip to the origin server, and also offloading traffic from the origin, improving scalability and resilience.

**69. What is anycast routing and how is it used by CDNs and DNS providers?**

Anycast advertises the same IP address from multiple physical locations; network routing (BGP) automatically directs each user's traffic to the topologically nearest location advertising that IP. CDNs and DNS providers use it so users automatically connect to the nearest edge/nameserver without any application-level logic.

**70. What is NAT and why is it relevant in distributed systems?**

Network Address Translation maps private IP addresses to a public IP (and back), allowing many devices to share one public IP. It's relevant because it complicates peer-to-peer connections (NAT traversal techniques like STUN/TURN are needed), and matters when designing services that need to track true client IPs behind NAT/proxies.

**71. What is the OSI model and why do interviewers ask about it?**

The OSI model is a 7-layer conceptual framework (Physical, Data Link, Network, Transport, Session, Presentation, Application) describing how network communication is layered. Interviewers ask about it to gauge whether you understand where technologies like TCP, IP, HTTP, and TLS actually operate and interact.

**72. What is a socket, and how does the OS handle thousands of open sockets?**

A socket is an OS-level endpoint (IP + port + protocol) for network communication. The OS uses efficient I/O multiplexing mechanisms (epoll on Linux, kqueue on BSD) to handle thousands of concurrent sockets without dedicating a thread per connection, which is how modern high-concurrency servers (Nginx, event-loop-based servers) scale.

**73. What is multiplexing in HTTP/2?**

Multiplexing allows multiple independent request/response streams to be sent concurrently over a single TCP connection, interleaved as frames, eliminating the need for multiple parallel connections and reducing the head-of-line blocking seen in HTTP/1.1 at the connection level.

**74. What is head-of-line blocking and how does QUIC solve it?**

Head-of-line blocking occurs when a lost or delayed packet blocks all subsequent data behind it from being processed, even if that data was otherwise ready. In TCP, one lost packet stalls all HTTP/2 streams on that connection; QUIC solves this by multiplexing streams at the transport layer itself, so loss on one stream doesn't block others.

**75. What is keep-alive in HTTP connections?**

Keep-alive allows a TCP connection to remain open and be reused for multiple sequential HTTP requests/responses instead of opening a new connection per request, reducing the overhead of repeated TCP/TLS handshakes and improving performance.

**76. What is a webhook and how does it differ from polling an API?**

A webhook is a callback URL that a service calls automatically (an HTTP POST) when an event happens, pushing data to the consumer in real time. Polling requires the consumer to repeatedly ask 'anything new?', which wastes resources and adds latency between the event and its detection.

**77. What is mutual TLS (mTLS) and where is it used?**

mTLS is TLS where both the client and server present certificates to authenticate each other (not just the server, as in standard TLS), commonly used for service-to-service authentication within a service mesh or between trusted internal microservices/partners.

**78. How does a firewall fit into network-level system design?**

A firewall filters incoming/outgoing network traffic based on rules (IP, port, protocol), sitting at network boundaries to block unauthorized access, and is a foundational layer of defense-in-depth alongside application-level security controls.

**79. What is the difference between IPv4 and IPv6 and why does it matter at scale?**

IPv4 uses 32-bit addresses (~4.3 billion addresses), which are largely exhausted, driving reliance on NAT. IPv6 uses 128-bit addresses, providing effectively unlimited address space and simplifying peer-to-peer connectivity — increasingly relevant for IoT and globally distributed systems needing unique addressable endpoints.

**80. What is a message framing problem in TCP streams and how is it solved?**

TCP delivers a byte stream with no inherent message boundaries, so a receiver can't tell where one application message ends and the next begins. It's solved by framing techniques: length-prefixing each message, using delimiters, or using a protocol (like HTTP or protobuf-based RPC) that defines explicit message boundaries.

---

## 4. Caching

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**81. What is caching and why is it critical for performance?**

Caching stores frequently accessed data in a fast-access layer (memory) closer to the consumer, avoiding expensive recomputation or slow data-source reads. It's critical because most systems have highly skewed access patterns (a small set of data is read far more often), so caching that hot set dramatically cuts latency and backend load.

**82. What is the difference between client-side, CDN, and server-side caching?**

Client-side caching stores data in the browser/app (e.g., HTTP cache headers, local storage). CDN caching stores content at edge servers close to users, reducing origin load and latency. Server-side caching (e.g., Redis, in-process cache) sits between the application and the database/backend to speed up repeated backend operations.

**83. What is a cache hit ratio and how do you improve it?**

Cache hit ratio is the percentage of requests served from cache vs. total requests. You improve it by increasing cache size, choosing better eviction policies (matching real access patterns), increasing TTLs where staleness is acceptable, and pre-warming the cache with known-hot data.

**84. What are common cache eviction policies (LRU, LFU, FIFO, MRU)?**

LRU (Least Recently Used) evicts the item not accessed for the longest time — good for typical recency-based access. LFU (Least Frequently Used) evicts the item accessed least often overall. FIFO evicts the oldest inserted item regardless of usage. MRU (Most Recently Used) evicts the most recently used item, useful in specific scan-heavy access patterns.

**85. What is the difference between write-through, write-around, and write-back caching?**

Write-through writes to cache and the database simultaneously (synchronously) — safe but adds write latency. Write-around writes directly to the database, bypassing the cache (cache is populated only on reads) — avoids caching data that may never be read again. Write-back writes to cache first and asynchronously flushes to the database later — fastest writes but risks data loss if the cache fails before flushing.

**86. What is cache invalidation, and why is it considered a hard problem?**

Cache invalidation is removing or updating stale cached data when the underlying source changes. It's hard because you must track exactly which cache entries depend on which data, coordinate invalidation across distributed cache nodes, and avoid race conditions where a stale value is re-cached right after invalidation.

**87. What is a distributed cache (e.g., Redis, Memcached) and when do you need one?**

A distributed cache runs as a separate cluster shared by multiple application servers, so cached data is consistent across the fleet rather than siloed per-instance. You need one once you scale beyond a single application server, or need cache data to survive individual app server restarts.

**88. What is cache stampede (dogpile effect) and how do you prevent it?**

Cache stampede happens when a popular cache entry expires and many concurrent requests simultaneously miss the cache and hit the backend/database at once, overwhelming it. Prevention: request coalescing (only one request recomputes while others wait), staggered/jittered TTLs, or serving stale data while asynchronously refreshing in the background.

**89. What is consistent hashing and how does it help distributed caches?**

Consistent hashing maps both cache nodes and keys onto a hash ring, so each key is owned by the nearest node clockwise on the ring. When a node is added or removed, only the keys near that node need to be remapped — not the entire keyspace — minimizing cache misses and data movement during scaling events.

**90. What is Redis and what data structures does it support?**

Redis is an in-memory data store supporting strings, hashes, lists, sets, sorted sets, bitmaps, HyperLogLogs, streams, and geospatial indexes, with optional persistence to disk — making it useful not just as a cache but also for leaderboards, rate limiting, pub/sub, and queues.

**91. What is the difference between Redis and Memcached?**

Redis supports rich data structures, persistence, replication, clustering, pub/sub, and Lua scripting, making it more versatile. Memcached is simpler — a pure, multi-threaded, in-memory key-value store optimized for raw caching throughput with less operational complexity — good when all you need is a simple, fast cache.

**92. How do you cache database query results safely?**

Use a cache-aside pattern: on read, check the cache first; on miss, query the database and populate the cache with a sensible TTL; on write, invalidate (or update) the relevant cache keys so subsequent reads don't serve stale data — and use short TTLs as a safety net against missed invalidations.

**93. What is a negative cache and when is it useful?**

A negative cache stores the result of a 'not found' lookup (e.g., a nonexistent user ID) so repeated queries for that missing item don't keep hitting the backend — useful to prevent abuse or repeated wasted lookups, though with a shorter TTL since the item might later be created.

**94. What is cache aside (lazy loading) pattern?**

In cache-aside, the application is responsible for checking the cache first, and on a miss, loading data from the database and writing it into the cache before returning it — the cache is only populated 'lazily' as data is actually requested, keeping unused data out of the cache.

**95. How do you keep a cache consistent with the source of truth?**

Common strategies: explicit invalidation/update on every write, short TTLs as a safety net, versioned cache keys, or event-driven invalidation (publishing a change event that all cache nodes subscribe to) — full real-time consistency is hard, so most systems accept brief staleness windows.

**96. What is edge caching and how do CDNs use it?**

Edge caching stores content on servers physically close to end users (at the network 'edge'), so CDNs use it to serve static (and increasingly dynamic) content with minimal latency, reducing the number of requests that need to travel back to the origin server.

**97. What is TTL (time to live) in caching, and how do you choose a good TTL?**

TTL is how long a cached entry is considered valid before it expires. You choose it by balancing freshness needs (how quickly does the underlying data change and how stale can it be) against load reduction benefits (longer TTL = fewer backend hits but staler data).

**98. How would you design a caching layer for a read-heavy news feed?**

Cache pre-computed feed pages per user (or per feed shard) in Redis with a moderate TTL, use cache-aside for cold users, invalidate/update relevant entries on new posts (or accept eventual consistency with periodic regeneration), and combine with a CDN for any shared/public content.

**99. What is a write-behind cache and what are its trade-offs?**

A write-behind (write-back) cache accepts writes immediately and asynchronously persists them to the database in the background/batches. Trade-off: much lower write latency and reduced database load, but risk of data loss if the cache crashes before the write is flushed, and added complexity in ordering/conflict handling.

**100. What is browser caching and how do HTTP cache headers control it?**

Browser caching stores responses locally so repeat requests for the same resource don't hit the network. Headers like Cache-Control (max-age, no-cache, no-store), ETag, and Last-Modified control whether/how long a resource is cached and how the browser revalidates it (conditional requests) before reusing a cached copy.

---

## 5. Relational (SQL) Databases

**📺 Recommended videos for this section:**
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)
- [Hussein Nasser](https://www.youtube.com/@hnasr)

**101. What is a relational database and what are ACID properties?**

A relational database organizes data into tables with defined relationships, queried via SQL. ACID properties guarantee reliable transactions: Atomicity (all-or-nothing), Consistency (valid state transitions per constraints), Isolation (concurrent transactions don't interfere), and Durability (committed data survives crashes).

**102. What is normalization, and what are 1NF, 2NF, 3NF?**

Normalization organizes data to reduce redundancy and avoid update anomalies. 1NF requires atomic column values (no repeating groups). 2NF requires 1NF plus every non-key column depends on the whole primary key (relevant for composite keys). 3NF requires 2NF plus no non-key column depends on another non-key column (removing transitive dependencies).

**103. What is denormalization and when would you use it?**

Denormalization intentionally introduces redundancy (duplicating data across tables) to reduce the number of joins needed for reads, trading storage and write complexity for read performance — used when read performance is critical and the duplicated data changes infrequently.

**104. What is an index, and how does a B-Tree index work?**

An index is a data structure that speeds up lookups on a column at the cost of extra storage and slower writes. A B-Tree index keeps sorted keys in a balanced tree structure where each node has multiple children, allowing lookups, range scans, and inserts in O(log n) time by traversing a shallow tree.

**105. What is the difference between a clustered and a non-clustered index?**

A clustered index determines the physical order in which table rows are stored on disk — there can be only one per table (usually the primary key). A non-clustered index is a separate structure that stores pointers back to the actual rows, so a table can have many non-clustered indexes.

**106. What is a composite index and when should you use one?**

A composite index spans multiple columns, useful when queries frequently filter or sort by the same combination of columns together. Column order matters — the index is most effective for queries that filter on a left-to-right prefix of the indexed columns.

**107. What is a database transaction and what isolation levels exist?**

A transaction is a group of operations executed as a single atomic unit. Isolation levels (from weakest to strongest): Read Uncommitted, Read Committed, Repeatable Read, and Serializable — each trades off consistency guarantees (avoiding dirty reads, non-repeatable reads, phantom reads) against concurrency/performance.

**108. What is the difference between optimistic and pessimistic locking?**

Pessimistic locking acquires a lock on data before modifying it, blocking other transactions until released — safe but can hurt concurrency. Optimistic locking assumes conflicts are rare: it reads data with a version number, and on write, checks the version hasn't changed, retrying if it has — better throughput when contention is low.

**109. What is a deadlock in a database, and how is it resolved?**

A deadlock occurs when two or more transactions each hold a lock the other needs, and neither can proceed. Databases detect deadlocks (via a wait-for graph) and resolve them by aborting one transaction (the 'victim') so the other can proceed, forcing the aborted one to retry.

**110. What is a foreign key constraint, and why can it hurt write performance at scale?**

A foreign key constraint enforces referential integrity between tables (e.g., an order must reference a valid user). At scale it can hurt write performance because the database must check the referenced table on every insert/update/delete, adding overhead and cross-table locking — which is why some high-scale systems enforce referential integrity at the application level instead.

**111. What is query optimization and how does a query planner work?**

Query optimization is the process of choosing the most efficient execution plan for a SQL query. The query planner analyzes statistics about table sizes, indexes, and data distribution to estimate the cost of different plans (e.g., index scan vs. full table scan, join order/strategy) and picks the cheapest one.

**112. What is connection pooling for a relational database?**

Connection pooling maintains a fixed set of reusable database connections that application threads borrow and return, avoiding the expensive overhead of establishing a new connection (TCP + auth) for every query, which is critical under high concurrent load.

**113. What is a materialized view, and how is it different from a normal view?**

A regular view is a stored query that's re-executed every time it's referenced. A materialized view stores the actual computed result physically on disk, which is much faster to read but must be periodically or event-triggered refreshed to stay in sync with the underlying data.

**114. What is vertical partitioning of a table?**

Vertical partitioning splits a table's columns across multiple tables (e.g., splitting frequently-accessed columns from rarely-accessed large columns like blobs), reducing I/O for common queries since less data needs to be read per row.

**115. What is the difference between OLTP and OLAP databases?**

OLTP (Online Transaction Processing) databases are optimized for many small, fast read/write transactions (e.g., an order system). OLAP (Online Analytical Processing) databases are optimized for complex analytical queries over large datasets (aggregations, joins across huge tables), often using column-oriented storage for speed.

**116. How do you design a schema for a many-to-many relationship?**

Use a join (junction/associative) table containing foreign keys to both related tables (plus any relationship-specific attributes), e.g., a 'enrollments' table linking 'students' and 'courses', rather than trying to store multiple values in a single column.

**117. What is write amplification in a database?**

Write amplification is when the actual amount of data physically written to disk is significantly larger than the logical amount of data the application intended to write — common in LSM-tree based databases due to compaction, or in SSDs due to block-level erase/write cycles — and it impacts both performance and hardware wear.

**118. What is the N+1 query problem and how do you avoid it?**

The N+1 problem occurs when code fetches a list of N parent records, then issues a separate query for each one's related data (N additional queries), instead of one batched query — causing severe performance issues. It's avoided using eager loading/joins, or batching related lookups into a single query.

**119. How would you migrate a schema on a live production database with zero downtime?**

Use an expand-contract approach: add new columns/tables without removing old ones, deploy application code that writes to both old and new schema, backfill historical data, switch reads to the new schema, then remove the old schema in a later deploy — always making changes backward-compatible at each step.

**120. What is a database replica lag and how does it affect read consistency?**

Replica lag is the delay between a write being committed on the primary and it becoming visible on a read replica (due to asynchronous replication). It affects read consistency because a user might write data then immediately read from a lagging replica and not see their own change — mitigated by read-your-writes routing or synchronous replication for critical reads.

---

## 6. NoSQL Databases

**📺 Recommended videos for this section:**
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)
- [Gaurav Sen](https://www.youtube.com/@gkcs)

**121. What is NoSQL, and when should you choose it over SQL?**

NoSQL databases trade strict relational structure and strong consistency for flexible schemas, horizontal scalability, and high write/read throughput. Choose NoSQL when you need massive scale-out, flexible/evolving schemas, or specific access patterns (key-value, wide-column) that don't need complex joins or multi-row transactions.

**122. What are the four main types of NoSQL databases (key-value, document, column, graph)?**

Key-value stores (Redis, DynamoDB) map keys to opaque values for simple, fast lookups. Document stores (MongoDB) store semi-structured JSON-like documents. Wide-column stores (Cassandra, HBase) organize data into flexible column families optimized for write-heavy workloads. Graph databases (Neo4j) model data as nodes and edges optimized for relationship traversal.

**123. What is a key-value store, and when is Redis/DynamoDB a good fit?**

A key-value store retrieves values by an exact key with no query language over the value's internal structure. It's a good fit for caching, session storage, and simple lookups (user profile by ID) where you always access data by a known key and need extremely low latency.

**124. What is a document database, and how does MongoDB structure data?**

A document database stores data as flexible, often JSON-like documents (BSON in MongoDB), where each document can have a different structure, grouped into collections (analogous to tables). It's a good fit when your data is naturally hierarchical/nested and schema flexibility is valuable.

**125. What is a wide-column store like Cassandra, and how is data organized?**

Cassandra organizes data into column families (similar to tables) where each row is identified by a partition key, and rows are distributed across nodes based on that key's hash. It's optimized for very high write throughput and linear horizontal scalability with tunable consistency.

**126. What is a graph database, and when is Neo4j a good choice?**

A graph database models entities as nodes and relationships as edges, optimized for traversing connections (e.g., 'friends of friends', shortest path). Neo4j is a good choice for social networks, recommendation engines, and fraud detection where relationship traversal is the core access pattern and would require many costly joins in SQL.

**127. What is eventual consistency in NoSQL databases?**

Eventual consistency guarantees that if no new updates are made to a piece of data, all replicas will eventually converge to the same value — but at any given moment, different replicas might return different (stale) values, trading immediate consistency for higher availability and lower latency.

**128. What is a quorum read/write in a distributed database like Cassandra or DynamoDB?**

A quorum requires a minimum number of replica nodes (e.g., majority) to acknowledge a read or write before it's considered successful. By tuning read quorum (R) and write quorum (W) such that R + W > N (total replicas), you can guarantee strong consistency while still tolerating some node failures.

**129. What is the difference between BASE and ACID?**

ACID (Atomicity, Consistency, Isolation, Durability) prioritizes strict correctness guarantees, typical of relational databases. BASE (Basically Available, Soft state, Eventually consistent) prioritizes availability and scalability over immediate consistency, typical of many NoSQL systems, accepting temporary inconsistency in exchange for resilience and performance.

**130. How does Cassandra achieve high write throughput?**

Cassandra uses a log-structured merge-tree (LSM-tree) design: writes are first appended to an in-memory memtable and a commit log (for durability), then periodically flushed to immutable SSTables on disk, avoiding costly random-write disk seeks and enabling very fast sequential writes.

**131. What is a partition key and a sort key in DynamoDB?**

The partition key determines which physical partition an item is stored on (via hashing). The optional sort key orders items within the same partition key, enabling efficient range queries (e.g., all orders for a user, sorted by date) within that partition.

**132. What is a hot partition problem in DynamoDB/Cassandra and how do you avoid it?**

A hot partition occurs when one partition key receives disproportionate traffic (e.g., a single popular user or a monotonically increasing timestamp key), overwhelming that partition while others sit idle. Avoid it by choosing high-cardinality keys, adding random suffixes/salting, or using write sharding to spread the load.

**133. How do secondary indexes work in NoSQL databases?**

Secondary indexes let you query by a non-primary-key attribute by maintaining an additional index structure (often as a separate, asynchronously-updated table/structure), trading extra storage and write overhead for the ability to query on more attributes than just the primary key.

**134. What is multi-model database support, and when is it useful?**

A multi-model database supports multiple data models (e.g., document, graph, key-value) within a single engine (e.g., ArangoDB, Cosmos DB), useful when an application has varied access patterns and you want to avoid operating multiple separate database technologies.

**135. How would you choose between MongoDB, Cassandra, and DynamoDB for a given use case?**

MongoDB suits flexible, document-oriented data with moderate scale and rich querying needs. Cassandra suits extremely high write throughput with predictable access patterns and multi-datacenter needs, self-managed. DynamoDB suits AWS-native applications needing a fully-managed, predictably-performing key-value/document store with minimal operational overhead.

**136. What is schema-on-read vs. schema-on-write?**

Schema-on-write enforces a defined structure at write time (traditional SQL) — invalid data is rejected immediately. Schema-on-read allows flexible/unstructured writes, with structure/interpretation applied only when the data is read — offering flexibility at the cost of pushing validation complexity to consumers.

**137. What is a time-series database, and when would you use InfluxDB or TimescaleDB?**

A time-series database is optimized for data indexed by time (metrics, sensor readings), with efficient time-range queries, downsampling, and retention policies. Use InfluxDB or TimescaleDB when you're storing high-volume, time-stamped data like application metrics, IoT sensor data, or financial tick data.

**138. How do you model one-to-many relationships in a document database?**

Either embed the 'many' side directly inside the parent document (good when the child data is small, bounded, and always accessed together with the parent) or reference the children by ID in a separate collection (better when children are large, unbounded, or queried independently).

**139. What is a vector database, and why is it used for embeddings/semantic search?**

A vector database stores high-dimensional embedding vectors and supports fast approximate nearest-neighbor search (via indexes like HNSW), enabling semantic search, recommendation, and RAG (retrieval-augmented generation) use cases where similarity is measured by vector distance rather than exact keyword match.

**140. How would you design the data model for a product catalog with millions of SKUs?**

Use a document store for flexible, varying product attributes across categories, with a search engine (Elasticsearch) layered on top for filtering/faceted search, a relational or key-value store for inventory/pricing needing strong consistency, and caching for frequently-viewed product pages.

---

## 7. Database Replication, Sharding & Partitioning

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**141. What is database replication and why is it used?**

Replication maintains copies of the same data on multiple database nodes, used to improve read scalability (spread reads across replicas), availability (failover if the primary dies), and durability (data survives a single node failure).

**142. What is the difference between synchronous and asynchronous replication?**

Synchronous replication waits for the replica(s) to confirm the write before acknowledging it to the client — guarantees no data loss on failover but adds latency and can block writes if a replica is slow. Asynchronous replication acknowledges the write immediately and propagates it to replicas afterward — faster writes but risks losing recent writes if the primary fails before replicating.

**143. What is master-slave (leader-follower) replication?**

One node (the leader/master) accepts all writes and propagates changes to one or more follower/slave nodes, which serve read traffic. It's simple to reason about (single source of truth for writes) but the leader can become a write bottleneck and a failover requires promoting a follower.

**144. What is multi-master (leader-leader) replication, and what conflicts can arise?**

Multiple nodes can each accept writes independently and replicate to each other, improving write availability and reducing write latency for geographically distributed users. Conflicts arise when the same data is modified concurrently on different masters, requiring conflict resolution strategies like last-write-wins, vector clocks, or CRDTs.

**145. What is database sharding, and why is it needed at scale?**

Sharding splits a dataset horizontally across multiple independent database instances, each holding a subset of the data (by key). It's needed when a single machine can no longer handle the data volume or write throughput, since sharding lets you scale storage and writes roughly linearly by adding more shards.

**146. What is a shard key, and how do you pick a good one?**

The shard key determines which shard a given record lives on. A good shard key has high cardinality (many distinct values) to spread data evenly, avoids hot spots (no single value dominates traffic), and ideally aligns with common query patterns to avoid expensive cross-shard queries.

**147. What is range-based sharding vs. hash-based sharding?**

Range-based sharding assigns contiguous ranges of the shard key to each shard (e.g., users A-M on shard 1), making range queries efficient but risking hot spots if writes cluster in one range (e.g., recent timestamps). Hash-based sharding hashes the key to pick a shard, spreading load evenly but making range queries across shards expensive.

**148. What is directory-based sharding?**

Directory-based sharding uses a lookup service/table that maps each key (or key range) explicitly to a shard, offering flexibility to rebalance individual keys without a rigid formula, at the cost of an extra lookup hop and the directory itself becoming a critical, potentially bottlenecked component.

**149. What is resharding, and why is it operationally difficult?**

Resharding is redistributing data across a different (usually larger) number of shards, typically because existing shards have grown too large or hot. It's difficult because it requires safely migrating live data with minimal downtime, updating routing logic, and handling in-flight requests during the transition without data loss or inconsistency.

**150. How do you handle joins across shards?**

Generally you avoid them: denormalize data so related data lives on the same shard, perform application-level joins by querying multiple shards and merging results in the application, or maintain a separate aggregated/materialized view service specifically for cross-shard queries.

**151. How do you handle a hot shard problem?**

Identify the hot key(s) via monitoring, then mitigate by adding a random/hashed prefix to spread the hot key's data across multiple shards, caching hot data separately, or dedicating extra capacity specifically to that shard (over-provisioning) while investigating a longer-term key redesign.

**152. What is consistent hashing, and how does it minimize data movement on resharding?**

Consistent hashing places both nodes and keys on a hash ring; each key belongs to the next node clockwise. Adding/removing a node only affects the keys immediately adjacent to it on the ring, so only a small fraction of keys need to move — unlike simple modulo hashing, where almost all keys would need to be remapped.

**153. What is vertical vs. horizontal partitioning of data?**

Vertical partitioning splits data by columns/fields (e.g., separating rarely-used large fields into another table). Horizontal partitioning (sharding) splits data by rows, distributing different records across different physical stores based on a key.

**154. What is a read replica, and how does it help scale reads?**

A read replica is a copy of the primary database kept in sync via replication, dedicated to serving read-only queries — it helps scale reads by letting you add more replicas as read traffic grows, without touching write capacity on the primary.

**155. How do you route reads and writes correctly in a sharded, replicated system?**

Writes are routed to the correct shard's primary based on the shard key, then replicated to that shard's replicas. Reads can go to any replica of the correct shard (based on the shard key), often via a routing layer/proxy that abstracts shard and replica topology from the application.

**156. What is failover in a replicated database, and how is a new leader elected?**

Failover is the process of promoting a replica to become the new primary when the current primary fails. A new leader is elected either automatically (via a consensus protocol like Raft, or a coordination service like ZooKeeper detecting the failure and promoting the most up-to-date replica) or manually by an operator.

**157. What is split-brain in a replicated cluster, and how is it prevented?**

Split-brain occurs when a network partition causes two nodes to both believe they are the leader, accepting conflicting writes independently. It's prevented using quorum-based leader election (requiring a majority vote) and fencing tokens that invalidate a deposed leader's ability to commit writes.

**158. How would you migrate from a single database to a sharded architecture with minimal downtime?**

Introduce a routing/abstraction layer first, dual-write to both old and new sharded stores while backfilling historical data, validate data consistency between old and new, gradually shift reads to the new sharded store, and finally cut over writes and decommission the old database.

**159. What is geo-partitioning of data, and why do global apps use it?**

Geo-partitioning stores each user's/region's data in a data center physically close to them, reducing latency and often satisfying data-residency/compliance requirements (e.g., EU user data staying in the EU), at the cost of added complexity for cross-region queries or user migration.

**160. What is the difference between horizontal scaling of stateless services and sharding of stateful data stores?**

Horizontally scaling stateless services just means adding more identical instances behind a load balancer — trivial because any instance can handle any request. Sharding stateful data stores requires deciding how to partition data itself, since each shard holds different data and requests must be routed to the correct shard.

---

## 8. CAP Theorem & Consistency Models

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**161. What does the CAP theorem state, and why can you only pick two of three?**

CAP states that a distributed system can provide at most two of Consistency, Availability, and Partition tolerance simultaneously. Since network partitions are unavoidable in real distributed systems (you must tolerate P), the actual choice in practice is between C and A during a partition — you can't have both because nodes cut off from each other can't agree on the latest value while still responding to every request.

**162. What is the PACELC theorem, and how does it extend CAP?**

PACELC extends CAP by noting that even without a Partition (P), you still face a trade-off Else between Latency (L) and Consistency (C) — i.e., 'if Partitioned, choose Availability or Consistency; Else (normal operation), choose Latency or Consistency' — capturing that consistency has a latency cost even in the happy path.

**163. What is strong consistency vs. eventual consistency?**

Strong consistency guarantees every read reflects the most recent write, as if there were only one copy of the data. Eventual consistency guarantees replicas will converge eventually, but a read shortly after a write might return stale data — a trade-off for higher availability and lower latency.

**164. What is read-your-writes consistency?**

Read-your-writes consistency guarantees that a user always sees their own previous writes on subsequent reads, even if other users might see stale data — commonly implemented by routing a user's reads to the same replica they wrote to, or via sticky sessions.

**165. What is monotonic reads consistency?**

Monotonic reads consistency guarantees that once a user has seen a particular value, they will never see an older value on a later read — preventing the confusing experience of data appearing to 'go back in time' due to reading from different, inconsistently-lagged replicas.

**166. What is causal consistency?**

Causal consistency ensures that operations which are causally related (e.g., a reply to a comment) are seen by all nodes in the same order, while unrelated (concurrent) operations may be seen in different orders on different nodes — stronger than eventual consistency but weaker (and more available) than strong consistency.

**167. What is linearizability, and how is it different from serializability?**

Linearizability guarantees that operations appear to take effect instantaneously at some point between their invocation and completion, as if there were a single up-to-date copy of the data — it applies to individual operations. Serializability is a transaction isolation guarantee ensuring the outcome of concurrently executed transactions is equivalent to some serial (one-at-a-time) execution order — it applies to groups of operations (transactions), not necessarily in real-time order.

**168. What is the difference between consistency in ACID and consistency in CAP?**

ACID consistency means a transaction moves the database from one valid state to another, respecting all defined constraints (e.g., foreign keys, uniqueness). CAP consistency means all nodes see the same data at the same time (closer to linearizability) — the two use the same word for genuinely different concepts.

**169. How do you choose between a CP system and an AP system for a given use case?**

Choose CP (consistency over availability) when correctness is critical and stale/conflicting data is unacceptable (e.g., banking, inventory counts). Choose AP (availability over consistency) when the system must always respond and can tolerate temporary staleness (e.g., social media likes/feeds, shopping cart availability).

**170. What is a vector clock, and how is it used to order events in distributed systems?**

A vector clock is a data structure (a vector of counters, one per node) attached to each event, used to determine the partial ordering of events across distributed nodes and detect whether two events are causally related or concurrent — used in systems like Dynamo to detect and resolve write conflicts.

**171. What is a Lamport timestamp?**

A Lamport timestamp is a simple logical clock (a single incrementing counter per node, updated on each event and synchronized on message exchange) that provides a partial, causally-consistent ordering of events across a distributed system, though it can't distinguish concurrent events from causally related ones as precisely as a vector clock.

**172. What is conflict resolution in an eventually consistent system (e.g., last-write-wins)?**

When concurrent writes to the same data create conflicting versions, the system must resolve them. Last-write-wins (LWW) simply keeps the write with the latest timestamp, which is simple but can silently discard valid concurrent updates; more sophisticated systems merge conflicting versions (CRDTs) or surface conflicts to the application/user to resolve.

**173. What are CRDTs (Conflict-free Replicated Data Types), and where are they used?**

CRDTs are data structures designed so that concurrent updates from different replicas can always be merged automatically into a consistent result without coordination or conflicts (e.g., a grow-only counter, an OR-set). They're used in collaborative editing tools (like Figma/Google Docs-style merging) and distributed databases that need multi-master writes without conflict.

**174. How does DynamoDB balance consistency and availability?**

DynamoDB offers tunable consistency: eventually consistent reads (faster, cheaper, may return stale data) and strongly consistent reads (guaranteed latest data, slightly higher latency/cost), letting applications choose per-request based on their specific need.

**175. How would you design a system that must remain available during a network partition?**

Favor an AP design: allow each partition to keep serving reads/writes locally using local replicas, accept temporary divergence between partitions, and use conflict resolution (vector clocks, CRDTs, or application-level merge logic) to reconcile state once the partition heals.

---

## 9. Message Queues & Event-Driven Architecture

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**176. What is a message queue and why is it used to decouple services?**

A message queue lets a producer send messages to a queue for a consumer to process asynchronously, decoupling the two in time and load — the producer doesn't need the consumer to be available or fast, which improves resilience and lets each side scale independently.

**177. What is the difference between a message queue and a pub/sub system?**

In a traditional message queue, each message is typically consumed by exactly one consumer (competing consumers model). In pub/sub, a message published to a topic is delivered to all subscribers of that topic, enabling one-to-many broadcast/fan-out delivery.

**178. What is Kafka, and how is it different from RabbitMQ?**

Kafka is a distributed, append-only log-based streaming platform optimized for very high-throughput, durable, replayable event streams, retaining messages for a configurable period regardless of consumption. RabbitMQ is a traditional message broker optimized for flexible routing (exchanges, queues) and lower-latency, transient messaging where messages are typically removed once consumed.

**179. What is a Kafka topic, partition, and consumer group?**

A topic is a named stream of messages. Each topic is split into partitions, which are ordered, append-only logs distributed across brokers for parallelism. A consumer group is a set of consumers that jointly consume a topic, with each partition assigned to exactly one consumer within the group at a time, enabling parallel processing.

**180. How does Kafka guarantee message ordering?**

Kafka guarantees strict ordering only within a single partition, not across an entire topic. To ensure related messages (e.g., all events for one user) are processed in order, you key messages by that entity so they always land on the same partition.

**181. What is at-most-once, at-least-once, and exactly-once delivery?**

At-most-once means a message might be lost but never duplicated (fire and forget). At-least-once means a message might be delivered/processed multiple times but is never lost (requires idempotent consumers). Exactly-once means a message is guaranteed to be processed exactly one time — hard to achieve in general, usually approximated via idempotency plus deduplication.

**182. What is a dead-letter queue, and why is it needed?**

A dead-letter queue (DLQ) holds messages that repeatedly fail to be processed successfully (after retries), preventing them from blocking the main queue indefinitely and allowing engineers to inspect and manually handle or reprocess problematic messages.

**183. What is idempotent message processing, and how do you implement it?**

Idempotent processing ensures reprocessing the same message multiple times has the same effect as processing it once. It's implemented by tracking processed message IDs (deduplication table) and checking before applying an operation, or by designing operations to be naturally idempotent (e.g., 'set' rather than 'increment').

**184. What is the outbox pattern for reliably publishing events from a database transaction?**

The outbox pattern writes the event to be published into an 'outbox' table within the same local database transaction as the business data change, then a separate process (or CDC connector) reliably reads from the outbox table and publishes to the message broker — avoiding the dual-write problem where a DB commit succeeds but the message publish fails (or vice versa).

**185. What is event sourcing, and how is it different from traditional CRUD?**

Event sourcing stores every change to application state as an immutable sequence of events (rather than just the current state), and the current state is derived by replaying those events. This gives a full audit trail and the ability to reconstruct past states, unlike traditional CRUD, which overwrites the previous state and loses history.

**186. What is CQRS (Command Query Responsibility Segregation)?**

CQRS separates the model used for writes (commands, which change state) from the model used for reads (queries, which return data), often using different, independently optimized data stores for each — useful when read and write patterns/scale requirements differ significantly.

**187. What is a saga pattern for distributed transactions across microservices?**

A saga is a sequence of local transactions across multiple services, where each step publishes an event that triggers the next step; if a step fails, previously completed steps are undone via compensating transactions — used to maintain consistency across services without a distributed 2PC transaction.

**188. What is backpressure handling in a streaming pipeline?**

Backpressure handling means a slow consumer signals producers/upstream stages to slow down (or the pipeline buffers/drops data intelligently) rather than letting an unbounded backlog build up and exhaust memory — implemented via bounded buffers, flow control protocols, or reactive streams.

**189. How do consumers scale horizontally in Kafka?**

By adding more consumer instances to the same consumer group — Kafka automatically rebalances partition assignments so each partition is consumed by exactly one consumer in the group; throughput scales up to the number of partitions in the topic (more consumers than partitions leaves some idle).

**190. What is message deduplication, and how is it implemented?**

Message deduplication ensures a message that's delivered more than once (common with at-least-once delivery) is only processed once, typically implemented by giving each message a unique ID and having the consumer check/store processed IDs (e.g., in a database or a bloom filter) before acting on it.

**191. What is the difference between a message broker and an event streaming platform?**

A message broker (like RabbitMQ) typically treats messages as transient — delivered and then removed from the queue. An event streaming platform (like Kafka) treats events as a durable, replayable log that multiple consumers can read independently at their own pace, and events remain available even after being consumed, up to a retention period.

**192. How would you design a notification fan-out system using message queues?**

Publish a single event (e.g., 'new post created') to a topic; have separate downstream consumers (push notification service, email service, in-app feed writer) each subscribe independently and process the event in parallel, decoupling the fan-out logic and allowing each channel to scale/fail independently.

**193. What is a dead man's snitch / heartbeat pattern in event-driven systems?**

It's a monitoring pattern where a scheduled job or service is expected to periodically 'check in' (send a heartbeat); if the check-in is missed within an expected window, an alert fires — used to detect silently-failed or stalled background jobs/pipelines that would otherwise fail silently.

**194. How do you guarantee ordering of events for a single entity (e.g., one user's actions) at scale?**

Use a partitioning key based on the entity ID (e.g., user ID) so all events for that entity always land on the same partition/shard, and process that partition sequentially by a single consumer — preserving per-entity order while still allowing overall parallelism across different entities.

**195. What is stream processing, and how do frameworks like Kafka Streams or Flink fit in?**

Stream processing continuously processes unbounded data as it arrives (rather than in scheduled batches), enabling real-time aggregations, joins, and transformations. Frameworks like Kafka Streams or Apache Flink provide APIs and runtime infrastructure (state management, windowing, fault tolerance) to build these continuous processing pipelines.

---

## 10. Microservices Architecture

**📺 Recommended videos for this section:**
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)
- [Tech Dummies - Narendra L](https://www.youtube.com/c/TechDummiesNarendraL)

**196. What are microservices, and how do they differ from a monolith?**

Microservices split an application into small, independently deployable services, each owning its own data and business capability, communicating over the network. A monolith bundles all functionality into one deployable unit sharing a single codebase and database — microservices trade simplicity for independent scalability, deployment, and team autonomy.

**197. What are the trade-offs of microservices vs. a monolithic architecture?**

Microservices offer independent scaling, deployment, and technology choice per service, and better fault isolation, but add operational complexity: network latency, distributed debugging, data consistency challenges, and more infrastructure to manage. Monoliths are simpler to develop/deploy/debug initially but become harder to scale teams and specific components independently as they grow.

**198. What is service discovery, and why is it needed in microservices?**

Service discovery is the mechanism by which services find the network location (IP/port) of other services at runtime, since instances are dynamically created/destroyed/rescheduled (e.g., by Kubernetes). It's needed because hardcoding addresses is infeasible in an elastic, ever-changing environment — implemented via a service registry (Consul, Eureka) or DNS-based discovery.

**199. What is an API gateway, and what responsibilities does it take on?**

An API gateway is a single entry point that routes external client requests to the appropriate backend microservices, and typically also handles authentication, rate limiting, request/response transformation, logging, and aggregating responses from multiple services into one client-facing response.

**200. What is the strangler fig pattern for migrating a monolith to microservices?**

The strangler fig pattern gradually replaces monolith functionality by routing specific pieces of functionality to new microservices (via a facade/proxy) one at a time, while the rest continues to be served by the monolith, until eventually the monolith is fully 'strangled' and can be retired — avoiding a risky big-bang rewrite.

**201. What is the database-per-service pattern, and why is it recommended?**

Each microservice owns and exclusively accesses its own database, with no other service allowed to query it directly (only via that service's API). It's recommended because it enforces loose coupling and lets each service evolve its schema and choose its own data store technology independently.

**202. How do microservices handle distributed transactions?**

Rather than a single ACID transaction spanning services (hard to achieve safely), microservices typically use the saga pattern — a sequence of local transactions coordinated via events, with compensating transactions to undo completed steps if a later step fails.

**203. What is service-to-service authentication (e.g., mTLS, JWT) in microservices?**

Services authenticate each other's identity before processing requests, commonly via mutual TLS (both sides present certificates) at the network layer, or signed JWTs/service tokens passed in request headers at the application layer — often combined with a service mesh to enforce this uniformly without each service implementing it individually.

**204. What is a sidecar pattern, and how does Envoy/Istio use it?**

A sidecar is a helper process deployed alongside a main application container (in the same pod/host) that handles cross-cutting concerns like networking, security, and observability. Istio uses Envoy as a sidecar proxy injected next to every service instance to transparently handle traffic routing, retries, mTLS, and telemetry without changing application code.

**205. What is a service mesh, and what problems does it solve?**

A service mesh is an infrastructure layer (typically a network of sidecar proxies) that manages service-to-service communication — handling load balancing, retries, circuit breaking, mTLS, and observability uniformly across all services, removing the need to implement this logic redundantly in every service's code.

**206. How do you handle versioning of APIs between microservices?**

Use explicit API versioning (URL path, header, or content negotiation), maintain backward compatibility for a deprecation window, avoid breaking changes to existing fields (only add optional fields), and communicate deprecation timelines clearly to consuming teams before removing old versions.

**207. What is contract testing (e.g., Pact) between microservices?**

Contract testing verifies that a service (provider) and its consumers agree on the shape/behavior of their API contract, without needing to spin up the full dependency chain for every test — the consumer defines expectations ('contracts'), and the provider's tests verify it still satisfies those contracts, catching breaking changes early.

**208. How do you handle cascading failures in a microservices architecture?**

Use circuit breakers to stop calling a failing dependency, timeouts to bound how long you wait, bulkheads to isolate resource pools per dependency, retries with backoff/jitter (carefully, to avoid worsening overload), and graceful degradation/fallbacks so one service's failure doesn't propagate through the whole call chain.

**209. What is the bulkhead pattern in microservices resilience?**

The bulkhead pattern isolates resources (thread pools, connection pools) used to call different downstream dependencies, so that if one dependency becomes slow or fails, it can only exhaust its own allocated resources — not starve resources needed for calls to healthy, unrelated dependencies.

**210. What is distributed tracing, and why is it essential in microservices?**

Distributed tracing tracks a single request as it flows across multiple services, recording timing and metadata for each hop (span) under a shared trace ID. It's essential in microservices because a single user request can touch dozens of services, and without tracing, diagnosing where latency or errors originate is nearly impossible.

**211. How do you do centralized logging across dozens of microservices?**

Each service emits structured logs (often JSON) tagged with a correlation/trace ID, shipped via an agent (e.g., Fluentd, Filebeat) to a centralized log aggregation and search system (e.g., the ELK stack or a managed service), allowing engineers to search and correlate logs across services for a given request or time window.

**212. What is domain-driven design (DDD), and how does it guide service boundaries?**

DDD is an approach to modeling software around business domains, using concepts like 'bounded contexts' to define clear boundaries where a particular model/language applies. In microservices, bounded contexts often map directly to service boundaries, ensuring each service owns a coherent piece of business logic rather than being split arbitrarily.

**213. How large should a microservice be? What defines a good service boundary?**

There's no fixed size rule — a good boundary is defined by business capability cohesion (a service should own one clear responsibility end-to-end), data ownership (it owns its own data), and team ownership (a single team can own and deploy it independently) rather than by lines of code.

**214. How do you handle configuration management across many microservices?**

Use a centralized configuration service (e.g., Consul, Spring Cloud Config, AWS Parameter Store) that services fetch config from at startup or dynamically watch for changes, avoiding config duplication/drift and enabling config changes without redeploying code.

**215. What is a backend-for-frontend (BFF) pattern?**

A BFF is a dedicated API layer built specifically for a particular client type (e.g., mobile app vs. web app), aggregating and shaping data from multiple backend microservices into the exact format that client needs, avoiding one-size-fits-all APIs that force clients to over-fetch or under-fetch data.

**216. How do you roll out a breaking change across microservices safely (blue-green, canary)?**

Blue-green deployment runs the new version fully alongside the old, then switches traffic all at once (with instant rollback capability). Canary deployment gradually shifts a small percentage of traffic to the new version, monitoring for errors before increasing the rollout — both minimize blast radius compared to a full instant cutover.

**217. What is chaos engineering, and why do companies like Netflix practice it?**

Chaos engineering is deliberately injecting failures (killing instances, adding latency, simulating region outages) into a production or production-like system to proactively discover weaknesses before they cause real incidents. Netflix pioneered tools like Chaos Monkey to build confidence that their system tolerates the failures that inevitably happen at scale.

**218. How would you design a CI/CD pipeline for hundreds of microservices?**

Standardize a reusable pipeline template (build, test, security scan, deploy) that each service's repo can adopt, use per-service pipelines triggered by code changes for independent deployability, employ automated canary/rollback gates, and centralize artifact/image registries and deployment tooling (e.g., via Kubernetes + GitOps) for consistency.

**219. What is service orchestration vs. service choreography?**

Orchestration uses a central coordinator that explicitly directs the sequence of service calls (like a conductor), making the flow easy to understand but creating a central dependency. Choreography has each service react to events independently with no central coordinator, offering looser coupling but making the overall flow harder to trace/understand.

**220. What is the two-phase commit protocol, and why do microservices avoid it?**

Two-phase commit (2PC) coordinates a distributed transaction across multiple resources via a 'prepare' phase (all participants agree they can commit) followed by a 'commit' phase. Microservices generally avoid it because it's blocking (a crashed coordinator can leave participants locked indefinitely), reduces availability, and doesn't play well with services that are meant to be independently deployable and scalable.

---

## 11. API Design & Gateways

**📺 Recommended videos for this section:**
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)
- [Hello Interview](https://www.youtube.com/@hello_interview)

**221. What makes a good RESTful API design?**

A good REST API uses resource-oriented URLs (nouns, not verbs), correct HTTP methods and status codes, consistent naming/pagination conventions, versioning, clear error responses, and idempotency where applicable — making the API predictable and self-explanatory.

**222. What is the difference between PUT, POST, and PATCH?**

POST creates a new resource (not idempotent — calling it twice creates two resources). PUT replaces a resource entirely at a known URL and is idempotent (calling it repeatedly with the same data yields the same result). PATCH applies a partial update to a resource and may or may not be idempotent depending on the update semantics.

**223. How do you design pagination for a large dataset API (offset vs. cursor-based)?**

Offset-based pagination (limit/offset) is simple but gets slow on large offsets and can skip/duplicate items if data changes between requests. Cursor-based pagination uses an opaque pointer (often based on a sort key like ID or timestamp) to fetch the next page, offering better performance and consistency for large, frequently-changing datasets.

**224. What is API versioning, and what strategies exist (URI, header, query param)?**

API versioning allows evolving an API without breaking existing clients. Common strategies: URI versioning (/v1/users), custom header versioning (Accept-Version: v1), or query parameter versioning (?version=1) — URI versioning is most common for its visibility and simplicity, though header versioning keeps URLs cleaner.

**225. What is HATEOAS in REST APIs?**

HATEOAS (Hypermedia as the Engine of Application State) means API responses include links to related actions/resources, letting clients navigate the API dynamically rather than hardcoding URL structures — a stricter form of REST that's elegant in theory but rarely fully implemented in practice due to added complexity.

**226. What is GraphQL, and how does it differ from REST?**

GraphQL lets clients specify exactly which fields they need in a single query (avoiding over-fetching/under-fetching common in REST), and exposes one endpoint instead of many resource-specific ones. REST is simpler to cache (via HTTP semantics) and reason about per-resource, while GraphQL offers more flexibility for complex, varied client data needs at the cost of more complex server-side query resolution and caching.

**227. What are the trade-offs of GraphQL vs. REST vs. gRPC?**

REST is simple, cacheable, and widely understood, but can require multiple round trips or over-fetch data. GraphQL gives clients precise data-fetching flexibility but adds server complexity (resolver performance, query cost limiting). gRPC offers the best raw performance and strict typed contracts for internal service-to-service calls, but is less convenient for public/browser-facing APIs.

**228. How do you design idempotent APIs for payment or order creation?**

Require clients to send a unique idempotency key with the request; the server stores the result keyed by that idempotency key and, if the same key is seen again (e.g., due to a client retry), returns the original result instead of re-executing the operation, preventing duplicate charges/orders.

**229. What is rate limiting at the API gateway level, and why is it needed?**

Rate limiting at the gateway caps how many requests a client (per API key, IP, or user) can make in a given time window, protecting backend services from being overwhelmed by abusive or buggy clients and ensuring fair resource allocation across all consumers.

**230. How do you handle authentication and authorization in an API gateway?**

The gateway validates credentials (API keys, JWTs, OAuth tokens) centrally before forwarding requests to backend services, often enriching the request with verified identity/claims — centralizing this logic avoids reimplementing auth in every microservice.

**231. What is API throttling vs. rate limiting?**

Rate limiting typically rejects requests once a limit is exceeded (hard cap). Throttling slows down (delays) requests instead of outright rejecting them, smoothing bursts of traffic to a manageable rate rather than dropping requests entirely — the two terms are sometimes used interchangeably depending on the vendor/context.

**232. How do you design a webhook delivery system with retries?**

Queue outgoing webhook events, attempt delivery with a timeout, and on failure retry with exponential backoff (and jitter) up to a max attempt count, moving persistently-failing deliveries to a dead-letter queue or marking the endpoint as failing and notifying the customer, while also supporting signature verification for security.

**233. What is request/response compression, and when should you use it?**

Compression (e.g., gzip, Brotli) reduces payload size before sending over the network, trading CPU time for reduced bandwidth and latency — most beneficial for larger text-based payloads (JSON, HTML) and less useful for already-compressed data (images, video).

**234. How do you design an API for bulk operations at scale?**

Support batch endpoints that accept multiple items in one request (reducing round trips), process asynchronously for very large batches (return a job ID and let clients poll or receive a webhook on completion), and clearly report partial success/failure per item rather than failing the whole batch on one bad item.

**235. What is an SDK, and how does it relate to API design?**

An SDK (Software Development Kit) is a client library that wraps API calls in a language-native interface, handling auth, retries, and serialization for developers — good API design considers how easily it can be wrapped into clean, idiomatic SDKs across multiple languages.

**236. How do you design backward-compatible API changes?**

Only add new optional fields/endpoints, never remove or repurpose existing fields, avoid changing existing field types/semantics, use versioning for genuinely breaking changes, and communicate deprecations with a clear migration timeline before removing old functionality.

**237. What is OpenAPI/Swagger, and why is it useful for API design?**

OpenAPI (formerly Swagger) is a standard specification format for describing REST APIs (endpoints, parameters, schemas, responses) in a machine-readable way, enabling auto-generated documentation, client SDKs, and server stubs, and making the API contract explicit and testable.

**238. How would you design a public API platform with per-customer rate limits and API keys?**

Issue unique API keys per customer/application, store rate-limit tiers per key in a fast store (Redis), enforce limits at the gateway using a token-bucket or sliding-window algorithm keyed by API key, return standard rate-limit headers, and log usage for billing/analytics.

---

## 12. Distributed Systems Concepts

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [Hussein Nasser](https://www.youtube.com/@hnasr)

**239. What is a distributed system, and what challenges does it introduce?**

A distributed system is a collection of independent computers that appear to users as a single coherent system. It introduces challenges like partial failure (some nodes fail while others don't), network unreliability/latency, lack of a global clock, and the need for coordination/consensus across nodes that don't share memory.

**240. What are the eight fallacies of distributed computing?**

Common false assumptions engineers make: the network is reliable, latency is zero, bandwidth is infinite, the network is secure, topology doesn't change, there is one administrator, transport cost is zero, and the network is homogeneous — designing distributed systems requires explicitly accounting for the fact that none of these are actually true.

**241. What is a distributed lock, and how do you implement one (e.g., with Redis or ZooKeeper)?**

A distributed lock ensures only one process across multiple machines can hold a resource/perform an action at a time. With Redis, this is often done via SET NX with a TTL (and careful release logic, e.g., Redlock algorithm) to avoid deadlocks if a holder crashes; ZooKeeper provides ephemeral sequential nodes that naturally support safe, ordered lock acquisition and release.

**242. What is leader election, and what algorithms are used (Bully, Raft)?**

Leader election is the process by which nodes in a cluster agree on a single node to act as coordinator/leader. The Bully algorithm has nodes with higher IDs 'win' elections by responding to challenges from lower-ID nodes. Raft achieves leader election as part of its broader consensus protocol using randomized election timeouts and majority voting.

**243. What is a heartbeat mechanism, and how is failure detection done in a cluster?**

Nodes periodically send small 'heartbeat' messages to indicate they're alive; if a node's heartbeat isn't received within a timeout window, it's suspected/declared failed, triggering failover or rebalancing — the timeout threshold trades off fast failure detection against false positives from transient network blips.

**244. What is a gossip protocol, and how is it used for cluster membership?**

In a gossip protocol, each node periodically exchanges state information with a small random set of other nodes, and information spreads epidemically across the cluster over multiple rounds. It's used for scalable, decentralized cluster membership and failure detection (e.g., in Cassandra) without requiring a central coordinator.

**245. What is the difference between a coordinator-based and a peer-to-peer distributed system?**

A coordinator-based system relies on a central node (or small quorum) to make decisions (leader election, scheduling), which is simpler to reason about but can be a bottleneck/SPOF. A peer-to-peer system has all nodes act as equals with no central authority, offering better decentralized resilience but more complex coordination logic.

**246. What is clock skew, and why can't distributed systems rely on wall-clock time alone?**

Clock skew is the difference in time between clocks on different machines, which drift even with NTP synchronization. Distributed systems can't rely purely on wall-clock time to order events across nodes because skew can make timestamps from different machines misleading — logical clocks (Lamport, vector clocks) are used instead for correct event ordering.

**247. What is a distributed transaction, and why is it hard to achieve atomicity?**

A distributed transaction spans multiple independent nodes/services, and must either fully commit or fully roll back across all of them. It's hard because each participant can independently fail or become unreachable at any point, and there's no single shared point of atomic commitment without a coordination protocol like 2PC (which has its own trade-offs).

**248. What is two-phase commit (2PC), and what are its limitations?**

2PC has a coordinator ask all participants to 'prepare' (vote yes/no), and only if all vote yes does it tell everyone to 'commit'. Limitations: it's blocking (if the coordinator crashes after prepare, participants are stuck holding locks indefinitely), and it reduces availability since all participants must be reachable and agree.

**249. What is three-phase commit (3PC), and how does it improve on 2PC?**

3PC adds an extra 'pre-commit' phase between prepare and commit, giving participants a way to time out and safely abort without indefinitely blocking (unlike 2PC), improving non-blocking behavior in the presence of coordinator failure — but it still can't fully handle network partitions and is rarely used in practice due to added complexity and latency.

**250. What is a quorum, and how does it relate to read/write consistency?**

A quorum is the minimum number of nodes that must participate in an operation for it to be considered successful. By requiring read quorum (R) + write quorum (W) to exceed the total replica count (N), you guarantee that every read overlaps with the most recent write, providing strong consistency while tolerating some node unavailability.

**251. What is data locality, and why does it matter for distributed processing (e.g., Hadoop/Spark)?**

Data locality means moving computation to where the data already resides (rather than moving large amounts of data over the network to a compute node), which is far more efficient — Hadoop/Spark schedule tasks on nodes that already hold the relevant data blocks whenever possible to minimize network I/O.

**252. What is the difference between horizontal and vertical partitioning of workloads?**

Horizontal partitioning of workloads splits the same type of work across many workers processing different subsets of data in parallel (e.g., MapReduce). Vertical partitioning of workloads splits different types of work into different specialized services/stages (a pipeline), each doing a distinct part of the overall processing.

**253. What is a distributed cron / scheduler, and how do you avoid duplicate job execution?**

A distributed scheduler triggers scheduled jobs across a cluster reliably even if individual nodes fail. Duplicate execution is avoided using a distributed lock (only the node that acquires the lock for a given job run executes it) or a leader-election model where only the current leader triggers scheduled jobs.

**254. How would you design a globally distributed system with low latency for users worldwide?**

Deploy application servers and data replicas across multiple geographic regions, use a CDN/anycast/GSLB to route users to their nearest region, employ geo-partitioned or geo-replicated data with conflict resolution for multi-region writes, and cache aggressively at the edge to minimize cross-region round trips.

**255. What is multi-region active-active architecture, and what conflicts can arise?**

In active-active, multiple regions all accept live reads and writes simultaneously, each serving local users with low latency. Conflicts arise when the same data is modified concurrently in different regions before replication catches up, requiring conflict resolution strategies (last-write-wins, CRDTs, or application-specific merge logic).

**256. How do you design for disaster recovery across regions (RPO and RTO)?**

Define RPO (Recovery Point Objective — how much data loss is acceptable) and RTO (Recovery Time Objective — how quickly you must recover), then choose a strategy accordingly: continuous replication and automated failover for low RPO/RTO, or periodic backups with manual restoration for less critical systems where longer recovery time is acceptable.

**257. What is a distributed hash table (DHT), and where is it used (e.g., BitTorrent, Cassandra)?**

A DHT is a decentralized system that maps keys to values across a network of nodes, with each node responsible for a portion of the keyspace (often via consistent hashing), allowing lookups without a central directory. It's used in BitTorrent (finding peers for a file) and underlies partitioning schemes in databases like Cassandra and DynamoDB.

**258. What is idempotency key design for distributed APIs (e.g., Stripe's approach)?**

A client generates a unique idempotency key per logical operation and includes it on retried requests; the server persists the key with the operation's result, and if a request with the same key arrives again, it returns the stored result instead of re-executing the side-effecting operation — critical for safely retrying payment/order APIs.

**259. What is a write-ahead log (WAL), and why do databases and message queues use one?**

A WAL is an append-only log where changes are recorded durably before they're applied to the main data structure/in-memory state. It's used because sequential disk writes are fast, and after a crash, the system can replay the WAL to recover to a consistent state, guaranteeing durability without requiring every write to update the main data store synchronously.

**260. How does a distributed file system like HDFS or GFS store and replicate data?**

Large files are split into fixed-size blocks (e.g., 128MB), each block is replicated across multiple nodes (typically 3) for fault tolerance, and a central metadata server (NameNode/master) tracks which nodes hold which blocks, while clients read/write blocks directly from/to the data nodes for scalability.

**261. What is a leader-based replication protocol like Raft used for?**

Raft is used to achieve consensus on a replicated log across a cluster of nodes — electing a single leader that handles all writes and replicates them to followers in order, ensuring all nodes agree on the same sequence of committed entries even in the presence of node failures.

**262. How would you detect and handle a 'split brain' scenario in a distributed cluster?**

Detect it by requiring a majority quorum for any node to consider itself the leader (a minority partition can never reach quorum, so it can't act as leader), and handle it with fencing mechanisms (e.g., fencing tokens or STONITH — 'shoot the other node in the head') to prevent a deposed leader from continuing to accept writes.

**263. What is the difference between strong leader replication and leaderless replication (e.g., Dynamo-style)?**

Strong leader replication routes all writes through a single leader, which then propagates to followers — simple ordering guarantees but the leader can be a bottleneck/SPOF. Leaderless replication (Dynamo-style) allows writes to any replica, using quorums and versioning (vector clocks) to reconcile consistency, offering higher write availability at the cost of more complex conflict resolution.

---

## 13. Consensus Algorithms & Distributed Transactions

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**264. What problem does a consensus algorithm solve in distributed systems?**

Consensus algorithms allow a group of distributed nodes to agree on a single value or sequence of operations, even when some nodes fail or messages are delayed/lost — forming the foundation for reliably replicated logs, leader election, and distributed locks.

**265. What is the Paxos algorithm, at a high level?**

Paxos achieves consensus through a two-phase voting process (prepare/promise, then accept/accepted) among a set of nodes, guaranteeing that once a majority agrees on a value, that value is permanently chosen, even if some nodes fail — it's correct but notoriously difficult to understand and implement correctly.

**266. What is the Raft consensus algorithm, and how does leader election work?**

Raft is a consensus algorithm designed to be easier to understand than Paxos, splitting the problem into leader election, log replication, and safety. Leader election works via randomized timeouts: if a follower doesn't hear from a leader in time, it becomes a candidate, requests votes from peers, and becomes leader if it wins a majority.

**267. How does Raft achieve log replication consistency?**

The elected leader appends new entries to its log and replicates them to followers; an entry is considered committed once a majority of nodes have it in their logs, and followers apply entries in the same order as the leader, guaranteeing all nodes eventually converge to the same replicated log.

**268. What is ZooKeeper, and what problems does it solve (leader election, config, locks)?**

ZooKeeper is a centralized coordination service providing a hierarchical, replicated key-value store with strong consistency guarantees, used by distributed systems for leader election, distributed locking, configuration management, and service discovery — abstracting away the hard consensus problem so applications don't reinvent it.

**269. What is etcd, and how is it used in Kubernetes?**

etcd is a distributed, consistent key-value store built on the Raft consensus algorithm. Kubernetes uses it as its primary datastore, holding all cluster state (pods, services, configs) — the entire Kubernetes control plane relies on etcd's strong consistency to make correct scheduling and reconciliation decisions.

**270. What is Byzantine fault tolerance, and how is it different from crash fault tolerance?**

Crash fault tolerance assumes failed nodes simply stop responding (fail-stop). Byzantine fault tolerance assumes nodes can fail arbitrarily — including sending conflicting or malicious information to different peers — and requires more complex protocols (and more replicas) to reach consensus safely; it's essential in adversarial/trustless environments like blockchains.

**271. What is the FLP impossibility result, in simple terms?**

The FLP result proves that in a fully asynchronous distributed system (no bounds on message delay), it's impossible to guarantee consensus with 100% certainty if even a single node might fail — in practice, real systems work around this using timeouts and partial synchrony assumptions, accepting a small chance of delayed (not incorrect) progress.

**272. How do blockchain consensus mechanisms (PoW, PoS) relate to classical consensus?**

Proof of Work (PoW) achieves consensus in a trustless, permissionless environment by making it computationally expensive to propose blocks, so honest majority effort determines the canonical chain. Proof of Stake (PoS) achieves similar goals by weighting voting power by economic stake rather than computation — both solve a Byzantine consensus problem, unlike classical algorithms (Paxos/Raft) which assume trusted, permissioned participants.

**273. What is a saga pattern, and how does it replace 2PC for microservice transactions?**

A saga breaks a distributed transaction into a sequence of local transactions, each with a corresponding compensating action to undo it if a later step fails, coordinated via events or an orchestrator — avoiding the blocking, tightly-coupled nature of 2PC while still achieving eventual consistency across services.

**274. What is compensating transaction logic in a saga?**

A compensating transaction is an explicit action that semantically reverses the effect of a previously completed step (e.g., 'refund payment' to undo 'charge payment') — since distributed systems can't simply roll back an already-committed remote transaction, compensations are used instead to restore a consistent business state.

**275. How would you design a distributed lock service from scratch?**

Use a consensus-backed store (like a Raft-based key-value store) to atomically create a lock entry only if it doesn't already exist, attach a lease/TTL so the lock auto-releases if the holder crashes, use fencing tokens to prevent a stale holder from acting after losing the lock, and require the holder to periodically renew the lease while working.

**276. What is the difference between choreography-based and orchestration-based sagas?**

In choreography, each service listens for events and independently decides its next action, publishing new events in turn — decentralized but the overall flow is harder to trace. In orchestration, a central saga orchestrator explicitly tells each service what to do next — easier to understand and monitor, but introduces a central coordinating component.

**277. How do you achieve exactly-once processing semantics in a distributed pipeline?**

True exactly-once delivery is effectively impossible in general distributed systems, so in practice you achieve exactly-once *effects* by combining at-least-once delivery with idempotent processing (deduplication via unique IDs, or naturally idempotent operations), so reprocessing a duplicate message has no additional effect.

**278. How would you design a globally unique ID generator (e.g., Twitter Snowflake)?**

Encode a timestamp, a machine/worker ID, and a per-millisecond sequence counter into a single 64-bit integer, so IDs are roughly time-sortable, globally unique without central coordination (each worker generates its own IDs independently), and generated at very high throughput without a database round trip.

---

## 14. Security in System Design

**📺 Recommended videos for this section:**
- [Hussein Nasser](https://www.youtube.com/@hnasr)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**279. How do you design authentication for a large-scale web application?**

Use a centralized identity provider issuing signed tokens (JWT or opaque tokens validated against a session store), support MFA, hash/salt passwords properly (bcrypt/argon2), rate-limit login attempts, and consider federated/SSO options — keeping authentication logic centralized rather than duplicated per service.

**280. What is the difference between authentication and authorization?**

Authentication verifies who a user is (identity — e.g., login with credentials). Authorization determines what an authenticated user is allowed to do (permissions — e.g., can this user delete this resource) — authentication always happens first, authorization is checked on every subsequent action.

**281. What is OAuth 2.0, and how does the authorization code flow work?**

OAuth 2.0 is a standard protocol for delegated authorization, letting a user grant a third-party application limited access to their resources without sharing their password. The authorization code flow: the app redirects the user to the provider to log in and consent, the provider redirects back with a short-lived authorization code, and the app exchanges that code (server-side, with a client secret) for an access token.

**282. What is OpenID Connect, and how does it relate to OAuth 2.0?**

OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0, adding a standardized ID token (a JWT containing user identity claims) so that OAuth's delegated-authorization flow can also be used for authentication ('who is this user') — OAuth alone doesn't natively provide verified identity information.

**283. What is a JWT (JSON Web Token), and what are its pros and cons?**

A JWT is a self-contained, digitally signed token encoding claims (like user ID, roles, expiry) that can be verified without a database lookup. Pros: stateless, scalable verification. Cons: hard to revoke before expiry (since no server-side lookup happens), and if not short-lived/rotated properly, a stolen token remains valid until it expires.

**284. How do you securely store passwords (hashing, salting, bcrypt/argon2)?**

Never store plaintext passwords; hash them with a slow, purpose-built algorithm like bcrypt or argon2 (which include built-in salting and are deliberately computationally expensive to resist brute-force/rainbow-table attacks), and use a unique salt per password so identical passwords don't produce identical hashes.

**285. What is single sign-on (SSO), and how is it implemented across services?**

SSO lets a user authenticate once and gain access to multiple independent applications/services without re-entering credentials, typically implemented via a central identity provider (using SAML or OIDC) that issues a token/assertion trusted by all participating services.

**286. What is CSRF, and how do you prevent it?**

Cross-Site Request Forgery tricks a logged-in user's browser into submitting an unwanted request to a site they're authenticated on. It's prevented using anti-CSRF tokens (unique per session/form, validated server-side), SameSite cookie attributes, and checking the Origin/Referer header on state-changing requests.

**287. What is XSS, and how do you prevent it in a web application?**

Cross-Site Scripting injects malicious scripts into pages viewed by other users. It's prevented by properly escaping/encoding all user-generated content before rendering it in HTML, using Content Security Policy (CSP) headers, and avoiding unsafe patterns like directly injecting raw HTML from user input.

**288. What is SQL injection, and how do you prevent it?**

SQL injection occurs when untrusted user input is concatenated directly into a SQL query, letting an attacker manipulate the query's logic. It's prevented by always using parameterized queries/prepared statements (never string concatenation for SQL), and applying least-privilege database permissions as defense in depth.

**289. What is rate limiting used for from a security perspective (e.g., brute force protection)?**

Rate limiting throttles the number of requests (e.g., login attempts) a client can make in a time window, mitigating brute-force credential guessing, denial-of-service attempts, and API abuse/scraping, often combined with account lockouts or CAPTCHAs after repeated failures.

**290. How do you design a secure API key / secrets management system?**

Store secrets in a dedicated secrets manager (e.g., HashiCorp Vault, AWS Secrets Manager) rather than in code/config files, encrypt secrets at rest, use short-lived, rotatable credentials wherever possible, apply least-privilege access policies, and audit-log all secret access.

**291. What is encryption at rest vs. encryption in transit?**

Encryption at rest protects data stored on disk (databases, backups) so it's unreadable if the physical storage is compromised. Encryption in transit (TLS) protects data as it moves across the network so it can't be intercepted/read by a man-in-the-middle — a secure system needs both.

**292. What is a Web Application Firewall (WAF), and where does it sit in the architecture?**

A WAF sits in front of a web application (often at the CDN/edge or load balancer layer) and inspects incoming HTTP traffic for known attack patterns (SQL injection, XSS payloads, bot signatures), blocking malicious requests before they reach the application servers.

**293. How do you design role-based access control (RBAC) for a multi-tenant system?**

Define roles (e.g., admin, editor, viewer) with associated permission sets, assign roles to users (potentially scoped per tenant/organization), and check permissions centrally on every resource access — with tenant isolation enforced so a role in one tenant never grants access to another tenant's data.

**294. What is multi-tenancy, and what isolation strategies exist (shared DB, siloed DB)?**

Multi-tenancy means a single application instance serves multiple customers (tenants) while keeping their data logically separate. Strategies range from a fully shared database with a tenant_id column on every table (cheapest, least isolated) to a siloed database per tenant (most isolated, most operational overhead), with hybrid approaches (shared DB, separate schemas) in between.

**295. How would you design a secure file-upload system to prevent malicious uploads?**

Validate file type/size/content (not just the extension), scan uploads for malware, store uploaded files outside the web root or in isolated object storage (not directly executable), generate randomized filenames, and serve files through a CDN with strict content-type headers to prevent them from being executed as scripts.

**296. What is DDoS protection, and what architectural patterns help mitigate attacks?**

DDoS protection defends against attacks that flood a system with traffic to exhaust its resources. Mitigations include CDN/edge absorption of traffic, rate limiting, anycast routing to spread load across many data centers, auto-scaling to absorb legitimate spikes, and specialized scrubbing services that filter malicious traffic before it reaches origin servers.

**297. How do you design an audit-logging system for compliance (e.g., SOC2, HIPAA)?**

Log every sensitive action (who did what, when, from where) to an immutable, tamper-evident store (append-only, possibly with cryptographic chaining), retain logs per compliance-mandated periods, restrict access to the logs themselves, and ensure logging doesn't itself capture sensitive data it shouldn't (e.g., raw passwords).

**298. What is data encryption key rotation, and how do you do it without downtime?**

Key rotation periodically replaces encryption keys to limit the blast radius if a key is compromised. To do it without downtime, use key versioning (new data encrypted with the new key, old data still decryptable with retained old keys) and re-encrypt historical data gradually in the background rather than all at once.

---

## 15. Rate Limiting & Throttling

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [Hello Interview](https://www.youtube.com/@hello_interview)

**299. Design a rate limiter: what algorithms exist (token bucket, leaky bucket, fixed/sliding window)?**

Common algorithms: fixed window counter (simple but allows bursts at window boundaries), sliding window log (accurate but memory-heavy), sliding window counter (a good accuracy/efficiency compromise), token bucket (allows controlled bursts up to bucket capacity), and leaky bucket (smooths output to a constant rate). Choice depends on whether you need to allow bursts or enforce a strictly steady rate.

**300. What is the token bucket algorithm, and how does it allow bursty traffic?**

Tokens are added to a bucket at a fixed rate up to a max capacity; each request consumes a token, and is rejected if none are available. Because unused tokens accumulate up to the bucket size, a client that's been idle can burst up to the bucket capacity before being throttled — allowing controlled burstiness rather than a strictly flat rate.

**301. What is the leaky bucket algorithm, and how does it differ from token bucket?**

Leaky bucket queues incoming requests and processes them at a fixed, constant output rate (like water leaking from a hole at a steady pace), smoothing out bursts entirely. Unlike token bucket, it doesn't allow any burst above the steady rate — it enforces a strictly uniform outflow regardless of how bursty the input is.

**302. What is the sliding window log algorithm for rate limiting?**

It stores a timestamp for every request in a log per client, and to check a new request, counts how many timestamps fall within the trailing window (e.g., last 60 seconds) — very accurate but memory-intensive since it stores every individual request timestamp.

**303. What is the sliding window counter algorithm, and why is it a good compromise?**

It approximates a sliding window by combining counts from the current and previous fixed windows, weighted by how much of the previous window still overlaps the sliding interval — nearly as accurate as the sliding window log but far more memory-efficient since it only stores two counters per client instead of a full timestamp log.

**304. How would you implement a distributed rate limiter shared across multiple servers?**

Store counters/tokens in a centralized, fast data store like Redis (using atomic INCR with expiry, or a Lua script for token bucket logic) so all application servers check against the same shared state rather than maintaining independent, inconsistent local counters.

**305. How do you rate limit per-user vs. per-IP vs. per-API-key?**

Choose the key you rate-limit on based on the identity you can reliably attribute abuse to: per-user for authenticated actions (prevents one account from hogging resources), per-IP for unauthenticated/public endpoints (though shared IPs like NAT/corporate networks can cause false positives), and per-API-key for third-party integrations with contractual usage tiers.

**306. How do you communicate rate-limit status to clients (HTTP headers, 429 status)?**

Return HTTP 429 (Too Many Requests) when a client exceeds their limit, along with headers like X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After (or X-RateLimit-Reset) so clients know their current quota and when they can retry.

**307. How would you design a rate limiter for a payment gateway to prevent abuse?**

Combine multiple layers: strict per-account and per-IP token-bucket limits, velocity checks (e.g., max transactions per card per hour), anomaly detection for unusual patterns, and a distributed, low-latency store (Redis cluster) to enforce limits consistently across all payment-processing nodes globally.

**308. What data store would you use to implement a rate limiter at scale, and why?**

Redis is the typical choice because it offers atomic increment/expire operations, sub-millisecond latency, and Lua scripting for implementing more complex algorithms (like token bucket) atomically — essential to avoid race conditions when many requests check/update the same counter concurrently.

---

## 16. Search Systems

**📺 Recommended videos for this section:**
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)
- [Gaurav Sen](https://www.youtube.com/@gkcs)

**309. How would you design a search autocomplete / typeahead system?**

Precompute a trie (or use a search engine's edge n-gram index) of popular query prefixes with associated ranking scores, serve top-K suggestions per prefix from an in-memory/cache layer for low latency, and periodically update the underlying data structure with newly trending or popular queries.

**310. What is an inverted index, and how does it power full-text search?**

An inverted index maps each unique term/word to the list of documents (and positions) containing it, the reverse of a normal 'document → words' mapping. It powers full-text search by letting you quickly find all documents containing a query term via a direct lookup, instead of scanning every document.

**311. How does Elasticsearch/Lucene tokenize and index documents?**

Text is broken into tokens (words) via an analyzer (lowercasing, removing stop words, stemming), and each token is added to an inverted index pointing back to the document IDs (and positions) it appeared in, along with metadata used for relevance scoring like term frequency.

**312. How would you design a search ranking system (relevance scoring)?**

Combine lexical relevance signals (like TF-IDF or BM25, which score how well query terms match a document) with additional ranking factors like recency, popularity/click-through data, and personalization, often blended via a learned ranking model (learning-to-rank) trained on user engagement data.

**313. What is a trie data structure, and how is it used for prefix search?**

A trie is a tree where each node represents a character, and paths from the root spell out prefixes/words — it enables efficient prefix lookups (all words starting with a given prefix) in time proportional to the prefix length, making it well-suited for autocomplete.

**314. How do you keep a search index in sync with a frequently changing database?**

Use change data capture (CDC) or an event stream (e.g., publish an event on every write) to asynchronously propagate updates to the search index, accepting brief eventual-consistency lag between the source database and the searchable index, and periodically reconcile with full reindexing jobs to catch any drift.

**315. How would you design a fuzzy search / spell-correction feature?**

Use edit-distance (Levenshtein) based matching, n-gram indexing to find candidate similar terms efficiently, or phonetic algorithms (Soundex/Metaphone) for sound-alike matches, often combined with a dictionary of known-correct terms and query-log-derived correction suggestions.

**316. How do you scale a search index horizontally (sharding an Elasticsearch cluster)?**

Split the index into multiple shards distributed across nodes, so each node holds and searches only a subset of the data, and a coordinating node fans a query out to all relevant shards and merges/ranks the combined results — with replica shards added for both read scaling and fault tolerance.

**317. How would you design search for a large e-commerce catalog with filters and facets?**

Index product attributes (category, price, brand, ratings) alongside text fields, use faceted search (aggregations) to compute filter counts alongside search results, and combine relevance ranking (text match) with business ranking signals (in-stock status, sponsored placement, popularity).

**318. How would you design a semantic/vector search system for an AI product?**

Convert text/items into embedding vectors using a model, store them in a vector database/index (e.g., using HNSW for approximate nearest-neighbor search), and at query time embed the query and retrieve the closest vectors by similarity — often combined with traditional keyword search in a hybrid ranking approach.

---

## 17. Notification Systems

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [Tech Dummies - Narendra L](https://www.youtube.com/c/TechDummiesNarendraL)

**319. How would you design a scalable push notification system (like FCM/APNs)?**

Accept notification requests into a queue, have worker services batch and forward them to platform-specific push gateways (FCM for Android, APNs for iOS), maintain device token registries per user with cleanup of stale/invalid tokens, and track delivery status asynchronously for retries and analytics.

**320. How do you design a system that fans out one event to millions of notification recipients?**

Publish a single event to a message queue/stream, and have horizontally-scaled worker consumers pull batches of recipient IDs (often pre-fetched from a fan-out list or computed on the fly for large audiences) and dispatch notifications in parallel, rate-limited per downstream provider's constraints.

**321. How would you deduplicate notifications sent to the same user across channels?**

Assign each notification a unique ID/idempotency key, track sent notification IDs per user (e.g., in a short-TTL cache or database), and check before sending; also implement per-user, per-event-type suppression windows to avoid sending the same alert via multiple channels within a short time.

**322. How do you design user notification preferences and do-not-disturb scheduling?**

Store per-user, per-channel, per-category preferences (e.g., 'email: on, push: off for marketing') in a preferences service, check these before every send, and support scheduling (respecting the user's local time zone and quiet hours) by queuing notifications and only dispatching them within allowed windows.

**323. How would you design an SMS/email notification service with delivery retries?**

Queue outgoing messages, send via a third-party provider (Twilio, SES) with a timeout, retry failed sends with exponential backoff up to a max attempt count, move persistent failures to a dead-letter queue for investigation, and record delivery status via provider webhooks/callbacks.

**324. How do you guarantee at-least-once delivery of a critical notification (e.g., OTP)?**

Persist the notification request durably before attempting delivery, use a message queue with acknowledgment (only remove from the queue after confirmed successful send), retry on failure, and monitor delivery SLAs closely given the time-sensitive nature of OTPs (often with a fallback channel, like SMS if push fails).

**325. How would you design an in-app notification/bell-icon feed with read/unread state?**

Store notifications per user in a database (or a per-user list in a fast store), maintain an unread count (incremented on creation, decremented/reset on read), paginate the feed by recency, and optionally push real-time updates via WebSocket for instant badge updates.

**326. How do you throttle notifications to avoid spamming a user?**

Apply per-user, per-category rate limits (e.g., max 3 marketing pushes/day), batch/digest lower-priority notifications into periodic summaries instead of individual sends, and prioritize/deduplicate so only the most relevant notification is sent when multiple similar events occur close together.

---

## 18. Storage Systems & CDN

**📺 Recommended videos for this section:**
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)
- [Hussein Nasser](https://www.youtube.com/@hnasr)

**327. How would you design a distributed file storage system like Amazon S3?**

Store objects as immutable blobs identified by a key, replicate/erasure-code each object across multiple nodes and availability zones for durability, use a distributed metadata service to track object locations, and expose a simple HTTP API (PUT/GET/DELETE) with eventual or strong consistency depending on design goals.

**328. What is object storage vs. block storage vs. file storage?**

Object storage (like S3) stores data as opaque objects with metadata, accessed via an API, ideal for unstructured data at massive scale. Block storage (like EBS) exposes raw, low-level storage blocks that an OS formats with a filesystem, ideal for databases/VMs needing fast, direct I/O. File storage (like NFS) provides a shared hierarchical filesystem interface accessible by multiple clients.

**329. How does a CDN decide which edge server serves a given user?**

Typically via DNS-based geo-routing or anycast IP routing, directing the user to the edge location that's geographically closest or has the lowest measured latency/load, often also factoring in real-time health and capacity of each edge node.

**330. What is cache invalidation on a CDN when origin content changes?**

You can either purge/invalidate the specific cached object across all edge nodes explicitly (via an API call, which can take time to propagate) or use versioned URLs/cache-busting (changing the URL when content changes) so the CDN naturally treats it as a new, uncached object.

**331. How would you design a system to store and serve billions of images/videos?**

Store the raw media in object storage (like S3), generate multiple resized/transcoded variants asynchronously, serve all reads through a CDN to minimize origin load and latency, and store metadata (owner, dimensions, URLs) in a separate fast-lookup database indexed by content ID.

**332. What is chunking/erasure coding, and how does it provide durability with less overhead than replication?**

Erasure coding splits data into multiple fragments plus parity fragments, such that the original data can be reconstructed even if some fragments are lost — it provides similar durability to full replication (e.g., 3x copies) using significantly less storage overhead (e.g., 1.5x), at the cost of more CPU for encoding/decoding.

**333. How would you design a resumable large-file upload system (like Dropbox)?**

Split the file into chunks client-side, upload chunks independently (allowing retries of just the failed chunk rather than the whole file), track uploaded chunk progress server-side, and reassemble/verify the complete file (via checksums) once all chunks are received — using multipart upload APIs where the underlying storage supports it.

**334. What is a pre-signed URL, and why is it used for direct-to-storage uploads?**

A pre-signed URL is a temporary, cryptographically-signed URL granting time-limited permission to upload/download a specific object directly to/from storage (like S3), without routing the file's bytes through the application server — reducing backend load and letting clients upload directly and securely.

**335. How would you design a video transcoding pipeline for adaptive bitrate streaming?**

On upload, queue the raw video for asynchronous processing: transcode it into multiple resolutions/bitrates, segment each into small chunks, generate a manifest file (HLS/DASH) describing available renditions, and store the outputs in object storage served via a CDN so the player can dynamically switch quality based on the viewer's network conditions.

**336. What is deduplication in storage systems, and how does content-addressable storage help?**

Deduplication avoids storing multiple physical copies of identical data. Content-addressable storage identifies data by a hash of its content rather than a location — if two uploads produce the same hash, the system just references the existing stored copy instead of storing a duplicate, saving significant storage at scale.

**337. How would you design a backup and disaster-recovery strategy for petabyte-scale storage?**

Use tiered, incremental backups (full periodically, incremental frequently) stored in a geographically separate region, define and test RPO/RTO targets, use erasure coding or cross-region replication for durability, and automate periodic restore drills to verify backups are actually recoverable, not just present.

---

## 19. Monitoring, Logging & Observability

**📺 Recommended videos for this section:**
- [Hussein Nasser](https://www.youtube.com/@hnasr)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**338. What is the difference between monitoring, logging, and tracing?**

Monitoring tracks aggregate metrics over time (CPU, error rate, latency percentiles) to detect known problems. Logging records discrete, detailed events (often per-request) useful for deep debugging after something goes wrong. Tracing follows a single request's journey across multiple services, showing exactly where time was spent — together they form 'observability'.

**339. What are the four golden signals of monitoring (latency, traffic, errors, saturation)?**

Latency (how long requests take), traffic (how much demand the system is under), errors (rate of failed requests), and saturation (how 'full'/utilized the system's resources are) — Google's SRE book identifies these as the core signals that, monitored together, reveal most operational problems.

**340. How would you design a centralized logging pipeline for hundreds of services?**

Each service emits structured (JSON) logs with correlation IDs, a lightweight agent on each host ships logs to a message queue/buffer (e.g., Kafka) for durability and backpressure handling, and a processing pipeline indexes them into a searchable store (like Elasticsearch) with retention/archival policies for older logs.

**341. What is distributed tracing, and how do trace IDs propagate across services?**

Distributed tracing tracks a request as it flows through multiple services by generating a unique trace ID at the entry point and propagating it (via headers) to every downstream call; each service records a 'span' (timing + metadata) tagged with that trace ID, and a tracing backend (Jaeger/Zipkin) stitches spans together into a full request timeline.

**342. How would you design an alerting system that avoids alert fatigue?**

Alert only on symptoms that indicate real user impact (not every possible internal anomaly), use well-tuned thresholds with hysteresis to avoid flapping, group/deduplicate related alerts, route alerts to the right on-call owner, and regularly review and prune alerts that are frequently ignored or non-actionable.

**343. What is a time-series database used for in monitoring (e.g., Prometheus)?**

A time-series database is optimized for storing and querying metrics indexed by timestamp (e.g., request count per minute), supporting efficient range queries, downsampling, and retention policies — Prometheus is widely used to scrape and store such metrics for dashboards and alerting.

**344. How would you design a metrics collection and aggregation system at scale?**

Services expose/emit metrics (counters, gauges, histograms) which are collected by agents (pull-based like Prometheus scraping, or push-based via a metrics pipeline), aggregated and downsampled over time to control storage cost, and stored in a time-series database queryable for dashboards and alerts.

**345. What is log sampling, and why is it needed at high traffic volumes?**

Log sampling records only a representative fraction of events (e.g., 1 in 100 requests) rather than every single one, needed at high scale because logging every event would be prohibitively expensive to store/process — while still retaining enough data for statistical analysis and always logging 100% of errors/anomalies.

**346. How would you design an on-call / incident-management alerting pipeline?**

Route triggered alerts to an on-call scheduling/escalation tool (like PagerDuty), define escalation policies (page a secondary if the primary doesn't acknowledge in time), integrate with chat/incident channels for coordination, and capture a timeline for post-incident review (postmortems).

**347. How do you design dashboards and SLOs for a large-scale production system?**

Define SLOs based on user-facing outcomes (e.g., 99.9% of requests succeed within 300ms), build dashboards around the golden signals per service, track error budgets (how much unreliability is 'allowed' before it forces a slowdown in feature work), and review them regularly against real incidents.

**348. What is anomaly detection, and how can it be applied to system metrics?**

Anomaly detection identifies metric patterns that deviate significantly from expected/historical behavior (using statistical baselines or ML models), applied to system metrics to catch subtle issues (like a slow memory leak or gradual latency creep) that fixed static thresholds might miss.

**349. What is chaos engineering, and how does it complement monitoring?**

Chaos engineering proactively injects controlled failures to test system resilience, which complements monitoring by validating that your alerts/dashboards actually fire correctly and your team can detect and respond to the failure scenarios you've built monitoring for, rather than discovering gaps only during a real incident.

**350. How do you debug a production incident using only logs, metrics, and traces?**

Start with metrics/dashboards to identify which service and time window the anomaly began (saturation, error rate spike), use distributed traces to pinpoint which specific downstream call is slow/failing, then drill into that service's detailed logs (filtered by trace ID) to find the root cause.

**351. What is health-check design for a Kubernetes-style liveness/readiness probe?**

A liveness probe checks whether a container is still running correctly (restarting it if not — catches deadlocks/crashes). A readiness probe checks whether a container is ready to accept traffic (removing it from load-balancing rotation if not, without restarting it) — separating 'is it alive' from 'is it ready to serve'.

**352. What is the difference between a metric, an event, and a log line?**

A metric is an aggregated numerical measurement over time (e.g., requests/sec). An event is a discrete, structured occurrence with specific attributes (e.g., 'user_signed_up' with user_id and timestamp). A log line is a free-form (often unstructured) textual record of something that happened, typically used for detailed debugging.

---

## 20. High-Level Design (HLD) Case Studies - 'Design X' Questions

**📺 Recommended videos for this section:**
- [Hello Interview](https://www.youtube.com/@hello_interview)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [Tech Dummies - Narendra L](https://www.youtube.com/c/TechDummiesNarendraL)

**353. Design a URL shortener (like Bit.ly or TinyURL).**

Core idea: generate a short unique key (via a counter + base62 encoding, or a hash) for each long URL, store the mapping in a key-value store (fast lookups by short key), use a cache (Redis) in front for hot redirects, and use a distributed ID generator so multiple servers can mint unique keys without collisions.

**354. Design a paste-bin like service.**

Similar to a URL shortener: generate a unique ID per paste, store the raw text/content in object storage (or a database for smaller pastes), cache frequently-accessed pastes, and support optional expiry (TTL) and access controls (private/public, password-protected).

**355. Design Twitter / X (tweet, follow, timeline, feed).**

Store tweets in a write-optimized store, maintain a social graph (follower/following) separately, and generate feeds using a hybrid fan-out approach: fan-out-on-write (push new tweets to followers' precomputed timelines) for normal users, and fan-out-on-read (pull at request time) for celebrities with huge follower counts, to avoid a write storm.

**356. Design Instagram (photo sharing, feed, stories).**

Store media in object storage with a CDN in front, keep post metadata in a database, generate the home feed via a hybrid fan-out (like Twitter), and handle stories as short-TTL content with a separate, ephemeral storage/cleanup path.

**357. Design a news feed system (like Facebook News Feed).**

Combine a fan-out service (pushing new posts into followers' precomputed feed caches) with a ranking service (scoring posts by relevance/engagement, not just recency), and merge results at read time from the precomputed cache plus any real-time ranking adjustments.

**358. Design WhatsApp / a real-time chat application.**

Use persistent WebSocket (or long-lived TCP) connections for real-time delivery, a message queue/broker to route messages between users (especially across different servers), a database for message persistence and offline delivery, and end-to-end encryption for message content.

**359. Design a group chat / group messaging system with read receipts.**

Store group membership and messages in a database, fan-out each new message to all online members' connections in real time (via pub/sub), persist per-user delivery/read status, and batch/aggregate read receipts to avoid excessive write amplification in large groups.

**360. Design Facebook Messenger's online/offline presence system.**

Maintain presence state (online/offline/last-seen) in a fast in-memory store updated via heartbeats from connected clients, use pub/sub to notify interested contacts of status changes in real time, and use a TTL-based expiry so a client that disconnects abruptly is eventually marked offline.

**361. Design YouTube / a video streaming platform.**

Support resumable chunked uploads to object storage, asynchronously transcode videos into multiple bitrates/resolutions for adaptive streaming, store metadata in a database, serve video segments via a CDN, and support a separate recommendation/ranking service for the home feed and 'up next'.

**362. Design Netflix (video-on-demand streaming at global scale).**

Pre-transcode and pre-position popular content across globally distributed CDN edge caches (including ISP-embedded caches), use adaptive bitrate streaming (HLS/DASH) for smooth playback under varying network conditions, and separate the control plane (metadata, personalization, billing) from the massive-scale data plane (video delivery).

**363. Design TikTok / a short-video sharing platform.**

Similar to YouTube's pipeline (chunked upload, transcoding, CDN delivery) but optimized for a highly personalized, ML-driven 'For You' feed that ranks short videos by predicted engagement, with heavy caching of the recommendation candidate pool and real-time signal ingestion (likes, watch time) feeding back into ranking.

**364. Design Uber / a ride-sharing service (matching, ETA, pricing).**

Track driver locations via periodic location updates ingested into a geospatial index (e.g., geohashing or quad-trees), match nearby available drivers to ride requests, compute ETA using a routing/mapping service, and calculate dynamic (surge) pricing based on real-time supply/demand ratios per geographic zone.

**365. Design a food-delivery app like DoorDash or Swiggy.**

Similar to ride-sharing's matching engine but with an added restaurant-order and inventory layer: match orders to nearby available delivery drivers, track order status through prep/pickup/delivery stages, and optimize routing/batching of multiple deliveries per driver where possible.

**366. Design Google Maps / a mapping and navigation service.**

Store map data as a graph (road segments as edges, intersections as nodes), pre-process it for fast shortest-path routing (e.g., using contraction hierarchies), serve pre-rendered map tiles via a CDN for the visual map, and ingest real-time traffic data to adjust routing/ETAs dynamically.

**367. Design a ride ETA and surge-pricing engine.**

Combine historical travel-time data, real-time traffic conditions, and current driver/rider supply-demand ratios per zone (computed via geospatial partitioning) into a predictive model, recalculating both ETA and price multipliers frequently (e.g., every minute) as conditions change.

**368. Design Dropbox / Google Drive (file sync and sharing).**

Split files into chunks, only upload/sync changed chunks (delta sync) to minimize bandwidth, store chunks in object storage with a metadata service tracking file versions and chunk mappings, and use a notification/sync protocol to propagate changes to other devices in near real time.

**369. Design Google Docs (real-time collaborative document editing).**

Use Operational Transformation (OT) or CRDTs to merge concurrent edits from multiple users without conflicts, broadcast edits to all connected clients via WebSocket in real time, and persist periodic snapshots plus the operation log for version history and recovery.

**370. Design a distributed web crawler (like Googlebot).**

Maintain a frontier (priority queue) of URLs to crawl, use a distributed set of fetcher workers respecting robots.txt and per-domain politeness/rate limits, deduplicate discovered URLs (via a bloom filter or seen-URL store), and store fetched content for downstream indexing.

**371. Design a search engine (like Google Search).**

Combine a distributed web crawler, a large-scale indexing pipeline (building an inverted index across sharded index servers), and a ranking system (combining relevance signals like PageRank-style link analysis with query-matching and machine-learned ranking) to serve results within milliseconds at query time.

**372. Design an ad click-counting / impression-tracking system.**

Ingest high-volume click/impression events into a streaming pipeline (Kafka), deduplicate and validate events (fraud filtering), aggregate counts in near-real-time using stream processing (windowed counts), and persist both raw events (for auditing/billing) and aggregated rollups (for fast reporting).

**373. Design a distributed rate limiter as a standalone service.**

Expose a simple check-and-increment API backed by a fast, low-latency shared store (Redis) implementing token bucket or sliding window logic atomically (via Lua scripts), deployed as a highly-available service that other systems call before processing a request.

**374. Design a URL health-check / uptime-monitoring service (like Pingdom).**

Run distributed probe agents in multiple geographic regions that periodically hit configured URLs/endpoints, record response time/status, aggregate results to determine overall up/down status (requiring agreement across regions to avoid false positives from regional network issues), and trigger alerts on state changes.

**375. Design an e-commerce checkout and order-management system (like Amazon).**

Use a saga-based workflow across inventory reservation, payment processing, and order creation services, ensure idempotent payment operations, reserve inventory atomically to prevent overselling, and asynchronously trigger downstream fulfillment/shipping once payment is confirmed.

**376. Design an inventory management system for a large warehouse network.**

Track stock levels per SKU per warehouse in a strongly consistent store (to prevent overselling), use optimistic locking or atomic decrement operations for concurrent order processing, and asynchronously sync aggregated availability to a faster read-optimized store for product-page display.

**377. Design a payment processing system (like Stripe or PayPal).**

Enforce strict idempotency on all payment operations, use a durable ledger (double-entry bookkeeping) for auditability, integrate with external payment networks/banks via well-isolated adapters, and process everything through a strongly consistent, heavily audited transaction pipeline given the correctness requirements of money movement.

**378. Design a digital wallet with ledger and transaction consistency guarantees.**

Model all balance changes as immutable, append-only ledger entries (never mutate a balance directly), compute current balance as a sum/materialized view of ledger entries, and use database transactions or distributed consensus to ensure atomicity of multi-account transfers.

**379. Design a stock trading platform / stock exchange matching engine.**

Use an in-memory, single-threaded (per instrument) order book and matching engine for deterministic, ultra-low-latency order matching, persist all orders/trades to a durable log for recovery and auditing, and separate the latency-critical matching path from slower downstream processes (settlement, reporting).

**380. Design a ticket-booking system (like Ticketmaster or BookMyShow) with seat locking.**

Use short-lived distributed locks (or a 'reserved' status with TTL) on selected seats during checkout to prevent double-booking, confirm the booking only after payment succeeds (releasing the lock/seat back to available if payment fails or times out), and use a queueing/waiting-room mechanism for high-demand on-sale events.

**381. Design a hotel-booking system (like Booking.com) preventing double-booking.**

Use a strongly consistent inventory table per room-date combination with atomic decrement/conditional-update operations, apply optimistic concurrency control to handle simultaneous booking attempts safely, and reconcile with third-party/partner inventory feeds asynchronously.

**382. Design an airline reservation system.**

Similar to hotel booking's inventory-locking approach but per-seat/per-flight-leg, requiring strong consistency for seat allocation and pricing (which may vary by demand), with careful handling of multi-leg itineraries needing all segments to be confirmed together (a mini distributed transaction).

**383. Design a ride-hailing driver-rider matching engine.**

Continuously index available drivers' locations in a geospatial structure, on a ride request query nearby drivers within an expanding radius, apply matching heuristics (closest ETA, driver rating, acceptance likelihood), and use a request-timeout/re-broadcast loop if a driver doesn't accept in time.

**384. Design a distributed job scheduler / cron service.**

Store scheduled job definitions in a database, use a distributed lock or leader election so only one instance triggers a given scheduled run, dispatch triggered jobs to a worker pool via a queue for execution, and track job run history/status for monitoring and retries.

**385. Design a distributed logging and analytics pipeline (like Splunk).**

Ingest logs via lightweight agents into a durable streaming buffer (Kafka), process/enrich/index them in a scalable search backend (Elasticsearch-like), and expose a query interface for full-text search and aggregation, with tiered storage (hot/warm/cold) to manage cost at scale.

**386. Design a URL/content moderation and spam-detection pipeline.**

Run new content asynchronously through automated classifiers (ML models, rule-based filters) for spam/abuse signals, route borderline/high-risk content to a human review queue, and maintain feedback loops so reviewer decisions retrain and improve the automated models over time.

**387. Design an online code judge (like LeetCode or HackerRank) that runs submitted code safely.**

Queue submissions for execution, run untrusted code in isolated, resource-limited sandboxes (containers or micro-VMs) with strict CPU/memory/time limits and no network access, compare output against expected test cases, and return results asynchronously (polling or WebSocket) since execution isn't instantaneous.

**388. Design a leaderboard system for a gaming platform.**

Use a sorted-set data structure (like Redis ZSET) keyed by score for O(log n) rank updates and fast top-K/rank queries, shard by game/region if the player base is very large, and periodically snapshot/archive historical leaderboards for season resets.

**389. Design a live video/audio conferencing system (like Zoom).**

Use WebRTC for peer-to-peer or SFU (Selective Forwarding Unit)-mediated real-time audio/video transport, an SFU architecture for group calls to avoid each client sending streams to every other client, adaptive bitrate per participant based on network conditions, and separate signaling (call setup) from media transport.

**390. Design a live streaming platform (like Twitch).**

Ingest the streamer's video via RTMP into a transcoding pipeline that produces multiple bitrate renditions in near real time, distribute segments via a CDN using low-latency HLS/DASH, and handle live chat via a separate high-throughput pub/sub messaging system.

**391. Design a comment system for a high-traffic blog or video platform.**

Store comments in a database indexed by the parent content ID, support threaded replies via a parent-comment-ID reference (or materialized path for deep nesting), cache the most-viewed comment threads, and moderate/rank comments (e.g., by likes or recency) at read time.

**392. Design a rate-limited public API platform (like Twitter API).**

Issue API keys/OAuth tokens per developer app, enforce tiered rate limits at the gateway (via Redis-backed counters), expose usage dashboards, and version the API to allow evolving it without breaking existing integrations.

**393. Design a distributed cache system from scratch (like Memcached).**

Partition keys across nodes using consistent hashing, store data purely in memory with an LRU eviction policy per node, use a simple client-side or proxy-based routing layer so clients know which node owns a given key, and treat cache misses as expected (falling back to the source of truth).

**394. Design a key-value store from scratch (like Redis).**

Combine an in-memory hash table for O(1) access with an optional persistence mechanism (append-only file or periodic snapshotting) for durability, support basic data structures beyond simple strings (lists, sets, sorted sets), and use a single-threaded event loop for simplicity and consistency, relying on clustering for horizontal scale.

**395. Design a distributed message queue from scratch (like Kafka).**

Model the log as an append-only, partitioned, replicated file per topic, use a leader per partition to order writes and replicate to followers, let consumers track their own read offset for flexible replay, and use a coordination service for partition leader election and metadata management.

**396. Design a content delivery network (CDN) from scratch.**

Deploy edge servers in many geographic points of presence, use anycast or DNS-based routing to send users to their nearest edge, cache content at the edge with TTL-based expiry and origin pull-through on cache miss, and provide an invalidation API for pushing updates when origin content changes.

**397. Design a URL-based ad-targeting and bidding system (RTB).**

On each ad opportunity, broadcast a bid request to multiple advertiser bidders within a strict latency budget (~100ms), collect and rank bids, select a winner via auction logic (e.g., second-price auction), and log the outcome for billing/analytics — all requiring extremely low end-to-end latency at massive scale.

**398. Design a recommendation system (like Netflix or YouTube recommendations).**

Combine candidate generation (retrieving a broad set of plausible items via collaborative filtering or embeddings) with a ranking model (scoring and ordering candidates using richer features), precompute/cache recommendations where possible, and continuously retrain models on fresh engagement data.

**399. Design a typeahead / autocomplete search suggestion service.**

Precompute a ranked trie or prefix index of popular queries, serve top suggestions from an in-memory cache for sub-10ms latency, and periodically refresh the underlying data with trending/recent query volume.

**400. Design a proximity-based service (like Yelp's 'nearby restaurants').**

Index locations using a geospatial data structure (geohash, quad-tree, or R-tree) that supports efficient radius/nearest-neighbor queries, combine proximity results with other ranking factors (rating, relevance), and cache popular area queries.

**401. Design a social-network friend/follow graph and mutual-friends feature.**

Store the graph in a data store optimized for adjacency queries (a graph database, or an adjacency-list table with proper indexing), compute mutual friends via set intersection of two users' friend lists (potentially cached for popular users), and consider a graph-partitioning strategy to keep related nodes co-located as the graph scales.

**402. Design a metrics/analytics dashboard for a SaaS product.**

Ingest raw events into a streaming pipeline, pre-aggregate into rollup tables (by hour/day) for fast dashboard queries rather than scanning raw events every time, and serve dashboard queries from a read-optimized OLAP store (columnar database) separate from the operational database.

**403. Design an online auction system (like eBay).**

Track current highest bid per item with atomic conditional updates to prevent race conditions between simultaneous bidders, use real-time notifications (WebSocket) to update watchers when a new bid is placed, and finalize auctions via a scheduled job that closes bidding and determines the winner at the exact end time.

**404. Design a subscription/billing system with recurring payments and dunning.**

Model subscriptions with billing cycles and states (active, past-due, canceled), run scheduled jobs to trigger recurring charges, implement retry/dunning logic (multiple retry attempts with increasing delay) for failed payments before cancellation, and maintain an auditable invoice/ledger history.

**405. Design a distributed counter (like counting Instagram likes at scale).**

Avoid a single hot database row by sharding the counter across multiple partitions (each handling a portion of increments) and summing them for reads, or use an approximate, eventually-consistent counter that batches increments in memory and periodically flushes to durable storage.

**406. Design a URL-shortener-style ID generator service used across many products.**

Use a centralized (but horizontally scalable) ID generation approach like Twitter Snowflake — encoding timestamp, worker ID, and sequence number into a unique ID — so any service can request globally unique, roughly time-ordered IDs without a shared database bottleneck.

**407. Design a real-time multiplayer game backend (state sync and matchmaking).**

Use a matchmaking service to group players by skill/latency, run authoritative game state on a dedicated game server per match (to prevent cheating), sync state to clients via low-latency UDP-based protocols with client-side prediction/interpolation, and persist match results afterward.

**408. Design a fraud-detection system for online transactions.**

Score transactions in real time using a combination of rule-based checks (velocity limits, blocklists) and ML models trained on historical fraud patterns, route high-risk transactions to manual review or step-up authentication, and continuously retrain models using confirmed fraud/chargeback feedback.

**409. Design a two-factor authentication (2FA) / OTP delivery system.**

Generate a time-limited, single-use code (TOTP algorithm or a random code stored server-side with expiry), deliver it via SMS/email/push with retry logic, rate-limit generation/verification attempts to prevent brute-forcing, and invalidate the code after successful use or expiry.

**410. Design a distributed email service (like Gmail).**

Store emails and metadata in a scalable database sharded by user, use a message-transfer pipeline (SMTP ingestion, spam filtering, indexing) for incoming mail, build a full-text search index per mailbox, and support real-time push (IMAP IDLE or WebSocket) for new mail notifications.

**411. Design Google Calendar with recurring events and reminders.**

Store recurring events using a recurrence rule (RRULE) rather than materializing every instance, expand occurrences on the fly (or lazily materialize a bounded window) for display, and use a scheduled job/timer service to trigger reminder notifications at the right time per event instance and user time zone.

**412. Design a food-delivery ETA prediction and dispatch system.**

Combine historical delivery-time data, real-time traffic/weather, restaurant prep-time estimates, and current driver locations into an ETA prediction model, and use an optimization/dispatch algorithm to assign drivers to orders (potentially batching multiple orders) minimizing total delivery time.

**413. Design a global inventory/pricing sync system for a multi-warehouse retailer.**

Maintain authoritative inventory/pricing per warehouse/region with strong consistency locally, propagate updates to a globally-readable cache/search index asynchronously, and use conflict-resolution/reconciliation jobs to handle any discrepancies between regional sources of truth.

**414. Design a photo/video storage and deduplication system (like Google Photos).**

Store media in object storage, compute a content hash on upload to detect and deduplicate identical files, generate thumbnails/multiple resolutions asynchronously, and use an ML pipeline (run asynchronously) for features like face grouping and search-by-content.

**415. Design a document version-control system (like Git at a conceptual level).**

Model each change as an immutable commit object referencing a snapshot (or diff) of the content plus its parent commit(s), forming a directed acyclic graph of history, with branches as movable pointers to commits — enabling efficient storage via content-addressable, deduplicated blob storage.

**416. Design a distributed configuration management service (like Consul).**

Use a consensus-backed (Raft) key-value store for configuration data to guarantee consistency, allow clients to watch/subscribe to keys for real-time change notifications, and provide a hierarchical namespace so configuration can be scoped per service/environment.

**417. Design a feature-flagging system for gradual rollouts.**

Store flag definitions and targeting rules (percentage rollout, user segments) in a low-latency store, have client SDKs fetch/cache flag state locally (falling back safely if the flag service is unreachable), and support real-time flag updates via polling or push without requiring a redeploy.

**418. Design a A/B testing platform for a large product.**

Assign users to experiment variants deterministically (via a hash of user ID + experiment ID) for consistent bucketing, log exposure and outcome events to an analytics pipeline, and compute statistical significance on aggregated results, ensuring experiments don't overlap in conflicting ways.

**419. Design an ad-impression fraud-detection system.**

Analyze impression/click event streams in real time for suspicious patterns (abnormal click-through rates, bot-like timing, IP/device anomalies), cross-reference against known fraud signatures and blocklists, and flag or discount fraudulent traffic before it's billed to advertisers.

**420. Design a large-scale URL-crawling politeness/robots.txt-aware fetcher.**

Maintain a per-domain queue and rate limiter so no single domain is hit too aggressively, fetch and cache each domain's robots.txt to respect crawl directives, and use a distributed scheduler that balances overall crawl throughput against per-domain politeness constraints.

---

## 21. Low-Level Design (LLD) & Object-Oriented Design

**📺 Recommended videos for this section:**
- [Hello Interview](https://www.youtube.com/@hello_interview)
- [Tech Dummies - Narendra L](https://www.youtube.com/c/TechDummiesNarendraL)

**421. What is the difference between HLD and LLD interviews?**

HLD interviews focus on system-level architecture — services, data stores, scaling. LLD interviews focus on class-level design — how you'd actually model the entities, interfaces, and interactions in code, emphasizing OOP principles, design patterns, and extensibility for a single component or application.

**422. What are the SOLID principles, and how do they apply to LLD interviews?**

SOLID = Single Responsibility (a class should have one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes must be substitutable for their base types), Interface Segregation (prefer many specific interfaces over one general one), and Dependency Inversion (depend on abstractions, not concrete implementations) — interviewers look for these principles reflected in your class design.

**423. What is the difference between composition and inheritance, and when do you prefer each?**

Inheritance models an 'is-a' relationship, reusing behavior by extending a base class, but can lead to rigid hierarchies. Composition models a 'has-a' relationship, building behavior by combining smaller objects — generally preferred ('favor composition over inheritance') because it's more flexible and avoids issues like fragile base classes.

**424. Design a parking lot system (classes, ticketing, pricing).**

Model ParkingLot, Level, ParkingSpot (with types like compact/large/handicapped), Vehicle (subtypes), and Ticket classes; use a strategy pattern for pricing (different rate calculations), and a spot-assignment algorithm that finds the nearest available spot matching the vehicle type.

**425. Design an elevator system (scheduling algorithm, requests).**

Model Elevator, ElevatorController, Request (with direction and floor), and use a scheduling algorithm (like SCAN/LOOK, servicing requests in one direction before reversing) to minimize wait time; the controller assigns incoming requests to the best-positioned available elevator.

**426. Design a vending machine (states and transitions).**

Use the State pattern to model machine states (Idle, HasMoney, Dispensing, OutOfStock) with well-defined transitions triggered by events (insert coin, select item, dispense), keeping each state's allowed behavior isolated and easy to extend.

**427. Design a library management system.**

Model Book, BookItem (physical copy), Member, Librarian, and Loan/Reservation classes, with a search catalog service, due-date/fine calculation logic, and a reservation queue for popular books that are currently checked out.

**428. Design a chess game (board, pieces, move validation).**

Model an abstract Piece class with subclasses per piece type implementing their own move-validation logic (polymorphism), a Board class holding the grid state, and a Game/Referee class enforcing turn order, check/checkmate detection, and overall game rules.

**429. Design a tic-tac-toe / connect-four game engine.**

Model a Board (grid state), Player, and Game class managing turns and win-condition checks after each move; keep the win-checking logic generalized (checking rows/columns/diagonals) so it's reusable across similar grid-based games.

**430. Design an ATM machine system.**

Use the State pattern for ATM states (Idle, CardInserted, PinEntered, TransactionSelected), model Account, Card, Transaction, and CashDispenser classes, and ensure transaction operations are atomic (e.g., debit the account only if cash dispensing succeeds).

**431. Design a movie-ticket-booking system's class model (seats, shows, locking).**

Model Movie, Show, Theater, Seat, and Booking classes; use a temporary hold/lock on selected seats (with expiry) during the checkout flow, confirming the booking (and permanently marking seats unavailable) only after payment succeeds.

**432. Design a ride-sharing app's class model (drivers, riders, trips, pricing strategy).**

Model Driver, Rider, Trip (with a state machine: requested, accepted, in-progress, completed), and use a Strategy pattern for pricing (different fare calculation strategies for standard/surge pricing) and a matching service to pair riders with nearby drivers.

**433. Design a restaurant table reservation system.**

Model Restaurant, Table (with capacity), Reservation, and a availability-checking service that prevents overlapping reservations for the same table, supporting search by party size, date, and time window.

**434. Design a splitwise / expense-sharing application.**

Model User, Group, Expense (with a split strategy — equal, percentage, exact amounts), and maintain a simplified balance/ledger between users, using a debt-simplification algorithm to minimize the number of settling transactions needed among group members.

**435. Design an in-memory key-value store's class structure with TTL support.**

Use a hash map for O(1) key lookup, store each value alongside an expiry timestamp, and either lazily check expiry on read or run a periodic background sweep to evict expired keys — plus optional eviction policy (LRU) when capacity limits are reached.

**436. Design a logging framework from scratch (levels, appenders, formatters).**

Model a Logger with configurable log levels (DEBUG/INFO/WARN/ERROR), pluggable Appender implementations (console, file, network) via an interface, and Formatter classes to control output format — using the Strategy/Decorator patterns so appenders and formatters can be combined flexibly.

**437. Design a notification service using the observer pattern.**

Model a Subject (the event source) that maintains a list of Observer subscribers (email, SMS, push handlers), notifying all of them when an event occurs — decoupling the event source from the specific notification channels, which can be added/removed independently.

**438. Design a file system's directory/inode class structure.**

Use a composite pattern: a common Node interface/base class with File (leaf) and Directory (composite, containing child Nodes) subclasses, allowing recursive operations (like computing total size) to be applied uniformly across files and directories.

**439. Design a text editor's undo/redo mechanism (command pattern).**

Use the Command pattern: encapsulate each editing action as a Command object with execute() and undo() methods, maintain an undo stack (push executed commands) and a redo stack (push undone commands, cleared on new actions), enabling arbitrary undo/redo depth.

**440. Design a rate limiter as an embeddable library (not a service).**

Implement a token-bucket or sliding-window algorithm as an in-process class with thread-safe state (e.g., using atomic counters or locks), exposing a simple tryAcquire() method that callers check before proceeding, suitable for embedding directly within a single application process.

**441. Design a car rental system.**

Model Vehicle (with subtypes/categories), Reservation, Branch (pickup/dropoff locations), and Customer classes, with availability checks per vehicle-category-date-range, and a pricing engine factoring rental duration, vehicle type, and any add-ons.

**442. Design a hotel management system.**

Model Hotel, Room (with types), Reservation, and Guest classes, with a room-availability search service, check-in/check-out state tracking, and a billing module that aggregates room charges plus any additional services.

**443. Design a snake-and-ladder or card game engine.**

Model Board, Player, Dice, and a Game controller that manages turn order and applies board effects (snakes/ladders as position-jump rules stored in a map), keeping the rules engine decoupled from the board representation so variants can be added easily.

**444. Design a URL router / dispatcher used inside a web framework.**

Model routes as a trie or pattern-matching structure mapping URL patterns (including path parameters) to handler functions, resolve incoming requests by matching the path against registered routes (most-specific match first), and extract path parameters for the matched handler.

**445. Design a pub-sub library used inside a single application (no external broker).**

Model a Topic/EventBus class maintaining a list of subscriber callbacks per event type, a publish() method that synchronously or asynchronously invokes all registered subscribers for that event, and thread-safety considerations if publishers/subscribers run on different threads.

**446. What creational, structural, and behavioral design patterns are most useful in LLD interviews?**

Creational: Singleton, Factory, Builder (for constructing complex objects step by step). Structural: Adapter, Decorator, Composite, Facade. Behavioral: Strategy, Observer, State, Command — these cover the vast majority of patterns that come up naturally when designing real-world LLD problems like the ones above.

**447. When would you use the Strategy pattern vs. the State pattern in an LLD interview?**

Use Strategy when you want to swap interchangeable algorithms/behaviors (e.g., different pricing calculations) that the client explicitly chooses. Use State when an object's behavior should change automatically based on its internal state (e.g., a vending machine behaving differently depending on whether it currently has money inserted).

**448. How do you design thread-safe classes for a multi-threaded LLD problem (e.g., bounded blocking queue)?**

Use synchronization primitives (locks, conditions) to protect shared mutable state, ensure producers block when the queue is full and consumers block when it's empty (using wait/notify or condition variables), and carefully avoid deadlocks by acquiring locks in a consistent order.

**449. Design an LRU cache class with O(1) get/put operations.**

Combine a hash map (for O(1) key lookup) with a doubly-linked list (to track recency order) — on access, move the accessed node to the front of the list; on insert when full, evict the node at the back (least recently used), updating both structures together.

**450. Design a thread pool from scratch.**

Maintain a fixed set of worker threads that continuously pull tasks from a shared, thread-safe task queue and execute them, expose a submit() method to enqueue new tasks, and support graceful shutdown (letting queued tasks finish or discarding them, depending on the shutdown mode).

---

## 22. Behavioral & Soft-Skill Aspects of System Design Interviews

**📺 Recommended videos for this section:**
- [Hello Interview](https://www.youtube.com/@hello_interview)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**451. How should you structure your first 5 minutes in a system design interview?**

Spend it clarifying scope and requirements: confirm the core use cases in scope, ask about expected scale, and note any explicit constraints — resist the urge to start drawing boxes immediately, since a well-scoped problem prevents wasted effort later.

**452. What questions should you ask the interviewer before designing anything?**

Ask about the specific features in scope (what's a 'must have' vs. out of scope), expected scale (users, QPS, data volume), read/write ratio, latency/availability expectations, and any existing constraints (must integrate with X, must use Y tech stack).

**453. How do you communicate trade-offs clearly without sounding indecisive?**

State your recommended choice explicitly, briefly explain the 1-2 alternatives you considered and why you didn't pick them, and tie the decision back to the specific requirements of this problem — confidence comes from grounding the choice in stated trade-offs, not from pretending there's only one right answer.

**454. How do you handle a system design interview when the requirements are intentionally vague?**

Treat the vagueness as part of the test: state reasonable assumptions out loud, ask a couple of targeted clarifying questions rather than many scattershot ones, and proceed — showing you can make forward progress under ambiguity is exactly what's being evaluated.

**455. How do you manage time across requirements, high-level design, and deep dive in a 45-minute interview?**

A common allocation is roughly 5-10 minutes on requirements/estimation, 15-20 minutes on high-level design, and the remaining time on a deep dive into 1-2 components the interviewer cares most about — watch the interviewer's engagement/questions as a signal for where to spend more time.

**456. How do you recover gracefully if you realize your initial design has a flaw halfway through?**

Acknowledge it directly and matter-of-factly ('actually, I realize this approach has an issue with X — let me adjust'), propose the fix, and move on — interviewers generally view catching and correcting your own mistake as a positive signal, not a negative one.

**457. How should a senior/staff engineer's answer differ from a mid-level engineer's answer to the same prompt?**

A senior/staff answer moves faster through the standard high-level design and spends proportionally more time on deep, nuanced trade-off discussions, edge cases, and failure modes, often drawing on real production experience — breadth is expected at all levels, but depth and judgment under trade-offs is what differentiates seniority.

**458. How do you decide how much detail to go into for a given component vs. moving on?**

Go deep on components that are core to the problem's unique challenges (the parts that make this system interesting/hard) and stay high-level on commodity/solved components (e.g., don't over-explain how a load balancer works) — take cues from what the interviewer probes on.

**459. What common mistakes make candidates fail system design interviews?**

Jumping straight into a detailed design without clarifying requirements, over-engineering for a scale that wasn't asked for, going too deep on one component and running out of time, being unable to justify trade-offs, and failing to communicate/think out loud during the process.

**460. How do you practice mock system design interviews effectively before the real thing?**

Practice out loud (not just reading solutions), time yourself against realistic interview length, get feedback from someone experienced (peer or mock-interview platform), and deliberately practice a range of problem types rather than memorizing solutions to a fixed list of 'famous' questions.

**461. How do you present a system design on a whiteboard or virtual canvas effectively?**

Keep the diagram clean and label components clearly, use arrows to indicate data flow direction, group related components visually, and update the diagram incrementally as you narrate your reasoning rather than drawing everything at once and explaining after.

**462. How do you handle it when the interviewer pushes back hard on your design choice?**

Treat it as a genuine technical discussion, not a personal challenge: restate your reasoning, ask what specific concern they have, and be genuinely willing to change your answer if their point is valid — rigidly defending a flawed choice is worse than adapting thoughtfully.

---

## 23. Advanced & Staff+ Level Topics

**📺 Recommended videos for this section:**
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)
- [Hussein Nasser](https://www.youtube.com/@hnasr)
- [Gaurav Sen](https://www.youtube.com/@gkcs)

**463. How do you design a multi-region, active-active system with data-residency requirements (e.g., GDPR)?**

Partition user data by region at the storage layer so a given user's data physically resides in their compliant region, route requests to the correct regional cluster based on user identity/location, and carefully scope any cross-region replication (e.g., only non-PII aggregate data) to avoid violating residency rules.

**464. What is a CRDT-based collaborative editor, and how does it resolve concurrent edits?**

It represents document content using conflict-free replicated data types (e.g., a sequence CRDT for text), where every edit operation is designed to commute — meaning concurrent edits from different users can be applied in any order on any replica and still converge to the same final document, without needing a central lock or coordinator.

**465. How would you design a globally consistent distributed transaction system without 2PC?**

Use techniques like Google Spanner's TrueTime (globally synchronized clocks with bounded uncertainty) combined with Paxos-based replication to achieve externally consistent distributed transactions without the blocking downsides of classic 2PC, or use saga-based eventual consistency where strict global transactions aren't required.

**466. How do you design for zero-downtime deployments at massive scale (canary, blue-green, shadow traffic)?**

Combine canary releases (gradually increasing traffic to the new version while monitoring error rates), blue-green deployments (instant traffic switch with fast rollback), and shadow traffic (mirroring production requests to the new version without affecting real responses, to validate correctness before it serves live traffic).

**467. How do you design a system to survive an entire cloud region outage?**

Deploy fully redundant infrastructure and data replication across at least two independent regions, use automated health-checked failover (DNS/GSLB) to redirect traffic, regularly test actual failover (not just theoretical readiness), and ensure the failover region has sufficient pre-provisioned capacity to absorb full traffic.

**468. What is service degradation strategy design (feature flags, load shedding) under extreme load?**

Use feature flags to disable non-critical, expensive features first (e.g., recommendations, analytics) under load, apply load shedding at the edge (reject a percentage of lowest-priority requests) to protect core functionality, and prioritize serving the most critical user flows even if it means degrading everything else.

**469. How would you design capacity planning for a system expecting 100x growth in 12 months?**

Identify which components scale linearly vs. which will need architectural changes (e.g., sharding a database that will hit its ceiling), build load-testing and forecasting into the roadmap, prioritize refactoring the components with the earliest expected breaking point, and design with headroom/pluggable scaling points rather than hardcoded assumptions.

**470. How do you design cost-efficient storage tiering (hot/warm/cold) for exabyte-scale data?**

Classify data by access frequency: hot data in fast, expensive storage (SSD/in-memory), warm data in cheaper standard storage, and cold/archival data in the cheapest storage (like tape-backed archival tiers), with automated lifecycle policies that migrate data between tiers based on age/access patterns.

**471. How do you design a multi-tenant SaaS platform's data isolation and noisy-neighbor protection?**

Enforce logical data isolation (tenant_id scoping, or separate schemas/databases for larger tenants), apply per-tenant resource quotas/rate limits to prevent one tenant's load from degrading others, and consider dedicated infrastructure tiers for premium/high-usage tenants.

**472. What is the architecture behind large-scale real-time bidding (RTB) ad systems?**

Ad exchanges broadcast bid requests to many bidders simultaneously within an extremely tight latency budget (~100ms round trip), bidders score the opportunity using pre-loaded, low-latency models/caches (no time for a database round-trip mid-auction), and the exchange runs the auction and returns the winning creative — all requiring heavy pre-computation and geographically distributed bidding infrastructure.

**473. How would you design a globally distributed rate limiter with sub-100ms consistency?**

Use regional rate-limit enforcement with periodic, asynchronous synchronization of aggregate counts across regions (accepting brief over-allowance at the boundary), or a hierarchical approach where each region gets an allocated sub-quota of a global limit, refreshed periodically — true real-time global consistency at that latency budget generally isn't feasible, so the design accepts approximate enforcement.

**474. How do you design chaos engineering experiments for a payments system safely?**

Run experiments first in staging/shadow environments, use tightly scoped blast-radius controls in production (small percentage of non-critical traffic), have automated abort conditions (kill the experiment immediately if key financial metrics are impacted), and never inject faults that could cause actual incorrect money movement.

**475. How would you architect a system for real-time fraud detection at millions of transactions/sec?**

Use a streaming architecture (Kafka + stream processing) to score transactions in-flight against pre-computed features and lightweight models with strict latency budgets, offload heavier/asynchronous analysis to a secondary pipeline for post-hoc review, and keep the real-time scoring path as simple/fast as possible to avoid blocking legitimate transactions.

**476. What is the architecture of a large-scale feature store for machine learning?**

A feature store separates an offline store (historical features for training, often in a data warehouse) from an online store (low-latency features for real-time inference, often a key-value store), with a shared feature computation/definition layer ensuring training-serving consistency (avoiding skew between training and production features).

**477. How would you design an ML model-serving platform with low-latency inference at scale?**

Serve models via horizontally-scaled inference servers with model versioning and canary rollout support, use batching to improve GPU/CPU utilization where latency budgets allow, cache frequent predictions where applicable, and route traffic through a model registry/gateway that handles versioning and A/B testing of models.

**478. How do you design a system for exactly-once event processing across multiple data centers?**

Combine idempotent processing (deduplication keyed by a globally unique event ID) with a durable, replicated log as the source of truth, and use transactional/two-phase writes only where genuinely necessary — accepting that true cross-datacenter exactly-once delivery is approximated via idempotency rather than guaranteed by the transport layer alone.

**479. How would you design Twitter Snowflake-style unique ID generation across data centers?**

Encode a timestamp, a data-center ID, a machine/worker ID, and a per-millisecond sequence number into a single 64-bit ID, so each worker can generate unique, roughly time-sortable IDs entirely independently, without any cross-datacenter coordination or shared state.

**480. How do you design schema evolution for a system using Avro/Protobuf across many services?**

Use schema registries that enforce compatibility rules (backward/forward compatible changes only), always add new fields as optional with defaults, never repurpose or remove existing field numbers/names, and validate schema compatibility automatically in CI before allowing a producer to deploy a changed schema.

**481. What is the architecture behind large-scale distributed tracing systems (e.g., Jaeger, Zipkin)?**

Instrumented services emit spans tagged with trace/span IDs to a collector, which buffers and batches them into a storage backend (often a columnar or time-series store) optimized for trace queries, with a query/UI layer that reconstructs and visualizes the full trace tree from stored spans, and sampling applied at ingestion to control data volume.

**482. How would you design a globally distributed configuration/feature-flag propagation system?**

Use a source-of-truth config store replicated to regional caches/edge nodes, propagate changes via a pub/sub mechanism for near-real-time updates, and have clients fall back to their last-known-good cached config if connectivity to the config service is temporarily lost.

**483. How do you design backpressure and load-shedding for an event-streaming pipeline under 10x traffic spikes?**

Use bounded queues/buffers with explicit backpressure signaling to producers, prioritize critical event types and shed (drop or defer) lower-priority events first under overload, and auto-scale consumers reactively while ensuring the shedding logic itself is cheap enough not to become a bottleneck.

**484. How would you design an API for idempotent, exactly-once financial transfers across currencies?**

Require a client-supplied idempotency key per transfer request, persist the transfer as an immutable ledger entry only once per idempotency key (using a unique constraint), perform currency conversion using a locked-in exchange rate at request time, and use a two-phase local/remote-currency ledger update pattern with compensation on partial failure.

**485. What is the architecture behind a large-scale CDN's origin-shielding to protect backend servers?**

An origin shield is an intermediate caching layer between edge nodes and the origin — instead of every edge node independently fetching from origin on a cache miss (multiplying origin load), all edge nodes route cache misses through a single shield layer that deduplicates requests and caches the result once, protecting the origin from redundant load.

**486. How would you evaluate and choose a consensus store (etcd vs. ZooKeeper vs. Consul) for a new platform?**

Consider ecosystem fit (etcd is the Kubernetes-native default, ZooKeeper has deep integration with Hadoop/Kafka-era tools, Consul adds built-in service discovery/mesh features), operational maturity/familiarity of your team, and specific feature needs (e.g., Consul's native health checking vs. etcd's simpler, leaner key-value focus).

**487. How would you design a data pipeline for near-real-time analytics on billions of events/day?**

Ingest events into a durable streaming platform (Kafka), use stream processing (Flink/Spark Streaming) for windowed aggregations feeding a fast-serving analytical store, and maintain a parallel batch pipeline over the same raw data for reprocessing/correction (a lambda or kappa architecture), balancing latency needs against accuracy/completeness.

---

## 24. Rapid-Fire & Tricky Conceptual Questions

**📺 Recommended videos for this section:**
- [Gaurav Sen](https://www.youtube.com/@gkcs)
- [ByteByteGo](https://www.youtube.com/@ByteByteGo)

**488. Why can't you always achieve both strong consistency and low latency across regions?**

Guaranteeing strong consistency across regions requires coordinating (at least partially) with remote replicas before confirming a write/read, and speed-of-light network delays between distant regions impose a hard floor on that coordination time — so strong cross-region consistency inherently trades away low latency.

**489. Why is 'just add a cache' not always the right answer in an interview?**

Caching introduces staleness/invalidation complexity, doesn't help write-heavy workloads, and can mask an underlying scalability problem rather than solving it — interviewers want to see you consider whether caching is actually the right lever for the specific bottleneck, not a reflexive default answer.

**490. Why might increasing the number of servers make a system slower, not faster?**

If the bottleneck is a shared resource (a single database, a lock, a network link) rather than compute capacity, adding more servers just increases contention on that shared resource, and coordination overhead between more nodes can itself add latency — scaling out only helps if the actual bottleneck is horizontally scalable.

**491. Why is a message queue not a silver bullet for every scaling problem?**

Queues add latency (asynchronous processing isn't instant), operational complexity (another system to run/monitor), and don't solve problems rooted in the downstream consumer's own processing capacity — if the consumer can't keep up, messages just pile up in the queue instead of the previous bottleneck.

**492. Why do most real systems favor eventual consistency for user-facing reads?**

Because strong consistency typically requires synchronous coordination that increases latency and reduces availability, and for most user-facing content (feeds, likes, view counts) a few seconds of staleness is imperceptible or harmless to users, making the availability/performance trade-off well worth it.

**493. Why is sharding often considered a 'last resort' rather than a first step?**

Sharding adds substantial complexity (cross-shard queries, rebalancing, hot spots, application-level routing) that's hard to undo once in place, so most systems first exhaust simpler options (better indexing, caching, read replicas, vertical scaling) before committing to the operational overhead of sharding.

**494. Why does adding more database read replicas not fix a write-bottleneck problem?**

Read replicas only offload read traffic — every write still has to go through the single primary (and often synchronously or near-synchronously propagate to replicas), so no matter how many replicas you add, write throughput remains capped by what the primary node can handle.

**495. Why can a poorly chosen shard key make resharding almost impossible later?**

If the shard key doesn't distribute data/traffic evenly, or if the application has baked in assumptions about which shard specific data lives on, resharding requires touching essentially all data and rewriting significant application logic — a well-chosen key from the start avoids this costly, high-risk migration.

**496. Why is idempotency more important in payment systems than almost anywhere else?**

Because network failures mean clients must retry requests, and without idempotency a retried payment request could charge a customer multiple times for a single intended transaction — a mistake with direct financial and trust consequences, unlike most other domains where a duplicate action is merely annoying.

**497. Why do interviewers care more about your trade-off reasoning than your final diagram?**

Because in real engineering work, there's rarely one 'correct' architecture — what matters is whether you can identify the relevant constraints, weigh competing options against them, and justify a defensible choice, which is a much stronger signal of on-the-job judgment than memorizing a specific diagram.

**498. Why is 'it depends' often the most technically correct answer in system design?**

Because nearly every design decision (SQL vs. NoSQL, sync vs. async, consistency vs. availability) involves genuine trade-offs whose right answer depends on the specific requirements, scale, and constraints of the problem — the skill being tested is articulating what it depends on, not just saying the phrase.

**499. Why can adding a cache introduce a new class of bugs around stale data?**

Because the cache becomes a second source of truth that can silently drift from the underlying data if invalidation logic has gaps or race conditions, leading to bugs where users see outdated information that's hard to reproduce and debug since it depends on timing.

**500. Why is exactly-once delivery considered nearly impossible in general distributed systems?**

Because a sender can never be 100% certain whether a message was received (an acknowledgment could be lost even if the message was processed), so the sender must choose between risking duplicate delivery (retry) or risking message loss (don't retry) — exactly-once in practice is really 'at-least-once delivery' plus idempotent processing to fake the exactly-once effect.

**501. Why do most companies prefer boring, proven technology over the newest database?**

Because operational maturity (known failure modes, tooling, hiring pool, community knowledge) reduces production risk far more than marginal performance gains from a newer technology — the cost of an outage or an operational blind spot in an unfamiliar system usually outweighs the benefits of adopting something newer.

**502. Why is capacity estimation often more valuable to an interviewer than the estimate itself?**

Because the exact numbers rarely matter as much as demonstrating that you can reason from user behavior to concrete infrastructure implications (e.g., 'this QPS means we can't use a single SQL instance') — the estimation process reveals whether you understand how scale actually drives architectural decisions.

---

## 🙌 Contributing

Found a great, currently-working video for a specific question above, or want to expand an answer with more depth? Open a PR. To add a video to a specific question, add it as a sub-bullet right under that question's answer, e.g.:

```markdown
**123. Design a URL shortener (like Bit.ly or TinyURL).**

Core idea: generate a short unique key...

- 🎥 [Video title](https://youtube.com/watch?v=...)
```

Please only submit links you've personally verified are live and actually relevant - broken or off-topic links will be removed.

## 📄 License

This README is free to use, share, and adapt for your own interview prep or repos.