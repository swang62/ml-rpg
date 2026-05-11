import type { Component } from "solid-js";

const LessonInferenceLatencyOptimizationWhatIsKvCacheAndWhyDoesItDominateMemoryInLlmInference: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is KV Cache and Why Does It Dominate Memory in LLM Inference?
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
                <strong>KV Cache (Key-Value Cache)</strong> stores intermediate
                attention computations to avoid redundant work during
                autoregressive text generation. When generating tokens one at a
                time, each new token must attend to all previous tokens. KV
                cache trades memory for speed by storing attention keys and
                values once and reusing them.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Memory Cost
            </p>
            <p style="margin-top: 0">
              The memory cost is substantial and scales with both model size and
              context length. For Llama 2 7B at half precision, each token
              requires approximately 0.5 MB of KV cache. A single 2,000 token
              conversation consumes roughly 1 GB of cache memory, while an 8,000
              token context uses about 4 GB. The 176B parameter BLOOM model
              needs approximately 4 MB per token, so a 4,000 token session alone
              requires 16 GB just for the cache.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Formula
            </p>
            <p style="margin-top: 0">
              The precise formula is: 2 x batch_size x seq_length x num_layers x
              num_heads x head_dim x bytes_per_element. The factor of 2 accounts
              for separate key and value tensors. For a 7B model with 32 layers,
              32 heads, 128 dimensional heads, and FP16 precision, this works
              out to approximately 524,288 bytes per token.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Planning
            </p>
            <p style="margin-top: 0">
              When planning serving capacity, you must budget for model weights
              plus KV cache plus activations. A 7B model with 14 GB of weights
              can fit only 3 to 4 concurrent 2,000 token sessions on a 24 GB GPU
              before running out of memory.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Architectural Optimizations
            </p>
            <p style="margin-top: 0">
              Production systems have adopted architectural modifications to
              reduce KV memory. Grouped Query Attention (GQA) in Llama 2 70B and
              Mistral 7B reduces the number of key value heads while keeping
              query heads the same, cutting KV proportionally. Multi Query
              Attention (MQA) takes this further by using a single KV head.
              Sliding Window Attention (SWA) in Mistral 7B bounds attention to
              the most recent 4,096 tokens, capping memory growth for very long
              contexts.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                  KV Cache Memory per Model
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Llama 2 7B</strong>
                    <div style="margin-top: 6px; font-size: 13px">
                      ~0.5 MB/token
                    </div>
                    <div style="margin-top: 4px; font-size: 12px">
                      2k context = 1 GB
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Llama 2 70B</strong>
                    <div style="margin-top: 6px; font-size: 13px">Uses GQA</div>
                    <div style="margin-top: 4px; font-size: 12px">
                      Reduced KV size
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">BLOOM 176B</strong>
                    <div style="margin-top: 6px; font-size: 13px">
                      ~4 MB/token
                    </div>
                    <div style="margin-top: 4px; font-size: 12px">
                      4k context = 16 GB
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 8px; font-size: 12px; text-align: center">
                  <strong>Formula:</strong> 2 × batch × seq_len × layers × heads
                  × head_dim × bytes
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
                  KV cache stores attention keys and values to make decoding
                  linear time instead of quadratic, avoiding recomputation of
                  the entire sequence history at each new token
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory cost formula is 2 × batch_size × seq_length ×
                  num_layers × num_heads × head_dim × bytes_per_element, with
                  the factor of 2 for separate key and value tensors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Llama 2 7B uses approximately 0.5 MB per token at FP16, so a
                  2,000 token session requires 1 GB and 8,000 tokens need 4 GB
                  of KV memory alone
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BLOOM 176B requires about 4 MB per token, meaning a single
                  4,000 token conversation consumes 16 GB just for the cache,
                  often exceeding available GPU memory
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Architectural optimizations like Grouped Query Attention (GQA)
                  in Llama 2 70B and Sliding Window Attention (SWA) in Mistral
                  7B reduce KV memory by sharing heads or bounding context
                  window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Capacity planning must account for total memory as model
                  weights plus KV cache plus activations; a 7B model with 14 GB
                  weights supports only 3 to 4 concurrent 2k token sessions on
                  24 GB GPU
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
                  Google production models use GQA to reduce KV cache size
                  proportionally to the number of query groups, allowing higher
                  concurrency without quality loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mistral 7B uses Sliding Window Attention limited to 4,096
                  tokens, capping KV memory growth and enabling bounded latency
                  for very long conversations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Internal KV caching yields over 10× faster responses for multi
                  turn dialogs compared to recomputing full context, and next
                  token latency drops by approximately 50% when cache is
                  available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInferenceLatencyOptimizationWhatIsKvCacheAndWhyDoesItDominateMemoryInLlmInference;
