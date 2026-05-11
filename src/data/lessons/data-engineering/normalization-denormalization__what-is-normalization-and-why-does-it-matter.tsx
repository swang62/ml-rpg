import type { Component } from "solid-js";

const LessonNormalizationDenormalizationWhatIsNormalizationAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Normalization and Why Does It Matter?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Idea:
            </div>
            Normalization is a modeling technique that stores each piece of
            information exactly once by splitting data into multiple related
            tables. Instead of writing "John Smith, 123 Main St" in every order
            row, you store customer details in a customers table and reference
            it through an identifier. Each fact lives in one canonical place.
            This eliminates redundancy and prevents update anomalies. When John
            moves to a new address, you update one row in the customers table,
            not thousands of order records. Foreign keys and constraints make
            relationships explicit, catching bugs before they corrupt your data.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              How It Works in Practice:
            </div>
            Consider an ecommerce system handling 50,000 orders per second. The
            normalized schema has separate tables: customers, addresses,
            products, inventory, orders, and order_items. Each order references
            customer_id and each order_item references product_id. When a
            product price changes, you touch one row in the products table. This
            keeps writes fast and local, typically completing in under 20
            milliseconds even under heavy load.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Amazon's core order service uses
              highly normalized schemas to handle millions of writes daily. This
              enables strict transactional guarantees and keeps each write
              operation small and predictable.
            </div>
            The tradeoff appears when you need to read data. Fetching an order
            with full customer and product details requires joining 6 to 10
            tables. At billions of rows, these joins can push query latency
            beyond acceptable thresholds for customer facing APIs that need to
            respond in 50 to 150 milliseconds.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Choose Normalization:
            </div>
            Normalization shines in Online Transaction Processing (OLTP) systems
            where write correctness is paramount. If your workload involves many
            concurrent updates, strong consistency requirements, and
            transactional invariants like "inventory cannot go negative,"
            normalization makes those constraints easy to enforce. The cleaner
            data model also simplifies reasoning about your system during
            development and debugging.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Normalized Schema Example
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">customers</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    id, name, email
                  </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">orders</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      id, customer_id, date
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">order_items</strong>
                    <div style="font-size: 12px; margin-top: 6px">
                      order_id, product_id, qty
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">products</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    id, title, price, category
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
                  Stores each fact exactly once, eliminating redundancy across
                  tables and preventing data inconsistencies during updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enables fast writes by keeping operations local; updating a
                  product price touches one row instead of millions of order
                  records
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enforces data integrity through foreign keys and constraints,
                  catching invalid references before they corrupt the database
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Increases read complexity at scale; joining 6 to 10 tables
                  across billions of rows can exceed latency budgets of 50 to
                  150 milliseconds for customer facing queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Best suited for OLTP workloads with 10,000 to 100,000
                  concurrent writes per second requiring strong transactional
                  guarantees
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
                  Ecommerce order system: Separate tables for customers (id,
                  name, email), orders (id, customer_id, date), order_items
                  (order_id, product_id, quantity), and products (id, title,
                  price). Updating customer email touches one row.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Banking system: Account table (id, balance), transaction table
                  (id, account_id, amount, timestamp). Each transaction
                  references the account, making it easy to enforce "balance
                  cannot go negative" constraints.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNormalizationDenormalizationWhatIsNormalizationAndWhyDoesItMatter;
