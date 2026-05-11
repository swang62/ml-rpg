import type { Component } from "solid-js";

const LessonDistributedTraining3dParallelismAndTopologyAwareMappingInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            3D Parallelism and Topology Aware Mapping in Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When You Need 3D Parallelism
            </p>
            <p style="margin-top: 0">
              3D parallelism combines Data Parallelism (DP), Tensor Parallelism
              (TP), and Pipeline Parallelism (PP) when a single parallelism
              strategy cannot fit the model or achieve target throughput. You
              need 3D when individual layers exceed single GPU memory (requiring
              TP), the full model depth is too large (requiring PP), and you
              still need multiple replicas for throughput (requiring DP). The
              design challenge is deciding how to allocate your total GPU count
              across these three dimensions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Topology Aware Mapping Principle
            </p>
            <p style="margin-top: 0">
              The core principle is topology aware mapping: match communication
              frequency to interconnect bandwidth. Tensor parallel groups
              perform two collectives per layer (high frequency), so confine
              them to the fastest links like NVSwitch at 600 GB/s within a node.
              Pipeline stages exchange activations once per micro batch (medium
              frequency), so they can span slower InfiniBand links at 200 Gbps
              across nodes. Data parallel replicas all reduce gradients once per
              mini batch (lowest frequency), so they tolerate even higher
              latency across the cluster.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Configuration Example
            </p>
            <p style="margin-top: 0">
              For a 175 billion parameter model on 512 GPUs, you might choose
              TP=8, PP=8, DP=8. The reasoning: TP=8 fits within an 8 GPU node
              connected by NVSwitch, keeping high frequency collectives fast.
              PP=8 splits the model into 8 stages because the full depth exceeds
              what TP alone can handle memory wise. DP=8 uses the remaining
              dimension to maintain reasonable throughput, giving an effective
              batch size 8 times larger than a single replica. Adding ZeRO
              sharding across the DP dimension reduces per device memory from 16
              bytes per parameter to 2 to 4 bytes, enabling this configuration
              on 80 GB GPUs.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Complexity vs Capability Trade-off
            </p>
            <p style="margin-top: 0">
              The trade offs are complexity versus capability. 3D parallelism
              requires careful stage balancing for PP, managing micro batch
              scheduling, and handling checkpoint sharding across all three
              dimensions. Communication overhead increases as you add more
              dimensions, reducing efficiency from the theoretical peak.
              However, without 3D, models beyond 50 to 100 billion parameters
              become infeasible on current hardware. Meta trained OPT 175B using
              this approach on 992 A100 GPUs, achieving 140 TFLOP/s per GPU (47
              percent of peak), demonstrating that carefully tuned 3D
              parallelism makes large scale training practical despite the
              complexity.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 620px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>3D Parallelism: TP × PP × DP = Total GPUs</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Example: 8 × 8 × 8 = 512 A100 GPUs
                  </div>
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">
                      Tensor Parallel (TP=8)
                    </strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Within node
                      <br />
                      NVSwitch 600 GB/s
                      <br />2 collectives/layer
                      <br />
                      High freq communication
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">
                      Pipeline Parallel (PP=8)
                    </strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Across nodes
                      <br />
                      InfiniBand 200 Gbps
                      <br />
                      Activation transfers
                      <br />
                      Medium freq
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">
                      Data Parallel (DP=8)
                    </strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      Across cluster
                      <br />
                      InfiniBand 200 Gbps
                      <br />
                      Gradient all reduce
                      <br />
                      Low freq (per step)
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">+ ZeRO Sharding Layer</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Shard optimizer states across DP dimension
                    <br />
                    Reduces 16 bytes/param → 2 to 4 bytes/param
                    <br />
                    Enables 100B+ models on 80GB GPUs
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Topology Rule</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Fast links (NVSwitch) ← High freq (TP)
                    <br />
                    Slow links (InfiniBand) ← Low freq (PP, DP)
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
                  When to use 3D: Individual layers too large for single GPU
                  (need TP), full model depth too deep (need PP), still need
                  throughput (need DP); without all three, 100B+ parameter
                  models infeasible
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Topology mapping principle: Match communication frequency to
                  bandwidth; TP (2 collectives/layer) on fast NVSwitch 600 GB/s,
                  PP (per micro batch) on InfiniBand 200 Gbps, DP (per mini
                  batch) cluster wide
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Degree selection example: TP limited by fast interconnect
                  topology (typically 4 to 8 GPUs per node), PP by model depth
                  and stage balance, DP uses remaining GPUs for throughput
                  scaling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory optimization: ZeRO shards optimizer states and
                  gradients across DP dimension reducing 16 bytes per parameter
                  to 2 to 4 bytes; enables 175B models on 80 GB GPUs with TP=8,
                  PP=8, DP=8 on 512 devices
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade off: 3D adds complexity (stage balancing, micro batch
                  scheduling, checkpoint sharding) and communication overhead
                  reducing efficiency to 40 to 50 percent of peak, but makes
                  100B+ models trainable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production validation: Meta OPT 175B trained on 992 A100 GPUs
                  with 3D parallelism achieved 140 TFLOP/s per GPU (47 percent
                  of 312 TFLOP/s peak), demonstrating practical feasibility at
                  scale
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
                  Deciding TP degree: If you have 8 GPU nodes with NVSwitch, set
                  TP=8 to keep collectives within node; crossing to slower links
                  drops efficiency from 90 percent to 30 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deciding PP degree: A 96 layer transformer might use PP=8 (12
                  layers per stage) to fit memory after applying TP=8; must
                  verify stages are balanced within 10 to 20 percent compute
                  time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deciding DP degree: With 512 total GPUs, TP=8, PP=8, the
                  remaining dimension is DP=8; this gives effective batch size
                  8x larger than single replica for throughput
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDistributedTraining3dParallelismAndTopologyAwareMappingInProduction;
