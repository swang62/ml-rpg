import type { Component } from "solid-js";

const LessonApiDataIngestionWhatIsApiBasedDataIngestion: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is API-based Data Ingestion?
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
              <strong>API-based data ingestion</strong> is the process of
              extracting data from source systems through HTTP based APIs rather
              than direct database access or file transfers, typically used when
              you do not control the source system.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          You need data from Salesforce, Shopify, Stripe, or internal
          microservices for analytics or machine learning. But you cannot
          connect directly to their databases. You cannot get nightly file
          dumps. The only interface you have is an API contract, maybe REST or
          GraphQL, with authentication, rate limits, and pagination. This is the
          reality for most SaaS integrations. Tools like Fivetran, Airbyte, and
          Stitch exist specifically because hundreds of platforms only expose
          data through APIs.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Three Core Pillars:
          </div>
          First is <strong>extraction</strong>. You make HTTP requests with
          proper authentication tokens. The API returns data in pages, maybe 100
          or 1000 records at a time. You must handle pagination cursors, respect
          rate limits like 200 requests per minute, and deal with eventual
          consistency where recently created records might not appear
          immediately. Second is <strong>staging and transformation</strong>.
          Raw API responses, typically JSON, need validation. Field names might
          change. New fields appear. You land this raw data first, then
          normalize it into typed schemas that your warehouse or search index
          expects. Third is <strong>orchestration and resilience</strong>. You
          schedule sync jobs, maybe every 15 minutes or hourly. You track
          checkpoints so you only fetch changed data. When requests fail due to
          timeouts or rate limits, you retry with exponential backoff. You
          monitor freshness, ensuring data is no more than 10 minutes stale.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Why This Matters:
          </div>
          A large company might ingest from 20 to 100 external tools plus
          hundreds of internal services. Each has different limits and schemas.
          Your ingestion layer sits between these APIs and your data lake, which
          might receive tens of terabytes daily. Getting this wrong means broken
          dashboards, stale metrics, or exceeding API quotas and getting
          blocked.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                API ingestion is necessary when you lack direct database access
                or file transfer options, common with SaaS platforms like
                Salesforce or Stripe
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Three core components: extraction through paginated HTTP APIs,
                staging and transformation of raw JSON responses, and
                orchestration with checkpoint tracking
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                You must handle rate limits (typically 200 to 1000 requests per
                minute per tenant), authentication tokens, pagination cursors,
                and eventual consistency
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Large enterprises ingest from 20 to 100 external APIs plus
                hundreds of internal services into data lakes receiving tens of
                terabytes daily
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
                Fivetran and Airbyte build connectors that poll source APIs like
                Salesforce or NetSuite, respecting rate limits of 200 requests
                per minute per tenant
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Segment exposes an HTTP ingestion API accepting tens of
                thousands of events per second, immediately writing to a queue
                before fanning out to warehouses
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A commerce team syncing product catalog from a headless CMS
                through an ingestion API, landing data in both search indexes
                and data warehouses
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonApiDataIngestionWhatIsApiBasedDataIngestion;
