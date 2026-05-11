import type { Component } from "solid-js";

const LessonModelPerformanceDegradationCanaryDeploymentsAndAutomatedRollbackForMlModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Canary Deployments and Automated Rollback for ML Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CANARY DEPLOYMENTS
            </p>
            <p>
              Instead of deploying a new model to 100% of traffic immediately,
              deploy to a small percentage (1-5%) first. Compare metrics between
              canary (new model) and control (old model).
            </p>
            <p>
              <strong>Process:</strong> Deploy new model to 1% traffic. Monitor
              for 1-24 hours depending on traffic volume and risk tolerance. If
              metrics are stable or better, gradually increase to 10%, then 50%,
              then 100%. If metrics degrade, rollback immediately.
            </p>
            <p>
              <strong>Metrics to compare:</strong> Latency (should not regress),
              error rate (should not increase), business metrics (CTR,
              conversion—should not decrease significantly).
            </p>
            <p>
              Canary deployment catches problems before they affect all users. A
              model that crashes for 1% of users is bad; a model that crashes
              for 100% is catastrophic.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AUTOMATED ROLLBACK
            </p>
            <p>
              Manual rollback is slow. By the time a human notices a problem,
              investigates, and rolls back, significant damage may have
              occurred. Automated rollback limits blast radius.
            </p>
            <p>
              <strong>Trigger criteria:</strong> Error rate &gt; 5% (immediate
              rollback). P99 latency &gt; 2x baseline (rollback after 5
              minutes). Business metric drop &gt; 10% (rollback after 15 minutes
              with sufficient statistical confidence).
            </p>
            <p>
              <strong>Implementation:</strong> Deployment system monitors
              metrics in real-time. Compares to baseline. If trigger criteria
              met, automatically routes traffic back to previous model version.
              Alerts team for investigation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              VERSION MANAGEMENT
            </p>
            <p>
              Automated rollback requires having something to roll back to.
              Maintain at least 3 previous model versions ready to serve. Store
              model artifacts with metadata (training date, data version,
              metrics).
            </p>
            <p>
              Rollback target selection: usually roll back to the immediately
              previous version. In rare cases (if previous version also had
              issues), roll back further. Version management enables this
              flexibility.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Speed of rollback matters more
              than preventing all failures. Assume some deployments will fail.
              Make recovery fast and automatic.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Traffic Split and Progressive Rollout
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px; display: block">
                      Control
                    </strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      95% traffic
                      <br />
                      Baseline model
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">vs</div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px; display: block">
                      Canary
                    </strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      5% traffic
                      <br />
                      New model
                    </div>
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center; font-weight: bold; margin: 4px 0">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px; display: block; margin-bottom: 4px">
                    Metrics Pass → Expand
                  </strong>
                  <div style="font-size: 11px; line-height: 1.4">
                    5% → 10% → 50% → 100%
                    <br />
                    Each stage: 30 to 120 min evaluation
                  </div>
                </div>
                <div style="font-size: 18px; text-align: center; font-weight: bold; margin: 4px 0">
                  OR
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px; display: block; margin-bottom: 4px">
                    Metrics Fail → Rollback
                  </strong>
                  <div style="font-size: 11px; line-height: 1.4">
                    Automatic revert &lt; 5 min
                    <br />
                    No user impact beyond canary
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
                  Canary: deploy to 1-5% first, monitor 1-24 hours, gradually
                  increase if metrics stable; catches problems early
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated rollback triggers: error rate &gt; 5%, latency &gt;
                  2x baseline, business metric drop &gt; 10% with confidence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Maintain 3+ model versions for rollback; speed of recovery
                  matters more than preventing all failures
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
                  Interview Tip: Walk through canary deployment: 1% → observe →
                  10% → 50% → 100% with rollback at each stage.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain rollback trigger criteria and why
                  different metrics have different thresholds and timing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPerformanceDegradationCanaryDeploymentsAndAutomatedRollbackForMlModels;
