import type { Component } from "solid-js";

const LessonDiversityExplorationProductionArchitectureSamplerParameterStoreAndStreamingFeedback: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: Sampler, Parameter Store, and Streaming
            Feedback
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
                <strong>Contextual bandits</strong> extend multi-armed bandits
                by incorporating context (user features, item features, time)
                into the decision. The reward depends not just on which item you
                show, but on the context in which you show it.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Context Matters
            </p>
            <p style="margin-top: 0">
              An item that works well for one user segment may fail for another.
              Morning recommendations differ from evening. Mobile differs from
              desktop. Contextual bandits learn these variations. Instead of one
              reward estimate per item, they learn a function mapping (context,
              item) to reward.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LinUCB Algorithm
            </p>
            <p style="margin-top: 0">
              Model reward as linear function of context:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                reward = context · weights + noise
              </code>
              . For each item, maintain weight vector and uncertainty estimate.
              Select item with highest UCB: predicted reward plus exploration
              bonus scaled by uncertainty. Update weights after observing actual
              reward.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Neural Contextual Bandits
            </p>
            <p style="margin-top: 0">
              Replace linear model with neural network for more expressive
              reward prediction. Uncertainty estimation becomes harder. Common
              approaches: dropout-based uncertainty, ensemble methods, or neural
              tangent kernel approximations. More powerful but more complex to
              implement and tune.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Trade-off:</strong> Contextual bandits require more
              data than context-free bandits because they learn separate reward
              functions per context. With sparse data per context, they may
              underperform simpler approaches. Use when contexts have distinct
              reward patterns and you have enough data per context.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Recommendation Request
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    User pageview, &lt;10ms budget
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ read
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Parameter Store</strong>
                  <div style="margin-top: 4px; font-size: 11px">
                    Per arm: &#123;clicks: 1523, impressions: 8940&#125;
                    <br />
                    Redis/DynamoDB, p99 &lt;5ms, atomic increments
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Sampler Service</strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Thompson Sampling: Beta(1523, 7417)
                    <br />
                    Returns selected arm ID
                  </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 4px">
                  <div style="font-size: 18px; font-weight: bold; flex: 1; text-align: right">
                    User click →
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 2; text-align: center">
                    <strong style="font-size: 13px">
                      Streaming Feedback (Kafka)
                    </strong>
                    <div style="margin-top: 4px; font-size: 11px">
                      Filter, dedupe, validate
                      <br />→ atomic increment counters
                    </div>
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
                  Sampler must add less than 10ms latency. Thompson Sampling or
                  UCB is O(1) computation per arm. Cache frequently accessed arm
                  statistics in local memory.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parameter store needs high-throughput point reads with p99
                  under 5ms. State per arm is tiny: two integers for
                  Beta-Bernoulli. Use Redis with atomic INCR or similar.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback pipeline is fully async and decoupled from serving.
                  Events flow through message queue, get filtered and validated,
                  then update parameter store. No blocking on serving path.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Convergence depends on traffic volume and arm similarity. With
                  1000 impressions per day per arm, typical bandits converge in
                  1-2 weeks. Monitor arm selection frequencies for convergence
                  signals.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three-component separation (sampler, store, feedback) enables
                  independent scaling and deployment. Algorithm changes do not
                  require feedback infrastructure changes.
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
                  When asked about bandit architecture: explain the
                  three-component separation - sampler (samples from posteriors,
                  &lt;10ms), parameter store (maintains arm statistics),
                  feedback pipeline (updates posteriors).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For scalability: mention that parameter state per arm is tiny
                  (two integers for Beta-Bernoulli), enabling thousands of
                  bandits (per-position, per-segment) with minimal memory.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing latency: explain that sampler adds &lt;10ms to
                  request path; heavier computation (posterior updates,
                  convergence monitoring) happens asynchronously in feedback
                  pipeline.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDiversityExplorationProductionArchitectureSamplerParameterStoreAndStreamingFeedback;
