import type { Component } from "solid-js";

const LessonWarehouseArchitectureFailureModesWhatBreaksAt10xScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: What Breaks at 10x Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Data Quality Failures:</strong>
            The most common production incident is not infrastructure failure,
            it's bad data silently propagating through pipelines. A microservice
            deploys a schema change, renaming{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_total
            </code>{" "}
            to{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              total_amount
            </code>
            . Your ingestion pipeline keeps reading the old column, which is now
            always null. Revenue dashboards show zero dollars for three days
            before anyone notices. At advertising companies, a 1% undercount in
            ad spend metrics can mean millions in lost revenue or compliance
            issues. You need schema validation at ingestion, data quality checks
            at every transformation stage (validate row counts, null ratios,
            distribution shifts), and alerting when metrics fall outside
            expected ranges.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Implement circuit breakers in
              pipelines. If an hourly job detects row counts dropped by more
              than 20% compared to the same hour last week, pause the pipeline
              and alert before propagating bad data to gold tables.
            </div>
            <strong>Late and Out of Order Data:</strong>
            Event streams do not arrive in perfect order. A mobile app loses
            network, queues events locally, then uploads them 2 hours later. If
            you compute hourly revenue aggregates with strict time windows, you
            undercount. The event with{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              event_time = 14:30
            </code>{" "}
            arrives at{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              processing_time = 16:45
            </code>
            , missing the 14:00 to 15:00 window. Typical production systems
            allow a grace period: windows stay open for late data up to 1 to 6
            hours depending on business requirements. After the grace period
            closes, a backfill mechanism recomputes affected aggregates. For
            financial metrics, you might keep windows open for 24 hours and run
            a final reconciliation job nightly to catch all late arrivals.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Late Data Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WITHOUT GRACE PERIOD
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    5% undercount
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WITH 6 HOUR WINDOW
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    &lt;0.1% undercount
                  </div>
                </div>
              </div>
            </div>
            <strong>Skew and Hotspots:</strong>
            In a distributed system, work is partitioned across compute nodes.
            If partitioning is naive (for example, hash on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              customer_id
            </code>
            ), one large customer with 10x more data causes one task to run 10x
            longer. The entire job waits for the slowest task. This is
            especially painful for joins. Joining users to events where one bot
            user has 1 million events while normal users have 10 creates a
            massive skew. One partition processes 1 million rows while others
            process 10, and p99 latency explodes even though p50 is fine.
            Mitigations include salting: add a random suffix to skewed keys to
            split them across multiple partitions. For the bot user, you might
            split their events into 100 partitions, each processing 10,000 rows,
            bringing them in line with normal users. You can also use adaptive
            query execution that detects skew at runtime and repartitions
            dynamically.
            <strong>Runaway Queries and Cost Explosions:</strong>
            Someone runs{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              SELECT * FROM events e JOIN users u ON e.user_id = u.id
            </code>{" "}
            without a{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE
            </code>{" "}
            clause, joining 10 TB of events to 100 GB of users. The query scans
            10 TB, spins up 200 compute nodes, runs for 15 minutes, and costs
            $150. In BigQuery, that is 2 TB scanned at $5 per TB. Do this 10
            times a day and you have a $1,500 daily surprise. Production
            warehouses enforce query limits: maximum runtime (10 to 30 seconds
            for ad hoc, 5 minutes for scheduled), maximum scanned bytes (1 TB
            per query for exploratory), and per user cost budgets. When a query
            exceeds limits, it gets killed automatically. You also implement
            query reviews: queries scanning over 1 TB require manager approval
            and optimization before running.
            <strong>Eventual Consistency and Stale Views:</strong>
            Your architecture has latency at every stage. CDC has 1 minute lag,
            transformation runs every 10 minutes, and materialized views refresh
            every 15 minutes. A user places an order at 10:00, but your revenue
            dashboard might not reflect it until 10:16. If you also have a real
            time event stream showing order count with 30 second lag, the
            dashboard briefly shows inconsistent numbers: order count increased
            but revenue did not. This confuses executives who expect numbers to
            match. You need clear data freshness indicators on dashboards:
            "Revenue data as of 10:15, Order count as of 10:00." For critical
            metrics, you might invest in a faster path: stream events directly
            to an OLAP engine like Druid or ClickHouse with sub minute latency,
            accepting higher cost for real time visibility.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; font-weight: 700; margin-bottom: 12px; font-size: 14px">
                Late Data Timeline
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; align-items: center; gap: 10px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>14:30</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Event occurs
                    </div>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>15:00</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Window closes
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>16:45</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Event arrives (late)
                    </div>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>21:00</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Backfill corrects
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 1px solid; border-radius: 4px; font-size: 11px; text-align: center">
                Grace period: 6 hours | Final reconciliation: nightly at 21:00
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
                  Schema changes at source systems are the most common cause of
                  data quality incidents. Implement validation at ingestion and
                  circuit breakers that pause pipelines when row counts drop by
                  more than 20%.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late data causes undercounts. Production systems keep
                  aggregation windows open for 1 to 6 hours and run nightly
                  backfills to recompute affected metrics, reducing undercount
                  from 5% to under 0.1%.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Skew from large customers or bot users causes one partition to
                  process 10x more data, making p99 latency 10x worse than p50.
                  Salting keys or adaptive repartitioning splits hot keys across
                  multiple partitions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Runaway queries without limits can scan 10 TB and cost $150
                  each. Enforce maximum runtime (30 seconds ad hoc), maximum
                  scanned bytes (1 TB), and require approval for queries over
                  thresholds.
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
                  An e-commerce company's revenue dropped to zero in dashboards
                  after a microservice renamed
                  &lt;code&gt;order_total&lt;/code&gt; to
                  &lt;code&gt;total_amount&lt;/code&gt;. Adding schema
                  validation at ingestion caught this in staging before
                  production.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A social network with 10 million events per hour saw p99 query
                  latency jump from 3 seconds to 45 seconds due to one bot
                  account with 1 million events. Salting the bot's
                  &lt;code&gt;user_id&lt;/code&gt; across 100 partitions brought
                  p99 back to 4 seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber's data platform keeps aggregation windows open for 6
                  hours to capture 99.9% of late arrivals, then runs a nightly
                  reconciliation at 2am to backfill the remaining 0.1% and
                  ensure financial metrics are accurate.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseArchitectureFailureModesWhatBreaksAt10xScale;
