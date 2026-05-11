import type { Component } from "solid-js";

const LessonModelPruningStructuredVsUnstructuredPruningCoreDifferences: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Structured vs Unstructured Pruning: Core Differences
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
                <strong>Model pruning</strong> removes weights or neurons from a
                trained neural network to reduce size and computation. The key
                insight: 80-90% of neural network weights contribute minimally
                to predictions and can be removed with negligible accuracy loss.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Unstructured Pruning
            </p>
            <p style="margin-top: 0">
              Removes individual weights anywhere in the network, creating
              sparse weight matrices. A 90% pruned layer keeps only 10% of its
              original weights. The remaining weights are scattered
              unpredictably. Advantage: maximum flexibility means maximum
              compression. A 95% sparse network can match dense accuracy.
              Disadvantage: sparse matrices don"t run faster on standard
              hardware. A GPU still processes full matrix multiplications; zeros
              just produce zero outputs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Structured Pruning
            </p>
            <p style="margin-top: 0">
              Removes entire neurons, channels, or layers rather than individual
              weights. Pruning a filter in a convolutional layer removes that
              filter entirely plus corresponding connections. The result is a
              smaller dense network, not a sparse one. Advantage: direct speedup
              on any hardware since matrix dimensions actually shrink. A network
              with 50% of channels pruned runs approximately 2x faster.
              Disadvantage: less flexible, harder to maintain accuracy at high
              compression ratios.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Practical Gap
            </p>
            <p style="margin-top: 0">
              Unstructured pruning achieves 10-20x compression on paper but
              often no speedup without specialized sparse hardware. Structured
              pruning typically achieves 2-4x compression but delivers real
              speedups on GPUs and CPUs. Choose based on deployment target, not
              just compression ratio.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; gap: 24px; align-items: flex-start; justify-content: center">
                <div style="flex: 1">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 12px">
                    <strong style="font-size: 14px">
                      Unstructured Pruning
                    </strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-family: monospace; font-size: 11px; line-height: 1.4">
                    1.2 0.0 0.8 0.0
                    <br />
                    0.0 0.3 0.0 0.9
                    <br />
                    0.0 0.0 1.1 0.0
                    <br />
                    0.5 0.0 0.0 0.7
                  </div>
                  <div style="margin-top: 8px; font-size: 12px; text-align: center">
                    <strong>90% sparse</strong>
                    <br />
                    Same 4x4 shape
                    <br />
                    Scattered zeros
                  </div>
                </div>
                <div style="flex: 1">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 12px">
                    <strong style="font-size: 14px">Structured Pruning</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-family: monospace; font-size: 11px; line-height: 1.4">
                    1.2 0.8
                    <br />
                    0.3 0.9
                    <br />
                    1.1 0.4
                    <br />
                    0.5 0.7
                  </div>
                  <div style="margin-top: 8px; font-size: 12px; text-align: center">
                    <strong>50% channels removed</strong>
                    <br />
                    Now 4x2 shape
                    <br />
                    Dense computation
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
                  80-90% of neural network weights can be removed with minimal
                  accuracy loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unstructured pruning removes individual weights, creating
                  sparse matrices that compress well but don"t speed up standard
                  hardware
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Structured pruning removes entire neurons/channels, creating
                  smaller dense networks with real speedups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unstructured: 10-20x compression, no speedup without sparse
                  hardware; Structured: 2-4x compression, real speedups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose pruning type based on deployment hardware, not just
                  compression ratio
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
                  Explain the structured vs unstructured distinction clearly -
                  interviewers test whether you understand why sparse matrices
                  don"t speed up GPUs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention specific compression ratios (90-95% for unstructured,
                  50-75% for structured) to show practical experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss the hardware dependency: structured for standard
                  GPUs/CPUs, unstructured only with sparse accelerators
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPruningStructuredVsUnstructuredPruningCoreDifferences;
