import type { Component } from "solid-js";

const LessonRampUpStrategiesCanaryMetricsSystemProductAndDataQualitySignals: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Canary Metrics: System, Product, and Data Quality Signals
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SYSTEM METRICS
            </p>
            <p style="margin-top: 0">
              System metrics catch infrastructure problems immediately. Key
              signals: P95 latency delta under 5ms, P99 under 250ms total, error
              rate delta under 0.05% absolute. Use 5-15 minute trailing windows.
              If canary P99 spikes to 320ms for 10+ minutes when baseline is
              200ms, trigger automatic rollback. These metrics provide fast
              feedback (minutes) with high confidence.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRODUCT METRICS
            </p>
            <p style="margin-top: 0">
              Product metrics catch model quality problems but require more
              time. CTR, conversion rate, and engagement need hours of data to
              reach statistical significance. At 5% traffic (28.8M requests over
              24 hours), you can detect 0.3% relative CTR change with 80% power.
              Use CUPED (Controlled-experiment Using Pre-Experiment Data) to
              reduce variance by 30%: adjust post-period measurements by
              pre-period differences between cohorts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA QUALITY METRICS
            </p>
            <p style="margin-top: 0">
              Data quality metrics catch feature pipeline problems. Track:
              feature null rate (target under 0.5%), out-of-range values,
              distribution drift using KL divergence between canary and
              baseline. If baseline null rate is 0.3% and canary is 0.8%, that
              0.5% delta indicates a missing feature dependency in the canary
              environment.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Two-layer decision system: Layer
              1 auto-rolls back on guardrails (error rate, P99, nulls). Layer 2
              runs statistical tests on product metrics with multiple comparison
              correction.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPOSITE SCORING
            </p>
            <p style="margin-top: 0">
              Combine metrics into a single gate decision: weight categories
              (40% reliability, 50% product impact, 10% data quality), normalize
              to 0-100 scale. Pass threshold might be 70+. This simplifies the
              "should we ramp?" decision into a single number with clear
              thresholds.
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
                  System metrics: P95 latency delta &lt;5ms, error rate delta
                  &lt;0.05%, 5-15 minute windows for fast feedback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Product metrics: CTR/conversion need hours of data; CUPED
                  reduces variance 30% by adjusting for pre-period differences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data quality: feature null rate &lt;0.5%, distribution drift
                  via KL divergence catches pipeline bugs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two-layer decisions: Layer 1 auto-rollback on guardrails,
                  Layer 2 statistical tests on product metrics
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
                  Explain the three metric categories with concrete thresholds:
                  P99 &lt;250ms, error rate &lt;0.05%, null rate &lt;0.5%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe CUPED: if canary pre-period CTR is 3.1% vs baseline
                  3.2%, adjust post-period by that 0.1% difference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention composite scoring: 40% reliability + 50% product + 10%
                  data quality = single go/no-go number
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRampUpStrategiesCanaryMetricsSystemProductAndDataQualitySignals;
