import type { Component } from "solid-js";

const LessonSemanticSearchNlpSemanticVsKeywordSearchWhenToUseEachAndHybridApproaches: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Semantic vs Keyword Search: When to Use Each and Hybrid Approaches
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Semantic vs Keyword Search
            </p>
            <p style="margin-top: 0">
              Semantic search excels at understanding intent but struggles with
              exact matches. A search for "error code 404" might return general
              articles about web errors because the embedding captures "error
              concepts" rather than the specific code. Keyword search finds that
              exact string immediately. The reverse happens with conceptual
              queries: "why is my website broken" finds nothing with keywords
              but works perfectly with semantic search.
            </p>
            <p>
              Most production systems use hybrid search: semantic results merged
              with keyword results via reciprocal rank fusion or re-ranking. The
              hybrid approach captures both exact matches and conceptual
              relevance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost vs Quality
            </p>
            <p style="margin-top: 0">
              Better embedding models cost more. At scale, embedding costs can
              exceed storage and compute costs. Start with the best model,
              measure quality on your data, then test cheaper alternatives. If
              quality drops less than 10% while cost drops 80%, the cheaper
              model wins.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Storage scales with dimensions
              times documents. 10M documents at 1536 dimensions uses 60GB.
              Reducing to 384 dims cuts to 15GB but may reduce search quality.
              Run A/B tests to quantify impact.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency vs Recall
            </p>
            <p style="margin-top: 0">
              ANN parameter tuning controls latency-recall. HNSW's ef_search
              determines candidates to explore: higher values find more
              neighbors but take longer. A system at 10ms might achieve 90%
              recall; 50ms might push to 98%. Decide based on result criticality
              - 90% recall means 1 in 10 relevant articles is missed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When NOT to Use
            </p>
            <p style="margin-top: 0">
              Semantic search adds complexity. For structured queries (filter by
              date, category), traditional indices are faster. For exact lookups
              (SKU, order ID), keyword search is superior. Use semantic when
              users express intent in natural language.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Semantic search struggles with exact matches ('error 404')
                  while keyword search fails on conceptual queries ('why is my
                  site broken') - hybrid combines both
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage formula: 10M docs at 1536 dims = 60GB vectors;
                  reducing to 384 dims cuts to 15GB but may reduce quality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  HNSW ef_search parameter controls recall-latency: 10ms queries
                  might achieve 90% recall, 50ms might reach 98%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Skip semantic search for structured queries (date filters) and
                  exact lookups (SKU, order IDs) - traditional indices are
                  better
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
                  Give the hybrid search example: 'error code 404' needs keyword
                  match, 'why is my website broken' needs semantic. Production
                  systems use both.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calculate storage: dimensions times docs times 4 bytes. 1536
                  dims at 10M docs = 60GB. Show you can estimate infrastructure
                  needs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Frame the when-not-to-use: semantic search adds cost and
                  complexity. For SKU lookup or date filters, traditional DB is
                  better.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSemanticSearchNlpSemanticVsKeywordSearchWhenToUseEachAndHybridApproaches;
