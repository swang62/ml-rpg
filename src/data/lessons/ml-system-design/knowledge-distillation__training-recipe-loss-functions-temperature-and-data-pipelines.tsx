import type { Component } from "solid-js";

const LessonKnowledgeDistillationTrainingRecipeLossFunctionsTemperatureAndDataPipelines: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Recipe: Loss Functions, Temperature, and Data Pipelines
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Temperature</strong> controls how much the student
                learns from teacher uncertainty. Higher values (3-20) soften
                probability distributions, revealing which wrong answers the
                teacher considered plausible.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Distillation Loss
            </p>
            <p style="margin-top: 0">
              Training combines two signals. <strong>Hard loss:</strong>{" "}
              cross-entropy with ground truth labels.{" "}
              <strong>Soft loss:</strong> KL divergence between student and
              teacher distributions at temperature T. The formula:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                L = α × hard_loss + (1-α) × T² × soft_loss
              </code>
              . The T² compensates for gradient shrinkage at high temperatures.
              Typical settings: α=0.1-0.5, T=3-10.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Temperature Matters
            </p>
            <p style="margin-top: 0">
              At T=1, a confident teacher outputs [0.95, 0.03, 0.02]. The
              student learns only "pick class 1." At T=5, the same logits become
              [0.45, 0.30, 0.25]. Now the student learns that classes 2 and 3
              relate to each other. This similarity structure transfers semantic
              knowledge. A dog classifier at high temperature reveals "husky"
              and "malamute" are more similar than either is to "poodle."
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Transfer Sets
            </p>
            <p style="margin-top: 0">
              Distillation often works better with transfer sets: unlabeled data
              that the teacher labels with soft predictions. Benefits: larger
              datasets, reduced overfitting (no exact training duplicates),
              targeted examples for difficult cases. Downside: generating
              teacher predictions on millions of examples adds cost. Common
              pattern: cache teacher outputs to disk, train student from cached
              soft labels.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Tuning:</strong> Start T=4. Increase if student plateaus
              early. Decrease if accuracy drops.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Loss = α × CE(hard) + β × KL(soft) × T²
                  </strong>
                </div>
                <div style="display: flex; gap: 10px; justify-content: space-between">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Temperature T</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Low (1-2): Nearly one hot
                    </div>
                    <div style="font-size: 11px">Sweet (3-8): Informative</div>
                    <div style="font-size: 11px">High (20+): Too uniform</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Weights α, β</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      α = 0.3, β = 0.7 typical
                    </div>
                    <div style="font-size: 11px">
                      Higher β: More teacher focus
                    </div>
                    <div style="font-size: 11px">α + β = 1 convention</div>
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
                  Temperature (3-20) softens outputs to reveal class similarity
                  structure, not just final predictions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Loss combines hard labels (α) and soft knowledge (1-α) with T²
                  scaling for gradient compensation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High temperature transfers semantic relationships: similar
                  classes get similar probabilities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Transfer sets (unlabeled data + teacher predictions) often
                  outperform original training data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache teacher predictions to disk for large-scale distillation
                  to avoid redundant inference
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
                  Explain T² scaling in the loss function - it compensates for
                  gradient shrinkage and shows mathematical depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention transfer sets as alternative to training data -
                  demonstrates production experience with distillation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe temperature tuning: start T=4, adjust based on
                  student learning dynamics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonKnowledgeDistillationTrainingRecipeLossFunctionsTemperatureAndDataPipelines;
