import type { Component } from "solid-js";

const LessonModelRegistryModelVersioningLineageTracking: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Model Versioning and Lineage Tracking
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
              <strong>Model versioning</strong> tracks every iteration with
              unique identifiers, while <strong>lineage tracking</strong>{" "}
              records data, code, and parameters that produced each
              version—enabling reproducibility.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            VERSION NUMBERING SCHEMES
          </p>
          <p style="margin-top: 0">
            <strong>Semantic:</strong> major.minor.patch (2.1.3). Major =
            breaking, minor = features, patch = fixes.{" "}
            <strong>Timestamp:</strong> 20240115-143052, automatic and sortable.{" "}
            <strong>Hash-based:</strong> Git SHA or content hash, guarantees
            uniqueness and reproducibility.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            LINEAGE COMPONENTS
          </p>
          <p style="margin-top: 0">
            <strong>Data:</strong> Dataset version, preprocessing, features.{" "}
            <strong>Code:</strong> Git commit, script hash, library versions.{" "}
            <strong>Parameters:</strong> Hyperparameters, seeds, hardware.{" "}
            <strong>Experiment:</strong> Which tests validated this model.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Insight:</strong> Lineage enables time travel debugging.
            When v2.3 regresses, lineage shows it trained on data v1.5 while
            v2.2 used v1.4—pinpointing the data change as cause.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            IMMUTABLE ARTIFACTS
          </p>
          <p style="margin-top: 0">
            Every version must be immutable. Once registered, weights and
            metadata cannot change—updates create new versions. This prevents
            "worked yesterday" bugs. Use content-addressable storage.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            VERSION LIFECYCLE
          </p>
          <p style="margin-top: 0">
            <strong>Registered:</strong> Available for testing.{" "}
            <strong>Staged:</strong> Passed validation.{" "}
            <strong>Production:</strong> Serving. <strong>Archived:</strong>{" "}
            Retained for rollback. <strong>Deprecated:</strong> Scheduled for
            deletion. Track transitions with timestamps.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Trade-off:</strong> Full lineage adds storage overhead.
            Capture essentials: data version, code commit, key hyperparameters.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Version schemes: semantic (human judgment), timestamp
                (automatic), hash (reproducible)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Lineage tracks data, code, parameters, and experiments that
                produced each version
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Immutable artifacts prevent worked yesterday bugs—updates create
                new versions
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
                Explain lineage as time travel debugging—trace regressions to
                data or code changes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Describe version lifecycle: registered → staged → production →
                archived
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonModelRegistryModelVersioningLineageTracking;
