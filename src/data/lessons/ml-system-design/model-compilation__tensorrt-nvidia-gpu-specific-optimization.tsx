import type { Component } from "solid-js";

const LessonModelCompilationTensorrtNvidiaGpuSpecificOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            TensorRT: NVIDIA GPU Specific Optimization
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
                <strong>TensorRT</strong> is NVIDIA"s inference optimizer and
                runtime for their GPUs. It applies aggressive, GPU-specific
                optimizations that generic tools cannot: tensor core
                utilization, kernel autotuning, and layer fusion patterns
                optimized for NVIDIA architectures.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Key Optimizations
            </p>
            <p style="margin-top: 0">
              <strong>Layer fusion:</strong> combines Conv, BatchNorm, ReLU into
              single kernel. <strong>Precision calibration:</strong>{" "}
              automatically converts FP32 to FP16 or INT8 with minimal accuracy
              loss. <strong>Kernel autotuning:</strong> profiles multiple
              implementations per layer, selects fastest for your specific GPU.{" "}
              <strong>Memory optimization:</strong> reuses tensor buffers,
              reducing peak memory 40-60%. Typical speedups over PyTorch: 3-8x.
              Combined with INT8: 10-20x.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Build Process
            </p>
            <p style="margin-top: 0">
              TensorRT compiles ONNX (or native TF/PyTorch) into a GPU-specific
              "engine." This engine is not portable; it"s optimized for the
              exact GPU and driver version used during build. Change GPUs,
              rebuild the engine. Build time: seconds for small models, minutes
              to hours for large ones. The engine contains preselected kernels
              and memory layouts, so inference has near-zero startup overhead.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              Limitations
            </p>
            <p style="margin-top: 0">
              NVIDIA GPUs only. Engine files are GPU-specific and driver-version
              sensitive. Not all operations are supported; unsupported ops fall
              back to slower generic implementations or fail. Dynamic shapes
              require explicit dimension ranges at build time. Debugging is
              difficult since the engine is a binary blob.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Production Note:</strong> Rebuild engines when upgrading
              GPU drivers. Driver updates can invalidate cached optimizations
              and cause silent performance regression or failures.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Input: ONNX or Framework Model
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Graph Optimization</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Fuse Conv + Bias + ReLU into single kernel
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Precision Calibration</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    FP32 → FP16 (3x faster) or INT8 (12x faster)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">TensorRT Engine</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    T4 GPU: 300 to 600 img/sec (ResNet FP16)
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
                  TensorRT achieves 3-8x speedup over PyTorch; with INT8
                  quantization, 10-20x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Engines are GPU and driver-version specific; change hardware
                  or drivers, rebuild the engine
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key optimizations: layer fusion, precision calibration, kernel
                  autotuning, memory reuse (40-60% reduction)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unsupported ops fall back to slow implementations; check
                  operator coverage before committing to TensorRT
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic shapes require explicit dimension ranges at build time
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
                  Mention engine non-portability (GPU + driver specific) as
                  critical production consideration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cite specific speedup ranges (3-8x base, 10-20x with INT8) to
                  show benchmarking experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss driver upgrade risks and engine rebuild requirements
                  for production awareness
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCompilationTensorrtNvidiaGpuSpecificOptimization;
