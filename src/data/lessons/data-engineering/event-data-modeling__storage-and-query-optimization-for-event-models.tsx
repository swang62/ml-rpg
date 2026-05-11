import type { Component } from "solid-js";

const LessonEventDataModelingStorageAndQueryOptimizationForEventModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Storage and Query Optimization for Event Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Scale Challenge:
            </div>
            Event models generate massive data volumes. A 10 million user app
            producing 100 events per user per day creates 1 billion events
            daily, or roughly 365 billion events per year. At an average of 1
            kilobyte (KB) per event (including metadata and context), that's 365
            terabytes (TB) of raw data annually. Companies processing events for
            many customers handle petabytes. Efficient storage and query
            strategies are not optional.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Partitioning Strategy:
            </div>
            The most common pattern is to partition by event date. Events for
            January 15, 2024 go into one partition. Events for January 16, 2024
            go into another. This optimizes time range queries, which dominate
            analytics workloads. A query like "show me daily active users for
            the last 30 days" only scans 30 partitions, not the entire dataset.
            However, date only partitioning creates hot partitions for very
            active users or tenants. The solution is compound partitioning:
            first by date, then by hash of user ID or tenant ID. For example,
            events for January 15, 2024 are further split into 100 buckets based
            on user ID hash. This spreads load across many physical partitions.
            The tradeoff is that queries for a specific user must scan all 100
            buckets for each date, increasing query latency.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Columnar Storage Formats:
            </div>
            Event data is write heavy and read optimized for analytical queries
            that aggregate specific columns. Columnar formats like Parquet or
            Optimized Row Columnar (ORC) compress data 5 to 10 times better than
            row formats like JavaScript Object Notation (JSON) or comma
            separated values (CSV) and allow query engines to read only the
            columns needed. For example, a query counting events by type only
            reads the event_type column, not all 50 columns per event. This
            reduces input/output (I/O) by 98%. Additionally, columnar formats
            support efficient encoding. Timestamps can be delta encoded (store
            differences from a base value). Categorical fields like event_type
            or platform can be dictionary encoded (store "iOS" as integer 1,
            "Android" as integer 2). These techniques further reduce storage by
            2 to 5 times beyond basic compression.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Switching from JSON to Parquet for
              event storage typically reduces storage costs by 80% to 90% and
              improves query performance by 10 to 50 times for analytical
              workloads.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Tiered Storage:
            </div>
            Not all event data has the same access pattern. Recent events are
            queried frequently. Events from 6 months ago are accessed rarely.
            Tiered storage places hot data on fast, expensive storage like Solid
            State Drives (SSDs) and cold data on slow, cheap storage like object
            stores. A common pattern is to keep the last 7 days on SSDs for
            interactive queries, the last 90 days on standard object storage for
            batch analytics, and older data on archival storage that takes
            minutes to access. This reduces costs dramatically. SSD storage
            might cost 10 cents per gigabyte (GB) per month. Standard object
            storage costs 2 cents per GB per month. Archival storage costs 0.4
            cents per GB per month. For a petabyte dataset, moving 80% to
            archival storage saves hundreds of thousands of dollars monthly.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Pre Aggregation and Materialized Views:
            </div>
            Interactive analytics require sub second query latencies on billions
            of rows. This is impossible with raw event scans. The solution is
            pre aggregation. You materialize common metrics like daily active
            users, conversion rates, or average session duration as summary
            tables that update incrementally. A query that would scan 10 billion
            raw events instead reads a pre aggregated table with 1 million rows
            (one per user per day), returning results in milliseconds. The
            tradeoff is freshness. Pre aggregated views lag raw events by
            minutes to hours. Systems often maintain both: real time dashboards
            query recent raw events with some latency, while historical reports
            query pre aggregated views for speed.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Indexing for Point Queries:
            </div>
            Some queries need to find all events for a specific user or session,
            not aggregate across all users. Without indexes, this requires
            scanning entire partitions. Solutions include secondary indexes on
            user ID or session ID, typically implemented as inverted indexes or
            bloom filters. A bloom filter can tell you with certainty that a
            user ID is not in a partition, allowing the query engine to skip it.
            This reduces scans by 90% to 99% for point queries at the cost of
            additional storage overhead, typically 1% to 5% of raw data size.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Tiered Storage Strategy
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Hot Tier: Last 7 Days</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    SSD storage: $0.10/GB/month
                    <br />
                    Query latency: &lt;1 second
                    <br />
                    Size: ~7 TB
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Warm Tier: 8 to 90 Days
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Object storage: $0.02/GB/month
                    <br />
                    Query latency: 2 to 5 seconds
                    <br />
                    Size: ~83 TB
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Cold Tier: 91+ Days</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Archival storage: $0.004/GB/month
                    <br />
                    Query latency: minutes
                    <br />
                    Size: ~275 TB (365 days total)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Total Cost</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    $3,560/month vs $36,500 all SSD
                    <br />
                    (90% savings)
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
                  A 10 million user app generating 100 events per user per day
                  creates 365 TB of raw data annually at 1 KB per event.
                  Companies at scale handle petabytes requiring aggressive
                  optimization.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition by date first for time range queries, then by hash
                  of user ID or tenant ID to avoid hot partitions. This spreads
                  load across 100+ buckets per date but increases query latency
                  for single user lookups.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar formats like Parquet reduce storage by 5 to 10 times
                  versus JSON and improve query performance by 10 to 50 times
                  for analytical workloads by reading only needed columns.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tiered storage places last 7 days on SSDs ($0.10 per GB per
                  month), 8 to 90 days on object storage ($0.02 per GB per
                  month), and older data on archival ($0.004 per GB per month),
                  saving 90% on storage costs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre aggregated materialized views allow sub second queries on
                  billions of rows by maintaining summary tables (one row per
                  user per day) updated incrementally, trading freshness for
                  speed.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bloom filters and secondary indexes enable point queries for
                  specific users, reducing partition scans by 90% to 99% at 1%
                  to 5% storage overhead.
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
                  Partitioning example: Events table partitioned as
                  date=2024-01-15/bucket=00 through bucket=99 based on
                  hash(user_id) mod 100. Query for last 30 days scans 30 dates.
                  Query for user_456 scans all 100 buckets for each of 30 dates
                  (3000 partitions but each much smaller).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre aggregation example: Raw events table has 10 billion rows.
                  Daily active users query scans all rows taking 30 seconds. Pre
                  aggregated user_daily_summary table has 100 million rows (10
                  million users * 10 days). Same query on summary table returns
                  in 200 milliseconds.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEventDataModelingStorageAndQueryOptimizationForEventModels;
