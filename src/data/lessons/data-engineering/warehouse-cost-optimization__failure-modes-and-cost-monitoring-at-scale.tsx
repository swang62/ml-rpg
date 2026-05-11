import type { Component } from "solid-js";

const LessonWarehouseCostOptimizationFailureModesAndCostMonitoringAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Cost Monitoring at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Why Cost Optimizations Fail:</strong> Even well-designed
            cost strategies break under real world conditions. Understanding
            failure modes and building robust monitoring prevents silent budget
            explosions.
            <strong>
              Failure Mode 1: Over-Partitioning Creates Performance Collapse
            </strong>
            Partitioning by high cardinality keys sounds logical but creates
            catastrophic overhead. If you partition a table by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            with 5 million unique users, you create 5 million partitions. Query
            planners must open and inspect metadata for thousands of partitions.
            On BigQuery or Snowflake, a query that should scan 1 GB might spend
            30 seconds just in planning phase, reading partition metadata.
            Actual scan time becomes irrelevant. Compute costs spike because
            every query runs longer. The fix: Keep partition counts in the
            hundreds. Use date or coarse geographic regions. For high
            cardinality dimensions like user ID, use clustering within
            partitions instead.
            <strong>Failure Mode 2: Data Skew and Hotspotting</strong>
            If you partition only by date in a system handling 10 TB per day,
            today's partition receives nearly all traffic while historical
            partitions sit idle. Queries against recent data hit maximum cluster
            capacity, causing queueing and slow response times. You end up
            scaling the entire cluster to handle a single hot partition. Worse,
            if your business has geographic concentration (80 percent of users
            in North America), clustering by region creates massive skew. The
            North America cluster is 4x larger than others, fragmenting data
            poorly. The fix: Hybrid partitioning by date plus a secondary
            dimension with more even distribution, or use hash-based
            partitioning for naturally skewed keys.
            <strong>
              Failure Mode 3: Pipeline Cascades from Under-Provisioned Compute
            </strong>
            Trying to save money with minimal cluster sizes can trigger
            cascading failures. Suppose your critical pipeline normally
            completes in 45 minutes but you size it for 60 minute windows to
            save costs. One day source volume is 20 percent higher. The pipeline
            runs 54 minutes, barely making it. The next day it starts late
            because the previous run overlapped with other jobs, competing for
            resources. Now it takes 70 minutes, missing the window entirely.
            Downstream pipelines waiting for this data start late. Within 3 days
            your entire schedule is shifted by hours, breaking SLAs across the
            board. Retries and backpressure cause upstream systems to queue
            data, actually increasing total resource consumption compared to
            just provisioning adequate headroom initially.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> A single misconfigured job scanning
              200 TB every 5 minutes might not trigger monthly budget alarms
              until you have already accumulated thousands of dollars in
              unexpected charges. Real-time monitoring at job granularity is
              essential.
            </div>
            <strong>
              Failure Mode 4: Shadow IT from Over-Restrictive Controls
            </strong>
            Enforcing strict query quotas or concurrency limits to control costs
            can backfire. If you limit analysts to 1 TB scanned per day or block
            queries over 10 seconds, they adapt by exporting data to local
            spreadsheets or setting up shadow databases. Now you have
            inconsistent metrics across teams, potential compliance violations
            from data in uncontrolled locations, and you have lost visibility
            into what data people actually need. The cost savings in the
            warehouse are offset by operational chaos and risk. The fix: Use
            quotas and monitoring as signals, not hard blocks. Educate users on
            efficient query patterns. Provide self-service tools that guide
            people toward optimized queries instead of just blocking expensive
            ones.
            <strong>Robust Cost Monitoring Architecture</strong>
            Cost alerts and budgets need granularity. Global monthly caps are
            too coarse. You need near real-time monitoring at multiple levels:
            First, per-job or per-pipeline metrics. Track compute time, data
            scanned, and estimated cost for each ETL job. Alert when a job
            suddenly scans 3x normal data volume, indicating a bug or schema
            change. Second, per-user or per-team usage. Identify which teams or
            individuals are driving costs. This is not about blame, but about
            targeting optimization efforts and education where they have the
            most impact. Third, per-table or per-dataset metrics. Track scan
            frequency and volume for each table. A table scanned 10,000 times
            per day with 500 GB per scan (5 PB total) is a prime candidate for
            better partitioning or pre-aggregation.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Cost Explosion Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    DAY 1 NORMAL
                  </div>
                  <div style="font-size: 16px; font-weight: 800">$500</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    DAY 2 BUG DEPLOYED
                  </div>
                  <div style="font-size: 16px; font-weight: 800">$2,000</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    DAY 5 UNDETECTED
                  </div>
                  <div style="font-size: 16px; font-weight: 800">$10,000</div>
                </div>
              </div>
            </div>
            Fourth, anomaly detection on time series. Baseline normal daily
            costs and alert on deviations. A sudden 50 percent cost increase
            might indicate a production issue like a broken filter causing full
            table scans. In a FAANG-style review, you should be able to explain:
            how you would detect that a new dashboard caused warehouse costs to
            spike 30 percent, and what specific levers you would pull (improve
            filters, adjust partitions, reduce query frequency, move heavy
            computations to scheduled aggregations instead of ad hoc queries).
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 4px">
                  Over-Partitioning Performance Impact
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Good: Date Partitioned (365 partitions)
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Query planning: &lt;1 second
                  </div>
                  <div style="margin-top: 2px; font-size: 12px">
                    Scan time: 5 seconds
                  </div>
                  <div style="margin-top: 4px; font-size: 11px; font-weight: 700">
                    Total: 6 seconds
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Bad: User ID Partitioned (5M partitions)
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Query planning: 30 seconds
                  </div>
                  <div style="margin-top: 2px; font-size: 12px">
                    Scan time: 2 seconds
                  </div>
                  <div style="margin-top: 4px; font-size: 11px; font-weight: 700">
                    Total: 32 seconds
                  </div>
                </div>
                <div style="margin-top: 6px; padding: 10px; border: 2px dashed; border-radius: 6px; text-align: center; font-size: 11px; font-style: italic">
                  Metadata overhead dominates when partition count explodes
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
                  Partitioning by high cardinality keys like user ID with
                  millions of values creates metadata overhead where query
                  planning takes 30 seconds, dominating actual scan time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Under-provisioned pipelines trigger cascading failures: a job
                  missing its window by 10 minutes causes downstream delays that
                  compound over days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A single misconfigured job scanning 200 TB every 5 minutes can
                  accumulate thousands of dollars before monthly budget alerts
                  trigger
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Over-restrictive query quotas drive analysts to export data to
                  shadow systems, creating compliance risks and inconsistent
                  metrics across teams
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
                  A production bug causes a nightly aggregation job to drop its
                  WHERE clause filter, scanning 200 TB instead of 2 TB. Without
                  per-job cost monitoring, this runs for 5 days before anyone
                  notices, adding $5,000 in unexpected charges.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery query on a table with 5 million user ID partitions
                  spends 30 seconds in planning phase reading partition
                  metadata, then only 2 seconds scanning 1 GB of actual data.
                  The same query on a date-partitioned table (365 partitions)
                  completes in 6 seconds total.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseCostOptimizationFailureModesAndCostMonitoringAtScale;
