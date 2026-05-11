import type { Component } from "solid-js";

const LessonCollaborativeFilteringHowCollaborativeFilteringWorks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Collaborative Filtering Works
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
                The rating matrix has users as rows and items as columns. Most
                cells are empty (unrated). Collaborative filtering fills in
                these empty cells by finding patterns: similar users rate items
                similarly, and similar items get rated similarly by the same
                users.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Computing User Similarity
            </p>
            <p style="margin-top: 0">
              Take two users and look at items they both rated. If both rated 20
              items in common, compute how correlated their ratings are. Common
              measures: Pearson correlation (how much ratings move together),
              cosine similarity (angle between rating vectors), or Jaccard
              similarity (overlap in items rated positively).
            </p>
            <p>
              Pearson correlation is popular because it handles rating bias. If
              user A rates everything 1 point higher than user B on average,
              Pearson still detects they have similar tastes because it measures
              correlation, not absolute agreement. Cosine similarity is faster
              to compute and works well when ratings are normalized.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Making Predictions
            </p>
            <p style="margin-top: 0">
              To predict user U rating for item I: (1) Find the K most similar
              users to U who have rated item I. (2) Take a weighted average of
              their ratings, weighted by similarity. If the 5 most similar users
              rated the item 4, 5, 4, 5, 3 and their similarity scores are 0.9,
              0.8, 0.85, 0.75, 0.7, the prediction is (4*0.9 + 5*0.8 + 4*0.85 +
              5*0.75 + 3*0.7) / (0.9+0.8+0.85+0.75+0.7) = 4.19.
            </p>
            <p>
              Choosing K matters. Too small (K=5) makes predictions noisy
              because a single unusual neighbor dominates. Too large (K=100)
              dilutes signal with weakly similar users. Most systems use
              K=20-50. Production systems tune K on held-out validation data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Item-Based Alternative
            </p>
            <p style="margin-top: 0">
              Instead of finding similar users, find similar items. To predict
              user U rating for item I: (1) Find items similar to I that U has
              already rated. (2) Weighted average of those ratings by item
              similarity. If U rated items J, K, L with ratings 5, 4, 5, and
              their similarities to I are 0.85, 0.6, 0.9, prediction = (5*0.85 +
              4*0.6 + 5*0.9) / (0.85+0.6+0.9) = 4.68.
            </p>
            <p>
              Item similarities are precomputed offline. This makes prediction
              fast: just look up precomputed similarities and do weighted
              averaging. User-based requires computing similarities at request
              time or maintaining a constantly updating cache. For catalogs with
              millions of items, item-based is typically more practical.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Question:</strong> "Why use item-based over
              user-based?" Answer: Item similarities are more stable (items do
              not change preferences), can be precomputed offline, and scale
              better. User preferences evolve with every new rating, making
              user-based neighborhoods unstable. Item-based was the breakthrough
              that made collaborative filtering practical at scale.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 10px; text-align: center">
                    Explicit Feedback
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    <strong>Signal:</strong> 1-5 star ratings
                    <br />
                    <strong>Missing = </strong> Unknown
                    <br />
                    <strong>Objective:</strong> Minimize RMSE on observed
                    ratings only
                    <br />
                    <strong>Metric:</strong> RMSE, MAE
                    <br />
                    <strong>Example:</strong> Netflix Prize (0.8567 RMSE)
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 10px; text-align: center">
                    Implicit Feedback
                  </div>
                  <div style="font-size: 13px; line-height: 1.6">
                    <strong>Signal:</strong> Plays, clicks, watch time
                    <br />
                    <strong>Missing = </strong> Low confidence positive
                    <br />
                    <strong>Objective:</strong> Weighted loss over all entries
                    <br />
                    <strong>Metric:</strong> Recall@K, NDCG@K
                    <br />
                    <strong>Example:</strong> Spotify plays (CTR lift)
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
                  Starts with a user-item matrix: rows are users, columns are
                  items, cells are interactions (ratings, clicks, views). Most
                  cells empty: 10M users × 1M items = 10T cells, but only
                  ~0.00001% filled
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User-based: find similar users by comparing overlapping
                  ratings (cosine similarity or Pearson correlation), then
                  recommend what similar users liked
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prediction formula: weighted average of similar users ratings.
                  Bob (sim 0.9) rates 5, Carol (sim 0.6) rates 4 → predict
                  (0.9×5 + 0.6×4)/(0.9+0.6) = 4.6
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item-based: find similar items (items rated similarly by same
                  users), recommend items similar to what you liked. Can
                  precompute since item similarities are stable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cosine similarity: treat ratings as vectors, compute angle.
                  Pearson correlation: how ratings move together after adjusting
                  for each users average
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item-based preferred in production: item similarities computed
                  once and cached, user similarities must be recomputed as users
                  add ratings
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
                  When asked about data sources: explain that implicit signals
                  (views, clicks, plays) are 100-1000x more abundant than
                  explicit ratings, making them essential for production
                  systems.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For confidence weighting: mention the formula c = 1 +
                  α×interactions (α typically 40), which weights repeated
                  behaviors higher without ignoring single interactions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing label quality: explain that explicit ratings
                  are cleaner signals but suffer from selection bias (users only
                  rate items they choose to engage with).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCollaborativeFilteringHowCollaborativeFilteringWorks;
