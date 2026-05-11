import type { Component } from "solid-js";

const LessonModelCheckpointingCheckpointFailureModesAndAtomicCommitGuarantees: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Checkpoint Failure Modes and Atomic Commit Guarantees
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Partial Checkpoint Writes
            </p>
            <p style="margin-top: 0">
              Checkpointing at scale introduces numerous failure modes that can
              corrupt training state or cause silent data loss. The most common
              is partial checkpoint writes: a job gets preempted or a node
              crashes mid checkpoint, leaving some shards written and others
              missing. Without careful design, the next recovery attempt might
              load an inconsistent mix of old and new state, causing immediate
              divergence or subtle accuracy degradation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Atomic Commit Protocol
            </p>
            <p style="margin-top: 0">
              The standard atomic commit pattern writes all shards to a
              temporary staging location, then writes a manifest file listing
              every shard with its checksum. Only after verifying that all
              shards exist and checksums match does the system "commit" by
              updating a small "latest" pointer. Recovery logic always reads the
              latest pointer first, then loads only checkpoints with a valid
              manifest. This two phase commit ensures that a failure at any
              point during persist leaves the previous checkpoint intact.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Distributed Snapshot Consistency
            </p>
            <p style="margin-top: 0">
              Inconsistent distributed snapshots are another subtle failure
              mode. If ranks do not quiesce at a global barrier before
              snapshotting, some may capture state before an all reduce
              completes while others capture post all reduce values. On restore,
              gradients will be inconsistent across ranks, causing training to
              diverge within a few steps. RNG seeds must also be captured to
              avoid data shuffling divergence.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dataloader State
            </p>
            <p style="margin-top: 0">
              Dataloader and input pipeline state is frequently overlooked.
              Without saving the exact iterator position or sample index,
              resuming training will either re consume already seen data or skip
              data entirely, shifting metrics by several percentage points.
              Production systems save per rank sample offsets and shuffle RNG
              state as part of the checkpoint.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Step 1: Write shards to temp dir
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    checkpoint_step1000_tmp4f8a/shard_0..255.pt
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Step 2: Compute checksums &amp; verify
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    SHA256 per shard, confirm all 256 shards present
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Step 3: Write manifest.json last
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    &#123;shards: [...], step: 1000, checksums: [...]&#125;
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Step 4: Atomic commit</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Rename temp dir → checkpoint_step1000, update latest symlink
                  </div>
                </div>
                <div style="border: 2px solid; padding: 8px; border-radius: 6px; margin-top: 6px; text-align: center">
                  <strong style="font-size: 12px">
                    Failure before manifest: incomplete dir ignored on recovery
                  </strong>
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
                  Atomic commit protocol: write all shards to temp location with
                  checksums, write manifest.json last, commit by renaming
                  directory and updating latest pointer; incomplete checkpoints
                  without manifest are ignored
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inconsistent snapshots from missing global barrier cause
                  gradient divergence and NaNs within steps; mitigation requires
                  all ranks snapshot at same global step after optimizer.step
                  completes, including RNG state
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dataloader state loss causes data re consumption or skipping,
                  shifting metrics by several percent; save per rank sample
                  offsets, shard boundaries, and shuffle seed to enable exact
                  resume
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Async persistence contention: overlapping checkpoint writes
                  can exhaust host RAM (two 600 GB snapshot buffers) or saturate
                  100 Gbps network, slowing training; serialize checkpoints or
                  throttle bandwidth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checksum validation on restore detects silent corruption from
                  bitflips or storage bugs; Meta FSDP and NVIDIA NeMo compute
                  SHA256 per shard and verify before loading any state
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
                  Google TPU training: checkpoint write interrupted at shard 412
                  of 512; no manifest written, recovery skips incomplete dir and
                  loads previous valid checkpoint from 30 minutes prior
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta OPT training divergence: ranks did not barrier before
                  snapshot, some captured pre allreduce gradients; after resume,
                  loss spiked to 15.2 from 2.4 within 50 steps, caught by
                  automated loss anomaly detector
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OpenAI training on spot instances: dataloader did not save
                  iterator state, after preemption resume re saw first 5% of
                  dataset, causing 0.3 point perplexity regression discovered in
                  post training analysis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCheckpointingCheckpointFailureModesAndAtomicCommitGuarantees;
