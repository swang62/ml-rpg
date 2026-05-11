import type { Component } from "solid-js";

const LessonModelVersioningRollbackFastRollbackStrategiesAndAutomatedDecisionMaking: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Fast Rollback Strategies and Automated Decision Making
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Three Pillars of Safe Rollback
            </p>
            <p style="margin-top: 0">
              Rollback is the operational capability to revert traffic to a
              previous model version within minutes when the new version
              degrades functional or business metrics. Safe rollback depends on
              three pillars: immutability (old versions remain deployable),
              decoupled routing (traffic switches without redeploying code), and
              compatibility (input/output schemas and feature availability
              align). Uber targets rollback completion in minutes by demoting
              the canary in the model registry and switching traffic at the
              routing layer, without touching code deployment pipelines.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Automated Guardrail Metrics
            </p>
            <p style="margin-top: 0">
              Automated rollback uses guardrail metrics with predefined
              thresholds. Infrastructure guardrails include: p99 latency
              inflation greater than 20 percent, error rate increase above 0.5
              percentage points, timeout rate spikes, CPU or memory saturation
              exceeding 80 percent. Business guardrails might be CTR drop
              exceeding 2 percent or conversion rate delta beyond confidence
              intervals. Netflix's Kayenta performs statistical comparison
              between baseline and canary time series, triggering rollback when
              deviations exceed 3 standard deviations.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The False Positive Trade-off
            </p>
            <p style="margin-top: 0">
              The tradeoff is false positive rate: overly sensitive thresholds
              cause unnecessary rollbacks that waste engineering time and delay
              feature velocity; loose thresholds allow regressions to persist
              and harm users. Production systems tune thresholds based on
              historical variance. If your baseline p99 latency fluctuates by 10
              percent day to day, a 15 percent threshold will fire too often.
              Start conservative (higher thresholds) and tighten as you gain
              confidence in metric stability.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stateful Model Complications
            </p>
            <p style="margin-top: 0">
              Online learning systems or contextual bandits accumulate state;
              rolling back the binary without reverting state yields
              inconsistent behavior. Mitigation requires versioning the state
              store and coordinating snapshots. Cache interactions also matter:
              a new model warms caches with different keys; rollback increases
              cache miss rates temporarily, spiking latency until caches
              repopulate. LinkedIn addresses this with cache version namespaces
              and staged warming during blue green transitions.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Automated Rollback Decision Flow
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong>Canary Metrics Collection</strong>
                  <br />
                  <span style="font-size: 12px">
                    p99 latency, error rate, CTR, conversion
                  </span>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong>Guardrail Checks</strong>
                  <br />
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; font-size: 11px">
                    <div style="border: 1px solid; padding: 6px; border-radius: 4px">
                      p99 latency
                      <br />
                      +20% threshold
                    </div>
                    <div style="border: 1px solid; padding: 6px; border-radius: 4px">
                      Error rate
                      <br />
                      +0.5pp threshold
                    </div>
                    <div style="border: 1px solid; padding: 6px; border-radius: 4px">
                      CTR drop
                      <br />
                      &gt;2% threshold
                    </div>
                    <div style="border: 1px solid; padding: 6px; border-radius: 4px">
                      Timeout rate
                      <br />
                      spike detected
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 16px; align-items: center; justify-content: center">
                  <div style="font-size: 20px; font-weight: bold">↙</div>
                  <div style="font-size: 20px; font-weight: bold">↘</div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Threshold Breached</strong>
                    <br />
                    Auto rollback
                    <br />
                    (minutes)
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Metrics Healthy</strong>
                    <br />
                    Promote to
                    <br />
                    next stage
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
                  Fast rollback requires immutable old versions, decoupled
                  traffic routing (switch at load balancer not redeploy), and
                  schema compatibility; Uber completes rollbacks in minutes via
                  registry demotion and traffic flip
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated guardrails trigger rollback on thresholds like p99
                  latency increase above 20 percent, error rate spike over 0.5
                  percentage points, or CTR drop exceeding 2 percent with
                  statistical significance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stateful models (online learning, contextual bandits) require
                  state store versioning; rolling back binary without state
                  snapshot causes inconsistent predictions and behavior
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache interactions complicate rollback: new models warm caches
                  with different keys, so reverting increases miss rates
                  temporarily and spikes latency until caches repopulate with
                  old patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tradeoff between false positives and detection speed: overly
                  sensitive thresholds cause unnecessary rollbacks and slow
                  iteration; loose thresholds allow regressions to impact users
                  for hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Chronic rollbacks indicate systemic issues (training serving
                  skew, inadequate offline validation); sometimes a targeted
                  roll forward hotfix (config adjustment, feature toggle) is
                  safer than reverting to an old model with known weaknesses
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
                  LinkedIn enforces strict tail latency Service Level Objectives
                  (SLOs) with p99 in tens of milliseconds per subcall; automated
                  rollback triggers when canary inflates latency beyond
                  guardrails, protecting aggregate page load times across
                  billions of daily predictions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix Kayenta compares time series metrics between baseline
                  and canary using statistical tests (Mann Whitney U, Kolmogorov
                  Smirnov); significant deviations in latency or KPIs trigger
                  automated rollback and alert oncall engineers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelVersioningRollbackFastRollbackStrategiesAndAutomatedDecisionMaking;
