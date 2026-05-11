import type { Component } from "solid-js";

const LessonModelPackagingModelPackagingFailureModesConversionPitfallsAndProductionGotchas: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model Packaging Failure Modes: Conversion Pitfalls and Production
            Gotchas
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Common Failure Modes:</strong> Model packaging fails
              through silent conversion errors, missing preprocessing,
              dependency conflicts, and hardware mismatches. These failures
              often appear as degraded accuracy rather than obvious errors,
              making debugging difficult.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Silent Conversion Errors
            </p>
            <p>
              Converting between formats (PyTorch to ONNX, TensorFlow to TFLite)
              can silently change model behavior. Custom operations may not have
              equivalents and get approximated. Dynamic shapes might be fixed to
              incorrect defaults. Numerical precision changes (float32 to
              float16) introduce subtle differences. Always compare original and
              converted model outputs on diverse test inputs. A 0.1% output
              difference might be acceptable; a 5% difference indicates a
              conversion bug.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Missing Preprocessing Artifacts
            </p>
            <p>
              The model file contains only the neural network. Preprocessing
              artifacts—tokenizers, vocabulary files, normalization statistics,
              feature transformers—must be packaged separately. A common
              failure: model is packaged but tokenizer is not. At serving time,
              a different tokenizer version is loaded, producing different token
              IDs. The model receives garbage input and produces garbage output,
              but no error is raised. Package preprocessing artifacts with the
              same versioning and validation as the model itself.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dependency Hell
            </p>
            <p>
              ML dependencies are notoriously version-sensitive. PyTorch 1.9 and
              1.10 might produce different results for the same model. CUDA 11.3
              vs 11.7 can cause silent numerical differences. Pin exact versions
              of: framework (torch==1.13.1), numerical libraries
              (numpy==1.23.4), and system libraries (CUDA, cuDNN). Test the
              packaged container on target hardware before deployment. "Works on
              my GPU" does not mean it works on production GPUs.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Validation Checklist:</strong> Before deployment, verify:
              (1) converted model matches original within tolerance, (2) all
              preprocessing artifacts are present and versioned, (3) container
              runs on target hardware, (4) end-to-end inference produces
              expected outputs on golden test set.
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
                  Format conversion can silently change model behavior (custom
                  ops, precision)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Preprocessing artifacts (tokenizers, normalizers) must be
                  versioned with the model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pin exact dependency versions including CUDA/cuDNN for
                  reproducibility
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
                  0.1% output difference acceptable; 5% indicates conversion bug
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Different tokenizer version produces different token IDs,
                  garbage predictions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPackagingModelPackagingFailureModesConversionPitfallsAndProductionGotchas;
