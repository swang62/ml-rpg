import type { Component } from "solid-js";

const LessonStatisticalSignificanceStatisticalSignificanceUnderstandingPValuesAndTypeIiiErrors: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Statistical Significance: Understanding P-Values and Type I/II
            Errors
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
                <strong>Statistical significance</strong> quantifies whether an
                observed difference is likely due to a real effect or just
                random noise. A p-value of 0.05 means there is a 5% probability
                of seeing a difference this large if no real effect exists.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TYPE I AND TYPE II ERRORS
            </p>
            <p style="margin-top: 0">
              <strong>Type I error (false positive):</strong> You declare a
              winner when there is no real difference. The alpha level
              (typically 0.05) controls this: 5% chance of false positive.
              <br />
              <strong>Type II error (false negative):</strong> You fail to
              detect a real difference. Power (typically 80%) controls this: 80%
              chance of detecting a true effect, 20% chance of missing it.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SAMPLE SIZE REQUIREMENTS
            </p>
            <p style="margin-top: 0">
              Sample size scales with the inverse square of effect size. To
              detect a 2% lift, you need 4x more users than detecting a 4% lift.
              Concrete example: detecting a 5% relative CTR lift from a 2.0%
              baseline requires about 1.6 million users per arm with alpha=0.05
              and 80% power. Rare events like 0.05% purchase rates need 30
              million+ users per arm.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Statistical significance does
              not imply business value. With 50 million users, you can detect
              tiny meaningless effects as significant. Always pair statistical
              tests with business thresholds.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRACTICAL IMPLICATIONS
            </p>
            <p style="margin-top: 0">
              High traffic systems can detect very small effects (0.1%) in
              hours. Low conversion events (purchases, subscriptions) need
              weeks. Plan experiment duration based on your traffic and minimum
              detectable effect, not arbitrary timelines.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Null Hypothesis True</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    No real difference between variants
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Type I Error</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      False positive
                    </div>
                    <div style="margin-top: 4px; font-size: 14px; font-weight: bold">
                      α = 5%
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Correct</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      True negative
                    </div>
                    <div style="margin-top: 4px; font-size: 14px; font-weight: bold">
                      95%
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; margin-top: 12px">
                  <strong style="font-size: 14px">
                    Alternative Hypothesis True
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Real difference exists
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Power</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      True positive
                    </div>
                    <div style="margin-top: 4px; font-size: 14px; font-weight: bold">
                      80%
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Type II Error</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      False negative
                    </div>
                    <div style="margin-top: 4px; font-size: 14px; font-weight: bold">
                      β = 20%
                    </div>
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
                  Alpha (0.05) controls false positive rate; Power (80%)
                  controls false negative rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sample size scales with inverse square of effect: 2% lift
                  needs 4x more users than 4% lift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detecting 5% relative CTR lift from 2% baseline requires ~1.6M
                  users per arm with 80% power
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical significance does not imply business value; always
                  pair with business thresholds
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
                  When explaining statistical testing, define both Type I (false
                  positive) and Type II (false negative) errors with concrete
                  alpha/power values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use the inverse square relationship: 4x sample size for half
                  the effect size
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize the business threshold: large systems can detect
                  meaningless effects as significant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalSignificanceStatisticalSignificanceUnderstandingPValuesAndTypeIiiErrors;
