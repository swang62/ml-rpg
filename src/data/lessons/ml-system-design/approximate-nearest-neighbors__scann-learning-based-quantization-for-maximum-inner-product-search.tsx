import type { Component } from "solid-js";

const LessonApproximateNearestNeighborsScannLearningBasedQuantizationForMaximumInnerProductSearch: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            ScaNN: Learning Based Quantization for Maximum Inner Product Search
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT MAKES SCANN DIFFERENT
            </p>
            <p>
              ScaNN (Scalable Nearest Neighbors) optimizes specifically for
              Maximum Inner Product Search (MIPS), the similarity metric used by
              most embedding models. Unlike FAISS which uses generic k-means and
              symmetric quantization, ScaNN learns data-specific partitioning
              and asymmetric quantization that maximize inner product
              preservation.
            </p>
            <p>
              The key insight: for MIPS, errors in different directions have
              different costs. ScaNN learns an anisotropic (direction-dependent)
              loss function that penalizes errors based on their impact on inner
              product scores, not just Euclidean distance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ANISOTROPIC VECTOR QUANTIZATION
            </p>
            <p>
              Standard PQ minimizes reconstruction error uniformly in all
              directions. But for inner products, error along the query
              direction matters more than error perpendicular to it. ScaNN
              weights quantization error by how much it affects inner product
              with likely queries.
            </p>
            <p>
              Training: sample query distribution, compute how each quantization
              error affects inner product scores, weight codebook training
              accordingly. Result: 10-30% higher recall at the same memory
              footprint compared to symmetric PQ.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ASYMMETRIC DISTANCE COMPUTATION
            </p>
            <p>
              ScaNN uses asymmetric distance: query vectors are kept at full
              precision, only database vectors are quantized. At query time,
              compute exact distances between full-precision query subvectors
              and quantized database codes.
            </p>
            <p>
              Why asymmetric? Query computation happens once per query, database
              code storage happens once per vector. Keeping queries unquantized
              adds negligible query-time cost but significantly improves
              accuracy compared to quantizing both sides.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE SCANN VS FAISS
            </p>
            <p>
              <strong>Use ScaNN when:</strong> Your similarity metric is inner
              product or cosine (which converts to inner product after
              normalization). Your query distribution is stable enough to train
              anisotropic quantization. You need maximum recall per byte of
              memory.
            </p>
            <p>
              <strong>Use FAISS when:</strong> You need L2 distance. Your system
              is already built on FAISS ecosystem. You need features ScaNN lacks
              (GPU acceleration, certain index types).
            </p>
            <p>
              Benchmarks show ScaNN achieves 10-30% higher recall than FAISS
              IVF-PQ at equivalent memory usage for MIPS workloads. The gap
              narrows for L2 distance where ScaNNs MIPS optimizations do not
              apply.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> ScaNN is purpose-built for inner
              product. If your embeddings use cosine or dot product similarity
              (most modern models), ScaNN likely outperforms FAISS. For L2
              distance, the advantage disappears.
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
                  ScaNN optimizes for MIPS (Maximum Inner Product Search), the
                  common embedding similarity metric
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anisotropic quantization: weight errors by impact on inner
                  product, not uniform reconstruction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Asymmetric distance: keep query at full precision, quantize
                  only database vectors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  10-30% higher recall than FAISS IVF-PQ at same memory for MIPS
                  workloads
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
                  Interview Tip: Explain anisotropic vs isotropic
                  quantization—errors along query direction matter more for
                  inner products.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe when ScaNN wins (MIPS, cosine) vs when
                  FAISS is better (L2, GPU, ecosystem).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApproximateNearestNeighborsScannLearningBasedQuantizationForMaximumInnerProductSearch;
