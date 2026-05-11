import type { Component } from "solid-js";

const LessonImbalancedDataHandlingSmoteSyntheticMinorityOversamplingTechnique: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            SMOTE: Synthetic Minority Oversampling Technique
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>How SMOTE Works:</strong> SMOTE creates synthetic minority
              class examples by interpolating between existing minority samples.
              For each minority example, find its k nearest minority neighbors,
              randomly select one, and create a new point on the line segment
              between them. This expands the minority class decision region
              without exact duplication.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Algorithm
            </p>
            <p>
              1. For each minority class sample, find k nearest neighbors
              (typically k=5) within the minority class. 2. Randomly select one
              neighbor. 3. Create synthetic sample: new_point = original +
              random(0,1) × (neighbor - original). 4. Repeat until desired
              balance ratio is achieved. The synthetic points fill the feature
              space between real minority examples.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Interpolation Works
            </p>
            <p>
              Simple oversampling (duplicating minority examples) causes
              overfitting—the model memorizes exact minority points. SMOTE
              generates novel points that are plausibly minority class, forcing
              the model to learn the decision boundary rather than memorize
              specific examples. The feature space between minority samples is
              assumed to also be minority class.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> SMOTE assumes linear interpolation in
              feature space produces valid samples. For complex feature
              distributions (images, text embeddings), this assumption breaks.
              Synthetic samples may be unrealistic or cross into majority class
              regions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SMOTE Variants
            </p>
            <p>
              Borderline-SMOTE focuses on minority samples near the decision
              boundary—these are hardest to classify. ADASYN generates more
              synthetic samples in regions where minority class is
              underrepresented. SMOTE-NC handles mixed numerical-categorical
              features. Choose variants based on data characteristics.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Practical Application
            </p>
            <p>
              Apply SMOTE only to training data, never to validation or test
              sets. Evaluate on natural distribution. Typical target: 1:1 to 1:3
              minority-to-majority ratio, not necessarily perfect balance.
              Excessive oversampling can introduce noise that hurts
              generalization.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Original Minority Example
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Transaction Amount: $500
                    <br />
                    Velocity: 10 txn/hour
                    <br />
                    Label: Fraud
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="font-size: 20px; font-weight: bold">+</div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 14px">Nearest Neighbor</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      Transaction Amount: $800
                      <br />
                      Velocity: 15 txn/hour
                      <br />
                      Label: Fraud
                    </div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓ Linear Interpolation
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Synthetic Example</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Transaction Amount: $650
                    <br />
                    Velocity: 12.5 txn/hour
                    <br />
                    Label: Fraud (synthetic)
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
                  SMOTE interpolates between minority neighbors to create
                  synthetic samples, avoiding overfitting from exact duplication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Assumes linear interpolation produces valid samples—breaks for
                  complex features like images or text embeddings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Apply SMOTE only to training data; target 1:1 to 1:3 ratio,
                  not necessarily perfect balance
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
                  Algorithm: find k neighbors, select one, create point =
                  original + random(0,1) × (neighbor - original)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use Borderline-SMOTE for samples near decision boundary,
                  ADASYN for underrepresented regions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImbalancedDataHandlingSmoteSyntheticMinorityOversamplingTechnique;
