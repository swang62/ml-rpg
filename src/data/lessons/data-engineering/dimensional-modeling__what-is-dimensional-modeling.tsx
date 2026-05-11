import type { Component } from "solid-js";

const LessonDimensionalModelingWhatIsDimensionalModeling: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Dimensional Modeling?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Idea:
          </div>
          Dimensional modeling separates measurements from context. Think of it
          as organizing data the way business people naturally ask questions.
          Instead of complex normalized tables spread across dozens of joins,
          you have facts (the measurements) surrounded by dimensions (the
          context). A fact table contains one row per business event at a chosen
          grain. For a streaming service, that might be one row per video play.
          Each row stores numeric measures like watch time in seconds, buffering
          events, and completion percentage, plus foreign keys pointing to
          dimension tables. Dimension tables capture the who, what, where, when,
          and how. A Time dimension holds date attributes. A Content dimension
          describes the video title, genre, and rating. A User dimension tracks
          subscriber tier and country. When an analyst asks "What is average
          watch time by country and genre last week?", the query scans the fact
          table filtered by date, joins to two dimensions, groups, and
          aggregates.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Why This Matters:
          </div>
          This structure is optimized for analytical workloads, not
          transactional ones. In operational databases, third normal form
          reduces redundancy and handles frequent updates efficiently. But
          analytical queries need to scan millions or billions of rows and
          aggregate across multiple dimensions. Dimensional models trade some
          storage redundancy for predictable query patterns and fast
          performance.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> At companies like Netflix or Airbnb,
            dimensional models power thousands of dashboards. A well designed
            fact table with proper partitioning returns results in 2 to 15
            seconds even when scanning hundreds of millions of rows with dozens
            of concurrent users.
          </div>
          The key design decisions include choosing the grain of each fact
          table, identifying which dimensions are shared across business domains
          as conformed dimensions, and deciding how to handle attributes that
          change over time, like a customer moving from free tier to premium or
          a city changing regions.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
              <div style="border: 2px solid; padding: 14px 18px; border-radius: 6px; min-width: 160px; text-align: center">
                <strong style="font-size: 14px">Fact: Video Plays</strong>
                <div style="font-size: 12px; margin-top: 6px">
                  watch_time_sec, buffer_count, completion_pct
                </div>
              </div>
              <div style="display: flex; gap: 16px; margin-top: 8px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Time</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    date, hour, day_of_week
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Content</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    title, genre, rating
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">User</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    tier, country, signup_date
                  </div>
                </div>
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
                Facts contain numeric measures and foreign keys at a defined
                grain, such as one row per order or one row per ride. Each fact
                table represents a business process.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Dimensions provide descriptive context like customer attributes,
                product details, or date hierarchies. They answer who, what,
                where, when, and how for each fact.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Dimensional models optimize for read heavy analytical workloads,
                not transactional updates. Queries scan millions of rows but
                follow predictable join patterns.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Surrogate keys decouple the warehouse from operational system
                key changes. The fact table stores dimension_key instead of
                natural identifiers like customer_id.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Conformed dimensions are shared across multiple fact tables,
                ensuring consistent definitions. A Time dimension used by Sales,
                Inventory, and Support facts enables reliable cross domain
                analysis.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Typical query performance on modern cloud warehouses is 2 to 15
                seconds for queries scanning hundreds of millions of fact rows
                joined to 3 to 10 dimensions with proper partitioning.
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
                A ride sharing company models Trips as a fact table at grain
                "one row per completed trip". Measures include distance_miles,
                fare_amount, and duration_seconds. Foreign keys point to Driver,
                Rider, City, and Time dimensions.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An e-commerce warehouse has Orders fact (order_id,
                order_date_key, customer_key, total_amount) joined to Customer
                dimension (customer_key, name, segment, region) and Date
                dimension (date_key, full_date, month, quarter, fiscal_year).
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix query: "Average watch time by content genre and user
                country for last 7 days" scans VideoPlays fact filtered by
                date_key, joins to Content and User dimensions, groups by genre
                and country, and computes AVG(watch_time_sec).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDimensionalModelingWhatIsDimensionalModeling;
