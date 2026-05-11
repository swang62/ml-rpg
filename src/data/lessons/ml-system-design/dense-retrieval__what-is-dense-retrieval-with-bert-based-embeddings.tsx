import type { Component } from "solid-js";

const LessonDenseRetrievalWhatIsDenseRetrievalWithBertBasedEmbeddings: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Dense Retrieval with BERT Based Embeddings?
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
                <strong>Dense retrieval</strong> finds relevant documents by
                computing similarity between learned vector representations
                (embeddings) of queries and documents. Unlike keyword matching,
                it captures semantic meaning: "automobile" matches "car" even
                without shared words.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How It Works
            </p>
            <p style="margin-top: 0">
              Both queries and documents are encoded into fixed-length vectors
              (typically 768 dimensions for BERT-based models, 384-512 for
              efficient variants). Relevance is computed as dot product or
              cosine similarity between vectors. Documents are pre-indexed; at
              query time, encode the query and find nearest neighbors. The key
              insight: semantically similar texts cluster in vector space even
              without lexical overlap.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dense vs Sparse Retrieval
            </p>
            <p style="margin-top: 0">
              <strong>Sparse (BM25, TF-IDF):</strong> Exact keyword matching.
              Fast, interpretable, handles rare terms well. Fails on synonyms,
              paraphrases, and semantic similarity. <strong>Dense:</strong>{" "}
              Semantic matching through learned embeddings. Handles synonyms and
              paraphrases. Struggles with rare/specific terms, exact matches,
              and requires training data. Neither dominates; production systems
              often combine both.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Dense Retrieval Shines
            </p>
            <p style="margin-top: 0">
              Best for: semantic search where vocabulary varies ("inexpensive"
              vs "cheap"), question answering (question and answer rarely share
              words), multilingual search (embeddings bridge languages).
              Improves recall by 10-30% over sparse methods for semantic
              queries. Not ideal for: exact entity matching, code search, or
              domains with specialized vocabulary lacking training data.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 16px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">
                      Query:
                      <br />
                      "laptop cooling"
                    </strong>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">
                      Document:
                      <br />
                      "overheating fix"
                    </strong>
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: bold">
                  ↓
                </div>
                <div style="display: flex; gap: 16px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">
                      Query Encoder
                      <br />
                      (BERT)
                    </strong>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">
                      Doc Encoder
                      <br />
                      (BERT)
                    </strong>
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: bold">
                  ↓
                </div>
                <div style="display: flex; gap: 16px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">
                      [0.21, 0.45, ..., 0.13]
                      <br />
                      768 dims
                    </strong>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 12px">
                      [0.19, 0.47, ..., 0.11]
                      <br />
                      768 dims
                    </strong>
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Similarity Score: 0.87
                    <br />
                    (Dot Product)
                  </strong>
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
                  Dense retrieval uses learned vector embeddings to capture
                  semantic similarity without shared words
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Vectors are typically 768 dimensions (BERT) or 384-512
                  (efficient models); similarity via dot product
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sparse (BM25): exact keywords, fast, handles rare terms;
                  Dense: semantic, handles synonyms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dense improves recall 10-30% for semantic queries but
                  struggles with exact entity matching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best for: semantic search, QA, multilingual; combine with
                  sparse for production
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
                  Explain dense vs sparse trade-offs (synonyms vs rare terms) as
                  a comparison framework
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention typical embedding dimensions (768 for BERT, 384-512
                  for efficient) for technical depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cite 10-30% recall improvement for semantic queries to
                  quantify the benefit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDenseRetrievalWhatIsDenseRetrievalWithBertBasedEmbeddings;
