import type { Component } from "solid-js";

const LessonCvEvaluationProductionEvaluationPipelinesScaleCostAndOperatingPoints: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Evaluation Pipelines: Scale, Cost, and Operating Points
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p>
              Research metrics like mAP tell you how well a model ranks
              detections, but production systems need different evaluation
              approaches. You must measure what actually matters to users and
              business outcomes at scale.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              ⚖️ RESEARCH VS PRODUCTION METRICS
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0">
              <div style="padding: 16px; border-radius: 8px; border: 2px solid">
                <strong>Research Metrics</strong>
                <br />
                <span style="font-size: 0.95em">
                  mAP across all classes
                  <br />
                  IoU thresholds
                  <br />
                  Offline benchmark scores
                  <br />
                  Fixed test datasets
                </span>
              </div>
              <div style="padding: 16px; border-radius: 8px; border: 2px solid">
                <strong>Production Metrics</strong>
                <br />
                <span style="font-size: 0.95em">
                  Critical class recall
                  <br />
                  False positive rate per hour
                  <br />
                  Latency percentiles
                  <br />
                  User-reported issues
                </span>
              </div>
            </div>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              🎯 CHOOSING YOUR OPERATING POINT
            </h3>
            <p>
              The PR curve gives you many possible operating points. Choosing
              the right one depends on your failure costs:
            </p>
            <ul style="margin: 12px 0; padding-left: 24px">
              <li style="margin: 8px 0">
                <strong>High recall operating point:</strong> Accept more false
                positives to catch nearly everything. Use when misses are
                expensive (safety systems, security alerts).
              </li>
              <li style="margin: 8px 0">
                <strong>High precision operating point:</strong> Only surface
                confident detections. Use when false alarms cause user
                frustration or wasted downstream processing.
              </li>
              <li style="margin: 8px 0">
                <strong>Balanced operating point:</strong> F1 score
                maximization. Use when both types of errors are roughly equally
                costly.
              </li>
            </ul>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              📊 PRODUCTION EVALUATION PIPELINE
            </h3>
            <p>
              A robust evaluation system runs continuously, not just before
              deployment:
            </p>
            <p>
              <strong>Ground truth collection:</strong> Sample production
              predictions for human review. Label a representative slice daily
              or weekly. Track labeler agreement to catch ambiguous cases.
            </p>
            <p>
              <strong>Slice analysis:</strong> Break down metrics by scene type,
              lighting conditions, object size, and geographic region. A model
              with 90% overall mAP might have 60% mAP on night scenes - slice
              analysis reveals these gaps.
            </p>
            <p>
              <strong>Regression detection:</strong> Compare new model versions
              against baselines on the same evaluation set. Flag regressions in
              any critical slice before deployment.
            </p>
            <div style="border-left: 4px solid; padding: 16px; border-radius: 8px; margin: 16px 0">
              <strong>⚠️ Cost Reality:</strong> Human labeling is expensive.
              Budget 2-5 minutes per image for bounding boxes, longer for
              segmentation. Plan labeling costs into your evaluation pipeline
              design - you cannot evaluate what you cannot label.
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
                  Production metrics differ from research metrics - measure
                  false positives per hour, critical class recall, and latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operating point selection depends on failure costs: high
                  recall for safety, high precision for user experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slice analysis reveals hidden weaknesses - overall mAP can
                  mask poor performance on specific conditions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous evaluation with fresh ground truth catches drift
                  that static benchmarks miss
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
                  Interview Tip: When asked about metric choice, explain the
                  cost asymmetry - missing a pedestrian vs false-alarming on a
                  shadow have very different consequences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention labeling costs as a practical
                  constraint - sophisticated evaluation requires ground truth,
                  and ground truth requires human time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvEvaluationProductionEvaluationPipelinesScaleCostAndOperatingPoints;
