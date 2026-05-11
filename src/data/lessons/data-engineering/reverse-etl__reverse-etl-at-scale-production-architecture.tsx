import type { Component } from "solid-js";

const LessonReverseEtlReverseEtlAtScaleProductionArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Reverse ETL at Scale: Production Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Multi Tenant Control Plane:
            </div>
            At scale, Reverse ETL platforms like Census and Hightouch serve
            thousands of customers, each with dozens of syncs running at
            different frequencies. The control plane is a centralized scheduler
            and orchestrator that manages this complexity. It maintains a job
            queue where each job represents a sync batch for a specific
            customer, warehouse model, and destination. For a single large
            customer, this might mean 50 different syncs: 20 to Salesforce
            covering different objects, 15 to Marketo for various audience
            segments, 10 to Zendesk for support context, and 5 to messaging
            platforms. Some syncs run every 5 minutes for critical real time
            segments. Others run hourly for bulk updates or nightly for low
            priority enrichment data.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Distributed Worker Architecture:
            </div>
            Workers pull jobs from the queue and execute the three phase
            pipeline. To prevent one slow customer from blocking others, work is
            partitioned by destination and customer. A misconfigured integration
            that throttles heavily or a customer warehouse query that takes 10
            minutes to run will not degrade performance for other tenants.
            Workers implement circuit breakers. If a destination API returns 429
            rate limit errors on 5 consecutive attempts, the circuit opens and
            that destination is paused for exponential backoff periods (first 1
            minute, then 2, then 4, up to 30 minutes). This prevents wasting
            resources on failing syncs and gives the destination time to
            recover. Dead letter queues capture permanently failing records. For
            example, if 2,500 records are synced but 50 fail validation because
            email addresses are malformed, those 50 go to a dead letter queue
            where they can be inspected, fixed in the warehouse, and retried
            manually.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Platform Scale Metrics
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5M</div>
                  <div style="font-size: 10px; font-weight: 600">
                    RECORDS/MIN
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">99.9%</div>
                  <div style="font-size: 10px; font-weight: 600">UPTIME</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P95 FRESHNESS
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Freshness and Monitoring:
            </div>
            Production Reverse ETL tracks several key metrics. First, records
            processed per second across all syncs gives overall throughput.
            Second, p50 and p95 freshness lag measures time from when a record
            is updated in the warehouse to when it appears in the destination.
            For most operational analytics, p50 of 2 to 5 minutes and p95 under
            10 minutes is acceptable. Real time personalization needs sub second
            latency and requires different architecture like streaming CDPs.
            Error rates per connector show which destinations are most fragile.
            If Salesforce syncs fail 0.1% of the time but a custom internal API
            fails 5% of the time, that signals where to invest in better error
            handling or API improvements. Per field validation failure counts
            help identify data quality issues in the warehouse upstream.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Even a 0.1% error rate means
              5,000 incorrect records per day if you are syncing 5 million
              records daily. Without strong observability and alerting, these
              silent failures go unnoticed for days while business users make
              decisions on bad data.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              State Management:
            </div>
            The platform maintains state in a distributed database. For each
            sync, it stores the last successful watermark, the mapping between
            warehouse IDs and destination IDs, and metadata like last run time
            and error counts. This state must be consistent and highly available
            since it drives incremental extraction. If the watermark is lost,
            the system might resync millions of records unnecessarily or skip
            changed data entirely.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tenant platforms partition work by customer and
                  destination to prevent one slow integration from blocking
                  others, with dedicated worker pools handling job queues
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Circuit breakers pause failing syncs after 5 consecutive
                  errors, implementing exponential backoff from 1 to 30 minutes
                  to avoid wasting resources on degraded destinations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems achieve throughput of 5 million record
                  updates per minute by batching and parallelizing across
                  distributed workers with 99.9% uptime
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness targets for operational analytics are typically p50
                  of 2 to 5 minutes and p95 under 10 minutes from warehouse
                  update to destination visibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dead letter queues and per field validation metrics surface
                  data quality issues, critical because even 0.1% error rates
                  mean thousands of bad records daily at scale
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
                  A single enterprise customer runs 50 concurrent syncs across
                  Salesforce, Marketo, and Zendesk, with high priority churn
                  scores syncing every 5 minutes and bulk enrichment data
                  syncing nightly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When Salesforce returns 429 rate limit errors, the circuit
                  breaker opens and pauses that sync for 1 minute, then 2, then
                  4, preventing thousands of wasted API calls while the
                  destination recovers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Census tracks that their HubSpot connector has a 0.05% error
                  rate while a customer's custom webhook API fails 3% of syncs,
                  signaling where engineering effort should focus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonReverseEtlReverseEtlAtScaleProductionArchitecture;
