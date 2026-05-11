import type { Component } from "solid-js";

const LessonFairnessMetricsWhatIsDemographicParity: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Demographic Parity?
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
              <strong>Demographic Parity</strong> requires that the positive
              prediction rate be equal across all demographic groups. If 30% of
              Group A receives positive predictions, then 30% of Group B must
              also, regardless of underlying differences in qualifications.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Mathematical Definition
          </p>
          <p style="margin-top: 0">
            Demographic parity is satisfied when:{" "}
            <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
              P(Ŷ=1|A=0) = P(Ŷ=1|A=1)
            </code>
            , where Ŷ is the predicted outcome and A is the protected attribute.
            The probability of receiving a positive prediction should be
            identical regardless of group membership. For loan approval, if 40%
            of male applicants get approved, 40% of female applicants must also
            get approved.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Why Demographic Parity Exists
          </p>
          <p style="margin-top: 0">
            Consider a hiring model trained on historical data. If past hiring
            was biased (80% of engineers hired were male due to discrimination),
            the model learns to prefer male candidates. Even removing gender as
            a feature, the model finds proxies: hobbies, writing style, and
            school names correlate with gender. Demographic parity forces equal
            selection rates, breaking the cycle where biased data produces
            biased decisions.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Core Limitation
          </p>
          <p style="margin-top: 0">
            Demographic parity ignores ground truth. If Group A has 50%
            qualified applicants and Group B has 70%, demographic parity forces
            equal approval rates anyway. This means either approving unqualified
            Group A members or rejecting qualified Group B members. The metric
            treats unequal outcomes as problematic even when they reflect real
            qualification differences.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> Demographic parity is most
            appropriate when historical data reflects systemic discrimination.
            It is less appropriate when base rate differences reflect genuine,
            non-discriminatory factors.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">Group A: 100 applicants</strong>
                <div style="margin-top: 8px; font-size: 13px">
                  60 approved → 60% selection rate
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">Group B: 100 applicants</strong>
                <div style="margin-top: 8px; font-size: 13px">
                  48 approved → 48% selection rate
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">Parity Ratio: 0.8</strong>
                <div style="margin-top: 8px; font-size: 13px">
                  48% ÷ 60% = 0.8 (passes 80% rule)
                </div>
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
                Requires equal positive prediction rates across groups
                regardless of base rates
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Models find proxies (hobbies, school names) even when protected
                attributes are removed
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Appropriate when historical data reflects systemic
                discrimination
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Ignores ground truth: forces equal outcomes even when
                qualification rates differ
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Creates accuracy trade-off: may approve unqualified or reject
                qualified individuals
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
                Define the formula clearly: P(positive | Group A) = P(positive |
                Group B)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Explain when appropriate: when historical data is fundamentally
                biased and should not be trusted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonFairnessMetricsWhatIsDemographicParity;
