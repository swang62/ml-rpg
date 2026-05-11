import type { Component } from "solid-js";

const LessonModelPruningCriticalTradeoffsWhenToChooseEachPruningStyle: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Critical Tradeoffs: When to Choose Each Pruning Style
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Structured Pruning
            </p>
            <p style="margin-top: 0">
              Use structured pruning when: deploying to standard GPUs or CPUs
              without sparse accelerators; latency is the primary concern; you
              need guaranteed speedups. Target 40-60% channel reduction for
              1.5-2x speedup with less than 1% accuracy loss. Beyond 70%
              removal, accuracy drops sharply (3-5% typical). Best for
              convolutional networks where channel pruning is natural.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Unstructured Pruning
            </p>
            <p style="margin-top: 0">
              Use unstructured pruning when: model size (memory, storage)
              matters more than inference speed; deploying to sparse-aware
              hardware (newer GPUs with sparse tensor cores, specialized
              accelerators); extreme compression is needed. 90-95% sparsity
              achievable with 1-2% accuracy loss. The catch: without sparse
              hardware, you only save memory, not compute time.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pruning vs Other Optimization
            </p>
            <p style="margin-top: 0">
              <strong>Pruning vs Quantization:</strong> Complementary
              techniques. Prune first to reduce parameters, then quantize
              remaining weights. Combined, achieve 10-20x compression with 2-3x
              speedup. <strong>Pruning vs Distillation:</strong> Distillation
              trains a smaller architecture from scratch; pruning shrinks an
              existing one. Distillation often achieves better accuracy-size
              tradeoffs but requires more training compute. Use pruning when you
              want to preserve specific weights or lack resources for full
              retraining.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Decision Framework:</strong> If target hardware has
              sparse acceleration → unstructured. If not → structured. If unsure
              about hardware → structured (safer bet). Always combine with
              quantization for maximum benefit.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Architecture Compatibility
            </p>
            <p style="margin-top: 0">
              Transformers respond well to unstructured pruning (attention heads
              can be sparse). CNNs prefer structured (filter pruning maps to
              hardware efficiently). For mixed architectures, prune convolutions
              structured and attention unstructured, then convert unstructured
              portions only if sparse hardware is available.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Structured: 40-60% channel removal gives 1.5-2x speedup with
                  &lt;1% accuracy loss; beyond 70% accuracy drops sharply
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Unstructured: 90-95% sparsity achievable but only saves memory
                  without sparse hardware
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pruning + quantization together: 10-20x compression with 2-3x
                  speedup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distillation achieves better accuracy-size tradeoffs but needs
                  more training compute than pruning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Transformers suit unstructured pruning; CNNs suit structured
                  pruning
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
                  Give the decision framework: sparse hardware → unstructured,
                  standard hardware → structured
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention combining pruning with quantization for maximum
                  benefit - shows systems thinking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss architecture-specific choices (transformers vs CNNs)
                  to demonstrate breadth
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPruningCriticalTradeoffsWhenToChooseEachPruningStyle;
