import type { Component } from "solid-js";

const LessonSearchRelevanceFeedbackHowDoYouImplementProductionExplorationToEstimatePropensities: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Do You Implement Production Exploration to Estimate
            Propensities?
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
                <strong>Production exploration</strong> deliberately randomizes
                some portion of rankings to observe how items perform at
                different positions. This generates data needed to estimate
                propensities accurately.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why You Need Exploration For Propensity Estimation
            </p>
            <p style="margin-top: 0">
              To estimate examination probability at each position, you need
              clicks on identical items at different positions. But a production
              system always shows best items at the top, so you never see how a
              top item performs at position 8. Exploration breaks this by
              showing items at positions they would not normally appear,
              sacrificing short term relevance for long term learning.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation: Random Swapping
            </p>
            <p style="margin-top: 0">
              For 1-5% of requests, randomly swap two items in the result list.
              This creates pairs where the same items appear at swapped
              positions. Compare click rates to isolate the position effect. If
              item A at position 2 gets swapped to position 6 and its click rate
              drops from 15% to 4%, position 6 has roughly 27% of position 2
              examination probability (4/15 = 0.27). Aggregate across thousands
              of swaps to build propensity curves.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation: Epsilon Greedy Ranking
            </p>
            <p style="margin-top: 0">
              Instead of always showing the optimal ranking, show a random
              ranking with probability epsilon (1-5%). During exploration
              traffic, every position has equal probability of showing any item.
              This gives clean data on all positions. With 5% exploration, you
              sacrifice roughly 5% of optimal clicks. Most systems find 2-3%
              sufficient for stable estimates without noticeable user impact.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Warning:</strong> Exploration trades engagement for data
              quality. Start at 1-2% and increase only if propensity estimates
              are unstable.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 6px">
                  Exploration Pipeline
                </div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; text-align: center">
                  <strong>20,000 QPS Production Traffic</strong>
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; flex: 3; text-align: center">
                    <strong>98% Control</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      19,600 QPS
                    </div>
                    <div style="font-size: 12px">Standard ranking</div>
                  </div>
                  <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>2% Explore</strong>
                    <div style="font-size: 12px; margin-top: 4px">400 QPS</div>
                    <div style="font-size: 12px">RandTopN</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; text-align: center">
                  <strong>Daily Data Collection</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    400 QPS × 86,400 sec = 34M randomized impressions
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; text-align: center">
                  <strong>Propensity Estimation</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Fit p(seen | position, device, surface)
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
                  Without exploration, you cannot estimate propensities because
                  items always appear at the same optimized positions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Random swapping (1-5% of traffic) creates natural experiments
                  showing items at swapped positions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Epsilon greedy dedicates 2-3% traffic to random rankings for
                  clean propensity data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The cost is reduced engagement during exploration, typically
                  1-5% of optimal clicks
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
                  Explain the chicken and egg: you need propensities to debias,
                  but need position variation to estimate them. Exploration
                  solves this.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe random swapping: swap positions 2 and 6, click rate
                  drops from 15% to 4%, so position 6 has 27% of position 2
                  examination.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Standard exploration rate is 2-3% epsilon greedy. Higher gives
                  better estimates but hurts engagement.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchRelevanceFeedbackHowDoYouImplementProductionExplorationToEstimatePropensities;
