import type { Component } from "solid-js";

const LessonNlpScalabilityScalingFailuresMemoryFragmentationStragglersAndGracefulDegradation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Scaling Failures: Memory Fragmentation, Stragglers, and Graceful
            Degradation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory Fragmentation
            </p>
            <p style="margin-top: 0">
              GPU memory fragments over time as different sized tensors are
              allocated and freed. After hours of serving variable-length
              requests, you might have 8GB free memory but cannot allocate a
              contiguous 4GB tensor because free memory is scattered in small
              chunks. The symptom: out of memory errors despite memory
              monitoring showing available capacity.
            </p>
            <p>
              The fix requires periodic restarts or memory defragmentation. Some
              serving frameworks implement memory pools that pre-allocate
              fixed-size chunks, avoiding fragmentation at the cost of some
              wasted space. For long-running services, schedule restarts during
              low-traffic periods before fragmentation causes problems.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stragglers and Tail Latency
            </p>
            <p style="margin-top: 0">
              In distributed inference, the slowest component determines overall
              latency. If you use 4-GPU tensor parallelism and one GPU runs 50%
              slower due to thermal throttling, every request is 50% slower. At
              scale, stragglers become statistically common. With 100 replicas,
              at any moment several are likely experiencing degraded
              performance.
            </p>
            <p>
              Mitigation strategies include hedged requests (send the same
              request to multiple replicas, take the first response), aggressive
              health checks that remove slow replicas from the pool, and keeping
              replicas on homogeneous hardware to minimize variance.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Common Failure:</strong> Mixing GPU generations in the
              same serving pool causes systematic stragglers. An A100 and V100
              have 2-3x performance difference. The slow V100 becomes a
              bottleneck, degrading the entire pool's P99 latency.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Graceful Degradation
            </p>
            <p style="margin-top: 0">
              When load exceeds capacity, systems must degrade gracefully rather
              than collapse. Options include request shedding (reject requests
              above capacity with clear error rather than timing out), quality
              reduction (switch to smaller model or skip optional processing),
              and priority queuing (serve premium users first, delay others).
              Design these mechanisms before you need them - implementing
              graceful degradation during an outage is too late.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 14px">
                  Decision Tree: Choosing Parallelism Strategy
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Does model fit on 1 GPU?
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    YES → <strong>Data Parallelism</strong>
                    <br />
                    7B model, 14GB params, fits on 80GB A100
                    <br />
                    Scale to 8 GPUs, 11% comm overhead
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center; font-weight: bold">
                  ↓ NO
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Does single layer fit on 1 GPU?
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    YES → <strong>Pipeline Parallelism</strong>
                    <br />
                    70B model, layers fit individually
                    <br />8 stages, 32 micro batches, 82% efficiency
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center; font-weight: bold">
                  ↓ NO
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Do you have fast intra node links?
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    YES → <strong>Tensor Parallelism</strong>
                    <br />
                    Split layer across 8 GPUs with NVLink
                    <br />
                    600 GB/s bandwidth, sub millisecond latency
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">3D Parallelism</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Tensor 8 × Pipeline 8 × Data 4 = 256 GPUs
                    <br />
                    Map to topology: TP within node, PP across nodes
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
                  GPU memory fragments over time - 8GB free but scattered cannot
                  allocate 4GB contiguous tensor. Schedule periodic restarts.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stragglers determine distributed inference latency - one slow
                  GPU in 4-way tensor parallelism slows all requests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixed GPU generations (A100 + V100) cause systematic
                  stragglers due to 2-3x performance gap between generations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Design graceful degradation before needed: request shedding,
                  quality reduction (smaller model), priority queuing
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
                  Explain memory fragmentation: OOM errors despite available
                  memory because free space is scattered. Periodic restarts are
                  the fix.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For tail latency, describe hedged requests: send to multiple
                  replicas, take the first response. Trades compute for latency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Proactively mention graceful degradation options: reject with
                  clear error beats silent timeout.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNlpScalabilityScalingFailuresMemoryFragmentationStragglersAndGracefulDegradation;
