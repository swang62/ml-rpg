import type { Component } from "solid-js";

const LessonDiversityExplorationFailureModesMisalignedRewardsTrainingServingSkewAndNonStationarity: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Misaligned Rewards, Training Serving Skew, and
            Non-Stationarity
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
                Exploration strategies can backfire. Too much exploration annoys
                users. Poorly targeted exploration wastes impressions.
                Understanding failure modes helps calibrate exploration
                properly.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Exploration Fatigue
            </p>
            <p style="margin-top: 0">
              Users exposed to too many irrelevant items become frustrated. If
              exploration rate is 20% and exploration items convert at 50% of
              baseline, user experience degrades noticeably. Monitor user
              complaints and session abandonment rates segmented by exploration
              exposure.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Exploration on Wrong Items
            </p>
            <p style="margin-top: 0">
              Random exploration shows items completely irrelevant to the user.
              A gaming enthusiast sees baby products. Targeted exploration
              limits exploration to items plausibly relevant based on content
              similarity or segment affinity. Reduces wasted impressions while
              still collecting useful signals.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Insufficient Exploration Budget
            </p>
            <p style="margin-top: 0">
              With epsilon = 0.01, new items get almost no exposure. Cold start
              persists indefinitely. Models never improve. Minimum viable
              exploration is typically 5-10% of impressions. Below that, the
              system stagnates.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Interview Deep-Dive:</strong> "How do you decide how
              much to explore?" Explain the trade-off: higher exploration hurts
              short-term engagement but improves long-term model quality and
              catalog health. Quantify: "We A/B tested 5%, 10%, and 15%
              exploration. 10% gave best 30-day retention despite 3% lower
              immediate CTR."
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
                  Misaligned reward signals cause bandits to optimize the wrong
                  objective. CTR optimization may select clickbait; use
                  composite rewards (clicks × completion × satisfaction).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Logging integrity is critical: decision-time propensities must
                  match logged propensities exactly. Version mismatches corrupt
                  offline policy evaluation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Non-stationarity from seasonal shifts, content changes, or
                  user behavior evolution requires decaying posteriors or
                  windowed statistics to adapt.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Long-tail sparse-traffic entities never accumulate enough
                  samples to converge. Hierarchical bandits share information
                  across similar arms to accelerate learning.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Positional bias and interaction effects mean a slate items
                  reward depends on context from other shown items. Naive
                  bandits ignore these dependencies.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversarial or bot traffic inflates reward for some arms.
                  Streaming pipelines should filter and deduplicate events
                  before updating bandit statistics.
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
                  When asked about common failures: explain the clickbait
                  problem - optimizing clicks alone selects misleading content;
                  use composite rewards (clicks × completion) or satisfaction
                  signals.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For non-stationarity: describe decaying posteriors (multiply
                  counts by 0.95 weekly) or windowed statistics to adapt when
                  true arm values shift over time.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing low traffic: mention pooling sparse segments
                  into umbrella groups that share bandit statistics, preventing
                  individual segments from having insufficient data to converge.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDiversityExplorationFailureModesMisalignedRewardsTrainingServingSkewAndNonStationarity;
