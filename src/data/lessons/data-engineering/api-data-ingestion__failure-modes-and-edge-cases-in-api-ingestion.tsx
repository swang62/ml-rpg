import type { Component } from "solid-js";

const LessonApiDataIngestionFailureModesAndEdgeCasesInApiIngestion: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in API Ingestion
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Production API ingestion fails in subtle ways. Understanding these
            failure modes separates junior engineers from senior ones in
            interviews.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Rate Limit Death Spirals:
            </div>
            Suppose your upstream API allows 1000 requests per hour per token.
            You scale horizontally by launching more workers to handle 10x
            customer growth. Each worker polls independently. Suddenly, all
            workers hit the rate limit and receive 429 Too Many Requests errors.
            Naive retry logic makes this worse. Workers retry immediately,
            consume the quota even faster, and oscillate between overload and
            idle. The system never stabilizes. The fix is centralized rate limit
            tracking. A shared service or database tracks remaining quota per
            token. Workers request capacity before making API calls. When quota
            is low, the scheduler backs off all workers for that token. At
            Fivetran scale with thousands of customers, this means a global
            scheduler that dynamically allocates capacity. When one customer
            nears their limit, capacity shifts to others. This is why 10x growth
            does not require 10x infrastructure.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Schema Drift and Partial Failures:
            </div>
            An upstream team adds a non nullable field to their API response. Or
            they change an enum value from{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              active
            </code>{" "}
            to{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              enabled
            </code>
            . Your ingestion job that expects the old schema starts failing for
            some objects, maybe 5 percent of records in a batch. If you validate
            strictly and fail the entire batch on any error, you lose 95 percent
            of good data. If you skip validation, you load corrupt data into
            your warehouse and poison downstream analytics.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Land raw JSON first, transform
              later. Segment and Fivetran write raw API responses to storage
              even with unknown fields, then run separate transformation jobs
              with schema validation.
            </div>
            This pattern isolates ingestion from transformation. When schemas
            evolve, ingestion continues successfully. Transformation jobs catch
            schema mismatches, log them with sample records, and alert data
            engineers. You get visibility without data loss.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Idempotency and Duplicate Writes:
            </div>
            Your ingestion job fetches 1000 records, processes 500, then times
            out. The orchestrator retries the job. Without idempotency, you
            write 500 records twice, creating duplicates. For analytical
            warehouses, duplicates corrupt counts and sums. For key value stores
            or search indexes, you might overwrite newer data with stale data if
            retries are delayed. Async job based patterns like Bloomreach
            mitigate this. The server assigns a job identifier. If you submit
            the same batch twice with the same identifier, the server treats it
            as idempotent and returns the existing job. The client can safely
            retry without duplicating work. For pull based ingestion, store high
            watermarks or cursors per stream in a transaction. Fetch new data,
            write to destination, update cursor, all in one atomic operation. If
            the job fails mid flight, the next run starts from the old cursor
            and refetches, but deduplicates based on primary keys.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Large Objects and Payload Limits:
            </div>
            Most APIs have payload size limits. Bloomreach limits inline API
            payloads to a few megabytes. If your product catalog includes high
            resolution images or large descriptions, you exceed this limit. The
            workaround is hybrid ingestion. Upload large files via SFTP or
            presigned S3 URLs. Use the API only to trigger processing of those
            files. The API call is lightweight, just a reference to the file
            location, while the heavy data transfer happens out of band.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Late Arriving Updates and Cursor Pagination:
            </div>
            Time based pagination using{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              updated_at
            </code>{" "}
            seems simple. Fetch records with{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              updated_at
            </code>{" "}
            greater than your last sync time. But if the source system allows
            backdated updates, like editing an order timestamp to correct a
            billing error, those records have old{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              updated_at
            </code>{" "}
            values. Your incremental sync misses them. Cursor or token based
            pagination is safer. The source API maintains state about what you
            have already fetched and returns an opaque token. The next request
            passes that token and gets only truly new records, regardless of
            timestamps. Alternatively, run periodic full reconciliation syncs.
            Incremental syncs every 15 minutes for freshness, full syncs weekly
            to catch anything missed.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Webhook Out of Order Delivery:
            </div>
            Webhooks are fire and forget. The source sends event A, then event
            B. But network routing or retries can deliver B before A. If you
            process naively, you might apply updates in the wrong order and end
            up with incorrect final state. You need sequence numbers or
            timestamps in payloads. Buffer events and reorder before applying.
            Or design your system to be commutative, where order does not
            matter. For analytics, appending events to a log is naturally
            commutative. For key value updates, use last write wins with wall
            clock timestamps, accepting that clock skew can still cause issues.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rate limit death spirals occur when horizontal scaling
                  increases error rates; fix with centralized quota tracking and
                  dynamic capacity allocation across workers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema drift causes partial batch failures; land raw JSON
                  first, transform later with separate validation jobs to
                  isolate ingestion from schema evolution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotency requires server side job identifiers for async
                  patterns or atomic cursor updates for pull based patterns to
                  prevent duplicate writes on retry
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large objects exceeding API payload limits (typically a few
                  megabytes) require hybrid ingestion: upload via SFTP or
                  presigned URLs, trigger processing via lightweight API call
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
                  Fivetran uses global scheduler tracking rate limit state per
                  customer token, shifting capacity when one customer nears
                  their 1000 requests per hour limit
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segment lands raw JSON events even with unknown fields, runs
                  separate transformation jobs that log schema mismatches
                  without blocking ingestion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bloomreach job submissions are idempotent: submitting the same
                  batch twice with the same job identifier returns existing job
                  instead of creating duplicates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time based pagination with &lt;code&gt;updated_at&lt;/code&gt;
                  misses backdated updates; cursor based pagination or periodic
                  full reconciliation syncs catch late arrivals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApiDataIngestionFailureModesAndEdgeCasesInApiIngestion;
