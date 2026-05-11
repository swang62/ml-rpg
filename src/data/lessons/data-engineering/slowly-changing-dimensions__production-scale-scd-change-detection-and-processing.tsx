import type { Component } from "solid-js";

const LessonSlowlyChangingDimensionsProductionScaleScdChangeDetectionAndProcessing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale SCD: Change Detection and Processing
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Ingestion Challenge:
            </div>
            At Amazon or Walmart scale, operational databases generate 50,000 to
            200,000 change events per minute across all entities. Customer
            profiles, addresses, product attributes, and store configurations
            change constantly. Your SCD pipeline must detect these changes,
            apply versioning logic, and land updated dimension tables, often
            within 5 to 15 minute Service Level Agreements (SLAs) for near real
            time analytics. Two fundamental approaches exist: snapshot based
            comparison and Change Data Capture (CDC).
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Snapshot Based Detection:
            </div>
            You extract the full current state from source systems daily or
            hourly, then compare against your warehouse dimension to find
            differences. For a 500 million product catalog, this means comparing
            every attribute of 500 million rows to detect maybe 2 million
            changes. This is conceptually simple but computationally brutal.
            Comparing 500 million rows can take 4 to 8 hours of compute time
            even with distributed processing. At Target scale with millions of
            daily price changes, snapshot comparison becomes a bottleneck. False
            positives from transient fields like load timestamps can create
            millions of spurious version rows, exploding your Type 2 dimensions.
            The algorithm is straightforward. Hash all business attributes for
            each business key in both old and new snapshots. Compare hashes.
            Where they differ, apply SCD logic. For Type 2, this means: look up
            current version by business key, set its effective end to now and
            current flag to false, insert new version with new surrogate key and
            effective start of now.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              CDC Based Processing:
            </div>
            Change Data Capture reads the transaction log from operational
            databases and streams only the changed rows. Instead of comparing
            500 million products to find 2 million changes, you process just
            those 2 million change events. This reduces processing time from
            hours to minutes and enables near real time SCD updates. Netflix
            uses CDC powered streaming to maintain dimension tables with sub
            minute latency for personalization analytics. The operational price
            you pay is complexity: setting up CDC connectors, handling schema
            evolution, managing streaming state, and dealing with out of order
            events.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Hybrid approaches are common. Use
              CDC for high change dimensions like Product and Price, where
              millions of rows change daily. Use snapshot comparison for slow
              moving dimensions like Store or Organizational Hierarchy, where
              only hundreds of rows change per day.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Type 2 Algorithm in Detail:
            </div>
            For each changed business key, the core Type 2 logic must be atomic.
            First, query for existing current row WHERE business_key = X AND
            current_flag = true. If none exists, this is a new entity: insert a
            row with a new surrogate key, effective start equal to processing
            time, effective end equal to a sentinel like December 31 9999, and
            current flag true. If a current row exists, compare attributes. If
            different, this is an update: execute an UPDATE to set the existing
            row's effective end to now and current flag to false, then INSERT a
            new row with a new surrogate key, the new attribute values,
            effective start of now, effective end of December 31 9999, and
            current flag true. In distributed systems, you must partition by
            business key to ensure all versions for an entity are processed
            together. Some teams use optimistic locking with version numbers to
            detect concurrent updates. At 200,000 events per minute,
            parallelizing across thousands of business keys is essential to meet
            latency targets.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Edge Case: Late Arriving Changes:
            </div>
            Suppose a CDC event for a customer address change from Monday
            arrives on Wednesday due to a source system delay. If you naively
            set effective start to Wednesday, you've created a temporal gap.
            Facts from Tuesday will have no matching dimension row for that
            business key with an effective period covering Tuesday. Robust
            implementations use the source system's transaction timestamp as
            effective start, not the processing time. This requires carrying
            event time metadata through the pipeline and handling backfill
            scenarios where you need to insert a version into the middle of an
            existing timeline.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Source DB: 500M rows</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    2M changes/day (0.4%)
                  </div>
                </div>
                <div style="display: flex; gap: 20px; align-items: center">
                  <div style="text-align: center">
                    <div style="font-size: 20px; font-weight: bold">↓</div>
                    <div style="font-size: 11px; margin-top: 4px">Snapshot</div>
                  </div>
                  <div style="text-align: center">
                    <div style="font-size: 20px; font-weight: bold">↓</div>
                    <div style="font-size: 11px; margin-top: 4px">
                      CDC Stream
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Compare 500M</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      4-8 hours
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 13px">Process 2M</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      5-15 minutes
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">SCD Type 2 Logic</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Close old + Insert new
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
                  Snapshot comparison must process all rows (500 million
                  products) to find changes (2 million), taking 4 to 8 hours,
                  while CDC processes only changed rows in 5 to 15 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 0.4% daily change rate on large dimensions, CDC reduces
                  processing volume by 99.6%, making near real time SCD feasible
                  for high throughput systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 2 algorithm must be atomic per business key: close
                  existing current row by setting effective end and current flag
                  false, insert new row with new surrogate key
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving changes require using source transaction
                  timestamp as effective start, not processing time, to avoid
                  temporal gaps in dimension timeline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 200,000 change events per minute, must partition by
                  business key and parallelize across thousands of workers to
                  meet sub 15 minute SLA targets
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
                  Walmart Product dimension: 200 million products, 1 million
                  price changes per day, CDC based SCD completes in 10 minutes
                  vs 6 hours with snapshot
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 2 update: Customer ID 12345 currently has surrogate key
                  98765 with city Seattle. Update arrives: set row 98765
                  effective_end to 2024-01-15 and current_flag false, insert new
                  row with surrogate key 98766, city Portland, effective_start
                  2024-01-15, current_flag true
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arrival scenario: Address change event from Monday
                  (event_time = 2024-01-08) arrives Wednesday. Use 2024-01-08 as
                  effective_start, not 2024-01-10, so Tuesday facts join
                  correctly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  False positive explosion: Including load_timestamp in snapshot
                  comparison causes every row to appear changed, creating 500
                  million spurious version rows
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSlowlyChangingDimensionsProductionScaleScdChangeDetectionAndProcessing;
