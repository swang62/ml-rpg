import type { Component } from "solid-js";

const LessonWarehouseArchitectureTradeOffsDataWarehouseVsLakeVsLakehouse: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Data Warehouse vs Lake vs Lakehouse
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Trade-off:</strong>
            You are always trading structure and performance for flexibility and
            cost. A highly structured data warehouse gives you fast queries and
            strong governance but costs more and requires upfront schema design.
            A flexible data lake gives you cheap storage and schema on read but
            slower queries and weaker governance. Lakehouses try to split the
            difference.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Data Warehouse
                </div>
                <div style="font-size: 12px">
                  Fast queries (p50 &lt;2s), high concurrency (500+ users), but
                  2x to 5x storage cost
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Data Lake
                </div>
                <div style="font-size: 12px">
                  Cheap storage ($0.02/GB), flexible schemas, but slower queries
                  (10s to minutes)
                </div>
              </div>
            </div>
            <strong>When to Choose a Data Warehouse:</strong>
            Use a warehouse when you have high concurrency analytical workloads
            with low latency requirements. If 500 business analysts need to run
            dashboard queries during business hours with p95 latency under 10
            seconds, a warehouse is the right choice. The compute cost
            (typically $2 to $10 per compute hour depending on size) is
            justified by the productivity gain. Warehouses also make sense when
            you need strong schema enforcement and governance. Financial
            reporting, compliance dashboards, and any use case where incorrect
            data has significant consequences benefits from the validation and
            access control warehouses provide. The typical profile: 70%+ read
            workloads, queries that scan aggregated or filtered data (not full
            raw tables), need for sub 5 second interactive latency, and
            willingness to pay 2x to 5x more for storage to get structured,
            optimized formats.
            <strong>When to Choose a Data Lake:</strong>
            Use a lake when storage cost dominates and query latency is
            flexible. If you need to retain 5 years of raw logs for compliance
            but only query them occasionally, storing in a lake at $0.02 per GB
            per month versus $0.10 per GB in a warehouse saves 80% on storage.
            Lakes are also better for exploratory data science where schemas are
            evolving. Data scientists can dump JSON, CSV, or Parquet files into
            the lake, iterate on transformations in notebooks, and only move to
            structured tables once the model stabilizes. The typical profile:
            mostly write or append workloads, infrequent queries (daily or
            weekly batch jobs), tolerance for 30 second to 5 minute query
            latency, schemas that change frequently, or very large volumes
            (multi petabyte) where storage cost is the primary concern.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't lake versus warehouse. It's: who are your
                users, what's their latency expectation, and what's the
                read/write ratio?"
              </div>
            </div>
            <strong>The Lakehouse Compromise:</strong>
            Lakehouses (like Delta Lake on Databricks or Iceberg) try to give
            you warehouse performance on lake storage. They add transaction
            support, schema enforcement, indexing, and caching on top of cheap
            object storage. This reduces duplication: you store data once in the
            lake and serve both batch jobs and interactive queries from the same
            tables. The catch is complexity. You are now responsible for table
            compaction, managing metadata, tuning file sizes, and handling
            concurrency control. In a managed warehouse like BigQuery, this is
            automatic. In a lakehouse, you configure and monitor it. Lakehouses
            work well when you have strong data engineering teams and want
            control over storage layout and compute. They are less ideal when
            you need to onboard hundreds of SQL analysts who expect "it just
            works" warehouse behavior.
            <strong>Cost Reality Check:</strong>
            For a 100 TB dataset with 10,000 queries per day: Data lake storage:
            100 TB × $0.02/GB = $2,000/month. Queries via a compute engine like
            Spark or Presto might cost $5,000 to $10,000/month depending on
            query complexity. Data warehouse: 100 TB × $0.10/GB = $10,000/month
            storage, plus $10,000 to $30,000/month compute depending on
            concurrency and query patterns. Total $20,000 to $40,000/month.
            Lakehouse: $2,000/month storage, but $8,000 to $20,000/month for
            compute and metadata services. Total $10,000 to $22,000/month,
            sitting between lake and warehouse. The warehouse costs 2x to 4x
            more but delivers 10x better query latency and concurrency. For
            business critical dashboards, that is often worth it. For archival
            data and batch ML training, the lake saves significantly.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data warehouses cost 2x to 5x more than lakes ($0.10/GB vs
                  $0.02/GB storage) but deliver 10x to 50x better query
                  performance and support 500+ concurrent users.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose warehouses for high concurrency, low latency (p95 under
                  10 seconds) analytical workloads with 70%+ reads. Choose lakes
                  for write heavy, batch oriented, or infrequent query
                  workloads.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lakehouses reduce duplication by storing once and serving both
                  batch and interactive queries, but require you to manage
                  compaction, metadata, and concurrency that managed warehouses
                  handle automatically.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 100 TB scale, lakes cost around $2k/month storage plus $5k
                  to $10k compute. Warehouses cost $20k to $40k total.
                  Lakehouses sit in between at $10k to $22k, trading cost for
                  control.
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
                  A fintech company uses a warehouse for real time fraud
                  dashboards (500 analysts, p95 latency under 5 seconds) and a
                  lake for 3 years of archived transaction logs queried monthly
                  for audit reports.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spotify moved from a warehouse to a lakehouse, saving 40% on
                  storage costs while maintaining query performance by tuning
                  compaction and Z ordering on &lt;code&gt;user_id&lt;/code&gt;
                  and &lt;code&gt;timestamp&lt;/code&gt;.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseArchitectureTradeOffsDataWarehouseVsLakeVsLakehouse;
