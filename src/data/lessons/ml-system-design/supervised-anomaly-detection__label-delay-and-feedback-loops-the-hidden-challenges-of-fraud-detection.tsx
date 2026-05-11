import type { Component } from "solid-js";

const LessonSupervisedAnomalyDetectionLabelDelayAndFeedbackLoopsTheHiddenChallengesOfFraudDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Label Delay and Feedback Loops: The Hidden Challenges of Fraud
            Detection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Label Delay Problem
            </p>
            <p style="margin-top: 0">
              Chargebacks arrive 30-90 days after the transaction, sometimes
              over 120 days for international cards. During this delay, you are
              training models on incomplete data and making decisions that
              determine which future labels you will see.
            </p>
            <p>
              A transaction blocked today never gets a chargeback because it
              never happened. You know the model flagged it, but you do not know
              if it would have been fraud. Your training data contains only the
              outcomes of transactions you approved, not the full distribution
              of fraud attempts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feedback Loops
            </p>
            <p style="margin-top: 0">
              The feedback loop works like this: if you auto-block transactions
              with scores above 0.15, you never learn whether those blocked
              transactions were actually fraud. Your model sees 100% precision
              on blocked transactions (no chargebacks!) but this is artificial.
              You are measuring your intervention, not the true fraud rate.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ The Trap:</strong> Over time, the model learns patterns
              that predict "will be blocked" rather than "is fraud." It
              optimizes for its own decisions, not for actual fraud detection.
              Precision appears to improve while true detection degrades.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigating Feedback Bias
            </p>
            <p style="margin-top: 0">
              <strong>Exploration traffic:</strong> Reserve 1-5% of traffic for
              random approval regardless of score. These transactions reveal
              true fraud rates in the blocked population. Expensive (you eat
              some fraud losses) but essential for unbiased evaluation.
            </p>
            <p>
              <strong>Propensity weighting:</strong> When training, weight each
              example by the inverse of its approval probability. A transaction
              that was 90% likely to be blocked but got approved counts 10× more
              than one that was 90% likely to be approved.
            </p>
            <p>
              <strong>Fast feedback proxies:</strong> Use signals that arrive
              faster than chargebacks. Network risk codes, velocity patterns,
              and merchant reports arrive within hours or days. These proxies
              are noisy but provide earlier signal for model iteration.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 4px">
                  Feedback Loop Problem
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Transaction Scored</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    High Risk (0.18) → Auto Block
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">No Label Collected</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Blocked transactions never generate chargebacks
                  </div>
                  <div style="font-size: 12px">True outcome unknown</div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Model Retraining</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Learns only from approved transactions
                  </div>
                  <div style="font-size: 12px">
                    Drifts toward approving borderline fraud
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
                  Chargebacks arrive 30-90+ days after transaction; training
                  data is incomplete during this delay
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Blocked transactions never get chargebacks so you never learn
                  if they were actually fraud
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops make model optimize for 'will be blocked'
                  instead of 'is fraud'
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reserve 1-5% exploration traffic for random approval to get
                  unbiased fraud rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use propensity weighting and fast feedback proxies (network
                  codes) for earlier signals
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
                  Explain the feedback trap: model sees 100% precision on blocks
                  but measures intervention, not fraud
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe exploration traffic: 1-5% random approvals to learn
                  true fraud rate in blocked population
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention propensity weighting: weight by inverse approval
                  probability to correct for selection bias
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSupervisedAnomalyDetectionLabelDelayAndFeedbackLoopsTheHiddenChallengesOfFraudDetection;
