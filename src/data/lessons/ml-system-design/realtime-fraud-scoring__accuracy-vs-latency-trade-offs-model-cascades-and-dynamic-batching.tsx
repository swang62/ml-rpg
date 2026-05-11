import type { Component } from "solid-js";

const LessonRealtimeFraudScoringAccuracyVsLatencyTradeOffsModelCascadesAndDynamicBatching: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Accuracy vs Latency Trade-offs: Model Cascades and Dynamic Batching
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Trade-off
            </p>
            <p>
              More accurate models are typically slower. A deep neural network
              achieves higher precision but takes 50ms; a linear model runs in
              1ms with lower precision. The business decides: is 2% higher
              precision worth 50x latency increase? For fraud detection, missing
              a fraud case costs more than a few milliseconds—but only up to the
              point where latency causes checkout abandonment.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Model Cascade:</strong> Use cheap fast models to filter
              easy cases, expensive accurate models only for ambiguous ones. If
              the fast model is 95% confident either way, skip the slow model
              entirely. This reduces average latency while maintaining accuracy
              where it matters.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cascade Architecture
            </p>
            <p>
              Stage 1 (1ms): Rules engine and blocklist checks. Stage 2 (5ms):
              Lightweight gradient boosted model on core features. Stage 3
              (30ms): Deep neural network with full feature set. Each stage
              decides: pass, block, or escalate. Only 10-20% of transactions
              reach stage 3, cutting average inference time by 80%.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Batching
            </p>
            <p>
              GPUs process batches efficiently—32 requests together run in 40ms
              total versus 640ms individually (20x speedup). Dynamic batching
              collects incoming requests, waits until batch fills or timeout
              (5-10ms), then processes together. Trade-off: batching adds
              latency for the first request in the batch.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Batching Insight:</strong> Set batch timeout based on P99
              latency budget. If budget is 50ms and model inference is 30ms,
              allow 10-15ms for batching. Under low traffic, requests may wait
              the full timeout; under high traffic, batches fill quickly.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Distillation
            </p>
            <p>
              Train a small fast student model to mimic a large accurate teacher
              model. The student achieves 90-95% of teacher accuracy at 10x
              speed. Use the student for real-time serving, the teacher for
              offline analysis and labeling.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: bold; font-size: 14px">
                Model Cascade Flow
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong>Stage 1: Gating Model</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Small GBT: 2 to 5ms, handles 80 to 95% traffic
                  </div>
                </div>
                <div style="display: flex; gap: 8px; width: 100%; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Clear Safe</strong>
                    <div style="font-size: 11px">Immediate decision</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Ambiguous</strong>
                    <div style="font-size: 11px">Go to Stage 2</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Clear Risky</strong>
                    <div style="font-size: 11px">Immediate decision</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong>Stage 2: Heavy Model</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Deep NN: 20 to 50ms, 5 to 20% of traffic
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
                  Model cascades filter easy cases with fast models, running
                  expensive models only on the 10-20% ambiguous cases—80%
                  latency reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic batching provides 20x GPU throughput improvement but
                  adds latency for first request in batch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Knowledge distillation trains fast student models achieving
                  90-95% teacher accuracy at 10x speed
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
                  Describe a cascade: Stage 1 rules (1ms), Stage 2 lightweight
                  model (5ms), Stage 3 deep model (30ms)—only ambiguous cases
                  escalate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Set batch timeout based on P99 budget: if budget is 50ms and
                  inference is 30ms, allow 10-15ms batching window
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeFraudScoringAccuracyVsLatencyTradeOffsModelCascadesAndDynamicBatching;
