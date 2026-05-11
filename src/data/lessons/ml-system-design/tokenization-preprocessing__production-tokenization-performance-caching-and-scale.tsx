import type { Component } from "solid-js";

const LessonTokenizationPreprocessingProductionTokenizationPerformanceCachingAndScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Tokenization: Performance, Caching, and Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tokenization Latency
            </p>
            <p style="margin-top: 0">
              Tokenization happens on every request. At 10,000 QPS with
              500-token average inputs, you tokenize 5 million tokens per
              second. A naive implementation at 1μs per token adds 500μs per
              request. Optimized implementations hit 10-50ns per token, adding
              only 5-25μs per request.
            </p>
            <p>
              For large language model inference where generation takes
              100-500ms, tokenization overhead is negligible. For embedding
              lookups at 5-10ms total latency, tokenization can be 5-10% of your
              budget. Profile before optimizing, but know the numbers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Choices
            </p>
            <p style="margin-top: 0">
              <strong>Rust tokenizers:</strong> The standard for production.
              10-100× faster than Python implementations. Pre-compiled
              vocabularies and SIMD operations for parallel processing.
              Memory-mapped vocabulary files enable instant startup.
            </p>
            <p>
              <strong>Vocabulary loading:</strong> A 50,000-token vocabulary
              with metadata is 5-10MB. Load once at startup, share across
              threads. Avoid reloading per-request: that adds 10-50ms latency
              and defeats all optimization.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Caching Tokenized Results
            </p>
            <p style="margin-top: 0">
              Cache tokenized sequences for repeated inputs. In embedding
              services, 20-40% of inputs are duplicates or near-duplicates. Hash
              the normalized input text, store token IDs with TTL. Cache hit
              avoids both tokenization and potentially model inference.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Cache Design:</strong> Key = hash(normalized_text).
              Value = [token_ids, token_count, special_token_positions]. TTL =
              1-24 hours depending on vocabulary update frequency. Size =
              100K-1M entries for most services.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batching for Throughput
            </p>
            <p style="margin-top: 0">
              Tokenize multiple inputs together. Padding to uniform length
              enables vectorized operations. With dynamic batching, collect
              inputs for 5-10ms windows, tokenize as a batch, then dispatch to
              model inference. Total throughput increases 2-5× over individual
              processing.
            </p>
            <p>
              Padding trade-off: longer sequences mean more wasted compute. If
              one input has 50 tokens and another has 500, you pad the short one
              to 500. Sort inputs by approximate length before batching to
              minimize padding waste.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 6px">
                  Tokenization Performance Budget
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Normal Case</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      1.5KB prompt
                    </div>
                    <div style="font-size: 14px; font-weight: bold; margin-top: 4px">
                      2ms P50
                    </div>
                    <div style="font-size: 12px; margin-top: 2px">5ms P99</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Large Prompt</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      20KB context
                    </div>
                    <div style="font-size: 14px; font-weight: bold; margin-top: 4px">
                      12ms P50
                    </div>
                    <div style="font-size: 12px; margin-top: 2px">28ms P99</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Pathological</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Base64 blob
                    </div>
                    <div style="font-size: 14px; font-weight: bold; margin-top: 4px">
                      50ms+
                    </div>
                    <div style="font-size: 11px; margin-top: 2px">
                      Needs mitigation
                    </div>
                  </div>
                </div>
                <div style="border-top: 2px solid; margin-top: 8px; padding-top: 8px; font-size: 12px; text-align: center">
                  Target: Tokenization under 5% of total latency (200ms → 10ms
                  budget)
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
                  Optimized tokenizers hit 10-50ns per token vs 1μs for naive
                  implementations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rust tokenizers are 10-100× faster than Python with SIMD and
                  memory-mapped vocab
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Load vocabulary once at startup, share across threads;
                  per-request loading adds 10-50ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache tokenized results: 20-40% of inputs are duplicates in
                  embedding services
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch tokenization with dynamic batching increases throughput
                  2-5×; sort by length to minimize padding
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
                  Show latency math: 500 tokens at 1μs = 500μs per request; at
                  10ns = 5μs per request
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain caching: hash normalized text, store token IDs with
                  1-24 hour TTL
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention padding trade-off: sort by length before batching to
                  minimize wasted compute
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTokenizationPreprocessingProductionTokenizationPerformanceCachingAndScale;
