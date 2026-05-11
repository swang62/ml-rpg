import type { Component } from "solid-js";

const LessonLlmServingHowDoesContinuousBatchingWorkInLlmServing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Does Continuous Batching Work in LLM Serving?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE PROBLEM WITH STATIC BATCHING
            </p>
            <p>
              Traditional batching waits for a fixed number of requests,
              processes them together, and returns all results. This works
              poorly for LLM generation because requests have vastly different
              output lengths.
            </p>
            <p>
              A request generating 10 tokens finishes quickly. A request
              generating 1000 tokens takes 100x longer. In static batching, the
              short request waits for the long request to complete before
              returning. This wastes GPU cycles and increases latency for short
              requests.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW CONTINUOUS BATCHING WORKS
            </p>
            <p>
              Continuous batching processes requests at the token level, not the
              request level. At each generation step:
            </p>
            <p>1. Generate one token for all active requests in the batch</p>
            <p>
              2. If a request finishes (hit EOS token or max length), remove it
              from the batch
            </p>
            <p>3. If the batch has space, add waiting requests</p>
            <p>4. Repeat</p>
            <p>
              Requests enter and exit the batch dynamically. Short requests
              complete and free resources without waiting for long requests. New
              requests start immediately when space is available.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EFFICIENCY GAINS
            </p>
            <p>
              Continuous batching improves GPU utilization by 2-4x compared to
              static batching. It also reduces median latency for short requests
              dramatically since they do not wait for long requests.
            </p>
            <p>
              The key metric is tokens-per-second throughput. Static batching
              might achieve 100 tokens/second. Continuous batching on the same
              hardware achieves 200-400 tokens/second because GPUs stay busy
              instead of waiting.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IMPLEMENTATION COMPLEXITY
            </p>
            <p>
              Continuous batching requires sophisticated memory management. Each
              request has its own KV cache that grows as tokens are generated.
              The scheduler must track available memory, decide which requests
              to run, and handle preemption when memory is tight.
            </p>
            <p>
              Frameworks like vLLM and TensorRT-LLM implement continuous
              batching. Building it from scratch is complex; using established
              frameworks is recommended.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Use continuous batching for any
              production LLM serving. The efficiency gains are too significant
              to ignore. vLLM and TensorRT-LLM are proven implementations.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                  Continuous Batching Timeline
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="width: 60px; font-size: 13px; font-weight: bold">
                    Step 1:
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    Seq A (prefill 500 tokens), Seq B (decode), Seq C (decode)
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="width: 60px; font-size: 13px; font-weight: bold">
                    Step 2:
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    Seq A (prefill 500 more), Seq B (decode), Seq C{" "}
                    <strong>DONE</strong> → Seq D (decode){" "}
                    <strong>ADDED</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="width: 60px; font-size: 13px; font-weight: bold">
                    Step 3:
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    Seq A (decode), Seq B (decode), Seq D (decode), Seq E
                    (prefill) <strong>ADDED</strong>
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px">
                  <strong>Key:</strong> Finished sequences removed immediately,
                  new requests admitted without waiting for batch to complete
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
                  Static batching: short requests wait for long requests; wastes
                  GPU cycles, increases latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous batching: process per-token, requests enter/exit
                  dynamically; 2-4x GPU utilization improvement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Requires sophisticated memory management for per-request KV
                  caches; use vLLM or TensorRT-LLM implementations
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
                  Interview Tip: Explain the problem with static batching using
                  concrete examples: 10-token vs 1000-token requests.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the continuous batching loop: generate
                  token, remove finished, add new, repeat.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmServingHowDoesContinuousBatchingWorkInLlmServing;
