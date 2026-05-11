import type { Component } from "solid-js";

const LessonCvEvaluationChoosingMetricsAndProtocolsForYourTask: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Metrics and Protocols for Your Task
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p>
              There is no universally correct evaluation setup. The right
              metrics and protocols depend on your task requirements, deployment
              constraints, and what failure modes matter most for your users.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              🎯 MATCHING METRICS TO TASK REQUIREMENTS
            </h3>
            <p>
              <strong>Detection vs counting:</strong> If you need accurate
              object counts (crowd estimation, inventory), optimize for recall
              and track count error. Missing objects hurts more than imprecise
              boxes.
            </p>
            <p>
              <strong>Detection vs tracking:</strong> If objects persist across
              frames (video surveillance, autonomous driving), add tracking
              metrics like MOTA and ID switches. A detector with perfect
              per-frame mAP might still produce jittery tracks.
            </p>
            <p>
              <strong>Detection vs segmentation:</strong> If you need precise
              boundaries (medical imaging, satellite analysis), IoU at the pixel
              level matters more than bounding box IoU. Report mask AP
              separately.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              📋 DESIGNING YOUR EVALUATION PROTOCOL
            </h3>
            <p>
              <strong>Dataset construction:</strong> Sample from your actual
              production distribution. Include hard cases proportionally - do
              not oversample edge cases or your metrics will be pessimistic.
              Document inclusion criteria so future evaluations are comparable.
            </p>
            <p>
              <strong>Labeling guidelines:</strong> Write explicit rules for
              ambiguous cases. Is a partially visible object labeled? What about
              reflections? How much occlusion before an object is not labeled?
              Ambiguity creates label noise.
            </p>
            <p>
              <strong>Reproducibility:</strong> Fix random seeds, document
              preprocessing, and version your evaluation code alongside your
              model code. A metric improvement means nothing if you cannot
              reproduce it.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              ⚡ PRACTICAL PROTOCOL DECISIONS
            </h3>
            <ul style="margin: 12px 0; padding-left: 24px">
              <li style="margin: 8px 0">
                <strong>Evaluation set size:</strong> Minimum 1000 images for
                stable mAP estimates. More for rare classes or when comparing
                models with small performance differences.
              </li>
              <li style="margin: 8px 0">
                <strong>Confidence intervals:</strong> Report standard deviation
                across multiple runs or bootstrap samples. A 0.5% mAP difference
                is noise, not signal.
              </li>
              <li style="margin: 8px 0">
                <strong>Latency measurement:</strong> Warm up the model, exclude
                first batch, measure on representative hardware. GPU cold start
                can add 100ms+ that disappears in steady state.
              </li>
            </ul>
            <div style="border-left: 4px solid; padding: 16px; border-radius: 8px; margin: 16px 0">
              <strong>✅ Best Practice:</strong> Document your evaluation
              protocol in a living document. Every time you make a decision
              about labeling rules or metric definitions, record it. Future you
              will thank present you when questions arise about historical
              results.
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
                  Match metrics to task requirements: counting needs recall,
                  tracking needs MOTA, segmentation needs mask AP
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sample evaluation data from production distribution;
                  oversampling edge cases makes metrics unrealistically
                  pessimistic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Write explicit labeling guidelines for ambiguous cases -
                  undocumented decisions become irreproducible label noise
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Report confidence intervals and use minimum 1000 images for
                  stable mAP estimates
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
                  Interview Tip: When designing evaluation, start by asking what
                  downstream decisions depend on the model output - this
                  determines which error types matter most
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention that latency benchmarks require warmup
                  - cold GPU startup can add 100ms+ that does not reflect
                  steady-state performance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvEvaluationChoosingMetricsAndProtocolsForYourTask;
