import type { Component } from "solid-js";

const LessonModelGovernanceContinuousMonitoringForDriftBiasAndPolicyViolations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Continuous Monitoring for Drift, Bias, and Policy Violations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Continuous monitoring</strong> is the operational
                control loop detecting drift, bias, and policy violations in
                near real-time—catching harmful changes before they accumulate
                impact.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA DRIFT MEASUREMENT
            </p>
            <p style="margin-top: 0">
              Compare feature distributions to training baseline.{" "}
              <strong>PSI:</strong> &lt;0.1 stable, 0.1-0.2 investigate, &gt;0.2
              significant drift. Compute per feature every 5 minutes on sliding
              window. At 50K RPS, sample 1% to keep computation tractable. Use
              KL divergence or KS tests for more sensitivity.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERFORMANCE MONITORING
            </p>
            <p style="margin-top: 0">
              Join predictions with ground truth as labels arrive (fraud labels:
              hours, CTR: seconds). Compute rolling AUC, precision, recall over
              1h and 24h windows. Alert if 1h AUC drops &gt;5 points below 24h
              average—indicates sudden performance cliff.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> Monitor high-dimensional embeddings
              by tracking distribution of norms or principal components, not raw
              dimensions—computationally tractable at scale.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BIAS MONITORING
            </p>
            <p style="margin-top: 0">
              Check fairness across protected attributes: demographic parity
              (prediction rate difference), equalized odds (TPR/FPR difference),
              calibration disparity. Compute subgroup metrics hourly by joining
              predictions with demographics.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AUTOMATED POLICY GATES
            </p>
            <p style="margin-top: 0">
              Define thresholds: if PSI &gt;0.3 for 15 min or subgroup AUC
              &lt;0.75, auto-rollback within 2 min. Maintain rollback stack of
              last 3 approved versions. Trigger escalation with diagnostic
              runbook.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Sensitive thresholds catch issues
              faster but cause false alarms. Tune based on historical incident
              data and business tolerance for false positives.
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
                  Population Stability Index (PSI) quantifies data drift with
                  thresholds: less than 0.1 is stable, 0.1 to 0.2 warrants
                  investigation, greater than 0.2 requires intervention such as
                  retraining or traffic diversion to a previous model version
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 50,000 Requests Per Second (RPS), sample 1 percent of
                  traffic (500 RPS) for drift computation every 5 minutes to
                  keep costs tractable, alert only if PSI exceeds 0.2 for three
                  consecutive windows to avoid false positives from transient
                  spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Performance monitoring joins predictions with delayed ground
                  truth labels (fraud confirmed hours later, Click Through Rate
                  or CTR known in seconds), compute rolling Area Under the Curve
                  (AUC) over 1 hour and 24 hour windows, alert if 1 hour drops
                  more than 5 points below 24 hour baseline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bias metrics like demographic parity difference (positive rate
                  gap across groups) and equalized odds (True Positive Rate or
                  TPR and False Positive Rate or FPR gaps) are computed hourly,
                  alert if parity exceeds 5 percent or subgroup AUC drops more
                  than 3 points, require minimum 1000 samples per group to avoid
                  denominator instability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated policy gates divert traffic to last known good model
                  within 2 minutes when thresholds breach (PSI greater than 0.3
                  for 15 minutes, subgroup AUC below 0.75), maintain rollback
                  stack of last three approved versions for fast recovery
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For systems without timely labels (long term outcomes), use
                  proxy metrics like prediction confidence distributions, shadow
                  model agreement rates, or user engagement signals (Netflix
                  monitors play rate and completion rate as proxies for
                  recommendation quality)
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
                  Fraud detection system computes PSI on transaction_amount and
                  merchant_category features every 5 minutes, sample 500 RPS
                  from 50K total, alert fires when PSI=0.25 sustained for 3
                  windows (15 min), incident runbook triggers rollback to model
                  v3.1 within 2 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta fairness monitoring samples 10,000 predictions per hour,
                  joins with user demographics (age, gender, region), computes
                  demographic parity: positive_rate_groupA minus
                  positive_rate_groupB, alerts if difference exceeds 5%,
                  escalates to Responsible AI review board for investigation and
                  potential model retrain
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation model without ground truth labels
                  monitors prediction confidence (entropy of top 10 scores) and
                  user engagement (play rate within 24 hours), sudden drop in
                  play rate from 65% to 55% triggers alert, investigation finds
                  upstream data pipeline dropped a key feature causing drift
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelGovernanceContinuousMonitoringForDriftBiasAndPolicyViolations;
