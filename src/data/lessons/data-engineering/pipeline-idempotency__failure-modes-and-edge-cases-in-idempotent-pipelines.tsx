import type { Component } from "solid-js";

const LessonPipelineIdempotencyFailureModesAndEdgeCasesInIdempotentPipelines: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Idempotent Pipelines
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Late and Out of Order Data:</strong>
            The most common failure mode is events arriving outside your
            deduplication window. Imagine you deduplicate based on a 1 hour
            window of seen <code>event_id</code> values. A mobile client goes
            offline for 3 hours, then sends buffered events when reconnected.
            Those events are outside your dedupe window and will be counted
            again if the pipeline replays. This isn't theoretical. At companies
            with mobile apps used in areas with poor connectivity, 2 to 5% of
            events can be delayed by hours or days. You must define acceptable
            lateness and retention for dedupe state explicitly. For example,
            maintain 24 hours of dedupe keys in memory or fast storage. Accept
            that events delayed beyond 24 hours might duplicate if a replay
            happens.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Late Data Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">ON TIME</div>
                  <div style="font-size: 16px; font-weight: 800">95%</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    1-4 HR LATE
                  </div>
                  <div style="font-size: 16px; font-weight: 800">4%</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    BEYOND WINDOW
                  </div>
                  <div style="font-size: 16px; font-weight: 800">1%</div>
                </div>
              </div>
            </div>
            <strong>Key Collision and Non Unique Keys:</strong>A subtle but
            devastating failure is when your idempotency key is not actually
            unique. Suppose you use <code>user_id</code> plus{" "}
            <code>timestamp</code> as the key, and timestamp has only second
            precision. Two events from the same user in the same second will
            collide, and one will silently overwrite the other. Real production
            incident: a team used <code>session_id</code> as the idempotency
            key, assuming it was unique per session. Turns out the mobile SDK
            reused session IDs after app restart under certain conditions.
            Different logical sessions had the same <code>session_id</code>,
            causing one session's data to overwrite another's. Silent data loss
            that took weeks to discover. The fix: use composite keys with truly
            unique components. For example, <code>producer_id</code> plus{" "}
            <code>monotonic_sequence_number</code> or a proper UUID (version 4).
            Never use timestamps alone or client generated values without
            validation.
            <strong>Partial Failures Across Multiple Sinks:</strong>A streaming
            job writes to both a Postgres database and a Redis cache. The
            Postgres write succeeds, but Redis times out. The job crashes,
            restarts, and reprocesses the batch. Now Postgres receives an
            idempotent upsert (fine), but Redis gets a duplicate write because
            it's not using the same key based upsert logic.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Idempotency must be consistent
              across all sinks in a transaction boundary. If you write to
              multiple systems, either make all of them idempotent with the same
              key, or use distributed transactions or the outbox pattern.
            </div>
            Another variation: a batch job writes to a data warehouse
            (idempotent upsert by <code>order_id</code>) and emits metrics to a
            monitoring system (simple counter increment). On retry, the
            warehouse is fine but the metrics are double counted. You need to
            make the metrics system idempotent too, perhaps by including a
            unique job execution ID and deduplicating on the metrics ingestion
            side.
            <strong>Backfills with Changed Logic:</strong>
            You fix a bug in your revenue calculation logic and backfill the
            last month of data. The pipeline is idempotent, so it safely
            overwrites the old data. But what if the new logic produces results
            that conflict with downstream assumptions? For example, the old
            logic computed revenue in cents, new logic in dollars. Downstream ML
            models trained on the old scale break. Or the old logic included
            refunds in revenue, new logic doesn't, but reports and dashboards
            were built expecting the old definition. This is idempotency at the
            data level but semantic non idempotency. The fix involves schema
            versioning and migration strategies. Add a{" "}
            <code>schema_version</code> or <code>computation_version</code>{" "}
            field to output tables. Downstream systems can filter or adapt based
            on version. When backfilling with new logic, either write to a new
            versioned partition or ensure downstream systems handle both
            versions.
            <strong>State Store Overload:</strong>
            At very high scale, stateful deduplication can become a bottleneck.
            If you store dedupe keys in a single shared Redis or RocksDB
            instance, a large replay or spike can overwhelm it. Requests
            timeout, triggering retries, creating a cascading failure. The
            incident pattern: a backfill job processes 10 hours of data,
            generating 7 billion events. The dedupe state store expects 200k
            events per second but suddenly receives 2 million per second. Query
            latency spikes from 2ms to 500ms. The pipeline times out and
            retries, making it worse. Mitigation strategies: shard the dedupe
            state by key hash across multiple instances. Use approximate
            structures like Bloom filters for older time windows to reduce
            memory pressure. Implement backpressure and rate limiting so replays
            don't overwhelm the system. Monitor state store latency and size as
            critical production metrics.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late data beyond your dedupe window (for example, 3 hours when
                  you store 1 hour) can bypass deduplication and create
                  duplicates on replay
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key collisions from non unique identifiers (like second
                  precision timestamps) cause silent data loss as one event
                  overwrites another
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partial failures across multiple sinks break idempotency
                  unless all sinks use consistent key based upserts or
                  transactional writes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backfills with changed computation logic are idempotent at the
                  data level but can break downstream systems expecting old
                  semantics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stateful dedupe stores can become bottlenecks during replays:
                  7 billion event backfill overwhelming a state store expecting
                  200k/sec sustained rate
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
                  Late data incident: Mobile app buffers events for 6 hours
                  offline. Dedupe window is 2 hours. When pipeline replays,
                  those events duplicate because state has been evicted. Fix:
                  extend window to 24 hours or use persistent dedupe store.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key collision bug: Using &lt;code&gt;user_id&lt;/code&gt; +
                  &lt;code&gt;UNIX_TIMESTAMP(event_time)&lt;/code&gt; as key.
                  Two clicks in same second collide. Second event overwrites
                  first, losing a click. Fix: use
                  &lt;code&gt;user_id&lt;/code&gt; +
                  &lt;code&gt;event_id&lt;/code&gt; (UUID) instead.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partial failure: Streaming job writes to Snowflake
                  (idempotent) and Datadog metrics (append only counter). Job
                  retries after Datadog timeout. Snowflake data is correct, but
                  Datadog shows 2x the actual event count. Fix: include
                  &lt;code&gt;job_run_id&lt;/code&gt; in metrics and dedupe on
                  ingestion.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineIdempotencyFailureModesAndEdgeCasesInIdempotentPipelines;
