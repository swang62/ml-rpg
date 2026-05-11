import type { Component } from "solid-js";

const LessonGuardrailMetricsGuardrailFailureModesAndMitigationStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Guardrail Failure Modes and Mitigation Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Guardrail failures</strong> occur when the system either
                misses real harm (false negatives) or blocks good experiments
                (false positives). Both have significant costs.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              False Negatives: Missing Real Harm
            </p>
            <p style="margin-top: 0">
              Guardrail doesnt fire when treatment actually harms users. Causes:
              threshold too loose, metric not sensitive enough, delay too long
              (harm compounds before detection), wrong metric (measuring proxy
              instead of true outcome). Cost: user harm ships to production.
            </p>
            <p>
              Mitigation: tighten thresholds, add more sensitive metrics,
              shorten detection windows, validate guardrails against known-bad
              experiments retrospectively.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              False Positives: Blocking Good Experiments
            </p>
            <p style="margin-top: 0">
              Guardrail fires when treatment is actually fine. Causes: threshold
              too tight, high metric variance, multiple testing without
              correction, outliers in small samples. Cost: good features delayed
              or abandoned, team loses trust in guardrail system.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Tightening thresholds to reduce
              false negatives increases false positives, and vice versa. The
              optimal point depends on relative costs of shipping harm vs
              blocking good features.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              System Failures
            </p>
            <p style="margin-top: 0">
              Pipeline failures: logging gaps, aggregation bugs, comparison
              errors. Detection: run guardrails on A/A experiments (should never
              fire). Monitoring: track guardrail fire rate over time - sudden
              changes indicate system issues, not treatment effects.
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
                  False negatives: threshold too loose, insensitive metric, long
                  detection delay
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  False positives: threshold too tight, high variance, multiple
                  testing, outliers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimal threshold depends on relative cost of shipping harm vs
                  blocking good features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Validate system with A/A experiments (should never fire) and
                  fire rate monitoring
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
                  When explaining false negatives: describe harm shipping
                  because threshold was 10% when 5% degradation occurred
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For system validation: run guardrails on A/A experiments to
                  verify they dont false-fire
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGuardrailMetricsGuardrailFailureModesAndMitigationStrategies;
