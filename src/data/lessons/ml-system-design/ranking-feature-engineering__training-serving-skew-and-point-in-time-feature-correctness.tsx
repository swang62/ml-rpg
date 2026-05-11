import type { Component } from "solid-js";

const LessonRankingFeatureEngineeringTrainingServingSkewAndPointInTimeFeatureCorrectness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Serving Skew and Point in Time Feature Correctness
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
                <strong>Training-serving skew</strong> occurs when features
                computed during training differ from features computed at
                serving time, causing offline metrics to overestimate online
                performance.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Temporal Leakage: The Most Common Cause
            </p>
            <p style="margin-top: 0">
              The most common skew source is using future information during
              training. Example: computing a 7-day CTR feature for an impression
              at time T by aggregating clicks from T-7d to T+2d because logs
              arrived late. The model learns to rely on future clicks, inflating
              offline precision from 0.78 to 0.82. At serving time, those future
              clicks don't exist, and precision drops to 0.74.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Point-in-Time Correctness
            </p>
            <p style="margin-top: 0">
              If a user views an item Monday 10am, the training example must use
              the 7-day CTR computed from prior Monday 10am to current Monday
              10am, excluding events after 10am. This applies to all
              time-windowed aggregates. For target-encoded features (using the
              target variable to encode categories), compute rates using only
              data strictly before the impression time.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Late Event Handling
            </p>
            <p style="margin-top: 0">
              Feature computation must handle late-arriving events consistently.
              In training, decide on a cutoff: accept events up to 15 minutes
              late, then freeze. In serving, use the same 15-minute buffer. If
              training uses all eventually-consistent data but serving uses only
              immediately-available data, distributions diverge. Write snapshots
              to the offline store with the same late-event tolerance used in
              serving.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Default Value Handling
            </p>
            <p style="margin-top: 0">
              If a feature is missing at serving time (cache miss, new entity),
              the system substitutes a default (zero or global mean). If
              training data only includes cases where the feature was present,
              the model never learns to handle defaults. Fix: inject synthetic
              missing values during training, or define fallback strategies
              (item-level → category-level → global prior).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Diagnosis:</strong> Log feature values at serving time
              and compare distributions to training. Compute feature coverage
              (what fraction of candidates have each feature) and statistical
              divergence between training and serving histograms. Automated
              parity tests flag when distributions drift beyond thresholds.
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
                  Temporal leakage (using future info during training) is the
                  most common cause of offline/online metric gaps
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point-in-time correctness: training examples must use features
                  as they existed at impression time, not current values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late-event handling must be consistent: if serving uses
                  15-minute buffer, training must use same buffer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inject synthetic missing values during training so model
                  learns to handle defaults it will see at serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Diagnose by logging serving features and comparing
                  distributions to training; automate parity tests
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
                  Give the classic example: 7-day CTR computed with T-7d to T+2d
                  in training vs T-7d to T at serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention specific numbers: offline precision 0.82, online drops
                  to 0.74 due to leakage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the fix hierarchy: snapshot features at impression
                  time, same late-event buffer, inject missing values
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRankingFeatureEngineeringTrainingServingSkewAndPointInTimeFeatureCorrectness;
