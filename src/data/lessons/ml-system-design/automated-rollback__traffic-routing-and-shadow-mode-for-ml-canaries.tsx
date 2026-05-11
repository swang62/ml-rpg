import type { Component } from "solid-js";

const LessonAutomatedRollbackTrafficRoutingAndShadowModeForMlCanaries: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Traffic Routing and Shadow Mode for ML Canaries
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Traffic routing</strong> determines which requests hit
                canary vs baseline. <strong>Shadow mode</strong> (dark traffic)
                duplicates requests to canary but discards responses—zero user
                impact for initial validation.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERCENTAGE ROUTING
            </p>
            <p style="margin-top: 0">
              Default approach: 10% to canary, 90% to stable via load balancer
              or service mesh weighted routing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STICKY ROUTING
            </p>
            <p style="margin-top: 0">
              Critical for ML: same user hitting canary→stable→canary sees
              different predictions, causing confusion. Hash user ID or session
              cookie to deterministically assign each user to canary or stable
              for entire rollout duration.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COHORT ROUTING
            </p>
            <p style="margin-top: 0">
              Header/cookie based: internal users get canary header for
              dogfooding before external exposure. Cohort based: split by
              geography, device, segment. Example: canary mobile model only on
              iOS/US, keep Android and other regions on stable. Reduces blast
              radius for targeted changes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Shadow Mode:</strong> Primary requests go to stable
              (responses to users). Duplicated requests sent to canary,
              responses discarded. Measure latency, resource usage, prediction
              distributions under live load before live canary.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SHADOW MODE LIMITS
            </p>
            <p style="margin-top: 0">
              Cannot catch issues depending on user feedback loops or state
              changes. Recommendation model in shadow cannot see if users click
              new suggestions. Write-heavy services or those with side effects
              (notifications, payments) cannot safely use shadow—duplicated
              writes corrupt state. For these: move directly to small live
              canary with careful monitoring.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Pattern:</strong> Use shadow mode to validate QPS
              handling and prediction distribution stability, then move to live
              canary for engagement metrics.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">User Request</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Routing Layer</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Hash(user_id) % 100 &lt; 10 ? canary : stable
                  </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 4px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Stable (90%)</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Returns to user
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Canary (10%)</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Returns to user
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 8px">
                  <strong style="font-size: 12px">
                    Shadow Mode Alternative
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Primary → User (stable response)
                    <br />
                    Mirror → Canary (discard response)
                    <br />
                    Measure: latency, resource, distribution
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
                  Sticky routing using hash of user identifier ensures each user
                  sees consistent version (canary or stable) for entire rollout,
                  avoids confusing prediction or ranking changes mid session
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow mode duplicates requests to canary but discards
                  responses, measures inference latency and prediction
                  distributions under live load with zero user impact, used by
                  Google and Uber for pre canary validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cohort based routing splits by geography, device, or user
                  segment (iOS in US only), reduces blast radius for targeted
                  changes and enables segment specific metric collection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow mode cannot catch feedback loop issues or engagement
                  impact since users never see canary predictions, also unsafe
                  for write heavy services with side effects (duplicated writes
                  corrupt state)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Header or cookie routing enables dogfooding with internal
                  users or beta cohorts before external exposure, useful for
                  controlled A/B tests with specific user groups
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
                  Uber shadows new ETA prediction models to validate inference
                  latency stays under 50 ms and prediction distributions match
                  expected ranges under live QPS, then moves to 5 percent live
                  canary to measure actual trip acceptance rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix uses sticky routing keyed by subscriber identifier to
                  ensure each user sees consistent recommendations throughout a
                  canary rollout, avoiding jarring changes if user refreshes and
                  hits different model version
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutomatedRollbackTrafficRoutingAndShadowModeForMlCanaries;
