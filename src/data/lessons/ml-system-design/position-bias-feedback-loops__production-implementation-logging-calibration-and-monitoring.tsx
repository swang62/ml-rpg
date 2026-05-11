import type { Component } from "solid-js";

const LessonPositionBiasFeedbackLoopsProductionImplementationLoggingCalibrationAndMonitoring: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Logging, Calibration, and Monitoring
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROPENSITY LOGGING
            </p>
            <p style="margin-top: 0">
              Every impression must log the propensity score: the probability
              that this item would be shown at this position given the model and
              randomization policy. Without propensity, you cannot apply IPS
              later. The logging pipeline must capture: user context, item ID,
              position shown, propensity, timestamp, and eventual outcome
              (click, conversion). Store propensity with high precision (at
              least 4 decimal places) to avoid numerical issues in IPS weights.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CALIBRATION AND MONITORING
            </p>
            <p style="margin-top: 0">
              After debiasing, your model should predict the same CTR regardless
              of position. Test this by computing predicted CTR versus actual
              CTR bucketed by position. If position 1 predictions are 20% higher
              than actual, debiasing is incomplete. Recalibrate using isotonic
              regression or Platt scaling. Monitor calibration weekly as user
              behavior and catalog change.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHOLE PAGE OPTIMIZATION
            </p>
            <p style="margin-top: 0">
              Individual item relevance is not enough. Consider page level
              effects: diversity (showing 10 similar items is worse than 10
              varied items), context (an item might be great after a specific
              preceding item), and diminishing returns (user is less likely to
              click any item in position 10 regardless of relevance). Whole page
              models optimize the entire slate, not just individual rankings.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Run continuous calibration
              checks. Create dashboards showing predicted vs actual CTR by
              position, by user segment, by item category. Drift in any
              dimension indicates a problem.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              A/B TESTING DEBIASING CHANGES
            </p>
            <p style="margin-top: 0">
              Debiasing improves long term metrics but may hurt short term. Run
              experiments for at least 2 to 4 weeks to see the full effect.
              Compare both engagement (CTR, time spent) and diversity metrics
              (catalog coverage, long tail engagement). A successful debiasing
              shows stable or improved engagement plus significantly better
              diversity.
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
                  Log propensity with 4+ decimal places for every impression:
                  user, item, position, propensity, outcome
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Debiased model should predict same CTR regardless of position
                  - test by bucketing predictions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recalibrate with isotonic regression when position 1
                  predictions are 20%+ off from actual
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Whole page optimization considers diversity, context, and
                  diminishing returns across the slate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Run A/B tests 2-4 weeks to see full debiasing effect on
                  engagement and diversity metrics
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
                  Describe propensity logging: store 0.0847 not 0.08 to avoid
                  numerical issues in IPS
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain calibration check: predicted CTR by position should be
                  flat line if debiased correctly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss experiment length: 1 week misses long-term diversity
                  gains from debiasing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPositionBiasFeedbackLoopsProductionImplementationLoggingCalibrationAndMonitoring;
