import type { Component } from "solid-js";

const LessonObjectDetectionVideoOptimizationAndMultiCameraDeploymentStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Video Optimization and Multi Camera Deployment Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Video Optimization Challenges
            </p>
            <p style="margin-top: 0">
              Running detection on every video frame is computationally
              expensive. At 30 FPS, you need 30 inferences per second per
              camera. Multiple cameras multiply this cost. Production systems
              need optimization strategies that maintain detection quality while
              reducing compute.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Frame Skipping and Interpolation
            </p>
            <p style="margin-top: 0">
              <strong>Keyframe detection:</strong> Run full detection every Nth
              frame (typically every 3-5 frames). Interpolate bounding boxes for
              skipped frames using motion vectors or simple linear
              interpolation. Reduces compute by 60-80% with minimal quality loss
              for slow-moving objects.
            </p>
            <p>
              <strong>Motion-based triggering:</strong> Only run detection when
              significant motion is detected. Use cheap background subtraction
              or frame differencing to identify motion regions. Detection runs
              only on frames with activity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Camera Deployment
            </p>
            <p style="margin-top: 0">
              <strong>Centralized inference:</strong> Stream video from multiple
              cameras to a central GPU server. Batch frames from different
              cameras together for efficient GPU utilization. Requires
              low-latency network and sufficient bandwidth.
            </p>
            <p>
              <strong>Edge inference:</strong> Deploy small models on edge
              devices co-located with cameras. Only send metadata (detected
              objects, boxes, confidences) to central system. Reduces bandwidth
              by 100x+ compared to streaming video.
            </p>
            <p>
              <strong>Hybrid approach:</strong> Run fast, lightweight detection
              at the edge for filtering. Send interesting frames to central
              server for high-accuracy analysis. Balances latency, bandwidth,
              and accuracy.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Object Tracking Integration
            </p>
            <p style="margin-top: 0">
              Tracking assigns consistent IDs to objects across frames. Instead
              of detecting every frame, detect periodically and track between
              detections. Tracking is 10-50x faster than detection. The
              combination provides real-time performance with detection-level
              accuracy.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Detection answers what is in the
              frame. Tracking answers where did it go. Production video systems
              need both, with tracking doing the heavy lifting between detection
              keyframes.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="font-weight: bold; margin-bottom: 12px; text-align: center; font-size: 15px">
                Video Detection + Tracking Pipeline
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Frame 1, 4, 7, 10...</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Full Detection (10 Hz)
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    Frames 2, 3, 5, 6, 8, 9...
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Tracking Only (30 Hz)
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Result</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    67% compute reduction
                    <br />
                    Full frame rate output
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
                  Frame skipping with interpolation reduces compute 60-80% with
                  minimal quality loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Motion-based triggering only runs detection when activity is
                  present
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Edge inference reduces bandwidth 100x+ by sending metadata
                  instead of video streams
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tracking is 10-50x faster than detection - use detection
                  periodically, track between
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
                  Interview Tip: Discuss the detection + tracking pattern -
                  detect every Nth frame, track the rest
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention edge vs centralized trade-off: latency
                  and bandwidth vs model capability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonObjectDetectionVideoOptimizationAndMultiCameraDeploymentStrategies;
