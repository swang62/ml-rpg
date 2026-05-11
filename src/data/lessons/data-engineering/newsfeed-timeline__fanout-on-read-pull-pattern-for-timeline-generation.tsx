import type { Component } from "solid-js";

const LessonNewsfeedTimelineFanoutOnReadPullPatternForTimelineGeneration: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Fanout on Read (Pull Pattern) for Timeline Generation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Fanout on read assembles a user's timeline on demand at read time by
            fetching recent posts from each account they follow, then merging
            and ranking the results. When user B requests their home feed, the
            system expands B's follow list, queries per author stores or a
            global recent index for the latest posts from each followee, applies
            privacy filters (blocks, mutes), and runs ranking algorithms to
            produce a personalized page. All computation happens on the read
            path. This pattern eliminates write amplification entirely. Posting
            is a constant time operation that writes once to the author's own
            feed, regardless of follower count. A celebrity with 10 million
            followers incurs the same write cost as a user with 10 followers.
            This makes pull based systems ideal for handling high degree nodes
            and avoiding write hotspots that plague push systems. Facebook's
            Multifeed architecture exemplifies this approach, prioritizing
            relevance and personalization over strict chronological ordering.
            The tradeoff is read amplification and latency. Generating a feed
            for a user following 1,000 accounts requires fetching and merging
            1,000 recent post streams. At peak traffic (hundreds of thousands of
            Queries Per Second (QPS)), this multiplies compute load and can push
            read latency beyond acceptable bounds, especially when deep ranking
            models are applied. Pull systems must carefully cache merged results
            and limit candidate set sizes to meet Service Level Objectives
            (SLOs) like sub 2 second feed retrieval. Pull works best when users
            follow many accounts, when personalization depth matters more than
            instant propagation, and when inactive users dominate (no wasted
            fanout work). The pattern scales write throughput naturally but
            requires robust caching, efficient graph expansion, and lightweight
            ranking to control read path costs.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>User B Requests Feed</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Follows 1,000 accounts
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Graph Expansion</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Fetch B's 1,000 followees
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Author A Feed</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Fetch recent 20
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Author C Feed</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Fetch recent 20
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">... 998 more</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      20K posts fetched
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Merge, Filter, Rank</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Return top 50 posts
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
                  Eliminates write amplification: posting is constant time
                  regardless of follower count; celebrity with 10 million
                  followers writes once, same cost as user with 10 followers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Read amplification scales with follow count: user following
                  1,000 accounts triggers 1,000 per author fetches plus merge
                  and ranking; compute cost concentrates on read path
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ideal for dense social graphs and personalization: Facebook
                  Multifeed uses pull to apply Machine Learning (ML) ranking
                  over large candidate sets, trading read latency for relevance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Read latency challenges at scale: assembling feeds for users
                  following thousands of accounts can exceed 2 second SLOs;
                  requires aggressive caching of merged results and candidate
                  set limits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Thundering herd failure mode: synchronized reads during
                  breaking news cause Central Processing Unit (CPU) spikes from
                  parallel graph expansions; mitigated by per user home cache
                  and request coalescing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best for inactive user bases: avoids wasting fanout work on
                  users who rarely read; pull only computes when user actually
                  requests feed, saving resources
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
                  Facebook Multifeed expands user's social graph at read time,
                  fetches recent actions from friends and pages, applies ML
                  ranking for relevance, and serves results within 2 second SLO
                  by caching intermediate candidate sets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User following 500 accounts requests feed: system fetches top
                  20 recent posts from each author (10,000 candidates), applies
                  privacy filters, ranks by affinity score, and returns top 50
                  in under 1.5 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Celebrity posts once to own feed (single write); 10 million
                  followers who read later each trigger a pull that fetches and
                  merges celebrity's recent posts with other followees,
                  distributing read cost over time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNewsfeedTimelineFanoutOnReadPullPatternForTimelineGeneration;
