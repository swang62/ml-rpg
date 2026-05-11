import type { Component } from "solid-js";

const LessonGpuResourceManagementFailureModesFragmentationThrashingAndTopologyMisplacement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Fragmentation, Thrashing, and Topology Misplacement
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Device Fragmentation
            </p>
            <p style="margin-top: 0">
              GPU scheduling introduces failure modes invisible in CPU only
              systems. Device fragmentation occurs when MIG slices or whole GPU
              allocations strand capacity: you have 2 free slices on GPU A and 2
              on GPU B, but queued jobs each need 3 slices from a single GPU.
              Aggregate capacity exists but is unusable. Memory fragmentation
              within a single GPU is equally insidious: long lived model weights
              and frequent allocation and deallocation of activations create
              unusable holes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scheduler Induced Idleness
            </p>
            <p style="margin-top: 0">
              Scheduler induced idleness and thrashing waste even more
              resources. Default framework execution leaves GPUs idle 70 to 91
              percent of time due to launch overhead. Preemption thrashing
              occurs when a job is killed, queued, restarted, and killed again
              before checkpointing, discarding all progress. Gang scheduling
              amplifies this: preempting one worker idles the other 7 in an 8
              GPU distributed job, wasting 87.5 percent of allocated capacity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Topology Misplacement
            </p>
            <p style="margin-top: 0">
              Topology misplacement degrades throughput by multiples. Placing an
              all reduce training job across PCIe links instead of NVLink drops
              bandwidth from approximately 600 GB/s to approximately 32 GB/s per
              direction, a 20x difference. NCCL ring reconfiguration during
              migration adds seconds of instability and can trigger cascading
              timeouts. Heterogeneity drift is subtle: identical GPU SKUs
              exhibit different performance due to thermal throttling, ECC
              memory errors, or silicon lottery variance.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Interference and Oversubscription
            </p>
            <p style="margin-top: 0">
              Oversubscription and interference from naive co-location violate
              SLOs. MPS or pure time slicing can produce cache and memory
              bandwidth contention, causing latency spikes. Co-locating memory
              bound and compute bound jobs sounds optimal but workload phase
              changes create bursty interference. MIG reconfiguration requires
              evicting all tenants with no live resize, causing operational
              churn.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 11px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    Device Fragmentation
                  </div>
                  <div style="font-size: 12px">
                    GPU A: [Slice 1: Busy] [Slice 2: Free] [Slice 3: Free]
                    <br />
                    GPU B: [Slice 1: Free] [Slice 2: Busy] [Slice 3: Free]
                    <br />
                    <span>Queued job needs 3 contiguous slices → blocked</span>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 11px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    Topology Misplacement
                  </div>
                  <div style="font-size: 12px">
                    8 GPU training job split across 2 nodes
                    <br />
                    NVLink: ~600 GB/s → PCIe + RDMA: ~32 GB/s
                    <br />
                    <span>Throughput degradation: 2 to 10x slower</span>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 11px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    Preemption Thrashing
                  </div>
                  <div style="font-size: 12px">
                    Job A: started → preempted at step 50 → queued
                    <br />
                    Job A: restarted from step 0 → preempted at step 30
                    <br />
                    <span>
                      No checkpoint saved, progress lost, queue time wasted
                    </span>
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
                  Device fragmentation: 2 free MIG slices on GPU A plus 2 on GPU
                  B cannot satisfy a job needing 3 slices from one GPU;
                  aggregate capacity exists but is stranded by allocation
                  boundaries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Topology misplacement degrades all reduce training throughput
                  by 2 to 10x when jobs span PCIe (approximately 32 GB/s)
                  instead of NVLink (approximately 600 GB/s); NCCL ring
                  reconfiguration on migration adds seconds of instability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Preemption thrashing wastes progress when jobs are killed
                  before checkpointing and restarted repeatedly; gang scheduled
                  8 GPU jobs amplify waste by idling 7 workers when 1 is
                  preempted
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Heterogeneity drift from thermal throttling, ECC errors, and
                  silicon variance causes identical GPU SKUs to perform 5 to 10%
                  differently; static placement degrades over time without
                  continuous health monitoring
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MIG reconfiguration requires evicting all tenants with no live
                  resize, causing operational churn; MPS and naive co-location
                  risk cache and bandwidth contention producing latency spikes
                  that violate SLOs
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
                  Production fragmentation scenario: 16×A100 cluster with MIG
                  configured as 7 slices per GPU yields 112 total slices; after
                  running 10×3 slice jobs and 5×2 slice jobs, remaining 67
                  slices are scattered across GPUs preventing any 4 slice job
                  from running
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gandiva research: Migration typically completes in under 4
                  seconds but NCCL ring reconfiguration can add additional
                  seconds and trigger timeouts in tightly synchronized
                  collectives, requiring retry logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory fragmentation observed in long running training:
                  PyTorch eager mode allocates and frees activations per layer,
                  creating 100MB to 500MB unusable holes in 80GB VRAM,
                  eventually triggering out of memory despite 20GB nominally
                  free
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGpuResourceManagementFailureModesFragmentationThrashingAndTopologyMisplacement;
