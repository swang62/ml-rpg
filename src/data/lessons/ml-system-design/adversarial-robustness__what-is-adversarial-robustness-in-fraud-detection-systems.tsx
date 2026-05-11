import type { Component } from "solid-js";

const LessonAdversarialRobustnessWhatIsAdversarialRobustnessInFraudDetectionSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Adversarial Robustness in Fraud Detection Systems?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Definition:</strong> Adversarial robustness is the ability
              of a fraud detection model to maintain performance when attackers
              deliberately craft inputs to evade detection. Unlike random noise,
              adversarial attacks are intentional—fraudsters study your model
              and design transactions specifically to be misclassified as
              legitimate.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Fraud Detection is Uniquely Vulnerable
            </p>
            <p>
              Standard ML assumes data comes from a fixed distribution. In fraud
              detection, adversaries actively adapt. When you deploy a model,
              fraudsters probe it with test transactions, observe which get
              blocked, and adjust their tactics. The data distribution shifts in
              response to your model—a phenomenon called adversarial
              distribution shift. Models that perform well on historical data
              can fail rapidly against adaptive attackers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Types of Adversarial Attacks
            </p>
            <p>
              Feature manipulation: fraudsters modify controllable features
              (transaction timing, amounts, merchants) to match legitimate
              patterns. Model probing: testing many transactions to infer
              decision boundaries. Concept drift exploitation: legitimate
              behavior changes are used to mask fraudulent patterns. Each attack
              type requires different defenses.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Insight:</strong> Adversarial robustness is not about
              preventing all attacks—it is about raising the cost of successful
              attacks high enough that fraud becomes unprofitable for attackers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Arms Race Reality
            </p>
            <p>
              Fraud detection is an ongoing arms race. You improve defenses,
              attackers adapt. You patch that adaptation, they find new
              vulnerabilities. Robust systems are not invulnerable—they degrade
              gracefully when attacked and recover quickly when new attack
              patterns are identified. Design for continuous adaptation, not
              permanent defense.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 15px">
                  Three Attack Classes in Production
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Evasion Attack</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Modify inputs at inference → Change transaction $99.99 to
                    $100.01 to evade threshold
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Poisoning Attack</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Corrupt training data → Inject 1000 mislabeled fraud cases
                    to skew next model
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Backdoor Attack</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Implant trigger during training → Hidden pattern always
                    returns "legitimate"
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
                  Adversarial attacks are intentional—fraudsters study your
                  model and craft transactions to be misclassified
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversarial distribution shift: the data distribution changes
                  in response to your deployed model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Goal is raising attack cost until fraud becomes unprofitable,
                  not preventing all attacks
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
                  Attack types: feature manipulation (timing, amounts), model
                  probing (test transactions), concept drift exploitation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Design for continuous adaptation—robust systems degrade
                  gracefully and recover quickly, not permanently invulnerable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAdversarialRobustnessWhatIsAdversarialRobustnessInFraudDetectionSystems;
