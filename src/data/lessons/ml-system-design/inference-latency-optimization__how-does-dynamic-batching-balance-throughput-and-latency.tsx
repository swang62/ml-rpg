import type { Component } from "solid-js";

const LessonInferenceLatencyOptimizationHowDoesDynamicBatchingBalanceThroughputAndLatency: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Does Dynamic Batching Balance Throughput and Latency?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Throughput Gain
            </p>
            <p style="margin-top: 0">
              Dynamic batching processes multiple inference requests together to
              amortize fixed overhead and improve hardware utilization. For GPUs
              and TPUs, running many operations in parallel dramatically
              increases arithmetic intensity, the ratio of computation to memory
              transfer. This pushes the workload from being memory bandwidth
              bound toward compute bound, where the accelerator's floating point
              units are fully utilized. For LLMs, batching can improve
              throughput from tens to hundreds of tokens per second on the same
              hardware.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Micro-batching Windows
            </p>
            <p style="margin-top: 0">
              Production systems use micro batching windows, typically 10 to 50
              milliseconds, to collect arriving requests before starting
              inference. This window size balances two competing forces: longer
              windows gather more requests and improve throughput, but they also
              add queuing delay that increases user perceived latency. The key
              metric is p95 or p99 latency rather than just average latency. A
              20 millisecond batching window might improve throughput by 3x
              while adding only 20 ms to p50 latency.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Continuous Batching
            </p>
            <p style="margin-top: 0">
              Continuous batching solves a critical problem with naive static
              batching: head of line blocking. In traditional batching, all
              requests in a batch must finish before the next batch starts. If
              one request generates 1,000 tokens while others need only 50, the
              short requests wait unnecessarily. Continuous batching interleaves
              decoding steps across dissimilar requests, scheduling a few tokens
              per request in round robin fashion. This avoids stragglers holding
              up the entire batch and dramatically improves tail latency for
              mixed workloads.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory Trade-offs
            </p>
            <p style="margin-top: 0">
              Batch size directly multiplies KV cache and activation memory
              requirements. A batch of 8 requests with 2,000 token contexts uses
              8x the KV memory of a single request. Larger batches also increase
              padding waste when sequence lengths vary widely: a batch with
              lengths [100, 100, 2000] pads the short sequences to 2,000,
              wasting 95% of compute on padding tokens. Production systems cap
              maximum batch size based on memory budget and use admission
              control to reject or queue requests during traffic bursts rather
              than triggering OOM errors.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 6px; font-size: 14px">
                  Static vs Continuous Batching
                </div>
                <div style="display: flex; gap: 16px">
                  <div style="flex: 1">
                    <div style="text-align: center; font-weight: bold; font-size: 12px; margin-bottom: 8px">
                      Static Batching
                    </div>
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 11px">
                      <div>
                        <strong>Batch 1:</strong>
                      </div>
                      <div>Req A: 50 tokens</div>
                      <div>Req B: 50 tokens</div>
                      <div>Req C: 1000 tokens ⚠️</div>
                      <div style="margin-top: 6px; font-weight: bold">
                        All wait for C to finish
                      </div>
                    </div>
                  </div>
                  <div style="flex: 1">
                    <div style="text-align: center; font-weight: bold; font-size: 12px; margin-bottom: 8px">
                      Continuous Batching
                    </div>
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 11px">
                      <div>
                        <strong>Interleaved:</strong>
                      </div>
                      <div>Step 1: A, B, C</div>
                      <div>Step 2: A, B, C</div>
                      <div>Step 50: C only</div>
                      <div style="margin-top: 6px; font-weight: bold">
                        A &amp; B finish early ✓
                      </div>
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Window:</strong> 10–50 ms micro batching typical
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
                  Batching improves tokens per second throughput by 3× to 10× by
                  increasing arithmetic intensity and utilizing Graphics
                  Processing Unit (GPU) parallel compute, amortizing fixed
                  overhead across requests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Micro batching windows of 10 to 50 milliseconds balance
                  throughput gains against queuing delay, targeting p95 latency
                  service level objectives (SLOs) rather than just average
                  latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous batching interleaves decoding across requests to
                  avoid head of line blocking, where one long sequence delays
                  shorter requests in traditional static batches
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory cost scales linearly with batch size: batch of 8 with
                  2k tokens uses 8× the KV cache and activation memory,
                  requiring careful capacity planning to avoid out of memory
                  (OOM) errors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Padding inefficiency occurs with heterogeneous sequence
                  lengths; a batch with lengths [100, 100, 2000] wastes 95% of
                  compute on padding for the short sequences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Admission control and backpressure are critical during traffic
                  bursts; systems must queue or reject requests rather than
                  accept batches that exceed memory budget and crash
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
                  Meta and Amazon deploy heterogeneous continuous batching to
                  serve mixed workloads of short queries (50 tokens) and long
                  document generation (2000+ tokens) on shared infrastructure
                  without tail latency degradation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 20 ms batching window can add only 20 ms to p50 latency
                  while improving throughput by 3×, keeping interactive chat
                  experiences responsive
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems cap batch size at 16 or 32 requests based
                  on available GPU memory, monitoring KV cache plus activations
                  to stay below 80% memory utilization and leave headroom for
                  bursty traffic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonInferenceLatencyOptimizationHowDoesDynamicBatchingBalanceThroughputAndLatency;
