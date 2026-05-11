import type { Component } from "solid-js";

const LessonResourceOrchestrationGpuPartitioningPatternsWholeDeviceVsTimeSlicingVsHardwarePartitioning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            GPU Partitioning Patterns: Whole Device vs Time Slicing vs Hardware
            Partitioning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>GPU Partitioning:</strong> Strategies for sharing GPU
              resources among multiple workloads. Options range from exclusive
              whole-device allocation (simplest, lowest utilization) to
              hardware-level partitioning (complex, highest utilization). The
              right choice depends on workload characteristics and isolation
              requirements.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Whole Device Allocation
            </p>
            <p>
              Each workload gets exclusive access to entire GPUs. Simple to
              implement: container requests "1 GPU" and receives a whole device.
              Advantages: strong isolation, predictable performance, no resource
              contention. Disadvantages: poor utilization for small models. An
              inference job using 2GB of a 40GB GPU wastes 95% of the memory.
              Best for: training workloads that fully utilize GPU memory and
              compute, latency-sensitive inference where any contention is
              unacceptable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Time Slicing
            </p>
            <p>
              Multiple workloads share a GPU by taking turns. The GPU rapidly
              switches between contexts (typically every 10-100ms). Advantages:
              improves utilization for bursty workloads, no hardware support
              required. Disadvantages: context switching overhead (5-15%
              throughput loss), memory is not shared (all workloads must fit
              simultaneously), latency variance increases. Best for: development
              environments, batch inference with flexible latency, workloads
              that are memory-bound rather than compute-bound.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hardware Partitioning (MIG)
            </p>
            <p>
              Multi-Instance GPU divides a single GPU into isolated partitions
              at the hardware level. Each partition has dedicated compute units,
              memory, and cache. Unlike time slicing, partitions run
              simultaneously with guaranteed resources. An A100 80GB can
              partition into 7 instances of 10GB each. Advantages: true
              isolation (one workload cannot affect another), guaranteed
              resources, simultaneous execution. Disadvantages: requires
              supported hardware, partition sizes are fixed (cannot create
              arbitrary splits), reconfiguration requires workload evacuation.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Decision Framework:</strong> Production inference with
              SLA: whole device or MIG. Development and experimentation: time
              slicing. Memory-light workloads on expensive GPUs: MIG to maximize
              utilization.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Whole Device</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    1 GPU = 1 Pod
                  </div>
                  <div style="font-size: 11px">Simple, predictable</div>
                  <div style="font-size: 11px">Wastes at low util</div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Time Slicing</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    1 GPU = 4+ Pods
                  </div>
                  <div style="font-size: 11px">High utilization</div>
                  <div style="font-size: 11px">2x to 5x p99 spikes</div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">MIG Partition</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    1 GPU = 7 Slices
                  </div>
                  <div style="font-size: 11px">Isolated QoS</div>
                  <div style="font-size: 11px">Fixed slice sizes</div>
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
                  Whole device: simple but wastes resources for small models
                  (2GB on 40GB GPU)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time slicing: 5-15% overhead, memory not shared, increases
                  latency variance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MIG provides hardware isolation with guaranteed resources but
                  fixed partition sizes
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
                  A100 80GB partitions into 7 MIG instances of 10GB each
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time slicing switches context every 10-100ms with 5-15%
                  throughput loss
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonResourceOrchestrationGpuPartitioningPatternsWholeDeviceVsTimeSlicingVsHardwarePartitioning;
