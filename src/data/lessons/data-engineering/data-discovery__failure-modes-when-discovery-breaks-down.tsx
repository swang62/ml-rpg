import type { Component } from "solid-js";

const LessonDataDiscoveryFailureModesWhenDiscoveryBreaksDown: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: When Discovery Breaks Down
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Metadata Staleness and Trust Erosion:
            </div>
            The most insidious failure mode is stale metadata. Schemas change,
            tables get deprecated, pipelines break, but the catalog shows
            outdated information. An analyst discovers a table marked as
            "refreshed hourly" that actually stopped updating three days ago.
            After hitting this a few times, users stop trusting the catalog
            entirely and go back to Slack threads. At scale, you need near real
            time ingestion from schema registries, job schedulers, and data
            quality systems. A common Service Level Objective (SLO) is metadata
            updates visible within 2 to 5 minutes for critical systems. Miss
            this, and you are showing users a fantasy version of your data
            landscape.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Trust Erosion Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">Day 0</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    STALE METADATA
                  </div>
                  <div style="font-size: 16px; font-weight: 800">Day 3</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    USERS ABANDON
                  </div>
                  <div style="font-size: 16px; font-weight: 800">Day 7</div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Broken Lineage and Impact Blindness:
            </div>
            Lineage is critical for impact analysis and regulatory audits.
            Missing or incorrect lineage means you cannot answer, "Which
            dashboards break if I deprecate this column?" Three edge cases cause
            lineage gaps: First, ad hoc transformations that bypass
            orchestration tools leave no trace. An analyst runs a manual SQL
            script to create a derivative table, and the catalog never learns
            about it. Second, polyglot pipelines across Spark, Airflow, and
            custom scripts have inconsistent lineage extraction. Third, dynamic
            query generation makes parsing impossible. The consequence: you
            deprecate a column, and three weeks later a critical executive
            dashboard breaks because it had an undocumented dependency. Or
            worse, a compliance audit asks for downstream impact of customer
            data, and you cannot provide complete lineage.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Security Leaks Through Metadata:
            </div>
            Even metadata can leak sensitive information. If the catalog shows
            column names like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              credit_card_number
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              ssn
            </code>{" "}
            to unauthorized users, you have violated privacy policies. Edge
            cases include caching search results in clients after access is
            revoked, replicated catalogs in multiple regions with inconsistent
            policies, and AI classification that misses PII fields. The fix
            requires metadata level authorization on every search and browse
            request, propagating identity context when redirecting to query
            tools, and careful cache invalidation when permissions change.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Search Relevance Collapse:
            </div>
            Poor ranking silently degrades the user experience. When the catalog
            grows from 5,000 to 50,000 datasets, naive text matching returns
            hundreds of results for common terms. The correct table is buried on
            page five, so users either pick the wrong one or give up. Handling
            synonyms and abbreviations is particularly hard. "DAU" means daily
            active users in the growth team and daily active uploads in the data
            platform team. The system needs context: which team is the user on?
            What did they query recently? Which datasets does their team use
            most?
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Failure modes in discovery are often
              silent. Users do not file tickets saying "search ranking is bad."
              They just stop using the system and go back to asking in Slack.
              Monitor search abandonment rate (queries with no click) and time
              to first click as leading indicators.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Performance Bottlenecks at Scale:
            </div>
            Full table scans for data profiling on every schema change can
            exhaust cluster resources. Brute force re indexing of the entire
            catalog on every update causes multi second search latencies. As the
            catalog grows to millions of entities, naive joins for lineage
            queries hit 10 plus seconds and break the interactive experience.
            The solution is incremental updates: profile only changed tables, re
            index only modified entities, and materialize common lineage paths.
            But implementing this correctly requires careful bookkeeping of what
            changed and when.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale metadata erodes trust faster than having no catalog; SLO
                  of 2 to 5 minutes for critical updates prevents users from
                  abandoning the system
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Missing lineage from ad hoc scripts, polyglot pipelines, and
                  dynamic queries leaves you blind to impact when deprecating
                  columns or for compliance audits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata level security is critical: even column names like
                  &lt;code style="padding: 2px 6px; background: #f5f5f5; border:
                  1px solid #ddd; border-radius: 3px; font-family: monospace;
                  font-size: 0.9em;"&gt;credit_card_number&lt;/code&gt; can
                  violate privacy if shown to unauthorized users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor search abandonment rate and time to first click as
                  leading indicators of relevance collapse; users stop filing
                  tickets and just stop using the system
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
                  An analyst searches for "user events" and gets 847 results
                  with no clear winner. After scrolling through three pages,
                  they give up and ask in Slack, never returning to the catalog.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A compliance audit requests downstream impact of customer PII.
                  The lineage graph is incomplete because 30 percent of
                  transformations happened in ad hoc scripts, leaving the
                  company unable to provide full traceability.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataDiscoveryFailureModesWhenDiscoveryBreaksDown;
