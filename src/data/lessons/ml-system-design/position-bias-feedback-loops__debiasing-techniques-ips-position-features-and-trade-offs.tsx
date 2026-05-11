import type { Component } from "solid-js";

const LessonPositionBiasFeedbackLoopsDebiasingTechniquesIpsPositionFeaturesAndTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Debiasing Techniques: IPS, Position Features, and Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INVERSE PROPENSITY SCORING
            </p>
            <p style="margin-top: 0">
              Weight each training example by the inverse of its propensity
              (probability of being shown). If item A was shown with 80%
              probability and got a click, weight it by 1/0.8 = 1.25. If item B
              was shown with 10% probability and got a click, weight it by 1/0.1
              = 10. This amplifies signals from items that were unlikely to be
              shown, correcting for selection bias.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              POSITION AWARE MODELS
            </p>
            <p style="margin-top: 0">
              Train the model with position as an explicit feature. During
              training, the model learns that position 1 gets 5x more clicks
              than position 5. At serving time, set position to a constant (like
              position 3 for all items) to predict relevance independent of
              display position. This separates the position effect from the
              relevance signal.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>🎯 Decision Framework:</strong> Use IPS when you have good
              propensity estimates. Use position aware models when you need
              simpler implementation. Use both when you have complex display
              formats (grids, carousels, mixed layouts).
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EXPLORATION RATE TRADEOFF
            </p>
            <p style="margin-top: 0">
              More exploration (5-10% random traffic) provides unbiased data but
              hurts short term metrics. Users in exploration see suboptimal
              recommendations. Less exploration (1%) protects metrics but leaves
              you blind to new items and changing preferences. Start with 5% and
              reduce as your propensity estimates improve.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              VARIANCE VS BIAS TRADEOFF
            </p>
            <p style="margin-top: 0">
              IPS reduces bias but increases variance. Rare events get huge
              weights, making training unstable. Clipping weights (capping at
              10x or 100x) reduces variance but reintroduces some bias. Doubly
              robust estimators combine IPS with model predictions to reduce
              variance while maintaining low bias.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 14px">
                <strong style="font-size: 15px">
                  Exploration Strategy Trade offs
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Top K Shuffle (N=10)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    CTR impact: 1.5 to 2% drop
                  </div>
                  <div style="font-size: 11px">
                    Counterfactual value: High (unbiased positions)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">FairPair Swaps</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    CTR impact: 0.3 to 0.8% drop
                  </div>
                  <div style="font-size: 11px">
                    Counterfactual value: Medium (adjacent positions)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Score Noise (temp=0.3)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    CTR impact: 0.5 to 1% drop
                  </div>
                  <div style="font-size: 11px">
                    Counterfactual value: Medium (smooth perturbation)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Fraud Override (0.1% traffic)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Risk: Real fraud loss on override bucket
                  </div>
                  <div style="font-size: 11px">
                    Value: Ground truth for blocked transactions
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
                  IPS: weight examples by 1/propensity. 10% propensity item gets
                  10x weight to correct selection bias
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position-aware models: train with position as feature, set to
                  constant at serving for fair comparison
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  5-10% exploration provides unbiased data but hurts short-term
                  metrics; start at 5%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IPS reduces bias but adds variance; clip weights at 10-100x to
                  stabilize training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Doubly robust estimators combine IPS with model predictions
                  for low bias and low variance
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
                  Walk through IPS math: item shown at 80% probability → weight
                  1.25, at 10% → weight 10
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe position-aware serving: train with positions 1-10,
                  serve with position = 3 for all
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss weight clipping: raw IPS weight 1000x causes
                  instability, cap at 100x
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPositionBiasFeedbackLoopsDebiasingTechniquesIpsPositionFeaturesAndTradeOffs;
