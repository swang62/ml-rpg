import type { Component } from "solid-js";

const LessonQueryUnderstandingQueryRewritingForImprovedRecallAndPrecision: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Query Rewriting for Improved Recall and Precision
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
                <strong>Query rewriting</strong> transforms the original query
                into one or more alternative queries that retrieve better
                results. Types include: expansion (add synonyms), correction
                (fix typos), relaxation (remove constraints), and reformulation
                (rephrase entirely).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Expansion for Recall
            </p>
            <p style="margin-top: 0">
              Query expansion adds terms to match more documents. "ML tutorial"
              expands to "machine learning tutorial OR ML tutorial OR deep
              learning tutorial." Sources: synonym dictionaries, word embeddings
              (cosine similarity &gt; 0.8), query logs (queries that led to same
              clicks). Risk: expansion drift. "Java" expands to "coffee" in a
              programming context. Constrain expansions using domain signals or
              entity types.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Spell Correction
            </p>
            <p style="margin-top: 0">
              5-10% of queries contain typos. Correction pipeline: detect if
              word is out-of-vocabulary, generate candidates (edit distance ≤
              2), rank by language model probability and query log frequency.
              "machien lerning" → "machine learning." Confidence thresholds
              matter: auto-correct high-confidence fixes, show "did you mean?"
              for uncertain ones. Over-correction frustrates users who typed
              intentionally unusual terms.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Relaxation for Zero-Result Queries
            </p>
            <p style="margin-top: 0">
              When a query returns no results, progressively relax constraints.
              "red Nike running shoes size 12 under $100" relaxes to: remove
              price filter, then remove size, then remove color. Each relaxation
              trades precision for recall. Show users why results differ: "No
              exact matches. Showing similar items." Alternatively, use semantic
              search to find approximate matches without explicit relaxation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Production Pattern:</strong> Run original query and
              rewritten queries in parallel. Merge results, de-duplicate,
              re-rank. This captures both exact matches and expanded matches
              without latency penalty.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Original Query</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    "mens dress shirts"
                  </div>
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Surface Analysis</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Normalize: "men's dress shirt"
                    </div>
                    <div style="font-size: 11px; margin-top: 3px">
                      Remove plurals, standardize possessive
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Behavioral Evidence</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Co-click: "dress shirts for men"
                    </div>
                    <div style="font-size: 11px; margin-top: 3px">
                      Jaccard similarity: 0.73
                    </div>
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Rewrite Candidates</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    1. "men's dress shirt" (confidence: 0.92)
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    2. "formal shirts men" (confidence: 0.78)
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    3. "button down shirts" (confidence: 0.65)
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Guardrails Applied</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Token inflation: 1.2x ✓ (under 2x limit)
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    Semantic similarity: 0.88 ✓ (above 0.75)
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    Final: "men's dress shirt"
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
                  Rewriting types: expansion (synonyms), correction (typos),
                  relaxation (remove constraints), reformulation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Expansion sources: synonym dictionaries, embeddings (cosine
                  &gt; 0.8), query logs (same-click queries)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  5-10% of queries have typos; use edit distance ≤ 2 candidates
                  ranked by language model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Relaxation trades precision for recall; show users why results
                  differ from original query
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Run original and rewritten queries in parallel, merge and
                  re-rank to avoid latency penalty
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
                  List the four rewriting types (expansion, correction,
                  relaxation, reformulation) as framework
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe spell correction pipeline (OOV detection → candidates
                  → ranking) with confidence thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention parallel query execution pattern for production
                  systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonQueryUnderstandingQueryRewritingForImprovedRecallAndPrecision;
