import type { Component } from "solid-js";

const LessonBiasDetectionMitigationFairnessMetricsGroupIndividualAndCalibrationParity: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Fairness Metrics: Group, Individual, and Calibration Parity
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Group Fairness Metrics
            </p>
            <p style="margin-top: 0">
              Group fairness asks: do different demographic groups receive
              similar treatment in aggregate?{" "}
              <strong>Demographic parity:</strong> Positive prediction rates
              should be equal across groups. If 40% of Group A gets approved,
              40% of Group B should too. <strong>Equalized odds:</strong> True
              positive rate and false positive rate should be equal across
              groups. If 90% of qualified Group A members get approved, 90% of
              qualified Group B members should too.{" "}
              <strong>Equal opportunity:</strong> A relaxed version requiring
              only equal true positive rates. These metrics treat groups as
              monolithic, ignoring individual variation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Individual Fairness Metrics
            </p>
            <p style="margin-top: 0">
              Individual fairness asks: are similar individuals treated
              similarly? Two applicants with identical qualifications should
              receive identical predictions regardless of group membership. The
              challenge: defining similarity. What features determine
              similarity? If zip code is included, and zip codes correlate with
              race, you embed bias in your similarity definition. Counterfactual
              fairness: would the prediction change if only the protected
              attribute changed? For the same person, changing their gender
              should not change the prediction. Implementation requires causal
              models to identify which features depend on protected attributes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Calibration Parity
            </p>
            <p style="margin-top: 0">
              Calibration asks: when the model predicts 80% probability, does
              the event occur 80% of the time for all groups? A well-calibrated
              model saying "80% chance of loan default" should see 80% default
              rate for both men and women. Miscalibration is common: models
              often overpredict risk for minority groups (predicting 80% default
              when actual rate is 50%). Recalibration fits separate probability
              mappings per group, adjusting predictions post-hoc. Check
              calibration with reliability diagrams plotting predicted versus
              actual probabilities per group.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> These metrics are mathematically
              incompatible when base rates differ. If Group A has 60%
              qualification rate and Group B has 40%, you cannot achieve
              demographic parity and equalized odds simultaneously. Choose based
              on your fairness philosophy.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 4px; font-size: 15px">
                  Key Group Fairness Metrics
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Statistical Parity</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Group A: 30% approved | Group B: 30% approved
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Equal positive prediction rates
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Disparate Impact</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Ratio: 0.8 to 1.25 (four fifths rule threshold)
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Group B rate / Group A rate ≥ 0.8
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Equal Opportunity</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Group A TPR: 75% | Group B TPR: 75%
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Equal true positive rates for qualified individuals
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Equalized Odds</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Equal TPR AND equal FPR across groups
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Cannot coexist with calibration when base rates differ
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
                  Group fairness: demographic parity (equal rates), equalized
                  odds (equal TPR/FPR), equal opportunity (equal TPR only)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Individual fairness: similar individuals should receive
                  similar predictions regardless of group
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Counterfactual fairness: changing only protected attribute
                  should not change prediction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calibration parity: 80% predicted probability should mean 80%
                  actual rate for all groups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  These metrics are mathematically incompatible when base rates
                  differ between groups
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
                  Explain three types of group fairness with concrete approval
                  rate examples
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention counterfactual fairness requires causal models to
                  identify dependent features
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBiasDetectionMitigationFairnessMetricsGroupIndividualAndCalibrationParity;
