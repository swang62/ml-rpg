import type { Component } from "solid-js";

const LessonWarehouseArchitectureHowModernWarehouseArchitectureWorksAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Modern Warehouse Architecture Works at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The End to End Flow:</strong>
            At FAANG scale, you have hundreds of microservices each generating
            thousands of writes per second to their own OLTP databases, plus
            event streams emitting 100k to 1M events per second. The warehouse
            needs to ingest this data, transform it, and make it queryable
            within minutes, all without impacting production systems.
            <strong>Change Data Capture (CDC) for OLTP Sources:</strong>
            Running{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              SELECT * FROM users
            </code>{" "}
            every hour on a 100 million row table would crush your production
            database. Instead, CDC pipelines monitor the database transaction
            log and capture only inserts, updates, and deletes as they happen.
            The pipeline publishes these changes to a message queue, then writes
            them to the data lake as partitioned files (typically partitioned by
            date and hour). End to end lag from database commit to data lake
            landing is typically under 1 minute. This gives you four nines
            durability in the lake without putting read load on OLTP systems.
            <strong>Streaming Ingestion for Events:</strong>
            User clicks, application logs, and IoT telemetry arrive as event
            streams. A streaming ingestion layer consumes from message queues
            like Kafka, batches events into files every few minutes, and writes
            them to the lake partitioned by event time. At companies like
            Netflix, this might mean ingesting 50 TB daily from click streams
            alone.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Ingestion Latency Targets
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;1 min</div>
                  <div style="font-size: 10px; font-weight: 600">CDC LAG</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2-5 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    EVENT STREAMS
                  </div>
                </div>
              </div>
            </div>
            <strong>Medallion Transformation Pattern:</strong>
            Raw data lands as bronze tables: immutable, append only files with
            exactly the schema from the source. A transformation layer reads
            bronze, applies cleaning and normalization, and writes silver tables
            with conformed schemas. Finally, it computes business metrics and
            aggregates into gold tables optimized for specific use cases. At
            Uber scale, daily transformation jobs scan tens of petabytes but
            finish within 1 to 3 hour Service Level Agreements (SLAs) by
            distributing work across thousands of compute cores. The key is that
            compute can scale horizontally: add more workers to process more
            data in the same time.
            <strong>Serving with Elastic Compute:</strong>
            The serving layer runs a distributed SQL engine that reads from
            curated gold tables. When 500 analysts arrive at 9am and start
            querying, the system automatically spins up more compute nodes. When
            load drops in the evening, it scales back down. This elasticity is
            the breakthrough: you pay for compute only when you use it, and you
            can handle spikes without manual intervention. Production dashboards
            query with 10 to 30 second timeouts. Interactive exploration targets
            sub second to few second latency by leveraging result caching,
            materialized views of common aggregates, and columnar storage that
            only reads the columns you need.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">OLTP DB</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      5k writes/sec
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">CDC</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      &lt;1 min lag
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Bronze</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Raw files
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Event Stream</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      100k events/sec
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Streaming</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      2-5 min lag
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Bronze</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Raw files
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Silver → Gold (Transformation)
                  </strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    Hourly/Daily Jobs | 1-3 hour SLA
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">SQL Engine (Elastic)</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    500+ concurrent queries | p50 &lt;2s
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
                  CDC pipelines capture only changed rows from OLTP databases by
                  reading transaction logs, achieving under 1 minute lag without
                  impacting production read/write performance.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Medallion pattern organizes data as bronze (raw, immutable),
                  silver (cleaned, conformed), and gold (business metrics), with
                  each stage independently scalable.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming ingestion batches events every few minutes into
                  partitioned files. At Netflix scale, this means 50 TB daily
                  from click streams with 2 to 5 minute end to end latency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Elastic compute in the serving layer scales from 10 to 100+
                  nodes in minutes to handle query spikes, then scales down to
                  save costs during low usage periods.
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
                  A CDC pipeline on a 100 million row users table monitors the
                  transaction log and publishes 5,000 changes per second to the
                  data lake with 30 second lag, versus full table scans that
                  would take 10+ minutes and lock production.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Daily transformation jobs at Uber scan tens of petabytes
                  across thousands of cores and complete within 1 to 3 hours,
                  meeting SLAs for morning dashboard refresh.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseArchitectureHowModernWarehouseArchitectureWorksAtScale;
