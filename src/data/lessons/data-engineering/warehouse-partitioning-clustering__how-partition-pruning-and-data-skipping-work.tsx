import type { Component } from "solid-js";

const LessonWarehousePartitioningClusteringHowPartitionPruningAndDataSkippingWork: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Partition Pruning and Data Skipping Work
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Mechanism:</strong>
            Partition pruning and data skipping are the two techniques that turn
            partitioning and clustering from storage strategies into query
            performance multipliers. They work at different stages of query
            execution and rely on metadata that tracks what data lives where.
            <strong>Partition Pruning at Planning Time:</strong>
            When you execute a query with a filter like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE event_date = '2024-01-15'
            </code>
            , the query planner reads partition metadata before touching any
            data. The metadata says partition 1 covers January 1 to 15,
            partition 2 covers January 16 to 31, and so on. The planner
            eliminates all partitions except partition 1 from the execution
            plan. This happens in milliseconds and is pure metadata lookup, no
            data scanning involved. Consider a clickstream table ingesting 5
            million events per second, which is roughly 400 billion events per
            day. Daily partitions mean each partition holds about 2 TB
            compressed. A query for yesterday's data with partition pruning
            reads 2 TB instead of scanning weeks or months of history. At
            typical cloud storage throughput of 10 gigabytes per second (GB/s)
            per query with parallelism, that is 200 seconds of scan time instead
            of thousands.
            <strong>Data Skipping at Scan Time:</strong>
            Clustering enables data skipping within the chosen partitions.
            Modern warehouses store data in small chunks, typically 16 to 256
            megabytes (MB) each. Each chunk has statistics: minimum value,
            maximum value, null count, and distinct count for each column. These
            stats are called zone maps or min max indexes. When your query
            filters by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id = 50000
            </code>{" "}
            on a table clustered by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            , the scan reads zone maps first. A chunk with min user_id of 1000
            and max of 2000 cannot contain user 50000, so it is skipped without
            reading the actual data. Only chunks where 50000 falls within the
            min max range are scanned.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                BigQuery Real Performance
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">1 TB</div>
                  <div style="font-size: 10px; font-weight: 600">FULL SCAN</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">20 GB</div>
                  <div style="font-size: 10px; font-weight: 600">
                    WITH CLUSTERING
                  </div>
                </div>
              </div>
            </div>
            <strong>Real Numbers from Production:</strong>
            BigQuery often reports 50x to 100x reduction in bytes scanned when
            clustering aligns with query filters. A join that would scan 1 TB
            might only touch 20 to 50 GB. Query latency drops from 60 seconds to
            under 10 seconds. For dashboards with 100+ concurrent users, this
            difference is between feasible and impossible. Snowflake uses
            similar mechanics with micro partitions that are typically 50 to 500
            MB compressed. Clustering depth is a metric showing how well sorted
            your data is. Depth of 1 means perfectly clustered, higher numbers
            mean degradation. When depth exceeds 10 to 20, queries start
            scanning significantly more data, and performance degrades
            noticeably.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Clustering effectiveness
              degrades as new data arrives out of order. A table clustered by{" "}
              <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                user_id
              </code>{" "}
              loses its benefits if inserts are random. Zone maps become less
              selective, and scans read more chunks. Reclustering jobs are
              needed to restore performance.
            </div>
            <strong>The Interview Insight:</strong>
            When discussing partitioning in an interview, explicitly mention
            that the benefit comes from metadata driven pruning and statistics
            based skipping, not just from "organizing data." Quantify the
            reduction: instead of saying "it's faster," say "it reduces bytes
            scanned by 50x and cuts p99 latency from 60 seconds to 8 seconds."
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition pruning eliminates entire partitions at query
                  planning time using metadata, before any data is read
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data skipping uses zone maps (min/max statistics per chunk) to
                  skip storage blocks that cannot match the filter, working
                  within chosen partitions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Effective clustering can reduce bytes scanned by 50x to 100x,
                  translating to query latency improvements from minutes to
                  under 10 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clustering degrades over time as out of order inserts spread
                  related data across chunks, requiring periodic reclustering to
                  maintain performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The combination works best when partition keys match time
                  filters and clustering keys match join or filter conditions in
                  common queries
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
                  Table with 60 daily partitions: query with WHERE event_date =
                  yesterday prunes 59 partitions immediately, scanning 2 TB
                  instead of 120 TB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User events table clustered by user_id: filter on user_id =
                  50000 skips chunks with min/max ranges like 1000 to 2000 or
                  80000 to 90000, reading only 5 out of 100 chunks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snowflake clustering depth metric: depth of 3 means good
                  clustering, depth of 25 indicates heavy degradation and 5x to
                  10x more data scanned than optimal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehousePartitioningClusteringHowPartitionPruningAndDataSkippingWork;
