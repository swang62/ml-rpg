import type { Component } from "solid-js";

const LessonContinuousTrainingWhatIsContinuousTrainingAndModelRefresh: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Continuous Training and Model Refresh?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Continuous training (CT)</strong> transforms ML from a
                one time deployment into a closed loop control system. It
                automates retraining and redeployment pipelines that monitor
                model health, decide when to retrain, validate candidates
                offline and online, and gradually shift traffic only when
                metrics improve.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Models Decay
            </p>
            <p style="margin-top: 0">
              The core problem is that production models decay over time: user
              behavior shifts, new products launch, competitors change tactics,
              and seasonal patterns evolve. A fraud model trained on pre holiday
              traffic will miss new attack vectors during Black Friday. A
              recommendation model trained three months ago cannot surface
              content that did not exist then.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Freshness Dimensions
            </p>
            <p style="margin-top: 0">
              Continuous training spans two freshness dimensions. Data freshness
              measures how quickly new events become features (streaming
              aggregates updated every 5 minutes versus daily batch features).
              Model freshness measures how quickly new patterns make it into
              model weights (hourly incremental updates versus weekly full
              retrains).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scale Examples
            </p>
            <p style="margin-top: 0">
              Netflix retrains homepage personalization models nightly on
              hundreds of millions of member interactions. Uber runs thousands
              of models for ride matching, ETA prediction, and fraud detection
              with retraining cadences from hours to days. Meta processes tens
              of thousands of training jobs daily. The key is balancing
              freshness (reacting to drift quickly) against stability (avoiding
              metric noise and operational churn).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Monitor Drift</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    PSI &gt; 0.2 or AUC drop &gt; 0.02
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Trigger Retrain</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Daily schedule or threshold breach
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">
                    Validate &amp; Rollout
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Canary 5% → 100% if metrics pass
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Production Serving</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    p95 latency &lt; 30ms
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
                  Data freshness is how quickly new events become features
                  (streaming updates every 5 minutes versus daily batch), while
                  model freshness is how quickly new patterns update weights
                  (hourly incremental versus weekly full retrain)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix retrains homepage personalization nightly on hundreds
                  of millions of interactions with inference latency under 30
                  milliseconds p95, balancing freshness with serving cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber runs thousands of models with cadences from hours (fraud
                  during peak events) to days (pricing models), triggering
                  retrains on drift thresholds like Population Stability Index
                  (PSI) exceeding 0.2
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The core trade off is freshness versus stability: frequent
                  retraining reacts quickly to drift but risks overfitting to
                  short term noise and metric flapping, while slower cadence is
                  more stable but risks stale predictions during regime shifts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical online inference Service Level Objectives (SLOs) are
                  p95 latency 10 to 30 milliseconds per model stage, with total
                  chains under 50 to 200 milliseconds depending on product
                  requirements
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
                  Meta processes tens of thousands of training jobs daily with
                  some embedding layers updating continuously (minutes to hours)
                  and full models retraining daily, maintaining p99 latency
                  under 10 to 20 milliseconds per model stage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Smart Pricing retrains weekly to capture seasonality
                  and event driven demand shifts, with nearline feature
                  aggregation windows of 5 to 60 minutes depending on feature
                  volatility
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContinuousTrainingWhatIsContinuousTrainingAndModelRefresh;
