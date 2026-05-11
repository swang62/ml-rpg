import type { Component } from "solid-js";

const LessonRowVsColumnarChoosingBetweenRowAndColumnarTradeOffsAndDecisionCriteria: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Between Row and Columnar: Trade-offs and Decision Criteria
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Trade-off:</strong>
            Row based formats optimize for point queries and writes. Columnar
            formats optimize for large scans of a subset of columns. The choice
            hinges on your read/write ratio, query selectivity, and latency
            requirements.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Row Based
                </div>
                <div style="font-size: 12px">
                  p99 &lt; 100ms point queries, frequent updates, full record
                  access
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Columnar
                </div>
                <div style="font-size: 12px">
                  Scan billions of rows, few columns, batch updates, seconds
                  latency OK
                </div>
              </div>
            </div>
            <strong>When Row Based Wins:</strong>
            If a mobile app calls an API to fetch a user profile and settings,
            you want p99 latencies under 100 milliseconds end to end. A row
            layout allows the storage engine to do minimal I/O to fetch all
            needed fields in one read. Updates that touch multiple columns in
            the same row are also efficient because they map to a small number
            of pages. The concrete math: with a row store, updating 5 fields in
            a user record means writing 1 or 2 pages. With columnar, you
            potentially update 5 separate column chunks, each requiring read,
            modify, write cycles. For workloads over 80 percent writes, this
            matters. A table with heavy updates might see throughput drop from
            50,000 to 8,000 inserts per second when using columnar format.
            <strong>When Columnar Wins:</strong>
            Analytical queries that read a few columns for a large fraction of
            the table see dramatically lower cost. Suppose you have 5 TB of user
            event data with 200 columns. A query computing daily active users
            needs only{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            and{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              event_date
            </code>
            . With row storage, you scan all 5 TB. With columnar at 10x
            compression, those 2 columns might be 50 GB total. That's 100x less
            I/O. The downside is point lookups become expensive. Reconstructing
            a row requires fetching from multiple column files, often with
            additional indirection. Latency can jump from tens of milliseconds
            in a row store to hundreds of milliseconds or even seconds,
            especially under concurrency.
            <strong>Storage vs Update Cost:</strong>
            Columnar compression like run length encoding and dictionary
            encoding reduces storage by 3x to 10x, lowering storage cost and
            I/O. The price is more complex encoding logic and expensive small
            writes. Many columnar systems buffer writes and rewrite large
            segments, leading to write amplification. At millions of updates per
            hour on a 10 TB table, this causes many small fragments and frequent
            compaction jobs. If compaction falls behind, queries slow down
            because they read more files and reconcile versions.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision framework: User profile table (99% reads)? Index
                liberally with row format. Event log (99% writes, rare
                analytics)? Row primary with periodic export to columnar.
                Reporting warehouse? Pure columnar."
              </div>
            </div>
            <strong>Hybrid Approaches:</strong>
            Some teams use hybrid designs where a relational database maintains
            a row based primary heap plus columnar secondary structures for
            accelerated analytics on hot tables. This reduces the need for a
            separate analytics copy, at the cost of extra write amplification.
            Others separate concerns entirely: row stores for OLTP, columnar for
            OLAP, with CDC pipelines bridging the gap and accepting minutes of
            replication lag.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Row stores serve point queries under 100 milliseconds but
                  waste I/O on analytical scans reading all columns when only
                  few are needed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar stores reduce analytical query I/O by 10x to 100x by
                  reading only referenced columns but point lookups become 10x
                  slower
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Write heavy workloads (over 80% writes) see throughput drop
                  from 50,000 to 8,000 operations per second with columnar due
                  to write amplification
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar compression at 5x to 10x lowers storage costs but
                  requires expensive compaction when handling millions of
                  updates per hour
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision criteria: row format for OLTP with p99 latency
                  requirements and full record access, columnar for OLAP
                  scanning billions of rows with few columns
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
                  User profile API serving 100,000 requests per second with p99
                  under 50 milliseconds: row based PostgreSQL cluster wins over
                  columnar warehouse
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Daily revenue reporting scanning 10 billion events but only 8
                  columns for aggregation: columnar BigQuery completes in 3
                  seconds vs timeout on row OLTP store
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixed workload: Cassandra row store for user facing writes,
                  hourly export to Parquet in S3, Presto queries columnar files
                  for product analytics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRowVsColumnarChoosingBetweenRowAndColumnarTradeOffsAndDecisionCriteria;
