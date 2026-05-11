import type { Component } from "solid-js";

const LessonMetadataManagementHowMetadataFlowsThroughTheDataPlatform: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Metadata Flows Through the Data Platform
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Production Flow:
            </div>
            In a large scale lakehouse environment, metadata is produced and
            consumed at every stage of the data pipeline. Understanding this
            flow is critical for interviews because it reveals how catalogs
            integrate with the entire data stack.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Ingestion:</strong> Source systems (microservices,
                  operational databases, event streams) emit change data.
                  Ingestion pipelines land raw data into object storage at rates
                  like 5 to 50 terabytes (TB) per day with p50 ingestion latency
                  under 5 minutes and p99 under 15 minutes.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Schema Discovery:</strong> Tools like Airbyte or
                  internal connectors infer schemas from incoming data and
                  publish metadata events whenever columns are added or types
                  change. These events flow into a metadata service.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Transaction Logs:</strong> Storage layers like Delta
                  Lake or Apache Iceberg write transaction logs that include
                  which files belong to which table versions, row counts, and
                  operation types. This transactional metadata streams into the
                  catalog to build lineage and audit trails.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Aggregation:</strong> The metadata service aggregates,
                  normalizes, and indexes metadata into a searchable catalog. At
                  large companies, this might contain 100,000 to 1 million
                  datasets, 10 million to 100 million columns, and lineage
                  graphs with billions of edges.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  5
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Consumption:</strong> Analysts, ML engineers, and
                  automated services query the catalog to find datasets. They
                  expect sub-100 millisecond (ms) p50 latency and sub-300 ms p99
                  for typical lookups. Throughput can reach thousands of queries
                  per second (QPS) during working hours.
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Active Role of Catalogs:
            </div>
            This is not a passive index. The catalog is an active coordination
            service that influences how data is stored, transformed, discovered,
            and secured. When governance systems tag a column as PII, the
            catalog can automatically trigger masking for all consumers not in a
            privileged group. These access decisions must be fast, often under
            10 ms p99, because they sit in the hot path for query planning.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Catalog Query Performance
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;100ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P50 LOOKUP
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;300ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 LOOKUP
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">1000s</div>
                  <div style="font-size: 10px; font-weight: 600">QPS PEAK</div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real Implementation Examples:
            </div>
            Netflix built Metacat as a federated catalog across Hive, RDS, and
            other stores, exposing a unified API to thousands of data engineers.
            LinkedIn created DataHub with push based ingestion from dozens of
            systems and a graph backend for lineage traversal over millions of
            nodes. Databricks Unity Catalog centralizes schema and permission
            management across workspaces and clouds, integrating transaction
            logs for strong lineage guarantees. AWS Glue Data Catalog acts as a
            centralized schema store for S3 data, tightly integrated with Athena
            and Redshift for zero copy access. The key insight is that the
            catalog sits at the intersection of storage, compute, and
            governance, making it a critical component in the data platform
            architecture.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 200px; text-align: center">
                  <strong style="font-size: 13px">Sources</strong>
                  <div style="font-size: 10px; margin-top: 2px">
                    5-50 TB/day, p99&lt;15min
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 200px; text-align: center">
                  <strong style="font-size: 13px">Ingestion + Schema</strong>
                  <div style="font-size: 10px; margin-top: 2px">
                    Airbyte, Connectors
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 200px; text-align: center">
                  <strong style="font-size: 13px">Lakehouse Storage</strong>
                  <div style="font-size: 10px; margin-top: 2px">
                    Delta/Iceberg logs
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 220px; text-align: center">
                  <strong style="font-size: 14px">Metadata Catalog</strong>
                  <div style="font-size: 10px; margin-top: 2px">
                    100K-1M datasets indexed
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 200px; text-align: center">
                  <strong style="font-size: 13px">Consumers</strong>
                  <div style="font-size: 10px; margin-top: 2px">
                    Analysts, ML, BI (1000s QPS)
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
                  Metadata flows event driven through the pipeline: ingestion
                  tools publish schema changes, storage layers like Delta Lake
                  emit transaction logs, and the catalog aggregates everything
                  into a unified index
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale, catalogs handle 100,000 to 1 million datasets with
                  billions of lineage edges, serving thousands of QPS with
                  sub-100 ms p50 and sub-300 ms p99 latency for lookups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The catalog is not passive: it sits in the hot path for query
                  planning and access control, making policy decisions in under
                  10 ms p99 to avoid blocking queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real implementations vary: Netflix Metacat federates across
                  stores, LinkedIn DataHub uses graph backends for lineage,
                  Databricks Unity Catalog integrates transaction logs for
                  strong guarantees
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
                  When a Delta Lake table commits a new version, it writes a
                  transaction log entry with operation type, file paths, and row
                  counts. A listener streams this to the catalog within seconds,
                  updating freshness timestamps and lineage graphs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An analyst queries the catalog for "tables containing user
                  email." The catalog searches across 500,000 datasets using an
                  inverted index, returning 47 matches in 68 ms with owners,
                  SLAs, and PII tags.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A governance policy tags a column as PII. The catalog
                  propagates this to all query engines. When a non-privileged
                  user queries the table, the engine asks the catalog for
                  policies, receives a "mask column" directive in 8 ms, and
                  applies it before returning results.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMetadataManagementHowMetadataFlowsThroughTheDataPlatform;
