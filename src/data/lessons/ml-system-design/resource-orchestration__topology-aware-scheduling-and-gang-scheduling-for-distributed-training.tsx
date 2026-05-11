import type { Component } from "solid-js";

const LessonResourceOrchestrationTopologyAwareSchedulingAndGangSchedulingForDistributedTraining: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Topology Aware Scheduling and Gang Scheduling for Distributed
            Training
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Topology-Aware Scheduling:</strong> Placing workloads on
              GPUs based on physical interconnect topology, not just
              availability. GPUs on the same node connected via NVLink
              communicate orders of magnitude faster than GPUs across nodes
              connected via network. Ignoring topology can slow distributed
              training by 2-5x.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Topology Matters
            </p>
            <p>
              Data parallel training requires frequent gradient synchronization
              across GPUs. With 4 GPUs on the same node (NVLink, 600 GB/s), an
              all-reduce operation completing in 10ms might take 100ms across
              nodes (25 Gbps network). For a training step taking 200ms of
              compute, intra-node communication adds 5% overhead; inter-node
              adds 50%. The scheduler must understand: which GPUs share NVLink,
              which share PCIe switches, which require network hops. Placing a
              4-GPU job across 4 nodes when 4 GPUs are available on one node is
              a performance disaster.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Gang Scheduling
            </p>
            <p>
              Distributed training jobs need all their GPUs simultaneously. If a
              job requests 8 GPUs and only 6 are available, it cannot
              start—unlike CPU jobs that can run with partial allocation. Gang
              scheduling ensures all resources for a job are allocated
              atomically: either the job gets all 8 GPUs or it waits. Without
              gang scheduling, partial allocations cause deadlocks: Job A holds
              4 GPUs waiting for 4 more, Job B holds 4 GPUs waiting for 4 more,
              neither can proceed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scheduler Implementation
            </p>
            <p>
              Standard Kubernetes schedulers are not topology-aware. They see
              GPUs as identical resources. ML schedulers extend this with:
              topology detection (discovering NVLink connections, PCIe topology,
              network layout), affinity rules (prefer co-located GPUs), and gang
              semantics (all-or-nothing allocation). The scheduler maintains a
              topology graph and solves a bin-packing problem: fit jobs onto the
              cluster while respecting topology preferences and resource
              constraints.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Performance Impact:</strong> Properly topology-aware
              placement can improve distributed training throughput by 30-50%
              compared to naive scheduling, with no changes to the training code
              itself.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Single Node: 4 GPUs via NVLink
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    All reduce: &lt;1 ms for 32 MB
                  </div>
                  <div style="font-size: 11px">Bandwidth: 300 to 900 GB/s</div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  vs
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Cross Node: 4 GPUs via Network
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    All reduce: 10 to 20 ms
                  </div>
                  <div style="font-size: 11px">
                    Bandwidth: 200 Gbps InfiniBand
                  </div>
                  <div style="font-size: 11px; font-weight: bold">
                    30 to 60% throughput loss
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
                  NVLink (600 GB/s) vs network (25 Gbps) makes topology critical
                  for gradient sync
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gang scheduling prevents deadlock by allocating all GPUs
                  atomically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Proper topology placement improves training throughput 30-50%
                  with no code changes
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
                  All-reduce: 10ms intra-node (NVLink) vs 100ms inter-node
                  (network)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  8-GPU job deadlock: A holds 4 waiting for 4, B holds 4 waiting
                  for 4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonResourceOrchestrationTopologyAwareSchedulingAndGangSchedulingForDistributedTraining;
