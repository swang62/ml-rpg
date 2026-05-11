import type { Component } from "solid-js";

const LessonModelMonitoringObservabilitySemanticCachingAndRetrievalInvalidation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Semantic Caching and Retrieval Invalidation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Semantic Caching Works
            </p>
            <p style="margin-top: 0">
              Semantic caching delivers dramatic speedups and cost savings when
              queries repeat or cluster semantically. Instead of exact string
              matching, semantic caches embed incoming queries and retrieve
              prior answers when embedding distance falls below a threshold
              (commonly cosine similarity greater than 0.85 to 0.95). Production
              systems report up to 17x speedups when prompts repeat
              semantically, turning a 2 second generation into an instant cache
              hit under 100ms. This directly reduces cost per 1000 tokens by
              avoiding repeated LLM inference.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Freshness vs Hit Rate
            </p>
            <p style="margin-top: 0">
              Cached answers can propagate outdated information when underlying
              source documents or indexes change. The mitigation is embedding
              drift aware invalidation with TTL policies tuned by domain. High
              volatility domains like news or pricing use short TTLs (minutes to
              hours), while stable domains like documentation use longer TTLs
              (days to weeks). When the retrieval index refreshes or source
              documents update, invalidate impacted cache entries by tracking
              document identifiers or embedding clusters.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Pattern
            </p>
            <p style="margin-top: 0">
              Store query embeddings, generated responses, and metadata
              (timestamp, source document identifiers, model version) in a low
              latency key value store. On each incoming query, compute the
              embedding (2 to 10ms), perform ANN lookup in the cache (sub
              millisecond to 10ms), and return the cached response if distance
              is below threshold and TTL has not expired. Otherwise, proceed
              with full retrieval and generation, then insert the new result
              into the cache.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cache Pollution Failure
            </p>
            <p style="margin-top: 0">
              When a vendor model update changes output style or refusal
              behavior, cached answers from the old model persist until TTL
              expires, creating inconsistent user experience. Cache pollution
              occurs when low quality or incorrect answers get cached,
              propagating errors until manual invalidation. The mitigation is
              versioning cache entries by model identifier and prompt template
              hash, automatically invalidating old entries on model or template
              changes.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Query: "best Italian restaurant NYC"
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Embed query (2–10 ms) → ANN lookup
                  </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Cache Hit</strong>
                    <div style="margin-top: 4px; font-size: 11px">
                      Similarity &gt;0.90
                      <br />
                      TTL valid
                      <br />
                      Return in &lt;100 ms
                      <br />
                      17× speedup
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Cache Miss</strong>
                    <div style="margin-top: 4px; font-size: 11px">
                      Similarity &lt;0.90
                      <br />
                      Full pipeline
                      <br />
                      2–3 s generation
                      <br />
                      Insert result
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Invalidation Triggers</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    TTL expired (hours to days by domain)
                    <br />
                    Index refresh / doc update
                    <br />
                    Model version change
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
                  Semantic caching with embedding similarity threshold (commonly
                  cosine greater than 0.85 to 0.95) delivers up to 17× speedups,
                  reducing 2 second generation to under 100 millisecond cache
                  hit
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade off between hit rate and freshness: high volatility
                  domains (news, pricing) use short TTLs (minutes to hours),
                  stable domains (docs, historical question answer) use longer
                  TTLs (days to weeks)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Embed incoming query (2 to 10 milliseconds), perform ANN
                  lookup in cache (sub millisecond to 10 milliseconds), return
                  cached response if distance below threshold and TTL valid,
                  otherwise proceed with full pipeline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Version cache entries by model identifier and prompt template
                  hash to automatically invalidate old entries on model or
                  template changes, preventing inconsistent user experience from
                  semantic drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor cache hit rate, staleness rate (fraction flagged
                  outdated by user feedback), and re ask rate per cache hit to
                  detect and purge low quality cached responses proactively
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
                  Netflix recommendation explanations: semantic cache with 0.90
                  similarity threshold achieved 65 percent hit rate on similar
                  queries, reducing LLM inference cost by $40K per month
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb search assistant: 24 hour TTL for pricing queries, 7
                  day TTL for neighborhood descriptions, invalidate on index
                  refresh, staleness rate under 2 percent with drift detection
                  integration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber customer support: vendor model update from v1 to v2
                  changed refusal style, cached v1 answers persisted for 12
                  hours until TTL expired, creating inconsistent responses,
                  fixed by versioning cache keys with model identifier
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta content moderation: cache pollution from false positives
                  in early rollout, tracked thumbs down rate per cache hit,
                  purged entries with negative feedback greater than 10 percent
                  within 1 hour
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelMonitoringObservabilitySemanticCachingAndRetrievalInvalidation;
