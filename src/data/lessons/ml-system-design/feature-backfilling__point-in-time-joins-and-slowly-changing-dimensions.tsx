import type { Component } from "solid-js";

const LessonFeatureBackfillingPointInTimeJoinsAndSlowlyChangingDimensions: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Point in Time Joins and Slowly Changing Dimensions
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Point in Time Join Problem
            </p>
            <p style="margin-top: 0">
              Point in time joins ensure features computed as of timestamp t
              only use dimension and aggregate values valid strictly before t.
              For a user purchase count feature evaluated on January 15th, you
              must join to user profile, product catalog, and historical
              aggregates as they existed on January 14th or earlier. Using
              current state introduces label leakage that inflates training
              metrics.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Slowly Changing Dimensions
            </p>
            <p style="margin-top: 0">
              User attributes change over time: addresses, subscription tiers,
              preferences. A Slowly Changing Dimension (SCD) table tracks these
              changes with valid from and valid to timestamps. Point in time
              joins select the SCD record where valid from is less than or equal
              to feature timestamp and valid to is greater than feature
              timestamp, reconstructing the state at that historical moment.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation in Spark
            </p>
            <p style="margin-top: 0">
              Implement as of joins using window functions or range joins.
              Partition facts by entity and date, partition dimensions by
              entity. For each fact row, find the most recent dimension row with
              timestamp less than or equal to fact timestamp. Optimize using
              bucketing on entity ID and sorting by timestamp to enable merge
              joins instead of broadcast or shuffle hash joins.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Aggregate Feature Backfills
            </p>
            <p style="margin-top: 0">
              Rolling aggregates (purchases in last 30 days) require special
              handling. For each training row, you cannot simply compute the
              current 30 day aggregate; you must compute the 30 day aggregate as
              of that row timestamp. This means the aggregation window shifts
              for each row, dramatically increasing compute versus a single
              current window.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Validation Checks
            </p>
            <p style="margin-top: 0">
              Assert that no joined dimension timestamp exceeds the fact
              timestamp. Run anti join queries in CI to catch point in time
              violations before training begins. A single leaked future value
              can corrupt thousands of training examples.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; font-weight: bold; text-align: center; font-size: 14px">
                Point-in-Time Join (as of Jan 15)
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Fact Table (Purchases)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px; font-family: monospace; line-height: 1.5">
                    user_id=123, event_time=<strong>Jan 15 10:00</strong>
                    <br />
                    product_id=P456, amount=$50
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  JOIN ↓ (as-of Jan 15)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Dimension (Product Prices)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px; font-family: monospace; line-height: 1.5">
                    product_id=P456, price=$10
                    <br />
                    valid_from=<strong>Jan 1</strong>, valid_to=
                    <strong>Jan 10</strong>
                    <br />
                    <br />
                    product_id=P456, price=$15
                    <br />
                    valid_from=<strong>Jan 10</strong>, valid_to=
                    <strong>Jan 20</strong>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Result (Joined Feature)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px; font-family: monospace">
                    user_id=123, event_time=Jan 15,
                    <br />
                    product_price_at_purchase=<strong>$15</strong> ✓<br />
                    <span>(not current $15 if changed later)</span>
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
                  Point in time joins use as of semantics where fact at time t
                  joins dimensions valid at t (valid_from ≤ t &lt; valid_to) to
                  prevent label leakage from future dimension changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slowly changing dimensions without valid from and valid to
                  timestamps cause silent leakage; joining to current state can
                  shift model accuracy by 5% to 10% between training and
                  production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Aggregates must compute over [t minus window, t) strictly
                  excluding events at or after t; including current time events
                  is an off by one error causing training serving skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta Feature Store enforces greater than 99.9% exact match
                  between offline backfilled and online computed values through
                  automated parity checks on sampled entities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving data requires maximum allowed lateness policies
                  (e.g., 7 days) and straggler sweep jobs to correct recent
                  partitions, trading freshness for correctness
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
                  A fraud detection model joins user account status (active,
                  suspended, closed) as of transaction time; using current
                  status leaks future fraud labels, inflating training AUC from
                  0.85 to 0.92 but failing in production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline automatically generates as of joins with valid
                  from and valid to predicates, reducing feature onboarding from
                  weeks to days by preventing manual join errors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 7 day purchase count feature computed offline includes
                  events from Jan 8 to Jan 14 for a Jan 15 training row, while
                  online serving excludes Jan 15 purchases in real time;
                  misalignment causes 0.3% skew and ranking degradation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureBackfillingPointInTimeJoinsAndSlowlyChangingDimensions;
