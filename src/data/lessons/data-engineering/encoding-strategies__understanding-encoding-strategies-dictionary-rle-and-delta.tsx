import type { Component } from "solid-js";

const LessonEncodingStrategiesUnderstandingEncodingStrategiesDictionaryRleAndDelta: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Understanding Encoding Strategies: Dictionary, RLE, and Delta
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
                <strong>Encoding strategies</strong> are compression techniques
                that exploit patterns in data to reduce storage size and speed
                up queries. The three fundamental types are Dictionary, Run
                Length Encoding (RLE), and Delta encoding.
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Problem:
            </div>
            Large analytical systems need to scan terabytes of data to answer
            dashboard queries within 1 to 3 seconds. The bottleneck is not CPU
            but I/O and memory bandwidth. Reading fewer bytes from disk or
            object storage directly translates to faster queries and lower
            costs.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Three Pattern Exploiting Approaches:
            </div>
            <strong>Dictionary Encoding</strong> targets repeated values,
            especially in categorical columns. Instead of storing "United
            States" 500 million times as a string, you store it once in a
            dictionary and reference it with a small integer like 7. This works
            because string comparisons are expensive and strings take more
            space, while integer comparisons are cache friendly and take fixed
            space.
            <strong>Run Length Encoding</strong> targets consecutive sequences
            of identical values. Instead of storing A, A, A, A, you store (A,
            4). This is powerful when data is sorted by a column like{" "}
            <code>status</code> or <code>country</code>, creating long runs of
            the same value naturally.
            <strong>Delta Encoding</strong> targets ordered numeric values that
            change gradually. Instead of storing 1000000, 1000010, 1000013, you
            store base 1000000 and deltas [0, 10, 3]. These smaller numbers fit
            in fewer bits and compress better. This pattern dominates time
            series and monotonically increasing IDs like <code>timestamp</code>{" "}
            or <code>order_id</code>.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Modern columnar systems like
              Parquet and Snowflake combine these encodings to get
              multiplicative benefits. A country column might use dictionary
              encoding, then apply RLE to the dictionary IDs after sorting.
            </div>
            These encodings are not just academic. They are how petabyte scale
            warehouses make queries fast enough to render dashboard charts in
            under 1 second while keeping storage costs manageable.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Raw Data</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    "US", "US", "US", "UK"
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Dictionary</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    &#123;"US": 0, "UK": 1&#125;
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Encoded IDs</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    [0, 0, 0, 1]
                  </div>
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
                  Dictionary encoding replaces repeated values with small
                  integer IDs that reference a dictionary, saving space when
                  cardinality is moderate (less than 50,000 distinct values per
                  page)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Run Length Encoding (RLE) stores consecutive identical values
                  as (value, count) pairs, most effective on sorted or clustered
                  columns where long runs naturally occur
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta encoding stores a base value plus small differences for
                  ordered numeric sequences, reducing bit width and improving
                  compression for time series and monotonic IDs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Modern systems combine these encodings multiplicatively:
                  dictionary plus RLE on sorted categorical columns can achieve
                  10 to 50 times compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The primary goal is reducing I/O bytes scanned, not CPU
                  savings, since analytical workloads are bottlenecked by memory
                  bandwidth and disk throughput
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
                  Dictionary: Country column with 200 unique values across 1
                  billion rows compresses 10 to 50 times compared to raw strings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RLE: Sorted status column with runs like (ACTIVE, 50 million)
                  (EXPIRED, 30 million) instead of storing each individual value
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta: Timestamps 1000000, 1000010, 1000013 become base
                  1000000 plus deltas [0, 10, 3] using fewer bits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combined: Dictionary encode country IDs, sort by country, then
                  RLE the dictionary IDs for 2 to 5 times additional compression
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEncodingStrategiesUnderstandingEncodingStrategiesDictionaryRleAndDelta;
