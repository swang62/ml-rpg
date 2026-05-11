import type { Component } from "solid-js";

const LessonRampUpStrategiesFailureModesBiasedCohortsColdStartAndFeedbackLoops: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Biased Cohorts, Cold Start, and Feedback Loops
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BIASED COHORTS
            </p>
            <p style="margin-top: 0">
              Small canary percentages can create biased samples. If 5% canary
              happens to skew toward power users (higher engagement), you see
              0.5% CTR lift that vanishes at 100% when casual users dominate.{" "}
              <strong>Detection:</strong> Compare pre-period metrics between
              cohorts before starting the experiment. If canary pre-period CTR
              is 3.5% vs baseline 3.2%, rebalance strata.{" "}
              <strong>Prevention:</strong> Use stratified sampling by user
              segment.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COLD START LATENCY
            </p>
            <p style="margin-top: 0">
              New replicas spike P99 latency from 210ms to 400ms for the first 5
              minutes while caches warm. This triggers false rollback even
              though the steady-state performance is fine.{" "}
              <strong>Mitigation:</strong> Pre-warm by replaying the last 60
              minutes of requests at 10x speed (6 minutes replay time). Use
              10-15 minute grace periods before evaluating latency metrics. Flag
              the cold start window in logs for exclusion from analysis.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Grace periods delay problem
              detection. Balance cold start tolerance against fast rollback
              requirements.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FEEDBACK LOOPS AND TEMPORAL EFFECTS
            </p>
            <p style="margin-top: 0">
              <strong>Novelty effect:</strong> Users engage more with new UI in
              the first hour, then revert to baseline.{" "}
              <strong>Learning effect:</strong> Users initially struggle with
              changes, then adapt. Both bias short-window measurements.{" "}
              <strong>Mitigation:</strong> Use 24-hour evaluation windows and
              maintain parallel holdouts for retention metrics. Compare day-1,
              day-7, and day-30 cohort behavior to separate novelty from true
              improvement.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DEPENDENCY SATURATION
            </p>
            <p style="margin-top: 0">
              Canary model increases embedding service QPS by 30%. At 25%
              traffic, you hit the embedding service capacity limit (15k QPS),
              causing timeouts. The model gets blamed for latency when the real
              issue is downstream capacity. <strong>Prevention:</strong>{" "}
              Validate downstream service headroom before each ramp step.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Biased cohorts: small samples skew toward power users;
                  validate pre-period metrics match before starting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start: new replicas spike P99 for 5 minutes; pre-warm
                  caches and use 10-15 min grace periods
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops: novelty effect inflates first-hour metrics;
                  use 24-hour windows and parallel holdouts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dependency saturation: canary may hit downstream capacity
                  limits; validate service headroom before each ramp
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
                  Describe cold start mitigation: replay 60 minutes of requests
                  at 10x speed to warm caches before live traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain novelty vs learning effects: short windows are biased,
                  use 24-hour evaluation windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention dependency saturation: model blamed for timeouts when
                  real issue is downstream embedding service capacity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRampUpStrategiesFailureModesBiasedCohortsColdStartAndFeedbackLoops;
