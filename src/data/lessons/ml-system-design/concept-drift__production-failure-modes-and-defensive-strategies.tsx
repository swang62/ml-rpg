import type { Component } from "solid-js";

const LessonConceptDriftProductionFailureModesAndDefensiveStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Failure Modes and Defensive Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SILENT DEGRADATION
            </p>
            <p>
              The most dangerous failure mode: model performance degrades but no
              alerts fire. This happens when drift detection thresholds are too
              loose, when you are monitoring the wrong metrics, or when drift
              affects only specific segments that aggregate metrics mask.
            </p>
            <p>
              Prevention: set tight thresholds and accept some false alerts.
              Monitor multiple metrics at multiple granularities. Track
              segment-level metrics, not just aggregates. Review drift
              dashboards regularly even when no alerts fire.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CATASTROPHIC FORGETTING
            </p>
            <p>
              When retraining on recent data only, the model may forget patterns
              from older data that are still relevant. A model retrained during
              a holiday season may forget normal behavior and perform poorly
              when holidays end.
            </p>
            <p>
              Prevention: maintain historical data in training. Use replay
              buffers that sample from all time periods. Weight recent data
              higher but do not exclude old data entirely.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FEEDBACK LOOPS
            </p>
            <p>
              Model predictions affect user behavior, which generates training
              data, which trains the model. If the model is biased, it
              reinforces its own bias. Recommendation models can create filter
              bubbles. Fraud models can push fraudsters to new patterns that
              become harder to detect.
            </p>
            <p>
              Detection: track diversity metrics. Are recommendations becoming
              more homogeneous? Are fraud patterns concentrating in specific
              categories? Breaking feedback loops requires exploration: reserve
              5-10% of traffic for random recommendations to collect unbiased
              data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FALSE DRIFT ALARMS
            </p>
            <p>
              Not all detected drift is real. Temporary anomalies, data quality
              issues, or logging bugs can trigger false alarms. Retraining on
              bad data makes things worse.
            </p>
            <p>
              Defense: verify drift before acting. Cross-check multiple drift
              signals. Investigate root cause before triggering retraining. Have
              human-in-the-loop for significant retraining decisions.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Build defense in depth:
              multiple drift signals, segment-level monitoring, regular manual
              review, and human approval for major model changes.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px">
                  Feedback Loop Failure
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Model downranks Item A</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Users never see Item A</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>No positive labels collected</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Model learns Item A performs poorly</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center; margin-top: 4px">
                  ↻ Loop reinforces
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
                  Silent degradation: drift detection thresholds too loose or
                  wrong metrics monitored; track segment-level metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Catastrophic forgetting: retraining on recent data only loses
                  historical patterns; use replay buffers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops: model predictions influence training data; use
                  exploration (5-10% random) to break the loop
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
                  Interview Tip: Explain feedback loops in recommendations—how
                  models create filter bubbles.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe defense-in-depth: multiple drift
                  signals, segment monitoring, human approval.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonConceptDriftProductionFailureModesAndDefensiveStrategies;
