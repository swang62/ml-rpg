import type { Component } from "solid-js";

const LessonPredictionDriftBaselineSelectionStrategiesAndTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Baseline Selection Strategies and Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRAINING DATA BASELINE
            </p>
            <p>
              Compare current predictions to prediction distribution on training
              data. This answers: are predictions different from what the model
              produced during training?
            </p>
            <p>
              <strong>Advantages:</strong> Detects deviation from the model
              known-good state. Training distribution represents what the model
              was designed to output.
            </p>
            <p>
              <strong>Disadvantages:</strong> Training data may be old. Some
              drift from training is expected and healthy. May generate false
              alarms as legitimate population changes occur.
            </p>
            <p>
              Best for: detecting major deviations, initial deployment
              monitoring, regulatory contexts where you need to prove model is
              behaving as validated.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RECENT PRODUCTION BASELINE
            </p>
            <p>
              Compare current predictions to recent production predictions
              (e.g., last 7 days). This answers: did predictions change
              recently?
            </p>
            <p>
              <strong>Advantages:</strong> Detects sudden changes. Adapts to
              gradual evolution. Less sensitive to expected variation.
            </p>
            <p>
              <strong>Disadvantages:</strong> May miss gradual drift that
              evolves slowly over time. If the world changes slowly, rolling
              baseline changes with it, hiding drift from training.
            </p>
            <p>
              Best for: detecting sudden changes, operational alerting, stable
              production environments.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MULTI-BASELINE APPROACH
            </p>
            <p>
              Use both baselines together. Alert when predictions drift from
              training baseline (long-term deviation) OR from recent baseline
              (sudden change).
            </p>
            <p>
              <strong>Implementation:</strong> Maintain two comparison sets.
              Training baseline is static (updated only on model retrain).
              Recent baseline updates daily or weekly. Run drift detection
              against both.
            </p>
            <p>
              <strong>Alert logic:</strong> Training drift without recent drift
              = gradual evolution, may be acceptable. Recent drift without
              training drift = temporary fluctuation, investigate but may
              resolve. Both = something significant changed.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Start with recent baseline for
              operational monitoring. Add training baseline when you need to
              track long-term model behavior or for compliance requirements.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Training Baseline</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pro: Catches deployment bugs fast
                    <br />
                    Con: Over-alerts as product evolves
                    <br />
                    Use: First 2 to 4 weeks post launch
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Rolling Baseline</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pro: Adapts to gradual shifts, low false positives
                    <br />
                    Con: Can mask slow drift
                    <br />
                    Use: 7 to 30 day window for stable models
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Seasonal Baseline</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pro: Handles daily and weekly cycles
                    <br />
                    Con: Higher storage and complexity
                    <br />
                    Use: Same hour-of-day, 7 days prior
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
                  Training baseline: detects deviation from models designed
                  behavior; may false alarm on expected population changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recent baseline: detects sudden changes, adapts to gradual
                  evolution; may miss slow drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-baseline: alert on training drift (long-term) OR recent
                  drift (sudden); both together = significant change
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
                  Interview Tip: Compare training vs recent baseline tradeoffs:
                  stability vs adaptability.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain multi-baseline alert logic: what each
                  combination of signals means.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPredictionDriftBaselineSelectionStrategiesAndTradeOffs;
