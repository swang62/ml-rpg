import type { Component } from "solid-js";

const LessonModelCheckpointingCheckpointStorageStrategyRetentionTieringAndCostOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Checkpoint Storage Strategy: Retention, Tiering, and Cost
            Optimization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Storage Scale Problem
            </p>
            <p style="margin-top: 0">
              Managing checkpoint storage at scale requires a deliberate
              retention and tiering strategy. A naive approach that keeps every
              checkpoint indefinitely quickly becomes prohibitively expensive: a
              single 18 TB checkpoint written every 30 minutes over a 7 day
              training run generates 336 checkpoints totaling over 6 petabytes.
              Even on cheap object storage, that is $140,000 in storage costs
              for one run.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Last K Retention Policy
            </p>
            <p style="margin-top: 0">
              Production systems use retention policies that keep only the last
              K checkpoints (typically 3 to 5) plus a designated "best"
              checkpoint selected by validation metric. K equals 3 to 5 covers
              the last few hours of training (with 30 minute checkpoints, 5x
              checkpoint window is 2.5 hours), enough to recover from transient
              issues without losing too much progress. The "best" checkpoint is
              retained indefinitely and updated whenever validation metrics
              improve.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Storage Tiering
            </p>
            <p style="margin-top: 0">
              Storage tiering further reduces costs by moving older checkpoints
              to cheaper, slower storage classes. High frequency checkpoints are
              written to premium storage for fast RTO under 10 minutes. After 24
              to 48 hours, checkpoints outside the last K window are demoted to
              mid tier storage. After a week, they move to cold storage or are
              deleted entirely.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cross Region Replication
            </p>
            <p style="margin-top: 0">
              Cross region replication of the latest and best checkpoints
              provides disaster recovery. Replicating every checkpoint is
              expensive due to egress bandwidth costs, so teams replicate only
              critical checkpoints asynchronously. Some teams optimize by
              replicating only model weights (a few hundred GB) rather than full
              state (which includes multi TB optimizer buffers), accepting that
              cross region recovery will require restarting optimizer state but
              preserving model progress.
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
                  Retention policy: keep last 3 to 5 checkpoints plus one best
                  by validation metric; for 18 TB checkpoints, this caps storage
                  at 90 TB vs 6 PB if keeping all checkpoints over a week long
                  run
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage tiering: recent checkpoints (last 48 hours) on premium
                  fast storage for RTO under 10 minutes; older checkpoints
                  demoted to infrequent access tier (30% cheaper, RTO 30 to 60
                  minutes) or cold archive after one week
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross region replication cost: $0.02 to $0.09 per GB egress;
                  replicating 600 GB checkpoint every 30 minutes costs $400 to
                  $1800 per day; optimize by replicating only daily best or
                  weights only snapshots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best checkpoint selection: continuously updated based on
                  validation perplexity, F1, or accuracy; serves as deployment
                  artifact and safeguard if training diverges in later stages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Garbage collection: async cleanup deletes checkpoints outside
                  retention window; must be fault tolerant (never delete latest
                  or best) and coordinated across distributed writers to avoid
                  races
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
                  OpenAI GPT training: keeps last 5 checkpoints (90 TB for 18 TB
                  each) on S3 Standard, best checkpoint replicated to second
                  region; garbage collection runs hourly, storage cost
                  ~$2000/month for active run
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta OPT 175B: 1.4 TB checkpoints, last 4 plus best on Lustre
                  parallel filesystem (7 TB total); after training completes,
                  best checkpoint moved to S3 and Lustre snapshots deleted,
                  reclaiming $15k/month capacity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google T5 on TPU: checkpoints every 15 minutes to GCS Standard
                  for 48 hours, then auto tiered to Nearline after 2 days; best
                  checkpoint kept in Standard class, others archived to Coldline
                  after 7 days, reducing cost by 60%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCheckpointingCheckpointStorageStrategyRetentionTieringAndCostOptimization;
