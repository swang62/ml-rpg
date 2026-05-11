import type { Component } from "solid-js";

const LessonApproximateNearestNeighborsFaissIvfPqInvertedFileWithProductQuantization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            FAISS IVF-PQ: Inverted File with Product Quantization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT IS IVF-PQ
            </p>
            <p>
              IVF-PQ (Inverted File with Product Quantization) combines two
              techniques: coarse partitioning to reduce search scope, and vector
              compression to reduce memory and speed up distance computation. It
              is the workhorse of FAISS and the go-to choice when you need to
              index billions of vectors on limited hardware.
            </p>
            <p>
              The algorithm works in two stages. First, k-means clustering
              partitions vectors into coarse cells (typically 1K-10K cells). At
              query time, only the nearest cells are searched. Second, Product
              Quantization compresses each vector from full precision (768 dims
              × 4 bytes = 3KB) to a compact code (64 bytes), reducing memory by
              50x.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INVERTED FILE (IVF) PARTITIONING
            </p>
            <p>
              Training clusters N vectors into K centroids using k-means. Each
              vector is assigned to its nearest centroid. At query time, find
              the nprobe nearest centroids to the query, then search only within
              those partitions.
            </p>
            <p>
              Example: 1M vectors, 1000 centroids, nprobe=20. Instead of
              checking 1M vectors, check only 20K (2% of data). If vectors are
              well-clustered, the true neighbors are likely in those 20 cells.
              Recall@10 of 0.95 is achievable with nprobe=20-50 on
              well-distributed data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRODUCT QUANTIZATION (PQ)
            </p>
            <p>
              PQ splits each vector into M subvectors (typically M=8-32), then
              quantizes each subvector independently using a codebook of 256
              centroids. A 768-dim vector becomes M byte codes—one byte per
              subvector pointing to its nearest centroid.
            </p>
            <p>
              Distance computation uses lookup tables. Pre-compute distances
              from query subvectors to all 256 centroids in each codebook.
              Distance to a database vector = sum of M table lookups. This
              replaces 768 floating-point operations with M integer additions.
            </p>
            <p>
              Memory: 768-dim vector compressed from 3072 bytes to M bytes (32
              bytes with M=32). 1 billion vectors fits in 32GB instead of 3TB.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KEY PARAMETERS
            </p>
            <p>
              <strong>nlist:</strong> Number of IVF cells. More cells = finer
              partitioning = lower recall per probe but faster per-cell search.
              Typical: sqrt(N) to 4×sqrt(N). For 1M vectors: 1000-4000.
            </p>
            <p>
              <strong>nprobe:</strong> Cells to search at query time. Higher =
              better recall, more latency. Start at 1% of nlist, tune up.
            </p>
            <p>
              <strong>M (PQ segments):</strong> More segments = better accuracy
              but larger codes. Common: 8, 16, 32, 64.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> IVF-PQ trades recall for memory
              efficiency. Use when you need to index billions of vectors on
              commodity hardware. For highest recall, use HNSW. For lowest
              memory, use IVF-PQ with aggressive quantization.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px">
                    Step 1: Coarse Quantization
                  </div>
                  <div style="font-size: 13px">
                    1B vectors → 262K centroids
                    <br />
                    Query probes nprobe=32 nearest centroids
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px">
                    Step 2: Product Quantization
                  </div>
                  <div style="font-size: 13px">
                    768 dims → 16 subspaces of 48 dims
                    <br />
                    Each subspace: 8 bit code (256 values)
                    <br />
                    3072 bytes → 16 bytes per vector
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px">
                    Step 3: Distance Computation
                  </div>
                  <div style="font-size: 13px">
                    Lookup table from query + codebooks
                    <br />
                    Fast approximate distances on 16 byte codes
                    <br />
                    Returns top k candidates at 96% recall
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
                  IVF partitions vectors into clusters; only nearest clusters
                  searched at query time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PQ compresses 768-dim vectors from 3KB to 32-64 bytes using
                  subvector codebooks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distance computation via lookup tables: M additions instead of
                  768 FLOPs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key knobs: nlist (partitions), nprobe (search breadth), M
                  (compression level)
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
                  Interview Tip: Walk through the numbers—1M vectors, 1000
                  cells, nprobe=20 means checking 2% of data for 95% recall.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain PQ compression math—768 dims × 4 bytes
                  = 3KB compressed to M bytes with codebook lookups.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonApproximateNearestNeighborsFaissIvfPqInvertedFileWithProductQuantization;
