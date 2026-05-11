import type { Component } from "solid-js";

const LessonPointInTimeCorrectnessTrainServeSkewFromPitViolations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Train Serve Skew from PIT Violations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Train Serve Skew Is
            </p>
            <p style="margin-top: 0">
              Train serve skew occurs when offline training features differ
              systematically from online serving features, causing models to
              underperform in production despite strong offline metrics. Point
              in Time (PIT) violations are a primary cause: if training uses
              future leaked data or serving uses stale data, the distribution
              mismatch degrades accuracy by 5 to 20 percent in production
              systems.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Processing Time vs Event Time Bug
            </p>
            <p style="margin-top: 0">
              The most common violation is joining on processing time instead of
              event time during training. A fraud feature indicating
              "transactions in last hour" computed at 2pm but joined using 3pm
              processing time includes data from the future hour. The model
              learns to exploit this leaked signal, achieving inflated offline
              AUC that collapses when serving with true real time features.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stale Feature Serving
            </p>
            <p style="margin-top: 0">
              The inverse problem occurs when online serving uses stale features
              while training used fresh data. If batch materialization runs
              daily but training labels are hourly, the serving path sees
              features 12 hours staler on average than training. Models learn to
              expect fresh signals and degrade when those signals are delayed.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Detection Methods
            </p>
            <p style="margin-top: 0">
              Compare offline and online feature distributions using PSI
              (Population Stability Index) or KL divergence. A PSI above 0.2 to
              0.3 indicates meaningful drift warranting investigation. Log
              serving requests with features, replay them through offline
              pipelines, and diff the results. LinkedIn runs continuous shadow
              comparison detecting divergence before it impacts business
              metrics.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Prevention Architecture
            </p>
            <p style="margin-top: 0">
              Use unified transformation logic compiled to both batch and
              streaming pipelines. Version feature definitions and pin model
              deployments to specific versions. Inject synthetic timestamp
              jitter during training to build robustness to minor temporal
              misalignment.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Train-Serve Skew Example
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Offline Training (Leaked)
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Label time: 2:00 PM
                    <br />
                    Feature: fraud_score = 0.95
                    <br />
                    (event_time 2:05 PM, 5 min future leak)
                  </div>
                </div>
                <div style="display: flex; gap: 10px; align-items: center; justify-content: center">
                  <div style="font-size: 24px; font-weight: bold">≠</div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Online Serving (Correct)
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Prediction time: 2:00 PM
                    <br />
                    Feature: fraud_score = 0.40
                    <br />
                    (only data available at 2:00 PM)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Precision drops 0.85 → 0.70
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    (15% degradation from skew)
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
                  Joining on processing time instead of event time leaks future
                  data into training, causing 5 to 20 percent accuracy drop in
                  production when the future signal is unavailable online
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Replication lag between offline and online stores creates
                  freshness skew: models trained on 30 second lag features but
                  served with 5 minute lag see 10 to 15 percent lower CTR
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backfills that apply corrected values as of now instead of
                  original event timestamp contaminate past training rows with
                  future knowledge, breaking reproducibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor train serve consistency by comparing offline
                  recomputed features versus online served features on same
                  traffic slice, alerting when more than 5 percent differ
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dual writes to offline and online stores with p99 replication
                  lag of 1 to 5 minutes require either accepting freshness gap
                  or implementing synchronous writes at higher latency cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clock skew across distributed services (seconds to minutes)
                  creates subtle boundary leakage at window edges, requiring UTC
                  timestamps and per entity monotonicity validation
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
                  Fraud detection model at payments company: offline precision
                  0.85 using features with 5 minute future leak, online
                  precision 0.70 when leak fixed, costing 2 million dollars in
                  missed fraud annually
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber monitors end to end feature age with p99 SLA under 5
                  minutes, comparing offline historical features to online
                  served features on replayed traffic to detect skew before
                  deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix validates train serve consistency by recomputing
                  features for sampled production traffic and comparing to
                  served values, alerting when distribution divergence exceeds
                  threshold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPointInTimeCorrectnessTrainServeSkewFromPitViolations;
