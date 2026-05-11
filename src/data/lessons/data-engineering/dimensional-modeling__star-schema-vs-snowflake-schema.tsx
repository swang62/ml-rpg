import type { Component } from "solid-js";

const LessonDimensionalModelingStarSchemaVsSnowflakeSchema: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Star Schema vs Snowflake Schema
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Fundamental Difference:
          </div>
          Both schemas organize facts and dimensions, but they differ in how
          dimensions are structured. A star schema keeps each dimension as a
          single denormalized table. The fact table sits in the center, and
          dimensions connect directly with one hop joins. A snowflake schema
          normalizes dimensions into multiple related tables, creating
          hierarchies. Consider a Product dimension. In a star schema, one
          Product table contains product_key, product_name, brand_name,
          category_name, and subcategory_name. Every product row repeats the
          brand and category strings. In a snowflake schema, Product references
          Brand, Brand references Category, and Category references Subcategory.
          This eliminates redundancy but requires four joins instead of one to
          get from fact to subcategory.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Star Schema Trade Off:
          </div>
          Star schemas prioritize query simplicity and performance. Most
          analytical queries join the fact to 3 to 10 dimensions in a single
          step. Query planners generate predictable execution plans, and BI
          tools handle them naturally. The cost is storage. A Customer dimension
          with 50 million rows might repeat country names, segment labels, and
          region codes millions of times. On modern columnar storage with
          compression, this overhead is often 10 to 30 percent of dimension
          size, manageable given storage costs. Star schemas shine when
          interactive latency matters. Dashboards refreshing every few seconds
          with dozens of concurrent users need sub 10 second response times.
          Keeping join depth at one hop reduces optimizer complexity and avoids
          fan out bugs.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Snowflake Schema Trade Off:
          </div>
          Snowflake schemas reduce storage and improve governance for reference
          data. Geographic hierarchies like City to State to Country to Region
          are managed in separate tables, each owned by a dedicated team. When a
          new country is added or a region boundary changes, only one small
          table updates. This matters in large enterprises where hierarchies are
          complex and change frequently. The cost is query complexity. Joining
          fact to subcategory now requires traversing Product, Brand, Category,
          and Subcategory. Each hop adds optimizer decisions and potential for
          mistakes. BI tools that assume star patterns may misinterpret multi
          hop joins, producing duplicate rows through incorrect fan out logic.
          Query times can degrade from seconds to minutes when data volumes
          exceed tens of billions of rows and join depth reaches 8 to 12 tables.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Snowflaking high cardinality
            dimensions rarely helps. Normalizing a 100 million row Customer
            table into Customer, Segment, and Region saves storage but slows
            every query. Reserve snowflaking for true reference hierarchies that
            are shared, stable, and managed separately.
          </div>
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            When to Choose Which:
          </div>
          Use star schemas when query performance and simplicity dominate,
          especially for dashboards and self service BI. Use snowflake schemas
          when dimension hierarchies are complex, managed by separate teams,
          change frequently, and storage savings or governance benefits outweigh
          query cost. Many large companies use hybrid approaches, keeping most
          dimensions as stars and snowflaking only a few complex hierarchies
          like organizational structures or product taxonomies.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
            <div style="display: flex; gap: 24px">
              <div style="flex: 1">
                <div style="text-align: center; font-weight: bold; margin-bottom: 10px; font-size: 13px">
                  Star Schema
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 12px">
                    <strong>Fact: Sales</strong>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">↓ 1 join</div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 11px">
                    <strong>Product</strong>
                    <div style="margin-top: 4px">
                      name, brand, category, subcategory
                    </div>
                  </div>
                </div>
              </div>
              <div style="flex: 1">
                <div style="text-align: center; font-weight: bold; margin-bottom: 10px; font-size: 13px">
                  Snowflake Schema
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; align-items: center">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 12px">
                    <strong>Fact: Sales</strong>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 11px">
                    <strong>Product</strong>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 11px">
                    <strong>Brand</strong>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">↓</div>
                  <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 11px">
                    <strong>Category</strong>
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
                Star schemas use single denormalized dimension tables, resulting
                in one hop joins from fact to any dimension attribute. Query
                plans are simple and predictable.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Snowflake schemas normalize dimensions into multiple tables,
                reducing storage redundancy by 10 to 40 percent for hierarchical
                reference data but increasing join depth to 3 to 8 hops.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Star schemas deliver better interactive performance. Typical
                queries finish in 2 to 10 seconds. Snowflake queries can take 10
                to 60 seconds or more when join depth exceeds 6 tables and fact
                volume exceeds tens of billions of rows.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Snowflake schemas improve governance when dimension hierarchies
                are owned by separate teams, change frequently, or are shared
                across many domains. Each normalized table can have clear
                ownership and update cadence.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                BI tools and query optimizers handle star schemas more reliably.
                Snowflake schemas risk fan out bugs where multi hop joins
                produce duplicate rows if effective date logic or cardinality
                assumptions are wrong.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid approaches are common at scale. Most dimensions stay
                denormalized as stars. Only complex hierarchies like
                organizational charts, product taxonomies, or geographic regions
                are snowflaked when governance benefits outweigh query costs.
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
                Star schema: Customer dimension (50M rows) includes
                customer_key, name, email, segment, region, country. Total size
                15 GB uncompressed. Queries join Sales fact to Customer in one
                step.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Snowflake schema: Customer (50M rows) -&gt; Segment (5 rows)
                -&gt; Region (20 rows) -&gt; Country (200 rows). Saves 2 GB but
                requires 3 joins. Query time increases from 4 seconds to 12
                seconds for "revenue by region last quarter".
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hybrid at Airbnb: Listing dimension stays denormalized with
                city, state, country in one table. Organizational hierarchy for
                internal teams is snowflaked into Team -&gt; Department -&gt;
                Division because it changes monthly and is managed by HR
                systems.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDimensionalModelingStarSchemaVsSnowflakeSchema;
