import type { Component } from "solid-js";

const LessonMultiTaskLearningCvFailureModesNegativeTransferAndDataDrift: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Negative Transfer and Data Drift
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Negative Transfer
            </p>
            <p style="margin-top: 0">
              Negative transfer occurs when adding a task hurts performance on
              existing tasks. Instead of helping each other, tasks compete for
              shared capacity. The multi-task model performs worse than separate
              single-task models.
            </p>
            <p>
              <strong>Why it happens:</strong> Tasks may require conflicting
              features. Texture classification benefits from high frequency
              details. Shape classification benefits from smoothed, abstract
              features. Forcing both through the same backbone creates a
              compromise that serves neither well.
            </p>
            <p>
              <strong>Detection:</strong> Compare multi-task model performance
              against single-task baselines. If any task is 2%+ worse in the
              multi-task setting, negative transfer is occurring.
            </p>
            <p>
              <strong>Mitigation:</strong> Increase backbone capacity. Use soft
              parameter sharing instead of hard sharing. Add task-specific
              layers earlier in the network. In severe cases, remove the
              conflicting task from the multi-task setup.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Uneven Data Drift
            </p>
            <p style="margin-top: 0">
              Production data changes over time. In multi-task settings, tasks
              may drift at different rates. User behavior changes affect click
              prediction immediately. Seasonal patterns affect image
              classification gradually.
            </p>
            <p>
              <strong>The problem:</strong> When you retrain on new data, one
              task improves dramatically while another barely changes or even
              degrades. The optimal retraining frequency differs per task, but
              multi-task models must be retrained as a unit.
            </p>
            <p>
              <strong>Mitigation:</strong> Monitor per-task accuracy drift
              independently. If tasks drift at very different rates, consider
              decoupling them into separate models. Use task-specific
              calibration layers that can be updated independently.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Task Imbalance
            </p>
            <p style="margin-top: 0">
              When one task has 10x more training data than another, the model
              optimizes primarily for the data-rich task. The data-poor task
              gets insufficient gradient signal and underperforms.
            </p>
            <p>
              <strong>Mitigation:</strong> Oversample minority tasks. Use loss
              weighting inversely proportional to data volume. Apply curriculum
              learning: start with balanced sampling, gradually shift toward
              natural distribution.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Negative transfer: multi-task model performs worse than
                  single-task baselines due to feature conflicts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detect negative transfer by comparing against single-task
                  baselines - 2%+ degradation indicates problems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uneven data drift forces suboptimal retraining schedules when
                  tasks change at different rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Task imbalance from 10x data differences causes model to
                  neglect minority tasks
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
                  Interview Tip: Explain negative transfer as task competition
                  for shared capacity - not all tasks benefit from sharing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention monitoring per-task drift separately as
                  a production best practice for multi-task systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiTaskLearningCvFailureModesNegativeTransferAndDataDrift;
