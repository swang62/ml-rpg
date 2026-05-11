import type { Component } from "solid-js";

const LessonOltpVsOlapProductionArchitectureHowCompaniesSeparateOltpFromOlap: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: How Companies Separate OLTP from OLAP
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            The standard production pattern is a layered architecture where OLTP
            systems own the source of truth and emit change streams, while an
            ingestion layer lands those changes into analytical storage
            optimized for scans. Amazon retail provides a canonical example:
            carts, session state, and high cardinality key value operations run
            on a low latency, horizontally scalable store targeting single digit
            millisecond reads and writes at p99. Orders and payments use
            relational OLTP with strict consistency and multi Availability Zone
            (AZ) durability, aiming for p99 latencies under 50 to 100 ms per
            transaction. These systems never directly serve analytical queries.
            Instead, analytics is decoupled via Change Data Capture (CDC) from
            write ahead logs and event streams into a data lake and warehouse
            stack. Large fact tables for orders, clicks, and shipments reach
            tens of billions to trillions of rows. Interactive dashboards target
            1 to 10 second latencies on aggregated slices, while deep dive
            queries can run for minutes. The critical metric is data freshness:
            Uber's near real time analytics pipeline moves data from OLTP to
            OLAP in seconds to low tens of seconds for supply demand heatmaps,
            while heavy model training operates on daily or hourly batch
            snapshots with acceptable staleness. Google's architecture
            demonstrates global scale separation. Ads serving and billing
            require external consistency across regions using a globally
            distributed OLTP system where regional reads commit in single digit
            milliseconds and cross region writes add tens of milliseconds for
            consensus. This enables transactional invariants like budget
            enforcement under heavy concurrency. Analytical workloads run on a
            separate columnar engine with separation of storage and compute,
            routinely scanning terabyte scale partitions and returning
            interactive aggregates in seconds, with batch jobs processing
            petabytes using elastic parallelism. The tradeoff is freshness
            versus isolation. Directly querying OLTP for analytics gives you up
            to the second data but risks catastrophic production impact.
            Exporting via CDC introduces lag, typically ranging from near real
            time (seconds) for streaming pipelines to batch (minutes to hours)
            for simpler systems, but completely isolates workloads. Companies
            set freshness Service Level Indicators (SLIs) based on business
            needs: operational dashboards might require sub minute freshness and
            alert when lag exceeds 5 minutes, while monthly financial reports
            tolerate daily batch updates.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 200px; text-align: center">
                  <strong style="font-size: 14px">OLTP Database</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Orders, Carts, Payments
                  </div>
                  <div style="font-size: 12px">p99 &lt; 50ms</div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 200px; text-align: center">
                  <strong style="font-size: 14px">CDC / Event Stream</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Write-Ahead Log Tail
                  </div>
                  <div style="font-size: 12px">Freshness: 5-60s</div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 200px; text-align: center">
                  <strong style="font-size: 14px">OLAP Warehouse</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Denormalized Facts
                  </div>
                  <div style="font-size: 12px">Scan 10B rows in 8s</div>
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
                  Standard pattern: OLTP owns source of truth, emits change
                  streams via CDC from write ahead logs, and ingestion layer
                  lands into analytical storage with freshness ranging from
                  seconds (streaming) to hours (batch)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon retail separates cart/order OLTP (single digit ms) from
                  analytics (scan billions of rows); interactive dashboards
                  target 1 to 10 second response, deep dives run minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness is the key tradeoff: direct OLTP queries give zero
                  lag but risk production outages, CDC introduces seconds to
                  hours of staleness but provides complete workload isolation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google uses globally distributed OLTP for ads (single digit ms
                  regional, tens of ms cross region consensus) while analytical
                  queries run on separate columnar engine scanning terabytes in
                  seconds with elastic compute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operational analytics (Uber supply demand heatmaps) require
                  sub minute freshness and alert when lag exceeds thresholds,
                  while batch reporting (monthly financial closes) tolerates
                  daily updates
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
                  Uber marketplace: OLTP handles trip state and pricing at p99
                  under 50 ms; streaming CDC moves data to OLAP in 5 to 30
                  seconds for real time heatmaps, while daily batch snapshots
                  feed model training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon data lake: CDC streams from OLTP databases land into S3
                  backed data lake with tens of billions to trillions of rows in
                  fact tables; interactive BI queries return in 1 to 10 seconds,
                  ad hoc analysis runs minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta: OLAP queries scan tens to hundreds of terabytes from
                  petabyte scale data lake; thousands of queries per day with
                  typical interactive latency of few to tens of seconds on
                  partition pruned datasets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOltpVsOlapProductionArchitectureHowCompaniesSeparateOltpFromOlap;
