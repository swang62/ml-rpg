import type { Component } from "solid-js";

const LessonDataGovernanceFrameworkFailureModesAndCrossRegionComplianceEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Cross Region Compliance Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>When Governance Breaks:</strong> Even well designed
            governance systems have failure modes that can cause catastrophic
            incidents. Understanding where these systems break is critical for
            both building resilient implementations and answering interview
            questions about trade-offs.
            <strong>Shadow Data and Metadata Drift:</strong> The most insidious
            problem is shadow data: teams creating local exports or private
            datasets outside governed platforms to avoid process overhead. At
            scale, you might have thousands of unmanaged data copies in personal
            buckets, spreadsheets, or departmental databases. These copies
            bypass retention, access control, and quality checks. Tag drift is
            equally dangerous. A column that starts storing PII (like adding
            email addresses to a previously anonymous user identifier table) is
            not reclassified as sensitive, so masking policies do not apply. Or
            a data owner leaves the company, but ownership metadata is not
            updated, so when an incident occurs, there is no clear escalation
            path. At companies with 100K+ datasets and high employee turnover,
            keeping metadata current is an ongoing challenge.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Incident Response Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">All green</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    SCHEMA CHANGE
                  </div>
                  <div style="font-size: 16px; font-weight: 800">PII added</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    7 DAYS LATER
                  </div>
                  <div style="font-size: 16px; font-weight: 800">Breach</div>
                </div>
              </div>
            </div>
            <strong>Cross Region and Legal Complexity:</strong> Global companies
            face particularly nasty edge cases. A dataset might combine EU and
            US user data, but GDPR requires data residency: EU data cannot leave
            EU servers. Incorrect lineage or missing region tags might lead to
            illegal cross border transfers during a routine analytics job.
            Implementing right to be forgotten is especially tricky. When a user
            requests deletion under GDPR, you must purge their data from all
            systems within 30 days. But user identifiers are embedded in logs,
            ML training datasets, feature stores, and offline backups. If
            governance does not track all derived datasets containing those
            identifiers at column level, deletion requests may not be fully
            honored. Missing even one derived table can result in multi million
            dollar fines.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Backups are often the forgotten edge
              case. Your governance system tracks live datasets, but 90 day
              backup retention means deleted PII still exists in backup
              snapshots. You need either encrypted backups with key rotation
              after deletion requests or separate backup policies for PII
              containing datasets.
            </div>
            <strong>Policy Engine Availability Trade-offs:</strong> Here's a
            subtle failure mode: if the central metadata or policy engine is
            unavailable, do you fail closed (block all queries) or fail open
            (risk policy violations)? Many systems implement degraded modes with
            cached policies (5 to 15 minute Time To Live). This introduces
            windows where access revocations are not fully enforced. Consider
            this scenario: a security team revokes access to a sensitive table
            at 10:00 AM. The policy engine updates immediately, but query
            systems have 10 minute cached policies. A user whose access was
            revoked can still query the data until 10:10 AM. For highly
            sensitive data, this window is unacceptable. For normal data, the
            trade-off between availability and perfect enforcement might be
            worth it.
            <strong>False Confidence and Column Level Semantics:</strong> The
            most dangerous failure is false confidence. A dashboard shows green
            status (fresh and healthy), but the underlying governance rules are
            incomplete. A revenue table passes basic null checks and freshness
            SLAs, yet a source field semantic changed from net revenue to gross
            revenue. Lineage shows everything as consistent at the dataset
            level, but not at the column semantics level. This causes a 5
            percent revenue under reporting that persists for a week before
            someone notices in a quarterly review. Column level lineage and
            semantic versioning help, but they add significant complexity.
            Tracking lineage for every column transformation in a pipeline with
            100 steps and 1000 columns means managing 100,000 lineage edges per
            pipeline. The metadata store must scale to handle this, and the UI
            must make it navigable.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow data (unmanaged copies in personal buckets) bypasses
                  governance and is typically the weak link in security breaches
                  at companies with 200+ teams
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tag drift occurs when schemas change (adding PII to a column)
                  but metadata is not updated, causing policy enforcement to
                  miss newly sensitive data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross region compliance is complex: GDPR data residency
                  requires tracking region tags in lineage to prevent illegal EU
                  to US data transfers during analytics jobs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Right to be forgotten requires column level lineage to
                  identify ALL derived datasets containing user identifiers,
                  including backups with 90 day retention
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy engine availability creates trade-offs: 5 to 15 minute
                  cached policies introduce windows where revoked access is not
                  enforced, balancing availability against perfect security
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
                  A schema change adds email addresses to a user events table,
                  but the table is not reclassified as PII. Seven days later, an
                  unauthorized analyst queries the data, causing a GDPR breach
                  because masking policies were not applied.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A company implements right to be forgotten by tracking dataset
                  level lineage, missing that user IDs are embedded in a derived
                  ML feature table. Deletion requests do not purge the feature
                  table, leaving user data accessible for 90 days in backup
                  snapshots.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  During a metadata service outage, query systems fall back to
                  10 minute cached policies. A security team revokes access to a
                  payments table at 10:00 AM, but the revoked user can still
                  query until 10:10 AM due to cache TTL.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A revenue pipeline changes from tracking net revenue to gross
                  revenue without updating semantic metadata. The governance
                  system shows all quality checks passing, but downstream
                  dashboards under report revenue by 5% for a week before the
                  discrepancy is noticed in financial review.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataGovernanceFrameworkFailureModesAndCrossRegionComplianceEdgeCases;
