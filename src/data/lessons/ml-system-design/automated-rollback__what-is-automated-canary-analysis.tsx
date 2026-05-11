import type { Component } from "solid-js";

const LessonAutomatedRollbackWhatIsAutomatedCanaryAnalysis: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Automated Canary Analysis?
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
              <strong>Automated canary analysis</strong> routes a small
              percentage of production traffic to a new model or service
              version, continuously measures health and quality metrics, then
              automatically promotes or rolls back based on objective
              thresholds—removing humans from the critical decision loop.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            HOW IT WORKS
          </p>
          <p style="margin-top: 0">
            Deploy canary alongside stable version. Direct 5-10% of traffic to
            canary. Run health checks every 30-60 seconds comparing metrics
            against baseline: success rate ≥99%, P99 latency &lt;500ms, CPU
            &lt;90%, business metrics (conversion rate not down &gt;5%).
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            PROGRESSIVE ROLLOUT
          </p>
          <p style="margin-top: 0">
            If all checks pass, controller increases canary traffic by step
            amount (typically 5% increments). If thresholds violated repeatedly
            (5-10 consecutive failures), route all traffic back to stable within
            minutes and mark rollout failed. Full ramp from 0% to 50% takes
            15-30 minutes with pauses between steps to accumulate signal.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Insight:</strong> Small blast radius (only 5-10% exposed
            initially), fast automated detection (minutes not hours), and clear
            rollback paths without human intervention in critical loop.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            ML SPECIFIC CONSIDERATIONS
          </p>
          <p style="margin-top: 0">
            Layer model quality signals on top of infrastructure SLOs. Beyond
            latency and error rates, monitor prediction quality: AUC drift,
            calibration error, CTR changes. Best accuracy requires several
            thousand requests per minute per instance—lower traffic produces
            noisy comparisons and false alarms.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Key Metrics:</strong> Request success rate, P99 latency,
            CPU usage, plus ML-specific: prediction distribution shift,
            calibration slope, and business metrics like conversion rate or
            click-through rate.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Stable (90%)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    99.5% success
                    <br />
                    450ms P99
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Canary (10%)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    99.3% success
                    <br />
                    480ms P99
                  </div>
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">
                  Health Check (every 30s)
                </strong>
                <div style="font-size: 11px; margin-top: 6px">
                  ✓ Success rate ≥ 99%
                  <br />✓ P99 latency &lt; 500ms
                  <br />✓ CPU &lt; 90%, Memory &lt; 95%
                  <br />✓ CTR drop &lt; 5%
                </div>
              </div>
              <div style="display: flex; gap: 12px; margin-top: 4px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 12px">All Pass</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Increase to 15%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 12px">5+ Failures</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Rollback to 0%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Traffic starts at 5 to 10 percent canary, increases by 5 percent
                steps every 30 to 60 seconds if checks pass, typical ramp to 50
                percent takes 15 to 30 minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Health checks combine infrastructure SLOs (99 percent success
                rate, 500 ms P99 latency, 90 percent CPU threshold) with ML or
                business metrics (CTR drop within 5 percent, AUC drift)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Automatic rollback triggers after 5 to 10 consecutive threshold
                violations, routes all traffic back to stable within minutes
                with no human intervention
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Adobe reports best accuracy with several thousand requests per
                minute per instance, low traffic produces noisy comparisons and
                false rollback alarms
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Systems compare canary metrics against baseline (stable version
                or dedicated instance set) in rolling windows of 3 to 5
                intervals to smooth variance
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
                Netflix uses Kayenta to automate canary analysis, comparing time
                series metrics between canary and baseline, assigning pass or
                fail scores, then promoting or rolling back based on configured
                thresholds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Adobe integrated Kayenta with New Relic and custom log anomaly
                detectors, achieving reliable rollouts with canaries at
                production scale of thousands of requests per minute, catching
                regressions before full deployment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonAutomatedRollbackWhatIsAutomatedCanaryAnalysis;
