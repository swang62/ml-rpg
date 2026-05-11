import type { Component } from "solid-js";

const LessonOltpVsOlapWhatAreOltpAndOlapCoreCharacteristicsAndWorkloadShapes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are OLTP and OLAP? Core Characteristics and Workload Shapes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Online Transaction Processing (OLTP) and Online Analytical
            Processing (OLAP) are two fundamentally different data processing
            patterns optimized for distinct workload shapes. OLTP serves the
            request path of applications: small, short lived transactions that
            create or mutate operational state with strict correctness
            guarantees. A typical OLTP transaction reads or writes just a
            handful of rows, targets sub 100 ms end to end latency (often single
            digit milliseconds within the database), and scales by handling
            large numbers of concurrent users. Amazon's DynamoDB, for example,
            serves more than 10 trillion requests per day with peaks over 20
            million requests per second, demonstrating the massive concurrency
            OLTP systems must handle. OLAP serves analytics and decision
            support: large, read heavy queries over historical data that scan
            and aggregate millions to trillions of rows. OLAP favors throughput
            over per row latency, often returning results in seconds to minutes.
            Where OLTP might read 10 rows in 5 ms, OLAP might scan 10 billion
            rows in 30 seconds. Meta's OLAP queries routinely scan tens to
            hundreds of terabytes, with interactive analytics completing in a
            few to tens of seconds on cached datasets. The data modeling
            philosophies diverge sharply. OLTP uses highly normalized schemas to
            minimize write amplification and maintain integrity; every order,
            payment, or cart update must be immediately consistent and durable
            because it affects real world user visible state. OLAP denormalizes
            data into star or snowflake schemas, stores it column wise for
            compression and scan speed, and adds materialized aggregates. An
            OLTP order table might join to 8 normalized dimension tables; the
            corresponding OLAP fact table flattens those dimensions for fast
            aggregation without runtime joins. The critical organizational
            principle is workload isolation: OLAP must not interfere with OLTP.
            Running a full table scan for analytics directly on your production
            transactional database risks lock contention, memory exhaustion, and
            latency spikes that degrade user facing transactions. This is why
            most companies at scale physically separate these workloads and use
            change data capture (CDC) or event streams to move data from OLTP
            into analytical storage.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; justify-content: space-around; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 16px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 16px; margin-bottom: 12px; text-align: center">
                    OLTP
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    <div style="margin-bottom: 8px">
                      <strong>Query:</strong> Read 5 rows
                    </div>
                    <div style="margin-bottom: 8px">
                      <strong>Latency:</strong> 3 ms
                    </div>
                    <div style="margin-bottom: 8px">
                      <strong>Concurrency:</strong> 50,000 QPS
                    </div>
                    <div style="margin-bottom: 8px">
                      <strong>Storage:</strong> Row oriented
                    </div>
                    <div>
                      <strong>Schema:</strong> Normalized
                    </div>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 16px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 16px; margin-bottom: 12px; text-align: center">
                    OLAP
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    <div style="margin-bottom: 8px">
                      <strong>Query:</strong> Scan 10B rows
                    </div>
                    <div style="margin-bottom: 8px">
                      <strong>Latency:</strong> 8 seconds
                    </div>
                    <div style="margin-bottom: 8px">
                      <strong>Concurrency:</strong> 100 queries
                    </div>
                    <div style="margin-bottom: 8px">
                      <strong>Storage:</strong> Columnar
                    </div>
                    <div>
                      <strong>Schema:</strong> Denormalized
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
                  OLTP optimizes for low latency point operations (sub 100 ms,
                  often single digit milliseconds) with high concurrency, while
                  OLAP optimizes for high throughput scans (seconds to minutes)
                  over massive datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OLTP transactions typically touch 1 to 100 rows with strict
                  ACID guarantees; OLAP queries aggregate millions to trillions
                  of rows with relaxed consistency during ingestion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data modeling diverges: OLTP uses normalized schemas to reduce
                  write amplification, OLAP denormalizes into star/snowflake
                  schemas to avoid expensive runtime joins and enable columnar
                  compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Workload isolation is critical: running analytics directly on
                  OLTP databases causes lock contention and latency spikes that
                  degrade production transactions, which is why companies
                  separate them physically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real scale examples: DynamoDB serves 10+ trillion requests/day
                  at 20M+ peak QPS (OLTP), while Meta scans tens to hundreds of
                  terabytes per query (OLAP)
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
                  Amazon retail: Cart updates and order placement use OLTP
                  (single digit ms, strict consistency), while sales analytics
                  and forecasting use OLAP (scan billions of order rows in
                  seconds)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Ads: Ad serving and billing use globally distributed
                  OLTP with external consistency (single digit ms regional, tens
                  of ms cross region), while auction analytics run on BigQuery
                  OLAP (scan terabytes, return in seconds)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber: Trip state transitions target p99 under 50 ms with OLTP,
                  while supply demand heatmaps and ETA quality analytics use
                  streaming OLAP with sub minute freshness
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOltpVsOlapWhatAreOltpAndOlapCoreCharacteristicsAndWorkloadShapes;
