import type { Component } from "solid-js";

const LessonModelResultCachingFailureModesCacheStampedeEmbeddingDriftAndFalsePositives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Cache Stampede, Embedding Drift, and False Positives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CACHE STAMPEDE
            </p>
            <p>
              Cache stampede occurs when a popular cache entry expires and
              hundreds of concurrent requests all miss cache simultaneously. All
              requests hit the model at once, potentially overwhelming it. For
              ML systems this is especially dangerous—model inference is
              expensive, so a stampede can cascade into complete service
              degradation.
            </p>
            <p>
              <strong>Prevention strategies:</strong>
            </p>
            <p>
              <strong>Probabilistic early refresh:</strong> Each request has a
              small probability of refreshing the cache before TTL expires.
              Spreads refresh load over time instead of concentrating at
              expiration.
            </p>
            <p>
              <strong>Single-flight pattern:</strong> When cache misses, only
              one request actually computes. Others wait for that result.
              Requires coordination (mutex, semaphore) but eliminates duplicate
              computation.
            </p>
            <p>
              <strong>Stale-while-revalidate:</strong> Serve stale result
              immediately while triggering background refresh. User gets fast
              response, cache gets updated asynchronously. Trades freshness for
              availability.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STALE CACHE SERVING
            </p>
            <p>
              Stale results happen when cached data no longer reflects current
              model behavior or world state. Recommendation system returns
              cached suggestions for products now out of stock. Model was
              updated but old predictions still served from cache.
            </p>
            <p>
              Detection: monitor cache age distribution and compare cached vs
              fresh results on sampled traffic. If divergence exceeds threshold,
              cache is too stale. Set up automatic invalidation triggers based
              on detected staleness. Alert when stale serving rate exceeds your
              SLO (e.g., &gt;5% of responses older than 1 hour).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CACHE POISONING
            </p>
            <p>
              Cache poisoning stores incorrect results that get served
              repeatedly to many users. In ML systems, this happens when model
              returns an error response that gets cached, or when adversarial
              input produces a bad cached result. Semantic caching adds risk—one
              poisoned entry can affect all similar queries through approximate
              matching.
            </p>
            <p>
              Defenses: validate model outputs before caching (sanity checks on
              format, confidence scores, content). Use shorter TTL for uncertain
              predictions. Never cache error responses.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Critical:</strong> Never cache error responses. A model
              timeout cached and served for hours is far worse than repeated
              timeouts. Always validate response format and confidence before
              storing.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Cache Stampede</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10K concurrent misses → Backend overload
                    <br />✓ Fix: Single flight dedup, serve stale
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Embedding Drift</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Model upgrade: 768d → 1536d vectors
                    <br />✓ Fix: Namespace by model version
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Semantic False Positive
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    "return shoes" matches "return jacket" 0.82
                    <br />✓ Fix: Metadata align, verifier model, min length
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Data Leakage</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Missing tenant_id in key → Cross customer data
                    <br />✓ Fix: Mandatory tenant partitioning, encrypt at rest
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
                  Cache stampede: popular entry expires, hundreds of requests
                  hit model simultaneously
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prevent stampede with probabilistic early refresh,
                  single-flight, or stale-while-revalidate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detect staleness by comparing cached vs fresh results on
                  sampled traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Never cache error responses—validate outputs before storing
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
                  Interview Tip: Explain the stampede prevention
                  trifecta—probabilistic refresh spreads load, single-flight
                  dedupes, stale-while-revalidate prioritizes availability.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe cache poisoning risk in semantic
                  caching—one bad entry affects all similar queries through
                  approximate matching.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelResultCachingFailureModesCacheStampedeEmbeddingDriftAndFalsePositives;
