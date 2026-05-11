import type { Component } from "solid-js";

const LessonDataContractsImplementationBuildingTheContractInfrastructure: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation: Building the Contract Infrastructure
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Four Layer Architecture:</strong> Production grade
            contract systems need a registry layer, validation layer,
            observability layer, and governance layer. Each serves a distinct
            purpose in the contract lifecycle.
            <strong>Layer One: Contract Registry</strong>
            Producers define schemas, field level metadata, semantic
            descriptions, and SLA definitions in a central system. Contracts
            reference specific storage like message topics, event queues, or
            warehouse tables. Versioning is explicit:{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_events.v1
            </code>{" "}
            versus{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_events.v2
            </code>{" "}
            with machine readable compatibility rules.
            <strong>Layer Two: Validation Pipeline</strong>
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>CI Time Validation:</strong> When developers change
                  schemas, CI jobs validate against declared contracts. Checks
                  include prohibited actions like dropping required fields,
                  changing data types, or altering semantic units without
                  versioning.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Ingestion Time Validation:</strong> Runtime validators
                  check incoming data. Streaming systems use schema aware
                  consumers that reject malformed messages. Batch systems run
                  validation before loading: sampling or full scans checking
                  schema, null percentages, uniqueness, and value range
                  constraints.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Quarantine Handling:</strong> Invalid data routes to
                  quarantine topics or tables for investigation rather than
                  corrupting downstream systems.
                </div>
              </div>
            </div>
            <strong>Layer Three: Observability and SLIs</strong>
            Service Level Indicators (SLIs) are computed continuously. For a{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              clickstream
            </code>{" "}
            topic, SLIs include ingestion lag at p95 and p99 percentiles, daily
            completeness (actual events versus expected from upstream counters),
            schema violation rate, and derived table availability. Each SLI has
            a target: "99 percent of events available within 10 minutes" or
            "schema violations under 0.1 percent."
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Tracking only averages hides
              systematic failures. A pipeline promising 03:00 UTC delivery at
              99.9% success might fail every month end when volume spikes 3x.
              Use percentile based metrics and error budget tracking.
            </div>
            <strong>Layer Four: Governance Process</strong>A data platform team
            owns the registry, common libraries, validators, and observability
            stack. Domain teams own their contracts and meet SLAs. Governance
            handles escalations: breaking change requests, SLA renegotiations
            when traffic grows from 10,000 to 100,000 events per second, or
            ownership transfers during team reorganizations.
            <strong>Error Budgets Drive Priority:</strong> If a pipeline burns
            its quarterly error budget (example: violates SLA 5 times when
            budget allows 2 violations), producers or platform must prioritize
            reliability work over new features. This creates accountability
            similar to site reliability engineering practices.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Four architectural layers: Registry for schemas and SLAs,
                  Validation at CI and ingestion time, Observability for SLI
                  tracking, Governance for escalations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CI validation blocks incompatible schema changes before
                  deployment; ingestion validation routes bad data to quarantine
                  instead of corrupting downstream
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SLIs must track percentiles not averages: a pipeline might
                  meet 99.9% average SLA but fail systematically at month end
                  during 3x volume spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Error budgets quantify allowed deviation per quarter; burning
                  the budget triggers mandatory reliability work prioritization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Platform team owns infrastructure; domain teams own their
                  contracts and meeting SLAs; governance handles breaking
                  changes and ownership transfers
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
                  SLI configuration for &lt;code&gt;clickstream&lt;/code&gt;:
                  ingestion lag p95/p99, daily completeness rate, schema
                  violation rate &lt; 0.1%, derived
                  &lt;code&gt;sessions&lt;/code&gt; table availability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Error budget enforcement: pipeline with 2 violation budget
                  that fails SLA 5 times in a quarter must pause features for
                  reliability work
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Governance escalation: traffic growing from 10k to 100k
                  events/sec requires SLA renegotiation and infrastructure
                  scaling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataContractsImplementationBuildingTheContractInfrastructure;
