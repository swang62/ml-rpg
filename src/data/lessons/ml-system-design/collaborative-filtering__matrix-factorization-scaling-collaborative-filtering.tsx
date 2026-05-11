import type { Component } from "solid-js";

const LessonCollaborativeFilteringMatrixFactorizationScalingCollaborativeFiltering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Matrix Factorization: Scaling Collaborative Filtering
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Matrix factorization</strong> decomposes the sparse
                user-item rating matrix into two smaller dense matrices: user
                factors and item factors. The dot product of a user vector and
                item vector predicts the rating. This compresses millions of
                sparse entries into thousands of dense parameters.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How It Works
            </p>
            <p style="margin-top: 0">
              Represent each user as a vector of K dimensions (typically
              50-200). Represent each item as a vector of the same K dimensions.
              The predicted rating is the dot product: rating(u,i) =
              user_vector[u] · item_vector[i]. With 100K users and 10K items,
              instead of storing 1 billion potential ratings, you store 100K×K +
              10K×K parameters.
            </p>
            <p>
              Training adjusts user and item vectors so that predictions match
              observed ratings. Use gradient descent: for each known rating,
              compute the prediction error, then update both vectors to reduce
              error. After millions of updates across all known ratings, the
              vectors encode latent preferences that generalize to unrated
              items.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Latent Factors
            </p>
            <p style="margin-top: 0">
              Each dimension captures some latent concept. For movies,
              dimensions might correlate with "action vs drama", "serious vs
              funny", or "mainstream vs indie". The model discovers these
              automatically. A user with high values in certain dimensions
              prefers items with high values in those same dimensions.
            </p>
            <p>
              You do not label or interpret the dimensions. They emerge from
              optimization. After training, you can sometimes interpret them by
              looking at which items score highest on each dimension, but this
              is not guaranteed.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Interview Tip:</strong> When asked about collaborative
              filtering at scale, immediately mention matrix factorization.
              Nearest-neighbor methods struggle beyond 10K users. Matrix
              factorization scales to millions because prediction is a single
              dot product, and training is embarrassingly parallel across
              observed ratings.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 10px; text-align: center">
                    ALS (Batch)
                  </div>
                  <div style="font-size: 13px; line-height: 1.7">
                    <strong>Parallelism:</strong> Embarrassingly parallel
                    <br />
                    <strong>Convergence:</strong> 10-20 iterations
                    <br />
                    <strong>Update:</strong> Daily/hourly retrain
                    <br />
                    <strong>Loss:</strong> Squared error only
                    <br />
                    <strong>Scale:</strong> Billions of interactions
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 10px; text-align: center">
                    SGD (Online)
                  </div>
                  <div style="font-size: 13px; line-height: 1.7">
                    <strong>Parallelism:</strong> Harder (conflicts)
                    <br />
                    <strong>Convergence:</strong> Careful tuning
                    <br />
                    <strong>Update:</strong> Real time per interaction
                    <br />
                    <strong>Loss:</strong> Any differentiable
                    <br />
                    <strong>Freshness:</strong> Milliseconds
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 13px">
                <strong>Hybrid production pattern:</strong> ALS nightly batch +
                SGD online user updates
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
                  Problem: comparing 10M users directly requires 100 trillion
                  similarity computations. Does not scale.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Solution: represent each user and item as a small vector (128
                  numbers). Similarity = dot product of vectors. Fast and
                  scalable.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The 128 dimensions are hidden preferences learned from data:
                  maybe dim 1 = likes action, dim 2 = prefers long films. Model
                  learns these without labels
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prediction: user vector dot-product item vector. Alice [0.5,
                  0.3, ...] · Matrix [0.8, 0.2, ...] = predicted rating
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training: start with random vectors, predict known ratings,
                  measure error, adjust vectors to reduce error. Repeat millions
                  of times until vectors reconstruct known ratings well
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compression: 10T cell matrix becomes 1.4B numbers (10M×128
                  user vectors + 1M×128 item vectors). Can predict any of 10T
                  cells with one dot product
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
                  When explaining ALS: describe the alternating optimization -
                  fix users, solve for items (closed-form least squares), then
                  fix items, solve for users. Repeat 10-20 iterations.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For distributed training: explain that ALS parallelizes
                  naturally - each user/item update is independent given the
                  other matrix, enabling 100+ machine clusters.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about convergence: mention that ALS typically
                  converges in 10-20 iterations, with each iteration taking
                  O(nnz × k²) time where nnz is number of non-zero interactions.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCollaborativeFilteringMatrixFactorizationScalingCollaborativeFiltering;
