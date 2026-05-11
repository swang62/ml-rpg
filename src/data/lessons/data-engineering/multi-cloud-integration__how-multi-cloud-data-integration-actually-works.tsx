import type { Component } from "solid-js";

const LessonMultiCloudIntegrationHowMultiCloudDataIntegrationActuallyWorks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Multi-Cloud Data Integration Actually Works
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Architecture in Practice:</strong> Real multi-cloud
            integration appears when different business capabilities live in
            different clouds. Imagine user-facing microservices in AWS
            responding at 5 to 10 milliseconds p50 latency, ad targeting and
            machine learning in GCP, and enterprise analytics in a multi-cloud
            warehouse like Snowflake or Databricks.
            <strong>The Event Flow:</strong> User actions hit AWS APIs and
            immediately publish events to a cloud-neutral event bus operated by
            a streaming provider like Confluent with clusters in multiple
            clouds. Within 50 to 100 milliseconds p99, those events replicate to
            a GCP region where ML models consume them for recommendations. This
            is not hypothetical: systems routinely process tens of thousands of
            events per second this way. Separately, Change Data Capture
            processes in AWS stream transactional updates like orders and
            payments into the same event backbone. Downstream, micro-batches of
            1 to 5 minutes ingest these streams into multi-cloud warehouses.
            Data volumes commonly reach 1 to 10 terabytes per day.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Cross-Cloud Event Latency
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50-100ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 REPLICATION
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">1-5min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    BATCH INGESTION
                  </div>
                </div>
              </div>
            </div>
            <strong>Headless Data Architecture:</strong> Modern platforms like
            Databricks support a headless approach. Data lives in cloud object
            stores (S3, Google Cloud Storage, Azure Blob), but access is unified
            through a common catalog and governance layer. A query engine like
            Trino reads from both AWS and GCP object stores using data
            virtualization, minimizing duplication. Cross-cloud analytics
            queries typically complete in 2 to 10 seconds at p95. That is
            acceptable for business intelligence dashboards but far too slow for
            user-facing APIs. This creates a natural separation: operational
            queries stay local, analytical queries federate across clouds.
            <strong>The Orchestration Layer:</strong> An Integration Platform as
            a Service (iPaaS) provides operational control. It auto-scales
            ingestion workers across regions, monitors pipeline lag and error
            rates, and enforces governance constraints. For example, it ensures
            Personally Identifiable Information (PII) for European Union users
            never leaves EU regions even when compute spans multiple clouds. The
            result is composable architecture. Each cloud handles its strengths.
            Data flows are governed centrally with clear SLAs and blast radius
            containment. When one cloud experiences issues, the system degrades
            gracefully rather than failing completely.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">AWS Services</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5-10ms p50 latency
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Event Bus</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Multi-cloud clusters
                  </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="font-size: 20px; font-weight: bold">↙</div>
                  <div style="font-size: 20px; font-weight: bold">↘</div>
                </div>
                <div style="display: flex; gap: 12px; width: 100%">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">GCP ML</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      50-100ms p99
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Analytics</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      1-5min batch
                    </div>
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
                  Event driven streaming with cloud-neutral buses like Confluent
                  enables near real-time integration with 50 to 100 ms p99
                  cross-cloud replication latency and support for tens of
                  thousands of events per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Headless architectures separate data storage in object stores
                  from compute engines, allowing multiple query engines (Spark,
                  Flink, Trino) to access the same data through a unified
                  catalog without duplication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Integration platforms (iPaaS) provide the orchestration layer
                  that auto-scales workers, monitors pipeline health, and
                  enforces governance like data residency requirements across
                  all clouds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross-cloud analytics queries typically run in 2 to 10 seconds
                  p95, which is suitable for business intelligence but too slow
                  for operational workloads that must stay local to their cloud
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
                  A media company publishes user engagement events from AWS to a
                  multi-cloud Confluent cluster. GCP consumers process these
                  events for content recommendations within 100 ms, while a
                  Snowflake warehouse ingests micro-batches every 3 minutes for
                  reporting on 5 TB of daily event data.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An e-commerce platform uses Change Data Capture to stream
                  order updates from an AWS PostgreSQL database through Kafka to
                  both a GCP real-time fraud detection service and an Azure data
                  lake, all governed by a central iPaaS that enforces PII
                  tokenization before cross-cloud transfer.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiCloudIntegrationHowMultiCloudDataIntegrationActuallyWorks;
