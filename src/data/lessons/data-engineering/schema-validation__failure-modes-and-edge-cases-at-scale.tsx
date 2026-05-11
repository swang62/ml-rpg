import type { Component } from "solid-js";

const LessonSchemaValidationFailureModesAndEdgeCasesAtScale: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes and Edge Cases at Scale
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            When Schema Validation Breaks:
          </div>
          In interviews, demonstrating awareness of failure modes separates
          senior candidates from junior ones. Here are the critical scenarios
          that break schema validation systems at scale.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Unannounced Breaking Changes:
          </div>
          An upstream team changes a{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            price
          </code>{" "}
          field from integer cents to decimal string without notification.
          Strict enforcement at the sink suddenly rejects all writes. Within
          minutes, queues back up and dashboards go stale because new data stops
          arriving. Your options: halt the pipeline and coordinate emergency
          schema update (data loss but integrity preserved), automatically
          quarantine violating records (availability maintained but creates
          operational burden), or implement circuit breaker logic that
          temporarily relaxes validation under high error rates (risky but
          prevents total outage).
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Failure Timeline
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                <div style="font-size: 16px; font-weight: 800">0 errors</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  BUG DEPLOYED
                </div>
                <div style="font-size: 16px; font-weight: 800">t+2 min</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">QUEUE FULL</div>
                <div style="font-size: 16px; font-weight: 800">t+8 min</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Silent Coercion Dangers:
          </div>
          A pipeline configured to coerce bad data quietly converts failed date
          parses to null without strong observability. Technically you meet
          availability Service Level Objectives (SLOs), but you are degrading
          correctness. This is especially dangerous for ML training data where
          subtle quality issues compound into model drift, or compliance reports
          where missing data triggers regulatory violations months later. The
          fix requires comprehensive monitoring: track coercion rates per field,
          alert when rates exceed thresholds (for example, over 1% of records in
          5 minute windows), and emit detailed error metadata for debugging.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Version Skew in Long Lived Consumers:
          </div>
          Producers and consumers use different schema versions. A producer
          introduces a non compatible change assuming backward compatibility,
          but a long running consumer deployed 6 months ago crashes on the new
          format. This is common in streaming systems with consumers that run
          for weeks without redeployment. Solution: enforce compatibility checks
          at the schema registry before allowing new versions. Run compatibility
          tests against all registered consumer versions, not just the latest.
          Require producers to support multiple schema versions during
          transition periods.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Nested Data Validation Gaps:
          </div>
          Columns with nested objects or arrays are harder to validate. Adding a
          nested field is usually safe, but reusing a field name with a
          different type deep in the structure (for example,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            metadata.id
          </code>{" "}
          changing from string to integer) can slip through weak validators.
          Some consumers that only read surface fields continue working, while
          others that traverse nested structures fail unpredictably.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> At 200k events per second with
            expensive JSON schema validation adding 3 to 5 ms at p99, queues
            back up and end to end latency spikes from 20 ms to over 500 ms
            during traffic surges. Keep validation lightweight or provision
            significant extra compute capacity.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Batch Backfill Complexity:
          </div>
          When backfilling historical data after a schema change, you have
          multiple schema versions in the same dataset. If enforcement assumes a
          single unified schema per table, backfills fail. You need versioned
          schema support in storage formats and logic to handle reading mixed
          schema versions during queries. This requires careful partitioning
          (for example, by ingestion date) and metadata tracking.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Unannounced breaking changes cause immediate pipeline failures:
                within 2 to 8 minutes queues fill and dashboards go stale.
                Options are halt for integrity, quarantine for availability, or
                circuit breaker for degraded operation.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Silent coercion maintains availability SLOs but degrades
                correctness invisibly. Track coercion rates per field, alert
                when exceeding thresholds (over 1% in 5 minute windows), and
                emit detailed error metadata.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Version skew breaks long lived consumers when producers deploy
                non compatible changes. Solution: enforce compatibility checks
                against ALL registered consumer versions at the schema registry,
                not just latest.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Expensive validation at scale creates bottlenecks: at 200k
                events per second, 3 to 5 ms validation overhead per message
                causes queue buildup and latency spikes from 20 ms to over 500
                ms during traffic surges.
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
                A price field changing from integer cents to decimal string
                rejects 100% of writes. Within 8 minutes, Kafka consumer lag
                reaches 50 million messages and 200 dashboards stop updating.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                A pipeline with silent coercion converts 5% of timestamp fields
                to null due to format changes. ML model trained on this data
                shows 12% accuracy degradation discovered 3 weeks later.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Nested field &lt;code&gt;metadata.user_id&lt;/code&gt; changes
                from string to integer. Surface level consumers work fine, but
                analytics jobs that join on this field fail with type mismatch
                errors affecting 30% of reports.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonSchemaValidationFailureModesAndEdgeCasesAtScale;
