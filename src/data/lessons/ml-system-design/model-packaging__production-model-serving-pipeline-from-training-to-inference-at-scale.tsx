import type { Component } from "solid-js";

const LessonModelPackagingProductionModelServingPipelineFromTrainingToInferenceAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Model Serving Pipeline: From Training to Inference at
            Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Model Serving Pipeline:</strong> The automated workflow
              from trained model to production endpoint. It includes validation
              gates, packaging steps, deployment stages, and rollback
              mechanisms. A mature pipeline deploys models without human
              intervention while catching failures before they reach users.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pipeline Stages
            </p>
            <p>
              <strong>Export and validate:</strong> Convert trained model to
              serving format (SavedModel, ONNX). Run validation: compare outputs
              against golden test set, verify input/output shapes, check for
              numerical issues (NaN, overflow). <strong>Package:</strong> Build
              Docker image with model and dependencies. Tag with version, commit
              hash, training metadata. <strong>Test:</strong> Deploy to staging,
              run integration tests (latency, throughput, correctness).{" "}
              <strong>Deploy:</strong> Canary to production (1% traffic),
              monitor metrics, gradually increase if healthy.{" "}
              <strong>Rollback:</strong> Automated revert if error rate or
              latency exceeds thresholds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Validation Gates
            </p>
            <p>
              Each stage has quality gates that must pass before proceeding.
              Model validation: AUC above threshold, no prediction drift from
              baseline, reasonable output distribution. Container validation:
              image builds successfully, health check passes, inference latency
              under SLA. Integration validation: end-to-end prediction matches
              expected format, dependent services receive valid responses. A
              single failed gate halts the pipeline and alerts the team. False
              positives are costly (blocked deployments), but false negatives
              are worse (broken models in production).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Deployment Strategies
            </p>
            <p>
              <strong>Blue-green:</strong> Run old and new versions in parallel,
              switch traffic atomically. Fast rollback but requires 2x resources
              during transition. <strong>Canary:</strong> Route small percentage
              of traffic to new version, gradually increase. Catches problems
              early but takes longer to fully deploy. <strong>Shadow:</strong>{" "}
              New version receives traffic copy but responses are discarded.
              Validates performance without user impact but does not test real
              correctness.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Automation Goal:</strong> A new model should deploy to
              production within hours of training completion, with zero manual
              steps and automatic rollback on failure.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>1. Training Complete</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Export → Model Registry (v2.3.1 + metadata)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>2. Build &amp; Test</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Container build → Conformance (accuracy within 0.5%) → Push
                    to registry
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>3. Progressive Rollout</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    1% canary → Monitor 1-4h → 10% → 50% → 100% over 6-24h
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong>4. Serving (Multi model hosting)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    API Gateway → Inference pods (10-50 versions) → Dynamic
                    batching → Metrics
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
                  Pipeline stages: export, validate, package, test, deploy,
                  rollback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each stage has quality gates that halt pipeline on failure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Blue-green for fast rollback, canary for gradual validation,
                  shadow for risk-free testing
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
                  Canary deployment: 1% traffic initially, increase if metrics
                  stay healthy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Validation gates: AUC threshold, latency SLA, output
                  distribution check
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPackagingProductionModelServingPipelineFromTrainingToInferenceAtScale;
