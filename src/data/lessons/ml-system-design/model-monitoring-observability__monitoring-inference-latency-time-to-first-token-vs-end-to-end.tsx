import type { Component } from "solid-js";

const LessonModelMonitoringObservabilityMonitoringInferenceLatencyTimeToFirstTokenVsEndToEnd: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Monitoring Inference Latency: Time to First Token vs End to End
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
                Latency in ML serving is not a single number but a decomposition
                across pipeline stages. For LLMs, the critical split is between{" "}
                <strong>Time to First Token (TTFT)</strong> (when the user sees
                the first response token, targeting under 300 to 500ms) and{" "}
                <strong>total end to end latency</strong> (the full generation
                cycle, often 2 to 3 seconds at p95).
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stage Budget Decomposition
            </p>
            <p style="margin-top: 0">
              Production systems decompose latency into explicit stage budgets.
              A typical RAG pipeline might allocate: 2 to 10ms for query
              vectorization, 10 to 50ms at p95 for ANN retrieval, 50 to 150ms
              for reranking with a cross encoder on top k equals 50 documents, 5
              to 30ms for context assembly, and 20 to 60 tokens per second
              during LLM decode (resulting in 2 to 7 seconds for a 150 token
              answer without streaming). Microsoft reported a 105x speedup in
              one case by optimizing across the full pipeline.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Alerting on Tail Percentiles
            </p>
            <p style="margin-top: 0">
              Tail percentiles matter more than averages. A practical alerting
              pattern is monitoring p95 inference latency every 15 seconds,
              triggering an alert if it exceeds 2 seconds over a 5 minute
              rolling window and remains elevated for 2 minutes to avoid
              flapping. Feed ranking and ad serving systems enforce even tighter
              SLOs, commonly requiring sub 100 to 200ms p95 end to end, with
              individual model calls budgeted to tens of milliseconds.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tail Amplification Failure
            </p>
            <p style="margin-top: 0">
              One slow retrieval hop that hits p99 can blow the entire request
              budget. Cold starts or GPU memory thrash cause spikes that
              propagate downstream. Use distributed tracing to attribute latency
              to stages, tag traces with model version and context length, and
              set per hop budgets with admission control to shed load when
              queues exceed 50 to 100ms.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Query Vectorization</strong>
                  <div style="margin-top: 4px; font-size: 12px">2–10 ms</div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">ANN Retrieval</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    10–50 ms p95
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Reranking (top k=50)</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    50–150 ms p95
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Context Assembly</strong>
                  <div style="margin-top: 4px; font-size: 12px">5–30 ms</div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">LLM Decode</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    20–60 tokens/sec
                    <br />
                    TTFB &lt;300 ms
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
                  Time to First Token (TTFB) targets under 300 to 500
                  milliseconds for interactive systems, while total p95 latency
                  aims for 2 to 3 seconds for short answers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming reduces perceived latency by hundreds of
                  milliseconds even when total generation remains 5 to 10
                  seconds, significantly improving user engagement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stage level budgets are critical: query vectorization 2 to 10
                  milliseconds, ANN retrieval 10 to 50 milliseconds p95,
                  reranking 50 to 150 milliseconds p95, LLM decode at 20 to 60
                  tokens per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alert when p95 inference latency exceeds 2 seconds over a 5
                  minute rolling window for 2 minutes to avoid flapping, use 15
                  second collection intervals
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tail amplification is the primary failure mode: one slow hop
                  at p99 blows the entire request budget, requiring per hop
                  admission control and load shedding at 50 to 100 milliseconds
                  queue depth
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
                  Microsoft production case: 105× speedup from 315 seconds to 3
                  seconds via pipeline optimization across all stages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix and Uber feed ranking services enforce sub 100 to 200
                  milliseconds p95 end to end, with model calls budgeted to tens
                  of milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RAG system with semantic caching: 17× speedup when prompts
                  repeat semantically, reducing retrieval and generation costs
                  dramatically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distributed tracing pattern: tag every trace with model
                  version, prompt template hash, context length, and user cohort
                  to attribute latency spikes to specific stages and
                  configurations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelMonitoringObservabilityMonitoringInferenceLatencyTimeToFirstTokenVsEndToEnd;
