import type { Component } from "solid-js";

const LessonModelPackagingBuildingLeanInferenceContainersMultiStageBuildsAndOptimizationPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Building Lean Inference Containers: Multi Stage Builds and
            Optimization Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Multi-Stage Builds:</strong> A Docker pattern where the
              Dockerfile has multiple FROM statements, each creating an
              intermediate image. Build-time dependencies stay in early stages;
              only runtime artifacts are copied to the final image. This
              separates build environment from runtime environment.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Multi-Stage Matters
            </p>
            <p>
              Building a model package requires compilers, development headers,
              and build tools. Running inference requires only the runtime and
              model. Without multi-stage builds, all build dependencies end up
              in the final image. Example: compiling a Python package with C
              extensions needs gcc, make, and python-dev (adds 500MB). The
              compiled .so file is under 1MB. Multi-stage builds: stage 1 has
              build tools and compiles the package; stage 2 copies only the
              compiled artifact. Final image is 500MB smaller.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Optimization Patterns
            </p>
            <p>
              <strong>Minimize layers:</strong> Combine related commands into
              single RUN statements. Each layer adds overhead; fewer layers mean
              smaller images. <strong>Order by change frequency:</strong> Put
              rarely-changing layers first (base image, system packages),
              frequently-changing layers last (model files). This maximizes
              cache hits during rebuilds.{" "}
              <strong>Clean up in same layer:</strong> If you install packages
              and then delete cache files, do both in the same RUN command.
              Docker layers are additive—deleting in a later layer does not
              reduce image size.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Practical Size Targets
            </p>
            <p>
              CPU inference images: target under 500MB. GPU inference images:
              target under 2GB (CUDA libraries add significant size). If your
              image exceeds these targets, audit dependencies. Common bloat
              sources: full ML framework instead of inference-only build, test
              dependencies left in production image, unnecessary Python packages
              from requirements.txt copy-paste, cached package downloads not
              cleaned up. Use tools like dive to inspect layer contents and
              identify waste.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Dockerfile Example Pattern:</strong> Stage 1 (builder):
              install build tools, compile dependencies. Stage 2 (runtime):
              start from slim base, copy compiled artifacts from builder, copy
              model, set entrypoint.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Stage 1: Builder (1-2 GB)</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    FROM nvidia/cuda:11.8-devel
                    <br />
                    Install cmake, g++, build deps
                    <br />
                    Compile custom ops
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Copy binaries only
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Stage 2: Runtime (100-300 MB)</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    FROM nvidia/cuda:11.8-runtime (1.2 GB)
                    <br />
                    Copy ONNX Runtime lib (10 MB)
                    <br />
                    Copy model artifact (50-500 MB)
                    <br />
                    pip install runtime deps only
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Final size: 180-340 MB vs 2-4 GB single stage
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
                  Multi-stage builds separate build dependencies from runtime,
                  reducing image size
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Order Dockerfile layers by change frequency for maximum cache
                  efficiency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Target under 500MB for CPU images, under 2GB for GPU images
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
                  Build tools (gcc, make) add 500MB but compiled artifacts are
                  under 1MB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use dive tool to inspect layer contents and identify bloat
                  sources
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPackagingBuildingLeanInferenceContainersMultiStageBuildsAndOptimizationPatterns;
