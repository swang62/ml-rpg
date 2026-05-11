import type { Component } from "solid-js";

const LessonLlmServingWhatIsSpeculativeDecodingAndWhenDoesItHelp: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Speculative Decoding and When Does It Help?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE LATENCY BOTTLENECK
            </p>
            <p>
              LLM generation is autoregressive: each token depends on all
              previous tokens. You cannot parallelize token generation within a
              single request. A 100-token response requires 100 sequential
              forward passes, each taking 10-50ms depending on model size.
            </p>
            <p>
              This sequential nature means latency scales linearly with output
              length. A 1000-token response takes 10x longer than a 100-token
              response, regardless of how much hardware you have.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW SPECULATIVE DECODING WORKS
            </p>
            <p>
              Use a smaller, faster draft model to generate candidate tokens.
              Then verify multiple candidates in parallel with the target model.
            </p>
            <p>
              <strong>Process:</strong>
            </p>
            <p>
              1. Draft model generates K candidate tokens (fast, e.g., 5ms per
              token)
            </p>
            <p>
              2. Target model processes all K candidates in a single forward
              pass (parallel verification)
            </p>
            <p>3. Accept candidates that match target model predictions</p>
            <p>
              4. If candidate i does not match, reject candidates i through K
            </p>
            <p>
              5. Sample a new token from the target model at the rejection point
            </p>
            <p>6. Repeat</p>
            <p>
              If the draft model is good, many candidates are accepted, and you
              effectively generate multiple tokens per target model forward
              pass.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SPEEDUP FACTORS
            </p>
            <p>
              Speedup depends on draft model quality. If the draft model matches
              the target model 80% of the time, you get roughly 3-4x speedup on
              latency. If it matches only 50%, speedup is closer to 1.5-2x.
            </p>
            <p>
              Speculative decoding maintains exact output distribution—the
              target model always has final say. This is mathematically
              guaranteed; the output is identical to running the target model
              alone.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE
            </p>
            <p>
              Best for latency-sensitive applications where throughput is less
              critical. Interactive chatbots benefit; batch processing does not
              (continuous batching is more important there).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> Speculative decoding for
              latency-critical interactive use cases. Skip for batch processing
              where continuous batching provides better throughput gains.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Draft Model (Fast)</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Proposes k=4 tokens: [A, B, C, D]
                    <br />
                    Latency: 20ms total
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Target Model (Accurate)
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Verifies all 4 in one pass: 80ms
                    <br />
                    Result: [A✓, B✓, C✗, D✗]
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Accept A, B; Reject C, D
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    2 tokens accepted in 100ms
                    <br />
                    vs 160ms for 2 target iterations
                    <br />
                    <strong>1.6x speedup</strong>
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
                  LLM generation is sequential; latency = tokens ×
                  time_per_token regardless of hardware
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Speculative decoding: draft model generates candidates, target
                  model verifies in parallel; 2-4x latency reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Speedup depends on draft quality (80% match = 3-4x speedup);
                  maintains exact output distribution
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
                  Interview Tip: Walk through the speculative decoding process:
                  draft K tokens, verify, accept/reject, repeat.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain when speculative decoding helps
                  (interactive latency) vs when it does not (batch throughput).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmServingWhatIsSpeculativeDecodingAndWhenDoesItHelp;
