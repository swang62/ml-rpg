import type { Component } from "solid-js";

const LessonRealtimeFraudScoringTheCompleteRealTimeScoringFlowForFraudDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            The Complete Real-Time Scoring Flow for Fraud Detection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Request Path
            </p>
            <p>
              A transaction arrives at the fraud scoring service. Within 50ms,
              the system must: validate the request (1ms), fetch user features
              from the online store (5-10ms), compute real-time features like
              transaction velocity (2-5ms), run model inference (10-30ms), apply
              post-processing rules (2-5ms), and return the decision. Each
              component has a timeout; if any step exceeds its budget, the
              system returns a default decision.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Critical Path:</strong> Feature retrieval and model
              inference dominate latency. Optimizing these two components yields
              the largest gains. Everything else is noise in comparison.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Retrieval
            </p>
            <p>
              Pre-computed features (user historical stats, account age,
              velocity aggregates) live in the online feature store—a
              low-latency key-value store optimized for single-key lookups. The
              model needs 50-200 features; fetching each individually would take
              too long. Batch lookups retrieve all features for a user in a
              single round-trip (multi-get operation).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real-Time Feature Computation
            </p>
            <p>
              Some features cannot be pre-computed: current transaction amount,
              time since last transaction, merchant category match. These are
              computed inline from the request payload. Keep real-time
              computation simple—complex aggregations should be pre-computed in
              streaming pipelines and stored for lookup.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Design Pattern:</strong> Separate features into three
              tiers: pre-computed (feature store lookup), real-time (inline
              computation), and context (request payload). This separation
              clarifies ownership and optimization paths.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Inference and Response
            </p>
            <p>
              The feature vector feeds into the model. Inference time depends on
              model complexity: linear models run in microseconds, tree
              ensembles in 1-5ms, neural networks in 10-50ms. Post-processing
              applies business rules: minimum scores, blocklist overrides, risk
              thresholds. The final response includes the score and recommended
              action.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>1. Edge Service</strong>
                  <div style="font-size: 12px; margin-top: 3px">
                    Auth + Routing: 2 to 5ms
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>2. Feature Store</strong>
                  <div style="font-size: 12px; margin-top: 3px">
                    Identity + Device: 2 to 10ms (95% cache hit)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>3. Real-Time Features</strong>
                  <div style="font-size: 12px; margin-top: 3px">
                    Compute from payload: 1 to 3ms
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>4. Model Inference</strong>
                  <div style="font-size: 12px; margin-top: 3px">
                    GBT or Neural Net on CPU: 2 to 10ms
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>5. Business Rules + Response</strong>
                  <div style="font-size: 12px; margin-top: 3px">
                    Total p99 budget: 60ms, target &lt; 100ms
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
                  Feature retrieval and model inference dominate
                  latency—optimize these two for the largest gains
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch feature lookups (multi-get) retrieve all 50-200 features
                  in a single round-trip
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate features into tiers: pre-computed (store lookup),
                  real-time (inline), context (request payload)
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
                  Walk through the 50ms budget: validate 1ms, fetch features
                  5-10ms, compute real-time features 2-5ms, inference 10-30ms,
                  rules 2-5ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain that complex aggregations should be pre-computed in
                  streaming pipelines, not computed inline
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeFraudScoringTheCompleteRealTimeScoringFlowForFraudDetection;
