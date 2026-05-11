import type { Component } from "solid-js";

const LessonRealtimeForecastingUpdatesEndToEndArchitectureForRealTimeFeaturesAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            End to End Architecture for Real Time Features at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>End-to-End Architecture:</strong> Production real-time
              feature systems combine event ingestion, stream processing, state
              management, and low-latency serving. Each layer introduces latency
              and failure modes; the architecture must balance freshness,
              accuracy, and reliability.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Ingestion Layer
            </p>
            <p>
              Events flow from applications to a message queue (Kafka, Kinesis,
              Pub/Sub). The queue provides durability and decouples producers
              from consumers. Key decisions: partition strategy (by user_id for
              user features, by item_id for item features), retention period
              (determines how far back you can replay), and replication factor
              (durability vs cost). For ML features, partition by the entity you
              are aggregating over—this ensures all events for one entity go to
              the same consumer, enabling stateful processing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stream Processing Layer
            </p>
            <p>
              A stream processor (Flink, Spark Streaming, Kafka Streams)
              consumes events, computes windowed aggregations, and writes
              results. Checkpointing provides exactly-once semantics by
              periodically saving state to durable storage. If a node fails,
              processing resumes from the last checkpoint. Checkpoint interval
              trades latency for durability: 30-second checkpoints mean up to 30
              seconds of reprocessing after failure. For ML features,
              checkpointing is essential—without it, node failures cause feature
              values to reset to zero mid-window.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              State Store and Serving
            </p>
            <p>
              Computed features must be queryable at prediction time with
              sub-10ms latency. Options: embedded state (RocksDB within Flink),
              external store (Redis, DynamoDB), or hybrid. Embedded state has
              lowest latency but limits scalability; external stores scale
              independently but add network round-trips. Common pattern: stream
              processor writes to Redis sorted sets (one key per entity, score
              by timestamp), serving layer reads latest value. TTL on keys
              prevents unbounded growth from inactive entities.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Latency Budget:</strong> Typical breakdown for 50ms
              end-to-end: ingestion queue 5ms, stream processing 20ms, state
              write 10ms, serving read 5ms, network overhead 10ms. Profile each
              component to identify bottlenecks.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>Real Time Feature Pipeline Architecture</strong>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>1. Event Ingestion</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Kafka/Pulsar: 500K events/sec, 100 partitions, 3 day
                    retention
                    <br />
                    Event: &#123;id, event_time, user_id, action, metadata&#125;
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>2. Stream Processing</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Flink/Dataflow: Event time windows, watermark lag 2 min,
                    allowed lateness 3 min
                    <br />
                    State: 60 buckets × 24 bytes per user = 1.4 KB
                    <br />
                    Update every 10 seconds, emit windowed features
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>3. Feature Store</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Redis/DynamoDB: Key = user_id:window_5min
                    <br />
                    Value = &#123;click_count:42, view_count:158,
                    last_category:"electronics"&#125;
                    <br />
                    TTL = 5 minutes, p99 read latency &lt; 5ms
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>4. Model Serving</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Read features + score model: 10ms feature read + 30ms
                    inference = 40ms total p99
                    <br />
                    End to end: event → ingestion (50ms) → processing (200ms) →
                    serving (5ms) → inference (30ms) = 285ms
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
                  Partition events by the entity being aggregated for stateful
                  processing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpointing provides exactly-once semantics but adds
                  recovery latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  External state stores scale independently but add network
                  latency
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
                  50ms latency budget: ingestion 5ms, processing 20ms, write
                  10ms, read 5ms, network 10ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Redis sorted sets with TTL for feature serving and automatic
                  cleanup
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeForecastingUpdatesEndToEndArchitectureForRealTimeFeaturesAtScale;
