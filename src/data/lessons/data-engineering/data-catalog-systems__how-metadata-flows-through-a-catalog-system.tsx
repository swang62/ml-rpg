import type { Component } from "solid-js";

const LessonDataCatalogSystemsHowMetadataFlowsThroughACatalogSystem: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Metadata Flows Through a Catalog System
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Ingestion Challenge:</strong>A data catalog must
            continuously learn about changes across your entire data platform.
            When someone creates a table, runs a pipeline, or updates a
            dashboard, the catalog needs to know. At companies like LinkedIn or
            Netflix, this means processing tens of thousands of metadata events
            per minute across millions of entities. The ingestion layer supports
            two patterns. Push based ingestion receives events in real time.
            When a scheduled job completes, the orchestration system emits a
            lineage event describing which datasets were read and written. The
            catalog ingests these immediately, updating its graph within
            seconds. Pull based ingestion uses periodic crawlers that scan data
            stores every few hours, discovering new tables and schema changes
            even when systems don't emit events.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Discovery phase:</strong> A pipeline writes a new
                  table to the warehouse. Within 30 to 120 seconds, either an
                  event arrives or a crawler detects it. The catalog extracts
                  schema, infers owner from job metadata, and creates an entity
                  record.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Lineage capture:</strong> Every job run generates
                  lineage events. A single job might read from 5 input tables
                  and write to 2 output tables. At LinkedIn scale with hundreds
                  of millions of lineage edges, the catalog ingests thousands of
                  these updates per second.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Indexing:</strong> Background workers denormalize
                  metadata and build search indexes. They compute derived fields
                  like popularity scores (based on query counts) and trust
                  levels (based on certification and quality checks).
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Query serving:</strong> When an analyst searches, the
                  request fans out to search indexes. The service ranks results
                  using freshness, usage, and ownership signals, returning top
                  matches in under 300 ms at p95 latency.
                </div>
              </div>
            </div>
            <strong>Consistency Model:</strong>
            The catalog trades strong consistency for scalability. Critical user
            edits like updating a table description or changing ownership use
            read after write consistency. The system writes through both the
            metadata store and search index in a single operation, so your
            change appears immediately. Most other updates are eventually
            consistent within 1 to 5 minutes. When a job runs at 3:00 PM and
            updates lineage, the lineage graph might not reflect that change
            until 3:02 PM. For discovery and documentation, this delay is
            acceptable and allows the system to buffer events, batch updates,
            and handle much higher throughput.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Assuming all metadata needs
              real time updates. Real time ingestion under 1 second is expensive
              and complex. Most use cases work fine with minute level delays,
              which dramatically simplifies architecture and reduces cost.
            </div>
            <strong>Scale Numbers:</strong>
            At companies like Uber and Airbnb, a production catalog handles
            10,000 to 100,000 metadata mutations per minute. The ingestion
            pipeline needs buffering with message queues, retry logic for failed
            events, and idempotent processing since events may arrive multiple
            times. Background reconciliation jobs regularly rescan sources,
            catching any missed events. This two layer approach (fast event
            ingestion plus periodic reconciliation) ensures metadata stays
            accurate even when individual events are lost.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Event Ingestion</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10k-100k events/min
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="flex: 1; height: 2px"></div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Metadata Store</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Entities &amp; relationships
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="flex: 1; height: 2px"></div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Search Index</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    1-5 min eventual consistency
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
                  Push based ingestion captures events in real time while pull
                  based crawling discovers changes that systems don't emit,
                  creating redundant coverage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At LinkedIn scale, ingestion handles thousands of lineage
                  updates per second across hundreds of millions of edges while
                  keeping query latency under 200 ms p99
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Critical user edits use read after write consistency for
                  immediate visibility, while background metadata updates are
                  eventually consistent within 1 to 5 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Buffering with message queues, retry logic, and idempotent
                  processing handle event delivery failures and duplicate
                  messages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Periodic reconciliation jobs rescan sources to catch missed
                  events, ensuring metadata accuracy despite individual event
                  losses
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
                  A data engineer updates a table description at 2:00 PM. The
                  write goes to both the metadata store and search index
                  atomically. When they refresh the page at 2:00:05, their
                  change is visible immediately.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A pipeline runs at 3:00 PM, reading from 5 tables and writing
                  to 2 tables. The orchestrator emits 7 lineage relationships.
                  These are buffered in a queue, processed in batches, and
                  visible in the lineage graph by 3:02 PM.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A warehouse creates 500 new tables overnight. The morning
                  crawler run at 8:00 AM discovers them all, even though no
                  events were emitted. By 8:30 AM all are searchable in the
                  catalog.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataCatalogSystemsHowMetadataFlowsThroughACatalogSystem;
