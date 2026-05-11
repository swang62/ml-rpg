import type { Component } from "solid-js";

const LessonAutoscalingGpuSharingGpuAutoscalingFailureModesOscillationPlacementAndHiddenBottlenecks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            GPU Autoscaling Failure Modes: Oscillation, Placement, and Hidden
            Bottlenecks
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Metric Induced Oscillation
            </p>
            <p style="margin-top: 0">
              Occurs when instantaneous GPU utilization drives scaling
              decisions. A batch inference workload processes 100 requests
              together, causing GPU utilization to spike to 95% for 30 seconds
              then drop to 5% while waiting for the next batch. Naive
              autoscaling sees the 95% spike and adds two replicas. By the time
              the new replicas start (after 240 second cold start), the original
              batch completed and utilization reads 5%, triggering immediate
              scale down. This thrashing wastes cost and destabilizes the
              system. Production solutions use 3 to 5 minute rolling averages
              combined with asymmetric hysteresis.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Placement Deadlocks
            </p>
            <p style="margin-top: 0">
              Trap GPU pods in pending state indefinitely despite autoscaling
              being enabled. The cluster autoscaler only adds nodes that can
              satisfy pending pod constraints. If your GPU pod requires a
              specific node selector label or toleration that no node group
              provides, the autoscaler never adds capacity. Similarly, if GPU
              nodes lack proper taints, non GPU workloads can consume them,
              leaving GPU pods unscheduled. The symptom is pending pods with
              "Insufficient nvidia.com/gpu" events while the cluster autoscaler
              logs show "no available node groups can satisfy this pod."
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hidden Bottlenecks
            </p>
            <p style="margin-top: 0">
              Cause high latency despite low GPU utilization. A real production
              case saw p99 inference latency at 800ms with only 25% SM
              utilization. Investigation revealed the bottleneck was CPU
              preprocessing (tokenization and feature extraction taking 500ms)
              before GPU inference (taking 100ms). The autoscaler added GPU
              replicas uselessly because GPU capacity was not the constraint.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory Bandwidth Saturation
            </p>
            <p style="margin-top: 0">
              Shows as normal SM utilization but terrible throughput. PCIe
              bottlenecks between CPU and GPU memory cause low GPU utilization
              while data transfers dominate. The fix requires monitoring
              correlated metrics: SM occupancy AND memory bandwidth AND end to
              end latency AND CPU utilization to identify the true constraint
              before scaling.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Oscillation (Batch Workload)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    t=0s: Batch arrives, GPU util 95%
                    <br />
                    t=10s: Autoscaler triggers scale up
                    <br />
                    t=30s: Batch completes, GPU util 5%
                    <br />
                    t=250s: New replica ready, sees 5%, scales down
                    <br />
                    <strong>Thrashing wastes cost</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Placement Deadlock</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Pod: nodeSelector: gpu-type=a100
                    <br />
                    Cluster: Only V100 node groups exist
                    <br />
                    Status: Pending (Insufficient nvidia.com/gpu)
                    <br />
                    <strong>Autoscaler never adds A100 nodes</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Hidden Bottleneck (CPU Bound)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    GPU SM util: 25% (looks underutilized)
                    <br />
                    CPU preprocessing: 500ms per request
                    <br />
                    GPU inference: 100ms per request
                    <br />
                    p99 latency: 800ms (SLO violated)
                    <br />
                    <strong>Adding GPUs does not help</strong>
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
                  Oscillation from instantaneous metrics causes thrashing when
                  batch workload spikes to 95% utilization for 30 seconds then
                  drops to 5%, triggering scale up then immediate scale down
                  after 240 second cold start
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Placement deadlocks occur when GPU pod constraints (like
                  nodeSelector for A100) do not match any cluster autoscaler
                  node group configuration, leaving pods pending despite
                  autoscaling enabled
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hidden CPU bottlenecks cause 800ms p99 latency with only 25%
                  GPU utilization because preprocessing takes 500ms before 100ms
                  GPU inference, making GPU scaling ineffective
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory bandwidth saturation shows normal Streaming
                  Multiprocessor (SM) occupancy but terrible throughput when
                  large language model inference is memory bound rather than
                  compute bound, requiring bandwidth aware scaling signals
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU memory fragmentation causes out of memory errors at
                  allocation time despite showing free capacity because frequent
                  model swaps or fractional allocations create non contiguous
                  free space
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
                  Production incident: batch inference oscillated between 1 and
                  4 replicas every 6 minutes due to 30 second batch processing
                  pattern and instantaneous utilization metric; fixed with 5
                  minute rolling average and 5 minute scale down stabilization
                  window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Placement deadlock: GPU pods pending for 2 hours because
                  nodeSelector required label gpu-type=v100 but cluster
                  autoscaler node groups only had label
                  cloud.google.com/gke-accelerator=nvidia-tesla-v100 without
                  custom gpu-type label
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Performance debugging: p95 latency at 650ms with 30% GPU
                  utilization revealed PCIe bottleneck transferring 500MB
                  feature tensors from CPU to GPU memory taking 400ms per
                  request; fixed by moving preprocessing to GPU
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutoscalingGpuSharingGpuAutoscalingFailureModesOscillationPlacementAndHiddenBottlenecks;
