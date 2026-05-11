import type { Component } from "solid-js";

const LessonDwColumnarStorageColumnarStorageAtProductionScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Columnar Storage at Production Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The End to End System:
            </div>
            In a real analytics platform, columnar storage is one piece of a
            larger stack. Consider a product analytics system at a large
            consumer app ingesting 5 billion events per day, roughly 5 TB of raw
            data. The system needs to support interactive dashboards for
            hundreds of analysts with P95 latency (95th percentile latency)
            under 3 seconds and peak query load of 1,000 queries per second
            (QPS) across all dashboards. Events first land in a streaming buffer
            or log store where they are appended in row oriented format for
            durability and simple writes. A batch or micro batch process then
            periodically groups, sorts, and writes data into columnar files like
            Parquet in a data lake such as Amazon S3 or Google Cloud Storage, or
            into columnar storage nodes in a warehouse like Snowflake or
            Redshift. These files are partitioned by high level keys such as
            event date or customer, and internally organized into row groups or
            micro partitions of about 16 to 512 MB each. When an analyst issues
            a query through a business intelligence (BI) tool, the query engine
            parses it, identifies which tables and partitions are needed, and
            uses columnar metadata to aggressively skip work.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Query Execution in Practice:
            </div>
            For each candidate file or partition, the engine reads only the
            column chunks required by the query. It uses per column statistics
            like min and max values or bloom filters to prune row groups that
            cannot match the filter predicates. In production Snowflake
            deployments, this pruning can skip 90 percent or more of data for
            typical time range and customer filters, which directly improves P95
            latency and reduces cloud storage read costs. Execution happens in a
            distributed fashion using a massively parallel processing (MPP)
            architecture. Systems like BigQuery, Redshift, or Presto assign row
            groups to worker nodes. Each worker reads compressed column pages
            from local disk or object storage, decompresses them in a vectorized
            fashion, applies filters and aggregates, and streams partial results
            for final aggregation or join.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Single Node Scan Performance
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100s MB/s</div>
                  <div style="font-size: 10px; font-weight: 600">FROM DISK</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    Multiple GB/s
                  </div>
                  <div style="font-size: 10px; font-weight: 600">IN MEMORY</div>
                </div>
              </div>
            </div>
            Because only a subset of columns is read and data is heavily
            compressed, a single node can scan hundreds of megabytes per second
            from disk and process billions of values per second on CPU. This is
            how platforms deliver subsecond to low single digit second latency
            for queries that conceptually touch terabytes of logical data.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Vectorized Processing:
            </div>
            Modern engines use vectorized operators. Each operator, such as
            filter, project, aggregate, or join, processes batches of column
            vectors: typically 1,024 or 4,096 values per call. This reduces
            function call overhead, leverages CPU branch prediction better, and
            enables Single Instruction Multiple Data (SIMD) instructions.
            Combined with columnar layout, this delivers the throughput required
            to meet interactive analytics Service Level Agreements (SLAs) over
            multi terabyte datasets.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> A team at a large e-commerce
              company reported that moving from row storage to columnar Parquet
              on S3 reduced their typical dashboard query time from 45 seconds
              to 4 seconds while cutting storage costs by 70 percent due to
              compression.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Write Path Complexity:
            </div>
            The write side is where columnar storage shows its tradeoffs.
            Incoming rows are buffered in memory in a row oriented or columnar
            friendly structure, sorted or grouped by clustering keys, and
            periodically flushed to disk as new columnar files or segments. For
            near real time workloads, some systems use a log structured merge
            (LSM) style approach: maintain a small write optimized store in
            memory or fast disk, then merge it into larger columnar segments
            asynchronously. Deletes are often represented as tombstones with row
            IDs, which are applied at read time until background compaction
            rewrites the data. This introduces write amplification: a single
            logical row update touches multiple column files and generates
            compaction overhead.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems ingest 5 TB per day and serve 1,000 QPS
                  with P95 latency under 3 seconds by combining columnar storage
                  with aggressive metadata based pruning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data skipping with min and max statistics allows Snowflake to
                  skip 90 percent or more of data for typical time range
                  filters, transforming terabyte scans into hundred gigabyte
                  operations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single node scan rates reach hundreds of megabytes per second
                  from disk and multiple gigabytes per second in memory due to
                  compression and column pruning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Vectorized processing operates on batches of 1,024 or 4,096
                  values at a time, enabling SIMD instructions and reducing per
                  row overhead to meet interactive SLA requirements
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
                  An e-commerce analytics dashboard query scanning 2 TB of event
                  data with 300 columns but selecting only 8 columns reads
                  approximately 53 GB after column pruning and compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery uses columnar storage in its Capacitor format and can
                  scan petabyte scale tables in seconds by distributing work
                  across thousands of worker nodes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDwColumnarStorageColumnarStorageAtProductionScale;
