import type { Component } from "solid-js";

const LessonMultiTaskLearningCvWhenToChooseMultiTaskVsSeparateModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When to Choose Multi-Task vs Separate Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Multi-task Makes Sense
            </p>
            <p style="margin-top: 0">
              <strong>Related tasks with shared structure:</strong> Object
              detection and instance segmentation both need to understand object
              boundaries. Depth estimation and surface normal prediction both
              need geometric understanding. These pairs naturally benefit from
              shared features.
            </p>
            <p>
              <strong>Limited data scenarios:</strong> If Task A has millions of
              examples but Task B has thousands, training jointly transfers
              knowledge from A to B. The shared backbone learns features from A
              that help B generalize better.
            </p>
            <p>
              <strong>Latency constrained serving:</strong> When users need
              multiple outputs simultaneously and latency budget is tight, a
              single multi-task forward pass beats multiple single-task calls.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Separate Models Win
            </p>
            <p style="margin-top: 0">
              <strong>Conflicting task requirements:</strong> If tasks need
              fundamentally different features, forcing them through shared
              layers hurts both. Separate models let each task optimize
              independently.
            </p>
            <p>
              <strong>Different update frequencies:</strong> If one task needs
              daily retraining and another needs monthly, coupled training
              creates unnecessary overhead. Separate models update
              independently.
            </p>
            <p>
              <strong>Independent failure domains:</strong> If a bug in one task
              should not affect another, separate models provide isolation.
              Multi-task models propagate problems across all outputs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework
            </p>
            <p style="margin-top: 0">
              Start with separate models. Measure single-task baselines for each
              task. Then train a multi-task model and compare. If multi-task
              matches or exceeds all baselines, adopt it for the efficiency
              gains. If any task regresses significantly, keep separate models.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Multi-task learning is an
              optimization, not a default. Always establish single-task
              baselines first. Only adopt multi-task if it matches performance
              while providing efficiency benefits.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 8px">
                  Decision Framework
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                    <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px">
                      ✓ Use Multi Task
                    </div>
                    <div style="font-size: 12px; line-height: 1.4">
                      Same input modality
                      <br />
                      Aligned features
                      <br />
                      Strict latency SLO
                      <br />
                      Sparse + dense tasks
                      <br />
                      Single team ownership
                    </div>
                    <div style="margin-top: 8px; padding: 6px; border-radius: 4px; font-size: 11px; font-weight: bold">
                      Example: Ad CTR + CVR
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                    <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px">
                      ✗ Separate Models
                    </div>
                    <div style="font-size: 12px; line-height: 1.4">
                      Different domains
                      <br />
                      Conflicting objectives
                      <br />
                      Different latency needs
                      <br />
                      Different model sizes
                      <br />
                      Multiple team ownership
                    </div>
                    <div style="margin-top: 8px; padding: 6px; border-radius: 4px; font-size: 11px; font-weight: bold">
                      Example: Search + Ads
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    ⚡ Hybrid: Distillation
                  </div>
                  <div style="font-size: 12px">
                    Train multi task teacher offline → Distill to separate
                    student models for serving
                  </div>
                  <div style="margin-top: 6px; font-size: 11px; font-style: italic">
                    Gets benefits of shared learning with operational simplicity
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
                  Multi-task wins for related tasks, limited data scenarios, and
                  latency-constrained multi-output serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate models win when tasks conflict, update at different
                  frequencies, or need failure isolation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision framework: establish single-task baselines first,
                  adopt multi-task only if it matches all baselines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-task is an optimization for efficiency, not a default
                  approach
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
                  Interview Tip: Frame multi-task as a choice requiring
                  justification - start by asking if tasks are related enough to
                  benefit
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention baseline comparison as mandatory - you
                  cannot know if multi-task helps without single-task baselines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiTaskLearningCvWhenToChooseMultiTaskVsSeparateModels;
