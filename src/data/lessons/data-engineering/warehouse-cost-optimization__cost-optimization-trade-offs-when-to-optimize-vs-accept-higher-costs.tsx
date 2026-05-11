import type { Component } from "solid-js";

const LessonWarehouseCostOptimizationCostOptimizationTradeOffsWhenToOptimizeVsAcceptHigherCosts: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cost Optimization Trade-offs: When to Optimize vs Accept Higher
            Costs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Central Tension:</strong> Aggressive cost cutting risks
            breaking Service Level Agreements, while over-provisioning wastes
            budget. The art is knowing when each dollar saved costs you more in
            complexity, reliability, or velocity.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Aggressive Optimization
                </div>
                <div style="font-size: 12px">
                  Lower costs, higher SLA risk, more complexity
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Simple Over-Provisioning
                </div>
                <div style="font-size: 12px">
                  Predictable costs, comfortable SLA margin, less ops burden
                </div>
              </div>
            </div>
            <strong>Trade-off 1: Compute Size vs SLA Risk</strong>
            Cutting your ETL cluster from 16 to 8 workers reduces cloud spend by
            50 percent. But if your nightly jobs slide from 2 hours to 6 hours,
            you miss the "data ready by 7 a.m." business requirement. The cost
            savings of perhaps $200 per night are irrelevant if the data team
            gets paged at 7:30 a.m. when dashboards show stale data. Decision
            framework: If your current completion time has 50 percent headroom
            (finishing in 2 hours with a 4 hour window), you can safely right
            size downward. If you are already at 80 percent utilization, any
            reduction risks breaches during normal variance.
            <strong>Trade-off 2: Storage Tiers vs Access Latency</strong>
            Moving data from hot to cool or archive storage cuts costs by 50 to
            80 percent. Hot tier might cost $23 per TB per month. Cool tier
            costs $10 per TB per month. Archive costs $2 per TB per month. But
            retrieval latency changes dramatically: hot is milliseconds, cool is
            seconds to minutes, archive can be minutes to hours. For compliance
            logs accessed once per quarter, archive tier is obvious. For
            historical analytics data that powers "year over year" reports run
            weekly, cool tier works. For data that might be queried by any
            dashboard at any time, hot tier is required despite higher cost.
            <strong>Trade-off 3: Batch vs Streaming Freshness</strong>
            Pure streaming pipelines with exactly once semantics and subsecond
            latency cost significantly more than hourly micro-batches, both in
            compute and operational complexity. A streaming Flink or Spark
            Structured Streaming job might require 10 to 20 dedicated nodes
            running 24 hours per day. The same workload as hourly batches might
            run on 4 nodes for 10 minutes per hour. If your analytics use case
            genuinely needs 5 minute freshness (operational dashboards, real
            time alerting), streaming is justified. If 60 minute freshness
            suffices (most reporting and BI), micro-batches save 80 to 90
            percent of compute costs.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "For smaller teams or early stage products, paying 20 percent
                more for a simpler architecture can be the right choice. Your
                team velocity matters more than your cloud bill."
              </div>
            </div>
            <strong>
              Trade-off 4: Serverless Simplicity vs Provisioned Predictability
            </strong>
            BigQuery serverless is trivially easy to operate: no clusters to
            manage, auto-scaling to any query load. But on-demand pricing at $5
            per TB scanned is unpredictable with many power users. A single data
            scientist running hundreds of exploratory queries can generate
            thousands of dollars in unexpected costs. Provisioned models like
            Redshift or dedicated Databricks clusters give predictable monthly
            bills but require capacity planning, tuning, and monitoring.
            Reserved capacity commitments lock you in for 1 to 3 years. Decision
            criteria: If you have fewer than 50 users and light query volume,
            serverless is simpler. If you have 500 users scanning 100 TB per
            day, provisioned capacity with slot reservations or flat rate
            pricing becomes cheaper and more predictable.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When NOT to Optimize:
            </div>
            First, when the team cost exceeds the cloud savings. Spending 2
            engineer weeks to save $500 per month is a poor trade when those
            engineers cost $10,000 per month. Second, when optimization adds
            fragility. Heavily customized partitioning schemes, complex storage
            lifecycle policies, and intricate query rewrite rules save money but
            create operational debt. If only one person understands the system,
            you have a bus factor problem. Third, in early stage or experimental
            projects. Paying 2x cloud costs for simplicity while you prove
            product market fit is smart. Optimize when you have proven scale and
            stable workloads.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cutting ETL cluster size by 50 percent saves money but risks
                  missing SLAs if completion time slides from 2 hours to 6 hours
                  without enough window headroom
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage tier costs vary dramatically: hot tier at $23 per TB
                  per month, cool at $10, archive at $2, but retrieval latency
                  goes from milliseconds to minutes to hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming pipelines cost 5x to 10x more than hourly
                  micro-batches due to 24/7 dedicated clusters, justified only
                  when you need subsecond to 5 minute freshness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spending 2 engineer weeks to save $500 per month is poor
                  economics when those engineers cost $10,000 per month in fully
                  loaded compensation
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
                  A company with 500 BI users scanning 100 TB per day on
                  BigQuery on-demand pays $500 per day ($15,000 per month).
                  Switching to flat rate pricing with slot reservations costs
                  $10,000 per month with predictable bills.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Moving 50 TB of year old logs from hot storage ($23 per TB) to
                  cool ($10 per TB) saves $650 per month. But if compliance
                  audits require instant access, retrieval fees plus latency
                  make this unworkable.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseCostOptimizationCostOptimizationTradeOffsWhenToOptimizeVsAcceptHigherCosts;
