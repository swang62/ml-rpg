import type { Component } from "solid-js";

const LessonEdgeDeploymentEdgeDeploymentFailureModesQuantizationDriftThermalThrottlingAndNmsExplosions: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Edge Deployment Failure Modes: Quantization Drift, Thermal
            Throttling, and NMS Explosions
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUANTIZATION DRIFT
            </p>
            <p style="margin-top: 0">
              Quantization reduces weights from 32-bit floats to 8-bit integers,
              saving 4x memory and enabling faster inference. But quantization
              is not free. Weights get rounded to the nearest representable
              value, introducing error. For well-behaved models, accuracy drops
              0.5-2%. For models with outlier weights or narrow distributions,
              drops can reach 5-10%. <strong>Detection:</strong> Compare FP32
              and INT8 accuracy on your validation set before deployment. If the
              gap exceeds 2%, apply quantization-aware training.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THERMAL THROTTLING
            </p>
            <p style="margin-top: 0">
              Mobile devices throttle CPU/GPU frequency when temperature exceeds
              thresholds (typically 40-45°C for skin temperature). After 30-60
              seconds of continuous inference, performance can drop 30-50%. What
              worked in development (short tests) fails in production (sustained
              load). <strong>Mitigation:</strong> Benchmark sustained
              performance (5+ minute runs), design for throttled state, or add
              cooling for embedded systems.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Peak performance benchmarks are
              misleading. Design for sustained (thermally throttled)
              performance, which can be 30-50% lower.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              NMS EXPLOSIONS
            </p>
            <p style="margin-top: 0">
              Object detection uses Non-Maximum Suppression (NMS) to remove
              duplicate detections. NMS runtime is O(n²) where n is the number
              of raw detections. Normal scenes produce 50-200 detections (fast).
              Crowded scenes with many small objects can produce 5,000+
              detections, causing NMS to spike from 2ms to 200ms+.{" "}
              <strong>Mitigation:</strong> Limit maximum detections (top-k
              before NMS), use batched NMS, or switch to NMS-free architectures
              like DETR.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEMORY SPIKES
            </p>
            <p style="margin-top: 0">
              Intermediate activations can exceed model size by 10-50x for
              high-resolution inputs. A model using 50MB weights might need
              500MB peak memory. On constrained devices, this causes OOM crashes
              or forces slower swap-based execution.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantization drift: well-behaved models lose 0.5-2%, outlier
                  weights can lose 5-10%; compare FP32 vs INT8 before deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Thermal throttling: 30-50% performance drop after 30-60
                  seconds sustained load; design for throttled state
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NMS explosions: O(n²) runtime, 50 detections = 2ms, 5000
                  detections = 200ms+; use top-k limiting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory spikes: activations can be 10-50x model size at high
                  resolution; can cause OOM crashes
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
                  Explain quantization drift: compare FP32 and INT8 accuracy,
                  apply quantization-aware training if gap &gt;2%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe thermal throttling: short benchmarks are misleading,
                  test 5+ minute sustained runs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention NMS as a latency trap: O(n²) means crowded scenes
                  explode; limit max detections before NMS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEdgeDeploymentEdgeDeploymentFailureModesQuantizationDriftThermalThrottlingAndNmsExplosions;
