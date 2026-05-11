import type { Component } from "solid-js";

const LessonSearchRelevanceFeedbackHowDoClickModelsSeparateExaminationFromAttractiveness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Do Click Models Separate Examination from Attractiveness?
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
                <strong>Click models</strong> decompose user clicks into two
                probabilities: <strong>examination</strong> (did the user look
                at this position?) and <strong>attractiveness</strong> (given
                they looked, did they click?).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Decomposition
            </p>
            <p style="margin-top: 0">
              A click happens only when two conditions are both true: the user
              examined that position AND found the item attractive.
              Mathematically:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                P(click) = P(examine) × P(attract)
              </code>
              . Examination depends on position: users examine position 1 with
              probability 0.95, position 5 with 0.40, and position 10 with 0.10.
              Attractiveness depends on the item itself. By separating these, we
              estimate true relevance independent of display position.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Click Models Learn These Probabilities
            </p>
            <p style="margin-top: 0">
              The Position Based Model assumes examination depends only on
              position and attractiveness only on the item. You observe clicks
              where the same item appears at different positions. If item A at
              position 1 gets 30% clicks and at position 5 gets 6% clicks, you
              work backwards. Position 1 has examination probability 0.9 and
              position 5 has 0.2. Dividing: 0.30 ÷ 0.9 = 0.33, and 0.06 ÷ 0.2 =
              0.30. The attractiveness is roughly constant, confirming the model
              works.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why This Separation Matters For Training
            </p>
            <p style="margin-top: 0">
              Once you estimate attractiveness separately, use it as a debiased
              training signal instead of raw clicks. An item with few clicks at
              position 8 might have high attractiveness because examination
              probability is low. Dividing observed clicks by examination
              probability recovers the true relevance signal. This is the
              foundation of inverse propensity scoring.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The same item at position 1
              versus position 10 has dramatically different click rates but
              identical attractiveness. Click models recover this by dividing
              out the position effect.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 14px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">p(click observed)</strong>
                </div>
                <div style="font-size: 24px; font-weight: bold">
                  ↓ Factorize
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">
                      p(seen | position, context)
                    </strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      Examination bias
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">×</div>
                  <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">
                      p(click | seen, features)
                    </strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      True relevance
                    </div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">
                  ↓ Inference
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    Use only p(click | seen, features)
                  </strong>
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
                  Clicks decompose into P(click) = P(examine) × P(attract),
                  where examination depends on position and attractiveness on
                  the item
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Examination probability drops sharply: 95% at position 1, 40%
                  at position 5, 10% at position 10
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  By observing the same item at different positions, you
                  estimate position independent attractiveness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Attractiveness estimates become debiased training signals
                  reflecting true relevance
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
                  Walk through P(click) = P(examine) × P(attract) with numbers
                  at two positions to show how attractiveness stays constant.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain that examination probabilities come from aggregate
                  data where items appear at different positions across many
                  queries.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize the goal is recovering attractiveness, which
                  represents true item quality independent of display position.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchRelevanceFeedbackHowDoClickModelsSeparateExaminationFromAttractiveness;
