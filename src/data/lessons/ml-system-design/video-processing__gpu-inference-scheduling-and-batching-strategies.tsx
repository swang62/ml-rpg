import type { Component } from "solid-js";

const LessonVideoProcessingGpuInferenceSchedulingAndBatchingStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            GPU Inference Scheduling and Batching Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Batching for Video
            </p>
            <p style="margin-top: 0">
              GPUs process batches more efficiently than individual frames. A
              batch of 8 frames takes 20ms; 8 individual frames take 80ms. But
              batching adds latency since frames wait for the batch to fill.
            </p>
            <p>
              <strong>Batch formation strategies:</strong> Wait for N frames
              (fixed batch size) or wait T milliseconds (timeout). Fixed size
              maximizes throughput but adds variable latency. Timeout caps
              latency but produces variable batch sizes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Stream Batching
            </p>
            <p style="margin-top: 0">
              When processing multiple cameras, batch frames from different
              streams together. Camera A and Camera B each contribute 4 frames
              to an 8-frame batch. Both streams benefit from GPU efficiency
              without either waiting too long.
            </p>
            <p>
              <strong>Stream prioritization:</strong> Some cameras matter more
              than others. Entrance cameras get priority over parking lot
              cameras. Priority affects batch ordering and timeout handling.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GPU Memory Management
            </p>
            <p style="margin-top: 0">
              <strong>Pre-allocation:</strong> Allocate GPU memory at startup.
              Avoid runtime allocation that causes fragmentation and
              unpredictable latency.
            </p>
            <p>
              <strong>Double buffering:</strong> While GPU processes batch N,
              CPU prepares batch N+1. Hides preprocessing latency by overlapping
              CPU and GPU work.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Throughput vs Latency Tuning
            </p>
            <p style="margin-top: 0">
              <strong>Maximum throughput:</strong> Large batches (16-32 frames),
              long timeouts (50-100ms). Use for offline analysis or low-priority
              streams.
            </p>
            <p>
              <strong>Minimum latency:</strong> Small batches (4-8 frames),
              short timeouts (10-20ms). Use for real-time alerts or
              safety-critical applications.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Larger batches increase
              throughput but add latency. The optimal batch size depends on your
              latency requirements, not maximum GPU utilization.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Single Frame (Batch 1)
                  </div>
                  <div style="font-size: 11px; line-height: 1.6">
                    Latency: 25ms inference
                    <br />
                    Throughput: 40 FPS
                    <br />
                    GPU Utilization: 30%
                    <br />
                    <strong>Use:</strong> High priority streams, tight SLO
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Dynamic Batching (Batch 8)
                  </div>
                  <div style="font-size: 11px; line-height: 1.6">
                    Latency: 80ms inference + up to 175ms queue
                    <br />
                    Throughput: 100 FPS
                    <br />
                    GPU Utilization: 85%
                    <br />
                    <strong>Use:</strong> Background streams, loose SLO
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    INT8 Quantized (Batch 1)
                  </div>
                  <div style="font-size: 11px; line-height: 1.6">
                    Latency: 8ms inference (3x faster)
                    <br />
                    Throughput: 125 FPS
                    <br />
                    Accuracy: 1-3% mAP degradation
                    <br />
                    <strong>Use:</strong> Real time feedback at 30 FPS
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
                  Batching 8 frames takes 20ms vs 80ms for 8 individual frames -
                  4x efficiency improvement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-stream batching combines frames from different cameras
                  for better GPU utilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre-allocation and double buffering hide memory and
                  preprocessing latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large batches (16-32) for throughput; small batches (4-8) for
                  latency-sensitive applications
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
                  Interview Tip: Explain timeout-based batching to cap latency
                  while still gaining batching benefits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention double buffering - CPU prepares batch
                  N+1 while GPU processes batch N
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonVideoProcessingGpuInferenceSchedulingAndBatchingStrategies;
