import type { Component } from "solid-js";

const LessonFeatureStoreIntegrationFeatureStoreTheContractBetweenDataAndModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Store: The Contract Between Data and Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Feature Store:</strong> A centralized system that
              computes, stores, and serves ML features consistently across
              training and inference. It establishes a contract: the same
              feature definition produces the same value regardless of whether
              accessed during model training or real-time prediction.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Problem It Solves
            </p>
            <p>
              Without a feature store, teams compute features independently.
              Team A calculates user_click_rate using 7 days of data; Team B
              uses 30 days. Training pipelines compute features from batch data;
              serving systems compute from real-time streams using different
              code paths. The model trains on one feature definition but serves
              with another. Accuracy drops 15-20% and debugging takes weeks
              because the discrepancy is invisible—both pipelines produce valid
              numbers, just different ones.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Core Components
            </p>
            <p>
              <strong>Feature registry:</strong> Central catalog of feature
              definitions including transformation logic, data sources, and
              ownership. Engineers search and discover existing features before
              creating duplicates. <strong>Offline store:</strong> Historical
              feature values for training, typically in columnar formats
              (Parquet) on object storage. Supports point-in-time queries to
              prevent label leakage. <strong>Online store:</strong> Latest
              feature values for inference, typically key-value stores (Redis,
              DynamoDB) with sub-10ms reads.{" "}
              <strong>Materialization pipeline:</strong> Computes features from
              raw data and writes to both stores.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Contract Guarantee
            </p>
            <p>
              The feature store guarantees that{" "}
              <code style="padding: 2px 6px; border-radius: 3px">
                get_feature(user_123, timestamp_X)
              </code>{" "}
              returns identical values whether called during training data
              generation or production serving. This requires: identical
              transformation code, same data sources, and point-in-time
              correctness (no future data leaking into historical queries).
              Breaking this contract is the single most common cause of
              training-serving skew.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Insight:</strong> Feature stores are not primarily
              about sharing features between teams (though that helps). They are
              about guaranteeing consistency between training and serving—the
              foundation of reliable ML systems.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Offline Store</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Historical features
                      <br />
                      Columnar, partitioned
                      <br />
                      TB scale scans
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Online Store</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Latest values only
                      <br />
                      Key-value, in memory
                      <br />
                      p99 &lt; 20ms reads
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Shared Transformation Logic ↓
                </div>
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Training Flow</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Point in time joins
                      <br />
                      200M examples
                      <br />
                      Hours to assemble
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Serving Flow</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      Multi-get by key
                      <br />
                      100K QPS
                      <br />
                      5-20ms p99
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
                  Feature stores guarantee identical values in training and
                  serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Core components: registry, offline store, online store,
                  materialization pipeline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Breaking the consistency contract is the top cause of
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
                  Team A uses 7-day click rate, Team B uses 30-day - both valid,
                  but inconsistent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point-in-time queries prevent future data from leaking into
                  training
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreIntegrationFeatureStoreTheContractBetweenDataAndModels;
