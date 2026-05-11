import type { Component } from "solid-js";

const LessonSearchPersonalizationFailureModesAndProductionSafetyInRealTimePersonalization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Production Safety in Real-Time Personalization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Session Store Failures
            </p>
            <p style="margin-top: 0">
              The session store is a single point of failure for
              personalization. If it becomes unreachable or latency spikes
              beyond budget (&gt;10ms), personalization must degrade gracefully.
              Options: (1) Skip personalization entirely, return un-personalized
              results. (2) Use stale cached session data if available. (3) Fall
              back to long-term profile only. The search must complete
              regardless. A 3-second hang waiting for session data is worse than
              no personalization.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Filter Bubble and Echo Chamber
            </p>
            <p style="margin-top: 0">
              Aggressive personalization creates filter bubbles: user clicks
              electronics, sees only electronics, clicks more electronics, sees
              even more electronics. The system reinforces existing preferences
              while hiding potentially interesting items. Fix: reserve 10-20% of
              results for exploration (non-personalized, diverse items). Cap the
              personalization boost so it adjusts rankings but doesn't
              completely dominate. Monitor diversity metrics (category coverage,
              item age distribution) alongside CTR.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              Stale Session State
            </p>
            <p style="margin-top: 0">
              Session features have propagation delay (100-500ms from click to
              searchable). During rapid browsing, the user may search before
              their last click is reflected. More seriously: if the stream
              processor falls behind, session state can be minutes stale.
              Monitor lag between event timestamp and processing time. If lag
              exceeds threshold (e.g., 30 seconds), alert and potentially
              disable personalization until caught up.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cold Start Handling
            </p>
            <p style="margin-top: 0">
              New users have no long-term profile; new sessions have no clicks
              yet. Personalization must handle both. For new users: use
              segment-level preferences (users in same demographic), or skip
              personalization and rely on query relevance. For new sessions:
              rely entirely on long-term profile until first click, then
              gradually blend in session signals. Never crash or error on
              missing data; always have a fallback path.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Safety Guardrails
            </p>
            <p style="margin-top: 0">
              <strong>Circuit breaker:</strong> If personalization error rate
              exceeds 5%, disable it automatically.{" "}
              <strong>Latency timeout:</strong> Hard cutoff at 30ms; skip if not
              ready. <strong>A/B testing:</strong> Always run personalization
              against a holdout group to measure true lift vs potential harm.{" "}
              <strong>Rollback capability:</strong> Feature flags to instantly
              disable personalization without deployment.
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
                  Session store failure: degrade gracefully by skipping
                  personalization, using cache, or falling back to long-term
                  only
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Filter bubbles: cap personalization boost, reserve 10-20% for
                  exploration, monitor diversity metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale session: monitor stream processor lag; if &gt;30 seconds
                  behind, consider disabling personalization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start: new users use segment preferences; new sessions
                  rely on long-term profile until first click
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Guardrails: circuit breaker at 5% error rate, 30ms hard
                  timeout, A/B testing with holdout, instant rollback via
                  feature flags
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
                  Explain the filter bubble problem: clicks reinforce
                  preferences, hiding potentially interesting items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe graceful degradation: session store down → skip
                  personalization, return unpersonalized results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  List guardrails: circuit breaker, latency timeout, A/B
                  holdout, feature flag rollback
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchPersonalizationFailureModesAndProductionSafetyInRealTimePersonalization;
