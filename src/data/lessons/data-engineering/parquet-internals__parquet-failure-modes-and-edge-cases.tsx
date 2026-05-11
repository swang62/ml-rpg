import type { Component } from "solid-js";

const LessonParquetInternalsParquetFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Parquet Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Small Files Problem:
          </div>
          One of the most common operational failures in Parquet based systems
          is the small files problem. If your ingestion pipeline writes millions
          of tiny Parquet files, for example 1 to 10 MB each, metadata overhead
          and file listing latency dominate query performance. A query engine
          planning a scan must list all files, read each footer to gather
          statistics, and open potentially hundreds of thousands of file
          handles. In practice, a table with 5 million small files can take 2 to
          5 minutes just for query planning, even though the actual data volume
          is only 50 TB. The engine spends more time listing files on S3 or GCS
          and reading footers than actually scanning data. At scale, this
          increases p95 query latency from 20 seconds to 3 to 10 minutes, making
          dashboards unusable. The solution is periodic compaction: rewrite
          small files into larger ones, typically with row groups of 128 to 512
          MB. Production systems run compaction jobs hourly or daily, merging
          thousands of small files into hundreds of large files. After
          compaction, query planning drops from minutes to seconds, and scan
          performance improves because of better parallelism and fewer file open
          operations.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Query Planning Impact
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  5M SMALL FILES
                </div>
                <div style="font-size: 16px; font-weight: 800">3 to 10 min</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  AFTER COMPACTION
                </div>
                <div style="font-size: 16px; font-weight: 800">
                  10 to 30 sec
                </div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Misleading Statistics and Data Skew:
          </div>
          Parquet row group statistics enable predicate pushdown, but they fail
          when data is heavily skewed or statistics are incorrect. Imagine a
          table partitioned by date where one partition accidentally contains
          events from multiple dates because of a bug. The row group min and max
          for{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            event_time
          </code>{" "}
          span a wide range, making the statistics useless for filtering. A
          query that should skip this partition now has to scan it fully,
          turning a 5 second query into a 2 minute scan. Similarly, if 90
          percent of matching rows are concentrated in a single row group
          because of poor sorting or partitioning, predicate pushdown does not
          help. The query still reads most of the data. This is why data layout
          matters as much as file format. Production systems carefully design
          partitioning schemes (by date, region, or customer ID) and sort data
          within partitions to align with common query filters. Without this,
          Parquet's metadata becomes less effective.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Writing Parquet files without
            sorting or partitioning aligned to query patterns results in
            statistics that cannot eliminate row groups, forcing full scans even
            when filters should be highly selective.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Schema Evolution and Compatibility:
          </div>
          Parquet files are self describing, but schema evolution across
          thousands of files in the same table is a common source of pain.
          Reordering columns, changing a field from optional to required, or
          narrowing data types (for example, changing{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            int32
          </code>{" "}
          to{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            int16
          </code>
          ) can make old files unreadable or cause subtle data corruption. At
          petabyte scale with millions of files, these issues show up in
          specific partitions and are hard to detect. A query might succeed on
          99 percent of data but fail on one partition written two years ago
          with a slightly different schema. Strong schema enforcement at write
          time and validation jobs that periodically check schema consistency
          are critical. Table formats like Iceberg and Delta Lake help by
          maintaining a single source of truth schema in the transaction log,
          but teams must still be careful when evolving schemas to maintain
          backward compatibility.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Nested Data and Memory Pressure:
          </div>
          Parquet handles nested data (structs, lists, maps) using the Dremel
          model with repetition and definition levels. This works well for
          moderate nesting, but deeply nested structures or highly variable
          length arrays can blow up memory usage. A column with lists of lists
          of strings, where some rows have 10 elements and others have 10,000,
          creates huge definition level arrays and large dictionaries. Readers
          may run out of memory when decoding these columns, causing executor
          failures in Spark or Presto. The symptom is sporadic out of memory
          errors on certain partitions while others succeed. The fix is to
          flatten the schema, split deeply nested columns into separate tables,
          or use more memory per executor. This is an edge case but appears
          frequently in event schemas with arbitrary JSON payloads flattened
          into Parquet.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Metadata Scaling:
          </div>
          At extreme scale, even reading Parquet footers becomes a bottleneck. A
          table with 100,000 files means 100,000 footer reads. At 10 ms per S3
          GET request, that is 1,000 seconds (over 16 minutes) of serial
          metadata fetching. Query engines mitigate this with parallelism and
          caching, but if metadata is not cached or if the cache is cold,
          planning latency spikes. Systems like Iceberg solve this by
          maintaining summary metadata (manifest files) that aggregate
          statistics across many Parquet files, reducing the number of footers
          that must be read. Without such a layer, metadata overhead limits
          scalability to tens of thousands of files per table.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The small files problem occurs when millions of 1 to 10 MB
                Parquet files cause query planning to take 2 to 5 minutes just
                listing files and reading footers, increasing p95 latency from
                20 seconds to 3 to 10 minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Periodic compaction that rewrites small files into larger ones
                (128 to 512 MB row groups) reduces query planning time from
                minutes to seconds and improves scan parallelism
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Misleading or incorrect row group statistics caused by data
                skew, poor sorting, or partitioning bugs make predicate pushdown
                ineffective, forcing full scans even when filters should be
                selective
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema evolution issues like reordering fields, changing
                optionality, or narrowing data types can make old Parquet files
                unreadable or cause subtle data corruption across millions of
                files at petabyte scale
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Nested data with highly variable lengths (lists with 10 to
                10,000 elements) can blow up memory usage in readers, causing
                out of memory errors on specific partitions while others succeed
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
                A streaming pipeline writes 1 MB Parquet files every 10 seconds,
                creating 8,640 files per day. After 90 days, the table has
                777,600 files. Query planning takes 4 minutes. After compaction
                to 256 MB files, planning drops to 15 seconds.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                A table partitioned by date accidentally writes events from
                multiple dates into one partition because of a timestamp parsing
                bug. The row group &lt;code&gt;event_time&lt;/code&gt; min and
                max span 30 days, making date filters useless. A query filtering
                to one day scans the entire partition.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A company evolves their schema to add a new required field.
                Queries fail on partitions written before the change with
                'missing required field' errors. They must either rewrite old
                files or make the field optional with a default value.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                An event schema includes a &lt;code&gt;metadata&lt;/code&gt;
                column with nested JSON stored as a Parquet MAP of LIST of
                STRING. Some events have 5 keys, others have 5,000. Spark
                executors run out of memory decoding this column, failing on 2%
                of partitions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonParquetInternalsParquetFailureModesAndEdgeCases;
