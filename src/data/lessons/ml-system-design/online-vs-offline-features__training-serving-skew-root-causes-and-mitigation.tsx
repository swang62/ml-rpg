import type { Component } from "solid-js";

const LessonOnlineVsOfflineFeaturesTrainingServingSkewRootCausesAndMitigation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Serving Skew: Root Causes and Mitigation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Training Serving Skew Is
            </p>
            <p style="margin-top: 0">
              Occurs when feature computation logic, data sources, or time
              semantics diverge between offline training and online serving,
              causing models to see systematically different input
              distributions. A fraud detection model achieving 0.90 AUC offline
              might drop to 0.75 in production because the training pipeline
              used batch aggregated transaction counts with 24 hour windows
              while the serving pipeline used streaming counters with incomplete
              late event handling. This 0.15 AUC gap translates to millions in
              missed fraud at scale.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Root Causes
            </p>
            <p style="margin-top: 0">
              Different codebases for offline Spark jobs versus online streaming
              leads to logic drift over time. Using ingestion time instead of
              event time creates temporal misalignment where offline features
              are computed with complete data while online features use partial
              real time data. Schema evolution without synchronized rollout
              causes type mismatches or missing fields. Even floating point
              precision differences between Python training and Java serving can
              shift distributions enough to degrade model calibration.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Architectural Unification
            </p>
            <p style="margin-top: 0">
              Feature stores like Uber's Michelangelo and Airbnb's Zipline
              enforce single feature definitions through domain specific
              languages or configuration that compile to both batch and
              streaming execution engines. The same transformation logic
              generates Spark jobs for offline materialization and Flink or
              Kafka Streams jobs for online updates. Versioned feature snapshots
              track exactly which feature computation version was used for
              training, enabling bit exact reproduction at serving time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online Offline Parity Testing
            </p>
            <p style="margin-top: 0">
              Sample a subset of recent online predictions, recompute their
              features using the offline pipeline with the exact same
              timestamps, and compare distributions. Alert if more than 5% of
              features differ by more than 10% or if statistical tests (KS, JS
              divergence) detect significant distribution shifts. LinkedIn runs
              hourly parity checks across thousands of features, catching schema
              changes, pipeline bugs, and data quality issues before they impact
              model performance.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 8px; font-size: 15px">
                    Unified Feature Definition
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    Feature: user_purchases_24h
                    <br />
                    Source: events.purchases
                    <br />
                    Window: 24 hour sliding, event time
                    <br />
                    Aggregation: COUNT DISTINCT order_id
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                    <strong>Compile to Batch</strong>
                    <br />
                    Spark SQL with point in time join, 72hr grace period
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                    <strong>Compile to Stream</strong>
                    <br />
                    Flink window, 1hr allowed lateness, idempotent updates
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px">
                  <strong>Parity Test:</strong> Sample 1000 requests/hour,
                  recompute offline, alert if &gt;5% differ by &gt;10%
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
                  Training serving skew causes 10% to 30% model performance
                  degradation when offline AUC or precision fails to translate
                  online due to feature distribution mismatches between training
                  and serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate codebases for batch (Spark/Python) and streaming
                  (Flink/Java) inevitably drift as bugs are fixed
                  inconsistently, requiring unified feature definitions that
                  compile to both engines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event time versus ingestion time semantics create temporal
                  misalignment: offline uses complete data arrived by batch
                  cutoff while online uses partial real time data, shifting
                  distributions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Versioned feature snapshots track computation logic used
                  during training, enabling bit exact reproduction at serving by
                  deploying the same feature version to online stores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous parity testing samples recent predictions,
                  recomputes features offline with identical timestamps, and
                  alerts if more than 5% of features differ by more than 10% or
                  statistical tests detect drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution requires synchronized rollout: deploy new
                  feature version to online store, validate parity, update
                  models to request new version, then deprecate old version
                  after grace period
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
                  Uber Michelangelo: Single feature definition in configuration
                  compiles to both Spark batch jobs for training data and Kafka
                  Streams for online serving, eliminating dual codebase drift
                  across thousands of features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline: Domain specific language generates point in
                  time correct offline tables and publishes to online Redis with
                  identical transformation logic, parity tested hourly on 5%
                  sample of 1 billion+ rows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta Ads: Hourly shadow traffic sends production requests
                  through both deployed model and candidate model with
                  recomputed offline features, comparing predictions to catch
                  skew before full rollout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOnlineVsOfflineFeaturesTrainingServingSkewRootCausesAndMitigation;
