import type { Component } from "solid-js";

const LessonMlCostOptimizationWhatAreSpotInstancesAndWhyUseThemForMlWorkloads: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are Spot Instances and Why Use Them for ML Workloads?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Spot Instances:</strong> Cloud compute capacity sold at
              discounted prices (60-90% off on-demand) with the caveat that the
              provider can reclaim the instance with short notice (typically 2
              minutes). The discount reflects the interruptibility risk—you pay
              less because your workload might be terminated.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Spot Works for ML
            </p>
            <p>
              ML training is often fault-tolerant. If an instance is terminated
              mid-training, you can resume from a checkpoint rather than
              starting over. This makes ML an ideal spot workload: save
              checkpoints every 10-30 minutes, and a 2-minute warning gives time
              to save final state. The math is compelling: if spot is 70%
              cheaper and you lose 10% of compute time to interruptions, you are
              still paying 30% for 90% of the work—effectively 67% cheaper than
              on-demand. For large training jobs costing thousands of dollars,
              spot savings are substantial.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Workload Suitability
            </p>
            <p>
              <strong>Good for spot:</strong> Training jobs with checkpointing,
              batch inference without SLAs, hyperparameter search (losing one
              trial is acceptable), data preprocessing pipelines.{" "}
              <strong>Bad for spot:</strong> Real-time inference serving
              (interruption causes user-facing errors), jobs that cannot
              checkpoint (stateful processing without persistence), tight
              deadline jobs where interruption means missing the deadline. The
              key question: can your workload handle being killed and restarted
              with minimal wasted work?
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pricing Dynamics
            </p>
            <p>
              Spot prices fluctuate based on supply and demand. When cloud
              regions have excess capacity, spot is cheap and available. During
              demand spikes (quarter-end, major events), spot prices rise and
              availability drops. GPU instances are particularly volatile: a
              popular new model release can cause GPU spot prices to spike 5x
              within hours. Monitor spot price history before committing to
              spot-heavy architectures, and have fallback plans for high-demand
              periods.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Cost Reality:</strong> A 100-GPU training cluster at
              on-demand prices might cost 50,000 per week. The same cluster on
              spot (with proper fault tolerance) might cost 15,000-20,000 per
              week. The engineering investment in spot-readiness pays for itself
              quickly.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; justify-content: space-between">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 14px">On Demand</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      $3.00/hour
                    </div>
                    <div style="margin-top: 4px; font-size: 12px">
                      Always available
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 14px">Spot Instance</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      $0.90/hour
                    </div>
                    <div style="margin-top: 4px; font-size: 12px">
                      70% savings
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Interruption Rate by Strategy
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Lowest price only: ~20% interruptions
                  </div>
                  <div style="margin-top: 4px; font-size: 12px">
                    Price + capacity optimized: ~3% interruptions
                  </div>
                  <div style="margin-top: 4px; font-size: 12px">
                    Cost difference: +1%
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
                  Spot instances are 60-90% cheaper with 2-minute termination
                  warning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ML training is ideal: checkpoint every 10-30 minutes, resume
                  after interruption
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU spot prices are volatile: 5x spikes possible during demand
                  surges
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
                  70% cheaper spot with 10% interruption loss = 67% effective
                  savings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  100-GPU cluster: 50,000/week on-demand vs 15,000-20,000/week
                  on spot
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMlCostOptimizationWhatAreSpotInstancesAndWhyUseThemForMlWorkloads;
