import type { Component } from "solid-js";

const LessonNewsfeedTimelineRankingPersonalizationAndMergeStrategies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Ranking, Personalization, and Merge Strategies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Separating delivery from ranking is foundational in production
            timeline systems. The delivery layer (push or pull) provides a
            rolling window of candidate post IDs, typically 500 to 800 items per
            user. Ranking runs on top of this delivered set, applying filters
            (privacy, mutes, language), scoring by recency and affinity, and
            running Machine Learning (ML) models to predict engagement. Final
            output is a ranked page of 20 to 50 posts optimized for relevance
            rather than strict chronological order. Merge strategies differ by
            pattern. In push systems, ranking operates on a precomputed list
            fetched from cache in 1 millisecond; the ranking step adds 10 to 50
            milliseconds for scoring and reordering. In pull systems, merge
            happens after fetching recent posts from each followee: the system
            must interleave and deduplicate streams, apply filters, then rank.
            Hybrid systems merge precomputed (pushed) content with celebrity
            (pulled) content before ranking, requiring stable cursors that
            encode position across both sources to enable pagination without
            duplicates or skips. Deeper personalization increases read latency.
            Expanding candidate sets from 500 to 5,000 items or adding feature
            rich ML models can push latency beyond 2 second SLOs. Production
            systems balance depth and speed by prefiltering with lightweight
            heuristics (e.g., remove posts older than 7 days, apply block and
            mute lists), then running heavier ML scoring on a reduced set.
            Diversity rules interleave sources (friends, topics, ads) and
            prevent over representation from any single author. Cursor stability
            is critical for pagination. Opaque cursors encode a watermark
            (timestamp plus post ID) that marks the user's position in the
            ranked feed. Concurrent inserts (new posts arriving while user
            scrolls) must not cause duplicates or gaps. Idempotent merge logic
            and monotonic sequence numbers per user timeline ensure that cursors
            remain valid even under eventual consistency and retries.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Delivery Layer</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    500 candidate post IDs
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Prefilter</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Privacy, mutes, recency → 200 items
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>ML Ranking</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Affinity score, engagement prediction
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Final Page</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Top 50 ranked posts
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
                  Delivery provides candidate set of 500 to 800 post IDs;
                  ranking layer filters, scores, and reorders on top; separation
                  allows independent optimization of delivery speed and ranking
                  depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prefiltering with lightweight heuristics (privacy checks, mute
                  lists, recency cutoffs) reduces candidate set before expensive
                  Machine Learning (ML) scoring; cuts ranking latency from 200
                  ms to under 50 ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Merge complexity in hybrid systems: interleave precomputed
                  pushed content with pulled celebrity posts, rank combined set,
                  and maintain stable pagination cursors encoding timestamp plus
                  post ID watermark
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deeper personalization tradeoff: expanding candidate set from
                  500 to 5,000 or adding feature rich models improves relevance
                  but can exceed 2 second Service Level Objective (SLO);
                  production systems limit candidate size and model complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Diversity rules enforce interleaving: prevent single author
                  dominating feed, mix friend posts with topic suggestions and
                  ads, apply fairness constraints to improve user experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cursor stability requires idempotent merge and monotonic
                  sequence numbers; concurrent inserts during pagination must
                  not produce duplicates or skip posts under eventual
                  consistency
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
                  Facebook Multifeed prefilters 10,000 candidates down to 500
                  using recency and privacy checks in 20 ms, then applies ML
                  ranking with affinity scores in 80 ms, returning top 50 posts
                  within 2 second SLO
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid system merges 400 pushed post IDs with 50 pulled
                  celebrity post IDs, applies unified ranking scoring all 450,
                  and returns top 30; opaque cursor encodes (timestamp:
                  1678901234, postID: 78901) for stable pagination
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User scrolls feed and requests next page; cursor (timestamp:
                  1678900000, postID: 78800) is passed to ranking service, which
                  fetches candidates newer than cursor, scores, and returns next
                  20 posts without duplicates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production system limits candidate expansion to 1,000 items
                  per user to stay under 50 ms ranking budget; users following
                  5,000 accounts see top 1,000 recent posts only, trading
                  completeness for latency
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNewsfeedTimelineRankingPersonalizationAndMergeStrategies;
