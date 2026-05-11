import type { Component } from "solid-js";

const LessonRowVsColumnarProductionArchitectureOltpAndOlapTogether: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: OLTP and OLAP Together
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            In realistic systems at companies handling large scale traffic, you
            rarely have a single database serving all use cases. Instead, you
            typically see a row based operational store plus a columnar
            analytics store, connected by data pipelines.
            <strong>The E-commerce Example:</strong>
            Imagine a platform handling 50,000 orders per second at peak with
            strict requirements: p95 write latency under 10 milliseconds and
            99.99 percent availability. The order service writes every order
            event to a row based store optimized for random reads and writes,
            like a sharded relational database or key value store. Each order
            operation needs to read or update all fields:{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              items
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              shipping_address
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              payment_status
            </code>
            . A row layout means a single page read retrieves the entire record.
            This keeps latency low and supports the transactional guarantees
            needed for order processing.
            <strong>The Analytics Side:</strong>
            In parallel, a Change Data Capture (CDC) pipeline streams order
            events into a data lake using columnar file format like Parquet. The
            analytics workload has completely different characteristics. Product
            teams run queries like "for the last 30 days, group total revenue by
            country, device type, and campaign." These queries scan tens or
            hundreds of billions of rows but only need 5 to 10 columns out of
            maybe 200 total. With columnar storage, the query engine reads only
            those 5 to 10 columns. If each column compresses at 5x to 10x, a
            query that would require hundreds of gigabytes of I/O on a row store
            might need only tens of gigabytes.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Query Performance Comparison
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">Timeout</div>
                  <div style="font-size: 10px; font-weight: 600">ROW OLTP</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">3 sec</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COLUMNAR OLAP
                  </div>
                </div>
              </div>
            </div>
            <strong>BigQuery as Reference:</strong>
            BigQuery is designed to scan petabytes with columnar format. Public
            benchmarks show that scanning 1 TB of compressed columnar data and
            computing simple aggregates completes in a few seconds when the
            query is selective on columns. The engine pushes down predicates,
            skips blocks, and uses vectorized execution. The same query on a row
            based OLTP database would either time out or saturate the cluster.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Operational writes go to row store
              with millisecond latency, near real time replication flows into
              columnar files, analytics engines scan those files with high
              throughput but higher per query latency measured in seconds
              instead of milliseconds.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="margin-bottom: 12px; text-align: center; font-weight: 700; font-size: 13px">
                Dual Store Architecture
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    OLTP Layer (Row Based)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    50k writes/sec • p95 &lt; 10ms • Full record access
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ CDC Pipeline
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Data Lake (Parquet/ORC)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Columnar files • 10x compression • Hourly batches
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Query Engine
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">OLAP Layer (Columnar)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Scan billions of rows • 5-10 columns • Seconds latency
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
                  Production systems separate OLTP row stores handling 50,000
                  writes per second with p95 under 10 milliseconds from OLAP
                  columnar stores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CDC pipelines stream operational data into columnar data
                  lakes, typically with minutes of replication lag acceptable
                  for analytics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Columnar analytics queries scanning 1 TB complete in seconds
                  by reading only 5 to 10 referenced columns with 5x to 10x
                  compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Row stores optimize for full record access needed by
                  transactional APIs while columnar stores optimize for
                  aggregate queries over billions of rows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BigQuery scanning compressed columnar data uses predicate
                  pushdown and vectorized execution achieving throughput
                  impossible on row based OLTP systems
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
                  E-commerce platform: MySQL cluster handles order writes at
                  50k/sec, Kafka streams changes to S3 Parquet files, Spark
                  queries 30 days of orders in 5 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User analytics: DynamoDB serves profile lookups under 10
                  milliseconds, hourly export to columnar format enables cohort
                  analysis across 500 million users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial reporting: PostgreSQL processes transactions with
                  ACID guarantees, nightly ETL loads into Redshift columnar
                  warehouse for regulatory reports
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRowVsColumnarProductionArchitectureOltpAndOlapTogether;
