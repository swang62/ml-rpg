import type { Component } from "solid-js";

const LessonForecastingAtScaleReconciliationStrategiesTopDownBottomUpAndOptimalMethods: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Reconciliation Strategies: Top Down, Bottom Up, and Optimal Methods
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Once you have base forecasts at one or more levels of a hierarchy,
            reconciliation enforces aggregation constraints so that parent
            totals equal the sum of children. There are four standard
            strategies, ordered by computational cost and flexibility. Top down
            forecasts only the top level, then allocates to children using
            historical proportions. If the national forecast is 1 million units
            and Store A historically captured 2 percent of sales, it receives
            20,000 units. This is extremely fast: one model run plus a
            multiplication by a proportion vector. The downside is that
            allocations are rigid. If Store A runs a promotion or changes
            assortment, historical proportions no longer hold and the allocation
            will be wrong. Top down works well when children are stable and the
            aggregate signal is strong. Bottom up forecasts only the leaves and
            sums upward. This preserves all granular signals and naturally
            handles local shifts. For 10 million leaves, you generate 10 million
            base forecasts and aggregate them into parents using a sparse
            summation matrix. Reconciliation is trivial because you never
            forecast parents independently; coherence is automatic. The weakness
            is noise: if leaves are intermittent or sparse, summing them
            propagates high variance upward. Retail datasets with many zero
            sales days at the SKU store level often show bottom up producing
            unstable aggregates. Middle out forecasts at an intermediate level,
            aggregates upward to parents, and allocates downward to children.
            This is a hybrid that balances cost and accuracy when you have three
            or more levels. For example, forecast at the store level, sum to
            state and national, and allocate to SKU store leaves using
            proportions. This keeps the forecast count manageable (5,000 stores
            instead of 10 million leaves) and avoids the noisiest level. Optimal
            reconciliation, often called Minimum Trace (MinT) in the literature,
            forecasts all levels independently, then solves a weighted linear
            system to find the coherent forecast that minimizes variance. The
            weights come from the covariance matrix of base forecast errors.
            When the covariance is accurate, this method often gives the best
            overall error across all levels. The cost is high: at scale you must
            estimate a covariance matrix over potentially millions of nodes and
            solve a large linear system. Companies approximate this by shrinking
            covariance to diagonal or block diagonal by subtree, which turns one
            global solve into many small solves that fit in memory and finish in
            seconds per branch. Netflix and Meta capacity planning teams use
            optimal reconciliation weekly for long range planning, where a few
            hour batch is acceptable, and fall back to bottom up or diagonal
            weighted MinT for daily operational forecasts that must complete in
            under one hour. Uber reconciles by city, solving thousands of
            independent 100 to 1,000 node problems in parallel rather than one
            million node global problem, keeping per city reconciliation under
            10 seconds and total batch under one hour.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Top Down</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Forecast: National only → Allocate to children by proportion
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Cost: 1 model run + O(n) multiply | Accuracy: Misses local
                    shifts
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Bottom Up</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Forecast: 10M leaves only → Sum to parents
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Cost: 10M forecasts + O(n) sum | Accuracy: Propagates leaf
                    noise
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Middle Out</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Forecast: 5K stores → Sum up + allocate down
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Cost: 5K forecasts + O(n) operations | Accuracy: Balances
                    both
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Optimal (MinT)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Forecast: All levels → Solve linear system with covariance
                    weights
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Cost: 10M+ forecasts + matrix solve (hours) | Accuracy: Best
                    if covariance accurate
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
                  Top down forecasts 1 series and allocates by historical
                  proportions, extremely fast but misses local mix shifts and
                  promotions, works when aggregate signal dominates and children
                  are stable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bottom up forecasts 10 million leaves and sums upward,
                  preserves granular signals and handles local changes, but
                  propagates noise upward when leaves are intermittent or sparse
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Middle out forecasts intermediate level (5,000 stores), sums
                  to parents and allocates to leaves, balances cost and accuracy
                  by avoiding both top level rigidity and leaf level noise
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimal reconciliation (MinT) forecasts all levels and solves
                  weighted linear system with error covariance, gives best
                  accuracy when covariance is reliable but can take hours at
                  scale without approximation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems approximate optimal by shrinking covariance
                  to diagonal or block diagonal, solving many small subtree
                  problems in parallel (Uber: under 10 seconds per city, total
                  batch under one hour)
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
                  Netflix capacity planning: Run optimal MinT reconciliation
                  weekly for long range forecasts (acceptable few hour batch),
                  use diagonal MinT daily for operational forecasts (under one
                  hour SLA)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber demand: Reconcile by city, each city is 100 to 1,000 node
                  problem solved independently in parallel, keeps per city
                  reconciliation under 10 seconds and avoids global million node
                  linear system
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Walmart M5 competition: Winning solution used bottom up
                  gradient boosted forecasts at 30,490 leaves, then optimal
                  reconciliation with sample covariance over 42,840 total series
                  to ensure store and category totals aligned
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingAtScaleReconciliationStrategiesTopDownBottomUpAndOptimalMethods;
