import type { Component } from "solid-js";

const LessonGraphFraudDetectionProductionServingArchitectureLatencyAndScaleTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Serving Architecture: Latency and Scale Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Latency Challenge
            </p>
            <p>
              Real-time fraud detection requires decisions within 50-100ms. GNN
              inference must fetch the target node, retrieve its neighborhood
              (potentially thousands of edges), compute aggregations, and return
              a score. Each graph traversal adds latency. A 2-hop neighborhood
              on a dense graph might touch millions of nodes—impossible to
              compute in real-time without optimization.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Design Trade-off:</strong> Larger neighborhoods capture
              more fraud patterns but increase latency. Production systems
              typically limit to 1-2 hops with sampled neighbors (10-50 per
              node) to keep inference under 50ms while retaining most detection
              power.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Neighborhood Sampling
            </p>
            <p>
              Rather than fetching all neighbors, sample a fixed number per hop.
              Uniform sampling selects neighbors randomly. Importance sampling
              prioritizes suspicious or active neighbors. Stratified sampling
              ensures representation of different relationship types (device
              links vs transaction links). The sampling strategy significantly
              affects which fraud patterns the model catches.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pre-computed Embeddings
            </p>
            <p>
              Instead of computing GNN embeddings at inference time, pre-compute
              node embeddings periodically (hourly or daily) and store them. At
              inference time, fetch the pre-computed embedding and combine with
              real-time transaction features. This reduces latency to a simple
              lookup plus a small neural network forward pass.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Pre-computed embeddings become stale. A
              user flagged 1 hour ago still has a clean embedding until the next
              refresh. Balance freshness (more frequent updates) against
              computational cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Graph Database Selection
            </p>
            <p>
              The graph store must support fast neighbor lookups. Options:
              native graph databases (Neo4j, TigerGraph) optimized for
              traversals, key-value stores (Redis) with adjacency lists, or
              distributed stores (DynamoDB) for scale. Choose based on query
              patterns: random access vs batch processing.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 14px">
                  Real-time Decision Flow (50-100ms p95)
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">1. Feature Pipeline</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Rolling counters, entity resolution
                  </div>
                  <div style="font-size: 11px">Async preprocessing</div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">2. Graph Access</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Fetch 2 hop neighbors, sample 20 per type
                  </div>
                  <div style="font-size: 11px">2-5ms p50, 8-15ms p95</div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">3. Scoring</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Cached embeddings + online layer + rules
                  </div>
                  <div style="font-size: 11px">
                    5-15ms p95 (GNN) + 1-5ms (rules)
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">4. Decision</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Fuse scores, apply thresholds
                  </div>
                  <div style="font-size: 11px">Allow / Step-up / Review</div>
                </div>
                <div style="margin-top: 8px; padding: 8px; border-radius: 6px; border: 2px solid; font-size: 11px; text-align: center">
                  <strong>Offline:</strong> Precompute embeddings every 1-6
                  hours
                  <br />
                  <strong>Scale:</strong> 200M nodes, 5-20B edges, 5K-50K QPS
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
                  Real-time GNN inference requires 50-100ms latency—limit to 1-2
                  hops with 10-50 sampled neighbors per node
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre-computed embeddings reduce inference to a lookup plus
                  small forward pass, but embeddings become stale between
                  refreshes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Graph store choice (Neo4j, Redis adjacency lists, DynamoDB)
                  depends on query patterns: random access vs batch processing
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
                  Explain the latency trade-off: 2-hop neighborhood on dense
                  graph might touch millions of nodes, so sampling is essential
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that pre-computed embeddings risk staleness—a user
                  flagged 1 hour ago still has clean embedding until next
                  refresh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGraphFraudDetectionProductionServingArchitectureLatencyAndScaleTradeOffs;
