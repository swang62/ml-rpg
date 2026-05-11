import type { Component } from "solid-js";

const LessonDimensionalModelingImplementingDimensionalModelsAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementing Dimensional Models at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Defining Grain and Business Process:
            </div>
            Implementing a dimensional model starts with business process
            analysis, not technical design. You identify core business processes
            like "customer places order", "driver completes trip", or "user
            watches video", and define the grain for each. This is a
            collaborative effort between data engineers, analysts, and business
            stakeholders. Each grain must be precise and measurable: "one row
            per line item in a completed order", not "one row per transaction".
            For each process, you define the measures that matter. Revenue,
            quantity, duration, distance, and count are common. Then you
            identify the dimensions that can slice those measures: who placed
            the order, what product was purchased, where it shipped, when it
            occurred. This is codifying business logic into data structures.
            Getting it wrong means rebuilding later.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Surrogate Key Management:
            </div>
            Fact tables use surrogate keys for dimensions instead of natural
            keys from source systems. This decouples the warehouse from
            operational key churn and enables Type 2 slowly changing dimension
            tracking. When a fact row loads, the ETL pipeline must look up the
            correct surrogate key based on the natural key and, for Type 2
            dimensions, the effective date. For small dimensions with under 1
            million rows, surrogate key lookups are often in memory hash maps in
            the ETL job. Load the dimension into memory, hash on natural key,
            and resolve fact foreign keys in milliseconds per row. For large
            dimensions with 10 million to 1 billion rows, lookups are performed
            as joins in the warehouse. The ETL writes fact rows to a staging
            table with natural keys, then runs an UPDATE or merge statement
            joining to the dimension on natural key and effective date range. At
            companies like Uber processing 50 million trip events per day,
            surrogate key lookups for Driver and Rider dimensions (each 10
            million to 50 million rows with Type 2 history) are performed as SQL
            joins against partitioned dimension tables. The join predicate
            includes natural key and fact timestamp between effective start and
            end dates. With proper indexing and partition pruning, the lookup
            completes in 5 to 20 minutes for a daily batch.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Physical Design and Partitioning:
            </div>
            Logical design defines grain and relationships. Physical design
            determines query performance. Large fact tables are partitioned by a
            time column, typically event_date or event_timestamp bucketed to
            day. Most queries filter on recent time ranges: last 7 days, last 30
            days, last 12 months. Partitioning by date allows the query planner
            to skip 90 to 99 percent of data. For a fact table with 100 billion
            rows spanning 3 years, partitioning by day creates roughly 1000
            partitions. A query filtering on last 7 days scans 7 partitions with
            200 million rows each, totaling 1.4 billion rows, instead of the
            full 100 billion. With columnar compression and predicate pushdown,
            this query might scan 50 GB instead of 3 TB and finish in 8 seconds
            instead of several minutes. Sort keys or clustering keys within each
            partition further improve performance. Sorting by high cardinality
            foreign keys like customer_key or product_key allows range scans
            when filtering on dimension attributes. Cloud warehouses like
            Snowflake, BigQuery, and Redshift automatically manage micro
            partitions and zone maps, but choosing the right sort key still
            matters. At Netflix, fact tables sorted by content_key and date
            enable sub 10 second queries filtering on specific titles or genres
            over billions of plays.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Pre aggregated summary tables are
              critical for high traffic dashboards. A daily summary with one row
              per product per store per day might have 50 million rows versus 5
              billion in the raw fact. Executive dashboards query the summary
              and get sub 3 second response times. Detailed analysis queries the
              raw fact when needed.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Handling Schema Evolution:
            </div>
            Dimensional models evolve as business needs change. Adding a new
            attribute to a dimension is straightforward: alter the table,
            backfill nulls or default values, and update ETL. Adding a new
            measure to a fact table is similar. But changing grain, splitting
            dimensions, or deprecating attributes requires careful coordination.
            Changes to shared conformed dimensions impact multiple fact tables.
            Adding a new region hierarchy to a Geography dimension used by
            Sales, Inventory, and Support facts requires updating all three fact
            loading pipelines and validating metrics across domains. Many teams
            validate changes using shadow tables or dual running models, then
            compare aggregated metrics over 90 day windows to ensure differences
            are understood before cutover. Deprecating old schemas involves long
            transition periods. A new fact table at finer grain is created and
            loaded in parallel with the old one. Dashboards are gradually
            migrated over weeks or months. The old fact table is marked
            deprecated but remains queryable for 6 to 12 months while stragglers
            migrate. At scale, complete schema migrations can take a year.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Governance and Metric Definitions:
            </div>
            At large organizations, dimensional models power thousands of
            dashboards and metrics. Governance ensures consistent definitions. A
            metrics catalog or semantic layer maps business terms like "Active
            User", "Gross Bookings", or "Conversion Rate" to specific fact
            tables, dimensions, filters, and aggregation logic. For example,
            "Active User" might be defined as "distinct user_key from Logins
            fact where login_date in last 30 days and login_type not in
            ('automated', 'test')". This definition is versioned and owned by a
            data governance team. When dashboards or APIs need Active User
            counts, they reference the semantic definition, not raw SQL. This
            prevents metric fragmentation where Sales, Product, and Finance each
            compute Active Users differently and get conflicting numbers.
            Companies like Airbnb and Uber build internal tools that expose
            dimensional models through a semantic layer. Users query using
            business terms, and the tool generates SQL with correct joins,
            filters, and aggregations. This reduces errors and enables self
            service analytics without requiring every analyst to understand
            surrogate keys, Type 2 logic, or partition schemes.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="font-weight: bold; margin-bottom: 12px; text-align: center; font-size: 14px">
                Surrogate Key Lookup Flow
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; min-width: 200px; text-align: center; font-size: 12px">
                  <strong>Fact Staging Table</strong>
                  <div style="margin-top: 4px">
                    trip_id, driver_id (natural), trip_date
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓ JOIN</div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; min-width: 200px; text-align: center; font-size: 12px">
                  <strong>Driver Dimension</strong>
                  <div style="margin-top: 4px">
                    driver_key (surrogate), driver_id, effective_start,
                    effective_end
                  </div>
                </div>
                <div style="font-size: 22px; font-weight: bold">↓ UPDATE</div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px; min-width: 200px; text-align: center; font-size: 12px">
                  <strong>Trips Fact Table</strong>
                  <div style="margin-top: 4px">
                    trip_id, driver_key (resolved), trip_date, measures
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
                  Implementing dimensional models starts with business process
                  analysis. Define grain precisely: "one row per completed
                  trip", not "one row per transaction". This is collaborative
                  work with stakeholders, not just technical design.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Surrogate key lookups for small dimensions (under 1M rows) use
                  in memory hash maps in ETL. For large dimensions (10M to 1B
                  rows), lookups are SQL joins in the warehouse with effective
                  date predicates, completing in 5 to 20 minutes for daily
                  batches.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partitioning by date is critical. A 100 billion row fact
                  partitioned by day allows queries filtering on last 7 days to
                  scan 1.4 billion rows instead of 100 billion, reducing scan
                  from 3 TB to 50 GB and query time from minutes to 8 seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sort keys within partitions improve performance. Sorting by
                  customer_key or product_key enables range scans when filtering
                  on dimension attributes, reducing query time by 2x to 5x for
                  common patterns.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre aggregated summary tables are essential for high traffic
                  dashboards. A daily product summary with 50M rows versus 5B in
                  raw fact enables sub 3 second queries for executives while
                  detailed analysis still queries the raw fact.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Governance and semantic layers prevent metric fragmentation.
                  Mapping business terms like "Active User" to specific fact
                  tables, filters, and logic ensures Sales, Product, and Finance
                  report consistent numbers, critical at organizations with
                  thousands of dashboards.
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
                  Uber processes 50M trip events per day. ETL loads trips to
                  staging with natural driver_id, joins to Driver dimension (30M
                  rows with Type 2 history) on driver_id and trip_timestamp
                  between effective dates, resolves driver_key, and inserts into
                  Trips fact. Lookup completes in 12 minutes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix VideoPlays fact has 200B rows, partitioned by
                  play_date. Query "top 10 titles by country last 7 days" scans
                  7 partitions (1.5B rows, 60 GB compressed), finishes in 4
                  seconds. Without partitioning, same query scans 6 TB and takes
                  3 minutes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb semantic layer defines "Gross Bookings" as
                  SUM(booking_amount) from Bookings fact where booking_status =
                  'confirmed' and booking_date &gt;= CURRENT_DATE - 30. Users
                  query "Gross Bookings by country last month" using business
                  terms, tool generates SQL with correct joins to Country
                  dimension and filters.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalModelingImplementingDimensionalModelsAtScale;
