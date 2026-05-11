import type { Component } from "solid-js";

const LessonContinuousTrainingSafeRolloutPatternsChampionChallengerAndPhasedDeployment: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Safe Rollout Patterns: Champion Challenger and Phased Deployment
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Champion Challenger Pattern
            </p>
            <p style="margin-top: 0">
              Safe rollout is the last line of defense against regressions. The
              champion challenger pattern maintains a stable production model
              (champion) while testing a new candidate (challenger) on a small
              traffic slice. Meta and Netflix use shadow mode first: the
              challenger serves 0 percent of user facing traffic but logs
              predictions for offline comparison against the champion. This
              detects runtime issues (crashes, latency spikes, null predictions)
              without user impact.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Canary Rollout
            </p>
            <p style="margin-top: 0">
              After shadow validation, canary rollout sends 1 to 5 percent of
              live traffic to the challenger, monitoring guardrail metrics with
              statistical rigor. Uber requires the challenger to maintain equal
              or better metrics (ride acceptance rate, ETA accuracy within 10
              percent, fraud false positive rate) over 100,000 requests before
              proceeding. If any metric regresses beyond thresholds, automated
              rollback restores the champion within seconds.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Phased Rollout
            </p>
            <p style="margin-top: 0">
              Phased rollout gradually increases traffic: 5 percent to 25
              percent to 50 percent to 100 percent, with holds at each stage.
              Airbnb segments by market and user cohort to catch tail
              regressions that global metrics miss. The entire process from
              shadow to full rollout takes 3 to 14 days for high stakes models
              and 1 to 3 days for lower risk use cases.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Statistical Requirements
            </p>
            <p style="margin-top: 0">
              The key is pre registered metrics and statistical power: require
              95 percent confidence and sufficient sample size before promotion.
              Cost is duplicate serving during overlap, but catching one major
              regression pays for years of careful rollouts.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Shadow Mode</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    0% traffic, 24–48 hrs
                    <br />
                    Detect crashes, latency
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Canary</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    1–5% traffic, 1–3 days
                    <br />
                    Automated rollback on breach
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Phased Rollout</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    5% → 25% → 50% → 100%
                    <br />
                    Stratified by segment
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
                  Shadow mode runs 24 to 48 hours with 0 percent user impact to
                  detect runtime failures (crashes, latency spikes from 20ms to
                  200ms, null prediction rates) before any live traffic exposure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canary rollout to 1 to 5 percent traffic requires statistical
                  power: Netflix demands 95 percent confidence and sufficient
                  sample size (typically 1 to 7 days depending on metric
                  variance) before promoting challenger to champion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated rollback triggers on guardrail breaches: Uber rolls
                  back within seconds if challenger shows ride acceptance rate
                  drop over 2 percent, ETA error increase over 10 percent, or
                  fraud false positive rate spike
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segmented rollouts catch tail regressions: Airbnb tests in low
                  risk markets first and separates new users from power users
                  because global metric wins can hide severe regressions in
                  small high value segments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Full rollout timeline spans 3 to 14 days for high stakes
                  models (pricing, fraud) and 1 to 3 days for lower risk use
                  cases, with duplicate serving cost during overlap but catching
                  one major regression pays for years of careful rollouts
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
                  Meta ad ranking runs shadow mode processing billions of
                  requests over 48 hours, then canaries to 1 percent traffic
                  monitoring Click Through Rate (CTR), conversion rate, and
                  revenue per mille (RPM) with automated rollback if any metric
                  drops over 1 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber fraud detection uses phased rollout 1 percent to 5
                  percent to 20 percent to 100 percent over 5 days, stratifying
                  by transaction value (test low value first) and geography to
                  isolate regional attack patterns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContinuousTrainingSafeRolloutPatternsChampionChallengerAndPhasedDeployment;
