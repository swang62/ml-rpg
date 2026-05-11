import type { Component } from "solid-js";

const LessonKnowledgeDistillationThreeTransferGranularitiesResponseFeatureAndRelationBasedDistillation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Three Transfer Granularities: Response, Feature, and Relation Based
            Distillation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RESPONSE BASED DISTILLATION
            </p>
            <p style="margin-top: 0">
              The most common approach: train the student to match the teacher
              final layer output. For each training input, run both teacher and
              student, then minimize the distance between their output
              distributions. The loss function typically combines cross entropy
              with ground truth labels and KL divergence (a measure of how
              different two probability distributions are) with teacher outputs:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                loss = α × hard_loss + (1-α) × soft_loss
              </code>
              . Typical alpha is 0.5 to 0.9.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TEMPERATURE SCALING
            </p>
            <p style="margin-top: 0">
              Teacher outputs are often too confident: 99.9% for the correct
              class, near zero for others. This hides information about class
              relationships. Temperature scaling softens the distribution:
              divide logits (the values before softmax that converts to
              probabilities) by temperature T before applying softmax. T=1 is
              normal, T=5 spreads probability more evenly. Higher temperature
              reveals more teacher knowledge but may transfer noise. T=3 to T=5
              works well for most tasks.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FEATURE BASED DISTILLATION
            </p>
            <p style="margin-top: 0">
              Instead of matching only final outputs, match intermediate
              representations. Force student hidden layers to resemble teacher
              hidden layers. This transfers the teacher internal structure, not
              just its predictions. Useful when teacher and student have similar
              architectures. Requires a projection layer if dimensions differ.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Feature distillation is more complex
              to implement and tune but often achieves better results than
              response-only distillation, especially for smaller students.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRAINING DATA
            </p>
            <p style="margin-top: 0">
              You can distill on the original training data or on unlabeled data
              with teacher generated labels. Unlabeled data often improves
              results because it provides more diverse examples. The teacher
              effectively labels this extra data for free.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Response Based</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Match output logits with KL divergence
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Works with black box API access
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Feature Based</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Match intermediate layer activations
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Critical when architectures differ in depth
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Relation Based</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Match pairwise sample similarities
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Preserves ranking and retrieval quality
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
                  Response distillation: match teacher final output using KL
                  divergence plus hard label loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Loss combines hard and soft: α × hard_loss + (1-α) ×
                  soft_loss, typical α = 0.5-0.9
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temperature T=3-5 softens confident outputs to reveal more
                  class relationship information
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature distillation matches intermediate layers for deeper
                  knowledge transfer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Can distill on unlabeled data - teacher labels it for free,
                  adding diversity
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
                  Explain temperature: T=1 gives 99.9% confident, T=5 spreads to
                  70%/15%/10%/5% revealing structure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Walk through loss: α=0.7 means 70% weight on ground truth, 30%
                  on matching teacher
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss unlabeled data: 1M labeled + 10M unlabeled with
                  teacher labels often beats 1M labeled alone
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonKnowledgeDistillationThreeTransferGranularitiesResponseFeatureAndRelationBasedDistillation;
