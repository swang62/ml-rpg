import type { Component } from "solid-js";

const LessonPositionBiasFeedbackLoopsWhatIsPositionBiasInRecommendationSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Position Bias in Recommendation Systems?
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
                <strong>Position Bias</strong> is the phenomenon where items
                shown higher in a list get more clicks not because they are
                better, but simply because users see them first. This distorts
                training data and causes models to rank already visible items
                even higher.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE PROBLEM
            </p>
            <p style="margin-top: 0">
              Users scan lists from top to bottom. An item in position 1 might
              get 30% click through rate while the exact same item in position 5
              gets only 5%. If you train a model on this click data, it learns
              that position 1 items are 6x more relevant. But they are not more
              relevant; they were just more visible. The model then ranks these
              items higher, they get more clicks, and the bias amplifies.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY IT MATTERS
            </p>
            <p style="margin-top: 0">
              Without correcting for position bias, your model optimizes for
              visibility, not quality. Items that happened to be shown first
              become permanently stuck at the top. New items never get shown,
              never get clicks, and appear worthless to the model. Over time,
              recommendations stagnate and user satisfaction drops as the system
              stops surfacing fresh content.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE FEEDBACK LOOP
            </p>
            <p style="margin-top: 0">
              Position bias creates a self reinforcing cycle: item ranked high
              gets clicks, model sees clicks as relevance signal, item gets
              ranked even higher, gets more clicks. This is a feedback loop.
              Without intervention, the system converges to showing the same
              small set of items regardless of actual user preferences.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Position bias is not just noise
              in your data. It actively corrupts your model and gets worse over
              time unless explicitly corrected.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 14px">Position 1: 8% CTR</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Item A (gets clicked 800 times / 10k views)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 14px">Position 2: 4% CTR</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Item B (gets clicked 400 times / 10k views)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 14px">Position 5: 1% CTR</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Item C (gets clicked 100 times / 10k views)
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px">
                  <strong style="font-size: 13px">Problem:</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Item A may not be 8x better than Item C. Position drives
                    most of the CTR difference, not true quality.
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
                  Items in position 1 get up to 6x more clicks than identical
                  items in position 5, purely from visibility
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training on raw clicks teaches models that visibility equals
                  relevance - fundamentally wrong
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops amplify bias: high rank → more clicks → higher
                  rank → even more clicks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without correction, recommendations stagnate and new items
                  never surface
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position bias gets worse over time as the model reinforces its
                  own mistakes
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
                  Explain the visibility trap: 30% CTR at position 1 vs 5% at
                  position 5 for identical items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the stagnation symptom: same items dominate top
                  positions for weeks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss how to detect: shuffle positions randomly for 1% of
                  traffic and compare CTR curves
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPositionBiasFeedbackLoopsWhatIsPositionBiasInRecommendationSystems;
