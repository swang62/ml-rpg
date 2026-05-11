import type { Component } from "solid-js";

const LessonMaterializedViewsRefreshStrategiesAndMaintenancePatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Refresh Strategies and Maintenance Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Maintenance Challenge:</strong> Keeping materialized
            views in sync with base data is the hard part. There are three main
            strategies, each with different consistency guarantees and
            operational complexity.
            <strong>Native Materialized View Support:</strong> Data warehouses
            like BigQuery and Snowflake track changes to base tables and
            automatically update materialized views. BigQuery incremental
            materialized views only recompute partitions where data changed,
            which works well when you partition by ingestion time or date. For a
            table with 500 partitions (roughly 500 days), only 1 or 2 partitions
            typically need refresh per update cycle. Snowflake uses streams for
            change data capture. A stream records all inserts, updates, and
            deletes since last consumption. The materialized view refresh job
            consumes the stream and applies only those changes. This is
            efficient but requires careful handling of exactly once semantics to
            avoid double counting. The advantage is convenience: the platform
            handles mechanics. The disadvantage is less transparency and
            potential limitations on query complexity or supported aggregations.
            <strong>Streaming Aggregation Jobs:</strong> Systems like Kafka
            Streams, Flink, or Spark Structured Streaming consume event streams
            and continuously update aggregation tables or key value stores. This
            gives very low latency, often end to end freshness within seconds.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Consume events from Kafka:</strong> Read events with
                  exactly once or at least once semantics.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Maintain stateful aggregates:</strong> Use windowed
                  operations with state backends like RocksDB.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Write to serving store:</strong> Emit results to
                  database, key value store, or warehouse table.
                </div>
              </div>
            </div>
            The challenge is correctly handling state management, late arriving
            data, and exactly once or idempotent writes. With at least once
            delivery, you must ensure aggregation updates are idempotent or use
            transactional writes to avoid double counting.
            <strong>Batch Aggregation Jobs:</strong> A scheduled job recomputes
            aggregates for recent windows every 5 to 15 minutes. For large
            tables, combine with merge incremental approach: only recompute the
            last N hours or days each run, and leave older partitions untouched.
            For example, a daily batch job might recompute aggregates for the
            past 7 days and merge them into the main table. This handles late
            arrivals up to 7 days and keeps most historical data stable. The
            trade off is higher latency (minutes to tens of minutes) but simpler
            operational model.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Large companies like Google or
              Meta often combine streaming for low latency critical metrics and
              batch for comprehensive historical rollups, choosing the right
              tool per use case.
            </div>
            <strong>Consistency and Serving:</strong> To avoid readers seeing
            partially updated data, use atomic swaps. Write new aggregates to a
            staging table or partition, then atomically swap table pointers or
            partition metadata. Readers always see a consistent snapshot, never
            a mix of old and new data. Versioned tables are another pattern:
            readers always query the latest stable version while refresh jobs
            build the next version in the background. Once complete, you promote
            the new version atomically.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; text-align: center; margin-bottom: 12px">
                Atomic Swap Pattern
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Production Table</strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      Users query this
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Staging Table</strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      Refresh job writes here
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ ATOMIC SWAP
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Production Table</strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      Now points to new data
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center; opacity: 0.5">
                    <strong style="font-size: 13px">Old Data</strong>
                    <div style="font-size: 11px; margin-top: 3px">
                      Safe to delete
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
                  Three refresh strategies: native platform support (BigQuery
                  incremental, Snowflake streams), streaming jobs (Flink, Kafka
                  Streams with seconds latency), and batch jobs (scheduled
                  recompute every 5 to 15 minutes)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery only refreshes changed partitions: for 500 daily
                  partitions, typically only 1 or 2 need updates per cycle,
                  making incremental refresh efficient at large scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming aggregations provide seconds of end to end latency
                  but require careful state management and exactly once or
                  idempotent semantics to avoid double counting with at least
                  once delivery
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Atomic swaps prevent partial read visibility: write to staging
                  table, then atomically swap pointers so readers always see
                  complete consistent snapshots, never mixed old and new data
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
                  BigQuery materialized view partitioned by date refreshes only
                  yesterday and today partitions when new data arrives, leaving
                  498 older partitions untouched
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Flink streaming job consumes Kafka events, maintains windowed
                  state in RocksDB, and writes 5 minute aggregates to Postgres
                  with transactional inserts to guarantee exactly once semantics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMaterializedViewsRefreshStrategiesAndMaintenancePatterns;
