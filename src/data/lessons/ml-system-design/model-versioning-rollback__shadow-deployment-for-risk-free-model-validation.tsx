import type { Component } from "solid-js";

const LessonModelVersioningRollbackShadowDeploymentForRiskFreeModelValidation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Shadow Deployment for Risk Free Model Validation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Shadow Mode Works
            </p>
            <p style="margin-top: 0">
              Shadow deployment duplicates 100 percent of production requests to
              the new model but discards its predictions, serving only the
              baseline model's outputs to users. This validates inference
              latency, feature availability, schema compatibility, and resource
              consumption under real traffic without any user impact. The new
              model runs in production conditions, receiving exactly the same
              requests as the baseline, but its outputs are logged and analyzed
              rather than returned to users.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Shadow Validates
            </p>
            <p style="margin-top: 0">
              Netflix uses shadow mode to validate prediction parity and latency
              impact before canary. Engineers compare shadow outputs against
              baseline predictions and ground truth (when available) to detect
              distribution shifts or calibration drift. At 10,000 QPS, a 24 hour
              shadow generates 864 million paired predictions for offline
              analysis. Key metrics include: prediction distribution divergence
              (KL divergence, histogram distance), calibration curve alignment,
              latency percentiles, memory usage, and error rate.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Duration and Cost
            </p>
            <p style="margin-top: 0">
              Airbnb runs multi day shadows for ranking and search changes to
              observe feature drift, infrastructure cost deltas, and edge case
              behavior that stress tests might miss. The cost is roughly 2x
              compute for the inference tier during the shadow window, which
              typically runs for hours to days depending on risk. At Uber's
              scale (millions of predictions per second), shadow mode can add
              tens of thousands of dollars per day in compute costs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Shadow
            </p>
            <p style="margin-top: 0">
              Use shadow for high risk changes like model family switches (going
              from gradient boosted trees to deep neural networks), feature
              schema migrations, infrastructure changes (new serving framework,
              new hardware), or models with critical business impact. For low
              risk incremental updates, skip directly to 1 percent canary to
              save cost and accelerate rollout. The key question: what is the
              cost of a regression reaching production versus the cost of
              extended shadow validation?
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Production Request</strong>
                  <br />
                  <span style="font-size: 12px">10,000 QPS</span>
                </div>
                <div style="display: flex; gap: 16px; align-items: center">
                  <div style="font-size: 24px; font-weight: bold">↙</div>
                  <div style="font-size: 24px; font-weight: bold">↘</div>
                </div>
                <div style="display: flex; gap: 16px">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 13px">Baseline Model</strong>
                    <br />
                    <span style="font-size: 11px">
                      Output served
                      <br />
                      to user
                    </span>
                  </div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                    <strong style="font-size: 13px">Shadow Model</strong>
                    <br />
                    <span style="font-size: 11px">
                      Output logged,
                      <br />
                      discarded
                    </span>
                  </div>
                </div>
                <div style="font-size: 11px; text-align: center; max-width: 320px; margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <strong>24hr shadow:</strong> 864M paired predictions
                  <br />
                  Validates latency, schema, drift with zero user risk
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
                  Shadow deployment mirrors 100 percent of production traffic to
                  the new model but serves only baseline predictions to users,
                  enabling full validation with zero user impact
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical cost is 2x inference compute; at 10,000 QPS a 24 hour
                  shadow generates 864 million paired predictions for comparing
                  outputs, latency distributions, and feature availability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use shadow for high risk changes like model family switches
                  (gradient boosted trees to neural networks), feature schema
                  migrations, or infrastructure overhauls where canary blast
                  radius is too risky
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow reveals issues missed by offline tests: feature
                  availability gaps under load, cache interactions, tail latency
                  under contention, and real distribution drift that synthetic
                  data cannot capture
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For low risk incremental updates (hyperparameter tuning, minor
                  retraining), skip shadow and go directly to 1 percent canary
                  to save compute cost and accelerate rollout timelines
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
                  Airbnb runs multi day shadows for search ranking changes,
                  observing infrastructure cost deltas and edge cases before 5
                  percent canary; this caught a feature backfill gap that would
                  have caused 15 percent fallback rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix uses shadow to validate prediction parity between
                  baseline and new models, comparing outputs against ground
                  truth when available to detect calibration drift before any
                  traffic shift
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelVersioningRollbackShadowDeploymentForRiskFreeModelValidation;
