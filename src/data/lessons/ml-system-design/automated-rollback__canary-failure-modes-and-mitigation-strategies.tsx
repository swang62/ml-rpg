import type { Component } from "solid-js";

const LessonAutomatedRollbackCanaryFailureModesAndMitigationStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Canary Failure Modes and Mitigation Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Critical Failures
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Canary analysis fails from <strong>low traffic volume</strong>{" "}
                (noisy comparisons), <strong>warm-up effects</strong> (false
                alarms at start), <strong>threshold misconfiguration</strong>,
                and <strong>hidden segment regressions</strong>.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LOW TRAFFIC VOLUME
            </p>
            <p style="margin-top: 0">
              Need several thousand requests/minute/instance for statistical
              validity. Below that, variance creates noise → false rollback
              alarms or missed regressions. Unequal instance sets amplify: if
              baseline has 99 instances and canary has 1, single outage has 100×
              impact on canary metrics. Fix: compare equally sized monitoring
              sets, ensure enough traffic per instance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WARM-UP EFFECTS
            </p>
            <p style="margin-top: 0">
              New service has cold JVM JIT compilation, cold CPU/GPU caches.
              Latency spikes 2-5× during first minutes, triggering rollback even
              though canary would be fine once warmed. Fix: run shadow traffic
              5-10 min first, add pause before first analysis window, or send
              synthetic load to pre-warm instances.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THRESHOLD MISCONFIGURATION
            </p>
            <p style="margin-top: 0">
              Too tight (99.95% on service that runs 99.9%): frequent false
              rollbacks. Too loose (allow 10% error increase): miss regressions.
              Calibrate from historical baselines over weeks. Use rolling
              windows (majority of checks passing over 3-5 intervals) to smooth
              spikes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Business Metric Lag:</strong> Infra metrics update every
              30s but CTR needs 10-30 min. Canary might pass fast guardrails and
              ramp to 50% before slow metrics reveal business impact.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SEGMENT REGRESSIONS
            </p>
            <p style="margin-top: 0">
              Overall CTR flat while new-user CTR drops 20%. Track critical
              segments separately and require all to pass. Deploy baseline and
              canary in same availability zones with matched resources to avoid
              zone-specific biases.
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
                  Low traffic (below several thousand requests per minute per
                  instance) produces noisy comparisons and false alarms, unequal
                  instance sets (99 baseline vs 1 canary) skew error rates by
                  100 times
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warm up effects from cold JIT, caches, or GPU memory can spike
                  latency 2 to 5 times in first minutes, causing false rollback,
                  mitigate with 5 to 10 minute shadow warm up before analysis
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Threshold misconfiguration (99.95 percent when baseline varies
                  around 99.9 percent) causes frequent false rollbacks,
                  calibrate from weeks of historical data and use rolling
                  windows of 3 to 5 checks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Business metric lag (CTR needs 10 to 30 minutes to accumulate
                  signal) can let canary ramp to 50 percent before regression
                  detected, layer fast infra gates with slow business checks
                  that can halt or rollback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segment regressions (new user CTR drops 20 percent while
                  overall CTR flat) hide in aggregates, track critical cohorts
                  separately and require all segments to pass thresholds
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
                  Adobe found unequal canary and baseline instance counts caused
                  misleading error rate comparisons, fixed by sampling equal
                  sized monitoring sets and requiring several thousand requests
                  per minute per instance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta recommendation canary showed stable aggregate CTR but new
                  user segment CTR dropped 15 percent, caught by segment level
                  analysis that failed rollout before reaching full traffic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutomatedRollbackCanaryFailureModesAndMitigationStrategies;
