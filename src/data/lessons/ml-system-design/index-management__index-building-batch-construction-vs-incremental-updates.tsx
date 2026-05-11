import type { Component } from "solid-js";

const LessonIndexManagementIndexBuildingBatchConstructionVsIncrementalUpdates: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Index Building: Batch Construction vs Incremental Updates
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BUILDING HNSW INDEXES
            </p>
            <p>
              HNSW indexes require training-time construction of the graph
              structure. Each vector is inserted by finding its nearest
              neighbors in the current graph and adding edges. Order of
              insertion matters—later vectors see a more complete graph.
            </p>
            <p>
              Key parameter:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                efConstruction
              </code>{" "}
              controls how many candidates to consider during insertion. Higher
              values (200-500) produce better graphs but slower builds. For 100M
              vectors with efConstruction=200, expect 4-6 hours on 32 CPUs.
            </p>
            <p>
              Build is CPU-bound (graph traversal, distance computation).
              Parallelize across cores. Memory requirement: full vectors + graph
              structure = ~4KB per 768-dim vector.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BUILDING IVF-PQ INDEXES
            </p>
            <p>
              IVF-PQ requires two training phases: k-means clustering for IVF
              partitions, and codebook training for PQ compression.
            </p>
            <p>
              <strong>IVF training:</strong> Run k-means on a sample of vectors
              (1M-10M) to find centroids. Number of centroids = sqrt(N) to
              4×sqrt(N). For 100M vectors, use 10K-40K centroids. Training time:
              30-60 minutes on GPU.
            </p>
            <p>
              <strong>PQ training:</strong> Learn codebooks by running k-means
              on each subvector dimension. Train on same sample as IVF. Training
              time: 10-30 minutes.
            </p>
            <p>
              <strong>Index population:</strong> Assign each vector to nearest
              centroid, compute PQ codes. This is embarrassingly
              parallel—process in batches across many workers. 100M vectors: 1-2
              hours.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              VALIDATION BEFORE DEPLOYMENT
            </p>
            <p>
              Before serving, measure recall@K on a held-out query set with
              ground truth. Sample 10K queries, compute exact nearest neighbors,
              compare to ANN results. Target: recall@10 ≥ 0.95.
            </p>
            <p>
              If recall is low, diagnose: Are centroids well-distributed? Is PQ
              quantization error too high? Increase nlist, reduce M, or use
              higher-precision codes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Always train on a
              representative sample of production data. Index trained on old
              data may have misaligned centroids for new content.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px">
                    Batch Build (Nightly)
                  </div>
                  <div style="font-size: 13px; line-height: 1.5">
                    500M vectors → Train PQ → Build index → Snapshot → Alias
                    swap
                    <br />
                    <strong>Result:</strong> Optimal structure, 10 GB memory,
                    98% recall
                    <br />
                    <strong>Staleness:</strong> Up to 24 hours
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  +
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px">
                    Delta Index (Real Time)
                  </div>
                  <div style="font-size: 13px; line-height: 1.5">
                    1M updates/hour → Small segments → Merge background
                    <br />
                    <strong>Result:</strong> Sub minute freshness, 5k writes/sec
                    <br />
                    <strong>Overhead:</strong> 2x read latency, 20% memory
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px; text-align: center">
                  <div style="font-weight: bold; font-size: 14px">
                    Query merges both: 60ms p99, 97% recall
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
                  HNSW: efConstruction controls graph quality; 200-500 typical;
                  4-6 hours for 100M vectors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IVF-PQ: k-means for centroids + codebook training; sqrt(N) to
                  4×sqrt(N) centroids
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Validate with recall@K on held-out queries before deployment;
                  target 0.95+
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
                  Interview Tip: Explain the two-phase IVF-PQ build—k-means for
                  partitions, then PQ codebook training.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe validation—10K query sample, compute
                  exact neighbors, compare to ANN results.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIndexManagementIndexBuildingBatchConstructionVsIncrementalUpdates;
