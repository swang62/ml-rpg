import type { Component } from "solid-js";

const LessonDifferentialPrivacyAllocatingPrivacyBudgetsAndChoosingEpsilonInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Allocating Privacy Budgets and Choosing Epsilon in Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Privacy Budget Allocation:</strong> Choosing epsilon
              values and distributing budget across queries is a policy decision
              balancing privacy protection against analytical utility. There is
              no universally correct epsilon—the choice depends on data
              sensitivity, regulatory requirements, and acceptable accuracy
              loss.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Epsilon Guidelines
            </p>
            <p>
              Practical epsilon ranges and their interpretations:{" "}
              <strong>epsilon less than 0.1:</strong> Very strong privacy.
              Outputs are nearly independent of any individual record. High
              noise, significant accuracy loss. Reserve for highly sensitive
              data (medical, financial). <strong>epsilon 0.1 to 1:</strong>{" "}
              Strong privacy. Individual influence is bounded to roughly 10-170%
              change in output probability. Standard for most privacy-sensitive
              applications. <strong>epsilon 1 to 10:</strong> Moderate privacy.
              Provides plausible deniability but determined attackers may
              succeed. Acceptable for less sensitive data or when utility
              requirements dominate. <strong>epsilon greater than 10:</strong>{" "}
              Weak privacy. Primarily useful for demonstrating DP compliance
              rather than meaningful protection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Budget Distribution Strategies
            </p>
            <p>
              <strong>Per-query allocation:</strong> Assign fixed epsilon to
              each query type. Simple but inflexible—all queries get same budget
              regardless of importance. <strong>Prioritized allocation:</strong>{" "}
              Critical queries get larger budgets; exploratory queries get
              smaller budgets. Requires query classification upfront.{" "}
              <strong>Adaptive allocation:</strong> Start with small epsilon,
              increase for queries that add significant value. Complex to
              implement but maximizes utility.{" "}
              <strong>Per-user budgets:</strong> Each user has their own budget,
              preventing one analyst from exhausting shared budget.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Renewal Policies
            </p>
            <p>
              Privacy budget is consumed over time. Options:{" "}
              <strong>Lifetime budget:</strong> Once exhausted, no more queries
              allowed on that dataset. Strongest protection but limits long-term
              analysis. <strong>Annual renewal:</strong> Budget resets each
              year. Assumes adversary cannot combine cross-year queries (may not
              be true). <strong>Rolling window:</strong> Budget covers last N
              days of queries. Balances ongoing analysis with finite exposure.
              Choose based on threat model and business needs.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Starting Point:</strong> For most production systems,
              start with epsilon=1 per query, total budget of epsilon=10 per
              year, and monitor utility. Adjust based on actual accuracy
              requirements and privacy incident risk tolerance.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Epsilon &lt; 0.1 strong privacy, 0.1-1 standard, 1-10
                  moderate, &gt;10 weak
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per-query, prioritized, or adaptive allocation strategies for
                  budget distribution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Renewal: lifetime (strongest), annual, or rolling window based
                  on threat model
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
                  Starting point: epsilon=1 per query, epsilon=10 annual budget
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per-user budgets prevent one analyst from exhausting shared
                  budget
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDifferentialPrivacyAllocatingPrivacyBudgetsAndChoosingEpsilonInProduction;
