import type { Component } from "solid-js";

const LessonDataVirtualizationWhatIsDataVirtualization: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Virtualization?
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
              <strong>Data Virtualization</strong> creates a logical data layer
              that provides a unified view of data across multiple systems
              without physically copying or moving that data into a single
              storage location.
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Problem It Solves:
          </div>
          Modern companies have data scattered everywhere. You have
          transactional databases in multiple regions, SaaS applications like
          Salesforce, logs in object storage, a data warehouse, and maybe a data
          lake. Each system was never designed to work together. A product
          manager wants to see a complete customer profile with order history
          from the database, support tickets from Zendesk, and marketing
          campaigns from HubSpot. Traditionally, you would use Extract,
          Transform, Load (ETL) processes to copy all this data into a central
          warehouse every night.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            How Virtualization Changes This:
          </div>
          Instead of copying, data virtualization creates virtual tables that
          look and feel like regular database tables to users. When someone
          queries a virtual "Customer" table, the virtualization engine knows
          that{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            customer_id
          </code>{" "}
          comes from PostgreSQL,{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            email
          </code>{" "}
          comes from the CRM, and{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            lifetime_value
          </code>{" "}
          comes from the data warehouse. The platform decomposes your query into
          subqueries for each source system, executes them in parallel, and
          joins the results in memory. You get fresh data directly from systems
          of record without waiting for overnight batch jobs. Security policies
          and access controls are applied at the virtual layer, so even if
          underlying systems have inconsistent permissions, you enforce
          governance consistently.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">
                  User Query: Customer 360
                </strong>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Virtualization Engine</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Decomposes &amp; orchestrates
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap">
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>PostgreSQL</strong>
                  <div style="font-size: 10px">Orders</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Salesforce</strong>
                  <div style="font-size: 10px">Profiles</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Snowflake</strong>
                  <div style="font-size: 10px">Analytics</div>
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
                Data virtualization creates a logical abstraction layer over
                physical data sources, allowing unified queries without data
                movement
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The engine translates user queries into multiple source specific
                subqueries, executes them in parallel, and combines results in
                memory
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Enables access to fresh data directly from systems of record,
                avoiding staleness from overnight ETL batch processes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Centralizes governance with consistent access control, masking,
                and auditing across heterogeneous systems with different
                security models
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
                A business intelligence dashboard queries a virtual Customer
                table. The engine fetches customer_id and address from a
                regional PostgreSQL database, email and preferences from
                Salesforce API, and purchase history from a Snowflake warehouse,
                joining all three in memory to return unified results.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An e-commerce company with 3 regional transactional databases, a
                CRM system, and a data warehouse uses virtualization to provide
                a Customer 360 API, giving product teams a single interface to
                query customer data without building custom integrations to each
                backend system.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataVirtualizationWhatIsDataVirtualization;
