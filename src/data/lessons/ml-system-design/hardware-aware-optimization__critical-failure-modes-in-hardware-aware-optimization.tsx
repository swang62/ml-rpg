import type { Component } from "solid-js";

const LessonHardwareAwareOptimizationCriticalFailureModesInHardwareAwareOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Critical Failure Modes in Hardware Aware Optimization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Benchmark vs Production Gap
            </p>
            <p style="margin-top: 0">
              The most common failure: model meets benchmarks but fails in
              production. Causes: benchmarks run on isolated GPU while
              production shares resources; benchmarks use fixed batch sizes
              while production has variable load; thermal throttling on
              sustained load reduces real throughput 20-40%. Prevention:
              benchmark under realistic conditions, including concurrent
              workloads, memory pressure from other processes, and sustained
              operation for 10+ minutes to trigger thermal effects.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory Fragmentation Crashes
            </p>
            <p style="margin-top: 0">
              Model fits in memory during testing but crashes after hours of
              production use. Dynamic shapes create variable-sized allocations
              that fragment memory. Over time, total free memory is sufficient
              but no contiguous block is large enough. Symptoms: sporadic OOM
              errors despite memory appearing available. Fixes: use fixed tensor
              sizes where possible, preallocate buffers, restart workers
              periodically (crude but effective), use memory-pooling allocators.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Operator Divergence Across Hardware
            </p>
            <p style="margin-top: 0">
              Same model produces different outputs on different hardware due
              to: different floating-point rounding (CPU vs GPU, Intel vs AMD);
              operator implementation differences in frameworks; fused kernels
              computing differently than unfused. Symptoms: accuracy varies
              0.5-2% across deployment targets; edge cases fail on some hardware
              but not others. Prevention: test on actual target hardware, not
              just similar hardware; use deterministic mode during validation;
              set explicit numerical tolerances per hardware target.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Critical:</strong> Accuracy drops on edge devices are
              often caused by quantization calibration on server hardware.
              Calibrate on representative edge-like inputs or actual edge
              hardware when possible.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Quantization Misalignment
                  </strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Lab: 0.5% accuracy delta
                    <br />
                    Production: 2 to 3% drop
                    <br />
                    <strong>Cause:</strong> Simplified noise model vs real
                    device
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Operator Fallback Cliff
                  </strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Unsupported op → CPU fallback
                    <br />
                    <strong>Impact:</strong> 2 to 10x latency spike
                    <br />
                    Missed by layer level profiling
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Expert Routing p99 Spike
                  </strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Some inputs activate more experts
                    <br />
                    <strong>Impact:</strong> 50 to 100% p99 increase
                    <br />
                    Need routing caps and admission control
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Calibration Drift</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Outliers saturate quantized ranges
                    <br />
                    <strong>Impact:</strong> 5 to 10% precision drop on segments
                    <br />
                    Requires periodic recalibration
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
                  Benchmark vs production gap: thermal throttling reduces real
                  throughput 20-40% on sustained load
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory fragmentation: dynamic shapes cause OOM after hours
                  despite sufficient total memory
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fixes for fragmentation: fixed tensor sizes, preallocated
                  buffers, periodic worker restarts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operator divergence causes 0.5-2% accuracy variance across
                  hardware targets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calibrate quantization on edge-representative inputs, not just
                  server hardware
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
                  Describe thermal throttling causing 20-40% throughput drop on
                  sustained load - production-specific insight
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain memory fragmentation from dynamic shapes and periodic
                  restart workaround
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention operator divergence across hardware (Intel vs AMD, CPU
                  vs GPU) for numerical precision awareness
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardwareAwareOptimizationCriticalFailureModesInHardwareAwareOptimization;
