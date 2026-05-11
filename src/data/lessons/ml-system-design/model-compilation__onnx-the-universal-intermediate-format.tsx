import type { Component } from "solid-js";

const LessonModelCompilationOnnxTheUniversalIntermediateFormat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            ONNX: The Universal Intermediate Format
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
                <strong>ONNX (Open Neural Network Exchange)</strong> is a
                standard format for representing ML models. It defines a common
                set of operators and a file format, allowing models trained in
                PyTorch to run in TensorFlow, or anywhere that reads ONNX.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How ONNX Works
            </p>
            <p style="margin-top: 0">
              An ONNX file contains a computation graph: nodes (operations like
              Conv, MatMul, ReLU), edges (tensor connections), and initializers
              (trained weights). The format is framework-agnostic; it represents
              what the model computes, not how PyTorch or TensorFlow implemented
              it. Export:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                torch.onnx.export(model, sample_input, "model.onnx")
              </code>
              . The exporter traces your model on the sample input, recording
              all operations.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ONNX Runtime
            </p>
            <p style="margin-top: 0">
              ONNX Runtime is an inference engine that runs ONNX models with
              optimizations. It applies graph optimizations (constant folding,
              operation fusion), selects efficient kernel implementations, and
              supports multiple backends (CPU, CUDA, DirectML, TensorRT).
              Typical speedups over PyTorch: 1.5-3x. Not as fast as pure
              TensorRT but works on more hardware and requires less tuning.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              Common Export Issues
            </p>
            <p style="margin-top: 0">
              Dynamic control flow (if statements depending on tensor values)
              doesn"t export cleanly. The exporter traces one path and bakes it
              in. Custom operators need explicit ONNX registration. Some
              operations (like torch.unique) lack ONNX equivalents. Fix: rewrite
              unsupported ops, use opset version 14+ for better coverage, or
              fall back to TorchScript for dynamic models.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Tip:</strong> Always validate ONNX output matches
              PyTorch output on sample inputs before deployment. Export can
              silently produce incorrect graphs.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px; font-weight: bold">
                    PyTorch
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px; font-weight: bold">
                    TensorFlow
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">ONNX Format</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Portable IR
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px; font-weight: bold">
                    TensorRT
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px; font-weight: bold">
                    TVM
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 13px; font-weight: bold">
                    ONNX RT
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
                  ONNX is a framework-agnostic format: nodes (operations), edges
                  (tensors), initializers (weights)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Export traces model on sample input, recording operations;
                  dynamic control flow doesn"t export cleanly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ONNX Runtime provides 1.5-3x speedup over PyTorch with graph
                  optimizations and multiple backends
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common issues: unsupported ops (torch.unique), custom
                  operators need registration, control flow limitations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always validate ONNX output matches original framework output
                  before deployment
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
                  Mention ONNX opset versions when discussing compatibility -
                  shows awareness of versioning complexities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe tracing limitations (dynamic control flow) as a key
                  export pitfall
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cite 1.5-3x ONNX Runtime speedup range to set realistic
                  expectations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCompilationOnnxTheUniversalIntermediateFormat;
