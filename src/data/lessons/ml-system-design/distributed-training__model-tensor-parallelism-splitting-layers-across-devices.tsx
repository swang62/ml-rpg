import type { Component } from "solid-js";

const LessonDistributedTrainingModelTensorParallelismSplittingLayersAcrossDevices: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model (Tensor) Parallelism: Splitting Layers Across Devices
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Tensor Parallelism Does
            </p>
            <p style="margin-top: 0">
              Model Parallelism, also called Tensor Parallelism (TP), partitions
              individual layers across multiple devices. Instead of replicating
              the entire model, each GPU holds a slice of weight matrices and
              computes a portion of the matrix multiplications. For example, in
              a transformer attention layer with a 12,288 dimension hidden size,
              8 GPUs in a tensor parallel group each hold a 12,288 by 1,536
              slice of the query projection matrix, computing their slice of the
              output in parallel.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Communication Pattern Challenges
            </p>
            <p style="margin-top: 0">
              The key challenge is the communication pattern. Each transformer
              layer requires two collective operations: one all gather or all
              reduce after the forward matrix multiply to combine partial
              results, and another during backpropagation to gather gradients.
              For a sequence length of 2,048 tokens with hidden size 12,288 and
              batch size 8, the activation tensor is approximately 8 times 2,048
              times 12,288 times 2 bytes equals 402 MB per layer per collective.
              A 96 layer model performs 192 collectives per training step,
              moving tens of gigabytes. This is why tensor parallelism demands
              extremely high bandwidth, low latency interconnects like NVLink
              (600 GB/s between GPUs) or NVSwitch fabrics.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Implementation
            </p>
            <p style="margin-top: 0">
              NVIDIA Megatron LM pioneered production tensor parallelism,
              demonstrating 76 percent scaling efficiency on 512 V100 GPUs by
              keeping tensor parallel groups within NVLink connected sets of 8
              GPUs. When tensor parallel communication crosses slower network
              links (InfiniBand at 200 Gbps or 25 GB/s), the per layer latency
              spikes collapse GPU utilization. The rule of thumb: confine tensor
              parallelism to the fastest hardware domain, typically 4 to 8 GPUs
              on the same node or blade.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Tensor Parallelism
            </p>
            <p style="margin-top: 0">
              Tensor parallelism shines when individual layers exceed device
              memory. A single feedforward layer in a large transformer can have
              weight matrices of 12,288 by 49,152 elements (approximately 1.2 GB
              in FP16), and the activations for long sequences or large batches
              blow past memory limits. Splitting across devices makes training
              feasible. The trade off is that you reduce the data parallel
              degree (fewer replicas means smaller effective batch size or more
              gradient accumulation steps) and add communication overhead that
              only pays off when memory constraints force your hand.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Input Activation</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Batch 8 × Seq 2048 × Hidden 12288
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 11px">
                    <strong>GPU 0</strong>
                    <br />
                    Weights
                    <br />
                    [12288×1536]
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 11px">
                    <strong>GPU 1</strong>
                    <br />
                    Weights
                    <br />
                    [12288×1536]
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 11px">
                    <strong>GPU 7</strong>
                    <br />
                    Weights
                    <br />
                    [12288×1536]
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Parallel MatMul ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>All Reduce Partial Results</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    402 MB activation per layer
                    <br />
                    Requires NVLink 600 GB/s
                    <br />2 collectives per layer (fwd + bwd)
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Combined Output</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Full activation ready for next layer
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
                  Two collectives per layer: one all reduce after forward matmul
                  to combine partial activations, another during backprop for
                  gradients; a 96 layer model performs 192 collectives per step
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Activation communication volume: For batch 8, sequence 2,048,
                  hidden 12,288 in FP16, each layer moves approximately 402 MB
                  per collective; requires high bandwidth interconnects
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Topology constraint: Tensor parallelism collapses when
                  crossing slow links; keep tensor parallel groups within NVLink
                  (600 GB/s) or NVSwitch domains, never across InfiniBand (25
                  GB/s)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory benefit: Splits large weight matrices across devices; a
                  12,288 by 49,152 feedforward layer (1.2 GB) divided across 8
                  GPUs is only 150 MB per device
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NVIDIA Megatron LM achieved 76 percent scaling efficiency on
                  512 V100s by confining tensor parallel groups to 8 GPU NVLink
                  islands and using data parallelism across islands
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade off: Reduces data parallel replicas and adds fine
                  grained communication; only worthwhile when layers exceed
                  single device memory or when very high bandwidth links are
                  available
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
                  Meta OPT 175B: Used tensor parallelism within nodes (8 A100
                  GPUs per node on NVSwitch), pipeline parallelism across nodes,
                  achieving feasible training on 992 GPUs total
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Megatron Turing NLG 530B: Tensor parallel degree of 8
                  within NVLink connected groups, combined with pipeline and
                  data parallelism across 4,480 A100 GPUs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Colossal AI: Open source framework demonstrating 2D (tensor
                  plus data) and 2.5D parallelism with careful CUDA kernel
                  fusion to overlap communication and computation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDistributedTrainingModelTensorParallelismSplittingLayersAcrossDevices;
