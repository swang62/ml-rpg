import type { Component } from "solid-js";

const LessonBatchThroughputTuningDynamicBatchingForLowLatencyGpuInference: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dynamic Batching for Low Latency GPU Inference
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Dynamic batching</strong> collects inference requests
                that arrive within a time window and processes them as a single
                GPU batch. Unlike static batching (fixed batch size), dynamic
                batching adapts to traffic patterns and latency constraints.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Dynamic Batching Works
            </p>
            <p style="margin-top: 0">
              A batcher sits between the request queue and the inference engine.
              It collects requests until either: the batch reaches maximum size,
              or a timeout expires. Parameters: max_batch_size (typically
              16-64), max_delay_ms (typically 5-20ms). When triggered, the batch
              is padded to uniform shape (if needed) and sent to GPU. Results
              are returned to individual request handlers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Padding and Efficiency
            </p>
            <p style="margin-top: 0">
              Variable-length inputs (text, sequences) require padding to the
              longest item in the batch. A batch of texts with lengths [10, 20,
              100] pads to [100, 100, 100], wasting 70% of compute. Solutions:
              bucket by length (group similar-sized inputs), use sequence
              bucketing (e.g., buckets at 32, 64, 128, 256 tokens), or implement
              packed batching (concatenate sequences with separators, no padding
              needed).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              Implementation Options
            </p>
            <p style="margin-top: 0">
              <strong>Triton Inference Server:</strong> built-in dynamic
              batching with configurable parameters.{" "}
              <strong>TorchServe:</strong> requires custom batching handler.{" "}
              <strong>Custom:</strong> async queue with batch formation logic.
              Key metrics: batch fill rate (how full are batches on average),
              timeout trigger rate (how often timeout fires before batch fills).
              Low fill rate with frequent timeouts suggests max_delay is too
              short or traffic is too sparse for batching.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 8px; text-align: center">
                    Incoming Requests
                  </div>
                  <div style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap">
                    <div style="border: 2px solid; padding: 4px 8px; border-radius: 4px; font-size: 12px">
                      R1
                    </div>
                    <div style="border: 2px solid; padding: 4px 8px; border-radius: 4px; font-size: 12px">
                      R2
                    </div>
                    <div style="border: 2px solid; padding: 4px 8px; border-radius: 4px; font-size: 12px">
                      R3
                    </div>
                    <div style="border: 2px solid; padding: 4px 8px; border-radius: 4px; font-size: 12px">
                      R4
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: 700">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; text-align: center; margin-bottom: 6px">
                    Dynamic Batcher
                  </div>
                  <div style="font-size: 13px; text-align: center">
                    Wait: 2 to 5ms OR Max: 64 requests
                    <br />
                    <strong>Whichever comes first</strong>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: 700">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; text-align: center; margin-bottom: 6px">
                    GPU Worker
                  </div>
                  <div style="font-size: 13px; text-align: center">
                    Batch of 16 to 64 items
                    <br />
                    Single kernel launch
                    <br />
                    75% utilization
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
                  Dynamic batching collects requests until max_batch_size or
                  max_delay_ms, whichever first
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical parameters: max_batch_size 16-64, max_delay_ms 5-20ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Padding waste: [10, 20, 100] tokens pads to [100, 100, 100],
                  wasting 70% compute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Solutions: sequence bucketing (32, 64, 128, 256 buckets) or
                  packed batching (no padding)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor batch fill rate and timeout trigger rate to tune
                  parameters
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
                  Explain the two-parameter model (max_batch_size, max_delay_ms)
                  when discussing batching design
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe padding waste with concrete example (70% waste) and
                  bucketing solution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention Triton"s built-in dynamic batching versus custom
                  implementations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchThroughputTuningDynamicBatchingForLowLatencyGpuInference;
