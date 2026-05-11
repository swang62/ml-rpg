import type { Component } from "solid-js";

const LessonDataFederationFederationAtProductionScale: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Federation at Production Scale
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>Real World Architecture:</strong> Consider a global retailer
          with transactional orders in sharded MySQL databases (1,200 shards
          across 3 regions), product catalog in MongoDB (40 TB), customer data
          in Salesforce (150 million records), clickstream events in S3 (50 PB),
          and finance data in an on premises Teradata warehouse (500 TB).
          Business users need unified Customer 360 views and cross domain
          analytics. A federation layer provides a single SQL interface over all
          these sources. When an analyst queries active customers with recent
          purchases and support tickets, the engine identifies that customers
          map to Salesforce, orders to MySQL, and tickets to a support system.
          It generates optimized subplans with filters pushed down, executes in
          parallel, and joins results locally.
          <strong>Scale Characteristics:</strong> At FAANG scale, you might
          support 50 to 200 concurrent Business Intelligence (BI) users, each
          triggering 1 to 5 queries per minute during business hours. Peak load
          reaches 15 to 20 queries per second. Most queries touch 2 to 4 source
          systems. Federation remains viable when most subqueries complete in
          200 to 500 milliseconds and network is optimized (same region or fast
          cross region links).
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Production Query Workload
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">15-20 QPS</div>
                <div style="font-size: 10px; font-weight: 600">PEAK LOAD</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">2-4</div>
                <div style="font-size: 10px; font-weight: 600">
                  SOURCES/QUERY
                </div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">200-500ms</div>
                <div style="font-size: 10px; font-weight: 600">
                  SUBQUERY TIME
                </div>
              </div>
            </div>
          </div>
          <strong>Hybrid Pattern in Practice:</strong> Pure federation for
          everything rarely works at scale. The winning pattern is hybrid: hot
          aggregates and high traffic queries run against a central warehouse,
          while federation handles long tail and exploratory cross system
          queries not worth building pipelines for. Amazon Athena federated
          queries demonstrate this. Core analytics run on data in S3 and
          Redshift (the warehouse). But when analysts need to join S3 data with
          live RDS records or Salesforce data, federation fills the gap without
          building a full ETL pipeline. This covers maybe 5 to 15 percent of
          query volume but 40 to 60 percent of distinct query patterns.
          <strong>Cost and Operational Impact:</strong> Federation cuts
          integration costs by 40 to 80 percent for long tail use cases.
          Onboarding a new source takes hours instead of weeks of ETL
          development. You avoid copying terabytes daily and reduce load on
          operational systems that would otherwise serve as ETL sources.
          However, heavy analytical workloads (daily aggregates on 50 to 100 TB)
          are cheaper and faster in a warehouse with columnar storage,
          clustering, and dedicated compute. A 500 GB aggregate that scans 50 TB
          in a warehouse might cost $15 and finish in 3 minutes. The same via
          federation, pulling data from 8 sources, might take 20 to 40 minutes
          and cost $45 in compute and network egress.
          <strong>Governance and Protection:</strong> Federation respects source
          level permissions, applying row filters and column masking. It logs
          all queries for compliance. To protect operational systems, federation
          engines limit per source concurrency (maybe 5 to 10 concurrent queries
          to a production database) and use caching or materialized views for
          expensive patterns. Without these guards, analysts could overwhelm the
          homepage database with ad hoc joins.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid pattern wins at scale: warehouse for hot aggregates,
                federation for long tail cross system queries (5 to 15 percent
                of volume, 40 to 60 percent of patterns)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Federation cuts integration costs by 40 to 80 percent for
                exploratory queries by avoiding ETL pipeline development
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Per source concurrency limits (5 to 10 queries) and caching
                protect operational systems from analytical load
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Heavy analytical workloads (50 to 100 TB scans) remain cheaper
                and faster in a warehouse: 3 minutes and $15 vs 30 minutes and
                $45 via federation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Production scale: 15 to 20 queries per second peak, touching 2
                to 4 sources per query, targeting p95 under 3 to 5 seconds
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
                Amazon Athena uses federation to join S3 data with RDS and
                Salesforce, handling 5 to 15 percent of query volume but 40 to
                60 percent of distinct patterns
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Global retailer federates across 1,200 MySQL shards, 40 TB
                MongoDB catalog, 150 million Salesforce records, 50 PB S3
                events, and 500 TB Teradata warehouse
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Meta uses Presto/Trino to federate HDFS, object storage, and
                operational stores for cross system analytics not served by
                central warehouse
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataFederationFederationAtProductionScale;
