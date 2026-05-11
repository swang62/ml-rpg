import type { Component } from "solid-js";

const LessonModelCompilationTvmCrossPlatformMlCompiler: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          TVM: Cross Platform ML Compiler
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
              <strong>TVM (Tensor Virtual Machine)</strong> is an open-source ML
              compiler that targets any hardware: CPUs, GPUs, mobile chips,
              FPGAs, custom accelerators. Unlike TensorRT (NVIDIA-only) or Core
              ML (Apple-only), TVM provides a single compilation path for
              heterogeneous deployments.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            How TVM Works
          </p>
          <p style="margin-top: 0">
            TVM represents models in Relay IR (intermediate representation),
            applies graph-level optimizations, then lowers to Tensor Expression
            (TE) for kernel generation. The key innovation: autotuning. TVM
            generates thousands of kernel variants per operation, benchmarks
            them on target hardware, and selects the fastest. This makes TVM
            competitive with vendor-specific compilers without manual
            optimization.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Autotuning Cost
          </p>
          <p style="margin-top: 0">
            Autotuning takes hours per model on target hardware. A ResNet-50
            might need 4-8 hours of tuning to reach peak performance. Without
            tuning, TVM produces generic code that underperforms ONNX Runtime.
            With tuning, it matches or beats TensorRT on NVIDIA GPUs and
            significantly outperforms alternatives on unsupported hardware. The
            tuned schedules are saved and reused; only tune once per
            model-hardware combination.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            When to Use TVM
          </p>
          <p style="margin-top: 0">
            Ideal for: deploying to exotic hardware (custom ASICs, older GPUs
            without TensorRT support, ARM servers); needing a single compilation
            pipeline across diverse devices; research into new hardware
            backends. Not ideal for: NVIDIA-only deployment (TensorRT is easier
            and equally fast); latency-sensitive projects where tuning time is
            unacceptable; simple models where ONNX Runtime suffices.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Tip:</strong> Start with AutoTVM for per-operator tuning.
            Upgrade to MetaSchedule for newer, faster autotuning with better
            search algorithms.
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                TVM targets any hardware through Relay IR and autotuning; single
                pipeline for heterogeneous deployments
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Autotuning takes 4-8 hours per model but matches vendor-specific
                compilers once tuned
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Without tuning, TVM underperforms ONNX Runtime; with tuning,
                matches or beats TensorRT
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Best for exotic hardware (custom ASICs, ARM servers) or diverse
                device deployments
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                MetaSchedule is the newer, faster autotuning system replacing
                AutoTVM
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
                Explain the autotuning trade-off (hours of tuning for best
                performance) to show real-world experience
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mention MetaSchedule as modern alternative to AutoTVM - shows
                current knowledge
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Discuss when TVM beats TensorRT (heterogeneous hardware) versus
                when it doesn"t (NVIDIA-only)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonModelCompilationTvmCrossPlatformMlCompiler;
