import type { Component } from "solid-js";

const LessonDwColumnarStorageColumnarStorageInternalArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Columnar Storage Internal Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Physical Layout:
            </div>
            Columnar storage follows a hierarchical structure designed to
            balance sequential read efficiency with the ability to skip
            irrelevant data. At the top level, you have a file or segment,
            typically 100 MB to 1 GB uncompressed. This file divides
            horizontally into row groups, usually 16 to 512 MB each. Each row
            group contains column chunks (one per column), which split further
            into pages, often 8 KB to 1 MB. Pages are the fundamental unit. They
            are the smallest piece the database reads from disk and the unit
            where encoding and compression happen. This multi level hierarchy
            matters because it creates multiple opportunities for skipping work.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>File level:</strong> Query planner identifies which
                  files to read based on partition keys, like event date or
                  customer ID
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Row group level:</strong> Statistics like min and max
                  values per column allow skipping entire row groups that cannot
                  match filter predicates
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Column chunk level:</strong> Only column chunks needed
                  by the query are read from disk
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Page level:</strong> Decompression and decoding happen
                  on these small units, enabling efficient CPU cache usage
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Encoding and Compression:
            </div>
            Within each page, the system applies encoding schemes tuned to the
            column's type and distribution. For low cardinality strings like
            country codes or product categories, dictionary encoding maps values
            to small integer codes. If a column has just 50 distinct countries
            across 1 billion rows, you store a 50 entry dictionary and 1 billion
            integers instead of 1 billion full strings. For repeated values, run
            length encoding stores value and count pairs. A column with long
            runs of the same status, like "pending, pending, pending," becomes
            "pending: 3." For narrow integer ranges, bit packing uses a fixed
            low bit width. If your integers fit in 12 bits instead of 32, you
            save 62.5% space. After encoding, a compression algorithm like
            Snappy, LZ4, ZSTD, or Gzip operates on the encoded bytes. These
            algorithms trade off CPU cost versus compression ratio. Snappy is
            fast with moderate compression, while ZSTD offers better ratios at
            higher CPU cost.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Compression Gains
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5x to 20x</div>
                  <div style="font-size: 10px; font-weight: 600">
                    SIZE REDUCTION
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    8 KB to 1 MB
                  </div>
                  <div style="font-size: 10px; font-weight: 600">PAGE SIZE</div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Metadata for Data Skipping:
            </div>
            Each row group and column page stores critical metadata: min and max
            values, null counts, sometimes distinct counts, and optional bloom
            filters. Systems like Snowflake, Redshift, and BigQuery use this for
            aggressive data skipping. If your query filters on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31'
            </code>{" "}
            and a row group's metadata shows its min date is 2024-05-01, the
            entire row group is skipped without reading a single byte. Snowflake
            micro partitions, roughly 16 MB each, carry rich statistics that
            allow skipping 80 to 98 percent of partitions for common time range
            and customer filters. This transforms terabyte scans into hundred
            gigabyte scans at the I/O level.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Columnar Storage Hierarchy
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: stretch">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px">
                    File (100 MB – 1 GB)
                  </div>
                  <div style="font-size: 11px">
                    Contains multiple row groups
                  </div>
                </div>
                <div style="margin-left: 20px; border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px">
                    Row Group (16 – 512 MB)
                  </div>
                  <div style="font-size: 11px">Min/max stats, null counts</div>
                </div>
                <div style="margin-left: 40px; border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px">
                    Column Chunk (per column)
                  </div>
                  <div style="font-size: 11px">
                    One chunk per column in row group
                  </div>
                </div>
                <div style="margin-left: 60px; border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px">
                    Page (8 KB – 1 MB)
                  </div>
                  <div style="font-size: 11px">
                    Unit of encoding, compression, I/O
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
                  Files are organized into row groups of 16 to 512 MB, each
                  split into column chunks, which divide into pages of 8 KB to 1
                  MB as the unit of I/O and compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dictionary encoding, run length encoding, and bit packing
                  reduce data size by 5 to 20 times before general purpose
                  compression like Snappy or ZSTD is applied
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata including min and max values per row group enables
                  data skipping: Snowflake skips 80 to 98 percent of micro
                  partitions for typical time range filters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pages as the compression unit balance sequential read
                  performance with memory efficiency: small enough to fit in CPU
                  cache but large enough to compress well
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
                  A WHERE order_date = '2024-06-15' filter skips row groups with
                  min date of 2024-01-01 and max date of 2024-03-31 without
                  reading any data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A country column with 50 distinct values across 1 billion rows
                  uses dictionary encoding: 50 string entries plus 1 billion
                  small integers instead of 1 billion full strings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDwColumnarStorageColumnarStorageInternalArchitecture;
