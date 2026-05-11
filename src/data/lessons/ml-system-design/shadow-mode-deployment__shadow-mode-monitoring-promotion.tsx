import type { Component } from "solid-js";

const LessonShadowModeDeploymentShadowModeMonitoringPromotion: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Shadow Mode Monitoring and Promotion Analysis
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
                <strong>Shadow mode monitoring</strong> compares shadow
                predictions against production to validate behavior—tracking
                divergence, latency, and errors without affecting users.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPARISON METRICS
            </p>
            <p style="margin-top: 0">
              <strong>Divergence:</strong> How often do shadow and production
              disagree? <strong>Distribution shift:</strong> Are outputs
              similar? <strong>Error delta:</strong> Compare error rates where
              ground truth exists. <strong>Edge cases:</strong> Focus on tail
              inputs where models diverge.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERFORMANCE MONITORING
            </p>
            <p style="margin-top: 0">
              <strong>Latency:</strong> Shadow P50, P95, P99 vs production.{" "}
              <strong>Resources:</strong> CPU, memory, GPU.{" "}
              <strong>Throughput:</strong> Can shadow handle production volume?{" "}
              <strong>Stability:</strong> Error rates, timeouts over shadow
              period.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> High divergence is not always bad. If
              shadow is improved, divergence means it does something
              different—validate that different means better.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ANALYSIS TECHNIQUES
            </p>
            <p style="margin-top: 0">
              <strong>Sample logging:</strong> Log prediction pairs for review.{" "}
              <strong>Slice analysis:</strong> Compare across segments.{" "}
              <strong>Regression detection:</strong> Flag where shadow is worse.{" "}
              <strong>Root cause:</strong> Trace divergence spikes to input
              patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROMOTION DECISION
            </p>
            <p style="margin-top: 0">
              <strong>Automated:</strong> Error ≤ production, latency within
              10%, stable. <strong>Manual:</strong> Review divergent
              predictions. <strong>Gradual:</strong> After shadow passes,
              promote via canary before full rollout.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Longer shadow periods add confidence
              but delay value. Set minimum durations based on traffic needed for
              significance.
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
                  Track prediction divergence, latency, and resource usage
                  during shadow period
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High divergence is not necessarily bad—validate that different
                  means better
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  After shadow validation passes, promote via canary before full
                  rollout
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
                  Log prediction pairs for manual review of divergent cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Set minimum shadow duration based on traffic volume for
                  statistical significance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonShadowModeDeploymentShadowModeMonitoringPromotion;
