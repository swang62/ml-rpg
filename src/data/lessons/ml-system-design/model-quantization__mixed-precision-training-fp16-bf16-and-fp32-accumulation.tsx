import type { Component } from "solid-js";

const LessonModelQuantizationMixedPrecisionTrainingFp16Bf16AndFp32Accumulation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Mixed Precision Training: FP16, BF16, and FP32 Accumulation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mixed Precision Training
            </p>
            <p style="margin-top: 0">
              Mixed precision training uses FP16 (16-bit floating point) for
              most computations while keeping critical operations in FP32. This
              provides most of the speed benefits of FP16 while avoiding
              accuracy loss from precision limitations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FP16 vs BF16
            </p>
            <p style="margin-top: 0">
              <strong>FP16 (Half Precision):</strong> 5 bits for exponent, 10
              bits for mantissa. Range is limited: values above 65,504 overflow.
              Works well for most deep learning but requires loss scaling to
              prevent underflow.
            </p>
            <p>
              <strong>BF16 (Brain Float):</strong> 8 bits for exponent, 7 bits
              for mantissa. Same range as FP32 but less precision. No loss
              scaling needed. Native support on newer hardware (A100, H100
              GPUs).
            </p>
            <p>
              <strong>Trade-off:</strong> FP16 has more precision but limited
              range. BF16 has less precision but FP32-compatible range. For
              training, BF16 is often easier to use because gradient values
              naturally fit without scaling tricks.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FP32 Accumulation
            </p>
            <p style="margin-top: 0">
              Matrix multiplications produce accumulated sums that can overflow
              FP16 precision. The solution: compute multiplications in FP16,
              accumulate results in FP32. This is called FP32 accumulation and
              is standard in mixed precision training.
            </p>
            <p>
              <strong>What stays in FP32:</strong> Loss computation, optimizer
              state (momentum, adaptive learning rates), batch normalization
              statistics. These operations are numerically sensitive and
              constitute less than 5% of total compute.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Performance Gains
            </p>
            <p style="margin-top: 0">
              Mixed precision training achieves 1.5-3x speedup on modern GPUs.
              Memory usage drops by nearly half. These gains come from faster
              FP16 compute (2x FLOPS) and reduced memory bandwidth (half the
              data transferred).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; justify-content: space-around">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; text-align: center">
                    FP16
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <strong>Bits:</strong> 1 + 5 + 10
                    <br />
                    <strong>Range:</strong> 6e-8 to 65504
                    <br />
                    <strong>Issue:</strong> Underflow
                    <br />
                    <strong>Solution:</strong> Loss Scaling
                    <br />
                    <strong>Speedup:</strong> 16x on A100
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; text-align: center">
                    BF16
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <strong>Bits:</strong> 1 + 8 + 7<br />
                    <strong>Range:</strong> 1e-38 to 3e38
                    <br />
                    <strong>Issue:</strong> Lower Precision
                    <br />
                    <strong>Solution:</strong> None Needed
                    <br />
                    <strong>Speedup:</strong> 2x Memory
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
                  FP16 has limited range (max 65,504) requiring loss scaling;
                  BF16 has FP32-compatible range but less precision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  FP32 accumulation prevents overflow - multiply in FP16, sum in
                  FP32
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Critical operations stay in FP32: loss computation, optimizer
                  state, batch norm statistics (&lt;5% of compute)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixed precision achieves 1.5-3x speedup and ~50% memory
                  reduction on modern GPUs
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
                  Interview Tip: Explain BF16 as the easier choice - same range
                  as FP32 means no loss scaling gymnastics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention that FP32 accumulation is automatic in
                  modern frameworks - just enable mixed precision
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelQuantizationMixedPrecisionTrainingFp16Bf16AndFp32Accumulation;
