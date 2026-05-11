import type { Component } from "solid-js";

const LessonFilePartitioningPartitionStrategiesAndDirectoryLayout: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Partition Strategies and Directory Layout
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Choosing Your Partition Keys:</strong> The partition
            strategy determines both query performance and operational
            complexity. The fundamental question is: which columns appear in
            WHERE clauses most frequently, and how can you organize directories
            to maximize pruning?
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Range Partitioning:</strong> Partition by continuous
                  values like date, timestamp, or numeric ID ranges. Example:{" "}
                  <code>event_date=2024-12-25</code>. Perfect for time series
                  data where queries filter by date ranges.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Hash Partitioning:</strong> Apply hash function to
                  distribute data evenly. Example: <code>bucket=47</code> where
                  bucket equals hash(user_id) mod 128. Spreads write load
                  uniformly but makes range queries expensive.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>List Partitioning:</strong> Partition by enumerated
                  values like country, region, or tenant. Example:{" "}
                  <code>region=US</code>. Natural for categorical data with
                  known, bounded cardinality.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Composite Partitioning:</strong> Combine multiple
                  levels. Example: <code>dt=2024-12-25/region=US/</code>. First
                  level prunes by date, second level prunes by region within
                  that date.
                </div>
              </div>
            </div>
            <strong>Real World Scale:</strong> Consider an analytics platform
            storing 5 TB of compressed data per day. With 256 MB target file
            size, that is roughly 20,000 files per day. Using composite
            partitioning by date then city (100 active cities), you get 200
            files per city per day. Over a 180 day retention window, this
            creates 36,000 logical partitions with 3.6 million total files.
            Modern table formats like Apache Iceberg and Delta Lake support
            hidden partitioning. You declare transformations like{" "}
            <code>date(trip_start_time)</code> or{" "}
            <code>bucket(64, user_id)</code> in metadata without exposing
            physical partition columns. The query engine automatically applies
            these transforms during planning. This simplifies schema evolution
            because you can change partition strategies without rewriting
            queries.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Metadata Planning Time
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    &lt; 500ms
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    WELL PARTITIONED
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10+ sec</div>
                  <div style="font-size: 10px; font-weight: 600">
                    POOR LAYOUT
                  </div>
                </div>
              </div>
            </div>
            <strong>Cardinality Matters:</strong> Choose partition keys with
            moderate cardinality. Too low (only 3 regions) creates skewed
            partitions where some are 100x larger than others. Too high
            (millions of unique user IDs) explodes directory count and metadata
            overhead. Sweet spot is typically 50 to 500 unique values per
            partition level. For high cardinality dimensions like user_id, use
            hash bucketing into fixed buckets (64 or 128) rather than direct
            partitioning.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="font-size: 12px; font-weight: 700; margin-bottom: 12px; text-align: center">
                COMPOSITE PARTITION LAYOUT
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">dt=2024-12-25/</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    First level: Date range partition
                  </div>
                </div>
                <div style="margin-left: 20px; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px">
                    <strong style="font-size: 12px">region=US/</strong>
                    <div style="font-size: 10px">200 files (256MB each)</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px">
                    <strong style="font-size: 12px">region=EU/</strong>
                    <div style="font-size: 10px">180 files (256MB each)</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px">
                    <strong style="font-size: 12px">region=ASIA/</strong>
                    <div style="font-size: 10px">150 files (256MB each)</div>
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
                  Range partitioning by time works best for append only
                  workloads where 95% of queries filter by date ranges, enabling
                  partition pruning across temporal dimensions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hash partitioning distributes writes evenly across 64 to 128
                  buckets, avoiding hot partitions but requiring full scans for
                  range queries on the hashed column
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Composite partitioning combines levels like date then region,
                  creating manageable partition counts (36,000 partitions for
                  180 days times 200 regions) while supporting multiple filter
                  dimensions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hidden partitioning in Iceberg or Delta stores transformations
                  as metadata, letting you evolve partition strategy without
                  breaking existing queries
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
                  A ride sharing company uses dt=2024-12-25/city=SF/ composite
                  partitioning, creating 200 files per city per day across 100
                  cities, resulting in 20,000 files daily and 3.6 million files
                  over 6 months
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber applies hash(user_id) mod 128 to create 128 buckets per
                  date partition, spreading write load evenly and preventing
                  single user hotspots from creating oversized partitions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFilePartitioningPartitionStrategiesAndDirectoryLayout;
