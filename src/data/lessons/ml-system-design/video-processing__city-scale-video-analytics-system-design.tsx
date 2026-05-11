import type { Component } from "solid-js";

const LessonVideoProcessingCityScaleVideoAnalyticsSystemDesign: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            City Scale Video Analytics System Design
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scale Challenges
            </p>
            <p style="margin-top: 0">
              A city-scale deployment might have 10,000+ cameras. At 30 FPS
              each, that is 300,000 frames per second requiring analysis. No
              single server handles this load. The system must distribute work
              across many machines while maintaining latency guarantees.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hierarchical Processing
            </p>
            <p style="margin-top: 0">
              <strong>Tier 1 - Edge processing:</strong> Simple models run on
              devices near cameras. Motion detection, basic filtering, frame
              selection. Reduces traffic to central servers by 90%+ by only
              sending interesting frames.
            </p>
            <p>
              <strong>Tier 2 - Regional servers:</strong> Medium-complexity
              models process selected frames from clusters of cameras. Object
              detection, initial classification. Handle 100-1000 cameras each.
            </p>
            <p>
              <strong>Tier 3 - Central analysis:</strong> Complex models for
              high-value analysis. Face recognition, behavior analysis,
              cross-camera tracking. Receives only high-priority frames from
              regional servers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Data Flow Optimization
            </p>
            <p style="margin-top: 0">
              <strong>Metadata instead of video:</strong> Once objects are
              detected, send bounding boxes, class labels, and confidence scores
              rather than raw frames. Reduces bandwidth by 100-1000x compared to
              streaming full video.
            </p>
            <p>
              <strong>Selective frame transmission:</strong> Only transmit
              frames containing events of interest. A parking lot camera might
              send 10 frames per hour instead of 108,000.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Coordination Challenges
            </p>
            <p style="margin-top: 0">
              <strong>Cross-camera tracking:</strong> Following an object across
              multiple cameras requires coordination. Regional servers maintain
              track databases. Hand-off protocols ensure continuity as objects
              move between camera coverage zones.
            </p>
            <p>
              <strong>Time synchronization:</strong> All cameras must share a
              common time reference. 100ms clock drift between cameras makes
              cross-camera analysis unreliable.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  10,000 Cameras → 20 Gbps Ingest
                </div>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; min-width: 140px; text-align: center">
                    <strong style="font-size: 12px">Raw Stream</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      1080p15 | 2 Mbps
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; align-self: center">
                    →
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; min-width: 140px; text-align: center">
                    <strong style="font-size: 12px">Downsample</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      640p5 + Motion Gate
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; align-self: center">
                    →
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; min-width: 140px; text-align: center">
                    <strong style="font-size: 12px">GPU Inference</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      100-300 FPS/GPU
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 12px; margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <strong>Resource Need:</strong> 100-200 GPUs for full coverage
                  | Queue depth: 2-4 frames | Target latency: &lt;1s
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
                  10,000 cameras at 30 FPS = 300,000 frames/second - requires
                  distributed processing architecture
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three-tier hierarchy: edge (motion filter), regional
                  (detection), central (complex analysis)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata transmission reduces bandwidth 100-1000x vs streaming
                  raw video
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time synchronization across cameras is critical - 100ms drift
                  breaks cross-camera analysis
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
                  Interview Tip: Start with scale numbers (cameras × FPS = total
                  frames) to show you understand the magnitude
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain hierarchical processing as progressive
                  filtering - each tier reduces load for the next
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonVideoProcessingCityScaleVideoAnalyticsSystemDesign;
