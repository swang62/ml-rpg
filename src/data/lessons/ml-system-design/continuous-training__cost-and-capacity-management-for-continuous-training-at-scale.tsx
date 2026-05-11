import type { Component } from "solid-js";

const LessonContinuousTrainingCostAndCapacityManagementForContinuousTrainingAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cost and Capacity Management for Continuous Training at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Resource Management Challenges
            </p>
            <p style="margin-top: 0">
              Continuous training at scale demands careful resource management.
              Uber runs thousands of models with retraining cadences from hours
              to days, creating coordinated load spikes that can starve training
              clusters. The solution is admission control and staggering:
              prioritize models by business criticality (fraud and safety
              first), enforce per model compute budgets, and spread scheduled
              retrains across time windows. Netflix staggers nightly retrain
              jobs across 2 to 4 hour windows, targeting 70 to 80 percent
              average utilization.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Optimization
            </p>
            <p style="margin-top: 0">
              Cost optimization strategies balance freshness against expense.
              Full retrains on large datasets are expensive: a typical
              recommender model training on 200 million interactions for 6 hours
              costs thousands of dollars in compute. The sweet spot is hybrid
              with caching: run daily full retrains using spot instances (50 to
              70 percent cost reduction), cache materialized features in object
              storage to avoid recomputation, and use incremental updates only
              for fast moving signals.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Planning
            </p>
            <p style="margin-top: 0">
              Capacity planning requires forecasting retrain load. Model count
              grows linearly with product features and market segmentation. Set
              auto trigger frequency caps (maximum 1 retrain per day per model)
              to prevent drift induced storms. During incidents, freeze non
              critical retrains and reserve capacity for firefighting. Monitor
              queue depth and job latency: if p95 job start delay exceeds 30
              minutes, scale clusters or throttle submissions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Justification
            </p>
            <p style="margin-top: 0">
              The key metric is cost per incremental accuracy point: if a 1
              percent AUC gain costs $10,000 per month in extra compute,
              validate that business lift justifies the expense.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>High Priority</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Fraud, safety, revenue critical
                    <br />
                    Immediate scheduling, reserved capacity
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Medium Priority</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Core ranking, recommendations
                    <br />
                    Scheduled windows, preemptible instances
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Low Priority</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Experimental features, research
                    <br />
                    Spot instances, queue when busy
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-top: 8px; text-align: center">
                  <strong>Target: 70–80% Avg Utilization</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Reserve 20–30% for priority spikes
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
                  Stagger scheduled retrains across 2 to 4 hour windows to
                  smooth cluster utilization, targeting 70 to 80 percent average
                  with 20 to 30 percent headroom for priority spikes (Netflix
                  approach across thousands of nightly jobs)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Preemptible or spot instances reduce training cost by 50 to 70
                  percent for fault tolerant batch jobs, with automatic retry on
                  preemption and checkpointing every 30 minutes to avoid losing
                  progress
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature caching cuts costs by 40 percent: Meta caches
                  materialized embeddings and aggregates in object storage,
                  reusing across multiple model training runs instead of
                  recomputing from raw events
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enforce per model compute budgets (GPU hours per month) and
                  auto trigger frequency caps (maximum 1 retrain per day per
                  model) to prevent drift storms and runaway costs when
                  monitoring thresholds are misconfigured
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost per incremental accuracy point is the key business
                  metric: if 1 percent AUC gain costs $10,000 per month in extra
                  compute, validate that business lift (revenue, engagement)
                  justifies expense before increasing cadence
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
                  Uber prioritizes fraud and safety model retrains with reserved
                  capacity and immediate scheduling, while experimental
                  recommendation features use spot instances queued during peak
                  load, saving 60 percent on training costs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb runs separate Smart Pricing models per market and
                  property type (thousands of models total), capping each to
                  daily retrains and using shared feature pipelines to amortize
                  aggregation cost across models
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContinuousTrainingCostAndCapacityManagementForContinuousTrainingAtScale;
