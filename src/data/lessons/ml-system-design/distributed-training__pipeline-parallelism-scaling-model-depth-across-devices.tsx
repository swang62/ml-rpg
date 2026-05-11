import type { Component } from "solid-js";

const LessonDistributedTrainingPipelineParallelismScalingModelDepthAcrossDevices: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Pipeline Parallelism: Scaling Model Depth Across Devices
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Pipeline Parallelism Works
            </p>
            <p style="margin-top: 0">
              Pipeline Parallelism (PP) partitions a model vertically by layers
              into stages, each assigned to a device or group of devices.
              Training data flows through these stages like an assembly line. To
              avoid idle time (called pipeline bubbles), the mini batch is split
              into multiple micro batches that are processed concurrently, so
              while stage 1 works on micro batch 3, stage 2 processes micro
              batch 2, and stage 3 handles micro batch 1.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Bubble Time Analysis
            </p>
            <p style="margin-top: 0">
              The critical metric is bubble time, the fraction of time devices
              sit idle waiting for work. The bubble fraction is approximately (p
              minus 1) divided by (m plus p minus 1), where p is the number of
              pipeline stages and m is the number of micro batches. With 8
              stages and only 8 micro batches, the bubble is 7 divided by 15,
              roughly 47 percent waste. Increasing to 64 micro batches drops the
              bubble to 7 divided by 71, about 10 percent. Google GPipe
              demonstrated 11 times speedup on 16 accelerators by aggressively
              micro batching, though at the cost of higher memory for storing
              micro batch activations.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stage Balance Criticality
            </p>
            <p style="margin-top: 0">
              Stage balance is equally critical. If one stage takes twice as
              long as others, it becomes the bottleneck and other stages idle
              waiting for it. For transformers, attention layers and feedforward
              layers have different compute profiles, and embedding layers can
              be memory bound. Production systems carefully profile each layer
              and adjust boundaries, sometimes splitting heavy layers across
              multiple devices in a hybrid pipeline plus tensor parallel
              configuration.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Pipeline Parallelism Excels
            </p>
            <p style="margin-top: 0">
              Pipeline parallelism excels when model depth is large, stage
              boundaries are easy to balance, and cross node bandwidth is
              limited. Meta used pipeline parallelism across nodes for OPT 175B,
              exploiting the fact that pipeline stages communicate less
              frequently than tensor parallel layers (only activation and
              gradient tensors at stage boundaries, not every layer). The trade
              off is the complexity of managing micro batch scheduling, gradient
              accumulation across micro batches, and activation memory for all
              in flight micro batches.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 8px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 11px">
                    <strong>Stage 0</strong>
                    <br />
                    GPU 0<br />
                    Layers 0 to 23
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 11px">
                    <strong>Stage 1</strong>
                    <br />
                    GPU 1<br />
                    Layers 24 to 47
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 11px">
                    <strong>Stage 2</strong>
                    <br />
                    GPU 2<br />
                    Layers 48 to 71
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 11px">
                    <strong>Stage 3</strong>
                    <br />
                    GPU 3<br />
                    Layers 72 to 95
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Micro Batch Schedule (m=64, p=4)</strong>
                  <div style="font-size: 11px; margin-top: 8px; line-height: 1.6">
                    Time 0: Stage 0 processes μBatch 0<br />
                    Time 1: Stage 0→μB1, Stage 1→μB0
                    <br />
                    Time 2: Stage 0→μB2, Stage 1→μB1, Stage 2→μB0
                    <br />
                    Time 3: All stages active (no bubble)
                    <br />
                    ...
                    <br />
                    Bubble = (p−1)/(m+p−1) = 3/67 ≈ 4.5%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>⚠ Stage Imbalance Risk</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    If Stage 1 takes 2× longer → bottleneck
                    <br />
                    Solution: Rebalance boundaries or hybrid TP+PP
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
                  Bubble fraction formula: approximately (p minus 1) divided by
                  (m plus p minus 1); with 8 stages and 64 micro batches, bubble
                  is 7 divided by 71, about 10 percent idle time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Micro batch trade off: More micro batches reduce bubble but
                  increase memory for storing activations of all in flight micro
                  batches; Google GPipe used aggressive micro batching for 11
                  times speedup on 16 devices
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stage balance is critical: A single slow stage gates
                  throughput; transformers require careful profiling because
                  attention and feedforward layers have different compute
                  characteristics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Communication pattern: Pipeline stages exchange activations
                  and gradients only at boundaries, not per layer, making it
                  suitable for slower cross node links (InfiniBand 200 Gbps)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta OPT 175B used pipeline parallelism across nodes (slower
                  links) combined with tensor parallelism within nodes (fast
                  NVLink) and data parallelism for replicas
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradient accumulation: Gradients from all micro batches are
                  accumulated before weight update; must ensure correct
                  averaging and synchronization across pipeline stages
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
                  Google GPipe: Achieved 3.5 times speedup on 4 accelerators and
                  11 times on 16 for deep networks by splitting into pipeline
                  stages and using micro batch sizes of 8 to 16
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Microsoft DeepSpeed Pipeline: Implements 1F1B (one forward one
                  backward) schedule to reduce memory by interleaving forward
                  and backward passes instead of batching all forwards first
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta OPT 175B: 992 A100 GPUs with 8 way tensor parallel within
                  nodes, 16 way pipeline parallel across nodes, and 8 way data
                  parallel for replicas (8 × 16 × 8 = 1024 logical topology)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDistributedTrainingPipelineParallelismScalingModelDepthAcrossDevices;
