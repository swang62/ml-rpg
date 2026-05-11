import type { Component } from "solid-js";

const LessonFeatureStoreArchitectureDualStoreArchitectureOfflineAndOnlineFeatureStores: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dual Store Architecture: Offline and Online Feature Stores
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
                <strong>Feature stores</strong> use a dual store pattern that
                separates storage into two complementary systems: an{" "}
                <strong>offline store</strong> for historical training data
                (petabyte scale, columnar formats, batch processing) and an{" "}
                <strong>online store</strong> for low latency inference (sub
                10ms reads at high QPS).
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline Store
            </p>
            <p style="margin-top: 0">
              Lives in your data lake or warehouse and handles petabyte scale
              historical data with columnar formats optimized for batch
              processing. It serves point in time joins, backfills, and dataset
              generation where a typical 100 million example backfill might scan
              5 terabytes of feature history over hours using 100 to 200 vCPUs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online Store
            </p>
            <p style="margin-top: 0">
              A region local key value database optimized for sub 10 millisecond
              reads at high QPS. Netflix serves millions of feature reads per
              second with sub millisecond p50 latencies using EVCache (an in
              memory cache tier). Uber's online store built on Cassandra
              delivers tens of milliseconds p99 at peak with millions of
              entities. The key is co location: keeping feature serving in the
              same AZ as your model servers to avoid cross AZ network hops that
              add 5 to 15ms.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Metadata Registry
            </p>
            <p style="margin-top: 0">
              Ties both stores together with entity definitions, feature
              schemas, lineage tracking, and version control. When you define a
              feature group, the same transformation logic generates both
              offline training datasets and online serving values. This solves
              the training serving parity problem: the offline AUC you see
              during training matches online performance because features come
              from identical pipelines.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Complexity Trade-off
            </p>
            <p style="margin-top: 0">
              You maintain two copies of your data and two materialization
              pipelines. Distribution drift can occur if offline backfills run
              without updating the online store. For low QPS systems under 100
              requests per second that tolerate 1 to 5 minute staleness, a
              single data warehouse with on demand transforms may be simpler and
              cut infrastructure costs by 50 to 70 percent.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 24px; align-items: stretch">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Offline Store</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Petabyte scale lake
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    Point in time joins
                    <br />
                    Training datasets
                    <br />
                    Batch backfills
                    <br />
                    Hours latency
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Online Store</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Region local KV
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    Real time serving
                    <br />
                    Sub 10ms p99
                    <br />
                    Million QPS scale
                    <br />
                    Millisecond reads
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                <strong style="font-size: 12px">Metadata Registry</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Schemas • Lineage • Versions • Training/Serving Parity
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
                  Offline store uses columnar lake formats for petabyte scale
                  historical data, serving point in time joins and backfills
                  that scan terabytes over hours using hundreds of vCPUs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online store targets sub 10 millisecond p99 reads from region
                  local key value databases, with Netflix achieving sub
                  millisecond p50 at millions of QPS using in memory caching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata registry enforces training serving parity by ensuring
                  the same transformation logic generates both offline training
                  datasets and online serving values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Co location matters: placing feature serving in the same
                  Availability Zone as model servers avoids 5 to 15 millisecond
                  cross AZ network penalties
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operational tradeoff: maintaining two storage systems and
                  materialization pipelines introduces drift risk and
                  complexity; single warehouse systems may suffice for low QPS
                  under 100 requests per second with 1 to 5 minute staleness
                  tolerance
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
                  Airbnb Zipline stores offline features in their data lake with
                  Spark based backfills and point in time joins, while
                  materializing to a Redis like key value store for single digit
                  millisecond p99 online reads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo processes millions of events per second from
                  Kafka into Flink streaming pipelines, writing to a Cassandra
                  backed online store with tens of milliseconds p99 latency at
                  peak traffic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureStoreArchitectureDualStoreArchitectureOfflineAndOnlineFeatureStores;
