import type { Component } from "solid-js";

const LessonDataWarehousingDimensionalModelingStarAndSnowflakeSchemas: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Dimensional Modeling: Star and Snowflake Schemas
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Dimensional modeling organizes data for analytical queries by
            separating measurements (facts) from descriptive context
            (dimensions). A fact table contains quantitative metrics at a
            specific grain, like individual order lines or page views, with
            foreign keys pointing to dimension tables that provide rich
            descriptive attributes. This structure makes business questions
            natural: slice revenue facts by customer dimension, dice by product
            and time dimensions, and drill down from category to SKU. Star
            schema denormalizes dimensions into single wide tables. The customer
            dimension includes all attributes from name and email to city,
            state, and country in one table. Queries join the fact table to
            typically 3 to 8 dimension tables in a simple star pattern, and
            query optimizers handle these predictable joins efficiently. Amazon
            Redshift queries scanning 100 to 500 GB complete in 5 to 30 seconds
            on mid sized clusters when star schemas align with distribution
            keys. The trade off is storage: dimension attributes are duplicated
            across multiple dimension records when using Slowly Changing
            Dimension (SCD) Type 2 to track history. Snowflake schema normalizes
            dimensions into related tables. Customer dimension splits into
            customer, city, state, and country tables linked by foreign keys,
            saving storage by eliminating duplication. However, queries now
            require more joins: fact to customer to city to state to country.
            Each additional join introduces risk of poor join strategy
            selection, data skew on join keys, and sensitivity to statistics
            freshness. In practice, the storage savings rarely justify the
            performance complexity for analytical workloads on modern columnar
            storage with aggressive compression. Dimension surrogate keys are
            critical. Instead of joining facts to dimensions on natural business
            keys like customer email or product SKU (which can change), assign
            each dimension row a synthetic integer surrogate key. Facts
            reference these stable surrogates, making joins faster (integer
            equality) and enabling SCD Type 2 history tracking where multiple
            surrogate keys can represent the same business entity across time.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 16px; align-items: center">
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 100px; text-align: center; font-size: 12px">
                    <strong>Date</strong>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 100px; text-align: center; font-size: 12px">
                    <strong>Customer</strong>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; width: 100px; text-align: center; font-size: 12px">
                    <strong>Product</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; font-size: 20px; font-weight: bold">
                  <span>↘</span>
                  <span>↓</span>
                  <span>↙</span>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Sales Fact</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    order_id, revenue, quantity
                    <br />+ dimension FKs
                  </div>
                </div>
                <div style="font-size: 11px; margin-top: 4px; text-align: center; max-width: 400px">
                  <strong>Star Schema:</strong> Fact joins directly to
                  denormalized dimensions (3–8 joins typical)
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
                  Fact tables store measurements at a clearly defined grain
                  (order line, page view, transaction) with foreign keys to
                  dimensions and numeric metrics like revenue, quantity,
                  duration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Star schema denormalizes dimensions into wide tables enabling
                  3 to 8 simple joins, completing queries scanning 100 to 500 GB
                  in 5 to 30 seconds on optimized Amazon Redshift clusters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snowflake schema normalizes dimensions to save storage but
                  adds join complexity and sensitivity to query planner
                  statistics, rarely justified given columnar compression
                  already achieves 5 to 10x size reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Surrogate keys (synthetic integers) assigned to each dimension
                  row enable faster integer joins and Slowly Changing Dimension
                  (SCD) Type 2 history where multiple surrogates track one
                  business entity over time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Wrong join strategy on star schema (broadcasting a large
                  dimension instead of hash partitioning) can explode memory
                  usage and spill to disk, pushing query latency from seconds to
                  minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Conformed dimensions shared across multiple fact tables
                  (customer, product, date with identical surrogate keys) enable
                  drill across queries that combine metrics from different
                  business processes
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
                  Sales fact table with grain of one row per order line: columns
                  include order_line_id, order_date_key (FK to date dimension),
                  customer_key (FK to customer dimension), product_key (FK to
                  product dimension), quantity, unit_price, revenue
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Customer dimension with surrogate key customer_key, business
                  key customer_id, and SCD Type 2 tracking: customer_key 1001
                  and 1002 both reference customer_id ABC123, representing
                  before and after address change with effective_from and
                  effective_to dates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snowflake normalized customer dimension split into customer
                  (customer_key, name, city_key FK), city (city_key, city_name,
                  state_key FK), state (state_key, state_name, country_key FK),
                  requiring 4 joins instead of 1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataWarehousingDimensionalModelingStarAndSnowflakeSchemas;
