import type { Component } from "solid-js";

const LessonSlowlyChangingDimensionsScdType1VsType2TheStorageVsHistoryTradeoff: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            SCD Type 1 vs Type 2: The Storage vs History Tradeoff
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Type 1: Overwrite in Place</strong>
            Type 1 is the simplest approach. When an attribute changes, you
            simply update the existing row. If customer Alice moves from Seattle
            to Portland, you update her single Customer row with the new city.
            Done. This keeps tables small and queries trivial. Your 100 million
            customer dimension stays at 100 million rows forever. Joins are
            straightforward, no filtering by date ranges or flags. At Walmart
            scale processing 50,000 orders per second, simpler joins mean faster
            queries and lower compute costs. The brutal tradeoff: you lose all
            history. Every historical fact now points to current attribute
            values. All of Alice's past Seattle orders will now appear to have
            come from Portland in your reports. For truly corrective changes
            like fixing a misspelled name or invalid phone number, this is
            perfect. For analytically meaningful changes, it's a disaster
            waiting to happen.
            <strong>Type 2: Full Version History</strong>
            Type 2 creates a new row for every change. Each version gets a
            surrogate key, an effective start timestamp, an effective end
            timestamp, and a current flag. When Alice moves cities, you don't
            touch her old row. Instead, you close it by setting its effective
            end to today and current flag to false, then insert a new row with a
            new surrogate key starting today. Facts capture the surrogate key
            that was current when the event happened. Alice's Seattle order from
            yesterday points to surrogate key 12345, which forever shows
            Seattle. Her Portland order tomorrow points to new surrogate key
            12346, which shows Portland. Perfect historical accuracy.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> A dimension that would hold 200
              million products might grow to 4 billion rows over several years
              if products average 20 versions each. This isn't theoretical –
              this is actual production scale at large retailers.
            </div>
            Queries become more complex. To get current customers, you filter
            WHERE current_flag = true. For historical analysis, you join facts
            to dimensions WHERE fact.event_time BETWEEN dim.effective_start AND
            dim.effective_end. These temporal joins are expensive and require
            careful indexing.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Choose Each:
            </div>
            Use Type 1 for purely corrective fields where history doesn't
            matter: data quality fixes, standardizing formats, correcting
            errors. Also use it when you genuinely never need historical values,
            though be careful assuming this. Use Type 2 when time based
            questions are common: churn analysis by past subscription plan at
            Netflix, revenue trends by customer segment at time of purchase,
            understanding how product categorization changes affected sales.
            Accept the storage and complexity cost as the price of analytical
            accuracy.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 15px; border-bottom: 2px solid; padding-bottom: 6px">
                    Type 1: Overwrite
                  </div>
                  <div style="font-size: 13px; margin-bottom: 6px">
                    <strong>customer_id:</strong> 101
                  </div>
                  <div style="font-size: 13px; margin-bottom: 6px">
                    <strong>name:</strong> Alice
                  </div>
                  <div style="font-size: 13px; margin-bottom: 6px">
                    <strong>city:</strong>{" "}
                    <span style="text-decoration: line-through">Seattle</span> →
                    Portland
                  </div>
                  <div style="font-size: 13px; margin-top: 10px; padding-top: 8px; border-top: 1px solid">
                    1 row, history lost
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 14px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 15px; border-bottom: 2px solid; padding-bottom: 6px">
                    Type 2: Versioned
                  </div>
                  <div style="font-size: 12px; margin-bottom: 8px; padding: 6px; border: 1px solid; border-radius: 4px">
                    <strong>sk:</strong> 12345 | <strong>id:</strong> 101
                    <br />
                    <strong>city:</strong> Seattle
                    <br />
                    <strong>start:</strong> 2023-01-01
                    <br />
                    <strong>end:</strong> 2024-01-15
                    <br />
                    <strong>current:</strong> false
                  </div>
                  <div style="font-size: 12px; padding: 6px; border: 1px solid; border-radius: 4px">
                    <strong>sk:</strong> 12346 | <strong>id:</strong> 101
                    <br />
                    <strong>city:</strong> Portland
                    <br />
                    <strong>start:</strong> 2024-01-15
                    <br />
                    <strong>end:</strong> 9999-12-31
                    <br />
                    <strong>current:</strong> true
                  </div>
                  <div style="font-size: 13px; margin-top: 10px; padding-top: 8px; border-top: 1px solid">
                    2 rows, full history
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
                  Type 1 keeps dimension tables at their natural size but
                  destroys all history, suitable only for corrections or truly
                  non analytical attributes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 2 can multiply table size by 10 to 50 times over several
                  years, with a 200 million product dimension growing to 4
                  billion rows at 20 versions per product
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 2 requires surrogate keys, temporal attributes like
                  effective start and effective end, and current flag for
                  efficient querying
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temporal joins in Type 2 require indexing on effective dates
                  and careful query planning to avoid table scans on billion row
                  dimensions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The choice is irreversible in practice: switching from Type 1
                  to Type 2 after you've lost history means you can never
                  recover that analytical capability
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
                  Type 1 use case: correcting a misspelled customer name from
                  'Alise' to 'Alice' where the typo has no analytical meaning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 2 use case: tracking customer loyalty tier changes to
                  analyze 'What tier were customers in when they made their
                  largest purchase?'
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production reality at Target: Customer dimension with 50
                  million customers averaging 3 versions over 2 years reaches
                  150 million rows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query cost difference: Type 1 simple join on customer_id takes
                  2 seconds, Type 2 temporal join with date range can take 30
                  seconds without proper indexing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSlowlyChangingDimensionsScdType1VsType2TheStorageVsHistoryTradeoff;
