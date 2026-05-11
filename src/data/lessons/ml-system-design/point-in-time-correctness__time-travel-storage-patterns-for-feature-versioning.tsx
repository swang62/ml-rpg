import type { Component } from "solid-js";

const LessonPointInTimeCorrectnessTimeTravelStoragePatternsForFeatureVersioning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Time Travel Storage Patterns for Feature Versioning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Time Travel Storage Concept
            </p>
            <p style="margin-top: 0">
              Time travel storage enables reconstructing feature state at any
              historical timestamp by maintaining immutable versioned histories.
              The core pattern combines base snapshots with append only change
              logs: each feature update creates a new version keyed by entity
              ID, event timestamp, and optionally a version counter for
              deduplication. This mirrors database point in time recovery but
              adapted for ML feature semantics with per entity timelines.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Copy on Write Architecture
            </p>
            <p style="margin-top: 0">
              Delta Lake and Apache Iceberg use copy on write semantics where
              updates create new file versions rather than modifying in place. A
              transaction log records which files are valid at each version. To
              read features as of timestamp T, the system resolves the log to
              find files committed before T, then applies filters within files
              using per row timestamps. This enables time travel queries like
              SELECT * FROM features VERSION AS OF timestamp.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Merge on Read Architecture
            </p>
            <p style="margin-top: 0">
              Apache Hudi optimizes for write heavy workloads using merge on
              read. Base files store snapshots, delta logs capture changes, and
              compaction periodically merges deltas. Reads must merge base plus
              deltas, adding query overhead but reducing write amplification.
              For high churn features (updated per request), merge on read cuts
              storage costs 2 to 5x versus copy on write.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Retention and Compaction
            </p>
            <p style="margin-top: 0">
              Historical versions consume 1.5 to 3x storage of current state.
              Production systems balance retention windows (7 to 90 days
              typical) against storage cost. Aggressive compaction reduces file
              count but limits time travel range. The sweet spot depends on
              training cadence: if you retrain weekly, 14 day retention
              suffices; quarterly audits may require 90 day retention.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Netflix Scale
            </p>
            <p style="margin-top: 0">
              Netflix uses snapshot based time travel on petabyte scale tables
              to rebuild exact historical training datasets months later for
              audits and model rollbacks.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Time-Travel Storage: Feature History
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Base Snapshot (Day 0)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    user_456: login_count = 10
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  +
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Append-Only Change Log
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px; line-height: 1.5">
                    Day 1, 10:00 AM → login_count = 12
                    <br />
                    Day 2, 3:00 PM → login_count = 15
                    <br />
                    Day 3, 9:00 AM → login_count = 18
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  =
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Time-Travel Query (Day 2, 5:00 PM)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Returns login_count = 15
                  </div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; margin-top: 4px">
                  <strong style="font-size: 12px">
                    Storage: 1.5-3x amplification
                  </strong>
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
                  Immutable append only rows keyed by entity ID and event
                  timestamp enable time travel reads, with copy on write formats
                  amplifying storage 1.5 to 3 times versus current state only
                  tables
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate event timestamp (when fact happened) from created
                  timestamp (when system saw it) to track late arrivals and
                  prevent processing time leakage into event time semantics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retention windows balance reproducibility against cost: 7 to
                  30 days for rapid iteration, 90 plus days for regulated
                  workloads, with high frequency features costing 10 to 100
                  times more than daily batch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Copy on write simplifies as of reads with direct snapshot file
                  scans but increases write cost, while merge on read reduces
                  writes at expense of read time compaction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix uses Iceberg style formats at petabyte scale to
                  rebuild multi hundred million row training datasets in hours,
                  supporting months of time travel for audit and rollback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor storage growth versus update churn rate to tune
                  compaction schedules: features updated every second require
                  aggressive compaction versus daily batch features
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
                  Meta unified feature store versions feature values by event
                  time, supporting tens of billions of reads per day with safe
                  backfills that rewrite history offline without corrupting
                  online serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline feature schema: (entity_id: user_123,
                  feature_name: login_count, event_time: 2024-01-15T10:00:00Z,
                  created_time: 2024-01-15T10:02:30Z, value: 12) stored as
                  immutable row in append only log
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iceberg table format example: Base snapshot v1 at t0 with 1
                  billion rows, plus change logs capturing 50 million updates
                  per day, enabling time travel queries over 30 day retention
                  window with 2x storage cost
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPointInTimeCorrectnessTimeTravelStoragePatternsForFeatureVersioning;
