import type { Component } from "solid-js";

const LessonDataContractsFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>Silent Semantic Corruption:</strong> The most dangerous
          failure is when schemas remain technically compatible but semantics
          change. A payment system adds refund support and starts sending
          negative{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            amount
          </code>{" "}
          values. The contract only validated type integer, not allowed ranges.
          Dashboards misinterpret refunds as revenue drops, triggering false
          alerts and wrong business decisions.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> Schema validation alone is
            insufficient. Add semantic checks (value ranges, enum constraints)
            and distribution level monitoring (percentile shifts, cardinality
            changes).
          </div>
          <strong>Versioning Complexity in Practice</strong>A producer rolls out
          a new version adding optional fields and changing default values.
          Technically backward compatible, but a downstream job assuming non
          null fields now crashes. Worse, during migration the producer writes
          both old and new schema versions simultaneously for 2 weeks.
          Downstream systems receive mixed events in the same time window and
          must handle both formats. Real example: An event stream added an
          optional{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            session_id
          </code>{" "}
          field. Old consumers ignored it. New consumers relied on it for
          deduplication. During the transition, 30 percent of events had nulls,
          causing new consumers to create duplicate records. The fix required
          backfill and dual read logic.
          <strong>SLA Gaps: Regional and Disaster Recovery</strong>A contract
          promises p95 freshness of 5 minutes for a{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_actions
          </code>{" "}
          topic, but only within a single region. Global aggregations relying on
          cross region replication see 30 minute p95 lag. Consumers in Europe
          expect 5 minute freshness based on the contract, but experience is 6x
          worse.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Regional SLA Reality
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">SAME REGION</div>
                <div style="font-size: 16px; font-weight: 800">5 min</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">vs</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  CROSS REGION
                </div>
                <div style="font-size: 16px; font-weight: 800">30 min</div>
              </div>
            </div>
          </div>
          Disaster recovery scenarios worsen this. During regional failover, do
          SLAs relax? By how much? Most contracts fail to specify this. A system
          promising 99.9 percent availability might actually be 95 percent
          during failover, which happens twice per year.
          <strong>Systematic Failures Hidden by Averages</strong>A pipeline
          delivering daily data by 03:00 UTC at 99.9 percent success looks
          healthy in dashboards. But it fails systematically every month end
          when transaction volume spikes 3x. Financial close reports are late 12
          times per year, yet the annual SLA shows green. The fix requires
          percentile based metrics and time bucketed error budgets. Track not
          just "99.9 percent success over a quarter" but "99.9 percent success
          in each week." This surfaces recurring issues that quarterly averages
          hide.
          <strong>Orphaned Datasets</strong>A critical dataset loses its active
          owner during team reorganization. Contracts become stale. SLAs are not
          updated as usage patterns change. New consumers build critical
          dependencies on top. Six months later, an incident occurs and no one
          is accountable. The producing service might have been deprecated but
          data kept flowing out of momentum.
          <strong>Handling Failure Modes:</strong> First, extend validation
          beyond schema: check value ranges, distributions, and cardinality.
          Second, specify SLAs with regional scoping and disaster recovery
          clauses. Third, use time bucketed error budgets to catch systematic
          issues. Fourth, implement ownership verification: quarterly audits
          ensuring each dataset has an active, accountable owner.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="font-size: 13px; font-weight: 700; margin-bottom: 12px; text-align: center">
              Month End Failure Pattern
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="display: flex; align-items: center; gap: 12px">
                <div style="flex: 0 0 100px; font-size: 12px; font-weight: 600">
                  Week 1-3
                </div>
                <div style="flex: 1; display: flex; align-items: center; gap: 4px">
                  <div style="width: 16px; height: 16px; border: 2px solid; border-radius: 2px"></div>
                  <div style="width: 16px; height: 16px; border: 2px solid; border-radius: 2px"></div>
                  <div style="width: 16px; height: 16px; border: 2px solid; border-radius: 2px"></div>
                  <div style="font-size: 11px; margin-left: 8px">
                    100% On Time
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 12px">
                <div style="flex: 0 0 100px; font-size: 12px; font-weight: 600">
                  Week 4<br />
                  (Month End)
                </div>
                <div style="flex: 1; display: flex; align-items: center; gap: 4px">
                  <div style="width: 16px; height: 16px; border: 2px solid; border-radius: 2px"></div>
                  <div style="font-size: 11px; margin-left: 8px">
                    Late (3x Volume)
                  </div>
                </div>
              </div>
              <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 4px">
                <div style="font-size: 11px; font-weight: 700; margin-bottom: 4px">
                  Quarterly Metric: 99.2% ✓
                </div>
                <div style="font-size: 10px">
                  But fails systematically 12 times/year
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
                Silent semantic corruption is most dangerous: schemas stay
                compatible but semantics change (negative amounts for refunds),
                corrupting dashboards without alerts
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Versioning transitions create mixed event streams: 30% nulls in
                new optional fields broke deduplication logic for consumers
                expecting complete data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Regional SLA gaps: contract promises 5 minute p95 freshness in
                region, but cross region replication shows 30 minute lag (6x
                worse than expected)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Systematic failures hide in averages: 99.9% quarterly success
                masks month end failures when volume spikes 3x; use weekly error
                budgets instead
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Orphaned datasets lose owners during reorganizations; contracts
                become stale, and critical incidents have no accountability
                until quarterly ownership audits
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
                Payment system added refund support with negative
                &lt;code&gt;amount&lt;/code&gt; values; contract validated type
                but not range, causing dashboards to misinterpret refunds as
                revenue drops
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Event stream added optional &lt;code&gt;session_id&lt;/code&gt;;
                during 2 week migration, 30% of events had nulls, causing new
                consumers to create duplicate records requiring backfill
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Pipeline with 99.9% annual SLA failed every month end at 3x
                volume spike, hitting financial close deadlines 12 times per
                year despite green dashboards
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataContractsFailureModesAndEdgeCases;
