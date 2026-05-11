import type { Component } from "solid-js";

const LessonWarehousePartitioningClusteringWhenToUsePartitioningVsAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When to Use Partitioning vs Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Decision Framework:</strong>
            Partitioning is not a universal solution. It trades operational
            complexity and flexibility for targeted query performance. The key
            decision is whether your workload has predictable, high selectivity
            filters that align with partition keys.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Use Partitioning When
                </div>
                <div style="font-size: 12px">
                  90%+ queries filter on same key (date, region, tenant),
                  read/write ratio over 100:1, data volume over 1 TB
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Use Indexes When
                </div>
                <div style="font-size: 12px">
                  Ad hoc queries on many columns, low latency point reads under
                  50ms, frequent updates or deletes
                </div>
              </div>
            </div>
            <strong>Partitioning for Analytical Workloads:</strong>
            Analytical systems with append only writes, large scans, and time
            based or tenant based filters are ideal for partitioning. Consider a
            dashboard showing daily active users over the past 30 days. With
            date partitioning, the query scans exactly 30 partitions. Without
            partitioning, it scans years of history. At 100 TB total and 2 TB
            per day, that is 60 TB scanned versus 2 to 3 TB, a 20x to 30x
            reduction. Query latency drops from several minutes to 10 to 20
            seconds. The math works because analytical queries are often range
            scans or aggregations over large chunks of data. Partition pruning
            eliminates huge swaths of irrelevant data upfront. Clustering within
            partitions further optimizes by enabling block skipping based on
            zone maps.
            <strong>Indexes for Transactional Point Reads:</strong>
            Online Transaction Processing (OLTP) systems need fast point reads
            and updates. Consider a user profile lookup by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            with target latency under 10 milliseconds (ms). A B tree index on{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            provides O(log n) lookup, typically 3 to 4 disk seeks for millions
            of rows, completing in 5 to 15 ms. Partitioning alone cannot achieve
            this. Even with great partition pruning, you still scan a partition
            containing thousands or millions of rows. For low latency point
            queries, indexes are essential. The trade off is that indexes add
            write overhead. Each insert or update must modify the index,
            reducing write throughput. A table with 5 indexes performs 6 writes
            per insert, dropping throughput from 50,000 to 8,000 inserts per
            second.
            <strong>Materialized Views for Complex Aggregations:</strong>
            When queries repeatedly compute expensive aggregations like daily
            unique users or hourly revenue by region, materialized views
            precompute results. Instead of scanning raw events every time,
            queries read a pre aggregated table. This is complementary to
            partitioning. You partition the raw event table by date and cluster
            by user, then build a materialized view that aggregates daily stats,
            also partitioned by date. The trade off is staleness and maintenance
            cost. Materialized views lag behind source data by minutes to hours
            depending on refresh frequency. Refreshing a materialized view over
            100 TB of raw data can take 30 to 60 minutes and consume significant
            compute.
            <strong>Sharding for Write Scalability:</strong>
            In distributed OLTP systems, partitioning is often called sharding,
            and the goal shifts from query optimization to write scalability.
            Systems like Amazon DynamoDB or Cassandra hash partition by primary
            key to distribute writes across hundreds or thousands of nodes. Each
            node handles a subset of the key space, enabling aggregate write
            throughput of 200,000+ operations per second. Range partitioning in
            OLTP is less common because it risks hot spots. Sequential IDs or
            timestamps create hot partitions where recent data receives all
            writes. Hash partitioning spreads load evenly but breaks range query
            locality. You cannot efficiently scan all users in a range without
            hitting many shards.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Applying analytical
              partitioning strategies to OLTP systems or vice versa. Date
              partitioning in a user profile database where lookups are by{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                user_id
              </code>{" "}
              provides no benefit and complicates schema management.
            </div>
            <strong>The Interview Answer:</strong>
            When asked about partitioning, start by clarifying the workload. For
            OLAP (Online Analytical Processing) with time series data and read
            heavy patterns (over 100:1 read/write ratio), partition by time and
            cluster by common join keys. For OLTP with point reads and balanced
            read/write, use indexes and consider hash sharding for horizontal
            scaling. For hybrid workloads, use partitioning plus indexes on hot
            columns, or separate the workload into analytical and transactional
            databases with replication between them. Always quantify the trade
            off: partitioning saves X percent scan cost but adds Y complexity in
            schema management and operational overhead.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partitioning excels for analytical workloads with time or
                  tenant filters, read/write ratios over 100:1, and data volumes
                  over 1 TB, reducing scans by 20x to 100x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Indexes are essential for OLTP point reads targeting under 10
                  to 20 ms latency, but each index adds write overhead reducing
                  insert throughput by 15 to 20 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Materialized views complement partitioning for repeated
                  aggregations, trading staleness (minutes to hours lag) and
                  refresh cost for faster query response
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hash partitioning (sharding) in OLTP distributes writes evenly
                  across nodes for scalability but breaks range query locality,
                  while range partitioning risks hot spots with sequential keys
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The decision depends on read/write ratio, query selectivity,
                  latency requirements, and whether workload is analytical scans
                  or transactional point queries
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
                  Analytical: 100 TB event table, 90% of queries filter on date,
                  partitioning reduces scan from 100 TB to 2 TB, saving $50 per
                  query at $0.05 per GB scanned
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OLTP: User lookup by user_id needs under 10 ms latency, B tree
                  index achieves 5 to 8 ms, partitioning alone would still scan
                  thousands of rows taking 100+ ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid: E commerce system with transactional database for
                  orders (indexed by order_id, 50k writes/sec) replicated to
                  analytical warehouse (partitioned by order_date for BI
                  dashboards)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sharding: DynamoDB table hash partitioned by customer_id
                  across 500 partitions, supporting 200k writes/sec, but
                  customer ID range scans require scatter gather across all
                  partitions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehousePartitioningClusteringWhenToUsePartitioningVsAlternatives;
