import type { Component } from "solid-js";

const LessonAccessControlPoliciesFgacDesignTradeOffsWhenToUseWhat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            FGAC Design Trade-offs: When to Use What
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Central Tension:
            </div>
            Choosing an access control strategy means balancing precision
            against performance, centralization against flexibility, and
            security against developer productivity. There is no universally
            correct answer. The right choice depends on your read to write
            ratio, user scale, data sensitivity, and organizational structure.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Built In FGAC
                </div>
                <div style="font-size: 12px">
                  Dynamic, consistent, but adds 10-20% query overhead
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Pre Filtered Views
                </div>
                <div style="font-size: 12px">
                  Fast, simple, but creates data duplication
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Performance versus Precision:
            </div>
            Very granular row level filters can significantly increase planning
            and execution time. A query that normally scans 200 gigabytes and
            finishes in 5 seconds might degrade to 20 seconds p99 if the engine
            cannot efficiently push down user specific predicates. This happens
            when predicates reference complex functions or external lookups that
            break index usage. Some teams deliberately accept slightly broader
            access with coarser filters in exchange for predictable performance.
            For example, filtering by department instead of individual user IDs
            reduces permission table size from millions to hundreds of rows. The
            trade off is that some users see data from colleagues in the same
            department that they do not strictly need.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Centralization versus Flexibility:
            </div>
            Central policy engines like Unity Catalog or Lake Formation give you
            one place to manage rules and generate audit logs. But they can be
            slower to evolve and might not capture application specific logic.
            If your recommendation system needs to filter based on complex user
            preference graphs, encoding that in a central policy language is
            painful. In contrast, embedding access control in application code
            gives teams more control and faster iteration. But it risks
            inconsistent policies where the data warehouse enforces one set of
            rules, the search index enforces different rules, and the mobile API
            has yet another implementation. When you explain this trade off in
            an interview, emphasize who owns policies and how you prevent
            divergence.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The real decision is not whether to use FGAC. It is where to
                draw the line between central policies for compliance and
                application logic for business rules."
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Security versus Productivity:
            </div>
            Strict fine grained controls on development and staging data reduce
            risk of leaking production information, but they slow down debugging
            and experimentation. Some systems adopt secure by default where
            policies apply everywhere. This forces developers to work with
            anonymized data, which surfaces data quality issues earlier but
            makes reproducing production bugs harder. Others allow more open
            access in non production environments but require more rigor in data
            anonymization pipelines. The key question is whether your threat
            model includes insider threats from developers with environment
            access.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Choose Pre Filtered Views:
            </div>
            Despite the data duplication, pre filtered materialized views make
            sense when access patterns are stable and user populations are
            discrete. If you have exactly three business units that never
            overlap in their data needs, maintaining three filtered copies is
            simpler than dynamic row level security. Views are easier to reason
            about, perform better, and avoid policy evaluation overhead
            entirely. Choose built in FGAC when user attributes change
            frequently, access patterns are unpredictable, or you have thousands
            of distinct permission combinations that would explode into
            unmanageable view counts.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Very granular predicates can add 10 to 20% query overhead;
                  sometimes coarser filters trading precision for performance
                  make sense
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Central policy engines ensure consistency but slow evolution;
                  application embedded controls offer flexibility but risk
                  divergence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre filtered materialized views perform better and are simpler
                  but duplicate data; use when access patterns are stable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Secure by default in non production slows debugging; open non
                  production access requires strong anonymization pipelines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The decision framework is: how often do permissions change,
                  how many distinct combinations exist, and what is your read
                  versus write ratio
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
                  Team chooses department level filtering instead of user level,
                  reducing permission table from 5 million to 500 rows and
                  improving join performance by 40%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Company maintains 3 pre filtered views for business units
                  rather than dynamic FGAC because access never overlaps and
                  queries run 3x faster
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Development environment uses full production policies with
                  anonymized data, catching data quality bugs early but
                  requiring sophisticated anonymization pipeline
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAccessControlPoliciesFgacDesignTradeOffsWhenToUseWhat;
