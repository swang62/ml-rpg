import type { Component } from "solid-js";

const LessonNewsfeedTimelineFanoutOnWritePushPatternForTimelineGeneration: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Fanout on Write (Push Pattern) for Timeline Generation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Fanout on write precomputes each follower's home feed immediately
            when a post is created. When user A posts, the system fetches all of
            A's followers from the social graph and writes the new post ID into
            each follower's precomputed timeline cache. This shifts
            computational cost entirely to the write path, producing
            exceptionally fast reads that simply retrieve a prebuilt list from
            memory. This pattern excels in read heavy workloads where the read
            to write ratio approaches 100:1. Twitter style systems targeting sub
            millisecond p50 read latency (around 1 ms from cache, 4 ms p95) rely
            heavily on this approach for non celebrity users. The precomputed
            timelines typically store 500 to 800 post IDs per user in sharded in
            memory caches with 3x replication to minimize tail latency. The
            fundamental tradeoff is write amplification. Each post triggers
            writes proportional to the author's follower count. A user with
            10,000 followers generates 10,000 cache writes per post. For
            celebrities with millions of followers, a single post can trigger
            millions of fanout writes, creating hotspots that saturate fanout
            workers, spike queue depths, and blow through network bandwidth
            budgets across data centers. Production systems set thresholds
            (commonly a few thousand followers) beyond which authors are
            excluded from push fanout. These high degree accounts switch to pull
            based delivery, where their content is fetched and merged at read
            time instead. This hybrid approach prevents write storms while
            preserving fast cached reads for the majority of users.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>User A Creates Post</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Post ID: 78901
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong>Fanout Worker</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Fetches A's 10,000 followers
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 8px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; min-width: 110px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Follower B Cache</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Insert 78901
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; min-width: 110px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Follower C Cache</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Insert 78901
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; min-width: 110px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">... 9,998 more</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Total writes: 10K
                    </div>
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
                  Optimizes for read heavy workloads with 100:1 read to write
                  ratios; achieves 1 ms p50 and 4 ms p95 cached read latency by
                  eliminating compute on the read path
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Write amplification equals follower count: posting to 10,000
                  followers generates 10,000 cache writes; scales linearly with
                  social graph out degree
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory footprint of 500 to 800 post IDs per user with 3x
                  replication; at tens of KB per user this totals terabytes of
                  RAM across hundreds of millions of users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Celebrity hotspot failure mode: a single post from an account
                  with 10 million followers triggers 10 million writes,
                  saturating fanout queues and causing propagation Service Level
                  Agreement (SLA) violations beyond 5 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid threshold commonly set around a few thousand followers;
                  accounts exceeding this are excluded from push and switched to
                  pull based merging at read time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Precomputed timelines enable sub 5 second propagation SLAs for
                  normal users but require durable fanout logs and idempotent
                  writes to prevent duplicates under retries
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
                  Twitter style system handling 6,000 writes per second and
                  300,000 reads per second uses push fanout for 99% of users,
                  storing timelines in Redis clusters sharded by consistent
                  hashing with 3x replication
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When a user with 5,000 followers posts, the fanout pipeline
                  batches 5,000 writes across sharded cache nodes, completing
                  propagation in under 2 seconds and hitting the 5 second SLA
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Celebrity with 8 million followers is flagged at write time;
                  post skips fanout and is stored in an author specific feed
                  instead, avoiding 8 million writes and preventing queue
                  saturation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNewsfeedTimelineFanoutOnWritePushPatternForTimelineGeneration;
