import type { Component } from "solid-js";

const LessonMultiHorizonForecastingTradeOffsInMultiHorizonForecastingSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-Offs in Multi-Horizon Forecasting Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Accuracy vs Horizon Range
            </p>
            <p>
              Extending forecast horizons reduces accuracy at all horizons.
              Models must allocate capacity between near-term precision and
              long-term coverage. A 90-day model will underperform a 30-day
              model at the 7-day horizon because it learns less precise
              short-term patterns. Match horizon range to actual business
              needs—do not forecast further than decisions require.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Design Principle:</strong> If business needs short and
              long horizons, consider separate models. A 7-day high-precision
              model for operations plus a 90-day lower-precision model for
              planning often outperforms a single compromise model.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Computational Cost vs Freshness
            </p>
            <p>
              More frequent forecast updates improve freshness but multiply
              compute costs. Daily updates for millions of series across 30+
              horizons is expensive. Tier refresh rates: high-value series
              update hourly, medium-value daily, low-value weekly. Not all
              series deserve the same freshness.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Complexity vs Interpretability
            </p>
            <p>
              Deep learning models (Transformers, LSTMs) achieve
              state-of-the-art accuracy but are black boxes. Statistical models
              (ARIMA, ETS) are interpretable—you can explain why forecasts
              changed. In regulated environments or when stakeholder trust
              matters, interpretability may outweigh accuracy gains.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Hybrid Solution:</strong> Use DL for point forecasts, add
              interpretable components (decomposition into
              trend/seasonal/residual) for explainability. Stakeholders see
              familiar patterns; model benefits from DL accuracy.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Global vs Local Models
            </p>
            <p>
              Global models (one model, all series) transfer learning across
              series but may underfit unique patterns. Local models (per-series)
              capture unique patterns but cannot generalize. Hybrid: global
              model with series-specific fine-tuning or local adjustment layers.
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
                  Extending horizon range reduces accuracy at all horizons—match
                  range to actual business decisions needed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tier refresh rates by series value: hourly for high-value,
                  daily for medium, weekly for low-value
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deep learning achieves accuracy but lacks interpretability—use
                  hybrid approaches in regulated environments
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
                  Separate models often outperform compromise: 7-day precision
                  model for ops + 90-day model for planning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Global models transfer learning but may underfit unique
                  patterns; add series-specific fine-tuning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiHorizonForecastingTradeOffsInMultiHorizonForecastingSystems;
