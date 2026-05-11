import type { Component } from "solid-js";

const LessonModelResultCachingSemanticResultCacheArchitectureAndSimilarityThresholds: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Semantic Result Cache: Architecture and Similarity Thresholds
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT IS SEMANTIC RESULT CACHING
            </p>
            <p>
              Semantic result caching stores complete model outputs keyed by the
              meaning of the input, not just exact bytes. Unlike exact-match
              caches that require identical inputs, semantic caching returns
              cached results for inputs that are "close enough" to previous
              queries. The insight: many queries differ textually but share the
              same intent.
            </p>
            <p>
              Consider a recommendation system receiving "show me action movies"
              and "recommend action films." Exact-match cache misses both.
              Semantic cache recognizes these share intent and returns the same
              cached recommendation list. This can improve hit rates from 5%
              (exact match) to 40% (semantic match) for natural language
              queries.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EXACT MATCH VS SEMANTIC MATCH
            </p>
            <p>
              <strong>Exact match:</strong> Hash the raw input bytes. Fast O(1)
              lookup, guaranteed correctness, but low hit rate. Works for
              structured API requests with identical parameters. Miss rate is
              high when inputs vary in formatting, whitespace, or phrasing.
              Typical hit rate: 5-15% for natural language, 30-50% for
              structured queries.
            </p>
            <p>
              <strong>Semantic match:</strong> Embed the input query into a
              vector, then search for cached embeddings within a distance
              threshold. Higher hit rate but introduces approximate matching
              risk. You might return slightly wrong results if the similarity
              threshold is too loose. Typical hit rate: 30-60% for natural
              language queries.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SIMILARITY THRESHOLD TUNING
            </p>
            <p>
              The distance threshold determines when two queries are "similar
              enough" to share cached results. Too tight (cosine similarity &gt;
              0.99) and hit rate drops to near-zero. Too loose (&gt; 0.85) and
              you return wrong answers. Production systems typically tune to
              0.95-0.97 based on offline evaluation.
            </p>
            <p>
              Tuning process: collect 1000+ query pairs, label whether they
              should share results, measure precision/recall at different
              thresholds. Choose threshold where precision stays above 99% while
              maximizing recall. Different query types may need different
              thresholds—factual questions need tighter matching (0.98) than
              exploratory searches (0.93).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Semantic caches need separate
              TTLs for different query types. Trending topic queries expire in
              minutes. Evergreen factual queries cache for days. Static
              reference data caches for weeks.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Incoming Prompt</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    "How do I return shoes?"
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ embed
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Vector Search (HNSW)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Search 100M cached prompts
                    <br />
                    p95: 15ms • Find top 5 matches
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ threshold check
                </div>
                <div style="display: flex; gap: 8px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Match 0.92</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      "return shoes"
                      <br />✓ Reuse answer
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Match 0.78</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      "return jacket"
                      <br />✗ Below 0.85
                    </div>
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
                  Semantic caching matches similar queries, improving hit rate
                  from 5-15% to 30-60%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Similarity threshold typically 0.95-0.97 cosine distance for
                  production systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tuning requires labeled query pairs to measure
                  precision/recall tradeoff
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Different query types need different thresholds and TTLs
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
                  Interview Tip: Explain the hit rate improvement—exact match
                  gets 5-15% for natural language, semantic match gets 30-60%.
                  Quantify the value.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the threshold tuning process—collect
                  labeled pairs, measure precision/recall curve, choose 99%+
                  precision point.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelResultCachingSemanticResultCacheArchitectureAndSimilarityThresholds;
