import type { Component } from "solid-js";

const LessonDataWarehousingWhatIsDataWarehouseArchitecture: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Warehouse Architecture?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          A data warehouse is an analytical data store built specifically for
          high throughput scans, wide joins, and aggregations over large volumes
          of historical data. Unlike transactional databases optimized for
          single row lookups and writes, warehouses are designed to answer
          business questions that scan millions or billions of rows in seconds.
          The canonical three tier architecture separates concerns cleanly. The
          bottom tier handles storage and ingestion, where Extract Transform
          Load (ETL) or Extract Load Transform (ELT) pipelines bring data in.
          The middle tier provides the analytical serving layer, typically a
          Massively Parallel Processing (MPP) engine or Online Analytical
          Processing (OLAP) cube that executes queries across many nodes
          simultaneously. The top tier is where business users consume data
          through Business Intelligence (BI) tools, dashboards, and data science
          notebooks. Modern warehouses often use medallion layering to organize
          data quality and transformation stages. Bronze layer holds raw,
          immutable data exactly as ingested with full provenance metadata.
          Silver layer contains cleaned, conformed data with Slowly Changing
          Dimensions (SCDs) and standardized business keys. Gold layer provides
          business ready marts with pre-aggregated metrics and optimized
          layouts. For example, Google BigQuery commonly scans 50 to 200 GB per
          dashboard refresh, completing in 2 to 15 seconds when tables are well
          partitioned and clustered. Performance comes from columnar storage
          that reads only needed columns, aggressive compression often yielding
          5 to 10 times size reduction, partitioning that prunes irrelevant data
          blocks, and vectorized execution that processes thousands of rows per
          CPU instruction. Amazon Redshift clusters scan data at aggregate rates
          of tens to hundreds of GB per second when sort keys and distribution
          strategies align with query patterns.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Bronze Layer</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Raw immutable data
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Silver Layer</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Cleaned, conformed keys
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Gold Layer</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Business ready marts
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
                Three tier architecture separates ingestion (bottom), analytical
                execution (middle), and consumption (top) for clear separation
                of concerns and independent scaling
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Columnar storage with compression reduces 1 petabyte of raw data
                to 100 to 300 terabytes stored, enabling faster scans by reading
                only required columns
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Massively Parallel Processing (MPP) distributes query execution
                across nodes, achieving scan rates of tens to hundreds of GB per
                second on well configured clusters
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Medallion layers (bronze raw, silver conformed, gold business
                ready) establish clear data quality gates and transformation
                responsibilities between pipeline stages
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Google BigQuery typically completes dashboard queries scanning
                50 to 200 GB in 2 to 15 seconds with thousands of concurrent
                workers when partitioning is optimized
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Enterprise warehouses commonly handle 10,000 to 100,000 daily
                queries across 50 to 500 active users with tens to hundreds of
                terabytes in managed storage
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
                Amazon Redshift cluster with 10 nodes, each scanning 10 GB per
                second, completes a 500 GB analytical query in approximately 5
                seconds with proper sort keys and distribution
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Google BigQuery project storing 300 TB after 5x compression from
                1.5 PB raw data, with tables partitioned by event date and
                clustered by customer ID for fast user cohort analysis
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Bronze to silver transformation applying schema validation,
                deduplication by source transaction ID, and SCD Type 2 tracking
                for customer dimension changes with effective date ranges
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataWarehousingWhatIsDataWarehouseArchitecture;
