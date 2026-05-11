import type { Component } from "solid-js";

const LessonFeatureImportanceTrackingProductionShapDriftPipelineArchitectureAndCapacityPlanning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production SHAP Drift Pipeline Architecture and Capacity Planning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PIPELINE ARCHITECTURE
            </p>
            <p>
              A production SHAP drift pipeline has three components: sampling,
              computation, and comparison.
            </p>
            <p>
              <strong>Sampling:</strong> Select representative predictions for
              analysis. Stratified sampling by segment (user type, geography)
              ensures you do not miss segment-specific drift. Sample size:
              1000-10000 predictions per window depending on compute budget.
            </p>
            <p>
              <strong>Computation:</strong> Run SHAP explainer on sampled
              predictions. For tree models, use TreeExplainer (fast, exact). For
              other models, use KernelSHAP or DeepSHAP (slower, approximate).
              Parallelize across multiple workers for scale.
            </p>
            <p>
              <strong>Comparison:</strong> Aggregate SHAP values per feature.
              Compare to baseline using statistical tests or simple thresholds.
              Baseline: training set SHAP distribution or recent historical
              window.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CAPACITY PLANNING
            </p>
            <p>
              SHAP computation dominates cost. Tree model with 100 features and
              1000 samples: ~10 seconds. Neural network with Kernel SHAP: ~10
              minutes. Plan compute resources accordingly.
            </p>
            <p>
              <strong>Scaling strategies:</strong> Batch processing during
              low-traffic hours. Dedicated compute cluster for SHAP jobs.
              Caching SHAP values for frequently-seen input patterns (if
              applicable).
            </p>
            <p>
              Cost optimization: start with weekly SHAP drift monitoring.
              Increase frequency only for critical models. Use data-centric
              approximations for less critical models.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STORAGE AND VISUALIZATION
            </p>
            <p>
              Store aggregated SHAP statistics: mean, std, percentiles per
              feature per time window. Raw SHAP values for individual
              predictions are expensive to store; keep only for debugging
              samples.
            </p>
            <p>
              Dashboard essentials: feature importance ranking over time (line
              chart), drift alerts history, comparison of current vs baseline
              importance distribution.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Start simple: weekly SHAP on
              1000 samples. Add complexity (higher frequency, larger samples)
              only when you have evidence that simple monitoring misses
              important drift.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 12px">
                    Sample: 50K QPS × 0.1% = 50 samples/sec
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 12px">
                    Buffer: 60s window = 3,000 samples
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 12px">
                    TreeSHAP: 16 vCPU worker
                  </strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    2,500 samples/sec × 16 = 40K/sec
                    <br />
                    3,000 samples done in 0.1 sec
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 12px">
                    Aggregate &amp; Detect: 2 min latency
                  </strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    Mean |SHAP|, ranks, distributions
                    <br />
                    Alert: 30% change + KS test p&lt;0.01
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
                  Pipeline components: stratified sampling (1K-10K), computation
                  (TreeExplainer fast, KernelSHAP slow), baseline comparison
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost: tree model SHAP ~10 seconds/1K samples; neural network
                  ~10 minutes; batch during low-traffic hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Start weekly with 1000 samples; increase frequency only for
                  critical models where simple monitoring misses drift
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
                  Interview Tip: Describe the three-component pipeline:
                  sampling, computation, comparison.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain capacity planning: TreeExplainer vs
                  KernelSHAP performance, scaling strategies.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureImportanceTrackingProductionShapDriftPipelineArchitectureAndCapacityPlanning;
