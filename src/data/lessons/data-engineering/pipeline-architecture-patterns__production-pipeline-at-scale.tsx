import type { Component } from "solid-js";

const LessonPipelineArchitecturePatternsProductionPipelineAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Pipeline at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Real World Scale:</strong>
            At companies processing massive data volumes, pipelines handle tens
            of terabytes daily with strict Service Level Objectives (SLOs).
            Consider a typical large scale deployment. The ingestion layer
            receives 500k to 2M events per second globally during peak hours.
            That is roughly 40 to 170 billion events per day. At 1 kilobyte per
            event average, you are ingesting 40 to 170 terabytes daily into your
            system.
            <strong>The Multi Pipeline Ecosystem:</strong>
            Large companies do not run one pipeline. They run an ecosystem of
            interconnected pipelines, each with different latency and throughput
            requirements. First, the real time pipeline handles user facing
            features like fraud detection, recommendations, and live dashboards.
            End to end latency from event creation to feature availability must
            stay under 1 to 2 seconds for p99. This means each stage in the
            chain has a latency budget. With 5 stages, you might allocate 200ms
            p99 per stage, leaving 1 second total budget with headroom. Second,
            the batch analytics pipeline processes the same events for reporting
            and training data. This pipeline does not optimize for latency.
            Instead, it optimizes for throughput and cost. A nightly job might
            process 30 terabytes of data, performing complex joins and
            aggregations. The SLA is to complete within a 2 hour window before
            business hours. To hit this target, you might use 500 to 1000
            compute nodes in parallel, processing 10 to 20 gigabytes per node.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Pipeline Performance Metrics
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2M</div>
                  <div style="font-size: 10px; font-weight: 600">
                    EVENTS/SEC PEAK
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">30 TB</div>
                  <div style="font-size: 10px; font-weight: 600">
                    DAILY BATCH
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt; 2s</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 E2E LATENCY
                  </div>
                </div>
              </div>
            </div>
            Third, feature pipelines consume cleaned and aggregated data to
            build machine learning features. These run incrementally, targeting
            p50 latency of a few minutes for feature updates. When a user
            profile changes, the feature pipeline recomputes affected features
            and updates the feature store within 2 to 5 minutes.
            <strong>Operational Complexity:</strong>
            Running pipelines at this scale introduces challenges. Queue sizing
            becomes critical. If Stage 2 can process 100k messages per second
            but occasionally drops to 50k during deployments or transient
            failures, the queue between Stage 1 and Stage 2 needs enough
            capacity to buffer the difference. A queue that holds 10 minutes of
            data at peak rate (2M events/sec times 600 seconds equals 1.2
            billion messages) provides reasonable cushion, but costs money in
            storage and adds operational overhead. Monitoring is non negotiable.
            You must track per stage metrics: throughput, p50 and p99 latency,
            error rate, and queue depth. Set alerts when queue depth grows
            beyond thresholds or when p99 latency exceeds SLOs. Distributed
            tracing across stages allows you to follow a single event end to
            end, identifying which stage introduced delay.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Airbnb runs pipelines processing
              millions of booking and search events per day through stages for
              validation, enrichment, and feature generation. Uber processes
              ride events through fraud detection pipelines with sub second
              latency requirements. LinkedIn transforms profile and engagement
              data through batch pipelines generating curated datasets for
              analytics and ML training.
            </div>
            <strong>Cost vs Latency Trade Off:</strong>
            Real time pipelines cost significantly more than batch. Streaming
            infrastructure runs 24/7, even during low traffic hours. You pay for
            always on compute, memory, and network. Batch pipelines run only
            when scheduled, often on spot or preemptible instances at 60 to 80
            percent discount. For use cases that can tolerate hours of latency,
            batch is far cheaper. Daily aggregates for executive dashboards do
            not need real time processing. But for user facing features, the
            business cost of stale data (lost conversions, poor recommendations)
            exceeds infrastructure cost.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems process 500k to 2M events per second at
                  peak, totaling 40 to 170 terabytes daily across multiple
                  pipeline types
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real time pipelines target p99 end to end latency under 2
                  seconds with per stage budgets around 200ms; batch pipelines
                  optimize for throughput over latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Queue sizing matters: buffering 10 minutes at peak (1.2
                  billion messages at 2M/sec rate) prevents backpressure during
                  transient slowdowns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real time streaming infrastructure costs 3 to 5 times more
                  than batch due to 24/7 operation, but business value of low
                  latency justifies cost for user facing features
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
                  A batch analytics pipeline processes 30 TB of event data
                  nightly using 500 to 1000 nodes, each handling 10 to 20 GB.
                  The SLA is 2 hours to completion before business hours.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A fraud detection pipeline must process ride requests with p99
                  under 1 second end to end. With 5 stages, each has 200ms p99
                  budget. Stage 3 (pattern matching) scales to 80 workers during
                  peak to stay within budget.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineArchitecturePatternsProductionPipelineAtScale;
