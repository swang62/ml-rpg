import type { Component } from "solid-js";

const LessonModelPackagingOnnxVsSavedmodelChoosingYourSerializationFormat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            ONNX vs SavedModel: Choosing Your Serialization Format
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Model Serialization Formats:</strong> Standardized ways to
              save trained models independent of the training code. SavedModel
              (TensorFlow native), ONNX (framework-agnostic), and TorchScript
              (PyTorch native) each make different trade-offs between
              portability, optimization potential, and ecosystem compatibility.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SavedModel Format
            </p>
            <p>
              TensorFlow native format that captures the computational graph,
              weights, and signatures (input/output specifications). Advantages:
              first-class support in TensorFlow Serving with automatic batching
              and GPU management, direct integration with TF optimization tools
              (TF-Lite, TensorRT), and preservation of custom ops and training
              code. Limitations: TensorFlow-only ecosystem, larger file sizes
              than alternatives, requires TensorFlow runtime for inference. Best
              for: TensorFlow-native pipelines where you control the entire
              stack.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ONNX Format
            </p>
            <p>
              Open Neural Network Exchange—a framework-agnostic format supported
              by PyTorch, TensorFlow, scikit-learn, and many others. Advantages:
              train in PyTorch, serve with ONNX Runtime; broad hardware support
              (CPU, GPU, edge devices); optimization tools work across
              frameworks. Limitations: conversion can lose custom operations,
              dynamic shapes require careful handling, not all ops have ONNX
              equivalents. Conversion validation is essential: compare outputs
              between original model and ONNX version on test inputs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TorchScript Format
            </p>
            <p>
              PyTorch serialization that captures the model as a graph rather
              than Python code. Two modes: tracing (records operations during
              example forward pass) and scripting (compiles Python code to
              TorchScript). Tracing is simpler but misses control flow;
              scripting handles conditionals but requires code compatibility.
              Advantages: stays within PyTorch ecosystem, enables C++ inference
              without Python, supports dynamic shapes better than ONNX.
              Limitations: PyTorch-only, some Python features cannot be
              scripted.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Decision Guide:</strong> Use SavedModel for TensorFlow
              pipelines. Use ONNX when you need framework portability or edge
              deployment. Use TorchScript for PyTorch models staying in PyTorch
              ecosystem. Always validate converted models against originals.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">ONNX Format</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    <strong>Pros:</strong>
                    <br />• Framework agnostic
                    <br />• 100-300 MB containers
                    <br />• 3-5s cold start
                    <br />• Edge friendly
                    <br />
                    <br />
                    <strong>Cons:</strong>
                    <br />• Conversion risk
                    <br />• Operator coverage gaps
                    <br />• Potential 0.1-2% drift
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">SavedModel Format</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    <strong>Pros:</strong>
                    <br />• Zero conversion
                    <br />• TF Serving integration
                    <br />• XLA optimizations
                    <br />• Full TF ecosystem
                    <br />
                    <br />
                    <strong>Cons:</strong>
                    <br />• TF locked
                    <br />• 500-1500 MB containers
                    <br />• 15-45s cold start
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
                  SavedModel: TensorFlow native with best TF Serving integration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ONNX: framework-agnostic but requires careful conversion
                  validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  TorchScript: PyTorch native with tracing (simple) vs scripting
                  (handles control flow)
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
                  Train in PyTorch, convert to ONNX, serve with ONNX Runtime
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compare original and converted model outputs on test inputs to
                  validate conversion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPackagingOnnxVsSavedmodelChoosingYourSerializationFormat;
