import type { Component } from "solid-js";

const LessonEventDataModelingFailureModesAndEdgeCasesInEventDataModeling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Event Data Modeling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Reality of Production Systems:
            </div>
            Event data models operate in messy, distributed environments.
            Network retries generate duplicates. Clock skew produces out of
            order events. Hot users create skewed partitions. Understanding
            these failure modes is critical for building robust analytics
            systems.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Duplicates and Idempotency:
            </div>
            Network retries and client buffering easily generate duplicate
            events. A mobile app sends a purchase_completed event, the network
            times out, the app retries, and you receive the same event twice.
            Without deduplication, your revenue metrics are inflated. The
            solution is to make event processing idempotent by using globally
            unique event IDs. Within a bounded deduplication window based on
            event time, typically 24 to 72 hours, if two events share the same
            ID and source, downstream processors treat the later arrival as a
            duplicate and drop it. However, this requires storage overhead. You
            must maintain a lookup table of recently seen event IDs. At billions
            of events per day, this lookup can consume hundreds of gigabytes of
            memory or require fast key value stores like Redis. The
            deduplication window is a tradeoff: longer windows catch more
            duplicates but increase storage cost and lookup latency.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Out of Order and Late Arriving Events:
            </div>
            Clock skew between devices produces events that appear to occur in
            the wrong order when sorted by event time. A user completes a
            purchase on a mobile device with a clock running 10 minutes fast.
            The purchase_completed event arrives before the checkout_initiated
            event when sorted by timestamp. Session boundaries, time to
            conversion metrics, and funnel analysis break if you assume perfect
            ordering. The standard solution is to use watermarks. A watermark
            declares that all events with timestamps up to time T have been
            seen. Events arriving after the watermark with timestamps before T
            are considered late. You can either drop late events, buffer them
            for a grace period, or trigger recomputation of affected aggregates.
            Companies typically set watermarks at 5 to 15 minutes behind real
            time to balance completeness and latency.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Regulatory constraints require
              deletion of user data, but events are immutable by design. If your
              model doesn't include consistent user keys or deletion markers,
              you cannot reliably remove a user's footprint without destroying
              shared metrics.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Hot Partitions and Skewed Load:
            </div>
            If you partition only by time, extremely active users or tenants
            create hot partitions. A large enterprise customer sending 1000
            events per second lands all traffic on one partition while others
            sit idle. This throttles throughput and increases latency. The
            solution is to partition by a hash of user ID, session ID, or tenant
            ID in addition to time. This spreads load across many partitions.
            However, it complicates range queries. Scanning a specific user's
            events requires checking all partitions for the time range.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Schema Drift Over Time:
            </div>
            Different teams emit similar events with slight variations. One team
            logs "signup" with field "user_name". Another logs "user_signup"
            with "username". A third logs "user_signed_up" with "name". Your
            funnel queries must union three tables with different schemas,
            breaking comparability. Unwinding drift requires expensive backfills
            to rewrite historical events with a unified schema. Mature companies
            prevent this by enforcing schema reviews before production
            deployment and treating event schemas as contracts with explicit
            versioning.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              High Cardinality Explosions:
            </div>
            Naively emitting a separate event property for every possible
            attribute causes schema explosion. An ecommerce site with 10,000
            product attributes creates events with 10,000 columns. Storage and
            query engines choke. The solution is to separate high cardinality
            attributes into dimension tables and join at query time, or use
            nested structures for variable attributes. For example, store
            product_id in the event and join to a product_attributes table,
            rather than embedding all attributes in every product_viewed event.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Privacy and Deletion Challenges:
            </div>
            Events are immutable, but privacy laws require deletion. If a user
            requests deletion under GDPR, you must remove their data. If your
            events don't include consistent user keys across all identifiers,
            you can't find all their data. If you delete events outright, you
            break aggregate metrics that depend on event counts. The solution is
            to use tombstone markers or pseudonymization. Instead of deleting
            events, you overwrite personally identifiable information (PII)
            fields with null or hashed values, preserving event counts and
            timestamps for aggregate metrics while removing identifiable data.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Out of Order Events with Watermark
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Event A arrives at 10:05
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    event_time: 10:00
                    <br />
                    checkout_initiated
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Event B arrives at 10:06
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    event_time: 10:12 (clock +10 min)
                    <br />
                    purchase_completed
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Watermark at 10:08</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    All events before 09:58 processed
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Event C arrives at 10:20
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    event_time: 09:55 (late!)
                    <br />
                    cart_updated
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Decision Point</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Drop, buffer, or recompute?
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
                  Network retries generate duplicate events. Deduplication using
                  unique event IDs within a 24 to 72 hour window requires
                  maintaining a lookup table that can consume hundreds of
                  gigabytes at billions of events per day.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clock skew causes out of order events. Watermarks set 5 to 15
                  minutes behind real time balance completeness and latency.
                  Late events require dropping, buffering, or triggering
                  aggregate recomputation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot partitions occur when partitioning only by time. An
                  enterprise customer sending 1000 events per second can land
                  all traffic on one partition. Hash partitioning by user ID or
                  tenant ID spreads load but complicates range queries.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema drift where teams emit similar events with different
                  names and fields breaks funnel analysis. Unwinding requires
                  expensive backfills to rewrite historical events with unified
                  schemas.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High cardinality attributes like embedding all product
                  properties in events cause schema explosion. Storing 10,000
                  attributes per event chokes storage and query engines. Use
                  dimension tables and joins instead.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Privacy laws require deletion of immutable events. Tombstone
                  markers or pseudonymization (overwriting PII fields with null
                  or hashed values) preserve aggregate metrics while removing
                  identifiable data.
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
                  Duplicate scenario: Mobile app sends purchase_completed event,
                  network times out after 3 seconds, app retries, server
                  receives event twice with same event_id. Deduplication layer
                  checks recent event ID cache (72 hour window), drops second
                  occurrence, preventing revenue inflation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late event: User completes purchase on device with clock
                  running 10 minutes fast. Event arrives with timestamp 10:12
                  but actual arrival time is 10:06. Watermark is at 10:08
                  (current time minus 10 minute grace period). When event with
                  timestamp 09:55 arrives at 10:20, it's past the watermark and
                  flagged as late. System either drops it or triggers
                  recomputation of affected hourly aggregates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEventDataModelingFailureModesAndEdgeCasesInEventDataModeling;
