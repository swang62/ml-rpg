import type { Component } from "solid-js";

const LessonEmbeddingGenerationWhatIsEmbeddingGenerationAndWhyItMatters: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Embedding Generation and Why It Matters
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
                <strong>Embedding generation</strong> converts raw inputs (text,
                images, users, items) into fixed-length numerical vectors where
                similar things are close together. A sentence becomes 768
                numbers; similar sentences have similar numbers.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY EMBEDDINGS EXIST
            </p>
            <p>
              Raw inputs are hard to compare. How similar are "cheap flights to
              Paris" and "affordable plane tickets to France"? String matching
              fails. Embeddings solve this: both sentences map to nearby
              vectors, and vector distance measures semantic similarity.
            </p>
            <p>
              The key property: similar inputs produce similar vectors. If you
              train embeddings on search clicks, queries that lead to the same
              results will cluster together even with different words.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TYPES OF EMBEDDINGS
            </p>
            <p>
              <strong>Text embeddings:</strong> Neural networks (BERT,
              Sentence-BERT) encode sentences into 384-768 dim vectors.
              Inference: 10-50ms on GPU.
            </p>
            <p>
              <strong>Image embeddings:</strong> CNNs or Vision Transformers
              encode images into 512-2048 dim vectors. Used for visual
              similarity search.
            </p>
            <p>
              <strong>Graph embeddings:</strong> Encode user-item interactions
              into vectors. Capture collaborative signals (users who click
              similar items have similar embeddings).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE EMBEDDING PIPELINE
            </p>
            <p>
              Training: collect pairs of similar items (clicks, purchases),
              train model to make their embeddings close. Inference: encode new
              items, store vectors, use ANN search to find similar ones.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Embeddings are only as good as
              your similarity definition. Click data produces click-similarity
              embeddings. Purchase data produces purchase-similarity embeddings.
              Choose training signal carefully.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Input Text: "I love my puppy"
                  </strong>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Embedding Model</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    (SBERT 384 dimensions)
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Dense Vector (first 8 dims)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px; font-family: monospace">
                    [0.32, 0.89, 0.15, 0.67, 0.03, 0.51, 0.78, 0.44...]
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Cosine Similarity Search
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Find similar: "Dogs are great pets" (0.91 similarity)
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
                  Embeddings map inputs to vectors where similar things are
                  close
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Text embeddings: 384-768 dims, 10-50ms inference on GPU
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training signal defines similarity—clicks vs purchases produce
                  different embeddings
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
                  Interview Tip: Explain why embeddings beat keyword
                  matching—semantic similarity captures meaning, not just word
                  overlap.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe how training signal affects embedding
                  quality—click embeddings differ from purchase embeddings.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEmbeddingGenerationWhatIsEmbeddingGenerationAndWhyItMatters;
