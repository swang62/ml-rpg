import type { Component } from "solid-js";

const LessonModelQuantizationPostTrainingQuantizationVsQuantizationAwareTraining: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Post Training Quantization vs Quantization Aware Training
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Post-Training Quantization
            </p>
            <p style="margin-top: 0">
              PTQ converts a trained FP32 model to lower precision without
              retraining. The model is already complete; quantization is applied
              as a post-processing step. This is the fastest path to deployment
              but may sacrifice accuracy.
            </p>
            <p>
              <strong>How it works:</strong> Analyze model weights to find their
              range (minimum and maximum values). Map this range to 256 integer
              values (for INT8). For activations, run calibration data through
              the model to measure typical activation ranges. Create scaling
              factors that map floating point values to integers.
            </p>
            <p>
              <strong>Accuracy impact:</strong> Simple models lose 0.5-2%
              accuracy. Complex models with wide value ranges may lose 5-10% or
              fail entirely. The quantization process cannot fix a model that
              fundamentally needs high precision in certain layers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Quantization Aware Training
            </p>
            <p style="margin-top: 0">
              QAT simulates quantization during training. The model learns to
              work with reduced precision from the start, adapting its weights
              to maintain accuracy despite quantization errors.
            </p>
            <p>
              <strong>How it works:</strong> Insert fake quantization operations
              in the forward pass. Weights are quantized then immediately
              dequantized. The model sees quantization noise during training.
              Gradients flow through the fake quantization using
              straight-through estimator (pretend the quantization is identity
              for backpropagation).
            </p>
            <p>
              <strong>Accuracy impact:</strong> Typically matches FP32 accuracy
              within 1%. More robust than PTQ for challenging models. The model
              has learned to be quantization-tolerant.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Each
            </p>
            <p style="margin-top: 0">
              <strong>Use PTQ when:</strong> Time is critical (PTQ takes hours,
              QAT takes days). Model already quantizes well (validate on test
              set). Accuracy loss is acceptable.
            </p>
            <p>
              <strong>Use QAT when:</strong> PTQ causes unacceptable accuracy
              loss. Model architecture is complex. You are deploying to
              accuracy-sensitive applications.
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
                    PTQ Workflow
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    1. Trained FP32 Model
                    <br />
                    2. Run Calibration (1000 samples)
                    <br />
                    3. Collect Statistics
                    <br />
                    4. Compute Scales
                    <br />
                    5. Convert to INT8
                    <br />
                    <strong>Time: 30 min</strong>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; text-align: center">
                    QAT Workflow
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    1. Trained FP32 Model
                    <br />
                    2. Insert Fake Quant Nodes
                    <br />
                    3. Fine Tune (10 epochs)
                    <br />
                    4. Model Learns Robustness
                    <br />
                    5. Export INT8 Weights
                    <br />
                    <strong>Time: 2 to 3 days</strong>
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
                  PTQ converts trained models to lower precision without
                  retraining - fastest deployment path
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PTQ loses 0.5-2% accuracy on simple models; 5-10% on complex
                  models with wide value ranges
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  QAT simulates quantization during training - model learns to
                  tolerate reduced precision
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  QAT typically matches FP32 accuracy within 1% but requires
                  days of additional training
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
                  Interview Tip: Start with PTQ for speed - only invest in QAT
                  if PTQ accuracy is unacceptable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention calibration data for PTQ -
                  representative samples determine activation ranges
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelQuantizationPostTrainingQuantizationVsQuantizationAwareTraining;
