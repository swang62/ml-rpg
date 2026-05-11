import type { Component } from "solid-js";

const LessonDataWarehousingCostBlowUpsAndPerformancePathologies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cost Blow-ups and Performance Pathologies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Data warehouses fail spectacularly when architectural assumptions
            break down, and the economics of scan based billing can turn a
            single mistake into thousands of dollars per hour. Understanding
            these failure modes is essential for production resilience. Cost
            blow-ups happen when queries scan far more data than necessary. An
            unpartitioned 10 terabyte fact table costs 50 dollars to scan once
            at 5 dollars per terabyte. If a Business Intelligence (BI) tool with
            auto refresh queries this every 60 seconds with 50 concurrent users,
            that is 50 scans per minute or 72,000 scans per day, translating to
            3.6 million dollars per day. The fix is partition pruning: partition
            by date and ensure queries include date predicates to scan only
            relevant partitions. Similarly, the many tiny files anti pattern
            where billions of small files create massive metadata overhead can
            throttle throughput to single digit megabytes per second instead of
            gigabytes per second. Performance pathologies often stem from data
            skew and wrong join strategies. If customer purchases follow a power
            law where 1 percent of customers generate 50 percent of orders, hash
            partitioning on customer key sends half the data to one node. That
            straggler node takes 50 times longer than others, and the query
            cannot complete until it finishes. The solution is salting: append a
            random suffix to hot keys to distribute load, or switch join
            strategies to broadcast the smaller dimension. Wrong join strategy
            selection (broadcasting a 100 gigabyte dimension instead of hash
            distributing) explodes memory usage and spills to disk, pushing
            latency from 10 seconds to 10 minutes. Data quality and consistency
            failures are subtle but devastating. Change Data Capture (CDC)
            replication lag of even 5 minutes means reports combine today's
            facts with yesterday's dimensions, producing incorrect metrics. Late
            arriving facts that get assigned yesterday's dimension surrogate
            keys before a dimension update lands create orphaned records or
            double counting in aggregates. Non atomic multi table loads yield
            torn reads where dashboards show partially updated gold layer marts
            with mismatched totals. The fix is transactional semantics: load all
            related tables in a single commit, or use blue green swaps where a
            new complete version of the mart is built offline then atomically
            swapped into production.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Cost Blow-up Example</strong>
                  <div style="font-size: 11px; margin-top: 6px; line-height: 1.5">
                    10 TB table, no partitions
                    <br />
                    BI tool: 50 users × 1 query/min
                    <br />= 72,000 scans/day
                    <br />
                    Cost: $3.6M/day at $5/TB
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Data Skew Impact</strong>
                  <div style="font-size: 11px; margin-top: 6px; line-height: 1.5">
                    1% customers → 50% of data
                    <br />
                    Hash partition on customer_key
                    <br />→ 1 node handles 50% load
                    <br />
                    Query time = slowest node
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
                  Unpartitioned large tables with Business Intelligence (BI)
                  auto refresh can cost 3.6 million dollars per day when 50
                  users scan 10 terabytes every minute at 5 dollars per terabyte
                  scanned
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data skew where 1 percent of keys account for 50 percent of
                  data creates straggler nodes that dominate query latency,
                  fixable by salting hot keys or switching to broadcast joins
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Many tiny files anti pattern (billions of small files) causes
                  severe metadata overhead throttling throughput from hundreds
                  of gigabytes per second to single digit megabytes per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Wrong join strategy (broadcasting 100 gigabyte dimension
                  instead of hash distributing) explodes memory usage, spills to
                  disk, and increases query latency from 10 seconds to 10
                  minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Change Data Capture (CDC) replication lag of just 5 minutes
                  creates torn snapshots where reports combine today's facts
                  with yesterday's dimensions, producing incorrect business
                  metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving facts assigned dimension surrogate keys before
                  dimension updates land create orphaned records or double
                  counts in aggregates, requiring idempotent upserts with
                  deterministic key assignment
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
                  E-commerce company with exploratory analyst joining 10 TB fact
                  to 5 TB dimension without predicates, triggering 75 dollar
                  scan, repeated by BI tool caching for 50 dashboard viewers
                  costing 3,750 dollars in one hour
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming pipeline writing 100,000 files per hour each 10 MB
                  instead of batching into 1 GB files, reducing BigQuery scan
                  throughput from 200 GB per second to 5 GB per second due to
                  metadata overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retail mart loaded in sequence: fact table at 2:00 AM with
                  today's dimension keys, dimension SCD update at 2:05 AM,
                  causing 5 minute window where dashboard shows facts attributed
                  to wrong customer segments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Social network with influencer accounts generating 1,000x more
                  events than typical users, hash partitioning on user_id sends
                  80 percent of data to 2 out of 100 nodes, query takes 40x
                  longer than balanced load
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataWarehousingCostBlowUpsAndPerformancePathologies;
