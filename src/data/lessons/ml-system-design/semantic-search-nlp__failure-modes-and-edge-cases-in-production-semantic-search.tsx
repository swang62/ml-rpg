import type { Component } from "solid-js";

const LessonSemanticSearchNlpFailureModesAndEdgeCasesInProductionSemanticSearch: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Production Semantic Search
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Embedding Drift
            </p>
            <p style="margin-top: 0">
              When you update your embedding model, all existing vectors become
              incompatible. The new model produces vectors in a different
              semantic space - even identical text gets different coordinates.
              Documents embedded with model v1 will not match queries embedded
              with v2. The vectors speak different languages.
            </p>
            <p>
              The solution is re-embedding your entire corpus when changing
              models. For millions of documents, this takes hours to days. Plan
              model updates carefully: verify quality improvements justify the
              re-embedding cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Query-Document Length Mismatch
            </p>
            <p style="margin-top: 0">
              Short queries and long documents may not align well. A 5-word
              query captures limited context; a 2000-word document's embedding
              averages over many concepts. Models trained specifically for
              retrieval (e5, bge) use asymmetric training that optimizes for
              short query to long document matching.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Common Failure:</strong> Generic sentence embedding
              models trained on similar-length text pairs underperform on
              retrieval tasks. Use models designed for asymmetric retrieval.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Out-of-Domain Queries
            </p>
            <p style="margin-top: 0">
              Models trained on general text may fail on specialized domains.
              Medical terminology or legal jargon might not embed correctly.
              Test your model on representative domain queries before
              deployment. If generic models fail, fine-tune on domain data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              False Confidence
            </p>
            <p style="margin-top: 0">
              Semantic search always returns results, even for nonsense queries.
              There is no "no results found." A query about "quantum banana
              teleportation" returns the closest documents, even if none are
              relevant. Set minimum similarity thresholds. Monitor if users
              frequently click result 5+ (indicating top results were not
              helpful).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; font-weight: bold; font-size: 15px; text-align: center">
                Filter Leakage Problem
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    ANN retrieves top 100 neighbors
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Mixed languages and tenants
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Apply filter: language=English
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Only 8 items pass filter
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    92% discarded, poor UX
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Solution
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Prefilter or separate indices
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Keyword prefilter → ANN on candidates
                    <br />
                    OR per language index with routing
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
                  Model updates make all existing vectors incompatible -
                  re-embedding millions of docs takes hours to days. Plan
                  updates carefully.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Short queries and long documents may not align well - use
                  retrieval-specific models (e5, bge) designed for asymmetric
                  matching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Generic models fail on specialized domains (medical, legal) -
                  test on representative queries before deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Semantic search always returns results, even for nonsense
                  queries - set minimum similarity thresholds and monitor
                  click-through patterns
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
                  Explain embedding drift: changing models is like changing
                  languages. Documents in French (v1) do not match queries in
                  Spanish (v2).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommend retrieval-specific models: e5, bge, and similar are
                  trained for short-query-to-long-document asymmetry.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the false confidence problem: 'quantum banana
                  teleportation' always returns something. Monitor if users
                  click beyond result 3.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSemanticSearchNlpFailureModesAndEdgeCasesInProductionSemanticSearch;
