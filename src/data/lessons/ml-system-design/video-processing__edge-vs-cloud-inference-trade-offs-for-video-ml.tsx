import type { Component } from "solid-js";

const LessonVideoProcessingEdgeVsCloudInferenceTradeOffsForVideoMl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Edge vs Cloud Inference Trade-offs for Video ML
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Edge Inference Advantages
            </p>
            <p style="margin-top: 0">
              <strong>Low latency:</strong> No network round-trip. Results in
              milliseconds rather than tens of milliseconds. Critical for
              time-sensitive applications like collision avoidance.
            </p>
            <p>
              <strong>Bandwidth savings:</strong> Process locally, send only
              results. A camera producing 10 Mbps of video might generate only 1
              Kbps of detection metadata. Reduces network infrastructure costs
              dramatically.
            </p>
            <p>
              <strong>Privacy preservation:</strong> Raw video never leaves the
              device. Only processed metadata is transmitted. Addresses
              regulatory concerns about video data handling.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Edge Inference Limitations
            </p>
            <p style="margin-top: 0">
              <strong>Model capability:</strong> Edge devices have limited
              compute. MobileNet-class models work; large transformers do not.
              Accuracy is 5-15% lower than cloud models on challenging cases.
            </p>
            <p>
              <strong>Update complexity:</strong> Thousands of distributed
              devices require over-the-air updates. Rolling out a new model
              takes days or weeks, not minutes.
            </p>
            <p>
              <strong>Hardware costs:</strong> Each device needs ML-capable
              hardware. At scale, per-device costs add up significantly.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cloud Inference Advantages
            </p>
            <p style="margin-top: 0">
              <strong>Model power:</strong> Use the largest, most accurate
              models available. No hardware constraints. Easy to upgrade models
              instantly across all streams.
            </p>
            <p>
              <strong>Centralized management:</strong> All compute in one place.
              Easier monitoring, debugging, and optimization.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework
            </p>
            <p style="margin-top: 0">
              <strong>Choose edge when:</strong> Latency below 50ms required.
              Bandwidth is expensive or unreliable. Privacy regulations restrict
              video transmission.
            </p>
            <p>
              <strong>Choose cloud when:</strong> Accuracy is paramount. Models
              change frequently. Centralized analysis of multiple cameras is
              needed.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; gap: 16px; justify-content: space-between">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: center">
                    Edge Inference
                  </div>
                  <div style="font-size: 11px; line-height: 1.6">
                    <strong>Latency:</strong> 20-50ms inference
                    <br />
                    <strong>Cost:</strong> $200-800/device
                    <br />
                    <strong>Bandwidth:</strong> Zero egress
                    <br />
                    <strong>Ops:</strong> OTA updates, distributed debug
                    <br />
                    <strong>Scale:</strong> Per device capacity
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: center">
                    Cloud Inference
                  </div>
                  <div style="font-size: 11px; line-height: 1.6">
                    <strong>Latency:</strong> +50-200ms network RTT
                    <br />
                    <strong>Cost:</strong> $0.50-2/TB egress
                    <br />
                    <strong>Bandwidth:</strong> Full video upload
                    <br />
                    <strong>Ops:</strong> Centralized deploy &amp; monitor
                    <br />
                    <strong>Scale:</strong> Elastic GPU autoscaling
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 12px">
                <strong>Hybrid:</strong> Edge detector (10ms) filters frames →
                Cloud verifier (100ms) on crops | 80% bandwidth reduction
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
                  Edge: millisecond latency, 10000x bandwidth reduction, privacy
                  preservation - but 5-15% lower accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cloud: best models, instant updates, centralized management -
                  but network latency and bandwidth costs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose edge for low latency (&lt;50ms), expensive bandwidth,
                  or privacy requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose cloud for maximum accuracy, frequent model updates, or
                  cross-camera analysis
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
                  Interview Tip: Frame edge vs cloud as a trade-off triangle:
                  latency, accuracy, cost - pick two
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention hybrid approach - edge for filtering,
                  cloud for complex analysis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonVideoProcessingEdgeVsCloudInferenceTradeOffsForVideoMl;
