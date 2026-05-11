import type { Component } from "solid-js";

const LessonRegulatoryComplianceImplementingDsarOrchestrationAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementing DSAR Orchestration at Scale
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
                <strong>DSAR Orchestration</strong> handles user requests for
                data access, correction, portability, or deletion across all
                systems within regulatory timeframes.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              REQUEST INTAKE AND VERIFICATION
            </p>
            <p style="margin-top: 0">
              Users submit via web, email, or API. First: verify identity
              (email/SMS/login) to prevent malicious requests. GDPR requires
              response within 30 days; CCPA 45 days. Log receipt timestamp for
              SLA tracking. Route by type: access, deletion, correction, or
              portability.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA DISCOVERY AND MAPPING
            </p>
            <p style="margin-top: 0">
              Orchestrator queries all sources: databases, feature stores,
              training sets, logs, vendors. Each implements a standard
              interface. Maintain a data catalog mapping identifiers to
              storage—without this, DSARs fail silently.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> DSAR requires an identity graph.
              Users may be email in one system, user_id in another, device_id in
              a third. Without unified resolution, you cannot find all their
              data.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EXECUTION AND CONFIRMATION
            </p>
            <p style="margin-top: 0">
              For deletion: execute in all systems, confirm, retry failures.
              Handle eventual consistency. For access: aggregate into portable
              format. Generate confirmation report. Store audit evidence for
              regulators.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SCALE CONSIDERATIONS
            </p>
            <p style="margin-top: 0">
              At 100M users, expect 50-500 DSARs daily. Automate
              everything—manual cannot scale. Batch similar requests. Queue to
              avoid overwhelming stores. Monitor SLA and alert on approaching
              deadlines.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Full automation requires
              standardized interfaces—significant investment. Many start
              semi-automated: automated discovery, manual approval, automated
              execution.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong>DSAR Request</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    1K to 10K per day
                    <br />
                    Dedupe + Authenticate
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong>Orchestrator</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    10 to 50 req/sec sustained
                    <br />
                    Burst to 200 req/sec
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px; text-align: center">
                    <strong>Online Store</strong>
                    <br />
                    Minutes
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px; text-align: center">
                    <strong>Warehouse</strong>
                    <br />
                    24 hours
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px; text-align: center">
                    <strong>Models</strong>
                    <br />
                    Weekly
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong>Target: 95% in 7 days</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    30 days GDPR / 45 days CCPA
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
                  DSAR requires identity verification, discovery across systems,
                  execution with confirmation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Identity graph essential—users have different identifiers
                  across systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale: 50-500 DSARs daily for 100M users; automation
                  required
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
                  Design DSAR: intake, identity resolution, discovery,
                  execution, audit
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention SLAs: GDPR 30 days, CCPA 45 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRegulatoryComplianceImplementingDsarOrchestrationAtScale;
