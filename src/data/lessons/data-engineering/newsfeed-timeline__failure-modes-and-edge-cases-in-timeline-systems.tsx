import type { Component } from "solid-js";

const LessonNewsfeedTimelineFailureModesAndEdgeCasesInTimelineSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Timeline Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Celebrity hotkeys remain the most visible failure mode. A single
            post to tens of millions of followers generates a write storm in
            push systems, saturating fanout queues, spiking cross data center
            bandwidth, and churning cache entries. Propagation Service Level
            Agreements (SLAs) (under 5 seconds) are violated as queue depth
            grows unbounded. Mitigation requires hybrid thresholds (exclude high
            degree authors from push), micro batching writes by shard, and
            backpressure that deprioritizes inactive followers. Thundering herd
            on the read path occurs during synchronized events like breaking
            news. Thousands of users refresh feeds simultaneously, triggering
            parallel graph expansions and candidate fetches in pull systems.
            Central Processing Unit (CPU) spikes can cascade into timeouts and
            retries, amplifying load further. Defenses include per user home
            cache (amortize repeated reads), request coalescing (deduplicate
            identical read requests), and partial precomputation (maintain a
            shallow precomputed slice even in pull dominant systems). Ordering
            anomalies and duplicates arise from eventual consistency and
            retries. Concurrent writes, cross region replication lag, and fanout
            worker retries can produce out of order posts or duplicate entries
            in timelines. Idempotent inserts (storing unique post IDs and
            checking before insert) prevent duplicates. Per user monotonic
            sequence numbers or vector clocks can detect and correct ordering
            issues. Stable cursors must account for late arriving posts to avoid
            pagination skips. Privacy and filtering bugs are high severity
            failures. If block, mute, or limited share lists are not enforced
            consistently across push and pull paths, restricted content can leak
            into feeds. Defense in depth mandates privacy checks as first class
            filters in both the fanout pipeline (at write time) and the read
            merge step (at read time). Abuse and spam amplification is another
            risk: push systems happily propagate spam if upstream classifiers
            miss it. Mandatory eligibility scoring and quarantine queues before
            fanout reduce blast radius.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Celebrity hotkey failure: post to 10 million followers
                  generates 10 million writes, saturates queues, violates 5
                  second Service Level Agreement (SLA); mitigation is hybrid
                  threshold and micro batching by shard
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Thundering herd on read path: synchronized refreshes during
                  breaking news spike Central Processing Unit (CPU) from
                  parallel graph expansions; per user home cache and request
                  coalescing absorb repeated reads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ordering anomalies from eventual consistency: concurrent
                  writes and retries cause out of order or duplicate posts;
                  idempotent inserts using unique post IDs prevent duplicates,
                  monotonic sequence numbers correct order
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Privacy leak edge case: block and mute lists not enforced
                  consistently on push and pull paths allow restricted content
                  in feeds; defense in depth applies privacy filters at both
                  write fanout and read merge time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partial fanout failures: some follower shards fail during
                  push; content appears for subset of users; durable fanout logs
                  enable replay with deduplication, reconciliation jobs backfill
                  missed inserts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Abuse amplification: push fanout spreads spam before
                  classifiers detect it; mandatory eligibility scoring and
                  quarantine queues before fanout reduce spam blast radius to
                  followers
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
                  Celebrity posts during breaking news: 20 million followers,
                  push system writes 20 million entries, queue depth spikes to
                  50,000, propagation time grows from 2 seconds to 30 seconds;
                  hybrid switch reduces to 1 write, read merge adds 10 ms
                  latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Thundering herd: viral event causes 100,000 users to refresh
                  within 10 seconds; pull system graph expansion spikes CPU to
                  90%, timeouts cascade; per user home cache hit rate of 80%
                  absorbs 80K reads, limiting expansion to 20K
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fanout worker retries post delivery due to transient cache
                  failure; idempotent insert checks post ID already exists in
                  timeline, skips write, prevents duplicate entry
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User blocks author A; push path enforces block, skips fanout
                  to user's timeline; pull path also checks block list at merge
                  time; defense in depth ensures content never appears even if
                  one path has bug
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNewsfeedTimelineFailureModesAndEdgeCasesInTimelineSystems;
