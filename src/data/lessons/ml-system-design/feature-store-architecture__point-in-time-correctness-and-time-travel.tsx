import type { Component } from "solid-js";

const LessonFeatureStoreArchitecturePointInTimeCorrectnessAndTimeTravel: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Point in Time Correctness and Time Travel
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Point in Time Correctness Means
            </p>
            <p style="margin-top: 0">
              Point in time correctness prevents label leakage by ensuring
              training examples only see features that existed at the time of
              the example. When you join a labeled example with entity key and
              event timestamp to your feature tables, you must retrieve feature
              values where the feature event timestamp is less than or equal to
              the example timestamp. This "as of" join is critical: without it,
              future information leaks into training, inflating offline AUC by 5
              to 20 percent while online performance collapses.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Pattern
            </p>
            <p style="margin-top: 0">
              Uses windowed aggregations with lookback periods. For a 7 day
              rolling count feature, you compute the count over the window
              ending at the example timestamp, not at the current time. Airbnb
              Zipline enforces this with explicit "as of" semantics in their
              Spark based backfills, joining hundreds of feature pipelines to
              billions of examples while maintaining temporal consistency. The
              offline store typically partitions by event date and clusters by
              entity to accelerate these scans, turning full table scans into
              targeted partition reads that reduce compute time by 10 to 50x.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Time Travel
            </p>
            <p style="margin-top: 0">
              Extends this concept by snapshotting entire feature tables at
              specific versions. Using copy on write tables like Apache Hudi,
              you can reproduce the exact training dataset from 3 months ago by
              querying feature values at that historical commit. Hopsworks built
              this into their core with ACID upserts on lake tables, enabling
              model retraining with identical feature cuts and rollback when new
              features degrade performance. The cost is storage: keeping 6
              months of hourly snapshots for a 10 terabyte feature table
              requires 60 to 240 terabytes depending on change rate.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Failure Mode
            </p>
            <p style="margin-top: 0">
              Incorrect time filters or timezone bugs cause leakage. Symptoms
              include offline AUC of 0.95 dropping to online AUC of 0.78.
              Mitigation requires anti join validation on timestamps, automated
              checks that no feature event timestamp exceeds the example
              timestamp, and unifying transformation code paths between offline
              and online to eliminate skew.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Example Event</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    User 123 at 2024-01-15 10:00
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Join WHERE feature_time ≤ event_time
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Feature Values (Valid)</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    ✓ Click count 7d: 12 (computed at 09:45)
                    <br />✓ Last purchase: 2024-01-14 (before event)
                    <br />✓ Session length: 5 min (current session)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Feature Values (Leakage)</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    ✗ Click count 7d: 15 (updated at 10:30)
                    <br />✗ Purchase made: Yes (happened at 10:15)
                    <br />✗ Future signal from later timestamp
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
                  Point in time joins retrieve features where feature_event_time
                  is less than or equal to example_event_time, preventing label
                  leakage that can inflate offline AUC by 5 to 20 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Windowed aggregations compute over lookback periods ending at
                  the example timestamp, not current time; Airbnb joins hundreds
                  of feature pipelines to billions of examples with explicit as
                  of semantics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time travel using copy on write tables enables exact
                  reproduction of training datasets from months ago; Hopsworks
                  provides Atomicity Consistency Isolation Durability upserts
                  for rollback and retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage cost for time travel: 6 months of hourly snapshots on
                  10 terabyte features requires 60 to 240 terabytes, but
                  incremental upserts reduce this by 3 to 10 times versus full
                  table rewrites
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Failure detection: offline AUC significantly exceeding online
                  AUC (e.g., 0.95 vs 0.78) signals leakage; mitigation requires
                  anti join validation and unified transformation code
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
                  Airbnb Zipline computes 7 day rolling aggregates by filtering
                  feature events to [example_time minus 7 days, example_time],
                  producing reproducible training datasets with Spark based
                  backfills that partition prune by event date
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hopsworks uses Apache Hudi tables to snapshot feature groups
                  at each materialization; a model trained 3 months ago can be
                  exactly reproduced by querying the feature store at that
                  commit timestamp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreArchitecturePointInTimeCorrectnessAndTimeTravel;
