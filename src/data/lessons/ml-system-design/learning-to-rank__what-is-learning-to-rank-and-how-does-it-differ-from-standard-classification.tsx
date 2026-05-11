import type { Component } from "solid-js";

const LessonLearningToRankWhatIsLearningToRankAndHowDoesItDifferFromStandardClassification: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Learning to Rank and How Does It Differ From Standard
            Classification?
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
                <strong>Learning to Rank (LTR)</strong> trains ML models to
                order items by relevance rather than classify them
                independently. The key difference from classification: ranking
                cares about relative order, not absolute scores. A model that
                scores all relevant items at 0.6 and irrelevant at 0.4 is
                useless for classification but perfect for ranking.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Standard Classification Fails
            </p>
            <p style="margin-top: 0">
              Classification predicts "relevant" or "not relevant" per item. Two
              problems: First, you lose ordering information within the relevant
              set (is item A more relevant than item B?). Second, the model
              optimizes per-item accuracy, not list quality. A model can have
              90% accuracy but produce terrible rankings if it misclassifies the
              few items users actually want.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Three LTR Approaches
            </p>
            <p style="margin-top: 0">
              <strong>Pointwise:</strong> Predict a relevance score per item,
              then sort. Simple but ignores item relationships.{" "}
              <strong>Pairwise:</strong> Predict which of two items is more
              relevant. Captures relative ordering but doesn"t optimize the full
              list. <strong>Listwise:</strong> Optimize the entire ranked list
              directly against metrics like NDCG. Best alignment with evaluation
              metrics but hardest to implement.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When You Need LTR
            </p>
            <p style="margin-top: 0">
              Use LTR when: you show users ordered lists (search results,
              recommendations, feeds); position matters (top-3 items get 80% of
              clicks); you have graded relevance labels (not just binary
              relevant/irrelevant). Simple heuristic scoring suffices for: small
              catalogs (&lt;1000 items), when users don"t expect
              personalization, or when ranking logic is easily expressible as
              rules.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Query: "wireless headphones"
                  </strong>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Retrieval: 12,000 candidates
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Latency: 15ms
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Learning to Rank: 500 candidates
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Features: 350, Latency: 22ms
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Top 20 Results</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    NDCG@10: 0.82, CTR: 3.4%
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
                  LTR optimizes relative order, not absolute scores; 0.6 vs 0.4
                  is useless for classification but perfect for ranking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Classification loses ordering within relevant items and
                  optimizes per-item accuracy, not list quality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three approaches: pointwise (score per item), pairwise
                  (compare pairs), listwise (optimize full list)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Listwise best aligns with evaluation metrics but is hardest to
                  implement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use LTR when position matters (top-3 get 80% of clicks) and
                  you have graded relevance labels
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
                  Explain why classification fails for ranking with the per-item
                  accuracy vs list quality distinction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the three approaches (pointwise/pairwise/listwise) as
                  a progression of sophistication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the 80% clicks on top-3 statistic to show
                  understanding of position importance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLearningToRankWhatIsLearningToRankAndHowDoesItDifferFromStandardClassification;
