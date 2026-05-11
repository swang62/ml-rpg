import type { Component } from "solid-js";

const LessonModelQuantizationWeightOnlyQuantizationForLargeLanguageModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Weight Only Quantization for Large Language Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Weight Only Quantization
            </p>
            <p style="margin-top: 0">
              Large language models (LLMs) with billions of parameters face a
              unique challenge: most of their size comes from weights, not
              activations. Weight only quantization compresses just the weights
              to INT4 or INT8, keeping activations in higher precision. This
              enables models that would require multiple GPUs to fit on a single
              GPU.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Weight Only Works
            </p>
            <p style="margin-top: 0">
              <strong>Storage format:</strong> Weights are stored in compressed
              format (INT4 or INT8). At inference time, weights are decompressed
              to FP16 on the fly before each matrix multiplication. This adds
              compute overhead but dramatically reduces memory requirements.
            </p>
            <p>
              <strong>The memory bottleneck:</strong> LLM inference is memory
              bandwidth limited, not compute limited. Loading a 70B parameter
              model from VRAM takes longer than the actual computation. Smaller
              weights mean faster loading, which dominates total inference time
              for large models.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INT4 vs INT8 for LLMs
            </p>
            <p style="margin-top: 0">
              <strong>INT4 (4-bit):</strong> 8x compression versus FP32. A 70B
              model shrinks from 280GB to 35GB. Fits on a single 40GB A100 GPU.
              Accuracy loss of 1-3% on most tasks but can struggle with
              reasoning-heavy tasks.
            </p>
            <p>
              <strong>INT8 (8-bit):</strong> 4x compression. A 70B model needs
              70GB, requiring multiple GPUs or CPU offloading. Accuracy nearly
              matches FP16. Better for tasks where precision matters.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Weight Only Quantization Fails
            </p>
            <p style="margin-top: 0">
              Some weight distributions resist quantization. Outliers (weights
              100x larger than average) cause the quantization scale to waste
              precision on the normal range. Techniques like GPTQ and AWQ handle
              outliers by grouping weights and using per-group scales.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 14px">Weights: INT4 or INT8</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Memory: 4 to 8x smaller
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">
                  ⊗ Matrix Multiply
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 14px">
                    Activations: FP16 or BF16
                  </strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Precision: Full range preserved
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 14px">Output: FP16 or BF16</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Accuracy: Within 2% of FP32
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
                  Weight only quantization compresses weights to INT4/INT8 while
                  keeping activations in higher precision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LLM inference is memory bandwidth limited - smaller weights
                  load faster, dominating total inference time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  INT4 provides 8x compression: 70B model shrinks from 280GB to
                  35GB, fits on single 40GB GPU
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Outlier weights (100x larger than average) cause precision
                  loss - GPTQ/AWQ use per-group scales to handle them
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
                  Interview Tip: Explain weight only as a memory bandwidth
                  optimization - compute overhead is offset by faster weight
                  loading
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention specific model sizes: INT4 fits 70B on
                  one GPU, INT8 needs multiple GPUs or offloading
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelQuantizationWeightOnlyQuantizationForLargeLanguageModels;
