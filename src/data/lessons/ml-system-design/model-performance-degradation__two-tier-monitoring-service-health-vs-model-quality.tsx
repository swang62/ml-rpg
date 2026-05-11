import type { Component } from "solid-js";

const LessonModelPerformanceDegradationTwoTierMonitoringServiceHealthVsModelQuality: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Two Tier Monitoring: Service Health vs Model Quality
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SERVICE HEALTH TIER
            </p>
            <p>
              The first monitoring tier tracks infrastructure health: Is the
              model serving predictions? At what latency? Are there errors?
            </p>
            <p>
              <strong>Key metrics:</strong> Request rate (QPS), latency (p50,
              p95, p99), error rate (5xx responses, timeout rate), throughput
              (successful predictions per second).
            </p>
            <p>
              <strong>Thresholds:</strong> Error rate &gt; 1% for 5 minutes
              triggers alert. P99 latency &gt; 200ms (or your SLO) triggers
              investigation. These are standard SRE metrics applied to ML
              systems.
            </p>
            <p>
              Service health alerts require immediate response. A model
              returning errors is worse than a model returning slightly wrong
              predictions. Prioritize availability first.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL QUALITY TIER
            </p>
            <p>
              The second tier tracks prediction quality: Are the predictions
              accurate? Is the model degrading?
            </p>
            <p>
              <strong>Key metrics:</strong> Accuracy, precision, recall, AUC,
              NDCG—whatever metrics you optimized during training. Business
              proxy metrics: CTR, conversion rate, revenue impact.
            </p>
            <p>
              <strong>Challenge:</strong> Quality metrics require ground truth
              labels, which arrive with delay. A fraud label might take 30 days.
              During that time, you do not know true model performance.
            </p>
            <p>
              <strong>Workarounds:</strong> Use proxy metrics that arrive faster
              (clicks vs conversions). Monitor prediction distribution shifts.
              Compare model predictions to rule-based baselines.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INTEGRATION
            </p>
            <p>
              Both tiers feed into a unified alerting system. Service health
              alerts page on-call immediately. Quality alerts may have lower
              urgency but still require investigation within hours.
            </p>
            <p>
              Dashboard layout: service health on left (green/red status),
              quality metrics on right (trend lines over time). One glance shows
              system status.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Service health is
              non-negotiable—monitor from day one. Model quality monitoring can
              start simpler and mature over time.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Service Health SLOs
                  </strong>
                  <div style="font-size: 12px; line-height: 1.5">
                    Alert: <strong>Seconds to Minutes</strong>
                    <br />
                    Metrics: p99 latency, error rate, CPU
                    <br />
                    Example: Latency &gt; 100ms for 2 min → Page
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ⚡ Fast Path
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Model Quality Proxies
                  </strong>
                  <div style="font-size: 12px; line-height: 1.5">
                    Alert: <strong>Minutes to Hours</strong>
                    <br />
                    Metrics: score drift, CTR calibration
                    <br />
                    Example: PSI &gt; 0.25 for 2 windows → Warn
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  🐌 Slow Path
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Ground Truth Metrics
                  </strong>
                  <div style="font-size: 12px; line-height: 1.5">
                    Alert: <strong>Hours to Days</strong>
                    <br />
                    Metrics: AUC, RMSE, conversion lift
                    <br />
                    Example: Daily AUC drop &gt; 2% → Investigate
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
                  Service health: QPS, latency (p50/p95/p99), error rate,
                  throughput; requires immediate response when degraded
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model quality: accuracy, precision, recall, business metrics;
                  requires labels (often delayed) or proxy metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Integrate both tiers: service health alerts page immediately;
                  quality alerts require investigation within hours
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
                  Interview Tip: Explain why service health is monitored
                  separately—availability before accuracy.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe label delay workarounds: proxy
                  metrics, prediction distribution monitoring, rule baselines.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPerformanceDegradationTwoTierMonitoringServiceHealthVsModelQuality;
