import type { Component } from "solid-js";

const LessonDataContractsWhatAreDataContractsAndSlas: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What Are Data Contracts and SLAs?
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
              <strong>Data Contracts</strong> are formal agreements between data
              producers and consumers that specify schema, data types, allowed
              values, semantics, ownership, and evolution rules.{" "}
              <strong>Service Level Agreements (SLAs)</strong> add measurable
              performance and reliability guarantees to these contracts.
            </div>
          </div>
          <strong>The Core Problem:</strong> In large engineering organizations,
          teams ship features constantly. An application team might rename{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>{" "}
          to{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            customer_id
          </code>{" "}
          or change{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            amount
          </code>{" "}
          from cents to dollars. Without explicit agreements, downstream data
          teams discover these changes when dashboards break, Machine Learning
          (ML) models silently degrade, or pipelines fail at 2 AM.
          <strong>Data Contracts Define Structure:</strong> A contract for a{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_signup
          </code>{" "}
          event stream might specify that every event must contain a non null{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>
          , a{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            created_at
          </code>{" "}
          timestamp in Coordinated Universal Time (UTC), and a{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            country_code
          </code>{" "}
          following ISO 3166 standard. It also defines evolution rules: fields
          must remain backward compatible for at least 90 days.
          <strong>SLAs Define Performance:</strong> SLAs translate to Service
          Level Objectives (SLOs) with measurable Service Level Indicators
          (SLIs). For example, "95 percent of events arrive in the data
          warehouse within 5 minutes, 99 percent within 15 minutes" or "daily
          orders table is available by 03:00 UTC with 99.9 percent success rate
          over a quarter."
          <strong>The Analogy:</strong> Think of data contracts like APIs for
          data. Just as a REST API defines endpoints, request formats, response
          schemas, and uptime guarantees, data contracts define what data is
          produced, in what format, with what quality, and how reliably. This
          transforms data pipelines from fragile, undocumented systems into
          production grade infrastructure with explicit expectations.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Data Producer</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Order Service
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Data Contract</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Schema + SLA: 99% &lt; 15min
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="display: flex; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Analytics</strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>ML Models</strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Dashboards</strong>
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
                Data contracts are formal agreements specifying schema, types,
                semantics, and evolution rules between producers and consumers
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                SLAs add measurable performance guarantees through SLOs
                (targets) and SLIs (metrics like freshness, completeness,
                availability)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Contracts define the 'what' (structure and semantics), while
                SLAs define the 'how well and how fast' (performance and
                reliability)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                This approach transforms data pipelines into production grade
                systems with explicit expectations, similar to API contracts for
                microservices
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
                Contract example: &lt;code&gt;user_signup&lt;/code&gt; stream
                requires non null &lt;code&gt;user_id&lt;/code&gt;, UTC
                &lt;code&gt;created_at&lt;/code&gt; timestamp, ISO 3166
                &lt;code&gt;country_code&lt;/code&gt;, with 90 day backward
                compatibility
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                SLA example: 95% of events arrive within 5 minutes, 99% within
                15 minutes, measured by ingestion lag percentiles
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                SLA example: Daily orders table available by 03:00 UTC with
                99.9% quarterly success rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataContractsWhatAreDataContractsAndSlas;
