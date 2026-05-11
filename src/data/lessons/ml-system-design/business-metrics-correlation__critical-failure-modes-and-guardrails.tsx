import type { Component } from "solid-js";

const LessonBusinessMetricsCorrelationCriticalFailureModesAndGuardrails: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Critical Failure Modes and Guardrails
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SPURIOUS CORRELATIONS
            </p>
            <p>
              The most dangerous failure mode: acting on correlations that are
              not causal. You observe that model latency correlates with
              revenue. You invest heavily in latency optimization. Revenue does
              not improve because the correlation was spurious—both were driven
              by traffic volume.
            </p>
            <p>
              Detecting spurious correlations: look for plausible confounders.
              Run small A/B tests to validate causality before large
              investments. If a correlation appears suddenly, investigate what
              else changed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRANSFER FUNCTION DRIFT
            </p>
            <p>
              Transfer functions change over time. Early in a product lifecycle,
              model improvements may have large business impact. As the product
              matures, impact diminishes (diminishing returns). A transfer
              function calibrated last year may overestimate current impact.
            </p>
            <p>
              <strong>Detection:</strong> Track predicted vs actual business
              impact for each model change. If predictions consistently
              overestimate impact, your transfer functions are stale.
              Recalibrate quarterly using recent A/B test results.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SEGMENT DIVERGENCE
            </p>
            <p>
              Aggregate correlations mask segment-level divergence. Overall
              correlation between AUC and revenue might be stable, but declining
              for your most valuable segment while increasing for low-value
              users. Acting on aggregate metrics optimizes for the wrong users.
            </p>
            <p>
              Guardrail: monitor correlations by segment. Alert when any
              high-priority segment diverges significantly from aggregate
              trends.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              METRIC GAMING
            </p>
            <p>
              When teams are evaluated on metric correlations, they may optimize
              for correlation rather than business impact. A team might improve
              model metrics in ways that artificially inflate correlation
              without genuine business value.
            </p>
            <p>
              Mitigation: evaluate teams on A/B test results, not correlation
              strength. Use holdout tests where the model team does not know
              which metrics will be measured. Rotate evaluation metrics to
              prevent gaming.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Tight correlation monitoring can
              create perverse incentives. Balance metric tracking with holistic
              evaluation that includes A/B test impact and qualitative
              assessment.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px">
                  Simpson's Paradox Example
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Desktop:</strong> Conversion 8% → 9%
                  <br />
                  <span style="font-size: 12px">
                    Feature improves +1 percentage point
                  </span>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Mobile:</strong> Conversion 3% → 3.5%
                  <br />
                  <span style="font-size: 12px">
                    Feature improves +0.5 percentage point
                  </span>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold; margin: 6px 0">
                  BUT
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Global:</strong> Conversion 6% → 5.5%
                  <br />
                  <span style="font-size: 12px">
                    Traffic mix shifted 70% desktop to 30% desktop
                    <br />
                    Appears negative due to mix shift, not feature
                  </span>
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
                  Spurious correlations lead to wasted investment—validate
                  causality with A/B tests before acting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Transfer functions drift over time as products mature;
                  recalibrate quarterly using recent experiments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segment divergence hides problems; monitor high-priority
                  segments separately from aggregates
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
                  Interview Tip: Give an example of spurious correlation
                  (latency-revenue via traffic confounder).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain transfer function drift—early-stage
                  products show higher correlation than mature ones.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBusinessMetricsCorrelationCriticalFailureModesAndGuardrails;
