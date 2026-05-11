import type { Component } from "solid-js";

const LessonModelQuantizationWhatIsModelQuantization: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Model Quantization?
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
              <strong>Model Quantization</strong> reduces the precision of model
              weights and activations from 32-bit floating point (FP32) to lower
              bit representations like 16-bit (FP16) or 8-bit integers (INT8).
              This shrinks model size, reduces memory bandwidth, and speeds up
              inference while accepting small accuracy trade-offs.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Why Quantization Matters
          </p>
          <p style="margin-top: 0">
            Neural network weights are typically stored as 32-bit floating point
            numbers. A 1 billion parameter model uses 4GB just for weights.
            Quantizing to INT8 cuts this to 1GB. Smaller models load faster, fit
            on cheaper hardware, and process inputs more quickly.
          </p>
          <p>
            <strong>Memory bandwidth is often the bottleneck:</strong> GPUs can
            compute faster than memory can feed them. Quantized models transfer
            less data between memory and compute units, so the hardware stays
            busy doing useful work instead of waiting for data.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Precision Levels
          </p>
          <p style="margin-top: 0">
            <strong>FP32 (32-bit float):</strong> Full precision training
            default. 4 bytes per value. Maximum accuracy but slowest and
            largest.
          </p>
          <p>
            <strong>FP16/BF16 (16-bit float):</strong> Half precision. 2 bytes
            per value. 2x memory reduction, 2x+ speedup on modern GPUs. Minimal
            accuracy loss for most models.
          </p>
          <p>
            <strong>INT8 (8-bit integer):</strong> Quarter precision. 1 byte per
            value. 4x memory reduction, 4x+ speedup potential. Requires careful
            calibration to maintain accuracy.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Accuracy Trade-off
          </p>
          <p style="margin-top: 0">
            Lower precision means fewer distinct values can be represented. FP32
            has billions of possible values; INT8 has only 256. The quantization
            process maps continuous weights to this limited set. Done well,
            accuracy drops 0.5-2%. Done poorly, accuracy can collapse entirely.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">FP32 Weight</strong>
                <div style="margin-top: 6px; font-size: 13px">
                  0.847362 (32 bits)
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Scale &amp; Zero Point</strong>
                <div style="margin-top: 6px; font-size: 13px">
                  S = 0.01, Z = 0
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">INT8 Weight</strong>
                <div style="margin-top: 6px; font-size: 13px">85 (8 bits)</div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Quantization reduces precision from FP32 (4 bytes) to FP16 (2
                bytes) or INT8 (1 byte) per weight
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                1B parameter model: FP32 = 4GB, INT8 = 1GB - 4x memory reduction
                enables deployment on smaller hardware
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Memory bandwidth is often the bottleneck - smaller data
                transfers keep compute units busy
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Accuracy trade-off: 0.5-2% loss when done properly, catastrophic
                loss when calibration fails
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
                Interview Tip: Explain quantization as memory bandwidth
                optimization, not just storage savings
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Mention specific precision levels with their size
                trade-offs: FP32 (4B), FP16 (2B), INT8 (1B)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonModelQuantizationWhatIsModelQuantization;
