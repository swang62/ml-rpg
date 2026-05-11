import type { Component } from "solid-js";

const LessonWarehouseArchitectureProductionRealityConcurrencyGovernanceAndOperationalLimits: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Reality: Concurrency, Governance, and Operational Limits
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Concurrency Challenge:</strong>
            Your warehouse might ingest 5 to 50 TB daily, but the real stress
            test is 9am when 500 analysts show up, each running queries. Some
            scan billions of rows, some hit the same hot tables, and one person
            inevitably joins two 10 TB tables without a filter, consuming the
            entire compute cluster. Modern warehouses handle this through
            workload management. They segment compute into pools: one for
            critical production dashboards with guaranteed resources, one for
            scheduled jobs, and one for ad hoc exploration with lower priority.
            When the ad hoc pool is idle, it can shrink to near zero. When
            someone runs a heavy query, it spins up but with limits on maximum
            nodes and query runtime.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> BigQuery charges per byte scanned.
              A query scanning 10 TB costs around $50. Teams implement query
              cost budgets per user and require queries over 1 TB scanned to be
              reviewed. This forces query optimization and prevents accidental
              runaway costs.
            </div>
            <strong>Query Performance at Scale:</strong>
            Without optimization, analytical queries get slower as data grows. A
            query joining orders and customers might run in 2 seconds on 10
            million rows, but hit 2 minutes on 1 billion rows. The warehouse
            uses several techniques: First, columnar storage means reading only
            the columns you need. Scanning{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            and{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              revenue
            </code>{" "}
            from a table with 50 columns reads only 4% of the data versus row
            based storage that reads everything. Second, partitioning on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              date
            </code>{" "}
            means queries with{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE date = '2024-01-15'
            </code>{" "}
            skip 99% of partitions. Clustering within partitions on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            further reduces scanned data when filtering by user. Third, result
            caching and materialized views precompute common aggregates. A
            dashboard showing daily revenue by region hits a materialized view
            that updates every 10 minutes, returning results in under 100ms
            instead of scanning raw transaction tables for 5 seconds.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Query Performance Optimizations
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">25x</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COLUMNAR SPEEDUP
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100x</div>
                  <div style="font-size: 10px; font-weight: 600">
                    PARTITION PRUNING
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50x</div>
                  <div style="font-size: 10px; font-weight: 600">
                    MATERIALIZED VIEWS
                  </div>
                </div>
              </div>
            </div>
            <strong>Governance and the Semantic Layer:</strong>
            Without governance, every team implements "active users"
            differently. Marketing counts anyone who logged in last 30 days.
            Product counts users with 3+ sessions last week. Finance counts
            paying customers. Dashboards show conflicting numbers and executives
            lose trust. A semantic layer solves this by defining metrics once in
            a central model. All BI tools and queries go through this layer,
            which translates business terms into the correct SQL. When the
            definition changes, it updates everywhere automatically. This is
            critical at scale: companies like Airbnb have thousands of
            dashboards, and manually updating each would be impossible.
            <strong>Handling Data Quality and Freshness:</strong>
            Production warehouses continuously monitor data quality. Each
            transformation stage validates row counts, null ratios, and
            distribution shifts. If daily orders suddenly drop by 50%, the
            pipeline pauses and alerts before propagating bad data to gold
            tables. Freshness is tracked per table. Dashboards display "last
            updated" timestamps. Critical tables have SLAs: revenue metrics must
            be fresh within 15 minutes during business hours. If an upstream job
            fails and a table goes stale past its SLA, on call engineers get
            paged.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Workload management segments compute into pools (production,
                  scheduled, ad hoc) with different priorities and resource
                  limits, preventing one heavy query from starving others.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar storage, partitioning, and clustering combine to
                  reduce scanned data by 100x or more. A query filtering on date
                  and user_id might scan 10 GB instead of 1 TB.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Semantic layers enforce consistent metric definitions. Without
                  this, different teams compute "revenue" differently, leading
                  to conflicting dashboards and loss of trust.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data quality checks at each transformation stage catch
                  anomalies before they propagate. A 50% drop in row counts
                  triggers alerts and pauses the pipeline automatically.
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
                  BigQuery charges $5 per TB scanned. A team sets per user
                  budgets of $100 per month and requires manager approval for
                  queries over 1 TB, reducing accidental $500 queries.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb's semantic layer defines 500+ metrics used across
                  thousands of dashboards. When the definition of "booking"
                  changed to exclude cancellations, all dashboards updated
                  automatically.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A clustered table sorted by &lt;code&gt;user_id&lt;/code&gt;
                  lets a query filtering on 100 specific users scan 0.1% of the
                  table instead of the entire 10 TB dataset, reducing latency
                  from 45 seconds to 400ms.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseArchitectureProductionRealityConcurrencyGovernanceAndOperationalLimits;
