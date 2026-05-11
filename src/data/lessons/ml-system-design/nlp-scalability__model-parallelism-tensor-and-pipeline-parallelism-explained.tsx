import type { Component } from "solid-js";

const LessonNlpScalabilityModelParallelismTensorAndPipelineParallelismExplained: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model Parallelism: Tensor and Pipeline Parallelism Explained
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When One GPU Is Not Enough
            </p>
            <p style="margin-top: 0">
              Large models do not fit on a single GPU. A 70B parameter model in
              float16 requires 140GB of memory. The largest consumer GPUs have
              24GB; even datacenter A100s max out at 80GB. To run these models,
              you must split them across multiple GPUs. This is model
              parallelism: distributing different parts of the same model across
              devices.
            </p>
            <p>
              There are two main approaches. Tensor parallelism splits
              individual layers across GPUs. Each GPU holds a portion of every
              layer's weights and computes part of every operation. Pipeline
              parallelism splits the model by layers: GPU 1 has layers 1-20, GPU
              2 has layers 21-40, etc. Data flows through GPUs sequentially,
              like an assembly line.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tensor Parallelism
            </p>
            <p style="margin-top: 0">
              Tensor parallelism divides matrix operations across GPUs. A matrix
              multiply with a 4096x4096 weight matrix on 4 GPUs becomes four
              1024x4096 operations. Each GPU computes its portion, then results
              are gathered and combined. This requires high bandwidth
              interconnect between GPUs (NVLink at 600GB/s, not PCIe at 64GB/s)
              because every layer needs communication.
            </p>
            <p>
              The benefit is low latency: all GPUs work simultaneously on each
              token. The cost is communication overhead, which grows with the
              number of GPUs. Tensor parallelism typically scales efficiently up
              to 8 GPUs; beyond that, communication dominates.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Tensor parallelism reduces
              latency (GPUs work in parallel) but requires expensive NVLink
              interconnect. Pipeline parallelism works with slower interconnects
              but adds latency equal to the number of pipeline stages.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pipeline Parallelism
            </p>
            <p style="margin-top: 0">
              Pipeline parallelism assigns different layers to different GPUs.
              Token processing flows through the pipeline: GPU 1 computes layers
              1-20, sends activations to GPU 2, which computes layers 21-40, and
              so on. The advantage is lower communication overhead - only
              activations transfer between GPUs, not gradients for every
              operation. The disadvantage is latency: a 4-stage pipeline adds 4x
              the single-stage latency for a single request.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 14px">
                  Standard Data Parallelism vs FSDP
                </strong>
              </div>
              <div style="display: flex; gap: 12px; margin-bottom: 12px">
                <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Standard DP (4 workers)
                  </strong>
                  <div style="margin-top: 6px; font-size: 11px; line-height: 1.5">
                    Worker 1: 140GB params + 140GB grad + 140GB opt = 420GB
                    <br />
                    Worker 2: 420GB
                    <br />
                    Worker 3: 420GB
                    <br />
                    Worker 4: 420GB
                    <br />
                    <strong>Total: 1680GB</strong>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">FSDP (4 workers)</strong>
                  <div style="margin-top: 6px; font-size: 11px; line-height: 1.5">
                    Worker 1: 35GB shard
                    <br />
                    Worker 2: 35GB shard
                    <br />
                    Worker 3: 35GB shard
                    <br />
                    Worker 4: 35GB shard
                    <br />
                    <strong>Total: 140GB</strong>
                    <br />
                    <span style="font-weight: bold">80% memory saved</span>
                  </div>
                </div>
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                <strong style="font-size: 12px">FSDP Forward Pass</strong>
                <div style="margin-top: 6px; font-size: 11px">
                  1. All gather params from shards → 2. Compute local batch → 3.
                  Discard gathered params → 4. Keep local activations
                </div>
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 8px">
                <strong style="font-size: 12px">FSDP Backward Pass</strong>
                <div style="margin-top: 6px; font-size: 11px">
                  1. Compute local gradients → 2. Reduce scatter gradients to
                  shards → 3. Update local param shard only
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
                  70B parameter model needs 140GB memory in float16 - far
                  exceeds single GPU capacity (24GB consumer, 80GB A100)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tensor parallelism splits layers across GPUs for parallel
                  computation but requires high-bandwidth NVLink (600GB/s)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipeline parallelism assigns layer groups to GPUs sequentially
                  - works with slower interconnects but adds latency per stage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tensor parallelism scales efficiently to 8 GPUs; beyond that
                  communication overhead dominates
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
                  Start with the memory math: 70B params at 2 bytes each =
                  140GB. No single GPU fits that. Model parallelism is required.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Contrast tensor vs pipeline: tensor needs NVLink for every
                  layer's communication, pipeline only transfers activations
                  between stages.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the latency implication: pipeline with N stages adds N
                  times the single-stage latency per request.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNlpScalabilityModelParallelismTensorAndPipelineParallelismExplained;
