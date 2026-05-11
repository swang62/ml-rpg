import type { Component } from "solid-js";

const LessonBackfillStrategiesFailureModesIdempotency: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes &amp; Idempotency
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Biggest Failure: Double Counting</strong>
          Imagine a daily revenue aggregation job that sums payment events into
          a table partitioned by date. A backfill job runs to fix a currency
          conversion bug. If the job simply inserts new rows without removing
          old ones, you have now counted every transaction twice. Revenue for
          March 15 shows $2.4 million instead of $1.2 million. Your CFO makes
          decisions on inflated numbers. This is catastrophic. The fix is
          idempotency: every backfill and reprocessing job must produce the same
          output no matter how many times it runs. The most common pattern is
          complete partition overwrite. The job writes results to a temporary
          staging location, validates them, then atomically replaces the entire
          date partition. Running it twice produces identical final state.
          <strong>Overwhelming Upstream Systems:</strong>A classic failure mode
          is backfill jobs that query production databases for historical data.
          Suppose you backfill 6 months of user profile data by querying your
          PostgreSQL database for every user who was active each day. That is
          180 days times 5 million active users per day, or 900 million queries.
          Even at 10 milliseconds per query, that is 2,500 hours of database
          load. In practice, this manifests as production read latency spiking
          from 50 milliseconds p99 to 500 milliseconds or worse, triggering
          alerts and degrading user experience. The solution is to always
          backfill from immutable archives (object storage logs, database
          snapshots, change data capture streams), never from live production
          systems.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Production Database Impact
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                <div style="font-size: 16px; font-weight: 800">50ms p99</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">BACKFILL</div>
                <div style="font-size: 16px; font-weight: 800">500ms p99</div>
              </div>
            </div>
          </div>
          <strong>Schema Evolution Edge Cases:</strong>A subtle failure happens
          when schemas change over time and reprocessing code is not aware.
          Consider an event stream where{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>{" "}
          was an integer before June 2023 and became a UUID string after. Naive
          reprocessing that expects UUIDs will either crash on old events or
          silently drop them. Another case: a field is added in version 2 of the
          schema, so it does not exist in events before a certain date. Your
          transformation code assumes the field is always present and crashes
          with null pointer errors when processing 2022 data. Robust systems
          maintain a schema registry and check the{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            schema_version
          </code>{" "}
          field in each event. Transformation logic branches: if version 1,
          parse and map fields one way; if version 2, use different logic. This
          allows safe reprocessing across schema boundaries.
          <strong>Streaming and Backfill Collisions:</strong>A tricky
          operational failure occurs when a streaming pipeline is still writing
          to a partition while you run a backfill that overwrites it. For
          example, today is March 20. Your streaming job is continuously writing
          March 20 data. You kick off a backfill for March 1 to March 20 to fix
          a bug. The backfill job completes and overwrites the March 20
          partition with data from raw logs, but those logs were captured at
          midnight. The last 12 hours of streaming data is now lost. The
          solution is to backfill only fully closed partitions. Most systems
          define a partition as closed once it is older than the maximum event
          lateness. For example, if events can arrive up to 24 hours late, only
          backfill partitions older than yesterday. Alternatively, pause or
          reroute streaming writes during backfill, then replay from Kafka
          offsets to ensure no data loss.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> Idempotency is non-negotiable. Every
            backfill job must use complete partition overwrites or deterministic
            keys to prevent double counting.
          </div>
          <strong>Side Effects Cannot Be Replayed:</strong>
          Some pipelines trigger side effects: sending emails, charging credit
          cards, firing webhooks to third parties. You cannot simply rerun
          these. If your pipeline sends 100,000 welcome emails and you reprocess
          a week of data, you risk sending duplicate emails or incorrect
          charges. The pattern is to separate data computation from side effect
          execution. Reprocessing computes the correct state: which users should
          have received emails. A separate idempotent reconciliation layer
          compares computed state to actual external state and emits only the
          delta. If user 12345 should have received an email but did not, send
          it. If they already received it, do nothing. This requires maintaining
          a record of executed side effects with unique idempotency keys.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 12px; text-align: center">
              IDEMPOTENT BACKFILL PATTERN
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 220px; text-align: center">
                <strong style="font-size: 14px">Read Raw Logs</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Immutable source of truth
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 220px; text-align: center">
                <strong style="font-size: 14px">
                  Transform &amp; Aggregate
                </strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Apply fixed logic
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 220px; text-align: center">
                <strong style="font-size: 14px">Write to Staging</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Temporary location
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 220px; text-align: center">
                <strong style="font-size: 14px">
                  Atomic Partition Replace
                </strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Overwrites entire partition
                  <br />
                  Run 10x → same result
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Double counting happens when backfill jobs insert instead of
                replace: revenue shows $2.4M instead of $1.2M, corrupting all
                downstream analysis
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Backfilling from live production databases can spike read
                latency from 50ms p99 to 500ms, degrading user experience
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema evolution requires checking
                &lt;code&gt;schema_version&lt;/code&gt; field: pre June 2023
                events use integer &lt;code&gt;user_id&lt;/code&gt;, post June
                use UUID
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Streaming and backfill collisions: only backfill fully closed
                partitions (older than max event lateness, typically 24 to 48
                hours)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Side effects like emails or charges cannot be replayed: use
                separate idempotent reconciliation layer that emits only deltas
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
                Idempotent pattern: Spark job writes to
                &lt;code&gt;revenue_staging/date=2024-03-15&lt;/code&gt;,
                validates, then &lt;code&gt;ALTER TABLE revenue DROP PARTITION
                (date='2024-03-15'); ALTER TABLE revenue ADD PARTITION
                (date='2024-03-15') LOCATION 's3://staging/...'&lt;/code&gt;
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema handling: &lt;code&gt;if event.schema_version == 1:
                user_id = str(event.user_id_int) else: user_id =
                event.user_id_uuid&lt;/code&gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonBackfillStrategiesFailureModesIdempotency;
