import type { Component } from "solid-js";

const LessonDwQueryOptimizationQueryOptimizationAtWarehouseScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Query Optimization at Warehouse Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Scale Challenge:</strong>
            Consider a product analytics warehouse at a large company storing 5
            to 10 petabytes of event data in a columnar system like BigQuery,
            Snowflake, or Redshift. A typical dashboard loads 10 to 20 charts,
            each firing 1 to 3 queries. With hundreds of concurrent analysts,
            you might see thousands of concurrent queries and tens of thousands
            per minute during peak hours. The performance target is often p50
            latency 1 to 2 seconds and p95 under 5 seconds. Raw full scans would
            never meet this. The system stacks multiple optimization layers that
            work together.
            <strong>Partitioning and Pruning:</strong>
            Data gets partitioned by date and sometimes by customer or region.
            When a query filters for the last 7 days from a table with 3 years
            of history, the optimizer prunes 99% of partitions immediately by
            checking partition metadata. Instead of scanning 150 petabyte days
            worth of data, it scans only 7 days. This single technique often
            provides 100x to 1000x speedup.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Partition Pruning Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WITHOUT PRUNING
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    1000 partitions
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WITH PRUNING
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    7 partitions
                  </div>
                </div>
              </div>
            </div>
            <strong>Columnar Storage and Predicate Pushdown:</strong>
            Data is stored column wise with heavy compression. Only columns
            referenced in the query are read from storage. A query selecting 3
            columns from a 50 column table reads 6% of the data. Metadata
            services store min and max values per column per file, enabling data
            skipping. If a file's max value for <code>price</code> is 50 and the
            query filters for <code>price &gt; 100</code>, the entire file is
            skipped without reading a single byte.
            <strong>Result Caching:</strong>
            Before any optimization begins, the engine checks a result cache.
            For high reuse dashboards accessed by multiple analysts, cache hits
            take p50 from 2 seconds down to under 50 milliseconds. The cache key
            includes query text and data version, ensuring correctness while
            dramatically improving repeat access patterns.
            <strong>Distributed Execution:</strong>
            Systems like Snowflake and Redshift use massively parallel
            processing (MPP). A large query might run across 16 to 128 worker
            nodes. Each worker scans a subset of data and computes partial
            aggregates. The coordinator combines results. This parallelism turns
            a 60 second single node query into a 2 second distributed query with
            proper work distribution.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> At companies like Meta and Google,
              internal warehouse systems achieve sub second p95 latency on
              petabyte scale tables by combining date partitioning (pruning 99%
              of data), columnar storage (reading only needed columns), result
              caching (50ms cache hits), and distributed execution across
              hundreds of workers.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Query Arrives</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    SELECT revenue WHERE date &gt; '2024-01-01'
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Cache Check</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    50ms if cached, proceed if not
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Partition Pruning</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    1000 partitions → 7 partitions (99% skipped)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Distribute to 64 Workers
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Each scans subset, 2 sec total
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
                  Warehouse scale systems handle thousands of concurrent queries
                  against petabytes of data by stacking optimization layers:
                  partitioning, columnar storage, caching, and distributed
                  execution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition pruning eliminates 99% or more of data for time
                  range queries by checking partition metadata, turning
                  potential petabyte scans into gigabyte scans
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar storage with predicate pushdown reads only necessary
                  columns and skips entire files using min/max statistics when
                  filters cannot match, reducing I/O by 90% to 99%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Result caching for high reuse dashboards can improve p50
                  latency from 2 seconds to under 50 milliseconds, while MPP
                  execution across 16 to 128 workers parallelizes remaining work
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
                  A Netflix style analytics warehouse with 10 petabytes of
                  events: dashboard query filtering last 7 days from 3 years of
                  data prunes from 1000 partitions to 7, scans only 3 of 50
                  columns due to columnar format, and completes in 1.5 seconds
                  p95 across 32 workers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce order analytics: query counting orders by region
                  hits result cache for repeated dashboard access, returning in
                  45ms instead of recomputing 2 second aggregation across 500
                  million orders
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDwQueryOptimizationQueryOptimizationAtWarehouseScale;
