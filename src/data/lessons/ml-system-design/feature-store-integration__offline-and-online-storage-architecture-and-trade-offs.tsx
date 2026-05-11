import type { Component } from "solid-js";

const LessonFeatureStoreIntegrationOfflineAndOnlineStorageArchitectureAndTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Offline and Online Storage: Architecture and Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Dual Storage Architecture:</strong> Feature stores
              maintain two storage systems optimized for different access
              patterns. The offline store holds historical values for training
              (bulk reads, time-range queries). The online store holds current
              values for inference (point lookups, sub-10ms latency).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline Store Design
            </p>
            <p>
              Optimized for analytical workloads: scanning billions of rows to
              build training datasets. Typical choices: Parquet files on S3/GCS
              (cheap, scalable, columnar compression), Delta Lake or Iceberg
              (add ACID transactions and time travel), or data warehouses
              (Snowflake, BigQuery for SQL access). Key capability:
              point-in-time queries. Training data must represent what was known
              at prediction time, not what we know now. A query like "user_123
              features as of 2024-01-15 10:00:00" must exclude any data that
              arrived after that timestamp.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online Store Design
            </p>
            <p>
              Optimized for serving: single-key lookups at scale with minimal
              latency. Typical choices: Redis (fastest, but expensive for large
              datasets), DynamoDB/Bigtable (managed, scalable, slightly higher
              latency), or custom solutions. Key metrics: p99 read latency
              (target under 5ms), throughput (hundreds of thousands of QPS), and
              availability (99.99%+ for production ML). Storage is organized by
              entity key (user_id, item_id) with all features for that entity
              co-located for single-read retrieval.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sync and Consistency
            </p>
            <p>
              Both stores must reflect the same feature values. Two patterns:{" "}
              <strong>Batch sync:</strong> Periodically compute features from
              source data and write to both stores. Simple but features can be
              hours stale. <strong>Stream sync:</strong> Compute features in
              real-time and write to online store immediately, then backfill to
              offline store. Complex but features stay fresh (minutes of lag).
              Hybrid approach is common: batch for slow-changing features (user
              demographics), streaming for fast-changing features (session
              activity).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Cost Reality:</strong> Online stores are 10-100x more
              expensive per GB than offline stores. Only materialize to online
              store features actually needed for real-time inference.
              Training-only features stay offline.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Offline stores optimize for bulk reads and point-in-time
                  correctness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online stores optimize for sub-5ms single-key lookups at high
                  throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online storage costs 10-100x more per GB than offline storage
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
                  Parquet on S3 for offline with Delta Lake for time travel
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Redis for latency-critical features, DynamoDB for scalable
                  managed option
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreIntegrationOfflineAndOnlineStorageArchitectureAndTradeOffs;
