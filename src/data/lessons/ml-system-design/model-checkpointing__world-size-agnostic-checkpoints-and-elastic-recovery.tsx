import type { Component } from "solid-js";

const LessonModelCheckpointingWorldSizeAgnosticCheckpointsAndElasticRecovery: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            World Size Agnostic Checkpoints and Elastic Recovery
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Brittleness Problem
            </p>
            <p style="margin-top: 0">
              Traditional checkpoints embed the number of GPUs (world size) and
              parallelism strategy directly into the checkpoint format by saving
              tensors with rank specific filenames or shapes. This creates a
              brittle coupling: if you trained on 256 GPUs with 8 way tensor
              parallelism and need to resume on 128 GPUs with 4 way parallelism,
              you face a costly reshape and repartition of the entire checkpoint
              offline.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              World Size Agnostic Design
            </p>
            <p style="margin-top: 0">
              World size agnostic checkpoints solve this by storing logical
              parameter names and partition metadata instead of rank indexed
              state, enabling elastic recovery where you can resume training on
              a different number of GPUs without rewriting checkpoints. Each
              parameter tensor is saved with a global logical name and metadata
              describing how it was partitioned.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Resharding on Restore
            </p>
            <p style="margin-top: 0">
              On restore, a resharding algorithm reads these logical tensors and
              repartitions them according to the new world size and parallelism
              configuration. For example, a weight matrix tensor parallel split
              8 ways on 256 GPUs is stored as 8 logical shards. On resume with 4
              way tensor parallelism on 128 GPUs, the loader merges pairs of
              shards into 4 chunks.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Examples
            </p>
            <p style="margin-top: 0">
              Meta's FSDP and NVIDIA's Megatron both implement this pattern.
              FSDP checkpoints include a parameter flattening map that records
              original tensor shapes and shard boundaries independent of rank
              count. The restore path can reshape checkpoints across different
              parallelism configs. Elastic recovery is not free, adding 5 to 10
              minutes to RTO for large models, and optimizer state resharding
              requires careful mapping to ensure numerical consistency.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 13px; margin-bottom: 6px">
                  Checkpoint Saved (256 GPUs, 8-way TP)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    transformer.layer0.attn.query.weight
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Logical shape: [12288, 12288]
                  </div>
                  <div style="font-size: 11px">
                    Stored as 8 shards: [12288, 1536] each
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="text-align: center; font-weight: bold; font-size: 13px; margin-bottom: 6px">
                  Elastic Restore (128 GPUs, 4-way TP)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Resharding Algorithm</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Merge 8 shards → Repartition into 4 chunks: [12288, 3072]
                  </div>
                  <div style="font-size: 11px">
                    Redistribute across 128 ranks with new TP config
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Training Resumes</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    RTO +8 minutes for reshard, gradients match within 0.05%
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
                  Logical parameter naming decouples checkpoint format from
                  world size: each tensor stored with global name (e.g.,
                  transformer.layer.attention.weight) and partition metadata,
                  not rank IDs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Resharding on restore: trained on 256 GPUs with 8 way tensor
                  parallel, resume on 128 GPUs with 4 way by merging and
                  redistributing shards; adds 5 to 10 minutes to Recovery Time
                  Objective (RTO) for TB scale checkpoints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimizer state resharding is complex: Adam momentum and
                  variance must align with new parameter partitions to avoid
                  divergence; validation step checks gradient norms match within
                  0.1% after elastic restore
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta FSDP and NVIDIA Megatron/NeMo both support elastic
                  checkpoints; Google JAX uses explicit partition specs in
                  checkpoint metadata to enable restore on different device mesh
                  topologies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade off: world size agnostic checkpoints add restore
                  complexity and time but enable cost optimization (scale down
                  during idle) and fault tolerance (recover on partial cluster
                  after hardware loss)
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
                  NVIDIA Megatron 530B model: checkpointed with 8 way tensor
                  parallel, 16 way pipeline parallel on 1024 GPUs; restored to 4
                  way tensor, 8 way pipeline on 512 GPUs after cluster resize,
                  adding 12 minutes to RTO
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta OPT 175B: FSDP checkpoint saved on 256 A100s, restored to
                  128 A100s for cost reduction during weekend; resharding took 8
                  minutes, training loss curve matched reference within 0.08%
                  after resume
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google T5 XXL on TPU v4: checkpoint from 512 TPU cores with 2D
                  mesh [16, 32], restored to 256 cores with mesh [8, 32];
                  partition spec remapping completed in 6 minutes with automatic
                  shard redistribution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCheckpointingWorldSizeAgnosticCheckpointsAndElasticRecovery;
