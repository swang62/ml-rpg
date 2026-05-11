import type { Component } from "solid-js";

const LessonPositionBiasFeedbackLoopsHowPositionBiasDistortsTrainingData: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Position Bias Distorts Training Data
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EXAMINATION VERSUS RELEVANCE
            </p>
            <p style="margin-top: 0">
              A click requires two things: the user must see the item
              (examination) and the item must be appealing (relevance). Position
              affects examination probability but not relevance. Position 1 has
              perhaps 95% examination probability; position 10 has 20%. If both
              positions have 10% clicks, the item at position 10 is actually
              much more relevant because it converted 50% of those who saw it
              (10% / 20%) versus 10.5% at position 1 (10% / 95%).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MEASURING POSITION EFFECT
            </p>
            <p style="margin-top: 0">
              To measure position bias, run randomization experiments. Show the
              same item in different positions to different users and measure
              click rates. You will find a curve like: position 1 baseline,
              position 2 is 70% of position 1, position 3 is 50%, position 5 is
              25%, position 10 is 10%. This curve is your position bias model.
              The exact shape varies by product (search results, feeds, grids)
              but the pattern is universal.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SELECTION BIAS COMPOUNDS THE PROBLEM
            </p>
            <p style="margin-top: 0">
              Selection bias means users with certain preferences are more
              likely to see certain items. If sports fans mostly see sports
              content at the top (because past models learned to show it), their
              clicks train the model that sports content is universally popular.
              But it is only popular because sports fans were over represented
              in the training data. Selection and position bias together create
              severely distorted models.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Warning:</strong> You cannot separate position from
              relevance using observational data alone. You must run randomized
              experiments to measure the position effect.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA COLLECTION STRATEGY
            </p>
            <p style="margin-top: 0">
              Log both the position shown and the probability of showing in that
              position (propensity). Without propensity, you cannot correct for
              bias later. Standard format: user, item, position, propensity
              score, action (click or not), timestamp.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Click = examination × relevance; position affects examination
                  (95% at pos 1, 20% at pos 10) not relevance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Same 10% CTR means 50% relevance at position 10 vs 10.5% at
                  position 1 - huge difference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position curves: pos 2 is 70% of pos 1, pos 3 is 50%, pos 5 is
                  25%, pos 10 is 10%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Selection bias compounds: sports fans see sports at top, model
                  learns sports is universally popular
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Must log position and propensity for every impression to
                  enable bias correction
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
                  Walk through the math: 10% CTR at position with 20%
                  examination = 50% true relevance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe randomization experiment: same item, random
                  positions, measure CTR curve
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain logging requirements: user, item, position,
                  propensity, click, timestamp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPositionBiasFeedbackLoopsHowPositionBiasDistortsTrainingData;
