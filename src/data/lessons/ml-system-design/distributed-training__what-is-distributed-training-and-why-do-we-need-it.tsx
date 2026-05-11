import type { Component } from "solid-js";

const LessonDistributedTrainingWhatIsDistributedTrainingAndWhyDoWeNeedIt: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Distributed Training and Why Do We Need It?
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
                <strong>Distributed training</strong> splits deep learning
                workloads across multiple devices (GPUs or TPUs) because modern
                neural networks have grown beyond what a single device can
                handle. A single A100 GPU has 80 GB of memory, but training
                GPT-3 (175B parameters) requires roughly 700 GB just for model
                weights in half precision.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Memory Problem
            </p>
            <p style="margin-top: 0">
              The memory problem gets worse when you account for the full
              training state. With the Adam optimizer in mixed precision, you
              need roughly 16 bytes per parameter: 2 bytes for FP16 weights, 2
              bytes for gradients, 4 bytes for FP32 master weights, and 8 bytes
              for two FP32 momentum states. A 10 billion parameter model
              requires approximately 160 GB just for these states, exceeding
              single device capacity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Complementary Strategies
            </p>
            <p style="margin-top: 0">
              Distributed training solves this through three complementary
              strategies. Data Parallelism (DP) replicates the model on multiple
              devices, each processing different training examples, then
              synchronizes gradients. Model Parallelism (also called Tensor
              Parallelism or TP) splits individual layers across devices, with
              each device computing part of the matrix operations. Pipeline
              Parallelism (PP) partitions the model vertically by layers,
              flowing micro batches through stages like an assembly line.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              3D Parallelism in Production
            </p>
            <p style="margin-top: 0">
              Production systems combine all three strategies, a technique
              called 3D parallelism, to train models with hundreds of billions
              of parameters. The key insight is matching each parallelism
              strategy to the appropriate hardware topology: tensor parallelism
              within high bandwidth NVLink domains, pipeline parallelism across
              nodes, and data parallelism for throughput scaling.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; justify-content: space-around; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Data Parallel</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Full model × 8 GPUs
                    <br />
                    Different batches
                    <br />
                    Sync gradients
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Model Parallel</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Split layers × 8 GPUs
                    <br />
                    Same batch
                    <br />
                    Pass activations
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Pipeline Parallel</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Layer stages × 8 GPUs
                    <br />
                    Micro batches
                    <br />
                    Flow through pipeline
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
                  Memory bottleneck: A 10B parameter model needs approximately
                  160 GB for weights, gradients, and optimizer states (16 bytes
                  per parameter), exceeding single GPU capacity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data Parallelism replicates the entire model across devices;
                  each device processes different data and gradients are
                  synchronized via all reduce collective communication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model (Tensor) Parallelism splits individual layers across
                  devices; each computes a slice of matrix multiplications
                  requiring two collective operations per transformer layer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipeline Parallelism divides model by layers into stages;
                  micro batches flow through concurrently to hide bubble time,
                  with bubble fraction approximately (p minus 1) divided by (m
                  plus p minus 1)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems use 3D parallelism combining all three
                  strategies: Meta trained OPT 175B on 992 A100 GPUs using
                  tensor parallel within nodes, pipeline across nodes, and data
                  parallel replicas
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Topology awareness is critical: keep high frequency tensor
                  parallel communication within fast NVLink domains (400 to 600
                  GB/s), use slower InfiniBand (200 Gbps) for less frequent
                  pipeline stage transfers
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
                  NVIDIA Megatron LM trained 8.3B parameters on 512 V100 GPUs
                  achieving 15.1 PFLOP/s at 76% scaling efficiency using tensor
                  plus data parallelism
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Microsoft and NVIDIA trained MT NLG 530B on 4,480 A100 80GB
                  GPUs using 3D parallelism with tensor groups confined to
                  NVLink connected devices
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google PaLM 540B trained on 6,144 TPU v4 chips using 2D and 3D
                  device mesh sharding, mapping high bandwidth links to most
                  frequent collectives
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDistributedTrainingWhatIsDistributedTrainingAndWhyDoWeNeedIt;
