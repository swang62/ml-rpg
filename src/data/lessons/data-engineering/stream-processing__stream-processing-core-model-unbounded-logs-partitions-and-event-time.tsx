import type { Component } from "solid-js";

const LessonStreamProcessingStreamProcessingCoreModelUnboundedLogsPartitionsAndEventTime: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Stream Processing Core Model: Unbounded Logs, Partitions, and Event
            Time
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Stream processing treats data as an unbounded, continuously arriving
            log of events rather than finite batches. The foundational
            abstraction is a partitioned, ordered log where partitioning by key
            enables parallel processing and state locality. Order guarantees
            exist only within a single partition, not across partitions. This
            design trades global ordering for horizontal scalability. Event time
            processing decouples correctness from when data physically arrives.
            Pipelines reason about when something happened (event time) rather
            than when it was seen (processing time). For example, a mobile app
            might generate a click event at 10:00 AM but send it at 10:05 AM due
            to network issues. Event time processing correctly attributes this
            to the 10:00 AM window. Watermarks provide the mechanism: monotonic
            signals indicating the system believes no events earlier than time T
            will arrive. Late data beyond the watermark is handled via allowed
            lateness windows, side outputs, or retractions. Throughput and
            latency are explicitly traded through batching, compression, and
            buffering. A stateless transform might achieve 100,000 to 1,000,000
            events per second per cluster of tens of vCPUs with p99 operator
            latency of 1 to 10 milliseconds. Windowing operations like tumbling
            (fixed non overlapping intervals), sliding (overlapping intervals),
            or session windows (activity based gaps) bound infinite streams into
            finite computations that can actually complete and emit results.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Partition 0</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Key: user_A
                    <br />
                    Event time: 10:00:05
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Partition 1</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Key: user_B
                    <br />
                    Event time: 10:00:03
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Partition 2</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Key: user_C
                    <br />
                    Event time: 10:00:01
                  </div>
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Watermark: 10:00:00</strong>
                <div style="margin-top: 6px; font-size: 12px">
                  No events before this time expected
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
                  Partitioning by key enables parallelism and co-locates state
                  with computation; order is guaranteed only within a partition,
                  not globally across partitions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event time decouples correctness from network delays and
                  processing order; a click at 10:00 AM arriving at 10:05 AM is
                  correctly attributed to the 10:00 window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Watermarks signal progress through event time (for example
                  watermark at 10:00 means no events before that time expected);
                  allowed lateness handles events beyond watermark without data
                  loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Throughput scales from 100k events per second for stateless
                  transforms to 10k to 200k events per second for stateful
                  aggregations per mid-sized cluster
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Windowing (tumbling, sliding, session) converts infinite
                  streams into finite computations with emission triggers based
                  on event or processing time
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
                  LinkedIn processes 7+ trillion messages per day with peaks of
                  10+ million messages per second using Kafka partitioned by
                  user ID for feed ranking and anomaly detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Dataflow (Beam model) combines large windows of minutes
                  to hours with low latency incremental updates for YouTube
                  analytics, using watermarks and late data triggers for
                  correctness
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStreamProcessingStreamProcessingCoreModelUnboundedLogsPartitionsAndEventTime;
