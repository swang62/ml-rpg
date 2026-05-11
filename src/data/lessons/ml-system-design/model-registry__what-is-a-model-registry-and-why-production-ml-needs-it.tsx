import type { Component } from "solid-js";

const LessonModelRegistryWhatIsAModelRegistryAndWhyProductionMlNeedsIt: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is a Model Registry and Why Production ML Needs It
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
                A <strong>model registry</strong> is the single source of truth
                for ML models in production—tracking every version, its training
                lineage, approval status, and deployment bindings. It answers:
                "Which exact model is serving traffic right now?"
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE PROBLEM IT SOLVES
            </p>
            <p style="margin-top: 0">
              Without a registry: which model version is in production? Was it
              trained on the right data? Who approved it? Different services
              load different versions, rollbacks require guessing, compliance
              audits become archaeology. The registry makes model identity
              explicit and traceable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BRIDGING TRAINING AND SERVING
            </p>
            <p style="margin-top: 0">
              Training produces artifacts (300MB-3GB files). Serving needs to
              load the right one reliably. The registry bridges this: training
              registers versions with metadata, evaluators compare against
              baselines, approved versions promote to staging then production.
              Serving queries the registry at startup to resolve which version
              to load.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> The registry is a control plane, not
              data plane. It stores metadata and pointers, not model files.
              Binaries live in object storage; the registry tracks which is
              blessed for production.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SCALE REQUIREMENTS
            </p>
            <p style="margin-top: 0">
              Production registries handle hundreds of model groups, thousands
              of versions. Target: p95 metadata lookup under 10ms. During
              deploys, thousands of instances query simultaneously—caching and
              read replicas are essential.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Adds process overhead and requires
              metadata discipline. Overkill for single prototype. Essential for
              organizations with multiple models, compliance, or rollback needs.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Training Pipeline</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    300MB artifact + metrics
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Model Registry</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Hash, metadata, approval
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Serving System</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    5% → 50% → 100% rollout
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
                  Model registry is the single source of truth for which model
                  version is serving production traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bridges training and serving: training registers versions,
                  evaluators compare, approved versions deploy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Control plane (metadata and pointers) not data plane—model
                  binaries live in object storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale targets: p95 metadata lookup under 10ms, hundreds of
                  writes per hour during retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Essential for organizations with multiple models, compliance
                  needs, or rollback requirements
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
                  When asked about model deployment, explain the registry as the
                  bridge between training and serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that serving systems query at startup, not on every
                  request—registry is off the hot path
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelRegistryWhatIsAModelRegistryAndWhyProductionMlNeedsIt;
