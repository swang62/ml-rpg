import type { Component } from "solid-js";

const LessonTrainingServingSkewSingleSourceOfTruthUnifiedFeatureDefinitions: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Single Source of Truth: Unified Feature Definitions
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Foundational Strategy
            </p>
            <p style="margin-top: 0">
              The foundational strategy for preventing training serving skew is
              establishing a single source of truth for all features. This means
              maintaining one declarative feature registry that describes the
              logic, keys, freshness requirements, and both training and serving
              semantics for every feature your models consume. Without this,
              teams inevitably write separate implementations: data scientists
              build features in Python notebooks for training, while engineers
              rewrite them in Java or C++ for production, introducing subtle
              bugs at each translation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Execution Modes
            </p>
            <p style="margin-top: 0">
              A production feature store provides two execution modes from one
              definition. The offline mode performs batch computation with time
              travel capabilities, allowing you to backfill features as they
              would have appeared at any historical timestamp. This ensures
              point in time correctness: when training on data from March 15th,
              you only use features available on March 15th, never leaking
              future information. The online mode materializes features into a
              low latency key value store with TTL and freshness SLAs, typically
              targeting p95 fetch latency under 5 milliseconds.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Examples
            </p>
            <p style="margin-top: 0">
              At Uber, this pattern powers features across pricing, fraud
              detection, and matching systems. A single feature definition like
              "rider 7 day trip count" computes identically whether you are
              building training data for last year or serving a real time
              prediction. Meta's feature store serves billions of feature reads
              per second for News Feed ranking, with the same transformation
              code running in Spark for training and in optimized C++ for
              serving.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Versioning Everything Together
            </p>
            <p style="margin-top: 0">
              The key is versioning everything together: feature definitions,
              vocabularies, transformation functions, and model artifacts all
              carry consistent version identifiers. When you deploy model
              version 47, it explicitly depends on feature registry version 23,
              ensuring the serving infrastructure loads exactly the transform
              logic that training used.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 280px; text-align: center">
                  <strong style="font-size: 14px">Feature Registry v23</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    One definition: user_7d_trip_count
                  </div>
                </div>
                <div style="display: flex; gap: 16px; width: 100%">
                  <div style="font-size: 20px; font-weight: bold">↙</div>
                  <div style="font-size: 20px; font-weight: bold; margin-left: auto">
                    ↘
                  </div>
                </div>
                <div style="display: flex; gap: 16px; width: 100%; justify-content: space-between">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Offline (Training)</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Spark batch compute
                      <br />
                      Point in time joins
                      <br />
                      Backfill to any date
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Online (Serving)</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Redis materialized
                      <br />
                      p95 fetch &lt; 5ms
                      <br />
                      Staleness &lt; 60s
                    </div>
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
                  Feature registry maintains one declarative definition
                  supporting both offline batch computation (time travel, point
                  in time correctness) and online materialization (low latency
                  key value store with TTL)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production Service Level Agreements (SLAs): p95 feature fetch
                  latency under 5 milliseconds for critical features, aggregate
                  fetch budgets 10 to 20 milliseconds, staleness under 60
                  seconds for real time aggregates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Version locking prevents divergence: model version 47
                  explicitly depends on feature registry version 23, ensuring
                  serving loads exact transform logic used in training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale reference: Meta feature store serves billions of reads
                  per second for feed ranking, Uber feature platform powers
                  features across all prediction systems with single digit
                  millisecond latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade off: Platform investment and runtime constraints slow
                  experimentation with bespoke transforms, but eliminate entire
                  class of skew bugs and reduce incident response time from days
                  to hours
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
                  Uber feature store: "rider 7 day trip count" defined once,
                  computes in Spark for training data backfills and materializes
                  in Redis for real time trip matching with 3 millisecond p95
                  read latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix user engagement features: watch history and genre
                  preferences use identical transformation code in training
                  (Spark) and serving (optimized C++), preventing skew in
                  homepage personalization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Ads bidding: advertiser spend aggregates defined in
                  feature registry, computed batch for training, streamed to
                  online store for serving with 1 minute freshness guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingServingSkewSingleSourceOfTruthUnifiedFeatureDefinitions;
