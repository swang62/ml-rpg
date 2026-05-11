import type { Component } from "solid-js";

const LessonGpuResourceManagementImplementationPatternsTwoLevelSchedulingAndProfilingBasedCoLocation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation Patterns: Two Level Scheduling and Profiling Based
            Co-location
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Level Scheduler Architecture
            </p>
            <p style="margin-top: 0">
              Production GPU schedulers implement two level architecture: global
              admission control with topology aware placement, and local device
              management with spatial or temporal sharing enforcement. The
              global layer runs gang scheduling, determines which jobs to admit
              based on priority tiers, and solves the topology constrained bin
              packing problem. It models the GPU to PCIe switch to CPU socket to
              node hierarchy and prefers packing within NVLink islands before
              spanning nodes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Local Device Management
            </p>
            <p style="margin-top: 0">
              The local layer enforces sharing policies: whole GPU or MIG slice
              allocation for spatial isolation, or time slicing aligned to mini
              batch boundaries for temporal sharing. It manages CUDA context
              lifecycle to amortize creation cost (hundreds of milliseconds) and
              applies MPS when beneficial for many small kernels. For AoT
              execution, it warms up records once to build the operator DAG and
              stream assignments, then replays the schedule every iteration.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Co-location and Interference Management
            </p>
            <p style="margin-top: 0">
              Co-location and interference management require profiling. Systems
              build an interference matrix by running representative job pairs
              or triples under different allocation shares, measuring compute
              utilization, memory bandwidth saturation, and latency. Profiling
              reveals which workloads are complementary: pairing a memory bound
              data preprocessing task with a compute bound training iteration
              can increase aggregate throughput by 30 to 50 percent. A greedy or
              ILP based bin packer uses the matrix to maximize throughput
              subject to QoS constraints.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Elastic Scaling and Orchestration
            </p>
            <p style="margin-top: 0">
              Elastic scaling and workflow orchestration complete the system.
              Elastic jobs grow or shrink worker count at safe synchronization
              points to defragment capacity without destabilizing training. DAG
              schedulers predict task durations from historical runs to pre-warm
              capacity and reduce idle gaps. Critical path analysis prioritizes
              tasks that unblock many downstream operations.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two level scheduling: global layer does gang admission,
                  priority tiers, and topology aware placement modeling GPU to
                  PCIe to socket hierarchy; local layer enforces spatial (MIG)
                  or temporal (time slicing) sharing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  AoT execution warm up records one iteration to build operator
                  DAG and stream assignments, replays schedule every iteration
                  eliminating runtime launch overhead; pipelines Host to Device
                  (H2D), compute, and Device to Host (D2H) using double or
                  triple buffering
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Profiling based co-location builds interference matrix by
                  running job pairs under different shares, measuring
                  utilization and latency; pairing complementary workloads
                  (memory bound plus compute bound) increases throughput by 30
                  to 50%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Elastic scaling grows or shrinks worker count at epoch
                  boundaries or explicit barriers to defragment capacity; DAG
                  schedulers predict task durations and prioritize critical path
                  to minimize pipeline latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Local layer manages CUDA context lifecycle (hundreds of
                  milliseconds creation cost), applies MPS for concurrent small
                  kernels, and enforces QoS isolation via MIG or priority
                  streams
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
                  HiveD global scheduler: Models 8 GPU NVLink islands as single
                  allocation unit, places 16 GPU training job as 2 adjacent
                  islands to minimize cross node traffic, queues until topology
                  constraint satisfied
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Profiling driven co-location: Pairing image decoding (memory
                  bound, 40% GPU utilization) with ResNet training (compute
                  bound, 95% SM utilization) on same GPU via MPS, achieving 1.4x
                  aggregate throughput vs sequential
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Elastic training pattern: 32 GPU job shrinks to 16 workers at
                  epoch end when higher priority job arrives, releases 16 GPUs
                  immediately, grows back to 32 when capacity freed, maintains
                  training stability throughout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGpuResourceManagementImplementationPatternsTwoLevelSchedulingAndProfilingBasedCoLocation;
