import type { Component } from "solid-js";

const LessonSlowlyChangingDimensionsWhatAreSlowlyChangingDimensionsScd: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are Slowly Changing Dimensions (SCD)?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Problem:
            </div>
            Imagine you run analytics for an ecommerce platform with 50 million
            customers. Yesterday, customer Alice made a purchase while she was
            in the Gold loyalty tier and lived in Seattle. Today, she moved to
            Portland and got upgraded to Platinum. When you analyze her
            historical orders next week, should her yesterday's order show Gold
            or Platinum? Seattle or Portland? Slowly Changing Dimensions (SCD)
            are design patterns that solve exactly this problem. A dimension is
            an entity you analyze by, such as Customer, Product, Store, or
            Subscription Plan. Facts are the events you're measuring, like
            orders, page views, or payments. When dimension attributes change
            over time, you need a strategy for preserving the correct historical
            meaning of your facts.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Why This Matters:
            </div>
            At scale, these decisions affect billions of rows and millions of
            dollars in business decisions. Retailers like Walmart process tens
            of thousands of orders per second. Customer profiles change at maybe
            1% of rows per day, but those changes are analytically critical. If
            you overwrite Alice's old address, every historical analysis will
            incorrectly show all her past orders came from Portland.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Many teams default to
              overwriting in place because it's simpler. This works until
              someone asks "What was our revenue by customer segment last
              quarter using the segments they actually had then?" and you
              realize you've lost that history forever.
            </div>
            SCD patterns define a contract between your data ingestion, storage,
            and reporting layers about how change is modeled and what
            "historical truth" means. The pattern you choose determines storage
            costs, query complexity, and what questions your analysts can
            answer.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dimensions are entities like Customer or Product that facts
                  reference via keys, while facts are events like orders or
                  payments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Changes to dimension attributes create a choice: preserve
                  history or overwrite, affecting all historical analysis
                  downstream
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At enterprise scale with 1% daily change rate on 50 million
                  customers, you're handling 500,000 dimension updates per day
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The SCD pattern you choose is a fundamental contract that
                  affects storage size, query complexity, and analytical
                  capabilities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Wrong choice can mean losing critical history or exploding
                  storage costs from billions of unnecessary version rows
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
                  A customer moves from Seattle to Portland: do historical
                  orders show old city or new city?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A product changes from category Electronics to Home Goods:
                  does last year's revenue analysis use old or new category?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A subscription plan price increases from $9.99 to $14.99: what
                  price do you show for renewals from last month?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSlowlyChangingDimensionsWhatAreSlowlyChangingDimensionsScd;
