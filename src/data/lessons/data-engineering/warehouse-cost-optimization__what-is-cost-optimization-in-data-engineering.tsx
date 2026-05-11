import type { Component } from "solid-js";

const LessonWarehouseCostOptimizationWhatIsCostOptimizationInDataEngineering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Cost Optimization in Data Engineering?
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
                <strong>Cost optimization</strong> in data engineering means
                controlling spending across three primary drivers: compute
                (processing power), storage (where data lives), and data
                movement (transferring data between systems or regions).
              </div>
            </div>
            <strong>The Core Problem:</strong> Analytic systems grow invisibly.
            You start with a few hundred gigabytes and simple nightly jobs.
            Within 18 months, you might have tens of terabytes, hundreds of
            daily pipelines, and thousands of Business Intelligence queries.
            Without deliberate design, cloud bills spiral out of control. Modern
            data warehouses like BigQuery, Snowflake, Redshift, and Databricks
            use consumption-based pricing. You pay per Central Processing Unit
            second, per node hour, or per terabyte scanned. A single
            misconfigured dashboard query that scans an entire 100 terabyte fact
            table to answer a "last 7 days" question can cost hundreds of
            dollars in minutes.
            <strong>The Fundamental Principle:</strong> Performance optimization
            IS cost optimization. Every unnecessary full table reload, every
            poorly partitioned table, every extra terabyte scanned translates
            directly into billed CPU and Input/Output operations.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Growth Pattern
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">200 GB</div>
                  <div style="font-size: 10px; font-weight: 600">MONTH 1</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10 TB</div>
                  <div style="font-size: 10px; font-weight: 600">MONTH 12</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50+ TB</div>
                  <div style="font-size: 10px; font-weight: 600">MONTH 18</div>
                </div>
              </div>
            </div>
            <strong>Three Core Concepts:</strong> First, separation of storage
            and compute allows you to scale query engines independently of data
            volume. Second, data layout strategies like partitioning and
            columnar storage dramatically reduce how much data each query
            touches. Third, elasticity and right sizing through auto-scaling and
            choosing between on-demand versus reserved capacity. The goal is
            simple: deliver required Service Level Agreements (dashboard latency
            under 5 seconds, daily batch completion by 6 a.m.) at minimum total
            cost.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Modern cloud warehouses charge per terabyte scanned or CPU
                  second, making every inefficient query directly visible in
                  your bill
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A single analyst accidentally scanning a 100 TB table to
                  answer a simple question can cost hundreds of dollars in
                  minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data systems typically grow from hundreds of gigabytes to tens
                  of terabytes within 18 months without visible warning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Performance optimization and cost optimization are the same
                  thing: minimizing work per query reduces both latency and
                  spending
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
                  At BigQuery pricing of around $5 per TB scanned, a query that
                  accidentally scans an entire 100 TB fact table costs $500.
                  With proper date partitioning limiting scans to 1 TB, the same
                  query costs $5.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A company processing 500,000 events per second ends up with
                  200 TB of historical data and 20 TB of active hot data within
                  2 years.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseCostOptimizationWhatIsCostOptimizationInDataEngineering;
