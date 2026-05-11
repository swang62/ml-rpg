import type { Component } from "solid-js";

const LessonAutoscalingGpuSharingCostControlOnDemandVsSpotScaleToZeroAndFractionalAllocation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cost Control: On Demand vs Spot, Scale to Zero, and Fractional
            Allocation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Cost Scale
            </p>
            <p style="margin-top: 0">
              GPU compute cost dominates ML infrastructure budgets. A single
              NVIDIA A100 on demand instance costs approximately $3 to $4 per
              hour on major cloud providers, adding up to $2,200 to $3,000 per
              month for always on capacity. At scale with dozens or hundreds of
              GPUs, monthly bills reach hundreds of thousands of dollars.
              Effective cost optimization requires combining multiple strategies
              that trade off reliability, availability, and operational
              complexity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              On Demand vs Spot
            </p>
            <p style="margin-top: 0">
              On demand instances provide guaranteed availability and stable
              pricing, suitable for latency critical inference serving
              production traffic with strict SLOs. Spot or preemptible instances
              offer 60% to 80% discounts (reducing A100 cost from $3/hour to
              $0.60 to $1.20/hour) but can be interrupted with 30 to 120 seconds
              notice. This makes spot ideal for batch training, fine tuning
              jobs, and opportunistic inference overflow traffic that tolerates
              interruptions through checkpointing and retry logic.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scale to Zero
            </p>
            <p style="margin-top: 0">
              Eliminates idle costs by shutting down GPU node groups when no
              workloads are running. A development cluster with sporadic usage
              can reduce monthly costs from $15,000 (always on) to $2,000
              (actual usage hours) through aggressive scale to zero policies.
              The trade off is cold start latency: the first request after scale
              to zero waits 240+ seconds for node provisioning and model
              loading. Production systems use hybrid approaches: scale to zero
              for batch and development workloads, maintain small warm pools
              (one to two replicas) for latency critical inference.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Combined Strategy Example
            </p>
            <p style="margin-top: 0">
              A production system might use on demand full GPUs for critical
              inference (30% of capacity), spot fractional GPUs for batch jobs
              (50% of capacity), and scale to zero for development (20% of
              capacity), reducing total costs by 40% to 60% compared to naive
              always on on demand allocation. Fractional GPU allocation through
              MIG allows seven small models to share one A100 at $3/hour instead
              of seven separate V100s at $17.50/hour.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  On demand A100 costs $3 to $4 per hour ($2,200 to $3,000
                  monthly always on) versus spot at $0.60 to $1.20 per hour with
                  60% to 80% discount but 30 to 120 second interruption notice
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale to zero reduces idle costs by 80% to 90% for sporadic
                  workloads (development cluster drops from $15,000 to $2,000
                  monthly) but adds 240+ second cold start latency on first
                  request
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fractional MIG allocation allows seven small models on one
                  A100 at $3/hour instead of seven V100s at $17.50/hour total,
                  saving 83% through improved bin packing and utilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spot instances require checkpointing every 5 to 10 minutes for
                  training jobs and health aware draining for inference to
                  handle interruptions without losing progress or failing
                  requests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid capacity strategy allocates 30% on demand full GPUs for
                  Service Level Objective (SLO) critical inference, 50% spot
                  fractional GPUs for batch tolerant workloads, and 20% scale to
                  zero for development, reducing total cost by 40% to 60%
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
                  Production deployment: standard GPU pool uses on demand V100s
                  (max 5 nodes) for reliable inference with p95 latency SLO of
                  200ms; large GPU pool uses spot A100s (max 3 nodes) for batch
                  fine tuning jobs with checkpointing every 8 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Development environment scales to zero outside business hours
                  (6pm to 8am plus weekends), reducing monthly GPU costs from
                  $12,000 to $3,500 for team of 15 engineers doing sporadic
                  experimentation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost analysis: replacing always on dedicated GPU inference
                  ($8,000/month for 3 on demand V100s) with scale to zero plus
                  warm pool of 1 replica and spot overflow ($2,800/month) saved
                  65% while maintaining p99 latency under 250ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutoscalingGpuSharingCostControlOnDemandVsSpotScaleToZeroAndFractionalAllocation;
