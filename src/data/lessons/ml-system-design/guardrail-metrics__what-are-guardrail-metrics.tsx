import type { Component } from "solid-js";

const LessonGuardrailMetricsWhatAreGuardrailMetrics: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What Are Guardrail Metrics?
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
              <strong>Guardrail metrics</strong> are safety thresholds that must
              not degrade during an experiment, even if primary metrics improve.
              They protect against winning on optimization targets while harming
              user experience or business health.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Why Guardrails Matter
          </p>
          <p style="margin-top: 0">
            Optimizing for clicks can increase clickbait. Optimizing for revenue
            can push users to expensive items they later return. Optimizing for
            engagement can increase addictive patterns that hurt long-term
            retention. Guardrails catch these pathologies before they ship.
          </p>
          <p>
            Without guardrails, experiments optimize locally (the measured
            metric) at the expense of global health. A 5% click increase with 3%
            retention drop nets negative long-term value, but youd never know
            without measuring retention as a guardrail.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Guardrail Categories
          </p>
          <p style="margin-top: 0">
            <strong>User experience:</strong> page load time, error rates, crash
            rates, rage clicks. <strong>Business health:</strong> revenue per
            user, return rates, support contacts.{" "}
            <strong>Long-term engagement:</strong> 7-day retention, 28-day
            active rate, unsubscribe rate. <strong>Platform trust:</strong> spam
            reports, policy violations.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Key Trade-off:</strong> More guardrails mean safer
            experiments but slower iteration. If 10 guardrails each have 5%
            false positive rate, 40% of valid experiments get blocked by random
            noise.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Guardrail vs Primary Metrics
          </p>
          <p style="margin-top: 0">
            Primary metrics are what you optimize for - they must improve to
            ship. Guardrails are what you protect - they must not degrade beyond
            threshold. An experiment can ship with flat guardrails, but never
            with degraded guardrails, even if primary metrics are stellar.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 14px">Goal Metric</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    CTR: +2.1%
                    <br />
                    Target: improve
                  </div>
                </div>
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 14px">Guardrail 1</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    p95 Latency: +180ms
                    <br />
                    Threshold: +50ms
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 14px">Guardrail 2</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    28d Retention: -0.3%
                    <br />
                    Threshold: -0.5%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 14px">Decision</strong>
                  <div style="margin-top: 6px; font-size: 13px; font-weight: bold">
                    BLOCK ROLLOUT
                    <br />
                    Latency violated
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
                Guardrails are safety thresholds that must not degrade, even if
                primary metrics improve
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Categories: user experience (latency, errors), business health
                (revenue, returns), long-term engagement (retention)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Primary metrics must improve to ship; guardrails must not
                degrade beyond threshold
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                More guardrails = safer but slower; 10 guardrails at 5% FPR
                blocks 40% of valid experiments
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
                When explaining guardrails: describe protecting against local
                optimization harming global health (clicks up, retention down)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                For categories: list UX (latency, crashes), business (revenue,
                returns), long-term (retention, churn)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonGuardrailMetricsWhatAreGuardrailMetrics;
