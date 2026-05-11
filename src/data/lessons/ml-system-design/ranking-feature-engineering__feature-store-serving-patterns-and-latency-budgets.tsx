import type { Component } from "solid-js";

const LessonRankingFeatureEngineeringFeatureStoreServingPatternsAndLatencyBudgets: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Store Serving Patterns and Latency Budgets
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Challenge
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                A typical ranking request needs 1,000 candidates × 150 features
                = 150,000 feature values. Fetching each individually would take
                hundreds of milliseconds. Feature store serving patterns solve
                this through batched retrieval in a single round trip.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline vs Online Stores
            </p>
            <p style="margin-top: 0">
              Feature stores separate two paths. The offline store holds
              historical snapshots for training, typically in a data warehouse
              optimized for batch reads. It maintains point-in-time correctness
              to prevent leakage. The online store serves low-latency reads,
              backed by key-value stores optimized for fast lookups. Batch
              pipelines write to both stores. Streaming pipelines write
              incremental updates to the online store at high throughput (100K+
              writes/second) to keep aggregates fresh.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batched Retrieval Patterns
            </p>
            <p style="margin-top: 0">
              Key grouping minimizes round trips. Group all item features under
              one key, all user features under another. A single batch-get
              retrieves features for 1,000 items and 1 user in two calls instead
              of 150,000 calls. Result: 2-5ms total at the 99th percentile (p99
              means 99% of requests are faster than this). Cache hot entities in
              memory to avoid repeated fetches for popular items.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Budget Allocation
            </p>
            <p style="margin-top: 0">
              For a 200ms end-to-end target, budget allocation might be: feature
              retrieval 5ms, candidate scoring 30ms, re-ranking 10ms, network
              overhead 20ms, leaving margin for variance. Each stage gets a
              timeout. If feature fetch exceeds 10ms, degrade gracefully: reduce
              candidates from 1,000 to 500, or skip non-critical personalization
              features rather than failing the entire request.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tail Latency Amplification
            </p>
            <p style="margin-top: 0">
              If feature store p99 spikes from 5ms to 50ms (database hiccup,
              network congestion), end-to-end p99 can jump past 300ms, violating
              user experience. Mitigations: per-stage timeouts with graceful
              degradation, maintain last-known-good snapshots for hot entities
              as fallback, replicate read-heavy data to local caches (reduces
              p99 from 5ms to &lt;1ms at cost of infrastructure complexity).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Feature Store Serving Path
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; font-weight: 700; font-size: 13px">
                  Ranking Service Request
                  <div style="font-size: 11px; font-weight: 400; margin-top: 4px">
                    1000 candidates × 150 features
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; font-weight: 700; font-size: 13px">
                  Batch Feature Fetch
                  <div style="font-size: 11px; font-weight: 400; margin-top: 4px">
                    2 calls: item keys + user key
                    <br />2 to 5ms p99
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; font-weight: 700; font-size: 13px">
                  Online Feature Store
                  <div style="font-size: 11px; font-weight: 400; margin-top: 4px">
                    Redis / DynamoDB / Bigtable
                    <br />
                    100K+ writes/sec throughput
                  </div>
                </div>
                <div style="margin-top: 4px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                  <strong>Fallback:</strong> If p99 &gt; 10ms, reduce candidates
                  <br />
                  or use cached hot entity snapshot
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
                  150K feature values per request cannot be fetched
                  individually; batch retrieval in single round trip is
                  essential
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key grouping: all item features in one key, all user features
                  in another; 2 calls instead of 150K
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency budget example: 5ms feature retrieval + 30ms scoring +
                  10ms re-ranking + 20ms network within 200ms target
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Graceful degradation: if feature fetch exceeds timeout, reduce
                  candidates or skip non-critical features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tail latency amplification: a p99 spike in one component
                  cascades to violate end-to-end targets
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
                  Start with the scale problem: 1000 candidates × 150 features =
                  150K values to fetch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain p99 (99th percentile latency) when using the term - it
                  means 99% of requests are faster
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe graceful degradation: reduce from 1000 to 500
                  candidates rather than failing the request
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRankingFeatureEngineeringFeatureStoreServingPatternsAndLatencyBudgets;
