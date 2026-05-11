import type { Component } from "solid-js";

const LessonBiasDetectionMitigationProductionFairnessArchitectureAndMonitoring: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Fairness Architecture and Monitoring
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fairness Pipeline Architecture
            </p>
            <p style="margin-top: 0">
              Build fairness into your ML pipeline, not as an afterthought.{" "}
              <strong>Data layer:</strong> Track demographic distribution in
              training data. Alert if representation drops below threshold
              (e.g., Group B below 15% of data).{" "}
              <strong>Training layer:</strong> Compute fairness metrics on
              validation set during training. If demographic parity ratio drops
              below 0.8, trigger alert. <strong>Serving layer:</strong> Log
              predictions with demographic attributes to separate audit table.
              Never store demographics in main prediction path.{" "}
              <strong>Monitoring layer:</strong> Dashboard showing fairness
              metrics over time, sliced by deployment region and model version.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Continuous Monitoring Setup
            </p>
            <p style="margin-top: 0">
              Fairness can drift. A model fair at deployment may become unfair
              as user population changes. Monitor:{" "}
              <strong>Demographic parity ratio:</strong> Alert if falls below
              0.8. <strong>Equalized odds difference:</strong> Alert if exceeds
              0.1 (10 percentage points). <strong>Calibration by group:</strong>{" "}
              Plot weekly reliability diagrams.{" "}
              <strong>Feature drift by group:</strong> If Group B feature
              distributions shift more than Group A, investigate. Typical
              cadence: daily automated checks, weekly manual review, monthly
              fairness audit report.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Incident Response
            </p>
            <p style="margin-top: 0">
              When fairness alerts trigger:{" "}
              <strong>Severity 1 (legal risk):</strong> Model showing clear
              discrimination (demographic parity below 0.5). Immediate rollback
              to previous version. <strong>Severity 2 (degradation):</strong>{" "}
              Fairness metrics declining but above threshold. Investigate root
              cause within 48 hours.{" "}
              <strong>Severity 3 (monitoring gap):</strong> Cannot compute
              fairness metrics due to missing demographics. Not immediately
              actionable but must fix data collection. Document all incidents in
              fairness incident log for regulatory audits.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> More granular demographic slices
              reveal more potential bias but require more data for statistical
              significance. With 5 groups and 4 subgroups each, you need 20x
              more data than single-group analysis.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 15px">
                  Production Fairness Data Flow
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Request + Join Key</strong>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Scorer (no sensitive attrs)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10K QPS | p99 &lt; 100ms
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Event: Join Key + Prediction
                  </strong>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Secure Join with Sensitive Attrs
                  </strong>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Streaming</strong>
                    <div>24hr windows</div>
                    <div>&lt; 2ms latency</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Batch</strong>
                    <div>Daily reports</div>
                    <div>1B records in 15min</div>
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
                  Four-layer architecture: data (representation tracking),
                  training (validation metrics), serving (audit logging),
                  monitoring (dashboards)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alert thresholds: demographic parity ratio below 0.8,
                  equalized odds difference above 0.1
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor weekly calibration by group using reliability diagrams
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Severity levels: S1 (immediate rollback), S2 (48hr
                  investigation), S3 (data collection fix)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical cadence: daily automated, weekly manual review,
                  monthly audit report
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
                  Describe four-layer fairness architecture with specific alert
                  thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention keeping audit logs separate from main prediction path
                  for access control
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBiasDetectionMitigationProductionFairnessArchitectureAndMonitoring;
