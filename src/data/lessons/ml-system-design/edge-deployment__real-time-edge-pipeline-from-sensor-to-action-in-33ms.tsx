import type { Component } from "solid-js";

const LessonEdgeDeploymentRealTimeEdgePipelineFromSensorToActionIn33ms: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Real Time Edge Pipeline: From Sensor to Action in 33ms
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE 33MS BUDGET
            </p>
            <p style="margin-top: 0">
              For 30 fps video processing, each frame must complete in 33ms.
              This includes: camera capture (2-5ms), preprocessing (2-3ms),
              model inference (15-25ms), postprocessing (2-5ms), and
              display/action (1-2ms). Any stage exceeding its budget causes
              frame drops, visible stuttering, or delayed responses.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PIPELINE PARALLELIZATION
            </p>
            <p style="margin-top: 0">
              Sequential processing wastes time: while the model runs on frame
              N, the camera sits idle. Pipeline parallelism overlaps stages:
              capture frame N+1 while processing frame N. With 3-stage
              pipelining (capture, inference, output), throughput approaches the
              slowest stage rather than the sum. A 25ms model can process 40 fps
              with proper pipelining instead of 30 fps sequential.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEMORY MANAGEMENT
            </p>
            <p style="margin-top: 0">
              Mobile devices have limited memory bandwidth. Image preprocessing
              (resize, normalize) can bottleneck if done naively. Best
              practices: (1) Resize in hardware (GPU texture sampling) rather
              than CPU. (2) Keep buffers pinned to avoid allocation overhead.
              (3) Use zero-copy paths where camera output feeds directly to
              accelerator input.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Profile memory bandwidth, not
              just compute. A model that fits in cache runs 2-3x faster than one
              that spills to main memory.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ACCELERATOR SELECTION
            </p>
            <p style="margin-top: 0">
              <strong>Mobile GPU:</strong> Best for floating point, 5-15 TOPS.{" "}
              <strong>NPU/DSP:</strong> Best for quantized models, 2-10 TOPS but
              more efficient. <strong>Edge TPU:</strong> Best for INT8, 4 TOPS
              with excellent power efficiency. Match your model format (FP16,
              INT8) to the accelerator strengths.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: bold; font-size: 15px">
                30 FPS Pipeline Budget: 33ms Total
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">1. Sensor Capture</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Hardware timing
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">2. Preprocessing</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Resize, normalize: <strong>1 to 3ms</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">3. Model Inference</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Neural network on NPU: <strong>10 to 25ms</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">4. Postprocessing</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    NMS, softmax: <strong>1 to 4ms</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">5. Action / Display</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    UI update, logging
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
                  33ms budget: capture (2-5ms) + preprocess (2-3ms) + inference
                  (15-25ms) + postprocess (2-5ms) + output (1-2ms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipeline parallelism: overlap stages so throughput = slowest
                  stage, not sum; 25ms model achieves 40fps pipelined
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory optimization: GPU resize, pinned buffers, zero-copy
                  paths; cache-fitting models run 2-3x faster
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Accelerator matching: mobile GPU for FP16, NPU/DSP for
                  quantized, Edge TPU for INT8
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
                  Break down the 33ms budget by stage: capture, preprocess,
                  inference, postprocess, output
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain pipeline parallelism: capture N+1 while processing N
                  achieves higher throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the memory bottleneck: cache-fitting models
                  dramatically faster than memory-spilling ones
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEdgeDeploymentRealTimeEdgePipelineFromSensorToActionIn33ms;
