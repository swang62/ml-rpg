import type { Component } from "solid-js";

const LessonSupervisedAnomalyDetectionProductionArchitectureOnlineScoringFeatureFreshnessAndLatencyBudgets: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: Online Scoring, Feature Freshness, and
            Latency Budgets
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Budgets
            </p>
            <p style="margin-top: 0">
              Production fraud scoring happens in the critical path of payment
              authorization. The total authorization window is 300-800ms
              including network hops, database lookups, and issuer responses.
              Risk scoring must complete within 10-30ms at p99 to leave room for
              everything else. Many teams target sub-5ms model inference on
              commodity CPUs.
            </p>
            <p>
              The budget breaks down: 1-2ms for feature retrieval from cache,
              2-5ms for model inference, 1-2ms for decision logic and logging.
              Every millisecond matters at scale. At 10,000 transactions per
              second, a 10ms slowdown means 100,000 additional in-flight
              requests waiting.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Freshness
            </p>
            <p style="margin-top: 0">
              Features mix static attributes and streaming aggregates. Static
              features (device fingerprint, merchant category, card metadata)
              come from key-value stores with sub-millisecond reads. Streaming
              features are the differentiator: payment attempts per card in last
              10 minutes, total spend in last 24 hours, distinct devices per
              email in last 7 days.
            </p>
            <p>
              Streaming features update through real-time pipelines with 100ms
              to few-second lag. High-value velocity checks (attempts in last 10
              minutes) need sub-1-second freshness. Longer horizon features
              (7-day aggregates) tolerate 10-60 second lag. Stale features miss
              velocity attacks where fraudsters hit a card 5 times in 2 minutes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Stage Architecture
            </p>
            <p style="margin-top: 0">
              A common pattern separates fast and slow paths. The fast path
              scores with precomputed features in under 10ms for checkout
              decisions. The slow path runs asynchronously after approval with
              richer graph features and secondary models, taking 100-500ms.
              High-risk transactions flagged by slow path trigger
              post-authorization holds.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Monitoring Essentials:</strong> Track score
              distribution shifts (alert on PSI &gt; 0.2), feature staleness
              (alert if streaming lag &gt; 5s), and precision on fast feedback
              proxies that arrive within hours instead of the 30-90 day
              chargeback delay.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Transaction Event</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    5,000 to 20,000 TPS
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓ <span style="font-size: 12px">(&lt; 5ms)</span>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Feature Lookup</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Static: Device, Merchant (&lt; 1ms p99)
                  </div>
                  <div style="font-size: 12px">
                    Streaming: 10min velocity (&lt; 2s lag)
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓ <span style="font-size: 12px">(&lt; 3ms)</span>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Model Inference</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    XGBoost ensemble: &lt; 1ms per model
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓ <span style="font-size: 12px">(&lt; 2ms)</span>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Decision</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Total budget: 10 to 30ms p95
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
                  Risk scoring must complete in 10-30ms at p99 within 300-800ms
                  total authorization window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Static features from cache in 1-2ms; model inference in 2-5ms;
                  decision logic in 1-2ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming features (velocity checks) need sub-1-second
                  freshness to catch rapid fraud
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two-stage pattern: fast path (10ms) for checkout, slow path
                  (100-500ms) for async review
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor score distribution shifts (PSI &gt; 0.2), feature
                  staleness, and fast feedback proxies
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
                  Break down latency budget: 1-2ms feature retrieval, 2-5ms
                  inference, 1-2ms decision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain freshness requirements: velocity checks need sub-1s,
                  7-day aggregates tolerate 60s
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe two-stage pattern: fast path blocks at checkout, slow
                  path flags for post-auth hold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSupervisedAnomalyDetectionProductionArchitectureOnlineScoringFeatureFreshnessAndLatencyBudgets;
