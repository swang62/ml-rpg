import type { Component } from "solid-js";

const LessonEncodingStrategiesProductionScaleBigquerySnowflakeAndDataLakeEncoding: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale: BigQuery, Snowflake, and Data Lake Encoding
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Scale Challenge:
            </div>
            Consider a data warehouse with 5 petabytes of logical data and daily
            ingestion of 5 terabytes. Typical interactive BI workloads might run
            500 to 1,000 queries per minute, with a service level objective
            (SLO) of p50 latency under 2 seconds and p95 under 5 seconds. Full
            scans of raw data at this scale are impossible within that latency,
            even with hundreds of nodes. The warehouse must reduce the bytes
            scanned per query, often by 5 to 20 times. Columnar storage is the
            first step, since most analytical queries touch only 10 to 20
            percent of columns. Within each column, these encodings reduce size
            further.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Numbers:
            </div>
            For a <code>country</code> column with 200 possible values across a
            billion rows, dictionary encoding can reduce storage by 10 to 50
            times compared to raw strings. If the column is also sorted by
            country, RLE on top of the dictionary indices can add another 2 to 5
            times reduction, because you now encode runs like (ID 7, count 50
            million).
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Query Performance Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    LOGICAL SCAN RATE
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    100-500 MB/s
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    EFFECTIVE RATE
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    Several GB/s
                  </div>
                </div>
              </div>
            </div>
            On numeric time series, such as metrics at Meta or Netflix, delta
            encoding plus bit packing and an optional general compressor like
            Zstandard can achieve over 90 percent reduction. Facebook Gorilla
            style compression for time series uses delta of delta for timestamps
            and XOR for floating point values. That allowed them to store
            billions of metrics in memory with approximately 1 byte per point
            for timestamps and a few bytes for values, serving queries with p95
            latencies in the tens of milliseconds.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Cost Implications:
            </div>
            From a cost perspective, at cloud storage prices around 20 dollars
            per terabyte per month, improving compression from 2 times to 8
            times on 5 petabytes of raw data saves hundreds of thousands of
            dollars per year. That is why vendors invest heavily in
            sophisticated encoding strategies. In the query path, the engine
            reads encoded column chunks from disk or object storage at 100 to
            500 megabytes per second per core. Because the data is compressed
            and encoded, the effective logical scan rate can be several
            gigabytes per second per core. Vectorized execution engines process
            encoded integers directly for predicates and aggregations, sometimes
            without full decode, which keeps CPU cycles and cache misses low.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> This is how systems can scan
              billions of rows and still render a dashboard chart in under 1
              second for common cases. The combination of columnar layout, smart
              encoding, and vectorized execution makes interactive analytics at
              petabyte scale economically viable.
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
                  Data warehouses with 5 petabytes and 500 to 1,000 queries per
                  minute need 5 to 20 times byte reduction to meet p95 latency
                  SLOs under 5 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dictionary plus RLE on sorted categorical columns achieves 20
                  to 250 times total compression: 10 to 50 times from
                  dictionary, 2 to 5 times from RLE on top
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Facebook Gorilla compression for time series uses delta of
                  delta and XOR encoding to achieve approximately 1 byte per
                  timestamp point and p95 latencies in tens of milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Improving compression from 2x to 8x on 5 petabytes at 20
                  dollars per terabyte per month saves hundreds of thousands of
                  dollars annually in storage costs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Vectorized engines process encoded integers directly for
                  filters and aggregations without full decode, achieving
                  effective scan rates of several gigabytes per second per core
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
                  BigQuery country column: 200 values across 1 billion rows
                  compressed 10 to 50 times via dictionary, then 2 to 5 times
                  more via RLE after sorting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta metrics storage: billions of time series points stored at
                  approximately 1 byte per timestamp using delta of delta
                  encoding
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parquet data lake: typical workload scans 10 to 20 percent of
                  columns at 100 to 500 MB/s per core physical rate but several
                  GB/s effective logical rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snowflake warehouse: 5 petabyte dataset with 5 terabyte daily
                  ingestion serving 500 to 1,000 queries per minute under 2
                  second p50 latency
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEncodingStrategiesProductionScaleBigquerySnowflakeAndDataLakeEncoding;
