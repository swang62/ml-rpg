import type { Component } from "solid-js";

const LessonTextClassificationScaleZeroShotVsSupervisedClassificationTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Zero Shot vs Supervised Classification Trade-offs
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
                <strong>Zero shot classification</strong> uses a pretrained
                language model to assign labels without task-specific training.{" "}
                <strong>Supervised classification</strong> requires labeled
                training data and builds a model specifically for your labels.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Zero Shot Works
            </p>
            <p style="margin-top: 0">
              The model encodes both your input text and each label description
              into numerical vectors (embeddings). For input "My card was
              charged twice," it creates a 768-dimensional vector. It does the
              same for candidate labels: "billing issue," "delivery problem."
              The label with highest similarity wins.
            </p>
            <p>
              Why does this work? Large language models develop internal
              representations of meaning during pretraining on billions of
              words. "Charged twice" and "billing issue" end up close in vector
              space because the model learned these concepts relate
              semantically.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Supervised Approach
            </p>
            <p style="margin-top: 0">
              Supervised classification takes a different path. You provide
              1,000+ labeled examples: text paired with the correct category.
              The model learns patterns specific to your data: "charged twice"
              strongly predicts "billing," while "took 3 weeks" predicts
              "shipping." After training, you have a specialized model that
              knows only your labels but knows them extremely well.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Trade-off Summary
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Zero Shot:</strong> No training data needed, add labels
              instantly. Accuracy 70-85%. Latency 100-300ms because you process
              all labels each request.
            </div>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Supervised:</strong> Needs 500-2000 labeled examples
              per class. Accuracy 90-95%. Latency 5-20ms after training.
            </div>
            <p>
              At 1M requests/day, zero shot at 200ms costs 55 GPU-hours.
              Fine-tuned at 10ms costs 2.8 GPU-hours: 20x cheaper. But when
              adding a new category, zero shot handles it instantly while
              supervised requires relabeling and retraining.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px">
                    Zero Shot
                  </div>
                  <div style="font-size: 12px; line-height: 1.4">
                    <strong>Accuracy:</strong> F1 0.65 to 0.80
                    <br />
                    <strong>Training:</strong> None required
                    <br />
                    <strong>Latency:</strong> 20 to 60ms
                    <br />
                    <strong>Label changes:</strong> Instant
                    <br />
                    <strong>Use case:</strong> Rapid iteration
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px">
                    Supervised Fine Tuned
                  </div>
                  <div style="font-size: 12px; line-height: 1.4">
                    <strong>Accuracy:</strong> F1 0.85 to 0.95
                    <br />
                    <strong>Training:</strong> 1K to 10K examples
                    <br />
                    <strong>Latency:</strong> 10 to 50ms
                    <br />
                    <strong>Label changes:</strong> Retrain needed
                    <br />
                    <strong>Use case:</strong> Production scale
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
                  Zero shot uses pretrained model similarity between text and
                  labels, no training data required
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Supervised needs 500-2000 labeled examples per class but
                  achieves 90-95% accuracy vs 70-85%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Zero shot latency is 100-300ms, supervised is 5-20ms after
                  training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale, supervised is 10-20x cheaper but zero shot allows
                  instant label changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose zero shot for prototyping; supervised for stable
                  high-volume production
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
                  Explain accuracy vs flexibility: supervised gets 90%+ but
                  requires labeled data collection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Zero shot is ideal for POCs: test with zero training data and
                  add labels instantly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 1M requests/day, 200ms vs 10ms inference is 20x compute
                  difference
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextClassificationScaleZeroShotVsSupervisedClassificationTradeOffs;
