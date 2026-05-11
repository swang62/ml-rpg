import type { Component } from "solid-js";

const LessonRankingFeatureEngineeringMultiResolutionTimeWindowsAndFeatureFreshness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Multi Resolution Time Windows and Feature Freshness
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
                <strong>Multi-resolution time windows</strong> compute the same
                behavioral metric (like click rate) across multiple time
                horizons simultaneously. The model learns when to trust each
                window: short windows catch trends, long windows provide
                stability.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Single Windows Fail
            </p>
            <p style="margin-top: 0">
              A single time window forces a trade-off. Long windows (30 days)
              give stable estimates but miss trends: an item going viral today
              still shows last month's low click rate. Short windows (1 hour)
              catch trends but are noisy: a single click on 10 impressions gives
              10% CTR that means nothing. Production systems compute both and
              let the model learn the right blend.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Typical Window Pattern
            </p>
            <p style="margin-top: 0">
              For item CTR, compute 5 windows: 1 hour, 6 hours, 1 day, 7 days,
              30 days. Optionally add exponential decay versions with half-lives
              of 3 hours and 3 days to balance recency with history. At serving
              time, retrieve all windows together. The ranker learns that 1-hour
              CTR matters for breaking news; 30-day CTR matters for stable
              catalog items. This weighting emerges from training data, not
              manual rules.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Freshness Requirements by Domain
            </p>
            <p style="margin-top: 0">
              Breaking news search needs query signals within minutes.
              E-commerce needs inventory availability within 1-5 minutes to
              avoid promoting out-of-stock items. Video platforms can tolerate
              10-30 minute lag because video popularity changes gradually. The
              right freshness depends on how fast your items change and how much
              users notice stale rankings.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Infrastructure Trade-offs
            </p>
            <p style="margin-top: 0">
              Near real-time features require streaming pipelines that maintain
              rolling aggregates, writing updates to an online feature store at
              high throughput (100K+ writes/second). Refreshing engagement
              features every 10 minutes instead of hourly can improve CTR by
              2-3% but doubles compute cost. For stable catalogs, daily batch
              updates may suffice, saving operational complexity. The decision
              comes down to: how much does freshness improve your specific
              ranking quality, and is that worth the infrastructure cost?
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Item CTR Multi Resolution Features
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 700; font-size: 12px">
                    1 hour
                  </div>
                  <div style="font-size: 11px">CTR: 0.18 (trending spike)</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 700; font-size: 12px">
                    1 day
                  </div>
                  <div style="font-size: 11px">CTR: 0.14 (recent avg)</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 700; font-size: 12px">
                    7 days
                  </div>
                  <div style="font-size: 11px">CTR: 0.11 (stable baseline)</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 700; font-size: 12px">
                    30 days
                  </div>
                  <div style="font-size: 11px">
                    CTR: 0.09 (long term quality)
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 8px; border-radius: 4px; font-size: 11px; text-align: center">
                  <strong>Model learns:</strong> Trust 1h for news, 30d for
                  catalog
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
                  Single time windows force a trade-off: long windows miss
                  trends, short windows are noisy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compute 5+ windows per metric (1hr, 6hr, 1d, 7d, 30d) plus
                  exponential decay versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model learns when to weight each window: 1-hour for trending,
                  30-day for stable items
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness requirements vary: news needs minutes, video
                  tolerates 30 minutes, catalog items need daily
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Near real-time features double compute cost but can improve
                  CTR 2-3%; worth it depends on domain
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
                  Explain the single-window dilemma: long windows miss trends,
                  short windows are noisy; multi-resolution solves both
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  List specific windows: 1hr, 6hr, 1d, 7d, 30d for a behavioral
                  metric like CTR
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Frame freshness as a cost/benefit: 10-minute refresh costs 2x
                  compute but gains 2-3% CTR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRankingFeatureEngineeringMultiResolutionTimeWindowsAndFeatureFreshness;
