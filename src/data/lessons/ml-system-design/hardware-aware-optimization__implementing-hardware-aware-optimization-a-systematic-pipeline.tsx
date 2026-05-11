import type { Component } from "solid-js";

const LessonHardwareAwareOptimizationImplementingHardwareAwareOptimizationASystematicPipeline: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementing Hardware Aware Optimization: A Systematic Pipeline
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
                <strong>Hardware-aware NAS</strong> (Neural Architecture Search)
                automates finding optimal architectures for specific hardware.
                Instead of manually designing, search algorithms explore
                architecture space while measuring actual latency/memory on
                target hardware.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Search Pipeline
            </p>
            <p style="margin-top: 0">
              Define a search space: layer types (conv, pooling, attention),
              widths (channel counts), depths (layer counts). Define objectives:
              accuracy on validation set, latency on target hardware. Run
              search: sample architectures, train briefly (proxy task), measure
              objectives, update search algorithm. Search methods include
              reinforcement learning (sample based on predicted reward),
              evolutionary (mutate top performers), differentiable (gradient
              descent on architecture parameters). Expect 100-1000 GPU hours for
              full search.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hardware-in-the-Loop
            </p>
            <p style="margin-top: 0">
              The key innovation: measure latency on actual target hardware
              during search, not predicted from FLOPs. A lookup table
              precomputes latency per operation type and size on target device.
              During search, sum latencies for candidate architecture. This
              catches hardware-specific effects: memory bandwidth bottlenecks,
              kernel launch overhead, cache behavior. Without
              hardware-in-the-loop, searched architectures are theoretically
              efficient but practically slow.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Workflow
            </p>
            <p style="margin-top: 0">
              Start with off-the-shelf efficient architectures (EfficientNet,
              MobileNet, RegNet) as baselines. If baselines meet requirements,
              stop. If not, run hardware-aware NAS with those architectures in
              the search space. Fine-tune the discovered architecture on full
              training data. Validate on target hardware under production
              conditions. Budget 2-4 weeks for the full process including NAS,
              training, and validation.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">
                    1. Set Targets: p50/p99 latency, QPS, power
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">
                    2. Hardware Aware NAS: Latency lookup tables
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">
                    3. Quantization: Parallel INT8 path on device
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">
                    4. Compile &amp; Fuse: Match tensor core tiles
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">
                    5. Runtime Adapt: Monitor &amp; adjust precision/routing
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">
                    6. CI &amp; Deploy: Regression gates, canary, kill switch
                  </strong>
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
                  Hardware-aware NAS searches architecture space while measuring
                  actual latency on target hardware
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Search methods: RL (reward-based), evolutionary (mutation),
                  differentiable (gradient); 100-1000 GPU hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hardware-in-the-loop: lookup tables precompute per-op latency,
                  catch bandwidth and cache effects
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  FLOPs-based predictions miss hardware-specific effects;
                  architectures may be theoretically efficient but slow
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production workflow: baseline with EfficientNet/MobileNet, NAS
                  only if baselines fail; 2-4 week budget
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
                  Explain hardware-in-the-loop NAS versus FLOPs-based - shows
                  understanding of the accuracy gap
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention lookup tables for latency prediction as the key NAS
                  implementation detail
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommend starting with baseline architectures before NAS -
                  shows practical prioritization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardwareAwareOptimizationImplementingHardwareAwareOptimizationASystematicPipeline;
