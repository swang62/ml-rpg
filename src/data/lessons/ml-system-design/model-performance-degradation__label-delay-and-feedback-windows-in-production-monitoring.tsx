import type { Component } from "solid-js";

const LessonModelPerformanceDegradationLabelDelayAndFeedbackWindowsInProductionMonitoring: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Label Delay and Feedback Windows in Production Monitoring
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE LABEL DELAY PROBLEM
            </p>
            <p>
              Performance monitoring requires ground truth. You need to know
              what the correct answer was to measure whether predictions were
              right. But labels arrive with delay: clicks happen quickly,
              conversions take days, fraud confirmation takes weeks.
            </p>
            <p>
              <strong>Click/engagement:</strong> 0-seconds to minutes. Fast
              feedback available.
            </p>
            <p>
              <strong>Conversion/purchase:</strong> Hours to days. Most users
              who will convert do so within 7 days.
            </p>
            <p>
              <strong>Fraud confirmation:</strong> 30-90 days. Investigations
              take time.
            </p>
            <p>
              <strong>Churn:</strong> 30-180 days. You only know someone churned
              after they leave.
            </p>
            <p>
              During label delay, you cannot measure true performance. A model
              deployed today might be failing, but you will not know for 30
              days.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FEEDBACK WINDOW DESIGN
            </p>
            <p>
              Choose appropriate windows for different metrics. For fraud,
              define a 30-day attribution window: if no fraud reported within 30
              days, consider the prediction correct. This introduces some error
              but enables monitoring.
            </p>
            <p>
              <strong>Early feedback windows:</strong> Monitor faster-arriving
              proxy metrics (clicks instead of conversions) for early signal.
              Proxy-actual correlation may weaken over time—track this drift.
            </p>
            <p>
              <strong>Partial labels:</strong> Use available labels to update
              monitoring even if incomplete. If 70% of labels have arrived after
              7 days, compute metrics on that 70%. Update as more labels arrive.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LEADING VS LAGGING INDICATORS
            </p>
            <p>
              <strong>Leading indicators:</strong> Data drift, prediction
              distribution shift, feature quality degradation. These can be
              measured immediately and often precede performance drops.
            </p>
            <p>
              <strong>Lagging indicators:</strong> Accuracy, precision, recall
              on labeled data. Definitive but delayed.
            </p>
            <p>
              Use leading indicators for early warning, lagging indicators for
              confirmation. If leading indicators suggest problems but lagging
              metrics are stable when they arrive, investigate—you may have
              caught something early.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> Design monitoring around your
              specific label latency. Fast-label domains (clicks) can rely on
              direct metrics. Slow-label domains (fraud) must use leading
              indicators and proxy metrics.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 13px; margin-bottom: 6px">
                  Prediction to Label Timeline
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 11px">Day 0</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Prediction logged
                    </div>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 11px">Day 1 to 7</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Early conversions
                    </div>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center">
                    <strong style="font-size: 11px">Day 28</strong>
                    <div style="font-size: 10px; margin-top: 3px">
                      Attribution window closes
                    </div>
                  </div>
                </div>
                <div style="margin-top: 8px; border-top: 2px solid; padding-top: 10px">
                  <div style="font-size: 11px; line-height: 1.6">
                    <strong>Proxy Metrics:</strong> Available Day 0, alert in
                    minutes
                    <br />
                    <strong>Partial Labels:</strong> Available Day 1 to 7,
                    trending signals
                    <br />
                    <strong>Complete Labels:</strong> Available Day 28,
                    definitive evaluation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 6px">
                  <strong style="font-size: 11px; display: block; margin-bottom: 4px">
                    Monitoring Strategy:
                  </strong>
                  <div style="font-size: 10px; line-height: 1.5">
                    Use proxies for fast detection → Confirm with delayed ground
                    truth → Retrain if both signals agree
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
                  Label delay varies: clicks (seconds), conversion (days), fraud
                  (30-90 days), churn (months)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback window design: define attribution windows, use proxy
                  metrics for early signal, use partial labels
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Leading indicators (drift, feature quality) are immediate;
                  lagging indicators (accuracy) are definitive but delayed
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
                  Interview Tip: Give specific label latency examples for your
                  domain and explain monitoring implications.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain leading vs lagging indicators and how
                  they complement each other.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPerformanceDegradationLabelDelayAndFeedbackWindowsInProductionMonitoring;
