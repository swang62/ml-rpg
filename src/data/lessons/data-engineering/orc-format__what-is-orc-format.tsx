import type { Component } from "solid-js";

const LessonOrcFormatWhatIsOrcFormat: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is ORC Format?
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
              <strong>Optimized Row Columnar (ORC)</strong> is a columnar file
              format designed for efficient analytics on massive datasets in
              data lakes, used by query engines like Presto, Trino, Hive, and
              Spark.
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Problem It Solves:
          </div>
          Imagine you have a table with 10 billion rows and 200 columns stored
          in a traditional row oriented format. When an analyst queries for just
          3 columns, the system still reads all 200 columns from disk, wasting
          enormous amounts of input/output (I/O), network bandwidth, and CPU
          time. Worse, row oriented formats compress poorly because adjacent
          data has mixed types and patterns.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            How ORC Works:
          </div>
          ORC flips the storage model. Instead of storing rows together, it
          stores each column separately in large chunks called stripes. A
          typical stripe contains 64 MB to 256 MB of uncompressed data. Within
          each stripe, ORC groups rows into smaller units of 10,000 to 20,000
          rows each. Because each column contains homogeneous data, ORC applies
          specialized compression per column. String columns with low
          cardinality get dictionary encoding. Integer columns with repeated
          values get run length encoding. This achieves much better compression
          ratios than generic row compression.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Key Innovation:
          </div>
          ORC stores rich statistics at multiple levels: minimum, maximum,
          count, and null count for each column in every stripe and row group.
          Query engines use these statistics to skip entire stripes that cannot
          possibly match filter conditions. This is called predicate pushdown.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Column Pruning Impact
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">WITHOUT ORC</div>
                <div style="font-size: 16px; font-weight: 800">200 cols</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">WITH ORC</div>
                <div style="font-size: 16px; font-weight: 800">3 cols</div>
              </div>
            </div>
          </div>
          When you read only 3 columns from a 200 column table, you avoid
          reading 98.5% of the data. Combined with stripe skipping from
          predicate pushdown, queries can avoid 80 to 95 percent of disk reads
          entirely.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="text-align: center; font-weight: 700; margin-bottom: 8px">
                ORC File Structure
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong>Stripe 1 (64-256 MB)</strong>
                <div style="margin-top: 8px; font-size: 12px">
                  Column A: [values...] + stats (min, max)
                  <br />
                  Column B: [values...] + stats
                  <br />
                  Column C: [values...] + stats
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong>Stripe 2 (64-256 MB)</strong>
                <div style="margin-top: 8px; font-size: 12px">
                  Column A: [values...] + stats
                  <br />
                  Column B: [values...] + stats
                  <br />
                  Column C: [values...] + stats
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong>File Footer</strong>
                <div style="margin-top: 8px; font-size: 12px">
                  Schema, stripe locations, column types
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
                ORC stores columns separately within large stripes (64 to 256
                MB), enabling query engines to read only requested columns
                instead of entire rows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Each column uses specialized encoding: dictionary encoding for
                strings, run length encoding for repeated integers, achieving
                better compression than row formats
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Statistics (min, max, count, null count) stored per stripe and
                row group enable predicate pushdown to skip 80 to 95 percent of
                irrelevant data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Designed for read heavy analytics on petabyte scale data lakes
                where storage, CPU, and network are all bottlenecks
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
                Query requesting 3 columns from 200 column table reads only 1.5%
                of data instead of 100%
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Stripe with timestamp range 2024-01-01 to 2024-01-15 is entirely
                skipped when query filters for dates after 2024-02-01
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                String column with 50 distinct values across 10 million rows
                compresses to dictionary of 50 entries plus integer references
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonOrcFormatWhatIsOrcFormat;
