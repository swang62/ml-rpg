import type { Component } from "solid-js";

const LessonRecsysScalabilityIvfAndProductQuantizationCompressionForBillionScaleSearch: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            IVF and Product Quantization: Compression for Billion Scale Search
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INVERTED FILE INDEX
            </p>
            <p style="margin-top: 0">
              IVF (Inverted File) divides the vector space into clusters. Train
              k-means on a sample of vectors to create cluster centroids
              (typically 1,000 to 10,000 clusters for 100M vectors). Each vector
              is assigned to its nearest centroid. At query time, find the
              closest centroids to the query and only search vectors in those
              clusters. Searching 10 clusters out of 1,000 reduces comparisons
              by 100x.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRODUCT QUANTIZATION
            </p>
            <p style="margin-top: 0">
              Product Quantization (PQ) compresses vectors to reduce memory.
              Split each 128 dimension vector into 8 subvectors of 16 dimensions
              each. For each subvector position, learn 256 representative codes.
              Now represent any vector as 8 bytes (8 positions × 1 byte index
              into 256 codes) instead of 512 bytes (128 × 4 byte floats). This
              is 64x compression. Distance computation uses precomputed tables,
              staying fast despite compression.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IVF-PQ: COMBINING BOTH
            </p>
            <p style="margin-top: 0">
              The combination is powerful: IVF reduces the number of vectors to
              check, PQ reduces memory per vector. 100M vectors with 128
              dimensions: raw storage is 51 GB. With IVF-PQ, storage drops to
              under 1 GB. Query latency increases slightly (10-30ms) compared to
              HNSW (under 5ms), but memory efficiency makes billion scale search
              feasible.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> IVF-PQ trades query latency for
              memory efficiency. When you cannot fit vectors in RAM or need to
              search billions, IVF-PQ is the answer.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ACCURACY LOSS
            </p>
            <p style="margin-top: 0">
              PQ introduces quantization error: the compressed vector is not
              identical to the original. Recall drops 2 to 5% compared to exact
              search. For applications requiring high precision (duplicate
              detection, exact matching), this may be unacceptable. For
              recommendations where approximate results suffice, it works well.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    1. IVF Coarse Partitioning
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    100M vectors → 8192 clusters
                    <br />
                    Query probes nprobe=50 lists (0.6% of data)
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    2. Product Quantization
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    768-d float32 (3 KB) → 64 byte code
                    <br />
                    48× compression, ~6 GB for 100M vectors
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    3. Re-rank Top Candidates
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Retrieve top 1000 PQ candidates
                    <br />
                    Re-rank with full precision → final top 10
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
                  IVF: cluster vectors into 1000-10000 groups, search only
                  nearby clusters for 100x fewer comparisons
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PQ: compress 128-dim vector from 512 bytes to 8 bytes (64x
                  compression) using learned codes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IVF-PQ combined: 100M vectors from 51 GB down to under 1 GB
                  with 10-30ms latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade-off: memory efficiency for latency (10-30ms vs HNSW
                  under 5ms) and 2-5% recall loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best for billion-scale search where data cannot fit in RAM
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
                  Walk through IVF: 100M vectors / 1000 clusters = 100K per
                  cluster, search 10 clusters = 1M comparisons
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain PQ compression: 128 dims → 8 subvectors × 8-bit codes
                  = 8 bytes total
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compare memory: 51 GB raw vs 1 GB compressed for 100M 128-dim
                  vectors
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRecsysScalabilityIvfAndProductQuantizationCompressionForBillionScaleSearch;
