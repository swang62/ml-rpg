import type { Component } from "solid-js";

const LessonColdStartProblemProgressiveProfilingAndIdentityResolutionForUserColdStart: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Progressive Profiling and Identity Resolution for User Cold Start
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
                <strong>Progressive profiling</strong> collects user preferences
                through explicit signals during onboarding and implicit signals
                during usage. The goal: accelerate the transition from cold to
                warm as fast as possible.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Explicit Onboarding
            </p>
            <p style="margin-top: 0">
              Ask users their preferences directly. "What genres do you like?"
              or "Select 5 items you have enjoyed." This gives immediate signal.
              Danger: onboarding friction causes drop-off. Keep it under 30
              seconds. 3-5 selections is the sweet spot. More reduces completion
              rates without proportional gain.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implicit Signal Extraction
            </p>
            <p style="margin-top: 0">
              Every interaction is signal. Clicks, scroll depth, time on page,
              search queries. Weight these by strength: purchase beats click,
              long dwell beats short dwell. Build user profile as weighted
              combination of item features from interacted items.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Identity Resolution
            </p>
            <p style="margin-top: 0">
              Users often visit before signing up. If you can link pre-signup
              browsing to post-signup account, the user is no longer cold. Use
              device fingerprinting, cookies, or IP address (with privacy
              considerations) to connect sessions. This can reduce effective
              cold start rate by 30-50%.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Question:</strong> "How would you handle new
              user cold start?" Walk through: (1) identity resolution to check
              if user has prior anonymous sessions, (2) lightweight onboarding
              to collect explicit preferences, (3) segment-based defaults, (4)
              rapid profile building from early interactions. Show you think
              about the full funnel.
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
                  Progressive profiling uses lightweight onboarding interactions
                  (selecting 3 to 5 artists, liking 5 to 10 titles) to generate
                  initial embeddings, reducing time to first good recommendation
                  from days to under 60 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Onboarding friction trade-off: asking for 10 preferences can
                  drop signup completion by 10 to 20%, but dramatically improves
                  early session quality; optimal designs use one tap choices and
                  adaptive questioning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Identity resolution links devices, browsers, and sessions into
                  unified user profiles using deterministic keys (login, email)
                  and privacy safe probabilistic signals (device fingerprints,
                  behavioral consistency)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Session based models personalize in real time using only the
                  last 2 to 3 interactions, critical for anonymous users,
                  typically implemented with RNNs or transformers over last 10
                  to 20 actions with sub 50ms inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unified identity graphs enable deduplicated exposures across
                  devices (don't show same item twice), correct attribution for
                  conversions, and recency weighted feature aggregation for
                  personalization
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
                  When asked about onboarding: explain preference collection
                  (select 5-10 interests/artists/genres) that seeds initial
                  embeddings, reducing cold start period from days to minutes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For cross-device identity: mention probabilistic identity
                  graphs linking sessions via login, device fingerprints, email;
                  unified profiles accelerate personalization.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing ROI: explain that good onboarding can improve
                  new user retention by 10-20% by delivering relevant content in
                  first session instead of generic recommendations.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonColdStartProblemProgressiveProfilingAndIdentityResolutionForUserColdStart;
