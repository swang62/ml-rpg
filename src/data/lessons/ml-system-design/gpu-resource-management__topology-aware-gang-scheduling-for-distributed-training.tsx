import type { Component } from "solid-js";

const LessonGpuResourceManagementTopologyAwareGangSchedulingForDistributedTraining: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Topology Aware Gang Scheduling for Distributed Training
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Gang Scheduling Matters
            </p>
            <p style="margin-top: 0">
              Distributed ML training requires gang scheduling: a job makes
              progress only when its entire worker set (all tensor parallel,
              model parallel, and data parallel ranks) is co-allocated
              simultaneously. A single missing GPU stalls the entire collective
              communication operation, wasting all other allocated resources.
              The challenge is placement: where to locate these workers to
              minimize communication latency and maximize bandwidth for
              synchronous operations like all reduce.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GPU Interconnect Hierarchy
            </p>
            <p style="margin-top: 0">
              GPU interconnect topology creates a hierarchy of bandwidth tiers.
              NVLink within a single node provides aggregate bandwidth of
              approximately 600 GB/s per A100 GPU. PCIe Gen4 x16 drops to
              approximately 32 GB/s per direction. Cross socket communication
              within a node traverses the CPU interconnect, adding latency.
              Cross node communication uses RDMA over Ethernet or InfiniBand.
              Placing an all reduce ring across PCIe instead of NVLink can
              degrade throughput by 2 to 10x for communication bound workloads.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Topology Aware Placement
            </p>
            <p style="margin-top: 0">
              Topology aware schedulers like HiveD model the GPU to PCIe switch
              to CPU socket to node hierarchy and assign affinity constraints.
              For synchronous data parallel training with all reduce, keep all
              workers within a single NVLink island (8 GPUs on modern NVIDIA
              servers). For larger jobs, pack workers to minimize cross socket
              and cross node hops. For parameter server architectures that
              tolerate higher latency, place parameter shards near NIC rich
              nodes and ensure NUMA affinity between NIC and GPU.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Utilization vs Throughput Trade-off
            </p>
            <p style="margin-top: 0">
              The tradeoff is utilization versus throughput. Strict topology
              constraints increase queue times and create fragmentation: a job
              needing 16 GPUs in 2 tightly coupled nodes may wait while 16
              scattered GPUs sit idle. Relaxing constraints improves placement
              flexibility but risks degrading training throughput. Elastic
              scaling systems can defragment capacity dynamically.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; text-align: center; margin-bottom: 6px">
                    Optimal: NVLink Island (Same Node)
                  </div>
                  <div style="font-size: 13px">
                    <strong>8 GPUs</strong> connected via{" "}
                    <strong>NVLink/NVSwitch</strong>
                    <br />
                    Bandwidth: <strong>~600 GB/s per GPU aggregate</strong>
                    <br />
                    All reduce latency: <strong>&lt;1ms</strong>
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: 700">
                  vs
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; text-align: center; margin-bottom: 6px">
                    Suboptimal: Cross PCIe/Cross Node
                  </div>
                  <div style="font-size: 13px">
                    <strong>8 GPUs</strong> spanning{" "}
                    <strong>2 nodes via PCIe + RDMA</strong>
                    <br />
                    Bandwidth: <strong>~32 GB/s per PCIe link</strong>
                    <br />
                    All reduce latency: <strong>5 to 10ms</strong>
                    <br />
                    <span>Throughput: 2 to 10x slower</span>
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
                  Gang scheduling requires entire worker set (all tensor
                  parallel and data parallel ranks) to be co-allocated; a single
                  missing GPU stalls collective operations and wastes all other
                  allocated resources
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NVLink provides approximately 600 GB/s aggregate bandwidth per
                  A100 within a node; PCIe Gen4 x16 drops to approximately 32
                  GB/s per direction; misplacement across these tiers degrades
                  throughput by 2 to 10x for communication bound training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Topology aware schedulers model GPU to PCIe switch to CPU
                  socket hierarchy, keeping synchronous all reduce jobs within
                  NVLink islands to minimize latency (sub 1ms vs 5 to 10ms cross
                  node)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Strict topology constraints improve training throughput but
                  increase queue times and fragmentation: 16 scattered idle GPUs
                  cannot run a job needing 2 tightly coupled 8 GPU nodes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Elastic scaling (grow/shrink at epoch boundaries) and
                  parameter server architectures with asynchronous updates
                  tolerate relaxed placement, trading per iteration latency for
                  higher utilization and shorter queue times
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
                  Meta distributed training pattern: Data parallel ranks placed
                  within NVLink islands on Zion and Grand Teton servers,
                  minimizing cross socket and PCIe traffic for synchronous all
                  reduce in large Distributed Data Parallel (DDP) and Mixture of
                  Experts (MoE) training jobs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  HiveD scheduler: Models GPU to PCIe to socket hierarchy,
                  assigns affinity constraints to keep 8 GPU training jobs
                  within single NVLink domain, queues jobs until topology
                  requirement met to preserve throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OpenAI gang allocation: Model parallel and tensor parallel
                  groups co-located in same rack or NVLink domain to minimize
                  collective communication latency for transformer training at
                  scale
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGpuResourceManagementTopologyAwareGangSchedulingForDistributedTraining;
