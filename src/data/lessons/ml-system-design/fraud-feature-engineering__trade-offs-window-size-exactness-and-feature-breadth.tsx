import type { Component } from "solid-js";

const LessonFraudFeatureEngineeringTradeOffsWindowSizeExactnessAndFeatureBreadth: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Window Size, Exactness, and Feature Breadth
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Window Size Trade-offs
            </p>
            <p>
              Short windows (1 hour) respond quickly to behavioral changes but
              are noisy—a single unusual transaction creates a spike. Long
              windows (30 days) provide stable baselines but react slowly—a
              compromised account might drain funds before 30-day metrics shift.
              Use multiple window sizes: short for detection, long for baseline
              comparison.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Design Heuristic:</strong> Include at least three window
              sizes: immediate (1 hour), recent (1-7 days), historical (30+
              days). Compare ratios across windows—a spike in the immediate
              window relative to historical is more suspicious than a spike
              relative to recent.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Exact vs Approximate Aggregations
            </p>
            <p>
              Exact sliding windows require storing all events in the
              window—expensive for high-volume entities. Approximate methods
              (HyperLogLog for distinct counts, Count-Min Sketch for
              frequencies) trade accuracy for memory. A 5% error in distinct
              merchant count rarely affects fraud decisions, but saves 10x
              memory for hot users.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Breadth vs Depth
            </p>
            <p>
              Broad feature sets (100+ features per entity) capture many signals
              but increase storage, computation, and model complexity. Deep
              features (few features, sophisticated computation) are cheaper but
              may miss patterns. Start broad for discovery, then prune to
              features with actual predictive value. Many hand-crafted features
              contribute nothing after model training.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Pruning Tip:</strong> Track feature importance in
              production models. Features with near-zero importance can be
              deprecated. Reducing from 200 to 50 features often maintains
              accuracy while cutting feature computation cost by 75%.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Freshness vs Cost
            </p>
            <p>
              Real-time streaming features cost 5-10x more than batch features
              due to infrastructure overhead. Not all features need real-time
              freshness. 30-day baseline features updated daily are
              sufficient—streaming them wastes resources. Reserve streaming
              computation for features where freshness matters: recent velocity,
              current session behavior.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 4px">
                  Window Size Tradeoff
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Short (1 min)</strong>
                    <div style="margin-top: 8px; font-size: 12px">
                      ✓ Fast response
                      <br />✗ Noisy (false alarms)
                      <br />✗ Retry spikes
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Long (7 day)</strong>
                    <div style="margin-top: 8px; font-size: 12px">
                      ✓ Stable baseline
                      <br />✗ Slow adaptation
                      <br />✗ Misses attacks
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Solution: Multi Window
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Include 1min, 5min, 1hr, 24hr, 7day
                    <br />
                    Model learns optimal weights
                    <br />
                    Cost: 5x memory, 1B values for 10M cards
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
                  Include at least three window sizes: immediate (1hr), recent
                  (1-7d), historical (30d+)—compare ratios across windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Approximate aggregations (HyperLogLog, Count-Min Sketch) trade
                  5% accuracy for 10x memory savings on hot users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reserve streaming computation for freshness-critical features;
                  batch suffices for 30-day baselines updated daily
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
                  Track feature importance and prune: reducing 200 to 50
                  features often maintains accuracy while cutting computation
                  cost 75%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Short windows are noisy (single transaction creates spike);
                  long windows react slowly (account drained before metrics
                  shift)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFraudFeatureEngineeringTradeOffsWindowSizeExactnessAndFeatureBreadth;
