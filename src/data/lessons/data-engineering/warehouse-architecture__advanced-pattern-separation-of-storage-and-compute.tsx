import type { Component } from "solid-js";

const LessonWarehouseArchitectureAdvancedPatternSeparationOfStorageAndCompute: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Advanced Pattern: Separation of Storage and Compute
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Architectural Breakthrough:</strong>
            Traditional data warehouses bundled storage and compute in a single
            appliance. You bought a 100 TB system with 50 compute nodes. If you
            needed more storage, you upgraded the whole appliance. If you needed
            more compute for year end reporting, you were stuck. This coupling
            killed elasticity and forced massive upfront capital expenditure.
            Modern cloud warehouses separate storage from compute. Data lives in
            cheap, durable object storage (Amazon S3, Google Cloud Storage,
            Azure Blob). Compute clusters spin up on demand, read from storage,
            process queries, and write results back. Compute and storage scale
            independently.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Cost Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$0.02/GB</div>
                  <div style="font-size: 10px; font-weight: 600">
                    STORAGE COST
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$2-10/hr</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COMPUTE COST
                  </div>
                </div>
              </div>
            </div>
            <strong>How It Works in Practice:</strong>
            Snowflake pioneered this architecture. Data is stored in micro
            partitions (typically 16 MB compressed) in S3, organized by table
            and partition keys. When you run a query, Snowflake spins up a
            virtual warehouse (a cluster of compute nodes), pulls relevant micro
            partitions from S3 into local SSD cache, executes the query, and
            streams results back. If the warehouse is idle for a few minutes, it
            suspends automatically, stopping compute charges while data remains
            in S3. The cache layer is critical. Reading from S3 has 10 to 50ms
            latency per request. For a query scanning 1,000 micro partitions,
            that is 10 to 50 seconds just in network time. The local SSD cache
            on compute nodes reduces this to under 1ms for cached data.
            Snowflake's query optimizer prunes partitions aggressively: if you
            query{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE date = '2024-01-15'
            </code>
            , it skips 99% of partitions, reading only the relevant 10 GB
            instead of 1 TB.
            <strong>Elasticity and Cost Model:</strong>
            The power is elasticity. You can run 5 small warehouses for
            different teams, each auto scaling independently. The data science
            team runs a 2 node warehouse for exploration, costing $4 per hour
            when active. During quarter end, finance spins up a 64 node
            warehouse for 2 hours to process a massive report, costing $160.
            Both query the same data in S3 without copying or moving it. This
            changes the cost model from fixed CapEx to variable OpEx. A
            traditional warehouse might cost $500k upfront for hardware plus
            $50k annual maintenance. A cloud warehouse costs zero upfront,
            $2,000 per month for 100 TB storage, and $5,000 to $30,000 per month
            for compute depending on usage. Low usage teams save massively. High
            usage teams pay more but get infinite scale.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Teams spin up large warehouses
              and forget to set auto suspend. A 32 node warehouse left running
              24/7 costs $60,000 per month. Always set auto suspend to 5 to 10
              minutes of inactivity and use the smallest warehouse that meets
              SLAs.
            </div>
            <strong>Concurrency and Isolation:</strong>
            Separating storage from compute enables true workload isolation. You
            cannot create one warehouse for production dashboards and another
            for ad hoc queries. If someone runs a 10 minute query in the ad hoc
            warehouse, it does not steal resources from production dashboards.
            They are physically separate compute clusters reading the same data.
            This also enables fine grained cost attribution. Each warehouse has
            usage metrics: queries run, compute hours, data scanned. You can
            charge back data science teams for their warehouse usage while
            subsidizing critical business dashboards. This visibility drives
            optimization: teams see their $10,000 monthly bill and start writing
            better queries.
            <strong>The Trade-off: Network Becomes the Bottleneck:</strong>
            Separating storage from compute means every query pulls data over
            the network from object storage. For small queries scanning a few
            GB, this adds 100 to 500ms latency versus reading from local disk.
            For very large queries scanning 100 TB, network bandwidth (typically
            10 to 25 Gbps per node) can become the bottleneck. To mitigate this,
            systems use aggressive caching, partition pruning, and predicate
            pushdown. Snowflake maintains a distributed cache across compute
            nodes: if your query scans the same partitions as a recent query, it
            hits cache and avoids S3 entirely. BigQuery uses a columnar format
            (Capacitor) and only reads the columns you need, reducing network
            transfer by 10x to 50x versus reading full rows.
            <strong>Durability and Failure Handling:</strong>
            Object storage like S3 provides eleven nines durability. Your data
            is replicated across multiple availability zones and can survive
            data center failures. If a compute node fails mid query, the
            coordinator detects it within seconds and reschedules affected tasks
            on other nodes. The query might slow down by 10% to 20% but
            completes successfully. For multi region disaster recovery, some
            teams replicate data to a secondary region. Snowflake supports cross
            region replication with automated failover. If the primary region
            goes down, you can switch to the replica region within minutes. This
            adds cost (2x storage, cross region bandwidth) but ensures business
            continuity for critical workloads.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="text-align: center; font-weight: 700; margin-bottom: 12px; font-size: 14px">
                Separated Storage and Compute
              </div>
              <div style="display: flex; flex-direction: column; gap: 14px; align-items: center">
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; width: 90%; text-align: center">
                  <strong style="font-size: 14px">Storage Layer (S3)</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    100 TB | $2,000/month | 11 nines durability
                  </div>
                </div>
                <div style="display: flex; gap: 12px; width: 90%; justify-content: space-around">
                  <div style="font-size: 20px; font-weight: bold">↑</div>
                  <div style="font-size: 20px; font-weight: bold">↑</div>
                  <div style="font-size: 20px; font-weight: bold">↑</div>
                </div>
                <div style="display: flex; gap: 10px; width: 90%">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Warehouse 1</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      2 nodes | Ad hoc
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Warehouse 2</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      8 nodes | Production
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">Warehouse 3</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      64 nodes | Batch
                    </div>
                  </div>
                </div>
                <div style="padding: 10px; border: 1px solid; border-radius: 4px; font-size: 11px; text-align: center; width: 90%">
                  Each warehouse scales independently | Auto suspend after 5 min
                  idle
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
                  Separating storage and compute allows independent scaling.
                  Store 100 TB in S3 for $2,000/month while running small 2 node
                  warehouses for $4/hour or massive 64 node warehouses for
                  $80/hour as needed.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Local SSD caches on compute nodes reduce latency from 10 to
                  50ms per S3 request to under 1ms for cached data, making
                  separation viable for interactive queries.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Workload isolation via separate warehouses prevents ad hoc
                  queries from impacting production dashboards. Each warehouse
                  has its own compute and cost attribution.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Network becomes the bottleneck for queries scanning 100+ TB.
                  Mitigate with aggressive partition pruning (skip 99% of data),
                  columnar formats (read only needed columns), and distributed
                  caching.
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
                  Snowflake stores data as 16 MB micro partitions in S3. A query
                  with &lt;code&gt;WHERE date = '2024-01-15'&lt;/code&gt; on a 1
                  TB table reads only 10 GB of relevant partitions, scanning 1%
                  of data and completing in 2 seconds instead of 3 minutes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A finance team spins up a 64 node warehouse for 2 hours during
                  quarter end to process massive reports, costing $160 total.
                  The same warehouse auto suspends after 10 minutes idle,
                  avoiding $60,000/month in wasted spend.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery uses columnar Capacitor format. Scanning
                  &lt;code&gt;user_id&lt;/code&gt; and
                  &lt;code&gt;revenue&lt;/code&gt; from a 50 column table
                  transfers 4% of data over the network versus row based formats
                  that transfer 100%, reducing query time from 30 seconds to 1.2
                  seconds.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWarehouseArchitectureAdvancedPatternSeparationOfStorageAndCompute;
