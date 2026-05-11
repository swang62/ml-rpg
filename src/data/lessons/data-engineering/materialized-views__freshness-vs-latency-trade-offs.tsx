import type { Component } from "solid-js";

const LessonMaterializedViewsFreshnessVsLatencyTradeOffs: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Freshness vs Latency Trade Offs
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Central Tension:</strong> Materialized views give you fast
          queries, but you must accept some staleness. This is not a bug; it is
          the fundamental trade off of precomputation. Precomputed aggregations
          allow sub 100 ms p95 query latency at thousands of queries per second.
          But dashboards may be 1 to 5 minutes behind real time for minute level
          aggregates, and even more for hourly or daily rollups. The question is
          whether your use case can tolerate this lag.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Query Raw Data
              </div>
              <div style="font-size: 12px">
                Always fresh, but 10 to 60 sec latency at scale
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Materialized View
              </div>
              <div style="font-size: 12px">
                Sub 100ms queries, but 1 to 5 min stale
              </div>
            </div>
          </div>
          <strong>When Staleness Matters:</strong> For fraud detection systems
          or real time trading dashboards, 5 minutes of lag is unacceptable. You
          need streaming stateful processing with systems like Flink or Kafka
          Streams maintaining in memory state that updates within seconds. The
          cost is much higher operational complexity and resource usage. For
          product analytics dashboards showing user engagement trends, marketing
          campaign performance, or internal business metrics, 2 to 5 minutes of
          staleness is completely fine. Users understand dashboards are not
          instantaneous, and the massive reduction in compute cost justifies the
          delay.
          <strong>Resource Trade Offs:</strong> You pay extra storage for each
          derived table, typically 10 to 50 percent of raw data size if you
          maintain multiple aggregation layers. In return, you save enormous
          amounts of compute per query. This is attractive when you have many
          repeated queries over similar dimensions. If your workload is highly
          ad hoc with analysts running unique exploratory queries, materialized
          views help less. Each unique query pattern would need its own
          materialized view, which becomes wasted storage and maintenance
          burden.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Teams often over index on
            freshness without measuring actual user needs. A dashboard that
            updates every 30 seconds but takes 5 seconds to load feels worse
            than one that updates every 5 minutes but loads in 200 ms.
          </div>
          <strong>Flexibility vs Complexity:</strong> Materialized views lock
          you into specific aggregations and groupings. If product requirements
          change and you need a new dimension, you may need to backfill months
          of historical data. Schema evolution, handling late arriving events,
          and data corrections all become more complex compared to just querying
          raw columnar data. An alternative is to rely on extremely fast
          columnar engines with good indexing. Modern systems like ClickHouse
          can handle interactive queries on tens of billions of rows fast enough
          that materialized views become optional, used mainly for the heaviest
          rollups. This is simpler operationally but requires more query time
          compute.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Materialized views trade staleness for speed: sub 100 ms queries
                with 1 to 5 minutes of lag versus always fresh raw queries
                taking 10 to 60 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                For fraud detection or trading, staleness is unacceptable and
                you need streaming state. For product analytics and business
                dashboards, minutes of lag is fine and saves massive compute
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Storage overhead is typically 10 to 50 percent of raw data for
                multiple aggregation layers, justified when you have many
                repeated query patterns but wasteful for highly ad hoc workloads
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Materialized views reduce flexibility: changing dimensions or
                business logic may require expensive backfills of months of
                data, unlike querying raw columnar storage
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
                Marketing dashboard showing campaign performance can tolerate 5
                minutes of staleness and benefits from 200 ms query latency
                instead of 30 second scans of raw event data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Fraud detection system cannot use materialized views with
                minutes of lag; instead uses Flink streaming with in memory
                state updating within seconds of event arrival
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonMaterializedViewsFreshnessVsLatencyTradeOffs;
