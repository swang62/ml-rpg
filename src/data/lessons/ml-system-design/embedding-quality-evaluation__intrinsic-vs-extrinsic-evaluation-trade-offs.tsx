import type { Component } from "solid-js";

const LessonEmbeddingQualityEvaluationIntrinsicVsExtrinsicEvaluationTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Intrinsic vs Extrinsic Evaluation Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INTRINSIC EVALUATION METHODS
            </p>
            <p>
              Intrinsic evaluation measures embedding properties without running
              the full downstream task. It is fast and useful for debugging but
              can be misleading about real performance.
            </p>
            <p>
              <strong>Alignment:</strong> Measure correlation between embedding
              distances and known similarity labels. If experts label pairs as
              similar/dissimilar, do embeddings agree? Spearman correlation of
              0.7+ indicates reasonable alignment.
            </p>
            <p>
              <strong>Uniformity:</strong> Are embeddings spread evenly across
              the sphere, or do they collapse into a small region? Collapsed
              embeddings lack expressiveness—all items look similar. Measure via
              average pairwise distance; uniform distribution has higher
              average.
            </p>
            <p>
              <strong>Cluster quality:</strong> If ground-truth clusters exist
              (categories, topics), do embedding clusters match? Silhouette
              score measures cluster coherence. Score above 0.3 indicates
              meaningful clustering.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EXTRINSIC EVALUATION METHODS
            </p>
            <p>
              Extrinsic evaluation runs the actual downstream task on held-out
              data. Slower but directly measures what you care about.
            </p>
            <p>
              <strong>Retrieval:</strong> Given query, can embeddings retrieve
              correct documents? Measure recall@K and NDCG@K. This is the ground
              truth for search use cases.
            </p>
            <p>
              <strong>Classification:</strong> Train a simple classifier (linear
              probe) on top of frozen embeddings. If embeddings capture
              class-relevant information, the probe achieves high accuracy.
              Accuracy below 70% suggests embeddings miss important signals.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN INTRINSIC AND EXTRINSIC DISAGREE
            </p>
            <p>
              Sometimes intrinsic metrics look good but extrinsic fails. This
              happens when embeddings capture structure but not the structure
              relevant to your task. A model might cluster by topic (good
              alignment) but miss user intent (bad retrieval).
            </p>
            <p>
              Resolution: trust extrinsic metrics for final decisions. Use
              intrinsic metrics only for debugging why extrinsic is failing.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> During development, use
              intrinsic metrics for fast feedback. Before launch, validate with
              extrinsic metrics on production-like data. Monitor extrinsic
              metrics in production.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Intrinsic: Fast Gate</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Isotropy, hubness, STS correlation
                    <br />
                    Runtime: Minutes on 1 GPU
                    <br />
                    Cost: $0.10 per run
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Pass threshold
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Extrinsic: Accuracy Check
                  </strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Recall@10, nDCG on 50k pairs
                    <br />
                    Runtime: Hours on multi GPU
                    <br />
                    Cost: $50 to $200 per run
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓ Meet uplift target
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Online: Business Impact
                  </strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    A/B test for CTR, engagement
                    <br />
                    Runtime: 7 to 14 days
                    <br />
                    Cost: Opportunity cost of wrong decision
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
                  Alignment: correlation with similarity labels; Spearman 0.7+
                  is reasonable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Classification probe: train linear classifier on frozen
                  embeddings; below 70% means missing signals
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When metrics disagree, trust extrinsic—intrinsic may capture
                  irrelevant structure
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
                  Interview Tip: Explain why intrinsic and extrinsic can
                  disagree—embeddings may cluster by topic but miss user intent.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe the evaluation workflow—intrinsic for
                  debugging, extrinsic for launch decisions, monitor extrinsic
                  in production.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingQualityEvaluationIntrinsicVsExtrinsicEvaluationTradeOffs;
