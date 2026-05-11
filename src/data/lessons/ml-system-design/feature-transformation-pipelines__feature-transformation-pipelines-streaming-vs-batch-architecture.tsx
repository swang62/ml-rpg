import type { Component } from "solid-js";

const LessonFeatureTransformationPipelinesFeatureTransformationPipelinesStreamingVsBatchArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Transformation Pipelines: Streaming vs Batch Architecture
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
                <strong>Feature transformation pipelines</strong> convert raw
                event data into model ready features through orchestrated
                compute jobs. Batch pipelines (Spark, Hive) process historical
                data for training datasets. Streaming pipelines (Flink, Kafka
                Streams) compute features in near real time. The critical
                challenge is maintaining identical transformation logic across
                both to prevent training serving skew.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Pipeline Role
            </p>
            <p style="margin-top: 0">
              Processes historical data in scheduled jobs (hourly, daily) to
              generate training datasets and backfill offline feature stores. A
              typical Spark job reads events from S3 or Hive, applies
              transformations like aggregations, joins, and encodings, and
              writes output to a feature table partitioned by date. Throughput
              optimized: processing 1 terabyte of events to generate 100 million
              feature rows might take 30 minutes on a 100 node Spark cluster.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Streaming Pipeline Role
            </p>
            <p style="margin-top: 0">
              Processes events in near real time to update online feature stores
              with fresh values. Flink or Kafka Streams read from Kafka topics,
              compute windowed aggregates with event time semantics, and write
              to Redis or DynamoDB. Latency optimized: features should reflect
              events within seconds to minutes. Uber runs streaming pipelines
              for ETA and surge features with end to end latency under 30
              seconds.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Unified Logic Challenge
            </p>
            <p style="margin-top: 0">
              The same aggregation logic must produce identical results whether
              computed in Spark SQL or Flink. Differences in window semantics,
              timestamp handling, or null treatment cause training serving skew.
              Feature stores like Tecton address this by compiling a single
              feature definition to both batch and streaming execution plans.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; gap: 24px; justify-content: center">
                <div style="flex: 1">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 12px">
                    <strong style="font-size: 14px">Streaming (Flink)</strong>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px">
                    <strong>Latency:</strong> &lt;500ms
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px">
                    <strong>State:</strong> Multi-TB in memory
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px">
                    <strong>Time:</strong> Event time + watermarks
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px">
                    <strong>Use:</strong> Fraud, real-time ranking
                  </div>
                </div>
                <div style="flex: 1">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 12px">
                    <strong style="font-size: 14px">Micro-batch (Spark)</strong>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px">
                    <strong>Latency:</strong> 1–10s
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px">
                    <strong>State:</strong> External stores
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px">
                    <strong>Time:</strong> Processing time windows
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 13px">
                    <strong>Use:</strong> Training backfills
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
                  Streaming achieves sub-500ms latency with continuous event
                  time processing and stateful operators maintaining hundreds of
                  gigabytes to multi-terabyte keyed state
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch and micro-batch provide 1 to 10 second latency with
                  optimizations for high throughput historical recomputation
                  across multi-petabyte datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event time semantics with watermarks handle out of order data
                  correctly for temporal features, while processing time windows
                  approximate with simpler logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exactly once semantics require coordinated checkpoints every
                  10 to 60 seconds, adding 1 to 5 minute recovery times
                  depending on state size
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production pipelines must maintain feature parity between
                  offline training paths (batch computed) and online serving
                  paths (streaming computed) to avoid training serving skew
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
                  Netflix recommendations: Streaming pipeline ingests 50M
                  events/s from Kafka, computes per-user rolling features (watch
                  history over 30 days, genre preferences), maintains 2TB of
                  keyed state, writes to lakehouse for training and online store
                  for serving with 400ms P99 latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber fraud detection: Flink pipeline processes trip events in
                  real time, maintains rolling aggregates per driver and rider
                  (trips per hour, cancellation rate), achieves sub-second
                  detection with exactly once guarantees via 30 second
                  checkpoints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb pricing features: Daily Spark batch jobs backfill
                  historical price trends and seasonality features across 10k+
                  cores, processing 100TB shuffles for large joins between
                  listings and booking history
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureTransformationPipelinesFeatureTransformationPipelinesStreamingVsBatchArchitecture;
