import type { Component } from "solid-js";

const LessonInferenceLatencyOptimizationWhatIsModelQuantizationAndWhenDoesItActuallySpeedUpInference: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Model Quantization and When Does It Actually Speed Up
            Inference?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Quantization Does
            </p>
            <p style="margin-top: 0">
              Quantization reduces numerical precision of model weights and
              activations from 32 bit or 16 bit floating point down to 8 bit or
              even 4 bit integers. This shrinks model size, reduces memory
              bandwidth requirements, and can enable faster computation when
              specialized low precision hardware instructions are available. The
              key insight is that LLM decoding is typically memory bandwidth
              bound rather than compute bound: the bottleneck is reading
              billions of parameters from memory, not the arithmetic operations
              themselves. Reducing precision from FP16 to INT8 cuts memory
              traffic in half, which directly improves latency.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hardware Acceleration
            </p>
            <p style="margin-top: 0">
              The theoretical compute advantage is substantial on modern
              accelerators. A TPU or GPU might deliver approximately 378 TFLOPS
              at FP32, 756 TFLOPS at FP16, and 1,513 TFLOPS at INT8, nearly 4x
              the FP32 rate. However, realizing this speedup depends entirely on
              whether your workload is compute bound or memory bound. During
              autoregressive decoding, where each token generation reads the
              full model weights but performs relatively little math, weight
              only quantization primarily helps by reducing bytes transferred,
              not by utilizing the higher INT8 compute rate. You might see 1.5x
              to 2x speedup rather than 4x.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Quantization Strategies
            </p>
            <p style="margin-top: 0">
              Weight only quantization is the first step and safest approach:
              quantize the model parameters to INT8 or INT4 while keeping
              activations at higher precision. This immediately cuts model size
              and memory bandwidth with minimal accuracy loss. Weight plus
              activation quantization requires more care because activation
              distributions can have outliers that cause large quantization
              errors, especially in attention layers. Per channel or per group
              scaling helps by using different quantization parameters for each
              output channel or small groups of weights.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KV Cache Quantization
            </p>
            <p style="margin-top: 0">
              Storing keys and values at FP8 or INT8 instead of FP16 cuts KV
              memory in half. For a 7B model where each token uses 0.5 MB of KV
              cache at FP16, quantizing to INT8 cuts this to 0.25 MB per token,
              doubling the number of concurrent sessions you can fit in memory.
              The risk is accumulated error over long sequences: quantization
              noise can compound as the cache grows, causing quality degradation
              especially in later tokens of a 4,000 or 8,000 token context.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 14px">
                  Quantization Strategies &amp; Impact
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Weight Only Quantization
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Weights: INT8/INT4 | Activations: FP16
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    ✓ 50% memory reduction
                  </div>
                  <div style="font-size: 11px">✓ Minimal accuracy loss</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Weight + Activation Quantization
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">Both: INT8</div>
                  <div style="font-size: 11px; margin-top: 2px">
                    ⚠️ Requires calibration
                  </div>
                  <div style="font-size: 11px">⚠️ Outlier handling needed</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">KV Cache Quantization</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    FP16 → INT8: 0.5 MB → 0.25 MB/token
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    ✓ 2× more concurrent sessions
                  </div>
                  <div style="font-size: 11px">✗ Late token quality risk</div>
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                  <strong>Theoretical Compute:</strong> FP32: 378 TFLOPS | INT8:
                  1513 TFLOPS (4×)
                  <br />
                  <strong>Realized Speedup:</strong> 1.5–2× in memory bound
                  decoding
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
                  Quantization reduces precision from FP32 or FP16 to INT8 or
                  INT4, cutting model size and memory bandwidth; effectiveness
                  depends on whether workload is memory bound or compute bound
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Theoretical INT8 compute is approximately 4× faster than FP32
                  (1,513 vs 378 teraflops (TFLOPS)), but memory bound decoding
                  sees 1.5× to 2× speedup because bottleneck is data transfer
                  not arithmetic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weight only quantization is safest first step, cutting model
                  size 50% at INT8 with minimal accuracy loss; weight plus
                  activation quantization requires calibration and per channel
                  scaling to handle outliers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  KV cache quantization from FP16 to INT8 reduces per token
                  memory from 0.5 MB to 0.25 MB for 7B models, doubling
                  concurrent sessions but risking accumulated error in long
                  contexts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Activation outliers in attention and feedforward layers cause
                  large quantization errors; per channel or per group scaling
                  adapts quantization parameters to local statistics and
                  improves quality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems at Google and Meta validate late token
                  quality after KV quantization and selectively keep sensitive
                  layers at higher precision to avoid degradation at 4k to 8k
                  token contexts
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
                  Amazon serving stacks use INT8 weight quantization to fit
                  larger models on the same hardware, achieving 1.8× speedup in
                  memory bound decoding with less than 1% accuracy drop after
                  calibration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 7B model with FP16 weights (14 GB) quantized to INT8 (7 GB)
                  fits two model replicas on a single 24 GB GPU, doubling
                  serving capacity without additional hardware cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix experimentation with KV cache quantization showed 0.25
                  MB per token at INT8 enables 8 concurrent 2k token sessions on
                  24 GB GPU versus 4 sessions at FP16, but required fallback to
                  FP16 for sequences exceeding 6k tokens due to quality drift
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInferenceLatencyOptimizationWhatIsModelQuantizationAndWhenDoesItActuallySpeedUpInference;
