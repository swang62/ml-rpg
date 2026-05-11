import type { Component } from "solid-js";

const LessonBatchThroughputTuningBatchingInDataPipelinesProducerAndConsumerPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Batching in Data Pipelines: Producer and Consumer Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Producer-Side Batching
            </p>
            <p style="margin-top: 0">
              Producers batch writes to message queues, databases, or APIs.
              Instead of one write per event, buffer locally and flush
              periodically. Benefits: fewer network round-trips, better
              compression ratios, reduced per-message overhead. Risks: data loss
              if producer crashes before flush; increased latency for
              time-sensitive data. Implementation: in-memory buffer with size
              limit (e.g., 1000 messages) and time limit (e.g., 100ms), flush on
              whichever triggers first. Include retry logic for failed batch
              writes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Consumer-Side Batching
            </p>
            <p style="margin-top: 0">
              Consumers batch reads from queues for efficient processing. Kafka
              consumers pull batches of messages; database queries fetch ranges
              instead of individual rows. Key parameters: fetch.min.bytes (wait
              for this much data), fetch.max.wait.ms (maximum wait time),
              max.poll.records (limit batch size). Too large batches risk
              processing timeouts; too small batches waste overhead. Match
              consumer batch size to downstream processing capacity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              End-to-End Pipeline Batching
            </p>
            <p style="margin-top: 0">
              In a multi-stage pipeline (collect → process → enrich → store),
              batch sizes at each stage affect overall throughput and latency.
              If stage 2 processes batches of 100 but stage 1 produces batches
              of 10, stage 2 waits for 10 upstream batches. Align batch sizes
              across stages or use adaptive batching that adjusts based on queue
              depth. Monitor queue lengths between stages: growing queues
              indicate the downstream stage is the bottleneck.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Latency Accumulation:</strong> Each batching stage adds
              latency. A 5-stage pipeline with 50ms batching per stage has 250ms
              minimum latency. For real-time requirements, reduce batch delays
              at every stage.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 6px">
                    Producer Side Batching
                  </div>
                  <div style="font-size: 13px">
                    Batch by: <strong>16 to 64 KB</strong> OR{" "}
                    <strong>5ms wait</strong>
                    <br />
                    Result: 5 to 10x fewer network calls
                    <br />
                    Adds: 5ms latency per message
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: 700">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <div style="font-weight: 700; margin-bottom: 4px">
                    Message Broker
                  </div>
                  <div style="font-size: 13px">(Kafka, Kinesis, Pub/Sub)</div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: 700">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 6px">
                    Consumer Side Batching
                  </div>
                  <div style="font-size: 13px">
                    Prefetch: <strong>500 to 1,000 messages</strong>
                    <br />
                    Workers: 32 × Batch: 100 = 3,200 in flight
                    <br />
                    Result: Amortize deserialization and I/O
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
                  Producer batching: buffer with size limit (1000 msgs) and time
                  limit (100ms), flush on first trigger
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Producer risks: data loss on crash, increased latency;
                  mitigate with durability and retry logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consumer params: fetch.min.bytes, fetch.max.wait.ms,
                  max.poll.records - tune to processing capacity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross-stage alignment: mismatched batch sizes cause waiting;
                  monitor queue depths for bottlenecks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency accumulation: 5 stages × 50ms batching = 250ms minimum
                  end-to-end latency
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
                  Describe producer buffer parameters (size + time limit, flush
                  on first trigger) for practical detail
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention Kafka consumer params (fetch.min.bytes,
                  max.poll.records) when discussing pipeline batching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warn about latency accumulation across stages - shows
                  end-to-end thinking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchThroughputTuningBatchingInDataPipelinesProducerAndConsumerPatterns;
