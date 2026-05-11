import type { Component } from "solid-js";

const LessonColdStartProblemExplorationPoliciesContextualBanditsAndNewItemBoosting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Exploration Policies: Contextual Bandits and New Item Boosting
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
                New items cannot escape cold start without exposure. Exploration
                policies deliberately surface new items to collect engagement
                signals, even when the model has low confidence in their
                relevance.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Epsilon-Greedy
            </p>
            <p style="margin-top: 0">
              Reserve a fraction of recommendations for exploration. With{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                epsilon = 0.1
              </code>
              , 10% of slots show random or cold items. Simple to implement.
              Downside: exploration is untargeted. You might show a baby product
              to a college student.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Thompson Sampling
            </p>
            <p style="margin-top: 0">
              Model uncertainty around predicted scores. For new items with high
              uncertainty, sample from the optimistic end of the distribution.
              This naturally explores items where you are uncertain while
              exploiting confident predictions. More sophisticated than
              epsilon-greedy but requires probabilistic model outputs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              New Item Boosting
            </p>
            <p style="margin-top: 0">
              Explicitly boost scores for new items:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                boosted_score = score + boost × (1 - item_age / max_age)
              </code>
              . Fresh items get maximum boost, which decays over time. Tune
              boost magnitude to balance exploration against short-term
              engagement loss. Typical: 5-15% score boost for items under 24
              hours old.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Trade-off:</strong> Exploration hurts immediate
              metrics (CTR, conversion) to improve long-term catalog
              utilization. Run A/B tests to quantify the trade-off. If 10%
              exploration drops CTR by 2% but increases long-tail item exposure
              by 50%, leadership must decide if the trade-off is worth it.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Exploration vs Exploitation Trade-off
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 7; text-align: center">
                    <strong style="font-size: 13px">Exploitation</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      85–95% traffic
                      <br />
                      High confidence items
                      <br />
                      Maximize immediate CTR
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 3; text-align: center">
                    <strong style="font-size: 13px">Exploration</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      5–15% traffic
                      <br />
                      Uncertain items
                      <br />
                      Gather learning data
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 4px 0">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    New Item Boost Example
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px; text-align: left">
                    <strong>Trial:</strong> First 200–500 impressions OR 14–30
                    days
                    <br />
                    <strong>Boost:</strong> +20% ranking score in relevant
                    contexts
                    <br />
                    <strong>Exit:</strong> Remove boost after trial, rank on
                    true signals
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; font-size: 11px">
                  <strong>Guardrails:</strong> Min predicted CTR threshold, max
                  2–3 uncertain items per session
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
                  Contextual bandits maintain uncertainty estimates for each
                  item and allocate more impressions to high uncertainty
                  candidates, naturally reducing exploration as confidence
                  narrows with data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical exploration budgets range from 5 to 15% of total
                  impressions, with higher budgets accelerating learning but
                  degrading short term CTR and user satisfaction metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  New item boosts provide explicit ranking bonuses for a fixed
                  trial period (commonly 200 to 500 impressions or 14 to 30
                  days), ensuring new catalog entries collect enough signals to
                  compete
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Guardrails protect user experience by imposing quality
                  thresholds (only explore items above 20th percentile
                  baseline), capping per user exploration (2 to 3 uncertain
                  items per session), and defining clear exit criteria
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Measurement uses interleaving or counterfactual logging to
                  isolate exploration impact, tracking exposure normalized
                  metrics like CTR per 100 impressions and catalog coverage
                  percentage
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
                  When asked about exploration budgets: explain dedicating 5-10%
                  of impressions to cold items, using UCB or Thompson Sampling
                  to balance learning with exploitation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For new item boosts: describe time-limited ranking bonuses
                  (+20-50% score for first 7-30 days or first 100-500
                  impressions), tapering as signals accumulate.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing trade-offs: mention that over-exploration
                  hurts short-term metrics but under-exploration causes
                  winner-take-all effects where new items never surface.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonColdStartProblemExplorationPoliciesContextualBanditsAndNewItemBoosting;
