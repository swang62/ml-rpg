import type { Component } from "solid-js";

const LessonParquetInternalsWhatIsParquetFormat: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Parquet Format?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>Parquet</strong> is a columnar, self describing, binary
              file format designed specifically for analytical workloads where
              you need to scan massive amounts of data efficiently by reading
              only the columns your query needs.
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Problem:
          </div>
          Imagine you have a table with 200 columns representing user events:{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            event_time
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            event_type
          </code>
          ,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            country
          </code>
          , and so on. You store 30 days of clickstream data, perhaps 600 TB
          uncompressed. Your dashboard query only needs 5 columns to count
          events by country and day. With row oriented formats like CSV or JSON,
          every row stores all 200 columns together. To get your 5 columns, you
          must read every single byte of all 600 TB, deserialize entire rows,
          then throw away 195 columns. This wastes enormous amounts of disk I/O,
          network bandwidth, and CPU time.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            How Parquet Solves This:
          </div>
          Parquet stores each column separately within the file. Instead of
          storing row after row, it stores all values for{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            event_time
          </code>{" "}
          together, all values for{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            country
          </code>{" "}
          together, and so on. Your query engine reads only the 5 columns it
          needs, perhaps just 5 to 15 percent of the total bytes. That same 600
          TB logical dataset might require reading only 30 to 90 TB from disk.
          The benefit compounds further because columnar storage enables
          aggressive compression. All values in a column have the same data type
          and often similar patterns. A{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            country
          </code>{" "}
          column with only 50 distinct values can use dictionary encoding. A
          timestamp column with sorted values can use delta encoding. These
          techniques typically achieve 3x to 10x compression ratios compared to
          text formats.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Storage and I/O Reduction
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">3x to 10x</div>
                <div style="font-size: 10px; font-weight: 600">COMPRESSION</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">5 to 15%</div>
                <div style="font-size: 10px; font-weight: 600">BYTES READ</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Why It Matters:
          </div>
          This combination of columnar layout and compression transforms
          analytical query performance. Scans that would take minutes or hours
          on CSV complete in tens of seconds. Storage costs drop dramatically.
          Query engines like Spark, Trino, and Athena can process petabyte scale
          datasets on reasonably sized clusters while keeping p95 latencies
          under 30 seconds for complex reports.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="margin-bottom: 16px; text-align: center; font-weight: 700; font-size: 14px">
              Row vs Columnar Storage
            </div>
            <div style="display: flex; gap: 20px; justify-content: space-around">
              <div style="flex: 1">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 12px">
                  Row Format (CSV)
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; margin-bottom: 4px">
                  id,time,country,...
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; margin-bottom: 4px">
                  id,time,country,...
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                  id,time,country,...
                </div>
                <div style="margin-top: 8px; font-size: 10px; text-align: center">
                  Read ALL columns
                </div>
              </div>
              <div style="flex: 1">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 12px">
                  Columnar (Parquet)
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; margin-bottom: 4px">
                  time: [t1,t2,t3...]
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; margin-bottom: 4px">
                  country: [US,CA...]
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; opacity: 0.4">
                  other columns...
                </div>
                <div style="margin-top: 8px; font-size: 10px; text-align: center">
                  Read ONLY needed
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
                Parquet is a columnar binary format where each column is stored
                separately, allowing queries to read only the columns they need
                instead of entire rows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Columnar layout enables aggressive compression because values in
                a column share the same type and often similar patterns,
                achieving 3x to 10x compression ratios
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                A query selecting 5 columns from a 200 column table reads only 5
                to 15 percent of the bytes compared to row oriented formats like
                CSV or JSON
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The format is self describing, meaning schema metadata is stored
                within the file itself, so readers know the structure without
                external dependencies
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Parquet is optimized for Online Analytical Processing (OLAP)
                workloads where scans dominate and most queries touch a subset
                of columns across many rows
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
                A clickstream table with 200 columns stores 30 days of data: 600
                TB uncompressed in CSV. With Parquet, storage drops to 60 to 200
                TB on disk. A dashboard query needing 5 columns reads 30 to 90
                TB instead of all 600 TB.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query engines like Apache Spark, Trino, Presto, and AWS Athena
                all natively read Parquet and leverage its columnar layout for
                vectorized execution and predicate pushdown.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A Parquet file storing user events might use dictionary encoding
                for the &lt;code&gt;country&lt;/code&gt; field (50 distinct
                values) and delta encoding for sorted
                &lt;code&gt;event_time&lt;/code&gt; timestamps, dramatically
                reducing file size.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonParquetInternalsWhatIsParquetFormat;
