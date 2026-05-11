import type { Component } from "solid-js";

const LessonDwQueryOptimizationHowQueryOptimizersChooseExecutionPlans: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Query Optimizers Choose Execution Plans
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Statistics Drive Everything:</strong>
            The optimizer cannot choose a good plan without understanding your
            data. It needs to know how many rows live in each table, how values
            are distributed across columns, and how selective your filters will
            be. Systems maintain statistics like number of rows, number of
            distinct values per column, min and max values per partition,
            histograms showing value distribution, and correlation between
            commonly joined columns. Consider a table with 10 million user
            records. If a query filters by <code>status = 'active'</code>, the
            optimizer needs to estimate how many rows match. If statistics show
            9.5 million users are active, that filter is not selective at all.
            The optimizer might choose a full table scan. But if only 50,000
            users are active (0.5%), an index lookup becomes far cheaper.
            <strong>Enumerating Physical Plans:</strong>
            After logical rewrites, the optimizer generates candidate physical
            plans. For a three table join, there are multiple join orders to
            consider. Should it join A with B first, then add C? Or B with C
            first, then A? Each order has different intermediate result sizes
            and therefore different costs.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Join Algorithm Selection:</strong> Choose between hash
                  join (fast for equality joins), merge join (efficient when
                  inputs are sorted), or nested loop join (best when one side is
                  very small).
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Access Path Selection:</strong> For each table, decide
                  between full scan, index scan, or hitting a materialized view.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Distribution Strategy:</strong> In distributed
                  systems, decide whether to broadcast a small table to all
                  workers or repartition both sides by join key.
                </div>
              </div>
            </div>
            <strong>The Cost Model in Action:</strong>
            Each candidate plan gets a cost estimate. For a hash join between 1
            million row table A and 100,000 row table B, the optimizer estimates
            reading both tables (I/O cost), building a hash table for B (CPU and
            memory cost), then probing with A's rows (CPU cost). If table A has
            an index on the join key and statistics show high selectivity, an
            index nested loop might be cheaper despite the algorithmic
            complexity.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Plan Comparison Example
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">Plan A</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COST: 15000
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">Plan B</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COST: 3500
                  </div>
                </div>
              </div>
            </div>
            The optimizer picks Plan B with cost 3500 over Plan A with cost
            15000. These cost units typically represent a weighted combination
            of expected I/O operations, CPU instructions, and data volume
            transferred. The actual execution time difference might be 8 seconds
            versus 400 milliseconds.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Statistics can become stale as
              data grows or changes distribution. If the optimizer thinks a
              filter is highly selective based on old statistics but it now
              matches millions of rows, the chosen plan can be catastrophically
              slow. Most systems require periodic statistics updates via
              background jobs or explicit commands.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Logical Plan</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    What to compute
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Statistics Check</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Rows, distributions
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Generate Candidates</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Join orders, algorithms
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Pick Minimum Cost</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Execute best plan
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
                  Optimizers rely on statistics like row counts, distinct value
                  counts, and histograms to estimate how selective filters are
                  and how large intermediate results will be
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Physical plan enumeration considers join order permutations,
                  join algorithms (hash, merge, nested loop), access paths (scan
                  vs index), and distribution strategies (broadcast vs
                  repartition)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost models translate each plan into estimated resource
                  consumption, typically combining I/O operations, CPU cycles,
                  memory usage, and network transfer into a single cost metric
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale statistics cause the most common optimization failures,
                  where the optimizer chooses a plan suitable for old data
                  distribution that performs catastrophically on current data
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
                  Joining customers (1M rows) with orders (10M rows) on customer
                  ID: optimizer sees customers table is much smaller, chooses to
                  build hash table from customers (200 MB memory), then probe
                  with orders, completing join in 4 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query with filter on indexed column where statistics show 0.1%
                  selectivity: optimizer chooses index scan touching 10,000 rows
                  instead of full table scan of 10 million rows, reducing
                  execution from 12 seconds to 300 milliseconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDwQueryOptimizationHowQueryOptimizersChooseExecutionPlans;
