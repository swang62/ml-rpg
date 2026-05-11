import type { Component } from "solid-js";

const LessonDataContractsHowDataContractsWorkAtScale: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          How Data Contracts Work at Scale
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Scale Challenge:</strong> At companies processing
          thousands of events per second across hundreds of microservices,
          uncontrolled changes cascade into chaos. An ecommerce order service
          handling 5,000 writes per second publishes{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            OrderPlaced
          </code>{" "}
          events to both real time fraud models and batch analytics. Without a
          contract, renaming a field silently corrupts downstream aggregates
          within minutes at 10,000 events per second.
          <strong>The Contract Registry:</strong> Producers register schemas in
          a central catalog with machine readable compatibility rules. When the
          order service wants to change from{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            amount
          </code>{" "}
          in cents to dollars, the contract specifies "backward compatible
          changes only" with 90 day deprecation for breaking changes. The
          registry might be built on tools like schema registries that integrate
          with streaming platforms.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Real Time Fraud vs Batch Analytics
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">500ms</div>
                <div style="font-size: 10px; font-weight: 600">
                  P99 FRAUD SLA
                </div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">15min</div>
                <div style="font-size: 10px; font-weight: 600">
                  ANALYTICS SLA
                </div>
              </div>
            </div>
          </div>
          <strong>Different SLAs for Different Needs:</strong> Fraud scoring
          needs events within 500 milliseconds p99 latency to block suspicious
          transactions. This drives architectural choices: streaming ingestion
          with low latency storage. Batch analytics only needs Timestamp plus 15
          minutes freshness but requires 99.9 percent daily completeness. This
          allows cheaper batch ingestion.
          <strong>Runtime Enforcement:</strong> At ingestion time, validators
          check incoming data against contracts. For streaming systems, schema
          aware consumers reject or route invalid messages to quarantine topics.
          For batch warehouse loads, validation steps sample or scan data,
          checking schema, null rates, uniqueness constraints, and value ranges.
          LinkedIn and Netflix build observability layers computing Service
          Level Indicators (SLIs) like freshness, row counts, and anomaly scores
          on each dataset.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Producer Continuous Integration (CI)
            pipelines validate schema changes against contracts before
            deployment. Incompatible changes fail the build, shifting failures
            left to development time rather than 2 AM on call incidents.
          </div>
          <strong>Organizational Integration:</strong> Downstream applications
          declare dependencies on specific contract versions. A recommendation
          service states it depends on{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_profile.v3
          </code>{" "}
          with p95 2 minute freshness and{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            recent_activity.v2
          </code>{" "}
          with 99.5 percent completeness. Platform teams understand blast radius
          and prioritize which sources need strongest guarantees.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Producer CI Pipeline</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Schema Change Proposed
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Contract Registry</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Validate Compatibility
                </div>
              </div>
              <div style="display: flex; gap: 16px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>✓ Pass</strong>
                  <div style="font-size: 10px">Deploy</div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>✗ Fail</strong>
                  <div style="font-size: 10px">Block</div>
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
                At 10,000 events per second scale, schema changes without
                contracts corrupt dashboards and ML models within minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Different consumers need different SLAs: fraud detection
                requires 500ms p99 latency, batch analytics needs 15 minute
                freshness with 99.9% completeness
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Producer CI pipelines validate schema changes against contracts
                before deployment, failing builds for incompatible changes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Runtime validators at ingestion check schemas, null rates,
                uniqueness, and value ranges, routing invalid data to quarantine
                topics
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Downstream applications declare explicit dependencies on
                contract versions and required SLAs, helping platform teams
                prioritize infrastructure investments
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
                Order service at 5,000 writes/sec publishes to fraud models
                (500ms p99 SLA) and batch analytics (15min freshness SLA)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Schema registry enforces 90 day backward compatibility: changing
                &lt;code&gt;amount&lt;/code&gt; from cents to dollars requires
                new version plus deprecation period
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Recommendation service depends on
                &lt;code&gt;user_profile.v3&lt;/code&gt; (p95 2min freshness)
                and &lt;code&gt;recent_activity.v2&lt;/code&gt; (99.5%
                completeness)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataContractsHowDataContractsWorkAtScale;
