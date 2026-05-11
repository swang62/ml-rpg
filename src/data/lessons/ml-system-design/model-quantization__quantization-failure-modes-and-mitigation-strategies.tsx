import type { Component } from "solid-js";

const LessonModelQuantizationQuantizationFailureModesAndMitigationStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Quantization Failure Modes and Mitigation Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 12px; font-size: 15px; line-height: 1.6">
              Quantization can fail in subtle ways that only appear in
              production. Understanding these failure modes helps you build
              robust quantized systems.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Accuracy Collapse
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Some layers are quantization-sensitive. Attention layers in
              transformers and the first/last layers in CNNs often suffer
              disproportionate accuracy loss. Fix with mixed precision - keep
              sensitive layers in FP16.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Outlier activations cause range issues. A few extreme values force
              wide quantization ranges, reducing precision for normal values.
              Use per-channel quantization or outlier clipping.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Calibration Failures
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Calibration data mismatch is common. If calibration data differs
              from production, quantization ranges are wrong. Use at least 1000
              representative samples across all categories.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Deployment Issues
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Hardware mismatch breaks performance. Models optimized for one GPU
              may not run efficiently on another. Always benchmark on target
              hardware.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Operator coverage gaps occur when frameworks lack quantized
              versions of some operators. Ops fall back to FP32, creating memory
              overhead that negates speedups.
            </p>
            <div style="margin: 16px 0; padding: 12px 14px; border-left: 3px solid; border-radius: 0 6px 6px 0">
              <p style="margin: 0; font-size: 14px; line-height: 1.5">
                Warning: Numerical instability often manifests as NaN or Inf
                values. Add runtime checks for these, especially in the first
                few layers.
              </p>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigation Strategy
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Build a validation pipeline comparing quantized vs original
              outputs. Set thresholds for acceptable divergence (typically less
              than 1% accuracy drop). Monitor continuously for drift.
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
                  Sensitive layers (attention, first/last) need mixed precision
                  protection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calibration data must match production distribution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use 1000+ representative samples for stable calibration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hardware mismatch and operator gaps break performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor for NaN/Inf values and accuracy drift
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
                  Interview Tip: Explain why attention layers in transformers
                  are quantization-sensitive (softmax creates outliers)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe how you would debug a quantized model
                  showing accuracy collapse
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Discuss the calibration data selection process
                  for a production system
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelQuantizationQuantizationFailureModesAndMitigationStrategies;
