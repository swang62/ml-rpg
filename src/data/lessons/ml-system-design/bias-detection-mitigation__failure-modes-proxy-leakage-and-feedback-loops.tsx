import type { Component } from "solid-js";

const LessonBiasDetectionMitigationFailureModesProxyLeakageAndFeedbackLoops: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Proxy Leakage and Feedback Loops
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Proxy Variable Leakage
            </p>
            <p style="margin-top: 0">
              You removed race from features, but zip code predicts race with
              85% accuracy. You removed gender, but first name predicts gender
              with 95% accuracy. Models find proxies.{" "}
              <strong>Detection:</strong> Train a classifier to predict
              protected attribute from model features. If AUC exceeds 0.7,
              significant proxy information exists. If it exceeds 0.9, features
              are nearly as informative as the protected attribute itself.{" "}
              <strong>Mitigation:</strong> Remove high-correlation proxies, but
              this may hurt accuracy. Adversarial debiasing actively penalizes
              models that leak protected attribute information. Feature
              importance analysis shows which features drive group differences.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feedback Loops
            </p>
            <p style="margin-top: 0">
              Biased predictions create biased outcomes that become biased
              training data. If a hiring model rejects Group B candidates at
              higher rates, Group B has fewer success cases in future training
              data, making the model even more biased against Group B. Over 5
              retraining cycles, initial 5% bias can amplify to 25%.{" "}
              <strong>Detection:</strong> Track fairness metrics over model
              versions. If disparity increases with each retrain, feedback loop
              is operating. <strong>Mitigation:</strong> Holdout exploration:
              reserve 5-10% of decisions for random assignment regardless of
              model prediction. Counterfactual logging: estimate what would have
              happened under different decisions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Label Bias
            </p>
            <p style="margin-top: 0">
              Ground truth labels themselves may be biased. Performance reviews
              used as labels reflect reviewer bias. Fraud labels may be based on
              investigations that targeted certain groups. If you optimize for
              biased labels, you encode that bias into the model.{" "}
              <strong>Detection:</strong> Audit label generation process. If
              humans assigned labels, check inter-rater agreement by annotator
              demographics. <strong>Mitigation:</strong> Multiple annotators
              with diversity requirements. Calibration against objective
              outcomes where available. Accept that some bias may be unfixable
              without changing the labeling process entirely.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> These failure modes compound.
              Proxy leakage plus feedback loops plus label bias can create
              systems where bias is deeply embedded at every level, requiring
              comprehensive intervention.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 4px; font-size: 15px">
                  Feedback Loop Amplification
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Cycle 0: Equal Groups</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Group A approval: 50% | Group B approval: 50%
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Model trained on biased historical data
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Cycle 1: Divergence Starts
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Group A approval: 50% | Group B approval: 43%
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Fewer Group B outcomes observed
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Cycle 5: Gap Widens</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Group A approval: 52% | Group B approval: 28%
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Self reinforcing bias
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Cycle 10: Severe Disparity
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Group A approval: 55% | Group B approval: 15%
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
                  Proxy detection: train classifier predicting protected
                  attribute from features, AUC above 0.7 indicates leakage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops amplify bias: 5% initial bias can become 25%
                  over 5 retraining cycles
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Holdout exploration reserves 5-10% of decisions for random
                  assignment to break loops
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Label bias from biased annotators or investigation targeting
                  requires process change
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Failure modes compound: proxy + feedback + label bias embeds
                  bias at every level
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
                  Explain proxy detection: classifier predicting protected
                  attribute from features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantify feedback amplification: 5% to 25% over 5 retraining
                  cycles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBiasDetectionMitigationFailureModesProxyLeakageAndFeedbackLoops;
