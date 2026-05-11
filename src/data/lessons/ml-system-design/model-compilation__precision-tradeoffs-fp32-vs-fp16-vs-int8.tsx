import type { Component } from "solid-js";

const LessonModelCompilationPrecisionTradeoffsFp32VsFp16VsInt8: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Precision Tradeoffs: FP32 vs FP16 vs INT8
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Understanding Precision Levels
            </p>
            <p style="margin-top: 0">
              <strong>FP32 (32-bit float):</strong> Full precision, baseline
              accuracy, no conversion needed.{" "}
              <strong>FP16 (16-bit float):</strong> Half memory, ~2x faster on
              modern GPUs with tensor cores, typically &lt;0.5% accuracy loss.{" "}
              <strong>INT8 (8-bit integer):</strong> Quarter memory of FP32,
              2-4x faster than FP16, requires calibration, 0.5-2% accuracy loss
              typical. The speedups compound with compilation optimizations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INT8 Calibration
            </p>
            <p style="margin-top: 0">
              INT8 requires mapping the FP32 value range to 256 discrete levels.
              Calibration runs the model on representative data, collects
              activation ranges per layer, and computes optimal scaling factors.
              Poor calibration (unrepresentative data, too few samples) causes
              accuracy to collapse. Best practice: use 1000+ samples spanning
              input diversity. Some layers (final classifier, attention) are
              sensitive; keep them in FP16 while quantizing others to INT8
              (mixed precision).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Each Precision Makes Sense
            </p>
            <p style="margin-top: 0">
              <strong>FP32:</strong> Training, debugging, accuracy-critical
              production where latency isn"t an issue. <strong>FP16:</strong>{" "}
              Default for GPU inference; nearly free speedup with minimal risk.{" "}
              <strong>INT8:</strong> High-throughput serving, edge deployment,
              cost-sensitive inference. <strong>Mixed precision:</strong> Best
              accuracy-speed tradeoff for complex models; sensitive layers stay
              FP16, bulk of computation in INT8.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Gotcha:</strong> INT8 speedup requires hardware support
              (tensor cores, VNNI). On CPUs without VNNI, INT8 may run slower
              than FP32 due to quantization/dequantization overhead.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Accuracy Validation Protocol
            </p>
            <p style="margin-top: 0">
              Compare against FP32 baseline on held-out data. Acceptable
              thresholds: FP16 should be within 0.1% of FP32; INT8 within
              0.5-1%. Test edge cases and low-confidence predictions
              specifically; quantization errors concentrate where activations
              are small or near decision boundaries.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">FP32 Baseline</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    100 img/sec, 76.5% top 1 accuracy
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">FP16 (Tensor Cores)</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    300 img/sec (3x), 76.4% accuracy (0.1% loss)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">INT8 (Calibrated)</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    1200 img/sec (12x), 75.8% accuracy (0.7% loss)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    INT8 (Poor Calibration)
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    1200 img/sec (12x), 66.2% accuracy (10.3% loss)
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
                  FP16: ~2x speedup, &lt;0.5% accuracy loss; INT8: 2-4x over
                  FP16, 0.5-2% accuracy loss typical
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  INT8 calibration needs 1000+ representative samples; poor
                  calibration causes accuracy collapse
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixed precision: sensitive layers (classifier, attention) in
                  FP16, bulk computation in INT8
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  INT8 requires hardware support (tensor cores, VNNI); without
                  it, may run slower than FP32
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Accuracy thresholds: FP16 within 0.1% of FP32, INT8 within
                  0.5-1%
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
                  Explain INT8 calibration process with sample count
                  recommendation (1000+) for practical credibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention mixed precision strategy for attention layers - shows
                  nuanced understanding
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warn about hardware requirements for INT8 speedups -
                  demonstrates production awareness
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCompilationPrecisionTradeoffsFp32VsFp16VsInt8;
