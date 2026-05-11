import type { Component } from "solid-js";

const LessonGuardrailMetricsGuardrailMetricSelectionAndTiering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Guardrail Metric Selection and Tiering
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
                <strong>Guardrail selection</strong> balances sensitivity
                (catching real harm) against specificity (not blocking good
                experiments). Too sensitive = high false positives; too lenient
                = missed harm.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Selection Criteria
            </p>
            <p style="margin-top: 0">
              Good guardrails are: (1) causally connected to user/business
              value, (2) measurable with low latency, (3) sensitive enough to
              detect meaningful harm, (4) specific enough to not fire on noise.
              Avoid proxy metrics that correlate with value but arent causal -
              they create Goodharts law problems.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Setting Thresholds
            </p>
            <p style="margin-top: 0">
              Threshold too tight (1% degradation blocks) catches real issues
              but also blocks 30-50% of experiments due to noise. Threshold too
              loose (10% degradation blocks) misses subtle but cumulative harm.
              Start with business-derived thresholds: what degradation would you
              actually reject?
            </p>
            <p>
              Common approach: set threshold at 2-5% relative degradation with
              90-95% confidence. This balances catching real harm against
              velocity. Adjust based on metric sensitivity and business
              importance.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Latency guardrails at p50 catch
              average degradation but miss tail issues. At p99, you catch tail
              issues but have high variance. Use p90-p95 as compromise.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tiering by Importance
            </p>
            <p style="margin-top: 0">
              Tier guardrails by consequence: Tier 1 (hard blockers - experiment
              cannot ship), Tier 2 (soft warnings - requires justification to
              ship), Tier 3 (informational - tracked but not enforced). This
              lets teams move fast on lower-risk changes.
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
                  Good guardrails: causally connected to value, measurable with
                  low latency, sensitive but specific
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Threshold at 2-5% relative degradation with 90-95% confidence
                  balances safety and velocity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency at p99 has high variance; use p90-p95 as compromise
                  between mean and tail
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tier by consequence: hard blockers, soft warnings,
                  informational only
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
                  When setting thresholds: start with business question (what
                  degradation would you reject?)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For latency guardrails: recommend p90-p95 as compromise
                  between p50 (misses tails) and p99 (high variance)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGuardrailMetricsGuardrailMetricSelectionAndTiering;
