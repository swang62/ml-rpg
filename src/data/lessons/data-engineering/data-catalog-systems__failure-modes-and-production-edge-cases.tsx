import type { Component } from "solid-js";

const LessonDataCatalogSystemsFailureModesAndProductionEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Production Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Worst Case: Inaccurate Metadata:</strong>
            Stale or wrong metadata is worse than no metadata at all. If your
            catalog claims a table is certified and fresh, but it's actually
            deprecated and hasn't updated in 6 months, analysts will lose trust.
            They'll revert to asking colleagues or manual verification,
            defeating the catalog's purpose. Common causes include failed
            connectors that stop emitting events, schema change events that get
            dropped in message queues, and lineage extraction bugs that misparse
            queries. At scale with dozens of integrations, you must assume some
            fraction of events will be delayed or lost.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Design reconciliation from day one.
              Periodic full rescans of sources catch missed events and correct
              drift between catalog state and reality.
            </div>
            Production systems run reconciliation jobs that rescan warehouse
            schemas every 6 to 24 hours, comparing catalog state with source
            truth. When discrepancies are found (table exists in warehouse but
            not catalog, or schema differs), automated alerts fire and self
            healing logic attempts to correct the catalog. This two layer
            approach (real time events plus periodic reconciliation) keeps
            accuracy above 99 percent even when individual events fail.
            <strong>The Hidden Consumer Problem:</strong>
            Lineage systems capture dependencies through orchestrated jobs and
            query logs. But what about ad hoc queries run directly on the
            warehouse outside managed pipelines? A data scientist might run a
            one off analysis that reads from <code>customer_profiles</code>,
            builds a machine learning model, then deploys that model to
            production. The catalog never sees this dependency. Months later, an
            engineer drops a column from <code>customer_profiles</code>. The
            catalog shows no downstream consumers, so it looks safe. The
            deployed model breaks, causing production incidents.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Incomplete Lineage Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">WEEK 1</div>
                  <div style="font-size: 16px; font-weight: 800">
                    Ad hoc query
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">WEEK 8</div>
                  <div style="font-size: 16px; font-weight: 800">
                    Schema change
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">RESULT</div>
                  <div style="font-size: 16px; font-weight: 800">
                    Model breaks
                  </div>
                </div>
              </div>
            </div>
            Companies mitigate this by parsing query logs to discover hidden
            dependencies, encouraging all production workloads to run through
            managed orchestration where lineage is captured, and using query
            fingerprinting to identify tables that are frequently accessed even
            if not through tracked jobs. Some add manual declaration: before
            deploying a model, engineers must register its input dependencies in
            the catalog. Even with these measures, you'll miss some
            dependencies. The best defense is defensive schema changes:
            deprecate columns with long warning periods, use schema evolution
            techniques like adding nullable columns instead of changing types,
            and monitor error rates after changes to catch unexpected breakage.
            <strong>Permission Sync Failures:</strong>
            The catalog might think a user has access to a dataset when the
            warehouse denies them, or vice versa. This creates confusing UX:
            search shows a table, but clicking through to query it returns
            permission denied. Root causes include eventual consistency in
            permission propagation, the catalog and warehouse using different
            identity providers, and manual permission changes in the warehouse
            that bypass catalog APIs. These mismatches can also create security
            risks if the catalog incorrectly grants visibility to sensitive
            data. Production solutions make the catalog a read only mirror of
            warehouse permissions, with periodic reconciliation every 5 to 15
            minutes to sync state. Some companies go further and make the
            catalog the source of truth, with warehouse permissions driven by
            catalog policy, but this requires tighter integration.
            <strong>Graph Query Explosions:</strong>
            Even with limits, some graph topologies cause performance problems.
            A highly connected hub node (like a central user dimension table)
            might connect to thousands of downstream tables. Traversing from
            that hub can still timeout. Production systems detect hub nodes
            during indexing and apply special handling: precompute immediate
            neighbors, cache results aggressively, and show a warning in the UI
            that this node has over 500 connections with a subset displayed.
            Users can click to load more, but the default view stays fast.
            Another edge case is cycles in the lineage graph. If table A feeds
            job B which writes to table C which somehow feeds back to table A,
            naive traversal can loop forever. Graph queries must track visited
            nodes and detect cycles, showing them explicitly in the UI as
            "circular dependency detected."
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inaccurate metadata is worse than no metadata; periodic
                  reconciliation jobs that rescan sources every 6 to 24 hours
                  catch missed events and maintain over 99 percent accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ad hoc queries outside managed orchestration create hidden
                  dependencies; companies parse query logs and use
                  fingerprinting but still miss some, requiring defensive schema
                  change practices
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Permission mismatches between catalog and warehouse cause
                  confusing UX and security risks; solutions mirror permissions
                  with 5 to 15 minute reconciliation or make catalog the source
                  of truth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hub nodes with thousands of connections can cause graph query
                  timeouts; precompute neighbors, cache aggressively, and show
                  subset warnings in UI
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cycles in lineage graphs can cause infinite loops; graph
                  traversal must track visited nodes and explicitly detect and
                  display circular dependencies
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
                  A connector to Redshift fails silently for 8 hours. The
                  catalog shows tables as up to date when they're actually
                  stale. The nightly reconciliation job at 2 AM detects 500
                  tables with schema drift, auto corrects most, and pages on
                  call for 20 that require manual review.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A data scientist runs a query on
                  &lt;code&gt;user_events&lt;/code&gt; to build a churn model,
                  deploys it to production. Two months later an engineer renames
                  &lt;code&gt;user_events&lt;/code&gt; to
                  &lt;code&gt;events_v2&lt;/code&gt;. The catalog shows zero
                  dependencies. The model breaks, causing 4 hours of downtime
                  before the connection is discovered.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The &lt;code&gt;dim_users&lt;/code&gt; table connects to 2,000
                  downstream tables. When someone views its lineage, the UI
                  loads the first 100 in 180 ms, shows a badge that says "2,000
                  total downstream dependencies", and offers async loading for
                  the rest to prevent timeout.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataCatalogSystemsFailureModesAndProductionEdgeCases;
