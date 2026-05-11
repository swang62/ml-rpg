import type { Component } from "solid-js";

const LessonAutoscalingGpuSharingFullGpuVsFractionalAllocationIsolationVsUtilizationTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Full GPU vs Fractional Allocation: Isolation vs Utilization Trade
            offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Allocation Decision
            </p>
            <p style="margin-top: 0">
              GPU allocation happens at scheduling time and fundamentally
              determines performance isolation, utilization efficiency, and
              cost. Full device allocation gives one workload exclusive access
              to an entire GPU (like a V100 with 16GB memory). Fractional
              allocation uses NVIDIA MIG (on A100 or newer) or vGPU to slice a
              physical GPU into smaller isolated partitions, allowing multiple
              workloads to share the same device.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Full GPU Allocation
            </p>
            <p style="margin-top: 0">
              Provides strong isolation and predictable performance. A LLM
              requiring 14GB of memory and high memory bandwidth gets the entire
              device without contention. The downside is capacity waste: a small
              embedding model using only 2GB leaves 14GB idle on a 16GB GPU,
              raising costs significantly. For latency critical inference with
              strict SLOs, full allocation prevents noisy neighbor interference
              from other workloads competing for shared resources like memory
              bandwidth, PCIe lanes, or power/thermal budgets.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fractional GPU Allocation
            </p>
            <p style="margin-top: 0">
              Improves bin packing and utilization. MIG on A100 can create up to
              seven instances (like 1g.5gb partitions), each with dedicated
              memory and SM slices. This allows seven small models to share one
              A100 instead of requiring seven separate GPUs. The cost savings
              are substantial: $3 per hour for one A100 versus $21 per hour for
              seven separate V100s. The catch is scheduling fragmentation and
              potential interference. If you have three 1g.5gb instances
              allocated and need a 3g.20gb instance, the remaining capacity is
              stranded until existing workloads complete.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hybrid Production Approach
            </p>
            <p style="margin-top: 0">
              Latency critical inference serving gets full GPUs with on demand
              capacity for reliability. Batch workloads, fine tuning jobs, and
              development workloads use fractional GPUs on spot instances for
              cost efficiency. Small models under 4GB memory footprint are good
              fractional GPU candidates. Large models over 10GB or those
              requiring near peak memory bandwidth get full devices to avoid
              performance degradation.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Full GPU Allocation</strong>
                  <div style="margin-top: 8px; padding: 8px; border: 1px solid; border-radius: 4px; font-size: 11px">
                    <strong>V100 16GB</strong>
                    <br />
                    Model: 14GB used
                    <br />
                    Idle: 2GB wasted
                  </div>
                  <div style="font-size: 11px; margin-top: 8px">
                    ✓ Strong isolation
                    <br />✓ Predictable latency
                  </div>
                  <div style="font-size: 11px">
                    ✗ Low utilization
                    <br />✗ High cost per model
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Fractional (MIG)</strong>
                  <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 4px">
                    <div style="padding: 4px; border: 1px solid; border-radius: 3px; font-size: 10px">
                      1g.5gb: Model A (2GB)
                    </div>
                    <div style="padding: 4px; border: 1px solid; border-radius: 3px; font-size: 10px">
                      1g.5gb: Model B (3GB)
                    </div>
                    <div style="padding: 4px; border: 1px solid; border-radius: 3px; font-size: 10px">
                      1g.5gb: Model C (2GB)
                    </div>
                  </div>
                  <div style="font-size: 11px; margin-top: 8px">
                    ✓ Better utilization
                    <br />✓ Lower cost per model
                  </div>
                  <div style="font-size: 11px">
                    ✗ Potential interference
                    <br />✗ Fragmentation risk
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
                  Full GPU allocation wastes capacity when small models use 2GB
                  out of 16GB available, but provides strong isolation and
                  predictable latency for Service Level Objective (SLO) critical
                  inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MIG on A100 creates up to seven 1g.5gb instances allowing
                  seven small models on one GPU at $3/hour instead of seven
                  V100s at $21/hour total, saving 86% on compute cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fractional allocation causes scheduling fragmentation: three
                  1g.5gb instances allocated leaves capacity stranded when you
                  need one 3g.20gb instance until existing workloads drain
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Noisy neighbor interference on shared GPUs affects memory
                  bandwidth, PCIe contention, and power/thermal throttling,
                  degrading p99 latency by 30 to 50% in production multi tenant
                  scenarios
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid strategy allocates full GPUs for latency critical
                  inference (on demand capacity) and fractional GPUs for batch
                  jobs, fine tuning, and development (spot capacity) based on
                  workload tolerance
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
                  Large language model requiring 14GB memory and high memory
                  bandwidth gets exclusive V100 16GB to avoid interference;
                  embedding model using 2GB gets MIG 1g.5gb partition
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A100 40GB configured with seven 1g.5gb MIG instances for
                  development and experimentation workloads, reducing per
                  developer GPU cost from $2.50/hour to $0.36/hour
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production failure: fractional GPU allocation caused out of
                  memory despite 8GB free reported because memory fragmentation
                  from frequent model swaps prevented contiguous allocation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutoscalingGpuSharingFullGpuVsFractionalAllocationIsolationVsUtilizationTradeOffs;
