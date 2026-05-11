import type { Component } from "solid-js";

const LessonNeuralArchitectureSearchDeviceAwareLatencyModelingForNas: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Device Aware Latency Modeling for NAS
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 12px; font-size: 15px; line-height: 1.6">
              Accuracy alone does not determine the best architecture.
              Production systems have latency budgets, memory limits, and power
              constraints. Device-aware NAS incorporates these constraints
              directly into the search.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Latency Modeling Matters
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Theoretical complexity (FLOPs) poorly predicts real latency. A
              model with 2x more FLOPs might run only 1.2x slower due to better
              memory access patterns. Conversely, memory-bound operations like
              depthwise convolutions have few FLOPs but high latency on some
              hardware.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              Different hardware has different bottlenecks. A GPU is
              compute-bound; a mobile CPU is memory-bound. An architecture
              optimal for GPU may be terrible on mobile. Device-aware NAS
              searches for architectures optimized for YOUR deployment target.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Modeling Approaches
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Lookup tables:</strong> Measure latency of each operation
              type on target hardware. Sum operations for total latency
              estimate. Fast but ignores operation interactions and memory
              effects.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Learned predictors:</strong> Train a neural network to
              predict latency from architecture description. More accurate
              (captures interactions) but requires thousands of real
              measurements to train.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6">
              <strong>Direct measurement:</strong> Run each candidate on target
              device. Most accurate but slowest. Use only for final candidates.
            </p>
            <div style="margin: 16px 0; padding: 12px 14px; border-left: 3px solid; border-radius: 0 6px 6px 0">
              <p style="margin: 0; font-size: 14px; line-height: 1.5">
                Key metric: Latency predictor error should be under 10%. Higher
                error means NAS wastes compute exploring architectures that will
                not meet constraints.
              </p>
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Latency Lookup Table (LUT)
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px; font-family: monospace">
                    Conv3x3_in64_out128_112x112: 12.3ms
                    <br />
                    Conv5x5_in128_out256_56x56: 18.7ms
                    <br />
                    DepthwiseConv3x3_in256_56x56: 4.1ms
                    <br />
                    SE_block_in256: 2.8ms
                    <br />
                    ...(10,000 entries)
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Architecture Graph</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Input → Conv3x3 → BN → ReLU → Conv5x5
                    <br />→ SE block → Pool → Conv3x3 → Output
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Latency Estimation</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Sum: 12.3 + 18.7 + 4.1 + 2.8 = 37.9ms
                    <br />
                    Fusion correction (Conv+BN+ReLU): -20%
                    <br />
                    <strong>Final estimate: 30.3ms (p50)</strong>
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Validation on Real Device
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Measured: 31.8ms p50, 45.2ms p95
                    <br />
                    Error: 4.7% vs estimate
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
                  FLOPs poorly predict latency: 2x FLOPs may only be 1.2x slower
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU is compute-bound, mobile CPU is memory-bound: same
                  architecture performs differently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lookup tables are fast but inaccurate; learned predictors need
                  training data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency predictor error should be under 10% for effective
                  search
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
                  Interview Tip: Explain why FLOPs are a poor proxy for real
                  latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe how to build a latency lookup table
                  for a target device
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Discuss the data collection process for
                  training a learned latency predictor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNeuralArchitectureSearchDeviceAwareLatencyModelingForNas;
