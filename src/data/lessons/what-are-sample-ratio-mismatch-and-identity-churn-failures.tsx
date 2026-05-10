import type { Component } from "solid-js";

const LessonWhatAreSampleRatioMismatchAndIdentityChurnFailures: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are Sample Ratio Mismatch and Identity Churn Failures?
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
                <strong>Sample Ratio Mismatch (SRM)</strong> occurs when
                observed user counts in control vs treatment deviate from
                intended allocation. Even 0.5-1% imbalance signals potential
                bugs that invalidate results.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why SRM Matters
            </p>
            <p style="margin-top: 0">
              For a 50/50 split with 100,000 users, you expect roughly 50,000
              each. Getting 51,000/49,000 (2% deviation) is highly unlikely by
              random chance (p &lt; 0.001). This signals systematic bias:
              bucketing bugs, logging drops, or differential eligibility.
              Results from SRM experiments cannot be trusted.
            </p>
            <p>
              Common causes: treatment crashes more often (dropping users from
              logs), treatment loads slower (users abandon before logging),
              redirect-based treatments drop users who dont follow redirects,
              bot traffic is unevenly distributed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Detection
            </p>
            <p style="margin-top: 0">
              Run chi-squared test on observed vs expected counts. Alert if p
              &lt; 0.001 (strong SRM) or p &lt; 0.01 (concerning SRM). Check SRM
              daily during experiment, not just at end. SRM appearing
              mid-experiment indicates a deployment or logging change.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> You cannot fix SRM by
              reweighting. If treatment drops 2% of users, those dropped users
              are systematically different (slower devices, less patience). No
              statistical adjustment recovers unbiased estimates.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Identity Churn
            </p>
            <p style="margin-top: 0">
              Users who clear cookies, switch devices, or reinstall apps may get
              reassigned to different variants. This appears as SRM plus
              contaminated within-user comparisons. Track identity stability
              metrics and exclude high-churn users from analysis.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 4px">
                  Sample Ratio Mismatch Detection
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Expected 50/50 Split</strong>
                  <div style="display: flex; gap: 10px; margin-top: 8px; justify-content: center">
                    <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; font-size: 12px">
                      <strong>Control:</strong> 50,000
                    </div>
                    <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; font-size: 12px">
                      <strong>Treatment:</strong> 50,000
                    </div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Observed Imbalance (SRM)
                  </strong>
                  <div style="display: flex; gap: 10px; margin-top: 8px; justify-content: center">
                    <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; font-size: 12px">
                      <strong>Control:</strong> 50,400
                    </div>
                    <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; font-size: 12px">
                      <strong>Treatment:</strong> 49,600
                    </div>
                  </div>
                  <div style="font-size: 11px; margin-top: 6px; text-align: center">
                    0.8% imbalance
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Chi-Square Test</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    p-value &lt; 0.001
                  </div>
                  <div style="font-size: 11px; margin-top: 4px; font-weight: bold">
                    AUTO-PAUSE EXPERIMENT
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
                  Even 0.5-1% sample ratio deviation signals systematic bias;
                  results cannot be trusted
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common causes: treatment crashes, slow loading, redirect
                  drops, uneven bot traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Run chi-squared test daily; alert at p &lt; 0.001 (strong SRM)
                  or p &lt; 0.01 (concerning)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cannot fix SRM by reweighting - dropped users are
                  systematically different
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
                  When asked about SRM causes: list treatment crashes, slow
                  loading, redirect drops, bot traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For detection: describe chi-squared test on observed vs
                  expected with daily monitoring
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWhatAreSampleRatioMismatchAndIdentityChurnFailures;
