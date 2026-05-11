import type { Component } from "solid-js";

const LessonAutoscalingGpuSharingGpuMetricsBeyondUtilizationForAccurateAutoscaling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            GPU Metrics: Beyond Utilization for Accurate Autoscaling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why GPU Utilization Misleads
            </p>
            <p style="margin-top: 0">
              GPU utilization is the most misleading metric in autoscaling
              decisions. A GPU can report 90% SM utilization while delivering
              excellent throughput for batch workloads, or show 20% utilization
              while request latency violates SLOs because the bottleneck is
              elsewhere. Effective autoscaling requires combining multiple
              correlated signals to understand the true performance constraint.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Key GPU Hardware Metrics
            </p>
            <p style="margin-top: 0">
              SM occupancy shows what percentage of Streaming Multiprocessors
              are active. GPU memory usage shows gigabytes consumed out of total
              device memory. Memory bandwidth utilization shows percentage of
              theoretical peak bandwidth being used. A memory bound workload
              like LLM inference will show low SM utilization but high memory
              bandwidth and high latency. An I/O bound workload shows low
              utilization on both while PCIe or network transfers dominate.
              Production systems export these via NVIDIA DCGM to a time series
              store.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Application Level Signals
            </p>
            <p style="margin-top: 0">
              Queue depth shows how many requests are waiting for GPU
              processing. Request concurrency measures in flight operations per
              replica. Latency percentiles (p95, p99) directly capture user
              experience. For LLMs, tokens per second and time to first token
              are better throughput indicators than raw GPU utilization because
              they account for batching efficiency and memory access patterns.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Smoothed Windows and Hysteresis
            </p>
            <p style="margin-top: 0">
              The robust approach uses 3 minute rolling averages to prevent
              scaling decisions based on momentary spikes when a large batch
              arrives or completes. Combine this with hysteresis: scale up
              quickly when metrics exceed thresholds (like 70% utilization
              sustained for 2 minutes) but scale down conservatively (like
              dropping below 30% for 5 minutes). This asymmetry prevents
              oscillation while staying responsive to genuine load increases.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">GPU Hardware Metrics</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    • SM occupancy: 20%
                    <br />• Memory bandwidth: 85%
                    <br />• Memory usage: 14GB/16GB
                    <br />→ Memory bound workload
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Application Metrics</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    • Queue depth: 45 requests
                    <br />• p95 latency: 320ms
                    <br />• Tokens/sec: 180
                    <br />→ Need to scale up
                  </div>
                </div>
                <div style="grid-column: 1 / 3; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Smoothing: 3 min rolling average
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Scale up at 70% sustained 2min | Scale down at 30% sustained
                    5min
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
                  SM utilization alone misleads: 90% can mean healthy batch
                  throughput or 20% can coexist with terrible latency when
                  memory bandwidth (85% utilized) is the actual bottleneck
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory bound LLM inference shows low SM occupancy but high
                  memory bandwidth usage and high latency, requiring multi
                  metric correlation to identify the constraint
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Application signals like queue depth (45 requests waiting),
                  p95 latency (320ms), and tokens per second (180) directly
                  capture user experience better than hardware utilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Smoothing with 3 minute rolling averages prevents oscillation
                  from batch workload spikes that cause momentary 100%
                  utilization followed by immediate drops to 10%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Asymmetric hysteresis scales up quickly (exceeding 70% for 2
                  minutes) but scales down conservatively (below 30% for 5
                  minutes) to avoid thrashing
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
                  NVIDIA DCGM exports per GPU metrics (SM occupancy, memory
                  usage, memory bandwidth, power draw, temperature) to
                  Prometheus, then custom metrics adapter exposes per pod
                  aggregates for Horizontal Pod Autoscaler (HPA)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LLM serving tracks tokens per second per replica: scaling
                  target is 200 tokens/sec with 8 bit quantization and dynamic
                  batching windows of 50ms to balance throughput and latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Observed failure: autoscaler using only GPU utilization scaled
                  down during memory bound phase showing 25% SM utilization,
                  causing p99 latency to spike from 200ms to 1200ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutoscalingGpuSharingGpuMetricsBeyondUtilizationForAccurateAutoscaling;
