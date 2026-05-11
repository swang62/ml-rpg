import type { Component } from "solid-js";

const LessonApiDataIngestionApiIngestionAtScaleProductionReality: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            API Ingestion at Scale: Production Reality
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            The difference between a prototype and production API ingestion is
            handling scale, rate limits, and downstream SLAs across dozens or
            hundreds of sources.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Rate Limits Are Your Hard Constraint:
            </div>
            Every API has limits. Salesforce might allow 200 requests per minute
            per tenant. Shopify enforces bucket based rate limiting with burst
            allowances. If you scale horizontally by adding more workers without
            coordination, you just hit limits faster and increase error rates.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Rate Limit Impact on Backfill
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">200/min</div>
                  <div style="font-size: 10px; font-weight: 600">API LIMIT</div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    1M records
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    TO BACKFILL
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    ~3.5 hours
                  </div>
                  <div style="font-size: 10px; font-weight: 600">MIN TIME</div>
                </div>
              </div>
            </div>
            At 200 requests per minute with 1000 records per page, you need 1000
            requests to fetch a million records. That is 5 minutes minimum,
            assuming perfect efficiency. In practice, add retry overhead and you
            are looking at hours for large backfills.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Multi Tenant Challenge:
            </div>
            Fivetran and Airbyte serve thousands of customers, each with their
            own API tokens and rate limits. A naive approach where each customer
            gets dedicated workers fails at scale. Instead, they use a shared
            scheduler that tracks per connector rate limit state globally. When
            customer A is nearing their Shopify limit, the scheduler throttles
            their syncs and allocates capacity to customer B. This centralized
            coordination is why scaling to 10x more customers does not mean 10x
            more infrastructure. It means smarter scheduling and backoff
            algorithms.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Two Phase Ingestion Pattern:
            </div>
            Consider a real flow from a commerce platform. A product catalog
            lives in a headless CMS with an API similar to Bloomreach. The data
            team needs this in both a search index (for customer facing search)
            and a warehouse (for analytics). Phase one: An Airflow job submits
            product updates through the ingestion API. The API returns a job
            identifier. Airflow polls the status endpoint every 10 seconds. Job
            completes in 30 to 300 seconds for tens of thousands of products.
            Phase two: Once ingestion succeeds, a separate API call triggers
            index rebuilding. But indexing can only run once per hour to protect
            search cluster SLAs and avoid overwhelming background workers. This
            decoupling means multiple teams can ingest concurrently without
            impacting customer facing search performance.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Companies often underestimate
              API latency variance. Your p50 might be 2 minutes but p95 could be
              15 minutes due to rate limit backoff. Always design for p95 or
              p99, not median.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Observability Essentials:
            </div>
            Track lag between source updates and destination visibility. Measure
            95 percent of updates applied within 5 minutes for near real time
            pipelines. Log HTTP status code distributions per endpoint. Monitor
            payload size distributions to catch schema inflation. Structured
            logging with request identifiers and job identifiers is critical for
            debugging partial failures in production.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rate limits are hard constraints: at 200 requests per minute
                  with 1000 records per page, backfilling 1 million records
                  takes minimum 3.5 hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tenant systems use centralized schedulers that track per
                  connector rate limit state globally, allowing 10x customer
                  growth without 10x infrastructure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two phase patterns decouple ingestion from downstream
                  processing: product catalog ingestion completes in 30 to 300
                  seconds, but index updates limited to once per hour
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Design for p95 or p99 latency, not median: p50 might be 2
                  minutes but p95 can be 15 minutes due to rate limit backoff
                  and retries
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
                  Fivetran maintains per connector rate limit backoff state and
                  uses a shared scheduler to keep within global QPS budgets
                  across thousands of customers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bloomreach style catalog ingestion: submit batch, get job ID,
                  poll every 10 seconds, job completes in 30 to 300 seconds for
                  tens of thousands of products
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production observability: track 95 percent of updates applied
                  within 5 minutes, log HTTP status distributions, monitor
                  payload size growth
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApiDataIngestionApiIngestionAtScaleProductionReality;
