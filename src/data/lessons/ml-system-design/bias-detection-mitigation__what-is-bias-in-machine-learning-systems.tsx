import type { Component } from "solid-js";

const LessonBiasDetectionMitigationWhatIsBiasInMachineLearningSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Bias in Machine Learning Systems?
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
                <strong>Bias in ML</strong> occurs when a model systematically
                produces outcomes that unfairly favor or disadvantage certain
                groups. Unlike statistical bias, ML bias refers to
                discriminatory patterns from data, features, or model design.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sources of Bias
            </p>
            <p style="margin-top: 0">
              <strong>Historical bias:</strong> Training data reflects past
              discrimination. If 80% of hires were male, the model learns
              maleness predicts success. <strong>Representation bias:</strong>{" "}
              Underrepresented groups. A facial system trained on 90% light skin
              fails on darker tones. <strong>Measurement bias:</strong> Features
              correlate with protected attributes. Credit scores correlate with
              race due to historical lending. <strong>Aggregation bias:</strong>{" "}
              A single model for diverse populations learns majority patterns,
              failing minorities.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Bias Matters Beyond Ethics
            </p>
            <p style="margin-top: 0">
              Biased models create business and legal risks. Loan models with
              racial bias face regulatory action costing hundreds of millions.
              Hiring tools have resulted in settlements exceeding M. Biased
              recommendations lose minority users permanently. Bias also
              indicates model weakness: 95% accuracy on Group A but 70% on Group
              B is an engineering problem masquerading as ethics.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Accuracy-Fairness Trade-off
            </p>
            <p style="margin-top: 0">
              Optimizing for raw accuracy often amplifies bias. If Group A has
              more training data, the model performs better on Group A, raising
              overall accuracy while Group B suffers. Fairness constraints
              typically cost 2-5% accuracy. This trade-off is not always
              acceptable: in medical diagnosis, 2% loss might mean missed
              cancers.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Bias is an engineering concern:
              different performance across groups means spurious correlations
              that will fail when data shifts.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 15px">
                  Four Sources of ML Bias
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Sampling Bias</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    80% male patients → model underperforms on females
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Label Bias</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Training on past hiring decisions that were discriminatory
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Measurement Bias</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    ZIP code acts as proxy for race, feature quality varies by
                    group
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Deployment Bias</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Model trained on urban data applied to rural context
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
                  Four sources: historical (past discrimination),
                  representation, measurement (proxies), aggregation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Business risks include regulatory fines, lawsuits exceeding M,
                  permanent user loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Performance gaps (95% vs 70% across groups) indicate
                  engineering problem, not just ethics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fairness constraints typically cost 2-5% accuracy, trade-off
                  must be domain-specific
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Biased models learned spurious correlations that fail when
                  data shifts
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
                  Name the four bias sources with concrete examples for each
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Frame bias as engineering: group performance gaps indicate
                  model quality issues
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBiasDetectionMitigationWhatIsBiasInMachineLearningSystems;
