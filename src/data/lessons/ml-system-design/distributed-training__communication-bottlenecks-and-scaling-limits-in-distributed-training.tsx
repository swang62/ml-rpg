import type { Component } from "solid-js";

const LessonDistributedTrainingCommunicationBottlenecksAndScalingLimitsInDistributedTraining: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Communication Bottlenecks and Scaling Limits in Distributed Training
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Bottleneck
            </p>
            <p style="margin-top: 0">
              As distributed training scales from tens to thousands of GPUs,
              communication becomes the primary bottleneck. The fundamental
              issue is that compute capability has grown faster than network
              bandwidth. An A100 GPU delivers 312 TFLOP/s in FP16, but even a
              400 Gbps (50 GB/s) network link is three orders of magnitude
              slower per byte than on chip bandwidth. For a 10 billion parameter
              model, data parallel gradient all reduce must move 20 GB of data
              (2 bytes per param in FP16). At 50 GB/s effective bandwidth, that
              is a minimum 400 milliseconds, comparable to or exceeding the
              forward and backward compute time.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Communication to Computation Ratio
            </p>
            <p style="margin-top: 0">
              The communication to computation ratio determines scaling
              efficiency. As you add more replicas in data parallel mode,
              compute stays constant per replica but communication grows (more
              devices means larger collectives and longer all reduce latency).
              For ring all reduce, latency scales as 2 times (N minus 1) divided
              by N times S divided by bandwidth, asymptotically approaching 2S
              divided by bandwidth for large N. Hierarchical schemes (tree
              reduce, recursive halving doubling) have better latency scaling
              but require careful tuning. NVIDIA NCCL achieves close to
              theoretical bandwidth on NVLink but drops significantly on
              InfiniBand without topology aware tuning.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency vs Bandwidth
            </p>
            <p style="margin-top: 0">
              Bandwidth is only part of the problem. Latency matters for small
              messages and frequent collectives. Tensor parallelism's two
              collectives per layer with activation tensors of 100 to 500 MB hit
              the latency bound at small tensor parallel degrees. Even at 600
              GB/s NVSwitch bandwidth, a 200 MB all reduce takes approximately 1
              to 2 milliseconds including kernel launch overhead. For a 96 layer
              model, that is 192 to 384 milliseconds of pure communication per
              step. Overlapping communication with computation via pipelining
              and double buffering can hide some latency, but perfect overlap is
              rare in practice.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Straggler Variance at Scale
            </p>
            <p style="margin-top: 0">
              Straggler variance amplifies as cluster size grows. At 512 GPUs,
              the probability that at least one device experiences a transient
              slowdown (thermal throttling, OS jitter, background process) in
              any given step approaches certainty. Synchronous training waits
              for the slowest device, so 99th percentile step time, not median,
              determines throughput. Asynchronous training (parameter server
              architectures) avoids the synchronization barrier but introduces
              gradient staleness that can hurt convergence. Hybrid approaches
              like local SGD (synchronize every K steps instead of every step)
              reduce communication frequency at the cost of slight quality
              degradation and hyperparameter sensitivity.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Communication Bottleneck Example</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    10B param model, FP16, Data Parallel
                  </div>
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Compute</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      A100: 312 TFLOP/s
                      <br />
                      Forward+Backward
                      <br />
                      ~300 to 400ms
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Communication</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      20 GB gradients
                      <br />
                      InfiniBand 200 Gbps
                      <br />
                      ~400ms all reduce
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Scaling Breakdown at 512 GPUs
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px; line-height: 1.5">
                    Compute per GPU: 350ms (constant)
                    <br />
                    Gradient all reduce: 400ms base + latency
                    <br />
                    Straggler p99 overhead: +50ms (12%)
                    <br />
                    <strong>Total step time: ~800ms</strong>
                    <br />
                    Efficiency: 350/800 = 43.75%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong>⚠ Solutions</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Upgrade to 400 Gbps links (halve comm time)
                    <br />
                    Add ZeRO sharding (reduce gradient size)
                    <br />
                    Use tensor/pipeline parallel (fewer DP replicas)
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
                  Compute vs bandwidth gap: A100 delivers 312 TFLOP/s but 400
                  Gbps network is 50 GB/s; for 10B param model (20 GB
                  gradients), all reduce takes minimum 400 milliseconds, often
                  exceeding compute time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Communication scaling: Ring all reduce latency approaches 2S
                  divided by bandwidth for large N; with 512 GPUs and 200 Gbps
                  links, gradient sync dominates step time and efficiency drops
                  below 50 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency impact: Tensor parallelism's two collectives per layer
                  with 200 MB activations take 1 to 2 milliseconds each on
                  NVSwitch; 96 layers = 192 to 384 milliseconds pure
                  communication per step
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Straggler amplification: At 512 GPUs, probability of one
                  device slowing down per step approaches 100 percent;
                  synchronous training waits for p99, not median, reducing
                  throughput by 10 to 20 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NVIDIA NCCL optimization: Achieves 280 GB/s on 8 A100 NVSwitch
                  (93 percent of theoretical 300 GB/s) but requires topology
                  awareness and falls to 30 to 40 GB/s on poorly tuned
                  InfiniBand clusters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade off: Asynchronous training (parameter server) avoids
                  sync barriers but gradient staleness degrades convergence;
                  local SGD synchronizes every K steps reducing frequency but
                  hurts quality and adds hyperparameter sensitivity
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
                  Meta OPT 175B: Reported that communication overhead limited
                  scaling efficiency to approximately 50 percent on 992 A100s,
                  motivating use of 3D parallelism to reduce data parallel
                  degree
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NVIDIA SuperPOD: 560 A100 cluster with 8x 200 Gbps HDR
                  InfiniBand per node achieves 1.6 Tbps bisection bandwidth per
                  node, enabling near linear scaling for models up to 1 trillion
                  parameters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google TPU v4 Pods: Custom 3D torus interconnect with 10x
                  higher bisection bandwidth than InfiniBand enables efficient
                  all reduce at 4,096 chip scale
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDistributedTrainingCommunicationBottlenecksAndScalingLimitsInDistributedTraining;
