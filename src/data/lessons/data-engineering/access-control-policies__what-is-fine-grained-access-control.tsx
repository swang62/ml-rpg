import type { Component } from "solid-js";

const LessonAccessControlPoliciesWhatIsFineGrainedAccessControl: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Fine-Grained Access Control?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Fine-Grained Access Control (FGAC)</strong> means
                controlling data access at the row, column, or even cell level,
                rather than just at the table or database level. It lets you
                share a single physical dataset across many users while
                enforcing who can see which specific rows and columns.
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Problem:
            </div>
            Traditional access control treats entire tables as the smallest
            unit: either you can query the whole table or you cannot. But when
            you centralize petabytes of data from multiple business units into
            one warehouse, this breaks down. You might have customer support
            tickets where US support agents should only see US customers, EU
            agents only EU customers, and legal sees everything. Copying data
            into separate restricted tables creates a maintenance nightmare.
            With thousands of users and hundreds of tables, you would end up
            with tens of thousands of filtered copies that diverge as schemas
            evolve.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Three Control Dimensions:
            </div>
            FGAC operates across three dimensions. First,{" "}
            <strong>row level security</strong> filters which rows you see based
            on predicates. For example, adding{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE customer_region IN user_permitted_regions
            </code>{" "}
            to every query. Second, <strong>column level security</strong>{" "}
            controls which columns appear in results. Analysts might see
            aggregate revenue but not individual customer names. Third,{" "}
            <strong>dynamic data masking</strong> transforms values based on who
            is querying. A manager sees full credit card numbers, while customer
            service sees only the last four digits. The same physical column
            returns different values depending on caller identity.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Systems like Databricks Unity
              Catalog, Snowflake, BigQuery, and AWS Lake Formation all implement
              variations of FGAC. The patterns are general: evaluate policies
              close to the data engine, push filters down to storage, and
              centralize policy definitions so you do not duplicate business
              logic.
            </div>
            The fundamental shift is from "can you access this table" to "can
            you access this specific row and column given your attributes and
            the data's sensitivity classification."
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">User Query</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    SELECT * FROM orders
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Policy Engine</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Add filters &amp; masks
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Rewritten Query</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    WHERE region='US'
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
                  FGAC controls access at row, column, or cell level rather than
                  entire tables
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Row level security adds filter predicates, column security
                  hides columns, masking transforms visible values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralizing data without FGAC would require maintaining
                  thousands of filtered copies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Modern data platforms evaluate policies in the query engine
                  and push filters to storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision is enforced based on caller identity attributes like
                  role, region, or clearance level
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
                  Support agent queries customer table but only sees customers
                  from their assigned region due to row filter
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Analyst runs revenue query and sees totals but customer names
                  are masked to NULL due to column restrictions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Same credit card column returns full number to fraud team but
                  only last 4 digits to customer service based on role
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAccessControlPoliciesWhatIsFineGrainedAccessControl;
