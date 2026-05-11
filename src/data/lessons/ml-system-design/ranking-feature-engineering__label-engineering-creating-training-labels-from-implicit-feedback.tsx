import type { Component } from "solid-js";

const LessonRankingFeatureEngineeringLabelEngineeringCreatingTrainingLabelsFromImplicitFeedback: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Label Engineering: Creating Training Labels From Implicit Feedback
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
                <strong>Label engineering</strong> transforms raw user signals
                (clicks, purchases, dwell time) into training labels that
                reflect true relevance rather than display effects. This is
                feature engineering for your labels, not your inputs.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Raw Signals Are Biased Labels
            </p>
            <p style="margin-top: 0">
              A click at position 1 doesn't mean the same thing as a click at
              position 10. Position 1 gets 10x more clicks regardless of
              quality. If you use raw clicks as positive labels, you train the
              model to predict position, not relevance. Label engineering starts
              by recognizing that raw signals are contaminated by presentation
              effects: position, device, time of day, surrounding items.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Propensity-Weighted Labels
            </p>
            <p style="margin-top: 0">
              Create a label weight based on display propensity. Run 1-5%
              exploration traffic with randomized positions. Build a
              position-to-propensity lookup: P(click|position). Weight each
              training example by 1/propensity. A click at position 10
              (propensity 0.05) gets weight 20; position 1 (propensity 0.5) gets
              weight 2. This rebalances training to approximate what clicks
              would look like if all items were shown equally.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Signal Label Aggregation
            </p>
            <p style="margin-top: 0">
              Single signals are noisy. Combine multiple user actions:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                label = 0.3 × click + 0.5 × add_to_cart + 1.0 × purchase
              </code>
              . Different signals have different noise levels and business
              value. Clicks are high volume but noisy; purchases are low volume
              but high confidence. Time-weighted: a click with 30+ second dwell
              is stronger than a 2-second bounce. The weights become tunable
              hyperparameters.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Position as Feature vs Position for Debiasing
            </p>
            <p style="margin-top: 0">
              Two uses: (1) Include position as input feature during training,
              set to constant (e.g., position 1) at serving. Model learns to
              factor out position effects. (2) Use position only for label
              weighting, never as feature. Model trains on debiased labels but
              never sees position. Approach 1 requires careful implementation to
              avoid leakage. Approach 2 needs accurate propensity estimates.
              Most production systems use both.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Position Bias Impact on CTR
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-weight: 700; font-size: 13px; min-width: 50px; text-align: center">
                    Pos 1
                  </div>
                  <div style="flex: 1; height: 24px; border: 2px solid; border-radius: 4px; position: relative">
                    <div style="position: absolute; right: 8px; top: 2px; font-size: 12px; font-weight: 700">
                      CTR: 0.20
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-weight: 700; font-size: 13px; min-width: 50px; text-align: center">
                    Pos 3
                  </div>
                  <div style="flex: 0.5; height: 24px; border: 2px solid; border-radius: 4px; position: relative">
                    <div style="position: absolute; right: 8px; top: 2px; font-size: 12px; font-weight: 700">
                      CTR: 0.10
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-weight: 700; font-size: 13px; min-width: 50px; text-align: center">
                    Pos 5
                  </div>
                  <div style="flex: 0.25; height: 24px; border: 2px solid; border-radius: 4px; position: relative">
                    <div style="position: absolute; right: 8px; top: 2px; font-size: 12px; font-weight: 700">
                      CTR: 0.05
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-weight: 700; font-size: 13px; min-width: 50px; text-align: center">
                    Pos 10
                  </div>
                  <div style="flex: 0.1; height: 24px; border: 2px solid; border-radius: 4px; position: relative">
                    <div style="position: absolute; right: 8px; top: 2px; font-size: 12px; font-weight: 700">
                      CTR: 0.02
                    </div>
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 8px; border-radius: 4px; font-size: 11px; text-align: center">
                  <strong>Same item quality, 10x CTR difference</strong>
                  <br />
                  IPW reweights Pos 10 by 10x, Pos 1 by 1x
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
                  Raw user signals (clicks) are biased by position, device, and
                  presentation effects; they need engineering before use as
                  labels
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Propensity-weighted labels use 1/P(click|position) to
                  rebalance training data as if all items were shown equally
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-signal aggregation combines clicks, purchases, dwell
                  time with different weights reflecting confidence and business
                  value
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position can be used as an input feature (set to constant at
                  serving) or only for label weighting (propensity scores)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Most production systems combine both: propensity-weighted
                  labels AND position as a feature during training
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
                  Frame label engineering as "feature engineering for your
                  labels" - this shows understanding that labels themselves need
                  engineering
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Give specific formula: label = 0.3 × click + 0.5 × add_to_cart
                  + 1.0 × purchase with weights as tunable hyperparameters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the two uses of position: as an input feature (set
                  constant at serving) vs for label weighting only (never as
                  feature)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRankingFeatureEngineeringLabelEngineeringCreatingTrainingLabelsFromImplicitFeedback;
