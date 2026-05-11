import type { Component } from "solid-js";

const LessonCollaborativeFilteringTradeOffsWhenToUseCollaborativeFiltering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: When to Use Collaborative Filtering
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Question
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                When should you use collaborative filtering versus content-based
                or hybrid approaches? The answer depends on data availability,
                cold start tolerance, and explainability requirements.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Collaborative Filtering Wins When
            </p>
            <p style="margin-top: 0">
              <strong>You have rich interaction data:</strong> CF needs
              thousands of ratings per item to learn stable preferences. If your
              average item has 10+ interactions and average user has 20+
              interactions, CF can find meaningful patterns. Sparse data means
              noisy predictions.
            </p>
            <p>
              <strong>Content features are weak:</strong> If items are hard to
              describe with features (like music or art), CF excels because it
              learns purely from behavioral patterns. The model does not need to
              understand why users like something, just that similar users have
              similar tastes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Collaborative Filtering Loses When
            </p>
            <p style="margin-top: 0">
              <strong>Cold start dominates:</strong> New items with zero
              interactions get random recommendations. New users with no history
              get generic results. If 30% of your traffic is new users or 20% of
              items are new, pure CF fails badly.
            </p>
            <p>
              <strong>You need explainability:</strong> CF cannot explain why it
              recommended something in human terms. "Users like you also liked
              this" is the best you can do. If regulatory or UX requirements
              demand clear reasoning, content-based is better.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Use collaborative filtering as
              one signal in a hybrid system. CF captures behavioral patterns,
              content-based handles cold start, and a ranking model combines
              them. Pure CF is rarely optimal in production.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Cold Start</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    <strong>Problem:</strong> New user/item = no embedding
                    <br />
                    <strong>Symptom:</strong> Zero scores, random recs
                    <br />
                    <strong>Fix:</strong> Content init, popularity fallback, 3-5
                    interaction warm start
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Popularity Bias</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    <strong>Problem:</strong> Mainstream dominates, long tail
                    buried
                    <br />
                    <strong>Symptom:</strong> Low diversity, feedback loops
                    <br />
                    <strong>Fix:</strong> Diversity caps, exploration budget,
                    fairness constraints
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Temporal Drift</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    <strong>Problem:</strong> Tastes shift, new items, trends
                    <br />
                    <strong>Symptom:</strong> CTR decay, stale recs
                    <br />
                    <strong>Fix:</strong> Daily item retrain, real time user
                    updates, time decay weights
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
                  CF strength: discovers non-obvious patterns. Can recommend
                  jazz to someone who never searched for it because their
                  behavior matches jazz fans
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CF strength: no item understanding needed. Works when content
                  is hard to describe (music, art) or too diverse to catalog
                  (billions of UGC videos)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CF strength: captures nuance between items with identical
                  tags. If fans of Movie A dislike Movie B despite both being
                  sci-fi action, CF learns this
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CF weakness: cold start. New users get poor recs, new items
                  never surface. Fundamental limitation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CF weakness: popularity bias creates feedback loops. Popular
                  items get recommended more, become more popular, niche items
                  struggle
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision: &lt;10K interactions = content-based. 100K+ = CF
                  likely wins. 1M+ = CF almost always worth it. Most production
                  systems combine both
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
                  When asked about cold start solutions: explain initializing
                  new items as average of similar items (by content features) or
                  using side information to compute initial embeddings.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For temporal drift: mention that models trained on old data
                  degrade 1-5% weekly as user preferences and item distributions
                  shift; daily/weekly retraining is standard.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing hybrid approaches: explain that content
                  features can bootstrap cold items while collaborative signals
                  take over after sufficient interactions accumulate.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCollaborativeFilteringTradeOffsWhenToUseCollaborativeFiltering;
