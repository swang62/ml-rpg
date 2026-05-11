import type { Component } from "solid-js";

const LessonFeatureStoreIntegrationServingFlowAssemblyLatencyBudgetsAndCaching: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Serving Flow: Assembly, Latency Budgets, and Caching
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Feature Serving Flow:</strong> The path from prediction
              request to assembled feature vector. A single prediction may
              require features from multiple entities (user, item, context),
              each stored separately. Assembly must complete within milliseconds
              while handling failures gracefully.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Assembly Pattern
            </p>
            <p>
              Prediction request arrives with entity IDs (user_123, item_456).
              The serving layer issues parallel lookups to the online store: one
              for user features, one for item features, one for user-item
              interaction history. Results are assembled into a single feature
              vector matching the model input schema. For recommendation
              systems, you might fetch one user vector and hundreds of item
              vectors for ranking—batching these lookups is critical for
              performance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Budget Allocation
            </p>
            <p>
              If total latency budget is 50ms and model inference takes 20ms,
              feature serving gets 30ms. Within that: network round-trip 5ms,
              online store lookup 10ms, assembly 5ms, buffer for variance 10ms.
              Monitor p99 latency at each step. When feature count grows, lookup
              latency grows—plan for this by pre-aggregating features or using
              hierarchical caching. A single slow feature can blow the entire
              budget.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Caching Strategies
            </p>
            <p>
              <strong>Entity-level cache:</strong> Cache entire feature vectors
              per entity. Effective for popular entities (trending items, active
              users) but cache invalidation is complex when features update.{" "}
              <strong>Request-level cache:</strong> Cache assembled vectors for
              repeated requests. Works well when the same user-item pairs are
              scored multiple times (refresh, scroll).{" "}
              <strong>Precomputation:</strong> For predictable access patterns,
              pre-compute and store final feature vectors. Eliminates
              serving-time assembly but increases storage and staleness.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Failure Handling:</strong> Missing features are inevitable
              (new users, cold items). Define fallback values per feature:
              global mean, category default, or special "unknown" embedding.
              Never fail the entire request because one feature is missing.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Request: user_id=12345</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    End to end budget: &lt;100ms
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>In-Process Cache</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    95% hit rate, &lt;1ms
                    <br />
                    TTL: 60s
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓ (on miss)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Regional Cache</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Distributed, 2-5ms p50
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓ (on miss)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Online Store</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Source of truth
                    <br />
                    5-20ms p99, 100K QPS
                    <br />
                    Batched multi-get
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Feature Vector (2KB)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    150 features assembled
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
                  Feature assembly issues parallel lookups for user, item, and
                  context features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency budget: allocate time for network, lookup, assembly,
                  and variance buffer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Define fallback values per feature to handle missing data
                  gracefully
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
                  50ms budget: 20ms inference, 10ms lookup, 5ms assembly, 5ms
                  network, 10ms buffer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Entity cache for popular items, request cache for repeated
                  user-item pairs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreIntegrationServingFlowAssemblyLatencyBudgetsAndCaching;
