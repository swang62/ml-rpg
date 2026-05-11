import type { Component } from "solid-js";

const LessonModelGovernanceImmutableArtifactsAndDataLineageGraphs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Immutable Artifacts and Data Lineage Graphs
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
                <strong>Immutable artifacts</strong> are content-addressable
                blobs identified by cryptographic hashes.{" "}
                <strong>Lineage graphs</strong> track how artifacts transform
                through pipelines—enabling reproducibility and impact analysis.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONTENT-ADDRESSABLE STORAGE
            </p>
            <p style="margin-top: 0">
              Every model, dataset, and feature schema is stored with SHA-256
              hash as ID. A signed manifest lists all dependencies with hashes.
              Any change produces a different hash, making drift immediately
              visible. Training produces a manifest: model binary hash, dataset
              hash, code commit, library versions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LINEAGE GRAPHS
            </p>
            <p style="margin-top: 0">
              Nodes represent versioned artifacts (raw data, features, models).
              Edges represent transformations with config fingerprints. When a
              data source requires deletion (GDPR), lineage identifies all
              downstream artifacts that depend on it—triggering retraining or
              impact assessment.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> If a bug is found in a feature
              computation, lineage identifies which models need retraining and
              which predictions may be invalid—critical for incident response.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ACHIEVING REPRODUCIBILITY
            </p>
            <p style="margin-top: 0">
              Pin library versions with lock files. Use container digests, not
              mutable tags. Fix random seeds. Record hardware fingerprints.
              Snapshot training data as immutable manifests rather than live
              queries. Where nondeterminism is unavoidable, define acceptable
              tolerance and validate with calibration datasets.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Full immutability increases storage
              costs. Use tiered storage—hot for recent artifacts, cold archive
              for older versions retained for compliance.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Raw Data Source</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    transactions_2024_q1 (sha256:raw123)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ fraud_signal_v2.3
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Feature Table v47</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    user_velocity, merchant_risk (sha256:feat47)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ training_job_j1829
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Model m92 (fraud_detector)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    XGBoost, seed=42, AUC=0.94 (sha256:model92)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ approval + deployment
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Production Predictions
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    References: model92, feat47, manifest signed by approver
                    Alice
                  </div>
                </div>
                <div style="margin-top: 6px; padding: 8px; border-left: 3px solid; font-size: 11px">
                  <strong>GDPR Deletion Impact:</strong> If raw123 contains
                  deleted user, lineage traces to feat47 → model92 → trigger
                  retrain
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
                  Content addressable storage using Secure Hash Algorithm 256
                  (SHA 256) hashes makes every artifact (model, dataset, feature
                  schema) immutable and tamper evident, any change produces a
                  different hash visible in manifests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Signed manifests list all dependencies with cryptographic
                  hashes and are themselves signed, ensuring review boards and
                  deployment systems reference the exact artifacts that were
                  approved, preventing bait and switch attacks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data lineage graphs connect raw sources through
                  transformations to models, enabling impact analysis where a
                  General Data Protection Regulation (GDPR) deletion or bug
                  discovery automatically identifies all affected downstream
                  models requiring retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reproducibility demands pinning library versions (pip freeze),
                  using container digests not mutable tags (latest is
                  forbidden), fixing random seeds, and snapshotting training
                  data as immutable manifests rather than live queries that
                  drift over time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When nondeterminism is unavoidable (distributed training,
                  floating point variance across Graphics Processing Unit or GPU
                  types), define acceptable tolerance (Area Under the Curve or
                  AUC differs by less than 0.01) and validate with calibration
                  datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta and Google use lineage for incident response where a
                  feature bug running 90 days triggers automatic identification
                  of affected models and potentially invalid predictions
                  requiring notification or recomputation
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
                  Training manifest: &#123;"model": "sha256:a1b2c3", "dataset":
                  "sha256:d4e5f6", "features": "sha256:g7h8i9", "code":
                  "git:123abc", "container": "docker@sha256:xyz789",
                  "random_seed": 42, "libs": "sha256:requirements_lock"&#125;
                  signed with private key, any tampering breaks signature
                  verification
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lineage query: MATCH (d:DataSource
                  &#123;id:'transactions_q1'&#125;) to (m:Model) RETURN path
                  shows transactions_q1 → fraud_signal_v2.3 → features_v47 →
                  training_j1829 → model_m92, enabling targeted retraining when
                  source is affected by deletion or corruption
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reproducibility test: Rerun training job with same manifest on
                  different hardware (Tesla V100 vs A100 GPUs), verify model
                  outputs differ by less than 0.5% on 10K held out examples,
                  accept as equivalent despite floating point variance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelGovernanceImmutableArtifactsAndDataLineageGraphs;
