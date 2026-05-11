import type { Component } from "solid-js";

const LessonSemanticSearchNlpImplementationDetailsShardingMonitoringAndOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation Details: Sharding, Monitoring, and Optimization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Index Management
            </p>
            <p style="margin-top: 0">
              Vector indices need maintenance. New documents require embedding
              and insertion. Deleted documents leave dead entries. Updated
              documents need old vectors removed and new ones added. Index
              building is expensive - a million vectors with HNSW takes 10-30
              minutes. Some systems support online updates while serving
              queries; others require downtime.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Filtering and Metadata
            </p>
            <p style="margin-top: 0">
              Pure semantic search ignores structure. But users often want
              semantic search within constraints: "find similar products in
              electronics under ." Efficient filtering requires metadata support
              before or during ANN search. Pre-filtering works for selective
              filters. Post-filtering works when most documents pass the filter.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Filtering to 1% of docs before
              ANN may hurt recall - the index was built on full corpus and may
              not navigate efficiently to filtered subsets. Test filtered query
              performance explicitly.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Monitoring and Debugging
            </p>
            <p style="margin-top: 0">
              Semantic search failures are hard to debug - no obvious "wrong
              answer." Monitor query latency (P50, P99), click-through rates,
              and no-click rates. Log query and result vectors to diagnose poor
              matches. Visualizing embeddings with dimensionality reduction
              (t-SNE, UMAP) reveals clustering problems.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scaling Patterns
            </p>
            <p style="margin-top: 0">
              Beyond single-node capacity, shard vectors across machines by
              partition. Query all shards in parallel, merge results. This adds
              latency but enables arbitrary scale. Some workloads benefit from
              replicas: multiple copies of the same shard serving read traffic
              for higher throughput.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="margin-bottom: 12px; font-weight: bold; font-size: 15px; text-align: center">
                Sharding and Replication Strategy
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Shard 0: 50M vectors (384d)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; line-height: 1.4">
                    Raw: 72 GB, PQ: 8 GB per replica
                    <br />
                    Replicas: Node A, Node B
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Shard 1: 50M vectors (384d)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; line-height: 1.4">
                    Raw: 72 GB, PQ: 8 GB per replica
                    <br />
                    Replicas: Node C, Node D
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Shard 2: 50M vectors (384d)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; line-height: 1.4">
                    Raw: 72 GB, PQ: 8 GB per replica
                    <br />
                    Replicas: Node E, Node F
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 4px; text-align: center">
                  <div style="font-size: 12px; font-weight: bold">
                    Total: 150M vectors across 3 shards
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Each node: 64 GB RAM, serves 1 shard replica
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
                  Index building is expensive (10-30 min for 1M vectors with
                  HNSW) - understand update semantics and plan migrations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata filtering affects recall: filtering to 1% of docs
                  before ANN may miss results since index was built on full
                  corpus
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Debug with click-through and no-click rates - visualize
                  embeddings with t-SNE/UMAP to reveal clustering problems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale by sharding vectors across machines, query all shards in
                  parallel, merge results - adds latency but enables arbitrary
                  scale
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
                  Explain pre-filter vs post-filter: selective filters (1% of
                  docs) work better with post-filter to avoid ANN navigation
                  issues.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For debugging, recommend logging query and result vectors.
                  Visualizing with UMAP can show if queries land in wrong
                  neighborhoods.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the sharding pattern: partition by document ID
                  ranges, parallel query, merge. Trade latency for scale.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSemanticSearchNlpImplementationDetailsShardingMonitoringAndOptimization;
