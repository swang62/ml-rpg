import type { Component } from "solid-js";

const LessonMultiArmedBanditsUpperConfidenceBoundUcbOptimismUnderUncertainty: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Upper Confidence Bound (UCB): Optimism Under Uncertainty
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE UCB PRINCIPLE
            </p>
            <p style="margin-top: 0">
              Upper Confidence Bound (UCB) embodies the principle of "optimism
              in the face of uncertainty." For each arm, it maintains an
              estimate of the expected reward plus a bonus for uncertainty. Arms
              that have been tried less frequently have higher uncertainty, so
              they get a bigger bonus. This bonus naturally decays as you
              collect more observations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE UCB1 FORMULA
            </p>
            <p style="margin-top: 0">
              The classic UCB1 algorithm selects the arm with the highest score:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                score(a) = Q(a) + c × sqrt(ln(t) / N(a))
              </code>{" "}
              where Q(a) is the empirical mean reward for arm a, N(a) is the
              number of times arm a has been pulled, t is the total number of
              pulls so far, and c controls exploration intensity (typically
              sqrt(2)).
            </p>
            <p>
              The uncertainty bonus{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                sqrt(ln(t) / N(a))
              </code>{" "}
              shrinks as you pull arm a more often (N(a) grows) but grows slowly
              with total time (ln(t)). This ensures arms that have not been
              tried recently eventually get explored.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TUNING THE EXPLORATION PARAMETER
            </p>
            <p style="margin-top: 0">
              The parameter c controls the exploration-exploitation balance.
              Higher c means more exploration: arms with few trials get larger
              bonuses. Lower c means more exploitation: stick with high
              performers faster. In practice, c = sqrt(2) works well for bounded
              rewards in [0,1]. For unbounded rewards, tune c based on the
              reward scale.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> UCB is deterministic: given the
              same history, it always picks the same arm. This makes debugging
              easy but can be exploited if adversaries observe your choices.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN UCB WORKS BEST
            </p>
            <p style="margin-top: 0">
              UCB excels with stationary reward distributions (arms do not
              change over time), moderate number of arms (5-20), and when you
              want interpretable, reproducible behavior. It struggles with heavy
              tailed rewards where occasional outliers inflate mean estimates.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; margin-bottom: 8px">
                  <strong style="font-size: 15px">UCB1 Arm Selection</strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Arm A: Tried 1000 times
                  </strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Mean reward Q(A) = 0.12
                  </div>
                  <div style="font-size: 13px">Uncertainty bonus = 0.02</div>
                  <div style="font-size: 13px; font-weight: bold; margin-top: 4px">
                    UCB Score = 0.14
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Arm B: Tried 50 times</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Mean reward Q(B) = 0.10
                  </div>
                  <div style="font-size: 13px">Uncertainty bonus = 0.09</div>
                  <div style="font-size: 13px; font-weight: bold; margin-top: 4px">
                    UCB Score = 0.19 ← Selected!
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Arm C: Tried 500 times
                  </strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Mean reward Q(C) = 0.11
                  </div>
                  <div style="font-size: 13px">Uncertainty bonus = 0.03</div>
                  <div style="font-size: 13px; font-weight: bold; margin-top: 4px">
                    UCB Score = 0.14
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border-radius: 6px; font-size: 13px">
                  <strong>Formula:</strong> UCB(a) = Q(a) + c × √(ln t / N(a))
                  <br />
                  where t = 1550 total trials, c = √2 ≈ 1.41
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
                  UCB1: score(a) = Q(a) + c × sqrt(ln(t)/N(a)) where uncertainty
                  bonus decays as arm is pulled more
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parameter c controls exploration intensity; sqrt(2) is typical
                  for [0,1] rewards
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deterministic: same history yields same choice, making
                  debugging easy but potentially exploitable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best for stationary problems with 5-20 arms; struggles with
                  heavy tailed rewards
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
                  When explaining UCB, write out the formula and explain each
                  component: empirical mean, uncertainty bonus, and exploration
                  parameter
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that UCB is deterministic, which aids debugging but
                  differs from stochastic Thompson Sampling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss the trade-off: high c explores more but wastes
                  traffic, low c exploits faster but may miss better arms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiArmedBanditsUpperConfidenceBoundUcbOptimismUnderUncertainty;
