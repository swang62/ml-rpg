import type { Component } from "solid-js";

const LessonIcebergTableFormatQueryPlanningHowMetadataPruningAcceleratesReads: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Query Planning: How Metadata Pruning Accelerates Reads
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Metadata Leverage Effect:</strong>
            At petabyte scale with millions of files, reading the table of
            contents is often more expensive than reading the actual data.
            Iceberg inverts the typical data lake problem by storing rich
            statistics in manifest files so query engines can eliminate most
            files without touching them. This transforms query planning from
            minutes to milliseconds.
            <strong>Statistics Per Data File:</strong>
            Each manifest entry for a data file includes detailed metadata.
            First, basic metrics: row count, total size in bytes. Second, per
            column statistics: null count, minimum value, maximum value. Third,
            partition values if the table is partitioned. A manifest file groups
            thousands of these entries together. When a query arrives, the
            engine reads the table metadata file (a few kilobytes) to find the
            current snapshot, then reads the manifest list (tens of kilobytes)
            to find relevant manifest files, then reads those manifest files
            (megabytes total) to discover which data files to scan. This
            metadata traversal happens before any data file is opened.
            <strong>Concrete Pruning Example:</strong>
            Consider a table with 1 million Parquet files totaling 100 TB,
            storing click events over two years. The table is partitioned by
            date. You query for events on 2024-01-15 where <code>user_id</code>{" "}
            is between 1000000 and 2000000.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Pruning Cascade
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">1M files</div>
                  <div style="font-size: 10px; font-weight: 600">INITIAL</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    1,400 files
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    AFTER DATE FILTER
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">140 files</div>
                  <div style="font-size: 10px; font-weight: 600">
                    AFTER USER_ID FILTER
                  </div>
                </div>
              </div>
            </div>
            First, partition pruning eliminates files not in the date range.
            With daily partitions over 730 days, you keep only 1,400 files for
            that single day. Second, column statistics pruning checks{" "}
            <code>user_id</code> min and max in each manifest entry. Files where
            max <code>user_id</code> is below 1000000 or min{" "}
            <code>user_id</code> is above 2000000 are skipped. This eliminates
            90% of remaining files, leaving 140 files to actually scan. The
            query engine reads perhaps 50 MB of manifest data (manifest files
            often compress well and cache effectively) in 100 to 200
            milliseconds, then scans 140 files of 512 MB each (72 GB total) from
            object storage. With 100 parallel readers at 100 MB/sec each, data
            scan completes in under 10 seconds.
            <strong>Hidden Partitioning Advantage:</strong>
            Unlike Hive tables where users must explicitly filter on partition
            columns, Iceberg applies partition pruning automatically. You can
            partition by date internally, but query just by timestamp. Iceberg
            transforms the timestamp filter to a date filter and prunes
            accordingly. You can even evolve partitioning over time: old data
            partitioned daily, new data partitioned hourly. Queries work
            seamlessly across both.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> If you write millions of tiny
              files (1 to 10 MB each), manifest files grow huge because each
              file needs an entry. Query planning slows from sub second to 10+
              seconds as engines read hundreds of megabytes of manifest data.
              Run compaction jobs to merge small files into 512 MB to 1 GB
              target sizes.
            </div>
            <strong>The Scale Numbers:</strong>
            Netflix operates Iceberg tables with billions of rows and petabytes
            of data. Query planning for typical analytical queries completes in
            50 to 500 milliseconds, pruning 95% to 99% of files. Apple reports
            similar pruning ratios, achieving interactive query latency even on
            datasets with hundreds of thousands of files. This performance
            requires disciplined file sizing and regular manifest compaction to
            keep metadata overhead in check.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Manifest files store min and max values for every column in
                  every data file, enabling aggressive pruning during query
                  planning without reading actual data files.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical pruning eliminates 95% to 99% of files at petabyte
                  scale, reducing a scan of 1 million files to 10,000 or fewer
                  files in 100 to 200 milliseconds of metadata reading.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hidden partitioning decouples the physical layout from the
                  query interface. Users query by any column, and Iceberg
                  automatically applies partition and statistics based pruning.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata bloat is the enemy. With millions of small files,
                  manifest files grow to hundreds of megabytes, pushing planning
                  time from milliseconds to seconds or worse. Compaction is
                  essential.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar statistics work best for sorted or clustered data. If
                  &lt;code&gt;user_id&lt;/code&gt; is randomly distributed in
                  each file, min and max span the full range, and statistics
                  pruning has no effect.
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
                  A table with 500,000 files stores transaction data partitioned
                  by date and clustered by &lt;code&gt;customer_id&lt;/code&gt;.
                  Query for transactions on a specific date where
                  &lt;code&gt;customer_id&lt;/code&gt; equals 42. Date pruning
                  reduces to 700 files. Statistics pruning on
                  &lt;code&gt;customer_id&lt;/code&gt; (min is 1, max is 100 in
                  each file) reduces to 7 files. Total planning time: 80
                  milliseconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An e-commerce table with 2 million files (200 TB) is queried
                  for orders in the last 7 days where
                  &lt;code&gt;order_total&lt;/code&gt; exceeds 1000 dollars.
                  Partition pruning by timestamp reduces to 10,000 files. Column
                  statistics on &lt;code&gt;order_total&lt;/code&gt; eliminate
                  files where max is below 1000, leaving 500 files. Data scan of
                  250 GB completes in 3 seconds with 100 parallel readers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIcebergTableFormatQueryPlanningHowMetadataPruningAcceleratesReads;
