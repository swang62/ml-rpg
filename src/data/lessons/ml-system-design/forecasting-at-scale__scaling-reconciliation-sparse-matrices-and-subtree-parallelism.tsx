import type { Component } from "solid-js";

const LessonForecastingAtScaleScalingReconciliationSparseMatricesAndSubtreeParallelism: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Scaling Reconciliation: Sparse Matrices and Subtree Parallelism
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Optimal reconciliation at scale requires solving a linear system
            that projects base forecasts onto aggregation constraints. For a
            hierarchy with 10 million leaves and three levels above (store,
            state, national), you have roughly 10 million plus 5,000 plus 50
            plus 1 nodes, approximately 10 million total. The reconciliation
            problem is to find coherent forecasts that minimize weighted error,
            which mathematically reduces to solving a system involving an
            aggregation matrix and a covariance matrix. The aggregation matrix
            encodes how children sum to parents. It is extremely sparse: each
            leaf has exactly one parent at each level, so each row has only a
            handful of nonzero entries. Storing this as a dense matrix would
            require 10 million by 10 million entries, which is infeasible.
            Compressed Sparse Row (CSR) format stores only the nonzero entries,
            reducing memory from terabytes to gigabytes. Matrix vector products,
            which dominate reconciliation computation, run in time proportional
            to the number of nonzeros rather than the square of node count. For
            10 million nodes with 4 ancestors each, you have 40 million
            nonzeros, and a sparse matrix vector multiply finishes in
            milliseconds on modern hardware. The covariance matrix of base
            forecast errors is the second bottleneck. A full dense covariance
            over 10 million series requires 100 trillion floats, which is
            impossible to store or invert. Production systems approximate this
            aggressively. The simplest approximation is diagonal covariance,
            which assumes errors are uncorrelated across series. This reduces
            the covariance to 10 million variances, fitting in a few hundred
            megabytes. Diagonal MinT reconciliation becomes a weighted least
            squares problem that factors into independent subtree solves. Each
            subtree with depth 4 and branching factor 1,000 involves a linear
            system of size roughly 1,000, which solves in under 1 millisecond
            using standard libraries. Block diagonal covariance is a middle
            ground. Within each branch (for example, all SKUs in a single
            store), you estimate a small covariance block. Across branches you
            assume independence. For a retailer with 5,000 stores and 2,000 SKUs
            per store, you maintain 5,000 blocks of size 2,000 by 2,000, which
            is manageable. Each store reconciliation solves independently in
            parallel. With 100 cores you process 50 stores per core, finishing
            in seconds. Uber style systems use geographic sharding. Demand is
            forecast per geohash zone and product. Zones within a city are
            reconciled together, but cities are independent. A city with 500
            zones and 5 products has 2,500 leaf nodes and perhaps 3,000 total
            nodes after adding district and city aggregates. Solving a 3,000 by
            3,000 system with sparse constraints and block covariance takes
            under 10 seconds per city on a single core. With 100 cities and 10
            cores, total reconciliation completes in a few minutes. This keeps
            the entire forecast pipeline, ingestion plus base forecasting plus
            reconciliation, under a one hour Service Level Agreement (SLA).
            Memory use is proportional to the largest branch width, not total
            node count. If you reconcile 1,000 nodes at a time and stream
            results, peak memory stays under a few gigabytes. This allows
            systems to handle billions of predictions on modest hardware by
            breaking the problem into independent subtrees and parallelizing
            across branches.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Reconciliation Decomposition
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">City 1 Subtree</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    500 zones × 5 products = 2,500 leaves → 3,000 total nodes
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Solve time: &lt;10 seconds per city (1 core)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">City 2 Subtree</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    450 zones × 5 products = 2,250 leaves → 2,700 total nodes
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Solve time: &lt;10 seconds per city (1 core)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Parallel Execution</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    100 cities on 10 cores → 10 cities per core in parallel
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Total reconciliation: Few minutes, fits in 1 hour SLA
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
                  Aggregation matrix is extremely sparse with only 40 million
                  nonzeros for 10 million nodes (4 ancestors each), stored in
                  Compressed Sparse Row (CSR) format reducing memory from
                  terabytes to gigabytes and matrix multiply to milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Full covariance over 10 million series requires 100 trillion
                  floats, infeasible to store or invert, production systems
                  approximate with diagonal (uncorrelated errors) or block
                  diagonal (correlated within branch, independent across
                  branches)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Diagonal covariance reduces reconciliation to independent
                  subtree solves: each subtree with 1,000 nodes solves in under
                  1 millisecond, entire hierarchy reconciled in seconds by
                  parallelizing across branches
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Geographic sharding pattern: Uber reconciles per city (500
                  zones times 5 products equals 2,500 leaves, 3,000 total
                  nodes), each city solves in under 10 seconds, 100 cities on 10
                  cores finishes in minutes within one hour SLA
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory use proportional to largest branch width not total node
                  count: reconciling 1,000 nodes at a time and streaming results
                  keeps peak memory under a few gigabytes, enabling billions of
                  predictions on modest hardware
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
                  Uber demand: 100 cities, each with 500 zones and 5 products,
                  reconciled independently in parallel, 10 cities per core on 10
                  core cluster completes in a few minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon scale: 10 million SKU store leaves with diagonal
                  covariance approximation, reconcile by store subtree (2,000
                  SKUs per store), 5,000 store reconciliations run in parallel
                  finishing in under 10 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retailer with 5,000 stores and 2,000 SKUs per store: Block
                  diagonal covariance with 5,000 blocks of 2,000 by 2,000, each
                  store reconciliation independent, 100 cores process 50 stores
                  each in seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingAtScaleScalingReconciliationSparseMatricesAndSubtreeParallelism;
