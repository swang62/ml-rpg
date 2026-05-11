import type { Component } from "solid-js";

const LessonFeatureBackfillingIdempotencyAndAtomicPublicationPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Idempotency and Atomic Publication Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Idempotency Matters
            </p>
            <p style="margin-top: 0">
              Idempotency guarantees that rerunning a backfill job produces
              identical results without duplicates or inconsistencies. This is
              critical because large backfills fail mid run due to transient
              errors, stragglers, or resource limits, and must be restartable
              without corrupting previously written partitions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Deterministic Upserts
            </p>
            <p style="margin-top: 0">
              The foundation is deterministic upserts keyed by entity ID,
              feature name, and timestamp. Instead of appending rows, each write
              overwrites any existing row with the same key. Running the job
              twice produces identical output. Delta Lake and Hudi provide MERGE
              operations that implement this pattern efficiently.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Partition Level Atomicity
            </p>
            <p style="margin-top: 0">
              Write backfill output to staging partitions, validate completeness
              and correctness, then atomically swap staging into production.
              This prevents partial writes from being visible to downstream
              consumers. If validation fails, discard staging and retry without
              affecting production tables.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Checkpointing Strategy
            </p>
            <p style="margin-top: 0">
              For multi hour backfills, checkpoint progress at partition
              boundaries. If a job fails after completing partitions 1 through
              50, the restart should skip those partitions and resume from
              partition 51. Store checkpoint state in a durable metadata store
              separate from the output tables.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Conflict Resolution
            </p>
            <p style="margin-top: 0">
              When multiple backfill jobs write to overlapping partitions (rare
              but possible during migrations), define deterministic conflict
              resolution: latest writer wins, highest version wins, or fail
              loudly. Ambiguous merge semantics cause silent data corruption
              that surfaces months later as unexplained model degradation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Audit Trail
            </p>
            <p style="margin-top: 0">
              Log backfill job metadata: start time, end time, input data
              ranges, output partition counts, row counts, and checksums. This
              audit trail enables debugging when downstream consumers report
              data quality issues.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="margin-bottom: 12px; font-weight: bold; text-align: center; font-size: 14px">
                Atomic Backfill Publication Pattern
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    1. Write to Shadow Table
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    features_shadow_run_abc123
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">2. Validate Parity</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Sample 10k entities × timestamps
                    <br />
                    Exact match: <strong>99.95%</strong> ✓<br />
                    KL divergence: <strong>0.003</strong> ✓
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    3. Atomic Pointer Swap
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    features_prod → snapshot_v47
                    <br />
                    (single metadata update)
                  </div>
                </div>
                <div style="margin-top: 6px; padding: 8px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                  <strong>Rollback:</strong> Revert pointer to snapshot_v46 in
                  seconds
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
                  Idempotency requires deterministic upserts keyed by entity id,
                  feature name, timestamp, and monotonic version; tie breakers
                  use max version or latest ingestion LSN to deduplicate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Atomic publication through shadow tables and pointer swaps
                  prevents partial results from being visible; consumers see
                  consistent snapshots even if backfill fails mid run
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Validation compares offline backfilled values against online
                  computed values for sampled entities, targeting greater than
                  99.9% exact match for deterministic features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distributional validation using KL divergence or PSI detects
                  silent logic errors that shift feature distributions by 5% or
                  more without throwing exceptions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo uses copy on write or merge on read with
                  primary key upserts; Netflix uses Iceberg style snapshot
                  isolation enabling instant rollback by reverting pointers
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
                  A backfill job fails at hour 7 of 10; on restart, previously
                  written partitions are skipped or overwritten
                  deterministically by entity id and timestamp, preventing
                  duplicate feature rows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow backfill writes to features_shadow_run_xyz; after
                  validating 99.96% parity on 50,000 sampled entities,
                  production pointer is atomically swapped to the new snapshot
                  in a single metadata transaction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A feature logic bug causes 8% shift in value distribution; KL
                  divergence of 0.15 (threshold 0.05) fails validation, blocking
                  publication and preventing silent model degradation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureBackfillingIdempotencyAndAtomicPublicationPatterns;
