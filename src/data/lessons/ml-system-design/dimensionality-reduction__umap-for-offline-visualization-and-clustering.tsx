import type { Component } from "solid-js";

const LessonDimensionalityReductionUmapForOfflineVisualizationAndClustering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            UMAP for Offline Visualization and Clustering
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT UMAP DOES DIFFERENTLY
            </p>
            <p>
              UMAP (Uniform Manifold Approximation and Projection) is a
              nonlinear method that preserves local neighborhood structure. It
              builds a graph where each point connects to its k nearest
              neighbors, then finds a low-dimensional layout where those
              neighborhood relationships are preserved as closely as possible.
            </p>
            <p>
              Unlike PCA which projects onto linear subspaces, UMAP can unroll
              curved manifolds. If your data lies on a Swiss roll (a 2D surface
              curled in 3D), PCA squashes it flat and destroys structure. UMAP
              unrolls it back to 2D, revealing the original relationships.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW UMAP WORKS
            </p>
            <p>
              <strong>Step 1:</strong> Build a weighted k-nearest-neighbor graph
              in the original high-dimensional space. Edge weights decrease with
              distance—nearby neighbors have strong connections, distant
              neighbors have weak ones.
            </p>
            <p>
              <strong>Step 2:</strong> Initialize points in low-dimensional
              space (usually 2D or 3D for visualization).
            </p>
            <p>
              <strong>Step 3:</strong> Iteratively adjust low-dimensional
              positions. Move connected points closer together, push
              non-connected points apart. The optimization minimizes
              cross-entropy between high-dimensional and low-dimensional
              neighborhood probabilities.
            </p>
            <p>
              The key parameters are{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                n_neighbors
              </code>{" "}
              (how many neighbors to consider, typically 15-50) and{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                min_dist
              </code>{" "}
              (how tightly points can cluster, 0.0-1.0).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPUTATIONAL COST
            </p>
            <p>
              UMAP is expensive: O(N × k × log N) for graph construction using
              approximate nearest neighbor search, plus O(N × iterations) for
              optimization. For 1 million vectors, expect minutes to hours
              depending on parameters.
            </p>
            <p>
              UMAP does not naturally handle out-of-sample points. You must
              either retrain on the expanded dataset or use a learned parametric
              extension (a neural network trained to approximate the UMAP
              mapping).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE UMAP
            </p>
            <p>
              <strong>Good for:</strong> Visualization (projecting embeddings to
              2D for human inspection), exploratory analysis, clustering
              analysis, understanding embedding space structure.
            </p>
            <p>
              <strong>Bad for:</strong> Online inference (too slow, no easy
              out-of-sample extension), preserving exact distances (UMAP
              distorts global structure), very high-dimensional targets (best
              for 2-3D).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> UMAP excels at revealing cluster
              structure that PCA misses. Use it for offline analysis to
              understand your embedding space, then use PCA or quantization for
              production serving.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">1. Build kNN Graph</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5M points × 30 neighbors = 150M edges
                    <br />
                    Memory: 2.4-4.8 GB
                    <br />
                    Time: 30 min to 2 hours
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">2. Optimize Embedding</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Stochastic gradient descent
                    <br />
                    Match fuzzy topology
                    <br />
                    Hyperparams: n_neighbors, min_dist
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">3. Output: 2D Map</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Offline visualization
                    <br />
                    Cluster audits
                    <br />
                    Drift monitoring dashboards
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
                  UMAP preserves local neighborhoods by optimizing graph
                  similarity in low dimensions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Can unroll nonlinear manifolds that PCA squashes—reveals
                  hidden structure
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Computationally expensive: O(N×k×logN) + optimization, minutes
                  to hours at scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  No natural out-of-sample extension—retrain or use parametric
                  approximation
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
                  Interview Tip: Explain when UMAP beats PCA—data on curved
                  manifolds, cluster visualization, exploratory analysis.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe why UMAP is unsuitable for online
                  serving—no out-of-sample extension, expensive computation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalityReductionUmapForOfflineVisualizationAndClustering;
