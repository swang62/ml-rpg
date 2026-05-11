import type { Component } from "solid-js";

const LessonHardNegativeMiningWhatIsHardNegativeMining: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Hard Negative Mining?
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
              <strong>Hard negative mining</strong> selects training examples
              that are similar to positives but should be ranked lower. These
              "hard" negatives teach the model to make fine-grained distinctions
              that easy negatives cannot.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            WHY HARD NEGATIVES MATTER
          </p>
          <p>
            Random negative sampling is easy but uninformative. If the model
            learns to distinguish "Nike running shoes" from "medieval castle
            photos," it has not learned anything useful. These easy negatives
            are so different that the model solves the task without learning
            nuance.
          </p>
          <p>
            Hard negatives force the model to learn subtle distinctions. "Nike
            running shoes" vs "Adidas running shoes" teaches brand differences.
            "Nike running shoes" vs "Nike basketball shoes" teaches category
            differences. These hard examples are where the learning happens.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            THE MINING PROCESS
          </p>
          <p>
            For each positive pair (query, relevant item), find items that are
            similar but should not be retrieved. Selection strategies include:
          </p>
          <p>
            <strong>In-batch negatives:</strong> Use other positives in the
            batch as negatives. Simple but limited—batch may not contain truly
            hard examples.
          </p>
          <p>
            <strong>ANN mining:</strong> Query the embedding index for nearest
            neighbors that are known negatives (from labels). Finds semantically
            similar items that should be distinguished.
          </p>
          <p>
            <strong>Top-K mining:</strong> Take the top K model predictions and
            label ones that are wrong as hard negatives for retraining.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            IMPACT ON MODEL QUALITY
          </p>
          <p>
            Hard negative mining typically improves recall@K by 5-15% compared
            to random negatives. The improvement is larger when the embedding
            space has many near-duplicates or confusable items.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Key Trade-off:</strong> Too-hard negatives can include
            mislabeled positives (false negatives). If the model learns to push
            away actual positives, recall drops. Balance hardness with label
            quality.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="text-align: center; font-weight: bold; margin-bottom: 8px; font-size: 15px">
                Negative Types in Embedding Space
              </div>
              <div style="display: flex; align-items: center; gap: 12px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Anchor</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">→</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Positive</strong>
                  <div style="font-size: 11px; margin-top: 4px">dist: 0.2</div>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-left: 20px">
                <div style="display: flex; align-items: center; gap: 12px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Hard Negative</strong>
                    <div style="font-size: 11px; margin-top: 2px">
                      dist: 0.15 (closer than positive!)
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Semi Hard Negative</strong>
                    <div style="font-size: 11px; margin-top: 2px">
                      dist: 0.4 (within margin 0.5)
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 12px">Easy Negative</strong>
                    <div style="font-size: 11px; margin-top: 2px">
                      dist: 0.9 (beyond margin, zero loss)
                    </div>
                  </div>
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
                Hard negatives force fine-grained distinctions; random negatives
                are too easy
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mining strategies: in-batch, ANN-based, top-K predictions
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Typical improvement: 5-15% recall@K over random negatives
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
                Interview Tip: Explain why random negatives fail—the model
                learns nothing from distinguishing completely unrelated items.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Describe the false negative risk—too-hard
                negatives may include mislabeled positives.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonHardNegativeMiningWhatIsHardNegativeMining;
