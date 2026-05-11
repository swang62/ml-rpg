import type { Component } from "solid-js";

const LessonChangeDataCaptureCdcFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          CDC Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          CDC pipelines fail in subtle and catastrophic ways if you don't plan
          for lag, schema evolution, and idempotency. The most severe failure is
          consumer lag exceeding log retention, causing irreversible data loss.
          If your consumer falls behind longer than the source retains logs,
          required commit log entries will be purged and you cannot recover the
          gap. You must either re snapshot (which may take hours or days for
          large tables) or accept permanent data loss. Always monitor lag in
          bytes or LSNs behind the head, not just time, because log generation
          rate varies. Large transactions create burst amplification and out of
          order observations. A single transaction touching millions of rows may
          be emitted as a long burst of events that spikes downstream
          backpressure. For example, a bulk update across 5 million rows
          generates 5 million change events in rapid succession. If your
          consumer can handle 10,000 events per second, this creates a 500
          second backlog. While commit order is preserved, per table or per
          partition interleaving can surprise consumers expecting strict serial
          updates across related entities. Apply per key ordering and
          backpressure aware batching to absorb spikes. Schema evolution breaks
          pipelines when CDC delivers Data Definition Language (DDL) changes out
          of band or not at all. A consumer expecting 5 columns suddenly
          receives 6, or a column type changes from integer to string, causing
          deserialization failures and pipeline stalls. Some CDC implementations
          miss schema changes entirely. Use a schema registry with versioning,
          enforce backward and forward compatibility rules, and gate deployments
          to ensure both producers and consumers handle the new schema before
          changes appear in the stream. Cross region replication with CDC
          typically uses last writer wins conflict resolution based on
          timestamps. Clock skew between regions can cause older updates to
          incorrectly overwrite newer ones, silently losing data. For example,
          if region A's clock is 2 seconds ahead and region B writes at true
          time T, then region A writes at true time T plus 1 second, region B's
          later write may be rejected because its timestamp appears older. Use
          monotonic version counters or hybrid logical clocks instead of wall
          clock timestamps to reduce this risk.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 12px; text-align: center">
              Critical Failure Modes
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px">
                  Log Retention Exhaustion
                </div>
                <div style="font-size: 11px; line-height: 1.5">
                  Consumer lag &gt; retention window →{" "}
                  <strong>Irreversible data loss</strong>
                  <br />
                  Monitor: LSN lag, bytes behind, time to purge
                </div>
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px">
                  Large Transaction Burst
                </div>
                <div style="font-size: 11px; line-height: 1.5">
                  5M row update → 5M events in burst
                  <br />
                  At 10k events/s: <strong>500 second backlog</strong>
                </div>
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px">
                  Schema Evolution
                </div>
                <div style="font-size: 11px; line-height: 1.5">
                  DDL out of band → Consumer expects 5 cols, gets 6<br />
                  Deserialization fails, <strong>pipeline stalls</strong>
                </div>
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px">
                  Clock Skew (Multi Region)
                </div>
                <div style="font-size: 11px; line-height: 1.5">
                  Region A clock +2s ahead → Older write overwrites newer
                  <br />
                  <strong>Silent data loss</strong> with last writer wins
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
                Consumer lag exceeding log retention causes irreversible data
                loss. At 30 megabytes per second with 512 gigabytes retention,
                you have only 4.7 hours of headroom before purges begin
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Large transactions create burst amplification. A 5 million row
                bulk update emits 5 million events; at 10,000 events per second
                consumer rate, this creates a 500 second backlog spike
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema evolution failures occur when DDL changes arrive out of
                band or are missed entirely. Use schema registry with versioning
                and enforce compatibility before deploying changes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Trigger based CDC can pollute buffer caches by evicting hot
                pages, increasing latency for primary workload. Prefer log based
                CDC to avoid touching base tables during capture
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cross region last writer wins with timestamp based conflict
                resolution silently loses data when clock skew exists. Use
                monotonic version counters or hybrid logical clocks instead
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Snapshot to CDC cutover gaps occur if handoff is imprecise.
                Always snapshot at a precise log position and start CDC from the
                next position to avoid duplicates or missing rows
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
                DynamoDB Global Tables conflict resolution: Uses last writer
                wins based on timestamps, requiring accurate clock
                synchronization and idempotent updates to prevent data loss from
                skew
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Incorrect snapshot handoff: Snapshot at time T, CDC from earlier
                position → Duplicates. CDC from later position → Missing changes
                during snapshot window
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Broker message size limits: Large rows with before and after
                images can exceed Kafka's default 1 megabyte limit, causing
                drops. Use column filtering or payload chunking
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonChangeDataCaptureCdcFailureModesAndEdgeCases;
