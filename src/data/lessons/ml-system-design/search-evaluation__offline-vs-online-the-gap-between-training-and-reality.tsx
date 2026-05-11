import type { Component } from "solid-js";

const LessonSearchEvaluationOfflineVsOnlineTheGapBetweenTrainingAndReality: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Offline vs Online: The Gap Between Training and Reality
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Insight
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Offline metrics (NDCG, MRR) and online metrics (CTR, dwell)
                often disagree. A model that wins offline may lose online.
                Understanding this gap is essential for reliable evaluation.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Offline and Online Diverge
            </p>
            <p style="margin-top: 0">
              Offline evaluation uses historical labels, but those labels were
              collected under a previous ranking policy. If the old system never
              showed certain items, you have no labels for them. Your new model
              might surface great items that have no historical labels, scoring
              poorly offline but delighting users online.
            </p>
            <p>
              Labels also go stale. A product labeled "highly relevant" six
              months ago might now be out of stock, have bad reviews, or be
              superseded by better alternatives. Offline metrics say you are
              improving; online metrics show users bouncing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Typical Gap Size
            </p>
            <p style="margin-top: 0">
              Expect 10-30% disagreement between offline and online. If your
              offline NDCG improves 5%, online CTR might improve 2%, stay flat,
              or even drop. The correlation is positive but noisy. A model must
              win offline to be worth testing online, but offline wins do not
              guarantee online wins.
            </p>
            <p>
              Track the offline/online correlation over time. If it drops below
              0.5 (meaning offline improvements predict online improvements only
              half the time), your labels need refreshing or your offline setup
              has systematic bias.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Bridging the Gap
            </p>
            <p style="margin-top: 0">
              <strong>Fresh labels:</strong> Re-label samples regularly using
              current user behavior, not historical judgments.{" "}
              <strong>Counterfactual evaluation:</strong> Use logged data to
              estimate what would have happened under a different policy,
              reducing bias from the logging policy.{" "}
              <strong>Holdout sets:</strong> Reserve some traffic for random
              exploration to collect unbiased labels for items the current
              system never shows.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Rule:</strong> Never ship based on offline metrics
              alone. Offline selects candidates for online testing. Online
              decides what ships to users.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Position Bias</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Top result: 40% CTR regardless of quality
                    <br />
                    Rank 5 result: 5% CTR even if highly relevant
                    <br />
                    Better model moving relevant item up may see lower CTR if
                    less attractive
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Distribution Shift</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Training: Last month general queries
                    <br />
                    Production: Holiday season, intent shift to transactional
                    <br />
                    Offline NDCG +1.2%, Online CTR unchanged or down
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Sample Ratio Mismatch</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Expected: 50/50 treatment vs control
                    <br />
                    Observed: 52/48 split due to bucketing bug
                    <br />
                    Chi squared test detects, experiment halted automatically
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Logging Bug</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Impressions: 95% logged (5% dropped)
                    <br />
                    Clicks: 100% logged
                    <br />
                    Result: CTR inflated by 5%, false positive regression alert
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
                  Offline and online metrics often disagree by 10-30%. An
                  offline winner may lose online.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Labels go stale: products become unavailable, reviews change,
                  better alternatives emerge.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Offline labels reflect the old policy. New models surfacing
                  previously unseen items score poorly offline but may delight
                  users.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Track offline/online correlation. Below 0.5 means labels need
                  refreshing.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Never ship on offline alone. Offline selects candidates;
                  online decides what ships.
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
                  Explain why divergence happens: stale labels, logging policy
                  bias, unseen items without labels.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantify the gap: expect 10-30% disagreement. 5% offline lift
                  might yield 0-2% online lift.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe bridging strategies: fresh labels, counterfactual
                  evaluation, exploration holdouts.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchEvaluationOfflineVsOnlineTheGapBetweenTrainingAndReality;
