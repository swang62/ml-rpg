import type { Component } from "solid-js";

const LessonCiCdMlTrainingServingSkewAndEnvironmentParity: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Training Serving Skew and Environment Parity
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
              <strong>Training-serving skew</strong> occurs when differences
              between training pipeline and serving environment cause model
              degradation that offline validation misses. A model may achieve
              0.87 AUC offline but drop to 0.78 in production from environment
              inconsistencies alone.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            COMMON CULPRITS
          </p>
          <p style="margin-top: 0">
            • Missing values handled differently (training: mean fill, serving:
            zero)
          </p>
          <p style="margin-top: 4px">
            • Time zone issues (training: UTC, serving: local time with
            off-by-one errors)
          </p>
          <p style="margin-top: 4px">
            • Categorical encoding mismatches (training: unknown → default ID,
            serving: dropped)
          </p>
          <p style="margin-top: 4px">
            • Numerical library differences (different versions with different
            rounding)
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            FEATURE FRESHNESS SKEW
          </p>
          <p style="margin-top: 0">
            Training uses batch features computed daily. Serving fetches online
            features from cache with 5-min TTL, but upstream services lag
            causing misses. If 15% of requests hit stale features, model
            behavior diverges—degrading precision by 5-10%.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Example:</strong> Users last-click timestamp is fresh in
            training but 2 hours old in serving during peak traffic, shifting
            input distribution.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            ENFORCING PARITY
          </p>
          <p style="margin-top: 0">
            Generate both training and serving transforms from single source of
            truth. Feature stores compile transformations to both batch and
            low-latency serving code. CI round-trip parity tests: apply same
            transformation to identical inputs in both paths, assert outputs
            match within tolerance (1e-6). Serialize vocabularies immutably. Pin
            library versions.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            SHADOW TESTING
          </p>
          <p style="margin-top: 0">
            Shadow deployment is the ultimate parity test. If predictions
            diverge &gt; 5% on 10% of requests, investigate feature availability
            (cache hit rates, upstream latency) and transformation differences
            (diff code paths, compare intermediate values).
          </p>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Training serving skew from missing value handling, time zone
                conversions, categorical encoding, and numerical libraries can
                drop model AUC from 0.87 in validation to 0.78 in production
                without offline signals
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Feature freshness skew: Training uses complete 14 day batch
                data, serving fetches from cache with 5 minute TTL but upstream
                lag causes 15 percent stale reads, degrading precision by 5 to
                10 percent on time sensitive predictions
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Single source of truth for transforms: Tools like Feast and
                Tecton compile feature definitions to both Spark for batch
                training and low latency serving code (often C++ or Go),
                enforcing parity by construction
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Round trip parity tests in CI: Apply transformation to same
                input in training and serving paths, assert outputs match within
                1e-6 tolerance, serialize and share vocabularies immutably to
                prevent encoding drift
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Shadow deployment surfaces real skew: If candidate predictions
                diverge by more than 5 percent on 10 percent of live requests
                compared to baseline, investigate cache hit rates, feature fetch
                p99 latency, and diff transformation code paths
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Determinism requires pinned environments: NumPy version,
                TensorFlow flags like TF_DETERMINISTIC_OPS, random seeds, and
                hardware fingerprints (GPU type, driver) must be captured and
                reproducible to debug production issues
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
                Time zone skew example: Training computes
                days_since_last_purchase in UTC, serving uses user local time,
                causing off by one day for users near midnight, shifting a key
                feature and dropping model precision by 3 percent in European
                markets
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Categorical encoding mismatch: Training OneHotEncoder learns
                vocabulary from 14 days of data (10k categories), serving
                receives a new category after deploy, training code maps to
                unknown_id=0, serving code drops the feature entirely, model
                sees different input shape
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Uber feature freshness instrumentation: Monitors per feature
                cache hit rate (target greater than 95 percent), staleness
                (target p95 under 10 seconds), and fetch p99 latency (target
                under 5ms), alerts if any breaches and correlates with model
                metric drops
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix transform parity test: Generates 10k synthetic user
                profiles, applies feature transforms in Spark training pipeline
                and in Java serving microservice, asserts all numerical features
                match within 1e-5 and categorical features match exactly before
                promoting model
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonCiCdMlTrainingServingSkewAndEnvironmentParity;
