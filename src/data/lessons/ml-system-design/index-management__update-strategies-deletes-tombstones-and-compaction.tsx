import type { Component } from "solid-js";

const LessonIndexManagementUpdateStrategiesDeletesTombstonesAndCompaction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Update Strategies: Deletes, Tombstones, and Compaction
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY SHARDING
            </p>
            <p>
              Single-machine indexes hit limits: memory (hundreds of GB max),
              CPU (diminishing returns past 32-64 cores), and fault tolerance
              (single point of failure). Sharding distributes vectors across
              multiple machines to scale beyond these limits.
            </p>
            <p>
              At 1 billion vectors with 768 dimensions, raw storage is 3TB. With
              HNSW overhead, expect 4-5TB. No single machine holds this.
              Sharding splits the index across 10-100 machines, each holding
              10-100M vectors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SHARDING STRATEGIES
            </p>
            <p>
              <strong>Random sharding:</strong> Hash vector ID to determine
              shard. Simple, even distribution, but queries must fan out to all
              shards. Query latency = max shard latency. 100 shards = 100
              parallel queries per user query.
            </p>
            <p>
              <strong>Semantic sharding:</strong> Cluster vectors, assign each
              cluster to a shard. Queries route to subset of relevant shards
              based on query embedding. Reduces fan-out but requires accurate
              routing. If routing fails, recall drops.
            </p>
            <p>
              <strong>Hybrid:</strong> Coarse semantic routing to select shard
              groups, then fan-out within group. Balances routing accuracy and
              coverage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUERY AGGREGATION
            </p>
            <p>
              Each shard returns top-K candidates. Aggregator merges results:
              collect top-K from each shard, re-rank by distance, return global
              top-K. With 100 shards and K=10, aggregator processes 1000
              candidates.
            </p>
            <p>
              Latency consideration: query latency is dominated by slowest shard
              (tail latency). Use timeouts and graceful degradation—return
              partial results if some shards are slow.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              REPLICATION FOR FAULT TOLERANCE
            </p>
            <p>
              Each shard is replicated across 2-3 machines. If one replica
              fails, others serve traffic. Replication also enables read
              scaling—distribute queries across replicas.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Sharding adds complexity:
              coordination, routing, aggregation, and consistency. Only shard
              when single-machine limits are reached. Start simple, scale when
              needed.
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
                  Shard when single machine hits limits: 100s GB RAM, 32-64
                  cores, single point of failure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Random sharding: simple, fan-out to all shards; semantic:
                  route to subset, risk recall loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query latency = slowest shard; use timeouts and return partial
                  results
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
                  Interview Tip: Compare random vs semantic sharding—random is
                  simple but max fan-out; semantic reduces fan-out but needs
                  accurate routing.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain aggregation—collect top-K from each
                  shard, merge, return global top-K.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIndexManagementUpdateStrategiesDeletesTombstonesAndCompaction;
