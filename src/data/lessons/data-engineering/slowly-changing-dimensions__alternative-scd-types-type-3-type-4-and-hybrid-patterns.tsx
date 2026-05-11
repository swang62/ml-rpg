import type { Component } from "solid-js";

const LessonSlowlyChangingDimensionsAlternativeScdTypesType3Type4AndHybridPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Alternative SCD Types: Type 3, Type 4, and Hybrid Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Type 3: Limited Column History</strong>
            Type 3 adds extra columns to store a small amount of history,
            typically just the previous value. Instead of creating new rows, you
            have columns like current_city, previous_city, and city_change_date.
            When a customer moves from Seattle to Portland, you shift Seattle
            into previous_city, set Portland as current_city, and record the
            change date. This keeps tables narrow and queries simple. Your 100
            million customer dimension stays at 100 million rows. You can answer
            limited historical questions like "How many customers changed cities
            this month?" without complex temporal joins. The brutal limitation
            is you can only track one prior value, or maybe two or three if you
            add more columns. Type 3 works when you have specific, narrow
            questions about recent changes. A subscription business might track
            current_plan, previous_plan, and downgrade_date to analyze recent
            downgrades for retention campaigns. But if you later want to know
            "What plan did this customer have 18 months ago?" you're out of luck
            unless that happens to be the previous value.
            <strong>Type 4: Separate History Table</strong>
            Type 4 splits current and historical data into two tables. The main
            dimension table holds only current rows, staying lean and fast. A
            separate history table stores all versions using a Type 2 structure
            with surrogate keys and effective dates. This reduces contention on
            the main table. Queries that only need current state, which might be
            80% of your workload, avoid scanning billions of historical rows.
            Historical analysis queries the history table. Some implementations
            also keep a small current snapshot in the main table for fast
            lookups. The cost is complexity. You're managing two tables that
            must stay synchronized. When a dimension entity changes, you must
            insert a new current row in the main table (or update the existing
            one) and simultaneously insert a closed version into the history
            table. This requires coordinated writes and makes the ETL logic more
            fragile. If synchronization breaks, your current and historical
            views diverge.
            <strong>Type 6: Hybrid Current and Historical</strong>
            Type 6 combines Type 1, Type 2, and Type 3 behaviors into a single
            table structure. Each Type 2 version row includes both historical
            attributes frozen at that point in time and current attributes that
            get updated in place across all versions of the business key. For
            example, product rows might have historical_category frozen per
            version but current_category updated across all versions when a
            product recategorization happens. This supports both "What category
            was this product in when sold?" and "Given today's category
            structure, how would we classify all historical sales?" questions.
            This is powerful but confusing. Analysts must understand which
            columns are historical and which are current. ETL must update
            current columns across multiple rows when those attributes change.
            This pattern appears in advanced analytics where business users need
            to restate history under current taxonomies, common in financial
            reporting or organizational hierarchy changes.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Event Sourced Alternative:
            </div>
            Instead of maintaining SCD dimensions, some systems store all state
            changes as immutable events and reconstruct dimension state by
            replaying events. A customer_address_changed event at timestamp T
            becomes a version in your dimension by querying all events up to T.
            This shifts complexity from write time to read time. Writes are
            simple append only inserts. Reads must aggregate events, which can
            be expensive but can be accelerated with materialized views or
            caches. This pattern fits well with event streaming architectures
            like those at Netflix but requires sophisticated query engines.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; font-weight: bold; font-size: 15px; text-align: center; border-bottom: 2px solid; padding-bottom: 8px">
                Type 4: Split Current and History
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px">
                    customer_current (100M rows)
                  </div>
                  <div style="font-size: 12px; padding: 6px; border: 1px solid; border-radius: 4px; margin-bottom: 4px">
                    customer_id: 12345 | name: Alice | city: Portland
                  </div>
                  <div style="font-size: 11px; margin-top: 6px">
                    Fast lookups, 80% of queries
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  +
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px">
                    customer_history (500M rows)
                  </div>
                  <div style="font-size: 11px; padding: 5px; border: 1px solid; border-radius: 4px; margin-bottom: 3px">
                    sk: 12345 | id: 12345 | city: Seattle
                    <br />
                    start: 2023-01 | end: 2024-01
                  </div>
                  <div style="font-size: 11px; padding: 5px; border: 1px solid; border-radius: 4px; margin-bottom: 3px">
                    sk: 12346 | id: 12345 | city: Portland
                    <br />
                    start: 2024-01 | end: 9999-12
                  </div>
                  <div style="font-size: 11px; margin-top: 6px">
                    Temporal analysis, 20% of queries
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
                  Type 3 keeps table size constant by storing only previous
                  value in additional columns, suitable for narrow questions
                  like recent plan downgrades but loses deep history
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 4 splits current and historical rows into separate
                  tables, optimizing 80% of queries that only need current state
                  but requiring synchronized writes across two tables
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 6 hybrid stores both historical attributes frozen per
                  version and current attributes updated across all versions,
                  supporting restated history under current taxonomies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event sourced alternative makes writes simple with append only
                  events but shifts complexity to reads that must aggregate
                  events, requiring materialized views for performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choice depends on query patterns: if most queries need only
                  current state, Type 4 or Type 3 reduce scan costs; if deep
                  temporal analysis is common, pure Type 2 is simpler
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
                  Type 3 use case: subscription service tracks current_plan,
                  previous_plan, and plan_change_date to power retention
                  dashboards for recent downgrades
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 4 at scale: Dimension with 100 million current customers
                  and 500 million historical versions, 80% of queries hit only
                  the 100 million row current table
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 6 financial example: Product has historical_category
                  frozen per sale and current_category updated globally,
                  enabling 'Restate last year sales under new category
                  structure' reports
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event sourced pattern: Customer dimension materialized view
                  aggregates address_changed, tier_upgraded, and profile_updated
                  events, refreshed every 5 minutes for near real time queries
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSlowlyChangingDimensionsAlternativeScdTypesType3Type4AndHybridPatterns;
