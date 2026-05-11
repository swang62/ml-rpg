import type { Component } from "solid-js";

const LessonRegulatoryComplianceDangerousFailureModesInPrivacyCompliance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dangerous Failure Modes in Privacy Compliance
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
                <strong>Privacy compliance failures</strong> occur when systems
                believe they are compliant but actually retain or expose
                personal data—often discovered during audits with severe
                consequences.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SHADOW COPIES IN UNEXPECTED PLACES
            </p>
            <p style="margin-top: 0">
              Data exists in more places than tracked: logs, snapshots, backups,
              CDN caches, search indexes, queues. Deletion from primary database
              leaves copies in many other locations. Audit all data flows—not
              just obvious ones.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL MEMORIZATION
            </p>
            <p style="margin-top: 0">
              Large models can memorize training examples verbatim. A language
              model may output user emails when prompted. Even after deleting
              source data, models retain it. Detection: membership inference
              attacks. Mitigation: differential privacy, output filtering.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Model memorization is real.
              Researchers extracted credit cards and phone numbers from
              production models. Treat models as potential data stores requiring
              compliance.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IDENTIFIER MISMATCH
            </p>
            <p style="margin-top: 0">
              User requests deletion by email, but ML uses internal user_id.
              DSAR orchestrator cannot map—deletion fails silently. Systems
              report success while data remains. Solution: universal identity
              graph linking all identifiers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THIRD-PARTY VENDOR GAPS
            </p>
            <p style="margin-top: 0">
              Data shared with vendors does not get deleted. GDPR holds you
              responsible for processor compliance. Require contractual deletion
              SLAs and track lineage across organizational boundaries.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Comprehensive compliance
              requires auditing every touchpoint—expensive and complex.
              Prioritize high-risk areas: models, databases, major vendors.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Day 0: User Deletion Request
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Raw events deleted in 24 hours
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Days 1 to 30: Compliance Leak
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Session embeddings still in feature store
                    <br />
                    Models continue using derived features
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Violation</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Decisions based on deleted user data
                    <br />
                    Noncompliant with deletion request
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
                  Shadow copies exist in logs, backups, caches, queues—audit all
                  flows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Models memorize training data; run membership inference to
                  detect
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Identifier mismatches cause silent deletion failures
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
                  Audit all locations: logs, backups, CDN, indexes, queues
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention memorization—researchers extracted PII from production
                  models
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRegulatoryComplianceDangerousFailureModesInPrivacyCompliance;
