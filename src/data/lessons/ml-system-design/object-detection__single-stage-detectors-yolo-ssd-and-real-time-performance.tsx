import type { Component } from "solid-js";

const LessonObjectDetectionSingleStageDetectorsYoloSsdAndRealTimePerformance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Single Stage Detectors: YOLO, SSD, and Real Time Performance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Single Stage Detection Approach
            </p>
            <p style="margin-top: 0">
              Single stage detectors predict bounding boxes and class labels in
              one pass through the network. No separate region proposal step.
              The model directly outputs final detections from a dense grid of
              anchor boxes. This unified approach trades some accuracy for
              significant speed gains.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Single Stage Works
            </p>
            <p style="margin-top: 0">
              Divide the image into a grid (e.g., 13x13 cells). Each cell
              predicts B bounding boxes (typically 3-9 per cell). For each box,
              predict: center offset from cell, width, height, objectness score,
              and class probabilities. All predictions happen simultaneously in
              one forward pass.
            </p>
            <p>
              <strong>Dense prediction:</strong> A 416x416 image with three
              scales might produce 10,000+ predictions. Most are background.
              Non-maximum suppression filters overlapping detections and low
              confidence predictions to produce final output.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              YOLO Architecture Principles
            </p>
            <p style="margin-top: 0">
              YOLO (You Only Look Once) processes the entire image globally
              rather than examining regions sequentially. The network sees full
              context when making predictions. This helps with objects that span
              multiple regions and reduces false positives from partial views.
            </p>
            <p>
              <strong>Multi-scale detection:</strong> Modern YOLO versions
              predict at multiple feature map resolutions. Small objects
              detected at high resolution maps, large objects at low resolution.
              This addresses early YOLO versions weakness on small object
              detection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Performance Characteristics
            </p>
            <p style="margin-top: 0">
              <strong>Speed:</strong> 5-30ms per image on modern GPUs. Real-time
              detection at 30-60+ FPS is achievable.
            </p>
            <p>
              <strong>Accuracy:</strong> 2-5% lower mAP than two stage detectors
              on challenging benchmarks. The gap narrows with newer
              architectures and larger backbones.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; align-items: stretch">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px; flex: 1">
                  <div style="font-weight: bold; margin-bottom: 8px; text-align: center; font-size: 14px">
                    Two Stage
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <strong>Speed:</strong> 5–10 FPS
                    <br />
                    <strong>Latency:</strong> 80–150 ms
                    <br />
                    <strong>Accuracy:</strong> Higher mAP
                    <br />
                    <strong>Use case:</strong> Offline processing, small objects
                    <br />
                    <strong>Example:</strong> Meta content moderation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px; flex: 1">
                  <div style="font-weight: bold; margin-bottom: 8px; text-align: center; font-size: 14px">
                    Single Stage
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <strong>Speed:</strong> 30–100+ FPS
                    <br />
                    <strong>Latency:</strong> 7–20 ms
                    <br />
                    <strong>Accuracy:</strong> Competitive mAP
                    <br />
                    <strong>Use case:</strong> Real time, edge deployment
                    <br />
                    <strong>Example:</strong> Tesla cameras, retail analytics
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
                  Single stage predicts boxes and classes in one pass - no
                  separate proposal step
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dense prediction: 10,000+ predictions per image, filtered by
                  non-maximum suppression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single stage runs at 5-30ms (30-60+ FPS) vs 50-200ms for two
                  stage detectors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-scale detection at different resolutions addresses small
                  object weakness
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
                  Interview Tip: Explain single stage as latency-optimized - one
                  unified pass trades accuracy for speed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention that YOLO sees global context - it
                  processes the full image rather than sequential regions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonObjectDetectionSingleStageDetectorsYoloSsdAndRealTimePerformance;
