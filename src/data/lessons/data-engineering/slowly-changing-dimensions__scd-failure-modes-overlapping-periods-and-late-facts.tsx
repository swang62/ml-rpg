import type { Component } from "solid-js";

const LessonSlowlyChangingDimensionsScdFailureModesOverlappingPeriodsAndLateFacts: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            SCD Failure Modes: Overlapping Periods and Late Facts
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Overlap Catastrophe:
            </div>
            For any business key in a Type 2 dimension, you must never have two
            rows marked as current simultaneously, and effective periods must
            never overlap. Suppose Customer 12345 has two rows both with
            current_flag = true. When a fact joins to get current customer
            attributes, which row does it pick? Most databases will non
            deterministically return one, creating random inconsistencies in
            your analytics. At Amazon scale with 0.01% error rate, this means
            hundreds of thousands of corrupted dimension records per day. In a
            distributed SCD pipeline processing 200,000 changes per minute, race
            conditions are the primary cause. Two workers simultaneously process
            updates for the same business key. Both read the current row, both
            try to close it and insert a new version. You end up with the old
            row closed twice and two new current rows inserted.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Traditional database uniqueness
              constraints cannot help you here. Current_flag = true is not
              unique across the table, only within each business key. You need
              composite constraints or application level locking.
            </div>
            Prevention requires atomicity per business key. Common patterns
            include: partitioning so all versions of a business key are handled
            by a single worker, using optimistic locking with version numbers
            where the UPDATE includes WHERE version = expected_version, or
            serializing updates per business key through a keyed state store in
            streaming systems. Detection is equally critical. Daily validation
            queries should check for duplicates: SELECT business_key, COUNT(*)
            FROM dimension WHERE current_flag = true GROUP BY business_key
            HAVING COUNT(*) &gt; 1. Also check for overlapping intervals: self
            join the dimension table WHERE d1.business_key = d2.business_key AND
            d1.surrogate_key != d2.surrogate_key AND d1.effective_start &lt;
            d2.effective_end AND d2.effective_start &lt; d1.effective_end.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Late Arriving Facts:
            </div>
            A more subtle failure happens when facts arrive late but you've
            already processed dimension changes. Suppose Monday an order event
            happens with customer in Gold tier. Tuesday the customer upgrades to
            Platinum, creating a new dimension version. Wednesday the Monday
            order event finally arrives due to a delayed batch. If your fact
            enrichment always joins to the current dimension row (WHERE
            current_flag = true), that late Monday order will incorrectly be
            attributed to Platinum tier. Your churn analysis will show this
            customer generated revenue while in Platinum, when they were
            actually in Gold. The correct approach requires facts to carry
            event_time and dimension tables to support temporal lookups. Instead
            of WHERE current_flag = true, join WHERE fact.event_time BETWEEN
            dim.effective_start AND dim.effective_end. This is significantly
            more expensive, requiring range scans on temporal columns, but it's
            the only way to maintain historical correctness. At Netflix scale
            with millions of events per second, maintaining in memory caches of
            dimension timelines for sub millisecond lookups becomes necessary.
            The cache must hold not just current versions but recent historical
            versions to handle late arrivals within acceptable windows,
            typically 7 to 30 days.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Soft Deletes and Reactivation:
            </div>
            Dimension entities sometimes deactivate and reactivate. A Seller on
            a marketplace might close their account, then reopen it six months
            later. If you treat reactivation as just another Type 2 update, you
            create a new version row with an active status. But what about
            surrogate key stability? Should facts referencing the old surrogate
            key still be valid? Incorrect handling causes double counting.
            Suppose a metric counts active sellers by counting distinct current
            surrogate keys. The reactivated seller now has two surrogate keys in
            history, both marked current at different times. Naive queries might
            count them twice. One solution is to treat deactivation as setting
            effective_end but keeping current_flag false, not creating a deleted
            row. Reactivation then updates that row to set effective_end back to
            the sentinel value and current_flag back to true, reusing the same
            surrogate key. This requires more complex state management but
            avoids surrogate key proliferation.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; font-weight: bold; font-size: 15px; text-align: center; border-bottom: 2px solid; padding-bottom: 8px">
                Race Condition: Overlapping Versions
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px">
                    Initial State:
                  </div>
                  <div style="font-size: 11px">
                    sk: 100 | bk: 12345 | city: Seattle | current: true
                  </div>
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px">
                    <div style="font-size: 11px; font-weight: bold; margin-bottom: 4px">
                      Worker A (Portland):
                    </div>
                    <div style="font-size: 10px; margin-bottom: 3px">
                      1. Read sk: 100
                    </div>
                    <div style="font-size: 10px; margin-bottom: 3px">
                      2. Update 100: current→false
                    </div>
                    <div style="font-size: 10px">
                      3. Insert 101: Portland, current→true
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px">
                    <div style="font-size: 11px; font-weight: bold; margin-bottom: 4px">
                      Worker B (Austin):
                    </div>
                    <div style="font-size: 10px; margin-bottom: 3px">
                      1. Read sk: 100
                    </div>
                    <div style="font-size: 10px; margin-bottom: 3px">
                      2. Update 100: current→false
                    </div>
                    <div style="font-size: 10px">
                      3. Insert 102: Austin, current→true
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px">
                    Result (CORRUPTED):
                  </div>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    sk: 100 | bk: 12345 | city: Seattle | current: false
                  </div>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    sk: 101 | bk: 12345 | city: Portland | current: true ❌
                  </div>
                  <div style="font-size: 11px">
                    sk: 102 | bk: 12345 | city: Austin | current: true ❌
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
                  Race conditions in distributed pipelines cause overlapping
                  current rows, with 0.01% error rate at Amazon scale meaning
                  hundreds of thousands of corrupted records per day
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Overlaps require atomicity per business key through
                  partitioning, optimistic locking with version numbers, or
                  serialized keyed state in streaming systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving facts joined to current dimension rows cause
                  incorrect attribution, such as a Monday order from Gold tier
                  customer incorrectly showing as Platinum after Tuesday upgrade
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temporal lookups with event_time BETWEEN effective_start AND
                  effective_end maintain correctness but require expensive range
                  scans and careful indexing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Soft deletes and reactivations create surrogate key
                  proliferation and double counting if not handled with explicit
                  deactivation status rather than new version rows
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
                  Detection query for overlaps: SELECT business_key, COUNT(*)
                  FROM dim WHERE current_flag = true GROUP BY business_key
                  HAVING COUNT(*) &gt; 1
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temporal join for late facts: FROM orders o JOIN customer_dim
                  c ON o.customer_id = c.business_key AND o.order_time BETWEEN
                  c.effective_start AND c.effective_end
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix scale: maintain 30 day in memory dimension timeline
                  cache to handle late arrivals with sub millisecond lookup for
                  millions of events per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reactivation scenario: Seller deactivated June 1
                  (effective_end = June 1, current_flag = false), reactivated
                  December 1, set same row effective_end = December 31 9999,
                  current_flag = true, avoid new surrogate key
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSlowlyChangingDimensionsScdFailureModesOverlappingPeriodsAndLateFacts;
