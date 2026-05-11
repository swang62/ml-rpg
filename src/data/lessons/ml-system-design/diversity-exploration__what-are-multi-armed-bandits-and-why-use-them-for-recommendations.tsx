import type { Component } from "solid-js";

const LessonDiversityExplorationWhatAreMultiArmedBanditsAndWhyUseThemForRecommendations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What are Multi-Armed Bandits and Why Use Them for Recommendations?
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
                <strong>Exploration-exploitation trade-off:</strong> Should you
                show items the model confidently predicts the user will like
                (exploit), or show items with uncertain predictions to learn
                more (explore)? Pure exploitation creates filter bubbles. Pure
                exploration annoys users with irrelevant content.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Diversity Matters
            </p>
            <p style="margin-top: 0">
              Users do not want 20 nearly identical recommendations. Even if the
              model predicts they all score 0.95, showing the same genre or
              brand 20 times is a poor experience. Diversity improves user
              satisfaction, catalog utilization, and long-term engagement even
              if it sacrifices short-term click-through rate.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Exploration Matters
            </p>
            <p style="margin-top: 0">
              Without exploration, new items never get exposure. User
              preferences never get updated. The system converges to a local
              optimum based on stale data. Exploration collects new signals that
              improve future predictions, even at the cost of current
              engagement.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Armed Bandits Framework
            </p>
            <p style="margin-top: 0">
              Think of each item as a slot machine (bandit) with unknown reward
              probability. You want to maximize total reward. Pulling only the
              best-known arm misses potentially better arms. Pulling random arms
              wastes pulls. Bandit algorithms balance this trade-off
              mathematically.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Diversity and exploration serve
              different purposes. Diversity improves user experience in a single
              session. Exploration improves model quality over time. Both
              require sacrificing short-term engagement metrics for long-term
              gains.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Arm 1: Widget A</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Unknown CTR
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Arm 2: Widget B</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Unknown CTR
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Arm 3: Widget C</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Unknown CTR
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Bandit Algorithm</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Pick arm to maximize reward
                    <br />
                    while learning true rates
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    User sees selected widget
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Observe click/no click
                    <br />
                    Update arm statistics
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
                  Multi-armed bandits balance exploration (learning arm values)
                  with exploitation (using best-known arm), adapting allocation
                  during the experiment unlike fixed A/B splits.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fast feedback loops are critical. Production systems use
                  15-minute to 24-hour reward windows; longer delays complicate
                  credit assignment and slow learning.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bandits beat A/B testing when you have many variants and high
                  opportunity cost. With N variants and K positions, the state
                  space can be enormous (N^K possible layouts).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The action space (arms) can be content types, widget
                  positions, ranking strategies, or individual items. Typical
                  deployments use 10-100 arms per bandit.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Convergence time depends on traffic volume and arm count.
                  Low-traffic segments may take weeks to converge; high-traffic
                  can converge in hours to days.
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
                  When asked about bandits vs A/B testing: explain that bandits
                  adapt during the experiment (allocating more traffic to
                  winners), while A/B testing has fixed splits and waits for
                  statistical significance.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For use cases: mention that bandits excel when decisions are
                  reversible and feedback is fast (UI variants, content slots)
                  but A/B is better for irreversible changes (pricing, product
                  features).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing exploration: explain the regret framework -
                  every sub-optimal arm pull has an opportunity cost; bandits
                  minimize cumulative regret over time.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDiversityExplorationWhatAreMultiArmedBanditsAndWhyUseThemForRecommendations;
