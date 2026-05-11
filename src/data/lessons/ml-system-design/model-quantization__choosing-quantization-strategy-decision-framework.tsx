import type { Component } from "solid-js";

const LessonModelQuantizationChoosingQuantizationStrategyDecisionFramework: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Quantization Strategy: Decision Framework
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 12px; font-size: 15px; line-height: 1.6">
              Choosing the right quantization strategy depends on your
              constraints. This decision framework helps you pick the optimal
              approach for your situation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Start With Your Constraints
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              If you cannot afford ANY accuracy loss, keep FP16. Full precision
              is your baseline. If you need fastest deployment with minimal
              work, try post-training quantization (PTQ) first. It requires no
              retraining and works in hours.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              If PTQ accuracy is unacceptable (more than 2% drop), move to
              quantization-aware training (QAT). Budget 2-3x your original
              training time. If deploying to edge devices with hard memory
              limits, target INT8 or INT4 with aggressive pruning.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Type Considerations
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              CNNs quantize easily. Most convolutional networks achieve less
              than 1% accuracy loss with PTQ INT8. Vision transformers are
              harder - attention mechanisms are sensitive. Start with dynamic
              quantization.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Large language models benefit most from weight-only quantization
              (GPTQ, AWQ). This addresses the memory bottleneck while preserving
              quality. Target INT4 weights with FP16 activations for best
              balance.
            </p>
            <div style="margin: 16px 0; padding: 12px 14px; border-left: 3px solid; border-radius: 0 6px 6px 0">
              <p style="margin: 0; font-size: 14px; line-height: 1.5">
                Pro tip: Always benchmark on YOUR data. Published benchmarks
                rarely match real-world performance on domain-specific tasks.
              </p>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Checklist
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              1) Define acceptable accuracy loss. 2) Measure baseline latency
              and memory. 3) Try PTQ first (lowest effort). 4) If PTQ fails,
              invest in QAT. 5) Validate on production-like data. 6) Monitor
              drift after deployment.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Memory Bound (LLMs, Large Models)
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    → INT8 or INT4 weight only + FP16 activations
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Compute Bound (Training, GPUs)
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    → FP16 or BF16 mixed precision with FP32 accumulation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Edge Deployment (Mobile, Embedded)
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    → INT8 PTQ or QAT, leverage NPU acceleration
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Sensitive Architectures (Transformers)
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    → Start weight only, consider QAT if PTQ loses 3%+ accuracy
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
                  Start with PTQ for fastest deployment, move to QAT if accuracy
                  drops too much
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CNNs quantize easily, transformers need more care
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LLMs benefit most from weight-only quantization (INT4 weights,
                  FP16 activations)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always benchmark on your domain-specific data, not general
                  benchmarks
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
                  Interview Tip: Walk through your decision process for
                  quantizing a vision transformer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain when you would choose QAT over PTQ and
                  why
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe how you would validate a quantized LLM
                  before production deployment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelQuantizationChoosingQuantizationStrategyDecisionFramework;
