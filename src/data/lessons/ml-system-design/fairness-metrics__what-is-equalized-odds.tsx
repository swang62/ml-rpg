import type { Component } from "solid-js";

const LessonFairnessMetricsWhatIsEqualizedOdds: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Equalized Odds?
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
              <strong>Equalized Odds</strong> requires that the true positive
              rate (TPR) and false positive rate (FPR) be equal across
              demographic groups. The model should make errors at the same rate
              for everyone, conditioned on actual outcome.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Mathematical Definition
          </p>
          <p style="margin-top: 0">
            Equalized odds has two requirements. First:{" "}
            <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
              P(Ŷ=1|Y=1,A=0) = P(Ŷ=1|Y=1,A=1)
            </code>
            . Among people who truly qualify (Y=1), approval rate should be
            equal. Second:{" "}
            <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
              P(Ŷ=1|Y=0,A=0) = P(Ŷ=1|Y=0,A=1)
            </code>
            . Among those who do not qualify, false approval rate should also be
            equal. If 90% of qualified women get approved, 90% of qualified men
            must too.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Why This Matters
          </p>
          <p style="margin-top: 0">
            Unlike demographic parity, equalized odds respects ground truth. If
            Group A has more qualified applicants, they get more approvals, but
            the model treats qualified and unqualified individuals from both
            groups equally. A medical diagnostic should catch 95% of cancer
            cases in both men and women. A fraud system should flag 5% of
            legitimate transactions falsely in both groups.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Core Limitation
          </p>
          <p style="margin-top: 0">
            Equalized odds assumes ground truth labels are correct. If
            historical labels were biased (qualified women labeled unqualified),
            equalized odds perpetuates bias. It also requires ground truth for
            evaluation, which may not exist. For loan default, you only know if
            someone defaults after giving them the loan. Without outcomes for
            rejected applicants, measuring equalized odds is impossible.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Key Trade-off:</strong> Equalized odds trusts the labels.
            If labels are biased, enforcing this metric locks in that bias.
            Audit labels before relying on it.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px">Group A Qualified (Y=1)</strong>
                <div style="margin-top: 8px; font-size: 13px">
                  TPR: 80 approved / 100 qualified = 0.80
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px">Group B Qualified (Y=1)</strong>
                <div style="margin-top: 8px; font-size: 13px">
                  TPR: 72 approved / 100 qualified = 0.72
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px">
                  Group A Unqualified (Y=0)
                </strong>
                <div style="margin-top: 8px; font-size: 13px">
                  FPR: 10 approved / 100 unqualified = 0.10
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 14px">
                  Group B Unqualified (Y=0)
                </strong>
                <div style="margin-top: 8px; font-size: 13px">
                  FPR: 15 approved / 100 unqualified = 0.15
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">
                  TPR gap: 0.08, FPR gap: 0.05
                </strong>
                <div style="margin-top: 4px; font-size: 13px">
                  Violates equalized odds
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
                Requires equal true positive rate AND equal false positive rate
                across groups
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Respects ground truth: groups with more qualified members get
                more approvals
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Error rates should be consistent: 95% cancer detection for both
                groups, not 95% vs 80%
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Assumes labels are correct: biased labels mean equalized odds
                perpetuates bias
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Requires ground truth for evaluation, which may not exist for
                rejected applicants
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
                Explain both conditions: equal TPR among qualified, equal FPR
                among unqualified
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mention label trust assumption: biased labels mean the metric
                fails to detect true issues
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonFairnessMetricsWhatIsEqualizedOdds;
