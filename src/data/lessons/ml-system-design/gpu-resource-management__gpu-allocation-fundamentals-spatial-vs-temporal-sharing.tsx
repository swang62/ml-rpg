import type { Component } from "solid-js";

const LessonGpuResourceManagementGpuAllocationFundamentalsSpatialVsTemporalSharing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            GPU Allocation Fundamentals: Spatial vs Temporal Sharing
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
                <strong>GPU allocation</strong> manages a scarce resource with
                unique constraints: VRAM capacity, memory bandwidth, and
                interconnect topology (NVLink vs PCIe). Two fundamental sharing
                models exist: <strong>spatial sharing</strong> assigns dedicated
                GPU resources to jobs, while <strong>temporal sharing</strong>{" "}
                time slices a single GPU across multiple jobs.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Spatial Isolation Benefits
            </p>
            <p style="margin-top: 0">
              Spatial isolation provides predictable QoS and prevents
              interference between tenants. NVIDIA Multi Instance GPU (MIG) on
              A100 and H100 can partition one physical GPU into up to 7 isolated
              instances, each with dedicated Streaming Multiprocessors (SMs),
              VRAM, cache, and bandwidth. In production, operators run 7
              concurrent inference tenants per A100 with strong latency
              guarantees. The tradeoff is fragmentation: if your queued jobs
              need 3 MIG slices but you have 2 available on one GPU and 2 on
              another, neither job can run despite having enough aggregate
              capacity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Temporal Sharing Trade-offs
            </p>
            <p style="margin-top: 0">
              Temporal sharing improves utilization by switching between jobs at
              mini batch boundaries or fixed time quanta. This helps with
              fairness and packing mismatched workloads, but introduces cache
              pollution, TLB churn, and unpredictable latency tails. Default
              PyTorch execution can leave GPUs idle 70 to 90 percent of the time
              due to single stream FIFO kernel submission and launch overhead.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing the Right Model
            </p>
            <p style="margin-top: 0">
              Use spatial isolation with MIG for multi tenant inference serving
              with strict SLOs under steady load; use temporal sharing for
              exploratory training, hyperparameter optimization, and short tasks
              where fairness matters more than per iteration latency.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; justify-content: center">
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 10px; text-align: center; font-size: 15px">
                    Spatial Sharing
                  </div>
                  <div style="font-size: 13px; margin-bottom: 6px">
                    <strong>A100 GPU → 7 MIG Instances</strong>
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    Instance 1: 10GB VRAM
                    <br />
                    Instance 2: 10GB VRAM
                    <br />
                    Instance 3: 10GB VRAM
                    <br />
                    ...(isolated SMs/cache)
                  </div>
                  <div style="margin-top: 8px; font-size: 12px">
                    <strong>+</strong> Predictable QoS
                    <br />
                    <strong>−</strong> Fragmentation
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 10px; text-align: center; font-size: 15px">
                    Temporal Sharing
                  </div>
                  <div style="font-size: 13px; margin-bottom: 6px">
                    <strong>Single GPU time sliced</strong>
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    Job A: 100ms slice
                    <br />
                    Job B: 100ms slice
                    <br />
                    Job C: 100ms slice
                    <br />
                    (switch at mini batch)
                  </div>
                  <div style="margin-top: 8px; font-size: 12px">
                    <strong>+</strong> High utilization
                    <br />
                    <strong>−</strong> Cache churn, tail latency
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
                  Spatial sharing with MIG provides up to 7 isolated GPU
                  instances per A100/H100, each with dedicated SMs, VRAM, cache,
                  and bandwidth for predictable multi tenant inference serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temporal sharing improves utilization and fairness but default
                  PyTorch leaves GPUs idle 70 to 90% of time; multi stream
                  execution with AoT scheduling achieves up to 22.3x speedup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fragmentation is the primary cost of spatial isolation:
                  stranded MIG slices or whole GPUs that do not match queued job
                  requirements leave capacity unused despite aggregate
                  availability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temporal sharing introduces cache pollution and TLB churn on
                  context switches, causing latency tails that can violate
                  strict SLOs for latency sensitive serving workloads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production choice: spatial isolation for serving with steady
                  load and strict p95/p99 targets; temporal sharing for
                  training, hyperparameter optimization, and exploratory
                  workloads prioritizing fairness
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
                  NVIDIA production pattern: 7 concurrent inference tenants per
                  A100 using MIG, each with isolated 10GB VRAM slice and
                  dedicated compute, achieving strong QoS without interference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Nomad case study: 8×A800 80GB node ran 66 short training jobs
                  (1 GPU each, ~2.5 min), scheduler queued excess beyond 8
                  concurrent jobs, achieved 100% completion with zero
                  oversubscription and immediate GPU release on task completion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGpuResourceManagementGpuAllocationFundamentalsSpatialVsTemporalSharing;
