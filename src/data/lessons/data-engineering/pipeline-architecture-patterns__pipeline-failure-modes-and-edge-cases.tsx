import type { Component } from "solid-js";

const LessonPipelineArchitecturePatternsPipelineFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Pipeline Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Backpressure and Congestion:</strong>
            The most common production failure is cascading backpressure. Stage
            3 normally processes 100k messages per second. A bug in newly
            deployed code causes it to drop to 5k per second. The queue between
            Stage 2 and Stage 3 starts filling. If this queue is finite (say, 10
            million messages), it fills in 2000 seconds, or 33 minutes. Once
            full, Stage 2 experiences write failures or throttling. This
            propagates upstream: Stage 2 slows, its input queue fills,
            eventually reaching the ingestion layer. Without proper monitoring,
            this can go unnoticed until the entire pipeline is stalled. The fix:
            monitor queue depth and set alerts. When queue depth exceeds 50
            percent of capacity, page on call. Implement autoscaling: if Stage 3
            queue depth stays high for 5 minutes, automatically add more Stage 3
            workers. Also implement circuit breakers: if a stage consistently
            fails to process messages, temporarily stop sending to it and route
            to a dead letter queue for manual inspection.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Cascading Backpressure Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">100k/s</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    BUG DEPLOYED
                  </div>
                  <div style="font-size: 16px; font-weight: 800">5k/s</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    QUEUE FULL
                  </div>
                  <div style="font-size: 16px; font-weight: 800">33 min</div>
                </div>
              </div>
            </div>
            <strong>Poison Messages:</strong>A malformed record enters the
            pipeline. Stage 2 tries to parse it, fails, and retries. It fails
            again, retries again. This message is now blocking progress for all
            messages behind it in the partition. Without proper handling, that
            partition is effectively stuck. The solution is a retry policy with
            exponential backoff and a dead letter queue. Retry up to 3 times
            with increasing delays: 1 second, 10 seconds, 60 seconds. After 3
            failures, move the message to a dead letter queue for manual
            inspection and continue processing subsequent messages. Track dead
            letter queue size as a metric: a sudden spike indicates a new class
            of malformed data.
            <strong>Data Skew and Hotspots:</strong>
            You partition by <code>user_id</code>. Most users generate 10 events
            per day. One celebrity user generates 100k events per day. The
            worker handling that partition becomes overloaded, processing at 5x
            higher latency than others. If downstream stages require data from
            all partitions (for example, a global aggregation), the slowest
            partition determines overall latency. Mitigation strategies: First,
            use secondary partitioning. Instead of just <code>user_id</code>,
            hash on <code>user_id</code> plus <code>event_type</code>, spreading
            one user's events across multiple partitions. Second, implement
            dynamic partition splitting: if a partition consistently exceeds
            latency targets, automatically split it into two partitions. Third,
            use consistent hashing with virtual nodes: each physical worker
            claims 100 to 200 positions on the hash ring, spreading hotspots.
            <strong>Out of Order and Late Arrivals:</strong>
            In streaming pipelines, events often arrive out of order or late.
            Mobile clients lose connectivity, buffer events locally, reconnect
            10 minutes later, and flush the buffer. Your pipeline receives
            events with timestamps 10 minutes in the past. If you are computing
            hourly aggregates, naive logic that closes the 2pm to 3pm window at
            3pm will miss late arrivals. Watermarking solves this: define a
            lateness bound (for example, 5 minutes) and keep windows open until
            current time exceeds window end plus lateness. Close the 2pm to 3pm
            window at 3:05pm. Events arriving after 3:05pm go to a late data
            side output for separate handling. Choose your lateness bound based
            on data: if 99 percent of events arrive within 2 minutes, a 5 minute
            bound captures 99.9 percent.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Replaying historical data
              through a pipeline is tricky. External side effects like sending
              emails or updating a search index must be idempotent. Use
              idempotency keys: include a unique <code>event_id</code> and check
              before performing side effects. Have I already processed{" "}
              <code>event_id</code> 12345? If yes, skip. If no, process and
              record that I did.
            </div>
            <strong>Inconsistent Reference Data:</strong>
            Stage 2 enriches events with user country from a user profile
            database. Stage 4 filters events by country. A user changes country
            during the day. Some events are enriched with old country (USA),
            some with new country (Canada). Stage 4 sees inconsistent data. The
            fix is versioning reference data. Snapshot the user profile database
            at the start of each day. All stages use the same snapshot for that
            day's processing. This ensures consistency at the cost of slightly
            stale reference data. Alternatively, include a{" "}
            <code>reference_data_version</code> field in each event, allowing
            downstream stages to verify they are using matching reference data.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backpressure from a slow stage (100k/s drops to 5k/s) fills
                  queues in 33 minutes and cascades upstream; monitor queue
                  depth and autoscale workers when depth exceeds 50 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Poison messages block progress; implement 3 retry attempts
                  with exponential backoff (1s, 10s, 60s) then move to dead
                  letter queue
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data skew from power users causes 5x latency spikes; use
                  secondary partitioning or consistent hashing with 100 to 200
                  virtual nodes per worker
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late data arrivals require watermarking: keep aggregation
                  windows open for lateness bound (for example 5 minutes) to
                  capture 99.9 percent of events
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
                  During a deployment, Stage 3 latency spikes from 50ms to
                  800ms. Queue depth grows from 100k to 5M messages in 20
                  minutes. Autoscaler adds 10 workers, draining the backlog in 8
                  minutes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A mobile app reconnects after 15 minutes offline and sends 500
                  buffered events with old timestamps. Watermarking with 5
                  minute lateness captures most, but 20 events arrive after
                  window close and go to late data output for reprocessing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineArchitecturePatternsPipelineFailureModesAndEdgeCases;
