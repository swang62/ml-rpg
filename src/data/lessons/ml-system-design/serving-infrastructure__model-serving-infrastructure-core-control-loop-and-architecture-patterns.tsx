import type { Component } from "solid-js";

const LessonServingInfrastructureModelServingInfrastructureCoreControlLoopAndArchitecturePatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model Serving Infrastructure: Core Control Loop and Architecture
            Patterns
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
                <strong>Model serving infrastructure</strong> transforms trained
                models into production services by orchestrating a control loop:
                accept requests, queue and schedule them, optionally batch
                requests together, execute on hardware (CPUs, GPUs, or
                accelerators), run pre/post-processing, and expose metrics for
                autoscaling.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Challenge
            </p>
            <p style="margin-top: 0">
              The real complexity lies not in setting up endpoints but in three
              critical areas: resource scheduling across models and hardware,
              memory management balancing batch sizes against device capacity,
              and rollout safety through versioning and traffic splitting.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Architectural Patterns
            </p>
            <p style="margin-top: 0">
              Framework specific servers like TensorFlow Serving or TorchServe
              provide tight integration with a single framework, simpler mental
              models, and fewer moving parts. Multi backend servers like Triton
              abstract the runtime layer, enabling a single control plane across
              TensorFlow, PyTorch, ONNX, and hardware optimized backends like
              TensorRT or OpenVINO. This unified approach adds powerful
              scheduling features like dynamic batching and model ensembles but
              increases configuration complexity. Custom thin servers give
              maximum control but require building your own scheduling,
              observability, and deployment mechanisms from scratch.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Trade-off
            </p>
            <p style="margin-top: 0">
              Throughput versus latency is governed by batching and concurrency
              decisions. Dynamic batching aggregates requests to improve device
              utilization (more predictions per second), while per model
              concurrency controls parallel instances. Preprocessing placement
              determines whether you become CPU bound or accelerator bound.
              Precision conversions from FP32 to FP16/BF16 or INT8 trade small
              accuracy drops for significant throughput gains.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Reality
            </p>
            <p style="margin-top: 0">
              Real world benchmarks reveal optimization importance: on a V100
              GPU running ResNet50 on 32,000 images, raw TensorFlow completed in
              83 to 87 seconds (368 to 386 images per second), TensorFlow
              Serving took 117 to 120 seconds (267 to 274 images per second),
              and untuned Triton required 171 to 202 seconds (158 to 187 images
              per second). Serving infrastructure overhead can reduce throughput
              by 30% to 50% without proper tuning.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Network Request</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    gRPC / REST
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Queue &amp; Scheduler</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Dynamic Batching
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Runtime Execution</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    GPU / CPU / TPU
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Response + Metrics</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Latency, QPS, Utilization
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
                  Core control loop includes request queueing, optional
                  batching, hardware execution, and metrics exposure for
                  autoscaling and Service Level Objectives (SLOs)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Framework specific servers (TensorFlow Serving, TorchServe)
                  offer simpler operations for homogeneous environments, while
                  multi backend servers (Triton) provide unified control across
                  frameworks at higher configuration cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic batching trades queueing delay for throughput:
                  aggregating requests improves device utilization but can push
                  p95 and p99 latency over SLO budgets during bursty traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unoptimized serving stacks showed 30% to 50% throughput loss
                  in V100 benchmarks: raw TensorFlow at 368 to 386 images per
                  second versus untuned Triton at 158 to 187 images per second
                  on 32,000 image ResNet50 workload
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Precision conversions from FP32 to BF16, FP16, or INT8 formats
                  can double throughput and halve costs but require regression
                  testing to catch numerical drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Preprocessing and postprocessing placement determines
                  bottlenecks: keeping transforms in server simplifies clients
                  but can CPU bind the service, hiding GPU underutilization
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
                  Production Triton deployment sustained 5,000 requests per
                  second with p95 latency 50 to 70 milliseconds and GPU
                  utilization above 70%, using zero copy shared memory for large
                  image payloads to gain 15% throughput improvement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Medical imaging service processing 256×256×24 voxel volumes
                  kept resampling and morphological operations in TorchServe
                  pipeline to maintain consistent latency, with batching limited
                  by 16 GB GPU memory footprint rather than compute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Organizations using Triton multi backend capability deployed
                  same models on Intel Xeon CPUs with BF16 backend (using
                  Advanced Matrix Extensions) for moderate queries per second
                  (QPS) services, reducing GPU spend while preserving deployment
                  workflows
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonServingInfrastructureModelServingInfrastructureCoreControlLoopAndArchitecturePatterns;
