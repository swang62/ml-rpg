import type { Component } from "solid-js";

const LessonMultiTaskLearningCvWhatIsMultiTaskLearning: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Multi-Task Learning?
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
              <strong>Multi-task Learning</strong> trains a single model to
              perform multiple related tasks simultaneously. Instead of building
              separate models for object detection, segmentation, and depth
              estimation, one model handles all three by sharing learned
              representations across tasks.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Why Multi-task Learning Works
          </p>
          <p style="margin-top: 0">
            Related tasks share underlying structure. Detecting objects and
            estimating their depth both require understanding scene geometry.
            When tasks share a backbone network, features learned for one task
            help the others. This is called positive transfer.
          </p>
          <p>
            <strong>Efficiency gain:</strong> Three separate models might use
            300MB each (900MB total). A multi-task model uses 100MB for shared
            layers plus 20MB per task head (160MB total). You get 5x memory
            savings while maintaining or improving accuracy.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Architecture Overview
          </p>
          <p style="margin-top: 0">
            <strong>Shared backbone:</strong> Convolutional or transformer
            layers that process raw input. These layers learn features useful
            for all tasks.
          </p>
          <p>
            <strong>Task-specific heads:</strong> Small networks branching from
            the backbone. Each head specializes in one task - classification,
            detection, segmentation.
          </p>
          <p>
            <strong>Joint training:</strong> All tasks train together. Gradients
            from each task flow back through the shared backbone, creating
            representations that balance all task requirements.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            When Multi-task Makes Sense
          </p>
          <p style="margin-top: 0">
            Multi-task learning helps when tasks are related and data is
            limited. If you have abundant data for each task, separate models
            may perform better. The sweet spot: related tasks where some have
            limited data that benefits from transfer.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Input Features</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  User + Item embeddings
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Shared Backbone</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  12ms forward pass
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap">
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>CTR Head</strong>
                  <div>1ms</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>CVR Head</strong>
                  <div>1ms</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Dwell Head</strong>
                  <div>1ms</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px">
                  <strong>Safety Head</strong>
                  <div>1ms</div>
                </div>
              </div>
              <div style="margin-top: 8px; padding: 8px; border-radius: 4px; font-size: 12px; text-align: center">
                <strong>Total: 16ms vs 48ms (4 separate models)</strong>
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
                Multi-task learning shares representations across related tasks,
                enabling positive transfer
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Memory savings of 5x or more compared to separate models through
                shared backbone layers
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Architecture has shared backbone for common features plus
                task-specific heads for each output
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Best when tasks are related and some tasks have limited data
                that benefits from transfer
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
                Interview Tip: Explain multi-task as an efficiency technique -
                mention specific memory/compute savings with numbers
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Frame positive transfer as learning shared
                structure - geometry understanding helps both detection and
                depth
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonMultiTaskLearningCvWhatIsMultiTaskLearning;
