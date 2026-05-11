import type { Component } from "solid-js";

const LessonExperimentDesignHowDoesStratificationReduceVarianceInExperiments: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Does Stratification Reduce Variance in Experiments?
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
                <strong>Stratification</strong> partitions users into
                homogeneous groups before randomization. Within each stratum,
                users are randomly assigned to control or treatment, ensuring
                balanced representation across important segments.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Stratify
            </p>
            <p style="margin-top: 0">
              Simple randomization can accidentally create imbalanced groups. In
              a 1000-user experiment, random chance might put 60% of iOS users
              in treatment. If iOS converts 2x higher than Android, this
              inflates your treatment effect estimate. Stratification guarantees
              equal iOS/Android splits in both arms.
            </p>
            <p>
              Variance reduction is proportional to how predictive the
              stratification variable is. If platform explains 20% of outcome
              variance, stratifying reduces experiment variance by ~20%, meaning
              fewer users needed for same statistical power.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing Variables
            </p>
            <p style="margin-top: 0">
              Good stratification variables are: known before randomization,
              predictive of outcome, and available for all users. Common
              choices: platform, country, user tenure, baseline engagement.
              Limit to 3-5 dimensions with 2-4 levels each - over-stratification
              fragments your sample.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Post-stratification (analyzing by
              strata after experiment) gives similar variance reduction without
              complicating assignment. Use pre-stratification when strata are
              clearly defined and critical.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation
            </p>
            <p style="margin-top: 0">
              Include stratum_id in hash:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                hash(user_id + experiment_id + stratum_id) mod 100
              </code>
              . This ensures 50/50 splits within each stratum while maintaining
              sticky bucketing. Analyze by computing within-stratum effects,
              then combining with weighted averages.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 4px">
                  Stratified Randomization
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Stratum: Mobile</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Baseline conversion: 1.5%
                  </div>
                  <div style="display: flex; gap: 8px; margin-top: 8px">
                    <div style="flex: 1; padding: 8px; border: 2px solid; border-radius: 4px; text-align: center; font-size: 12px">
                      <strong>Control</strong>
                      <br />
                      50%
                    </div>
                    <div style="flex: 1; padding: 8px; border: 2px solid; border-radius: 4px; text-align: center; font-size: 12px">
                      <strong>Treatment</strong>
                      <br />
                      50%
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Stratum: Desktop</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Baseline conversion: 3.2%
                  </div>
                  <div style="display: flex; gap: 8px; margin-top: 8px">
                    <div style="flex: 1; padding: 8px; border: 2px solid; border-radius: 4px; text-align: center; font-size: 12px">
                      <strong>Control</strong>
                      <br />
                      50%
                    </div>
                    <div style="flex: 1; padding: 8px; border: 2px solid; border-radius: 4px; text-align: center; font-size: 12px">
                      <strong>Treatment</strong>
                      <br />
                      50%
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Aggregate with Inverse Variance Weighting
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    MDE reduced by 10 to 30%
                  </div>
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
                  Stratification guarantees balanced representation across
                  important segments, removing accidental imbalance variance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Variance reduction is proportional to predictive power of
                  stratification variable (20% explained = 20% reduction)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Limit to 3-5 dimensions with 2-4 levels each to avoid
                  fragmenting sample into too many small strata
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Post-stratification gives similar variance reduction without
                  complicating assignment logic
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
                  When asked about variance reduction: explain stratification by
                  platform/country with proportional variance reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For implementation: describe including stratum_id in hash for
                  within-stratum randomization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentDesignHowDoesStratificationReduceVarianceInExperiments;
