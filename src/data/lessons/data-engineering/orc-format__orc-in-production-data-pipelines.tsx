import type { Component } from "solid-js";

const LessonOrcFormatOrcInProductionDataPipelines: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          ORC in Production Data Pipelines
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Production Flow:
          </div>
          In real analytics stacks at companies like Meta, Netflix, and
          LinkedIn, ORC fits into a multi stage pipeline. Events arrive at high
          velocity: 100,000 to 1 million events per second through streaming
          systems like Kafka. These are initially written in flexible formats
          like JSON or Avro for fast ingestion and schema evolution. Then batch
          jobs compact and transform this raw data into ORC for query
          optimization. Consider a typical daily batch process. Overnight, a
          Spark or Hive job reads 24 hours of raw Avro data, applies
          transformations, partitions by date and region, and writes ORC files
          to object storage like Amazon S3, Google Cloud Storage (GCS), or
          Hadoop Distributed File System (HDFS). Each partition might contain 50
          to 200 ORC files, each 128 MB to 512 MB compressed. Query engines like
          Presto or Trino then read directly from these ORC files when analysts
          run queries.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Scale and Impact:
          </div>
          The numbers are massive. A single large table might have 10 billion
          rows per day, 365 partitions per year, and 200 columns. That's 3.65
          trillion rows annually. Storing this naively in row format would
          consume petabytes and make queries impossibly slow. With ORC, the same
          data compresses 3 to 5 times better, and queries that previously took
          minutes complete in seconds.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> A Presto cluster handling 500
            queries per minute at p95 latency of 30 seconds can, with optimized
            ORC usage, support 1,500 queries per minute at similar latency, or
            reduce cluster size by 2 to 3 times for the same throughput.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Lazy Reads and Two Phase Execution:
          </div>
          Advanced query engines implement lazy reads, which dramatically
          amplify ORC benefits. In the first phase, the engine reads only
          columns needed for filters and joins: typically identifiers like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>
          , timestamps like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            event_time
          </code>
          , and maybe category codes. It evaluates predicates and eliminates 90
          to 99 percent of rows. Only in the second phase does it read heavy
          payload columns like long text fields, JSON blobs, or wide arrays for
          the surviving rows. Meta reported that lazy reads alone yielded up to
          18 times speedup on some workloads. Combined with predicate pushdown,
          synthetic benchmarks showed up to 80 times total speedup.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Operational Considerations:
          </div>
          You need compaction processes. Streaming jobs that flush ORC files
          every few minutes create thousands of tiny files. This causes metadata
          overhead and task scheduling explosion. Compaction jobs periodically
          rewrite 1000 small files into 10 large files, preserving sort order if
          beneficial for range pruning. Partitioning strategy matters.
          Partitioning by high cardinality keys like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>{" "}
          creates too many partitions. Partitioning by low cardinality keys like
          date or region provides coarse pruning at directory level, then ORC
          statistics handle fine grained pruning within each partition.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Query Throughput Impact
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">BEFORE</div>
                <div style="font-size: 16px; font-weight: 800">500 qpm</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">AFTER</div>
                <div style="font-size: 16px; font-weight: 800">1500 qpm</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Raw Events</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  100K-1M events/sec
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Avro/JSON</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Fast ingest, flexible
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">ORC Files</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Compacted, optimized
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Presto/Trino</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Interactive queries
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Production pipelines use dual format strategy: Avro or JSON for
                raw ingestion (flexible, fast writes), then ORC for curated
                query optimized tables (efficient reads)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Lazy reads execute in two phases: first read only filter columns
                to eliminate 90 to 99 percent of rows, then read heavy payload
                columns only for survivors, yielding 18 to 80 times speedup
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Compaction is critical: streaming jobs creating thousands of 1
                MB files cause metadata and scheduling overhead; rewrite into
                tens of 128 to 512 MB files
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Proper partitioning by low cardinality keys (date, region)
                provides coarse directory level pruning; ORC statistics handle
                fine grained pruning within partitions
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
                Daily batch job reads 24 hours of Avro events (10 billion rows),
                transforms, partitions by date and region, writes 200 ORC files
                per partition to S3
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query filtering for &lt;code&gt;event_date &gt;=
                2024-03-01&lt;/code&gt; and &lt;code&gt;user_id &gt;
                1000000&lt;/code&gt; first reads only
                &lt;code&gt;event_date&lt;/code&gt; and
                &lt;code&gt;user_id&lt;/code&gt; columns, eliminates 95% of
                rows, then reads &lt;code&gt;event_payload&lt;/code&gt; for
                remaining 5%
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Compaction job rewrites 5000 ORC files (avg 2 MB each) from
                hourly streaming into 50 files (200 MB each) overnight
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonOrcFormatOrcInProductionDataPipelines;
