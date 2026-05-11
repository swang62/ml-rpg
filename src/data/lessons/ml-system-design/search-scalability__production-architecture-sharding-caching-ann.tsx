import type { Component } from "solid-js";

const LessonSearchScalabilityProductionArchitectureShardingCachingAnn: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: Integrating Sharding, Caching, and ANN
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                A production ML search system integrates{" "}
                <strong>sharding, caching, and ANN</strong> into a unified
                architecture with predictable latency and cost.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              REQUEST FLOW
            </p>
            <p style="margin-top: 0">
              Query → L1 cache (100μs) → L2 cache (2ms) → Shard routing →
              Fan-out to shards → ANN per shard (5ms) → Merge → Rerank →
              Response. Total: 15-50ms at 100k QPS.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPONENT SIZING
            </p>
            <p style="margin-top: 0">
              <strong>Shards:</strong> 1B vectors ÷ 50M/shard = 20 shards × 3
              replicas = 60 total. <strong>Cache:</strong> L1 10GB (hot), L2
              Redis 100GB (warm). <strong>ANN:</strong> HNSW M=16, efSearch=64
              for 98% recall at 5ms. Memory: 50GB/shard.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Size independently, validate
              together. Cache hit rate affects shard load. ANN recall affects
              reranking. Tune holistically after deployment.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OPERATIONS
            </p>
            <p style="margin-top: 0">
              <strong>Deploy:</strong> Roll shard-by-shard.{" "}
              <strong>Monitor:</strong> Per-shard latency, cache hits, ANN
              recall vs brute-force. <strong>Scale:</strong> Replicas for QPS,
              shards for data. <strong>Index updates:</strong> Build offline,
              swap atomically.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COST BREAKDOWN
            </p>
            <p style="margin-top: 0">
              1B vectors, 100k QPS: Compute (60 replicas) k/month. Memory (3TB)
              k/month. Cache k/month. Total ~k/month. IVF-PQ cuts to k/month
              with 3x latency.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Memory is dominant cost. Trading
              latency for efficiency (HNSW → IVF-PQ) cuts costs 50%+. Evaluate
              against SLAs.
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
                  Request flow: L1 cache → L2 cache → shard routing → ANN per
                  shard → merge → rerank
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sizing: 1B vectors needs ~20 shards × 3 replicas, 100GB L2
                  cache, 50GB per shard
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory is dominant cost—IVF-PQ can cut costs 50%+ with latency
                  trade-off
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
                  Walk through the request flow with concrete latency numbers at
                  each stage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Provide cost breakdown and optimization path (HNSW → IVF-PQ)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchScalabilityProductionArchitectureShardingCachingAnn;
