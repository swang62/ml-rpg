import type { Component } from "solid-js";

const LessonEtlPipelinesIdempotencyDeduplicationAndExactlyOnceIllusionsInDistributedPipelines: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Idempotency, Deduplication, and Exactly Once Illusions in
            Distributed Pipelines
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Exactly-once delivery across distributed systems is an illusion.
            Without idempotent sinks and deterministic identifiers, retries and
            rebalancing introduce duplicates or gaps. The key is designing
            pipelines where reprocessing the same input produces the same output
            without side effects. Attach deterministic primary keys and sequence
            numbers to every event. For Change Data Capture (CDC), use source
            table primary key plus Log Sequence Number (LSN). For application
            events, combine a globally unique event identifier with a monotonic
            timestamp or sequence per producer. Downstream sinks perform upserts
            or merges keyed by these identifiers, dropping changes with older
            sequence numbers. This makes repeated delivery safe: applying the
            same change twice has no additional effect. For streaming systems,
            maintain a bounded deduplication cache per partition keyed by (event
            ID, sequence). Size the cache using arrival rate and maximum
            expected reordering window. If p99 reordering is 5 minutes and you
            receive 1,000 events per second, cache the last 300,000 event IDs
            per partition (5 minutes × 60 seconds × 1,000 events). Expire cache
            entries older than the watermark plus a safety buffer. This prevents
            memory exhaustion while catching duplicates within the reordering
            window. Cross-system exactly-once is harder. A producer may write to
            a stream successfully but crash before committing the write offset,
            causing a duplicate on retry. Transactional frameworks coordinate
            stream writes and offset commits atomically, but not all sinks
            support this. The pragmatic approach is idempotent sinks plus
            monitoring for duplicate rates and reconciliation jobs that check
            row counts and checksums between source and destination. Amazon
            pipelines enforce idempotency at every stage. Ingestion assigns
            deterministic keys; transformation jobs checkpoint source offsets
            and watermark state; sinks upsert by key. Backfill jobs reprocess
            overlapping time windows safely because all operations are
            idempotent. Monitoring tracks duplicate event rates and alerts if
            they exceed thresholds, triggering investigation of producer bugs or
            misconfigured retries.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exactly-once delivery across systems is not guaranteed. Design
                  for idempotency: reprocessing the same input must produce the
                  same output without additional side effects.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Attach deterministic primary keys and monotonic sequence
                  numbers (e.g., CDC: source PK + LSN, events: UUID +
                  timestamp). Sinks upsert by key and drop older sequences.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For streaming, maintain a bounded dedup cache per partition
                  sized by arrival rate and reordering window. Example: 1k
                  events/s, 5 min reorder window = cache last 300k IDs per
                  partition.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross-system exactly-once requires transactional coordination
                  (atomic write + offset commit). Pragmatic fallback: idempotent
                  sinks plus reconciliation jobs checking row counts and
                  checksums.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon pattern: deterministic keys at ingress, checkpointed
                  offsets and watermarks in jobs, upsert sinks. Backfills
                  reprocess overlapping windows safely. Monitor duplicate rates
                  and alert on anomalies.
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
                  CDC idempotency: event carries (order_id=12345, LSN=5001,
                  op=UPDATE). Sink sees LSN=5001 already applied, drops
                  duplicate. Later change with LSN=5002 is applied; out-of-order
                  LSN=5000 is dropped.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dedup cache sizing: at 2k events/s with p99 reorder of 10
                  minutes, cache 2000 × 600 = 1.2M event IDs per partition.
                  Expire entries older than watermark + 15 min safety buffer to
                  prevent memory bloat.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEtlPipelinesIdempotencyDeduplicationAndExactlyOnceIllusionsInDistributedPipelines;
