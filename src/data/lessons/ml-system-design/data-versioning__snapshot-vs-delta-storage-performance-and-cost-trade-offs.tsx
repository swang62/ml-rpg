import type { Component } from "solid-js";

const LessonDataVersioningSnapshotVsDeltaStoragePerformanceAndCostTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Snapshot vs Delta Storage: Performance and Cost Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Trade-off
            </p>
            <p style="margin-top: 0">
              The choice between full snapshots and delta based versioning
              fundamentally trades storage cost against read performance. Full
              snapshots copy the entire dataset for each version, providing
              instant access without reconstruction but multiplying storage
              costs linearly with version count. Delta based approaches store a
              base snapshot plus incremental changes, dramatically reducing
              storage at the cost of rehydration time when reading older
              versions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Cost Math
            </p>
            <p style="margin-top: 0">
              The math is stark. Consider a 10 terabyte dataset with 1 percent
              daily churn retained for 30 days in object storage at $0.023 per
              gigabyte per month. Daily full snapshots consume 10 terabytes
              times 30 equals 300 terabytes per month, costing $6,900 monthly.
              Weekly snapshots plus daily deltas use approximately 10 terabytes
              times 4 plus 100 gigabytes times 26 equals 44.6 terabytes per
              month, costing $1,026 and saving 85 percent while keeping
              reconstruction under 10 minutes with parallelized reads.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Delta Chain Management
            </p>
            <p style="margin-top: 0">
              Production systems cap delta chain length at 7 to 10 deltas before
              auto compacting into a new checkpoint. Longer chains save more
              storage but slow reads geometrically as each delta must be applied
              sequentially. Hot versions that serve active training or inference
              are precomputed and cached.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Append Only Streams
            </p>
            <p style="margin-top: 0">
              For append only streams, periodic checkpointing to object storage
              provides fast recovery points, with deltas represented implicitly
              by offset ranges that can be replayed in parallel across
              partitions.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="display: flex; gap: 12px; justify-content: space-around">
                  <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      Full Snapshots
                    </strong>
                    <div style="font-size: 12px; line-height: 1.4">
                      Storage: 300 TB/mo
                      <br />
                      Cost: $6,900/mo
                      <br />
                      Read time: Instant
                      <br />
                      Reconstruction: None
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      Weekly + Deltas
                    </strong>
                    <div style="font-size: 12px; line-height: 1.4">
                      Storage: 44.6 TB/mo
                      <br />
                      Cost: $1,026/mo
                      <br />
                      Read time: 5 to 10 min
                      <br />
                      Reconstruction: Up to 6 deltas
                    </div>
                  </div>
                </div>
                <div style="text-align: center; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px">
                  <strong>Trade-off:</strong> Delta approach saves 85% storage
                  but adds rehydration latency; cap chains at 7 to 10 deltas to
                  keep reads under 10 minutes
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
                  Full snapshots provide zero latency reads and simplify
                  recovery but cost $6,900 per month for a 10 terabyte dataset
                  with 30 daily versions at standard object storage rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weekly checkpoints plus daily deltas reduce storage to 44.6
                  terabytes per month costing $1,026, an 85% savings while
                  keeping reconstruction under 10 minutes with parallel reads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta chain length must be capped at 7 to 10 versions before
                  auto compacting into a new base; longer chains save storage
                  but slow reads geometrically as deltas apply sequentially
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot versions serving active training or online inference
                  should be precomputed and cached in fast storage, amortizing
                  rehydration cost across many reads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Append only streams use offset ranges as implicit deltas,
                  replaying events in parallel across partitions from periodic
                  checkpoints to materialize point in time datasets
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
                  A 10 terabyte dataset with 1% daily change generates 100
                  gigabytes of delta per day; storing 4 weekly snapshots plus 26
                  daily deltas uses 44.6 terabytes versus 300 terabytes for 30
                  full snapshots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kafka based training pipelines checkpoint to Parquet snapshots
                  in S3 weekly, then define subsequent versions by offset
                  ranges; reading 6 days of deltas across 128 partitions takes
                  under 8 minutes with 64 parallel readers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix materializes hot training sets by precomputing from
                  deltas during off peak hours, serving reads from cached
                  snapshots with zero rehydration latency during peak training
                  windows
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVersioningSnapshotVsDeltaStoragePerformanceAndCostTradeOffs;
