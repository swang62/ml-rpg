import type { Component } from "solid-js";

const LessonContentBasedFilteringTradeOffsWhenToChooseContentBasedVsCollaborativeVsHybrid: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade Offs: When to Choose Content Based vs Collaborative vs Hybrid
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
                When should you invest in content features versus relying on
                collaborative signals? The answer depends on catalog dynamics,
                data density, and cold start severity.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Content-Based Wins When
            </p>
            <p style="margin-top: 0">
              <strong>High item churn:</strong> If 20% of your catalog is new
              items weekly, collaborative signals lag. Content features provide
              immediate recommendations for new items.
            </p>
            <p>
              <strong>Rich item metadata:</strong> Products with detailed
              descriptions, images, and attributes give content models strong
              signal. News articles with full text can be embedded meaningfully.
            </p>
            <p>
              <strong>Explainability matters:</strong> Content features map to
              human concepts. "Recommended because you liked action movies" is
              clearer than "users like you also liked this."
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Collaborative Wins When
            </p>
            <p style="margin-top: 0">
              <strong>Dense interaction data:</strong> If average item has 100+
              interactions and average user has 50+ interactions, collaborative
              models learn strong patterns.
            </p>
            <p>
              <strong>Items hard to describe:</strong> Music taste, humor
              preferences, and aesthetic choices are hard to capture in
              features. Collaborative filtering learns them from behavior.
            </p>
            <p>
              <strong>Serendipity matters:</strong> Collaborative filtering can
              surface unexpected items that similar users liked. Content-based
              stays within the feature space of past preferences.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Content features require engineering
              effort to extract and maintain. Collaborative signals require
              interaction data to accumulate. Most systems need both, weighted
              by context.
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
                  CBF excels for new items and cold start (recommend
                  immediately), explainability needs (transparent similarity
                  justifications), and sparse domains with limited interaction
                  data.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CF excels for established items with rich history, serendipity
                  and cross-category discovery, and capturing behavioral
                  patterns that content signals miss.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approaches dominate production: content handles cold
                  start, collaborative provides personalization depth, blend
                  ratios tuned per use case.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Content features enable domain-specific similarity (audio for
                  music, visual for fashion, text for news); choose feature
                  extractors matching your content type.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade-off: content requires feature engineering and
                  maintenance; CF requires data volume; hybrids add complexity
                  but deliver best overall performance.
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
                  When asked about decision criteria: explain that sparse
                  domains (new platforms, niche content) need more content
                  weight, while established platforms with rich history lean
                  collaborative.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For interview depth: mention that content-based enables
                  explainability ("because you liked X genre") while
                  collaborative patterns are harder to interpret.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When discussing trade-offs: explain that content features
                  require maintenance (updating embeddings as content changes)
                  while collaborative signals are self-updating.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContentBasedFilteringTradeOffsWhenToChooseContentBasedVsCollaborativeVsHybrid;
