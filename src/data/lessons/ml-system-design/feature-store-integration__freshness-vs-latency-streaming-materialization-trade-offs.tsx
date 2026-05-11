import type { Component } from "solid-js";

const LessonFeatureStoreIntegrationFreshnessVsLatencyStreamingMaterializationTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Freshness vs Latency: Streaming Materialization Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Feature Freshness:</strong> The time between when
              underlying data changes and when the feature reflects that change.
              Batch materialization achieves freshness measured in hours;
              streaming materialization achieves minutes or seconds. The
              trade-off involves infrastructure complexity, cost, and
              operational burden.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Freshness Matters
            </p>
            <p>
              Not all features need real-time updates. User demographics (age,
              location) change rarely—daily batch is sufficient. Session
              activity (pages viewed, items clicked) changes constantly—stale
              values hurt predictions. Rule of thumb: if the feature measures
              recent behavior (last hour, last session), freshness matters. If
              it measures historical patterns (lifetime value, purchase
              history), batch is fine. Audit feature importance: if a feature
              contributes less than 1% to model performance, batch
              materialization is acceptable regardless of freshness
              requirements.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Streaming Materialization Architecture
            </p>
            <p>
              Events flow through a stream processor (Flink, Spark Streaming)
              that computes feature values and writes to the online store.
              Challenges: handling late data (events arriving after the feature
              was computed), maintaining state across restarts (checkpointing),
              and managing schema evolution (adding new features without
              downtime). Operational complexity is 3-5x higher than batch
              pipelines. Reserve streaming for features that demonstrably
              improve model performance when fresh.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hybrid Materialization
            </p>
            <p>
              Most production systems use both. Batch pipeline runs nightly,
              computing all features and loading both stores. Streaming pipeline
              runs continuously, updating only time-sensitive features. The
              online store contains batch features (refreshed daily) plus
              streaming features (refreshed continuously). This limits streaming
              complexity to the subset of features that truly need it while
              maintaining consistency for the rest.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Cost Warning:</strong> Streaming infrastructure typically
              costs 3-10x more than batch for the same feature. Run A/B tests
              measuring whether real-time freshness actually improves business
              metrics before committing to streaming materialization.
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
                  Session and recent behavior features benefit from streaming;
                  historical patterns work fine with batch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming operational complexity is 3-5x higher than batch
                  pipelines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approach: batch for most features, streaming only for
                  time-sensitive ones
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
                  User demographics: daily batch. Session activity: streaming
                  materialization.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A/B test freshness impact before committing to streaming
                  infrastructure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreIntegrationFreshnessVsLatencyStreamingMaterializationTradeOffs;
