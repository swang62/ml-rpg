import type { Component } from "solid-js";

const LessonRampUpStrategiesImplementationTrafficRoutingMetricCollectionAndDecisionEngine: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation: Traffic Routing, Metric Collection, and Decision
            Engine
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRAFFIC ROUTING IMPLEMENTATION
            </p>
            <p style="margin-top: 0">
              Implement consistent hashing in your load balancer or application
              layer.{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                bucket = hash(user_id) mod 10000
              </code>
              . At 5% canary, route buckets 0-499 to new version. For stratified
              sampling, first assign users to segments (mobile buckets 0-5999,
              desktop 6000-9999), then apply percentage within each segment.
              Store the assignment decision in a cookie or session to ensure
              sticky routing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              METRIC COLLECTION PIPELINE
            </p>
            <p style="margin-top: 0">
              Tag every request with: version (control/canary), cohort bucket,
              user segment, timestamp. Aggregate at 1-5 minute granularity for
              fast feedback. Use 5-15 minute trailing windows for comparison.
              Stream events to a real-time aggregation system that computes
              running statistics: mean latency, error rate, CTR by cohort. Store
              raw events for post-hoc analysis.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TWO-LAYER DECISION ENGINE
            </p>
            <p style="margin-top: 0">
              <strong>Layer 1 (automatic):</strong> Guardrail violations trigger
              immediate rollback. Error rate delta &gt; 0.1% for 5 minutes, P99
              &gt; 300ms for 10 minutes, or feature null rate &gt; 1%. No human
              intervention required.
              <br />
              <strong>Layer 2 (statistical):</strong> Product metrics require
              statistical tests with CUPED adjustment and multiple comparison
              correction. Compute confidence intervals and p-values. Alert
              humans for borderline cases.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Automate guardrail rollbacks
              but require human approval for product metric decisions. Machines
              catch crashes; humans judge trade-offs.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RAMP SCHEDULE WITH GATES
            </p>
            <p style="margin-top: 0">
              Typical schedule: 0.5% → 1% → 5% → 10% → 25% → 50% → 100%. Between
              each step, verify: latency delta within bounds, error rate stable,
              downstream service headroom sufficient, no data quality alerts.
              Log each gate decision for audit. Full ramp typically takes 24-48
              hours with conservative gates.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 14px">
                  Decision Engine Architecture
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Layer 1: Guardrails (Auto Rollback)
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    • Error rate Δ &gt; 0.1% for 5 min
                    <br />• P99 latency &gt; 300ms for 10 min
                    <br />• Feature nulls &gt; 0.5%
                    <br />
                    <strong>→ Immediate rollback to 0%</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Layer 2: Product Metrics (Statistical)
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    • CTR: CUPED + Mann Whitney U<br />• Minimum detectable:
                    0.3% change
                    <br />• Power: 80% over 2h at 5% traffic
                    <br />
                    <strong>→ Promote if within ±0.2% &amp; CI passes</strong>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Metric Collection Pipeline
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    Request → Tag (version, cohort, device)
                    <br />→ Stream (1-5 min windows)
                    <br />→ Histogram (P50/P95/P99) + Counters
                    <br />→ Dashboard + Alerting
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
                  Routing: hash(user_id) mod 10000 → bucket; at 5%, route
                  buckets 0-499 to canary; store in cookie for sticky assignment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metrics: tag every request with version/cohort/segment,
                  aggregate at 1-5 min granularity, use 5-15 min trailing
                  windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two-layer decisions: Layer 1 auto-rollback on guardrails
                  (error, latency, nulls), Layer 2 statistical tests for product
                  metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ramp schedule: 0.5% → 1% → 5% → 10% → 25% → 50% → 100% with
                  gates verifying latency, errors, downstream capacity
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
                  Walk through the hash implementation: user 123456 hashes to
                  bucket 6456, stays in control until 64.56% ramp
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain two-layer decisions: machines auto-rollback on
                  guardrails, humans approve product metric trade-offs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe a typical ramp schedule with gates: 24-48 hours from
                  0.5% to 100% with verification at each step
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRampUpStrategiesImplementationTrafficRoutingMetricCollectionAndDecisionEngine;
