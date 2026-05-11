import type { Component } from "solid-js";

const LessonMultiTaskLearningCvHardVsSoftParameterSharingStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hard vs Soft Parameter Sharing Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hard Parameter Sharing
            </p>
            <p style="margin-top: 0">
              In hard parameter sharing, all tasks share the same backbone
              network. Each task has its own small output head, but the heavy
              lifting happens in shared layers. This is the most common approach
              because it is simple and memory efficient.
            </p>
            <p>
              <strong>How it works:</strong> Input flows through shared
              convolutional or transformer layers. At some depth, the network
              branches into task specific heads. Each head typically adds 5-10%
              to total parameters while the shared backbone contributes 90%+.
            </p>
            <p>
              <strong>When it works well:</strong> Tasks that need similar
              low-level features benefit from hard sharing. Object detection and
              segmentation both need edge detection and texture understanding.
              Sharing these early layers helps both tasks.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Soft Parameter Sharing
            </p>
            <p style="margin-top: 0">
              In soft parameter sharing, each task has its own network, but the
              networks are encouraged to stay similar through regularization.
              Parameters are not literally shared but are constrained to not
              diverge too far.
            </p>
            <p>
              <strong>How it works:</strong> Each task has full parameters.
              During training, add a penalty term that measures how different
              the networks have become. The penalty pushes networks toward
              similar weights without forcing them to be identical.
            </p>
            <p>
              <strong>When it works well:</strong> Tasks that need different
              feature representations benefit from soft sharing. One task might
              need fine grained texture; another might need global shape. Soft
              sharing allows each to specialize while still transferring useful
              knowledge.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing Your Strategy
            </p>
            <p style="margin-top: 0">
              <strong>Default to hard sharing</strong> when tasks are closely
              related and you want maximum efficiency. Hard sharing uses 50-80%
              less memory than separate models.
            </p>
            <p>
              <strong>Use soft sharing</strong> when tasks conflict or need
              specialized representations. Soft sharing uses more memory but
              avoids the negative transfer that hard sharing can cause when
              tasks compete for shared capacity.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; gap: 24px; justify-content: center">
                <div style="flex: 1">
                  <div style="text-align: center; font-weight: bold; margin-bottom: 12px; font-size: 14px">
                    Hard Sharing
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 140px; text-align: center; font-size: 12px">
                      <strong>Shared Trunk</strong>
                      <div style="margin-top: 4px">10M params</div>
                    </div>
                    <div style="font-size: 20px; font-weight: bold">↓</div>
                    <div style="display: flex; gap: 6px">
                      <div style="border: 2px solid; padding: 6px; border-radius: 6px; font-size: 11px; text-align: center">
                        <strong>Head A</strong>
                        <div>50K</div>
                      </div>
                      <div style="border: 2px solid; padding: 6px; border-radius: 6px; font-size: 11px; text-align: center">
                        <strong>Head B</strong>
                        <div>50K</div>
                      </div>
                    </div>
                    <div style="margin-top: 8px; padding: 6px; border-radius: 4px; font-size: 11px; font-weight: bold">
                      Total: 10.1M
                    </div>
                  </div>
                </div>
                <div style="flex: 1">
                  <div style="text-align: center; font-weight: bold; margin-bottom: 12px; font-size: 14px">
                    Soft Sharing
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="display: flex; gap: 6px">
                      <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 11px; text-align: center">
                        <strong>Trunk A</strong>
                        <div style="margin-top: 4px">10M</div>
                      </div>
                      <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 11px; text-align: center">
                        <strong>Trunk B</strong>
                        <div style="margin-top: 4px">10M</div>
                      </div>
                    </div>
                    <div style="font-size: 12px; text-align: center">
                      ⟷ L2 penalty
                    </div>
                    <div style="font-size: 20px; font-weight: bold">↓</div>
                    <div style="display: flex; gap: 6px">
                      <div style="border: 2px solid; padding: 6px; border-radius: 6px; font-size: 11px; text-align: center">
                        <strong>Head A</strong>
                        <div>50K</div>
                      </div>
                      <div style="border: 2px solid; padding: 6px; border-radius: 6px; font-size: 11px; text-align: center">
                        <strong>Head B</strong>
                        <div>50K</div>
                      </div>
                    </div>
                    <div style="margin-top: 8px; padding: 6px; border-radius: 4px; font-size: 11px; font-weight: bold">
                      Total: 20.1M
                    </div>
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
                  Hard sharing: all tasks share backbone (90%+ params), only
                  task heads are separate (5-10% each)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Soft sharing: separate networks with regularization penalty to
                  keep weights similar
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hard sharing saves 50-80% memory; soft sharing prevents
                  negative transfer when tasks conflict
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Default to hard sharing for related tasks; use soft sharing
                  when tasks need different representations
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
                  Interview Tip: Explain hard vs soft sharing trade-off: memory
                  efficiency vs task specialization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention that hard sharing is the default
                  industrial choice due to simplicity and memory savings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiTaskLearningCvHardVsSoftParameterSharingStrategies;
