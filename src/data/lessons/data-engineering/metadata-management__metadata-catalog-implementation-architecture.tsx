import type { Component } from "solid-js";

const LessonMetadataManagementMetadataCatalogImplementationArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Metadata Catalog Implementation Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Five Layer Architecture:
            </div>
            Production grade metadata catalogs follow a consistent architectural
            pattern that interviewers expect you to understand. The pattern has
            five layers: ingest, normalize, store, index, and serve. Each layer
            has specific trade-offs and scale challenges.
            <strong>Layer 1: Event Driven Ingestion</strong>
            Metadata ingestion is event driven, not batch. Connectors in storage
            systems, schedulers, ETL tools, and BI platforms emit metadata
            change events whenever datasets, schemas, or jobs change. For
            example, when a new Delta Lake table version commits, a transaction
            log listener publishes a message with table name, version, operation
            type, and affected files. At high scale, ingestion pipelines handle
            thousands to tens of thousands of metadata events per second. This
            requires careful backpressure handling and idempotency: if the same
            schema change event arrives twice due to retries, the catalog must
            deduplicate it. Most implementations use message queues like Kafka
            with consumer groups to parallelize ingestion and guarantee at least
            once delivery.
            <strong>Layer 2: Normalization and Modeling</strong>
            Different systems represent concepts incompatibly. Hive uses
            "database + schema + table," BigQuery uses "project + dataset +
            table," Snowflake uses "database + schema + table" with different
            semantics. The catalog maps these into a unified data model, often a
            graph where nodes are datasets, columns, jobs, and dashboards, and
            edges represent lineage or ownership. Strong typing and versioning
            are essential. When a column changes from integer to string, the
            catalog must track both the old and new versions to support time
            travel queries over metadata. This is critical for debugging: "What
            did the schema look like when the pipeline broke last Tuesday?"
            <strong>Layer 3: Multi System Storage</strong>
            Most implementations use a combination of storage systems. A
            relational database (Postgres, MySQL) stores authoritative metadata
            entities with ACID (Atomicity, Consistency, Isolation, Durability)
            guarantees for writes. A search index (Elasticsearch, Solr) powers
            free text search over descriptions, tags, and field names with
            faceted filtering by owner, domain, or classification. A graph
            database or graph layer (Neo4j, custom graph on top of relational)
            efficiently traverses lineage up and downstream. At LinkedIn scale,
            DataHub supports lineage queries over millions of nodes with p99
            latencies under a few hundred milliseconds. This requires careful
            denormalization: precomputing transitive closures for common lineage
            patterns and caching hot paths.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Serving Layer Performance Targets
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;50ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P50 CACHED
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100-300ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 WRITES
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;10ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 POLICY CHECK
                  </div>
                </div>
              </div>
            </div>
            <strong>Layer 4: Serving API and Caching</strong>
            The serving layer is a stateless API tier and UI. The API handles
            search, entity fetch by key, lineage traversal, and policy
            evaluation. Caching is critical: hot entities such as popular tables
            or dashboards are stored in memory caches (Redis, Memcached) to keep
            p50 latency under 50 ms even under heavy read loads reaching
            thousands of QPS. For write paths, catalogs prioritize durability
            and ordering, accepting slightly higher latency: 100 to 300 ms p99
            for metadata writes is typical. This is acceptable because metadata
            writes are much rarer than reads.
            <strong>Layer 5: Policy Enforcement Integration</strong>
            Policy enforcement integrates the catalog with query engines and
            access control systems. When a user queries a table, the engine asks
            the catalog: "What policies apply to user X for dataset Y?" The
            catalog returns rules like "mask column Z" or "deny access to
            dataset Y." The engine applies these rules. This must be fast
            because it is in the hot path for query planning. Catalogs cache
            policy evaluations and use hierarchical rule structures to avoid
            scanning all policies for every query. Target latency is under 10 ms
            p99.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> The catalog is not just a passive
              index. It is an active service that influences query planning,
              access control, and schema evolution across the entire data
              platform. Reliability patterns mirror other critical services:
              multi-region deployment, active-active databases, periodic
              reconciliation from source systems, and health checks that verify
              both ingestion freshness and serving latency.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Differentiator:
            </div>
            Treating metadata as a product with SLAs, not as a best effort
            index, is the distinguishing mark of robust production-grade
            catalogs. Teams that do this well measure ingestion lag (target: p99
            under 1 minute), serving latency (target: p99 under 300 ms), and
            freshness (target: metadata accurate within 5 minutes of source
            change).
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 220px; text-align: center">
                  <strong style="font-size: 14px">Ingest Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Kafka, 10K+ events/sec
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 220px; text-align: center">
                  <strong style="font-size: 14px">Normalize Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Unified graph model
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 220px; text-align: center">
                  <strong style="font-size: 14px">Storage Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Postgres + Elasticsearch + Graph
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 220px; text-align: center">
                  <strong style="font-size: 14px">Serving Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    API + Redis cache, 1000s QPS
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 220px; text-align: center">
                  <strong style="font-size: 14px">Policy Enforcement</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Query engines, &lt;10ms p99
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production catalogs use five layers: event driven ingestion
                  (Kafka, 10K+ events/sec), normalization to unified graph
                  models, multi-system storage (relational + search + graph),
                  cached serving API (p50 &lt;50ms), and policy enforcement
                  (&lt;10ms p99)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage is hybrid by necessity: relational databases for ACID
                  writes, search indexes (Elasticsearch) for free text queries,
                  and graph layers for lineage traversal over millions of nodes
                  with sub-second p99 latencies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Caching is critical for serving layer performance: hot
                  entities like popular tables are cached in Redis to handle
                  thousands of QPS with p50 latency under 50 ms, while metadata
                  writes accept 100 to 300 ms p99
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy enforcement sits in the hot path for query planning,
                  requiring sub-10 ms p99 latency through hierarchical rule
                  caching and precomputed policy evaluations to avoid blocking
                  queries
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When a Delta Lake table commits a new version, a Kafka
                  consumer ingests the transaction log event (containing files,
                  row counts, operation type) within 200 ms. The normalization
                  layer maps it to the catalog's graph model, updates Postgres
                  for durability, Elasticsearch for searchability, and
                  invalidates Redis cache entries for that table.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A lineage query "show all downstream dashboards for table X"
                  hits the graph layer. With 5 million nodes and precomputed
                  transitive closures, it returns 127 downstream assets in 180
                  ms p99, even during peak hours with 3000 QPS catalog load.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A query engine plans a query on a PII tagged table. It calls
                  the catalog's policy API, which checks Redis cache for cached
                  policy rules, finds a hit, and returns "mask column email" in
                  4 ms, allowing the query to proceed without blocking on a
                  database lookup.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMetadataManagementMetadataCatalogImplementationArchitecture;
