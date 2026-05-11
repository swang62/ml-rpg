import type { Component } from "solid-js";

const LessonStatisticalSignificanceTradeOffsSequentialMonitoringUnitOfRandomizationAndIntervalMethods: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-Offs: Sequential Monitoring, Unit of Randomization, and
            Interval Methods
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PEEKING AND ALPHA INFLATION
            </p>
            <p style="margin-top: 0">
              Peeking hourly at a weekly test and stopping when p &lt; 0.05
              inflates false positive rate far beyond 5%. With daily checks over
              10 days, true alpha can reach 15-20%. The problem: each peek is
              another chance to hit 0.05 by chance. <strong>Solutions:</strong>{" "}
              Use alpha spending functions (allocate alpha budget across planned
              looks) or always-valid sequential tests that maintain proper
              coverage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              UNIT OF RANDOMIZATION
            </p>
            <p style="margin-top: 0">
              <strong>User level:</strong> Clean independence between
              observations, standard errors work. But you get fewer units than
              requests.
              <br />
              <strong>Session/request level:</strong> More observations, faster
              tests. But observations from the same user are correlated. You
              need cluster-robust standard errors (clustering by user) to avoid
              inflated significance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MARKETPLACE INTERFERENCE
            </p>
            <p style="margin-top: 0">
              In two-sided marketplaces (rideshare, e-commerce with shared
              inventory), treatment affects control through shared resources. If
              treatment users book more drivers, fewer drivers remain for
              control. User-level randomization is biased.{" "}
              <strong>Switchback experiments</strong> randomize entire regions
              by time slots (15-minute periods), trading unbiasedness for
              practicality.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Switchback reduces interference
              bias by 60-70% but widens confidence intervals by 20-30% because
              you have fewer independent units (time slots) than users.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RATIO METRICS
            </p>
            <p style="margin-top: 0">
              Metrics like revenue per session or clicks per user require
              special handling. Naive intervals treating numerator and
              denominator as independent produce wrong coverage. Use the delta
              method (Taylor expansion) or bootstrap. Delta method is 10-100x
              faster at scale.
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
                  Peeking inflates false positive rate from 5% to 15-20%; use
                  alpha spending or always-valid sequential tests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Session-level randomization needs cluster-robust standard
                  errors to avoid inflated significance from correlated
                  observations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Marketplace interference: switchback experiments randomize
                  regions by time slots, reducing bias 60-70% but widening CI
                  20-30%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ratio metrics (revenue/session) need delta method or
                  bootstrap; naive intervals produce wrong coverage
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
                  Explain the peeking problem: daily checks for 10 days inflates
                  true alpha from 5% to 15-20%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe unit of randomization trade-off: user level is clean
                  but slow, request level is fast but needs clustering
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention switchback for marketplaces: randomize entire city by
                  15-min slots to avoid shared resource contamination
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalSignificanceTradeOffsSequentialMonitoringUnitOfRandomizationAndIntervalMethods;
