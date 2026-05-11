import type { Component } from "solid-js";

const LessonEncodingStrategiesChoosingEncodingStrategiesWhenToUseWhat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Encoding Strategies: When to Use What
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Decision Framework:
            </div>
            Using these encodings is not free. You trade storage and I/O savings
            for additional CPU and complexity, and sometimes for reduced
            flexibility. The decision depends on your data characteristics,
            query patterns, and operational constraints.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Dictionary Encoding
                </div>
                <div style="font-size: 12px">
                  Moderate cardinality (under 50,000 distinct values), stable
                  distribution
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Plain Encoding
                </div>
                <div style="font-size: 12px">
                  High cardinality (millions of distinct values), uniform
                  distribution
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Dictionary Encoding Trade-offs:
            </div>
            Dictionary encoding works best when cardinality is moderate and
            stable. If a column has millions of distinct values and distribution
            is close to uniform, the dictionary is large and the integer IDs
            need many bits. At some point, the cost of building and storing the
            dictionary exceeds the benefit. Some engines switch away from
            dictionary encoding when cardinality exceeds a threshold, for
            example 50,000 or 100,000 distinct values per page. Others keep a
            local per page dictionary rather than a global one to limit memory.
            Dictionary thrashing occurs in streaming or frequently updated data.
            If new distinct values keep arriving (for example new SKUs or
            feature flags), the dictionary can grow beyond CPU cache and degrade
            performance. Some systems cap dictionary size and eventually spill
            rare values to a secondary structure or switch encoding modes for
            new data segments.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              RLE Trade-offs:
            </div>
            RLE trades off read performance for update flexibility. It is ideal
            for mostly append only, sorted data. If you frequently update
            individual rows in the middle of a run stored as (value, count
            1000000), a single change may require splitting that into multiple
            segments. That leads to write amplification and fragmentation. Many
            analytical systems accept this, because they favor bulk append and
            periodic compaction over row level updates.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Delta Encoding Trade-offs:
            </div>
            Delta encoding assumes correlation between adjacent values. If the
            sequence is noisy or unordered, deltas may not be smaller, and they
            can be larger when expressed relative to a base. That wastes bits
            and can reduce compressibility. Time series systems therefore
            sometimes reorder data or batch similar series together to preserve
            monotonic patterns.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not 'use dictionary everywhere.' It is: what is
                my cardinality, am I sorted, and what is my write pattern?"
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Compared to General Purpose Compressors:
            </div>
            These domain specific encodings are usually cheaper to decode than
            general purpose compressors like Gzip or Zstandard. However, they do
            not remove all redundancy. Most columnar formats first apply these
            encodings, then apply a generic compressor. The trade off is tuning
            for CPU budget. For very CPU constrained systems, you may choose
            lighter encodings and a faster but weaker compressor, such as LZ4,
            to keep p99 latency within your SLO.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When NOT to Use These Encodings:
            </div>
            Skip dictionary encoding when cardinality per page exceeds 50,000 to
            100,000 distinct values or when the compression ratio estimate falls
            below 1.1 times. Skip RLE when data is unsorted or values alternate
            frequently. Skip delta encoding when values are unordered or
            variance is too high. In these cases, fall back to plain encoding or
            lightweight generic compression.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="margin-bottom: 12px; text-align: center; font-weight: 700; font-size: 14px">
                Encoding Decision Tree
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">Check Cardinality</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    &lt; 50K: Dictionary
                  </div>
                  <div style="font-size: 11px">&gt; 50K: Plain</div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">Check Sort Order</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Sorted: Add RLE
                  </div>
                  <div style="font-size: 11px">Unsorted: Skip RLE</div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">Check Sequence</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Monotonic: Delta
                  </div>
                  <div style="font-size: 11px">Noisy: Plain</div>
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
                  Dictionary encoding should be skipped when cardinality exceeds
                  50,000 to 100,000 distinct values per page or when compression
                  ratio falls below 1.1 times
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RLE is ideal for append only sorted data but creates write
                  amplification when updating individual rows in the middle of
                  runs stored as (value, count 1000000)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta encoding fails on unordered or noisy sequences where
                  deltas are not smaller than original values, wasting bits and
                  reducing compressibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Domain specific encodings are cheaper to decode than Gzip or
                  Zstandard but often combined with lightweight generic
                  compressors like LZ4 for CPU constrained systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adaptive selection during ingestion samples columns and
                  estimates compression ratios, revisiting decisions during
                  compaction when more data is available
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
                  User ID column with 1 billion unique values: dictionary would
                  be larger than raw data, use plain encoding instead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Status column frequently updated mid run: single change to
                  (ACTIVE, 1000000) requires splitting into multiple segments,
                  causing write amplification
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Timestamps arriving out of order due to clock skew: deltas
                  become large and irregular, breaking delta encoding
                  assumptions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CPU constrained system with p99 latency SLO under 3 seconds:
                  use lighter encodings plus LZ4 instead of heavier Zstandard
                  compression
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEncodingStrategiesChoosingEncodingStrategiesWhenToUseWhat;
