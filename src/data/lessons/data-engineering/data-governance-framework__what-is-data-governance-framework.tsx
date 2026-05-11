import type { Component } from "solid-js";

const LessonDataGovernanceFrameworkWhatIsDataGovernanceFramework: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Data Governance Framework?
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
                <strong>Data Governance Framework</strong> is a set of policies,
                roles, and technical controls that define how data is created,
                classified, accessed, transformed, and retired across an
                organization. It ensures consistent, high quality, compliant
                data usage at scale.
              </div>
            </div>
            <strong>The Core Problem:</strong> At large scale companies,
            thousands of teams access tens of thousands of tables containing
            petabytes of data. Without governance, you get catastrophic
            failures: incorrect billing from inconsistent definitions, privacy
            violations from untracked Personally Identifiable Information (PII),
            and broken machine learning models from poor data quality. Tribal
            knowledge like "everyone knows table X has PII" breaks down when you
            have 200+ engineering teams. Think of governance as a contract
            between business, security, and engineering. Instead of manual
            processes, you need machine enforceable metadata and policies.
            <strong>The Five Pillars:</strong> Most frameworks at companies like
            LinkedIn, Netflix, and Uber converge on similar components:
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Data discovery and metadata:</strong> A catalog of
                  datasets, schemas, owners, Service Level Agreements (SLAs),
                  classifications, and lineage.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Data quality and observability:</strong> Automated
                  checks on freshness, completeness, accuracy, and distribution
                  shifts.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Security, privacy, and compliance:</strong>{" "}
                  Classification of PII, access control, encryption, retention,
                  and auditability.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Lineage and change management:</strong> End to end
                  tracking of how data flows through pipelines and who changed
                  what.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  5
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Lifecycle and ownership:</strong> Clear roles for data
                  owners, with defined retention, deprecation, and documentation
                  responsibilities.
                </div>
              </div>
            </div>
            <strong>Why It Matters:</strong> These pillars are embedded into
            pipelines and platforms, not managed manually. When a new data
            source is onboarded, engineers must register it with schema, owner,
            classification (public, internal, restricted, PII), and expected
            freshness. This metadata drives automated enforcement across your
            entire data infrastructure.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Raw Data Sources</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    500K events/sec
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Governance Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Metadata • Policies • Lineage
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">BI Marts</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">ML Features</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Real-Time Serving</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Analytics</strong>
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
                  Data governance is not a compliance checkbox but a set of
                  machine enforceable policies embedded in data infrastructure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without governance, large organizations face incidents like
                  incorrect billing, privacy violations, and broken ML models
                  from inconsistent data usage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The five pillars are metadata/discovery,
                  quality/observability, security/privacy, lineage/change
                  tracking, and lifecycle/ownership
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale (100K+ datasets), manual governance breaks down,
                  requiring automated metadata and policy systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Companies like LinkedIn use DataHub as central metadata
                  systems, with p99 latency targets under 200ms for catalog
                  queries
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
                  A streaming system ingesting 500,000 events per second (1KB
                  each, 40GB per hour) requires governance to track data
                  classification, owners, and quality metrics across all
                  downstream consumers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When onboarding a new payment events table, engineers register
                  it with owner (payments team), classification (restricted,
                  contains PII), freshness SLA (updated every 5 minutes), and
                  retention policy (raw data 30 days, aggregates 2 years)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn's DataHub manages lineage graphs with millions of
                  nodes and edges, tracking relationships like 'dataset B was
                  produced from A using job J version 3'
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataGovernanceFrameworkWhatIsDataGovernanceFramework;
