import type { Component } from "solid-js";

const LessonWarehouseArchitectureWhatIsAModernDataWarehouse: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is a Modern Data Warehouse?
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
              A <strong>modern data warehouse</strong> is a centralized
              repository optimized for analytical queries that separates storage
              from compute, enabling elastic scaling to handle complex analytics
              and machine learning on petabytes of data from diverse sources
              without impacting transactional systems.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          Companies have hundreds of microservices, each with its own Online
          Transaction Processing (OLTP) database designed for fast reads and
          writes of individual records. Product managers want to ask questions
          like "What's our revenue by region?" or "Which features drive
          retention?" These analytical queries need to scan millions of rows
          across multiple databases. Running these queries directly on OLTP
          systems would be disastrous. A query scanning 10 million user records
          might take 30 seconds and lock tables, causing your production API to
          timeout for actual customers. You need a separate system designed for
          analytics.
          <strong>Three Core Layers:</strong>
          Modern data warehouses evolved from traditional three tier
          architectures but adapted for cloud scale:
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Ingestion layer:</strong> Pulls data from OLTP
                databases, event streams, APIs, and logs using both batch and
                streaming approaches.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Storage and processing:</strong> Lands data in cheap
                object storage as a data lake, then transforms it into curated
                analytical models. Separates compute from storage so each can
                scale independently.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Serving layer:</strong> Exposes data through SQL engines
                optimized for analytical queries, with low latency and high
                concurrency for BI tools and applications.
              </div>
            </div>
          </div>
          <strong>Why "Modern"?</strong>
          Traditional warehouses were monolithic appliances with fixed capacity.
          If you needed more power, you bought bigger hardware and migrated
          everything over months. Modern warehouses run in the cloud and can
          elastically scale compute up 10x in minutes when you need to run your
          quarterly reporting crunch, then scale back down to save costs.
          Systems like Snowflake, BigQuery, Redshift, and Databricks implement
          this pattern. They let you ingest 5 to 50 TB of new data daily, handle
          peak event rates of 100k to 1M events per second, and serve hundreds
          of concurrent analysts running queries that scan billions of rows with
          p50 latency under 2 seconds.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Sources</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  OLTP DBs, Events, APIs
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Ingestion</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  CDC, Streaming, Batch
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Storage + Transform</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Lake → Bronze → Silver → Gold
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Serving</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  BI Tools, ML, APIs
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
                Modern data warehouses separate storage from compute, allowing
                each to scale independently. Traditional warehouses bundled them
                together in fixed capacity appliances.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Three core layers: ingestion pulls from sources, storage and
                processing transforms raw data into curated models, serving
                exposes it through analytical engines.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Designed for analytical workloads that scan millions to billions
                of rows, not transactional workloads that read/write individual
                records.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cloud based systems can handle 5 to 50 TB of daily ingestion and
                serve hundreds to thousands of concurrent queries with sub
                second to few second latency.
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
                A retail company ingests 10 TB daily from 200 microservices,
                transforms it through bronze (raw), silver (cleaned), and gold
                (business metrics) tables, then serves dashboards to 500
                analysts with p95 query latency under 5 seconds.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                During quarterly reporting, compute scales from 10 nodes to 100
                nodes in under 5 minutes to handle the spike, then scales back
                down automatically.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonWarehouseArchitectureWhatIsAModernDataWarehouse;
