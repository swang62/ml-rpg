import type { Component } from "solid-js";

const LessonStatisticalSignificanceFailureModesSrmPeekingInterferenceAndHeavyTailsInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: SRM, Peeking, Interference, and Heavy Tails in
            Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SAMPLE RATIO MISMATCH (SRM)
            </p>
            <p style="margin-top: 0">
              Observing 53/47 instead of expected 50/50 invalidates all results.
              The observed difference may come from selection bias (e.g., mobile
              client bug dropping events in treatment), not treatment effect.
              Run chi-squared test with p &lt; 0.001 as automatic alarm. SRM
              should pause the experiment until the root cause is identified and
              fixed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PEEKING ABUSE
            </p>
            <p style="margin-top: 0">
              A team peeked daily for 10 days and stopped when p = 0.04. Later
              analysis showed true alpha was 18%, not 5%. The result was likely
              a false positive. <strong>Prevention:</strong> Require minimum
              exposure before showing results. Use group sequential designs with
              pre-planned analysis points. Lock down early stopping to automated
              systems that maintain proper alpha.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HEAVY TAILED METRICS
            </p>
            <p style="margin-top: 0">
              Revenue and watch time are heavy-tailed: a few users contribute
              disproportionately. Mean confidence intervals are 2-5x wider than
              normal metrics. <strong>Mitigations:</strong> (1) Log transform to
              compress the tail. (2) Winsorization: cap values at the 99th
              percentile. (3) Bootstrap intervals that handle outliers
              empirically. Each trades some information for stability.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Winsorization reduces variance
              but biases the estimate toward median. Log transform helps
              normality but complicates interpretation. Choose based on
              stakeholder needs.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              NOVELTY AND TEMPORAL EFFECTS
            </p>
            <p style="margin-top: 0">
              Day 1 may show positive effect from novelty (users explore new
              UI), but confidence interval crosses zero by day 5 as novelty
              wears off. Or learning effects: users initially struggle, then
              adapt. Do not ship based on early windows alone. Require 7+ day
              observation with stable intervals before declaring a winner.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 6px">
                  Common Experiment Failure Modes
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Sample Ratio Mismatch
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    Expected: 50/50 → Observed: 53/47
                    <br />
                    Chi squared p &lt; 0.001 triggers alarm
                    <br />
                    Cause: bucketing bug, filtering bias
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Peeking Inflation
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    Hourly peeks in 7 day test
                    <br />
                    True alpha: 15% instead of 5%
                    <br />
                    Solution: alpha spending, min exposure
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Marketplace Interference
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    Shared driver supply causes 30% bias
                    <br />
                    Switchback reduces to &lt;10% bias
                    <br />
                    Widens CI but more honest estimate
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Heavy Tail Metrics
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    Revenue p95: needs 3x sample size
                    <br />
                    Use log transform or winsorization
                    <br />
                    Bootstrap for tail quantiles
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
                  SRM (53/47 instead of 50/50) invalidates all results;
                  chi-squared p&lt;0.001 should auto-pause experiment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Peeking daily and stopping at p&lt;0.05 inflates true alpha to
                  15-20%; require minimum exposure before results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Heavy-tailed metrics (revenue) have 2-5x wider CIs; use log
                  transform, winsorization, or bootstrap
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Novelty effects bias early windows; require 7+ days with
                  stable intervals before shipping
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
                  Describe SRM detection: chi-squared test on traffic split,
                  p&lt;0.001 triggers automatic pause
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the peeking trap: team stopped at p=0.04 after daily
                  checks, true alpha was 18%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention heavy-tail mitigations: winsorize at 99th percentile
                  or log-transform before computing intervals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalSignificanceFailureModesSrmPeekingInterferenceAndHeavyTailsInProduction;
