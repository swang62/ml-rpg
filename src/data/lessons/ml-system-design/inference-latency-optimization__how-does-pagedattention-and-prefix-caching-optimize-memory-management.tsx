import type { Component } from "solid-js";

const LessonInferenceLatencyOptimizationHowDoesPagedattentionAndPrefixCachingOptimizeMemoryManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Does PagedAttention and Prefix Caching Optimize Memory
            Management?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fragmentation Problem
            </p>
            <p style="margin-top: 0">
              PagedAttention manages KV cache memory by allocating it in fixed
              size pages or blocks rather than contiguous arrays, solving the
              severe fragmentation problem in traditional approaches. When each
              request allocates a variable length contiguous buffer for its KV
              cache, memory becomes fragmented with unusable gaps between
              allocations. As requests complete and new ones arrive with
              different sequence lengths, this fragmentation worsens until the
              system runs out of memory despite having sufficient total free
              space. Naive implementations report up to 80% memory waste from
              fragmentation. PagedAttention reduces waste to under 4%, enabling
              significantly higher concurrency.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How PagedAttention Works
            </p>
            <p style="margin-top: 0">
              The page based approach maintains a per request list of page
              references, similar to virtual memory in operating systems. When a
              sequence grows by one token and needs more KV storage, the system
              allocates a new page from a global pool and appends it to that
              request's page list. Attention computation is modified to gather
              keys and values from potentially non contiguous pages. This
              indirection adds minimal overhead, typically under 3% latency,
              while providing enormous flexibility. Pages can be shared across
              requests for beam search or prefix reuse, and freed pages are
              immediately available for other requests without defragmentation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Prefix Caching
            </p>
            <p style="margin-top: 0">
              Prefix caching with radix tree matching identifies and shares
              common prompt prefixes across different requests. Many production
              workloads have repeated or similar prompts: system instructions,
              few shot examples, or document preambles. Instead of storing
              identical KV cache data multiple times, the system maintains a
              radix tree over tokenized sequences. When a new request arrives,
              it traverses the tree to find the longest matching prefix, reuses
              those KV pages, and only computes attention for the novel suffix.
              Combined with LRU eviction and cache aware scheduling that
              prioritizes requests with high cache hit rates, this can
              dramatically reduce redundant computation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Failure Modes
            </p>
            <p style="margin-top: 0">
              The key failure mode is incorrect matching: prompts that differ
              only in whitespace, punctuation, or parameter values must be
              treated as distinct, or the wrong cached KV will be used and
              generate incorrect results. Cache invalidation on model updates
              and TTL expiration are also critical; stale cache can return
              outdated responses even when the model has been improved or fine
              tuned.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 14px">
                  PagedAttention Memory Management
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Naive Allocation</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Request A: [■■■■■■___]
                    </div>
                    <div style="font-size: 11px">Request B: [■■_____]</div>
                    <div style="font-size: 11px">Request C: [■■■■■■■■__]</div>
                    <div style="font-size: 11px; margin-top: 6px; font-weight: bold">
                      Fragmentation: up to 80%
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">PagedAttention</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Page Pool: [P1][P2][P3]...
                    </div>
                    <div style="font-size: 11px">Req A → P1, P4, P7</div>
                    <div style="font-size: 11px">Req B → P2, P5</div>
                    <div style="font-size: 11px">Req C → P3, P6, P8, P9</div>
                    <div style="font-size: 11px; margin-top: 6px; font-weight: bold">
                      Waste: under 4%
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Prefix Caching with Radix Tree
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Prompt: "You are a helpful assistant. User: " (shared)
                  </div>
                  <div style="font-size: 11px">
                    Request 1: ..."What is ML?" → reuse prefix pages
                  </div>
                  <div style="font-size: 11px">
                    Request 2: ..."Explain LLMs" → reuse prefix pages
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    ✓ Only compute unique suffix
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
                  PagedAttention allocates KV cache in fixed size pages instead
                  of contiguous arrays, reducing memory fragmentation from up to
                  80% waste in naive allocation down to under 4%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Page based management maintains per request page lists and
                  allocates from a global pool, enabling sharing across beam
                  search branches and immediate reuse of freed pages without
                  defragmentation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prefix caching with radix tree matching identifies common
                  prompt prefixes across requests and shares their KV pages,
                  avoiding redundant computation for repeated system
                  instructions or conversation history
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Least Recently Used (LRU) eviction prioritizes keeping hot
                  prefixes in cache while discarding cold entries, and cache
                  aware scheduling prioritizes requests with high expected hit
                  rates to maximize reuse
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems report lower latency for repeated prompts
                  as only the unique suffix requires inference; multi turn
                  conversations reuse full conversation history prefix across
                  turns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Critical failure mode is incorrect cache key matching: prompts
                  differing only in whitespace or parameters must be
                  distinguished or wrong cached KV produces incorrect results;
                  model updates require cache invalidation
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
                  Google production systems use PagedAttention to enable 3× to
                  4× higher concurrent sessions before out of memory (OOM)
                  compared to naive contiguous allocation, particularly
                  benefiting workloads with heterogeneous sequence lengths
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prefix caching in multi turn chatbots reuses the system
                  instruction plus conversation history prefix, computing
                  attention only for the new user message and assistant
                  response, reducing latency by 50% for turns after the first
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A serving stack with 24 GB GPU memory and 7B model (14 GB
                  weights) can fit 10 to 12 concurrent 2k token sessions with
                  PagedAttention versus only 3 to 4 with naive allocation due to
                  fragmentation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInferenceLatencyOptimizationHowDoesPagedattentionAndPrefixCachingOptimizeMemoryManagement;
