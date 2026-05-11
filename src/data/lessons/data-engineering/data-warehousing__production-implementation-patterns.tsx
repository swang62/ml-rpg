import type { Component } from "solid-js";

const LessonDataWarehousingProductionImplementationPatterns: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Production Implementation Patterns
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          Building production grade data warehouses requires careful attention
          to ingestion contracts, transformation strategies, workload isolation,
          and lifecycle management. These patterns separate systems that scale
          reliably from those that collapse under load or leak costs. Ingestion
          must be idempotent and contract enforced. Use log based Change Data
          Capture (CDC) from Online Transaction Processing (OLTP) databases via
          write ahead logs to achieve low latency idempotent ingestion. Land raw
          data in bronze layer with immutable append only files, provenance
          metadata (source system, load timestamp, schema version), and schema
          validation at the boundary. Well tuned CDC can sustain 10,000 to
          100,000 events per second with end to end freshness under 5 minutes.
          Deduplication keys and checkpointed bookmarks ensure replaying
          messages does not create duplicates. Transformation layering follows
          medallion principles with clear service level agreements (SLAs) at
          each boundary. Bronze to silver applies cleaning, standardization, and
          Slowly Changing Dimension (SCD) Type 2 history with deterministic
          surrogate key assignment so late arriving records get correct keys.
          Silver to gold builds business optimized star schemas with
          pre-aggregated facts and materialized views to cap scan bytes for hot
          dashboards. Partition large fact tables by event date and cluster by
          high selectivity columns (customer ID, product ID) to maximize
          pruning, targeting gigabyte scale partitions that balance parallelism
          and metadata overhead. Workload isolation prevents resource contention
          and cost runaway. Separate compute pools or virtual warehouses for
          Extract Load Transform (ELT) jobs, Business Intelligence (BI) queries,
          and data science workloads ensure backfills do not starve interactive
          users. Apply admission control with per user or per group query
          quotas, result caching, and row or byte scan caps. Schedule large
          backfills in off peak windows and throttle them to preserve
          interactive latencies under 10 seconds for 95th percentile. Governance
          and lifecycle management are non negotiable at scale. Implement tiered
          storage: hot data (last 90 days) stays clustered and cached, warm and
          cold data moves to cheaper tiers with coarser partitions. Fine grained
          access controls include role based access at schema and table level,
          column masking for Personally Identifiable Information (PII), and row
          level predicates for tenant isolation. Data deletion for General Data
          Protection Regulation (GDPR) or California Privacy Rights Act (CPRA)
          compliance requires lineage aware cascade deletes or tombstoning
          strategies that do not break downstream aggregates. Monitor
          replication lag via source log sequence numbers, track end to end data
          delay, and alert when freshness Service Level Agreements (SLAs)
          breach, typically when lag exceeds 5 to 15 minutes for near real time
          pipelines.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Log based Change Data Capture (CDC) from write ahead logs
                enables idempotent ingestion sustaining 10,000 to 100,000 events
                per second with end to end freshness under 5 minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Partition large fact tables by event date and cluster by high
                selectivity columns (customer ID, product ID) targeting gigabyte
                scale partitions that balance parallelism and metadata overhead
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Workload isolation with separate compute pools for Extract Load
                Transform (ELT), Business Intelligence (BI), and data science
                prevents backfills from starving interactive queries and
                preserves 95th percentile latencies under 10 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Pre-aggregated gold layer materialized views cap scan bytes for
                hot dashboards, reducing per query scan from terabytes to
                gigabytes and cutting cost by 10x to 100x
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Fine grained access controls combine role based access at schema
                and table level, column masking for Personally Identifiable
                Information (PII), and row level predicates for multi tenant
                isolation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Tiered storage moves warm and cold data (older than 90 days) to
                cheaper object storage with coarser partitions, reducing storage
                costs from dollars per gigabyte per month to cents while
                maintaining queryability
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
                E-commerce platform ingesting order events via Debezium CDC from
                PostgreSQL write ahead log, landing in BigQuery bronze tables
                with deduplication on transaction ID and checkpointed log
                sequence numbers, achieving 50,000 events per second with 2
                minute end to end latency
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Media company partitioning 500 TB events fact table by
                event_date (daily partitions of 1.5 TB each) and clustering by
                user_id, reducing typical user cohort queries from scanning 500
                TB to 5 TB with date and user filters
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Financial services using Snowflake virtual warehouses: small
                warehouse for BI (auto suspend after 5 minutes idle, 2 to 8
                credits per hour), large warehouse for nightly ELT (runs 1 to 4
                AM, 128 credits per hour), separate X-Small for data science
                notebooks with strict per query timeout of 300 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                Retail data warehouse with gold layer revenue_daily_summary
                materialized view aggregating 50 billion fact rows to 10 million
                summary rows, reducing executive dashboard scan from 2 TB to 20
                GB and cutting query cost from 10 dollars to 10 cents per
                refresh
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataWarehousingProductionImplementationPatterns;
