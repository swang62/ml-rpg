import type { Component } from "solid-js";

const LessonWarehousePartitioningClusteringFailureModesHotPartitionsAndClusteringDegradation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Hot Partitions and Clustering Degradation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>When Partitioning Breaks:</strong>
            Partitioning assumptions fail when data distribution or access
            patterns shift. The two most common failure modes are hot partitions
            and clustering degradation. Both are invisible at small scale but
            catastrophic at production scale.
            <strong>Hot Partition Failure:</strong>
            Hot partitions occur when data or traffic concentrates in a single
            partition. Consider a range partitioned table by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            with sequential ID assignment. New users get incrementally higher
            IDs, so partition 100 (users 1,000,000 to 1,099,999) receives almost
            all writes while partition 1 (users 1 to 99,999) is cold. Suppose
            each node can handle 50,000 writes per second. Your system receives
            50,000 writes/sec total, all hitting partition 100. That single node
            saturates at 100 percent Central Processing Unit (CPU) and disk
            Input/Output Operations Per Second (IOPS), while 99 other nodes sit
            idle. p99 write latency spikes from 20 ms to over 500 ms. Once the
            queue fills, writes start timing out, cascading into application
            errors.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Hot Partition Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">20 ms p99</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">SPIKE</div>
                  <div style="font-size: 16px; font-weight: 800">
                    500 ms p99
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">TIMEOUT</div>
                  <div style="font-size: 16px; font-weight: 800">errors</div>
                </div>
              </div>
            </div>
            The fix is migrating to hash partitioning or composite partitioning
            like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              date + hash(user_id mod 100)
            </code>
            . But migrating a 20 TB table takes hours or days, during which you
            must maintain dual writes or accept downtime. This is why partition
            key choice is critical upfront. Another hot partition scenario is
            time skewed data with hourly partitions. Black Friday traffic might
            generate 10 TB in peak hours versus 500 GB in off hours. Queries
            against peak hour partitions become slow and expensive, while off
            hour queries are fast. The inconsistency complicates capacity
            planning and Service Level Agreement (SLA) guarantees.
            <strong>Clustering Degradation Over Time:</strong>
            Clustering loses effectiveness as new data arrives out of order.
            Imagine a table clustered by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            . Initial loads insert users 1 to 1,000,000 in sorted order,
            creating perfectly clustered micro partitions. Each micro partition
            covers a narrow user ID range like 10,000 to 10,100, and zone maps
            are highly selective. But ongoing writes are random. Events for user
            50,000 arrive mixed with events for user 800,000. New micro
            partitions contain data for many different users. After a few days,
            a filter on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id = 50000
            </code>{" "}
            must read 80 micro partitions instead of 2. Bytes scanned increase
            from 200 megabytes (MB) to 8 gigabytes (GB). Query latency drifts
            from 5 seconds back to 45 seconds. Snowflake measures this with
            clustering depth. Depth starts at 1 (perfect) and grows as writes
            continue. Once depth exceeds 20, query performance visibly degrades.
            You need to schedule reclustering jobs, which rewrite micro
            partitions to restore sorted order. Reclustering a 10 TB table might
            take 2 to 4 hours and consume significant compute credits.
            <strong>Over Partitioning and Metadata Explosion:</strong>
            Another failure mode is too many partitions. Suppose you partition a
            100 TB data lake by date and hour, creating 8,760 partitions per
            year. Each partition has 10 to 50 files, totaling 87,600 to 438,000
            files. Query engines like Presto or Spark must list all files, read
            partition metadata from a metastore, and build an execution plan. At
            this scale, metadata operations dominate. A simple query spends 60
            to 90 seconds listing files before scanning starts. The metastore
            (like Hive Metastore or AWS Glue Catalog) becomes a bottleneck,
            throttling queries and causing intermittent timeouts. Compaction
            jobs to merge files help, but they must run frequently and are
            themselves resource intensive.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Partition key and clustering key
              choices are hard to change after data reaches terabyte scale.
              Always validate assumptions with real query logs and traffic
              projections before committing to a partitioning strategy.
            </div>
            <strong>Operational Monitoring:</strong>
            Production systems need continuous monitoring for partition skew,
            clustering depth, file count per partition, and query latency
            distributions. Set alerts for partition sizes exceeding 2x the
            median, clustering depth over 15, or file counts over 2,000 per
            partition. Schedule regular compaction and reclustering during low
            traffic windows. Track costs because reclustering large tables can
            consume thousands of dollars in compute if not managed carefully.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Clustering Degradation
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Day 1: Depth = 1</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Micro partition 1: users 1000 to 1100
                    <br />
                    Micro partition 2: users 1101 to 1200
                    <br />
                    Filter user 1050 → read 1 partition
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center">
                  ↓ Random inserts
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Day 7: Depth = 18</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Micro partition 50: users 500, 1050, 8000
                    <br />
                    Micro partition 51: users 1050, 3000, 9500
                    <br />
                    Filter user 1050 → read 40 partitions
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                  Latency: 5 sec → 45 sec
                  <br />
                  Needs reclustering
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
                  Hot partitions occur when sequential keys or skewed data
                  concentrate writes on a single partition, saturating that node
                  while others idle, spiking p99 latency from 20 ms to 500+ ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clustering degrades as out of order inserts spread related
                  data across many micro partitions, increasing bytes scanned by
                  10x to 50x and query latency proportionally
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Over partitioning (tens of thousands of partitions) causes
                  metadata explosion where listing files and planning queries
                  takes 60 to 90 seconds before scans even start
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fixing hot partitions requires migrating to hash or composite
                  partitioning, which can take hours or days on multi terabyte
                  tables with downtime or complex dual write strategies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production monitoring must track partition skew, clustering
                  depth, file count, and query latency, with scheduled
                  compaction and reclustering jobs costing thousands of dollars
                  at large scale
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
                  Range partitioned user table with sequential IDs: partition
                  100 gets 50k writes/sec while other 99 partitions idle, node
                  saturates and p99 latency hits 500 ms causing timeouts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event table clustered by user_id: after 1 week of random
                  inserts, clustering depth increases from 1 to 18, filter on
                  user_id reads 40 micro partitions instead of 2, latency goes
                  from 5 sec to 45 sec
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data lake with hourly partitions over 3 years: 26,280
                  partitions with 300k files total, query planning takes 90
                  seconds to list metadata before scanning any data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Black Friday traffic: hourly partition receives 10 TB versus
                  500 GB off peak, creating 20x variance in query performance
                  and making SLAs unpredictable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehousePartitioningClusteringFailureModesHotPartitionsAndClusteringDegradation;
