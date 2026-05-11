import type { Component } from "solid-js";

const LessonModelCheckpointingWhatIsModelCheckpointingAndWhyItMattersAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Is Model Checkpointing and Why It Matters at Scale
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
                <strong>Model checkpointing</strong> is the periodic capture of
                complete training state so you can resume a job with minimal
                lost progress. For large models, this means preserving model
                parameters, optimizer state, learning rate scheduler position,
                global step counters, random seeds, mixed precision scaler
                state, and data pipeline position.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Scale of the Problem
            </p>
            <p style="margin-top: 0">
              At production scale, the stakes are enormous. A 70 billion
              parameter model with Adam optimizer generates checkpoints around
              600 GB to 1.1 TB. A trillion parameter model checkpoint hits
              roughly 18 TB (2 bytes per parameter for weights in bfloat16, plus
              about 16 bytes per parameter for Adam's moment estimates in fp32).
              Training these models costs hundreds of thousands of dollars in
              GPU time, so losing even an hour of progress is financially
              significant.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Trade-off
            </p>
            <p style="margin-top: 0">
              The fundamental trade off is Recovery Point Objective (RPO) versus
              overhead. RPO is the maximum compute you are willing to lose,
              measured as the time since your last checkpoint. If you checkpoint
              every 30 minutes and fail, you lose at most 30 minutes of work.
              But checkpointing too frequently creates overhead: writing an 18
              TB checkpoint at 100 GB/s aggregate throughput takes 180 seconds,
              during which your expensive GPUs may be underutilized.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Recovery Time Objective
            </p>
            <p style="margin-top: 0">
              Recovery Time Objective (RTO) measures how quickly you can resume
              after failure: reading checkpoint shards from storage, restoring
              states across hundreds of GPUs, reinitializing communication
              collectives, and warming caches. Production systems aim for RTO
              under 10 minutes for models up to 100B parameters.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Training Step 100</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Loss: 2.45
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Checkpoint</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      18 TB saved
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Steps 101-130</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      30 min progress
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">GPU Failure</strong>
                    <div style="font-size: 11px; margin-top: 4px">Step 130</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Resume from Step 100</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    RPO: 30 min lost, RTO: 8 min to restore
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
                  Complete training state includes model parameters (2 TB for 1T
                  params in bf16), optimizer state (16 bytes per param for Adam,
                  totaling 16 TB), schedulers, RNG seeds, and data pipeline
                  position
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recovery Point Objective (RPO) of 30 minutes means losing at
                  most 30 minutes of compute on failure; Recovery Time Objective
                  (RTO) under 10 minutes enables fast resume on production
                  clusters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimal checkpoint frequency follows sqrt(MTBF × write time):
                  with 6 hour MTBF and 120 second writes, checkpoint every 30 to
                  40 minutes to balance overhead and lost work
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sharded checkpoints split an 18 TB checkpoint across hundreds
                  of GPUs, each writing a few GB; at 100 GB/s aggregate
                  throughput, persist in 180 seconds instead of hours on a
                  single writer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta's Fully Sharded Data Parallel (FSDP) and NVIDIA's
                  Megatron save world size agnostic checkpoints, allowing
                  restore on different GPU counts (e.g., trained on 256 GPUs,
                  resume on 128)
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
                  70B parameter model: 140 GB weights (bf16) + 560 GB optimizer
                  (Adam fp32) + 20 GB scheduler/misc = 720 GB total checkpoint,
                  written every 30 minutes on preemptible cloud GPUs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OpenAI GPT scale training: trillion parameter model produces
                  18 TB checkpoints saved to object storage in parallel from
                  1024 GPUs, each writing 18 GB shard in under 3 minutes at 100
                  MB/s per node
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google TPU pods checkpoint every 15 minutes to handle
                  preemption rates of multiple interruptions per day; atomic
                  manifest written last ensures partial writes are ignored on
                  recovery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCheckpointingWhatIsModelCheckpointingAndWhyItMattersAtScale;
