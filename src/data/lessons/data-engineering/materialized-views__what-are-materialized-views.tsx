import type { Component } from "solid-js";

const LessonMaterializedViewsWhatAreMaterializedViews: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What are Materialized Views?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              A <strong>materialized view</strong> is physical storage of a
              query result that is automatically kept in sync with base data.
              Unlike a regular view (which is just a saved query that runs fresh
              each time), a materialized view stores actual precomputed results
              that you can query instantly.
            </div>
          </div>
          <strong>The Core Problem:</strong> Analytical queries over large
          datasets are prohibitively slow. Computing daily active users or
          revenue per region over billions of events can take 10 to 60 seconds
          on raw tables. Product dashboards need to feel responsive with p95
          latency under 500 to 800 ms at high query rates, often 100 to 1000
          queries per second across internal users. Running heavy aggregations
          for every single request simply does not meet these requirements. The
          same patterns get repeated constantly: revenue by region for last 30
          days, user retention cohorts, p95 latency metrics. You end up doing
          the same expensive computation thousands of times per day.
          <strong>How Materialized Views Solve This:</strong> Instead of
          scanning billions of raw events each time, the system precomputes
          results and stores them. When someone queries "DAU by country for last
          30 days," they read a 30 row summary table instead of scanning 30
          billion raw events.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Query Performance Impact
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  RAW DATA SCAN
                </div>
                <div style="font-size: 16px; font-weight: 800">30 sec</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  MATERIALIZED VIEW
                </div>
                <div style="font-size: 16px; font-weight: 800">&lt; 100 ms</div>
              </div>
            </div>
          </div>
          <strong>Common Aggregation Types:</strong> Materialized views
          typically store aggregations like counts, sums, averages, percentiles,
          and rollups grouped by dimensions such as time, user ID, region, or
          device type. The key is identifying which computations get repeated
          and are expensive enough to justify the maintenance overhead.
          <strong>The Trade:</strong> You exchange extra storage space plus
          maintenance complexity for dramatically faster reads and predictable
          performance. Every platform implements this differently: BigQuery,
          Snowflake, ClickHouse, and Databricks all offer variants with
          different refresh strategies and integration approaches.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Raw Events Table</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  30 billion rows
                </div>
              </div>
              <div style="display: flex; gap: 24px; align-items: center">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                  <div style="font-size: 20px; font-weight: bold">↓</div>
                  <div style="font-size: 11px; text-align: center">
                    Regular Query
                    <br />
                    30 sec
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                  <div style="font-size: 20px; font-weight: bold">↓</div>
                  <div style="font-size: 11px; font-weight: 600; text-align: center">
                    Precomputed
                    <br />
                    Once
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 16px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; opacity: 0.4">
                  <strong style="font-size: 13px">Dashboard Query</strong>
                  <div style="font-size: 11px; margin-top: 4px">Slow path</div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Materialized View</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    30 rows, &lt; 100ms
                  </div>
                </div>
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
                A materialized view stores physical precomputed query results,
                unlike regular views which are just saved queries that execute
                fresh each time
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Solves the problem of repeated expensive aggregations: reading
                30 precomputed rows in under 100 ms versus scanning 30 billion
                raw events in 30 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Common use cases include metrics aggregations like daily active
                users, revenue rollups, and percentile calculations grouped by
                time or dimensions
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The fundamental trade is extra storage plus maintenance overhead
                in exchange for dramatically faster query latency and
                predictable performance at scale
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
                Dashboard showing "DAU by country for last 30 days" queries a 30
                row daily summary materialized view instead of scanning billions
                of raw clickstream events
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Analytics platform maintaining per minute aggregates per user
                and region, which are 1000 times smaller than raw events but
                flexible enough to roll up into hourly and daily metrics
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonMaterializedViewsWhatAreMaterializedViews;
