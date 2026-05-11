import type { Component } from "solid-js";

const LessonContentBasedFilteringHybridRecommendationSystemsCombiningContentAndCollaborativeFiltering: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hybrid Recommendation Systems: Combining Content and Collaborative
            Filtering
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
                <strong>Hybrid systems</strong> combine multiple recommendation
                approaches to overcome individual weaknesses. Content-based
                handles cold start. Collaborative filtering captures behavioral
                patterns. Combining them yields better results than either
                alone.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Combination Strategies
            </p>
            <p style="margin-top: 0">
              <strong>Weighted combination:</strong> Score from both systems,
              combine with weights.{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                final_score = 0.6 × collab_score + 0.4 × content_score
              </code>
              . Tune weights on validation data. Simple but requires both
              systems to produce comparable score ranges.
            </p>
            <p>
              <strong>Switching:</strong> Use content-based for new users or
              items, collaborative otherwise. Route based on data availability.
              If user has fewer than 10 interactions, use content. If item has
              fewer than 20 ratings, use content.
            </p>
            <p>
              <strong>Feature augmentation:</strong> Use content features as
              input to collaborative model. The collaborative model learns from
              both behavior patterns and content signals. More complex but can
              capture interactions between content and behavior.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Hybrid Wins
            </p>
            <p style="margin-top: 0">
              Collaborative filtering excels when you have dense interaction
              data and items are hard to describe with features. Content-based
              excels for new items and users with clear preferences. Real
              catalogs have both scenarios: popular items with rich interaction
              history and long-tail items with few interactions.
            </p>
            <p>
              Hybrid systems adapt. Head items get ranked primarily by
              collaborative signals. Tail items get boosted by content
              similarity. New users see content-based recommendations until
              enough behavior is collected.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Pattern:</strong> In system design interviews,
              when asked "design a recommendation system", structure your
              answer: (1) clarify scale and cold start requirements, (2) propose
              hybrid architecture citing specific trade-offs, (3) explain how
              you would weight content vs collaborative based on user maturity.
              This shows you understand real-world constraints, not just
              algorithms.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; gap: 16px; justify-content: center">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; max-width: 240px">
                  <div style="text-align: center; margin-bottom: 8px">
                    <strong style="font-size: 14px">Content Based (CBF)</strong>
                  </div>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    <strong>Strengths:</strong>
                  </div>
                  <div style="font-size: 11px; margin-bottom: 8px">
                    • New item cold start
                    <br />• Explainability
                    <br />• Niche/long tail
                  </div>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    <strong>Weaknesses:</strong>
                  </div>
                  <div style="font-size: 11px">
                    • Overspecialization
                    <br />• Metadata dependency
                    <br />• Filter bubbles
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; max-width: 240px">
                  <div style="text-align: center; margin-bottom: 8px">
                    <strong style="font-size: 14px">Collaborative (CF)</strong>
                  </div>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    <strong>Strengths:</strong>
                  </div>
                  <div style="font-size: 11px; margin-bottom: 8px">
                    • Latent taste factors
                    <br />• Serendipity/discovery
                    <br />• Quality signals
                  </div>
                  <div style="font-size: 12px; margin-bottom: 6px">
                    <strong>Weaknesses:</strong>
                  </div>
                  <div style="font-size: 11px">
                    • New item/user cold start
                    <br />• Sparsity issues
                    <br />• Popularity bias
                  </div>
                </div>
              </div>
              <div style="text-align: center; margin-top: 12px; font-size: 20px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; margin-top: 12px; text-align: center">
                <strong style="font-size: 14px">Hybrid System</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Blends both signals for robustness
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
                  Five hybrid patterns: weighted blending (Score = w_cf × s_cf +
                  w_cb × s_cb), switching (rule or model based selection),
                  feature augmentation, cascade (CBF retrieval, CF ranking), and
                  meta-learning.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic weighting: new items receive 80%+ content weight,
                  established items shift to 80%+ collaborative weight, with
                  smooth transition over first 100-1000 interactions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two-tower behavioral embeddings enable retrieval from 100M+
                  items in tens of milliseconds; re-ranking then applies richer
                  features and context.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Precomputed item-to-item similarity from co-views and
                  co-purchases enables fast lookup, augmented with content
                  similarity for cold start items.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems run content and CF retrieval in parallel
                  (3-10ms each), merge candidate sets, then apply unified
                  ranking with blended scores.
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
                  When explaining hybrid designs: describe the three patterns -
                  early fusion (combine features before model), late fusion
                  (blend model outputs), and cascade (CBF retrieves, CF ranks).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For weighting strategies: explain dynamic blending - new items
                  get 80% content weight, established items get 80%
                  collaborative weight, with smooth transition over first
                  100-1000 interactions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about implementation: mention that late fusion is
                  simplest (weighted score combination) while early fusion
                  requires unified embedding spaces.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContentBasedFilteringHybridRecommendationSystemsCombiningContentAndCollaborativeFiltering;
