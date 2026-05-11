import type { Component } from "solid-js";

const LessonResourceOrchestrationFailureModesInGpuOrchestrationFragmentationDeadlockAndHealthDrift: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes in GPU Orchestration: Fragmentation, Deadlock, and
            Health Drift
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>GPU Orchestration Failures:</strong> Unlike CPU clusters
              where failures are usually obvious (crash, OOM), GPU orchestration
              fails in subtle ways: fragmentation blocks scheduling, deadlocks
              stall queues, and unhealthy GPUs produce wrong results silently.
              These failures manifest as degraded throughput and mysterious job
              failures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Resource Fragmentation
            </p>
            <p>
              Cluster has 32 GPUs but jobs requesting 8 GPUs cannot schedule.
              Why? The 32 GPUs are scattered: 4 nodes with 2 GPUs available
              each, 3 nodes with 4 GPUs each, and so on. No single node or
              topology-connected group has 8 available GPUs. Fragmentation
              worsens over time as long-running jobs occupy random positions.
              Mitigations: defragmentation (preempt low-priority jobs to
              consolidate space), bin-packing schedulers (fill nodes before
              spreading), and job sizing guidance (discourage awkward GPU counts
              that fragment easily).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scheduling Deadlocks
            </p>
            <p>
              Job A requests 8 GPUs, gets 4, waits for 4 more. Job B requests 8
              GPUs, gets 4, waits for 4 more. Neither can proceed; both hold
              resources the other needs. Without gang scheduling (all-or-nothing
              allocation), deadlocks are common in multi-tenant clusters.
              Detection: monitor job wait times, alert when jobs wait longer
              than threshold. Resolution: preempt one job to free resources,
              implement gang scheduling, or use priority-based preemption where
              lower-priority jobs release resources.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GPU Health Drift
            </p>
            <p>
              GPUs degrade silently. Memory errors accumulate (ECC correctable
              errors), thermal throttling reduces performance (overheating GPUs
              slow down), and driver issues cause intermittent failures. A
              "healthy" GPU that is actually throttled will complete jobs
              slowly, dragging down distributed training (all workers wait for
              the slowest). Monitoring must track: ECC error counts, GPU
              temperature and clock speeds, and per-GPU job completion times.
              Automatic remediation: drain unhealthy GPUs from scheduling pool,
              alert infrastructure team.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Monitoring Priority:</strong> Track fragmentation ratio
              (requested vs schedulable), job queue wait times, and per-GPU
              health metrics. These leading indicators predict failures before
              users notice.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Fragmentation</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    300 free 5GB slices, job needs 10GB
                  </div>
                  <div style="font-size: 11px; font-weight: bold">
                    Cannot admit despite free capacity
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Gang Deadlock</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    400/512 GPUs reserved, waiting for 112
                  </div>
                  <div style="font-size: 11px; font-weight: bold">
                    Blocks 30 small jobs that could run
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Health Drift</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    GPU with ECC errors runs 30% slower
                  </div>
                  <div style="font-size: 11px; font-weight: bold">
                    Scheduler unaware, keeps assigning work
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
                  Fragmentation: 32 GPUs available but 8-GPU job cannot schedule
                  due to scatter
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deadlock: two jobs each holding half resources waiting for the
                  other half
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU health drift: thermal throttling and ECC errors degrade
                  performance silently
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
                  Bin-packing schedulers fill nodes before spreading to reduce
                  fragmentation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Drain unhealthy GPUs from pool when ECC errors or throttling
                  detected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonResourceOrchestrationFailureModesInGpuOrchestrationFragmentationDeadlockAndHealthDrift;
