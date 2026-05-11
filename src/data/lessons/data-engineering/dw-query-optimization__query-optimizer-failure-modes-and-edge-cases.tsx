import type { Component } from "solid-js";

const LessonDwQueryOptimizationQueryOptimizerFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Query Optimizer Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Catastrophic Plan Selection:</strong>
            The most dangerous production incidents come not from missing
            indexes but from the optimizer choosing a catastrophically bad plan.
            The root cause is usually poor cardinality estimation. If statistics
            are stale or simplistic, the optimizer might believe a filter is
            highly selective when it actually matches millions of rows. Consider
            a query joining users to orders with a filter on{" "}
            <code>order_status = 'pending'</code>. If statistics from last month
            show 1% of orders are pending (10,000 rows), the optimizer might
            choose a nested loop join, reading 10,000 rows from orders and doing
            10,000 index lookups into users. This takes 100 milliseconds. But if
            pending orders grew to 40% (4 million rows) due to a processing
            backlog, that same nested loop join now does 4 million index lookups
            taking over 60 seconds p99. The query itself did not change. The
            data distribution changed, but stale statistics misled the
            optimizer.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Stale Statistics Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">EXPECTED</div>
                  <div style="font-size: 16px; font-weight: 800">10K rows</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">ACTUAL</div>
                  <div style="font-size: 16px; font-weight: 800">4M rows</div>
                </div>
              </div>
            </div>
            <strong>Data Skew in Distributed Systems:</strong>
            Distributed query engines partition work across multiple workers,
            often using hash distribution on join keys. If the join key is
            highly skewed, disaster follows. Imagine joining customer orders
            where one enterprise customer accounts for 40% of all orders. A hash
            shuffle sends all their orders to a single worker. That worker
            becomes a straggler processing 40% of data while others finish in
            seconds. Overall query latency becomes 5 to 10 times higher than
            expected. Systems like Spark SQL implement skew mitigation by
            duplicating small tables or splitting heavy keys, but these are
            heuristics that don't always trigger. Production queries against
            skewed data can see p95 latency of 45 seconds when p50 is 6 seconds,
            purely due to one hot partition.
            <strong>Parameter Sniffing and Plan Caching:</strong>
            OLTP databases like SQL Server and PostgreSQL cache compiled plans
            to avoid recompilation overhead. This creates a subtle failure mode
            called parameter sniffing. The first execution compiles a plan
            optimized for its specific parameter values. Subsequent executions
            reuse that plan even with different parameters. If the cached plan
            was compiled for <code>customer_id = 123</code> (a customer with 5
            orders), it might choose index lookups. When the same query runs
            with <code>customer_id = 999</code> (an enterprise customer with
            500,000 orders), it still uses index lookups when a full scan would
            be faster. Latency jumps from 10ms to 8 seconds for that one
            parameter value. The fix requires plan cache invalidation or query
            hints, neither of which is automatic.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Query optimization failures often
              appear as sudden latency spikes with no code changes. Monitor p99
              latency and slow query logs. When p99 suddenly jumps 10x, suspect
              stale statistics, data skew, or bad cached plans rather than
              infrastructure issues.
            </div>
            <strong>Queries That Defeat Optimization:</strong>
            Certain query patterns make optimization impossible. Applying
            functions to indexed columns like{" "}
            <code>WHERE LOWER(email) = 'user@example.com'</code> prevents index
            usage because the index stores original values, not lowercased ones.
            The optimizer must fall back to full table scans. Similarly, complex
            OR conditions across non aligned columns, such as{" "}
            <code>
              WHERE (status = 'active' AND region = 'US') OR (priority &gt; 5
              AND created_date &gt; '2024-01-01')
            </code>
            , split predicate pushdown and often force multiple scans. User
            defined functions (UDFs) are opaque to the optimizer. It cannot
            estimate their selectivity or cost. A UDF that looks cheap might
            actually make an HTTP call taking 200ms per row. Applying this to 1
            million rows turns a 2 second query into a 55 hour query. Always
            avoid row by row UDFs in hot paths.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Normal State</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    1% pending orders, nested loop, 100ms
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Backlog Occurs</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pending orders grow to 40% (4M rows)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Optimizer Deceived</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Stale stats say 1%, still uses nested loop
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Performance Collapse</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    4M index lookups, 60+ seconds p99
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
                  Stale statistics cause silent catastrophic failures where the
                  optimizer selects nested loop joins suitable for 10,000 rows
                  but applied to 4 million rows, increasing latency from 100ms
                  to over 60 seconds without any code changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data skew in distributed systems creates straggler workers
                  when hash partitioning sends 40% of data to one node, causing
                  p95 latency to balloon 5 to 10 times higher than p50 even with
                  proper parallelism
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parameter sniffing in cached query plans optimizes for the
                  first parameter value seen, then reuses that plan
                  inappropriately for vastly different cardinalities, causing
                  10ms queries to suddenly take 8 seconds for certain inputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Functions on indexed columns, complex OR conditions, and
                  opaque UDFs defeat optimization by preventing index usage and
                  predicate pushdown, often turning 2 second queries into multi
                  hour disasters
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
                  Production incident at e-commerce site: order processing
                  backlog causes pending orders to spike from 1% to 40% over
                  weekend. Monday morning, dashboard queries using nested loop
                  join based on Friday statistics hit 60+ second timeouts until
                  statistics are manually refreshed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spark SQL query joining sales by customer ID where one retail
                  chain accounts for 38% of sales: hash shuffle sends 380 GB to
                  one worker while 19 others process 50 GB each, causing query
                  to take 42 seconds instead of expected 8 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SQL Server stored procedure compiled for small customer (5
                  orders) reuses index nested loop plan for enterprise customer
                  (500K orders), causing 8 second latency spike that appears
                  random until plan cache is examined and invalidated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDwQueryOptimizationQueryOptimizerFailureModesAndEdgeCases;
