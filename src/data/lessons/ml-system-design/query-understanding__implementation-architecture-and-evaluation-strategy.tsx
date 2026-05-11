import type { Component } from "solid-js";

const LessonQueryUnderstandingImplementationArchitectureAndEvaluationStrategy: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation Architecture and Evaluation Strategy
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Architecture Overview
            </p>
            <p style="margin-top: 0">
              Query understanding runs as a preprocessing pipeline before
              retrieval. Components execute in order: tokenization → spell
              correction → entity extraction → intent classification → query
              rewriting. Total latency budget: 10-30ms for interactive search.
              Each component has fallback behavior: if entity linking fails,
              proceed with raw tokens; if intent is uncertain, route to default
              backend. Failures should degrade gracefully, not block search.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Caching Strategies
            </p>
            <p style="margin-top: 0">
              Query understanding results are highly cacheable. Cache parsed
              queries with all signals (intent, entities, rewrites). Cache hit
              rates of 60-80% are typical since popular queries repeat
              frequently. Use query normalization (lowercase, whitespace
              collapse) as cache key. TTL depends on knowledge base update
              frequency: static KB can cache for hours; rapidly updating
              catalogs need minutes. Invalidate cache when underlying models or
              KB change.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation Metrics
            </p>
            <p style="margin-top: 0">
              <strong>Intent accuracy:</strong> Measure on held-out labeled set.
              Target: 90%+ for well-defined intents.{" "}
              <strong>Entity precision/recall:</strong> Precision (linked
              entities are correct), recall (all entities found). Target: 85%+
              for both. <strong>Rewriting quality:</strong> Measure indirectly
              through downstream search metrics. Good rewrites improve
              click-through rate 5-15% and reduce zero-result rate.{" "}
              <strong>End-to-end:</strong> A/B test query understanding changes
              against baseline; measure NDCG, CTR, and abandonment rate.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Deployment Pattern:</strong> Shadow mode first. Run new
              query understanding in parallel without affecting live traffic.
              Compare outputs against production. Validate metrics match or
              improve before switching.
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
                  Pipeline order: tokenization → spell correction → entity
                  extraction → intent → rewriting; 10-30ms budget
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Graceful degradation: if component fails, proceed with partial
                  signals rather than blocking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache hit rates 60-80% for parsed queries; normalize queries
                  as cache keys
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Targets: intent 90%+, entity precision/recall 85%+, rewrites
                  improve CTR 5-15%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow mode deployment: run in parallel, compare outputs
                  before switching traffic
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
                  Describe pipeline order with latency budget (10-30ms) for
                  architecture questions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention caching with 60-80% hit rates and normalization as key
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommend shadow mode deployment before switching live traffic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonQueryUnderstandingImplementationArchitectureAndEvaluationStrategy;
