import type { Component } from "solid-js";

const LessonEncodingStrategiesFailureModesAndEdgeCasesInEncodingStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Encoding Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Dictionary Encoding Breakdown:
            </div>
            Dictionary encoding breaks down on very high cardinality or
            adversarial data. Imagine a <code>user_id</code> column with 1
            billion unique values in a batch, or free text fields. A dictionary
            would require storing almost every value, plus an ID, plus mapping
            overhead. In the worst case, the encoded representation can be
            larger than the raw, especially once you account for dictionary
            metadata and alignment. To avoid this, engines often sample the
            column first and fall back to plain encoding when the compression
            ratio is below a threshold, such as less than 1.1 times. This
            sampling adds latency during ingestion but prevents catastrophic
            space expansion.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Dictionary thrashing occurs when new
              distinct values keep arriving in streaming data. The dictionary
              grows beyond CPU cache, degrading performance. Systems cap
              dictionary size and switch encoding modes for new segments.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              RLE Worst Case:
            </div>
            RLE has a classical worst case: alternating values like ABABAB.
            Instead of compressing, RLE representation becomes larger because
            you store a count for every element. In practice, columnar systems
            apply RLE only when runs exceed a minimum length, for example 4 or 8
            consecutive values. Another failure mode is unsorted data. If you
            apply RLE before sorting by the RLE candidate column, you rarely get
            long runs. This is why sort or clustering keys are critical design
            choices in warehouses. A poorly chosen clustering key can waste
            potential compression by a factor of 5 to 10 times.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                RLE Compression Variance
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    SORTED DATA
                  </div>
                  <div style="font-size: 16px; font-weight: 800">5-10x</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">vs</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    UNSORTED DATA
                  </div>
                  <div style="font-size: 16px; font-weight: 800">1.1x</div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Delta Encoding Pitfalls:
            </div>
            Delta encoding can misbehave when values are not ordered by time or
            by magnitude. For example, if timestamps arrive out of order due to
            clock skew or network reordering, deltas may become large and
            irregular. This breaks assumptions about small differences and
            causes poor compression and sometimes overflow problems if not
            handled with larger integer types. Engines either buffer and reorder
            within a time window or fall back to plain encoding when variance is
            too high. The buffering adds memory pressure and latency, creating a
            trade off between compression quality and ingestion throughput.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Compatibility and Evolution:
            </div>
            A subtle failure mode is compatibility and evolution. Once data is
            written with a particular encoding, changing encodings requires
            either on the fly decode and re encode or keeping multiple formats.
            If the encoding implementation has a bug, it can corrupt huge swaths
            of historical data. Production systems therefore version encodings
            and maintain strict backward compatibility rules, which adds
            complexity to the storage layer. For example, Parquet has multiple
            versions of RLE and bit packing schemes. Queries must handle mixed
            encodings across segments written at different times.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Monitoring and Operational Reality:
            </div>
            To keep p99 query latency within, say, 3 seconds, you track per
            column compression ratio, CPU time spent in decode, cache hit rates,
            and the percentage of data that uses each encoding. When you see
            decode CPU dominating or compression ratios falling below targets,
            you consider changing sort keys, partitioning, or encoding
            strategies.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Encoding bugs can corrupt
              historical data at massive scale. Production systems version
              encodings and enforce backward compatibility to allow safe
              evolution and rollback.
            </div>
            This operational aspect is what differentiates a theoretical design
            from a production ready encoding layer in a FAANG scale data system.
            You need continuous monitoring, adaptive thresholds, and graceful
            fallbacks to handle the edge cases that inevitably appear at
            petabyte scale.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dictionary encoding worst case with 1 billion unique user IDs
                  creates larger encoded representation than raw due to
                  dictionary metadata and alignment overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RLE compression on unsorted data achieves only 1.1 times
                  compression versus 5 to 10 times on sorted data, making
                  clustering key choice critical
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Timestamps arriving out of order due to clock skew cause large
                  irregular deltas that break compression assumptions and risk
                  integer overflow
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Engines sample columns during ingestion and fall back to plain
                  encoding when estimated compression ratio is below 1.1 times
                  to avoid space expansion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Encoding versioning and backward compatibility rules are
                  mandatory because implementation bugs can corrupt petabytes of
                  historical data with no easy recovery
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
                  Free text field in dictionary: each unique comment creates new
                  dictionary entry, causing dictionary to exceed original data
                  size
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alternating status values ABABAB: RLE stores
                  (A,1)(B,1)(A,1)(B,1) which is larger than plain encoding
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distributed logs with clock skew: timestamps 1000, 5000, 2000,
                  6000 produce deltas [0, 4000, negative 3000, 4000] that are
                  not smaller
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixed encoding segments: query must decode Parquet v1 RLE from
                  2020 alongside v2 hybrid RLE from 2023 in same column scan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEncodingStrategiesFailureModesAndEdgeCasesInEncodingStrategies;
