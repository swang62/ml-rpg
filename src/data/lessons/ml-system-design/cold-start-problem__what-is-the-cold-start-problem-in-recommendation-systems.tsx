import type { Component } from "solid-js";

const LessonColdStartProblemWhatIsTheColdStartProblemInRecommendationSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is the Cold Start Problem in Recommendation Systems?
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
                <strong>Cold start</strong> is the inability to make quality
                recommendations when you lack interaction data. New users have
                no history for personalization. New items have no engagement
                signals. The recommendation system falls back to generic or
                random suggestions.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Three Cold Start Types
            </p>
            <p style="margin-top: 0">
              <strong>User cold start:</strong> A new user signs up. You know
              nothing about their preferences. Collaborative filtering cannot
              find similar users. Content-based has no profile to match against.
              First-session experience is critical for retention, yet you have
              zero signal.
            </p>
            <p>
              <strong>Item cold start:</strong> A new product is added to
              catalog. No users have interacted with it. Collaborative models
              ignore it. Even if the item would be highly relevant to many
              users, it gets zero exposure. This kills long-tail discovery.
            </p>
            <p>
              <strong>System cold start:</strong> Launching a new recommendation
              system with no historical data. Everything is cold. This is the
              hardest case, requiring bootstrapping strategies like importing
              data from related systems.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Cold Start Hurts Business
            </p>
            <p style="margin-top: 0">
              New user retention correlates strongly with first-session
              relevance. If recommendations are random, users leave. Studies
              show 20-40% higher churn in the first week for users who
              experienced poor initial recommendations. New items that never get
              exposure become dead inventory.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Cold start is not an edge case.
              For growing platforms, 10-30% of users and 5-15% of items may be
              cold at any time. Treating it as an afterthought means degraded
              experience for a significant portion of traffic.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 16px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">User Cold Start</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      New user
                      <br />0 interactions
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Item Cold Start</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      New product
                      <br />0 views/clicks
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Context Cold Start</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      New market
                      <br />
                      No local data
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold; margin: 8px 0">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Collaborative Filtering Fails
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Cannot compute similarity without interactions
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
                  User cold start affects new and anonymous users who lack
                  interaction history, preventing personalized recommendations
                  until sufficient behavioral data accumulates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item cold start impacts new catalog entries with zero
                  engagement, creating a catch 22 where items need exposure to
                  get interactions but need interactions to get exposure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Context cold start occurs when launching in new geographic
                  markets or product verticals where existing interaction
                  distributions and priors don't transfer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Collaborative filtering methods, which typically perform best
                  at scale, are unusable in cold start scenarios because they
                  fundamentally require interaction matrices that don't yet
                  exist
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production impact is measurable: reducing time to first good
                  recommendation from days to minutes improves new user
                  activation rates and prevents new inventory from being
                  permanently suppressed
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
                  When asked to define cold start: explain the chicken-and-egg
                  problem - collaborative filtering needs interactions to learn,
                  but new users/items have none; content and exploration bridge
                  the gap.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For scope discussion: distinguish user cold start (new
                  account, no history) from item cold start (new product, no
                  engagement data) - solutions differ significantly.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing severity: mention that cold start affects
                  10-30% of traffic on typical platforms (new users, new content
                  daily); ignoring it hurts growth metrics.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonColdStartProblemWhatIsTheColdStartProblemInRecommendationSystems;
