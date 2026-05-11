import type { Component } from "solid-js";

const LessonModelCompilationProductionCompilationPipelineAndFailureModes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Compilation Pipeline and Failure Modes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Production Compilation Pipeline
            </p>
            <p style="margin-top: 0">
              A robust pipeline: export from training framework → validate
              numerical accuracy → compile to target format → benchmark latency
              → deploy behind A/B test. Store both source model and compiled
              artifacts. Include compilation config (precision, optimization
              flags) in version control. Automate rebuilds when dependencies
              change.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Silent Numerical Divergence
            </p>
            <p style="margin-top: 0">
              The most dangerous failure: compiled model produces different
              outputs than source but still "works." Causes: operation
              reordering changes floating-point accumulation order; fused
              kernels use different algorithms; INT8 calibration on
              unrepresentative data. Symptoms: accuracy drops 1-3% in production
              but passes unit tests. Prevention: compare outputs on 1000+
              diverse inputs; use maximum absolute difference thresholds (1e-5
              for FP32, 1e-2 for INT8).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Operator Coverage Gaps
            </p>
            <p style="margin-top: 0">
              Every compiler supports a different operator set. A model using
              custom ops, recent PyTorch additions, or uncommon operations may
              fail to compile or fall back to slow generic implementations.
              Before choosing a compiler, audit your model"s operations against
              the compiler"s supported ops list. Custom operators require
              writing compiler plugins or replacing with supported alternatives.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              Dynamic Shape Handling
            </p>
            <p style="margin-top: 0">
              Most compilers optimize for fixed input shapes. Variable batch
              sizes or sequence lengths require either: compiling multiple shape
              variants and switching at runtime; specifying shape ranges during
              compilation (TensorRT); or accepting suboptimal performance on
              dynamic workloads. Compilation time multiplies with shape
              variants; a model supporting 5 batch sizes takes 5x longer to
              compile.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Validation:</strong> Run A/B test comparing compiled vs
              source model in production. Monitor prediction distribution, not
              just accuracy metrics.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; font-size: 13px">
                  <strong>Model Release</strong>: Export to ONNX + Manifest
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; font-size: 13px">
                  <strong>CI Pipeline</strong>: Compile per device + precision
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; font-size: 13px">
                  <strong>Artifact Store</strong>: Hash keyed engines (T4 FP16,
                  A100 INT8)
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; font-size: 13px">
                  <strong>Serving</strong>: Load engine + Golden test validation
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; font-size: 13px">
                  <strong>Monitor</strong>: Drift detection + Latency p99 per
                  device
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
                  Pipeline: export → validate numerically → compile → benchmark
                  → A/B test; version both source and artifacts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Silent divergence: compiled model passes tests but drops 1-3%
                  accuracy from operation reordering or fusion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use 1000+ diverse inputs with max absolute difference
                  thresholds (1e-5 FP32, 1e-2 INT8) for validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Audit operator coverage before choosing compiler; unsupported
                  ops fail or fall back to slow implementations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic shapes multiply compilation time; TensorRT supports
                  shape ranges, others need multiple variants
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
                  Describe the silent divergence problem and how to detect it -
                  shows production debugging experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention operator coverage auditing as first step when
                  evaluating compilers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommend A/B testing compiled models and monitoring
                  prediction distribution, not just accuracy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCompilationProductionCompilationPipelineAndFailureModes;
