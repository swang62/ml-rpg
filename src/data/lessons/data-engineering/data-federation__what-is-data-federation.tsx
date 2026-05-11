import type { Component } from "solid-js";

const LessonDataFederationWhatIsDataFederation: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Federation?
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
              <strong>Data Federation</strong> is a virtual data layer that
              allows you to query multiple physically separate data sources as
              if they were one unified database, without copying or moving the
              data first.
            </div>
          </div>
          <strong>The Problem:</strong> Large organizations have data scattered
          across dozens or hundreds of systems. You might have customer orders
          in a relational database, product catalogs in MongoDB, support tickets
          in Salesforce, clickstream events in S3, and financial data in an on
          premises warehouse. Business analysts want to join this data for
          reports, but building Extract, Transform, Load (ETL) pipelines for
          every combination is expensive and slow.
          <strong>How Federation Solves This:</strong> Instead of physically
          moving data into a central warehouse first, federation provides a
          query interface that looks like one database but actually reaches out
          to multiple sources at query time. When you run a query, the
          federation engine breaks it into pieces, sends subqueries to each
          relevant system, and stitches the results back together. Think of it
          like a universal remote control. Instead of having separate remotes
          for your TV, sound system, and streaming device, you have one
          interface that coordinates all of them. The devices stay separate, but
          you control them through a unified interface.
          <strong>Key Components:</strong> A federation system needs several
          parts. First, a federation engine that accepts queries and coordinates
          execution. Second, connectors for each data source that know how to
          communicate with different systems (SQL databases, REST APIs, cloud
          storage). Third, a metadata catalog that maps the unified schema to
          actual source schemas. Fourth, a query optimizer that decides how to
          execute efficiently. Finally, a security layer that enforces access
          controls.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> When an analyst writes SELECT * FROM
            customers JOIN orders, the federation engine might route the
            customers query to Salesforce via REST API and the orders query to
            PostgreSQL via SQL, then join the results locally before returning
            them.
          </div>
          The value proposition is simple: access fresh data from multiple
          sources without building and maintaining complex ETL pipelines. The
          freshness is real time because you always query the current state of
          each system.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Analyst Query</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  SELECT * FROM customers JOIN orders
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Federation Engine</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Decomposes query
                </div>
              </div>
              <div style="display: flex; gap: 12px; justify-content: center; width: 100%">
                <div style="font-size: 20px; font-weight: bold">↙</div>
                <div style="font-size: 20px; font-weight: bold">↘</div>
              </div>
              <div style="display: flex; gap: 12px; justify-content: center; width: 100%">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; flex: 1">
                  <strong style="font-size: 13px">Salesforce CRM</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    customers table
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; flex: 1">
                  <strong style="font-size: 13px">PostgreSQL</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    orders table
                  </div>
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
                Federation provides a virtual unified view over physically
                separate data sources without copying data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Queries are decomposed into subqueries that execute against each
                source system at runtime
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Components include federation engine, source connectors,
                metadata catalog, query optimizer, and security layer
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data stays fresh because you always query the current state of
                each system, avoiding ETL latency
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Trade off is operational simplicity for runtime dependencies on
                multiple upstream systems
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
                Amazon Athena federated queries allow joining S3 data with RDS
                databases and SaaS systems through a single SQL interface
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Presto and Trino engines at Meta support connectors for HDFS,
                object storage, and operational databases for cross system
                analytics
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Google BigQuery Omni uses federation to query data across
                multiple clouds without data movement
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataFederationWhatIsDataFederation;
