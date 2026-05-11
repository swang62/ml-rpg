import type { Component } from "solid-js";

const LessonDataDiscoveryWhatIsDataDiscoverySearch: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Discovery &amp; Search?
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
              <strong>Data Discovery &amp; Search</strong> is an enterprise
              system that helps engineers and analysts find the right dataset
              among thousands of options, understand if it is safe to use, and
              know how to query it. Think of it as Google for your company's
              internal data.
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Problem:
          </div>
          In a large company, you might have 5,000 to 50,000 datasets spread
          across data lakes, warehouses, Kafka topics, and BI tools. Without a
          discovery system, engineers spend hours or even days asking in Slack,
          searching wikis, or digging through code to find the correct table.
          One engineer might use the{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            users_daily
          </code>{" "}
          table while another uses{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            daily_active_users
          </code>
          , creating inconsistent metrics across the organization.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            How It Works:
          </div>
          A discovery system builds a searchable catalog of metadata. It does
          not scan raw data on every query. Instead, it continuously ingests
          three types of metadata: First, technical metadata includes schemas,
          data types, storage locations, and query history. Second, business
          metadata covers descriptions, owners, domains, and business terms.
          Third, operational metadata tracks freshness, data quality scores,
          incident history, and usage statistics. This metadata is normalized
          into a graph structure representing datasets, columns, owners, lineage
          between tables, and usage patterns. When you search for "daily active
          users for Android", the system queries this metadata graph and returns
          ranked results in under 200 milliseconds, enriched with ownership,
          quality scores, and sample queries.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> This is not just a search box. It is
            search plus trust plus context. You need to know not just where the
            data is, but whether it is fresh, accurate, who owns it, and whether
            you have permission to use it.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">User Query</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  "daily active users"
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Metadata Graph</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  5,000 to 50,000 datasets
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Ranked Results</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Quality + Ownership + Lineage
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
                Discovery is an enterprise search engine for data assets, not a
                tool that scans raw data on every query
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                A metadata graph captures technical, business, and operational
                information about datasets, columns, and relationships
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Target search latency is under 200 milliseconds p95 even with
                millions of entities in the catalog
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Without discovery, engineers waste hours per week finding data,
                leading to inconsistent metrics and slower product iteration
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
                An engineer searches for "daily active users for Android" and
                gets back not just table names, but also ownership information,
                last refresh time, data quality scores, and sample queries
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                A data scientist filters for all customer features with
                freshness under 15 minutes to mount them in an ML platform, with
                lineage automatically recorded
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataDiscoveryWhatIsDataDiscoverySearch;
