import type { Component } from "solid-js";

const LessonRegulatoryComplianceFourPlanesOfCompliantMlArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Four Planes of Compliant ML Architecture
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
                A <strong>compliant ML architecture</strong> separates into four
                planes: Data (storage/lineage), Control (consent/policy),
                Processing (training/inference), and Audit (logging/evidence).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA PLANE: STORAGE AND LINEAGE
            </p>
            <p style="margin-top: 0">
              Stores raw data, training datasets, and features with complete
              lineage. Every piece traces to source and consent basis.
              Requirements: immutable access logs, automatic retention
              enforcement, encryption. When deletion requests arrive, identifies
              all locations with that user data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONTROL PLANE: CONSENT AND POLICY
            </p>
            <p style="margin-top: 0">
              Manages consent records and policy enforcement. Maintains registry
              mapping users to permissions per purpose. Before processing: "Can
              I use user X data for purpose Y?" Handles DSARs—orchestrating
              retrieval, deletion, or portability across systems.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Centralize consent. Distributed
              consent across services leads to inconsistencies—one service may
              process data the user revoked elsewhere.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROCESSING PLANE: TRAINING AND INFERENCE
            </p>
            <p style="margin-top: 0">
              Runs training and inference only after consent verification.
              Pipelines record which data points contributed to each model
              version. Inference checks consent before personalized
              predictions—if revoked, serve defaults.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AUDIT PLANE: LOGGING AND EVIDENCE
            </p>
            <p style="margin-top: 0">
              Captures immutable evidence for regulators. Every data access,
              consent change, and processing decision logged. Provides
              timestamped proof of deletion. Audit logs often persist longer
              than the data itself.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Four planes add latency and
              complexity. Small teams may start with two (data + audit) and
              separate control/processing as scale demands.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Consent &amp; Policy Plane</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Consent store: &lt;10ms p99 latency
                    <br />
                    Purpose tags per subject
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Data Inventory &amp; Lineage</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    5K to 20K datasets cataloged
                    <br />
                    10 PB data lake coverage
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Training &amp; Unlearning</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    1K to 10K DSARs/day
                    <br />
                    10 to 50 req/sec sustained, 200 burst
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Inference &amp; Audit Plane</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Runtime policy checks
                    <br />
                    12 to 24 month immutable logs
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
                  Data plane handles storage/lineage; control plane manages
                  consent and DSAR orchestration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Processing plane verifies consent; audit plane captures
                  immutable evidence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralize consent—distributed tracking causes inconsistencies
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
                  Describe four-plane architecture when asked about compliance
                  design
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize control plane as single source of truth
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRegulatoryComplianceFourPlanesOfCompliantMlArchitecture;
