import type { Component } from "solid-js";

const LessonDimensionalityReductionProductionImplementationAndFailureModes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation and Failure Modes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRAINING-SERVING SKEW
            </p>
            <p>
              The most common PCA failure is training-serving skew. You fit PCA
              on historical data, then serve on new data with different
              characteristics. As the embedding distribution drifts, the
              principal components become stale—they no longer capture the
              directions of maximum variance.
            </p>
            <p>
              Symptoms: recall drops over time without any change to embeddings
              or index. New content types cluster in unexpected ways.
              Performance degrades for specific query segments.
            </p>
            <p>
              Mitigation: retrain PCA periodically (weekly to monthly depending
              on drift rate). Monitor explained variance on fresh data—if it
              drops below 85% of training-time variance, trigger retraining.
              Include new content types in training samples.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA LEAKAGE
            </p>
            <p>
              If you train PCA on the full dataset including test examples, your
              evaluation is contaminated. The projection is optimized for the
              specific vectors you will query, artificially inflating recall
              metrics.
            </p>
            <p>
              Fix: strict train-test split before PCA fitting. Train PCA only on
              training vectors. Apply the learned projection to test vectors as
              if they were out-of-sample.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CENTERING AND NORMALIZATION
            </p>
            <p>
              PCA assumes zero-mean data. If you forget to center (subtract the
              mean), the first principal component points toward the mean
              instead of capturing variance. Always: (1) compute mean on
              training data, (2) subtract mean before projection, (3) store mean
              for serving.
            </p>
            <p>
              For cosine similarity downstream, normalize vectors after
              reduction. Reduced vectors inherit the scale of original vectors,
              which may not be unit length. Normalization ensures cosine
              similarity works correctly.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              VERSION MANAGEMENT
            </p>
            <p>
              The PCA projection matrix is a model artifact. Version it
              alongside your embedding model. If you update embeddings, the old
              PCA matrix may not align with new embedding dimensions or
              distributions.
            </p>
            <p>
              Store: projection matrix W, training mean vector, explained
              variance per component, training data statistics. Deploy
              projection and mean together. Log which version served each query
              for debugging.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Critical:</strong> Always subtract the training mean
              before projection at serving time. Forgetting this is the most
              common PCA bug—queries project incorrectly and recall drops
              10-20%.
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
                  Training-serving skew: PCA on old data does not capture new
                  variance directions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data leakage: train PCA only on training vectors, apply to
                  test as out-of-sample
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always center data—subtract training mean before projection,
                  store mean for serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Version PCA artifacts with embedding model; redeploy together
                  on updates
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
                  Interview Tip: Describe the centering bug—forgetting to
                  subtract mean makes first component point at mean instead of
                  variance direction.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain how to detect stale PCA—monitor
                  explained variance on fresh data, retrain when it drops
                  significantly.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalityReductionProductionImplementationAndFailureModes;
