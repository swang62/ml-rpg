import type { Component } from "solid-js";

const LessonFeatureStoreIntegrationTrainingServingSkewRootCausesAndMitigation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Serving Skew: Root Causes and Mitigation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Training-Serving Skew:</strong> When features at
              prediction time differ from training, causing models to
              underperform in production. The model learned patterns from one
              data distribution but receives another at inference. This is the
              most insidious ML production bug because the system appears to
              work correctly.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Root Cause: Different Code Paths
            </p>
            <p>
              The most common cause is duplicate implementation. Training
              pipeline computes features using PySpark on historical data.
              Serving computes the same features using Java on real-time
              streams. Despite best intentions, implementations drift: different
              handling of nulls, different timestamp parsing, different rounding
              behavior. A feature defined as "clicks in last 7 days" might use
              calendar days in training but rolling 168 hours in serving. Both
              are reasonable—but not identical.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Root Cause: Future Data Leakage
            </p>
            <p>
              Training data is processed in batch after events occur. If not
              careful, features can incorporate information not available at
              prediction time. Example: training computes "user lifetime value"
              including purchases after the prediction timestamp. The model
              learns to rely on this, but at serving time, future purchases do
              not exist. Point-in-time joins are essential: only data available
              before T can be used.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigation Strategies
            </p>
            <p>
              <strong>Single code path:</strong> Feature store computes features
              once for both training and inference. No duplicate means no drift.{" "}
              <strong>Logged features:</strong> Log exact feature values at
              serving; training uses these. Guarantees identical values.{" "}
              <strong>Feature monitoring:</strong> Compare distributions between
              training and serving. Alert on divergence (KL, PSI).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Detection:</strong> Compare offline evaluation to online
              A/B results. Large gaps (offline AUC 0.85, online 0.72) strongly
              indicate skew. Investigate feature distributions before blaming
              the model.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Training Serving Skew Example
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong>Training Pipeline</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      SQL: ROUND(timestamp, 'hour')
                      <br />
                      Tumbling 24h window
                      <br />
                      Backfill with lookahead
                    </div>
                    <div style="margin-top: 8px; font-size: 13px">
                      Offline AUC: <strong>0.87</strong>
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong>Serving Pipeline</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Python: round(ts, 'minute')
                      <br />
                      Sliding 24h window
                      <br />
                      Event time filtered
                    </div>
                    <div style="margin-top: 8px; font-size: 13px">
                      Online AUC: <strong>0.79</strong>
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Mitigation: Single Source Transformation</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Shared code in registry → Batch &amp; Streaming
                    <br />
                    Unit tests + Distribution comparison (PSI/KL)
                    <br />
                    Event time enforcement with watermarks
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
                  Duplicate code paths (PySpark training vs Java serving) cause
                  implementation drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point-in-time joins prevent future data leakage into training
                  features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large offline-to-online metric gaps strongly indicate
                  training-serving skew
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
                  Calendar days vs rolling 168 hours: both valid, but different
                  values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log exact feature values at serving time for guaranteed
                  training consistency
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreIntegrationTrainingServingSkewRootCausesAndMitigation;
