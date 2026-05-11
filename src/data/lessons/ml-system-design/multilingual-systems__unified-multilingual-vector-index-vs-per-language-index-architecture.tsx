import type { Component } from "solid-js";

const LessonMultilingualSystemsUnifiedMultilingualVectorIndexVsPerLanguageIndexArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Unified Multilingual Vector Index vs Per-Language Index Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              UNIFIED MULTILINGUAL INDEX
            </p>
            <p>
              Single index containing vectors from all languages. Multilingual
              embedding model maps semantically similar content close together
              regardless of source language.
            </p>
            <p>
              <strong>Advantages:</strong> Simpler architecture. Single index to
              maintain. Cross-lingual retrieval automatic—query in English,
              retrieve Spanish documents that are semantically relevant.
            </p>
            <p>
              <strong>Disadvantages:</strong> Multilingual embeddings are less
              precise than monolingual. Cross-lingual retrieval recall typically
              10-20% lower than same-language. Index size includes all
              languages.
            </p>
            <p>
              Best for: systems where cross-lingual retrieval is valuable and
              slight quality degradation is acceptable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PER-LANGUAGE INDEXES
            </p>
            <p>
              Separate index for each language. Language-specific embedding
              models optimized for each language.
            </p>
            <p>
              <strong>Advantages:</strong> Higher retrieval quality per
              language. Index size per language is smaller. Can use
              best-in-class models for each language.
            </p>
            <p>
              <strong>Disadvantages:</strong> More indexes to maintain. No
              automatic cross-lingual retrieval—need explicit translation or
              separate cross-lingual queries. Routing logic required.
            </p>
            <p>
              Best for: high-quality requirements where each language market is
              important and cross-lingual retrieval is not needed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HYBRID ARCHITECTURE
            </p>
            <p>
              Unified index for cross-lingual discovery plus per-language
              indexes for high-quality same-language retrieval. Query both,
              merge results.
            </p>
            <p>
              <strong>Implementation:</strong> Use unified index for initial
              retrieval (cast wide net). Use per-language index for re-ranking
              (precision). Combine scores with tunable weights.
            </p>
            <p>
              Complexity vs quality trade-off: this approach gets best of both
              but requires maintaining multiple index types and merge logic.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SCALING CONSIDERATIONS
            </p>
            <p>
              Per-language indexes scale horizontally by language—add new
              language, add new index. Unified index grows with total corpus.
              Choose based on expected language growth and corpus size.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> Unified for simplicity and
              cross-lingual needs. Per-language for quality-critical markets.
              Hybrid when you need both cross-lingual discovery and high
              same-language precision.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Unified Multilingual Index
                  </strong>
                  <div style="font-size: 11px; line-height: 1.6">
                    <strong>Pros:</strong>
                    <br />✓ Cross-lingual retrieval natural
                    <br />✓ One infrastructure stack
                    <br />✓ Easy deduplication
                    <br />
                    <br />
                    <strong>Cons:</strong>
                    <br />✗ 5-15% lower NDCG same-language
                    <br />✗ Score calibration complex
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Per-Language Indices
                  </strong>
                  <div style="font-size: 11px; line-height: 1.6">
                    <strong>Pros:</strong>
                    <br />✓ Higher monolingual precision
                    <br />✓ Per-language calibration
                    <br />
                    <br />
                    <strong>Cons:</strong>
                    <br />✗ 3x infrastructure (3 languages)
                    <br />✗ Cross-language needs fanout
                    <br />✗ Complex score normalization
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px">
                <strong style="font-size: 12px">
                  Hybrid Production Pattern:
                </strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Per-language for major languages (80% traffic) + Unified
                  multilingual for long-tail and cross-language fallback (20%
                  traffic) | 9 query-doc language pairs monitored
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
                  Unified index: simpler, automatic cross-lingual retrieval;
                  10-20% recall penalty vs monolingual
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per-language indexes: higher quality, smaller per-language; no
                  automatic cross-lingual, routing complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid: unified for discovery + per-language for precision;
                  best quality but highest complexity
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
                  Interview Tip: Compare unified vs per-language:
                  simplicity/cross-lingual vs quality/complexity.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe hybrid query flow: unified retrieval →
                  per-language re-ranking → merge.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultilingualSystemsUnifiedMultilingualVectorIndexVsPerLanguageIndexArchitecture;
