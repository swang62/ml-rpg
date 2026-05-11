import type { Component } from "solid-js";

const LessonConceptDriftMitigationDataWeightingRetrainingCadenceAndModelPortfolios: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Mitigation: Data Weighting, Retraining Cadence, and Model Portfolios
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RETRAINING STRATEGIES
            </p>
            <p>
              <strong>Scheduled retraining:</strong> Retrain on a fixed cadence
              (daily, weekly, monthly). Simple to implement. Downside: retrains
              even when unnecessary and may miss rapid drift between cycles.
            </p>
            <p>
              <strong>Triggered retraining:</strong> Retrain when drift metrics
              exceed thresholds. More efficient but requires reliable drift
              detection. Risk: false triggers cause unnecessary retraining;
              missed triggers allow decay.
            </p>
            <p>
              <strong>Continuous training:</strong> Always training on streaming
              data. Model constantly adapts. Complex infrastructure. Risk of
              catastrophic forgetting if training data has temporary anomalies.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA WEIGHTING
            </p>
            <p>
              Recent data is more relevant than old data for many domains.
              Weight training examples by recency: exponential decay assigns
              higher weight to recent samples.{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                weight = e^(-λ × age_days)
              </code>
            </p>
            <p>
              Tune λ based on domain volatility. High λ (short half-life) for
              rapidly changing domains (trending content). Low λ for stable
              domains (document classification).
            </p>
            <p>
              Alternatively, use sliding windows: train only on last N days of
              data. Simpler than exponential weighting but creates hard cutoffs
              that may lose valuable historical patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL ENSEMBLES AND PORTFOLIOS
            </p>
            <p>
              Instead of one model, maintain multiple models trained on
              different time windows. Ensemble predictions by weighted average.
              Recent-trained models capture current patterns; older models
              remember stable patterns.
            </p>
            <p>
              <strong>Champion-challenger pattern:</strong> Current production
              model is champion. New models train continuously as challengers.
              When a challenger outperforms champion on validation, promote it.
              Provides both stability and adaptation.
            </p>
            <p>
              Portfolio benefit: if drift is temporary (e.g., holiday spike),
              older models recover quickly when drift reverses. A single
              retrained model may have forgotten pre-drift patterns.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> No single retraining strategy
              works everywhere. Match cadence to domain volatility. Use
              ensembles for robustness against unpredictable drift patterns.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 4px">
                  Exponential Decay Weighting
                </div>
                <div style="display: flex; gap: 10px; align-items: center; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; min-width: 90px">
                    <strong style="font-size: 12px">Today</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      weight = 1.0
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; min-width: 90px">
                    <strong style="font-size: 12px">7 days ago</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      weight = 0.5
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; min-width: 90px">
                    <strong style="font-size: 12px">14 days ago</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      weight = 0.25
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; min-width: 90px">
                    <strong style="font-size: 12px">21 days ago</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      weight = 0.125
                    </div>
                  </div>
                </div>
                <div style="margin-top: 8px; text-align: center; font-size: 13px; padding: 8px; border: 2px solid; border-radius: 6px">
                  Formula: weight = 0.5^(age / half_life)
                  <br />
                  <strong>Half-life = 7 days for ads/recommendations</strong>
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
                  Scheduled retraining (fixed cadence) is simple; triggered
                  retraining (on drift detection) is efficient; continuous
                  training adapts constantly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data weighting: exponential decay gives recent data higher
                  influence; tune λ based on domain volatility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ensembles of models from different time windows provide
                  robustness—older models recover if drift is temporary
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
                  Interview Tip: Compare scheduled vs triggered
                  retraining—tradeoffs between simplicity and efficiency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain champion-challenger pattern for safe
                  model updates with automatic promotion.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonConceptDriftMitigationDataWeightingRetrainingCadenceAndModelPortfolios;
