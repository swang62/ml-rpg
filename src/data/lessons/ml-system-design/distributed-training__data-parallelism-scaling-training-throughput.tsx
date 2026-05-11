import type { Component } from "solid-js";

const LessonDistributedTrainingDataParallelismScalingTrainingThroughput: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Data Parallelism: Scaling Training Throughput
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Data Parallelism Works
            </p>
            <p style="margin-top: 0">
              Data Parallelism (DP) is the simplest and most widely used
              distributed training strategy. Each GPU holds a complete replica
              of the model and processes a different subset of the training
              batch. After computing gradients locally, all replicas synchronize
              via an all reduce operation that averages gradients across
              devices, ensuring every replica updates with identical weight
              changes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Communication Cost Analysis
            </p>
            <p style="margin-top: 0">
              The communication cost scales with model size and device count.
              For a 1 billion parameter model in FP16 (2 bytes per parameter),
              each training step must all reduce approximately 2 GB of
              gradients. With a ring all reduce algorithm across 8 GPUs, each
              device transfers roughly 2 times (N minus 1) divided by N times S
              bytes, which equals approximately 3.5 GB. On 200 Gbps links (25
              GB/s bandwidth), this takes a minimum of 140 milliseconds just for
              gradient exchange. Upgrading to 400 Gbps fabrics halves this to 70
              milliseconds, but as models grow to 10B or 100B parameters,
              communication becomes the bottleneck.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FSDP and ZeRO Extensions
            </p>
            <p style="margin-top: 0">
              Data parallelism shines when models fit comfortably in single
              device memory and network bandwidth can handle gradient
              aggregation. PyTorch Fully Sharded Data Parallel (FSDP) and
              DeepSpeed ZeRO extend basic DP by sharding optimizer states,
              gradients, and even parameters across devices, reducing per device
              memory from 16 bytes per parameter to as low as 2 bytes per
              parameter when fully sharded across N devices. This enables 10B+
              parameter models on 40 to 80 GB GPUs without switching to model or
              pipeline parallelism.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Straggler Amplification Failure Mode
            </p>
            <p style="margin-top: 0">
              The key failure mode is straggler amplification. Synchronous all
              reduce waits for the slowest replica, so a single GPU thermal
              throttling or experiencing PCIe errors gates the entire training
              step. As you scale from 8 to 64 to 512 GPUs, the probability of
              encountering a straggler in any given step increases, causing
              utilization to drop. Hierarchical all reduce (first within nodes
              over fast NVLink, then across nodes over InfiniBand) and gradient
              compression can mitigate this, but careful system monitoring is
              essential.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 16px">
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; min-width: 100px">
                    <strong style="font-size: 12px">GPU 0</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Model Copy
                      <br />
                      Batch A
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; min-width: 100px">
                    <strong style="font-size: 12px">GPU 1</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Model Copy
                      <br />
                      Batch B
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; min-width: 100px">
                    <strong style="font-size: 12px">GPU 7</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Model Copy
                      <br />
                      Batch H
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Compute Gradients ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>All Reduce Gradients</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    1B params = 2GB gradients
                    <br />8 GPUs × 3.5GB transfer each
                    <br />
                    200 Gbps link: ~140ms
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Apply Updates ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Synchronized Weights</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    All replicas identical after step
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
                  Communication cost example: 1B parameter model requires all
                  reduce of 2 GB gradients; with ring algorithm across 8 GPUs on
                  200 Gbps links, minimum 140 milliseconds per step for gradient
                  sync alone
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scaling efficiency degrades as communication time approaches
                  compute time: typically acceptable when gradient sync takes
                  less than 20 to 30 percent of step time, problematic beyond
                  that
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ZeRO optimization shards optimizer states, gradients, and
                  parameters across devices reducing per device memory from 16
                  bytes per parameter to approximately 2 bytes per parameter
                  when fully sharded
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hierarchical all reduce exploits topology: first aggregate
                  within nodes over NVLink (600 GB/s), then across nodes over
                  InfiniBand (200 Gbps), reducing cross node traffic and latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Straggler amplification: synchronous updates wait for slowest
                  GPU; thermal throttling or PCIe errors on one device can
                  reduce overall throughput by 10 to 20 percent in large
                  clusters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Global batch size scales linearly with replicas: 8 GPUs with
                  local batch 32 yields global batch 256; requires learning rate
                  scaling and warmup to maintain convergence quality
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
                  PyTorch Distributed Data Parallel (DDP): Standard
                  implementation using NCCL all reduce; Meta reports near linear
                  scaling up to 64 GPUs for ResNet 50 and BERT base with fast
                  interconnects
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  DeepSpeed ZeRO Stage 2: Shards optimizer states and gradients
                  across devices; enables training 10B parameter models on 16x
                  32GB V100s without model parallelism
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NVIDIA NCCL optimized all reduce: Achieves 280 GB/s effective
                  bandwidth across 8 A100 GPUs on NVSwitch, enabling sub 10ms
                  gradient sync for 1B parameter models
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDistributedTrainingDataParallelismScalingTrainingThroughput;
