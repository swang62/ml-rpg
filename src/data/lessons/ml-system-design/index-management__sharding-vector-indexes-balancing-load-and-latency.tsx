import type { Component } from "solid-js";

const LessonIndexManagementShardingVectorIndexesBalancingLoadAndLatency: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Sharding Vector Indexes: Balancing Load and Latency
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              UPDATE STRATEGIES
            </p>
            <p>
              Indexes need updates when: new content is added, existing content
              changes (embeddings updated), or content is deleted. Each has
              different solutions and tradeoffs.
            </p>
            <p>
              <strong>Full rebuild:</strong> Regenerate entire index from
              scratch. Most accurate but slowest. Use for major embedding model
              updates or when incremental drift becomes unacceptable. Typical
              cadence: weekly to monthly.
            </p>
            <p>
              <strong>Incremental update:</strong> Add new vectors to existing
              index structure. Fast but may degrade quality over time. HNSW
              supports this naturally; IVF-PQ requires assigning to existing
              centroids.
            </p>
            <p>
              <strong>Hybrid:</strong> Maintain a small "delta" index for recent
              items, periodically merge into main index. Balances freshness and
              quality.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INCREMENTAL UPDATE MECHANICS
            </p>
            <p>
              <strong>HNSW incremental:</strong> Insert new vectors by finding
              neighbors in existing graph, adding edges. Quality degrades
              slightly over time—new vectors see incomplete neighborhoods if
              inserted late. Rebuild when recall drops 2-3%.
            </p>
            <p>
              <strong>IVF incremental:</strong> Assign new vectors to nearest
              existing centroid, add to that partition. Centroids become stale
              as distribution shifts. If &gt;20% of vectors are post-training,
              centroids may be misaligned.
            </p>
            <p>
              <strong>Deletion:</strong> Most indexes support soft deletion
              (mark as deleted, filter at query time). Hard deletion requires
              compaction or rebuild. Soft-delete overhead: 5-10% query slowdown
              as deleted vectors are still scanned.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO REBUILD
            </p>
            <p>
              Monitor recall on a fixed query set. When recall drops below
              threshold (e.g., from 0.95 to 0.92), trigger rebuild. Also rebuild
              after embedding model updates—old and new embeddings are
              incompatible.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Incremental updates are fast but
              accumulate quality debt. Track recall drift and schedule periodic
              full rebuilds to reset quality.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="margin-bottom: 16px; text-align: center; font-weight: bold; font-size: 15px">
                Hash Sharding: 500M vectors → 16 shards
              </div>
              <div style="display: flex; gap: 12px; margin-bottom: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; font-size: 13px">
                  <strong>Shard 0</strong>
                  <br />
                  31M vectors
                  <br />
                  10k QPS
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; font-size: 13px">
                  <strong>Shard 1</strong>
                  <br />
                  31M vectors
                  <br />
                  10k QPS
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; font-size: 13px">
                  <strong>... 15</strong>
                  <br />
                  31M vectors
                  <br />
                  10k QPS
                </div>
              </div>
              <div style="margin-bottom: 12px; text-align: center; font-weight: bold; font-size: 15px">
                IVF Sharding: Route to 3 nearest clusters
              </div>
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; font-size: 13px">
                  <strong>Cluster A</strong>
                  <br />
                  50M vectors
                  <br />
                  6k QPS
                  <br />
                  Hot shard
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; font-size: 13px">
                  <strong>Cluster B</strong>
                  <br />
                  30M vectors
                  <br />
                  3k QPS
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; font-size: 13px">
                  <strong>Cluster C</strong>
                  <br />
                  28M vectors
                  <br />
                  2k QPS
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px; text-align: center">
                <strong>Hash:</strong> 16 shard fanout, 60ms p99 |{" "}
                <strong>IVF:</strong> 3 shard fanout, 25ms p99, skew risk
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
                  Full rebuild: most accurate, use for model updates; weekly to
                  monthly cadence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental: fast but quality degrades; rebuild when recall
                  drops 2-3%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Soft deletion: filter at query time; 5-10% overhead; rebuild
                  for compaction
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
                  Interview Tip: Explain the rebuild trigger—monitor recall on
                  fixed query set, rebuild when it drops below threshold.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe hybrid strategy—delta index for
                  freshness, periodic merge into main index.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIndexManagementShardingVectorIndexesBalancingLoadAndLatency;
