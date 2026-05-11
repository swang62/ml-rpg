import type { Component } from "solid-js";

const LessonModelPackagingDockerContainersForModelServingBuildingLeanInferenceImages: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Docker Containers for Model Serving: Building Lean Inference Images
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Model Serving Containers:</strong> Docker images
              containing the model, runtime dependencies, and inference server.
              Containers provide isolation (no dependency conflicts),
              reproducibility (same image runs identically everywhere), and
              scalability (spin up identical replicas on demand).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Containers for ML
            </p>
            <p>
              ML models have complex dependency chains: framework versions, CUDA
              libraries, system packages, Python environments. Without
              containers, version conflicts between models are common (Model A
              needs TensorFlow 2.10, Model B needs 2.14). Containers isolate
              each model with its own environment. They also enable
              infrastructure teams to deploy models without understanding
              ML—they deploy containers, not Python code. The container is the
              contract between ML and infrastructure.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Base Image Selection
            </p>
            <p>
              Start with official ML framework images that include CUDA, cuDNN,
              and framework installation already optimized. Building from
              scratch (ubuntu base, install CUDA manually) is error-prone and
              produces larger images. For CPU inference, use slim Python images
              to minimize size. For GPU inference, use CUDA-enabled base images
              matching your target GPU architecture. Image size matters: a 10GB
              image takes minutes to pull, delaying scaling and recovery.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Inference-Only Dependencies
            </p>
            <p>
              Training images include tools not needed for serving: tensorboard,
              experiment tracking, data loading utilities. Inference images
              should contain only what is needed to load the model and run
              predictions. Audit dependencies ruthlessly: remove training-only
              packages, use inference-optimized framework builds where
              available. A TensorFlow training image might be 5GB; an inference
              image with TF Serving can be under 1GB. Smaller images mean faster
              deployments and lower storage costs.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Image Layering:</strong> Order Dockerfile commands from
              least to most frequently changing. Base image and framework first
              (changes rarely), dependencies next (changes sometimes), model
              files last (changes often). This maximizes layer caching and
              minimizes rebuild time.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    ❌ Bloated Training Container
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Python dev tools + Jupyter + training frameworks + CUDA dev
                    <br />
                    <strong>Size:</strong> 2-4 GB | <strong>Cold start:</strong>{" "}
                    45-90s
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Optimize
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    ✓ Lean Inference Container
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Runtime only + Model (50-500 MB) + API wrapper
                    <br />
                    <strong>Size:</strong> 100-300 MB |{" "}
                    <strong>Cold start:</strong> 3-5s
                  </div>
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Includes warmup: runs sample inputs to force JIT compilation
                  </strong>
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
                  Containers isolate each model with its own dependency
                  environment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use official ML framework base images rather than building
                  CUDA from scratch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Remove training-only dependencies to shrink inference images
                  from 5GB to under 1GB
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
                  Order Dockerfile: base image first, model files last for layer
                  caching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  TensorFlow training image 5GB vs TF Serving inference image
                  under 1GB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPackagingDockerContainersForModelServingBuildingLeanInferenceImages;
