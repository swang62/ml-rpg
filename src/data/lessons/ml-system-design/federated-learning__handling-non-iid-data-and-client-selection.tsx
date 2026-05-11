import type { Component } from "solid-js";

const LessonFederatedLearningHandlingNonIidDataAndClientSelection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Handling Non IID Data and Client Selection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Non-IID Challenge
            </p>
            <p style="margin-top: 0">
              IID (Independent and Identically Distributed) data means each
              sample comes from the same underlying distribution. Traditional ML
              assumes this. In federated learning, it is almost never true. A
              keyboard app user who only types in Spanish has completely
              different data than one who types technical English. A hospital in
              a wealthy urban area sees different diseases than a rural clinic.
              When you average model updates from clients with wildly different
              data distributions, the result often diverges or converges to a
              model that works poorly for everyone. Studies show non-IID data
              can degrade model accuracy by 20-50% compared to centralized
              training on the same data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Types of Non-IID Distribution
            </p>
            <p style="margin-top: 0">
              <strong>Label skew:</strong> Different clients have different
              label distributions. One phone user mostly types work emails;
              another sends casual messages. The word frequency differs
              dramatically. <strong>Feature skew:</strong> Same labels but
              different feature patterns. Two users both type greetings, but one
              uses formal language and another uses slang.{" "}
              <strong>Quantity skew:</strong> Some clients have 10,000 samples;
              others have 50. Heavy users dominate training if you weight
              equally. <strong>Temporal skew:</strong> User behavior changes
              over time. Weekend typing patterns differ from weekday ones.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Client Selection Strategies
            </p>
            <p style="margin-top: 0">
              Not all clients should participate in every round. Random
              selection ensures fairness but ignores data quality.{" "}
              <strong>Stratified selection:</strong> Sample clients
              proportionally from different groups to ensure diverse data
              coverage. If 30% of users speak Spanish, ensure roughly 30% of
              each round includes Spanish users.{" "}
              <strong>Importance sampling:</strong> Weight client selection by
              data characteristics. Clients with rare but important data
              (unusual medical conditions, minority languages) get selected more
              often. <strong>Active learning:</strong> Select clients whose
              updates would most improve the model, measured by gradient
              magnitude or uncertainty. This can improve convergence by 2-3x but
              risks overfitting to edge cases.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The client selection algorithm
              directly shapes what the model learns. Biased selection creates
              biased models. If power users are always available and casual
              users rarely are, the model optimizes for power users.
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
                  Non-IID data (clients with different distributions) can
                  degrade accuracy by 20-50% versus centralized training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Four types of skew: label skew, feature skew, quantity skew,
                  and temporal skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Random client selection ensures fairness but ignores data
                  quality and coverage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stratified selection samples proportionally from groups to
                  ensure diverse data representation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Client selection algorithm directly shapes model bias:
                  selecting power users creates power-user models
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
                  Explain non-IID with concrete example: Spanish-only users
                  versus technical English users have completely different word
                  distributions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that active client selection can improve convergence
                  2-3x but risks overfitting to edge cases
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFederatedLearningHandlingNonIidDataAndClientSelection;
