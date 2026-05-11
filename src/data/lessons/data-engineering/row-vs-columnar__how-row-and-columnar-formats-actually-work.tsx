import type { Component } from "solid-js";

const LessonRowVsColumnarHowRowAndColumnarFormatsActuallyWork: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Row and Columnar Formats Actually Work
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Row Based Physical Layout:</strong>A table is broken into
            pages or blocks, typically 4 KB to 16 KB in size. Each page holds
            many complete rows for a given range of primary keys. The system
            maintains indexes that point into these pages. When you query a user
            by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            , the index lookup finds the relevant page, the engine reads it once
            from disk or cache, and the CPU scans within the page to locate the
            row. Updates in place are straightforward. If the new row still fits
            on the page, the engine overwrites the old version or appends a new
            version and updates internal pointers. This makes row stores ideal
            for workloads with frequent small updates touching multiple fields
            in the same record.
            <strong>Columnar Physical Layout:</strong>
            Data is organized into row groups or stripes, where each group might
            cover 1 million rows. Within each group, the system stores separate
            column chunks. For a table with 50 columns and 1 billion rows
            divided into 1,000 row groups, you'd have 50,000 total column
            chunks. Each chunk stores an encoded array of values.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Dictionary encoding:</strong> Low cardinality strings
                  like country codes get mapped to integers. "USA", "CAN", "MEX"
                  become 0, 1, 2.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Run length encoding:</strong> Repeated values get
                  compressed. 1,000 consecutive TRUE values become "TRUE x
                  1000".
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Statistics storage:</strong> Each chunk stores min,
                  max, and value counts enabling predicate pushdown and data
                  skipping.
                </div>
              </div>
            </div>
            At query time, the execution engine reads only chunks for referenced
            columns. If your query filters on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              event_date
            </code>{" "}
            between two dates, the engine checks chunk statistics and skips
            entire row groups where the date range doesn't overlap. This is data
            skipping.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Compression Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">400 GB</div>
                  <div style="font-size: 10px; font-weight: 600">
                    ROW FORMAT
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">40 GB</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COLUMNAR 10x
                  </div>
                </div>
              </div>
            </div>
            <strong>Write Handling Differences:</strong>
            Columnar systems typically batch writes. Small writes accumulate in
            memory or a write optimized structure, then flush as new row groups.
            Background compaction periodically merges small row groups into
            larger ones, removes obsolete versions, and rewrites encodings. A
            system processing 100,000 events per second might buffer for 10
            seconds (1 million events) before writing a row group, then compact
            every hour. This is why columnar systems favor append heavy
            workloads with periodic batch updates rather than constant random
            updates hitting individual records.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="margin-bottom: 12px; text-align: center; font-weight: 700; font-size: 13px">
                Columnar Query Execution
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 90%; text-align: center; font-size: 12px">
                  <strong>Query:</strong> SELECT revenue, country WHERE date =
                  '2024-01-15'
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 90%; text-align: center; font-size: 11px">
                  <strong>Check Statistics:</strong> Skip 900 of 1000 row groups
                  (date mismatch)
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 90%; text-align: center; font-size: 11px">
                  <strong>Read Only:</strong> date, revenue, country columns
                  from 100 row groups
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 90%; text-align: center; font-size: 11px">
                  <strong>Result:</strong> Scanned 3 of 200 columns, 10% of row
                  groups
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
                  Row stores use 4 KB to 16 KB pages with complete records,
                  enabling single disk seek per record lookup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar row groups typically hold 1 million rows with
                  separate encoded chunks per column
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dictionary and run length encoding in columnar formats achieve
                  5x to 10x compression by grouping similar data types
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistics per column chunk enable data skipping where entire
                  row groups are skipped based on predicate filters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar writes batch in memory then flush as row groups, with
                  hourly compaction to merge small segments
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
                  PostgreSQL row store: 8 KB page holds 50 complete user
                  records, B tree index points to page, single read fetches
                  entire user
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parquet file with 1 billion events: 1,000 row groups of 1
                  million rows each, country column uses dictionary encoding
                  reducing 20 GB to 2 GB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery scanning 30 days of events: checks min/max date
                  statistics, skips 29 of 30 daily partitions, reads only 3
                  columns from remaining partition
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRowVsColumnarHowRowAndColumnarFormatsActuallyWork;
