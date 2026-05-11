import type { Component } from "solid-js";

const LessonDataCatalogSystemsWhatIsADataCatalogSystem: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is a Data Catalog System?
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
              A <strong>data catalog system</strong> is a centralized metadata
              repository that helps engineers and analysts discover, understand,
              and trust data across their organization by tracking what data
              exists, where it lives, how it's produced, and who uses it.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          As companies grow beyond a few data stores, a specific problem
          emerges. You have dozens of databases, hundreds of data pipelines,
          thousands of tables, and maybe tens of thousands of analysts and
          engineers. When someone needs customer email data or monthly revenue
          metrics, they face three questions that become impossible to answer
          through tribal knowledge or spreadsheets. First, what data actually
          exists? Searching through wikis or asking on Slack doesn't scale past
          50 tables. Second, can you trust it? That "users" table might be
          deprecated or have known quality issues. Third, what breaks if you
          change this dataset? Drop a column and you might accidentally break 15
          downstream dashboards.
          <strong>What a Catalog Actually Stores:</strong>A data catalog stores
          metadata, not the data itself. Think of it as a card catalog in a
          library: it tells you about the books but doesn't contain the actual
          content. For each data asset (tables, views, streams, dashboards,
          machine learning features), the catalog tracks schema information like
          column names and types, ownership details showing who's responsible,
          lineage relationships showing which jobs produce this data and what
          consumes it, usage statistics like query counts and user access
          patterns, data quality signals such as freshness and completeness, and
          access policies defining who can view or modify the asset.
          <strong>Where It Fits:</strong>
          The catalog sits alongside your data platform components (warehouses,
          lakes, streaming systems), not in front of them. When someone runs a
          query, it goes directly to the warehouse. The catalog doesn't
          intercept queries or move data. Instead, it listens to events from
          these systems, builds a unified view of all metadata, and exposes it
          through search APIs and a user interface. This architecture means the
          catalog can be eventually consistent. If a table gets updated, the
          catalog might learn about it 30 to 120 seconds later. That's
          acceptable because discovery and documentation don't need real time
          precision. The trade off is simple: you get automated, always on
          metadata coverage across every system without adding latency to actual
          data queries.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Warehouse</strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Data Lake</strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Kafka</strong>
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">
                ↓ metadata events
              </div>
              <div style="border: 2px solid; padding: 16px 20px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 15px">Data Catalog</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  metadata only
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">
                ↓ search &amp; discovery
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 13px">
                  Engineers &amp; Analysts
                </strong>
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
                Solves discovery, trust, and impact analysis problems that
                emerge when you have hundreds of data stores and thousands of
                tables
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Stores metadata only (schema, lineage, ownership, quality) not
                actual data, acting as a search and knowledge layer on top of
                your data platform
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Integrates with all systems through event ingestion and periodic
                crawling, typically becoming consistent within 30 to 120 seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Does not sit on the query path so it can be eventually
                consistent without impacting data processing performance
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At large companies may cover tens of thousands of tables,
                petabytes of data, and thousands of daily users with 99.9
                percent availability
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
                When an analyst searches for "monthly active users", the catalog
                returns ranked results showing which tables are blessed for that
                metric, who owns them, last update time, and downstream
                dashboards in under 300 ms
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                When an engineer wants to deprecate a legacy table, the catalog
                queries its lineage graph to show all downstream jobs and
                dashboards that would break, preventing accidental outages
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A data pipeline writes a new table to the warehouse at 2:00 PM.
                The warehouse emits a metadata event. By 2:02 PM the catalog has
                discovered it, inferred schema, tagged the owner, and made it
                searchable
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataCatalogSystemsWhatIsADataCatalogSystem;
