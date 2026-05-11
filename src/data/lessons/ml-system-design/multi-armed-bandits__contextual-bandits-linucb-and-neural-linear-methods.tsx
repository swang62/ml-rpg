import type { Component } from "solid-js";

const LessonMultiArmedBanditsContextualBanditsLinucbAndNeuralLinearMethods: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Contextual Bandits: LinUCB and Neural Linear Methods
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FROM NON-CONTEXTUAL TO CONTEXTUAL
            </p>
            <p style="margin-top: 0">
              Non-contextual bandits treat all users the same: arm 3 is either
              globally good or not. Contextual bandits condition on user and
              item features. Different users may prefer different arms. This
              enables generalization: when a new user arrives, use their
              features to predict which arm they will prefer, even with zero
              observations for that specific user.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LINUCB: LINEAR CONTEXTUAL BANDITS
            </p>
            <p style="margin-top: 0">
              LinUCB maintains a linear model per arm. For arm a, the expected
              reward is{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                θ_a · x
              </code>{" "}
              where x is the context vector (user features, time of day, device
              type). It also maintains uncertainty over θ_a via an inverse
              covariance matrix. The UCB bonus comes from the uncertainty in the
              prediction for this specific context.
            </p>
            <p>
              <strong>Update:</strong> After observing reward r for context x on
              arm a, update:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                A_a = A_a + x × x^T
              </code>{" "}
              and{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                b_a = b_a + r × x
              </code>
              . Then{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                θ_a = A_a^&#123;-1&#125; × b_a
              </code>
              .
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              NEURAL LINEAR: DEEP FEATURES WITH LINEAR BANDIT
            </p>
            <p style="margin-top: 0">
              Training a full neural network online is unstable and expensive.
              Neural Linear freezes a pretrained deep feature extractor and runs
              a linear bandit on the embeddings. For example, use a pretrained
              neural network to encode user profiles and items into
              128-dimensional vectors, then run Thompson Sampling or LinUCB on
              these embeddings. This combines deep representation power with
              stable online updates.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Contextual bandits solve cold
              start: new users immediately get personalized recommendations
              based on features, not requiring historical observations for that
              specific user.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPUTATIONAL COST
            </p>
            <p style="margin-top: 0">
              With 50-100 features and 10 arms, precompute inverse covariance
              matrices offline. Scoring is dot product per arm: 50 operations ×
              10 arms = 500 operations, submillisecond. The feature extraction
              (running through neural network) can take 2-5ms but is often
              shared with other systems.
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
                  Contextual bandits condition on user/item features, enabling
                  personalization and solving user cold start
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinUCB: maintains linear model θ_a per arm with inverse
                  covariance for uncertainty; update is closed-form
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Neural Linear: freeze pretrained feature extractor, run linear
                  bandit on embeddings for stable online updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scoring with 50-100 features and 10 arms is submillisecond;
                  feature extraction (2-5ms) is the bottleneck
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
                  When explaining contextual bandits, contrast with
                  non-contextual: different users may prefer different arms
                  based on features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe Neural Linear pattern: deep features frozen, online
                  linear layer, best of both worlds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention cold start advantage: new users get personalized
                  recommendations immediately via feature-based generalization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiArmedBanditsContextualBanditsLinucbAndNeuralLinearMethods;
