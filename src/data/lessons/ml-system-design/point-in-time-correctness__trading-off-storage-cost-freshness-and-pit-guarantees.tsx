import type { Component } from "solid-js";

const LessonPointInTimeCorrectnessTradingOffStorageCostFreshnessAndPitGuarantees: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trading Off Storage Cost, Freshness, and PIT Guarantees
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Storage Cost Amplification
            </p>
            <p style="margin-top: 0">
              Achieving Point in Time (PIT) correctness requires explicit trade
              offs between storage cost, feature freshness, and correctness
              guarantees. Maintaining historical feature versions amplifies
              storage 1.5 to 3 times versus current state only tables, with cost
              scaling linearly with retention window (7 to 90 days) and update
              churn rate. High frequency features updated every second cost 10
              to 100 times more to version than daily batch features due to log
              growth and compaction overhead.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Freshness vs Correctness
            </p>
            <p style="margin-top: 0">
              Freshness and PIT correctness create tension. Streaming features
              achieve seconds of freshness but require careful watermark tuning
              to handle late events correctly. Setting watermarks too tight (5
              seconds) causes late events to be dropped, corrupting aggregates.
              Setting watermarks too loose (1 hour) delays feature availability.
              Production systems tune per feature based on source lateness
              distributions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tiered Retention Strategy
            </p>
            <p style="margin-top: 0">
              Implement different retention policies by feature criticality.
              High value features for model training keep 90 day history at full
              resolution. Medium value features keep 30 days full resolution
              plus 90 days downsampled (daily snapshots). Low value features
              keep 7 days and rely on recomputation for older joins. This
              stratified approach cuts storage 3 to 5x versus uniform retention.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Approximate PIT for Cost Savings
            </p>
            <p style="margin-top: 0">
              When exact PIT is prohibitively expensive, approximate approaches
              trade correctness for efficiency. Snapshotting features at fixed
              intervals (hourly, daily) instead of per event reduces storage
              dramatically but introduces up to one interval of temporal error.
              For features with low update frequency or models tolerant to small
              distributional shifts, this approximation is acceptable.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Monitoring Trade-off Impact
            </p>
            <p style="margin-top: 0">
              Track distribution drift between exact PIT joins and approximate
              joins. If PSI stays below 0.1, the approximation is acceptable.
              Alert when drift exceeds thresholds and re-evaluate the cost
              correctness trade off.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage amplification of 1.5 to 3 times versus current state
                  tables scales with retention window (7 to 90 days) and update
                  frequency, with high churn features costing 10 to 100 times
                  more than batch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dual correctness model trades real time freshness for
                  stability: online eventually correct with p99 age 1 to 5
                  minutes, offline fully correct with backfills applied
                  retroactively
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Constraining features to declarative DSL with fixed windows
                  and standard aggregations enables PIT guarantees and caching
                  for 10 millisecond latency versus 100 plus millisecond UDFs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temporal as of joins cost 1.5 to 4 times more compute than
                  naive latest value joins at 100 million plus row scale due to
                  partitioning, sorting, and windowing overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Acceptable to relax PIT for cross sectional problems with
                  instantaneous labels and static features, or exploratory
                  prototyping, but production time dependent models require
                  strict enforcement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Improved model accuracy of 5 to 20 percent and reproducibility
                  for audits and rollbacks justify the 2 to 3 times storage and
                  compute cost in production ML systems
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
                  Uber Palette: Uses 30 day retention for rapid experimentation,
                  90 day for regulated ride safety models. High frequency GPS
                  features use aggressive compaction while daily batch features
                  use simple append only logs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation: Online serves from cache with p99 5
                  minute feature age for stability, offline training uses
                  backfilled complete history with late arrivals corrected up to
                  24 hours after original event
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature DSL example: user.click_count(window=7d,
                  aggregation=sum) is PIT safe and cacheable at 5ms p99, versus
                  arbitrary Python lambda that recomputes on each request at 50
                  to 100ms latency
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPointInTimeCorrectnessTradingOffStorageCostFreshnessAndPitGuarantees;
