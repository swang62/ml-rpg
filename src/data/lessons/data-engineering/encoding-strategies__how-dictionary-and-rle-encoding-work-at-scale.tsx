import type { Component } from "solid-js";

const LessonEncodingStrategiesHowDictionaryAndRleEncodingWorkAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Dictionary and RLE Encoding Work at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Implementation Mechanics:
            </div>
            These encodings are applied per column chunk or page, not globally.
            A typical pattern in Parquet or Snowflake breaks each column into
            pages of 64 KB to 1 MB uncompressed. For each page, the system
            profiles the data, decides which encoding to use, then encodes and
            optionally compresses it.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Dictionary Encoding Process:
            </div>
            The encoder makes a first pass over the page to collect distinct
            values up to a size limit. Values go into a hash table. Once the
            dictionary is built, it gets serialized. A second pass replaces each
            value with its dictionary index. The index bit width adapts to
            dictionary size: 8 bits for up to 256 distinct values, 16 bits for
            up to 65,536. These indices are bit packed to avoid wasting bytes.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Profile:</strong> Scan column page to collect distinct
                  values (e.g., 150 unique country codes)
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Build dictionary:</strong> Store each unique value
                  once with an ID (requires 8 bits per ID for 150 values)
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Replace:</strong> Substitute each occurrence with bit
                  packed integer ID
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Store:</strong> Serialize dictionary plus packed ID
                  stream together in page
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              RLE Hybrid Scheme:
            </div>
            RLE is often combined with bit packing. The encoder scans the
            sequence (often dictionary indices) and detects runs. For runs
            longer than a threshold (typically 4 to 8 values), it emits an RLE
            segment containing the value and run length. For scattered values,
            it emits a bit packed block of raw values.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Compression Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10-50x</div>
                  <div style="font-size: 10px; font-weight: 600">
                    DICTIONARY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2-5x</div>
                  <div style="font-size: 10px; font-weight: 600">
                    RLE ON TOP
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Query Time Optimization:
            </div>
            Query engines exploit these encodings without always fully decoding.
            For dictionary encoding, filters like <code>country = 'US'</code>{" "}
            are translated into <code>dictionary_id IN &#123;7&#125;</code>, and
            the scan checks integer equality. Aggregations like COUNT DISTINCT
            operate on dictionary IDs and dictionary size instead of values. For
            RLE, a filter like <code>status = 'ACTIVE'</code> can skip entire
            runs of other statuses with a single comparison. At larger scale,
            systems implement adaptive encoding selection. During ingestion, the
            engine samples part of each column, evaluates candidate encodings by
            estimating compressed sizes, then picks the best. This decision can
            be revisited during later compaction when more data is available.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dictionary encoding uses two passes: first to build the
                  dictionary hash table, second to replace values with bit
                  packed integer IDs matching dictionary size
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RLE hybrid encoding switches between run segments (value,
                  count) for repetitive sequences and bit packed blocks for
                  scattered values based on a run length threshold of 4 to 8
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bit packing adjusts integer width dynamically: 8 bits for up
                  to 256 distinct values, 16 bits for up to 65,536, avoiding
                  wasted bytes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query engines can filter on encoded data directly: translating
                  &lt;code&gt;country = 'US'&lt;/code&gt; to integer ID checks
                  without full decode improves scan performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adaptive encoding selection during ingestion samples columns
                  and estimates compression ratios to choose the best strategy
                  per page
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
                  Dictionary for 200 unique countries in 1 billion rows: store
                  200 strings once, then 1 billion 8 bit IDs instead of 1
                  billion full strings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RLE on sorted status column: (ACTIVE, 50000000) (EXPIRED,
                  30000000) stores 2 segments instead of 80 million individual
                  values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combined approach: dictionary encode country column to IDs,
                  sort by country, then RLE the IDs for multiplicative
                  compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Filter pushdown: &lt;code&gt;WHERE status =
                  'ACTIVE'&lt;/code&gt; becomes &lt;code&gt;WHERE dict_id =
                  5&lt;/code&gt; checked against RLE segments, skipping non
                  matching runs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEncodingStrategiesHowDictionaryAndRleEncodingWorkAtScale;
