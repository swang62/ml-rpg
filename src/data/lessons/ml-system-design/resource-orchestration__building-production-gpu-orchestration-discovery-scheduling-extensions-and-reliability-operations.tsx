import type { Component } from "solid-js";

const LessonResourceOrchestrationBuildingProductionGpuOrchestrationDiscoverySchedulingExtensionsAndReliabilityOperations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Building Production GPU Orchestration: Discovery, Scheduling
            Extensions, and Reliability Operations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Production GPU Orchestration Stack:</strong> A complete
              GPU orchestration system includes device discovery, extended
              scheduling, quota management, and operational tooling. Each layer
              builds on Kubernetes primitives but requires ML-specific
              extensions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Device Discovery and Registration
            </p>
            <p>
              The device plugin framework allows GPUs to appear as schedulable
              resources. Plugins run on each node, detect available GPUs, and
              report them to the scheduler. Beyond basic count, ML clusters
              need: GPU model (A100 vs V100), memory capacity, topology
              information (NVLink connections), and health status. This metadata
              enables intelligent scheduling decisions. Without rich discovery,
              the scheduler sees only "4 GPUs available" with no ability to
              distinguish between generations or configurations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scheduling Extensions
            </p>
            <p>
              Default schedulers are insufficient for ML workloads. Extensions
              include: <strong>Gang scheduler:</strong> Allocates all GPUs for a
              job atomically, preventing deadlock.{" "}
              <strong>Topology scheduler:</strong> Prefers GPUs with fast
              interconnects for multi-GPU jobs.{" "}
              <strong>Preemption controller:</strong> Allows high-priority jobs
              to evict lower-priority workloads. <strong>Quota manager:</strong>{" "}
              Enforces per-team GPU limits to prevent resource hogging. These
              components integrate with the core scheduler via extension points
              (scheduling framework, webhooks).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Operational Tooling
            </p>
            <p>
              Running GPU clusters requires specialized observability. Metrics
              to collect: per-GPU utilization, memory usage, temperature, power
              draw, ECC errors, and per-job GPU time. Dashboards should show:
              cluster-wide utilization (target 80%+), queue depth by priority,
              fragmentation ratio, and unhealthy GPU count. Automation:
              auto-drain nodes with failing GPUs, auto-scale node pools based on
              queue depth, auto-terminate jobs exceeding time limits. Without
              this tooling, operators cannot effectively manage GPU resources at
              scale.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Integration Path:</strong> Start with device plugin for
              discovery, add gang scheduling for training workloads, implement
              quota management for multi-tenancy, then add topology-awareness as
              cluster grows.
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
                  Device plugins report GPU count, model, memory, topology to
                  scheduler
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gang scheduling, topology awareness, preemption, quotas extend
                  default scheduler
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Target 80%+ cluster utilization with dashboards tracking
                  fragmentation and queue depth
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
                  Integration path: device plugin, gang scheduling, quotas,
                  topology-awareness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Auto-drain nodes with failing GPUs, auto-terminate jobs
                  exceeding time limits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonResourceOrchestrationBuildingProductionGpuOrchestrationDiscoverySchedulingExtensionsAndReliabilityOperations;
