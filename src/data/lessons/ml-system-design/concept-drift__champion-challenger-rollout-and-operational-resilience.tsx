import type { Component } from "solid-js";

const LessonConceptDriftChampionChallengerRolloutAndOperationalResilience: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Champion Challenger Rollout and Operational Resilience
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHAMPION-CHALLENGER ARCHITECTURE
            </p>
            <p>
              Champion is the current production model. Challengers are
              candidate models training in parallel. Challengers compete on
              held-out validation data or shadow traffic. When a challenger
              consistently beats the champion, it becomes the new champion.
            </p>
            <p>
              Key parameters: evaluation window (how long must challenger
              outperform?), significance threshold (by how much?), and rollback
              criteria (when does new champion revert?). Typical values: 7-day
              evaluation window, 1% improvement threshold, rollback if
              performance drops 2% within 48 hours.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GRADUAL ROLLOUT
            </p>
            <p>
              Even after a challenger wins, roll out gradually. Start with 1%
              traffic. Monitor for 24 hours. Increase to 10%, 50%, then 100%
              over days. This catches issues that did not appear in shadow
              evaluation.
            </p>
            <p>
              Canary metrics: latency, error rate, business metrics. Any
              degradation triggers pause. Significant degradation triggers
              rollback. Automated rollback must complete within minutes to limit
              blast radius.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OPERATIONAL RESILIENCE
            </p>
            <p>
              <strong>Model versioning:</strong> Every model deployment is
              versioned. Previous versions remain available for instant
              rollback. Retain at least 3 versions.
            </p>
            <p>
              <strong>Feature availability monitoring:</strong> Models depend on
              features. If a feature pipeline fails, model predictions degrade.
              Monitor feature freshness and availability. Fallback to cached or
              default features when live features fail.
            </p>
            <p>
              <strong>Graceful degradation:</strong> When models fail entirely,
              fall back to simpler models or rule-based systems. A
              recommendation system might fall back to popularity-based
              recommendations. Degraded service is better than no service.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RUNBOOK ESSENTIALS
            </p>
            <p>
              <strong>Drift detected:</strong> Verify drift is real. Check data
              quality. If confirmed, trigger retraining. Monitor challenger
              progress.
            </p>
            <p>
              <strong>Performance drop:</strong> Identify affected segments.
              Check feature pipelines. If model issue, rollback to previous
              version. If data issue, fix pipeline.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Operational resilience is about
              speed of recovery, not prevention of all failures. Assume models
              will degrade. Build systems that detect quickly and recover
              automatically.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 4px">
                  Champion Challenger Rollout
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Shadow Inference: 1 to 5% traffic
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Log predictions from both models
                    <br />
                    Zero user impact, compare metrics
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓ If no regression
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Canary: 1% → 5% → 25% traffic
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Auto rollback if revenue drops &gt; 2%
                    <br />
                    or precision drops &gt; 5% or latency exceeds SLO
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓ If metrics healthy
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Promote Challenger to Champion: 100%
                  </strong>
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
                  Champion-challenger: 7-day evaluation window typical, 1%
                  improvement threshold, rollback if 2% drop within 48h
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradual rollout: 1% → 10% → 50% → 100% with automated rollback
                  on degradation (latency, errors, business metrics)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operational resilience: model versioning (3+ versions),
                  feature monitoring with fallbacks, graceful degradation
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
                  Interview Tip: Walk through champion-challenger promotion
                  criteria and rollback triggers.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain graceful degradation—what happens when
                  the ML model fails completely?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonConceptDriftChampionChallengerRolloutAndOperationalResilience;
