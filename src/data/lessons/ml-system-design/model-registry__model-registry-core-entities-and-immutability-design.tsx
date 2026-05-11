import type { Component } from "solid-js";

const LessonModelRegistryModelRegistryCoreEntitiesAndImmutabilityDesign: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model Registry Core Entities and Immutability Design
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                The registry has three entities: <strong>Model</strong> (logical
                grouping like "fraud-detection"), <strong>Version</strong>{" "}
                (immutable artifact from one training run), and{" "}
                <strong>Stage</strong> (pointer like dev/staging/prod). Versions
                never change; stages move between versions.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              VERSION IDENTITY
            </p>
            <p style="margin-top: 0">
              Each version gets a content hash computed over the model binary.
              Same weights = same hash. Verify a loaded model by recomputing the
              hash—no ambiguity about "which v1.2.3 is this?"
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              VERSION METADATA
            </p>
            <p style="margin-top: 0">
              Each version stores: artifact location, model signature
              (input/output schema), training metadata (data snapshot,
              hyperparameters, git commit), evaluation metrics (accuracy,
              latency), and governance data (approver, timestamp, risk tier).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> The model signature defines the
              contract: which features, what types, what preprocessing.
              Mismatched signatures cause silent accuracy degradation.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY IMMUTABILITY
            </p>
            <p style="margin-top: 0">
              Once registered, a version cannot be modified—only deprecated.
              This prevents "worked yesterday" bugs where someone tweaks
              production models. Need changes? Create a new version. Rollback
              becomes trivial and audit straightforward.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STAGES AS POINTERS
            </p>
            <p style="margin-top: 0">
              Stages (dev, staging, prod) are mutable pointers to immutable
              versions. Promoting means moving the prod pointer from v1.23 to
              v1.24. Versions do not change. This enables atomic promotion and
              instant rollback.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Immutability increases storage.
              Typical retention: keep last 10 prod versions, archive older,
              retain metadata indefinitely for compliance.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Model: fraud_detection</strong>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Version: sha256:a3f2...</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Artifact: 1.2GB, Signature: 50 features
                  </div>
                  <div style="font-size: 12px">
                    Metrics: Precision 0.89, Recall 0.76
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>Stage: Production → sha256:a3f2...</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Approved by: user@company.com
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
                  Three core entities: Model (logical group), Version (immutable
                  artifact), Stage (mutable pointer)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Version identity via content hash—same weights = same hash,
                  guarantees what you registered is what loads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model signature defines the contract: input features, types,
                  preprocessing version
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Immutability prevents worked-yesterday bugs; changes require
                  new versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stages as pointers enable atomic promotion and instant
                  rollback
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
                  Explain that versions are immutable but stages are mutable
                  pointers that move between versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention model signature as critical for preventing silent
                  accuracy degradation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelRegistryModelRegistryCoreEntitiesAndImmutabilityDesign;
