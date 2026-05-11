import type { Component } from "solid-js";

const LessonShadowModeDeploymentWhatIsShadowModeDeploymentInMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Shadow Mode Deployment in ML Systems?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Shadow Mode Deployment:</strong> Running a new model
              alongside the production model, processing real traffic but not
              returning predictions to users. The shadow model receives the same
              inputs as production, generates predictions, and logs results for
              analysis—without any user impact if the new model is broken.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Validation Gap
            </p>
            <p>
              Offline evaluation (test sets, cross-validation) cannot fully
              predict production performance. The test set may not represent
              current traffic distribution. Edge cases that never appeared in
              training surface in production. Latency acceptable in batch
              evaluation may be unacceptable at scale. Shadow mode bridges this
              gap: the model runs on real production traffic, with real latency
              constraints, handling real edge cases—but mistakes are invisible
              to users because shadow predictions are discarded.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Shadow Mode Validates
            </p>
            <p>
              <strong>Prediction quality:</strong> Compare shadow predictions
              against production model and against actual outcomes (when
              available). Does the shadow model agree with production? When they
              disagree, which is correct? <strong>Latency:</strong> Does the
              shadow model meet latency SLAs under production load?{" "}
              <strong>Resource usage:</strong> CPU, memory, GPU utilization at
              real traffic volume. <strong>Error handling:</strong> How does the
              model handle malformed inputs, missing features, edge cases that
              training data did not cover? Shadow mode answers these questions
              before users are affected.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Shadow Mode
            </p>
            <p>
              Shadow mode is valuable but not free—it doubles inference cost
              during validation. Use it for: major model changes (new
              architecture, significant retraining), models with high-stakes
              predictions (fraud detection, medical diagnosis), and systems
              where rollback is costly or slow. Skip shadow mode for: minor
              model updates (hyperparameter tuning), low-stakes predictions, or
              when canary deployment provides sufficient validation.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Benefit:</strong> Shadow mode separates "can we serve
              this model" from "should users see this model" - validating
              operational readiness before business impact.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Incoming Request
                    <br />
                    40K req/sec peak
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓ Mirror</div>
                <div style="display: flex; gap: 24px; align-items: flex-start">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 14px">Live Model</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Serves users
                      <br />
                      p99: 130ms
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 14px">Shadow Model</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Logs only
                      <br />
                      No user impact
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Evaluation Stream</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Join with labels later
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
                  Shadow model processes real traffic but predictions are
                  discarded, not shown to users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Validates prediction quality, latency, resource usage, and
                  error handling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use for major changes and high-stakes predictions; skip for
                  minor updates
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
                  Compare shadow vs production predictions and check which
                  matches actual outcomes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow mode doubles inference cost during validation period
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonShadowModeDeploymentWhatIsShadowModeDeploymentInMlSystems;
