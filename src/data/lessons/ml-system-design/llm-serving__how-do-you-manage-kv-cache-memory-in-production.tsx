import type { Component } from "solid-js";

const LessonLlmServingHowDoYouManageKvCacheMemoryInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Do You Manage KV Cache Memory in Production?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEMORY PRESSURE
            </p>
            <p>
              KV cache is the primary memory consumer in LLM serving. For a 70B
              model serving 100 concurrent requests with 4K context each, KV
              cache alone requires ~100GB. This often exceeds available GPU
              memory.
            </p>
            <p>
              Memory management determines throughput. More concurrent requests
              = higher throughput, but each request needs KV cache memory. The
              scheduler must balance request count against available memory.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PAGED ATTENTION
            </p>
            <p>
              Traditional KV cache allocates contiguous memory for max sequence
              length, wasting memory for shorter sequences. Paged attention
              allocates memory in fixed-size blocks, like virtual memory in
              operating systems.
            </p>
            <p>
              <strong>Benefits:</strong> No wasted memory for shorter sequences.
              Better memory fragmentation management. Enables memory sharing
              across requests (for common prefixes). vLLM implements paged
              attention and achieves 2-4x better memory efficiency.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEMORY OFFLOADING
            </p>
            <p>
              When GPU memory is exhausted, offload KV cache to CPU memory. This
              is slower but allows serving more concurrent requests.
            </p>
            <p>
              <strong>Trade-off:</strong> CPU-to-GPU transfer adds latency
              (~1-5ms per token depending on cache size). Acceptable for
              throughput-focused batch workloads. Not suitable for
              latency-critical interactive use.
            </p>
            <p>
              Tiered approach: keep hot requests on GPU, cold requests (waiting,
              low priority) on CPU. Move requests between tiers based on
              activity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PREEMPTION STRATEGIES
            </p>
            <p>
              When memory is tight, preempt lower-priority requests to make room
              for higher-priority ones.
            </p>
            <p>
              <strong>Options:</strong> Swap KV cache to CPU (preserve progress,
              resume later). Drop KV cache entirely (restart generation from
              scratch). The choice depends on request priority and expected
              remaining length.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Memory management is the core
              challenge. Paged attention for efficiency, offloading for
              capacity, preemption for priority—combine strategies based on your
              latency vs throughput requirements.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                  Paged KV Cache (16 tokens/block)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Sequence A: 50 tokens</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Logical: [0-15, 16-31, 32-47, 48-49]
                    <br />
                    Physical blocks: [5, 12, 3, 18]
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Sequence B: 35 tokens</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Logical: [0-15, 16-31, 32-34]
                    <br />
                    Physical blocks: [5, 7, 22] (shares block 5 prefix)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Memory Pool Status</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Total blocks: 3125 (50 GB / 16 KB per block)
                    <br />
                    Used: 187 blocks (6%)
                    <br />
                    Waste: &lt;4% (paged) vs 50% (contiguous)
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
                  KV cache dominates memory; 70B model with 100 requests × 4K
                  context = ~100GB cache alone
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Paged attention: allocate in blocks like virtual memory; 2-4x
                  better memory efficiency via vLLM
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Offloading to CPU: increases capacity but adds latency; use
                  tiered approach (hot on GPU, cold on CPU)
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
                  Interview Tip: Explain paged attention analogy: KV cache pages
                  like OS virtual memory pages.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe preemption strategies: swap to CPU
                  (preserve progress) vs drop (restart).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmServingHowDoYouManageKvCacheMemoryInProduction;
