import type { Component } from "solid-js";

const LessonPipelineArchitecturePatternsAdvancedPipelinePatternsAndObservability: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Advanced Pipeline Patterns and Observability
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Fan Out and Fan In Patterns:</strong>
            Beyond linear pipelines, production systems use fan out and fan in
            topologies. Fan out means one stage writes to multiple downstream
            stages. For example, a normalization stage outputs to both a real
            time analytics pipeline and a batch data lake pipeline. Each
            consumer reads at its own pace without blocking the other. Fan in
            means multiple upstream stages feed one downstream stage. A machine
            learning feature pipeline might consume from event streams, database
            change logs, and external API feeds, joining them into unified
            feature vectors. The challenge is synchronization: how do you ensure
            all inputs for a given entity (like user_id 12345) arrive before
            processing? Typically, use keyed state: buffer inputs by key until
            you have received from all sources or a timeout expires.
            <strong>Lambda and Kappa Architectures:</strong>
            Two advanced patterns address the batch versus streaming dilemma.
            Lambda architecture runs both batch and streaming pipelines in
            parallel. The batch layer reprocesses all historical data daily or
            weekly, producing accurate results. The streaming layer processes
            recent data with lower latency but potential approximations. A
            serving layer merges both: queries hit the batch view for old data
            and the streaming view for recent data. The trade off: you maintain
            two codebases doing similar logic. Kappa architecture simplifies
            this: use only streaming, but make the stream replayable. To
            reprocess historical data, reset the stream consumer to an old
            offset and replay. This requires your streaming logic to handle both
            real time and batch speeds, which is harder to implement but reduces
            duplication.
            <div style="margin: 12px 0; border: 2px solid; border-radius: 6px; overflow: hidden">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-weight: 700; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Aspect
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Lambda
                </div>
                <div style="padding: 8px 12px">Kappa</div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Codebases
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  Two (batch + stream)
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  One (stream only)
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid; font-weight: 600">
                  Reprocessing
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid; border-bottom: 1px solid">
                  Run batch layer
                </div>
                <div style="padding: 8px 12px; border-bottom: 1px solid">
                  Replay stream
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; font-size: 12px">
                <div style="padding: 8px 12px; border-right: 1px solid; font-weight: 600">
                  Complexity
                </div>
                <div style="padding: 8px 12px; border-right: 1px solid">
                  Higher
                </div>
                <div style="padding: 8px 12px">Lower</div>
              </div>
            </div>
            <strong>End to End Observability:</strong>
            Production pipelines require comprehensive observability. Instrument
            each stage to emit metrics: throughput (messages per second),
            latency (p50, p90, p99), error rate, and queue depth. Use a time
            series database to store and visualize these metrics. Set alerts: if
            p99 latency exceeds SLO for 5 minutes, page on call. If error rate
            exceeds 1 percent, page immediately. Distributed tracing is critical
            for debugging. Assign each event a unique trace_id. As the event
            flows through stages, each stage logs with that trace_id. When
            investigating a slow request, query traces to see: Stage 1 took
            20ms, Stage 2 took 150ms, Stage 3 took 600ms. Stage 3 is the
            bottleneck. Implement data quality monitoring. Track schema changes:
            if Stage 2 suddenly starts outputting null values for a required
            field, alert. Track data volume: if Stage 3 outputs 50 percent fewer
            records than yesterday, alert. This catches silent failures where
            the pipeline runs but produces garbage.
            <strong>Testing and Validation:</strong>
            Unit test each stage independently with mock inputs. Integration
            test multi stage segments by running on a test cluster with sampled
            production data. For critical pipelines, implement shadow mode: run
            new logic alongside old logic, compare outputs, and alert on
            differences exceeding a threshold before switching traffic. Data
            validation is as important as code tests. Check invariants: row
            counts should not drop by more than 10 percent between stages unless
            filtering is expected. Check distributions: if average order value
            suddenly doubles, halt the pipeline and investigate. Automated
            validation catches bugs that unit tests miss, especially around
            schema evolution and edge cases in production data.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Netflix uses distributed tracing
              to debug video playback pipelines, correlating playback start
              events through logging, metric computation, and recommendation
              updates. LinkedIn monitors data quality across feature pipelines,
              alerting when feature distributions shift beyond expected ranges.
            </div>
            <strong>Schema Evolution:</strong>
            As pipelines evolve, schemas change. New fields are added, old
            fields are deprecated. Without careful management, this breaks
            consumers. Use schema registries: centralize schema definitions and
            enforce compatibility rules. Forward compatibility allows old code
            to read new data by ignoring unknown fields. Backward compatibility
            allows new code to read old data by providing defaults for missing
            fields. Enforce these rules at schema registration time, failing
            incompatible changes.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="margin-bottom: 12px; font-weight: 700; font-size: 13px">
                Fan Out Pattern:
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; min-width: 140px">
                  <strong>Normalization Stage</strong>
                </div>
                <div style="display: flex; gap: 16px; align-items: center">
                  <div style="font-size: 20px; font-weight: bold">↙</div>
                  <div style="font-size: 20px; font-weight: bold">↘</div>
                </div>
                <div style="display: flex; gap: 16px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Real-time Pipeline</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      &lt; 2s latency
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Batch Pipeline</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Daily jobs
                    </div>
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
                  Fan out patterns send one stage output to multiple consumers;
                  fan in patterns join multiple sources using keyed state and
                  timeouts for synchronization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lambda architecture runs parallel batch and streaming
                  pipelines for accuracy and speed; Kappa uses only streaming
                  with replay, reducing code duplication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distributed tracing with unique trace_id per event enables
                  debugging: identify which stage (Stage 3: 600ms) caused p99
                  latency spike
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema registries enforce forward and backward compatibility,
                  allowing safe evolution without breaking downstream consumers
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
                  A normalization stage fans out to both a real time fraud
                  detection pipeline (p99 under 1s) and a batch analytics
                  pipeline (daily 30 TB job). Each consumes at its own pace.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A feature pipeline fans in from event streams, database
                  changelogs, and external APIs, buffering by user_id until all
                  sources arrive or 10 second timeout expires before computing
                  features.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineArchitecturePatternsAdvancedPipelinePatternsAndObservability;
