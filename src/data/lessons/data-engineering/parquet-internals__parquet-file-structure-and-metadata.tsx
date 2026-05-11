import type { Component } from "solid-js";

const LessonParquetInternalsParquetFileStructureAndMetadata: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Parquet File Structure and Metadata
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Hierarchical Layout:
          </div>
          A Parquet file organizes data into three nested levels: row groups,
          column chunks, and pages. This structure is key to understanding how
          Parquet achieves both efficient compression and fast selective scans.
          At the top level, a file contains one or more row groups. Each row
          group is a horizontal partition of rows, typically 64 to 512 MB
          uncompressed, containing 1 to 10 million rows. Think of a row group as
          a logical batch. Within each row group, data is physically split by
          column: each column gets its own column chunk, which is a contiguous
          byte range holding all values for that column in that row group.
          Column chunks are further divided into pages, usually 1 to 1.5 MB
          each. Pages are the atomic unit of encoding and compression. When you
          write a Parquet file, you encode and compress each page independently,
          choosing the best encoding for that column's data distribution.
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Row Groups:</strong> Horizontal partitions of 64 to 512
                MB each, enabling parallel reads and fine grained row group
                skipping based on statistics.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Column Chunks:</strong> One per column per row group,
                storing all values for that column together to enable columnar
                scans.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Pages:</strong> Atomic units of 1 to 1.5 MB where
                encoding and compression happen, allowing page level skipping
                within a column chunk.
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Magic of Metadata:
          </div>
          Parquet files end with a footer that stores rich metadata. When a
          query engine opens a Parquet file, it reads only the footer first,
          which is typically a few hundred kilobytes even for multi gigabyte
          files. The footer contains the file schema, a list of all row groups,
          and for each row group the byte offset, size, and statistics for every
          column chunk. These statistics include min, max, null count, and
          sometimes distinct count per column per row group. Query engines
          exploit this metadata for predicate pushdown. If your query filters on{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            event_time
          </code>{" "}
          between two dates, the engine checks each row group's min and max
          timestamps. Any row group whose range falls entirely outside the
          filter can be skipped without reading a single byte of actual data. In
          practice, this can eliminate 70 to 90 percent of row groups for time
          range queries on partitioned data, turning a 100 TB scan into a 10 to
          30 TB scan before even touching disk.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Predicate Pushdown Impact
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">WITHOUT</div>
                <div style="font-size: 16px; font-weight: 800">100 TB</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">WITH STATS</div>
                <div style="font-size: 16px; font-weight: 800">10 to 30 TB</div>
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Encoding and Compression:
          </div>
          Each page specifies its encoding type, number of values, and
          compressed and uncompressed sizes. Low cardinality columns like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            country
          </code>{" "}
          might use dictionary encoding where you store unique values once and
          reference them by small integer IDs. Sorted integer columns like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            event_time
          </code>{" "}
          might use delta encoding, storing only differences between consecutive
          values. After encoding, pages are compressed with codecs like Snappy
          (fast decompression) or Zstandard (better compression ratio). This
          flexibility means Parquet adapts to your data. A string column with
          millions of unique values uses plain encoding, while a boolean column
          uses bit packing.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="margin-bottom: 12px; text-align: center; font-weight: 700; font-size: 14px">
              Parquet File Structure
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 11px; font-weight: 700">
                Header (magic number)
              </div>
              <div style="border: 2px dashed; padding: 12px; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 6px; font-size: 12px">
                  Row Group 1 (128 MB)
                </div>
                <div style="display: flex; gap: 6px; margin-top: 6px">
                  <div style="flex: 1; border: 2px solid; padding: 6px; border-radius: 4px; font-size: 10px; text-align: center">
                    Col A<br />
                    Pages
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 6px; border-radius: 4px; font-size: 10px; text-align: center">
                    Col B<br />
                    Pages
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 6px; border-radius: 4px; font-size: 10px; text-align: center">
                    Col C<br />
                    Pages
                  </div>
                </div>
              </div>
              <div style="border: 2px dashed; padding: 12px; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 6px; font-size: 12px">
                  Row Group 2 (128 MB)
                </div>
                <div style="display: flex; gap: 6px; margin-top: 6px">
                  <div style="flex: 1; border: 2px solid; padding: 6px; border-radius: 4px; font-size: 10px; text-align: center">
                    Col A<br />
                    Pages
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 6px; border-radius: 4px; font-size: 10px; text-align: center">
                    Col B<br />
                    Pages
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 6px; border-radius: 4px; font-size: 10px; text-align: center">
                    Col C<br />
                    Pages
                  </div>
                </div>
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 11px">
                <div style="font-weight: 700">Footer</div>
                <div style="font-size: 10px; margin-top: 4px">
                  Schema + Row Group Offsets + Statistics (min/max/null count)
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
                Parquet files consist of row groups (64 to 512 MB each), column
                chunks (one per column per row group), and pages (1 to 1.5 MB
                atomic units)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The footer stores metadata including schema, row group
                locations, and per column statistics like min, max, and null
                count for each row group
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Predicate pushdown uses row group statistics to skip entire row
                groups: a time range filter can eliminate 70 to 90 percent of
                data before reading from disk
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Each column chunk can use different encodings: dictionary
                encoding for low cardinality strings, delta encoding for sorted
                integers, bit packing for booleans
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query engines read only the footer first (typically a few
                hundred KB), then selectively fetch only the column chunks and
                pages needed for the query
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
                A single day of clickstream data might be 5 to 20 TB
                uncompressed, written as Parquet with row groups of 256 MB. A
                query filtering on &lt;code&gt;event_time&lt;/code&gt; reads
                metadata from 20,000 to 80,000 row groups in seconds, then
                fetches only matching chunks.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix or Uber might store 30 days of events as Parquet files
                in S3. A dashboard query selecting 5 columns from 200 reads
                perhaps 5 percent of bytes: 30 TB instead of 600 TB logical
                data.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A &lt;code&gt;user_country&lt;/code&gt; column with 50 distinct
                values uses dictionary encoding: store the 50 countries once,
                then reference by 6 bit IDs (2^6 = 64 possible values),
                dramatically reducing page size.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonParquetInternalsParquetFileStructureAndMetadata;
