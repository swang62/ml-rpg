import type { Component } from "solid-js";

const LessonSearchRelevanceFeedbackWhatIsPositionBiasAndWhyDoesItDistortRankingSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex: 1 1 0%; min-width: 0px; max-width: 800px; margin: 0px auto;">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Position Bias and Why Does It Distort Ranking Systems?
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
                <strong>Position bias</strong> is the systematic tendency for
                users to click on items displayed higher in a ranked list,
                regardless of whether those items are actually more relevant
                than items shown lower.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Hidden Distortion in Every Click
            </p>
            <p style="margin-top: 0">
              When you train a ranking model on click data, you teach it that
              "clicked = good." This seems reasonable until you realize users
              rarely scroll past the first few results. An item at position 1
              gets clicked 10 to 25 times more often than the same item at
              position 10, not because it is better but because users physically
              see it more. Your model learns to reinforce whatever already sits
              at the top, creating a self fulfilling prophecy where good items
              buried lower never get the clicks needed to prove their worth.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why This Creates a Compounding Problem
            </p>
            <p style="margin-top: 0">
              Position bias systematically corrupts your training signal toward
              items that already rank highly. An item that randomly lands at
              position 2 gets many clicks, so the model ranks it higher, giving
              it even more clicks. Meanwhile, an excellent item at position 8
              gets few clicks because few users scroll that far, so the model
              ranks it lower. After a few retraining cycles, the rich get richer
              and the poor get poorer, regardless of actual quality.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Numbers That Reveal The Bias
            </p>
            <p style="margin-top: 0">
              Eye tracking studies show position 1 receives 30 to 35 percent of
              all visual attention, position 2 gets 15 percent, and by position
              5 it drops to under 5 percent. Click rates follow a similar curve:
              if position 1 has a 25 percent click rate, position 10 might have
              1 percent. This means a mediocre item at position 1 collects 25
              times more clicks than an excellent item at position 10. Without
              explicit correction, the model treats these biased clicks as
              ground truth.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; justify-content: space-between; align-items: center; border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <span style="font-weight: 700">Position 1</span>
                  <span style="font-weight: 700">100% relative CTR</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <span style="font-weight: 700">Position 2</span>
                  <span style="font-weight: 700">70% relative CTR</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <span style="font-weight: 700">Position 3</span>
                  <span style="font-weight: 700">50% relative CTR</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <span style="font-weight: 700">Position 4</span>
                  <span style="font-weight: 700">25% relative CTR</span>
                </div>
                <div style="margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 6px; text-align: center">
                  <span style="font-size: 12px; font-weight: 700">
                    Mobile App Store: 30% drop from P1→P2, 75% drop P1→P4
                  </span>
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
                  Position bias causes users to click higher ranked items 10-25x
                  more than lower ranked items of equal quality, making raw
                  clicks unreliable relevance signals
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The bias compounds over training cycles: high ranked items get
                  more clicks, which trains the model to rank them higher,
                  creating self reinforcing loops
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Eye tracking shows position 1 gets 30-35% of attention while
                  position 5 gets under 5%, making visibility the primary click
                  driver
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without correction, ranking models preserve existing rankings
                  rather than discover truly relevant items
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
                  When asked about click data quality, explain that raw clicks
                  confound two signals: whether users saw the item (examination)
                  and whether they found it relevant (attractiveness). Position
                  bias inflates the first while obscuring the second.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize the compounding effect: biased training data
                  produces biased rankings that generate more biased data in a
                  feedback loop.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention specific numbers: position 1 gets 25-30% click rate,
                  position 10 gets 1-2%. This 25x gap is almost entirely
                  visibility, not relevance.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchRelevanceFeedbackWhatIsPositionBiasAndWhyDoesItDistortRankingSystems;
