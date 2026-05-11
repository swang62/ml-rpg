import type { Component } from "solid-js";

const LessonLlmServingWhatIsKvCacheInLlmServing: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is KV Cache in LLM Serving?
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
              <strong>KV cache</strong> stores the key-value pairs computed
              during attention for previously generated tokens, eliminating
              redundant computation when generating each new token.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            WHY KV CACHE MATTERS
          </p>
          <p>
            LLMs generate text one token at a time. At each step, the attention
            mechanism needs to attend to all previous tokens. Without caching,
            generating token N requires recomputing attention over tokens 1
            through N-1. This is O(N²) computation over a sequence.
          </p>
          <p>
            With KV cache, keys and values for tokens 1 through N-1 are stored
            from previous steps. Generating token N only requires computing
            attention for the new token against cached values. This reduces
            per-token computation from O(N) to O(1), making generation
            dramatically faster.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            HOW IT WORKS
          </p>
          <p>
            During the first forward pass (prompt processing), compute K and V
            matrices for all prompt tokens and store them. For each subsequent
            token generated:
          </p>
          <p>1. Compute Q, K, V for just the new token</p>
          <p>2. Append new K, V to the cache</p>
          <p>3. Compute attention using new Q against all cached K, V</p>
          <p>4. Generate next token prediction</p>
          <p>
            The cache grows linearly with sequence length. For a 70B parameter
            model with 8K context, KV cache can consume 16-32GB of GPU memory.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            MEMORY IMPLICATIONS
          </p>
          <p>
            KV cache size per token:{" "}
            <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
              2 × num_layers × hidden_dim × bytes_per_value
            </code>
            . For Llama-70B (80 layers, 8192 hidden dim, FP16): ~2.6MB per
            token. An 8K context sequence requires ~20GB just for KV cache.
          </p>
          <p>
            This memory pressure is why context length and batch size trade off
            directly. More concurrent requests = less context per request, or
            more GPUs needed.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> KV cache transforms generation from
            compute-bound to memory-bound. Optimizing LLM serving is largely
            about managing KV cache memory efficiently.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px">Token 1: "Hello"</strong>
                <div style="margin-top: 8px; font-size: 13px">
                  Compute K, V → Store in cache
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px">Token 2: "world"</strong>
                <div style="margin-top: 8px; font-size: 13px">
                  Read cached K, V from Token 1<br />
                  Compute new K, V → Append to cache
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px">Token 3: "how"</strong>
                <div style="margin-top: 8px; font-size: 13px">
                  Read cached K, V from Tokens 1, 2<br />
                  Only compute attention for new token
                </div>
              </div>
              <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">
                  Memory grows: 0.5 MB × 3 tokens = 1.5 MB
                  <br />
                  (Llama 2 7B example)
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Without KV cache: O(N²) computation per sequence; with cache:
                O(N) total, O(1) per token increment
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cache size per token: 2 × layers × hidden_dim × bytes; Llama-70B
                needs ~2.6MB/token, 20GB for 8K context
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                KV cache makes LLM serving memory-bound; memory management is
                the key optimization lever
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
                Interview Tip: Explain the O(N²) to O(N) speedup and why
                generation becomes memory-bound.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Calculate KV cache size for a specific model to
                show you understand the memory implications.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonLlmServingWhatIsKvCacheInLlmServing;
