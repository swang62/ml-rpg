import type { Component } from "solid-js";

const LessonCiCdMlFailureModesInMlCicdPipelines: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes in ML CI/CD Pipelines
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Critical Failures
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              ML pipelines fail subtly: canary contamination from
              non-representative traffic, feature leakage in training, rollback
              incompatibilities, and cold start latency spikes.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            CANARY CONTAMINATION
          </p>
          <p style="margin-top: 0">
            Traffic routing is not slice-aware, biasing evaluation. Mobile
            canary only routes iOS/North America due to load balancer config.
            Metrics look fine (iOS is high-intent) but model degrades for
            Android/international. Fix: stratified canary allocation and
            per-slice guard thresholds.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            FEATURE BACKFILL LEAKAGE
          </p>
          <p style="margin-top: 0">
            Training metrics lie when backfill includes future data. Feature
            query fetches engagement through Jan 20 when predicting Jan 15
            events—model sees future info, achieves 0.92 AUC offline but drops
            to 0.80 in production. Fix: time-bounded queries with strict
            timestamp filters, validate no feature timestamp exceeds label
            timestamp.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Warning:</strong> Feature leakage is insidious because
            offline metrics look great. Always validate temporal ordering.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            ROLLBACK INCOMPATIBILITIES
          </p>
          <p style="margin-top: 0">
            New model adds feature, serving code updated. Canary triggers
            rollback but prior model does not expect new schema and crashes.
            Fix: schema versioning with backward compatibility—serving handles
            both schemas during rollout. Test rollback in staging verifying old
            model works with new environment.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            COLD START FAILURES
          </p>
          <p style="margin-top: 0">
            Canary scales 2→20 replicas during surge. New replicas load 2GB
            model, initialize 500MB index—takes 45s. They receive traffic before
            ready, p99 spikes 50ms→800ms. Fix: mark not-ready until init
            completes, use init containers, maintain warm standby pool.
          </p>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Canary contamination from non stratified routing: iOS North
                America only canary looks healthy (high click through rate) but
                model degrades for Android and international, requires slice
                aware allocation and per slice guards
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Feature backfill leakage: Backfill fetches engagement through
                January 20 when predicting January 15 events, model sees future
                data and achieves 0.92 offline AUC but drops to 0.80 in
                production, requires strict timestamp filters and validation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Rollback incompatibility: New model adds feature schema field,
                old model crashes on rollback because serving code sends new
                schema, requires backward compatible schema versioning and
                rollback tests in staging
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cold start autoscaling: New replicas take 45 seconds to load 2GB
                model and 500MB embeddings, receive traffic before ready, p99
                latency spikes from 50ms to 800ms, requires pre warming and
                admission control
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Non determinism from unpinned dependencies and hardware: Same
                code and data yield different model weights on V100 vs A100 GPUs
                or NumPy 1.23 vs 1.24, breaks reproducibility and rollback,
                requires captured environment fingerprints
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Feedback loop contamination: Recommending popular items makes
                them more popular, training on this data amplifies bias, reduces
                diversity, requires position debiased training or randomized
                exploration to break loop
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
                Netflix canary contamination incident: Canary routed only to
                premium subscribers, metrics looked good (higher engagement),
                full rollout degraded free tier users, required per subscription
                tier guards and stratified traffic allocation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Uber feature leakage bug: Training pipeline backfilled driver
                acceptance rate with lookahead window, offline validation showed
                0.91 AUC, production dropped to 0.83, fixed with strict
                timestamp assertion that blocked training if any feature
                timestamp exceeded label timestamp by more than 1 hour
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Meta model rollback failure: New ranking model required real
                time feature from streaming pipeline, old model did not use it,
                rollback caused feature fetch errors, service degraded for 8
                minutes until manual intervention, fixed by dual read paths
                supporting both feature schemas
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                Google Search autoscaling thrash: Traffic surge scaled replicas
                from 10 to 100, new replicas took 30 seconds to load model, p99
                latency exceeded 200ms, caused rollback loop, fixed with pre
                warmed standby pool and readiness probes that delay traffic
                until model loaded
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonCiCdMlFailureModesInMlCicdPipelines;
