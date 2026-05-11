import type { Component } from "solid-js";

const LessonHardwareAwareOptimizationProductionHardwareAwareOptimizationEdgeVsCloudTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Hardware Aware Optimization: Edge vs Cloud Trade Offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Edge Deployment Constraints
            </p>
            <p style="margin-top: 0">
              Edge devices (phones, IoT, embedded) face strict limits: 50-500MB
              RAM for entire app, 1-4 CPU cores at 1-2GHz, no GPU or weak GPU,
              battery constraints (2-5W power budget). A model consuming 100MB
              peak memory may crash the app. Latency requirements are tight:
              30-50ms for camera apps, 10ms for audio processing. Edge-optimized
              models need: INT8 quantization, aggressive pruning (50-70%), and
              architectures designed for these constraints from scratch. Testing
              on actual devices is essential; emulators underestimate memory
              pressure and thermal throttling.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cloud GPU Constraints
            </p>
            <p style="margin-top: 0">
              Cloud has abundant compute but cost and latency still matter. A
              V100 costs $3/hour; inefficient models waste money at scale.
              Processing 1M daily requests with 10ms overhead costs $30/day in
              wasted GPU time. Batch processing amortizes overhead but adds
              latency. Cloud-specific optimizations: use tensor cores (requires
              FP16/INT8 and aligned shapes), maximize GPU utilization (75%+
              target), batch aggressively when latency permits. Memory is less
              constrained (16-80GB) but still limits maximum batch size and
              model complexity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Edge vs Cloud Decision Framework
            </p>
            <p style="margin-top: 0">
              <strong>Choose edge when:</strong> privacy requires local
              processing (medical, financial data); network latency exceeds
              model latency; offline capability needed; per-inference cost must
              be zero. <strong>Choose cloud when:</strong> model complexity
              exceeds device capability; frequent model updates required (push
              new model without app update); consistent latency across diverse
              devices needed; training and inference can share infrastructure.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Hybrid Pattern:</strong> Run lightweight model on edge
              for common cases, fall back to cloud for hard examples. A 10KB
              decision model can route 80% of requests locally, dramatically
              reducing cloud costs while handling edge cases with full-power
              models.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 12px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px; flex: 1">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Edge Deployment
                  </strong>
                  <div style="font-size: 13px; line-height: 1.5">
                    <strong>Target:</strong> 30 to 60 fps
                    <br />
                    <strong>Power:</strong> 2 to 5 watts
                    <br />
                    <strong>Latency:</strong> 10 to 20 ms/stage
                    <br />
                    <strong>Challenge:</strong> Thermal throttling
                    <br />
                    <strong>Example:</strong> 12ms cold → 25ms hot
                  </div>
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px; flex: 1">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Cloud Inference
                  </strong>
                  <div style="font-size: 13px; line-height: 1.5">
                    <strong>Target:</strong> p99 &lt; 20 ms
                    <br />
                    <strong>Scale:</strong> 1000s QPS
                    <br />
                    <strong>Gain:</strong> 1.5 to 3x tokens/sec
                    <br />
                    <strong>Cost:</strong> 30 to 60% reduction
                    <br />
                    <strong>Example:</strong> BERT INT8 on GPU
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
                  Edge limits: 50-500MB RAM, 1-4 CPU cores, 2-5W power; latency
                  targets 10-50ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Edge models need INT8 quantization and 50-70% pruning; test on
                  real devices, not emulators
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cloud optimization: tensor cores (FP16/INT8), 75%+ GPU
                  utilization, aggressive batching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Edge for: privacy, offline, zero per-inference cost; Cloud
                  for: complexity, frequent updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid: lightweight edge model routes 80% locally, cloud
                  handles hard examples
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
                  Give specific edge constraints (50-500MB RAM, 10-50ms latency)
                  to show deployment experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention 75%+ GPU utilization target for cloud - shows
                  awareness of cost optimization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe hybrid routing strategy (10KB model routing 80%
                  locally) for sophisticated architecture
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardwareAwareOptimizationProductionHardwareAwareOptimizationEdgeVsCloudTradeOffs;
