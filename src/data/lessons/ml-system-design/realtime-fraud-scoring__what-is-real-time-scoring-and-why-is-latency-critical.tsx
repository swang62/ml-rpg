import type { Component } from "solid-js";

const LessonRealtimeFraudScoringWhatIsRealTimeScoringAndWhyIsLatencyCritical: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Real-Time Scoring and Why is Latency Critical?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Definition:</strong> Real-time scoring is the process of
              computing ML model predictions within strict latency bounds
              (typically 10-100ms) as part of a synchronous request flow. The
              user or system waits for the prediction before proceeding—blocking
              until the score is returned.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Latency Matters
            </p>
            <p>
              In fraud detection, a 200ms delay on every transaction degrades
              user experience noticeably. In ad ranking, every 100ms of latency
              costs measurable revenue. In recommendations, slow responses cause
              users to scroll past before personalized content loads. The model
              must return a decision within the allocated time budget or the
              system falls back to defaults.
            </p>
            <p>
              Latency requirements cascade through the system. If the total API
              budget is 150ms and database lookups take 50ms, the model has only
              100ms for feature computation, inference, and response formatting
              combined.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Latency Budget
            </p>
            <p>
              Real-time systems allocate latency budgets to each component:
              feature retrieval (5-20ms), feature transformation (1-5ms), model
              inference (5-50ms), post-processing (1-5ms), network overhead
              (5-15ms). The total must stay under the SLA. Exceeding any
              component budget triggers timeouts or degraded responses.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Insight:</strong> P99 latency matters more than
              average. If 1% of requests take 500ms, that is 10,000 slow
              requests per million—enough to impact user experience and trigger
              SLA violations. Design for the tail, not the mean.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real-Time vs Batch vs Streaming
            </p>
            <p>
              Batch scoring runs offline on stored data—no latency constraints.
              Streaming scoring processes events continuously with seconds of
              delay. Real-time scoring is synchronous: the request waits for the
              response. Each has different infrastructure requirements and model
              optimization strategies.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">User Request</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Payment / Search / Ride
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Feature Fetch</strong>
                  <div style="font-size: 11px; margin-top: 4px">2 to 10ms</div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Model Inference</strong>
                  <div style="font-size: 11px; margin-top: 4px">2 to 50ms</div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 13px">Response</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    p99 &lt; 100ms total
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
                  Real-time scoring requires predictions within 10-100ms as part
                  of synchronous request flows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency budgets cascade: if total API budget is 150ms and DB
                  takes 50ms, model gets only 100ms for everything else
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  P99 latency matters more than average—1% slow requests at
                  scale means thousands of degraded user experiences
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
                  When asked about latency requirements, break down the budget:
                  feature retrieval 5-20ms, inference 5-50ms, network 5-15ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain that every 100ms of latency in ad ranking costs
                  measurable revenue—the business case for optimization is
                  concrete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeFraudScoringWhatIsRealTimeScoringAndWhyIsLatencyCritical;
