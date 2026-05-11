import type { Component } from "solid-js";

const LessonDataLineageTrackingProductionLineageAtFaangScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Lineage at FAANG Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Scale Realities:
            </div>
            At Meta, Google, or similar scale, you're managing lineage for
            10,000+ datasets, 5,000+ scheduled jobs, hundreds of BI dashboards,
            and thousands of ML models. The lineage graph contains tens of
            millions of links. A single highly used reference table might have
            thousands of downstream dependencies. This creates unique
            operational challenges.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Architecture Pattern:
            </div>
            Most large lineage platforms follow a consistent design. Data
            processing engines emit lineage events via a message bus or service
            API. Events describe a process (job definition), a run (execution
            with timestamp and status), and dataset operations (reads and writes
            with fully qualified names like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              project.dataset.table
            </code>
            ). These events flow into a central lineage service that validates,
            deduplicates, and enriches them. The service persists data into a
            graph database optimized for online traversal queries, backed by
            columnar storage for longer term analytics. Query latency targets
            are typically sub second at p50 and under a few seconds at p99 for
            multi hop traversals.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Graph Explosion Problem:
            </div>
            A central reference dataset used by thousands of jobs creates a hub
            node in your graph. Traversing from that node can hit tens of
            thousands of edges. Without limits, visualization tools would choke
            trying to render this in a browser. Production systems set hard
            limits. Google Dataplex, for example, restricts traversals to 20
            hops and 10,000 graph links in a single query. This keeps p99
            latency under a few hundred milliseconds. When you hit these limits,
            the UI truncates or collapses sections of the graph, showing
            aggregate counts instead of individual edges.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Traversal Limits
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">20</div>
                  <div style="font-size: 10px; font-weight: 600">MAX HOPS</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10K</div>
                  <div style="font-size: 10px; font-weight: 600">MAX LINKS</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">200ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 LATENCY
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Ingestion and Freshness:
            </div>
            Lineage is only useful if it's current. Systems monitor ingestion
            lag, ensuring events appear in the graph within minutes of job
            completion, not hours. Cloud warehouses like BigQuery automatically
            emit lineage for query, load, and copy jobs. Spark and Flink
            integrations require instrumentation but can achieve similar
            freshness. At steady state, a large platform might ingest 100,000
            lineage events per hour during peak. The service must handle bursts,
            deduplicate identical events from retries, and backfill history when
            integrating a new engine.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Retention Strategy:
            </div>
            Keeping full fidelity lineage forever is expensive. Common pattern:
            keep 30 days of hot, fully traversable lineage in fast graph
            storage. Downsample or aggregate older entries, preserving only
            critical links or governance relevant flows. Archive the rest in
            compressed columnar format for compliance queries. This balances
            cost with forensic capability. If an ML model trained 6 months ago
            needs audit, you can reconstruct its lineage from archives, even if
            interactive traversal isn't instant.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Engines Emit Events</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    100K events/hour
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Central Lineage Service
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Validate, Dedupe, Enrich
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 12px">Graph DB</strong>
                    <div style="font-size: 10px; margin-top: 4px">Hot 30d</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 12px">Archive</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Cold storage
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
                  Production lineage platforms at Meta or Google scale manage
                  tens of millions of links across 10,000+ datasets and 5,000+
                  jobs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Graph traversal is limited to 20 hops and 10,000 links per
                  query to keep p99 latency under a few hundred milliseconds and
                  prevent browser rendering failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ingestion lag must stay under minutes (not hours) to make
                  lineage useful for incident response and debugging
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot lineage is kept for 30 days in fast graph storage, then
                  downsampled or archived in compressed columnar format to
                  balance forensics capability with cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At peak, large platforms ingest 100,000 lineage events per
                  hour and must handle bursts, deduplication, and backfill when
                  integrating new engines
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
                  A batch job at Meta processes 2 TB of data every 15 minutes,
                  emitting lineage events that appear in the graph within 2
                  minutes, allowing real time impact analysis.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A reference dimension table used by 2,000 downstream jobs
                  creates a hub node. Querying its full downstream graph would
                  return 50,000+ edges, so the UI limits to 10,000 and shows
                  'Plus 40,000 more' with filtering options.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery automatically emits lineage for standard query and
                  load jobs. When you run a query joining 5 tables and writing
                  to 1 output, lineage events flow to the central service within
                  seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An ML team needs to audit a model trained 8 months ago. The
                  system reconstructs lineage from compressed archives, showing
                  all 47 source tables and 12 transformation steps, though
                  retrieval takes 30 seconds instead of instant.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataLineageTrackingProductionLineageAtFaangScale;
