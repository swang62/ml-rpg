import type { Component } from "solid-js";

const LessonServingInfrastructurePrecisionConversionAndHardwareOptimizationFp32ToBf16Fp16Int8Tradeoffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Precision Conversion and Hardware Optimization: FP32 to BF16, FP16,
            INT8 Tradeoffs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Precision Opportunity
            </p>
            <p style="margin-top: 0">
              Converting models from 32 bit floating point (FP32) to lower
              precision formats like BF16, FP16, or INT8 can double throughput,
              halve memory footprint, and reduce serving costs by 40% to 60%.
              Modern hardware provides specialized instructions: NVIDIA Tensor
              Cores accelerate FP16 and BF16 matrix operations at 2x to 4x FP32
              speed, Intel AMX accelerates BF16 and INT8 on Xeon CPUs, and ARM
              processors include similar instructions. The conversion is
              typically done by exporting trained FP32 models to hardware
              optimized formats like TensorRT engine files for NVIDIA GPUs,
              OpenVINO IR for Intel hardware, or quantized ONNX models for cross
              platform deployment.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Precision vs Accuracy Trade-offs
            </p>
            <p style="margin-top: 0">
              FP16 reduces numerical range and can cause gradient underflow
              during training, but inference is usually safe for most vision and
              language models with accuracy drops under 0.5%. BF16 preserves
              FP32 dynamic range (same exponent bits) while reducing precision,
              making it more robust for large models. INT8 quantization can
              cause larger accuracy degradation (1% to 5% depending on
              calibration quality) but provides the highest throughput gains,
              often 4x over FP32. Production teams must run regression testing:
              compare converted model outputs against FP32 reference on
              validation sets and enforce acceptance thresholds before promoting
              to production.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Impact
            </p>
            <p style="margin-top: 0">
              A computer vision model serving 10,000 queries per second on four
              V100 GPUs in FP32 might serve the same load on two GPUs after
              TensorRT FP16 conversion, cutting hardware cost from $20,000 per
              month to $10,000 per month.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Silent Drift Risk
            </p>
            <p style="margin-top: 0">
              Layer fusion optimizations and reduced precision arithmetic can
              shift decision boundaries. Teams maintain automated per layer diff
              tests and end to end statistical guards in canary and shadow
              deployments to catch accuracy regressions before full rollout.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Precision Tradeoff Spectrum
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">FP32 (Baseline)</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Throughput: 1x
                  </div>
                  <div style="font-size: 11px">Memory: 100%</div>
                  <div style="font-size: 11px">Accuracy: 100%</div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">BF16 / FP16</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Throughput: 2x to 4x
                  </div>
                  <div style="font-size: 11px">Memory: 50%</div>
                  <div style="font-size: 11px">Accuracy: 99.5% to 100%</div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">INT8 Quantized</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Throughput: 3x to 5x
                  </div>
                  <div style="font-size: 11px">Memory: 25%</div>
                  <div style="font-size: 11px">
                    Accuracy: 95% to 99% (calibration dependent)
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
                  Lower precision formats can double throughput and halve
                  memory: FP16 and BF16 provide 2x to 4x speedup on Tensor
                  Cores, INT8 provides 3x to 5x speedup with careful calibration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost impact: serving 10,000 QPS vision model dropped from four
                  V100 GPUs at $20,000 per month in FP32 to two GPUs at $10,000
                  per month after TensorRT FP16 conversion, a 50% cost reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Accuracy tradeoffs vary by format: FP16 and BF16 typically
                  cause under 0.5% accuracy drop for vision and language models,
                  INT8 quantization can cause 1% to 5% degradation depending on
                  calibration quality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  BF16 preserves FP32 dynamic range (same 8 exponent bits) while
                  reducing precision, making it more robust for large models
                  than FP16 which has smaller range and can underflow
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Silent numerical drift risk: layer fusion and reduced
                  precision can shift decision boundaries, requiring automated
                  per layer diff tests and end to end validation on
                  representative datasets before promotion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hardware specific backends required: TensorRT for NVIDIA GPUs,
                  OpenVINO for Intel CPUs with AMX acceleration, quantized ONNX
                  for cross platform deployment
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
                  Google uses BF16 extensively for TPU serving across Search and
                  YouTube models, accepting under 0.3% accuracy variation while
                  achieving 3x throughput improvement over FP32 baseline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber converted ETA prediction model from FP32 to TensorRT
                  FP16, reducing p99 inference latency from 45 milliseconds to
                  18 milliseconds on T4 GPUs while maintaining Mean Absolute
                  Error (MAE) within 2% of FP32 reference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NVIDIA published INT8 quantization for ResNet50 achieving
                  98.9% of FP32 top 1 accuracy (75.8% vs 76.5%) while delivering
                  4.2x throughput on A100 GPU using post training quantization
                  calibration on 1,000 ImageNet samples
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonServingInfrastructurePrecisionConversionAndHardwareOptimizationFp32ToBf16Fp16Int8Tradeoffs;
