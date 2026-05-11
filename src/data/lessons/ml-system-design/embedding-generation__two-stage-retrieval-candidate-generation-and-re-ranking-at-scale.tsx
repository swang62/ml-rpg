import type { Component } from "solid-js";

const LessonEmbeddingGenerationTwoStageRetrievalCandidateGenerationAndReRankingAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Two Stage Retrieval: Candidate Generation and Re-ranking at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY TWO STAGES
            </p>
            <p>
              Embedding search is fast but approximate—it captures semantic
              similarity but misses personalization, freshness, and business
              rules. Rich ML models are accurate but slow—they can incorporate
              hundreds of features but cannot score millions of items. Two-stage
              retrieval combines both strengths.
            </p>
            <p>
              Stage 1 (retrieval): ANN search returns 100-1000 candidates in
              5-20ms. The metric is recall—did we retrieve items that are truly
              relevant? This stage filters millions down to hundreds.
            </p>
            <p>
              Stage 2 (re-ranking): An ML model scores each candidate using rich
              features (user history, item popularity, price, freshness).
              Returns final top 10-50. The metric is precision and NDCG—did we
              rank the relevant items correctly?
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CANDIDATE SET SIZING
            </p>
            <p>
              Retrieve enough candidates that true positives are included. If
              final output is top-10 recommendations, retrieve 100-500
              candidates. The exact ratio depends on embedding quality and
              re-ranker power.
            </p>
            <p>
              Under-retrieval risk: true positives missing from candidate set.
              The re-ranker cannot surface items it never sees—recall is capped
              at Stage 1. Over-retrieval cost: re-ranker latency increases
              linearly with candidate count. Find the minimum candidate set that
              maintains target recall.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RE-RANKER FEATURES
            </p>
            <p>
              <strong>User features:</strong> click history, purchase history,
              demographic segments, session context, device type.
            </p>
            <p>
              <strong>Item features:</strong> popularity score, days since
              creation, price tier, category, inventory status.
            </p>
            <p>
              <strong>Cross features:</strong> user-item affinity scores,
              collaborative filtering signals, price sensitivity
              match—personalization signals that embeddings cannot capture.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Embeddings capture semantic
              similarity. Re-rankers add business logic, personalization,
              freshness, and inventory awareness. Both stages are necessary for
              high-quality production recommendations.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Query: "best running shoes"
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Stage 1: Candidate Generation
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    SBERT query embedding: 5ms
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    HNSW search 100M docs: 15ms
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    <strong>Output:</strong> Top 1000 candidates (0.90 recall)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Stage 2: Re-ranking</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Cross encoder on top 150: 60ms
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    Joint query+doc encoding
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    <strong>Output:</strong> Top 20 with precise scores
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Final: 20 Results</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Total latency: ~80ms | Precision +12%
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
                  Stage 1 (ANN): 100-1000 candidates in 5-20ms, optimizes for
                  recall
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stage 2 (re-ranker): scores with rich features, optimizes for
                  precision/NDCG
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Candidate set sizing: enough to include true positives,
                  minimum for latency
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
                  Interview Tip: Explain why two stages—embeddings are fast but
                  miss personalization; re-rankers add business logic.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe candidate set sizing
                  trade-off—under-retrieval caps recall, over-retrieval hurts
                  latency.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingGenerationTwoStageRetrievalCandidateGenerationAndReRankingAtScale;
