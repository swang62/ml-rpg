import type { Component } from "solid-js";

const LessonEdgeDeploymentHowMobilenetAchieves8xFasterInferenceWithDepthwiseSeparableConvolutions: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How MobileNet Achieves 8x Faster Inference with Depthwise Separable
            Convolutions
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE DEPTHWISE SEPARABLE TRICK
            </p>
            <p style="margin-top: 0">
              Standard convolution applies a 3x3 filter across all input
              channels simultaneously. For 64 input channels and 128 output
              channels, this requires 3×3×64×128 = 73,728 parameters per layer.
              Depthwise separable convolution splits this into two steps: (1)
              apply a separate 3x3 filter to each input channel (64×9 = 576
              parameters), (2) use a 1x1 convolution to combine channels (64×128
              = 8,192 parameters). Total: 8,768 parameters, roughly 8x fewer.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY THIS WORKS
            </p>
            <p style="margin-top: 0">
              Standard convolution learns spatial patterns (edges, textures) and
              channel interactions (color combinations) simultaneously.
              Depthwise separable assumes these are separable: learn spatial
              patterns first, then combine across channels. This assumption
              holds surprisingly well for visual features. The accuracy cost is
              typically 1-2 percentage points for 8x fewer operations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MOBILENET V1 VS V2
            </p>
            <p style="margin-top: 0">
              <strong>MobileNetV1:</strong> Stacks depthwise separable
              convolutions directly. Simple but information can be lost through
              ReLU activations.
              <br />
              <strong>MobileNetV2:</strong> Adds inverted residuals with linear
              bottlenecks. Expands channels, applies depthwise conv, then
              projects back. The linear (no ReLU) projection preserves
              information. V2 is 35% more accurate than V1 at similar latency.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> MobileNet trades a small
              accuracy loss (1-2 percentage points) for 8x fewer operations,
              making real-time inference possible on mobile CPUs.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WIDTH AND RESOLUTION MULTIPLIERS
            </p>
            <p style="margin-top: 0">
              MobileNet includes two knobs: width multiplier (α) scales channel
              counts by 0.25-1.0, and resolution multiplier scales input size
              (128-224). These allow trading accuracy for speed on specific
              hardware targets.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="display: block; margin-bottom: 6px; font-size: 14px">
                    Standard Convolution
                  </strong>
                  <div style="font-size: 13px">
                    64 channels → 128 channels, 3×3 kernel
                  </div>
                  <div style="font-size: 13px; margin-top: 4px">
                    Operations: <strong>73,728 per position</strong>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Split into two steps ↓
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                    <strong style="display: block; margin-bottom: 6px; font-size: 14px">
                      Depthwise
                    </strong>
                    <div style="font-size: 13px">3×3 per channel</div>
                    <div style="font-size: 13px; margin-top: 4px">
                      <strong>576 ops</strong>
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                    <strong style="display: block; margin-bottom: 6px; font-size: 14px">
                      Pointwise
                    </strong>
                    <div style="font-size: 13px">1×1 projection</div>
                    <div style="font-size: 13px; margin-top: 4px">
                      <strong>8,192 ops</strong>
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Total: 8,768 operations
                  </strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Reduction: <strong>8.4x faster</strong>
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
                  Depthwise separable: split 3x3 conv into depthwise
                  (per-channel) + 1x1 pointwise, reducing ops 8x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Parameter reduction: 73,728 → 8,768 for 64→128 channel layer,
                  with 1-2 percentage point accuracy cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MobileNetV2 adds inverted residuals with linear bottlenecks,
                  35% more accurate than V1 at similar latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Width (0.25-1.0) and resolution (128-224) multipliers tune
                  accuracy vs speed for specific hardware
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
                  Walk through the parameter math: standard 3×3×64×128 = 73,728
                  vs depthwise separable 576+8,192 = 8,768
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the separability assumption: spatial patterns and
                  channel interactions can be learned separately
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention width/resolution multipliers as tuning knobs for
                  different hardware targets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEdgeDeploymentHowMobilenetAchieves8xFasterInferenceWithDepthwiseSeparableConvolutions;
