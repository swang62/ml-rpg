import type { Component } from "solid-js";

const LessonDimensionalityReductionPrincipalComponentAnalysisPcaForOnlineSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Principal Component Analysis (PCA) for Online Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW PCA WORKS
            </p>
            <p>
              Principal Component Analysis finds directions in the data that
              capture the most variance. Imagine a cloud of points in 3D space
              that is flat like a pancake—most of the spread is in two
              directions. PCA finds those two directions (principal components)
              and projects points onto them, reducing from 3D to 2D with minimal
              information loss.
            </p>
            <p>
              Mathematically, PCA computes the covariance matrix of the data,
              then finds its eigenvectors. The eigenvector with the largest
              eigenvalue is the first principal component—the direction of
              maximum variance. The second component is perpendicular to the
              first and captures the next most variance, and so on. You keep the
              top k components and discard the rest.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPUTATIONAL COST
            </p>
            <p>
              Computing full PCA on N vectors of dimension D costs O(N × D²) for
              the covariance matrix and O(D³) for eigen decomposition. For 100
              million vectors at 768 dimensions, this is prohibitively
              expensive.
            </p>
            <p>
              Solution: randomized SVD. Instead of exact eigen decomposition,
              use randomized algorithms that approximate the top k components in
              O(N × D × k) time. This is orders of magnitude faster for
              large-scale data. Libraries like sklearn and FAISS implement
              randomized PCA.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROJECTION IS A MATRIX MULTIPLY
            </p>
            <p>
              After training, PCA produces a projection matrix W of shape (D,
              k). Reducing a new vector is a single matrix multiplication:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                reduced = original @ W
              </code>
              . This is O(D × k) per vector—fast enough for online inference.
            </p>
            <p>
              Example: 768-dim to 128-dim projection is 768 × 128 = 98,304
              operations per vector. At 10 GFLOPs, that is 10 microseconds.
              Negligible compared to embedding model inference (10-50ms).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW MUCH TO REDUCE
            </p>
            <p>
              Rule of thumb: keep enough components to explain 90-95% of
              variance. For typical text embeddings (768-dim), reducing to
              128-256 dims often retains 90%+ variance. Verify by measuring
              recall@k before and after reduction on your actual retrieval task.
            </p>
            <p>
              If recall drops significantly, you are losing signal. Try reducing
              less aggressively (256 dims instead of 128). If recall is
              unchanged, you can likely reduce further (64 dims). The right
              target depends on your data distribution.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Train PCA on a representative
              sample of your serving distribution. If you train on old data and
              serve on new data, the projection may not capture the new variance
              directions.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                  <strong style="font-size: 13px">Training Phase</strong>
                  <div style="font-size: 11px; margin-top: 8px; line-height: 1.4">
                    Compute covariance
                    <br />
                    Eigen decomposition
                    <br />
                    Extract top k components
                    <br />
                    Store projection matrix
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">→</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                  <strong style="font-size: 13px">Serving Phase</strong>
                  <div style="font-size: 11px; margin-top: 8px; line-height: 1.4">
                    Subtract mean
                    <br />
                    Matrix multiply
                    <br />
                    Renormalize (if cosine)
                    <br />
                    ~100K ops per vector
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
                  PCA finds directions of maximum variance via eigenvectors of
                  covariance matrix
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use randomized SVD for large-scale data—O(N×D×k) instead of
                  O(D³)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Projection is single matrix multiply: O(D×k), ~10 microseconds
                  for 768→128
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Target 90-95% explained variance; verify by measuring recall
                  before/after
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
                  Interview Tip: Explain why randomized SVD is necessary at
                  scale—exact eigen decomposition is O(D³), prohibitive for
                  millions of vectors.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe how to choose k—explained variance
                  percentage plus validation on actual task metrics.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalityReductionPrincipalComponentAnalysisPcaForOnlineSystems;
