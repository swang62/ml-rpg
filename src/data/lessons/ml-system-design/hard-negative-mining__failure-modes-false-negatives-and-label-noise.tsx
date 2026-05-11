import type { Component } from "solid-js";

const LessonHardNegativeMiningFailureModesFalseNegativesAndLabelNoise: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: False Negatives and Label Noise
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FALSE NEGATIVES
            </p>
            <p>
              The biggest risk in hard negative mining: treating actual
              positives as negatives. If item B is truly relevant to query A but
              unlabeled, the model learns to push B away. This directly harms
              recall.
            </p>
            <p>
              Symptoms: recall drops after adding hard negative mining. Model
              confidently ranks some relevant items at the bottom. Users
              complain about obvious matches not appearing.
            </p>
            <p>
              Causes: incomplete labeling (most relevant pairs are not
              explicitly labeled), label noise (human annotators disagree or
              make errors), distribution shift (new items have no labels).
            </p>
            <p>
              Detection: sample hard negatives and manually review. If &gt;5%
              are actually relevant, your false negative rate is too high. Also
              monitor recall on a clean held-out test set—if it drops after
              mining, investigate.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MITIGATION STRATEGIES
            </p>
            <p>
              <strong>Confidence filtering:</strong> Only use negatives where
              the model is confident (high distance from anchor). Avoid the
              hardest negatives which are likely false negatives.
            </p>
            <p>
              <strong>Cross-validation:</strong> Train multiple models, only use
              negatives that all models agree are negative. Ensemble agreement
              reduces single-model errors.
            </p>
            <p>
              <strong>Soft labels:</strong> Instead of binary negative, use a
              continuous label based on distance. Very close items get weak
              negative signal; distant items get strong signal.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LABEL NOISE AMPLIFICATION
            </p>
            <p>
              Hard negative mining amplifies label noise. If 5% of negatives are
              mislabeled, random sampling sees 5% noise. But mining specifically
              selects the hardest examples—which are disproportionately
              mislabeled (they are hard because they are actually positives).
              Noise rate in mined set can be 20-30%.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Critical:</strong> Monitor recall continuously when
              using hard negative mining. If recall drops after adding mining,
              your false negative rate is too high. Use confidence filtering or
              softer negative selection.
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
                  False negatives: treating actual positives as negatives
                  directly harms recall
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hard mining amplifies label noise: 5% random noise → 20-30% in
                  mined set
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mitigation: confidence filtering, ensemble agreement, soft
                  labels
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
                  Interview Tip: Explain why hard negatives amplify noise—mining
                  selects hardest, which are often mislabeled positives.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe confidence filtering—avoid hardest
                  negatives where model is uncertain.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardNegativeMiningFailureModesFalseNegativesAndLabelNoise;
