import type { Component } from "solid-js";

const LessonTrainingServingSkewFeedbackLoopsAndPositionBiasInRankingSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feedback Loops and Position Bias in Ranking Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Feedback Loop Challenge
            </p>
            <p style="margin-top: 0">
              Ranking and recommendation systems face a unique skew challenge:
              the training data depends on previous model outputs, creating
              feedback loops that amplify bias over successive model
              generations. When YouTube recommends videos, users are far more
              likely to click items in position 1 or 2 than position 10, even if
              the items are equally relevant. If you naively train on this data,
              the model learns that top positions predict clicks, creating a
              self reinforcing cycle where popular items stay popular regardless
              of true relevance.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Position Bias
            </p>
            <p style="margin-top: 0">
              Position bias is the most common manifestation. A video shown in
              position 1 might get 10 percent CTR, while the same video in
              position 5 gets 2 percent CTR purely due to position. Training
              without correction causes the model to conflate position with
              quality: it learns high position equals high relevance and
              predicts high scores for historically top ranked items. Google
              Search deals with this by separating positional features from
              content features in their ranking models.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Counterfactual Corrections
            </p>
            <p style="margin-top: 0">
              Counterfactual logging and propensity weighting provide
              mathematical corrections. When you show an item in position 3, log
              not just the click outcome but the probability it would have been
              shown there under a random policy. During training, weight each
              example by the inverse of this propensity score, upweighting items
              that were shown despite low model scores. LinkedIn Feed uses a
              hybrid approach: 90 to 95 percent of traffic follows the
              production model (exploitation), 5 to 10 percent uses randomized
              ranking (exploration) to collect unbiased training data.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Update Frequency Risks
            </p>
            <p style="margin-top: 0">
              The challenge scales with model update frequency. Batch retrained
              models (weekly or daily) allow feedback to accumulate slowly,
              giving time to detect and correct issues. Online learning models
              that update continuously can enter bad feedback spirals within
              hours. Exploration mechanisms and diversity constraints prevent
              these spirals, sacrificing 2 to 3 percent short term engagement
              for long term user satisfaction.
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
                  Position bias: item in position 1 gets 10% CTR while same item
                  in position 5 gets 2% CTR purely from position, naive training
                  conflates position with quality causing self reinforcing
                  popularity loops
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Counterfactual logging with propensity weighting: log
                  probability item would be shown under random policy, weight
                  training examples by inverse propensity to debias, increases
                  loss variance requiring careful tuning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exploration versus exploitation: LinkedIn Feed uses 90% to 95%
                  production model (exploitation), 5% to 10% randomized ranking
                  (exploration) to collect unbiased training data without
                  position contamination
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Update frequency amplifies risk: batch retraining (daily or
                  weekly) allows gradual detection, online learning from
                  streaming interactions can spiral into clickbait within hours
                  without diversity constraints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real cost: TikTok exploration mechanisms sacrifice 2% to 3%
                  short term engagement (clicks, watch time) to maintain long
                  term user satisfaction and prevent filter bubbles
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
                  Google Search ranking: Separates positional features from
                  content features explicitly, preventing position from
                  implicitly contaminating relevance predictions, uses manual
                  editorial ratings to anchor quality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spotify playlist recommendations: Runs exploration traffic
                  showing random songs 10% of time to detect underexposed
                  artists, propensity weighted training prevents popular song
                  dominance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Instagram feed ranking: Position weighted loss training with
                  8% exploration traffic, detected feedback loop where reposted
                  viral content crowded out original posts, added diversity
                  penalty to ranking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingServingSkewFeedbackLoopsAndPositionBiasInRankingSystems;
