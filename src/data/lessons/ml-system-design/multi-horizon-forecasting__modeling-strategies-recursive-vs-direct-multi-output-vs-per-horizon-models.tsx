import type { Component } from "solid-js";

const LessonMultiHorizonForecastingModelingStrategiesRecursiveVsDirectMultiOutputVsPerHorizonModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Modeling Strategies: Recursive vs Direct Multi-Output vs Per-Horizon
            Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Recursive (Iterated) Strategy
            </p>
            <p>
              Train a single-step model, then iterate: predict t+1, feed
              prediction as input to predict t+2, repeat. Advantages: one model
              handles any horizon, captures autoregressive dependencies.
              Disadvantages: errors compound—small errors at t+1 amplify by
              t+30. Works well for short horizons; degrades rapidly for long
              horizons.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Error Accumulation:</strong> If single-step error is 5%,
              after 10 recursive steps the effective error can exceed 50%. Use
              scheduled sampling during training—gradually replace ground truth
              with predictions—to make the model robust to its own errors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Direct Multi-Output Strategy
            </p>
            <p>
              Train one model that outputs all horizons simultaneously. The
              model learns to predict [t+1, t+2, ..., t+H] in a single forward
              pass. Advantages: no error accumulation, horizon-specific patterns
              captured. Disadvantages: fixed maximum horizon, computationally
              expensive for many horizons. Works well when horizon count is
              moderate (under 30).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Per-Horizon Strategy
            </p>
            <p>
              Train separate models for each horizon: model_1 predicts t+1,
              model_7 predicts t+7, model_30 predicts t+30. Advantages: each
              model optimizes for its specific horizon. Disadvantages:
              computational cost scales with horizon count, forecasts may be
              inconsistent across horizons. Use when horizons have very
              different characteristics.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Practical Recommendation:</strong> Start with direct
              multi-output for moderate horizons (up to 30 steps). Use recursive
              for very long horizons where multi-output is impractical. Reserve
              per-horizon for specialized applications.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hybrid Approaches
            </p>
            <p>
              Combine strategies: use direct for short horizons (high accuracy
              needed), recursive for long horizons (flexibility needed). Some
              architectures naturally support both: encoder-decoder models can
              decode either autoregressively or in parallel.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Recursive: One Step at a Time
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Predict t+1 → Feed back → Predict t+2 → ...
                    <br />✓ Simple, accurate at h=1
                    <br />✗ Errors compound: 5% → 15% → 40% by h=20
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Direct Multi-Output: All Horizons at Once
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    History [60 steps] + Known futures → [h1, h2, ..., h28]
                    <br />✓ No error propagation, shared structure
                    <br />✗ Can underfit near term without loss weighting
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Per-Horizon: Separate Model Each Step
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Model₁ for h=1, Model₇ for h=7, Model₂₈ for h=28
                    <br />✓ Robust, horizon-specific patterns
                    <br />✗ 28 models = 28x cost (training + serving)
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
                  Recursive: one model iterates, but errors compound—5%
                  single-step error can exceed 50% after 10 steps
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Direct multi-output: all horizons in one pass, no error
                  accumulation, but fixed maximum horizon
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Start with direct multi-output for up to 30 steps; use
                  recursive for very long horizons
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
                  Use scheduled sampling during recursive training—gradually
                  replace ground truth with predictions for robustness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per-horizon models when horizons have very different
                  characteristics; otherwise computationally expensive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiHorizonForecastingModelingStrategiesRecursiveVsDirectMultiOutputVsPerHorizonModels;
