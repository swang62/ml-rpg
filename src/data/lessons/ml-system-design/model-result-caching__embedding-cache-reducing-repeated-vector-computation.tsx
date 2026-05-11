import type { Component } from "solid-js";

const LessonModelResultCachingEmbeddingCacheReducingRepeatedVectorComputation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Embedding Cache: Reducing Repeated Vector Computation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT IS AN EMBEDDING CACHE
            </p>
            <p>
              Embedding caches store vector representations of inputs, saving
              the expensive forward pass through encoder models. When the same
              text, image, or audio appears again, retrieve the pre-computed
              embedding instead of re-running the encoder. Critical for systems
              where embedding computation dominates latency.
            </p>
            <p>
              The numbers: text embedding models take 10-50ms per input. Image
              encoders take 50-200ms. Audio encoders even longer. Caching
              embeddings drops this to sub-millisecond retrieval. For
              high-throughput systems processing millions of queries, embedding
              cache hit rate directly impacts infrastructure costs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EMBEDDING CACHE ARCHITECTURE
            </p>
            <p>
              <strong>In-memory (Redis, Memcached):</strong> Fastest retrieval
              at sub-millisecond latency but limited capacity. A 768-dimensional
              float32 embedding is 3KB. One million cached embeddings requires
              3GB RAM. Cost-effective for hot embeddings with high hit rates.
            </p>
            <p>
              <strong>SSD-backed stores:</strong> 10-100x more capacity than RAM
              at slightly higher latency (1-5ms). Good for warm
              embeddings—frequently accessed but not hot enough to justify RAM
              cost.
            </p>
            <p>
              <strong>Tiered architecture:</strong> Hot embeddings in memory,
              warm in SSD-backed store, cold recomputed on demand. Most
              production systems use this approach. Tier promotion/demotion
              based on access frequency.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRE-COMPUTATION VS LAZY CACHING
            </p>
            <p>
              <strong>Pre-computation:</strong> For known catalogs (products,
              documents), compute all embeddings offline before serving. Store
              in dedicated embedding store. Query-time embedding still needed
              for user queries, but catalog side is instant. Standard for search
              and recommendation systems with fixed item catalogs.
            </p>
            <p>
              <strong>Lazy caching:</strong> For user-generated content, compute
              embedding on first access, cache for future requests. Set TTL
              based on content update frequency. User profile embeddings might
              cache for hours, trending content embeddings for minutes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EMBEDDING VERSIONING
            </p>
            <p>
              When you update the embedding model, all cached embeddings become
              invalid. Old and new embeddings are not comparable—similarity
              scores are meaningless across versions. You must invalidate entire
              cache or maintain parallel caches during migration.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Include embedding model version
              in cache keys:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                &#123;model_name&#125;:&#123;model_version&#125;:&#123;input_hash&#125;
              </code>
              . This prevents cross-version cache pollution automatically.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Ingest Time: Document Embeddings
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Compute once → Store with version tag
                    <br />
                    TTL: weeks/months • Invalidate on update
                    <br />
                    Example: 10M product descriptions = 60GB RAM
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Query Time: Query Embeddings
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Cache with minute level TTL
                    <br />
                    Absorbs traffic bursts • 30-60% API call reduction
                    <br />
                    Key: hash(normalized_text + model_version)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Latency Impact</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Cache hit: &lt;1ms (in memory)
                    <br />
                    API call: 10-50ms
                    <br />
                    Savings: 10-50ms per embedding lookup
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
                  Embedding cache saves expensive encoder forward pass: 10-200ms
                  → sub-millisecond
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage math: 768-dim float32 = 3KB. 1M embeddings = 3GB RAM
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre-compute catalog embeddings offline, lazy-cache user query
                  embeddings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model version changes invalidate all cached embeddings—version
                  your cache keys
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
                  Interview Tip: Calculate storage requirements—1M embeddings ×
                  768 dims × 4 bytes = 3GB. Shows you understand infrastructure
                  sizing.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe tiered caching architecture—hot in
                  RAM, warm on SSD, cold recomputed—with access frequency
                  thresholds.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelResultCachingEmbeddingCacheReducingRepeatedVectorComputation;
