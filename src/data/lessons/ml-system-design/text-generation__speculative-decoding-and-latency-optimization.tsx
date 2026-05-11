import type { Component } from "solid-js";

const LessonTextGenerationSpeculativeDecodingAndLatencyOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Speculative Decoding and Latency Optimization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Insight
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Speculative decoding</strong> uses a small, fast model
                to draft multiple tokens, then verifies them in parallel with
                the large model. If the draft is accepted, you get multiple
                tokens for the cost of one large-model forward pass.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How It Works
            </p>
            <p style="margin-top: 0">
              The draft model (7B parameters) generates 5 candidate tokens in
              25ms. The target model (70B parameters) would take 250ms to
              generate those same 5 tokens sequentially. Instead, run the target
              model once on all 5 draft tokens in parallel: 60ms. If 4 tokens
              match, you saved 190ms.
            </p>
            <p>
              <strong>Verification:</strong> For each draft token, check if the
              target model agrees. If the target model would have generated the
              same token (or accepts it probabilistically), keep it. At the
              first rejection, discard that token and all following drafts.
              Generate the correct token from the target model and restart
              drafting.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When It Works Well
            </p>
            <p style="margin-top: 0">
              Speculative decoding shines when the draft model has high
              agreement with the target. For predictable text (code with clear
              patterns, formulaic language), acceptance rates hit 80-90%. For
              creative text where the target model might choose any of many
              valid continuations, acceptance drops to 40-50%.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Speedup Math:</strong> If acceptance rate is 80% with 5
              draft tokens, expected accepted tokens = 4. Draft + verify takes
              85ms vs 250ms sequential = 2.9× speedup. At 50% acceptance,
              speedup drops to 1.5×.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Other Latency Optimizations
            </p>
            <p style="margin-top: 0">
              <strong>Model parallelism:</strong> Split model across multiple
              GPUs. Each GPU handles part of the computation. Reduces per-token
              latency but adds inter-GPU communication overhead (1-5ms per
              synchronization).
            </p>
            <p>
              <strong>Quantization:</strong> Convert 32-bit weights to 8-bit or
              4-bit. Reduces memory bandwidth by 4-8×, speeding up inference
              2-3× with 1-2% quality loss. Essential for fitting large models on
              limited GPU memory.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Speculative decoding: small model drafts tokens, large model
                  verifies in parallel
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  With 80% acceptance rate and 5 draft tokens, expect 2.9×
                  speedup over sequential generation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Works best for predictable text (code, formulaic language)
                  with 80-90% acceptance rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model parallelism splits model across GPUs, adds 1-5ms sync
                  overhead per step
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantization (8-bit/4-bit) gives 2-3× speedup with 1-2%
                  quality loss
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
                  Explain speculative decoding mechanics: draft 5 tokens fast,
                  verify in parallel, accept matches
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Show the speedup math: 85ms draft+verify vs 250ms sequential =
                  2.9× at 80% acceptance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention quantization trade-off: 4-8× memory reduction, 2-3×
                  speed, 1-2% quality loss
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextGenerationSpeculativeDecodingAndLatencyOptimization;
