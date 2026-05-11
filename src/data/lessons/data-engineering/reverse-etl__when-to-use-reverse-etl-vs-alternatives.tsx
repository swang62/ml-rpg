import type { Component } from "solid-js";

const LessonReverseEtlWhenToUseReverseEtlVsAlternatives: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          When to Use Reverse ETL vs Alternatives
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Decision:
          </div>
          Reverse ETL makes sense when you want warehouse centric architecture:
          one place for business logic, governed metrics, and a single source of
          truth. But it introduces latency and operational complexity that other
          patterns avoid. The decision depends on your freshness requirements,
          organizational structure, and tolerance for coupling.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Point to Point Integrations
              </div>
              <div style="font-size: 12px">
                Fast, simple, but logic diverges across tools
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Reverse ETL
              </div>
              <div style="font-size: 12px">
                Centralized logic, but adds latency hop
              </div>
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Reverse ETL Works Best When:
          </div>
          First, you need consistent business definitions across tools. For
          example, you want "high value customer" defined once in SQL, not
          reimplemented differently in Salesforce rules, HubSpot workflows, and
          Zendesk automations. Second, your data teams already own
          transformation logic in the warehouse using dbt or similar tools.
          Third, you can tolerate minute level freshness. If your use case is
          "update CRM with yesterday's product usage" or "sync weekly cohort
          segments to marketing", Reverse ETL is ideal. A B2B SaaS company with
          100,000 accounts might compute churn risk scores nightly from complex
          models joining product events, support tickets, and billing data.
          Those scores feed dashboards, drive email campaigns, and help support
          agents prioritize outreach. Reverse ETL keeps all downstream systems
          synchronized with the canonical score without duplicating logic.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            When NOT to Use Reverse ETL:
          </div>
          If you need sub second latency for real time personalization, Reverse
          ETL is too slow. A streaming Customer Data Platform (CDP) like Segment
          or mParticle sits in the request path and can make decisions in under
          100 milliseconds. Reverse ETL with minute level freshness cannot
          compete here. If your operational teams need autonomy to edit data in
          their tools, Reverse ETL creates conflicts. Sales reps updating
          contact details in Salesforce will fight with nightly syncs
          overwriting their changes. You must choose precedence rules: last
          write wins, warehouse always wins, or bidirectional sync (which is
          complex and error prone). Some orgs solve this by making certain
          fields read only in the destination, but this reduces flexibility. If
          your data platform is not reliable, Reverse ETL becomes a critical
          failure point. When the warehouse is down for maintenance, syncs fail
          and operational tools go stale. Compare this to point to point
          integrations where each tool operates independently. You are trading
          resilience for consistency.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "Choose Reverse ETL when correctness and consistency matter more
              than speed. Choose streaming CDPs when latency is critical. Choose
              point to point when teams need independence."
            </div>
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Hybrid Approaches:
          </div>
          Many companies use a mix. Real time personalization flows through a
          streaming CDP that reacts to events in under 100 milliseconds. Batch
          enrichment like nightly churn scores and weekly cohort assignments
          flows through Reverse ETL. Point to point integrations handle one off
          needs like copying Stripe invoices directly into Salesforce without
          touching the warehouse. The key is matching the pattern to
          requirements. If 80% of your operational data needs can tolerate 5
          minute freshness, Reverse ETL gives you centralized control. The
          remaining 20% with strict latency needs justifies specialized
          solutions.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="margin-bottom: 12px; font-weight: 700; font-size: 14px; text-align: center">
              Decision Framework
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="display: flex; gap: 8px; align-items: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 6px; font-size: 12px; min-width: 140px; text-align: center; font-weight: 700">
                  Reverse ETL
                </div>
                <div style="font-size: 12px">
                  Minute freshness + Centralized logic
                </div>
              </div>
              <div style="display: flex; gap: 8px; align-items: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 6px; font-size: 12px; min-width: 140px; text-align: center; font-weight: 700">
                  Streaming CDP
                </div>
                <div style="font-size: 12px">
                  Sub 100ms + Real time personalization
                </div>
              </div>
              <div style="display: flex; gap: 8px; align-items: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 6px; font-size: 12px; min-width: 140px; text-align: center; font-weight: 700">
                  Point to Point
                </div>
                <div style="font-size: 12px">
                  Team autonomy + Simple one offs
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
                Reverse ETL is ideal when you need consistent business logic
                across tools and can tolerate minute level freshness, typically
                p50 of 2 to 5 minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Streaming CDPs outperform Reverse ETL for real time use cases
                requiring sub 100 millisecond latency like in product
                personalization or instant recommendations
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Operational team autonomy suffers with Reverse ETL since
                warehouse syncs can overwrite manual edits in tools like CRMs,
                requiring precedence rules or read only field restrictions
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Reverse ETL makes the data warehouse a critical dependency; when
                it is down for maintenance, all downstream operational tools go
                stale unlike independent point to point integrations
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid architectures are common: use Reverse ETL for 80% of
                batch enrichment needs with minute freshness, streaming CDPs for
                latency critical real time features, and point to point for
                simple one off integrations
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
                A fintech uses Reverse ETL for nightly fraud score updates to
                their support system (5 minute freshness acceptable) but uses a
                streaming CDP for real time transaction blocking decisions (sub
                100ms required)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An ecommerce company syncs customer lifetime value scores from
                their warehouse to Marketo every hour via Reverse ETL, but they
                use Stripe to Salesforce point to point sync for invoice data
                since it does not need warehouse transformation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                A SaaS company makes CRM fields like churn_risk_score and
                product_usage_tier read only and managed entirely by Reverse ETL
                to prevent sales reps from overwriting analytical values
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonReverseEtlWhenToUseReverseEtlVsAlternatives;
