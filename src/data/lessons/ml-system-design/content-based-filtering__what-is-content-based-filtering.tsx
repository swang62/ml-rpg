import type { Component } from "solid-js";

const LessonContentBasedFilteringWhatIsContentBasedFiltering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Content-Based Filtering?
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
                <strong>Content-based filtering</strong> recommends items
                similar to what a user has liked based on item features. If you
                watched action movies with high-speed chases, the system
                recommends other action movies with high-speed chases. It
                analyzes item attributes, not user behavior patterns.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How It Differs From Collaborative Filtering
            </p>
            <p style="margin-top: 0">
              Collaborative filtering finds users similar to you and recommends
              what they liked. It does not need to know anything about item
              content. Content-based filtering is the opposite: it does not need
              to know about other users. It only needs to understand item
              attributes and match them to your expressed preferences.
            </p>
            <p>
              This distinction matters for cold start. A new item with zero
              interactions is invisible to collaborative filtering but perfectly
              visible to content-based systems. If the new item is an action
              movie, content-based immediately knows to recommend it to action
              movie fans.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Building A User Profile
            </p>
            <p style="margin-top: 0">
              The system learns what features you prefer by analyzing items you
              interacted with. If you rated 20 movies, extract their features:
              genres, directors, actors, keywords, production years. Aggregate
              these into a user profile vector. Simple approach: average the
              feature vectors of items you liked. More sophisticated: weight by
              rating strength or recency.
            </p>
            <p>
              This profile becomes your preference fingerprint. To recommend,
              compare all candidate items to your profile. Items with high
              similarity get recommended. Cosine similarity is common:
              user_profile · item_features / (magnitudes).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Content-based filtering solves
              item cold start but creates filter bubbles. Users only see items
              similar to what they already liked. No mechanism exposes them to
              diverse content unless you explicitly inject exploration.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">User History</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Watched action movies
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Build Profile Vector</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Aggregate item features
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">ANN Retrieval</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Top 1000 similar items
                  </div>
                  <div style="font-size: 12px">5–30ms P95</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Re Ranker</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Score 200 candidates
                  </div>
                  <div style="font-size: 12px">50–150ms P95</div>
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
                  Recommends items similar to what you liked based on item
                  features (genre, director, category, keywords), not on other
                  users behavior
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Only needs item features and your own history. Works for new
                  systems with few users or new users with no history
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  New items can be recommended immediately based on content,
                  even with zero interactions. CF cannot recommend items with no
                  data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explainable: "Recommended because you liked sci-fi movies" is
                  clear. CF can only say "users like you liked this"
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Works in sparse domains where few users overlap. If items can
                  be described with features, CBF works
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Limitation: can only recommend items similar to what you
                  already liked. Cannot discover cross-category surprises like
                  CF can
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
                  When asked about CBF vs CF: explain that content-based handles
                  cold start instantly (new items have features) while CF needs
                  interaction history, but CF captures preference patterns CBF
                  misses.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For feature extraction: mention multi-modal approaches - text
                  embeddings from transformers (768-1024 dims), image embeddings
                  from CNNs (512-2048 dims), combined into unified
                  representations.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing limitations: explain the serendipity problem -
                  CBF only recommends similar items, creating filter bubbles;
                  hybrid approaches add exploration.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContentBasedFilteringWhatIsContentBasedFiltering;
