import type { Component } from "solid-js";

const LessonNormalizationDenormalizationTheCqrsPatternBridgingNormalizedWritesAndDenormalizedReads: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            The CQRS Pattern: Bridging Normalized Writes and Denormalized Reads
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Architecture Pattern:
            </div>
            Command Query Responsibility Segregation (CQRS) separates your write
            model from your read model. The write model is normalized and
            enforces all business invariants. It is the source of truth. The
            read model is a set of denormalized projections optimized for
            specific query patterns. You get the integrity benefits of
            normalization where it matters most (writes) and the performance
            benefits of denormalization where it matters most (reads). Here is
            how it works in practice. Your order service writes to a normalized
            PostgreSQL database with tables for customers, orders, order_items,
            products, and inventory. Each write goes through strict validation
            and transactional logic. Simultaneously, the database emits change
            events to a streaming platform like Kafka through Change Data
            Capture. Stream processors consume these events and update
            denormalized read stores: a product_details cache in Redis, an
            orders_by_customer view in Cassandra, and a search index in
            Elasticsearch.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Real World Flow:
            </div>
            Consider LinkedIn's member profiles. The canonical profile data
            (name, headline, experience, skills) lives in a normalized
            relational store. Updates go through this write path with full
            validation. But when you view someone's profile or search for
            members, those queries hit denormalized stores. The profile view
            service reads from a key-value store with embedded, prejoined data.
            The search service queries an Elasticsearch index with flattened
            member documents. Both are kept in sync with the normalized source
            through streaming pipelines. This architecture enables LinkedIn to
            handle millions of profile reads per second with p95 latencies under
            100 milliseconds, while maintaining strong consistency for writes.
            The streaming layer processes updates with typical lag under 5
            seconds, though it can spike to minutes during heavy load or partial
            outages.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Teams often underestimate the
              operational complexity of CQRS. You now have multiple databases,
              streaming pipelines, schema evolution across stores, and lag
              monitoring. This pays off at scale but adds significant overhead
              for smaller systems.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Implementation Details:
            </div>
            Successful CQRS implementations monitor replication lag religiously.
            Metrics like "percentage of read models updated within 60 seconds"
            or "maximum CDC pipeline delay" are critical SLOs. When lag exceeds
            thresholds, systems may fall back to the normalized store for reads,
            trading latency for correctness, or show users a "data may be
            slightly stale" indicator. The write side remains simple. A single
            normalized database with ACID transactions. The complexity lives in
            the read side and the pipelines connecting them. Stream processors
            must handle idempotent upserts, out of order events, schema changes,
            and backfills when new read models are introduced. Tools like
            Debezium for CDC, Kafka for streaming, and Flink or Kafka Streams
            for transformation are common.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Use CQRS:
            </div>
            CQRS makes sense when your read and write workloads have
            fundamentally different characteristics. If writes are infrequent
            but require strong guarantees, while reads are high volume and
            latency sensitive, CQRS gives you the best of both worlds. It is
            overkill for simple CRUD applications where a normalized schema with
            caching is sufficient.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                CQRS Architecture Flow
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Write Model</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Normalized PostgreSQL
                  </div>
                  <div style="font-size: 11px">Orders, Customers, Products</div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ CDC + Kafka
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Stream Processor</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Flink / Kafka Streams
                  </div>
                  <div style="font-size: 11px">
                    Transform &amp; Route Events
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Async Updates
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Redis Cache</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      Product Details
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Cassandra</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      Orders by User
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Elasticsearch</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      Search Index
                    </div>
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
                  Separates normalized write model (source of truth with ACID
                  guarantees) from denormalized read models (optimized for
                  specific query patterns and high throughput)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uses Change Data Capture and streaming platforms like Kafka to
                  propagate changes from write to read stores, typically with
                  lag under 5 seconds in healthy systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enables handling millions of reads per second with p95
                  latencies under 100 milliseconds while keeping writes fast and
                  transactional at 10,000+ operations per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Requires operational investment in monitoring replication lag,
                  handling schema evolution across multiple stores, and managing
                  idempotent stream processing logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best suited for systems with asymmetric workloads where read
                  and write patterns differ significantly in volume, latency
                  requirements, or access patterns
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
                  LinkedIn member profiles: Normalized relational store for
                  writes with full validation. Denormalized key-value store and
                  Elasticsearch index for reads. Updates flow through Kafka with
                  sub 5 second lag.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ecommerce order history: Write orders to normalized
                  PostgreSQL. Stream changes to Cassandra table keyed by
                  customer_id with embedded order and product details. Serve 'my
                  orders' page in 20ms without joins.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial transactions: Append to immutable transaction log
                  (normalized). Materialize account balances and analytics
                  aggregates in denormalized stores for dashboards and
                  reporting.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNormalizationDenormalizationTheCqrsPatternBridgingNormalizedWritesAndDenormalizedReads;
