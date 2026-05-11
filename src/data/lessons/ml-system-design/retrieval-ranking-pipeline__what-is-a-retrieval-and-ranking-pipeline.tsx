import type { Component } from "solid-js";

const LessonRetrievalRankingPipelineWhatIsARetrievalAndRankingPipeline: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is a Retrieval and Ranking Pipeline?
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
                <strong>Retrieval and Ranking Pipeline</strong> is a two stage
                architecture that first narrows billions of items to thousands
                (retrieval), then scores and orders those candidates (ranking)
                to produce recommendations.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE CORE PROBLEM
            </p>
            <p style="margin-top: 0">
              With 100 million items, scoring each with a neural network at 5ms
              would take 500,000 seconds per request. Users expect results in
              200ms. The pipeline solves this by splitting work into two phases
              with different computational budgets.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY TWO STAGES
            </p>
            <p style="margin-top: 0">
              Retrieval uses lightweight methods: approximate nearest neighbor
              search or inverted indexes. These scan millions of items in 10 to
              50ms by sacrificing some accuracy, returning 1,000 to 10,000
              candidates. Ranking applies expensive models with hundreds of
              features, spending 1 to 5ms per item. With 1,000 candidates
              parallelized across machines, ranking fits the latency budget.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE FUNDAMENTAL TRADEOFF
            </p>
            <p style="margin-top: 0">
              Retrieval prioritizes recall (not missing good items) over
              precision. Missing a great item means it can never be ranked.
              Ranking prioritizes precision, ordering candidates so the best
              appear first. This division lets the system balance quality
              against latency.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The pipeline is only as good as
              its weakest stage. A perfect ranker cannot recover items retrieval
              missed, and perfect retrieval is wasted if ranking orders items
              poorly.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Millions of Items</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Full Corpus
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Retrieval Stage</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    High Recall: 1–10ms
                  </div>
                  <div style="font-size: 12px">Output: 500–10K candidates</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Ranking Stage</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    High Precision: 30–100ms
                  </div>
                  <div style="font-size: 12px">Output: Top 10–100 items</div>
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
                  Two stage architecture: retrieval narrows billions to
                  thousands, ranking orders the final results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retrieval uses lightweight methods (ANN, inverted indexes)
                  completing in 10-50ms across millions of items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ranking applies complex models with hundreds of features,
                  spending 1-5ms per candidate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retrieval optimizes for recall (not missing good items),
                  ranking optimizes for precision (correct ordering)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipeline quality is limited by its weakest stage - missed
                  items in retrieval cannot be recovered
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
                  When asked about latency budgets, mention typical splits: 50ms
                  retrieval + 100ms ranking + 50ms network = 200ms total
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss the recall vs precision tradeoff by stage - retrieval
                  aims for 95%+ recall, ranking aims for precision@10
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain why single-stage systems fail: 100M items × 5ms = 500K
                  seconds, impossible for real-time serving
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRetrievalRankingPipelineWhatIsARetrievalAndRankingPipeline;
