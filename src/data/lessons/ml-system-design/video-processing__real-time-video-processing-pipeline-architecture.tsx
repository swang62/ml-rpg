import type { Component } from "solid-js";

const LessonVideoProcessingRealTimeVideoProcessingPipelineArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Real-Time Video Processing Pipeline Architecture
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
                <strong>Real-time Video Processing</strong> is a pipeline that
                analyzes video streams as frames arrive, producing results
                within strict latency budgets. Unlike batch processing, each
                frame must be decoded, analyzed, and actioned before the next
                frame arrives (typically 33ms at 30 FPS).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pipeline Architecture
            </p>
            <p style="margin-top: 0">
              A real-time video pipeline consists of three stages running in
              parallel: decode, analyze, and act. Each stage operates on
              different frames simultaneously to maintain throughput.
            </p>
            <p>
              <strong>Decode stage:</strong> Receive compressed video stream,
              decompress frames, convert to tensor format. This is
              CPU-intensive. A single core handles 100-200 frames per second for
              1080p H.264 video.
            </p>
            <p>
              <strong>Analyze stage:</strong> Run ML models on decoded frames.
              Detection, classification, segmentation, tracking. This is
              GPU-intensive. Batching multiple frames improves throughput.
            </p>
            <p>
              <strong>Act stage:</strong> Process model outputs, trigger alerts,
              update dashboards, store results. This stage must not block the
              pipeline even when downstream systems are slow.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Budget
            </p>
            <p style="margin-top: 0">
              At 30 FPS, a new frame arrives every 33ms. Your entire pipeline
              must complete within this budget to process every frame. If total
              latency exceeds 33ms, you must either skip frames or accept
              growing queues.
            </p>
            <p>
              <strong>Typical budget allocation:</strong> Decode 5-10ms, Model
              inference 15-25ms, Post-processing 2-5ms. This leaves 3-10ms of
              slack for variability.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Capture &amp; Encode</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    50ms | 720p30 | 1-2 Mbps
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Network Transport</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    50-100ms | WebRTC
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">HW Decode</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5-10ms | GPU accelerated
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">ML Inference</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    10-30ms | 1 of 2 frames
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">
                    Post-process &amp; Render
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5-15ms | Total: 120-200ms
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
                  Three parallel stages: decode (CPU), analyze (GPU), act
                  (output) - each operates on different frames
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 30 FPS, total pipeline latency must stay under 33ms to
                  process every frame
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical budget: decode 5-10ms, inference 15-25ms,
                  post-processing 2-5ms, leaving 3-10ms slack
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If latency exceeds frame interval, must skip frames or accept
                  queue buildup
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
                  Interview Tip: Break down latency budget by stage - shows
                  understanding of where bottlenecks occur
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention pipelining - different stages process
                  different frames simultaneously to maximize throughput
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonVideoProcessingRealTimeVideoProcessingPipelineArchitecture;
