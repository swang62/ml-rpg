import type { Component } from "solid-js";

const LessonOnlineVsOfflineFeaturesOnlineVsOfflineFeaturesCoreDistinction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online vs Offline Features: Core Distinction
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
                <strong>Online features</strong> are computed and served for
                real time inference with strict latency requirements (single
                digit ms), stored in low latency key value stores.{" "}
                <strong>Offline features</strong> are computed in batch from
                historical data for training and batch scoring, living in data
                warehouses at terabyte to petabyte scale.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online Features
            </p>
            <p style="margin-top: 0">
              Must be retrieved per entity (user_id, item_id) within single
              digit milliseconds to sit on the critical path of user facing
              requests. For example, Uber retrieves features like "trips in last
              5 minutes" with p99 latency under 10ms to power real time ETA
              predictions and driver matching. Stored in Redis, DynamoDB, or
              similar low latency stores.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline Features
            </p>
            <p style="margin-top: 0">
              Live in data warehouses or data lakes and support time travel
              (point in time correct snapshots), heavy joins, and backfills
              across terabyte to petabyte scale datasets. Airbnb's Zipline
              processes billions of rows with automated backfills to months of
              history for search ranking and pricing models.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Unification Challenge
            </p>
            <p style="margin-top: 0">
              One logical feature specification must generate: streaming or
              batch pipelines to compute the feature, an offline table with
              point in time correctness for training, and an online table for
              low latency serving. Without this unification, training serving
              skew emerges where offline evaluation metrics fail to translate to
              online performance because the feature logic diverges.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Core Guarantees
            </p>
            <p style="margin-top: 0">
              Production systems balance five guarantees: freshness SLOs (how
              current the data is), tail latency SLOs (p95/p99) for request
              budgets, consistency between stores to prevent distribution
              mismatches, point in time correctness to avoid data leakage, and
              backfillability for reproducible training datasets.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; justify-content: space-between; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 15px; margin-bottom: 10px; text-align: center">
                    Online Features
                  </div>
                  <div style="font-size: 13px; line-height: 1.5">
                    <strong>Store:</strong> Key Value (Redis)
                    <br />
                    <strong>Latency:</strong> p99 &lt; 10ms
                    <br />
                    <strong>Freshness:</strong> Seconds to minutes
                    <br />
                    <strong>Scale:</strong> Millions QPS
                    <br />
                    <strong>Use:</strong> Real time inference
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 15px; margin-bottom: 10px; text-align: center">
                    Offline Features
                  </div>
                  <div style="font-size: 13px; line-height: 1.5">
                    <strong>Store:</strong> Data Lake (S3)
                    <br />
                    <strong>Latency:</strong> Hours to days
                    <br />
                    <strong>Scale:</strong> Petabyte datasets
                    <br />
                    <strong>History:</strong> Time travel to any date
                    <br />
                    <strong>Use:</strong> Training &amp; batch scoring
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
                  Online features target p99 latency under 10ms for real time
                  serving, while offline features prioritize throughput over
                  latency and can take hours to compute across petabyte scale
                  datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  DoorDash serves online features at 10,000+ queries per second
                  (QPS) with p99 latency in low single digit milliseconds using
                  in memory key value stores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness SLOs differ dramatically: streaming features achieve
                  seconds to minutes staleness (sub second for critical fraud
                  counters at Meta), while offline batch features update daily
                  or hourly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix budgets 5 to 15ms p99 for feature fetches within 100
                  to 300ms total page render time, requiring aggressive caching
                  and feature bundling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Point in time correctness is mandatory for offline training to
                  prevent label leakage, using event time semantics where
                  features joined at label timestamp T only include data with
                  event time &lt;= T
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unified feature definitions prevent training serving skew by
                  generating both batch pipelines for offline tables and
                  streaming pipelines for online stores from a single
                  specification
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
                  Uber Michelangelo: Streaming aggregation computes "trips in
                  last 5 minutes" with sub minute freshness, materialized to
                  both data lake for training and Redis for serving with p99
                  under 10ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline: Feature registry with DSL generates point in
                  time correct offline tables with billions of rows and
                  publishes subset to online store with single digit to low tens
                  of milliseconds p99 reads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn Venice: Serves per member model features and
                  embeddings with sub 10ms p99 at millions of aggregate QPS
                  across multi region replication with petabyte scale data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOnlineVsOfflineFeaturesOnlineVsOfflineFeaturesCoreDistinction;
