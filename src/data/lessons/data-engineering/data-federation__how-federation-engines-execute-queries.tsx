import type { Component } from "solid-js";

const LessonDataFederationHowFederationEnginesExecuteQueries: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Federation Engines Execute Queries
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Execution Pipeline:</strong> When a federation engine
            receives a query, it goes through several sophisticated steps that
            determine whether your query returns in 500 milliseconds or times
            out after 30 seconds.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Parse and Validate:</strong> The engine parses your
                  SQL against a unified schema stored in its metadata catalog.
                  It validates that tables and columns exist and that you have
                  permission to access them.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Generate Logical Plan:</strong> Creates an abstract
                  representation of operations (scan, filter, join, aggregate)
                  without considering physical sources yet.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Map to Sources:</strong> Determines which parts of the
                  query target which physical systems. A join between{" "}
                  <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                    customers
                  </code>{" "}
                  and{" "}
                  <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                    orders
                  </code>{" "}
                  might map to Salesforce and PostgreSQL respectively.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Optimize with Pushdown:</strong> Applies predicate
                  pushdown to send filters to source systems. Instead of pulling
                  10 million customer rows then filtering, send WHERE{" "}
                  <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                    region='US'
                  </code>{" "}
                  to Salesforce so only 2 million rows return.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  5
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Execute in Parallel:</strong> Issues subqueries
                  concurrently, streams partial results back, performs joins and
                  aggregations locally, then returns the final result.
                </div>
              </div>
            </div>
            <strong>The Critical Optimization: Predicate Pushdown</strong>
            This technique makes or breaks federation performance. Consider
            querying customer orders from the last 30 days where{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              total &gt; 1000
            </code>
            . Without pushdown, you pull all 50 million orders across the
            network (maybe 500 GB), then filter locally. With pushdown, you send
            the filter criteria to the source database, which applies indexes
            and returns only 200,000 matching rows (2 GB).
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Network Transfer Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WITHOUT PUSHDOWN
                  </div>
                  <div style="font-size: 16px; font-weight: 800">500 GB</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WITH PUSHDOWN
                  </div>
                  <div style="font-size: 16px; font-weight: 800">2 GB</div>
                </div>
              </div>
            </div>
            <strong>Join Strategies Matter:</strong> When joining data from two
            sources, the engine must choose a strategy. For a broadcast join, if
            one side is small (10,000 rows), it broadcasts that table to where
            the large table lives. For large to large joins across systems,
            performance degrades sharply because massive amounts of data must
            move. Smart engines detect this pattern and either refuse the query,
            require hints, or suggest materializing one side in a shared store
            first.
            <strong>Real World Performance:</strong> At moderate scale with 50
            to 200 concurrent users, federation systems target p50 latency under
            1 second and p95 under 3 to 5 seconds for interactive analytics.
            This requires most subqueries to finish in 200 to 500 milliseconds
            and network round trips to stay within the same region. Cross region
            federation adds 100 to 200 milliseconds of latency per hop.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Query: SELECT * FROM orders WHERE region='US' AND total &gt;
                    1000
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Optimizer: Push filters to source
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Avoid transferring 50M rows
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    PostgreSQL executes filtered query
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Returns only 200K matching rows (2 GB)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Result returned in 450ms vs 45 seconds
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
                  Predicate pushdown reduces network transfer by 100x to 250x by
                  filtering at the source instead of pulling all data first
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parallel subquery execution is critical: queries to 3 sources
                  run concurrently, not sequentially
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Join strategies differ: broadcast small tables (under 10,000
                  rows), avoid large to large cross system joins
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Target p50 under 1 second and p95 under 3 to 5 seconds for
                  interactive analytics with 50 to 200 concurrent users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query optimizer decides which operations execute where, aiming
                  to minimize data movement between systems
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
                  A query joining 10 million CRM customers with 50 million
                  database orders: pushdown filters reduce CRM transfer from 800
                  MB to 60 MB and database transfer from 5 GB to 200 MB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Broadcast join: 5,000 row product catalog broadcasted to where
                  2 million order lines live, avoiding moving orders across
                  network
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross region federation between US East and EU West adds 150ms
                  latency per hop, making multi hop queries exceed 5 second p95
                  targets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataFederationHowFederationEnginesExecuteQueries;
