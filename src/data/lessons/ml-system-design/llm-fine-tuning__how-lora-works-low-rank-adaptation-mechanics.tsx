import type { Component } from "solid-js";

const LessonLlmFineTuningHowLoraWorksLowRankAdaptationMechanics: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How LoRA Works: Low Rank Adaptation Mechanics
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Insight:</strong> Low Rank Adaptation (LoRA) is
            based on a mathematical observation: when fine tuning a pre trained
            model, the optimal weight updates often lie in a low rank subspace.
            Instead of learning a full dense update matrix ΔW with dimensions m
            by n (which could be millions of parameters), LoRA decomposes this
            into two much smaller matrices.
            <strong>The Mathematical Trick:</strong> For each weight matrix W in
            the model (typically attention projections), LoRA introduces two new
            matrices A and B. Matrix A has dimensions m by r, and matrix B has
            dimensions r by n, where r is the rank and is much smaller than both
            m and n. The update becomes ΔW = A × B. Consider a concrete example:
            an attention weight matrix might be 4096 by 4096, containing roughly
            16.8 million parameters. With LoRA at rank r = 8, you instead learn
            matrix A of size 4096 by 8 and matrix B of size 8 by 4096. That's
            only 32,768 plus 32,768 equals 65,536 parameters, a reduction from
            16.8 million to 65 thousand, which is 256 times fewer parameters.
            <p></p>
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Frozen Base Weight W</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    4096 × 4096 = 16.8M params
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 16px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">A</strong>
                    <div style="font-size: 10px">4096 × 8</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">×</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">B</strong>
                    <div style="font-size: 10px">8 × 4096</div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    Output = W·x + A·(B·x)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Only 65K trainable params
                  </div>
                </div>
              </div>
            </div>
            <strong>Training Mechanics:</strong> During training, the forward
            pass computes W times x plus A times (B times x) for each adapted
            layer. The base weight W stays completely frozen, so gradients only
            flow through A and B. This means optimizer states (momentum,
            variance for Adam) are stored only for these small matrices. For a
            7B parameter model with LoRA adapters totaling 50M parameters,
            optimizer states might be 200 MB instead of 84 GB.
            <strong>Which Layers Get Adapted:</strong> Practitioners typically
            target specific linear projections in the Transformer architecture.
            Common choices include the query, key, value, and output projections
            in multi head attention. Some implementations extend to feed forward
            layers: the up projection, gate projection, and down projection.
            Databricks experiments found that targeting all linear layers with
            rank 8 yielded better results than using rank 16 on attention only,
            suggesting that layer coverage matters more than rank size up to a
            point.
            <p></p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Matrix A is often initialized to
              zero or very small values, and matrix B to random values, so that
              the initial product A times B starts near zero. This ensures the
              adapted model begins with the same behavior as the frozen base,
              then gradually learns task specific adjustments.
            </div>
            <strong>Deployment Options:</strong> At inference time, you have two
            choices. You can merge the adapters by computing W prime = W + A
            times B offline, saving a single merged checkpoint per task.
            Inference then uses this merged weight with no extra computation.
            Alternatively, you can keep adapters separate and apply them
            dynamically: compute W times x plus A times (B times x) at runtime.
            The separate approach adds a small overhead from extra matrix
            multiplies (typically 3 to 7% latency increase), but enables loading
            different adapters without duplicating the base model in GPU memory.
            <p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Frozen Base Weight W</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    4096 × 4096 = 16.8M params
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 16px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">A</strong>
                    <div style="font-size: 10px">4096 × 8</div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">×</div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">B</strong>
                    <div style="font-size: 10px">8 × 4096</div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    Output = W·x + A·(B·x)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Only 65K trainable params
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
                  LoRA decomposes weight updates ΔW into two low rank matrices A
                  and B, reducing a 4096 by 4096 update (16.8M params) to 65K
                  params at rank 8 (256x reduction)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common ranks range from 4 to 64; experiments show that
                  targeting more layers (all linear projections) with rank 8
                  often outperforms targeting fewer layers (attention only) with
                  rank 16
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  During training, base weights W remain frozen so optimizer
                  states shrink dramatically: 200 MB for adapters versus 84 GB
                  for full 7B model fine tuning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two deployment modes: merged adapters (W + A×B offline) give
                  lowest latency, separate adapters (dynamic application) enable
                  multi tenant serving with 3 to 7% latency overhead
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
                  A 7B model attention layer (4096 dim) with LoRA rank 8: trains
                  65K params per layer instead of 16.8M, reducing memory by
                  99.6%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Targeting 32 attention layers plus 32 feed forward layers in a
                  7B model with rank 8 yields roughly 50M trainable parameters
                  total (0.7% of base model)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inference with merged LoRA adapters: 50 to 150 ms p50 latency
                  on A100 for short responses, identical to base quantized model
                  performance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmFineTuningHowLoraWorksLowRankAdaptationMechanics;
