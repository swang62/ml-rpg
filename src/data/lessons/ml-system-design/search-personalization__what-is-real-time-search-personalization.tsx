import type { Component } from "solid-js";

const LessonSearchPersonalizationWhatIsRealTimeSearchPersonalization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Real-Time Search Personalization?
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
                <strong>Real-time search personalization</strong> adapts search
                results to individual users based on their recent behavior
                within the current session, not just their historical profile.
                The key difference from batch personalization: features are
                computed and applied within milliseconds of user actions.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Session Context Matters
            </p>
            <p style="margin-top: 0">
              A user searching for "python" could want the snake, the
              programming language, or Monty Python. Historical preferences
              help, but the current session tells you definitively. If they just
              clicked a coding tutorial, "python" means programming. If they
              came from a pet store page, it means snake. Real-time
              personalization uses these in-session signals to disambiguate
              intent within 10-50ms of the search.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch vs Real-Time Personalization
            </p>
            <p style="margin-top: 0">
              <strong>Batch personalization:</strong> Pre-computes user
              preferences overnight or hourly. Stores a static user profile
              (interests, categories, price ranges). Fast to serve but reflects
              who the user was hours ago, not who they are now.{" "}
              <strong>Real-time personalization:</strong> Updates the user's
              context with every click, view, and search within the session.
              Captures intent shifts (started browsing electronics, now looking
              at gifts). Requires streaming infrastructure to compute features
              in &lt;50ms.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Latency Challenge
            </p>
            <p style="margin-top: 0">
              Search has strict latency budgets: total response time under
              200ms. Within that, personalization gets maybe 20-30ms. You must
              fetch user context, compute personalized features, blend them into
              the ranking score, and return results. The architecture uses
              pre-computed embeddings (user and item vectors stored for fast
              lookup) combined with real-time session features (last 5 clicks,
              current query). Heavy computation happens offline; real-time only
              does lightweight lookups and score adjustments.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Real-time personalization doesn't
              replace historical profiles; it blends short-term session signals
              with long-term preferences. A user's lifetime preference for
              premium brands still matters, but their current session's
              budget-shopping behavior should shift results toward deals.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">User Query</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    "hotels near beach"
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Retrieval</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    500 to 5,000 candidates | 15 to 50ms
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Personalized Ranking</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Short-term: last 15 min clicks
                    <br />
                    Long-term: 30 to 90 day prefs
                    <br />
                    Scoring: 3 to 10ms for 1,000 candidates
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Ranked Results</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    End to end: 50 to 150ms p95
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
                  Real-time personalization adapts results based on current
                  session behavior, not just historical profiles
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Session context disambiguates intent: "python" means different
                  things depending on what user just clicked
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch personalization reflects who user was hours ago;
                  real-time captures intent shifts within the session
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Strict latency budget: personalization gets 20-30ms within a
                  200ms total search response
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Architecture blends pre-computed embeddings (fast lookup) with
                  real-time session features (last N clicks)
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
                  Explain the python example: same query, different intent based
                  on session context (coding vs pet store)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Contrast batch vs real-time: batch is hours-old static
                  profile, real-time captures intent shifts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the latency constraint: 20-30ms for personalization
                  within 200ms total response
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchPersonalizationWhatIsRealTimeSearchPersonalization;
