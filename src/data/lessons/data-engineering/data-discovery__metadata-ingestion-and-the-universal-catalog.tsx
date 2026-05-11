import type { Component } from "solid-js";

const LessonDataDiscoveryMetadataIngestionAndTheUniversalCatalog: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Metadata Ingestion and the Universal Catalog
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Ingestion Challenge:
            </div>
            At scale, new tables, views, and Kafka topics appear constantly. A
            large company might add thousands of datasets per month across
            multiple warehouses, data lakes, and streaming platforms. The
            discovery system must continuously capture metadata from all these
            sources without becoming a bottleneck or missing critical updates.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Two Ingestion Patterns:
            </div>
            Discovery systems use a hybrid approach combining batch crawlers and
            event driven ingestion. Batch crawlers periodically scan storage
            systems, warehouses, streaming platforms, and BI tools to detect new
            or changed entities. Critical systems are crawled every few minutes,
            while long tail systems are scanned daily. This catches changes even
            when source systems do not emit events. Event driven ingestion
            listens to schema registries, job orchestration events, and catalog
            update events. When a pipeline creates a new table or a schema
            changes, the discovery system receives an immediate notification.
            This reduces latency from minutes or hours to seconds and avoids
            expensive full rescans.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Metadata Update Latency
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    BATCH ONLY
                  </div>
                  <div style="font-size: 16px; font-weight: 800">30 min</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">HYBRID</div>
                  <div style="font-size: 16px; font-weight: 800">2 min</div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Building the Universal Catalog:
            </div>
            Raw metadata from diverse sources must be normalized into a
            canonical model. This model typically includes datasets, fields,
            pipelines, dashboards, users, and the relationships between them.
            Modern lakehouse platforms like Google Dataplex and AWS lakehouse
            stacks position a universal catalog that spans data lakes with open
            formats like Apache Iceberg, warehouses, and ML platforms. The
            processing layer enriches this raw metadata with field level
            statistics from profiling runs, including null counts and
            cardinality. It adds data quality metrics like success rates and
            freshness. It applies classification labels for Personally
            Identifiable Information (PII), financial data, and confidential
            information using rules and machine learning models. Finally, it
            assigns ownership and domain information based on organization data.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> If metadata ingestion lags or
              breaks silently, users discover datasets that are deprecated or
              broken. This erodes trust faster than having no discovery system
              at all. A common Service Level Objective (SLO) is that critical
              metadata changes are visible in discovery within a few minutes.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Storage Requirements:
            </div>
            The metadata store needs strong consistency for updates to critical
            entities, efficient graph traversal for lineage queries, and
            versioning for audit purposes. Many companies manage fewer than 100
            million nodes and edges in their metadata graph, which is tractable
            with proper indexing in relational databases, graph databases, or
            key value stores with secondary indexes.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid ingestion combines batch crawlers for completeness with
                  event driven updates for low latency, achieving metadata
                  freshness of a few minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A universal catalog normalizes metadata from lakes,
                  warehouses, and streaming platforms into a canonical model
                  with datasets, fields, and relationships
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enrichment adds field level statistics, quality metrics, PII
                  classification, and ownership information on top of raw
                  technical metadata
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common SLO is metadata updates visible within a few minutes
                  for critical systems; stale metadata breaks user trust faster
                  than no discovery at all
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
                  When a data engineer creates a new Iceberg table in the lake,
                  a schema registry event triggers immediate ingestion into the
                  catalog, making it searchable within 2 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A profiling job runs nightly on high value datasets,
                  extracting null counts and cardinality for all columns and
                  storing them in the catalog for search filters
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataDiscoveryMetadataIngestionAndTheUniversalCatalog;
