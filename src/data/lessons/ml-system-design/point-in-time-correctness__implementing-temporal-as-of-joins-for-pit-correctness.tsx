import type { Component } from "solid-js";

const LessonPointInTimeCorrectnessImplementingTemporalAsOfJoinsForPitCorrectness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementing Temporal As Of Joins for PIT Correctness
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The As Of Join Algorithm
            </p>
            <p style="margin-top: 0">
              The as of join is the fundamental algorithm for Point in Time
              (PIT) correctness, solving the problem of matching each training
              label to the exact feature values available at label time. For a
              label row with entity ID and label time, the join selects the
              latest feature record where event timestamp is less than or equal
              to label time. This differs from standard joins which match on
              exact equality or use current values.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Naive vs Optimized Implementation
            </p>
            <p style="margin-top: 0">
              The naive approach of sorting all feature history and scanning for
              each label results in O(n * m) complexity for n labels and m
              feature records. Production systems optimize using range
              partitioning by entity ID, then merge joining sorted streams. This
              achieves O((n + m) * log(n + m)) complexity. For billion row
              datasets, this difference means hours versus days of compute time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Spark SQL Implementation
            </p>
            <p style="margin-top: 0">
              Spark implements as of joins using window functions with ROWS
              BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, partitioned by entity
              ID and ordered by timestamp. The query selects the most recent
              feature row for each label timestamp using LAST_VALUE or row
              numbering with rank = 1. Optimizations include broadcast joining
              small dimension tables and using bucketed storage for large
              feature tables.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Streaming Implementation
            </p>
            <p style="margin-top: 0">
              In Flink and Kafka Streams, temporal joins use versioned state
              tables keyed by entity ID. Each lookup retrieves the latest state
              as of the event timestamp. Watermarks define how long to wait for
              late events before finalizing joins. The challenge is balancing
              state retention (memory cost) against late event handling
              (correctness).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Validation
            </p>
            <p style="margin-top: 0">
              Always validate that no feature timestamp exceeds the label
              timestamp in joined output. Run anti join checks in CI pipelines
              to catch temporal violations before training begins.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  As-Of Join: Label at 10:30 AM
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Feature History (user_123)
                  </strong>
                  <div style="font-size: 12px; margin-top: 8px; line-height: 1.6">
                    9:00 AM → clicks = 5<br />
                    9:45 AM → clicks = 8<br />
                    10:15 AM → clicks = 12
                    <br />
                    10:50 AM → clicks = 15
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Join Selects: clicks = 12
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Latest value where event_time ≤ 10:30 AM
                    <br />
                    (10:15 AM record used, 10:50 AM excluded)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; margin-top: 4px">
                  <strong style="font-size: 12px">
                    Cost: 1.5-4x vs simple latest-value join
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
                  Partition by entity ID then sort by event time within
                  partitions for last observation carried forward, avoiding full
                  table scans at 100 million plus row scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre bucket by day or hour to bound scan sizes, with caching of
                  frequent entity ID and day lookups to reduce repeated temporal
                  scans in production pipelines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Window semantics must be explicit with clear
                  inclusive/exclusive boundaries like [t minus 7 days, t) to
                  avoid off by one errors that inflate offline metrics but
                  degrade online serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving data requires watermarks (for example, p99.9
                  within 2 hours) and acceptance windows (24 to 72 hours), with
                  events beyond window applied retroactively offline only
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Offline PIT join throughput typically 50 to 200 million joined
                  rows per hour per node for wide 50 to 200 feature datasets
                  with proper partitioning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  All timestamps stored in single standard like UTC with
                  monotonicity validation per entity to prevent clock skew
                  causing leakage or missing joins at boundaries
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
                  Uber Palette point in time joiner service builds training sets
                  by partitioning 1 billion row datasets by entity, sorting by
                  event time, and caching frequent temporal lookups to achieve
                  hour scale dataset generation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline computes windowed aggregates like 7/30/90 day
                  counts with explicit window end at event time, enforcing UTC
                  timestamps and inclusive/exclusive semantics to prevent
                  boundary bugs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real join query: SELECT label.*, features.clicks FROM labels
                  LEFT JOIN LATERAL (SELECT clicks FROM feature_history WHERE
                  entity_id = labels.entity_id AND event_time &lt;=
                  labels.label_time ORDER BY event_time DESC LIMIT 1) features
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPointInTimeCorrectnessImplementingTemporalAsOfJoinsForPitCorrectness;
