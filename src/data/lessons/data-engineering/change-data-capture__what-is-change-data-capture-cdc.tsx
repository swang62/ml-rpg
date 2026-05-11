import type { Component } from "solid-js";

const LessonChangeDataCaptureWhatIsChangeDataCaptureCdc: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Change Data Capture (CDC)?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          Change Data Capture (CDC) is a design pattern that continuously
          extracts committed inserts, updates, and deletes from a source
          database and emits them as an ordered change stream with minimal
          impact on the source system. Think of it as a firehose of everything
          changing in your database, delivered in real time. The most robust
          implementation is log based CDC, which reads the database's own commit
          log (such as PostgreSQL Write Ahead Log (WAL), MySQL binary log
          (binlog), or MongoDB operations log (oplog)). This approach is
          powerful because the database already writes these logs for crash
          recovery and replication, so you're essentially tapping into an
          existing stream rather than creating new overhead. For example, at
          Amazon, DynamoDB Streams publishes every item level change within
          typically under 1 second of the write, scaling automatically with
          table partitions. The alternative approaches trade off simplicity for
          performance. Trigger based CDC fires custom logic on every row change
          but adds write path latency and contention to your production
          database. Query based CDC periodically scans tables to find
          differences, which is easiest to implement but causes high read
          amplification and staleness. If your system handles 50,000
          transactions per second, trigger based CDC adds overhead to every
          single one of those writes, while log based CDC reads a stream the
          database was already producing. CDC enables critical use cases like
          near real time analytics, data warehouse ingestion, cache
          invalidation, search indexing, and cross region replication. It
          decouples your analytical workloads from your operational database,
          protecting the hot path while providing a reliable, append only
          history to reconstruct state elsewhere.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; gap: 16px; align-items: center; justify-content: center">
              <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                  <strong style="font-size: 13px">Log Based</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Read WAL/binlog
                  </div>
                  <div style="font-size: 11px; font-weight: bold">
                    ~1ms overhead
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                  <strong style="font-size: 13px">Trigger Based</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Fire on each row
                  </div>
                  <div style="font-size: 11px; font-weight: bold">
                    +5-20ms per write
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 120px">
                  <strong style="font-size: 13px">Query Based</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Periodic diffs
                  </div>
                  <div style="font-size: 11px; font-weight: bold">
                    Minutes stale
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Log based CDC reads the database's commit log (WAL, binlog,
                oplog) that already exists for recovery, adding minimal overhead
                to the source system
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Trigger based CDC adds logic to every write operation,
                introducing 5 to 20ms of additional latency per transaction and
                contention on production workloads
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query based CDC scans tables periodically for changes, causing
                high read amplification but is easiest to implement when log
                access is unavailable
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Change events include operation type, before and after images,
                transaction identifiers, commit timestamp, and source position
                for replay and ordering
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At Amazon, DynamoDB Streams typically publishes changes within
                under 1 second, enabling cross region replication with sub
                second propagation in normal conditions
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                CDC streams are typically at least once delivery, requiring
                downstream consumers to implement idempotent processing and
                preserve per key ordering
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
                DynamoDB Streams at Amazon: Every item change published within
                &lt;1s, used by Global Tables for cross region replication with
                last writer wins conflict resolution
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Uber's MySQL binlog CDC to Kafka: Handles millions of messages
                per second for search indexing with sub second to low second
                latencies
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                AWS Database Migration Service (DMS): Log based CDC from
                Oracle/MySQL/PostgreSQL to Kinesis/S3/Redshift, maintaining sub
                second replication lag for tens of thousands of row changes per
                second
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonChangeDataCaptureWhatIsChangeDataCaptureCdc;
