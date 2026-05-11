import type { Component } from "solid-js";

const LessonDimensionalityReductionWhatIsDimensionalityReductionAndWhyDoWeNeedIt: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Dimensionality Reduction and Why Do We Need It?
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
                <strong>Dimensionality reduction</strong> maps high-dimensional
                data to a lower-dimensional space while preserving the structure
                that matters for downstream tasks. A 768-dimensional embedding
                becomes 128 dimensions, reducing memory by 6x while keeping
                enough information for similarity search or classification.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE CURSE OF DIMENSIONALITY
            </p>
            <p>
              High-dimensional vectors create three problems. First, storage: 1
              billion vectors at 768 dimensions and 4 bytes per float is 3
              terabytes. Second, computation: distance calculations scale
              linearly with dimensions—768 multiplications per pair. Third, and
              less obvious: in high dimensions, the difference between nearest
              and farthest neighbors shrinks, making all points appear roughly
              equidistant.
            </p>
            <p>
              This last effect is called the curse of dimensionality. When every
              point is equidistant, similarity search fails—you cannot
              distinguish truly similar items from random ones. Reducing
              dimensions can actually improve search quality by removing noise
              dimensions that add spurious distance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT STRUCTURE TO PRESERVE
            </p>
            <p>
              <strong>Global structure:</strong> Keep overall distances and
              relationships roughly correct. If points A and B were far apart,
              they should remain far apart. PCA and random projection preserve
              global linear structure.
            </p>
            <p>
              <strong>Local structure:</strong> Keep nearby neighbors as
              neighbors. Points that were close should stay close, even if
              distant points move around. UMAP and t-SNE focus on local
              structure.
            </p>
            <p>
              The choice depends on your task. For ANN search, global structure
              matters—you need distances to remain meaningful. For visualization
              and clustering, local structure matters—you want clusters to be
              visible and separable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LINEAR VS NONLINEAR
            </p>
            <p>
              <strong>Linear methods (PCA):</strong> Project data onto a
              subspace via matrix multiplication. Fast, simple, out-of-sample
              extension is trivial. Works well when the data lies on or near a
              linear subspace.
            </p>
            <p>
              <strong>Nonlinear methods (UMAP, t-SNE):</strong> Learn curved
              manifolds that better capture complex structure. Better for
              visualization but harder to apply to new points. Computationally
              expensive.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Dimensionality reduction is
              lossy. Reducing 768 dims to 128 loses information. The question is
              whether the lost information was noise or signal. Evaluate on your
              actual task metrics, not just reconstruction error.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">768D Embeddings</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    150 GB storage
                    <br />
                    20ms p95 latency
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    Dimensionality Reduction
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    PCA or UMAP
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">128D Embeddings</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    25 GB storage
                    <br />
                    7-10ms p95 latency
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
                  High dimensions cause storage, computation, and curse of
                  dimensionality problems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Global structure (PCA) preserves overall distances; local
                  structure (UMAP) preserves neighborhoods
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Linear methods are fast with easy out-of-sample extension;
                  nonlinear methods capture complex patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reduction is lossy—evaluate on task metrics, not just
                  reconstruction error
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
                  Interview Tip: Explain the curse of dimensionality—in high
                  dimensions, nearest and farthest neighbors become equidistant,
                  breaking similarity search.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe when to preserve global vs local
                  structure based on task requirements.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalityReductionWhatIsDimensionalityReductionAndWhyDoWeNeedIt;
