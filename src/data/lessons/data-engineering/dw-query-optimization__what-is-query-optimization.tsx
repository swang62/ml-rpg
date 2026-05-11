import type { Component } from "solid-js";

const LessonDwQueryOptimizationWhatIsQueryOptimization: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Query Optimization?
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
              <strong>Query Optimization</strong> is the process of transforming
              a database query into the most efficient execution plan possible,
              minimizing resource consumption while returning the same correct
              results.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          When you write a query like{" "}
          <code>SELECT * FROM orders WHERE customer_id = 123</code>, there are
          many ways the database could execute it. It could scan every single
          row in the table. It could use an index on <code>customer_id</code>.
          It could even scan a materialized view. Each approach gives the same
          answer but at dramatically different costs. Without optimization, a
          naive approach would scan a 10 TB table on cloud storage taking tens
          of seconds to minutes. Product teams typically expect interactive
          analytics under 1 to 3 seconds p95 for dashboards and under 100
          milliseconds for operational reads. The gap between these expectations
          and raw scan performance is what query optimization bridges.
          <strong>The Three Stage Pipeline:</strong>
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Query Processing Stages
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">STAGE 1</div>
                <div style="font-size: 14px; font-weight: 800">Parse</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">STAGE 2</div>
                <div style="font-size: 14px; font-weight: 800">Logical Opt</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">STAGE 3</div>
                <div style="font-size: 14px; font-weight: 800">
                  Physical Opt
                </div>
              </div>
            </div>
          </div>
          First, parsing turns query text into a logical plan showing what
          operations to perform. Second, logical optimization rewrites this into
          an equivalent but cheaper form, like pushing filters closer to data
          sources or simplifying expressions. Third, physical optimization
          chooses actual algorithms, such as which index to use, what join order
          and algorithm to apply, how to partition work across compute nodes,
          and whether to use cached results or scan fresh data.
          <strong>Cost Based vs Rule Based:</strong>
          Modern engines primarily use cost based optimization. They collect
          statistics about your data, such as how many rows exist, how values
          are distributed, and how many distinct values appear in each column.
          The optimizer then estimates the cost of different execution plans in
          terms of Input/Output operations, CPU cycles, memory usage, and
          network transfers. It picks the plan with minimum estimated cost. Some
          systems also support rule based optimization or user hints when cost
          models become unreliable with complex schemas.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query optimization transforms a logical query into the most
                efficient physical execution plan, bridging the gap between tens
                of seconds raw scan time and sub second interactive requirements
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The three stage pipeline consists of parsing into logical plans,
                rewriting for logical efficiency (pushing filters down,
                simplifying expressions), then choosing physical algorithms and
                access paths
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cost based optimizers build statistics on data distribution (row
                counts, distinct values, histograms) and estimate resource costs
                (I/O, CPU, memory, network) to select minimum cost plans
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Without optimization, scanning a 10 TB warehouse table could
                take minutes, but optimized plans with proper partitioning and
                indexing achieve 1 to 3 second response times
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
                A query filtering recent orders from a 10 TB table: naive full
                scan takes 60+ seconds, but with date partitioning the optimizer
                prunes 99% of data and completes in under 2 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Joining two tables with 1 million and 100 rows: optimizer
                estimates costs and chooses to broadcast the small table to all
                workers rather than shuffle the large table, reducing network
                transfer from gigabytes to megabytes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDwQueryOptimizationWhatIsQueryOptimization;
