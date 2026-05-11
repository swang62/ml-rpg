import type { Component } from "solid-js";

const LessonResourceOrchestrationWhatIsGpuResourceOrchestrationInMlClusters: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is GPU Resource Orchestration in ML Clusters?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>GPU Resource Orchestration:</strong> The automated
              allocation, scheduling, and management of GPU resources across ML
              workloads. Unlike CPU orchestration, GPU scheduling must handle
              hardware heterogeneity (different GPU models), topology
              constraints (NVLink connections), and the binary nature of GPU
              allocation (models often need whole GPUs, not fractions).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why GPU Orchestration is Different
            </p>
            <p>
              CPUs are fungible: any core can run any task, and tasks share
              cores seamlessly via time-slicing. GPUs are not: a model compiled
              for one GPU architecture may not run on another, memory is not
              easily shared between processes, and GPU context switching is
              expensive (milliseconds vs microseconds). Additionally, GPUs cost
              10-100x more than CPUs per hour, making utilization efficiency
              critical. A cluster with 50% GPU utilization is wasting thousands
              of dollars per day.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Key Orchestration Challenges
            </p>
            <p>
              <strong>Heterogeneity:</strong> Clusters often mix GPU generations
              (A100, H100, older V100s). Training workloads need specific
              architectures; inference can often run on older hardware.{" "}
              <strong>Topology:</strong> Multi-GPU training performance depends
              on interconnect bandwidth. GPUs connected via NVLink (600 GB/s)
              communicate 10x faster than PCIe (32 GB/s). Scheduling must
              consider physical topology, not just available GPU count.{" "}
              <strong>Fragmentation:</strong> If jobs request 4 GPUs but
              available GPUs are scattered across nodes (2 here, 2 there), the
              job cannot run despite sufficient total capacity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Orchestration Components
            </p>
            <p>
              GPU discovery (detecting available GPUs and their properties),
              scheduling (matching workloads to appropriate GPUs), isolation
              (preventing workloads from interfering with each other), and
              monitoring (tracking utilization, memory, temperature). Standard
              container orchestrators like Kubernetes handle discovery and basic
              scheduling; ML workloads often require custom schedulers for
              topology-awareness and gang scheduling.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Cost Reality:</strong> GPU clusters are expensive. An
              8-GPU node costs around 30,000 per month. At 50% utilization, you
              are wasting 15,000 per node monthly. Orchestration directly
              impacts the bottom line.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Discovery Plane</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Detects GPUs, memory, health
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Scheduling Plane</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Placement with topology &amp; quotas
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Runtime Injection Plane
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Wires containers to devices
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
                  GPUs are not fungible like CPUs: architecture, memory, and
                  topology matter
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NVLink (600 GB/s) is 10x faster than PCIe (32 GB/s) for
                  multi-GPU communication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fragmentation blocks jobs even when total GPU count is
                  sufficient
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
                  8-GPU node at 50% utilization wastes 15,000 per month
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training needs specific GPU architecture; inference can use
                  older hardware
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonResourceOrchestrationWhatIsGpuResourceOrchestrationInMlClusters;
