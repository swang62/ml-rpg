import type { Component } from "solid-js";

const LessonContinuousTrainingRetrainingStrategiesBatchVsIncrementalVsHybrid: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Retraining Strategies: Batch vs Incremental vs Hybrid
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Full Batch Retrain
            </p>
            <p style="margin-top: 0">
              Three retraining strategies dominate production systems, each with
              distinct trade offs. Full batch retrain starts from scratch on a
              sliding window (last 7 to 28 days), recomputing all weights. This
              is the safest and most reproducible approach, used by Netflix for
              nightly homepage personalization retrains. The cost is high
              compute (training clusters must handle peak load) and slow
              reaction (cannot deploy faster than training completes, typically
              hours to days for large models).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Incremental Updates
            </p>
            <p style="margin-top: 0">
              Incremental or online updates continue training from the previous
              model checkpoint, processing only new data. Meta uses this for
              embedding layers and calibrators, updating every 15 to 60 minutes
              to capture trending topics in feeds. The benefit is speed and low
              cost (only process deltas), but risks accumulate: catastrophic
              forgetting (model loses older patterns), bias drift (overweights
              recent data), and harder validation (no clean baseline).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hybrid Strategies
            </p>
            <p style="margin-top: 0">
              Hybrid strategies combine both: Uber runs daily full retrains for
              core ETA models while updating nearline contextual features
              (traffic conditions, weather) every 5 minutes. This balances
              stability (full retrain prevents drift accumulation) with
              responsiveness (nearline features capture real time conditions).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Comparison
            </p>
            <p style="margin-top: 0">
              The pattern is periodic full retrain (daily to weekly) plus
              frequent small updates (minutes to hours) for fast moving signals.
              Cost wise, hybrid is the most expensive but delivers the best
              accuracy for high value use cases like fraud detection or dynamic
              pricing.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Full Batch Retrain</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Last 21 days → Train from scratch
                    <br />
                    Cost: High compute | Cadence: Daily
                    <br />
                    Netflix homepage, Airbnb pricing
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Incremental Update</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    New data → Warm start from checkpoint
                    <br />
                    Cost: Low compute | Cadence: 15–60 min
                    <br />
                    Meta embeddings, calibrators
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Hybrid Strategy</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Daily full + 5 min nearline features
                    <br />
                    Cost: Highest | Accuracy: Best
                    <br />
                    Uber ETA, fraud detection
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
                  Full batch retrain on 7 to 28 day sliding windows is safest
                  and most reproducible but costs high compute and cannot react
                  faster than training completes (hours to days for large models
                  like Netflix homepage personalization)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental updates reduce cost by 10x and enable 15 to 60
                  minute cadences (Meta embedding updates) but risk catastrophic
                  forgetting, bias drift toward recent data, and harder offline
                  validation without clean baselines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid strategies balance stability and responsiveness: Uber
                  runs daily full retrains for core ETA models while updating
                  nearline traffic and weather features every 5 minutes, costing
                  3x more but improving accuracy by 5 to 8 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warm start initialization from previous checkpoint speeds
                  convergence by 30 to 50 percent for full retrains and
                  preserves learned patterns, but requires careful learning rate
                  tuning to avoid getting stuck in local minima
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental updates work best for stateless components
                  (embeddings, calibrators) or when paired with weekly full
                  retrains to prevent drift accumulation and catastrophic
                  forgetting over time
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
                  Meta updates ad ranking embeddings incrementally every 15
                  minutes to capture trending topics, but runs full retrains
                  daily to reset and prevent bias accumulation, maintaining AUC
                  ROC within 0.5 percent of batch trained models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix runs nightly full retrains for recommendation models
                  processing hundreds of millions of interactions, using warm
                  start from previous day to reduce training time from 8 hours
                  to 5 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContinuousTrainingRetrainingStrategiesBatchVsIncrementalVsHybrid;
