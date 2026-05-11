import type { Component } from "solid-js";

const LessonObjectDetectionProductionTradeOffsWhenToChooseTwoStageVsSingleStageDetectors: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Trade-Offs: When to Choose Two Stage vs Single Stage
            Detectors
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Trade-off
            </p>
            <p style="margin-top: 0">
              Two stage detectors maximize accuracy at the cost of speed. Single
              stage detectors maximize speed at the cost of accuracy. Your
              choice depends on which constraint matters more for your
              application.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Two Stage
            </p>
            <p style="margin-top: 0">
              <strong>Accuracy critical applications:</strong> Medical imaging
              where missing a lesion has severe consequences. Quality inspection
              where false negatives mean defective products ship.
            </p>
            <p>
              <strong>Small object detection:</strong> Two stage detectors
              handle small objects better because the per-proposal refinement
              can focus on fine details. If objects occupy less than 1% of image
              area, two stage often wins.
            </p>
            <p>
              <strong>Batch processing acceptable:</strong> If results can wait
              100-200ms per image, the accuracy benefit justifies the latency
              cost. Overnight processing, non-real-time analysis.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Single Stage
            </p>
            <p style="margin-top: 0">
              <strong>Real-time requirements:</strong> Autonomous driving,
              robotics, live video analysis. If you need 30+ FPS, single stage
              is often the only viable option.
            </p>
            <p>
              <strong>Resource constrained deployment:</strong> Edge devices,
              mobile phones, embedded systems. Single stage models are smaller
              and faster, fitting tighter compute budgets.
            </p>
            <p>
              <strong>Acceptable accuracy margins:</strong> If 2-3% mAP
              difference does not change user experience or business outcomes,
              prefer the faster option.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework
            </p>
            <p style="margin-top: 0">
              <strong>Step 1:</strong> Define latency requirement. Below 50ms
              strongly favors single stage. Above 200ms opens two stage options.
            </p>
            <p>
              <strong>Step 2:</strong> Profile object sizes. Small objects favor
              two stage. Large objects show minimal accuracy difference.
            </p>
            <p>
              <strong>Step 3:</strong> Benchmark both on your data. Generic
              benchmarks may not reflect your specific distribution.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Do not assume two stage is
              always better for accuracy. Modern single stage detectors with
              large backbones close the gap significantly. Always benchmark on
              your specific use case.
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
                  Two stage for accuracy-critical and small object detection;
                  single stage for real-time and edge deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency threshold: below 50ms strongly favors single stage;
                  above 200ms enables two stage consideration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Small objects (less than 1% image area) often benefit from two
                  stage per-proposal refinement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always benchmark both approaches on your specific data -
                  generic benchmarks may not transfer
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
                  Interview Tip: Start trade-off discussion by asking about
                  latency requirements - this often decides the architecture
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention that modern single stage detectors
                  close the accuracy gap - the 2-5% difference is shrinking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonObjectDetectionProductionTradeOffsWhenToChooseTwoStageVsSingleStageDetectors;
