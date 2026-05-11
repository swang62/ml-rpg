import type { Component } from "solid-js";

const LessonApiDataIngestionFourCoreApiIngestionPatterns: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Four Core API Ingestion Patterns
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          API ingestion is not one size fits all. The pattern you choose depends
          on who initiates data transfer, how much control you have over timing,
          and what latency you need. Four patterns dominate production systems.
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Pull Based (Polling)</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Your system polls API on schedule
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↕</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Push Based (Webhooks)</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Source calls your endpoint
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↕</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Async Job Based</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Submit batch, poll for status
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↕</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Streaming Event</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Each event sent immediately
                </div>
              </div>
            </div>
          </div>
          <strong>Pull Based Polling:</strong>
          Your pipeline wakes up every 15 minutes or hourly and fetches data.
          You use{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            updated_at
          </code>{" "}
          timestamps or cursors to get only changed records since last sync.
          Fivetran uses this pattern for most SaaS connectors. Typical
          incremental syncs achieve p95 latency under 5 to 10 minutes, while
          full backfills might take hours due to pagination and rate limits.
          <strong>Push Based Webhooks:</strong>
          The source system calls your HTTP endpoint when data changes. You
          validate the signature, enqueue the payload into a message queue or
          log, and return 200 OK immediately. This can deliver sub second
          freshness but requires you to maintain a highly available endpoint
          with proper authentication. You still need occasional full syncs to
          catch missed events.
          <strong>Async Job Based:</strong>
          You submit a batch of updates through one API endpoint and receive a
          job identifier. You then poll a separate status endpoint every 10
          seconds until the job completes. Bloomreach uses this pattern for
          product catalog ingestion, with typical job latencies of 30 to 300
          seconds for tens of thousands of products. This decouples submission
          from processing, allowing the backend to throttle work.
          <strong>Streaming Event Collection:</strong>
          Each user action or system event is sent individually through an API
          to a collector service. Segment uses this for behavioral tracking,
          accepting tens of thousands of events per second. The collector writes
          to a durable log immediately, then fans out to warehouses and
          destinations asynchronously.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Most companies use multiple
            patterns. Operational data from internal services might use
            streaming events. SaaS integrations use pull based polling. Critical
            low latency updates use webhooks.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Pull based polling is simplest and works when you control the
                schedule, achieving p95 latency of 5 to 10 minutes for
                incremental syncs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Push based webhooks deliver sub second freshness but require
                maintaining a highly available endpoint and still need periodic
                reconciliation syncs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Async job based ingestion decouples submission from processing,
                with job latencies of 30 to 300 seconds, useful when the backend
                needs to throttle heavy work
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Streaming event collection sends individual events immediately,
                accepting tens of thousands per second by writing to durable
                logs before downstream processing
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
                Fivetran polls Salesforce API every 15 minutes using
                &lt;code&gt;updated_at&lt;/code&gt; cursors, respecting 200
                requests per minute rate limits
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Bloomreach product catalog ingestion: submit batch via API,
                receive job ID, poll status every 10 seconds, typical completion
                in 30 to 300 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Segment HTTP tracking API accepts behavioral events at tens of
                thousands per second, immediately writing to Kafka before
                fanning out to destinations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonApiDataIngestionFourCoreApiIngestionPatterns;
