import type { Component } from "solid-js";

const LessonDataFederationWhenToUseFederationVsAlternatives: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          When to Use Federation vs Alternatives
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Core Decision Framework:</strong> Federation trades
          performance predictability and operational isolation for freshness and
          integration flexibility. Understanding when this trade off makes sense
          is critical for system design interviews.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Data Federation
              </div>
              <div style="font-size: 12px">
                Real time freshness, flexible integration, runtime dependencies
                on N systems
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                ETL + Warehouse
              </div>
              <div style="font-size: 12px">
                Predictable performance, operational isolation, 15 minute to 24
                hour staleness
              </div>
            </div>
          </div>
          <strong>Choose Federation When:</strong> You need real time or near
          real time access to data across multiple systems. Examples include
          Customer 360 dashboards showing live support tickets plus recent
          orders, regulatory reports joining live compliance data with
          historical records, or exploratory analysis where building a full ETL
          pipeline for a one time investigation is too expensive. Federation
          works best for low to moderate query volume (under 20 queries per
          second), queries touching 2 to 4 sources, and workloads where most
          queries are selective (filtering to small result sets). If your
          sources respond in 200 to 500 milliseconds and you can tolerate p95
          latencies of 3 to 5 seconds, federation is viable.
          <strong>Choose ETL Plus Warehouse When:</strong> You have high query
          volume (over 50 queries per second), complex aggregations over large
          datasets (scanning 10 to 100 TB), or need consistent performance
          guarantees. Daily or hourly batch analytics, machine learning feature
          generation, and high traffic BI dashboards all favor warehouses. The
          math is concrete. A 50 TB scan for daily aggregates in a warehouse
          with columnar storage and clustering takes 2 to 5 minutes and costs
          $10 to $20. The same via federation, pulling from 6 to 8 sources,
          takes 30 to 60 minutes, costs $40 to $80 in compute and egress, and
          risks timeout if any source is slow. When you run this daily, the
          warehouse is 10x cheaper and 10x faster.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The decision is not federation OR warehouse. It is what
              percentage of your workload is high frequency heavy computation
              (warehouse) versus long tail exploratory cross system queries
              (federation)."
            </div>
          </div>
          <strong>Alternative Patterns:</strong> Point to point APIs between
          services avoid federation complexity but require each team to build
          and maintain integrations. This works for simple cases (one service
          calling another) but does not scale to ad hoc analytics across 10 to
          20 systems. Application level composition, where your code queries
          multiple services and joins results, gives you full control but pushes
          complexity to every application. This is appropriate for product
          features with specific data needs, not for general purpose analytics.
          Change Data Capture (CDC) plus stream processing creates near real
          time replicas in a central store, combining warehouse performance with
          low latency (2 to 10 second lag). This is the best of both worlds but
          requires infrastructure investment. Use this for high value, high
          traffic use cases where both freshness and performance matter.
          <strong>Organizational Considerations:</strong> In data mesh
          architectures, domains own their stores. Federation provides a cross
          domain access fabric without forcing data centralization. But you must
          honor domain Service Level Agreements (SLAs). If a domain cannot
          handle 500 analytical queries per second on their Online Transaction
          Processing (OLTP) database, materialize hot aggregates or shift to CDC
          replication.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="font-size: 13px; font-weight: 700; margin-bottom: 12px; text-align: center">
              Decision Matrix: Query Volume vs Freshness Need
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px">
                  LOW VOLUME + FRESH
                </div>
                <div style="font-size: 11px">Under 20 QPS, need real time</div>
                <div style="font-weight: 800; margin-top: 6px; font-size: 13px">
                  → Federation
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px">
                  HIGH VOLUME + FRESH
                </div>
                <div style="font-size: 11px">Over 50 QPS, need real time</div>
                <div style="font-weight: 800; margin-top: 6px; font-size: 13px">
                  → CDC + Warehouse
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px">
                  LOW VOLUME + STALE OK
                </div>
                <div style="font-size: 11px">
                  Under 20 QPS, hourly updates fine
                </div>
                <div style="font-weight: 800; margin-top: 6px; font-size: 13px">
                  → ETL + Warehouse
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px">
                  HIGH VOLUME + STALE OK
                </div>
                <div style="font-size: 11px">
                  Over 50 QPS, daily updates fine
                </div>
                <div style="font-weight: 800; margin-top: 6px; font-size: 13px">
                  → ETL + Warehouse
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
                Federation for low volume (under 20 QPS) cross system queries
                needing real time data; warehouse for high volume (over 50 QPS)
                or heavy aggregations (10 to 100 TB scans)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Warehouse aggregates are 10x faster and 10x cheaper: 50 TB scan
                in 3 minutes at $15 vs 40 minutes at $45 via federation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                CDC plus stream processing combines warehouse performance with
                low latency (2 to 10 seconds), best for high value use cases
                needing both
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid architecture is the production pattern: warehouse for 85
                to 95 percent of volume, federation for 5 to 15 percent long
                tail exploratory queries
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Choose based on read/write ratio and freshness needs: real time
                cross system reporting favors federation, daily batch analytics
                favors warehouse
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
                Customer 360 dashboard showing live support tickets (Zendesk)
                plus recent orders (MySQL) plus account status (Salesforce):
                federation handles real time need across 3 sources
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Daily revenue aggregates scanning 80 TB of transactions:
                warehouse completes in 4 minutes at $18, federation would take
                50 minutes at $60 and risk timeouts
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Real time fraud detection needing 50 QPS with under 100ms lag:
                CDC replicates to warehouse, avoiding federation's 500ms to 2
                second latency
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataFederationWhenToUseFederationVsAlternatives;
