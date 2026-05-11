import type { Component } from "solid-js";

const LessonContinuousTrainingFailureModesInContinuousTrainingPipelines: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes in Continuous Training Pipelines
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Serving Skew
            </p>
            <p style="margin-top: 0">
              Production continuous training systems fail in predictable ways.
              Training serving skew is the most common: feature definitions
              diverge between offline and online code paths. Airbnb discovered a
              ranking model performed 15 percent worse in production because an
              online aggregation window was 60 minutes instead of the 24 hour
              window used in training. The fix is a single declarative feature
              definition in a feature store with automated parity validation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feedback Loops
            </p>
            <p style="margin-top: 0">
              Feedback loops create self reinforcing bias. Netflix
              recommendation models that show popular content make it more
              popular, skewing training data and reducing diversity. This causes
              filter bubbles and long term engagement drops. Mitigate with
              exploration mechanisms (epsilon greedy with 5 to 10 percent random
              recommendations), propensity score reweighting to debias training
              data, and counterfactual evaluation using historical logs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Label Delay and Leakage
            </p>
            <p style="margin-top: 0">
              Label delay and leakage are subtle but catastrophic. Meta ad
              models predict conversions that occur 1 to 7 days after click, but
              training on all available labels at snapshot time includes future
              information. The solution is strict event time semantics: only use
              labels available at serving time, implement watermarking to handle
              late arriving labels, and validate with time based splits rather
              than random splits.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Data Quality Issues
            </p>
            <p style="margin-top: 0">
              Data outages and schema drift silently corrupt features: add
              schema contracts with type checking and range validation, canary
              new features on 1 percent of training data before full rollout,
              and abort training jobs when validation metrics exceed thresholds.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew causes 10 to 20 percent accuracy drops
                  when feature definitions diverge: Airbnb caught a 60 minute
                  online aggregation window versus 24 hour offline window, fixed
                  by unified feature store with L2 distance monitoring (alert
                  when exceeding 0.01 for normalized features)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops create self reinforcing bias: Netflix
                  recommendations showing popular content make it more popular,
                  requiring 5 to 10 percent epsilon greedy exploration,
                  propensity score reweighting, and counterfactual evaluation to
                  prevent filter bubbles
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Label delay and leakage require strict event time semantics:
                  Meta ad conversion models must only use labels available at
                  serving time (not all labels at training snapshot time),
                  validated with time based splits showing 15 to 30 percent
                  accuracy drop if violated
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retraining storms from false positive drift detection waste
                  compute: Airbnb requires drift sustained over 100,000 samples
                  with hysteresis and multiple signal agreement (PSI, KS test,
                  calibration error) before triggering to prevent transient
                  spike reactions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data outages and schema drift silently corrupt features:
                  implement schema contracts with type and range validation,
                  canary new features on 1 percent of training data, abort jobs
                  when null rate exceeds 5 percent or distribution stats breach
                  thresholds
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
                  Uber fraud detection faced adversarial feedback loops where
                  blocking one attack vector caused fraudsters to shift tactics,
                  requiring adversarial training with synthetic attack patterns
                  and robust loss functions to handle distribution shift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta discovered a conversion prediction model leaked future
                  information by including conversions that occurred after the
                  prediction timestamp, causing 25 percent accuracy drop in
                  production fixed by event time windowing with 7 day label
                  delay handling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContinuousTrainingFailureModesInContinuousTrainingPipelines;
