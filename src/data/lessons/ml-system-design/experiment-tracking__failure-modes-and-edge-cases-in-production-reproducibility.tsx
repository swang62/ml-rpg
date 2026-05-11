import type { Component } from "solid-js";

const LessonExperimentTrackingFailureModesAndEdgeCasesInProductionReproducibility: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Production Reproducibility
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Serving Skew
            </p>
            <p style="margin-top: 0">
              Training serving skew occurs when models are trained on batch
              features but served with real time features, causing up to 20
              percent accuracy drop. A ranking model trained on yesterday
              aggregated user statistics but served with current session
              features sees distribution shift. Data time-travel gaps happen
              when source systems overwrite or delete data; reproduced runs
              silently read different inputs. An append only raw table gets
              compacted or a 90 day retention policy deletes the training window
              you need to replay. Fix with append only storage, snapshotting,
              and dataset fingerprints using content hashes that fail loudly
              when data is missing.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Skew
            </p>
            <p style="margin-top: 0">
              Feature skew between offline and online systems is subtle.
              Training might compute a 30 day click through rate using exact
              timestamps, while serving uses a cached daily aggregate that
              updates at midnight. The model learns on precise signals but
              predicts with stale approximations. Uber Zipline solves this by
              version controlling feature definitions and materializations,
              ensuring training and serving read from the same logical feature
              pipeline. Partial logging or missing lineage happens when teams
              forget to log configs or datasets; models enter the registry
              without provenance. Fix with pipeline gates that block artifact
              registration unless mandatory fields are present.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PII Leakage and Security
            </p>
            <p style="margin-top: 0">
              PII leakage in metadata occurs when teams log configurations or
              parameters that include secrets or PII. An experiment config might
              accidentally log a database connection string or customer IDs. Fix
              with client side redaction, allowlisted fields, and automated
              detectors that scan metadata for patterns like credit card
              numbers. Encrypt sensitive fields at rest.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Statistical Overfitting and Infrastructure Issues
            </p>
            <p style="margin-top: 0">
              Statistical overfitting to the test set inflates Type I error when
              iterating many runs against the same validation slice. After
              evaluating 100 hyperparameter combinations, the best one likely
              overfit to noise. Fix with pre-registered evaluation protocols,
              multiple repeats for top candidates, and holdback test sets
              accessed only for final contenders. Metadata store hot spots
              happen during hyperparameter optimization bursts. Fix with write
              optimized append only event logs, eventual materialized views, and
              time based partitioning.
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
                  Training serving skew from batch versus real time features
                  causes up to 20 percent accuracy drop; model trained on
                  yesterday's aggregates served with current session features
                  sees distribution shift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data time-travel gaps when source systems delete within
                  lookback window; reproduced runs silently read different
                  inputs; fix with append only tables and dataset fingerprints
                  that fail loudly when data missing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature skew: Training computes 30 day click through rate with
                  exact timestamps, serving uses cached daily aggregate updating
                  at midnight; Uber Zipline versions definitions ensuring
                  consistency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PII leakage when logging configs with secrets or customer IDs;
                  fix with client side redaction, allowlisted fields, automated
                  pattern detectors for credit cards or social security numbers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical overfitting: After 100 hyperparameter evaluations
                  on same test set best candidate likely overfit to noise; fix
                  with pre-registered protocols, multiple repeats, holdback sets
                  for final contenders
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata hot spots: 5,000 runs in 1 hour with 10 events each
                  creates 14 writes per second sustained with bursts to 100 per
                  second; fix with append only logs, partitioning by time or
                  project
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
                  Uber ranking model: Training on 90 day window of Zipline batch
                  features with exact timestamps, serving with cached hourly
                  features caused 15% precision drop until switching to
                  consistent feature versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data deletion failure: Training window from 2024-01-01 to
                  2024-03-31 reproduced 6 months later after 90 day retention
                  policy deleted January data; dataset fingerprint verification
                  caught missing 33% of rows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Artifact retention explosion: 200 MB model × 100 epochs × 500
                  runs/day = 10 TB/day; lifecycle policy keeps all 30 days (300
                  TB), then top 10 per experiment with deduplication reduces to
                  30 TB total
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Test set overfitting: Team evaluated 150 hyperparameter
                  combinations on same validation set, top candidate showed 2%
                  improvement but failed on holdback test set with 0.5%
                  regression
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentTrackingFailureModesAndEdgeCasesInProductionReproducibility;
