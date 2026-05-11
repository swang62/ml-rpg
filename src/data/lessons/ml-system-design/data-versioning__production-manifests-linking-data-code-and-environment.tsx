import type { Component } from "solid-js";

const LessonDataVersioningProductionManifestsLinkingDataCodeAndEnvironment: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Manifests: Linking Data, Code, and Environment
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Manifests as Single Source of Truth
            </p>
            <p style="margin-top: 0">
              A production ready versioning system treats all ML artifacts as
              immutable, content addressed assets connected by manifests. Every
              pipeline run persists a manifest recording input data versions as
              cryptographic hashes or stream offsets, code commit hash,
              dependency lock file with exact package versions, environment
              fingerprint capturing operating system and GPU driver versions,
              execution parameters, and output artifact hashes. This single
              document enables complete reproducibility months later.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Chain of Custody
            </p>
            <p style="margin-top: 0">
              The manifest structure creates a chain of custody from raw data
              through transformations to trained models and predictions. When a
              model serves a prediction, logging metadata including timestamp,
              model version hash, feature vector version, and request identifier
              allows forensic replay. If accuracy degrades, you walk the lineage
              graph backward through the model manifest to training data
              versions, then to feature pipeline code and raw source offsets,
              pinpointing exactly what changed.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Phase Commit Protocol
            </p>
            <p style="margin-top: 0">
              Implementation requires a two phase commit protocol. First, write
              data and artifacts to storage. Second, atomically register them in
              the catalog with manifest metadata. Third, emit lineage events
              only after registration succeeds. This ensures consumers only see
              committed, fully materialized versions with snapshot isolation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Table Transactions
            </p>
            <p style="margin-top: 0">
              For multi table writes, a logical transaction identifier ties all
              outputs together. Reference counting in metadata prevents
              premature deletion of base snapshots that have dependent deltas
              still in use, avoiding broken reconstruction chains.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 4px">
                    Run Manifest: training_run_2025_03_31
                  </strong>
                  <div style="font-size: 11px; font-family: monospace; line-height: 1.5">
                    inputs: [data_v1: sha256:abc123, features_v2: sha256:def456]
                    <br />
                    code: commit 7a3f2b9
                    <br />
                    dependencies: requirements.lock sha256:789xyz
                    <br />
                    environment: Ubuntu 22.04, CUDA 12.1, Python 3.10
                    <br />
                    params: &#123;learning_rate: 0.001, batch_size: 512&#125;
                    <br />
                    outputs: [model: sha256:model123, metrics:
                    sha256:metrics456]
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center">
                    <strong>Reproducible</strong>
                    <br />
                    Exact replay
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center">
                    <strong>Auditable</strong>
                    <br />
                    Full lineage
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center">
                    <strong>Debuggable</strong>
                    <br />
                    Root cause
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
                  Manifests record input data hashes or offsets, code commit,
                  dependency lock with package versions, environment fingerprint
                  with OS and GPU drivers, parameters, and output hashes for
                  complete reproducibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Content addressed artifacts use cryptographic hashes as
                  identifiers, providing idempotent uploads, natural
                  deduplication across versions, and integrity verification
                  without trusted storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two phase commit protocol atomically writes artifacts then
                  registers manifests, ensuring consumers only see fully
                  materialized versions with snapshot isolation guarantees
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reference counting in metadata prevents deletion of base
                  snapshots while dependent deltas remain in use, avoiding
                  broken reconstruction chains during retention policy
                  enforcement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prediction time logging captures model version, feature vector
                  versions, and request identifiers, enabling forensic replay by
                  walking lineage backward from serving through training to raw
                  sources
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
                  Netflix Metaflow metadata service stores manifests linking
                  each workflow step to code, parameters, inputs, and outputs;
                  reproducing a training run 6 months later pulls exact commits,
                  pinned dependencies, and data hashes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta FBLearner Flow produces immutable artifacts with manifest
                  metadata connecting pipeline executions; reproducibility works
                  across large scale experimentation by versioning code, data,
                  and hardware configurations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A manifest for training run includes inputs as
                  data_v1:sha256:abc123 and features_v2:sha256:def456, code
                  commit 7a3f2b9, requirements.lock hash, Ubuntu 22.04 with CUDA
                  12.1, and outputs model:sha256:model123 with metrics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVersioningProductionManifestsLinkingDataCodeAndEnvironment;
