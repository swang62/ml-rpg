import type { Component } from "solid-js";

const LessonServingInfrastructureMultiBackendServingWithTritonUnifiedControlPlaneAcrossFrameworksAndHardware: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Multi Backend Serving with Triton: Unified Control Plane Across
            Frameworks and Hardware
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Multi-Framework Problem
            </p>
            <p style="margin-top: 0">
              Triton Inference Server abstracts model execution behind a unified
              control plane that supports TensorFlow, PyTorch, ONNX, TensorRT
              (NVIDIA GPU optimized), and OpenVINO (Intel CPU and GPU optimized)
              backends. This multi framework capability solves a critical
              operational problem: teams running both PyTorch research models
              and TensorFlow production models can deploy, version, batch,
              monitor, and rollout all models through a single serving
              infrastructure instead of maintaining parallel TensorFlow Serving
              and TorchServe stacks. At scale, this consolidation reduces
              operational complexity, enables unified metrics and alerting, and
              allows model ensembles that combine predictions from models
              written in different frameworks.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Architectural Power
            </p>
            <p style="margin-top: 0">
              The power comes from backend abstraction plus advanced scheduling
              features. Triton provides dynamic batching that works consistently
              across all backends, model ensembles that chain multiple models in
              a single request (like preprocessing in ONNX followed by inference
              in TensorRT), and concurrent model execution with per model
              instance groups for resource isolation. A production deployment
              demonstrated sustained 5,000 requests per second with p95 latency
              of 50 to 70 milliseconds and GPU utilization consistently above
              70%. Using zero copy shared memory for large payloads (multi
              megabyte images or video frames) improved throughput by
              approximately 15% by eliminating serialization overhead.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Configuration Complexity Trade-off
            </p>
            <p style="margin-top: 0">
              While TensorFlow Serving works reasonably well out of the box for
              TensorFlow models, Triton exposes dozens of knobs: per backend
              optimization settings, instance group counts and affinities (CPU
              versus GPU placement), dynamic batching parameters per model,
              shared memory configurations, and ensemble pipelines. Teams
              adopting Triton report a steeper learning curve and 2 to 4 week
              tuning periods to match or exceed single framework serving
              performance.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hardware Portability
            </p>
            <p style="margin-top: 0">
              Once tuned, the multi backend capability shines for hardware
              portability: the same serving configuration can deploy models on
              NVIDIA GPUs using TensorRT backend and on Intel Xeon CPUs using
              OpenVINO backend with BF16 precision, preserving deployment
              workflows while optimizing cost for different query volume tiers.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Triton Multi Backend Architecture
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Unified Control Plane</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Batching, Scheduling, Metrics
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">TensorFlow</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">PyTorch</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">ONNX</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">TensorRT</strong>
                    <div style="font-size: 10px">NVIDIA GPU</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">OpenVINO</strong>
                    <div style="font-size: 10px">Intel CPU</div>
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
                  Multi backend architecture supports TensorFlow, PyTorch, ONNX,
                  TensorRT, and OpenVINO through unified control plane,
                  eliminating need to maintain separate TensorFlow Serving and
                  TorchServe infrastructures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production case study: sustained 5,000 requests per second at
                  p95 latency 50 to 70 milliseconds with GPU utilization above
                  70%, demonstrating enterprise scale capability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Zero copy shared memory transport improved throughput by
                  approximately 15% on large payloads (multi megabyte images),
                  avoiding serialization overhead between client and server
                  processes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Configuration complexity tradeoff: exposes dozens of tuning
                  knobs (per backend settings, instance groups, batching
                  parameters, ensemble pipelines) requiring 2 to 4 week tuning
                  period versus simpler out of box experience of framework
                  specific servers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hardware portability: same serving configuration deploys
                  models on NVIDIA GPUs (TensorRT backend) and Intel Xeon CPUs
                  (OpenVINO BF16 backend), enabling cost optimization by QPS
                  tier while preserving deployment workflows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model ensembles enable chaining multiple models in single
                  request (preprocessing in ONNX followed by inference in
                  TensorRT) with intermediate results staying in GPU memory,
                  reducing latency versus separate service calls
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
                  Meta uses Triton to serve both PyTorch newsfeed ranking models
                  and TensorFlow ads models through single infrastructure,
                  reducing operational overhead and enabling unified capacity
                  planning across 500 plus model versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Autonomous vehicle company deployed sensor fusion ensemble in
                  Triton: LiDAR preprocessing in ONNX (CPU optimized), object
                  detection in TensorRT (GPU), and tracking in PyTorch backend,
                  achieving 60 frames per second end to end latency under 50
                  milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial services firm ran fraud detection on Intel Xeon with
                  OpenVINO BF16 backend for 80% of moderate risk transactions
                  (sub 500 QPS) at $5,000 per month cost, escalating high risk
                  20% to GPU TensorRT backend at $50,000 per month, using same
                  Triton deployment configs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonServingInfrastructureMultiBackendServingWithTritonUnifiedControlPlaneAcrossFrameworksAndHardware;
