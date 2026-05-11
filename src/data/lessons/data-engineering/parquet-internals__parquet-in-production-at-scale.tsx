import type { Component } from "solid-js";

const LessonParquetInternalsParquetInProductionAtScale: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Parquet in Production at Scale
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Real World Pipeline:
          </div>
          In a modern data platform, Parquet sits at the heart of the storage
          layer in a lakehouse architecture. Consider a typical clickstream
          pipeline at a company processing 100 to 500 thousand events per
          second. Events arrive through Kafka or Kinesis, get micro batched or
          hourly batched, then land as Parquet files in cloud object storage
          like Amazon S3, Google Cloud Storage (GCS), or Azure Blob Storage. A
          single day of events might represent 5 to 20 TB uncompressed. After
          Parquet encoding and compression, this compresses down to 1 to 4 TB on
          disk: a 3x to 10x reduction. Over 30 days, you accumulate 30 to 120 TB
          of Parquet data representing 150 to 600 TB of logical events. Query
          engines like Apache Spark, Trino, Presto, or AWS Athena read these
          files for analytics.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Query Performance at Scale:
          </div>
          A dashboard query scanning 30 days of data logically touches 150 to
          600 TB uncompressed. Because the query selects only 5 to 10 columns
          out of 200, the engine reads perhaps 5 to 15 percent of bytes: 7.5 to
          90 TB from disk. Predicate pushdown on{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            event_time
          </code>{" "}
          filters further eliminate 50 to 80 percent of row groups. The final
          read might be just 2 to 8 TB of Parquet data. On a 50 to 200 node
          cluster, this completes in tens of seconds, with p95 query latencies
          under 30 seconds for complex aggregations and joins. Without Parquet's
          columnar layout and statistics, the same query on raw JSON would
          require reading 100 to 600 TB and take minutes to hours.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Query Scan Reduction
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">
                  150 to 600 TB
                </div>
                <div style="font-size: 10px; font-weight: 600">
                  LOGICAL DATA
                </div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">2 to 8 TB</div>
                <div style="font-size: 10px; font-weight: 600">ACTUAL READ</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Integration with Table Formats:
          </div>
          Higher level table formats like Delta Lake, Apache Iceberg, and Apache
          Hudi all use Parquet as the physical storage layer. These systems add
          transaction logs, schema evolution rules, and partitioning schemes on
          top of Parquet. When an analyst runs a query through a Business
          Intelligence (BI) tool, the heavy lifting at the storage level is
          still Parquet: encoding, compression, and vectorized columnar scans.
          This decoupling is powerful. You design partitioning, compaction, and
          indexing at the table format layer. Meanwhile, Parquet handles
          efficient encoding, compression, and statistics that enable fast
          scans. Delta Lake might maintain a transaction log with file level
          metadata, but when Spark actually reads the data, it's reading Parquet
          files and leveraging row group statistics.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Databricks customers report that
            migrating from JSON or CSV to Parquet based Delta Lake tables
            reduces storage by 5x to 10x and improves query performance by 2x to
            20x, depending on query selectivity and column access patterns.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Cost and Latency Wins:
          </div>
          Parquet's efficiency translates directly to cost savings. Storing 30
          to 120 TB instead of 150 to 600 TB means lower S3 or GCS bills.
          Reading 2 to 8 TB instead of 100 to 600 TB means fewer compute hours
          and lower data transfer costs. For organizations running thousands of
          queries per day, these savings compound into millions of dollars
          annually. Latency improvements are equally dramatic. Complex reports
          that took 5 to 10 minutes on JSON complete in 10 to 30 seconds on
          Parquet. This transforms user experience: dashboards become
          interactive, analysts can iterate faster, and ad hoc exploration
          becomes feasible at petabyte scale.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                In production, Parquet files store clickstream or event data in
                cloud object storage, compressing 5 to 20 TB per day down to 1
                to 4 TB with 3x to 10x compression
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                A 30 day dashboard query logically scans 150 to 600 TB but reads
                only 2 to 8 TB after columnar projection and predicate pushdown,
                completing in tens of seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Table formats like Delta Lake, Iceberg, and Hudi use Parquet as
                the physical storage layer, adding transaction logs and
                partitioning while relying on Parquet for encoding and
                statistics
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query engines like Spark, Trino, and Athena leverage Parquet's
                columnar layout for vectorized execution, processing billions of
                rows with p95 latencies under 30 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Storage cost savings from Parquet can reach 5x to 10x compared
                to JSON or CSV, and query performance improves by 2x to 20x
                depending on selectivity and column access patterns
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
                A company like Uber stores 30 days of ride events as Parquet in
                S3. Each day is 8 TB compressed. A revenue report selecting 8
                columns from 150 reads 3 TB in 20 seconds on a 100 node Spark
                cluster.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix might partition video watch events by date and device
                type, writing hourly Parquet files. A query filtering on
                &lt;code&gt;watch_date&lt;/code&gt; and
                &lt;code&gt;device_type&lt;/code&gt; skips 80 percent of row
                groups using statistics, reducing scan from 50 TB to 10 TB.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Databricks customers report that migrating a 500 TB CSV data
                lake to Parquet based Delta Lake reduced storage to 75 TB and
                improved average query time from 4 minutes to 25 seconds.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonParquetInternalsParquetInProductionAtScale;
