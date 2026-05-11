import type { Component } from "solid-js";

const LessonBusinessMetricsCorrelationMetricLaddersAndMediationChains: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Metric Ladders and Mediation Chains
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              METRIC LADDERS EXPLAINED
            </p>
            <p>
              A metric ladder is a hierarchy connecting technical metrics to
              business outcomes. At the bottom: model metrics (accuracy, AUC,
              latency). Middle: product metrics (CTR, engagement time,
              conversion rate). Top: business metrics (revenue, profit, customer
              lifetime value).
            </p>
            <p>
              Each rung in the ladder has a transfer function describing how
              improvements at one level affect the next. A 10% improvement in
              model AUC might yield 5% improvement in CTR, which yields 2%
              improvement in revenue. These transfer functions are estimated
              from historical data and validated through experiments.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEDIATION CHAINS
            </p>
            <p>
              Mediation analysis decomposes the total effect of a model change
              into direct and indirect paths. Direct effect: the model change
              affects business metrics directly. Indirect effect: the model
              change affects intermediate metrics, which then affect business
              metrics.
            </p>
            <p>
              <strong>Example:</strong> A faster model (reduced latency)
              improves engagement (users see more recommendations per session),
              which improves purchases. The direct effect of latency on
              purchases is small. The indirect effect through engagement is
              large. Understanding mediation helps you identify which
              intermediate metrics matter most.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BUILDING THE LADDER
            </p>
            <p>
              <strong>Step 1:</strong> Identify all metrics from model to
              business. Map dependencies explicitly. Which model metrics affect
              which product metrics?
            </p>
            <p>
              <strong>Step 2:</strong> Estimate transfer functions. Use
              historical data to compute correlations. A/B tests provide causal
              estimates when available.
            </p>
            <p>
              <strong>Step 3:</strong> Validate the chain. When you improve a
              model metric, does the expected improvement propagate? If not,
              your transfer functions are wrong or confounders exist.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SENSITIVITY ANALYSIS
            </p>
            <p>
              Not all model metrics have equal business impact. Sensitivity
              analysis identifies which model improvements yield the largest
              business gains. If improving latency from 50ms to 40ms yields 10x
              more revenue impact than improving AUC from 0.85 to 0.87, focus on
              latency.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Metric ladders are
              approximations. They work well for incremental changes but break
              down for large changes where non-linearities dominate.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px">
                  Web Performance Metric Ladder
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>TTFB</strong>
                    <br />
                    200ms
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>Start Render</strong>
                    <br />
                    450ms
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>Speed Index</strong>
                    <br />
                    1.2s
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>Bounce Rate</strong>
                    <br />
                    28%
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>Sessions/User</strong>
                    <br />
                    4.2
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>Revenue/Session</strong>
                    <br />
                    $12
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
                  Metric ladder: model metrics (AUC) → product metrics (CTR) →
                  business metrics (revenue), each with transfer functions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mediation analysis separates direct effects from indirect
                  effects through intermediate metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sensitivity analysis identifies which model improvements yield
                  largest business gains—focus there first
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
                  Interview Tip: Draw a metric ladder showing how model
                  improvements propagate to business outcomes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain mediation—latency improvement affects
                  engagement, which affects purchases (indirect &gt; direct).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBusinessMetricsCorrelationMetricLaddersAndMediationChains;
