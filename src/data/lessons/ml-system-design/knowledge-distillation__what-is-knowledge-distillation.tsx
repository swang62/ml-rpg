import type { Component } from "solid-js";

const LessonKnowledgeDistillationWhatIsKnowledgeDistillation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Knowledge Distillation?
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
                <strong>Knowledge Distillation</strong> trains a small, fast
                model (the student) to mimic the behavior of a large, accurate
                model (the teacher). The student learns not just the correct
                answers but the teacher probability distribution over all
                possible answers, capturing richer information than labels
                alone.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE CORE PROBLEM
            </p>
            <p style="margin-top: 0">
              Large models achieve high accuracy but are expensive to serve. A 1
              billion parameter model might need 4 GPUs and cost $0.10 per 1,000
              requests. A 100 million parameter model costs $0.01 per 1,000
              requests but achieves lower accuracy. Knowledge distillation
              closes this gap: the small model trained with distillation often
              matches 95% or more of the large model accuracy at 10x lower cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY SOFT LABELS HELP
            </p>
            <p style="margin-top: 0">
              When classifying an image, a large model might output: 80% cat,
              15% dog, 5% fox. The hard label just says cat. But the soft
              distribution tells the student that this image is somewhat
              dog-like and slightly fox-like. This extra information helps the
              student generalize better, especially on ambiguous or edge cases
              where the relationships between classes matter.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The teacher output contains more
              information than binary labels. A confident 99% prediction means
              something different than an uncertain 51% prediction, even if both
              are correct.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE DISTILLATION
            </p>
            <p style="margin-top: 0">
              Use distillation when you have a high quality teacher available,
              serving cost matters, and you can afford the one time training
              cost. It is most effective when the student is 5 to 20x smaller
              than the teacher. Below 5x, just use the smaller model directly.
              Above 20x, the gap is too large to bridge.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Teacher Model</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    110M params, 100ms latency
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">
                  ↓ Soft Targets (T=5)
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 200px; text-align: center">
                  <div style="font-size: 11px">
                    Dog: 0.85 | Wolf: 0.10 | Cat: 0.05
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">
                  ↓ KL Loss + CE Loss
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Student Model</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    66M params, 40ms latency
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
                  Student learns to mimic teacher probability distribution, not
                  just hard labels
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Soft labels contain richer information: 80% cat, 15% dog tells
                  more than just cat
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Closes the cost-accuracy gap: 95%+ of large model accuracy at
                  10x lower serving cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Most effective when student is 5-20x smaller than teacher
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Requires one-time training cost but saves on every subsequent
                  inference
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
                  Explain soft labels: 80% cat, 15% dog, 5% fox teaches
                  relationships between classes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss cost savings: 1B param model at $0.10/1K vs 100M at
                  $0.01/1K after distillation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe the sweet spot: student 5-20x smaller; below 5x just
                  train smaller, above 20x gap too large
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonKnowledgeDistillationWhatIsKnowledgeDistillation;
