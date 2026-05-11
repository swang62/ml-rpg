import type { Component } from "solid-js";

const LessonGpuResourceManagementPriorityPreemptionAndMultiTenantQosPolicies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Priority Preemption and Multi Tenant QoS Policies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Heterogeneous Workload Requirements
            </p>
            <p style="margin-top: 0">
              Production GPU clusters serve heterogeneous workloads with
              conflicting requirements: latency sensitive (LE) inference serving
              needs strict p95 and p99 SLOs, while best effort (BE) batch
              training prioritizes throughput and can tolerate interruptions.
              Priority preemption protects high priority workloads by evicting
              lower priority jobs when capacity is needed, but introduces
              operational complexity and wasted work.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Pool Separation
            </p>
            <p style="margin-top: 0">
              Effective policies separate capacity pools or implement strict
              preemption tiers. Organizations maintain dedicated serving pools
              with reserved capacity and allow training jobs to backfill unused
              serving capacity opportunistically. When serving load spikes, BE
              training is preempted immediately. The key is minimizing wasted
              progress: preempt only at mini batch or iteration boundaries after
              checkpoints are saved, typically every N steps or M seconds.
              Checkpointing a large language model can take 30 to 120 seconds.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Thrashing Prevention
            </p>
            <p style="margin-top: 0">
              Without safeguards, preemption causes thrashing: a job is killed,
              queued, restarted, then killed again before making meaningful
              progress. Systems implement promotion and aging: BE jobs that have
              been preempted multiple times or waited beyond a threshold are
              promoted to higher priority to ensure eventual completion. Gang
              scheduled distributed jobs are particularly vulnerable; preempting
              one worker in an 8 GPU job wastes the other 7 allocated GPUs until
              the entire gang is reassembled.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Balancing Protection and Efficiency
            </p>
            <p style="margin-top: 0">
              The tradeoff is serving SLO protection versus training throughput.
              Strict preemption guarantees that spikes in serving traffic never
              degrade latency, but aggressive policies can discard hours of
              training progress if checkpoints are infrequent. Systems achieve
              migration in under 4 seconds, allowing jobs to be moved to free
              capacity instead of killed. Operators tune preemption frequency
              caps (no more than X evictions per job per hour) and invest in
              fast checkpointing infrastructure.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px">
                    Latency Sensitive (LE) Tier
                  </div>
                  <div style="font-size: 12px">
                    <strong>Priority: 1 (Highest)</strong>
                    <br />
                    Inference serving, strict SLOs
                    <br />
                    Reserved capacity: 60%
                    <br />
                    Preempts: BE jobs immediately
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px">
                    Best Effort (BE) Tier
                  </div>
                  <div style="font-size: 12px">
                    <strong>Priority: 5 (Low)</strong>
                    <br />
                    Batch training, backfill serving pool
                    <br />
                    Checkpoints every 100 steps (~2 min)
                    <br />
                    Preempted at mini batch boundary
                    <br />
                    <span>Promotion after 3 preemptions or 1 hour wait</span>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center">
                  <strong>Serving spike arrives</strong> → LE reclaims capacity
                  → BE checkpointed and evicted → LE SLO protected
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
                  Priority preemption separates latency sensitive (LE) inference
                  serving with strict SLOs from best effort (BE) training; LE
                  reclaims capacity immediately when serving load spikes to
                  protect p95 and p99 targets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Preempt at mini batch or iteration boundaries after
                  checkpoints to minimize wasted work; large language model
                  checkpoints take 30 to 120 seconds, frequent saves reduce loss
                  but increase storage I/O overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Thrashing risk: jobs preempted repeatedly before making
                  progress waste queue time and compute; promotion and aging
                  policies (like AntMan) escalate BE priority after X
                  preemptions or Y wait time to ensure completion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gang scheduled distributed jobs amplify waste: preempting 1
                  worker in an 8 GPU job idles the other 7 GPUs until entire
                  gang is reassembled, multiplying the cost of eviction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operators tune preemption frequency caps (e.g., max 3
                  evictions per job per hour) and invest in fast checkpointing
                  or sub 4 second migration (Gandiva) to balance SLO protection
                  with training efficiency
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
                  OpenAI production policy: Separate capacity pools for serving
                  and training, strict preemption of BE training jobs when
                  serving traffic spikes, checkpoint every N steps to bound lost
                  work on eviction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  AntMan scheduler: BE jobs preempted more than 3 times or
                  waiting over 1 hour are promoted to higher priority tier,
                  preventing starvation and ensuring eventual completion despite
                  preemption pressure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta research cluster pattern: Backfilling short BE jobs in
                  gaps between LE workloads, preempt at mini batch boundaries to
                  reduce disruption, use fast checkpointing to minimize restart
                  overhead
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGpuResourceManagementPriorityPreemptionAndMultiTenantQosPolicies;
