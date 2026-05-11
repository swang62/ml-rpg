import type { Component } from "solid-js";

const LessonEmbeddingQualityEvaluationWhatIsEmbeddingQualityEvaluation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Is Embedding Quality Evaluation?
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
                <strong>Embedding quality evaluation</strong> measures how well
                vector representations capture the similarity relationships
                needed for your downstream task—whether search, recommendations,
                or classification.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY EVALUATION MATTERS
            </p>
            <p>
              Embeddings can look reasonable in visualization tools but fail in
              production. Two items might be close in embedding space but
              completely unrelated for your use case. Evaluation catches these
              failures before they affect users.
            </p>
            <p>
              The core question: do similar items (as defined by your labels,
              clicks, or purchases) have similar embeddings? If the correlation
              is weak, your retrieval will surface irrelevant results regardless
              of how sophisticated your ANN index is.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INTRINSIC VS EXTRINSIC METRICS
            </p>
            <p>
              <strong>Intrinsic metrics:</strong> Measure embedding properties
              directly. Clustering quality, alignment with known similarity
              labels, distance statistics. Fast to compute, useful for
              debugging. Examples: silhouette score, alignment@k.
            </p>
            <p>
              <strong>Extrinsic metrics:</strong> Measure performance on actual
              downstream tasks. Retrieval recall, classification accuracy,
              recommendation CTR. Slower to compute, but directly measures what
              you care about. Examples: NDCG@10, recall@100.
            </p>
            <p>
              Rule of thumb: intrinsic metrics for fast iteration during
              development, extrinsic metrics for final decisions and production
              monitoring.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KEY METRICS FOR RETRIEVAL
            </p>
            <p>
              <strong>Recall@K:</strong> What fraction of true relevant items
              appear in top K results? recall@100 = 0.90 means 90% of relevant
              items are in the first 100 candidates. Critical for two-stage
              retrieval where Stage 2 cannot fix Stage 1 misses.
            </p>
            <p>
              <strong>NDCG@K:</strong> Measures ranking quality—are relevant
              items ranked at the top? Accounts for position: item at rank 1
              matters more than rank 100. NDCG@10 = 0.85 is good; below 0.7
              indicates ranking problems.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Always evaluate on held-out data
              that represents your production distribution. Training-set
              performance is misleading—embeddings memorize training examples.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 14px">Intrinsic Metrics</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      Geometry &amp; structure
                      <br />
                      Spearman correlation
                      <br />
                      Isotropy, hubness
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 14px">Extrinsic Metrics</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      Task performance
                      <br />
                      Recall@10, nDCG
                      <br />
                      F1, MRR
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 24px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Online Impact</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    CTR uplift 2 to 4%, latency budget &lt;150ms p95
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
                  Intrinsic metrics measure embedding properties directly;
                  extrinsic measure downstream task performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recall@K: fraction of relevant items in top K results—critical
                  for two-stage retrieval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NDCG@K: ranking quality accounting for position—NDCG@10 above
                  0.7 is acceptable
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
                  Interview Tip: Explain intrinsic vs extrinsic—intrinsic for
                  debugging, extrinsic for production decisions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe why recall@K matters for two-stage
                  retrieval—Stage 2 cannot fix Stage 1 misses.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingQualityEvaluationWhatIsEmbeddingQualityEvaluation;
