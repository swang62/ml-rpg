import type { Component } from "solid-js";

const LessonSemanticSearchNlpWhatIsSemanticSearchAndHowDoDenseEmbeddingsWork: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Semantic Search and How Do Dense Embeddings Work?
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
                <strong>Semantic Search</strong> finds content based on meaning
                rather than exact keyword matches. It converts text into
                numerical vectors (embeddings) that capture semantic similarity,
                then retrieves items whose vectors are closest to the query
                vector.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Keyword Search Fails
            </p>
            <p style="margin-top: 0">
              Traditional keyword search matches exact terms. A search for
              "laptop battery life" returns documents containing those exact
              words. But what about "MacBook power duration" or "how long does
              my computer last on a charge"? These mean the same thing but share
              zero keywords. Keyword search returns nothing useful.
            </p>
            <p>
              Users do not know your terminology. They describe what they want
              in their own words. A system that only matches keywords frustrates
              users and misses relevant content.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Embeddings Capture Meaning
            </p>
            <p style="margin-top: 0">
              Embedding models convert text into dense vectors, typically 384 to
              1536 dimensions. These vectors position similar meanings close
              together in geometric space. "Laptop battery life" and "MacBook
              power duration" produce nearly identical vectors despite sharing
              no words. The model learned from billions of examples that these
              phrases describe the same concept.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Embedding quality determines
              search quality. Domain-specific embedding models trained on your
              data type significantly outperform generic models - sometimes by
              20-30% in relevance.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Search Process
            </p>
            <p style="margin-top: 0">
              At query time, convert query text to a vector using the same
              embedding model used for documents. Find documents whose vectors
              are closest using cosine similarity or dot product. Return top K
              matches. The entire process takes 10-50ms for millions of
              documents with optimized vector indices.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Query: "fix flaky tests"
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px; font-family: monospace">
                    [0.23, 0.87, -0.15, ..., 0.42]
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    384 dimensions
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓ Cosine Similarity: 0.91
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Document: "reduce nondeterministic failures"
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px; font-family: monospace">
                    [0.21, 0.89, -0.12, ..., 0.39]
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    384 dimensions
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓ Cosine Similarity: 0.34
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Document: "banana recipes"
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px; font-family: monospace">
                    [0.78, -0.42, 0.91, ..., -0.23]
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    384 dimensions
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
                  Semantic search matches meaning, not keywords: 'laptop battery
                  life' finds 'MacBook power duration' despite zero word overlap
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Embedding models convert text to 384-1536 dimension vectors
                  where similar meanings cluster together in geometric space
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Embedding quality determines search quality - domain-specific
                  models outperform generic models significantly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query-time process: convert query to vector, find closest
                  document vectors, return top K matches in 10-50ms
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
                  Start by explaining keyword search failure: user searches
                  'laptop battery' but your docs say 'notebook power' - zero
                  matches despite identical meaning.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe embeddings as learned from billions of examples, not
                  hand-crafted rules. The model discovers that phrases mean the
                  same thing.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the 10-50ms latency for semantic search on millions of
                  documents - shows you understand production constraints.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSemanticSearchNlpWhatIsSemanticSearchAndHowDoDenseEmbeddingsWork;
