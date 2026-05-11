import type { Component } from "solid-js";

const LessonDataGovernanceFrameworkDataQualityMonitoringAndSlaEnforcement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Data Quality Monitoring and SLA Enforcement
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Observability Challenge:</strong> At scale, you cannot
            manually verify data quality. With tens of thousands of tables and
            petabytes of data being processed daily, you need automated systems
            that continuously monitor freshness, completeness, accuracy, and
            distribution shifts. This is where governance intersects with data
            quality. A production quality monitoring system tracks three
            categories of metrics for each dataset.{" "}
            <strong>Freshness metrics</strong> measure when data was last
            updated. For a core revenue table, you might require updates every
            hour with p95 pipeline completion under 10 minutes.{" "}
            <strong>Completeness metrics</strong> check null rates and record
            counts. A daily user activity summary should have less than 0.1
            percent null rate on key dimensions.{" "}
            <strong>Distribution metrics</strong> detect anomalies: if average
            order value suddenly jumps by 3 standard deviations, something is
            wrong.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Quality Monitoring Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">30 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    ALERT THRESHOLD
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt; 0.1%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    NULL RATE TARGET
                  </div>
                </div>
              </div>
            </div>
            <strong>How Enforcement Works:</strong> Pipelines emit metrics about
            record counts, null rates, distribution histograms, and latency to a
            central quality service. A rules engine compares these against
            expectations defined in governance metadata. Rules have severity
            levels. If a core fact table freshness exceeds SLA by 30 minutes,
            the system pages the data owner and posts to incident channels. If a
            non critical dimension table has a 5 percent increase in null
            values, it logs a warning but does not block. Here's where it gets
            interesting: quality monitoring must balance availability against
            correctness. Aggressive enforcement (fail pipelines on minor schema
            or distribution changes) improves correctness but reduces
            availability. A streaming feature pipeline that blocks on slight
            schema drift may degrade machine learning serving availability below
            the desired 99.9 percent. More tolerant policies keep systems up but
            risk silent quality regressions.
            <strong>Real Production Pattern:</strong> Netflix and Uber describe
            integrating quality status directly into data portals. Before using
            a dataset, you see: green (fresh and healthy), yellow (SLA warning),
            or red (SLA violation or quality failure). This prevents analysts
            from building dashboards on stale data or ML engineers from training
            models on datasets with active quality issues.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> The most dangerous failure mode
              is false confidence. A dashboard shows green status, but the
              underlying rules are incomplete. For example, a revenue table
              passes basic null checks, yet a change in source field semantics
              was not captured, causing 5 percent revenue under reporting for a
              week. Column level lineage and semantic versioning help catch
              these issues.
            </div>
            <strong>The Implementation Trade-off:</strong> Rich quality
            monitoring adds overhead. Capturing detailed distribution histograms
            for every column in every partition can increase pipeline runtime by
            5 to 10 percent and storage by similar amounts. Some teams implement
            tiered monitoring: critical datasets get full monitoring, while
            exploratory datasets get basic checks only. The governance metadata
            specifies which tier each dataset belongs to, driving automated
            monitoring configuration.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data quality monitoring tracks freshness (update recency),
                  completeness (null rates), and distribution (anomaly
                  detection) for each dataset
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems use severity based alerting: core table
                  missing 30 minute SLA triggers pages, non critical table with
                  5% null increase logs warnings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Aggressive quality enforcement improves correctness but
                  reduces availability, creating a fundamental trade-off between
                  failing fast and keeping systems running
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quality status is exposed in data portals (green/yellow/red
                  indicators) so users know freshness and health before building
                  dashboards or training models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detailed monitoring adds 5 to 10 percent overhead in runtime
                  and storage, leading to tiered monitoring approaches where
                  critical datasets get full checks
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
                  A revenue table with hourly updates requires: p95 completion
                  under 10 minutes, less than 0.1% null rate on revenue amount,
                  and distribution within 3 standard deviations of 30 day moving
                  average
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When a pipeline processes user activity events, completeness
                  checks verify expected record counts per region per hour,
                  alerting if any region shows more than 20% deviation from
                  historical patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A feature store serving ML models might tolerate 5 minute
                  freshness SLA violations for non critical features but require
                  sub minute recovery for features affecting real time bidding
                  systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataGovernanceFrameworkDataQualityMonitoringAndSlaEnforcement;
