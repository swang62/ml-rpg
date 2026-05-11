import type { Component } from "solid-js";

const LessonPipelineIdempotencyWhatIsIdempotencyInDataPipelines: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Idempotency in Data Pipelines?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Idempotency</strong> in data pipelines means that
                processing the same input data multiple times produces the same
                final state as processing it once. Running your pipeline twice
                with the same data doesn't create duplicates or conflicting
                results.
              </div>
            </div>
            <strong>The Core Problem:</strong>
            Real production pipelines are never run exactly once. Consider what
            happens in practice: a Spark job fails halfway through and retries
            the entire batch. A Kafka consumer crashes and replays messages from
            its last checkpoint. You need to backfill three months of historical
            data. A mobile app buffers events offline and sends them twice when
            connectivity returns. Without idempotency, each of these scenarios
            creates chaos. Retry a failed payment processing job? You might
            charge customers twice. Replay ad impression events? Your analytics
            now show 2x the actual traffic. Backfill user signup data? You
            create duplicate user records.
            <strong>Business Events vs Delivery Attempts:</strong>
            The key insight is separating the logical business event from the
            physical delivery attempts. A user places one order, but that event
            might traverse your pipeline three times due to retries. An
            idempotent pipeline ensures your database shows exactly one order,
            regardless of how many times the event was processed. Most
            distributed systems use at least once delivery because it's simpler
            and more available at high throughput. Kafka, Kinesis, and Pub/Sub
            all default to at least once semantics. This means duplicates are
            not just possible but expected at scale. Your pipeline must be
            designed for it.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> At companies processing 200,000
              events per second, you might see 5 to 10% duplicate events from
              retries and replays. Idempotency turns this from a data quality
              disaster into a non issue.
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
                  Idempotency ensures the same input processed multiple times
                  produces identical final state, not duplicates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production pipelines face inevitable retries from job
                  failures, consumer restarts, backfills, and client retries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separates logical business events (one order placed) from
                  physical delivery attempts (event sent three times)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At least once delivery is standard in distributed systems,
                  making idempotent processing essential at scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without idempotency, common operations like backfills and
                  replays corrupt data with duplicates and double counting
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
                  A payment event is sent to Kafka, the consumer processes it
                  and crashes before committing the offset. On restart, it
                  reprocesses the same event. With idempotent design using
                  &lt;code&gt;payment_id&lt;/code&gt; as key, the database still
                  shows only one payment.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A daily batch job fails at 80% completion. When rerun, it
                  processes the entire day again. Idempotent upserts keyed by
                  &lt;code&gt;order_id&lt;/code&gt; and
                  &lt;code&gt;date&lt;/code&gt; ensure no duplicate rows in the
                  warehouse.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mobile clients buffer ad impression events offline and retry
                  when reconnected, sending events twice. Dedupe logic using
                  &lt;code&gt;event_id&lt;/code&gt; prevents inflated metrics.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineIdempotencyWhatIsIdempotencyInDataPipelines;
