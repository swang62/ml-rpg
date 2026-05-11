import type { Component } from "solid-js";

const LessonSearchRelevanceFeedbackWhatAreTheCriticalFailureModesInBiasAwareRanking: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are the Critical Failure Modes in Bias Aware Ranking?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Failure Mode: Impression Logging Errors
            </p>
            <p style="margin-top: 0">
              Server side impression logging treats every item returned by the
              API as seen by the user. In reality, users on infinite scroll
              feeds rarely scroll past the first 5-10 items. If you log all 50
              returned items as impressions, 40 of them become false negatives.
              The model learns these unseen items are irrelevant, even though
              users never had a chance to consider them. The fix: client side
              viewability tracking that only logs an impression when at least
              50% of the item pixels are visible for at least 1 second.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Failure Mode: Propensity Model Staleness
            </p>
            <p style="margin-top: 0">
              Propensity estimates are computed from historical data. But user
              behavior changes over time. New UI layouts change how far users
              scroll. Mobile versus desktop has different examination patterns.
              Seasonal changes affect engagement. If you trained propensities on
              data from 3 months ago, they may no longer reflect current user
              behavior. A propensity curve showing position 8 at 15% examination
              might now be 25% after a UI redesign. Using stale propensities
              means your IPS weights are wrong, reintroducing the bias you tried
              to remove.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Failure Mode: Population Shift
            </p>
            <p style="margin-top: 0">
              Propensities are often estimated on all users, but different user
              segments scroll differently. Power users examine 20 positions.
              Casual users examine 3. If your traffic mix shifts toward casual
              users, average examination drops at lower positions. Models
              trained on power user propensities over correct for casual users
              (applying too high weights) and under correct for power users.
              Segment specific propensity estimation helps, but adds complexity
              and requires enough data per segment.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Warning:</strong> Bias correction that worked yesterday
              may fail today. Monitor propensity freshness, user segment shifts,
              and logging accuracy continuously.
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
                  Server side logging creates false negatives by treating unseen
                  items as negative examples. Use client side viewability
                  tracking.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale propensity models fail after UI changes, device mix
                  shifts, or seasonal behavior changes. Retrain propensities
                  monthly.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User segment shifts break average propensities. Power users
                  and casual users have different examination patterns.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  All three failure modes are invisible in offline metrics but
                  cause production degradation
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
                  When discussing impression logging, emphasize the 50% pixels
                  visible for 1 second standard (IAB viewability). This
                  separates true impressions from server side returns.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain propensity staleness with a concrete example: UI
                  redesign changes position 8 from 15% to 25% examination,
                  making old IPS weights 40% too low.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ask about user segments: power users examine 20 positions,
                  casual users examine 3. Average propensities fail for both.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchRelevanceFeedbackWhatAreTheCriticalFailureModesInBiasAwareRanking;
