import type { Component } from "solid-js";

const LessonDifferentialPrivacyWhatIsDifferentialPrivacy: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Differential Privacy?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
            <strong>Differential Privacy:</strong> A mathematical framework
            guaranteeing that the output of a computation does not reveal
            whether any individual was in the input dataset. Adding or removing
            one person changes the output only slightly, making it impossible to
            determine if someone participated by observing results.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Privacy Problem
          </p>
          <p>
            Publishing aggregate statistics can leak individual information. A
            database shows "average salary of employees in department X is
            150,000 USD." If you know there are 5 employees and later learn the
            average dropped to 140,000 USD after someone left, you can infer
            that person earned 190,000 USD. Even ML models memorize training
            data: language models reproduce verbatim text from training, image
            classifiers reveal whether specific images were used. Differential
            privacy prevents these inference attacks mathematically, not through
            policy.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Epsilon Parameter
          </p>
          <p>
            Privacy guarantee is controlled by epsilon (ε). Lower epsilon means
            stronger privacy: ε=0.1 provides strong protection, ε=1 provides
            moderate protection, ε=10 provides weak protection. Mathematically,
            epsilon bounds how much adding or removing one record can change
            output probabilities. If ε=1, any output is at most e^1 ≈ 2.7 times
            more likely with versus without a specific record. The trade-off:
            lower epsilon requires more noise, reducing data utility. Choosing
            epsilon is a policy decision balancing privacy risk against
            analytical value.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Noise Mechanisms
          </p>
          <p>
            Differential privacy is achieved by adding calibrated random noise
            to outputs. <strong>Laplace mechanism:</strong> Adds noise scaled to
            query sensitivity (how much one record can change the answer). Used
            for numerical queries (counts, sums, averages).{" "}
            <strong>Gaussian mechanism:</strong> Adds Gaussian noise, slightly
            weaker guarantees but better composition properties.{" "}
            <strong>Exponential mechanism:</strong> For categorical outputs,
            selects options with probability exponentially weighted by quality
            score. The noise makes outputs fuzzy enough that individual records
            cannot be reverse-engineered.
          </p>
          <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
            <strong>Key Insight:</strong> Differential privacy provides provable
            guarantees regardless of attacker knowledge or computational
            power—unlike encryption which can be broken with sufficient
            resources.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 13px">
                    Dataset A<br />
                    (10,000 users)
                  </strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 13px">
                    Dataset B<br />
                    (9,999 users)
                  </strong>
                </div>
              </div>
              <div style="text-align: center; font-size: 13px; padding: 0 16px">
                Differ by exactly one person
              </div>
              <div style="font-size: 24px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">DP Mechanism adds noise</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  ε = 1, Laplace(scale=1)
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 13px">Output: 10,001</strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 13px">Output: 10,000</strong>
                </div>
              </div>
              <div style="text-align: center; font-size: 12px; padding: 0 16px; margin-top: 4px">
                Output distributions are nearly indistinguishable
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Adding/removing one person changes output only slightly,
                preventing individual inference
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Epsilon controls privacy: 0.1 strong, 1 moderate, 10 weak
                protection
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Laplace noise for numerical queries, Gaussian for better
                composition, Exponential for categorical
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
                Average salary + someone leaving reveals the departed persons
                salary
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Epsilon 1 means output is at most 2.7x more likely with vs
                without any record
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDifferentialPrivacyWhatIsDifferentialPrivacy;
