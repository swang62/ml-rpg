import type { Component } from "solid-js";

const LessonContentBasedFilteringProductionArchitectureTwoStageRetrievalAndReRankingPipeline: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: Two Stage Retrieval and Re Ranking Pipeline
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
                Production recommendation systems use a two-stage pipeline:
                retrieval (fast, broad) followed by ranking (slow, precise).
                Content and collaborative signals enter at different stages
                based on their computational cost.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Retrieval Stage
            </p>
            <p style="margin-top: 0">
              Goal: reduce 10 million items to 1000 candidates in under 20ms.
              Methods: ANN search on collaborative embeddings, category filters,
              content similarity search. Each retrieval source produces
              candidates. Merge and deduplicate.
            </p>
            <p>
              Content-based retrieval: precompute item embeddings from text,
              images, categories. At request time, embed user preferences and
              ANN search for similar items. Fast because item embeddings are
              precomputed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Ranking Stage
            </p>
            <p style="margin-top: 0">
              Goal: order 1000 candidates by predicted engagement. Can use
              complex features: user-item cross features, sequence models,
              contextual signals. Latency budget: 50-100ms for 1000 items.
            </p>
            <p>
              Ranking models see both content and collaborative signals as
              features. Item popularity, user historical engagement, content
              similarity to user profile, and collaborative embedding similarity
              all become input features. A gradient-boosted tree or neural
              ranker learns optimal weighting.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Use multiple retrieval sources.
              Collaborative retrieval finds behaviorally similar items. Content
              retrieval finds semantically similar items. Popularity retrieval
              ensures some baseline quality. Merge candidates from all sources
              before ranking.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">User Request</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 100%; max-width: 460px">
                  <div style="text-align: center; margin-bottom: 8px">
                    <strong style="font-size: 14px">
                      Stage 1: ANN Candidate Retrieval
                    </strong>
                  </div>
                  <div style="font-size: 12px">
                    • CBF Index: Top 1000 from content similarity
                    <br />• CF Index: Top 1000 from behavioral signals
                    <br />• <strong>Latency: 5–30ms P95</strong>
                    <br />• <strong>Output: 500–5,000 candidates</strong>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 100%; max-width: 460px">
                  <div style="text-align: center; margin-bottom: 8px">
                    <strong style="font-size: 14px">Stage 2: Re Ranker</strong>
                  </div>
                  <div style="font-size: 12px">
                    • Score 200–1,000 candidates
                    <br />• Rich features: similarity, recency, popularity
                    <br />• Diversity &amp; business constraints
                    <br />• <strong>Latency: 50–150ms P95</strong>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">Final Top N Items</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Total: &lt;200ms P95–P99
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
                  Stage one ANN retrieval pulls 500 to 5,000 candidates in 5 to
                  30ms P95 using quantized indices: 100M items at 256 dims drops
                  from 102 GB float32 to under 10 to 20 GB per shard with
                  product quantization and minimal recall loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stage two re ranker scores 200 to 1,000 candidates with
                  learned models using rich features (similarity, recency,
                  popularity, diversity) in 50 to 150ms P95, applying post rank
                  constraints for policy, safety, and deduplication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Total end to end latency target for interactive surfaces is
                  under 200ms P95 to P99, with systems sharding by item ID or
                  semantic clusters and replicating hot shards to handle 10,000+
                  QPS per region
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness managed through daily or hourly offline index builds
                  plus streaming hot item updates into small overlay indices
                  merged at query time, with shadow traffic validation before
                  rollout and automatic rollback on regression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User profiles computed as recency weighted sums of engaged
                  item vectors with exponential decay (7 to 14 day half life)
                  and interaction specific weights where purchases count more
                  than views
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
                  For latency budgets: break down retrieval - content ANN
                  (3-8ms) and collaborative ANN (3-8ms) can run in parallel,
                  merged in 1-2ms, total &lt;15ms for thousands of candidates.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about index architecture: explain separate indexes
                  for content and CF embeddings, with merge happening at
                  candidate set level (dedup + combine scores).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For cold start queries: mention content-only fast path when
                  user has insufficient history, avoiding the collaborative
                  retrieval entirely for new users.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContentBasedFilteringProductionArchitectureTwoStageRetrievalAndReRankingPipeline;
