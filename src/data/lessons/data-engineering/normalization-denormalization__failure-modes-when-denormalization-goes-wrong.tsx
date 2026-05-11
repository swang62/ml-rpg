import type { Component } from "solid-js";

const LessonNormalizationDenormalizationFailureModesWhenDenormalizationGoesWrong: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: When Denormalization Goes Wrong
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Stale and Inconsistent Data:
            </div>
            The biggest failure mode of denormalization is divergence between
            copies of the same fact. Suppose you store user_display_name in 10
            different tables and caches. Under normal conditions, your Change
            Data Capture pipeline propagates updates within seconds. But when
            consumer lag spikes to 10 minutes due to a downstream bottleneck, or
            a regional Kafka cluster has a partial outage, different parts of
            your system show different names to the same user. For most UX
            scenarios, this is tolerable. Seeing an old profile picture for a
            few minutes is not catastrophic. But in financial systems or
            compliance contexts, similar inconsistencies can be severe. Imagine
            denormalized account balances diverging from the normalized
            transaction log, leading to incorrect overdraft decisions or
            regulatory violations.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Write Amplification and Fan Out:
            </div>
            A classic failure mode is unbounded write fan out. Consider a social
            network where you naively store a full copy of each post in every
            follower's feed table. When a user with 10 million followers edits
            their post, you must update 10 million feed rows. This can overwhelm
            your database, create multi hour backfill jobs, and cause cascading
            failures. Meta and Twitter-like systems mitigate this by limiting
            what can be edited and designing feeds to store lightweight
            references or pointers rather than full copies. When the underlying
            post changes, only a single canonical row is updated, and feed
            rendering fetches the current version at read time. This is a hybrid
            approach: some denormalization for performance, some indirection for
            write scalability.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Write amplification is not just a
              latency problem. At 100k updates per second, a 10x fan out becomes
              1 million writes per second, which can exceed database capacity
              and trigger cascading failures across dependent systems.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Race Conditions in Counters:
            </div>
            Denormalized aggregates like total_likes or items_in_cart are prone
            to race conditions. If two concurrent updates both read the current
            count, increment it, and write back, one increment can be lost. At
            high concurrency, naive implementations can consistently undercount
            or produce wildly incorrect values. The fix is to use atomic
            operations (like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              INCR
            </code>{" "}
            in Redis), optimistic locking with version numbers, or move to
            append-only event logs where counters are derived through idempotent
            aggregation. The latter is common in stream processing: each like is
            an immutable event, and a stateful stream processor maintains the
            count. If the processor restarts, it recomputes the count from the
            log, ensuring correctness.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Schema Evolution Nightmares:
            </div>
            Adding a new attribute to a normalized table is straightforward:
            ALTER TABLE, add the column, start writing it. With denormalized
            data, that new attribute might need to be backfilled into 20 billion
            rows across 5 different stores. This can take days and consume
            massive compute resources. During backfill, queries must tolerate
            partial presence, often requiring complex conditional logic. Teams
            mitigate this by designing schemas to be forward compatible
            (optional fields with defaults), using columnar storage where adding
            a column is cheap, or accepting that new attributes only appear in
            rows written after the schema change. The pragmatic approach is to
            minimize schema changes in denormalized stores by carefully thinking
            through the data model upfront and versioning documents or records
            when breaking changes are unavoidable.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Monitoring and Mitigation:
            </div>
            Successful denormalization at scale requires comprehensive
            monitoring of replication lag, write amplification ratios, and data
            consistency. When lag exceeds thresholds, systems often fall back to
            slower but correct normalized queries or surface warnings to users.
            Automated reconciliation jobs that periodically scan for divergence
            and repair inconsistencies are common at companies like Amazon and
            Google, especially in financial or inventory systems where
            correctness cannot be compromised.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale data from replication lag can cause inconsistencies;
                  during a 10 minute consumer lag spike, different system
                  components show different values, which is critical in
                  financial or compliance contexts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Write amplification occurs when one logical change affects
                  millions of rows; editing a post with 10 million followers can
                  trigger 10 million updates, overwhelming databases and causing
                  cascading failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Race conditions in denormalized counters lead to lost updates;
                  concurrent increments without atomic operations or optimistic
                  locking can consistently produce incorrect aggregate values at
                  high concurrency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution requires backfilling billions of rows across
                  multiple stores, taking days and consuming massive resources
                  while queries must tolerate partial presence of new fields
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mitigation requires monitoring replication lag, write
                  amplification ratios, and data consistency with fallback to
                  normalized queries when thresholds are exceeded
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
                  Social network feed: User with 10M followers edits post. Naive
                  denormalization requires 10M row updates. Solution: Store
                  lightweight references and fetch current post at read time,
                  limiting write fan out.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ecommerce product count: Concurrent users add items to cart.
                  Without atomic operations, final count can be incorrect.
                  Solution: Use Redis INCR or event sourcing with idempotent
                  aggregation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User profile attribute: Adding 'verified_badge' to profiles
                  requires backfilling 5 billion denormalized user documents
                  across search index, cache, and analytics store. Solution:
                  Make field optional with default, backfill gradually.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNormalizationDenormalizationFailureModesWhenDenormalizationGoesWrong;
