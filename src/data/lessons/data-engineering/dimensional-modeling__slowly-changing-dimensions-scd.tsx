import type { Component } from "solid-js";

const LessonDimensionalModelingSlowlyChangingDimensionsScd: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Slowly Changing Dimensions (SCD)
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Problem:
          </div>
          Dimension attributes change over time. A customer moves from free tier
          to premium. A store relocates to a different region. A product
          category gets renamed. These changes create a challenge: when you
          query historical facts, should dimension attributes reflect current
          state or state at the time of the fact? If you simply overwrite the
          dimension row, all historical facts now show the new value. A customer
          who was in the "basic" segment when they made a purchase last year now
          appears to have been in "premium" segment. Revenue attribution by
          segment becomes incorrect, and historical trend analysis is
          unreliable.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Type 1: Overwrite:
          </div>
          Type 1 SCD simply updates the dimension row in place. When a customer
          changes email address or a product description is corrected, the old
          value is lost. This is appropriate for attributes where historical
          values do not matter, such as fixing typos or updating contact
          information. It is simple to implement: just UPDATE the dimension row.
          No version history, no additional rows. The trade off is that all
          historical facts now join to the current state. If you overwrite a
          customer region from "West" to "East", all their past orders now
          appear to have been placed by an "East" region customer. This is
          acceptable when the attribute is non analytical or when historical
          accuracy is not required.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Type 2: Add New Row:
          </div>
          Type 2 SCD creates a new dimension row with a new surrogate key when
          an attribute changes. The original row remains with an end date, and
          the new row has a start date. Facts created after the change point to
          the new surrogate key. This preserves complete history. You can query
          facts as of any point in time and see dimension attributes as they
          were then. For example, a Customer dimension might have customer_key
          (surrogate), customer_id (natural), segment, region,
          effective_start_date, effective_end_date, and is_current flag. When
          customer 12345 upgrades from "basic" to "premium" on March 15, the ETL
          pipeline ends the old row (effective_end_date = March 14, is_current =
          false) and inserts a new row (new customer_key, effective_start_date =
          March 15, is_current = true). Queries filtering on is_current = true
          always get the latest state. Queries joining on fact_date BETWEEN
          effective_start_date AND effective_end_date get point in time
          accuracy.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Type 2 dimensions can explode in
            size. A User dimension tracking every attribute change as type 2 can
            grow from 50 million users to 500 million rows if users change
            segments or regions frequently. Joins become slower, and if
            effective date logic is wrong, facts can match multiple dimension
            rows, producing duplicate metrics.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Type 3 and Hybrid Approaches:
          </div>
          Type 3 SCD adds columns for previous values, such as current_segment
          and previous_segment. This allows limited history without adding rows.
          It is rarely used because it only tracks one prior state. In practice,
          most companies use hybrid approaches. High cardinality attributes that
          change frequently, like customer email or phone number, are type 1.
          Important analytical attributes like segment, tier, or region are type
          2 but only for a subset of columns. For extremely large dimensions,
          such as 100 million users, teams often limit type 2 tracking to the
          past 2 years or only track changes for active users to control
          dimension size.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Implementation Complexity:
          </div>
          Type 2 SCD requires surrogate key management in ETL pipelines. When
          loading fact rows, the pipeline must lookup the correct dimension
          surrogate key based on the natural key and effective date. For small
          dimensions, this is an in memory hash map. For large dimensions with
          billions of rows, it is a join in the warehouse with careful predicate
          pushdown to avoid scanning the entire dimension history. Late arriving
          facts complicate type 2 logic. A payment event arriving 6 hours late
          must join to the dimension row that was current at the payment time,
          not the load time. This requires temporal lookups and can produce
          surrogate key mismatches if dimension updates and fact loads are not
          coordinated carefully.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
            <div style="font-weight: bold; margin-bottom: 12px; text-align: center; font-size: 14px">
              Type 2 SCD: Customer Segment Change
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; font-size: 12px">
                <strong>customer_key: 1001</strong> | customer_id: 12345 |
                segment: Basic
                <br />
                effective_start: 2023-01-01 | effective_end: 2024-03-14 |
                is_current: false
              </div>
              <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; font-size: 12px">
                <strong>customer_key: 1002</strong> | customer_id: 12345 |
                segment: Premium
                <br />
                effective_start: 2024-03-15 | effective_end: 9999-12-31 |
                is_current: true
              </div>
              <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 11px">
                <strong>Fact Table Join:</strong> Facts before March 15 use
                customer_key 1001. Facts after March 15 use customer_key 1002.
                Historical queries reconstruct segment as it was.
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Type 1 SCD overwrites dimension attributes in place, losing
                history. Use for non analytical attributes like email addresses
                or correcting typos. Simple to implement but all historical
                facts reflect current state.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Type 2 SCD inserts new dimension rows with new surrogate keys
                when attributes change, preserving complete history. Enables
                point in time queries but increases dimension size by 2x to 10x
                depending on change frequency.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Type 2 dimensions require effective_start_date,
                effective_end_date, and is_current flag. Fact tables store
                surrogate keys, not natural keys, so they point to the correct
                historical dimension row.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Type 2 can explode dimension size. A 50 million user dimension
                tracking every change can grow to 500 million rows if segments
                or regions change frequently. Joins slow down and incorrect
                logic produces duplicate fact rows.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid approaches are common: type 1 for high cardinality
                attributes that change often, type 2 for important analytical
                attributes like tier or region, limited to recent history or
                active users.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Late arriving facts require temporal lookups to find the correct
                surrogate key based on fact timestamp, not load timestamp.
                Incorrect logic causes metrics to fluctuate as backfills run.
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
                Type 1 example: Customer.email changes from old@example.com to
                new@example.com. ETL runs UPDATE Customer SET email =
                'new@example.com' WHERE customer_key = 1001. All historical
                orders now show new email.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Type 2 example: Customer 12345 upgrades from Basic to Premium on
                March 15, 2024. ETL ends row with customer_key 1001
                (effective_end = March 14, is_current = false) and inserts row
                with customer_key 1002 (segment = Premium, effective_start =
                March 15, is_current = true).
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query for current state: SELECT SUM(order_amount) FROM Orders
                JOIN Customer ON Orders.customer_key = Customer.customer_key
                WHERE Customer.is_current = true. Query for point in time: JOIN
                ON Orders.customer_key = Customer.customer_key AND
                Orders.order_date BETWEEN Customer.effective_start_date AND
                Customer.effective_end_date.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDimensionalModelingSlowlyChangingDimensionsScd;
