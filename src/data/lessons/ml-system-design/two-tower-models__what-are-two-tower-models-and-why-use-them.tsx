import type { Component } from "solid-js";

const LessonTwoTowerModelsWhatAreTwoTowerModelsAndWhyUseThem: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are Two Tower Models and Why Use Them?
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
                <strong>Two-tower models</strong> learn separate neural networks
                for users and items that map both into a shared vector space.
                User-item affinity is the dot product of their vectors. This
                separation enables pre-computing item vectors offline while
                computing user vectors in real-time.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Problem
            </p>
            <p style="margin-top: 0">
              Ranking millions of items per request is too slow. A neural
              network that scores one user-item pair in 0.1ms would take 100
              seconds to score 1 million items. Users expect results in under
              100ms. You cannot run a complex model on every item for every
              request.
            </p>
            <p>
              The naive solution is to pre-compute scores for all user-item
              pairs. But with 100 million users and 10 million items, that is
              10^15 pairs. Storing them requires petabytes. Updating them when
              user behavior changes is impossible. You need a smarter
              architecture.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Two-Tower Insight
            </p>
            <p style="margin-top: 0">
              Instead of learning a score directly, learn to place users and
              items in the same vector space. Users who like similar things
              cluster together. Items that appeal to similar users cluster
              together. A user vector close to an item vector means high
              affinity.
            </p>
            <p>
              The key insight: user vectors and item vectors are computed
              independently. The user tower only sees user features. The item
              tower only sees item features. They never see each other during
              the forward pass. This independence is what makes the architecture
              fast.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why This Makes Retrieval Fast
            </p>
            <p style="margin-top: 0">
              Item vectors depend only on item features like title, category,
              and price. These change rarely. Compute all item vectors once,
              store them in an index. When a new item arrives, compute its
              vector and add it to the index. This is a batch job that runs
              hourly or daily.
            </p>
            <p>
              User vectors depend on user features and recent behavior. Compute
              these at request time. One user vector takes 1-5ms. Then use
              approximate nearest neighbor (ANN) search to find the closest item
              vectors. ANN algorithms like HNSW find top 1000 items from 10
              million in 5-10ms. Total retrieval time: under 20ms.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Two-tower models cannot learn
              cross-features between user and item at retrieval time. A feature
              like "user prefers items priced 20% below their historical
              average" requires knowing both user history and item price
              simultaneously. The towers are separate, so this interaction
              cannot be captured. Solution: use two-tower for fast retrieval of
              candidates, then apply a cross-feature ranking model on the
              smaller candidate set.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 24px; align-items: center; justify-content: center">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">User Features</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      ID, history, device, time
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">User Tower</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Neural network
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">User Embedding</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      [128 dims]
                    </div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; padding-top: 80px">
                  ×
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Item Features</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      ID, category, text, image
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Item Tower</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Neural network
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Item Embedding</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      [128 dims]
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; text-align: center; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; margin-top: 8px">
                <strong style="font-size: 13px">Similarity Score</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Dot product or cosine
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
                  Two separate neural networks encode users and items into
                  vectors of the same dimension (typically 128), where
                  similarity is computed as a dot product
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item vectors are pre-computed offline; at serving time you
                  compute only one user vector and search for similar items,
                  reducing 100M scoring operations to one vector computation
                  plus a fast lookup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dot product similarity: multiply corresponding dimensions and
                  sum. User [0.5, 0.3, 0.8] with item [0.4, 0.6, 0.7] gives
                  (0.5×0.4)+(0.3×0.6)+(0.8×0.7)=0.94
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  This architecture trades expressiveness for speed: no
                  cross-feature interactions between user and item until the
                  final similarity, but enables sub-50ms retrieval over 100M
                  items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical serving: compute user embedding (1-10ms) then ANN
                  search over pre-indexed items (5-15ms) to retrieve top
                  100-1000 candidates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Used as first-stage candidate generation, feeding 200-1000
                  candidates into a slower but more accurate cross-feature
                  ranking model
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
                  When asked about candidate retrieval in system design: explain
                  how two-tower architecture enables sub-10ms latency by
                  precomputing item embeddings and only computing user
                  embeddings online.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For scale questions: mention that item embeddings can be
                  precomputed for millions/billions of items, while user
                  embeddings are computed per request using recent interaction
                  signals.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing cold start: explain that new items can be
                  indexed immediately using content features (text, images) even
                  without interaction data.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTwoTowerModelsWhatAreTwoTowerModelsAndWhyUseThem;
