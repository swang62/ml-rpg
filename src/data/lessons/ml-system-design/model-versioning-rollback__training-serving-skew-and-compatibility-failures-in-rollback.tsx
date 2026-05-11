import type { Component } from "solid-js";

const LessonModelVersioningRollbackTrainingServingSkewAndCompatibilityFailuresInRollback: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Serving Skew and Compatibility Failures in Rollback
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What is Training Serving Skew
            </p>
            <p style="margin-top: 0">
              Training serving skew occurs when feature transformations, data
              preprocessing, or schemas differ between offline training and
              online serving. This creates silent model quality degradation even
              when infrastructure metrics look healthy. The model was trained on
              one data distribution but receives a different one in production.
              Everything looks fine at the infrastructure layer: latency is
              good, no errors, GPU utilization is healthy. But predictions are
              wrong.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              A Classic Failure Scenario
            </p>
            <p style="margin-top: 0">
              The new model expects feature F_v2 with normalization computed
              over the past 30 days, but serving still emits F_v1 normalized
              over 7 days. Canary passes latency and error rate checks but
              accuracy drops 10 to 15 percent, discovered only after full
              rollout when business KPIs lag. By the time conversion rate drops
              are statistically significant, thousands of users have received
              degraded predictions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Schema Incompatibility During Rollback
            </p>
            <p style="margin-top: 0">
              Schema incompatibility manifests during rollback when the old
              model expects features no longer computed or retained. If the new
              model introduced feature F_new and deprecated F_old, rolling back
              requires F_old to be backfilled or the old model falls back to
              defaults, spiking null rates and degrading predictions. LinkedIn
              and Uber enforce feature TTL policies aligned with rollback
              windows: retain historical feature definitions for at least 30 to
              90 days so any recent production model can be served.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigation Strategies
            </p>
            <p style="margin-top: 0">
              Shared feature definitions between training and serving prevent
              divergence. Schema validation gates at model promotion catch
              incompatibilities before deployment. Compatibility tests during
              canary verify the model receives expected feature distributions.
              Airbnb's Airflow orchestrated backfills maintain training serving
              parity so reverted models can run on current data. For breaking
              changes, dual run windows where both F_v1 and F_v2 are computed in
              parallel allow gradual migration and safe rollback during
              transition periods. Feature stores with time travel capability
              (point in time reads) enable reconstructing historical feature
              values for forensic analysis.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew causes silent accuracy drops of 10 to 15
                  percent when feature transformations differ between offline
                  training and online serving, even with healthy infrastructure
                  metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema incompatibility during rollback occurs when old models
                  expect features no longer computed; serving falls back to
                  defaults or nulls, degrading predictions and increasing
                  feature miss rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature Time To Live (TTL) policies should align with rollback
                  windows: retain 30 to 90 days of feature definitions and
                  computation logic so any recent production model remains
                  servable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enforce schema validation gates at model promotion and
                  runtime; reject traffic violating the model's input
                  expectations with feature level fallbacks to prevent cascading
                  failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dual run windows for breaking changes compute both F_v1 and
                  F_v2 features in parallel, enabling safe rollback during
                  migration periods before deprecating old feature versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature stores with time travel (point in time consistency)
                  enable forensic debugging: reconstruct exact feature values
                  that a model saw for any historical prediction to diagnose
                  skew
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
                  Uber's Michelangelo with Zipline feature store enforces time
                  travel reads; when a ranking model was rolled back after 48
                  hours, engineers reconstructed the exact features served and
                  identified a normalization skew introduced in the new feature
                  pipeline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb's Bighead maintains Airflow backfills for feature
                  definitions; when rolling back a search ranking model, the
                  backfill regenerated F_old features for 7 days to avoid
                  fallback nulls and preserve 95 percent feature coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelVersioningRollbackTrainingServingSkewAndCompatibilityFailuresInRollback;
