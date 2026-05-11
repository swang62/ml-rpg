import type { Component } from "solid-js";

const LessonExperimentDesignWhatIsPowerAnalysisAndWhyDoesSampleSizeMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Power Analysis and Why Does Sample Size Matter?
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
                <strong>Power analysis</strong> calculates sample size needed to
                detect a given effect. It connects: sample size (N), minimum
                detectable effect (MDE), significance level (alpha, typically
                5%), and power (typically 80%).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Relationship
            </p>
            <p style="margin-top: 0">
              The formula is roughly:&#123;" "&#125;
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                N ∝ variance × (z_alpha + z_beta)² / MDE²
              </code>
              . Halving the MDE quadruples required sample size. Increasing
              power from 80% to 90% adds ~30% more sample. These are expensive
              trade-offs.
            </p>
            <p>
              For a conversion experiment: baseline 5%, MDE 10% relative lift
              (detecting 5.5% vs 5.0%), alpha 5%, power 80% requires ~31,000
              users per arm, or 62,000 total. At 10,000 daily users, thats 6-7
              days minimum.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Underpowered Experiments
            </p>
            <p style="margin-top: 0">
              Running underpowered experiments wastes resources. If true effect
              is 3% but your MDE is 5%, you have only 30-40% chance of detecting
              it. Worse, any significant result from underpowered experiments is
              likely inflated (winners curse).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Larger MDE means faster
              experiments but misses small improvements. A 1% lift on 10M annual
              conversions at $100 AOV is $1M+ value. Missing it because you
              powered for 5% MDE is expensive.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pre-Experiment Planning
            </p>
            <p style="margin-top: 0">
              Before launching, calculate: required sample for your MDE, daily
              traffic to experiment surface, expected runtime. If runtime
              exceeds 4-6 weeks, reconsider: accept larger MDE? Reduce metric
              variance? Use higher-traffic surface?
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 6px">
                  Power Analysis Inputs &amp; Outputs
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Baseline Rate</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      2.0% conversion
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Target MDE</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      10% relative lift
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Alpha</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      5% Type I error
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Power</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      80% to 90%
                    </div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Required Sample</strong>
                  <div style="font-size: 13px; margin-top: 6px; font-weight: bold">
                    30,000 per variant
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Variance: p(1−p) = 0.02 × 0.98
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Duration Estimate</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    60,000 total ÷ 2,000/day = 30 days
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Add 10-20% buffer for seasonality
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
                  Halving the MDE quadruples required sample size; power 80→90%
                  adds ~30% more sample
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Underpowered experiments suffer from winners curse -
                  significant results are inflated estimates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High-variance metrics (revenue) need 4x+ sample vs
                  low-variance metrics (conversion)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If runtime exceeds 4-6 weeks, reconsider MDE, variance
                  reduction, or traffic surface
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
                  When asked about sample size: give concrete example (62K users
                  for 10% relative lift on 5% baseline conversion)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For underpowered experiments: explain winners curse -
                  significant results from underpowered tests are inflated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentDesignWhatIsPowerAnalysisAndWhyDoesSampleSizeMatter;
