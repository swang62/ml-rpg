import type { Component } from "solid-js";

const LessonColdStartProblemMultiStagePipelineLayeringPriorsToHandleColdStart: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Multi Stage Pipeline: Layering Priors to Handle Cold Start
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
                Cold start mitigation uses a layered approach: start with broad
                priors, narrow as signals accumulate. Each layer handles a
                different data density level.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Layer 1: Global Popularity
            </p>
            <p style="margin-top: 0">
              When you know nothing about a user, recommend globally popular
              items. These have high base rates of engagement. Not personalized,
              but reliably decent. Calculate popularity as interaction count
              over recency-weighted window (last 7 days). This layer catches
              completely cold users.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Layer 2: Segment Priors
            </p>
            <p style="margin-top: 0">
              If you know user demographics or acquisition channel, use
              segment-level popularity. Users from iOS app might prefer
              different items than web users. Users acquired via a gaming ad
              might prefer different items than social media referrals. Build
              popularity lists per segment.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Layer 3: Content Features
            </p>
            <p style="margin-top: 0">
              Once user shows any preference signal (clicked one item, searched
              for something), use content features to extrapolate. If user
              clicked a running shoe, recommend similar running shoes. This
              kicks in after 1-3 interactions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Layer 4: Collaborative
            </p>
            <p style="margin-top: 0">
              After 10-20 interactions, collaborative signals become reliable.
              Transition to personalized recommendations. The transition is
              gradual: blend layer weights based on signal density.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Tip:</strong> When asked about cold start in
              system design interviews, walk through this layered approach.
              Explain how each layer handles different data availability
              scenarios, and how you transition between them as signals
              accumulate.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Stage 1: Global Priors
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Popularity + Quality (0 interactions needed)
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Stage 2: Contextual Signals
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Geo, Device, Time, Language (from request)
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Stage 3: Content Similarity
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Embeddings from text/image/metadata
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Stage 4: Collaborative Filtering
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    User × Item interactions (blend after ~5+ events)
                  </div>
                </div>
                <div style="text-align: center; margin-top: 6px; font-size: 11px">
                  <strong>Latency budget: 100–200ms p95 end to end</strong>
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
                  Cold start cascade: global popularity → segment averages →
                  content similarity → collaborative filtering, with each stage
                  kicking in as signal density increases.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Signal thresholds are domain-specific: video platforms may
                  need 10+ watches before personalization, e-commerce often
                  personalizes after 3-5 product interactions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Content-based embeddings derived from text, images, and
                  metadata enable similarity-based retrieval that works
                  immediately for new items without interaction history.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Track personalization coverage (% of sessions using
                  collaborative vs fallback) and cold-to-warm transition rate as
                  key operational metrics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The fastest path out of cold start is explicit preference
                  collection (onboarding) followed by rapid signal accumulation
                  from initial sessions.
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
                  When explaining the transition: describe the cascade - global
                  popularity (0 signals) → segment averages (1-5 signals) →
                  content similarity (5-20 signals) → full personalization (20+
                  signals).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For implementation: mention that threshold tuning is
                  domain-specific; video platforms may need 10+ watches,
                  e-commerce might personalize after 3-5 product views.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about metrics: explain tracking personalization
                  coverage (% of sessions using collaborative vs fallback) and
                  cold start conversion rate vs warm users.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonColdStartProblemMultiStagePipelineLayeringPriorsToHandleColdStart;
