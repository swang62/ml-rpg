import type { Component } from "solid-js";

const LessonDataDriftDetectionCostScaleAndTradeOffAnalysis: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Cost, Scale, and Trade-off Analysis
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            COMPUTE COST
          </p>
          <p>
            Drift detection adds overhead. For each monitored feature, you
            compute statistics on current data and compare to baseline. With 500
            features and hourly monitoring, that is 500 × 24 = 12,000 drift
            computations per day.
          </p>
          <p>
            Cost drivers: number of features monitored, window size (larger
            windows = more data to process), statistical test complexity (PSI is
            fast; embedding comparisons are slow), and monitoring frequency.
          </p>
          <p>
            Optimization: prioritize high-impact features. Not all features need
            equal monitoring. Monitor critical features hourly, secondary
            features daily, low-impact features weekly. Use sampling to reduce
            data volume.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            STORAGE COST
          </p>
          <p>
            Drift detection requires storing historical distributions. Options:
            store raw data (expensive, flexible), store aggregates only (cheap,
            limited analysis), or store sketches (space-efficient
            approximations).
          </p>
          <p>
            Data sketches like T-Digest (for percentiles) and Count-Min Sketch
            (for frequencies) reduce storage 10-100x while preserving
            statistical properties. Trade-off: some precision loss in exchange
            for massive cost reduction.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            SCALE CONSIDERATIONS
          </p>
          <p>
            At scale (millions of requests, thousands of features), drift
            monitoring becomes a significant infrastructure component. Consider:
            dedicated compute resources, partitioned storage, sampling
            strategies, and tiered monitoring (critical vs secondary features).
          </p>
          <p>
            Scaling pattern: centralize drift computation as a platform service
            rather than embedding in each model pipeline. Shared infrastructure
            amortizes cost and ensures consistency.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            ROI ANALYSIS
          </p>
          <p>
            Drift detection costs resources but catches problems early. A model
            degrading undetected for 2 weeks might cost $1M in lost revenue. If
            drift detection costs $50K/year and catches one such event, it pays
            for itself 20x.
          </p>
          <p>
            Track: drift alerts issued, true positives (drift confirmed, action
            taken), false positives (alert ignored), and missed drift (problems
            found by other means). Use these to justify and optimize monitoring
            investment.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> Drift detection ROI is asymmetric.
            Cost is predictable (infrastructure); benefit is preventing rare but
            expensive failures. Invest in monitoring proportional to the cost of
            missed drift.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">Batch: Hourly/Daily</strong>
                <div style="font-size: 11px; margin-top: 6px">
                  Cost: $5K to $10K/month for 100M events/day
                  <br />
                  Latency: 12 to 24 hour detection
                  <br />
                  Complexity: Low, simple scheduled jobs
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">Streaming: Real time</strong>
                <div style="font-size: 11px; margin-top: 6px">
                  Cost: $20K to $40K/month (3x to 5x batch)
                  <br />
                  Latency: 5 to 15 minute detection
                  <br />
                  Complexity: High, stateful stream processing
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">Sampling Impact</strong>
                <div style="font-size: 11px; margin-top: 6px">
                  50K RPS × 0.2% = 100 events/sec = 360K/hour
                  <br />
                  Storage: 200TB → 400GB (99.8% reduction)
                  <br />
                  Sufficient power for 50+ features × 10 segments
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px">
                  Alert Tiering (Meta approach)
                </strong>
                <div style="font-size: 11px; margin-top: 6px">
                  Dashboard: Sensitive (PSI &gt; 0.1), all features
                  <br />
                  Info alert: Medium (PSI &gt; 0.25), top 50 features
                  <br />
                  Page: High severity only (effect + KPI + persistence)
                  <br />
                  Target: 2 to 5 actionable pages/day, 95%+ recall
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Compute cost: features × frequency × test complexity; prioritize
                critical features, use tiered monitoring frequency
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Storage: data sketches (T-Digest, Count-Min) reduce storage
                10-100x with minor precision loss
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ROI is asymmetric: predictable monitoring cost vs rare but
                expensive undetected drift events
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
                Interview Tip: Explain tiered monitoring—hourly for critical
                features, weekly for low-impact.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Justify drift detection investment with ROI
                calculation: cost of monitoring vs cost of missed drift.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataDriftDetectionCostScaleAndTradeOffAnalysis;
