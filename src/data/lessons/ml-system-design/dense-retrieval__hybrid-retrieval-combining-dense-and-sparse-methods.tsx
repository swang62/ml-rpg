import type { Component } from "solid-js";

const LessonDenseRetrievalHybridRetrievalCombiningDenseAndSparseMethods: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hybrid Retrieval: Combining Dense and Sparse Methods
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
                <strong>Hybrid retrieval</strong> combines dense semantic search
                with sparse keyword matching. The intuition: dense excels at
                synonyms and paraphrases; sparse excels at rare terms and exact
                matches. Together they cover more relevant documents than either
                alone.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fusion Strategies
            </p>
            <p style="margin-top: 0">
              <strong>Score fusion:</strong> Normalize scores from each
              retriever, combine with weights:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                score = α × dense_score + (1-α) × sparse_score
              </code>
              . Typical α: 0.5-0.7. <strong>Rank fusion:</strong> Merge by rank
              position (RRF - Reciprocal Rank Fusion). More robust to score
              scale differences. <strong>Cascade:</strong> Use sparse for
              initial recall, dense for re-ranking. Reduces dense inference
              cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Hybrid Outperforms
            </p>
            <p style="margin-top: 0">
              Dense models miss queries with rare terms (product IDs, technical
              jargon, proper nouns not in training data). Sparse models miss
              semantic matches ("inexpensive" for "cheap"). Hybrid catches both.
              Empirically: hybrid improves recall@100 by 5-15% over either
              method alone. The improvement is largest on mixed query types;
              homogeneous query sets may see smaller gains.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Considerations
            </p>
            <p style="margin-top: 0">
              Run both retrievers in parallel to minimize latency. Normalize
              scores before fusion (dense and sparse scores are on different
              scales). Tune fusion weights on held-out data; optimal α varies by
              domain. For cascade, dense re-ranks sparse top-100 or top-200;
              larger candidate sets improve recall but increase cost.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Hybrid doubles infrastructure
              complexity and cost. Justify with measured recall gains on your
              specific query distribution.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Query: "laptop MX-5792B cooling"
                  </strong>
                </div>
                <div style="display: flex; gap: 24px; width: 100%; justify-content: center">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                    <div style="font-size: 20px; font-weight: bold">↓</div>
                    <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 140px">
                      <strong style="font-size: 13px">
                        Dense Retrieval
                        <br />
                        (Semantic)
                      </strong>
                    </div>
                    <div style="font-size: 11px; margin-top: 4px; text-align: center">
                      5 to 20ms
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                    <div style="font-size: 20px; font-weight: bold">↓</div>
                    <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 140px">
                      <strong style="font-size: 13px">
                        Sparse BM25
                        <br />
                        (Exact Match)
                      </strong>
                    </div>
                    <div style="font-size: 11px; margin-top: 4px; text-align: center">
                      5 to 15ms
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Score Fusion
                    <br />
                    0.7 × dense + 0.3 × sparse
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Top 100 Merged Results
                  </strong>
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
                  Hybrid combines dense (synonyms) and sparse (rare terms);
                  together covers more than either alone
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fusion methods: score fusion (α weighting), rank fusion (RRF),
                  cascade (sparse → dense re-rank)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical α: 0.5-0.7 for score fusion; tune on held-out data per
                  domain
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid improves recall@100 by 5-15% over single methods;
                  largest gains on mixed query types
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Run retrievers in parallel; normalize scores before fusion
                  (different scales)
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
                  Explain the score fusion formula with typical α values
                  (0.5-0.7)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe why hybrid outperforms with specific examples (rare
                  terms, synonyms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention RRF as robust alternative to score fusion when scales
                  differ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDenseRetrievalHybridRetrievalCombiningDenseAndSparseMethods;
