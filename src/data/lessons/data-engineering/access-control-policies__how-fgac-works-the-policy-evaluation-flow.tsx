import type { Component } from "solid-js";

const LessonAccessControlPoliciesHowFgacWorksThePolicyEvaluationFlow: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How FGAC Works: The Policy Evaluation Flow
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              From User to Data and Back:
            </div>
            Fine grained access control spans the entire request path.
            Understanding this flow is critical because policies must be
            enforced consistently across interactive queries, batch jobs, and
            even vector embeddings for generative AI applications. The journey
            starts with authentication. A user logs into a business intelligence
            tool like Looker. Authentication against an identity provider
            produces a token carrying not just user ID, but also attributes:
            team membership, regional scope, clearance level. For example,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              owns_customers_in_region=EU
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              clearance=finance_only
            </code>
            .
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Identity Context:</strong> The query arrives at the
                  data engine with a verified token containing user attributes
                  and group memberships.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Policy Lookup:</strong> The engine queries a central
                  policy store for applicable rules. For a 10 billion row fact
                  table, it might retrieve a predicate like{" "}
                  <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                    region IN permitted_regions
                  </code>{" "}
                  that reduces visibility to 100 million rows.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Query Rewrite:</strong> The optimizer injects row
                  filters and column masks into the logical plan. This happens
                  at compile time before execution begins.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Pushdown Execution:</strong> The rewritten query with
                  filters pushes down to storage or compute nodes. Every path to
                  data enforces the same policies.
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Permission Table Pattern:
            </div>
            Many implementations use a permission table to avoid massive OR
            predicates. Instead of generating{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE customer_id IN (1, 2, 3...1000000)
            </code>
            , the engine joins with a small table mapping users to allowed rows.
            This permission table typically has millions of rows versus billions
            in fact tables, stays highly cached in memory, and gets updated by
            identity provisioning systems.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Performance Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt; 1ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    POLICY LOOKUP
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">3-5s</div>
                  <div style="font-size: 10px; font-weight: 600">P50 QUERY</div>
                </div>
              </div>
            </div>
            The critical design goal is keeping policy evaluation cost under 1
            millisecond so that latency remains dominated by actual data
            processing, not by security checks. At scale with 200,000
            interactive queries daily, you cannot afford 10 milliseconds of
            policy overhead per query without violating Service Level Objectives
            (SLOs).
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policies are evaluated at query compile time and rewritten
                  into the logical plan before execution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Permission tables map users to allowed rows, avoiding massive
                  OR predicates with thousands of terms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy lookup must complete in under 1ms to avoid dominating
                  query latency at scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The same policies must apply across all data access paths:
                  SQL, batch jobs, vector search, and exports
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Identity tokens carry attributes like region and clearance
                  that drive policy decisions, not just user IDs
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
                  A query normally scanning 200 GB gets a permission table join
                  that filters to 2 GB before scan starts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User with 50 group memberships avoids generating WHERE clause
                  with 50 OR conditions by joining to pre computed permission
                  view
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data pipeline running as service principal inherits scoped
                  permissions and cannot read more data than its designated
                  scope
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAccessControlPoliciesHowFgacWorksThePolicyEvaluationFlow;
