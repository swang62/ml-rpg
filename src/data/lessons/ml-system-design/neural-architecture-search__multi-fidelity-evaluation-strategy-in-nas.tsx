import type { Component } from "solid-js";

const LessonNeuralArchitectureSearchMultiFidelityEvaluationStrategyInNas: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Multi Fidelity Evaluation Strategy in NAS
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 12px; font-size: 15px; line-height: 1.6">
              Evaluating every candidate architecture fully would take years of
              compute. Multi-fidelity evaluation trades accuracy for speed,
              using cheaper proxies to estimate final performance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Insight
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Architecture rankings correlate across training budgets. An
              architecture that is top-10% after 5 epochs is usually top-20%
              after full training. This correlation allows early stopping: train
              many architectures briefly, then fully train only promising ones.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Typical speedup: Instead of 100 architectures trained for 100
              epochs each (10,000 total epochs), train 1000 architectures for 5
              epochs (5,000 epochs), then fully train top 10 (1,000 epochs).
              Total: 6,000 epochs with better coverage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation Strategies
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Reduced epochs:</strong> Train for 5-20% of full budget.
              Fast but rankings may shift for architectures that converge
              slowly.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Reduced data:</strong> Train on 10-25% of the dataset.
              Faster per epoch but may miss architectures that benefit from more
              data.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Weight sharing:</strong> Train a supernetwork containing
              all candidate architectures, then sample subnetworks. Extremely
              fast (single training run) but rankings are less reliable due to
              weight coupling.
            </p>
            <div style="margin: 16px 0; padding: 12px 14px; border-left: 3px solid; border-radius: 0 6px 6px 0">
              <p style="margin: 0; font-size: 14px; line-height: 1.5">
                Trade-off: More aggressive proxies (fewer epochs, less data) are
                faster but have lower rank correlation with full training.
                Typical correlation: 0.7-0.9 for reduced epochs, 0.5-0.7 for
                weight sharing.
              </p>
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Stage 1: All Candidates (1000)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    3 epochs @ 160px, 2.7 hours each
                    <br />
                    Early stop after 1 epoch if acc &lt; 40%
                    <br />
                    Cost: 350-400 candidates/hour with 1000 GPUs
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Filter to top 5%
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Stage 2: Top 50 Candidates
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10-30 epochs @ 224px
                    <br />
                    Validate accuracy + latency LUT
                    <br />
                    Cost: 18-54 hours per candidate
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Select top 5
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Stage 3: Final 5 Candidates
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Full train to convergence (100-300 epochs)
                    <br />
                    Quantize to INT8, measure on 32 real devices
                    <br />
                    Track p50, p95 latency, memory peaks
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Deploy Best Model</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    A/B test at 1% traffic for 48 hours
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
                  Architecture rankings correlate across training budgets (early
                  accuracy predicts final accuracy)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reduced epochs: Train 5-20% of full budget, correlation
                  0.7-0.9
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weight sharing: Single supernetwork training, fastest but
                  correlation 0.5-0.7
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-fidelity reduces total compute by 50-90% vs full
                  evaluation
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
                  Interview Tip: Explain why early stopping works based on rank
                  correlation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Compare the three evaluation strategies and
                  their tradeoffs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Discuss when weight sharing is appropriate vs
                  dedicated training
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNeuralArchitectureSearchMultiFidelityEvaluationStrategyInNas;
