import type { Component } from "solid-js";

const LessonStreamProcessingProductionPatternsMultiClusterHaExactlyOnceSinksAndCapacityPlanning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Patterns: Multi-Cluster HA, Exactly Once Sinks, and
            Capacity Planning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            High availability stream processing across multiple Kafka clusters
            treats inputs as a union of deduplicated sources. OpenAI's Flink
            platform reads from multiple primary Kafka clusters simultaneously
            with custom source logic that continues across cluster failovers
            without manual intervention. Each event embeds a deterministic ID
            (for example hash of user ID plus timestamp plus sequence number).
            The earliest operator deduplicates using a compact expiring key
            value map or bloom filter plus windowed set, achieving exactly once
            semantics even with duplicates from multi-primary ingestion.
            Watchdog services monitor partition changes and automatically
            rescale pipelines. Exactly once to external sinks requires
            transactional semantics or idempotent writes. Transactional sinks
            like Kafka, PostgreSQL, or databases with two phase commit allow
            atomic commit of checkpoint barriers and sink writes.
            Non-transactional sinks (Elasticsearch, metrics stores, notification
            systems) require application level idempotency: write unique event
            IDs alongside data and deduplicate on read, or implement a
            transactional outbox at the source of truth that the stream relays.
            For side effects like emails, accept at least once and make handlers
            idempotent (check if email already sent before dispatching).
            Capacity planning uses concrete numbers: stateless pipelines sustain
            100,000+ events per second per few dozen vCPUs with sub-10ms
            operator latency. Stateful jobs with windowing run an order of
            magnitude lower, around 10,000 to 50,000 events per second per
            similar hardware. A 100 node mid-range cluster costs tens of
            thousands of dollars per month and processes tens of billions of
            events per day with second level windows. Checkpoint overhead grows
            with state size; keep per-task state under tens of GB when possible
            to maintain checkpoint durations under 30 seconds at p99. Monitor
            consumer lag, watermark lag, and checkpoint completion rates as key
            Service Level Indicators (SLIs).
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Kafka Cluster A</strong>
                    <br />
                    event_id: abc123
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Kafka Cluster B</strong>
                    <br />
                    event_id: abc123
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Dedup Operator</strong>
                  <br />
                  Bloom filter + windowed KV map
                  <br />
                  Seen IDs: &#123;abc123, def456, ...&#125;
                  <br />
                  State: 500 MB, TTL: 1 hour
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Downstream Processing</strong>
                  <br />
                  Exactly once semantics
                  <br />
                  Duplicates eliminated
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
                  Multi-cluster high availability ingests from multiple Kafka
                  primaries simultaneously with deduplication via deterministic
                  event IDs and bloom filters plus windowed key value maps (500
                  MB state, 1 hour Time to Live typical)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exactly once to external sinks requires transactional sinks
                  (Kafka, PostgreSQL with two phase commit) or application
                  idempotency with unique event IDs; side effects like emails
                  need handler idempotency checks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Capacity planning baselines: stateless 100k+ events per second
                  per few dozen vCPUs; stateful windowed 10k to 50k events per
                  second; 100 node cluster processes tens of billions events per
                  day at tens of thousands dollars per month
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Keep per-task state under tens of GB to maintain checkpoint
                  durations under 30 seconds at p99; state growth directly
                  increases checkpoint time and recovery debt on failure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key Service Level Indicators (SLIs) include consumer lag
                  (offset delta), watermark lag (event time delta), checkpoint
                  completion rate (successful per interval), and end to end
                  latency (event time to sink write)
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
                  OpenAI's Flink platform reads from multiple Kafka clusters
                  with embedded event IDs, deduplicates with a 1 hour windowed
                  set, and automatically rescales when partitions change,
                  achieving continuous operation through cluster failovers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A metrics aggregation pipeline writes to a non-transactional
                  time series database using event ID plus timestamp as unique
                  key, allowing at least once delivery with idempotent upserts
                  and deduplication on query
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStreamProcessingProductionPatternsMultiClusterHaExactlyOnceSinksAndCapacityPlanning;
