import type { Component } from "solid-js";

const LessonAutomatedRollbackImplementingTheCanaryControlLoop: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementing the Canary Control Loop
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Architecture
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                The <strong>canary control loop</strong> is a closed feedback
                system: watch for new revisions → deploy canary instances →
                define traffic plan → evaluate metrics in rolling windows →
                promote or rollback automatically.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRAFFIC PLAN
            </p>
            <p style="margin-top: 0">
              Start at 5-10% canary weight, increase by 5% per step, cap at 50%,
              health checks every 30-60 seconds. Baseline for comparison: stable
              version receiving remaining traffic, or dedicated baseline
              instance set with matched size and zone distribution to avoid
              cross-zone latency bias.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              METRIC EVALUATION
            </p>
            <p style="margin-top: 0">
              Query metrics from canary and baseline over rolling window (last
              3-5 intervals). Apply pass/fail logic: success rate ≥99%, P99
              &lt;500ms, error rate increase &lt;50% vs baseline, CPU &lt;90%,
              memory &lt;95%, CTR drop &lt;5-10%.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Decision Logic:</strong> If all checks pass for
              majority of window (3 out of 5), increase weight. If 5-10
              consecutive failures, immediately route all traffic to stable,
              scale down canary, record decision with telemetry.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROMOTION AND ROLLBACK
            </p>
            <p style="margin-top: 0">
              Promotion: canary reaches cap (50%) with all checks passing
              sustained → mark canary as new primary, route 100%, scale down old
              stable. Rollback is idempotent: multiple commands result in same
              end state (0% canary, 100% stable). Define as declarative resource
              with thresholds, step size, interval, metric queries.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ML ROLLOUT LAYERS
            </p>
            <p style="margin-top: 0">
              1) Shadow mode: validate latency, resources, predictions (no user
              impact). 2) Small canary 5%: gate on fast guardrails. 3) Add slow
              ML metrics (AUC drift, calibration, CTR) in background. 4) Promote
              to 50%, then 100% after final validation. Keep feature parity
              checks, monitor distribution shift, maintain policies in source
              control.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 90%; text-align: center">
                  <strong style="font-size: 13px">New Revision Detected</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 90%; text-align: center">
                  <strong style="font-size: 13px">
                    Deploy Canary + Baseline
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Start: 5% canary, 95% stable
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 90%">
                  <strong style="font-size: 13px">
                    Evaluate Metrics (every 30s)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Compare rolling window (3 to 5 intervals)
                    <br />
                    Check: success, latency, CPU, CTR
                  </div>
                </div>
                <div style="display: flex; gap: 10px; width: 90%; margin-top: 4px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">All Pass</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Increase by 5%
                      <br />
                      10% → 15% → 20%...
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">5+ Failures</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Rollback to 0%
                      <br />
                      Scale down canary
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 90%; text-align: center; margin-top: 4px">
                  <strong style="font-size: 13px">
                    Reach 50% (all checks pass)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Promote canary → 100% primary
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
                  Control loop queries metrics every 30 to 60 seconds over
                  rolling windows of 3 to 5 intervals, applies pass or fail to
                  each guardrail, increases canary weight by 5 percent if all
                  pass or rollback after 5 to 10 failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical traffic plan: start 5 to 10 percent, increase by 5
                  percent steps, cap at 50 percent, checks run for 15 to 30
                  minutes total ramp time with pauses to accumulate signal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Baseline comparison uses matched instance set in same
                  availability zones to avoid cross zone latency bias, compares
                  success rate, P99 latency, error rate delta, CPU, memory, and
                  business metrics like CTR drop within 5 to 10 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For ML, layer rollout: shadow mode first (validate latency and
                  distributions), then 5 percent online canary (fast
                  guardrails), then 50 percent (add slow ML metrics), then 100
                  percent after final validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Promotion and rollback actions are idempotent and observable,
                  versioned in source control, with clear telemetry and
                  notifications, tools like Flagger automate this loop
                  declaratively with Kubernetes and service mesh integration
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
                  Flagger Canary resource defines step size 5 percent, interval
                  30 seconds, max weight 50 percent, thresholds for request
                  success rate 99 percent and P99 latency 500 ms, integrates
                  with Istio for traffic splitting and Prometheus for metric
                  queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix Kayenta compares time series from canary and baseline,
                  computes statistical scores for each metric, aggregates to
                  overall pass or fail decision, triggers promotion or rollback
                  via deployment API with full audit trail
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutomatedRollbackImplementingTheCanaryControlLoop;
