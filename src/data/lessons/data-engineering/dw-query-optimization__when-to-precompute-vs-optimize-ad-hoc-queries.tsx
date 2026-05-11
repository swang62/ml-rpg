import type { Component } from "solid-js";

const LessonDwQueryOptimizationWhenToPrecomputeVsOptimizeAdHocQueries: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When to Precompute vs. Optimize Ad Hoc Queries
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Tradeoff:</strong>
            Query optimization exists on a spectrum between two extremes. On one
            end, you precompute everything into materialized views, cube tables,
            or pre aggregated summaries. On the other end, you optimize nothing
            and run fresh queries against raw data every time. Real systems live
            somewhere in between, and choosing the right point requires
            understanding specific tradeoffs.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Precomputed Views
                </div>
                <div style="font-size: 12px">
                  Query: 200ms, Storage: 2x, Freshness: minutes to hours lag
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Ad Hoc Queries
                </div>
                <div style="font-size: 12px">
                  Query: 10sec, Storage: 1x, Freshness: real time
                </div>
              </div>
            </div>
            <strong>When Precomputation Wins:</strong>
            Materialized views shine when you have high query reuse and can
            tolerate data lag. Executive dashboards accessed by 200 people daily
            but updated only once per hour are perfect candidates. Precomputing
            daily revenue rollups by region and product category can take query
            time from 10 seconds down to under 200 milliseconds. The cost is
            maintaining the refresh pipeline and storing duplicate data,
            typically adding 50% to 200% storage overhead depending on
            aggregation levels. For systems with 80% or more repeated query
            patterns, like operational dashboards in e-commerce showing order
            counts and revenue, precomputation provides 50x to 100x speedup. The
            refresh lag of 5 to 30 minutes is acceptable because these metrics
            inform strategic decisions, not real time operations.
            <strong>When Fresh Queries Win:</strong>
            If you need strict real time correctness, precomputation fails.
            Banking systems checking account balances, inventory systems
            validating stock levels, or fraud detection systems cannot tolerate
            even 60 seconds of lag. These must query fresh data, accepting
            slower response times of 100 to 500 milliseconds instead of 10 to 20
            milliseconds from a cache. Exploration and ad hoc analytics also
            demand fresh queries. Data scientists iterating on new analyses
            generate unique queries that have never run before. Precomputing all
            possible aggregations is impossible. Here you invest in fast scan
            optimization, good partitioning, and columnar formats rather than
            materialized views.
            <strong>The Index Tradeoff:</strong>
            Indexes occupy a middle ground. They speed up selective lookups
            without full precomputation, but they come at write cost. Each index
            adds 10% to 30% storage overhead, and every INSERT must update all
            indexes. A table with 5 indexes means 6 writes per INSERT.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't 'optimize everything.' It's: what's my
                read/write ratio and freshness requirement?"
              </div>
            </div>
            For read heavy workloads over 90% reads like user profiles or
            product catalogs, index liberally and consider materialized views.
            Your 10,000 reads per second benefit while 500 writes per second pay
            the index maintenance cost. For write heavy event logs at 80%
            writes, keep indexes minimal. The write throughput drop from 50,000
            to 8,000 inserts per second with heavy indexing makes the tradeoff
            negative.
            <strong>Decision Framework:</strong>
            First, measure your read/write ratio. Second, determine freshness
            requirements. Real time needs (under 1 second lag) eliminate most
            precomputation. Tactical needs (5 to 30 minute lag acceptable) allow
            selective materialized views for high reuse queries. Strategic
            analytics (hourly or daily lag) can leverage aggressive
            precomputation. Third, estimate query reuse. If 90% of queries hit
            10 patterns, precompute those 10. If queries are unique, optimize
            scan performance instead.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Precomputed views trade storage overhead (50% to 200% more)
                  and freshness lag (minutes to hours) for query speedups of 50x
                  to 100x, making them ideal for high reuse dashboards with 80%+
                  repeated patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fresh ad hoc queries maintain real time correctness at the
                  cost of 10 to 50x slower execution, necessary for banking,
                  inventory, fraud detection, and exploratory analytics with
                  unique query patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Indexes provide middle ground optimization, speeding selective
                  lookups by 100x to 1000x but adding 10% to 30% storage and
                  reducing write throughput from 50,000 to 8,000 inserts per
                  second with heavy indexing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision framework: measure read/write ratio (over 90% reads
                  favors indexes and views), determine freshness needs (under 1
                  second lag requires fresh queries), and estimate query reuse
                  (90% hitting 10 patterns justifies precomputation)
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
                  E-commerce executive dashboard accessed 200 times daily with
                  hourly refresh: precomputed view stores daily revenue by
                  region and category, reduces query from 10 seconds to 180ms,
                  adds 80% storage overhead, acceptable 30 minute lag
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Banking account balance check requiring real time correctness:
                  must query live transactional data achieving 150ms latency
                  instead of 15ms from hypothetical stale cache, cannot tolerate
                  any replication lag
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User profile service with 95% reads and 5% writes: creates
                  indexes on email, username, and user ID, achieves 3ms single
                  user lookup instead of 500ms table scan, accepts write latency
                  increase from 2ms to 8ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDwQueryOptimizationWhenToPrecomputeVsOptimizeAdHocQueries;
