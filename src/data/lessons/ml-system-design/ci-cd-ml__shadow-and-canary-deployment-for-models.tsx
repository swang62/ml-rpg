import type { Component } from "solid-js";

const LessonCiCdMlShadowAndCanaryDeploymentForModels: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Shadow and Canary Deployment for Models
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
              <strong>Shadow deployment</strong> runs a candidate model on live
              traffic without affecting user responses—logging predictions and
              latency for comparison. <strong>Canary deployment</strong> sends a
              small percentage of real traffic to the candidate while monitoring
              metrics in real time.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            SHADOW DEPLOYMENT
          </p>
          <p style="margin-top: 0">
            Shadow for 10M requests over 2 hours, recording both models outputs,
            feature fetch times, and inference latencies. This surfaces
            training-serving skew, numerical differences, feature availability
            issues, and tail latency problems before any user sees the new
            model. Cost: doubled inference load. Benefit: catches
            environment-specific issues like cache behavior, load balancing
            artifacts, and upstream service variability that offline replay
            misses.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            CANARY PROGRESSION
          </p>
          <p style="margin-top: 0">
            Typical progression: 1% traffic for 30 min (catch obvious
            regressions), then 5% for 2 hours, then 25%, then full rollout. At
            each stage, automated guards check: p95 latency under 50ms, error
            rate under 0.1%, online metric delta within 2%.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Warning:</strong> Watch tail latencies (p99, p999). Mean
            latency can look fine while a small slice of users experiences 500ms
            responses due to cold cache or autoscaling lag.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            AUTOMATED ROLLBACK
          </p>
          <p style="margin-top: 0">
            If any guard breaches its SLO for sustained period (p95 &gt; 50ms
            for 15 consecutive minutes, or CTR drop &gt; 2% for 30 minutes),
            revert to prior model in under 2 minutes. Requirements: keep both
            model binaries loaded or quickly loadable, maintain feature schema
            compatibility during rollout window, pre-warm caches the old model
            needs.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Metrics:</strong> Prediction distribution shifts
            (alert if p50 changes &gt; 10%), feature fetch p99, and business
            KPIs. Shadow mode compares recommendations on same user request
            between models for offline precision, diversity, novelty before
            launching A/B test.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">
                  Shadow: 10M requests, 2 hours
                </strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Both models inference in parallel
                  <br />
                  No user impact, log predictions
                  <br />
                  Check: p95 latency, score distribution
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓ Pass guards
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">Canary 1%: 30 minutes</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Live traffic, affect 1% users
                  <br />
                  Watch: p99 &lt;100ms, CTR delta &lt;2%
                  <br />
                  Rollback in &lt;2 min if breach
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓ Pass guards
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">
                  Canary 5%: 2 hours → 25% → 100%
                </strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Progressive traffic shift
                  <br />
                  Continuous guard evaluation
                  <br />
                  Dual model compatibility maintained
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
                Shadow deployment doubles inference cost during evaluation
                (example 10 million requests over 2 hours) but catches training
                serving skew, feature availability issues, and tail latency
                problems that offline replay misses
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Canary progression: 1 percent for 30 minutes, 5 percent for 2
                hours, 25 percent, then full rollout with automated guards
                watching p95 latency under 50ms, error rate under 0.1 percent,
                business metric delta within 2 percent
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Automated rollback must complete in under 2 minutes when guards
                breach SLOs, requiring both model versions loaded or quickly
                loadable and schema compatibility for both feature versions
                during rollout window
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Tail latency (p99, p999) can hide regressions that mean latency
                misses: A model with 45ms mean but 500ms p99 due to cold cache
                or autoscaling lag will degrade user experience for a visible
                slice
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Guard duration matters: Sustained breaches (example p95 greater
                than 50ms for 15 consecutive minutes) prevent false positives
                from transient spikes, but delay rollback during real issues
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Shadow reveals distribution shifts: If candidate model predicts
                20 percent higher scores on average than baseline on same
                requests, likely indicates calibration or numerical skew even if
                offline metrics looked good
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
                Uber ETA prediction canary: Monitors prediction distribution
                (alerts if p50 predicted time shifts by more than 10 percent),
                feature fetch p99 latency, driver acceptance rate, starting at 1
                percent traffic in a single city before geographic expansion
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix personalization shadow: Runs candidate recommendation
                model on replayed user requests, logs both models' top 10
                recommendations, computes offline precision at 10, diversity
                (intra list distance), and novelty (popularity decay) before A/B
                test
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Google Search ranking rollout: Ties canary metrics to experiment
                platform, automatically halts if statistically significant
                regression in query success rate, click through rate, or time to
                success appears within first 6 hours at 5 percent traffic
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonCiCdMlShadowAndCanaryDeploymentForModels;
