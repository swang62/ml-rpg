import type { Component } from "solid-js";

const LessonSearchScalabilityMultiTierCachingFeaturesEmbeddings: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Multi-Tier Caching for Features and Embeddings
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
                <strong>Multi-tier caching</strong> layers multiple cache
                levels—in-process, distributed, and persistent—to serve ML
                features and embeddings with sub-millisecond latency.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY MULTI-TIER CACHING
            </p>
            <p style="margin-top: 0">
              Single-tier fails at scale. In-process cache is fast
              (microseconds) but limited by RAM. Distributed cache handles more
              data but adds 1-5ms latency. Persistent storage handles everything
              but takes 10-50ms. Multi-tier combines all: check local first,
              then distributed, then storage. Hit rates compound—90% local × 90%
              distributed = 99% before touching storage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CACHE TIER ARCHITECTURE
            </p>
            <p style="margin-top: 0">
              <strong>L1 (in-process):</strong> LRU in application memory.
              100MB-1GB per instance. Latency: 10-100 microseconds.{" "}
              <strong>L2 (distributed):</strong> Redis cluster. 10GB-1TB shared.
              Latency: 1-5ms. <strong>L3 (persistent):</strong> Feature store.
              Unlimited. Latency: 10-50ms. Each tier 10-100x slower but 10-100x
              larger.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Cache the right things at each
              tier. L1: hot user embeddings (active session). L2: warm users
              (past hour). L3: everything else. A 10% active user base means 90%
              of requests hit L1.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INVALIDATION STRATEGIES
            </p>
            <p style="margin-top: 0">
              <strong>TTL-based:</strong> Expire after fixed time. Simple but
              may serve stale data. <strong>Event-driven:</strong> Invalidate on
              updates. Fresh but complex across tiers.{" "}
              <strong>Versioning:</strong> Version in cache key. New version =
              miss. Clean but increases key cardinality.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Higher hit rates reduce latency
              but increase staleness. A 1-hour TTL means 1-hour stale features.
              For recommendations, acceptable. For fraud detection, not.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 15px">
                  Cache Hierarchy: Feature Fetch Path
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Request</strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      User ID + Item IDs
                    </div>
                  </div>
                  <div style="font-size: 22px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">L1: Memory Cache</strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      1-2 ms | 95% hit
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ On Miss (5%)
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">L2: SSD Store</strong>
                    <div style="font-size: 11px; margin-top: 3px">5-15 ms</div>
                  </div>
                  <div style="font-size: 22px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Backfill L1</strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      TTL: 5-30 min
                    </div>
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                  <strong>Result:</strong> Median 2 ms, P99 12 ms at 95% hit
                  rate
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
                  Three tiers: L1 in-process (microseconds), L2 distributed
                  (1-5ms), L3 persistent (10-50ms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hit rates compound: 90% L1 × 90% L2 = 99% total before storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache hot users in L1, warm in L2—10% active users means 90%
                  L1 hits
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
                  Describe three-tier architecture with concrete latency numbers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention invalidation trade-off: TTL simple, event-driven fresh
                  but complex
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchScalabilityMultiTierCachingFeaturesEmbeddings;
