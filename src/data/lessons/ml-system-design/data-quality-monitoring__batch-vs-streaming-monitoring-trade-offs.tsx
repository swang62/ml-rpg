import type { Component } from "solid-js";

const LessonDataQualityMonitoringBatchVsStreamingMonitoringTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Batch vs Streaming Monitoring Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BATCH MONITORING
            </p>
            <p>
              Run quality checks on complete datasets at scheduled intervals
              (hourly, daily). Process entire batch, compute statistics, compare
              against expectations, alert on violations.
            </p>
            <p>
              <strong>Advantages:</strong> Simple to implement, efficient
              computation over large datasets, full context for statistical
              tests (complete samples).
            </p>
            <p>
              <strong>Disadvantages:</strong> Detection latency equals batch
              interval. If you run daily checks, a problem at 8am is not
              detected until the next day. During that time, the model serves
              bad predictions.
            </p>
            <p>
              Best for: ETL pipelines, training data validation, low-velocity
              data sources.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STREAMING MONITORING
            </p>
            <p>
              Check quality in real-time as data flows through. Use stream
              processing (Kafka Streams, Flink) to compute rolling statistics
              and detect violations within seconds or minutes.
            </p>
            <p>
              <strong>Advantages:</strong> Fast detection (sub-minute), catches
              issues before they propagate, enables immediate circuit-breakers.
            </p>
            <p>
              <strong>Disadvantages:</strong> More complex infrastructure,
              harder to compute certain statistics (percentiles require
              approximations), higher operational cost.
            </p>
            <p>
              Best for: real-time inference pipelines, high-stakes predictions
              (fraud, pricing), when fast detection is critical.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HYBRID APPROACHES
            </p>
            <p>
              Combine batch and streaming. Use streaming for critical checks
              (schema validation, obvious violations) and batch for
              comprehensive analysis (distribution comparisons, complex
              statistics).
            </p>
            <p>
              Typical pattern: streaming monitors for nulls, type violations,
              and obvious range errors. Batch monitors for distribution drift,
              cardinality changes, and correlation shifts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING YOUR APPROACH
            </p>
            <p>
              Consider: data velocity (how fast does data arrive?), impact of
              latency (how bad is delayed detection?), infrastructure maturity
              (can you operate streaming?), and cost constraints.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> Start with batch for simplicity. Add
              streaming when detection latency becomes a measurable business
              problem. Hybrid is the mature end-state for critical systems.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Streaming
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    ⚡ Alert: 1 to 5 min
                    <br />📊 Metrics: Approximate
                    <br />💰 Cost: Higher per row
                    <br />🎯 Use: Sentinels
                    <br />
                    <br />
                    Schema validation
                    <br />
                    Freshness lag p95
                    <br />
                    Top 10 feature PSI
                    <br />
                    Volume anomalies
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Batch
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    🕐 Alert: 2 to 6 hours
                    <br />📊 Metrics: Exact
                    <br />💰 Cost: Lower per row
                    <br />🎯 Use: Deep checks
                    <br />
                    <br />
                    All 150 features profiled
                    <br />8 foreign key checks
                    <br />
                    Training serving parity
                    <br />
                    Compliance reports
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
                  Batch: simple, efficient for large datasets, detection latency
                  = batch interval; good for ETL and training data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming: sub-minute detection, higher complexity and cost;
                  good for real-time inference and high-stakes predictions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid: streaming for critical checks (schema, obvious
                  violations), batch for comprehensive analysis (distributions)
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
                  Interview Tip: Compare batch vs streaming tradeoffs:
                  simplicity vs latency vs cost.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe a hybrid architecture—what checks run
                  in each layer and why.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityMonitoringBatchVsStreamingMonitoringTradeOffs;
