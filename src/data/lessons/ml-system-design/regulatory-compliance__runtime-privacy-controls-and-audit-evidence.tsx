import type { Component } from "solid-js";

const LessonRegulatoryComplianceRuntimePrivacyControlsAndAuditEvidence: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Runtime Privacy Controls and Audit Evidence
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
                <strong>Runtime privacy controls</strong> enforce compliance
                during live inference, while <strong>audit evidence</strong>{" "}
                provides immutable proof for regulatory inquiries.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONSENT ENFORCEMENT AT INFERENCE
            </p>
            <p style="margin-top: 0">
              Before personalized predictions, check user consent. Query consent
              service with user_id and purpose. Cache decisions locally (TTL
              5-15 minutes) to reduce latency. If revoked or missing, fall back
              to non-personalized defaults. Log every check for audit.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PURPOSE LIMITATION AT RUNTIME
            </p>
            <p style="margin-top: 0">
              Data for purpose A cannot be used for purpose B without
              re-consent. Tag every access with purpose. Feature store returns
              different sets based on purpose: recommendation features only for
              purpose=recommendations. Violations trigger alerts and block
              processing.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Purpose limitation must be
              enforced at data layer, not application. Applications make
              mistakes. Feature store should reject purpose violations—no
              exceptions.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IMMUTABLE AUDIT LOGS
            </p>
            <p style="margin-top: 0">
              Log every privacy action immutably: consent changes, data access,
              DSAR processing, deletions. Use append-only storage. Include
              timestamps, actor, action, outcome. Regulators may request logs
              years later—retention often exceeds data retention.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AUDIT EVIDENCE GENERATION
            </p>
            <p style="margin-top: 0">
              When regulators inquire, generate reports: consent records, data
              accesses, DSAR handling with timestamps. Automate—manual
              compilation takes weeks. Include cryptographic hashes proving log
              integrity.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Comprehensive logging increases
              storage and latency. Retain detailed logs 90 days, summarized 7
              years. Balance regulatory requirements with cost.
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
                  Check consent at inference; cache with 5-15 min TTL, fallback
                  to non-personalized
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Purpose limitation enforced at data layer, not application
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Immutable audit logs with cryptographic integrity for
                  regulators
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
                  Describe consent check: query, cache, fallback on revocation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention purpose limitation at feature store level
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRegulatoryComplianceRuntimePrivacyControlsAndAuditEvidence;
