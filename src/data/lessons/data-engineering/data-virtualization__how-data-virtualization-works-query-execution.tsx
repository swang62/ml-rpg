import type { Component } from "solid-js";

const LessonDataVirtualizationHowDataVirtualizationWorksQueryExecution: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Data Virtualization Works: Query Execution
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Mechanism:
            </div>
            When a user runs a query against a virtual table, the virtualization
            engine performs a complex orchestration dance. It starts by
            consulting its metadata catalog, which maps virtual schemas to
            physical sources. This catalog contains crucial information about
            where each attribute lives, what data types exist in each source,
            and statistics like row counts and query latency. The engine then
            generates an execution plan using cost based optimization. It
            analyzes the query to determine which parts can be pushed down to
            source systems and which must be computed in the virtualization
            layer. For example, filtering on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              customer_id = 12345
            </code>{" "}
            gets pushed to each source to minimize data transfer. Aggregations
            like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              SUM(order_total)
            </code>{" "}
            might be pushed to a warehouse but computed locally for a slow API.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Parse and Plan:</strong> Engine parses the SQL query,
                  consults metadata to understand which sources can serve each
                  attribute, and generates an optimized execution plan with
                  parallel subqueries.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Predicate Pushdown:</strong> Filters, projections, and
                  aggregations are pushed to source systems to reduce data
                  transfer. A filter on high cardinality columns reduces result
                  sets by 10x to 100x before network transmission.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Parallel Execution:</strong> Subqueries execute
                  concurrently across sources. Platforms may issue 10 to 50
                  parallel requests per large source to maximize throughput
                  while respecting rate limits.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Join and Finalize:</strong> Partial results stream
                  back to the engine, which performs in memory joins, applies
                  transformations, and enforces security policies before
                  returning the final result set.
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Performance:
            </div>
            Consider a dashboard querying last week revenue by region and
            marketing channel. The query touches a Snowflake warehouse with 500
            TB of historical events, a CRM for campaign metadata, and 3 regional
            PostgreSQL databases for recent orders not yet loaded to the
            warehouse.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Query Execution
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">300-800ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    PER SOURCE P95
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    &lt; 2 sec
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    END TO END P95
                  </div>
                </div>
              </div>
            </div>
            The engine issues parallel subqueries with pushed down filters.
            Snowflake returns aggregated revenue in 400ms. The CRM API responds
            with campaign data in 600ms. PostgreSQL instances each return recent
            orders in 200ms to 300ms. The engine joins results and finalizes in
            under 100ms, achieving sub 2 second total latency for the dashboard.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Execution involves cost based optimization that decides which
                  operations to push to sources versus compute locally based on
                  statistics like cardinality and latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Predicate pushdown is critical for performance, reducing data
                  transfer by 10x to 100x by filtering at the source before
                  network transmission
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parallel execution across sources is essential, with platforms
                  issuing 10 to 50 concurrent subqueries per large source to
                  maximize throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical production systems target per source p95 latencies of
                  300 to 800ms and end to end query latencies under 2 seconds
                  for dashboard use cases
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
                  A query for customer lifetime value joins a data warehouse
                  (historical purchases), Salesforce (customer segments), and
                  PostgreSQL (recent orders). The engine pushes date filters to
                  all sources, reducing warehouse scan from 500 TB to 5 GB,
                  fetches 10,000 customer records from Salesforce, and retrieves
                  50,000 recent orders from PostgreSQL, joining all in memory in
                  under 1.5 seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Platforms like Denodo use query caching to improve repeat
                  dashboard performance. After the first execution taking 2
                  seconds, subsequent identical queries within a 5 minute time
                  to live window return results in under 100ms from cache,
                  reducing load on backend systems.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVirtualizationHowDataVirtualizationWorksQueryExecution;
