import type { Component } from "solid-js";

const LessonFilePartitioningChoosingPartitionsTradeOffsAndDecisionFramework: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Partitions: Trade-Offs and Decision Framework
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Trade-Off:</strong> Every partitioning decision is
            a balance between query pruning efficiency and operational overhead.
            Finer partitions (hourly instead of daily) improve pruning and
            enable granular retention policies, but explode partition counts,
            metadata size, and operational complexity. Coarser partitions
            simplify management but force queries to scan more irrelevant data.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Daily Partitions
                </div>
                <div style="font-size: 12px">
                  365 partitions/year, simpler ops, but scans 24 hours of data
                  for 1 hour query
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Hourly Partitions
                </div>
                <div style="font-size: 12px">
                  8,760 partitions/year, precise pruning, but 24x metadata
                  overhead
                </div>
              </div>
            </div>
            The math matters. Consider a dataset with 100 GB per day. Daily
            partitions mean a query filtering for 1 specific hour scans all 100
            GB, wasting 95.8% of I/O. Hourly partitions reduce this to 4.2 GB,
            but create 24x more directories. Over 2 years, that is 17,520 hourly
            partitions versus 730 daily ones. Metadata catalogs like Hive
            Metastore or AWS Glue struggle above 50,000 to 100,000 partitions,
            causing listing operations to timeout.
            <strong>Range vs Hash Decision Criteria:</strong> Choose range
            partitioning when query patterns filter by ranges (dates, ID ranges,
            numeric values) and you can tolerate hot partitions. Choose hash
            partitioning when write load must be perfectly balanced and most
            queries scan full datasets anyway. The hidden cost of hash
            partitioning is query performance. If you hash partition by{" "}
            <code>user_id</code> into 128 buckets, a query filtering for users
            1000 to 2000 must scan all 128 buckets because those users are
            randomly distributed. This turns a selective query into a full scan.
            Range partitioning by <code>user_id</code> would allow scanning only
            relevant ID ranges, but creates severe skew if some users generate
            100x more events.
            <strong>Decision Framework:</strong> Start by analyzing query logs.
            If 90% of queries filter by date ranges, make date your primary
            partition. If 70% also filter by a categorical dimension with
            moderate cardinality (50 to 300 values), add it as secondary. Avoid
            more than 2 to 3 partition levels unless you have strong evidence
            they are all heavily used. For write heavy workloads where queries
            rarely filter by specific dimensions, prefer date plus hash bucket.
            This balances write throughput while keeping partition counts
            manageable. A system ingesting 100,000 writes per second can
            distribute load across 128 hash buckets per date, giving 780 writes
            per second per bucket, which is easily handled by modern streaming
            sinks.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not 'partition by everything users might filter
                on.' It is: what filters appear in 80% of queries, and what is
                the minimum partition count that captures those patterns?"
              </div>
            </div>
            <strong>Cardinality Sweet Spot:</strong> Aim for 50 to 500 unique
            values per partition dimension. Below 50 creates significant skew
            risk. Above 500 explodes metadata and file counts. For high
            cardinality dimensions like <code>user_id</code> or{" "}
            <code>device_id</code>, always use hash bucketing to cap unique
            values at 64, 128, or 256 buckets.
            <strong>When to Change Strategy:</strong> Repartitioning is
            expensive but sometimes necessary. Signs you need to repartition
            include query planning time exceeding 10 seconds, partition counts
            above 50,000, or discovering 80% of queries filter by a dimension
            you did not partition on. Modern table formats like Iceberg support
            partition evolution, allowing mixed layouts where old data uses one
            scheme and new data uses another, avoiding full rewrites.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="font-size: 12px; font-weight: 700; margin-bottom: 12px; text-align: center">
                PARTITION STRATEGY DECISION TREE
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    90% queries filter by time?
                  </strong>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ YES
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Use date as primary partition
                  </strong>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    70% also filter by categorical?
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    (region, tenant, source)
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
                  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="font-size: 14px; font-weight: bold">YES ↓</div>
                    <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; width: 100%">
                      <strong style="font-size: 12px">Composite</strong>
                      <div style="font-size: 11px">dt + category</div>
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="font-size: 14px; font-weight: bold">NO ↓</div>
                    <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; width: 100%">
                      <strong style="font-size: 12px">Date + Hash</strong>
                      <div style="font-size: 11px">dt + bucket(128)</div>
                    </div>
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
                  Finer partitions (hourly vs daily) improve pruning from 100 GB
                  to 4.2 GB per query but create 24x metadata overhead, with
                  17,520 partitions over 2 years versus 730
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hash partitioning balances write load perfectly across 64 to
                  128 buckets but turns selective queries into full scans
                  because data is randomly distributed across all buckets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose partition dimensions appearing in 80% of queries with
                  moderate cardinality (50 to 500 unique values), avoiding both
                  skew risk (under 50) and metadata explosion (over 500)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Repartitioning becomes necessary when partition counts exceed
                  50,000, query planning exceeds 10 seconds, or 80% of queries
                  filter by non partitioned dimensions
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
                  A query filtering 1 hour from daily partitioned 100 GB dataset
                  scans all 100 GB (95.8% waste), while hourly partitions reduce
                  scan to 4.2 GB but create 8,760 partitions yearly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  System with 100,000 writes/second using date plus 128 hash
                  buckets distributes to 780 writes/second per bucket, avoiding
                  hot partition bottlenecks while keeping partitions manageable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFilePartitioningChoosingPartitionsTradeOffsAndDecisionFramework;
