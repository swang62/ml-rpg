import type { Component } from "solid-js";

const LessonOnlineVsOfflineFeaturesFreshnessVsPointInTimeCorrectness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Freshness vs Point in Time Correctness
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real Time Streaming Freshness
            </p>
            <p style="margin-top: 0">
              Delivers maximum freshness with seconds to minutes of staleness,
              enabling models to react immediately to user behavior changes.
              Meta Ads ranking achieves sub second freshness for critical CTR
              counters, allowing the system to downweight ads experiencing
              sudden engagement drops within seconds. However, streaming systems
              face inherent correctness challenges from late arriving events,
              out of order processing, and clock skew across distributed
              producers.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Point in Time Correctness
            </p>
            <p style="margin-top: 0">
              The gold standard for training data to prevent label leakage. When
              building a training example with label timestamp T, feature joins
              must only include data with event time less than or equal to T and
              within defined windows. Without this guarantee, a churn prediction
              model trained on features accidentally including information from
              after the churn event will show optimistic offline AUC that
              collapses in production. Airbnb's Zipline enforces point in time
              joins through automated snapshot versioning.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Tension
            </p>
            <p style="margin-top: 0">
              Streaming achieves freshness through continuous incremental
              updates that are eventually consistent, while point in time
              correctness demands reproducible snapshots with strict event time
              semantics. A streaming counter for "purchases in last 24 hours"
              might be missing late events that arrive hours later due to mobile
              offline sync or timezone issues. Training on this incomplete
              stream creates distribution shift versus the complete offline
              batch computation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dual Path Architecture
            </p>
            <p style="margin-top: 0">
              Production systems reconcile this by running both paths. Online
              streaming features optimize for freshness and accept eventual
              consistency, using watermarks and allowed lateness windows
              (typically 1 to 6 hours). Offline batch features reprocess the
              same event streams with longer grace periods (24 to 72 hours) to
              achieve completeness and point in time correctness. Periodic
              reconciliation jobs compare online state against offline
              recomputation, alerting when divergence exceeds thresholds.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 6px">
                    Streaming (Online): Freshness First
                  </div>
                  <div style="font-size: 13px">
                    Event Stream → Watermark (1hr lateness) → Incremental Update
                    <br />
                    <strong>Freshness:</strong> Seconds to minutes
                    <br />
                    <strong>Risk:</strong> Missing late events, out of order
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: 700; text-align: center">
                  VS
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 6px">
                    Batch (Offline): Correctness First
                  </div>
                  <div style="font-size: 13px">
                    Complete Events (72hr grace) → Point in Time Join → Snapshot
                    <br />
                    <strong>Correctness:</strong> No leakage, reproducible
                    <br />
                    <strong>Delay:</strong> Hours to days
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px">
                  <strong>Reconciliation:</strong> Compare 5% sample, alert if
                  &gt;10% divergence
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
                  Streaming features achieve seconds to minutes freshness (sub
                  second for Meta fraud counters) but face late events, out of
                  order delivery, and eventual consistency challenges
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point in time joins prevent label leakage by ensuring features
                  at timestamp T only use event time &lt;= T data, critical for
                  unbiased offline evaluation and reproducible training datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Watermarks and allowed lateness windows (typically 1 to 6
                  hours for streaming, 24 to 72 hours for batch) define trade
                  offs between freshness and completeness of aggregates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew emerges when streaming online features
                  are incomplete versus batch offline features that wait for all
                  late events, causing 5% to 20% model accuracy drops in
                  production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotent upserts with event time sequence numbers enable
                  replaying streams without double counting, essential for
                  recovering from pipeline failures or backfilling historical
                  data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Periodic reconciliation jobs sample entities and compare
                  online versus offline recomputed features, alerting when
                  divergence exceeds thresholds indicating pipeline bugs or
                  configuration drift
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
                  Airbnb Zipline: Point in time joiners with automated snapshot
                  versioning prevent leakage across billions of training rows,
                  backfilling months of history with strict event time semantics
                  for search ranking models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo: Streaming pipelines target sub minute
                  freshness for "trips in last 5 minutes" with 1 hour allowed
                  lateness, while batch pipelines reprocess with 48 hour grace
                  for complete training data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix: Real time activity counters update within seconds for
                  homepage personalization, reconciled nightly against Spark
                  batch jobs to detect and repair stream processing bugs before
                  model retraining
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOnlineVsOfflineFeaturesFreshnessVsPointInTimeCorrectness;
