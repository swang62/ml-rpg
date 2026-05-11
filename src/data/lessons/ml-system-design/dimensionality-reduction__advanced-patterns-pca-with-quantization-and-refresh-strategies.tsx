import type { Component } from "solid-js";

const LessonDimensionalityReductionAdvancedPatternsPcaWithQuantizationAndRefreshStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Advanced Patterns: PCA with Quantization and Refresh Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PCA + QUANTIZATION PIPELINE
            </p>
            <p>
              A common production pattern combines PCA with product quantization
              for extreme compression. The pipeline: (1) apply PCA to
              decorrelate and reduce dimensions, (2) apply scalar or product
              quantization to the reduced vectors.
            </p>
            <p>
              Why PCA before quantization? PCA decorrelates dimensions—the
              principal components are orthogonal. Quantization works better on
              decorrelated data because each dimension can be quantized
              independently without losing covariance information. Empirically,
              PCA + PQ achieves 10-20% better recall than PQ alone at the same
              code size.
            </p>
            <p>
              Example: 768-dim to 128-dim PCA (6x reduction), then 32-byte PQ
              codes (4x additional compression). Total: 24x compression with
              90%+ recall maintained.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RANDOM PROJECTION AS ALTERNATIVE
            </p>
            <p>
              Random projection is simpler than PCA: multiply by a random
              matrix. The Johnson-Lindenstrauss lemma guarantees that random
              projection approximately preserves pairwise distances with high
              probability if the target dimension is O(log N).
            </p>
            <p>
              Advantages: no training required, no drift (the random matrix
              never goes stale), trivially parallel. Disadvantages: requires
              more dimensions than PCA to achieve same quality (typically 2-3x
              more).
            </p>
            <p>
              Use random projection when you need simplicity and do not want to
              manage PCA retraining. Use PCA when you need maximum compression
              ratio and can afford periodic retraining.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INCREMENTAL PCA
            </p>
            <p>
              Standard PCA requires all data in memory. For very large datasets
              or streaming data, use incremental PCA: update the projection as
              new data arrives without reprocessing historical data.
            </p>
            <p>
              Incremental PCA processes data in batches, updating covariance
              estimates and eigenvectors after each batch. Quality is slightly
              lower than full PCA (5-10% more variance required for same recall)
              but enables continuous updating.
            </p>
            <p>
              Use case: indexing new content daily without full retraining. New
              embeddings are projected using current PCA, and PCA is updated
              weekly from accumulated new data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LEARNED DIMENSIONALITY REDUCTION
            </p>
            <p>
              Instead of unsupervised PCA, train a neural network to reduce
              dimensions while optimizing task metrics. The network learns which
              dimensions matter for your specific retrieval or classification
              task.
            </p>
            <p>
              Autoencoder approach: encoder reduces dimensions, decoder
              reconstructs. Train end-to-end on reconstruction loss, or add
              retrieval loss (triplet loss, contrastive loss) to optimize for
              similarity preservation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Start with PCA as baseline. If
              recall is insufficient, try PCA + PQ. If you need extreme
              compression, evaluate learned reduction. Complexity should match
              the problem.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">768D Embedding</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    3 KB per vector
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">PCA to 256D</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Decorrelate dimensions
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Product Quantization</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    16 subvectors × 8 bits
                    <br />
                    16 bytes (10x compression)
                    <br />
                    &lt;2% recall loss
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
                  PCA before quantization decorrelates dimensions, improving PQ
                  recall 10-20%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Random projection needs no training and never drifts, but
                  requires 2-3x more dims
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental PCA enables continuous updates without full
                  retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Learned reduction (autoencoders) can optimize for task
                  metrics, not just variance
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
                  Interview Tip: Explain PCA + PQ pipeline—decorrelate first for
                  independent quantization, achieve 90%+ recall at 24x
                  compression.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Compare PCA vs random projection—PCA is better
                  quality but requires retraining; random projection is simpler.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalityReductionAdvancedPatternsPcaWithQuantizationAndRefreshStrategies;
