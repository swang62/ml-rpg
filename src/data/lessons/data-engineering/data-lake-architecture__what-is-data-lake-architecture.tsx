import type { Component } from "solid-js";

const LessonDataLakeArchitectureWhatIsDataLakeArchitecture: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Lake Architecture?
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
              <strong>Data Lake Architecture</strong> is a storage and
              processing pattern that uses cheap object storage as the
              foundation, holding raw and processed data in open formats (like
              Parquet or ORC), then layers compute engines, catalogs, and
              governance on top to make that data queryable and manageable at
              scale.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          Traditional data warehouses force you to model data upfront. When
          you're dealing with hundreds of data sources generating terabytes per
          day, this creates bottlenecks. You can't load semi structured logs,
          JSON events from mobile apps, or third party data dumps without
          extensive transformation first. That transformation work becomes a
          blocker for every new data source. Data lake architecture solves this
          by separating storage from compute. Storage is object storage (like
          Amazon S3, Google Cloud Storage, or Azure Blob Storage) costing just a
          few dollars per terabyte per month. Data lands in raw form first, then
          multiple compute engines can process it independently.
          <strong>How It Works:</strong>
          Think of it as three distinct layers working together: First, the
          storage layer holds everything as files in object storage. A
          clickstream event might be a compressed JSON file partitioned by date.
          There's no database managing this, just files organized in folders
          like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            /raw/clickstream/2024-01-15/
          </code>
          . Second, the compute layer runs processing jobs. These are temporary
          clusters (Spark, Presto, or similar) that spin up, read files from the
          lake, process them, write results back, then shut down. You pay only
          for compute time. Third, the catalog layer tracks metadata. Services
          like AWS Glue, Databricks Unity Catalog, or Google Data Catalog
          maintain a registry of what datasets exist, their schemas, locations,
          and owners. This makes the lake discoverable instead of a chaotic
          dump.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Netflix stores raw viewing events,
            transformed session summaries, and curated recommendation training
            datasets all in the same lake. Different teams query at different
            layers using different engines, all reading from the same underlying
            storage.
          </div>
          <strong>The Key Innovation:</strong>
          The pattern decouples who produces data from who consumes it. A mobile
          team can drop raw logs without knowing what analytics queries will
          run. An ML team can train models on years of historical data without
          copying it to a specialized store. All because storage is cheap and
          shared, while compute scales independently.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Object Storage</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  S3, GCS (cheap, durable)
                </div>
              </div>
              <div style="display: flex; gap: 20px; align-items: center">
                <div style="font-size: 20px; font-weight: bold">↑</div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
              </div>
              <div style="display: flex; gap: 12px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Spark</strong>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Presto</strong>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Athena</strong>
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold">↑</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Data Catalog</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Schemas, ownership
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
                Storage and compute separation means you can store petabytes
                cheaply (around 2 to 3 dollars per TB per month) while spinning
                compute up and down as needed, paying only for actual processing
                time
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Open file formats like Parquet or ORC enable any compute engine
                to read the data without vendor lock in, so you can switch from
                Spark to Presto without migrating storage
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The catalog layer provides governance and discoverability,
                turning what could be a data swamp into a managed platform where
                teams can find and trust datasets
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Raw ingestion happens independently from consumption, allowing
                producers to dump data without blocking on consumer requirements
                or schema design decisions
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
                A streaming pipeline writes 10 million clickstream events per
                hour as compressed Parquet files partitioned by hour into
                &lt;code style="padding: 2px 6px; background: #f5f5f5; border:
                1px solid #ddd; border-radius: 3px; font-family: monospace;
                font-size:
                0.9em;"&gt;/raw/events/dt=2024-01-15/hour=14/&lt;/code&gt;,
                costing about 50 dollars per TB per year in S3 Standard
                Infrequent Access
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An analytics team runs a daily Spark job that reads a week of
                raw events (roughly 1.7 billion events, 400 GB compressed),
                aggregates user sessions, and writes curated tables to &lt;code
                style="padding: 2px 6px; background: #f5f5f5; border: 1px solid
                #ddd; border-radius: 3px; font-family: monospace; font-size:
                0.9em;"&gt;/curated/sessions/&lt;/code&gt;, taking 20 minutes on
                a 50 node cluster
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A data scientist queries three years of historical session data
                (5 PB uncompressed, 800 TB compressed) for ML model training
                using a temporary 200 node cluster that runs for 4 hours then
                shuts down
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataLakeArchitectureWhatIsDataLakeArchitecture;
