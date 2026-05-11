import type { Component } from "solid-js";

const LessonFederatedLearningCommunicationEfficiencyAndCompression: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Communication Efficiency and Compression
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Communication Bottleneck
            </p>
            <p style="margin-top: 0">
              Communication, not computation, is the bottleneck in federated
              learning. A modern neural network has millions of parameters.
              Sending 10 million 32-bit floats requires 40MB per client per
              round. With 10,000 clients participating in each round, the server
              receives 400GB of updates. Over mobile networks with 1-5 Mbps
              upload speeds, transmitting 40MB takes 60-320 seconds per client.
              This makes naive federated learning impractical for any model
              larger than a few megabytes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Gradient Compression Techniques
            </p>
            <p style="margin-top: 0">
              <strong>Quantization:</strong> Instead of sending 32-bit floats,
              quantize to 8-bit or even 1-bit values. 1-bit SGD sends only the
              sign of each gradient component, reducing communication by 32x
              with surprisingly small accuracy loss (typically 1-3%).{" "}
              <strong>Sparsification:</strong> Send only the largest gradient
              values and set rest to zero. Top-k sparsification keeps only the k
              largest gradients, often achieving 99% sparsity (100x compression)
              while maintaining convergence. <strong>Error feedback:</strong>{" "}
              Accumulate the gradients you did not send and add them to the next
              round. This prevents permanently losing small updates and is
              essential for sparsification to work.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Local Computation Trade-off
            </p>
            <p style="margin-top: 0">
              Another approach: do more computation locally before
              communicating. Instead of 1 local epoch per round, run 10 local
              epochs. This reduces communication rounds by 10x but introduces
              client drift. After many local updates, each client model diverges
              from others, making aggregation less effective. The optimal
              balance depends on network conditions and data heterogeneity.
              Typical production systems use 5-20 local epochs, with more
              heterogeneous data requiring fewer local steps.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Compression and local
              computation reduce communication but hurt convergence. 1-bit
              quantization saves 32x bandwidth but may require 2-3x more rounds
              to reach the same accuracy. The total communication might be
              similar, but wall-clock time improves due to parallelism.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Full Model Update</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    32 bit float: 2 MB payload
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Apply Quantization
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">8 Bit Quantized</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    4x compression: 500 KB payload
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Apply Sparsification
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Top 10% Coordinates</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10x compression: 50 KB payload
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓ Total Reduction
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">40x Compression</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    2 MB → 50 KB per client
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
                  Communication is the bottleneck: 10M parameters at 32-bit
                  equals 40MB per client per round
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantization reduces precision (32-bit to 8-bit or 1-bit)
                  achieving 32x compression with 1-3% accuracy loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sparsification sends only top-k gradients, achieving 99%
                  sparsity (100x compression)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Error feedback accumulates unsent gradients for future rounds,
                  preventing permanent information loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  More local epochs reduce rounds but cause client drift; 5-20
                  local epochs is typical production range
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
                  Quantify the communication problem: 40MB per client times
                  10,000 clients equals 400GB per round
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain that compression may not reduce total communication
                  but improves wall-clock time through parallelism
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFederatedLearningCommunicationEfficiencyAndCompression;
