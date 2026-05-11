import type { Component } from "solid-js";

const LessonGuardrailMetricsProductionImplementationAndRuntimeArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation and Runtime Architecture
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
                <strong>Guardrail systems</strong> run continuously during
                experiments, computing metrics, comparing against thresholds,
                and triggering alerts or automatic actions when breached.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real-Time Pipeline
            </p>
            <p style="margin-top: 0">
              Stream events (page loads, errors, transactions) to a real-time
              processor. Aggregate by experiment variant every 5-15 minutes.
              Compare treatment vs control for each guardrail. Alert or
              auto-rollback when threshold exceeded with sufficient confidence.
            </p>
            <p>
              Architecture: event stream → aggregation (5min windows) →
              statistical comparison → threshold check → action
              (alert/pause/rollback). Latency from event to action should be
              &lt;30 minutes for Tier 1 guardrails.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Statistical Considerations
            </p>
            <p style="margin-top: 0">
              Multiple comparisons problem: checking 10 guardrails every hour
              for 7 days = 1680 tests. At 5% alpha, expect 84 false positives.
              Apply corrections: Bonferroni (divide alpha by test count) or
              sequential testing methods that control family-wise error rate.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Use one-sided tests for
              guardrails (only care about degradation, not improvement). This
              increases power to detect harm compared to two-sided tests.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Automated Response
            </p>
            <p style="margin-top: 0">
              Tier 1 violations trigger automatic rollback: kill switch that
              moves 100% traffic to control. Tier 2 pauses the experiment (stops
              new assignments) and alerts on-call. Both require minimal human
              intervention for safety.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Events Stream</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Kafka: 500K events/sec
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Aggregation</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Flink: 5 min windows
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Guardrail Checks</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Impact, Power, Stat-Sig
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 10px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 13px">
                    <strong>Tier 0</strong>
                    <div style="margin-top: 3px; font-size: 11px">
                      Auto rollback + page
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 13px">
                    <strong>Tier 1</strong>
                    <div style="margin-top: 3px; font-size: 11px">
                      Review ticket
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
                  Pipeline: event stream → 5min aggregation → statistical
                  comparison → threshold check → action
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency from event to action should be &lt;30 minutes for Tier
                  1 guardrails
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multiple comparisons correction needed: 10 guardrails × 168
                  hours = 1680 tests, 84 false positives at 5% alpha
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use one-sided tests for guardrails (only care about
                  degradation) to increase power
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
                  When explaining pipeline: describe 5-min windows, statistical
                  comparison, auto-rollback within 30min
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For multiple testing: explain Bonferroni correction or
                  sequential methods to control family-wise error
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGuardrailMetricsProductionImplementationAndRuntimeArchitecture;
