import type { Component } from "solid-js";

const LessonCollaborativeFilteringWhatIsCollaborativeFiltering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Collaborative Filtering?
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
                <strong>Collaborative filtering</strong> predicts user
                preferences by finding patterns in how groups of users interact
                with items. If users A and B both liked items 1, 2, and 3, and
                user A also liked item 4, then user B will probably like item 4
                too. It works without knowing anything about the items
                themselves.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Intuition
            </p>
            <p style="margin-top: 0">
              Collaborative filtering exploits a simple observation: people with
              similar tastes in the past will have similar tastes in the future.
              If you and I both gave 5 stars to The Shawshank Redemption, Pulp
              Fiction, and The Dark Knight, we probably have similar taste in
              movies. So if I loved Inception and you have not seen it, the
              system predicts you will like it too.
            </p>
            <p>
              This is fundamentally different from content-based filtering,
              which would need to know that all these movies share features like
              "acclaimed directors" or "complex plots". Collaborative filtering
              does not need to understand why we have similar taste. It just
              needs to observe that we do.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              User-Based vs Item-Based
            </p>
            <p style="margin-top: 0">
              <strong>User-based:</strong> Find users similar to you, see what
              they liked that you have not tried. The algorithm computes
              similarity between users based on their rating patterns. Similar
              users become your "neighborhood". Predictions come from what your
              neighbors rated highly. Problem: user profiles change rapidly as
              they rate more items, so neighborhoods shift constantly.
              Recomputing similarities is expensive.
            </p>
            <p>
              <strong>Item-based:</strong> Find items similar to ones you liked.
              If you rated item A highly, find items that other users rated
              similarly to A. Item similarities are more stable than user
              similarities because item profiles change only when new ratings
              come in, while user profiles change with every new rating. This
              stability makes item-based collaborative filtering more practical
              for production.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Sparsity Problem
            </p>
            <p style="margin-top: 0">
              With millions of users and millions of items, the rating matrix is
              enormous but almost entirely empty. A typical user rates maybe
              0.01% of available items. Most user pairs have zero items rated in
              common, making similarity calculation meaningless. This sparsity
              is why simple nearest-neighbor collaborative filtering struggles
              at scale and why matrix factorization became the dominant
              approach.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Collaborative filtering learns
              from behavior, not from content features. This is its strength and
              weakness. Strength: no need to engineer features or understand
              item content. Weakness: cannot recommend new items until users
              interact with them (cold start), and cannot explain why a
              recommendation was made.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px">
                  Matrix Factorization Decomposition
                </div>
                <div style="display: flex; align-items: center; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 16px; border-radius: 6px; text-align: center">
                    <strong>User-Item Matrix</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      480K × 17K
                      <br />
                      (99% sparse)
                    </div>
                  </div>
                  <div style="font-size: 24px; font-weight: bold">≈</div>
                  <div style="border: 2px solid; padding: 16px; border-radius: 6px; text-align: center">
                    <strong>User Vectors</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      480K × 64
                    </div>
                  </div>
                  <div style="font-size: 24px; font-weight: bold">×</div>
                  <div style="border: 2px solid; padding: 16px; border-radius: 6px; text-align: center">
                    <strong>Item Vectors</strong>
                    <div style="margin-top: 8px; font-size: 13px">64 × 17K</div>
                  </div>
                </div>
                <div style="margin-top: 12px; padding: 12px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 14px">
                  <strong>Prediction:</strong> user_vector · item_vector +
                  biases
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
                  Core insight: users who agreed in the past will agree in the
                  future. If 10,000 users who liked A also liked B, the 10,001st
                  user who likes A will probably like B too
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  No understanding needed: CF detects patterns in behavior
                  without knowing WHY users like things. Just matches patterns
                  across users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User-based: find similar users, recommend what they liked.
                  Item-based: find similar items to what you liked, recommend
                  those
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item-based is more common in production because item
                  similarities are stable (a movie stays similar to other
                  movies) while user preferences shift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Works because preferences cluster: sci-fi fans like similar
                  sci-fi, jazz listeners explore similar artists. Aggregate
                  patterns are stable even when individuals are noisy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The rating matrix is sparse: most users rate few items. CF
                  fills in the gaps by finding patterns across the known ratings
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
                  When asked about MF vs deep learning: explain that matrix
                  factorization remains highly effective for sparse interaction
                  data and is 10-100x faster to train than neural approaches.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For scalability questions: mention that k=64-128 dimensions is
                  typical; storage is (users + items) × k instead of users ×
                  items, enabling billion-scale systems.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing trade-offs: explain that MF captures linear
                  patterns efficiently but struggles with complex feature
                  interactions that deep models handle.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCollaborativeFilteringWhatIsCollaborativeFiltering;
