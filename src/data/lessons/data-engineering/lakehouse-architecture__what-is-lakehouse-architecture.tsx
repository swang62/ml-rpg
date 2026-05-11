import type { Component } from "solid-js";

const LessonLakehouseArchitectureWhatIsLakehouseArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Lakehouse Architecture?
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
                <strong>Lakehouse Architecture</strong> combines data lake
                storage (cheap, scalable object storage) with data warehouse
                capabilities (ACID transactions, schema enforcement, fast
                queries) into a single unified system.
              </div>
            </div>
            <strong>The Core Problem:</strong>
            Companies like Netflix and Uber were maintaining two separate
            systems. Data lakes (on Amazon S3 or similar) stored petabytes of
            raw data cheaply but offered no guarantees: no transactions,
            inconsistent schemas, and slow queries because engines had to scan
            millions of files. Data warehouses provided fast analytics and
            strong consistency but cost 10x to 100x more per terabyte and
            struggled with unstructured data. This forced a painful workflow:
            raw data lands in the lake, then teams sync terabytes to warehouses
            nightly for analytics, then sync results back. This doubled storage
            costs, created consistency nightmares (which version is correct?),
            and added 6 to 24 hour delays.
            <strong>The Solution:</strong>
            Lakehouse adds a metadata layer directly on top of lake storage.
            Instead of treating S3 as a dump of files, you treat it as managed
            tables with schemas, transactions, and snapshots. Three open formats
            emerged: Delta Lake, Apache Iceberg, and Apache Hudi. All three let
            you run SQL queries and get warehouse performance while keeping data
            in cheap object storage.
            <strong>How It Works:</strong>
            You still store data as columnar files like Parquet on S3. But now a
            table format manages metadata that describes which files belong to
            each table, what the schema is, and what changed in each
            transaction. Query engines (Spark, Trino, Flink) read this metadata
            first to understand table structure, then scan only relevant files.
            You get ACID guarantees, time travel to previous versions, and sub
            second queries, all without moving data to an expensive warehouse.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Object Storage (S3/GCS)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Parquet Files: 1-10 PB
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Table Format Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Delta/Iceberg/Hudi Metadata
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Query Engines</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Spark, Trino, Flink
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lakehouse unifies data lake (cheap storage) and data warehouse
                  (ACID, fast queries) to eliminate dual system cost and sync
                  complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Traditional architectures forced companies to maintain both a
                  lake and warehouse, doubling storage costs and adding 6 to 24
                  hour sync delays
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Table formats (Delta Lake, Iceberg, Hudi) add metadata layers
                  that provide transactions, schemas, and snapshots directly on
                  object storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query engines read metadata first to understand table
                  structure, enabling partition pruning and file skipping for
                  sub second query performance
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
                  Netflix uses Iceberg to manage 10+ petabytes of data with
                  engines like Spark, Flink, and Trino, eliminating the need to
                  sync between lake and warehouse
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A company migrating from lake plus warehouse setup can reduce
                  storage costs by 40 to 60% by consolidating to lakehouse while
                  maintaining query performance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLakehouseArchitectureWhatIsLakehouseArchitecture;
