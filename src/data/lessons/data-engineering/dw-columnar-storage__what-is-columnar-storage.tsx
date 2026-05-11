import type { Component } from "solid-js";

const LessonDwColumnarStorageWhatIsColumnarStorage: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Columnar Storage?
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
              <strong>Columnar Storage</strong> is a database layout where each
              column of data is stored separately and contiguously, rather than
              storing complete rows together. Instead of organizing data as
              entire records side by side, it groups all values from each column
              together.
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Problem:
          </div>
          Traditional row oriented databases store data the way you think about
          it: one complete record after another. When you fetch a user profile
          with 50 fields, reading one row makes sense. But modern analytics
          queries have a completely different pattern. They scan billions of
          rows yet only need 5 columns out of 300, and they almost always
          aggregate the results. Imagine a query that calculates average order
          value across 1 billion orders. The query needs just two columns:{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            order_id
          </code>{" "}
          and{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            total_amount
          </code>
          . But your orders table has 80 columns. With row storage, you must
          read all 80 columns for every single row, even though you discard 78
          of them immediately. At terabyte scale, this wasted I/O becomes
          catastrophic.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            How Columnar Storage Works:
          </div>
          Columnar storage reorganizes data physically on disk. Instead of
          storing{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            [row 1: all columns], [row 2: all columns]
          </code>
          , it stores{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            [column A: all rows], [column B: all rows]
          </code>
          . When your query needs only 5 columns, the database reads only those
          5 column files. This is called column pruning, and it can reduce I/O
          by 50 to 100 times for wide tables. But the benefits go deeper.
          Because all values in a column have the same data type and often
          similar patterns, compression becomes incredibly effective. Techniques
          like dictionary encoding and run length encoding can shrink data by 5
          to 20 times. A column of repeated country codes compresses
          beautifully. A column mixing random data types does not.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Nearly every modern data warehouse
            uses columnar storage: Snowflake, BigQuery, Redshift, and even data
            lake query engines like Presto and Spark default to columnar formats
            such as Parquet or ORC.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Key Insight:
          </div>
          Columnar storage trades write complexity for read performance. Writing
          a single row requires touching multiple column files instead of
          appending to one place. But for analytics workloads where each query
          scans millions of rows and you run far more reads than writes, this
          tradeoff delivers 10 to 50 times better performance.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="text-align: center; margin-bottom: 16px; font-weight: 700; font-size: 14px">
              Row Storage vs Columnar Storage
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-weight: 700; text-align: center; margin-bottom: 8px; font-size: 13px">
                  Row Storage
                </div>
                <div style="font-size: 11px; line-height: 1.6">
                  <div>Row 1: id, name, age, city</div>
                  <div>Row 2: id, name, age, city</div>
                  <div>Row 3: id, name, age, city</div>
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-weight: 700; text-align: center; margin-bottom: 8px; font-size: 13px">
                  Columnar Storage
                </div>
                <div style="font-size: 11px; line-height: 1.6">
                  <div>Column id: [1, 2, 3, ...]</div>
                  <div>Column name: [Alice, Bob, ...]</div>
                  <div>Column age: [25, 30, 35, ...]</div>
                  <div>Column city: [NYC, LA, ...]</div>
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
                Columnar storage organizes data by column instead of by row,
                storing all values for each column together on disk
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Column pruning allows queries to read only the columns they
                need, reducing I/O by 50 to 100 times for wide tables with many
                unused columns
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Compression is 5 to 20 times more effective because values in a
                single column have the same type and similar patterns, enabling
                dictionary encoding and run length encoding
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Analytics queries that scan billions of rows but touch few
                columns see 10 to 50 times better performance compared to row
                oriented storage at the same scale
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
                A query selecting AVG(order_amount) from 1 billion orders with
                80 columns only reads the order_amount column file, avoiding
                98.75% of unnecessary I/O
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Snowflake, BigQuery, Redshift, and Apache Parquet all use
                columnar storage internally for their analytics workloads
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDwColumnarStorageWhatIsColumnarStorage;
