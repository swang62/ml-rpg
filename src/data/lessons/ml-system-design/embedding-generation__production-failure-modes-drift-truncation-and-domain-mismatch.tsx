import type { Component } from "solid-js";

const LessonEmbeddingGenerationProductionFailureModesDriftTruncationAndDomainMismatch: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Failure Modes: Drift, Truncation, and Domain Mismatch
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EMBEDDING DRIFT
            </p>
            <p>
              As content changes over time, embedding distributions shift. New
              topics, products, or user segments appear that were not
              represented in training data. The embedding model never learned to
              represent these new concepts, so their vectors land in arbitrary
              locations in the embedding space.
            </p>
            <p>
              Symptoms: recall drops gradually over weeks or months. New items
              cluster poorly with related old items. Popular new categories rank
              worse than stale old items. Detection: monitor recall@K on a fresh
              validation set weekly. If recall drops 5%+ from baseline,
              embeddings are drifting.
            </p>
            <p>
              Fix: retrain embeddings periodically (monthly to quarterly
              depending on content velocity). Use incremental training if full
              retraining is too expensive—fine-tune on recent data without
              forgetting old patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TRUNCATION ARTIFACTS
            </p>
            <p>
              Most embedding models have token limits: 512 tokens for BERT, 8192
              for some newer models. Long documents get truncated, losing tail
              content. A 10-page document embedded as first 512 tokens ignores
              90% of the content—potentially the most important 90%.
            </p>
            <p>
              Fixes: chunk documents into sections, embed each chunk, aggregate
              embeddings (mean, max-pool, or attention-weighted). Or use
              long-context models that handle 4K-8K tokens. Trade-off: longer
              context = slower inference = higher compute cost.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DOMAIN MISMATCH
            </p>
            <p>
              Pre-trained embeddings (trained on general web text) may not
              transfer to specialized domains: legal documents, medical records,
              source code, financial reports. The model never saw your domain
              vocabulary or writing style.
            </p>
            <p>
              Detection: embed domain-specific pairs that you know are similar,
              check if their cosine similarity is high (&gt;0.8). If not, the
              pre-trained model fails on your domain.
            </p>
            <p>
              Fix: fine-tune on domain data. Collect 10K-100K pairs of similar
              items from your domain. Fine-tune for 1-3 epochs. Validate that
              recall improves 10-20% on domain-specific benchmarks.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>❗ Critical:</strong> Never assume pre-trained embeddings
              work for your domain. Always validate on domain-specific pairs
              before deploying. Fine-tuning on 10K pairs typically improves
              recall 10-20%.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Old Model: Document Embeddings
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    100M vectors in index, trained 6 months ago
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  +
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    New Model: Query Embeddings
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Retrained with fresh data, deployed today
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Embedding Drift: Vector Spaces Misaligned
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Cosine similarity meaningless, recall collapses
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓ Solution
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 11px">
                  <strong>Versioned Migration</strong>
                  <div style="margin-top: 4px">
                    1. Dual write: compute old + new embeddings
                  </div>
                  <div style="margin-top: 4px">
                    2. Build shadow index with new embeddings
                  </div>
                  <div style="margin-top: 4px">
                    3. Validate recall on held out set (&gt;0.85 target)
                  </div>
                  <div style="margin-top: 4px">
                    4. Atomic traffic cutover after backfill (days to weeks)
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
                  Embedding drift: distributions shift over time, recall
                  degrades gradually
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Truncation: 512 token limit loses document tail; chunk and
                  aggregate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Domain mismatch: fine-tune on 10K-100K domain pairs for 10-20%
                  recall gain
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
                  Interview Tip: Describe drift detection—weekly recall
                  monitoring on fresh validation data.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain domain mismatch solution—fine-tuning on
                  domain pairs, expected improvement range.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingGenerationProductionFailureModesDriftTruncationAndDomainMismatch;
