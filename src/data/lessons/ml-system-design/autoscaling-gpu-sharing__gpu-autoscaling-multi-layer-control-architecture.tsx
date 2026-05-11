import type { Component } from "solid-js";

const LessonAutoscalingGpuSharingGpuAutoscalingMultiLayerControlArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            GPU Autoscaling: Multi Layer Control Architecture
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
                <strong>GPU autoscaling</strong> operates across three distinct
                layers that must coordinate together: the pod layer (scales
                application replicas), the node layer (scales underlying GPU
                capacity), and the GPU allocation layer (decides whether
                workloads get full devices or fractional slices).
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Different Timescales
            </p>
            <p style="margin-top: 0">
              Each layer operates on different timescales and uses different
              signals. Pod scaling reacts within seconds to minutes using
              metrics like queue depth, request concurrency, or p95 latency.
              Node scaling takes longer, typically 180+ seconds for node spin up
              plus GPU driver initialization plus model weight loading (which
              can be gigabytes). GPU allocation decisions happen at scheduling
              time, determining whether a small model gets 1/4 of a GPU through
              MIG or whether a large model needs an exclusive V100.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Coordination Challenge
            </p>
            <p style="margin-top: 0">
              If your pod autoscaler scales up 10 new replicas but your cluster
              autoscaler hasn't added GPU nodes, those pods sit pending
              indefinitely. If you allocate fractional GPUs too aggressively,
              memory fragmentation causes OOM errors despite showing free
              capacity. Production systems use smooth multi minute averages
              (like 3 minute windows) combined with hysteresis to prevent
              oscillation where you scale up on a spike then immediately scale
              down when the batch completes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Utilization Alone Misleads
            </p>
            <p style="margin-top: 0">
              A GPU can show 20% SM utilization while latency is terrible
              because the workload is memory bandwidth bound or bottlenecked on
              PCIe transfers. Effective monitoring combines SM occupancy, GPU
              memory usage, memory bandwidth utilization, plus end to end
              application latency to make informed scaling decisions. Relying on
              GPU utilization alone causes either over provisioning (wasting
              cost) or under provisioning (violating latency SLOs).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Pod Layer</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Replicas: 1→4 based on 40% GPU util target
                    <br />
                    Timescale: Seconds to minutes
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↕
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Node Layer</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    GPU nodes: 0→5 (standard) or 0→3 (large)
                    <br />
                    Timescale: 180+ seconds (spin + driver + model load)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↕
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">GPU Allocation Layer</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Full device (large models) vs 1/4 fractional (MIG/vGPU)
                    <br />
                    Decided at scheduling time
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
                  Pod layer scales replicas using queue depth, latency
                  percentiles, or GPU utilization with 3 minute smoothing
                  windows to prevent oscillation from batch workload spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Node layer adds GPU capacity with 180+ second cold start (node
                  provision plus driver init plus model load time measured in
                  gigabytes), requiring predictive warming for SLO compliance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU allocation layer chooses full device isolation for memory
                  intensive models versus fractional MIG slices for small
                  workloads to improve bin packing and utilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single metric autoscaling fails because 20% SM utilization can
                  coexist with high latency when bottlenecked on memory
                  bandwidth, PCIe transfers, or CPU preprocessing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Coordination across layers prevents placement deadlocks where
                  pods scale up but cannot schedule because cluster autoscaler
                  did not add matching GPU node types with correct taints
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
                  Production configuration: min 1 to max 4 replicas per model,
                  scaling when per pod GPU utilization exceeds 40% target
                  averaged over 3 minutes using NVIDIA Data Center GPU Manager
                  (DCGM) metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two GPU node groups: standard pool (max 5 nodes, on demand for
                  reliability) and large pool (max 3 nodes, spot capacity for
                  cost), both with scale to zero when idle
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Health check grace period of 180 seconds accommodates model
                  weight loading; termination grace of 600 seconds allows in
                  flight inference to drain before shutdown
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutoscalingGpuSharingGpuAutoscalingMultiLayerControlArchitecture;
