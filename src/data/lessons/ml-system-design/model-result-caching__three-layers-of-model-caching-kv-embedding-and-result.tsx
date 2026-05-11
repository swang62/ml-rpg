import type { Component } from "solid-js";

const LessonModelResultCachingThreeLayersOfModelCachingKvEmbeddingAndResult: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Three Layers of Model Caching: KV, Embedding, and Result
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
                <strong>Model Caching</strong> stores and reuses computation
                results from ML models to avoid redundant inference. The goal:
                eliminate duplicate work when the same or similar inputs appear
                repeatedly, reducing latency from 50-500ms to sub-millisecond
                retrieval.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THREE CACHE LAYERS
            </p>
            <p>
              <strong>KV Cache:</strong> For transformer-based language models,
              stores attention key-value pairs computed during generation. Each
              new token reuses prior tokens KV states instead of recomputing the
              entire sequence. Enables 10-100x speedup for long sequence
              generation by turning O(n²) recomputation into O(n) incremental
              work.
            </p>
            <p>
              <strong>Embedding Cache:</strong> Stores computed embeddings
              (fixed-length vector representations) for entities like users,
              items, or documents. One embedding computation per entity per
              model version, reused across millions of requests. A user
              embedding computed once serves all that users recommendations for
              hours.
            </p>
            <p>
              <strong>Result Cache:</strong> Stores complete model outputs for
              specific inputs. If the exact same query appears again, return
              cached result directly without any model computation. Works when
              queries repeat frequently or when semantic similarity allows
              approximate matching.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN CACHING HELPS
            </p>
            <p>
              Caching value depends on repetition rate and inference cost. A
              search system with 10% exact query repetition and 50ms inference
              time saves 5ms average latency. A recommendation system where 80%
              of users are returning users can cache user embeddings, saving
              30-40% of compute cost.
            </p>
            <p>
              The math: if cache hit costs 1ms and miss costs 100ms, you break
              even at 1% hit rate. At 50% hit rate, average latency drops from
              100ms to 50.5ms. At 90% hit rate, average latency is 10.9ms.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Cache memory cost versus compute
              savings. A 1M entry embedding cache at 768 dimensions uses 3GB
              RAM. Justify with: if GPU inference costs $0.001 per query, 1M
              cached queries save $1000 in compute daily.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Result Cache</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Exact: 10-30% hit • Semantic: +10-25% hit
                    <br />
                    Latency: 0.3-10ms • Skips model entirely
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ on miss
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Embedding Cache</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Stores text → vector mappings
                    <br />
                    Saves 30-60% embedding compute
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ on miss
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    KV Cache (in transformer)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Reuses attention keys/values
                    <br />
                    3-10ms/token vs seconds without cache
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
                  KV Cache: 10-100x speedup for LLM generation by reusing
                  attention key-value states
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Embedding Cache: One computation per entity, reused across
                  millions of requests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Result Cache: Direct return for repeated identical or
                  semantically similar inputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Break-even at 1% hit rate when cache is 100x faster than
                  inference
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
                  Interview Tip: Explain when each cache layer applies—KV for
                  generation, embedding for entity representations, result for
                  repeated queries.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Calculate the break-even hit rate given cache
                  and inference latencies to show you understand the economics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe how KV cache enables efficient
                  autoregressive generation without recomputing attention.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelResultCachingThreeLayersOfModelCachingKvEmbeddingAndResult;
