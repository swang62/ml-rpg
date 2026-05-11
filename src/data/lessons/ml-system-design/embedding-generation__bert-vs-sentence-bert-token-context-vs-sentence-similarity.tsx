import type { Component } from "solid-js";

const LessonEmbeddingGenerationBertVsSentenceBertTokenContextVsSentenceSimilarity: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            BERT vs Sentence BERT: Token Context vs Sentence Similarity
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BERT: TOKEN-LEVEL UNDERSTANDING
            </p>
            <p>
              BERT (Bidirectional Encoder Representations from Transformers)
              processes text by looking at each word in context of all other
              words. For the word "bank" in "river bank" vs "bank account," BERT
              produces different vector representations because the surrounding
              words differ. This context-awareness enables nuanced language
              understanding.
            </p>
            <p>
              Problem for similarity search: BERT does not naturally produce
              sentence-level embeddings. The common workaround—averaging all
              token embeddings—loses sentence meaning. Two unrelated sentences
              might have similar averages by chance because averaging destroys
              ordering and emphasis.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SENTENCE-BERT: OPTIMIZED FOR SIMILARITY
            </p>
            <p>
              Sentence-BERT (SBERT) fine-tunes BERT specifically for sentence
              similarity. During training, the model sees pairs of similar
              sentences and learns to produce vectors that are close together.
              The special [CLS] token or mean pooling produces a single sentence
              embedding optimized for cosine similarity comparison.
            </p>
            <p>
              Key difference: SBERT embeddings are directly comparable via
              cosine distance. Two semantically similar sentences have cosine
              similarity near 1.0; unrelated sentences have similarity near 0.0.
              No cross-attention needed between sentences.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERFORMANCE COMPARISON
            </p>
            <p>
              <strong>Cross-encoder (BERT):</strong> Feed both sentences
              together, model attends across both. Most accurate but O(N²) for N
              documents—1000 sentences = 500K pair evaluations. Unusable for
              search at scale.
            </p>
            <p>
              <strong>Bi-encoder (SBERT):</strong> Embed each sentence
              independently, compare via dot product. O(N) embeddings + O(1) per
              comparison. 1000 sentences = 1000 embeddings, then use ANN for
              sub-linear search. Slightly less accurate but 10,000x faster.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> SBERT is faster but 2-5% less
              accurate than cross-encoder BERT. Common pattern: SBERT retrieves
              100 candidates fast (5ms), cross-encoder re-ranks top 10 for
              maximum precision (50ms).
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; gap: 16px; justify-content: space-around">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">BERT Pooling</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <div>
                      <strong>Input:</strong> "Dogs are great"
                    </div>
                    <div style="margin-top: 4px">
                      <strong>Tokens:</strong> [CLS] Dogs are great [SEP]
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>Mean Pool Tokens</strong>
                    <div style="margin-top: 4px">
                      768 dims per token → 768 dim sentence
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>Issue:</strong> Not optimized for similarity
                    <div style="margin-top: 4px">Cosine ≠ semantic match</div>
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Sentence BERT</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <div>
                      <strong>Input:</strong> "Dogs are great"
                    </div>
                    <div style="margin-top: 4px">
                      <strong>Twin Network:</strong> Shared BERT weights
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>Contrastive Training</strong>
                    <div style="margin-top: 4px">
                      Triplet loss aligns vectors
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>Result:</strong> 384 or 768 dims
                    <div style="margin-top: 4px">
                      Cosine = semantic similarity
                    </div>
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
                  BERT: token-level context but no native sentence embedding
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SBERT: fine-tuned for sentence similarity, directly comparable
                  vectors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SBERT is O(N) for embedding; cross-encoder BERT is O(N²) for
                  comparison
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
                  Interview Tip: Explain the bi-encoder vs cross-encoder
                  tradeoff—speed vs accuracy, use both in two-stage retrieval.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe when to use each—SBERT for candidate
                  generation, cross-encoder for re-ranking.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingGenerationBertVsSentenceBertTokenContextVsSentenceSimilarity;
