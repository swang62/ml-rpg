import type { Component } from "solid-js";

const LessonDwColumnarStorageColumnarStorageFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Columnar Storage Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Write Amplification and Compaction Backlog:
            </div>
            One of the most common production issues with columnar storage is
            compaction falling behind under high update or delete load. When the
            workload has frequent updates or deletes, the engine typically
            writes small delta segments or delete markers rather than rewriting
            large columnar files immediately. Background compaction processes
            then merge and rewrite these into consolidated columnar segments. If
            compaction falls behind, query performance degrades substantially.
            The query engine must read many small segments and apply more delete
            filtering at read time. In cloud systems, this also increases object
            count and metadata overhead, which can become a bottleneck. A
            production Snowflake deployment might see query latency increase
            from 2 seconds to 15 seconds when compaction lags and the number of
            micro partitions per table grows from 5,000 to 50,000.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Teams often underestimate
              compaction cost when migrating write heavy workloads to columnar
              storage. What looks like a 10,000 row per second insert rate
              actually generates 50,000 compaction writes per second in the
              background, exhausting I/O capacity.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Misaligned Sort and Partition Keys:
            </div>
            Columnar systems rely heavily on clustering similar values together
            to maximize compression and enable effective data skipping. If you
            choose a poor sort key, for example sorting by a high cardinality
            random identifier like user UUID instead of timestamp or customer
            ID, min and max statistics per row group become nearly useless.
            Consider a table with 10 billion events sorted by random UUID. Every
            row group will have a min UUID close to zero and a max UUID close to
            the maximum, so a filter on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE event_time BETWEEN X AND Y
            </code>{" "}
            cannot prune any row groups using time based statistics. The
            theoretical advantage of columnar layout is not realized, and you
            end up scanning the entire dataset. This is a common source of "my
            warehouse is slow" issues at scale. Switching from UUID sort to
            timestamp sort can reduce data scanned from 5 TB to 50 GB for time
            range queries, cutting latency from 60 seconds to 3 seconds.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Data Skew and Hot Keys:
            </div>
            Skewed data distributions create operational challenges. If a small
            subset of values dominates a column, dictionary or run length
            encoding may perform extremely well, but hot keys can cause uneven
            work distribution across nodes during joins and aggregates. For
            example, a customer events table where one large enterprise customer
            generates 40 percent of all events. When you join this table with a
            smaller dimension table on customer ID, the shuffle phase sends 40
            percent of data to a single worker node. That node becomes a
            bottleneck while others sit idle, degrading overall query
            performance. Some systems use dynamic repartitioning or adaptive
            execution to mitigate this, but as a designer you need to be aware
            of data skew as a first class concern.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Skew Impact on Query Time
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">BALANCED</div>
                  <div style="font-size: 16px; font-weight: 800">8 sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">SKEWED</div>
                  <div style="font-size: 16px; font-weight: 800">45 sec</div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Wide Table Metadata Overhead:
            </div>
            Very wide tables with hundreds or thousands of columns stress
            metadata systems and cache capacity. Each query must load metadata
            for every column it might access, and systems typically cache column
            statistics in memory. A table with 5,000 columns and 100,000 row
            groups generates 500 million metadata entries. Metadata lookups or
            statistics loading can become a hidden performance bottleneck,
            sometimes taking longer than the actual data scan. This manifests as
            high query planning time before execution even starts. Production
            teams address this by splitting extremely wide tables into multiple
            narrower tables or using nested column formats like Parquet structs
            to reduce top level column count.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Corruption and Partial Write Handling:
            </div>
            From a reliability perspective, corruption or partial writes in a
            column chunk can make a single column unreadable for a subset of
            rows. Good systems store strong checksums like CRC32 or XXHash and
            per page metadata so they can detect corruption quickly and fail
            queries fast or fall back to replicas. They also isolate failures:
            corruption in one column chunk does not affect others. This is why
            columnar formats store metadata at multiple levels. A corrupted page
            in the{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              email
            </code>{" "}
            column should not prevent reading the{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_amount
            </code>{" "}
            column from the same row group.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compaction backlog under high update load can increase query
                  latency from 2 seconds to 15 seconds as the number of micro
                  partitions grows from 5,000 to 50,000 due to segment
                  fragmentation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Poor sort key choice like random UUID instead of timestamp
                  makes min and max statistics useless, increasing data scanned
                  from 50 GB to 5 TB and query time from 3 seconds to 60 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data skew where one customer generates 40 percent of events
                  causes uneven work distribution during joins, degrading query
                  time from 8 seconds balanced to 45 seconds skewed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Wide tables with 5,000 columns and 100,000 row groups generate
                  500 million metadata entries, causing metadata loading to
                  become a bottleneck exceeding actual scan time
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
                  A Redshift deployment saw compaction fall behind during a
                  daily batch load, causing query latency to spike from 3
                  seconds to 20 seconds until manual VACUUM completed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An analytics table sorted by user UUID required scanning 8 TB
                  for time range queries, but re clustering by timestamp reduced
                  scans to 80 GB with 100x latency improvement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDwColumnarStorageColumnarStorageFailureModesAndEdgeCases;
