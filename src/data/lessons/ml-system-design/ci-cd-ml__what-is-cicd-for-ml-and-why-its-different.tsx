import type { Component } from "solid-js";

const LessonCiCdMlWhatIsCicdForMlAndWhyItsDifferent: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is CI/CD for ML and Why It's Different
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
              <strong>CI/CD for ML</strong> extends traditional software
              delivery to treat data, features, and models as first-class
              artifacts alongside code. Unlike stateless web services, ML
              systems must manage training datasets (often terabytes), feature
              pipelines, model binaries (sometimes gigabytes), and metadata that
              captures full lineage.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            WHY ML IS DIFFERENT
          </p>
          <p style="margin-top: 0">
            Models are trained on historical data and validated on offline
            benchmarks that may not reflect live traffic. A recommendation model
            might achieve 0.85 precision@10 offline but encounter shifted user
            behavior, missing features from upstream latency, or numerical
            differences between training and serving environments at runtime.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Risk:</strong> Training-serving skew, data drift, and
            model decay are ML-specific failure modes that do not exist in
            traditional software deployments.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            THREE DISTINCT LOOPS
          </p>
          <p style="margin-top: 0">
            <strong>Continuous Integration:</strong> Validates code, feature
            transformations, and data contracts in under 10 minutes using small
            fixtures and unit tests.
          </p>
          <p style="margin-top: 8px">
            <strong>Continuous Training:</strong> Runs on schedule or drift
            trigger, trains on production-scale data (e.g., 8TB covering 14
            days), produces candidate model with lineage (commit hash, data
            snapshot IDs, metrics).
          </p>
          <p style="margin-top: 8px">
            <strong>Continuous Deployment:</strong> Moves promoted model through
            staging, shadow (sees live traffic but does not affect users), and
            progressive canary rollouts with guardrails watching latency, error
            rates, and business metrics.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            PRODUCTION SCALE
          </p>
          <p style="margin-top: 0">
            Large platforms manage thousands of models with hourly/daily
            retraining, model registries tracking full lineage, and online
            feature stores delivering features in under 10ms. Shadow evaluations
            run before promotion. P95 inference stays at 20-40ms. Pipelines must
            prove statistical performance against baselines and slice-based
            fairness metrics before any model touches user traffic.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">CI Loop</strong>
                <div style="font-size: 13px; margin-top: 6px">
                  Code + Data Contracts
                  <br />
                  Complete in &lt;10 min
                  <br />
                  Unit tests, schema validation
                </div>
              </div>
              <div style="font-size: 22px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">Continuous Training</strong>
                <div style="font-size: 13px; margin-top: 6px">
                  8TB data, 14 day window
                  <br />
                  Produce model + lineage
                  <br />
                  Offline eval vs baseline
                </div>
              </div>
              <div style="font-size: 22px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">CD: Shadow → Canary</strong>
                <div style="font-size: 13px; margin-top: 6px">
                  Shadow: 10M requests, 2 hours
                  <br />
                  Canary: 1% → 5% → 25%
                  <br />
                  Auto rollback in &lt;2 min
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ML CI/CD manages code plus data, features, and model artifacts
                as versioned, immutable dependencies with full lineage tracking
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Training serving skew is the silent killer: Different
                transformations, missing value handling, or numerical libraries
                between training and serving cause metric drops that offline
                validation misses
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Three loop architecture separates concerns: CI completes in
                under 10 minutes for fast feedback, continuous training operates
                on production scale data, CD uses shadow and canary with
                automated guards
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Shadow deployment surfaces skew and latency issues without user
                impact by logging predictions on live traffic for a fixed budget
                like 10 million requests over 2 hours before promoting to canary
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Progressive rollouts start at 1 percent traffic for 30 minutes,
                then 5 percent for 2 hours, with automated rollback triggering
                in under 2 minutes if p95 latency exceeds 50ms or business KPIs
                drop more than 2 percent
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Production scale examples: Uber Michelangelo manages thousands
                of models with sub 10ms feature fetches, Netflix maintains 20 to
                40ms p95 inference for personalization, Google TFX formalizes
                data validation and skew detection
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
                Netflix personalization pipeline: Shadow evaluates candidate
                model on 24 hours of production request logs (replayed offline)
                to compute incremental click through rate and calibration curves
                before any live traffic exposure
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Uber fraud detection: Model serves 40k requests per second at
                p95 latency under 50ms, with canary rollout watching tail p99,
                throughput, feature cache hit rate, and fraud catch rate across
                traffic slices
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Meta learning platforms: Run thousands of training jobs daily,
                promote through automated policy checks (AUC improvement greater
                than 0.5 points, calibration slope within 0.02 on top 5 slices),
                progressive rollouts tied to online experiments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonCiCdMlWhatIsCicdForMlAndWhyItsDifferent;
