import type { Component } from "solid-js";

const LessonSearchEvaluationMrrAndPrecisionAtKWhenYouCareAboutTheFirstCorrectResult: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            MRR and Precision@K: When You Care About the First Correct Result
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
                <strong>MRR (Mean Reciprocal Rank)</strong> measures where the
                first relevant result appears. <strong>Precision@K</strong>{" "}
                measures what fraction of top-K results are relevant. Both use
                binary relevance.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MRR: When Users Want One Answer
            </p>
            <p style="margin-top: 0">
              Reciprocal Rank is 1 divided by the position of the first relevant
              result. First relevant at position 1: RR = 1.0. Position 3: RR =
              0.33. Position 10: RR = 0.1. No relevant in top-K: RR = 0. MRR
              averages this across queries. MRR of 0.5 means first relevant at
              position 2 on average.
            </p>
            <p>
              Use MRR for navigational queries ("facebook login") where users
              want exactly one answer. Position 1 versus 2 matters enormously;
              position 5 versus 6 barely matters. MRR captures this through the
              1/position formula.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Precision@K: What Fraction of Results Are Good
            </p>
            <p style="margin-top: 0">
              Precision@K = relevant items in top-K divided by K. If top-10 has
              6 relevant items, Precision@10 = 0.6. Position within top-K does
              not matter: [relevant, relevant, irrelevant] and [irrelevant,
              relevant, relevant] both score 0.67.
            </p>
            <p>
              Use Precision@K when users scan multiple results: image search,
              product listings. High Precision@10 means mostly relevant items
              without scrolling past garbage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing Between MRR, Precision, and NDCG
            </p>
            <p style="margin-top: 0">
              <strong>MRR:</strong> Single answer matters (navigational search,
              QA). <strong>Precision@K:</strong> Multiple results matter equally
              (product grid). <strong>NDCG:</strong> Multiple results with
              different quality levels. In practice, teams track multiple: NDCG
              for overall quality, MRR for navigational, Precision for coverage.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> MRR and Precision use binary
              relevance, ignoring quality gradations. If distinguishing
              "somewhat" from "highly" relevant matters, use NDCG.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Request: 50k–200k QPS</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    P95 latency &lt; 100–200ms (search)
                    <br />
                    &lt; 50ms (autocomplete)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Ranking + Logging</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Impression events: request_id, position, item_id, features
                  </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: center">
                  <div style="font-size: 20px; font-weight: bold">↓</div>
                  <div style="font-size: 20px; font-weight: bold">↓</div>
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Click Events</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Seconds latency
                      <br />
                      Join by request_id
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Dwell Events</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Minutes to hours
                      <br />
                      24h watermark window
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Metrics Pipeline</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Streaming: Minute latency, approximate CTR
                    <br />
                    Batch: Daily, full reconciliation with late events
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
                  MRR = 1/position of first relevant, averaged. MRR 0.5 means
                  first relevant at position 2 on average.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use MRR for navigational queries where users want one answer.
                  Position 1 vs 2 matters greatly.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Precision@K = relevant in top-K / K. Position within K does
                  not matter, only count.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use Precision@K for multiple equally-relevant results: product
                  grids, image galleries.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Binary limitation: MRR and Precision cannot distinguish
                  somewhat from highly relevant.
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
                  Walk through MRR: position 1 = 1.0, position 3 = 0.33,
                  position 10 = 0.1. Average across queries.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose metric by use case: MRR for single-answer, Precision
                  for equally relevant results, NDCG for graded.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Note binary limitation: these metrics treat all relevant items
                  the same regardless of quality.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchEvaluationMrrAndPrecisionAtKWhenYouCareAboutTheFirstCorrectResult;
