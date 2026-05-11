import type { Component } from "solid-js";

const LessonApproximateNearestNeighborsTwoStageRetrievalAnnCandidateGenerationReRanking: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Two Stage Retrieval: ANN Candidate Generation + Re-Ranking
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY TWO STAGES
            </p>
            <p>
              Real-world ranking needs signals that vectors cannot capture: user
              history, item freshness, business rules, real-time context. A pure
              vector search finds semantically similar items but misses these
              signals. Two-stage retrieval separates fast candidate generation
              (ANN) from expensive full ranking (ML model with rich features).
            </p>
            <p>
              The first stage uses ANN to retrieve 200-1000 candidates at high
              recall (95-99%) within 5-20ms. The second stage applies a full
              ranking model with 50-200 features, including non-vector signals
              like click history, inventory status, and user segments. Final
              top-K (10-50) items returned to user.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CANDIDATE GENERATION (STAGE 1)
            </p>
            <p>
              ANN retrieves candidates likely to be relevant based on embedding
              similarity. The key metric is recall: what fraction of the true
              top-K items appear in the candidate set? If true #1 item is not in
              candidates, no amount of re-ranking can surface it.
            </p>
            <p>
              Over-retrieve to ensure coverage. If final output is top-10,
              retrieve 100-500 candidates. The ratio depends on how much
              re-ranking might reorder results. Highly personalized re-rankers
              need larger candidate sets.
            </p>
            <p>
              Multiple retrieval paths: query embedding matches item embeddings,
              but also retrieve by user history similarity, trending items in
              category, and business-promoted items. Merge candidates from all
              paths.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RE-RANKING (STAGE 2)
            </p>
            <p>
              Re-ranker is a full ML model (gradient boosted trees, neural
              network) with access to rich features. Feature categories:
            </p>
            <p>
              <strong>User features:</strong> click history, purchase history,
              demographic segments, session context, real-time behavior.
            </p>
            <p>
              <strong>Item features:</strong> popularity, recency, inventory,
              category, price, margin.
            </p>
            <p>
              <strong>Cross features:</strong> user-item affinity scores,
              collaborative filtering signals, price sensitivity match.
            </p>
            <p>
              Re-ranker computes score for each candidate, sorts, returns top-K.
              Latency budget: 20-50ms for 500 candidates. Requires efficient
              feature lookup and model inference.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY BUDGET ALLOCATION
            </p>
            <p>
              Total budget: 100ms. Typical split: 10ms ANN retrieval, 20ms
              feature lookup, 30ms model inference, 40ms buffer for network and
              processing. If any stage exceeds budget, latency target is missed.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Larger candidate sets improve
              final quality but increase re-ranking cost. Find the minimum
              candidate set size where further increases no longer improve final
              metrics.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">1 Billion Items</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Full corpus
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Stage 1: ANN Index</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Retrieve k=500 candidates
                    <br />
                    10ms latency, 97% recall
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Stage 2: Re-Ranker</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Full model on 500 items
                    <br />
                    30ms latency
                    <br />
                    Final ranked list
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 13px; width: 100%">
                  <strong>Total: 40ms, meets 100ms SLA</strong>
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
                  Two stages: ANN generates 200-1000 candidates fast, re-ranker
                  scores with rich features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stage 1 metric is recall—if true best item is not in
                  candidates, it cannot be surfaced
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Re-ranker uses features ANN cannot capture: user history,
                  freshness, business rules
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency budget split: ~10ms ANN, ~20ms features, ~30ms model,
                  ~40ms buffer
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
                  Interview Tip: Explain why pure vector search is
                  insufficient—embedding similarity misses user history,
                  freshness, business rules.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe candidate set sizing logic—retrieve
                  10-50x final output size, tune based on how much re-ranking
                  changes order.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApproximateNearestNeighborsTwoStageRetrievalAnnCandidateGenerationReRanking;
