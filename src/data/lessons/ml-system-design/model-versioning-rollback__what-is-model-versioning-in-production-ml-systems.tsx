import type { Component } from "solid-js";

const LessonModelVersioningRollbackWhatIsModelVersioningInProductionMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Model Versioning in Production ML Systems?
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
                <strong>Model versioning</strong> treats every deployable model
                as an immutable, uniquely identifiable artifact that includes
                not just trained weights, but also training code version,
                feature definitions, dataset snapshot pointer, and runtime
                environment. This comprehensive approach ensures any historical
                model can be reconstructed exactly and redeployed if needed.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Full Lineage Matters
            </p>
            <p style="margin-top: 0">
              Without full lineage, rollback becomes dangerous. Imagine rolling
              back just the model binary but the feature preprocessing changed:
              your old model receives inputs it was never trained on, silently
              degrading accuracy by 10 to 20 percent while infrastructure
              metrics look fine. The model thinks it is receiving normalized
              values between 0 and 1, but the new preprocessing emits
              unnormalized floats. Latency is great, error rate is zero, but
              predictions are garbage.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Registry Architecture
            </p>
            <p style="margin-top: 0">
              Netflix, Uber, LinkedIn, and Airbnb all maintain central model
              registries that track complete lineage with explicit lifecycle
              states: Staging, Canary, Production, and Archived. Artifacts are
              stored with content addressable identifiers (cryptographic hash)
              for immutability and semantic versions (v2.3.1) for human
              readability. The manifest records the exact code commit,
              hyperparameters, feature schema versions, and dataset snapshot.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Time Travel Debugging
            </p>
            <p style="margin-top: 0">
              At Uber's scale (millions of predictions per second), this
              discipline enables forensic debugging: engineers can time travel
              to reproduce the exact model that served a request three weeks
              ago, including the feature values it saw. When a customer
              complains about a bad ETA prediction, engineers can reconstruct
              the entire inference context and verify whether the model behaved
              correctly given its inputs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Version Tuple Components
            </p>
            <p style="margin-top: 0">
              A complete version tuple contains: model artifact (weights,
              architecture), training code version (git SHA), feature
              definitions and transformations (schema version), dataset snapshot
              pointer (timestamp or hash), runtime environment (container image,
              library versions), and configuration (hyperparameters,
              thresholds). Missing any component breaks reproducibility.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Model Version v2.3.1</strong>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-left: 20px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Model Artifact</strong>
                    <br />
                    weights.pb (200MB)
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Training Code</strong>
                    <br />
                    commit: a3f9c2e
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Feature Schema</strong>
                    <br />
                    v5 (127 features)
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Dataset Snapshot</strong>
                    <br />
                    2024-01-15T00:00Z
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Environment</strong>
                    <br />
                    Python 3.9, TF 2.12
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px">
                    <strong>Lifecycle State</strong>
                    <br />
                    Production
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
                  A complete model version includes the trained weights,
                  training code commit, feature schema version, dataset snapshot
                  pointer, and runtime environment dependencies for full
                  reproducibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Immutable artifacts use content addressable identifiers
                  (cryptographic hash) for technical uniqueness and semantic
                  versioning (v2.3.1) for human operators
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Central model registries with lifecycle states (Staging,
                  Production, Archived) provide governance, auditability, and a
                  single source of truth across the organization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature and data versioning with time travel capability
                  enables forensic debugging: you can reconstruct exactly what
                  inputs a model saw for any historical prediction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without full lineage tracking, rollback risks training serving
                  skew where old models receive incompatible inputs, causing
                  silent accuracy degradation of 10 to 20 percent
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
                  Uber's Michelangelo platform maintains complete lineage so
                  engineers can reproduce any model from the past 90 days,
                  including the exact feature values that were computed for
                  forensic investigation of prediction anomalies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn's Pro ML system versions feature definitions in
                  Venice feature store, linking each model to specific feature
                  schema versions to prevent serving models with incompatible
                  input transformations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelVersioningRollbackWhatIsModelVersioningInProductionMlSystems;
