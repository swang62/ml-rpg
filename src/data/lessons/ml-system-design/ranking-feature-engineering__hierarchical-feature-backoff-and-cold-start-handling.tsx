import type { Component } from "solid-js";

const LessonRankingFeatureEngineeringHierarchicalFeatureBackoffAndColdStartHandling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hierarchical Feature Backoff and Cold Start Handling
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
                <strong>Hierarchical backoff</strong> handles entities with
                sparse data by falling back through progressively broader
                aggregations: user → segment → global, or item → category →
                global.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Cold Start Problem
            </p>
            <p style="margin-top: 0">
              New users and new items lack historical data. Features like user
              CTR or item conversion rate are undefined or based on tiny samples
              with high variance. A user with 3 impressions and 1 click has "33%
              CTR" that means almost nothing. Over-relying on historical
              features creates a death spiral: entities with no history get poor
              scores, never get exposure, never accumulate data, stay poorly
              scored forever.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              User Feature Backoff
            </p>
            <p style="margin-top: 0">
              If a user has fewer than 50 impressions, don't trust their
              personal CTR. Fall back to their demographic segment (same age
              range, region). If the segment also has insufficient data, fall
              back to global average. Use smooth blending based on sample size:
              a user with 10 impressions gets 20% weight on personal CTR, 80% on
              segment CTR. A user with 1,000 impressions gets 95% personal, 5%
              segment. This is Bayesian shrinkage toward a prior.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Item Feature Backoff
            </p>
            <p style="margin-top: 0">
              New products with zero sales use category conversion rate.
              Products with 5 sales blend observed rate with category prior.
              Also rely heavily on content features that don't require
              behavioral history: compute item embeddings (numerical vectors
              capturing meaning) from titles, descriptions, images. New items
              immediately have embeddings that capture similarity to existing
              items, allowing the ranker to generalize.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Exploration for Cold Start
            </p>
            <p style="margin-top: 0">
              Backoff alone isn't enough. Allocate 10-15% of impressions
              specifically for new or underexplored entities, even if predicted
              scores are lower. This ensures new items collect initial
              engagement data within days. The cost is 2-4% immediate
              engagement, but it prevents the catalog from ossifying around
              incumbents and enables long-term diversity and supply growth.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Hierarchical Feature Backoff for User CTR
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    User Level (1000+ impressions)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    CTR: 0.15 (95% weight)
                    <br />
                    Segment CTR: 0.12 (5% weight)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Segment Level (10 to 50 impressions)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    User CTR: 0.18 (20% weight)
                    <br />
                    Segment CTR: 0.12 (80% weight)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Global Level (fewer than 10 impressions)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Global CTR: 0.11 (100% weight)
                    <br />
                    Supplement with content features
                  </div>
                </div>
                <div style="margin-top: 4px; padding: 10px; border-radius: 4px; font-size: 11px; text-align: center">
                  <strong>Bayesian shrinkage:</strong> Blend toward prior based
                  on sample size
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
                  Cold start creates a death spiral: no history → poor scores →
                  no exposure → no data → stays poorly scored
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User backoff: personal CTR (if 50+ impressions) → segment CTR
                  → global CTR, with Bayesian shrinkage blending
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Item backoff: item conversion rate → category rate → global
                  rate, plus content-based embeddings for new items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Smooth blending based on sample size: 10 impressions = 20%
                  personal / 80% prior; 1000 impressions = 95% personal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exploration (10-15% of impressions for new items) is essential
                  to escape cold start at 2-4% engagement cost
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
                  Explain the cold start death spiral: no data → poor ranking →
                  no exposure → no data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Give specific blending weights: 10 impressions = 20% personal,
                  1000 impressions = 95% personal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that content embeddings (from titles, images) provide
                  immediate similarity signals for new items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRankingFeatureEngineeringHierarchicalFeatureBackoffAndColdStartHandling;
