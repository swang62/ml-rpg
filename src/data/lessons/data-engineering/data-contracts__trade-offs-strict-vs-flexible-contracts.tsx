import type { Component } from "solid-js";

const LessonDataContractsTradeOffsStrictVsFlexibleContracts: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Trade-offs: Strict vs Flexible Contracts
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Central Question:</strong> Data contracts trade
          flexibility and speed of change for reliability and predictability.
          The decision is not whether to have contracts, but how strict to make
          them and who controls them.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Strong Contracts
              </div>
              <div style="font-size: 12px">
                Reject incompatible schemas at ingestion, fail CI on breaking
                changes, strict SLAs
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Weak Contracts
              </div>
              <div style="font-size: 12px">
                Schemas as documentation, best effort SLAs, producer autonomy
              </div>
            </div>
          </div>
          <strong>Strong Contracts: When Data is Critical</strong>
          Strict enforcement with validation that rejects incompatible schemas
          at ingestion shifts failures left. Producers discover problems in CI
          pipelines rather than production. This matters for high value use
          cases: billing systems, financial reporting, or core recommendation
          models where silent corruption causes revenue loss or regulatory
          issues. The trade off is slower producer velocity. A feature team
          wanting to add multi currency support might need approval from 15
          downstream consumers, schema review, and a 90 day deprecation plan.
          For fast moving products or A/B testing frameworks, this feels heavy.
          Feature velocity drops from weekly to monthly releases.
          <strong>Weak Contracts: When Exploration Matters</strong>
          Best effort SLAs and documentation only contracts give producers
          autonomy. This works for early stage products, experimental analytics,
          or low risk reporting where occasional data quality issues are
          acceptable. Data scientists exploring new features can iterate quickly
          without coordination overhead. The cost shows up in incidents and on
          call burden. Data engineering teams spend more time firefighting.
          Downstream jobs need defensive logic: checking for nulls, handling
          schema mismatches, and backfilling when completeness drops. At one
          company, weak contracts for an exploratory product meant 3 incidents
          per week. When the product became critical, retrofitting strict
          contracts took 6 months.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The decision is not strict versus flexible across the board. It
              is mapping contract strength to business criticality."
            </div>
          </div>
          <strong>Central Governance vs Data Mesh</strong>
          Central governance with a data platform team defining standard
          templates, naming conventions, and SLA tiers enforces consistency.
          With 500+ producers, common guarantees prevent chaos. However, local
          decisions slow down. Every schema change needs central approval. Data
          mesh style federated ownership lets domain teams own contracts with
          platform enforcing only minimal requirements: schema registration and
          observability hooks. This improves autonomy but creates inconsistent
          SLA quality. One team might offer 99.99 percent availability while
          another offers best effort.
          <strong>SLA Cost Reality</strong>
          Achieving 99.99 percent freshness for real time data requires multi
          region pipelines, extra replicas, and 24/7 on call coverage. Costs
          might be 5x higher than 99 percent daily batch SLAs. Tie SLA levels to
          business value. A fraud detection system justifies 99.99 percent
          uptime. An internal analytics dashboard might not.
          <strong>Decision Framework:</strong> Choose strong contracts with
          strict SLAs when data drives revenue, compliance, or customer facing
          features. Use weak contracts for exploration, internal tools, or non
          critical analytics. Start weak for new products, tighten as they
          mature. Define SLA levels based on business impact, not technical
          perfection.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="font-size: 13px; font-weight: 700; margin-bottom: 12px; text-align: center">
              Contract Strength by Use Case
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="flex: 0 0 140px; font-size: 12px; font-weight: 600">
                  Billing / Finance
                </div>
                <div style="flex: 1; height: 28px; border: 2px solid; border-radius: 4px; position: relative">
                  <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 11px; font-weight: 700">
                    STRICT
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="flex: 0 0 140px; font-size: 12px; font-weight: 600">
                  Core ML Models
                </div>
                <div style="flex: 1; height: 28px; border: 2px solid; border-radius: 4px; position: relative">
                  <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 11px; font-weight: 700">
                    STRICT
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="flex: 0 0 140px; font-size: 12px; font-weight: 600">
                  Analytics Dashboards
                </div>
                <div style="flex: 1; height: 28px; border: 2px solid; border-radius: 4px; position: relative">
                  <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 11px; font-weight: 700">
                    MEDIUM
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="flex: 0 0 140px; font-size: 12px; font-weight: 600">
                  Experimental Data
                </div>
                <div style="flex: 1; height: 28px; border: 2px solid; border-radius: 4px; position: relative">
                  <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 11px; font-weight: 700">
                    FLEXIBLE
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
                Strong contracts reduce silent corruption but slow producer
                velocity: feature releases drop from weekly to monthly with 90
                day deprecation requirements
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Weak contracts enable fast iteration for exploration but create
                3+ incidents per week and require defensive downstream logic
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Central governance ensures consistency across 500+ producers but
                requires approval for every schema change; data mesh improves
                autonomy but creates inconsistent SLA quality
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Achieving 99.99% freshness costs 5x more than 99% daily SLAs due
                to multi region infrastructure, extra replicas, and 24/7 on call
                coverage
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Decision framework: Map contract strength to business
                criticality. Start weak for new products, tighten as they mature
                and impact revenue or compliance
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
                Strong contract use case: Billing system at ecommerce company
                processes 5,000 writes/sec with zero tolerance for data loss,
                requires strict schema validation and 99.99% availability
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Weak contract scenario: Early stage product used best effort
                SLAs, caused 3 incidents per week; retrofitting strict contracts
                after product became critical took 6 months
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cost comparison: Real time fraud detection with 99.99% SLA needs
                multi region setup costing 5x more than batch analytics with 99%
                daily SLA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataContractsTradeOffsStrictVsFlexibleContracts;
