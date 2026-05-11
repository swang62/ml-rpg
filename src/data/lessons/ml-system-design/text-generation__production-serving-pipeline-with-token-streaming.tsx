import type { Component } from "solid-js";

const LessonTextGenerationProductionServingPipelineWithTokenStreaming: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Serving Pipeline with Token Streaming
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Streaming Matters
            </p>
            <p style="margin-top: 0">
              A 500-token response at 50ms per token takes 25 seconds to
              generate. Without streaming, users stare at a blank screen for 25
              seconds. With streaming, they see the first token in 50ms and
              watch text appear progressively. Perceived latency drops from 25
              seconds to under 100ms.
            </p>
            <p>
              Streaming is not optional for interactive applications. Users
              abandon chatbots that take more than 3-5 seconds to show any
              response. Streaming makes 25-second generations feel instant.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Architecture
            </p>
            <p style="margin-top: 0">
              <strong>Server-Sent Events (SSE):</strong> The standard approach.
              Server keeps HTTP connection open and pushes each token as a text
              event. Client receives tokens progressively and appends to
              display. Connection stays open until generation completes or
              client disconnects.
            </p>
            <p>
              <strong>Token batching:</strong> Sending every single token as a
              network packet is inefficient. Batch 3-5 tokens together before
              sending. This reduces network overhead while keeping perceived
              latency low. Users cannot distinguish single-token vs 3-token
              batches at 50ms intervals.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KV Cache Management
            </p>
            <p style="margin-top: 0">
              Each generation step needs the key-value (KV) pairs from all
              previous tokens. Without caching, you recompute attention for all
              prior tokens at every step. With KV cache, you only compute the
              new token and append to the cache.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Memory Math:</strong> A 7B parameter model with 2048
              context length needs ~16GB for KV cache per request. At 100
              concurrent requests, that is 1.6TB of GPU memory just for caches.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Continuous Batching
            </p>
            <p style="margin-top: 0">
              Traditional batching waits for a batch to complete before starting
              new requests. Continuous batching inserts new requests into an
              ongoing batch whenever a request finishes. GPU utilization jumps
              from 30-40% to 80-90%.
            </p>
            <p>
              The trick: different requests have different lengths. Some finish
              in 50 tokens, others take 500. Continuous batching fills the freed
              slot immediately rather than waiting for the longest request.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">1. Tokenize Prompt</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    "Explain quantum" → [5647, 12493]
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">2. Prefill (Parallel)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Build KV cache: 150ms
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">3. Decode Loop</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Generate token → Stream → Repeat
                    <br />
                    50 tokens/sec × 200 tokens = 4 sec
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">4. Client Receives</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Time to first token: 150ms
                    <br />
                    Time to last token: 4.15 sec
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
                  Streaming reduces perceived latency from 25 seconds to under
                  100ms for the first token
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Server-Sent Events (SSE) push tokens progressively; batch 3-5
                  tokens to reduce network overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  KV cache stores key-value pairs from prior tokens, avoiding
                  recomputation at each step
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  7B model with 2048 context needs ~16GB KV cache per request;
                  100 requests = 1.6TB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous batching fills freed slots immediately, boosting
                  GPU utilization from 30% to 80-90%
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
                  Explain why streaming is essential: 25-second wait vs
                  progressive display starting at 50ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show KV cache memory math: 16GB per request × 100 concurrent =
                  1.6TB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe continuous batching: insert new requests when others
                  finish, not when batch completes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextGenerationProductionServingPipelineWithTokenStreaming;
