import type { Component } from "solid-js";

const LessonNewsfeedTimelineHybridPushPullPatternForCelebrityHotspotMitigation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hybrid Push Pull Pattern for Celebrity Hotspot Mitigation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Hybrid fanout combines push and pull by maintaining a per author
            mode flag based on follower count or write rate. Normal users (below
            a threshold, typically a few thousand followers) receive push based
            fanout where posts are written to all follower timelines
            immediately. Celebrity accounts exceeding the threshold are excluded
            from push; their posts are written only to an author specific feed
            and pulled at read time, then merged with the user's precomputed
            timeline. This prevents write storms while preserving fast cached
            reads for the majority. The threshold acts as a circuit breaker.
            When user A crosses 5,000 followers, the system flips A's fanout
            mode to pull only. A's next post writes once to A's author feed
            instead of fanning out to 5,000+ caches. When follower B requests
            their home feed, the read path detects that B follows celebrity A,
            fetches A's recent posts from the author feed, merges them with B's
            precomputed (pushed) content from non celebrity followees, ranks the
            combined set, and returns the result. This trades a small read
            latency increase (a few extra fetches and a merge step) for massive
            write cost savings. Production systems like Twitter style platforms
            report handling 6,000 writes per second and 300,000 reads per second
            using this hybrid approach. Without the hybrid, a single celebrity
            post to 10 million followers would generate 10 million fanout
            writes, overwhelming queues and violating the 5 second propagation
            SLA. With hybrid, that same post triggers one write and 10 million
            eventual reads distribute the merge cost over time and across the
            read fleet. Key challenges include dynamic threshold tuning (too low
            wastes push benefits, too high allows hotspots), merge complexity
            (maintaining stable cursors across pushed and pulled sources), and
            consistency (celebrity posts may appear slightly delayed compared to
            pushed content). Monitoring follower count distributions and write
            rate histograms guides threshold placement; typically the top 1% of
            accounts by follower count are switched to pull.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Normal User Post</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      3K followers
                    </div>
                  </div>
                  <div style="font-size: 18px; font-weight: bold; text-align: center">
                    ↓ PUSH
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Fanout to 3K caches</strong>
                    <div style="margin-top: 2px">3K writes</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Read: O(1)</strong>
                    <div style="margin-top: 2px">1 ms from cache</div>
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Celebrity Post</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      8M followers
                    </div>
                  </div>
                  <div style="font-size: 18px; font-weight: bold; text-align: center">
                    ↓ SKIP PUSH
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Write to author feed</strong>
                    <div style="margin-top: 2px">1 write only</div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 12px">
                    <strong>Read: fetch + merge</strong>
                    <div style="margin-top: 2px">+10 ms merge cost</div>
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
                  Dynamic threshold commonly set at a few thousand followers;
                  accounts exceeding threshold switch from push to pull,
                  preventing millions of writes per post while preserving fast
                  reads for 99% of users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Write cost reduction: celebrity post to 10 million followers
                  drops from 10 million fanout writes to 1 author feed write;
                  read cost increases by merge latency (typically 10 to 50 ms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Merge complexity at read time: system fetches precomputed
                  pushed timeline plus recent posts from each celebrity
                  followee, ranks combined set, and maintains stable pagination
                  cursors across sources
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Threshold tuning tradeoff: setting too low (e.g., 1,000
                  followers) increases read latency unnecessarily; too high
                  (e.g., 50,000) allows write hotspots; monitor p99 out degree
                  and write queue depth to calibrate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistency relaxation: celebrity posts may appear slightly
                  delayed in feeds compared to pushed content due to cache
                  timing; eventual consistency within seconds is acceptable for
                  most social products
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production example: Twitter style system with 6,000 writes per
                  second and 300,000 reads per second uses hybrid to handle top
                  1% of accounts by follower count, avoiding queue saturation
                  and meeting 5 second propagation SLA
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
                  User with 4,000 followers posts: system applies push fanout,
                  writing to 4,000 follower caches in under 2 seconds; followers
                  read from cache with 1 ms latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Celebrity with 12 million followers posts: system writes once
                  to celebrity's author feed; when follower requests timeline,
                  read path fetches celebrity's recent 20 posts, merges with
                  precomputed timeline from other followees, ranks, and returns
                  in 15 ms (10 ms merge overhead)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Threshold boundary: account grows from 4,500 to 5,100
                  followers; system detects threshold crossing, flips fanout
                  mode to pull, and subsequent posts skip push entirely, saving
                  5,100 writes per post
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNewsfeedTimelineHybridPushPullPatternForCelebrityHotspotMitigation;
