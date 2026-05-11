import type { Component } from "solid-js";

const LessonBusinessMetricsCorrelationProductionImplementationAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA INFRASTRUCTURE
            </p>
            <p>
              Correlation analysis requires joining model metrics with business
              metrics. This is harder than it sounds. Model metrics are logged
              in real-time at millisecond granularity. Business metrics
              (purchases, subscriptions) may come from different systems with
              different schemas, retention policies, and identifiers.
            </p>
            <p>
              <strong>Event stitching:</strong> Join model predictions to
              business outcomes using user ID, session ID, or request ID. Handle
              timing: a prediction at time T might lead to a purchase at time
              T+3 days. Join windows must be configured per business metric.
            </p>
            <p>
              <strong>Attribution:</strong> When multiple model predictions
              precede a business outcome, how do you attribute credit?
              Last-touch attributes all credit to the final prediction.
              Multi-touch distributes credit across the funnel. Position-based
              gives more weight to first and last touches.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SEGMENTATION
            </p>
            <p>
              Aggregate correlations hide important variation. The correlation
              between model AUC and revenue might be 0.3 overall, but 0.7 for
              power users and 0.1 for casual users. Segmenting reveals where
              model improvements matter most and enables targeted optimization.
            </p>
            <p>
              Key segments: user tenure (new vs established), engagement level
              (high vs low), platform (mobile vs desktop), geography, and
              product category. Choose segments aligned with business
              priorities.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DASHBOARDS AND MONITORING
            </p>
            <p>
              <strong>Real-time tracking:</strong> Display model metrics
              alongside business metrics. When model accuracy drops, does
              revenue follow? Lag-adjusted views account for delayed business
              metric updates.
            </p>
            <p>
              <strong>Alerting:</strong> Alert when correlation breaks down. If
              historically model improvements led to revenue improvements but
              suddenly they diverge, something changed—new confounders, market
              shifts, or data quality issues.
            </p>
            <p>
              <strong>Trend analysis:</strong> Track transfer functions over
              time. If the relationship between CTR and revenue weakens,
              investigate why. Saturation effects, competitive dynamics, or user
              behavior changes may explain drift.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Build dashboards that show
              model and business metrics side-by-side with configurable lag
              windows. Enable drilling into segments to identify where
              correlations are strongest.
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
                  Event stitching joins model predictions to business
                  outcomes—requires user/session IDs and configurable join
                  windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Attribution models (last-touch, multi-touch) distribute credit
                  when multiple predictions precede an outcome
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segmentation reveals where correlations are strongest—optimize
                  for high-impact segments first
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
                  Interview Tip: Explain event stitching challenges—different
                  systems, schemas, and timing windows.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe why aggregate correlations can be
                  misleading—segment to find true drivers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBusinessMetricsCorrelationProductionImplementationAtScale;
