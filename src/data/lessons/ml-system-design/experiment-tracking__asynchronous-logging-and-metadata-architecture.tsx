import type { Component } from "solid-js";

const LessonExperimentTrackingAsynchronousLoggingAndMetadataArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Asynchronous Logging and Metadata Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Asynchronous Logging Matters
            </p>
            <p style="margin-top: 0">
              Synchronous metric logging inside tight training loops can cause 5
              to 10 percent slowdown or out of memory errors in the logger. If
              you log 100 metrics every training step and each log call blocks
              for 10 milliseconds waiting for network or disk, that adds 1
              second per step overhead. A training job with 10,000 steps that
              should take 3 hours instead takes 6 hours. The solution is
              asynchronous buffered logging: collect metrics in memory with
              bounded queues, batch them, and flush on timers like every 1 to 5
              seconds or per epoch, not per step. This keeps training overhead
              under 1 percent.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Event Log Architecture
            </p>
            <p style="margin-top: 0">
              Production metadata architectures model experiments as an event
              log. Store run lifecycle events like started, parameters logged,
              metrics recorded, artifacts produced, and completed in an append
              only log. Build materialized views for search and comparison
              queries. This scales better for bursts during hyperparameter
              optimization and preserves a complete audit trail. Meta FBLearner
              Flow uses a centralized metadata service handling tens of
              thousands of run events per day.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Handling Logging Backpressure
            </p>
            <p style="margin-top: 0">
              Logging backpressure happens when hyperparameter optimization
              sweeps generate thousands of short lived runs that hammer the
              metadata database. Even a modest sweep of 1,000 runs in an hour
              means 3 to 5 events per run equals 3,000 to 5,000 events per hour
              or roughly 1 event per second sustained. The fix is a write
              optimized append only event log, eventual materialized views, and
              partitioning by time or project. Apply backpressure policies like
              dropping debug level logs or downsampling metrics when network or
              storage is slow.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Planning
            </p>
            <p style="margin-top: 0">
              Capacity planning for a typical mid size organization with 5 teams
              running 500 runs per day means 10 to 50 events per run yields
              5,000 to 25,000 events daily, which is trivial for a write
              optimized store. However, burst handling during hyperparameter
              optimization may require 10x headroom. Provision metadata storage
              for 10x expected write bursts and aim for p99 metadata write
              latency under 50 milliseconds with artifact upload throughput in
              the hundreds of MB per second aggregate.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Training Loop</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Logs to memory buffer
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Bounded Queue</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Batch every 1-5 seconds
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Async Flush</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Metadata store &lt; 1% overhead
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
                  Synchronous logging in tight training loops causes 5 to 10
                  percent slowdown; logging 100 metrics per step at 10
                  milliseconds each adds 1 second overhead making 3 hour jobs
                  take 6 hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Asynchronous buffered logging with bounded queues batching
                  every 1 to 5 seconds or per epoch keeps training overhead
                  under 1 percent while maintaining complete audit trails
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata as event log: Append only storage for run lifecycle
                  events (started, parameters, metrics, artifacts, completed)
                  with materialized views for search scales better for
                  hyperparameter optimization bursts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Logging backpressure during hyperparameter optimization
                  sweeps: 1,000 runs per hour with 5 events each means sustained
                  1 event per second; fix with write optimized log, eventual
                  views, partitioning by time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Capacity planning for 500 runs per day with 10 to 50 events
                  each yields 5,000 to 25,000 events daily; provision for 10x
                  burst headroom targeting p99 write latency under 50
                  milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage budgeting: 2 TB per month artifacts with 3 month
                  retention needs 6 to 8 TB plus 30 percent headroom; apply
                  backpressure policies dropping debug logs or downsampling
                  metrics when slow
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
                  Meta FBLearner Flow: Centralized metadata service handles tens
                  of thousands of run events daily supporting millions of
                  experiments yearly with DAG based pipelines for ranking and
                  NLP
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google TFX ML Metadata: Stores artifacts for ExampleGen,
                  Transform, Trainer, Evaluator with tens of thousands pipeline
                  step executions per day using append only event log with
                  materialized views
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Python async logging pattern: metrics_buffer =
                  queue.Queue(maxsize=1000); every 5 seconds flush batch to
                  remote store; on queue full apply backpressure dropping lowest
                  priority metrics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentTrackingAsynchronousLoggingAndMetadataArchitecture;
