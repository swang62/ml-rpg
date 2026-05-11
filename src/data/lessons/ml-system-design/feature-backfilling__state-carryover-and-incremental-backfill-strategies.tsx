import type { Component } from "solid-js";

const LessonFeatureBackfillingStateCarryoverAndIncrementalBackfillStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            State Carryover and Incremental Backfill Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Long Window Problem
            </p>
            <p style="margin-top: 0">
              Long window aggregates like 180 day unique user counts explode
              backfill cost because naive recomputation scans 180 days of raw
              events for every training row. For a model training on 12 months
              of data with daily granularity (365 rows per entity), that is 365
              times 180 equals 65,700 partition scans per entity. At scale, this
              becomes prohibitively expensive.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              State Carryover Pattern
            </p>
            <p style="margin-top: 0">
              Maintain intermediate aggregate state as of each day boundary. To
              compute the 180 day unique count for day N, start with the state
              from day N minus 1, add new events from day N, and expire events
              from day N minus 181. This sliding window approach converts
              O(window size) per row into O(1) per row after initial state
              bootstrap.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Incremental Backfill
            </p>
            <p style="margin-top: 0">
              When features already exist for historical periods but need
              updating (schema migration, bug fix), compute only the delta
              rather than full recomputation. Compare new logic output against
              existing values, identify entities and timestamps where values
              differ, and update only those rows. This can reduce backfill
              volume by 90 to 99 percent for small corrections.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Materialized Intermediate Tables
            </p>
            <p style="margin-top: 0">
              Pre-compute and persist expensive intermediate aggregates that
              multiple features depend on. A daily active user table computed
              once supports dozens of derived features without redundant scans.
              Trade storage cost for compute efficiency when intermediates are
              reused across many backfills.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Approximation for Extreme Windows
            </p>
            <p style="margin-top: 0">
              For features with very long lookback (365 day aggregates) where
              exact computation is cost prohibitive, consider approximate
              algorithms. HyperLogLog for unique counts, Count Min Sketch for
              frequency estimation, and sampling for percentiles provide 95 to
              99 percent accuracy at 10 to 100x lower cost.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scheduling Strategy
            </p>
            <p style="margin-top: 0">
              Orchestrate backfills in dependency order: base aggregates before
              derived features, dimensions before facts. Use DAG orchestrators
              like Airflow to manage dependencies and parallelize independent
              branches.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; font-weight: bold; text-align: center; font-size: 14px">
                State Carryover for 7d Window Backfill
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Naive: Scan full history per row
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    Jan 15 row → scan Jan 8–14 (7d)
                    <br />
                    Jan 16 row → scan Jan 9–15 (7d)
                    <br />
                    ...
                    <br />
                    Cost: <strong>O(history × window)</strong>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  vs
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    State Carryover: Checkpoint + increment
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    Dec 31 checkpoint: user_123 count=42
                    <br />
                    Jan 1: +3 → 45, Jan 2: +1 → 46, ...
                    <br />
                    Cost: <strong>O(window + target_range)</strong>
                  </div>
                </div>
                <div style="margin-top: 6px; padding: 8px; border: 2px solid; border-radius: 6px; font-size: 11px">
                  <strong>Savings:</strong> 180d window backfill: 25× less data
                  scanned vs naive. Requires state management and checkpoint
                  storage.
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
                  State carryover checkpoints rolling aggregate state at
                  partition boundaries, reducing backfill complexity from order
                  of history times window to order of window plus target range
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For 180 day windows, state carryover scans 25 times less data
                  than naive recomputation by initializing from prior checkpoint
                  instead of reprocessing full history per row
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental backfills recompute only changed partitions after
                  logic updates, saving 80% to 90% cost for localized changes
                  but risking inconsistencies if change impact spans boundaries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Copy on write rewrites entire 10 gigabyte partitions even for
                  1% changes, simplifying time travel but increasing write cost;
                  merge on read stores deltas, reducing writes but complicating
                  reads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber uses stateful streaming with checkpointed windows at lake
                  scale (hundreds of terabytes per day); Netflix uses Iceberg
                  snapshots for atomic partition swaps
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
                  A 180 day unique user count feature over 12 months of training
                  data (365 rows per entity) requires 65,700 partition scans per
                  entity naively; state carryover reduces to 180 plus 365 equals
                  545 scans
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature bug fixed on February 10; incremental backfill from
                  February 10 to March 31 reprocesses 49 days instead of full
                  365 day history, reducing cost from $4,000 to $600
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Hudi tables use merge on read for continuous ingestion,
                  deferring compaction to off peak windows; this reduces write
                  latency from 10 seconds (copy on write) to 2 seconds but
                  increases read query time by 20%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureBackfillingStateCarryoverAndIncrementalBackfillStrategies;
