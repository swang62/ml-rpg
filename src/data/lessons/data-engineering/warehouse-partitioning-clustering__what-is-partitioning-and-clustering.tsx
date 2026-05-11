import type { Component } from "solid-js";

const LessonWarehousePartitioningClusteringWhatIsPartitioningAndClustering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Partitioning and Clustering?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Partitioning</strong> splits a large dataset into
                smaller, independent pieces. <strong>Clustering</strong>{" "}
                organizes data within those pieces for efficient access.
                Together, they solve the fundamental problem: scanning massive
                datasets becomes impossibly slow and expensive.
              </div>
            </div>
            Imagine a 50 terabyte (TB) table storing clickstream events. Without
            partitioning, a query like "show yesterday's page views from
            Germany" must scan all 50 TB. Even with fast object storage, this
            takes minutes and costs dollars per query.
            <strong>How Partitioning Works:</strong>
            Partitioning divides rows based on a key. Horizontal partitioning
            splits by rows: events from January go to partition 1, February to
            partition 2, and so on. The most common key is time, like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              event_date
            </code>
            . When you query yesterday's data, the system reads only that one
            partition, maybe 500 gigabytes (GB) instead of 50 TB. Vertical
            partitioning splits by columns. Frequently accessed fields like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            and{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              timestamp
            </code>{" "}
            live in one table, while rarely used large fields like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              raw_json_payload
            </code>{" "}
            live separately.
            <strong>How Clustering Works:</strong>
            Clustering optimizes the physical layout inside a partition. Data is
            sorted by specific keys like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              campaign_id
            </code>
            . When you filter by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id = 12345
            </code>
            , the system can skip entire storage blocks that contain different
            users.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Scan Reduction Example
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">WITHOUT</div>
                  <div style="font-size: 16px; font-weight: 800">50 TB</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">WITH</div>
                  <div style="font-size: 16px; font-weight: 800">500 GB</div>
                </div>
              </div>
            </div>
            <strong>Real World Context:</strong>
            Systems like Snowflake and Google BigQuery store data in small
            chunks called micro partitions or blocks. Each chunk has metadata
            showing min and max values. With good partitioning and clustering,
            queries touch 1 to 5 percent of total data instead of scanning
            everything. This is how warehouses handle petabyte scale datasets
            while keeping query times under 10 seconds.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Partitioning + Clustering
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Partition 1: Jan 2024</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Clustered by user_id: 1..10000
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Partition 2: Feb 2024</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Clustered by user_id: 1..10000
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Partition 3: Mar 2024</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Clustered by user_id: 1..10000
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                  Query filters Feb + user 5000
                  <br />
                  Reads only Partition 2, skips most blocks
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
                  Partitioning divides data into independent pieces based on
                  keys like date, region, or user ID, enabling the system to
                  skip irrelevant partitions entirely
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clustering sorts data within partitions by specific keys,
                  allowing block level skipping when filters match the
                  clustering key
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Together they reduce data scanned from terabytes to gigabytes,
                  cutting query times from minutes to seconds at petabyte scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition pruning happens at planning time (skip whole
                  partitions), while clustering enables data skipping at scan
                  time (skip blocks within partitions)
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
                  Date partitioned table with 50 TB total data: query for one
                  day scans 500 GB instead of 50 TB, reducing I/O by 100x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clickstream table partitioned by event_date and clustered by
                  user_id: query for specific user yesterday reads 20 to 50 GB
                  instead of 1 TB
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Vertical partitioning: user profile table with narrow columns
                  (user_id, name, email) separate from wide table (preferences
                  JSON blob, activity logs)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehousePartitioningClusteringWhatIsPartitioningAndClustering;
