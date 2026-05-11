import type { Component } from "solid-js";

const LessonVideoProcessingTemporalDownsamplingAndMotionGatingForCostEfficiency: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Temporal Downsampling and Motion Gating for Cost Efficiency
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Temporal Downsampling
            </p>
            <p style="margin-top: 0">
              Not every frame needs analysis. Consecutive video frames are
              highly similar. Running detection on every frame wastes 90%+ of
              compute on redundant analysis. Smart frame selection reduces cost
              without sacrificing detection quality.
            </p>
            <p>
              <strong>Fixed interval sampling:</strong> Analyze every Nth frame
              (e.g., every 5th frame). Simple but misses fast events. A person
              walking through the frame in 3 frames gets detected; a falling
              object in 2 frames might be missed.
            </p>
            <p>
              <strong>Adaptive sampling:</strong> Analyze more frequently during
              activity, less during quiet periods. Activity level determines
              sampling rate dynamically.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Motion Gating
            </p>
            <p style="margin-top: 0">
              Only run expensive ML models when motion is present. A parking lot
              at 3 AM sees no activity for hours. Running detection continuously
              wastes resources.
            </p>
            <p>
              <strong>Two-stage approach:</strong> Run cheap motion detection
              (frame differencing, background subtraction) on every frame. Only
              trigger ML inference when motion exceeds threshold. Reduces ML
              inference by 80-95% during quiet periods.
            </p>
            <p>
              <strong>Motion region cropping:</strong> When motion occurs, only
              analyze the active region rather than the full frame. A person in
              the corner of a 4K frame can be cropped to 640x480 for faster
              inference.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Impact
            </p>
            <p style="margin-top: 0">
              Combining temporal downsampling and motion gating typically
              reduces GPU costs by 5-10x compared to naive every-frame
              processing. A system that would need 100 GPUs might run on 10-20
              GPUs with smart filtering.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The goal is not to process every
              frame. The goal is to detect every event. Smart filtering achieves
              the same detection outcomes with 90% less compute.
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
                  Temporal downsampling analyzes every Nth frame - 90%+ of
                  consecutive frames are redundant
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Motion gating runs cheap detection first, triggers ML only
                  when activity present - 80-95% reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combined filtering reduces GPU costs 5-10x vs naive
                  every-frame processing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Goal is detecting every event, not processing every frame -
                  smart filtering achieves both
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
                  Interview Tip: Frame cost reduction in terms of events
                  detected, not frames analyzed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention two-stage architecture - cheap filter
                  triggers expensive analysis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonVideoProcessingTemporalDownsamplingAndMotionGatingForCostEfficiency;
