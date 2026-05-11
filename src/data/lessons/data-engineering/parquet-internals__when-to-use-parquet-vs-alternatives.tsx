import type { Component } from "solid-js";

const LessonParquetInternalsWhenToUseParquetVsAlternatives: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          When to Use Parquet vs Alternatives
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Trade Off:
          </div>
          Choosing Parquet is fundamentally a trade off between read efficiency
          and write complexity, and between analytical performance and
          transactional flexibility. Parquet excels when your workload is read
          heavy with columnar access patterns: scanning millions to billions of
          rows but selecting only a subset of columns. It falls short when you
          need frequent small updates, low latency point reads, or high
          throughput small writes.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Parquet Strengths
              </div>
              <div style="font-size: 12px">
                Analytical scans, columnar queries, 3x to 10x compression, p95
                latency under 30 sec
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Parquet Weaknesses
              </div>
              <div style="font-size: 12px">
                Point updates, small writes, transactional workloads, p99 under
                5 ms
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Parquet vs Row Oriented Formats:
          </div>
          For OLTP style workloads where you read or write entire rows
          frequently, row oriented formats like Apache Avro or even simple JSON
          outperform Parquet. Avro is ideal for streaming ingestion where events
          arrive continuously and you append them to files or topics. Updating a
          single row in Parquet generally requires rewriting an entire file,
          which can be hundreds of megabytes to gigabytes. Avro lets you append
          or update individual records with much lower overhead. The decision
          point is your read to write ratio and access pattern. If your workload
          is over 80 percent writes and you rarely scan more than a few thousand
          rows at once, Avro or a key value store is better. If your workload is
          over 70 percent reads and queries typically scan millions of rows,
          Parquet wins. For mixed workloads, consider Lambda or Kappa
          architectures where you use Avro for hot path streaming data and
          periodically compact to Parquet for cold path analytics.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Parquet vs ORC:
          </div>
          Optimized Row Columnar (ORC) is another columnar format, primarily
          used in the Hadoop ecosystem with Apache Hive. ORC and Parquet are
          similar in architecture but differ in details. ORC often produces
          slightly smaller files and faster scans for some workloads, especially
          when you use bloom filters and column indexes that ORC supports more
          richly by default. However, Parquet has broader ecosystem support.
          Spark, Trino, Presto, Athena, BigQuery, Snowflake, and most modern
          query engines support Parquet natively. ORC is most commonly used with
          Hive and tightly coupled Hadoop stacks. For cloud native lakehouse
          architectures, Parquet is the default choice because of
          interoperability and tooling maturity. You sacrifice perhaps 10 to 20
          percent compression or scan performance in some edge cases, but you
          gain universal compatibility.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The decision isn't 'use Parquet everywhere.' It's: what's your
              read to write ratio, and do your queries scan columns or entire
              rows?"
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Parquet vs Relational Databases:
          </div>
          For workloads requiring ACID transactions, concurrent updates, and
          point reads with p99 latency under a few milliseconds, a relational
          database like PostgreSQL, MySQL, or a distributed database like
          CockroachDB is the right choice. Parquet files are immutable. You
          cannot update or delete individual rows in place. Systems like Delta
          Lake add update and delete capabilities at the table level by marking
          files as deleted and writing new files, but this is much slower than a
          database update. Use Parquet when you need to analyze historical data
          at massive scale: petabytes of logs, events, or time series. Use a
          database when you need to serve application queries with strict
          latency Service Level Objectives (SLOs), enforce referential
          integrity, or support concurrent transactional writes. Many production
          systems use both: databases for OLTP, Parquet for OLAP, with change
          data capture (CDC) pipelines syncing updates from the database to the
          data lake.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Decision Framework:
          </div>
          First, classify your workload. Is it over 70 percent reads with
          columnar access? Parquet. Over 80 percent writes with full row access
          or point queries? Avro or a database. For mixed workloads, consider a
          hybrid: real time data in Kafka with Avro, compacted hourly or daily
          to Parquet for analytics. Second, evaluate your ecosystem. If you're
          in a Spark and cloud native environment, Parquet is the safe default.
          If you're deeply integrated with Hive and Hadoop, ORC might offer
          marginal performance gains. Third, measure. Run benchmarks on your
          actual queries and data distributions. A format that wins on paper
          might lose in your specific use case because of skew, schema
          complexity, or hardware constraints.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Parquet excels for read heavy analytical workloads (over 70%
                reads) with columnar access patterns, but struggles with
                frequent updates or point reads requiring p99 latency under 5 ms
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                For OLTP workloads or streaming ingestion with over 80 percent
                writes, row oriented formats like Avro or relational databases
                outperform Parquet because they support efficient appends and
                updates
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ORC offers similar columnar performance to Parquet and sometimes
                better compression or scan speed, but Parquet has broader
                ecosystem support across Spark, Trino, Athena, BigQuery, and
                cloud native tools
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Updating or deleting rows in Parquet requires rewriting entire
                files, which can be hundreds of MB to GB. Systems like Delta
                Lake add update capabilities at the table layer but are still
                much slower than database updates.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Decision criteria: Over 70% reads with columnar scans: Parquet.
                Over 80% writes or point queries: Avro or database. Mixed
                workloads: hybrid architecture with Avro for hot path, Parquet
                for cold path analytics.
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
                A social media feed with high write throughput (1 million posts
                per second) and point reads for individual posts uses Cassandra
                or DynamoDB. Analytics on historical posts use Parquet files
                exported nightly via change data capture.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An e commerce company uses PostgreSQL for transactional order
                processing (ACID guarantees, sub 10 ms p99 latency), then
                exports completed orders to Parquet in S3 for revenue reporting
                and machine learning feature engineering.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A media company ingests clickstream events to Kafka with Avro
                encoding (500 thousand events per second). Every hour, a Spark
                job compacts the last hour of Avro events into Parquet files
                partitioned by date and region for analytics.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                Benchmarking a specific query workload: ORC files are 15%
                smaller and scan 10% faster than Parquet on Hive with bloom
                filters enabled. However, the team chooses Parquet because they
                also query the data from Athena and BigQuery, which have better
                Parquet support.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonParquetInternalsWhenToUseParquetVsAlternatives;
