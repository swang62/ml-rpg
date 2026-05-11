import type { Component } from "solid-js";

const LessonModelMonitoringObservabilityBatchingTradeOffsThroughputVsTailLatency: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Batching Trade offs: Throughput vs Tail Latency
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Throughput vs Latency Trade-off
            </p>
            <p style="margin-top: 0">
              Batching inference requests is a fundamental trade off between
              throughput and tail latency. Moving from single request serving to
              batch equals 4 on one GPU often raises tokens per second by 2 to
              4x, directly reducing cost per 1000 tokens and increasing hardware
              utilization. However, queueing delay increases p95 latency by 50
              to 150ms when not carefully tuned, as requests wait for a batch to
              fill before processing begins. At high utilization, queueing delay
              exceeds service time, causing tail spikes that violate SLOs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Batching with Max Wait
            </p>
            <p style="margin-top: 0">
              Systems enforce a maximum wait of 10 to 20ms before flushing a
              partial batch, ensuring p95 latency stays within budget even at
              low query rates. When traffic is high, batches fill quickly and
              throughput stays high. When traffic is sparse, requests proceed
              immediately after max wait expires, preventing tail violations.
              This pattern is critical for interactive systems targeting sub
              200ms end to end latency, where even 50ms of queueing delay
              consumes a significant portion of the budget.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Quality Dimension
            </p>
            <p style="margin-top: 0">
              Larger batches with lower precision formats (FP16 or INT8
              quantization) can yield 2 to 4x throughput improvement with
              negligible quality loss for many ranking and recommendation tasks.
              Netflix and Uber use quantized models in production for feed
              ranking, achieving sub 100ms p95 latency while serving 10000 QPS
              per node. However, nuanced reasoning tasks may degrade with
              quantization, requiring A/B tests to validate quality before
              rollout.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Traffic Storm Failures
            </p>
            <p style="margin-top: 0">
              When batches take too long due to long context or low token
              throughput (under 10 tokens per second from throttling), slow
              clients retry, amplifying load. Admission control and load
              shedding when queues exceed 50 to 100ms prevent cascading
              failures. Monitor both requests per second and tokens per second
              per device, as token throughput varies nonlinearly with context
              length.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; justify-content: space-between; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Batch = 1</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Throughput: 20 tok/s
                    <br />
                    p95 latency: 50 ms
                    <br />
                    Queue delay: 0 ms
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Batch = 4</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Throughput: 60 tok/s
                    <br />
                    p95 latency: 120 ms
                    <br />
                    Queue delay: 70 ms
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Dynamic Batching</strong>
                <div style="margin-top: 4px; font-size: 12px">
                  Max wait: 10–20 ms
                  <br />
                  Flush partial batch if timer expires
                  <br />
                  Balances throughput + tail latency
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
                  Batching from single request to batch equals 4 increases
                  tokens per second by 2 to 4×, reducing cost per 1000 tokens
                  but raising p95 latency by 50 to 150 milliseconds due to
                  queueing delay
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic batching with max wait of 10 to 20 milliseconds
                  flushes partial batches to prevent tail violations, critical
                  for systems targeting sub 200 millisecond end to end latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantization (FP16 or INT8) combined with batching yields 2 to
                  4× throughput improvement with negligible quality loss for
                  ranking tasks, but may degrade nuanced reasoning requiring A/B
                  validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At high utilization, queueing delay exceeds service time
                  causing tail spikes; admission control and load shedding at 50
                  to 100 milliseconds queue depth prevent cascading failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor both requests per second and tokens per second per
                  device, as token throughput varies nonlinearly with context
                  length and sampling settings, impacting actual serving
                  capacity
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
                  Netflix feed ranking: quantized INT8 models with batch equals
                  8 serve 10000 QPS per node at sub 100 millisecond p95,
                  reducing infrastructure cost by 60 percent versus FP32 single
                  request
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber ETA prediction: dynamic batching with 15 millisecond max
                  wait maintains 80 millisecond p95 latency while achieving 3×
                  throughput versus no batching, critical for sub 200
                  millisecond SLO
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta ad ranking: switching from batch equals 1 to batch equals
                  16 with FP16 increased throughput 5×, but initial deployment
                  without max wait caused p99 spikes to 400 milliseconds, fixed
                  by enforcing 20 millisecond flush
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb search ranking: long context inputs (2000 tokens)
                  reduced token throughput from 50 to 12 tokens per second,
                  causing slow retries and traffic storms until admission
                  control capped queue depth at 100 milliseconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelMonitoringObservabilityBatchingTradeOffsThroughputVsTailLatency;
