import type { Component } from "solid-js";

const LessonReverseEtlWhatIsReverseEtl: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Reverse ETL?
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
              <strong>Reverse ETL</strong> is a data integration pattern that
              extracts data from analytical data warehouses and loads it back
              into operational business tools like CRMs, marketing platforms,
              and support systems.
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Problem:
          </div>
          Traditional ETL (Extract, Transform, Load) moves data from operational
          systems INTO warehouses for analysis. Product events, billing data,
          and support tickets flow into a central warehouse where data teams
          build valuable models. For example, a machine learning pipeline might
          compute churn risk scores for 100,000 customer accounts by analyzing 2
          billion product usage events. But here's where it breaks: those
          insights stop at the warehouse. The sales team still works in
          Salesforce with stale data. Marketing teams use HubSpot without
          knowing which users show high purchase intent. Support reps in Zendesk
          cannot see which accounts are at risk. The valuable intelligence that
          cost days of engineering work sits locked in dashboards that nobody
          acts on.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            How Reverse ETL Fixes This:
          </div>
          Reverse ETL flips the direction. It treats your warehouse as the
          source system and operational tools as destinations. Instead of data
          flowing from Salesforce TO the warehouse, it flows from warehouse TO
          Salesforce. The warehouse becomes the single source of truth, and
          business tools automatically stay synchronized with your best
          analytical models.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> A typical flow extracts curated data
            from warehouse tables like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_health_scores
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              account_segments
            </code>
            , transforms the data to match each tool's schema requirements, and
            loads it through their APIs.
          </div>
          This pattern gives data teams control over business definitions.
          Instead of each tool having its own logic for "high value customer" or
          "product qualified lead", those definitions live in SQL models in one
          place, then propagate everywhere they're needed.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Operational Systems</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  SaaS apps, product events
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">
                ↓ Traditional ETL
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Data Warehouse</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Models, scores, segments
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">
                ↓ Reverse ETL
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Business Tools</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  CRM, marketing, support
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
                Reverse ETL inverts traditional data flow by treating the
                warehouse as a source and operational tools as destinations
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Solves the problem of valuable analytical insights remaining
                locked in dashboards instead of reaching tools where humans take
                action
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Typical use cases include syncing churn risk scores to CRMs,
                customer segments to marketing platforms, and product usage data
                to support systems
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Enables single source of truth architecture where business logic
                and metric definitions live in warehouse SQL models
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Differs from traditional ETL which moves data FROM operational
                systems INTO warehouses for analysis
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
                A B2B SaaS company computes churn risk scores from 2 billion
                product events in their warehouse, then uses Reverse ETL to push
                updated scores for 50,000 accounts every 5 minutes to
                Salesforce, Zendesk, and Marketo
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An ecommerce platform calculates customer lifetime value in
                their warehouse and syncs high value customer flags to their
                email marketing tool so campaigns can automatically personalize
                offers
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A fintech company builds fraud risk models in their warehouse
                and pushes daily risk scores to their support system so agents
                see warnings when interacting with suspicious accounts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonReverseEtlWhatIsReverseEtl;
