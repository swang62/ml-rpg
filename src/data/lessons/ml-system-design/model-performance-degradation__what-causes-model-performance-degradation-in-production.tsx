import type { Component } from "solid-js";

const LessonModelPerformanceDegradationWhatCausesModelPerformanceDegradationInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Causes Model Performance Degradation in Production?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Problem
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                ML models degrade over time in production.{" "}
                <strong>Performance degradation</strong> is the gradual decline
                in model accuracy, precision, recall, or business metrics after
                deployment.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ROOT CAUSES
            </p>
            <p>
              <strong>Data drift:</strong> Input feature distributions shift
              from training distribution. User behavior changes, new product
              categories appear, seasonality effects. The model encounters data
              it was not trained on.
            </p>
            <p>
              <strong>Concept drift:</strong> The relationship between features
              and outcomes changes. What used to predict success no longer does.
              A fraud model loses effectiveness as fraudsters adapt their
              tactics.
            </p>
            <p>
              <strong>Feature decay:</strong> Features become less predictive
              over time. A feature based on last year engagement patterns loses
              relevance as user behavior evolves.
            </p>
            <p>
              <strong>Upstream failures:</strong> Data pipelines fail silently.
              Features are computed incorrectly or become stale. The model
              receives garbage inputs and produces garbage outputs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DEGRADATION TIMELINE
            </p>
            <p>
              Models typically degrade 1-5% per month without intervention.
              High-velocity domains (fraud, trending content, pricing) degrade
              faster—potentially 10-20% per month. Stable domains (document
              classification, image recognition) degrade slower.
            </p>
            <p>
              Degradation is often gradual and invisible until significant
              damage occurs. By the time someone notices predictions are bad,
              the model may have been underperforming for weeks.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY MONITORING MATTERS
            </p>
            <p>
              Unlike traditional software bugs that crash visibly, ML
              degradation fails silently. The model continues producing
              predictions—they are just wrong. Proactive monitoring catches
              degradation before business impact becomes severe.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Assume every model will degrade.
              The question is not if but when. Build monitoring from day one,
              not after problems appear.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 12px; align-items: stretch">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      Data Drift
                    </strong>
                    <span style="font-size: 12px">
                      Input distribution changes
                      <br />
                      Desktop 80% → Mobile 80%
                    </span>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      Concept Drift
                    </strong>
                    <span style="font-size: 12px">
                      Input→Output mapping shifts
                      <br />
                      Same features, new patterns
                    </span>
                  </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: stretch">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      Prior Shift
                    </strong>
                    <span style="font-size: 12px">
                      Class balance changes
                      <br />
                      Spam 5% → 20%
                    </span>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                      Pipeline Bugs
                    </strong>
                    <span style="font-size: 12px">
                      Feature corruption
                      <br />
                      Unit mismatch, timezone errors
                    </span>
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
                  Root causes: data drift, concept drift, feature decay,
                  upstream pipeline failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Degradation rate: 1-5% per month typical; high-velocity
                  domains (fraud, pricing) degrade 10-20% per month
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ML failures are silent—predictions continue but are wrong;
                  proactive monitoring is essential
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
                  Interview Tip: Distinguish data drift (P(X) changes) from
                  concept drift (P(Y|X) changes).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain why ML monitoring differs from
                  traditional software monitoring—silent failures.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPerformanceDegradationWhatCausesModelPerformanceDegradationInProduction;
