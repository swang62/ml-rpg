import type { Component } from "solid-js";

const LessonModelCheckpointingCheckpointFrequencyBalancingCostOverheadAndReliability: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Checkpoint Frequency: Balancing Cost, Overhead, and Reliability
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Trade-off
            </p>
            <p style="margin-top: 0">
              Choosing checkpoint frequency is a classic trade off between lost
              work on failure and the overhead of checkpointing itself. Frequent
              checkpoints (every 10 to 30 minutes) minimize RPO, meaning you
              lose at most 30 minutes of GPU compute if something crashes. But
              each checkpoint imposes a cost: the snapshot stall (10 to 30
              seconds of idle GPUs), bandwidth consumption, storage I/O load,
              and the accumulated storage footprint.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Optimal Interval Formula
            </p>
            <p style="margin-top: 0">
              A practical formula from checkpointing theory gives the optimal
              interval as approximately sqrt(2 times Cs times M), where Cs is
              checkpoint write time and M is Mean Time Between Failures (MTBF).
              For example, if a checkpoint takes 120 seconds to write and your
              cluster MTBF is 6 hours, the formula suggests an interval around
              38 minutes. This balances the expected recompute cost against
              checkpointing overhead.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Real World Adjustments
            </p>
            <p style="margin-top: 0">
              On preemptible cloud instances (spot VMs or TPU preemptible
              nodes), MTBF can be measured in hours rather than days, pushing
              teams toward 15 to 30 minute checkpoint intervals despite higher
              overhead. Google's TPU training on preemptible pods checkpoints
              every 15 minutes because preemptions occur multiple times per day.
              Conversely, on stable on premises clusters with MTBF measured in
              days, checkpointing once per hour is common for smaller models.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Retention Policies
            </p>
            <p style="margin-top: 0">
              Keeping the last K checkpoints (typically K equals 3 to 5)
              provides rollback options if training becomes unstable.
              Additionally, teams keep a "best" checkpoint selected by
              validation metric for deployment. For an 18 TB checkpoint with K
              equals 5, you need 90 TB of storage, making tiered storage
              strategies essential.
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
                  Optimal checkpoint interval formula: sqrt(2 × write time ×
                  MTBF); for 120s write and 6 hour MTBF, checkpoint every 38
                  minutes to minimize combined cost of overhead and lost work
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Preemptible infrastructure (spot instances, TPU preemptible)
                  with daily interruptions requires 15 to 30 minute intervals
                  despite higher overhead; stable clusters with multi day MTBF
                  can checkpoint hourly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage retention: keep last 3 to 5 checkpoints for rollback
                  plus one best checkpoint by validation metric; 18 TB per
                  checkpoint × 5 versions = 90 TB storage, costing $2k to
                  $20k/month depending on tier
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpoint overhead includes snapshot stall (10 to 30s per
                  checkpoint), bandwidth (100 GB/s sustained writes), and the
                  risk of overlapping async writes exhausting memory or I/O
                  capacity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For unstable experimental runs, increase frequency temporarily
                  (every 10 to 15 minutes) to enable fast bisection of
                  regressions, then prune extra checkpoints once training
                  stabilizes
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
                  OpenAI GPT-3 scale training: 30 minute checkpoint interval on
                  1024 A100 GPUs with 18 TB checkpoints; keeps last 5 plus best,
                  totaling 108 TB in S3 at ~$2500/month storage cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta 175B OPT model: 60 minute checkpoints on stable cluster
                  (3 day MTBF), 1.4 TB per checkpoint written in 90 seconds;
                  retention of last 4 plus best = 7 TB total on parallel
                  filesystem
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google preemptible TPU pod training: 15 minute intervals,
                  checkpoint takes 180 seconds to write to GCS; experiences 2 to
                  4 preemptions per day, RPO bounded to 15 min loses ~1% of
                  daily compute to recompute
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCheckpointingCheckpointFrequencyBalancingCostOverheadAndReliability;
