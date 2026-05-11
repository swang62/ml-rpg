import type { Component } from "solid-js";

const LessonOrcFormatHowOrcStripeArchitectureWorks: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          How ORC Stripe Architecture Works
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Mechanism:
          </div>
          ORC organizes data into stripes, which are self contained units
          typically 64 MB to 256 MB of uncompressed data. Within each stripe,
          ORC divides rows into smaller row groups of 10,000 to 20,000 rows. The
          key insight is that both stripe level and row group level statistics
          enable multi level pruning. When you write data to ORC, the writer
          buffers incoming records until it accumulates enough rows to fill a
          stripe. For each column, it analyzes the data characteristics and
          selects an encoding strategy. A string column with only 100 distinct
          values across 5 million rows gets dictionary encoding: the 100 unique
          strings are stored once, and each row stores a small integer
          reference. An integer column with long runs of repeated values gets
          run length encoding, storing just the value and count.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Statistics at Multiple Granularities:
          </div>
          ORC computes and stores statistics at two levels. First, stripe level
          statistics cover all rows in the stripe: minimum value, maximum value,
          total count, and null count for each column. Second, row group
          statistics provide the same metrics for each 10,000 to 20,000 row
          segment within the stripe.
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Stripe pruning:</strong> Query engine reads file footer,
                checks stripe statistics. Stripe with{" "}
                <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                  timestamp
                </code>{" "}
                range 2024-01-01 to 2024-01-15 is skipped entirely if query
                filters for dates after 2024-02-01.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Row group pruning:</strong> For remaining stripes,
                engine reads row group statistics. Row group with{" "}
                <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                  user_id
                </code>{" "}
                range 1000 to 5000 is skipped if query filters for{" "}
                <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                  user_id
                </code>{" "}
                greater than 10000.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Data reading:</strong> Only for surviving row groups
                does engine decompress and decode actual column data.
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Real Performance Numbers:
          </div>
          At Meta, ORC optimizations on a 600 million row dataset reduced single
          column query wall time by 3.5 to 4 times compared to older readers.
          CPU time dropped by about 4 times. Scaling to a dataset 10,000 times
          larger, the improvements held: 3.5 to 4.5 times faster wall time and
          4.5 to 6.5 times lower CPU usage.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Meta ORC Performance Gains
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">4x</div>
                <div style="font-size: 10px; font-weight: 600">
                  FASTER WALL TIME
                </div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">6.5x</div>
                <div style="font-size: 10px; font-weight: 600">LOWER CPU</div>
              </div>
            </div>
          </div>
          The combination of column pruning, predicate pushdown, and optimized
          encoding delivered these gains. Some workloads with aggressive
          filtering saw up to 30 times effective speedup because the engine
          avoided decoding most data entirely.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Stripes are 64 to 256 MB self contained units; row groups within
                stripes are 10,000 to 20,000 rows, enabling two level pruning
                hierarchy
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Dictionary encoding stores unique values once, then references
                them by small integers; effective when column has 50 to 1000
                distinct values across millions of rows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Stripe level statistics enable coarse pruning; row group
                statistics enable fine grained pruning within selected stripes,
                together skipping 80 to 95 percent of data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Meta measured 3.5 to 6.5 times performance improvement on real
                datasets ranging from 600 million to 6 trillion rows
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
                Stripe with &lt;code&gt;order_date&lt;/code&gt; min 2024-01-01,
                max 2024-01-15 is skipped when query filters
                &lt;code&gt;order_date &gt;= 2024-03-01&lt;/code&gt;
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                String column &lt;code&gt;country_code&lt;/code&gt; with 200
                distinct values encoded as dictionary: 200 strings stored once,
                10 million rows store 1 byte integer references
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query requesting columns &lt;code&gt;user_id&lt;/code&gt;,
                &lt;code&gt;revenue&lt;/code&gt;,
                &lt;code&gt;timestamp&lt;/code&gt; from 200 column table reads
                only 3 column streams per stripe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonOrcFormatHowOrcStripeArchitectureWorks;
