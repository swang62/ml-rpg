import type { Component } from "solid-js";

const LessonRegulatoryComplianceWhatIsRegulatoryComplianceForMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Regulatory Compliance for ML Systems?
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
                <strong>Regulatory Compliance for ML</strong> ensures systems
                meet legal requirements—GDPR (EU) and CCPA (California)—for
                collecting, processing, storing, and deleting personal data used
                in training and inference.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY ML FACES UNIQUE CHALLENGES
            </p>
            <p style="margin-top: 0">
              Traditional software stores data explicitly—compliance means
              finding and deleting records. ML is different: personal data
              influences model weights during training. Deleting source data may
              not remove its impact. ML also combines data across sources making
              consent tracking complex.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GDPR VS CCPA KEY DIFFERENCES
            </p>
            <p style="margin-top: 0">
              <strong>GDPR</strong> applies to EU residents. Requires explicit
              consent before processing, grants right to erasure, mandates
              72-hour breach notification. Fines reach 4% of global revenue.{" "}
              <strong>CCPA</strong> applies to California residents. Uses
              opt-out model (can collect but must honor deletion), grants right
              to know what data is collected.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> GDPR is opt-in (no processing
              without consent), CCPA is opt-out (can process until user
              objects). This fundamentally changes ML data pipeline design.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CORE COMPLIANCE REQUIREMENTS
            </p>
            <p style="margin-top: 0">
              <strong>Data Subject Rights:</strong> Users request access,
              correction, or deletion spanning training sets, features, and
              models. <strong>Purpose Limitation:</strong> Data for one purpose
              cannot power another without re-consent.{" "}
              <strong>Data Minimization:</strong> Collect only what you
              need—every unnecessary field increases compliance burden.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Compliance conflicts with ML
              best practices. More data improves models but minimization
              requires less. Design for compliance from the start—retrofitting
              is expensive.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">GDPR (EU)</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Opt-in consent required
                    <br />
                    Up to €20M or 4% revenue
                    <br />
                    72 hour breach reporting
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">CCPA (California)</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Opt-out model
                    <br />
                    $2,500 to $7,500 per violation
                    <br />
                    Right to know, delete, opt out
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">ML System Coverage</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Raw data + Features + Embeddings
                    <br />
                    Training datasets + Model outputs
                    <br />
                    Event logs + Aggregations
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
                  GDPR requires opt-in consent; CCPA allows opt-out after
                  collection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ML faces unique challenges: data influences model weights,
                  deletion is not straightforward
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Core requirements: data subject rights, purpose limitation,
                  data minimization
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
                  Understand consent model differences: GDPR opt-in
                  fundamentally changes pipeline design
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention purpose limitation—data for recommendations cannot
                  power fraud detection
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRegulatoryComplianceWhatIsRegulatoryComplianceForMlSystems;
