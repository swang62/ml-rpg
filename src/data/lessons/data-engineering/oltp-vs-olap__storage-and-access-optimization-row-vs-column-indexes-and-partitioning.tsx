import type { Component } from "solid-js";

const LessonOltpVsOlapStorageAndAccessOptimizationRowVsColumnIndexesAndPartitioning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Storage and Access Optimization: Row vs Column, Indexes, and
            Partitioning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            OLTP and OLAP use radically different storage layouts and access
            patterns. OLTP relies on row oriented storage with page level
            caching and B-tree indexes optimized for point lookups and short
            range scans. When you query an order by ID, the database uses a
            B-tree index to jump directly to the page containing that row, reads
            the entire row (all columns together), and returns in single digit
            milliseconds. Indexes are narrow and selective, targeting primary
            access paths like user ID, order ID, or session token. Wide or
            unselective secondary indexes amplify write latency because every
            insert or update must maintain multiple index structures, creating
            write amplification that can degrade throughput from 50,000 to
            10,000 writes per second. OLAP uses columnar storage where each
            column is stored separately with aggressive compression via
            dictionary encoding and run length encoding. When you query for
            total revenue by region, the system reads only the revenue and
            region columns, ignoring the other 50 columns in the fact table.
            This dramatically reduces I/O: scanning 1 billion rows might read 10
            GB of compressed column data instead of 500 GB of full row data.
            Vectorized execution processes thousands of values per CPU
            instruction using Single Instruction Multiple Data (SIMD), achieving
            scan throughput of gigabytes per second per core. Zone maps and
            min/max statistics enable partition pruning: if you filter for
            orders in March 2024 and a partition's zone map shows it only
            contains January data, the query engine skips it entirely without
            reading a single byte. Partitioning strategies differ fundamentally.
            OLTP partitions large tables by time or tenant to keep working sets
            hot and maintenance bounded: archiving old partitions, rebuilding
            indexes, or running vacuum operations can target specific partitions
            without locking the entire table. Amazon's order tables might
            partition by order date with daily or weekly granularity, keeping
            the last 90 days hot for fast lookups while aging older data to
            cheaper storage tiers. OLAP partitions by time and frequently
            filtered dimensions (date, region, product category), then clusters
            or sorts within partitions to group related data together for better
            compression and predicate pushdown. Poor partitioning decisions have
            severe consequences: partitioning OLAP data by high cardinality user
            ID instead of by time creates millions of tiny files that overwhelm
            metadata operations and prevent partition pruning, forcing full
            scans that turn 10 second queries into 10 minute queries.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="display: flex; justify-content: space-around; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 15px; margin-bottom: 10px; text-align: center">
                    OLTP: Row Storage
                  </div>
                  <div style="font-size: 12px; font-family: monospace; padding: 8px; border: 1px solid; border-radius: 4px">
                    Row 1: [id:123, name:Alice, region:US, revenue:500]
                    <br />
                    Row 2: [id:124, name:Bob, region:EU, revenue:300]
                  </div>
                  <div style="font-size: 12px; margin-top: 8px; line-height: 1.5">
                    <strong>Point Lookup:</strong> Read entire row via B-tree
                    index in 2ms
                    <br />
                    <strong>Scan 1M rows:</strong> Read all columns = 200 MB
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 15px; margin-bottom: 10px; text-align: center">
                    OLAP: Columnar
                  </div>
                  <div style="font-size: 12px; font-family: monospace; padding: 8px; border: 1px solid; border-radius: 4px">
                    region: [US,EU,US,US...]
                    <br />
                    revenue: [500,300,450,...]
                  </div>
                  <div style="font-size: 12px; margin-top: 8px; line-height: 1.5">
                    <strong>Aggregate:</strong> Read only 2 columns, compressed
                    <br />
                    <strong>Scan 1B rows:</strong> Read 10 GB (50x less I/O)
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
                  OLTP uses row oriented storage with B-tree indexes for point
                  lookups (single digit ms); wide secondary indexes cause write
                  amplification that can cut throughput from 50K to 10K
                  writes/sec
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OLAP columnar storage reads only needed columns with
                  dictionary and run length encoding; scanning 1 billion rows
                  might read 10 GB compressed versus 500 GB row oriented,
                  achieving 50x I/O reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Vectorized execution in OLAP processes thousands of values per
                  instruction using SIMD, achieving scan throughput of gigabytes
                  per second per core versus row by row iterator overhead in
                  OLTP
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition pruning via zone maps and min/max statistics lets
                  OLAP skip entire partitions without reading bytes; poor
                  partitioning (by high cardinality user ID) creates millions of
                  tiny files and forces full scans, degrading 10 second queries
                  to 10 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OLTP partitions by time or tenant to keep working sets hot and
                  bound maintenance operations; OLAP partitions by time and
                  filter dimensions (date, region), then sorts within partitions
                  for compression and pushdown
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
                  Amazon order lookup: B-tree index on order_id jumps to page,
                  reads entire row in 3 ms; analytical query scans 50 billion
                  order rows but reads only order_date, region, and revenue
                  columns (columnar), completing in 12 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google BigQuery: columnar scan of 10 TB fact table with
                  partition pruning on date filters; reads only 500 GB after
                  pruning 95% of partitions, returns aggregates in 8 seconds
                  using slot parallelism
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber trip analytics: OLTP trip state table has selective index
                  on trip_id and user_id; OLAP fact table partitioned by day and
                  clustered by city_id, enabling city specific revenue rollups
                  to scan 1% of data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOltpVsOlapStorageAndAccessOptimizationRowVsColumnIndexesAndPartitioning;
