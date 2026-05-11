import type { Component } from "solid-js";

const LessonWarehousePartitioningClusteringProductionScalePartitioningAt400BillionEventsPerDay: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale: Partitioning at 400 Billion Events Per Day
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Scale Challenge:</strong>
            At companies handling massive event streams, raw intuition about
            partitioning breaks down. What works for 10 GB tables creates
            operational nightmares at 50 TB per day. The key is understanding
            the mathematics of partition count, file size, and metadata
            overhead.
            <strong>The Netflix or Meta Scale Problem:</strong>
            Imagine ingesting 5 million events per second globally. That is 432
            billion events per day, landing at roughly 50 TB per day compressed
            in columnar format. Without partitioning, queries scanning even one
            day of data would take minutes and cost significant compute dollars.
            But naive partitioning creates worse problems. Suppose you partition
            by hour. That is 24 partitions per day, 720 per month. If event
            volume is uneven and some hours have only 100 GB while peak hours
            have 3 TB, you have created hot partitions. Queries during peak
            hours hit 3 TB partitions and run slowly, while off peak queries are
            fast. The inconsistency makes capacity planning difficult. Now
            suppose you partition too finely, by minute. That is 1,440
            partitions per day, 43,200 per month. With typical Parquet or ORC
            file sizes of 100 to 500 MB, each minute partition might have 2 to
            10 files. At 43,200 partitions with 5 files each, you have 216,000
            files per month. Systems like Apache Hive, Spark, or Presto must
            list and open each file. Metadata operations dominate query time. A
            query that should finish in 10 seconds spends 2 to 3 minutes just
            reading file listings from object storage.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                File Count Impact on Query Planning
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    1000 files
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    10 sec query
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    200K files
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    180 sec query
                  </div>
                </div>
              </div>
            </div>
            <strong>The Sweet Spot:</strong>
            Daily partitions are the most common choice for large event tables.
            Each partition holds 2 to 5 TB compressed, split across hundreds of
            files each around 256 MB to 1 GB. This keeps file count manageable
            while enabling parallelism. Queries filtering by date touch only
            relevant days, and within each day, clustering by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              session_id
            </code>{" "}
            enables data skipping. For extremely high volume streams exceeding
            100 TB per day, hourly partitions become necessary. But you must
            combine them with compaction jobs that merge small files into larger
            ones, typically running every few hours. This keeps file count under
            control.
            <strong>Composite Partitioning for Multi Tenant Systems:</strong>
            Some systems use composite keys like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              date + region
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              date + hash(user_id mod 10)
            </code>
            . This spreads data more evenly when certain dates or regions are
            hot. The trade off is that queries filtering by date alone must scan
            all sub partitions within that date. If you have 10 hash buckets per
            day, a date filter reads 10 partitions instead of 1. This can double
            or triple scan volume for time only queries.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> BigQuery and Snowflake handle much
              of this automatically through micro partitions and automatic
              clustering. But in data lakes on S3 or GCS with Spark or Presto,
              you must explicitly design partition schemes and file compaction
              pipelines.
            </div>
            <strong>Operational Complexity:</strong>
            At production scale, partitioning requires continuous monitoring.
            Track partition sizes to detect skew. Monitor file count per
            partition to catch over fragmentation. Set up alerts when clustering
            depth degrades. Schedule compaction and reclustering during low
            traffic windows. All of this is invisible at small scale but becomes
            critical infrastructure work at terabyte and petabyte scale.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Partition Size Trade-offs
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Too Fine: By Minute</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    43K partitions/month
                    <br />
                    200K+ files → slow planning
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Sweet Spot: By Day</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    30 partitions/month
                    <br />2 to 5 TB each, good parallelism
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Too Coarse: By Month</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    1 partition/month
                    <br />
                    150 TB → poor pruning
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
                  Daily partitions are optimal for most large event tables,
                  keeping partition sizes at 2 to 5 TB and file counts
                  manageable under 1000 files per partition
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Over partitioning (by minute or hour without compaction)
                  creates 200K+ files, spending more time on metadata operations
                  than actual data scanning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Under partitioning (monthly or no partitioning) forces full
                  scans of 50+ TB even for single day queries, causing minute
                  long latencies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Composite partitioning like date + hash(user_id) spreads load
                  but increases scan volume for queries that filter only by
                  date, trading generality for specific optimizations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems require continuous monitoring of partition
                  skew, file count, and clustering depth, with scheduled
                  compaction and reclustering jobs
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
                  Event stream at 5 million events/second (432 billion/day):
                  daily partitions yield 30 partitions per month with 2 TB each,
                  enabling sub 20 second queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Minute level partitioning at same scale: 43,200 partitions per
                  month with 216,000 files causes query planning to take 2 to 3
                  minutes before scans even start
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Composite partitioning with date + region: North America
                  region partition gets 30 TB/day while smaller regions get 2
                  TB, requiring load balancing or further sub partitioning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehousePartitioningClusteringProductionScalePartitioningAt400BillionEventsPerDay;
