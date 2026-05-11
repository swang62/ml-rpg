import type { Component } from "solid-js";

const LessonPipelineIdempotencyTradeOffsAppendOnlyVsIdempotentUpserts: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Append Only vs Idempotent Upserts
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Trade-off:</strong>
            Every data pipeline makes a choice between write simplicity and read
            correctness. You can make writes fast and dumb, or you can make them
            smart and safe. Both have a cost.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Append Only
                </div>
                <div style="font-size: 12px">
                  Sub 10ms writes, duplicates in data, complex downstream dedupe
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Idempotent Upsert
                </div>
                <div style="font-size: 12px">
                  20 to 50ms writes, clean data, simple downstream reads
                </div>
              </div>
            </div>
            <strong>Append Only (Fast Writes, Complex Reads):</strong>
            With pure append, every write is an INSERT. No key lookups, no
            conflict checks, no coordination. At 100,000 events per second, you
            can sustain sub 10ms p99 latency to a distributed log like Kafka.
            This is why raw ingestion is almost always append only. The cost
            appears downstream. Consumers must deduplicate and resolve
            conflicts. Queries need GROUP BY with DISTINCT or complex window
            functions to pick the latest version. Storage grows linearly with
            retries: 5% duplicate rate means 5% wasted storage. For petabyte
            scale systems, that's expensive. This pattern works well for
            immutable event logs where readers are sophisticated data engineers.
            It fails for user facing analytics where business analysts run ad
            hoc SQL. They shouldn't need to know about deduplication logic.
            <strong>Idempotent Upsert (Safe Writes, Simple Reads):</strong>
            With upserts, each write checks for an existing key and either
            inserts or updates. At 100,000 operations per second, this requires
            careful indexing and sharding. Write latency increases to 20 to 50ms
            p99 because of the lookup cost. Hot keys can create bottlenecks: if
            all events hash to the same partition, throughput drops
            significantly. The benefit is clean, simple downstream consumption.
            Queries just SELECT without worrying about duplicates. Storage is
            efficient because there's one row per business entity. This is
            essential for customer facing tables, financial reporting, and ML
            feature stores where correctness is non negotiable.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Choose What:
            </div>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Choose append only for high volume raw ingestion. Choose
                idempotent upserts for derived tables that others depend on. Mix
                both in the same pipeline."
              </div>
            </div>
            Raw logs and event streams: append only. Maximizes ingestion
            throughput, accepts duplicates. Examples: click streams, application
            logs, IoT sensor data at millions of events per second. Derived
            aggregates and dimensions: idempotent upserts. Enables safe
            recomputation and backfills. Examples: user profiles, daily revenue
            by merchant, ML features, any table used by BI or operational
            dashboards. Financial transactions: idempotent with extra care. Use
            database transactions or distributed sagas to ensure upserts are
            atomic with related state changes. Cannot tolerate even temporary
            duplicates.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Throughput Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100k/sec</div>
                  <div style="font-size: 10px; font-weight: 600">
                    APPEND ONLY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">30k/sec</div>
                  <div style="font-size: 10px; font-weight: 600">
                    UPSERT WITH INDEX
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
                  Append only writes achieve sub 10ms p99 latency at 100k+
                  events/sec but push deduplication complexity to all consumers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotent upserts increase write latency to 20 to 50ms and
                  reduce throughput by ~60% but eliminate downstream complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose append only for raw ingestion and high volume streams
                  where sophisticated consumers can handle dedupe
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose idempotent upserts for derived tables, aggregates, and
                  any data consumed by BI tools or less technical users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage cost matters: 5% duplicate rate at petabyte scale
                  wastes significant money, favoring idempotent sinks for long
                  term storage
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
                  High volume append: Kafka ingests 500k events/sec with 8ms p99
                  latency. Downstream Flink job deduplicates using stateful
                  processing before writing to warehouse.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotent aggregate: Daily revenue table uses MERGE statement
                  keyed by &lt;code&gt;merchant_id&lt;/code&gt; and
                  &lt;code&gt;date&lt;/code&gt;. Batch job can rerun safely to
                  fix bugs or incorporate late data.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixed strategy: Raw clickstream appends to S3 at 1M
                  events/sec. Hourly job reads S3, dedupes by
                  &lt;code&gt;event_id&lt;/code&gt;, computes aggregates, and
                  upserts into Redshift for BI queries.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineIdempotencyTradeOffsAppendOnlyVsIdempotentUpserts;
