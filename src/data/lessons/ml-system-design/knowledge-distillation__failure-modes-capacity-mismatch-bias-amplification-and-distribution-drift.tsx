import type { Component } from "solid-js";

const LessonKnowledgeDistillationFailureModesCapacityMismatchBiasAmplificationAndDistributionDrift: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Capacity Mismatch, Bias Amplification, and
            Distribution Drift
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Insight
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Capacity mismatch</strong> is the most common
                distillation failure. A student too small cannot represent the
                teacher"s knowledge; a student too large overfits to teacher
                errors rather than generalizing.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Mismatch Patterns
            </p>
            <p style="margin-top: 0">
              When the student is undersized, symptoms include: training loss
              decreases but validation accuracy plateaus early; student
              predictions become overconfident (high accuracy on easy examples,
              random on hard ones); the student learns coarse patterns but
              misses fine-grained distinctions. Rule of thumb: student should be
              20-50% of teacher parameters for classification, 10-30% for
              language models. Below 10%, expect significant degradation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Bias Amplification
            </p>
            <p style="margin-top: 0">
              Students can amplify teacher biases. If the teacher is 60%
              accurate on minority classes versus 95% on majority classes, the
              student might become 40% versus 93%. This happens because soft
              labels from confident majority predictions dominate the gradient
              signal. Mitigation: oversample minority classes in the transfer
              set, use class-balanced temperature (higher T for minority
              classes), or add explicit fairness constraints to the loss.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Distribution Drift
            </p>
            <p style="margin-top: 0">
              The student is trained on teacher predictions from a fixed data
              snapshot. When deployed, real data drifts. The student has no
              mechanism to update from new patterns because it never learned
              from raw labels. Signs: accuracy degrades faster than the teacher
              would on new data; confident wrong predictions on novel patterns.
              Fix: periodic re-distillation from updated teacher, or hybrid
              training that includes some hard labels.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Detection:</strong> Monitor student-teacher agreement
              over time. Divergence above 5% on held-out data indicates drift or
              capacity issues requiring intervention.
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
                  Capacity mismatch: student 20-50% of teacher params for
                  classification, 10-30% for LLMs; below 10% expect degradation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Undersized students show early plateau, overconfidence on easy
                  examples, and miss fine-grained distinctions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bias amplification: students can worsen teacher biases on
                  minority classes due to gradient imbalance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distribution drift: students trained on fixed snapshots
                  degrade faster than teachers on novel data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor student-teacher agreement; divergence above 5% signals
                  capacity or drift problems
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
                  Discuss capacity ratios (20-50% for classification) when
                  sizing student models - shows practical experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention bias amplification risk and mitigations (oversampling,
                  class-balanced temperature) for fairness questions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain distribution drift monitoring - student-teacher
                  agreement tracking demonstrates production awareness
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonKnowledgeDistillationFailureModesCapacityMismatchBiasAmplificationAndDistributionDrift;
