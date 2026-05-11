import type { Component } from "solid-js";

const LessonDenseRetrievalDenseRetrievalFailureModesAndMitigationStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dense Retrieval Failure Modes and Mitigation Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Out-of-Distribution Queries
            </p>
            <p style="margin-top: 0">
              Dense retrievers generalize poorly to query types unseen during
              training. A model trained on natural questions fails on code
              snippets, product IDs, or specialized jargon. Symptoms: low recall
              on specific query segments, user complaints about obvious misses.
              Detection: segment queries by type, measure recall per segment.
              Mitigation: include diverse query types in training data, fall
              back to sparse retrieval for detected OOD queries, or use hybrid
              retrieval by default.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Embedding Drift
            </p>
            <p style="margin-top: 0">
              When you update the encoder model, old document embeddings become
              incompatible with new query embeddings. Even small model changes
              shift the entire vector space. Symptoms: recall drops after model
              update despite better offline metrics. Prevention: always
              re-encode all documents when updating the encoder. This is
              expensive but absolutely necessary. Track embedding version with
              documents; reject queries against mismatched versions or maintain
              multiple index versions during transitions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              False Semantic Similarity
            </p>
            <p style="margin-top: 0">
              Embeddings place superficially similar but semantically different
              texts close together. "How to kill a process" and "how to kill a
              person" might have high similarity. "Apple iPhone" and "Apple
              fruit" might cluster together. The model learned surface patterns,
              not true meaning. Mitigation: include contrastive pairs in
              training that are lexically similar but semantically different;
              use domain-specific fine-tuning to separate false positives.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Monitoring:</strong> Track per-query-type recall
              weekly. Sudden drops indicate model degradation or distribution
              shift. Always A/B test model changes against production baseline
              before full rollout.
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
                  OOD queries: models fail on query types not in training (code,
                  IDs, jargon); segment and measure recall
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mitigation for OOD: include diverse training data, fall back
                  to sparse, or use hybrid default
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Embedding drift: model updates invalidate old embeddings;
                  always re-encode all documents
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  False similarity: lexically similar but semantically different
                  texts cluster (Apple iPhone vs fruit)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor per-query-type recall weekly; A/B test model changes
                  before full rollout
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
                  Explain embedding drift problem when discussing model updates
                  - shows production awareness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe OOD failure with specific examples (code snippets,
                  product IDs)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention false semantic similarity problem with Apple example
                  for nuanced understanding
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDenseRetrievalDenseRetrievalFailureModesAndMitigationStrategies;
