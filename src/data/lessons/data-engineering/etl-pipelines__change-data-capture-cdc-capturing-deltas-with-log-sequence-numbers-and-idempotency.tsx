import type { Component } from "solid-js";

const LessonEtlPipelinesChangeDataCaptureCdcCapturingDeltasWithLogSequenceNumbersAndIdempotency: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Change Data Capture (CDC): Capturing Deltas with Log Sequence
            Numbers and Idempotency
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Change Data Capture streams only the changes (inserts, updates,
            deletes) from source databases by reading transaction logs or
            binlogs. CDC minimizes load on the source and reduces downstream
            compute by shipping incremental deltas rather than full snapshots.
            The complexity lies in ordering, idempotency, and handling schema
            drift. CDC workflows start with a consistent snapshot of the source
            table, recording the Log Sequence Number (LSN) or System Change
            Number (SCN) at snapshot time. After the snapshot completes, the
            pipeline applies log changes from that position forward, strictly
            ordered by commit sequence. Each change carries the source primary
            key, LSN, and operation type (insert, update, delete). Downstream
            sinks perform upserts keyed by primary key and drop changes with
            older LSNs to ensure idempotency during retries or rebalancing. The
            failure modes are subtle. If log retention is too short for
            long-running snapshots, you miss changes and create gaps.
            Out-of-order application of updates yields incorrect final state,
            especially for multi-row transactions. Schema changes in the source
            can break downstream parsers unless you version schemas and route to
            side-by-side tables during migration windows. Monitor replication
            lag by tracking the difference between the current source LSN and
            the last applied LSN; alert on gaps or lag exceeding Service Level
            Objectives (SLOs). CDC is the backbone of real-time data
            replication. Amazon teams use CDC to replicate operational databases
            into data lakes and warehouses, maintaining sub-minute freshness for
            high-value tables. For example, a CDC pipeline on a busy Orders
            table might ship 50,000 changes per second during peak traffic. At 1
            kilobyte per change, that is 50 megabytes per second sustained
            throughput. Full snapshots would hammer the source with gigabytes of
            reads every hour; CDC reduces this to incremental deltas with
            minimal source impact.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Source DB</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    transaction log
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Snapshot + LSN</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    initial state at LSN=1000
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Apply Log Changes</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    LSN=1001, 1002, ...
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Destination</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    upsert by PK, drop old LSN
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
                  CDC captures only changes by reading database logs, minimizing
                  source load and reducing downstream compute compared to full
                  snapshots.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Start with a consistent snapshot and record the Log Sequence
                  Number (LSN) or System Change Number (SCN). Apply log changes
                  from that position forward in strict commit order.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Downstream sinks must upsert by primary key and drop changes
                  with older LSNs to achieve idempotency during retries and
                  consumer rebalancing.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Failure modes include log retention gaps if snapshots run too
                  long, out-of-order application causing incorrect state, and
                  schema drift breaking parsers. Monitor LSN lag and validate
                  continuity.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale: a busy Orders table shipping 50k changes per second
                  at 1 KB each sustains 50 MB/s throughput. Full snapshots would
                  cause gigabytes per hour of source load; CDC reduces this to
                  incremental deltas.
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
                  Amazon CDC pattern: replicate operational databases to data
                  lakes with sub-minute freshness. Snapshot captures initial
                  state at LSN=1000, then stream applies changes at LSN=1001,
                  1002, etc. Downstream sinks perform upserts keyed by (table
                  PK, LSN) to drop duplicates.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitoring: track current source LSN minus last applied LSN.
                  Alert if lag exceeds SLO (e.g., 5 minutes) or if LSN
                  differences show gaps, indicating missed changes due to log
                  retention expiry.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEtlPipelinesChangeDataCaptureCdcCapturingDeltasWithLogSequenceNumbersAndIdempotency;
