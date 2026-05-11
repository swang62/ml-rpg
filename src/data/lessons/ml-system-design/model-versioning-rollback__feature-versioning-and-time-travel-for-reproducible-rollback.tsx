import type { Component } from "solid-js";

const LessonModelVersioningRollbackFeatureVersioningAndTimeTravelForReproducibleRollback: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Versioning and Time Travel for Reproducible Rollback
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Version Features
            </p>
            <p style="margin-top: 0">
              Feature versioning treats feature definitions, transformations,
              and schemas as immutable versioned artifacts alongside model
              weights. Every feature has a version identifier linking its
              computation logic, dependencies, and data sources. When a model
              trains on feature set v5, that model's manifest records v5
              explicitly. This prevents the silent failures that occur when
              feature computation changes but models are not retrained.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Time Travel Capability
            </p>
            <p style="margin-top: 0">
              Time travel allows point in time consistent reads: querying the
              feature store for user 12345 as of timestamp T returns exactly the
              feature values that existed at T, regardless of later updates or
              backfills. This is not trivial to implement at scale because
              feature stores typically overwrite values on each update.
              Implementations use event sourcing (storing all value changes as a
              log) or snapshot isolation (periodic consistent snapshots with
              delta storage).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Critical Rollback Scenarios
            </p>
            <p style="margin-top: 0">
              Time travel enables two critical rollback scenarios. First,
              forensic debugging: when a prediction anomaly occurs, engineers
              can reconstruct the exact inputs the model received by time
              traveling to the request timestamp and comparing against expected
              distributions. Second, safe model reversion: rolling back to a 30
              day old model requires features computed with 30 day old logic. If
              the feature store retains 90 days of versioned definitions and
              supports on demand backfill, the old model can serve current
              requests with compatible features.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Storage and Retention Trade-offs
            </p>
            <p style="margin-top: 0">
              Netflix and LinkedIn maintain feature lineage linking each model
              version to specific feature schema versions. Dataset snapshots are
              also time stamped and retained, allowing retraining historical
              models identically. The storage cost is nontrivial: at Uber's
              scale (petabytes of feature data), retaining 90 days of point in
              time snapshots requires data lifecycle policies and compaction
              strategies. Production best practice balances cost versus
              reproducibility with tiered storage: hot recent data on fast
              storage (7 to 14 days), warm historical data on cheaper object
              stores (30 to 90 days). Shorter retention reduces storage costs
              but limits rollback windows and forensic capabilities.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Feature Store Time Travel Architecture
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Online Store</strong>
                    <br />
                    <span style="font-size: 11px">
                      Current features
                      <br />
                      Low latency reads
                      <br />
                      ms serving
                    </span>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Offline Store</strong>
                    <br />
                    <span style="font-size: 11px">
                      Historical snapshots
                      <br />
                      Point in time reads
                      <br />
                      training &amp; forensics
                    </span>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Feature Version Timeline
                  </strong>
                  <br />
                  <div style="display: flex; gap: 8px; margin-top: 8px; font-size: 11px; align-items: center">
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px">
                      v3
                      <br />
                      Day 0-20
                    </div>
                    <div style="font-weight: bold">→</div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px">
                      v4
                      <br />
                      Day 21-45
                    </div>
                    <div style="font-weight: bold">→</div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px">
                      v5
                      <br />
                      Day 46-now
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                  <strong>Time Travel Query:</strong>
                  <br />
                  get_features(user=12345, timestamp=Day30)
                  <br />→ Returns v4 features with Day30 logic
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                  <strong>Retention:</strong> 90 days for rollback &amp;
                  forensics
                  <br />
                  Hot (7d) + Warm (83d) tiered storage
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
                  Feature versioning treats definitions, transformations, and
                  schemas as immutable artifacts; models record exact feature
                  version dependencies (v5) for reproducibility and rollback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time travel enables point in time consistent reads: querying
                  features as of timestamp T reconstructs exact values that
                  existed then, enabling forensic debugging of prediction
                  anomalies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Safe rollback to 30 day old models requires features computed
                  with 30 day old logic; feature stores retain 90 days of
                  versioned definitions with on demand backfill capability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage cost tradeoff: at petabyte scale retaining 90 days of
                  point in time snapshots is expensive; production systems use
                  tiered storage with hot recent data (7 days) and warm
                  historical data (83 days) on cheaper object stores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dataset snapshots are time stamped and retained alongside
                  feature versions, allowing identical retraining of historical
                  models for counterfactual analysis or audit compliance
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
                  LinkedIn's Venice feature store links each Pro ML model to
                  specific feature schema versions; time travel queries enable
                  reconstructing features served 60 days ago for diagnosing
                  ranking anomalies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber's Zipline maintains 90 days of feature lineage; when an
                  Estimated Time of Arrival (ETA) model was rolled back after 3
                  weeks, on demand backfill regenerated v4 features so the old
                  model could serve current requests without accuracy loss
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelVersioningRollbackFeatureVersioningAndTimeTravelForReproducibleRollback;
