import type { Component } from "solid-js";

const LessonForecastingAtScaleFailureModesHierarchyDriftSingularSystemsAndDataLatency: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Hierarchy Drift, Singular Systems, and Data Latency
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Hierarchical forecasting systems face several failure modes that can
            silently degrade accuracy or cause batch failures. Understanding
            these edge cases and their mitigations is critical for production
            reliability. Hierarchy drift occurs when SKUs move between
            categories, stores merge or close, or product taxonomies change. If
            your reconciliation matrix encodes that SKU 12345 belongs to Store A
            but the SKU was reassigned to Store B last week, reconciliation will
            allocate forecasts to the wrong parent. This creates incoherent
            totals and incorrect allocations. The symptom is sudden spikes in
            coherence gap or allocation errors for specific branches. Mitigation
            requires versioned hierarchies with effective dates. Maintain a
            slowly changing dimension table that tracks parent child
            relationships over time. During reconciliation, use the hierarchy
            snapshot valid for the forecast period. Backfill historical data
            when mappings change to maintain consistent aggregation paths.
            Singular or ill conditioned reconciliation matrices arise when
            constraints are redundant or nearly collinear. For example, if two
            product categories are defined identically or a store was duplicated
            in the hierarchy by mistake, the linear system becomes singular and
            cannot be inverted. Solvers will fail or return numerically unstable
            solutions. Add ridge regularization to the reconciliation problem,
            which adds a small penalty term that stabilizes inversion.
            Alternatively, detect and remove redundant constraints during matrix
            assembly. Recursive subtree reconciliation also helps: if a subtree
            becomes singular, reconcile parent and children separately rather
            than globally. Noisy or intermittent leaves are common in retail and
            marketplace data. Many SKU store combinations have long stretches of
            zero sales. Bottom up reconciliation on these series produces high
            variance: summing 10,000 noisy leaf forecasts can yield a wildly
            fluctuating aggregate. Use intermittent demand models such as
            Croston or Temporal Hierarchical Forecasting (THieF) methods that
            smooth zeros. Global models with embeddings borrow strength across
            series, reducing variance. Set a quality threshold: if a leaf has
            fewer than 10 nonzero observations in 90 days, switch to top down
            allocation for that leaf rather than trusting its noisy base
            forecast. Misestimated covariance destabilizes optimal
            reconciliation. Small sample sizes or nonstationary errors make the
            covariance estimate unreliable. Overconfident off diagonal terms can
            push reconciled forecasts away from true signals. Shrink covariance
            toward a diagonal using a shrinkage parameter tuned on validation
            error. Use robust covariance estimators that downweight outliers.
            Set a minimum effective sample size, for example 30 days of data per
            series, before trusting off diagonal covariance terms. Companies
            often run a simple diagonal reconciliation daily and reserve full
            covariance estimation for weekly planning cycles where accuracy
            matters more than speed. Data latency and partial ingestion break
            reconciliation when some regions lag in data arrival. If Store A
            data is current as of midnight but Store B data is delayed by six
            hours, reconciling with mixed as of timestamps creates inconsistent
            totals. Use watermarks that track the minimum event time across all
            partitions. Reconcile only when all required data has arrived. Treat
            late arrivals as corrections: run a light recompute for affected
            branches and publish updated forecasts. This keeps forecasts
            eventually consistent without blocking the entire pipeline on
            stragglers.<p></p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hierarchy drift from SKU reassignments or store mergers
                  creates incoherent allocations, mitigate with versioned slowly
                  changing dimension tables tracking parent child relationships
                  over time and backfilling when mappings change
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Singular reconciliation matrices from redundant constraints
                  cause solver failures, add ridge regularization to stabilize
                  inversion or detect and remove redundant constraints during
                  matrix assembly, reconcile subtrees separately if needed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Noisy intermittent leaves with long zero stretches produce
                  high variance aggregates in bottom up, use intermittent demand
                  models, global embeddings to borrow strength, and switch to
                  top down allocation when leaf has fewer than 10 nonzero
                  observations in 90 days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Misestimated covariance from small samples destabilizes
                  optimal reconciliation, shrink toward diagonal with tuned
                  parameter, use robust estimators downweighting outliers,
                  require minimum 30 days effective sample before trusting off
                  diagonal terms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data latency and partial ingestion with mixed as of timestamps
                  create inconsistent totals, use watermarks tracking minimum
                  event time across partitions, reconcile only when all data
                  arrived, treat late arrivals as corrections with branch level
                  recompute
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
                  Retailer hierarchy drift: SKU moved from Electronics to Home
                  Goods category mid quarter, reconciliation matrix not updated,
                  allocated forecasts to wrong category causing 15 percent error
                  spike, fixed by versioned hierarchy with weekly snapshots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Marketplace singular matrix: Duplicate listing IDs created
                  near collinear constraints, reconciliation solver failed with
                  numerical instability, added ridge regularization with lambda
                  equals 0.01 and removed duplicates in preprocessing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Intermittent demand: 60 percent of SKU store leaves had zero
                  sales in past 90 days, bottom up reconciliation produced state
                  level forecast with 50 percent error, switched to top down
                  allocation for leaves with under 10 nonzero days, error
                  dropped to 12 percent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingAtScaleFailureModesHierarchyDriftSingularSystemsAndDataLatency;
