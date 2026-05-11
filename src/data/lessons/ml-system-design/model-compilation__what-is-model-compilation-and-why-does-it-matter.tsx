import type { Component } from "solid-js";

const LessonModelCompilationWhatIsModelCompilationAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Model Compilation and Why Does It Matter?
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
                <strong>Model compilation</strong> transforms a trained model
                from framework-specific format (PyTorch, TensorFlow) into
                optimized machine code for a target device. Think of it as
                compiling source code: the compiler analyzes operations, fuses
                compatible layers, and generates hardware-specific instructions.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Compile Models
            </p>
            <p style="margin-top: 0">
              Framework inference is general-purpose and slow. PyTorch executes
              operations one by one, with Python overhead between each. A
              compiled model skips Python entirely, fuses multiple operations
              into single kernels, and uses hardware-specific instructions
              (CUDA, AVX, ARM NEON). Typical speedups: 2-5x on GPU, 2-10x on
              CPU. Memory usage often drops 30-50% from eliminated intermediate
              tensors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Compilation Stack
            </p>
            <p style="margin-top: 0">
              Three levels exist. <strong>Graph-level:</strong> fuse operations
              (Conv + BatchNorm + ReLU becomes one kernel), eliminate dead code,
              optimize data layout. <strong>Kernel-level:</strong> generate
              efficient implementations for each fused operation, tuned for
              cache sizes and SIMD widths. <strong>Device-level:</strong>{" "}
              target-specific code generation (CUDA PTX for NVIDIA, Metal for
              Apple, LLVM for CPUs). Each level compounds optimizations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Common Tools
            </p>
            <p style="margin-top: 0">
              <strong>ONNX Runtime:</strong> cross-platform, moderate
              optimization. <strong>TensorRT:</strong> NVIDIA GPUs only, maximum
              performance. <strong>TVM:</strong> any target, requires tuning.{" "}
              <strong>Core ML:</strong> Apple devices. <strong>TFLite:</strong>{" "}
              mobile/edge. Choose based on target hardware; no single tool works
              everywhere.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    PyTorch/TensorFlow Model
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    512 FPS (eager mode)
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Compiler (TensorRT)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Fusion + Kernel Selection
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Optimized Engine</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    2,155 FPS (4.2x faster)
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
                  Model compilation transforms framework models into optimized
                  machine code for specific hardware
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical speedups: 2-5x on GPU, 2-10x on CPU; memory drops
                  30-50% from fused operations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three optimization levels: graph (operation fusion), kernel
                  (tuned implementations), device (target code gen)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operation fusion example: Conv + BatchNorm + ReLU becomes
                  single kernel, eliminating intermediate storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tool choice depends on target: TensorRT for NVIDIA, TVM for
                  any hardware, ONNX Runtime for cross-platform
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
                  Explain the three optimization levels (graph, kernel, device)
                  when asked about compilation benefits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cite specific speedup ranges (2-5x GPU, 2-10x CPU) to show
                  you"ve measured real systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention operation fusion with concrete example (Conv+BN+ReLU)
                  to demonstrate understanding
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCompilationWhatIsModelCompilationAndWhyDoesItMatter;
