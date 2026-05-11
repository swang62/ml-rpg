import type { Component } from "solid-js";

const LessonTrainingServingSkewTemporalCorrectnessAndPointInTimeJoins: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Temporal Correctness and Point in Time Joins
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Temporal Leakage Is
            </p>
            <p style="margin-top: 0">
              Temporal leakage is one of the most insidious forms of training
              serving skew. It occurs when training joins use the latest
              snapshot of data instead of a point in time view, leaking future
              information that will not be available at serving. Your offline
              AUC looks fantastic at 0.94 because the model secretly learned
              from tomorrow's data, but in production it collapses to 0.72
              because those features do not exist yet. This is not a rare edge
              case; it is the default behavior of naive batch joins.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Point in Time Joins
            </p>
            <p style="margin-top: 0">
              Point in time correctness requires joining labels with features
              using event timestamps and effective from or effective to
              intervals. When you train on a fraud transaction from March 15th
              at 14:30, you must only use features that existed at March 15th
              14:30, not features computed later that day or week. For rolling
              aggregates like "user transaction count in last 7 days," you
              compute the window as it would have been at event time, never with
              full day hindsight.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Freshness Complexity
            </p>
            <p style="margin-top: 0">
              The problem compounds with feature freshness requirements. Real
              time features like "clicks in last 5 minutes" provide strong
              predictive signal (boosting CTR by 3 to 5 percent in
              recommendation systems) but introduce complexity. At training
              time, you must reconstruct these streaming aggregates from logs
              with exactly the same window logic and update frequency as
              production. If production updates every 60 seconds but training
              uses daily snapshots, the distribution mismatch creates skew.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Temporal Validation
            </p>
            <p style="margin-top: 0">
              Temporal validation extends this principle to evaluation. Hold out
              a forward in time window (t plus 1 to t plus n days) for
              validation to approximate deployment conditions, rather than
              random splitting which mixes past and future. For ranking systems,
              this catches feedback loop issues before deployment.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">
                      ❌ Naive Join (Leakage)
                    </strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      March 15 event
                      <br />
                      joined with latest snapshot
                      <br />
                      Uses March 20 features
                      <br />
                      Offline AUC: 0.94
                      <br />
                      Production AUC: 0.72
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">
                      ✓ Point in Time Join
                    </strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      March 15 14:30 event
                      <br />
                      joined with features as of March 15 14:30
                      <br />7 day window: March 8 to March 15
                      <br />
                      Offline AUC: 0.88
                      <br />
                      Production AUC: 0.87
                    </div>
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
                  Temporal leakage occurs when training uses latest data
                  snapshots instead of point in time views, causing offline AUC
                  to be artificially high (0.94) while production AUC drops
                  sharply (0.72)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point in time joins require event timestamps and effective
                  from or to intervals: March 15th training example only uses
                  features available on March 15th, with rolling windows
                  computed as they existed then
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real time features ("clicks in last 5 minutes") boost CTR by
                  3% to 5% but demand exact reconstruction: production updates
                  every 60 seconds, training must match that cadence and window
                  logic exactly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Forward in time validation: Hold out window t plus 1 to t plus
                  n days instead of random split to catch feedback loops and
                  temporal dependencies before deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost trade off: Point in time correctness requires windowed
                  aggregations with watermarks for late data, increasing compute
                  by 2x to 5x versus naive snapshot joins but preventing severe
                  production degradation
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
                  Uber Estimated Time of Arrival (ETA) prediction: Trains on
                  point in time traffic data at trip request moment; using
                  current traffic instead of historical conditions at event time
                  causes 15% to 20% ETA error increase
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation model: Reconstructs "user watch time
                  last 24 hours" from logs with same update frequency as
                  production (every 10 minutes); daily snapshot training caused
                  8% CTR drop in first deployment attempt
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stripe fraud detection: Point in time joins on merchant
                  dispute history; naive latest snapshot leaked future disputes,
                  causing offline precision 0.92 but production precision 0.68
                  with high false positive rate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingServingSkewTemporalCorrectnessAndPointInTimeJoins;
