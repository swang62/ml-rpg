import type { Component } from "solid-js";

const LessonDimensionalModelingCommonFailureModesInDimensionalModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Common Failure Modes in Dimensional Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Wrong Grain Chosen:
            </div>
            The most expensive failure mode is choosing the wrong grain and
            discovering it after the fact table is in production with billions
            of rows and hundreds of downstream consumers. For example, modeling
            an Orders fact at order level, then later needing line item level
            discounts, taxes, or promotion codes. Analysts start joining both
            Orders and OrderLines, which introduces risk of double counting when
            aggregating. Or they build complex workarounds in SQL that are slow
            and error prone. Fixing wrong grain requires backfilling a new fact
            table at the correct grain and migrating all dashboards, reports,
            and metrics definitions. At a company processing 10 million orders
            per day with 5 line items per order on average, the new fact table
            will have 50 million rows per day. If you need to backfill 2 years,
            that is 36 billion rows. The backfill itself might take days or
            weeks depending on source data availability and warehouse capacity.
            Coordinating migration of hundreds of dashboards without breaking
            metric continuity is a project that can take months.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Exploding Dimensions:
            </div>
            A naive implementation of Type 2 slowly changing dimensions can
            create dimensions with billions of rows. Consider a User dimension
            for a social network with 200 million active users. If you track
            every change to user segment, country, profile status, and account
            tier as Type 2, and users average 10 attribute changes per year, the
            dimension grows to 2 billion rows over one year. Joins from fact to
            dimension now scan billions of rows. If the effective date logic in
            the join predicate is incorrect or missing, a single fact can match
            multiple dimension rows, producing duplicate metrics. A query
            counting daily active users might return 15 million instead of 10
            million because some users match two dimension rows. This failure is
            often silent, discovered only when metrics are compared to
            operational system counts and discrepancies are investigated.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> High cardinality attributes that
              change frequently should not be full Type 2 dimensions. User
              attributes like last_login_date, session_count, or current_status
              are better as Type 1 or stored as degenerate attributes directly
              in fact tables. Reserve Type 2 for analytical attributes that
              change infrequently and are critical for historical trend
              analysis.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Snowflake Fan Out Bugs:
            </div>
            Snowflake schemas introduce multi hop join paths that can produce
            incorrect results through fan out. Suppose a Product fact joins to
            Category, and Category joins to multiple Theme rows because the
            relationship is many to many but not properly modeled. A query
            grouping by product and theme returns duplicate rows for products in
            multiple themes, inflating revenue. This happens when BI tools or
            query writers assume all joins are one to many but the snowflaked
            hierarchy has hidden many to many relationships. Another version
            occurs when effective dates are not propagated correctly through the
            hierarchy. A fact dated January 15 joins to Product valid January 1
            to February 1, which joins to Category valid December 1 to March 1,
            which joins to multiple historical Theme rows. The query planner
            matches multiple Theme rows, and revenue is multiplied. Debugging
            these issues is hard because the data looks correct in isolation.
            Products have categories, categories have themes, everything
            validates. The bug only appears in aggregated results, and root
            cause requires analyzing join cardinality and testing with known
            control totals.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Late Arriving Data:
            </div>
            Facts arriving hours or days late create metric instability. A
            Payment fact arrives 6 hours after the corresponding Order. If the
            ETL pipeline assumes dimensions exist and assigns surrogate keys
            synchronously, the late Payment cannot find its Order dimension row
            and gets a null foreign key. Queries joining to Order drop these
            rows, so revenue appears to dip, then corrects when a backfill job
            runs. This becomes worse with Type 2 dimensions. The late arriving
            Payment must join to the dimension row that was current at the
            payment timestamp, not the load timestamp. If the dimension updated
            in those 6 hours, the surrogate key lookup fails or picks the wrong
            version. Metrics fluctuate as correction jobs run, and stakeholders
            lose trust. Production systems handle this with explicit late
            arrival windows, staging tables, and reconciliation jobs. Facts
            arriving within 6 hours are reprocessed through surrogate key lookup
            with temporal logic. Facts older than 6 hours trigger alerts.
            Metrics dashboards include "as of" timestamps and highlight periods
            where late data is still arriving. This infrastructure is complex
            but necessary at scale.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Modeling High Cardinality as Dimensions:
            </div>
            Modeling attributes with millions of unique values, like search
            query strings, device IDs, or IP addresses, as dimensions creates
            huge, rarely used tables. A SearchQueries dimension with 500 million
            rows where 90 percent appear only once provides no analytical value
            but slows down every join and increases storage by gigabytes. These
            attributes should be stored as degenerate dimensions directly in the
            fact table or excluded entirely. Useful dimensions have manageable
            cardinality, typically under 10 million rows, and are frequently
            used in group by and filter clauses. High cardinality attributes can
            be hashed into buckets or aggregated at load time into useful
            categories.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Wrong grain is the most expensive mistake. Backfilling a fact
                  table from 10 billion rows at order level to 50 billion rows
                  at line item level can take weeks and require migrating
                  hundreds of downstream queries and dashboards.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Type 2 dimensions can explode to billions of rows if applied
                  naively to high cardinality attributes that change frequently.
                  A 200 million user dimension can grow to 2 billion rows in one
                  year, slowing joins and risking duplicate metrics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snowflake schemas risk fan out bugs where multi hop joins
                  produce duplicate rows if relationships are many to many or
                  effective date logic is incorrect. Debugging requires
                  analyzing join cardinality, not just inspecting data.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving facts create metric instability. A Payment fact
                  arriving 6 hours late may miss its dimension row or pick the
                  wrong Type 2 version, causing revenue to fluctuate by 2 to 10
                  percent until backfill jobs correct it.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Modeling high cardinality attributes like search queries or
                  device IDs as dimensions creates 100 million to 1 billion row
                  tables that are rarely useful. Store these as degenerate
                  attributes in fact tables or aggregate into categories.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production dimensional models require infrastructure for late
                  data handling, surrogate key temporal lookups, and
                  reconciliation jobs. Metrics dashboards must show "as of"
                  timestamps and flag periods where late data is still arriving.
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
                  Wrong grain failure: E-commerce Orders fact at order level
                  (10M rows/day). Product team needs "average discount by
                  product SKU and promotion". Analysts join to OrderLines, but
                  complex GROUP BY logic produces 8 percent higher revenue due
                  to double counting. Fix requires new LineItems fact (50M
                  rows/day) and 90 day migration project.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exploding dimension: User dimension with 200M users, Type 2
                  tracking 5 attributes. Users change segment monthly on
                  average. After 1 year, dimension has 1.2B rows. Query joining
                  VideoPlays fact to User dimension scans 1.2B dimension rows,
                  increasing query time from 5 seconds to 45 seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arrival bug: Orders fact loads at 9am with order_time
                  8:50am. Payments fact arrives at 3pm with payment_time 8:55am.
                  Payment lookup for order_key based on order_time finds nothing
                  because Orders fact not yet loaded at 8:55am. Payment gets
                  null order_key, revenue drops 3 percent until nightly
                  backfill.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalModelingCommonFailureModesInDimensionalModels;
