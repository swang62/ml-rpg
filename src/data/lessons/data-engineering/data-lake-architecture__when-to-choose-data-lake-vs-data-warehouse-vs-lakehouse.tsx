import type { Component } from "solid-js";

const LessonDataLakeArchitectureWhenToChooseDataLakeVsDataWarehouseVsLakehouse: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When to Choose Data Lake vs Data Warehouse vs Lakehouse
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Real Question:</strong>
            The decision is not just technical, it's about your workload mix,
            team maturity, and cost tolerance. Each pattern optimizes for
            different constraints.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Data Lake
                </div>
                <div style="font-size: 12px">
                  Schema on read, raw flexibility, 2 to 3 dollars per TB per
                  month storage
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Data Warehouse
                </div>
                <div style="font-size: 12px">
                  Schema on write, high performance queries, 20 to 25 dollars
                  per TB per month
                </div>
              </div>
            </div>
            <strong>Choose Data Lake When:</strong>
            Your primary challenge is volume and variety. You're ingesting
            hundreds of TB per day from dozens of heterogeneous sources:
            application logs, clickstreams, Internet of Things (IoT) sensors,
            third party feeds. Upfront schema modeling would be a blocker
            because source formats change frequently or are semi structured.
            Query patterns are exploratory or batch oriented. Data scientists
            running ad hoc analyses on years of historical data, overnight ETL
            jobs aggregating metrics, or ML training jobs that need access to
            raw feature data. You can tolerate query latencies in the tens of
            seconds to minutes range. Your team has strong data engineering
            skills. Managing file formats, partition strategies, compaction
            jobs, and schema evolution requires expertise. But the payoff is
            massive cost savings: storing 5 PB in a lake costs roughly 10,000 to
            15,000 dollars per month versus 100,000 to 125,000 dollars in a
            traditional warehouse.
            <strong>Choose Data Warehouse When:</strong>
            Your primary need is interactive query performance and concurrent
            user support. Business analysts running dashboards, executives
            needing sub second response times for key metrics, applications
            querying aggregates in real time. Data volume is moderate (under 100
            TB) or you can curate a subset of hot data. Warehouses excel at
            structured, frequently accessed data with predictable query
            patterns. You value simplicity: load data, define schemas, write
            Structured Query Language (SQL), get results. No Spark clusters or
            partition tuning. Your team is analytics focused, not infrastructure
            focused. Managed warehouses like BigQuery, Snowflake, or Redshift
            handle optimization, scaling, and maintenance. You pay more per TB
            but save engineering time.
            <strong>Choose Lakehouse When:</strong>
            You want both flexibility and performance. Lakehouse architectures
            (using table formats like Delta Lake, Iceberg, or Hudi) add database
            features on top of lake storage: ACID transactions, schema
            enforcement, time travel, and efficient updates and deletes. This
            matters when you need to update dimension tables frequently (like
            customer profiles changing daily) or handle Change Data Capture
            (CDC) streams that require upserts. Traditional lakes force you to
            rewrite entire partitions for small updates. Lakehouses handle this
            efficiently. The trade off is complexity and metadata overhead.
            Lakehouses require managing transaction logs, compaction jobs to
            merge small files, and vacuum operations to clean up old versions.
            They also need newer compute engines that understand the table
            format.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not about which is 'better.' It is about
                matching storage cost, query latency requirements, update
                frequency, and team skills to your actual workload."
              </div>
            </div>
            <strong>Decision Framework with Numbers:</strong>
            If over 80 percent of your queries are interactive (under 10 seconds
            target latency) and data volume is under 50 TB, warehouse wins on
            simplicity. If you are storing over 500 TB with mostly batch
            workloads (minutes to hours latency tolerance), data lake saves 5x
            to 10x on storage and compute costs. If you need frequent updates
            (more than 1000 updates per second on fact tables) plus analytical
            queries, lakehouse patterns become necessary. Pure lakes struggle
            with small file churn, pure warehouses get expensive at high update
            volume. In practice, many companies run both: warehouse for curated,
            high performance analytics (maybe 20 TB of hot data), lake for long
            term storage and exploratory work (maybe 2 PB of historical data).
            The lakehouse pattern aims to unify these, but adds operational
            complexity that only pays off at scale.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data lake storage costs 2 to 3 dollars per TB per month versus
                  20 to 25 dollars for warehouse storage, making lakes
                  compelling when data volume exceeds 500 TB but most queries
                  can tolerate 30 to 60 second latencies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warehouses deliver sub 5 second p99 latencies for concurrent
                  users (supporting 100 plus simultaneous queries) with zero
                  tuning, while lakes require careful partitioning and file
                  sizing to achieve similar performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lakehouse patterns add 15 to 30 percent storage overhead for
                  transaction metadata but enable updates that would require
                  full partition rewrites in pure lakes, critical for Change
                  Data Capture (CDC) at over 10,000 updates per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The maturity curve matters: teams starting out benefit from
                  warehouse simplicity despite higher cost, graduating to lakes
                  or lakehouses only when engineering expertise and scale
                  justify the operational complexity
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
                  A startup with 5 TB of event data and 20 analysts uses
                  BigQuery as a warehouse, paying about 125 dollars per month in
                  storage and 500 dollars in query costs, preferring simplicity
                  over optimization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A media company with 3 PB of video metadata and logs uses S3
                  data lake with Spark for batch jobs and Athena for ad hoc
                  queries, spending 6000 dollars per month on storage versus
                  60,000 dollars a warehouse would cost, accepting 45 second
                  median query times
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An e commerce platform uses Delta Lake for order and inventory
                  tables receiving 5000 updates per second via Change Data
                  Capture (CDC), avoiding the small file explosion that would
                  occur with raw Parquet writes, while maintaining sub 15 second
                  query performance for analytics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataLakeArchitectureWhenToChooseDataLakeVsDataWarehouseVsLakehouse;
