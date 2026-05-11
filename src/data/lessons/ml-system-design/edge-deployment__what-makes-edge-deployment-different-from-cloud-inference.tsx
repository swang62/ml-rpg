import type { Component } from "solid-js";

const LessonEdgeDeploymentWhatMakesEdgeDeploymentDifferentFromCloudInference: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Makes Edge Deployment Different from Cloud Inference?
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
                <strong>Edge deployment</strong> runs ML models directly on
                devices (phones, cameras, embedded systems) rather than sending
                data to cloud servers. This eliminates network latency, enables
                offline operation, and keeps sensitive data on-device.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY EDGE MATTERS
            </p>
            <p style="margin-top: 0">
              Cloud inference adds 50-200ms network round-trip latency. For
              real-time applications (autonomous driving, AR filters, robotics),
              this is unacceptable. A self-driving car traveling at 60 mph moves
              5 feet during a 50ms network delay. Edge inference runs in 10-50ms
              with zero network dependency. Privacy is another driver:
              processing faces or voices locally means sensitive data never
              leaves the device.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EDGE CONSTRAINTS
            </p>
            <p style="margin-top: 0">
              <strong>Compute:</strong> Mobile CPUs run at 2-5 TOPS (trillion
              operations per second) versus 100+ TOPS for server GPUs.{" "}
              <strong>Memory:</strong> 2-8 GB RAM shared with OS and apps versus
              32-80 GB on servers. <strong>Power:</strong> 5-15W total device
              power versus 300W for a GPU. <strong>Thermal:</strong> Sustained
              high compute causes throttling after 30-60 seconds on phones.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Edge models must be 10-100x
              smaller than cloud models while maintaining acceptable accuracy.
              This drives the need for specialized architectures.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TYPICAL LATENCY BUDGETS
            </p>
            <p style="margin-top: 0">
              Real-time video (30 fps): 33ms per frame. AR/VR: 11ms (90 fps).
              Autonomous driving perception: 50-100ms end-to-end. Voice
              activation: 200-500ms acceptable. These tight budgets leave no
              room for network calls.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; justify-content: space-around; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="display: block; margin-bottom: 8px; font-size: 14px">
                    Cloud Inference
                  </strong>
                  <div style="font-size: 13px; margin-top: 8px">
                    Latency: 200ms+
                  </div>
                  <div style="font-size: 13px">Power: Watts</div>
                  <div style="font-size: 13px">Memory: GBs</div>
                  <div style="font-size: 13px">Model: Heavy</div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="display: block; margin-bottom: 8px; font-size: 14px">
                    Edge Inference
                  </strong>
                  <div style="font-size: 13px; margin-top: 8px">
                    Latency: 10 to 25ms
                  </div>
                  <div style="font-size: 13px">Power: Milliwatts</div>
                  <div style="font-size: 13px">Memory: Under 50 MB</div>
                  <div style="font-size: 13px">Model: Optimized</div>
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
                  Edge eliminates 50-200ms network latency, enabling real-time
                  applications like autonomous driving and AR
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Constraints: 2-5 TOPS compute (vs 100+ server), 2-8 GB RAM,
                  5-15W power, thermal throttling after 30-60s
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Edge models must be 10-100x smaller than cloud models while
                  maintaining acceptable accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency budgets: 33ms for 30fps video, 11ms for AR/VR,
                  50-100ms for autonomous driving
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
                  When explaining edge vs cloud, use the self-driving car
                  example: 50ms delay = 5 feet of travel at 60 mph
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the four constraints: compute (TOPS), memory (GB),
                  power (watts), thermal (throttling)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention privacy as a driver: sensitive data (faces, voices)
                  never leaves the device
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEdgeDeploymentWhatMakesEdgeDeploymentDifferentFromCloudInference;
