import type { Component } from "solid-js";

const LessonDataProfilingFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>When Profiling Systems Break:</strong>
          Data profiling is itself a complex distributed system, and
          understanding its failure modes is critical for building reliable data
          platforms. These failures often cascade, turning data quality issues
          into production incidents.
          <strong>Stale Statistics Misleading Optimizers:</strong>
          In rapidly changing datasets, statistics go stale quickly. A query
          optimizer using yesterday's cardinality estimates may choose a nested
          loop join expecting 1,000 matching rows, but the table grew 100x
          overnight. The query that ran in 2 seconds now takes 5 minutes, timing
          out and failing dashboards. This is particularly painful during
          product launches or traffic spikes. Statistics collected during normal
          10,000 Queries Per Second (QPS) traffic become wrong when QPS jumps to
          50,000. Systems like BigQuery and Snowflake update stats adaptively,
          but extreme volatility outpaces updates. The mitigation is either
          profiling more frequently during known volatile periods (expensive) or
          using robust query plans that degrade gracefully with wrong estimates
          (complex).
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Query Latency With Stale Stats
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">FRESH STATS</div>
                <div style="font-size: 16px; font-weight: 800">2 sec</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  STALE (100x growth)
                </div>
                <div style="font-size: 16px; font-weight: 800">5 min</div>
              </div>
            </div>
          </div>
          <strong>Profiling Jobs Saturating Production:</strong>
          Heavyweight profiling can become a Denial of Service (DoS) attack on
          your own infrastructure. A nightly job profiling 50 TB at peak
          business hours increases read IOPS by 40 percent, throttling Extract
          Transform Load (ETL) pipelines and pushing their Service Level
          Agreement (SLA) from 2 hours to 4 hours. The failure cascades: delayed
          ETL means stale dashboards, which triggers manual investigations
          consuming engineering time, which delays feature work. The root cause
          was not planning for profiling's resource needs. The fix is capacity
          isolation: dedicated compute pools for profiling, off peak scheduling,
          or rate limiting I/O to stay below impact thresholds.
          <strong>Semantically Wrong Rules Creating Alert Fatigue:</strong>
          Data quality rules can be logically incorrect, eroding trust in
          monitoring. A rule enforcing{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            age
          </code>{" "}
          between 0 and 120 fires constantly on test environments using
          synthetic ages like 999. A rule requiring non null{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            country
          </code>{" "}
          is valid for registered users but breaks guest checkout flows where
          country is collected after order creation. After enough false
          positives, teams ignore alerts. Then a real data quality incident
          (payment amounts suddenly all zero due to a code bug) gets missed
          because the alert is just another noisy ping. The solution is aligning
          rules with business semantics: separate validation for production
          versus test data, context aware rules per user journey, and ruthless
          pruning of low signal alerts.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> Alert fatigue from noisy profiling
            rules is a critical failure mode. One team ignored 50 daily false
            positives, then missed a real bug that corrupted 2 million financial
            records over 3 days.
          </div>
          <strong>Skewed Distributions Hiding Segmented Issues:</strong>
          Extreme skew masks problems. In a catalog with one product
          representing 60 percent of orders, overall statistics remain stable
          even when 20 smaller products have bugs. Average order value, null
          rates, and distinct customer counts all look normal because the
          dominant product dilutes the signal. This is especially dangerous in
          ML pipelines. A model trained on skewed data appears to have good
          aggregate metrics (90 percent accuracy) but fails completely on
          minority segments (10 percent accuracy for rare categories). Profiling
          must be stratified: compute statistics per meaningful cohort (region,
          product category, user segment) to catch localized degradation.
          <strong>The Cold Start Problem:</strong>
          New datasets have no historical baseline. Profiling a brand new table
          produces statistics, but are they good? You have no 7 day moving
          average to compare against. Early alerts are pure guesses, leading to
          either too many false positives or missed real issues. The workaround
          is bootstrapping from similar tables, using domain knowledge to set
          initial bounds, then iteratively tightening thresholds as you collect
          history. For the first 30 days, alerts might be informational only,
          requiring human judgment before taking action.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="text-align: center; font-weight: 700; margin-bottom: 12px; font-size: 14px">
              Profiling Job Impact on ETL Pipeline
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
              <div style="display: flex; gap: 8px; align-items: center; width: 100%">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                  <strong>Normal</strong>
                  <div style="margin-top: 4px">ETL: 2 hrs</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                  <strong>Profile Starts</strong>
                  <div style="margin-top: 4px">+40% IOPS</div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                  <strong>ETL Slows</strong>
                  <div style="margin-top: 4px">Now 4 hrs</div>
                </div>
              </div>
              <div style="font-size: 18px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; width: 90%; text-align: center; font-size: 12px">
                <strong>CASCADE:</strong> Stale dashboards → Manual
                investigations → Engineering time lost
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
                Stale statistics from rapidly changing data mislead query
                optimizers, turning 2 second queries into 5 minute timeouts when
                table growth outpaces stat updates
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Profiling jobs without capacity planning can saturate
                production, increasing IOPS by 40 percent and pushing ETL SLAs
                from 2 hours to 4 hours
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Semantically wrong validation rules create alert fatigue,
                causing teams to ignore notifications and miss real bugs that
                corrupt millions of records
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Skewed distributions hide segmented issues: one dominant product
                at 60 percent of volume masks bugs in 20 smaller products,
                requiring stratified profiling per cohort
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
                A query optimizer uses stale cardinality estimate of 1,000 rows
                but actual table grew to 100,000 overnight, choosing nested loop
                join that degrades from 2 seconds to 5 minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Alert rule requiring non-null &lt;code&gt;country&lt;/code&gt;
                fires constantly on guest checkout flow where country is
                collected after order creation, causing team to ignore alerts
                and miss real payment bug
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataProfilingFailureModesAndEdgeCases;
