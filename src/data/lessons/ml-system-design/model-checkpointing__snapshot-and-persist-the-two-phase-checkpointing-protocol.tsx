import type { Component } from "solid-js";

const LessonModelCheckpointingSnapshotAndPersistTheTwoPhaseCheckpointingProtocol: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Snapshot and Persist: The Two Phase Checkpointing Protocol
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Phase Design
            </p>
            <p style="margin-top: 0">
              Production checkpointing systems split the operation into two
              distinct phases to minimize GPU idle time: snapshot and persist.
              The snapshot phase happens synchronously and briefly stalls
              training (typically 10 to 30 seconds) to create a consistent in
              memory copy of all training state at a global barrier. The persist
              phase then streams this snapshot to durable storage asynchronously
              while GPUs resume training. This separation is critical because
              writing 18 TB to remote storage at realistic throughput takes 180
              seconds, but you only pay 20 seconds of actual stall time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Snapshot Consistency
            </p>
            <p style="margin-top: 0">
              The snapshot must be atomic and consistent across all distributed
              ranks. Every GPU enters a barrier after completing its optimizer
              step and all reduce operations, ensuring everyone captures state
              at exactly the same global step counter. During snapshot, each
              rank serializes its partition of parameters and optimizer state
              into a pinned memory buffer, computes checksums for integrity, and
              records metadata like tensor shapes and partition boundaries.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Persist Phase
            </p>
            <p style="margin-top: 0">
              Persist happens in the background while training continues. Each
              rank launches async I/O threads that write its snapshot shard to a
              distributed filesystem or object storage under a unique checkpoint
              directory. The key to atomicity is writing a manifest file last.
              This manifest lists all shards with their checksums, sizes, global
              step, and schema version. Only after every shard is durably
              written does the system update a lightweight "latest" pointer to
              reference the new checkpoint.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Storage Backend Choice
            </p>
            <p style="margin-top: 0">
              Parallel filesystems like Lustre or GPFS offer high bandwidth
              (tens to hundreds of GB/s aggregate) but capacity is limited and
              expensive. Object storage provides unlimited capacity at lower
              cost but has per request overhead. Production systems optimize
              object storage writes using multipart uploads with large parts and
              writing many shards in parallel.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Phase 1: Snapshot (sync, 15s stall)
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    All ranks barrier → serialize state to RAM → compute
                    checksums
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Training Resumes</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    GPUs continue next batch while persist runs in background
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ (async)
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Phase 2: Persist (async, 180s)
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Write shards to storage → verify all complete → write
                    manifest last
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Atomic Commit: Update "latest" pointer
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
                  Snapshot phase stalls training for 10 to 30 seconds to create
                  consistent in memory copy at global barrier; persist phase
                  writes to storage asynchronously over 2 to 5 minutes while
                  training continues
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Atomic commits require writing manifest file last after all
                  shards verify; incomplete checkpoints without manifests are
                  ignored on recovery, preventing corruption from partial writes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each rank in a 64 GPU cluster writes its 11 GB shard in
                  parallel; aggregate throughput of 100 GB/s allows 720 GB
                  checkpoint to persist in under 10 seconds per rank, 180
                  seconds wall time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Object storage optimizations: multipart uploads with 100 MB to
                  1 GB parts, parallel writes from all nodes, and batching small
                  tensors into larger blobs to reduce metadata overhead and
                  request latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Background persist can cause resource contention: async writes
                  may exhaust host RAM (snapshot buffers) or saturate network,
                  requiring throttling or serialization of concurrent checkpoint
                  operations
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
                  NVIDIA Megatron checkpointing: 8 way tensor parallel, 16 way
                  pipeline parallel across 128 GPUs; each writes 140 GB shard to
                  Lustre in 90 seconds at 1.5 GB/s per node, snapshot barrier
                  adds 20s stall
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta PyTorch FSDP: 256 A100 GPUs checkpoint 175B model (1.4 TB
                  total) by writing 5.6 GB per rank to S3 using 500 MB multipart
                  uploads, achieving 80 GB/s aggregate (320 MB/s per node)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google JAX on TPU v4: checkpoint every 15 minutes to GCS;
                  snapshot takes 12s, persist 3 minutes; manifest includes shard
                  checksums and is written only after all 512 hosts confirm
                  upload success
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelCheckpointingSnapshotAndPersistTheTwoPhaseCheckpointingProtocol;
