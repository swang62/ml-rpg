import type { Component } from "solid-js";

const LessonSearchRelevanceFeedbackHowDoYouDeployBiasCorrectionInAProductionRankingPipeline: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Do You Deploy Bias Correction in a Production Ranking Pipeline?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Phase 1: Instrumentation
            </p>
            <p style="margin-top: 0">
              Before any model changes, add client side viewability logging.
              Record when items enter the viewport, how long they remain
              visible, and scroll depth per session. This takes 2-4 weeks to
              implement and validate. Run both server side and client side
              logging in parallel for 1-2 weeks to understand the gap. Typical
              finding: server logs show 30 impressions per session, client logs
              show 8-12 true viewable impressions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Phase 2: Propensity Estimation
            </p>
            <p style="margin-top: 0">
              Once you have viewability data, estimate propensities using 2-4
              weeks of exploration data. Run 2-3% epsilon greedy traffic to
              generate position variation. Compute examination probability per
              position by aggregating clicks across items that appeared at each
              position. Validate by checking that propensity curves are
              monotonically decreasing (position 1 should have higher
              examination than position 10). Segment by device type (mobile vs
              desktop) and user tenure (new vs returning) if data volume allows.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Phase 3: Model Training With IPS
            </p>
            <p style="margin-top: 0">
              Retrain your ranking model using IPS weighted loss. Each click
              example gets weight 1/propensity capped at 10-20 to limit
              variance. Train on viewable impressions only, not server side
              impressions. Compare offline metrics (NDCG, AUC) against baseline.
              Expect slight drops because baseline was optimized for biased
              data. The true test is online.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Phase 4: Staged Rollout
            </p>
            <p style="margin-top: 0">
              Deploy to 1% of traffic first. Monitor clicks, dwell time, and
              scroll depth. Bias corrected models should increase clicks at
              lower positions and increase average scroll depth as users find
              relevant content deeper in the list. Ramp to 5%, 20%, 50%, 100%
              over 2-4 weeks. At each stage, check that position 5-10 metrics
              improve without hurting position 1-4. Full rollout should show
              3-8% improvement in total relevant item exposure.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">
                    Step 1: Viewability Logging
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Viewport, scroll, time in view ≥1sec
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">
                    Step 2: Exploration (1-2 weeks)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    2% traffic RandTopN, 34M impressions
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">
                    Step 3: Propensity Estimation
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Fit p(seen | position, device, surface)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">
                    Step 4: Offline Training
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    f(features) + g(position), validate on conversions
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 13px">
                    Step 5: A/B Test Rollout
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    1% → 10% → 50% → 100%, monitor CTR &amp; revenue
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
                  Start with client side viewability instrumentation (2-4
                  weeks). Compare server logs (30 impressions) to client logs
                  (8-12 viewable).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Estimate propensities from 2-4 weeks of 2-3% exploration data.
                  Validate curves are monotonically decreasing by position.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Train with IPS weights capped at 10-20 on viewable impressions
                  only. Expect offline metric drops, true test is online.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stage rollout 1% to 100% over 2-4 weeks. Watch for 3-8%
                  improvement in relevant item exposure at lower positions.
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
                  Describe the phased rollout: instrumentation first, then
                  propensity estimation, then model training, then staged
                  deployment. Each phase has specific validation criteria.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize the gap between server and client logging: 30 vs
                  8-12 impressions per session is typical. This gap represents
                  false negatives in training data.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing success metrics, focus on clicks and dwell
                  time at positions 5-10 improving without hurting positions
                  1-4. Total relevant exposure should increase 3-8%.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchRelevanceFeedbackHowDoYouDeployBiasCorrectionInAProductionRankingPipeline;
