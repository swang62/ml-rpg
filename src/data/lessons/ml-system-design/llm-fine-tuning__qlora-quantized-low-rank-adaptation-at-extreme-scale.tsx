import type { Component } from "solid-js";

const LessonLlmFineTuningQloraQuantizedLowRankAdaptationAtExtremeScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            QLoRA: Quantized Low Rank Adaptation at Extreme Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Pushing Efficiency Further:</strong> QLoRA combines LoRA
            with aggressive quantization to make fine tuning 65 billion
            parameter models possible on a single consumer grade GPU with 48 GB
            of memory. This is remarkable because standard 16 bit fine tuning of
            a 65B model would require 8 to 16 enterprise A100 GPUs with 80 GB
            each, costing thousands of dollars per training run.
            <strong>The Quantization Layer:</strong> QLoRA stores the frozen
            base model weights in 4 bit precision using a specialized
            quantization scheme called NormalFloat 4 (NF4). This format is
            optimized for weights that follow a normal distribution, which is
            common in neural networks. A 70B parameter model in 16 bit precision
            needs 140 GB of storage. Quantized to 4 bit, it needs only 35 GB, a
            4x reduction that makes it fit comfortably in a single 80 GB GPU
            alongside activations and the adapter parameters.<p></p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Memory Footprint Comparison
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    16 BIT BASE
                  </div>
                  <div style="font-size: 16px; font-weight: 800">140 GB</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    4 BIT QORA
                  </div>
                  <div style="font-size: 16px; font-weight: 800">35 GB</div>
                </div>
              </div>
            </div>
            Here's the clever part: during training, QLoRA dequantizes the 4 bit
            weights to a higher precision (typically 16 bit or bfloat16) on the
            fly for computation, adds the LoRA update from the 16 bit adapter
            matrices A and B, then proceeds with the forward pass. Crucially,
            gradients never flow into the frozen base weights, only into the
            adapters, so the quantized representation is never updated. This
            asymmetry lets you maintain training stability despite the base
            model being in very low precision.
            <strong>Memory Management Details:</strong> To keep peak memory
            under control during training, QLoRA implementations use paged
            optimizers that offload optimizer states to CPU memory when needed,
            similar to virtual memory paging in operating systems. They also use
            gradient checkpointing, which recomputes some activations during the
            backward pass instead of storing them, trading compute for memory.
            Combined, these techniques enable fitting 65B model fine tuning into
            48 GB of VRAM at modest batch sizes and sequence lengths (batch size
            1 to 4, sequence length 512 to 2048).
            <strong>Performance Reality:</strong> The quality trade-off is
            surprisingly small. QLoRA fine tuned models typically match or come
            within 1 to 3 percentage points of full 16 bit LoRA performance on
            standard benchmarks. For many practical tasks like instruction
            following, dialogue, or domain adaptation, this difference is
            imperceptible to end users. However, some tasks are more sensitive:
            code generation with strict correctness requirements or mathematical
            reasoning can show larger degradation if quantization introduces too
            much noise.
            <p></p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> QLoRA's 4 bit quantization can
              cause training instability in certain models or tasks. If you see
              loss spikes or divergence, consider switching to 8 bit
              quantization or standard 16 bit LoRA. The memory savings are
              smaller but training becomes more stable.
            </div>
            <strong>Cost Impact:</strong> The economic advantage is dramatic.
            Renting 8 A100 80 GB GPUs costs roughly $20 to $30 per hour on cloud
            platforms. A full fine tuning run might take 10 to 20 hours,
            totaling $200 to $600. QLoRA on a single GPU costs $3 to $5 per hour
            for similar duration, bringing the total to $30 to $100. This 10x
            cost reduction democratizes access: research labs and small teams
            can now experiment with adapting frontier models without enterprise
            budgets.<p></p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  QLoRA quantizes base model weights to 4 bit (NF4 format),
                  reducing a 70B model from 140 GB to 35 GB, enabling single GPU
                  fine tuning on 48 to 80 GB cards
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adapters remain in 16 bit precision while base is 4 bit;
                  during forward pass, base weights are dequantized on the fly
                  for computation, maintaining training stability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uses paged optimizers and gradient checkpointing to fit 65B
                  models in 48 GB VRAM at batch size 1 to 4 and sequence length
                  512 to 2048
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training cost drops roughly 10x: from $200 to $600 for multi
                  GPU full fine tuning to $30 to $100 for single GPU QLoRA,
                  democratizing LLM adaptation
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
                  Fine tuning a 65B model: standard 16 bit needs 8 to 16 A100
                  80GB GPUs, QLoRA needs 1 GPU with 48 GB using 4 bit base plus
                  16 bit adapters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  QLoRA on instruction following tasks typically achieves 97 to
                  99% of full precision performance, with 1 to 3 percentage
                  point accuracy drop on benchmarks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Code generation tasks are more sensitive: QLoRA may show 5 to
                  10% degradation in strict correctness metrics due to
                  quantization noise affecting numerical precision
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmFineTuningQloraQuantizedLowRankAdaptationAtExtremeScale;
