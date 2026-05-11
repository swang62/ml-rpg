import type { Component } from "solid-js";

const LessonServingInfrastructureDynamicBatchingThroughputVsLatencyTradeoffsInRequestScheduling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dynamic Batching: Throughput vs Latency Tradeoffs in Request
            Scheduling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Batching Philosophy
            </p>
            <p style="margin-top: 0">
              Dynamic batching aggregates individual inference requests into
              larger batches before execution, dramatically improving device
              utilization and throughput at the cost of queueing delay. Instead
              of processing one request at a time with the GPU sitting idle
              between arrivals, the scheduler waits for a configurable window
              (typically 1 to 50 milliseconds) to collect multiple requests,
              then executes them together. A GPU running ResNet50 might process
              a single image in 5 milliseconds but can process a batch of 32
              images in only 20 milliseconds, achieving 8x better throughput per
              GPU hour. This efficiency directly translates to cost savings:
              serving the same QPS with batching can reduce required GPU
              instances by 50% to 70%.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Batching Breaks Down
            </p>
            <p style="margin-top: 0">
              The tradeoff becomes critical under real world traffic patterns.
              For steady, high volume streams like video recommendation ranking
              at YouTube or feed ranking at Meta, batching works beautifully:
              requests arrive fast enough to form full batches within
              millisecond windows, and the added queueing delay is negligible
              compared to total processing time. However, for bursty or low QPS
              services, dynamic batching can destroy tail latency. If your SLO
              requires p95 latency under 100 milliseconds but your batch window
              is 20 milliseconds, you have already consumed 20% of your budget
              just waiting in queue before any computation starts.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Counterintuitive Failure Mode
            </p>
            <p style="margin-top: 0">
              Under spiky traffic, you will see low GPU utilization yet high p95
              and p99 latencies simultaneously. This happens because requests
              arrive slowly, sit waiting for batch formation, and burn latency
              budget before computation even starts.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Tuning
            </p>
            <p style="margin-top: 0">
              Production systems tune three knobs: maximum batch size
              (constrained by GPU memory), batch formation timeout (the window
              to wait), and per model concurrency (parallel instances).
              TensorFlow Serving typically uses 4 to 16 millisecond windows for
              strict latency services, while Triton configurations for
              throughput optimized workloads can use 50 millisecond windows with
              batch sizes of 64 to 128. The key insight is to separate queueing
              time from compute time in your metrics: if queue time dominates,
              reduce the window or increase concurrency rather than adding more
              GPUs.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Request Timeline Comparison
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    No Batching (Sequential)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Request 1: 5ms compute
                  </div>
                  <div style="font-size: 11px">Request 2: 5ms compute</div>
                  <div style="font-size: 11px">Request 3: 5ms compute</div>
                  <div style="font-size: 11px; margin-top: 4px; font-weight: bold">
                    Total: 15ms for 3 requests
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  vs
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Dynamic Batching</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Queue wait: 10ms window
                  </div>
                  <div style="font-size: 11px">Batch of 3: 7ms compute</div>
                  <div style="font-size: 11px; margin-top: 4px; font-weight: bold">
                    Total: 17ms per request
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    But 3x GPU throughput
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
                  Batching can improve throughput by 3x to 8x: single ResNet50
                  image in 5 milliseconds versus batch of 32 images in 20
                  milliseconds, reducing cost per inference by 50% to 70%
                  through better GPU utilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch formation window introduces queueing delay before any
                  computation: a 20 millisecond window consumes 20% of a 100
                  millisecond p95 latency budget, making it unsuitable for
                  strict SLOs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Failure mode under low or bursty QPS: simultaneously observing
                  low GPU utilization (requests do not arrive fast enough to
                  form batches) and high p95 or p99 latency (requests wait in
                  queue)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production window configurations: TensorFlow Serving uses 4 to
                  16 millisecond windows for latency sensitive services, Triton
                  uses 50 millisecond windows for throughput optimized batch
                  workloads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate queueing time from compute time in metrics to
                  diagnose bottlenecks: if queue time dominates, reduce window
                  or add per model concurrency rather than scaling horizontally
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Maximum batch size is constrained by GPU memory: batch size
                  multiplied by activation footprint must fit in device memory,
                  typically limiting to 16 to 128 depending on model size
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
                  YouTube recommendation ranking uses aggressive batching with
                  50 millisecond windows during steady traffic, forming batches
                  of 128 requests and achieving 85% GPU utilization while
                  keeping p95 latency under 200 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber real time Estimated Time of Arrival (ETA) prediction
                  disabled dynamic batching entirely (max batch size 1) to
                  guarantee sub 50 millisecond p99 latency for rider app,
                  accepting 3x higher GPU cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Medical imaging inference service tuned Triton to 10
                  millisecond window with max batch size 4 due to 16 GB GPU
                  memory constraint from 256×256×24 voxel volumes, achieving 60%
                  utilization on steady clinical workflow traffic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonServingInfrastructureDynamicBatchingThroughputVsLatencyTradeoffsInRequestScheduling;
