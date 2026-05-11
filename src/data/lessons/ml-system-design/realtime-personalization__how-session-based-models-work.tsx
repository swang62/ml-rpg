import type { Component } from "solid-js";

const LessonRealtimePersonalizationHowSessionBasedModelsWork: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Session-Based Models Work
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SESSION AS A SEQUENCE
            </p>
            <p style="margin-top: 0">
              A session is a sequence of user actions: page views, clicks,
              searches, add-to-cart events. Session-based models treat this
              sequence like a sentence and predict what comes next. If the last
              5 actions were viewing laptop, laptop case, laptop stand, mouse,
              keyboard, the model predicts accessories or peripherals. The key
              insight is that recent actions reveal current intent better than
              lifetime purchase history.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ARCHITECTURE PATTERNS
            </p>
            <p style="margin-top: 0">
              Common architectures use recurrent neural networks or transformers
              to encode the action sequence. Each action becomes a vector
              (embedding), and the model processes these vectors in order to
              produce a session embedding representing current intent. This
              session embedding is compared against item embeddings to rank
              candidates. Inference happens on every new action, adding 10 to
              30ms latency per request.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FEATURE ENGINEERING
            </p>
            <p style="margin-top: 0">
              Beyond the action sequence, models incorporate context features:
              time since last action (users who pause 5 minutes might be
              comparing prices), action type weights (purchases signal stronger
              than views), recency decay (actions 2 minutes ago matter more than
              20 minutes ago), and category patterns (3 electronics views in a
              row versus scattered browsing).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Longer sequence context improves
              accuracy but increases latency and memory. Most systems use the
              last 20 to 50 actions as a practical limit.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMBINING WITH HISTORICAL PROFILES
            </p>
            <p style="margin-top: 0">
              Production systems blend session signals with long term
              preferences. A typical approach weights them:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                score = 0.6 × session_score + 0.4 × historical_score
              </code>
              . Early in a session (few actions), historical dominates. As
              session grows, session signal takes over.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Epsilon Greedy
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    ε = 0.05: Random action
                    <br />1 − ε = 0.95: Best action
                    <br />
                    <strong>Pros:</strong> Simple, robust
                    <br />
                    <strong>Cons:</strong> Wastes traffic uniformly
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    LinUCB
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    Score = μ + α × σ<br />
                    Uncertainty → Explore
                    <br />
                    <strong>Pros:</strong> Fast, interpretable
                    <br />
                    <strong>Cons:</strong> Assumes linearity
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    Thompson Sampling
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    Sample θ ~ Posterior
                    <br />
                    Choose argmax E[r|θ]
                    <br />
                    <strong>Pros:</strong> Balances naturally
                    <br />
                    <strong>Cons:</strong> Needs priors
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
                  Sessions are action sequences; models predict next item like
                  predicting the next word in a sentence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RNNs or transformers encode actions into session embeddings
                  compared against item embeddings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Context features: time between actions, action types, recency
                  decay, category patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sequence length limited to 20-50 actions for latency and
                  memory reasons
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Blend session and historical scores: 0.6 × session + 0.4 ×
                  historical, shifting as session grows
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
                  Walk through a sequence: laptop → case → stand → mouse →
                  keyboard predicts peripherals
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the latency budget: 10-30ms per inference on every new
                  action
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss early vs late session: historical dominates with 2
                  actions, session dominates with 15
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimePersonalizationHowSessionBasedModelsWork;
