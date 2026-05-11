import type { Component } from "solid-js";

const LessonPointInTimeCorrectnessPitCorrectnessFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            PIT Correctness Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Out of Order and Late Arriving Data
            </p>
            <p style="margin-top: 0">
              Point in Time (PIT) correctness fails in subtle ways that can go
              undetected for months while silently degrading model quality.
              Streaming systems deliver events late with p95 on time but p99
              late by minutes to hours. If the system gates by processing time
              instead of event time, late arrivals overwrite history and
              contaminate training labels. A user action at 2pm arriving at 4pm
              appears available at 2pm in naive systems, leaking future
              information.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Backfill Contamination
            </p>
            <p style="margin-top: 0">
              Backfilling feature pipelines after bug fixes or schema changes
              can corrupt historical state. If the backfill uses current logic
              to recompute past values, features reflect information unavailable
              at original timestamps. The fix is immutable append only storage
              where backfills create new versions rather than overwriting,
              preserving the original buggy values alongside corrected ones for
              comparison.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Clock Skew
            </p>
            <p style="margin-top: 0">
              Distributed systems with unsynchronized clocks introduce
              systematic bias. If producer clocks run ahead, events appear
              available before they actually occurred. NTP synchronization to
              millisecond precision across all infrastructure is table stakes.
              Log both event time (from producer) and ingestion time (from
              consumer) to detect and correct skew during joins.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Window Boundary Races
            </p>
            <p style="margin-top: 0">
              Aggregates over time windows (sum over last 7 days) face boundary
              conditions. An event at exactly midnight on day boundary might be
              included or excluded depending on whether inequality is less than
              or less than or equal to. Inconsistent boundary handling between
              training and serving causes subtle feature drift.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Timezone Bugs
            </p>
            <p style="margin-top: 0">
              Features aggregated by calendar day must handle timezone
              consistently. A global user active across UTC day boundaries may
              have activity counted twice or missed entirely if training and
              serving use different timezone assumptions.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Late Arrival Failure Mode
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Event Timeline</strong>
                  <div style="font-size: 12px; margin-top: 6px; line-height: 1.6">
                    2:00 PM: User clicks ad (event_time)
                    <br />
                    2:30 PM: Label created (prediction time)
                    <br />
                    4:00 PM: Click data arrives (processing_time)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ⚠
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">
                      ❌ Wrong (Processing)
                    </strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Click visible at 2:30 PM
                      <br />
                      (future leak)
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">✓ Correct (Event)</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Click visible at 2:00 PM
                      <br />
                      (no leak)
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; margin-top: 4px">
                  <strong style="font-size: 12px">
                    Watermark: Accept up to 2 hour late
                  </strong>
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
                  Out of order data with p99 lateness of minutes to hours
                  requires watermarks (for example, 24 hour late data
                  acceptance) and retraction policies to prevent late arrivals
                  from overwriting history incorrectly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clock skew of seconds to minutes across distributed services
                  creates 1 to 5 percent feature mismatches at window
                  boundaries, requiring UTC enforcement and per entity
                  monotonicity validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Entity key churn from user or device merges contaminates
                  feature vectors if not handled with explicit entity resolution
                  history maintaining effective start and end times
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Aggregation boundary bugs using inclusive versus exclusive
                  semantics (t versus t minus 1 second) systematically inflate
                  offline metrics 0.5 to 2 percent while degrading online
                  serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partial replay failures in streaming consumers duplicate
                  updates without idempotency keys and event time conflict
                  resolution, inflating aggregate features by 5 to 20 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hard deletes for GDPR or data retention erase history needed
                  for time travel training, requiring tombstones with effective
                  times to maintain reproducibility while respecting deletion
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
                  Ad click prediction system: p95 clicks arrive within 1 minute,
                  p99 within 1 hour. Without watermarks, late clicks leak into
                  past training examples causing 10 percent precision drop when
                  detected and fixed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi region service with 30 second clock skew: 7 day rolling
                  window computed at boundary includes 30 seconds more data in
                  one region, causing 2 percent feature value divergence
                  detected in A/B test
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User account merge at Airbnb: user books from mobile app
                  (entity A) and web (entity B), then merges accounts. Feature
                  join must use entity resolution effective date to avoid cross
                  contamination in historical training data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPointInTimeCorrectnessPitCorrectnessFailureModesAndEdgeCases;
