import type { Component } from "solid-js";

const LessonDataLakeArchitectureMultiZoneDataLakePatternsRawToCurated: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Multi Zone Data Lake Patterns: Raw to Curated
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Architectural Challenge:</strong>
            Once you commit to a data lake, the next question is how to organize
            it. Dumping everything into one flat namespace creates chaos. At
            scale, you need zones that reflect data maturity and quality levels,
            guiding consumers to the right layer for their needs. The most
            common pattern is a three zone architecture, often called bronze
            silver gold or raw refined curated. Each zone represents a stage in
            the data lifecycle with different quality guarantees and access
            patterns.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Raw Zone (Bronze):</strong> Data lands here exactly as
                  received from producers. No transformations, no cleaning. A
                  mobile app event arrives as JSON with all its quirks. Arrival
                  time might be sub second for streaming or hourly for batch.
                  Data is immutable and partitioned by ingestion timestamp.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Refined Zone (Silver):</strong> ETL jobs clean,
                  normalize, and deduplicate raw data. Schema is enforced, nulls
                  are handled, duplicates removed by business key. For high
                  volume streams processing 1 million events per second, micro
                  batch jobs might run every 5 minutes with p99 completion under
                  2 minutes, keeping freshness under 7 minutes end to end.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Curated Zone (Gold):</strong> Business ready tables
                  optimized for analytics. Data is modeled into fact and
                  dimension style structures or feature stores for machine
                  learning. Query engines like Presto or BigQuery target p50
                  latency under 5 to 10 seconds and p99 under 30 seconds for
                  interactive queries scanning gigabytes.
                </div>
              </div>
            </div>
            <strong>Why This Matters at Scale:</strong>A single zone lake forces
            consumers to choose between raw chaos and waiting for central teams
            to curate everything. Multi zone patterns let different teams
            operate at different speeds. Debug teams can query raw zone to
            investigate production incidents within minutes of occurrence.
            Analytics teams query curated zone for reliable dashboards. ML teams
            might train on refined zone where data is clean but not aggregated.
            Each zone has different Service Level Agreements (SLAs), retention
            policies, and access controls.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Data Freshness by Zone
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">30 sec</div>
                  <div style="font-size: 10px; font-weight: 600">
                    RAW (STREAMING)
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">7 min</div>
                  <div style="font-size: 10px; font-weight: 600">REFINED</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">1 hour</div>
                  <div style="font-size: 10px; font-weight: 600">CURATED</div>
                </div>
              </div>
            </div>
            <strong>The Hidden Complexity:</strong>
            Moving data between zones is not just copy operations. Each
            transition involves schema evolution, quality checks, and lineage
            tracking. A refined zone job might validate that{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            is never null, that timestamps fall within expected ranges, and that
            event counts match source system metrics within 0.1 percent
            tolerance. Failed records go to a quarantine zone for investigation.
            Partitioning strategy changes too. Raw zone might partition purely
            by arrival time. Refined zone adds business dimensions like
            geography or product category. Curated zone might denormalize
            heavily for query performance, trading storage cost (storing the
            same base data in multiple formats) for faster analytics.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 14px">RAW ZONE</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Immutable, as received
                  </div>
                  <div style="font-size: 11px">Partition: ingest_date</div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓ ETL</div>
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 14px">REFINED ZONE</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Cleaned, deduplicated
                  </div>
                  <div style="font-size: 11px">
                    Partition: event_date, region
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">
                  ↓ Aggregate
                </div>
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 14px">CURATED ZONE</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Business ready, modeled
                  </div>
                  <div style="font-size: 11px">
                    Partition: date, product_line
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
                  Raw zone preserves source truth for debugging and
                  reprocessing, with retention often extending to years (2 to 7
                  years common) despite low query frequency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Refined zone balances freshness and quality, running
                  validation checks that catch schema drift or data anomalies
                  before they propagate to production dashboards
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Curated zone optimizes for query performance over storage
                  cost, often denormalizing data and pre aggregating common
                  metrics to hit sub 10 second interactive query targets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each zone has independent lifecycle policies, with raw data
                  potentially archived to cheaper glacier style storage after 90
                  days while curated tables stay hot
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
                  At a company processing 50 TB of raw logs daily, refined zone
                  might compress this to 8 TB after deduplication and filtering,
                  while curated zone holds 2 TB of aggregated metrics and
                  dimensional models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A fraud detection system queries raw zone for the last 24
                  hours of transactions (about 200 GB) to investigate anomalies
                  in near real time, while monthly reporting dashboards query
                  curated zone aggregates covering 12 months (just 5 GB)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When a schema change breaks downstream jobs, teams can
                  reprocess from raw zone: a 3 day backfill reading 150 TB of
                  raw data, applying new transformations, and regenerating
                  refined zone typically completes in 6 to 8 hours on a 100 node
                  Spark cluster
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataLakeArchitectureMultiZoneDataLakePatternsRawToCurated;
