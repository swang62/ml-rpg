import type { Component } from "solid-js";

const LessonEventDataModelingEndToEndEventDataPipelineArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            End to End Event Data Pipeline Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Complete Flow:
            </div>
            In production systems, event data modeling sits at the heart of a
            data platform that powers analytics, experimentation,
            personalization, and monitoring. The architecture typically has five
            distinct stages, each with specific latency and throughput
            requirements.
            <strong>Stage One: Event Production at the Edge</strong>
            Client and backend applications emit events following a shared
            schema. The mobile app sends session_started, page_viewed, and
            button_clicked. The payments service sends payment_initiated,
            payment_succeeded, and payment_failed. Each event carries user ID,
            device ID, session ID, experiment variants, and timestamps. The key
            challenge here is maintaining schema consistency across dozens or
            hundreds of independent services.
            <strong>Stage Two: Collection and Transport</strong>
            Events flow to a collection service, then into a durable, append
            only log or queue. At companies processing large event volumes, this
            central bus carries millions of messages per second. Target end to
            end ingest latency is typically measured in seconds. For example,
            percentile 95 (p95) under 5 seconds from client to durable log in
            normal cases. This requires careful attention to network topology,
            batching strategies, and retry logic.
            <strong>Stage Three: Enrichment and Validation</strong>A stream
            processing layer validates schemas, enriches events with geo data,
            user traits, or experiment metadata, and flags malformed or
            suspicious events. Many systems aim for under 1 minute from
            collection to the first enriched copy available for analytics. A
            longer batch process recomputes more expensive enrichments hourly or
            daily. For instance, joining events with a user attributes dimension
            table or resolving IP addresses to geographic locations.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> The event data model is the contract
              that keeps this pipeline coherent. If events are poorly modeled,
              every downstream consumer suffers from ambiguous semantics, broken
              joins, and misleading metrics.
            </div>
            <strong>Stage Four: Storage and Modeling</strong>
            Raw events are stored in long term storage as an immutable log,
            often partitioned by event date and sometimes by tenant or product.
            On top of this, a modeling layer creates derived event tables,
            sessionized views, funnels, and aggregated metrics. For example,
            detailed page_view and link_click events can be modeled into higher
            level user_session and conversion facts for A/B testing.
            <strong>Stage Five: Consumption</strong>
            Product analytics tools, internal dashboards, machine learning (ML)
            feature pipelines, and experiment analyzers consume modeled events.
            Companies typically target interactive query latencies of under a
            few seconds on the most common aggregates like daily active users or
            conversion rates, even on datasets reaching tens or hundreds of
            billions of rows. This requires careful indexing, partitioning, and
            pre aggregation strategies.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Apps Emit Events</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    12k/sec average
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">
                    Collection &amp; Queue
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    p95 &lt; 5 sec latency
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Enrichment</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    &lt; 1 min to first view
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">
                    Storage &amp; Modeling
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Partitioned by date
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Analytics &amp; ML</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Query &lt; few seconds
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
                  Target ingest latency is p95 under 5 seconds from client to
                  durable log, with enrichment completing in under 1 minute for
                  real time analytics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Systems at scale handle millions of events per second on the
                  central bus, requiring careful batching and partitioning
                  strategies to avoid hotspots.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Raw events are partitioned by event date for efficient time
                  range queries, and sometimes further bucketed by user ID or
                  tenant ID hash to distribute load.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The modeling layer maintains three tiers: raw events as
                  produced, cleaned events with normalized schemas and identity
                  resolution, and derived models like sessions or funnels.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interactive analytics queries on billions of rows target
                  latencies under a few seconds, requiring pre aggregation and
                  indexing strategies for common metrics like daily active
                  users.
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
                  A typical flow: Mobile app sends page_viewed event -&gt;
                  Collection service batches 100 events -&gt; Queue durably
                  stores within 3 seconds -&gt; Stream processor enriches with
                  user country and experiment variant within 30 seconds -&gt;
                  Parquet files partitioned by date land in object storage -&gt;
                  SQL engine queries last 30 days of views in 2 seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sessionization example: Raw click_event records are grouped by
                  user ID and 30 minute inactivity timeout to create
                  user_session fact table with session start time, end time,
                  page count, and attribution parameters like marketing channel.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEventDataModelingEndToEndEventDataPipelineArchitecture;
