import type { Component } from "solid-js";

const LessonNlpScalabilityDataParallelismForTrainingGradientSyncAndScaling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Data Parallelism for Training: Gradient Sync and Scaling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scaling Training with Data Parallelism
            </p>
            <p style="margin-top: 0">
              Training a large model on billions of examples takes weeks on a
              single GPU. Data parallelism speeds this up by running multiple
              copies of the model on different GPUs, each processing different
              batches of data. With 8 GPUs, you process 8 batches
              simultaneously, reducing training time by roughly 8x.
            </p>
            <p>
              The workflow: each GPU has a complete copy of the model. A large
              batch is split into mini-batches, one per GPU. Each GPU computes
              forward pass, loss, and gradients on its mini-batch. Gradients are
              synchronized across GPUs (typically averaged), and all GPUs update
              their model weights identically. Because all GPUs start with
              identical weights and apply identical updates, they stay
              synchronized.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Gradient Synchronization
            </p>
            <p style="margin-top: 0">
              The synchronization step is the bottleneck. After each mini-batch,
              gradients must be communicated between all GPUs. For a 7B
              parameter model, that is 14GB of gradient data (float16)
              transferred every step. With 8 GPUs on 25Gbps ethernet,
              synchronization takes ~4.5 seconds per step - likely longer than
              the computation itself.
            </p>
            <p>
              All-reduce algorithms optimize this communication. Instead of each
              GPU sending its full gradients to a central coordinator, GPUs
              exchange partial sums in a tree or ring pattern. This reduces
              total data transfer and spreads load across the network. Libraries
              like NCCL implement efficient all-reduce for NVIDIA GPUs.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Data parallelism scales training
              throughput nearly linearly with GPUs, but only if network
              bandwidth supports gradient synchronization. Slow interconnects
              make adding GPUs counterproductive.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Practical Considerations
            </p>
            <p style="margin-top: 0">
              Effective batch size scales with GPU count. 8 GPUs with batch size
              32 each means effective batch 256. Very large batches can hurt
              model quality - learning rate adjustments and warmup schedules
              become critical. Monitor training loss curves carefully when
              scaling; sudden divergence often indicates batch size issues.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>1. Dispatcher (batching window 10ms)</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Requests arrive → Length bucket (512/1024/2048/4096) → Wait
                    10ms → Pack batch max 64 sequences
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>2. Prefill Phase (large batch)</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Compute KV for full prompt in one pass
                    <br />
                    8k tokens × 64 sequences = 512k tokens
                    <br />
                    Prefill time: 1.5 seconds
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>3. Decode Phase (continuous batching)</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Generate 1 token/sequence, reuse KV cache
                    <br />
                    Seq A done at t=50ms → Seq E joins immediately
                    <br />
                    Throughput: 1200 tokens/sec aggregate
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>4. Paged KV Cache (memory manager)</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Allocate 16KB pages, 2.5 MB per token
                    <br />
                    512 seq × 4k tokens = 1 TB total KV
                    <br />
                    Evict completed sequences, defragment
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
                  Data parallelism runs model copies on different GPUs
                  processing different data batches - 8 GPUs gives roughly 8x
                  speedup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradient sync is the bottleneck: 14GB gradient transfer for 7B
                  model on 25Gbps ethernet takes ~4.5 seconds per step
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  All-reduce algorithms (ring, tree) exchange partial sums
                  between GPUs rather than centralizing, reducing network load
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Effective batch size scales with GPU count - very large
                  batches can hurt quality without learning rate adjustments
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
                  Describe the data parallel workflow: split batch across GPUs,
                  compute gradients locally, synchronize gradients, update
                  weights identically.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calculate the sync bottleneck: model size in bytes divided by
                  network bandwidth equals sync time. This dominates at scale.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warn about large batch effects: 8 GPUs at batch 32 = effective
                  batch 256. Learning rate schedules must adapt.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNlpScalabilityDataParallelismForTrainingGradientSyncAndScaling;
