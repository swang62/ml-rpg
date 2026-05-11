import type { Component } from "solid-js";

const LessonDataWarehousingEtlVsEltWhereToTransformData: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          ETL vs ELT: Where to Transform Data
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          The choice between Extract Transform Load (ETL) and Extract Load
          Transform (ELT) determines where your data transformation compute
          happens and fundamentally impacts architecture, cost, and operational
          complexity. ETL transforms data before loading it into the warehouse
          using external engines like Apache Spark, Airflow, or dedicated ETL
          tools. ELT loads raw data first, then leverages the warehouse's own
          Massively Parallel Processing (MPP) engine to transform it using SQL.
          ETL made sense historically when warehouses were expensive, tightly
          coupled appliances with limited compute capacity. By offloading
          transformations to cheaper external clusters, organizations protected
          precious warehouse resources for analytical queries. ETL also
          centralizes business logic in a separate layer, making it portable
          across different warehouse platforms. This matters when governance
          requires transformations to happen outside the data warehouse for
          regulatory isolation or when the same logic must feed multiple
          downstream systems simultaneously. ELT has become dominant with modern
          cloud warehouses that separate storage and compute. Amazon Redshift,
          Google BigQuery, and Snowflake can elastically scale compute to handle
          both transformation and query workloads. Loading raw data into bronze
          tables is simple: just bulk copy from object storage at pennies per
          gigabyte. Then SQL transformations run directly on the MPP engine,
          which is specifically optimized for set based operations on columnar
          data. This eliminates the need to maintain separate Spark clusters and
          orchestrate data movement between systems. The trade off is clear. ETL
          keeps transformation load off the warehouse and centralizes logic, but
          increases operational complexity with more systems to manage and
          potential lock in to external engines. ELT simplifies architecture by
          using one system, leverages purpose built MPP performance, but can
          balloon warehouse costs if not carefully managed with workload
          isolation and query optimization. Many production systems use hybrid
          patterns: ELT for heavy set based aggregations and joins, ETL only
          where external compute is mandatory for privacy transformations or
          cross system replication.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
            <div style="display: flex; gap: 24px; justify-content: center">
              <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                  ETL Pattern
                </strong>
                <div style="font-size: 12px; line-height: 1.6">
                  Extract → Transform (Spark) → Load
                  <br />
                  <br />
                  Pro: Logic centralized
                  <br />
                  Con: More systems
                </div>
              </div>
              <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                  ELT Pattern
                </strong>
                <div style="font-size: 12px; line-height: 1.6">
                  Extract → Load → Transform (SQL)
                  <br />
                  <br />
                  Pro: Leverage MPP
                  <br />
                  Con: Warehouse load
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ETL offloads transformation compute to external engines (Spark,
                Airflow) protecting warehouse capacity but requiring
                orchestration across multiple systems and potential vendor lock
                in
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ELT leverages the warehouse's Massively Parallel Processing
                (MPP) engine purpose built for set based operations on columnar
                data, simplifying architecture to a single platform
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Google BigQuery and Amazon Redshift charge approximately 5
                dollars per terabyte scanned, making poorly optimized ELT
                transforms that scan full tables repeatedly expensive at scale
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Workload isolation is critical for ELT: separate compute pools
                or virtual warehouses for transformation jobs prevent them from
                starving interactive Business Intelligence (BI) queries
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ETL is mandatory when privacy regulations require
                transformations (tokenization, masking) to happen outside the
                data warehouse or when the same logic must feed multiple target
                systems
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid patterns are common in production: use ELT for heavy
                aggregations and joins, reserve ETL only for cross system
                orchestration or compliance required external processing
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
                E-commerce company using ELT: raw clickstream lands in BigQuery
                bronze tables, dbt SQL models transform to silver
                (sessionization, user stitching) and gold (conversion funnels)
                entirely within BigQuery MPP engine
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Financial services using ETL: Spark job masks Social Security
                Numbers and tokenizes account numbers in external cluster before
                loading to Redshift, satisfying audit requirement that PII never
                enters warehouse in clear text
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Media company hybrid: bulk aggregations (100 billion rows to 1
                million summary rows) run as ELT SQL in Snowflake leveraging
                MPP, but cross platform sync to operational PostgreSQL database
                uses Airflow ETL orchestration
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataWarehousingEtlVsEltWhereToTransformData;
