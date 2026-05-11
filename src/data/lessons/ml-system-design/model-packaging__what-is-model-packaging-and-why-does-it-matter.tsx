import type { Component } from "solid-js";

const LessonModelPackagingWhatIsModelPackagingAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Model Packaging and Why Does It Matter?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Model Packaging:</strong> The process of bundling a
              trained model with its dependencies, preprocessing logic, and
              configuration into a deployable artifact. A well-packaged model
              contains everything needed to run inference without relying on
              external training infrastructure or implicit environment
              assumptions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Reproducibility Problem
            </p>
            <p>
              A model file alone is insufficient for production. It requires:
              the correct framework version (TensorFlow 2.12, not 2.10),
              specific library versions (numpy 1.23 with particular BLAS
              bindings), preprocessing code that matches training (same
              tokenizer, same normalization constants), and hardware
              compatibility (GPU drivers, CUDA versions). Without explicit
              packaging, deployment becomes "it works on my machine" scaled to
              production—models that ran perfectly in development fail
              mysteriously in serving environments.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Packaging Layers
            </p>
            <p>
              <strong>Model serialization:</strong> Save model weights and
              architecture in a portable format (SavedModel, ONNX, TorchScript).
              This captures the computational graph independent of training
              code. <strong>Dependency specification:</strong> Pin exact
              versions of all libraries (requirements.txt, conda environment).
              Include system-level dependencies (CUDA, cuDNN versions).{" "}
              <strong>Runtime container:</strong> Package everything in a Docker
              image with known base OS, framework installation, and inference
              entry point. The container becomes the deployable unit.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Gets Packaged
            </p>
            <p>
              Model weights (the trained parameters), model architecture (layer
              definitions, graph structure), preprocessing artifacts
              (tokenizers, vocabulary files, normalization statistics),
              configuration (input/output shapes, batch size limits), and
              inference code (the serving function that accepts requests and
              returns predictions). Missing any component causes production
              failures: wrong preprocessing produces garbage inputs; missing
              configuration causes shape mismatches; outdated inference code
              returns wrong output formats.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Insight:</strong> Good packaging makes deployment
              deterministic. Given the same model package and the same input,
              the output is identical regardless of which server runs inference
              or when it runs.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Serialization Layer</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Graph + Weights + Signatures
                    <br />
                    ONNX (protobuf) or SavedModel
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  +
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Execution Environment</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Runtime + Libraries + Dependencies
                    <br />
                    Docker container (100-300 MB)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Deployable Artifact</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Versioned, immutable, reproducible
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
                  Model packaging bundles weights, dependencies, preprocessing,
                  and inference code
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without explicit packaging, deployment becomes "works on my
                  machine" at scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Missing any component (tokenizer, config, preprocessing)
                  causes production failures
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
                  Pin exact library versions (TensorFlow 2.12, numpy 1.23) to
                  prevent drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Include preprocessing artifacts like tokenizers and
                  normalization constants
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPackagingWhatIsModelPackagingAndWhyDoesItMatter;
