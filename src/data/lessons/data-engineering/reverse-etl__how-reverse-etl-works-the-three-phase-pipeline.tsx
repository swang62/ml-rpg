import type { Component } from "solid-js";

const LessonReverseEtlHowReverseEtlWorksTheThreePhasePipeline: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Reverse ETL Works: The Three Phase Pipeline
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Technical Challenge:
            </div>
            Reverse ETL is fundamentally harder than traditional ETL because you
            are writing to systems, not just reading. When you extract from an
            API, failures are usually safe: you retry and try again. When you
            write to a CRM, failures have consequences. You might trigger
            duplicate emails, overwrite newer data with stale values, or create
            conflicting records. The warehouse also lacks features that make
            this easy, like native change streams.
            <strong>Phase One: Extract from Warehouse</strong>
            Most warehouses are not built for operational workloads. They excel
            at scanning billions of rows for analytics but lack change data
            capture mechanisms. To sync incrementally, Reverse ETL systems
            typically maintain a high watermark: the maximum{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              updated_at
            </code>{" "}
            timestamp seen in the last sync. For example, your warehouse has a{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              account_scores
            </code>{" "}
            table with 100,000 rows. The extractor queries: "SELECT * FROM
            account_scores WHERE updated_at &gt; last_watermark". If 2,500
            accounts changed since the last sync 5 minutes ago, only those get
            extracted. The system updates its watermark to the max timestamp
            from this batch and uses it for the next run. Some setups compare
            full snapshots instead. They materialize the current state, diff
            against the previous snapshot, and identify inserts, updates, and
            deletes. This costs more compute but handles cases where{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              updated_at
            </code>{" "}
            columns are unreliable or missing.
            <strong>Phase Two: Transform for Destinations</strong>
            Your warehouse model uses snake_case column names and stores phone
            numbers as strings with country codes. Salesforce expects Pascal
            case field names and validates phone formats strictly. The
            transformation layer bridges this gap. This phase flattens nested
            JSON, maps warehouse IDs to destination IDs using an internal
            mapping table, enforces required fields, and applies validation
            rules. For example, emails must match a regex pattern, phone numbers
            need specific formatting, and certain enum fields only accept
            predefined values. Destinations like HubSpot or Marketo have
            hundreds of such constraints.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Sync Volume
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">2.5K</div>
                  <div style="font-size: 10px; font-weight: 600">
                    RECORDS/SYNC
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5 min</div>
                  <div style="font-size: 10px; font-weight: 600">
                    SYNC INTERVAL
                  </div>
                </div>
              </div>
            </div>
            <strong>Phase Three: Load with Idempotency</strong>
            The loader batches records for efficiency while respecting rate
            limits. A CRM might allow 10,000 records per API call but limit you
            to 500 requests per minute. The loader parallelizes work across
            multiple workers and implements backoff when hitting throttles.
            Idempotency is critical. If a request fails midway through a 10,000
            record batch, the system must retry without creating duplicates.
            Most Reverse ETL tools maintain a mapping between warehouse primary
            keys and destination object IDs. They query the destination first to
            check if a record exists, then decide whether to insert or update.
            Some APIs provide native upsert operations using external IDs, which
            simplifies this. Versioning prevents overwriting newer data. The
            system tracks timestamps or version numbers for each record. If the
            destination already has a more recent version, the update is
            skipped.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Extract</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Query changed rows
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Transform</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Map schema &amp; validate
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Load</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Batch &amp; upsert w/ idempotency
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
                  Extracting from warehouses requires custom change detection
                  using watermarks or snapshot diffs since warehouses lack
                  native Change Data Capture (CDC)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Transformation layer must map warehouse schemas to destination
                  constraints, handling field naming conventions, data types,
                  and validation rules for each target system
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Loader implements batching and rate limiting to maximize
                  throughput while respecting API limits, often achieving 5
                  million record updates per minute for well designed
                  integrations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotency is achieved through mapping tables between
                  warehouse primary keys and destination IDs, plus version
                  tracking to avoid overwriting newer data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical production syncs process 2,000 to 5,000 changed
                  records every 5 minutes with p50 latency of 2 to 5 minutes end
                  to end
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
                  A sync extracts 2,500 accounts where updated_at &gt;
                  last_watermark from a 100,000 row table, transforms snake_case
                  columns to PascalCase for Salesforce, batches into 10,000
                  record API calls, and completes the full cycle in 3 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Census maintains an internal mapping table that stores
                  warehouse row IDs alongside Salesforce contact IDs, enabling
                  upserts by querying this table before each write operation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hightouch implements per destination rate limiting: a CRM
                  connector respects 500 requests per minute while a marketing
                  platform connector throttles to 100 writes per second based on
                  vendor limits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonReverseEtlHowReverseEtlWorksTheThreePhasePipeline;
