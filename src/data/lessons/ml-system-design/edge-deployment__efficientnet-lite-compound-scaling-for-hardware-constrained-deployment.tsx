import type { Component } from "solid-js";

const LessonEdgeDeploymentEfficientnetLiteCompoundScalingForHardwareConstrainedDeployment: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            EfficientNet Lite: Compound Scaling for Hardware Constrained
            Deployment
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPOUND SCALING
            </p>
            <p style="margin-top: 0">
              Traditional scaling increases depth (more layers), width (more
              channels), or resolution independently. EfficientNet scales all
              three together using a compound coefficient φ: depth scales by
              1.2^φ, width by 1.1^φ, resolution by 1.15^φ. This balanced
              approach achieves better accuracy per FLOP than scaling any
              dimension alone. EfficientNet-B0 through B7 represent increasing φ
              values.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EFFICIENTNET LITE MODIFICATIONS
            </p>
            <p style="margin-top: 0">
              Standard EfficientNet uses operations not well-supported on mobile
              hardware. EfficientNet-Lite makes three changes: (1) Replace Swish
              activation with ReLU6, which is 2-3x faster on mobile
              accelerators. (2) Remove squeeze-and-excite blocks, which require
              global pooling that is slow on edge TPUs. (3) Fix input resolution
              to avoid shape-dependent optimization issues. These changes
              sacrifice 1-2% accuracy for 40-60% faster inference on edge
              devices.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING THE RIGHT VARIANT
            </p>
            <p style="margin-top: 0">
              <strong>EfficientNet-Lite0:</strong> 5ms on mobile GPU, 75%
              ImageNet top-1. Good for classification with tight latency.
              <br />
              <strong>EfficientNet-Lite2:</strong> 12ms, 77% accuracy. Balanced
              choice.
              <br />
              <strong>EfficientNet-Lite4:</strong> 30ms, 80% accuracy. Maximum
              accuracy when latency budget allows.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> EfficientNet-Lite achieves
              similar accuracy to ResNet-50 (80%) at 10x fewer FLOPs, making it
              ideal for edge deployment.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUANTIZATION COMPATIBILITY
            </p>
            <p style="margin-top: 0">
              EfficientNet-Lite is designed for INT8 quantization. The
              simplified architecture (no squeeze-excite, ReLU6) quantizes
              cleanly with less than 1% accuracy loss, enabling 2-4x speedup on
              integer-only accelerators.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: bold; font-size: 15px">
                Compound Scaling Trade-off Space
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; align-items: center; gap: 12px">
                  <div style="min-width: 90px; font-size: 13px; font-weight: bold">
                    Depth
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    More layers capture complex patterns
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px">
                  <div style="min-width: 90px; font-size: 13px; font-weight: bold">
                    Width
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    More channels per layer increase capacity
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px">
                  <div style="min-width: 90px; font-size: 13px; font-weight: bold">
                    Resolution
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px; font-size: 12px">
                    Higher input captures fine details
                  </div>
                </div>
                <div style="margin-top: 8px; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Compound Scaling</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Scale all three together with fixed ratio for optimal
                    accuracy per FLOP
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
                  Compound scaling: depth × 1.2^φ, width × 1.1^φ, resolution ×
                  1.15^φ achieves better accuracy per FLOP
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lite modifications: ReLU6 (2-3x faster), no squeeze-excite,
                  fixed resolution; trades 1-2% accuracy for 40-60% faster
                  inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Variants: Lite0 (5ms, 75%), Lite2 (12ms, 77%), Lite4 (30ms,
                  80%) for different latency budgets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantization-friendly: INT8 with &lt;1% accuracy loss, 2-4x
                  speedup on integer accelerators
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
                  Explain compound scaling: scaling depth, width, and resolution
                  together beats scaling any one dimension
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe Lite modifications: Swish→ReLU6, remove
                  squeeze-excite, fix resolution for edge hardware
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use the variant selection: Lite0 for tight latency, Lite4 for
                  maximum accuracy with 30ms budget
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEdgeDeploymentEfficientnetLiteCompoundScalingForHardwareConstrainedDeployment;
