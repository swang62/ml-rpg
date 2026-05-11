import type { Component } from "solid-js";

const LessonNlpScalabilityHowDoesBatchingImproveTrainingAndInferenceUtilization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Does Batching Improve Training and Inference Utilization?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Batching Works
            </p>
            <p style="margin-top: 0">
              Instead of processing requests one at a time, batching groups
              multiple requests and processes them together in a single GPU
              operation. A GPU can process 1 item in 5ms or 32 items in 8ms.
              That is 160ms for 32 individual calls versus 8ms for one batch:
              20x faster throughput. The efficiency comes from GPU architecture,
              which is optimized for parallel operations on large matrices.
            </p>
            <p>
              The batching algorithm collects incoming requests into a queue,
              waits until either the batch reaches a target size (say, 32) or a
              timeout expires (say, 50ms), then sends the batch to the GPU. The
              wait adds latency to individual requests but dramatically improves
              overall throughput and cost efficiency.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing Batch Parameters
            </p>
            <p style="margin-top: 0">
              Batch size is bounded by GPU memory. A 16GB GPU running a 7B
              parameter model might fit batches of 8-16 requests depending on
              sequence length. Larger batches improve throughput but require
              more memory. If your batch exceeds memory, the request fails with
              out of memory errors.
            </p>
            <p>
              Timeout determines worst case latency. A 100ms timeout means every
              request waits at most 100ms before processing begins, plus
              inference time. For real-time applications requiring sub-200ms
              response, use short timeouts (20-50ms) and accept smaller batches.
              For batch processing where latency does not matter, use longer
              timeouts (seconds) and maximize batch fill.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Larger batches = higher
              throughput + higher latency. Smaller batches = lower latency +
              wasted GPU capacity. Set batch size and timeout based on your
              latency SLA and traffic patterns.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Batching
            </p>
            <p style="margin-top: 0">
              Static batch parameters waste resources when traffic varies.
              Dynamic batching adjusts based on current conditions. Under high
              load, batches fill quickly and timeout rarely triggers. Under low
              load, shorter timeouts prevent requests from waiting forever for a
              batch that never fills. Some systems adjust batch size based on
              request complexity - longer sequences get smaller batches to avoid
              memory issues.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 14px">
                  Training: Gradient Accumulation
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Micro Batch 1 (256)</strong> → Forward + Backward →
                  Accumulate Grad
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Micro Batch 2 (256)</strong> → Forward + Backward →
                  Accumulate Grad
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Micro Batch 8 (256)</strong> → Forward + Backward →
                  Accumulate Grad
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-top: 4px">
                  <strong>Parameter Update: Effective Batch = 2048</strong>
                </div>
              </div>
              <div style="text-align: center; margin-top: 16px; margin-bottom: 12px">
                <strong style="font-size: 14px">
                  Inference: Continuous Batching
                </strong>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-size: 12px; line-height: 1.6">
                  <strong>t=0ms:</strong> Seq A, B, C (batch=3)
                  <br />
                  <strong>t=50ms:</strong> Seq A done, D joins (batch=3)
                  <br />
                  <strong>t=100ms:</strong> Seq B done, E joins (batch=3)
                  <br />
                  <strong>Result:</strong> 100% GPU utilization, no bubbles
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
                  Batching groups requests: GPU processes 1 item in 5ms or 32
                  items in 8ms, yielding 20x throughput improvement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch size is bounded by GPU memory - a 16GB GPU with 7B model
                  fits 8-16 requests depending on sequence length
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Timeout sets worst case latency: 100ms timeout means every
                  request waits up to 100ms before processing starts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic batching adjusts parameters based on load - high load
                  fills batches quickly, low load uses shorter timeouts
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
                  Lead with the efficiency numbers: 32 individual requests at
                  160ms total vs one batch at 8ms. That is the core insight.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the batch size memory constraint - batch too large
                  causes OOM. Ask about their GPU specs and model size.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the latency trade-off: batch timeout directly
                  determines worst case latency. Real-time needs 20-50ms, batch
                  jobs can use seconds.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNlpScalabilityHowDoesBatchingImproveTrainingAndInferenceUtilization;
