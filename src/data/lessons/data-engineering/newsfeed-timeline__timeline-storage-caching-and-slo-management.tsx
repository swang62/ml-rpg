import type { Component } from "solid-js";

const LessonNewsfeedTimelineTimelineStorageCachingAndSloManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Timeline Storage, Caching, and SLO Management
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Timeline delivery maintains a rolling window of 500 to 800 post IDs
            per user in sharded in memory caches, typically replicated 3x for
            availability and low tail latency. Each entry stores minimal
            metadata (post ID, timestamp, author ID) to minimize memory
            footprint, keeping per user storage around tens to a few hundred
            kilobytes. With hundreds of millions of users and 3x replication,
            total memory scales to terabytes across the cache tier. Consistent
            hashing distributes user timelines across nodes; racing reads
            against replicas achieves p95 latencies under 4 milliseconds.
            Service Level Objectives (SLOs) define acceptable performance:
            cached timeline reads target 1 ms p50 and 4 ms p95; end to end feed
            assembly (including ranking and hydration) must complete within 2
            seconds; post propagation to follower feeds must finish within 5
            seconds of publish. Meeting these SLOs under bursty, skewed
            workloads requires careful capacity planning, autoscaling fanout
            workers, and admission control to shed load when queues exceed depth
            thresholds. Failure modes stress these SLOs. Cache eviction churn
            under memory pressure forces expensive rebuilds from origin storage,
            spiking read latency and database load. Fanout queue backlogs during
            write bursts (e.g., breaking news) delay propagation beyond 5
            seconds, causing user visible staleness. Thundering herd scenarios
            (synchronized reads during viral events) can saturate read path
            Central Processing Unit (CPU) and trigger cascading failures.
            Mitigation strategies include tiered caching (protect active users,
            evict inactive first), durable fanout logs for replay, idempotent
            writes to prevent duplicates, and backpressure mechanisms that
            prioritize active followers. Observability is critical: track queue
            depth, fanout latency distributions (p50, p95, p99), cache hit
            ratio, write amplification metrics (average, min, max out degree per
            post), per region freshness lag, and read path CPU utilization.
            Capacity planning rules of thumb: expect 100:1 read to write ratio;
            budget for burst amplification where a single post can imply
            millions of deliveries; size memory for hotset (daily or weekly
            active users) with headroom for spikes.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rolling window of 500 to 800 post IDs per user with 3x
                  replication; per user memory footprint of tens to hundreds of
                  kilobytes totals terabytes at scale across hundreds of
                  millions of users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Service Level Objectives (SLOs): 1 ms p50 and 4 ms p95 for
                  cached reads, under 2 seconds for end to end feed assembly,
                  under 5 seconds for post propagation to all follower feeds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistent hashing shards timelines across cache nodes; racing
                  reads against replicas reduces tail latency by hedging against
                  slow replicas or transient node issues
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache eviction failure mode: memory pressure evicts timelines;
                  rebuild on read spikes origin database and graph systems;
                  mitigation is tiered eviction (protect active users, evict
                  inactive first)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fanout queue backlog during bursts: write spikes from breaking
                  news saturate workers, delaying propagation beyond 5 second
                  SLA; autoscaling and admission control shed low priority work
                  (inactive followers)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Durable fanout logs ensure at least once delivery; idempotent
                  writes (using unique post IDs) prevent duplicates in timelines
                  under retries; reconciliation jobs backfill missed entries
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
                  Timeline cache tier with 200 million daily active users, 3x
                  replication, 100 KB per user: requires 200M × 100 KB × 3 = 60
                  TB of Random Access Memory (RAM) distributed across cache
                  clusters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  During viral event, read Queries Per Second (QPS) spikes from
                  300K to 800K; racing reads against 3 replicas keeps p95
                  latency under 4 ms by hedging slow replicas; autoscaling adds
                  read capacity within 60 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fanout worker queue depth exceeds 10,000 during celebrity post
                  burst; admission control deprioritizes inactive followers
                  (last active over 30 days), preserving 5 second SLA for active
                  users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cache hit ratio drops from 95% to 80% under memory pressure;
                  eviction policy protects users active in last 24 hours, evicts
                  users inactive over 7 days first, limiting origin database
                  load increase to 3x
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNewsfeedTimelineTimelineStorageCachingAndSloManagement;
