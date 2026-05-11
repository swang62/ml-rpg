import type { Component } from "solid-js";

const LessonBusinessMetricsCorrelationCorrelationTypesAndStatisticalMethods: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Correlation Types and Statistical Methods
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CORRELATION VS CAUSATION
            </p>
            <p>
              Observational correlation measures how metrics move together.
              Pearson correlation captures linear relationships. Spearman
              correlation captures monotonic relationships (useful when
              relationships are not linear). But neither establishes causation.
              Two metrics might correlate because they share a common cause, not
              because one causes the other.
            </p>
            <p>
              <strong>Example:</strong> Model latency and revenue are
              correlated. But is this because faster models drive more revenue,
              or because higher traffic (which causes both higher latency and
              more revenue) creates the correlation? Without controlled
              experiments, you cannot tell.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ESTABLISHING CAUSATION
            </p>
            <p>
              <strong>A/B testing:</strong> The gold standard. Randomly assign
              users to treatment (new model) and control (old model). Compare
              business metrics between groups. Any difference is caused by the
              model change because randomization eliminates confounders.
            </p>
            <p>
              <strong>Quasi-experiments:</strong> When randomization is not
              possible, use natural variation. Difference-in-differences
              compares changes before/after a model launch in treated regions vs
              untreated regions. Requires careful selection of comparison
              groups.
            </p>
            <p>
              <strong>Instrumental variables:</strong> Find a variable that
              affects the model metric but only affects business metrics through
              the model. Use this to isolate causal effect. Difficult to find
              valid instruments in practice.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STATISTICAL METHODS
            </p>
            <p>
              <strong>Regression analysis:</strong> Model business metrics as a
              function of model metrics plus confounders. Coefficient on model
              metric estimates partial effect. Works when you can measure and
              control for confounders.
            </p>
            <p>
              <strong>Granger causality:</strong> Tests if past values of model
              metrics predict future business metrics beyond what past business
              metrics predict. Useful for time series but does not establish
              true causation.
            </p>
            <p>
              <strong>Structural equation modeling:</strong> Specifies a full
              causal model with multiple paths. Estimates direct and indirect
              effects simultaneously. Requires strong assumptions about causal
              structure.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Start with correlation for
              hypothesis generation, but validate with A/B tests before making
              decisions. Correlation might be spurious; causation requires
              experimental evidence.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px">
                  Five Correlation Archetypes
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong>Causal:</strong> Latency ↓ → Conversion ↑<br />
                  <span style="font-size: 12px">
                    100ms reduction = 1% sales lift
                  </span>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong>Correlated Non-Causal:</strong> Traffic + Revenue
                  <br />
                  <span style="font-size: 12px">
                    Both driven by holiday seasonality
                  </span>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong>Inverse:</strong> Precision ↑ → Recall ↓<br />
                  <span style="font-size: 12px">
                    At fixed classification threshold
                  </span>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong>Lagged:</strong> Quality today → Retention in 30d
                  <br />
                  <span style="font-size: 12px">
                    Cross correlation lag: 7 to 30 days
                  </span>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong>Spurious:</strong> Global positive, negative within
                  segment
                  <br />
                  <span style="font-size: 12px">
                    Simpson's paradox from mix shift
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
                  Pearson/Spearman correlation measures co-movement but cannot
                  distinguish causation from shared confounders
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A/B testing is gold standard for causation; quasi-experiments
                  and instrumental variables are fallbacks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Regression controls for confounders; Granger causality tests
                  predictive power in time series
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
                  Interview Tip: Explain why latency-revenue correlation might
                  be spurious—traffic affects both.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe when to use A/B tests vs
                  quasi-experiments based on randomization feasibility.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBusinessMetricsCorrelationCorrelationTypesAndStatisticalMethods;
