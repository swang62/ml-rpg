import type { Component } from "solid-js";

const LessonModelResultCachingCacheKeyDesignAndCanonicalizationForHighHitRates: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cache Key Design and Canonicalization for High Hit Rates
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY CACHE KEY DESIGN MATTERS
            </p>
            <p>
              Cache key design determines what gets cached together versus
              separately. Poor key design causes either cache pollution
              (returning wrong results to users) or cache fragmentation (same
              computation cached multiple times under different keys, wasting
              memory).
            </p>
            <p>
              Consider a search ranking model. Should two users searching
              "laptops" share cached results? Depends on whether personalization
              affects rankings. If yes, user ID must be in the cache key. If
              rankings are identical for all users, including user ID fragments
              the cache unnecessarily—you store N copies of the same result. Key
              design encodes your caching policy.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KEY COMPONENTS FOR ML SYSTEMS
            </p>
            <p>
              <strong>Model version:</strong> Almost always required. Caching
              results from model v1 and returning them for model v2 queries
              gives stale results. Include model hash or version number in every
              cache key.
            </p>
            <p>
              <strong>Feature schema version:</strong> If feature extraction
              changes, cached embeddings become invalid. A user embedding
              computed with 50 features is incompatible with a model expecting
              75 features.
            </p>
            <p>
              <strong>Input normalization:</strong> Raw text " Hello World " and
              "hello world" should hit the same cache entry if your model treats
              them identically. Canonicalize inputs before hashing: lowercase,
              strip whitespace, sort dictionary keys. Document the normalization
              rules so the team applies them consistently.
            </p>
            <p>
              <strong>Context handling:</strong> For LLMs, should different
              conversation histories sharing the same final user query hit the
              same cache? Usually no—context changes output. Include
              conversation fingerprint in key.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HIERARCHICAL CACHE KEYS
            </p>
            <p>
              Structure keys hierarchically for efficient invalidation. Format:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                &#123;model_version&#125;:&#123;feature_version&#125;:&#123;input_hash&#125;
              </code>
              . When model updates, invalidate by prefix. When features change,
              invalidate that segment. Granular invalidation without full cache
              flush.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Hash collisions return wrong
              results silently. Use SHA-256 for correctness. MD5 and CRC32 have
              higher collision probability. 64-bit hashes are usually
              sufficient—collision probability at 1 billion keys is still 1 in a
              million.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                <div style="font-weight: bold; margin-bottom: 10px; font-size: 15px">
                  Cache Key Components
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px">
                  <div style="padding: 8px; border: 2px solid; border-radius: 4px; font-size: 13px">
                    <strong>Model:</strong> gpt-4-0125-preview
                  </div>
                  <div style="padding: 8px; border: 2px solid; border-radius: 4px; font-size: 13px">
                    <strong>Template Hash:</strong> a3f5d891
                  </div>
                  <div style="padding: 8px; border: 2px solid; border-radius: 4px; font-size: 13px">
                    <strong>Params:</strong> temp=0.7, top_p=0.9
                  </div>
                  <div style="padding: 8px; border: 2px solid; border-radius: 4px; font-size: 13px">
                    <strong>Tenant:</strong> acme_corp
                  </div>
                  <div style="padding: 8px; border: 2px solid; border-radius: 4px; font-size: 13px">
                    <strong>Locale:</strong> en_US
                  </div>
                  <div style="padding: 8px; border: 2px solid; border-radius: 4px; font-size: 13px">
                    <strong>Canonicalized Prompt:</strong>
                    <br />
                    "how do i reset my password"
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
                  Cache key encodes caching policy—what shares results vs what
                  gets separate entries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Include model version, feature version, and normalized input
                  hash in keys
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canonicalize inputs before hashing: lowercase, strip
                  whitespace, sort keys
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hierarchical key format enables granular invalidation by
                  prefix
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
                  Interview Tip: Discuss the tradeoff between key specificity
                  and hit rate—more specific keys prevent wrong results but
                  fragment cache.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain input canonicalization with a concrete
                  example—why two textually different inputs should sometimes
                  share cache.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelResultCachingCacheKeyDesignAndCanonicalizationForHighHitRates;
