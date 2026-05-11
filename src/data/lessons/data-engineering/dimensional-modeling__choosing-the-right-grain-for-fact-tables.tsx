import type { Component } from "solid-js";

const LessonDimensionalModelingChoosingTheRightGrainForFactTables: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing the Right Grain for Fact Tables
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              What Grain Means:
            </div>
            Grain defines what each row in a fact table represents. It is the
            most critical design decision because it is expensive to change.
            Getting it wrong means rebuilding the fact table and migrating all
            downstream dashboards and metrics. Grain must be specific: "one row
            per completed order", "one row per product line item", or "one row
            per user session". The grain determines which measures make sense
            and which dimensions can be attached. An Orders fact at order level
            can store total_amount and item_count. It can join to Customer and
            OrderDate dimensions. But it cannot accurately store individual
            product discounts or taxes because those vary by line item. Analysts
            trying to compute product level margins will build workarounds that
            often produce incorrect results.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Granularity Trade Off:
            </div>
            Finer grain means more rows and larger tables but greater analytical
            flexibility. A LineItems fact at line item level might have 5 to 10
            times more rows than an Orders fact. If Orders has 2 billion rows,
            LineItems could reach 15 billion rows and 8 TB compressed. Queries
            scanning all rows take longer, and partition pruning becomes
            critical. Storage costs increase, but the benefit is that every
            product level question can be answered accurately without joins to
            separate tables or complex logic. Coarser grain reduces storage and
            speeds up queries that naturally align with that grain. If 80
            percent of business questions are "revenue by customer segment and
            month", an order level fact is perfect. But when product teams later
            need "discount rate by product category and promotion type", you
            face a choice: add a separate LineItems fact, or build
            approximations that risk double counting.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Changing grain after the fact table
              is in production often requires backfilling billions of rows and
              rewriting hundreds of downstream queries and dashboards. This can
              take weeks or months. Get grain right early by interviewing
              stakeholders about future analytical needs, not just current ones.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Multiple Fact Tables at Different Grains:
            </div>
            Many dimensional models include multiple fact tables at different
            grains for the same business process. A retail warehouse might have
            DailySales (one row per store per product per day), Transactions
            (one row per checkout transaction), and LineItems (one row per
            scanned item). High level dashboards query DailySales for speed.
            Detailed product analysis queries LineItems. This approach trades
            storage and ETL complexity for query performance tailored to use
            cases. At companies handling massive scale, pre aggregated fact
            tables are common. Netflix might maintain a VideoPlays fact at play
            level with 200 billion rows, and a DailyContentMetrics fact with one
            row per title per day with 500 million rows. Executives querying
            "top 10 titles by country last week" hit the pre aggregated table
            and get results in under 2 seconds instead of scanning billions of
            raw plays.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Common Grain Mistakes:
            </div>
            The most frequent mistake is modeling at too coarse a grain, then
            discovering you need finer detail. For example, designing a
            Subscriptions fact at monthly snapshot grain, then realizing you
            need to track mid month plan changes or cancellations. Another
            mistake is mixing grains in a single fact table, such as some rows
            representing orders and others representing refunds. This leads to
            confusing measures and complex filters in every query.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Grain defines what one row represents and must be precise:
                  "one row per line item" or "one row per session". Ambiguous
                  grain leads to misinterpretation and incorrect metrics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Finer grain increases row count by 5 to 10 times but enables
                  more detailed analysis. A fact table with 10 billion rows at
                  transaction level might expand to 80 billion rows at line item
                  level.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Coarser grain reduces storage and improves query speed for
                  high level questions, but limits ability to answer detailed
                  product or attribute level questions without additional fact
                  tables or approximations.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multiple fact tables at different grains are common in
                  production. A retail system might have daily aggregates for
                  executives (500M rows), transactions for analysts (10B rows),
                  and line items for product teams (80B rows).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Changing grain after deployment requires backfilling and
                  migrating downstream queries. At scale, this can involve
                  rewriting billions of rows and hundreds of dashboards, taking
                  weeks or months.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre aggregated fact tables improve performance for common
                  queries. Scanning a 500 million row daily summary takes 2 to 5
                  seconds versus 30 to 90 seconds scanning 50 billion raw events
                  for the same question.
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
                  Wrong grain: Trips fact at "one row per trip" stores
                  passenger_count but not individual passenger_id. Later,
                  product team needs "trips per unique passenger last 30 days".
                  Analysts must join to separate Passengers table, risking
                  double counting.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Right grain: Trips fact at "one row per passenger per trip".
                  Now passenger_count is derived by COUNT(DISTINCT trip_id)
                  grouped by trip attributes. Passenger level questions are
                  straightforward, at the cost of 2x to 4x more fact rows.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multiple grains at Netflix: VideoPlays fact (200B rows, play
                  level) for detailed analysis. DailyContentMetrics (500M rows,
                  title per day) for executive dashboards. Query "top 10 titles
                  last week by country" scans 50M rows instead of 15B, finishing
                  in 2 seconds.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDimensionalModelingChoosingTheRightGrainForFactTables;
