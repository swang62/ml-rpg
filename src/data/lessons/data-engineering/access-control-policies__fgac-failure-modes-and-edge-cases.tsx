import type { Component } from "solid-js";

const LessonAccessControlPoliciesFgacFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            FGAC Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Policy Gaps Across Systems:
            </div>
            The most common and dangerous failure mode is enforcing row level
            security in the warehouse but forgetting other data access paths.
            Imagine you enforce strict FGAC in your data warehouse: customer
            support agents only see tickets from their assigned region. But then
            you build a vector search index in OpenSearch from those same
            tickets to power semantic search. If you load embeddings without
            preserving row level policies, agents can search the index and see
            tickets they are explicitly denied in the warehouse. This bypass is
            subtle because the vector store and warehouse appear logically
            separate, but they expose the same underlying data.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> AWS explicitly warns about this when
              discussing generative AI and stresses applying FGAC at the vector
              store level, not just the source warehouse.
            </div>
            Similarly, if users can read underlying object storage like S3 or
            Google Cloud Storage (GCS) directly through misconfigured Identity
            and Access Management (IAM) policies, they bypass compute layer
            controls entirely. Virtual Private Cloud (VPC) service perimeters
            and bucket level policies close these holes, but misconfiguration is
            common. Backups and offline exports create additional bypass risks.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Predicate Explosion and Performance Collapse:
            </div>
            In predicate based row level security, a user belonging to many
            groups can generate extremely long predicates. Imagine a user in 200
            security groups where each group grants access to certain customers.
            The naive implementation generates{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              WHERE customer_id IN (1,2,3...10000)
            </code>{" "}
            with thousands of terms. This prevents index usage and forces full
            table scans. At scale, this can push cluster Central Processing Unit
            (CPU) utilization to 100 percent and violate latency Service Level
            Objectives (SLOs) for all tenants. Some systems cap the maximum
            number of terms or require pre computing a permission table to avoid
            this failure mode.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Performance Degradation
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">5 sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    PREDICATE EXPLOSION
                  </div>
                  <div style="font-size: 16px; font-weight: 800">80 sec</div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Stale Policy Cache Race Conditions:
            </div>
            Caching policy decisions for performance creates a window where
            revoked access still works. With a 5 minute cache Time To Live
            (TTL), a fired employee retains access for up to 5 minutes after
            termination. At 10,000 rows per second export rate, that is 3
            million rows potentially exfiltrated. The mitigation is immediate
            cache invalidation on critical events like termination. But this
            requires tight integration between human resources systems, identity
            providers, and policy engines. Failures in this chain create
            security gaps.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Multi Tenant Filter Bugs:
            </div>
            In Software as a Service (SaaS) scenarios, a single bug in tenant
            filters can leak data across customers. This is catastrophic. The
            worst case is a missing{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              AND tenant_id = current_tenant
            </code>{" "}
            predicate on a 100 billion row fact table, exposing millions of
            customer records. The defense is exhaustive testing. Unit tests
            validate predicates for synthetic tenants. Integration tests verify
            isolation under concurrent load. Contract tests ensure that schema
            changes do not accidentally drop filter columns. Despite all this,
            production bugs still occur, which is why audit logging and anomaly
            detection are critical backstops.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Ambiguous or Conflicting Policies:
            </div>
            Combining multiple policy sources creates unexpected interactions.
            Global policies, team policies, and ad hoc exceptions can conflict.
            The standard principle is deny overrides allow, but misordered or
            overlapping rules can either leak data or break legitimate use
            cases. Strong tooling for policy simulation becomes essential.
            Before deploying a new policy, you run it against historical query
            logs to see what would have changed. An explain why this query was
            denied feature helps debug false denials.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy gaps across systems are the most common failure:
                  enforcing FGAC in warehouse but not in vector search, backups,
                  or object storage creates bypass paths
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Users in many groups can generate predicates with thousands of
                  terms, preventing index use and causing full table scans that
                  collapse performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy cache with 5 minute TTL gives terminated employees
                  enough time to exfiltrate 3 million rows at typical export
                  rates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tenant filter bugs on large fact tables can expose
                  millions of records across customers; exhaustive testing is
                  mandatory
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Conflicting policies from multiple sources require simulation
                  tools and explain why denied features to debug safely
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
                  Support tickets enforce row level security in Snowflake but
                  vector embeddings in OpenSearch lack filters, allowing agents
                  to search restricted tickets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User in 200 security groups generates WHERE clause with 5000
                  customer IDs, query degrades from 5 seconds to 80 seconds due
                  to full scan
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Developer forgets tenant filter on analytics query, exposing
                  competitor sales data across SaaS customers for 2 hours before
                  detection
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAccessControlPoliciesFgacFailureModesAndEdgeCases;
