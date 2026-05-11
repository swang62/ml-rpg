import type { Component } from "solid-js";

const LessonDataWarehousingKimballVsInmonTwoDesignPhilosophies: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Kimball vs Inmon: Two Design Philosophies
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Two fundamentally different approaches govern how organizations
            build data warehouses. The Inmon top down method advocates building
            a centralized, normalized enterprise data warehouse first, then
            feeding departmental data marts from that conformed core. The
            Kimball bottom up approach builds dimensional data marts first
            around specific business processes, integrating them over time
            through conformed dimensions. Inmon prioritizes a single source of
            truth. The enterprise warehouse uses normalized modeling (third
            normal form) to eliminate redundancy and maintain strict data
            integrity. This centralized approach yields consistent definitions
            and strong governance, but requires significant upfront investment
            in enterprise data modeling and longer time to deliver initial
            business value. Organizations adopting Inmon typically spend 6 to 18
            months building the core before departments see their first mart.
            Kimball delivers faster wins by building star schema marts directly
            for high priority business areas like sales or inventory. Each mart
            is optimized for its specific analytical workload with denormalized
            dimensions for query performance. The key to avoiding chaos is
            conformed dimensions: shared dimension tables (customer, product,
            date) with identical surrogate keys and attribute definitions across
            marts. This allows later integration and cross functional reporting.
            Implementation timelines are typically 3 to 6 months per mart. The
            trade off is clear. Inmon reduces long term technical debt and
            semantic drift at the cost of delayed business value and higher
            initial expenditure. Kimball gets data into users' hands quickly but
            risks divergent metrics if dimension conformance discipline breaks
            down. Many modern implementations blend both: build a lightweight
            conformed core (key dimensions and shared business rules) while
            rapidly delivering mart after mart.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; gap: 24px; justify-content: center">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Inmon (Top Down)
                  </strong>
                  <div style="font-size: 12px; line-height: 1.6">
                    1. Enterprise DW (normalized)
                    <br />
                    2. Then departmental marts
                    <br />
                    Time: 6–18 months
                    <br />
                    Risk: Delayed value
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px; display: block; margin-bottom: 8px">
                    Kimball (Bottom Up)
                  </strong>
                  <div style="font-size: 12px; line-height: 1.6">
                    1. Build marts first (star schema)
                    <br />
                    2. Conformed dimensions
                    <br />
                    Time: 3–6 months per mart
                    <br />
                    Risk: Semantic drift
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
                  Inmon builds a normalized enterprise warehouse first requiring
                  6 to 18 months upfront but ensures consistent semantics and
                  strong governance across all downstream marts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kimball delivers business value in 3 to 6 months per mart by
                  building dimensional models directly, trading upfront
                  coordination for speed to insight
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Conformed dimensions are the critical success factor for
                  Kimball: shared customer, product, and date dimensions with
                  identical surrogate keys prevent metric divergence across
                  marts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inmon reduces long term technical debt and reconciliation
                  costs but increases initial capital expenditure and delays ROI
                  on warehouse investment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kimball risks siloed definitions if discipline breaks: sales
                  mart and finance mart calculating revenue differently causes
                  executive confusion and erosion of trust
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approaches build a lightweight conformed core (key
                  dimensions and shared business rules) while rapidly delivering
                  Kimball style marts on top
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
                  Large retailer using Inmon: 12 month project to model
                  enterprise product, customer, store, and transaction entities
                  in third normal form before building first sales mart
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce company using Kimball: delivered order fulfillment
                  mart in 4 months with conformed customer and product
                  dimensions, then added marketing mart in 3 months reusing same
                  dimensions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial services hybrid: built conformed account, customer,
                  and transaction dimensions centrally (4 months), then teams
                  independently built risk mart, compliance mart, and trading
                  mart (2 to 3 months each) all joining to shared dimensions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataWarehousingKimballVsInmonTwoDesignPhilosophies;
