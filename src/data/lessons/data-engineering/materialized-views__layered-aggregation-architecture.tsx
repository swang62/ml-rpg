import type { Component } from "solid-js";

const LessonMaterializedViewsLayeredAggregationArchitecture: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Layered Aggregation Architecture
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Real World Pipeline:</strong> In production systems
          handling high event volumes, materialized views exist as part of a
          multi layered architecture between raw data ingestion and serving.
          Consider a clickstream analytics pipeline for a large consumer app
          generating around 1 million events per second globally. Events flow
          into Kafka or Pub/Sub, land in a data lake like S3, then ingest into a
          warehouse like BigQuery or Snowflake. The raw events table grows by
          multiple terabytes daily with tens of billions of rows.
          <strong>Why Layers Matter:</strong> You cannot just jump from raw
          events to final dashboard queries. The optimization happens in stages,
          each reducing data volume and query complexity.
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Raw Events:</strong> Streaming job or warehouse native
                feature computes per 5 minute aggregates per dimension like
                user, country, app version. This might reduce 300 million raw
                events per 5 minutes down to 5 million aggregate rows.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Intermediate Rollups:</strong> Those 5 minute aggregates
                roll up into hourly tables, reducing 12 five minute buckets into
                1 hourly summary. Volume drops another 10x to 12x.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Daily Aggregates:</strong> Hourly data rolls into daily
                tables. A dashboard query for "last 30 days by country" now
                scans roughly 30 rows per country instead of billions of raw
                events.
              </div>
            </div>
          </div>
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Data Volume Reduction
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">30B rows</div>
                <div style="font-size: 10px; font-weight: 600">RAW EVENTS</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">5M rows</div>
                <div style="font-size: 10px; font-weight: 600">5 MIN AGGS</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">30 rows</div>
                <div style="font-size: 10px; font-weight: 600">
                  DAILY SUMMARY
                </div>
              </div>
            </div>
          </div>
          <strong>Platform Specific Approaches:</strong> Different vendors
          implement the maintenance differently. BigQuery incremental
          materialized views only recompute partitions that changed, effective
          when you partition by date with tens of TB of data. Snowflake uses
          change data capture via streams to apply only new or modified rows.
          ClickHouse runs materialized views as insert triggers, updating
          aggregate tables synchronously or asynchronously on every insert.
          <strong>Smart Read Paths:</strong> Production queries often combine
          layers. A dashboard covering 30 days might read daily aggregates for
          the first 29 days and hourly aggregates or even raw data for the
          current incomplete day, balancing freshness with performance.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Raw Events Stream</strong>
                <div style="font-size: 11px; margin-top: 3px">
                  1M events/sec, TB per day
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">5 Minute Aggregates</strong>
                <div style="font-size: 11px; margin-top: 3px">
                  Per user, country, device
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Hourly Rollups</strong>
                <div style="font-size: 11px; margin-top: 3px">
                  Combine 12 x 5 min buckets
                </div>
              </div>
              <div style="text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Daily Summaries</strong>
                <div style="font-size: 11px; margin-top: 3px">
                  Dashboard queries: 30 rows for 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Production systems use multiple aggregation layers: raw events →
                5 minute aggregates → hourly rollups → daily summaries, each
                reducing volume by 10x to 1000x
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                A typical pipeline processing 1 million events per second
                reduces 30 billion raw events down to roughly 30 rows for a 30
                day dashboard query
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Platform implementations differ: BigQuery uses incremental
                partition refresh, Snowflake uses change data capture streams,
                ClickHouse uses insert triggers
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Smart read paths combine layers: query daily aggregates for
                historical data but hourly or raw data for the current
                incomplete day to balance freshness and speed
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
                Consumer app with 1M events/sec creates 5 minute aggregates per
                user and country (5M rows per 5 min), then hourly rollups
                (reducing 12 buckets to 1), then daily summaries for dashboard
                queries
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Dashboard query "DAU by country last 30 days" reads 29 days from
                daily aggregates table plus current day from hourly table,
                achieving sub 100ms p95 latency
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonMaterializedViewsLayeredAggregationArchitecture;
