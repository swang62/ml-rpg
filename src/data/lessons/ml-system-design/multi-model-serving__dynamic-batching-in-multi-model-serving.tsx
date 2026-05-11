import type { Component } from "solid-js";

const LessonMultiModelServingDynamicBatchingInMultiModelServing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dynamic Batching in Multi-Model Serving
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Batching Matters
            </p>
            <p style="margin-top: 0">
              Dynamic batching groups multiple inference requests into a single
              forward pass to maximize GPU utilization, commonly yielding 1.5 to
              5x throughput improvement at the cost of added queuing latency. In
              multi-model serving, batching happens per model: requests for the
              same model wait in a queue until a batch size threshold or timeout
              is reached, then execute together. GPUs achieve peak efficiency
              when processing many inputs simultaneously, but naive
              one-at-a-time inference leaves hardware idle between requests.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Batching Mechanism
            </p>
            <p style="margin-top: 0">
              The core mechanism is a per model queue with two triggers: batch
              size (for example, accumulate 8 requests) and max batch delay (for
              example, wait no more than 10ms). Whichever trigger fires first
              causes the batch to execute. For interactive APIs with strict
              latency budgets, the timeout is the critical parameter. TorchServe
              users commonly set 5 to 15ms max delays, accepting small added
              latency to gain 2 to 3x throughput for vision models on GPU. For
              offline batch scoring, you can increase the timeout to 100+ ms to
              build larger batches.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Head of Line Blocking
            </p>
            <p style="margin-top: 0">
              If one slow or large model dominates a shared batch queue, it
              delays fast models waiting behind it. In multi-model serving, this
              is worse because heterogeneous models with vastly different
              inference times (a 5ms image classifier versus a 200ms NLP
              encoder) can share workers. The symptom is p95 latency inflation
              for fast models. The solution is per model queues with isolated
              batching, ensuring each model accumulates its own batches
              independently, or partitioning workers by model size class.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Size Variance
            </p>
            <p style="margin-top: 0">
              If traffic is spiky, some batches are full (hitting size limit)
              while others are tiny singletons (hitting timeout). Full batches
              get high throughput but singletons waste GPU cycles. Production
              systems mitigate this with adaptive batch sizing: monitor queue
              depth and adjust batch parameters dynamically, or use continuous
              batching where the system starts inference as soon as one request
              arrives and opportunistically merges in new requests during
              execution.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="text-align: center; margin-bottom: 6px">
                    <strong style="font-size: 13px">
                      Per-Model Queue: fraud_v2
                    </strong>
                  </div>
                  <div style="display: flex; gap: 4px; justify-content: center">
                    <div style="border: 1px solid; padding: 4px 6px; font-size: 10px; border-radius: 3px">
                      Req1
                    </div>
                    <div style="border: 1px solid; padding: 4px 6px; font-size: 10px; border-radius: 3px">
                      Req2
                    </div>
                    <div style="border: 1px solid; padding: 4px 6px; font-size: 10px; border-radius: 3px">
                      Req3
                    </div>
                    <div style="border: 1px solid; padding: 4px 6px; font-size: 10px; border-radius: 3px">
                      Req4
                    </div>
                  </div>
                  <div style="font-size: 10px; margin-top: 4px; text-align: center">
                    Wait: 8ms (timeout: 10ms)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Trigger: timeout reached
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">GPU Batch Inference</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Batch size: 4 | Time: 18ms
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Total Latency per Request
                  </strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Queue: 8ms + Inference: 18ms = 26ms
                  </div>
                  <div style="font-size: 10px; font-weight: bold; margin-top: 3px">
                    vs 72ms if each ran solo (4 × 18ms)
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
                  Dynamic batching yields 1.5 to 5x GPU throughput improvement
                  by grouping requests, commonly adding 5 to 20 milliseconds of
                  queuing latency with 10ms timeout settings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per model queues prevent head of line blocking where slow
                  models delay fast ones; without isolation, a 200ms NLP model
                  can inflate p95 for a 5ms image classifier
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Max batch delay timeout is the critical parameter: set 5 to
                  15ms for interactive APIs to bound added latency, or 100+ ms
                  for offline scoring to maximize throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  TorchServe users report 2 to 3x throughput gains on GPU for
                  computer vision models with dynamic batching enabled,
                  accepting small p50 latency increase from queuing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Failure mode is batch size variance under spiky traffic: full
                  batches achieve high efficiency while singleton batches waste
                  GPU; adaptive sizing adjusts batch parameters based on queue
                  depth
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
                  Meta TorchServe serving 30 image classification models per GPU
                  with per model batching: max batch size 16, timeout 10ms,
                  achieving 150 QPS per model versus 60 QPS without batching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation model with dynamic batching: queue
                  delay adds 8ms p50, but throughput increases from 40 to 120
                  requests per second on single GPU, reducing fleet size by 60%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fraud detection system with mixed model sizes: fast 5ms models
                  in one worker pool with tight 5ms timeout, slow 200ms models
                  in separate pool with 50ms timeout to prevent cross
                  contamination
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiModelServingDynamicBatchingInMultiModelServing;
