import type { Component } from "solid-js";

const LessonMultiTaskLearningCvProductionImplementationAndServingArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation and Serving Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Architecture
            </p>
            <p style="margin-top: 0">
              Deploying multi-task models requires careful API design. Users may
              need only one task output, all task outputs, or a subset. The
              serving infrastructure must handle these patterns efficiently.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Shared Backbone, Selective Heads
            </p>
            <p style="margin-top: 0">
              The most common pattern runs the shared backbone once, then
              activates only requested task heads. If a user needs only
              detection, skip the segmentation head entirely. This saves 10-30%
              compute per request depending on head complexity.
            </p>
            <p>
              <strong>Implementation:</strong> Accept a task mask in the API
              request. During inference, check the mask and skip heads for
              unrequested tasks. Cache backbone outputs if the same input needs
              multiple task outputs sequentially.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Considerations
            </p>
            <p style="margin-top: 0">
              Multi-task models are larger than single-task models. The shared
              backbone handles more diverse features, often requiring more
              parameters. Expect 20-50% higher latency compared to a specialized
              single-task model.
            </p>
            <p>
              <strong>Trade-off decision:</strong> A multi-task model at 80ms
              versus three single-task models at 30ms each (90ms total for all
              three). If users typically need all outputs, multi-task wins. If
              users typically need one output, single-task models win.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Updates and Rollback
            </p>
            <p style="margin-top: 0">
              Updating a multi-task model affects all tasks simultaneously. If a
              new version improves detection but degrades segmentation, you
              cannot roll back just segmentation. This coupling increases
              deployment risk.
            </p>
            <p>
              <strong>Mitigation:</strong> Maintain per-task evaluation metrics.
              Block deployment if any task regresses beyond threshold. Consider
              hybrid architectures where critical tasks have dedicated fallback
              models.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Multi-task models simplify
              infrastructure (one model to serve) but complicate deployment (all
              tasks coupled). Weigh operational simplicity against deployment
              flexibility.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 8px">
                  Multi Task Serving Flow
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Request arrives</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    User ID + Item features
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Check cache</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    User embedding cached? (100ms TTL)
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Shared encoder forward pass</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    12ms, 80 to 90% of total cost
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Parallel head execution</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    4 heads × 1ms = 4ms total
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Per head timeout: 2ms, fallback to default
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Return predictions</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Total p99: 16ms under 20ms SLO
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
                  Selective head execution saves 10-30% compute by skipping
                  unrequested task outputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-task models are 20-50% slower than single-task models
                  due to larger shared backbones
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If users need all tasks, multi-task wins; if users need one
                  task, single-task models win on latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Coupled deployment: improving one task while regressing
                  another blocks the entire update
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
                  Interview Tip: Discuss the all-or-nothing rollback problem -
                  multi-task models cannot partially revert
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention selective head execution as an
                  optimization when users only need subset of outputs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiTaskLearningCvProductionImplementationAndServingArchitecture;
