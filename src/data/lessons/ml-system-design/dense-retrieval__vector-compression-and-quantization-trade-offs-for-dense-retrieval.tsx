import type { Component } from "solid-js";

const LessonDenseRetrievalVectorCompressionAndQuantizationTradeOffsForDenseRetrieval: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Vector Compression and Quantization Trade-offs for Dense Retrieval
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
                <strong>Vector quantization</strong> compresses embeddings by
                representing them with fewer bits or lower-dimensional
                approximations. A 768-dim float32 vector (3KB) can compress to
                96 bytes (32x reduction) with acceptable recall loss.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scalar Quantization
            </p>
            <p style="margin-top: 0">
              Convert each float32 (4 bytes) to int8 (1 byte) or smaller. Map
              the float range to 256 discrete levels. 4x memory reduction with
              1-3% recall loss. Simple to implement, works with standard ANN
              libraries. Best for memory-constrained deployments where slight
              recall loss is acceptable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Product Quantization (PQ)
            </p>
            <p style="margin-top: 0">
              Split the vector into subvectors (e.g., 768 dims into 96
              subvectors of 8 dims each). Learn a codebook of centroids for each
              subvector. Represent each subvector by its nearest centroid index
              (1 byte). Result: 768-dim vector compressed to 96 bytes. 32x
              compression with 5-10% recall loss at high compression. Enables
              billion-scale search on single machines.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dimensionality Reduction
            </p>
            <p style="margin-top: 0">
              Train with lower output dimensions (256 or 384 instead of 768).
              Less compression than quantization but no post-hoc accuracy loss.
              Alternatively, apply PCA after training; keep top dimensions
              capturing 95%+ variance. Combine with quantization: reduce to 384
              dims, then quantize to int8, achieving 6x compression with minimal
              recall loss.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Higher compression = more recall
              loss. Measure on your data. Target: &lt;5% recall@100 degradation
              for production systems.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Float32 (baseline)</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    768 dims × 4 bytes = 3 KB per vector
                    <br />
                    100M vectors = 300 GB
                    <br />
                    Recall@100: 85.0%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Float16</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    768 dims × 2 bytes = 1.5 KB per vector
                    <br />
                    100M vectors = 150 GB (2× compression)
                    <br />
                    Recall@100: 84.6% (0.4 point drop)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Scalar Quantization (int8)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    768 dims × 1 byte = 768 bytes per vector
                    <br />
                    100M vectors = 76.8 GB (4× compression)
                    <br />
                    Recall@100: 83.2% (1.8 point drop)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Product Quantization</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    96 subvectors × 1 byte = 96 bytes per vector
                    <br />
                    100M vectors = 9.6 GB (31× compression)
                    <br />
                    Recall@100: 81.5% (3.5 point drop)
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
                  Scalar quantization: float32 → int8 gives 4x compression with
                  1-3% recall loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Product quantization: 768-dim → 96 bytes (32x compression)
                  with 5-10% recall loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PQ enables billion-scale search on single machines through
                  extreme compression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dimensionality reduction: train at 256-384 dims or apply PCA
                  post-training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combine techniques: reduce dims + quantize for 6x+ compression
                  with minimal recall loss
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
                  Explain scalar vs product quantization trade-offs (4x/1-3% vs
                  32x/5-10%)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe PQ mechanism (split into subvectors, codebook per
                  subvector) for technical depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommend combined approach (dimension reduction +
                  quantization) for best results
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDenseRetrievalVectorCompressionAndQuantizationTradeOffsForDenseRetrieval;
