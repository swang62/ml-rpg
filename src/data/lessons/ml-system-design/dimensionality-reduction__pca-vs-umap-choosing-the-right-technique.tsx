import type { Component } from "solid-js";

const LessonDimensionalityReductionPcaVsUmapChoosingTheRightTechnique: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            PCA vs UMAP: Choosing the Right Technique
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DECISION FRAMEWORK
            </p>
            <p>
              The choice between PCA and UMAP depends on three factors: what
              structure you need to preserve, whether you need out-of-sample
              extension, and your computational budget.
            </p>
            <p>
              <strong>Use PCA when:</strong> You need to reduce dimensions for
              downstream ML (retrieval, classification). You have a latency
              budget for online inference. You want reproducible, deterministic
              results. Your data structure is roughly linear.
            </p>
            <p>
              <strong>Use UMAP when:</strong> You are visualizing embeddings for
              human analysis. You want to understand cluster structure. You can
              process offline and do not need out-of-sample extension. Your data
              lies on nonlinear manifolds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STRUCTURE PRESERVATION COMPARISON
            </p>
            <p>
              <strong>Global structure:</strong> PCA approximately preserves
              pairwise distances. If two points were 10 units apart in 768D,
              they might be 8 units apart in 128D. UMAP does NOT preserve global
              distances—distant points can end up anywhere.
            </p>
            <p>
              <strong>Local structure:</strong> UMAP strongly preserves local
              neighborhoods. If A and B were nearest neighbors in 768D, they
              will be near each other in 2D. PCA preserves local structure only
              if the data is roughly linear.
            </p>
            <p>
              <strong>Cluster separation:</strong> UMAP tends to produce
              well-separated clusters that are visually distinct. PCA
              projections often show overlapping, harder-to-interpret clusters.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERFORMANCE COMPARISON
            </p>
            <p>
              <strong>Training time:</strong> PCA with randomized SVD on 1M ×
              768 vectors: minutes. UMAP: hours.
            </p>
            <p>
              <strong>Inference time:</strong> PCA projection: microseconds
              (matrix multiply). UMAP: no native inference—requires retraining
              or learned approximation.
            </p>
            <p>
              <strong>Memory:</strong> PCA stores projection matrix (D × k
              floats). UMAP stores graph structure (O(N × k) entries).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMMON WORKFLOWS
            </p>
            <p>
              <strong>Offline analysis:</strong> Use UMAP to visualize embedding
              space, identify clusters, understand model behavior. Export
              insights for product decisions.
            </p>
            <p>
              <strong>Production serving:</strong> Use PCA (or random
              projection) to reduce dimensions before ANN indexing. Reduces
              memory by 3-6x while maintaining 90%+ recall.
            </p>
            <p>
              <strong>Hybrid:</strong> Use UMAP to find natural clusters, use
              PCA to reduce within clusters, apply different strategies per
              cluster.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>🎯 Decision Criteria:</strong> If you need to reduce
              dimensions at serving time, use PCA. If you are analyzing data
              offline to understand structure, use UMAP. They solve different
              problems.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    PCA
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    <strong>Latency:</strong> ~0.01ms
                    <br />
                    <strong>Scale:</strong> 100M+ points
                    <br />
                    <strong>Structure:</strong> Global linear
                    <br />
                    <strong>Use:</strong> Online serving
                    <br />
                    <strong>Deterministic:</strong> Yes
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    UMAP
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    <strong>Latency:</strong> 10-100ms
                    <br />
                    <strong>Scale:</strong> 1-5M points
                    <br />
                    <strong>Structure:</strong> Local clusters
                    <br />
                    <strong>Use:</strong> Offline viz
                    <br />
                    <strong>Deterministic:</strong> No
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
                  PCA for online serving (fast, deterministic); UMAP for offline
                  visualization (reveals clusters)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PCA preserves global distances; UMAP preserves local
                  neighborhoods but distorts global structure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PCA training: minutes; UMAP training: hours. PCA inference:
                  microseconds; UMAP: no native inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common pattern: UMAP for analysis, PCA for production
                  dimensionality reduction
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
                  Interview Tip: Present PCA vs UMAP as solving different
                  problems—serving-time reduction vs offline analysis—not
                  competing solutions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain why UMAP clusters look cleaner—it
                  optimizes for local neighborhood preservation, not global
                  distance.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalityReductionPcaVsUmapChoosingTheRightTechnique;
