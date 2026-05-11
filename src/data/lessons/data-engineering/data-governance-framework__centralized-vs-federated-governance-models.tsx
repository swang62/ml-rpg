import type { Component } from "solid-js";

const LessonDataGovernanceFrameworkCentralizedVsFederatedGovernanceModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Centralized vs Federated Governance Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Organizational Challenge:</strong> As companies scale
            past 200+ engineering teams, governance becomes an organizational
            problem as much as a technical one. You face a critical decision:
            centralized control or federated ownership? This choice
            fundamentally shapes how fast you can move and how consistent your
            data practices remain.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Centralized Model
                </div>
                <div style="font-size: 12px">
                  Central data office approves all datasets, defines policies.
                  Reduces risk and duplication but becomes bottleneck at scale.
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Federated Model
                </div>
                <div style="font-size: 12px">
                  Domain teams own data products, central team provides tooling
                  and global policies. Scales organizationally but risks
                  inconsistency.
                </div>
              </div>
            </div>
            <strong>Centralized Governance Deep Dive:</strong> In a centralized
            model, a strong data governance office defines all policies and
            approves new datasets. This ensures consistency: every dataset
            follows the same naming conventions, classification schemes, and
            quality standards. Legal and compliance teams love this because
            there's a single point of control for audits. The problem emerges at
            scale. With 200+ teams needing data products, waiting days for
            approvals kills velocity. The central team becomes a bottleneck, and
            engineers route around it by creating shadow datasets in personal
            buckets or unapproved systems. These unmanaged copies bypass
            retention, access control, and quality checks. In a security breach,
            shadow data is usually the weak link.
            <strong>Federated Governance Deep Dive:</strong> The federated model
            (data mesh philosophy) pushes ownership to domain teams. The
            payments team owns payment data products, the user team owns user
            data products. A small central group defines global policies (PII
            classification, retention rules, security standards) and provides
            self service tooling (catalog, lineage, quality frameworks). Domain
            teams implement these policies but control their own datasets. This
            scales organizationally because you are not bottlenecked on a
            central team. The trade-off is consistency risk. Different domains
            might interpret PII classification differently or implement quality
            checks with varying rigor. Cross domain analytics becomes harder
            when 50 teams have slightly different approaches to schema
            versioning or semantic definitions.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision criteria: Choose centralized when regulatory
                requirements demand tight control and you can afford the
                velocity cost. Choose federated when organizational scale makes
                central approval impossible, but invest heavily in automated
                policy enforcement and education."
              </div>
            </div>
            <strong>Hybrid Approaches in Practice:</strong> Most large companies
            end up with hybrid models. Core compliance policies (GDPR deletion,
            SOX auditability, PII classification) are centrally enforced through
            automated tooling. Domain specific policies (freshness SLAs,
            business metric definitions, deprecation timelines) are federated to
            teams. The key is clear boundaries: what must be centrally
            controlled versus what can be delegated. Access control often uses a
            hybrid pattern too. Central security defines role based access
            control frameworks and manages sensitive data classifications.
            Domain teams grant access within those frameworks using delegated
            admin roles. This prevents the central team from becoming a ticket
            queue for every access request while maintaining security
            boundaries.
            <strong>The Failure Mode:</strong> The worst outcome is inconsistent
            enforcement. If some teams follow governance rigorously while others
            ignore it, you get the illusion of governance without actual
            protection. Automated enforcement is critical: policies must be
            evaluated by systems, not humans, at query time and pipeline
            execution time.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Hybrid Governance Model
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Central Team (Small)</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    • GDPR/SOX policies
                    <br />• PII classification rules
                    <br />• Security frameworks
                    <br />• Tooling platforms
                  </div>
                </div>
                <div style="font-size: 20px; text-align: center; font-weight: bold">
                  ↓ defines ↓
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Payments Domain</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Owns payment datasets
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">User Domain</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Owns user datasets
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Events Domain</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Owns event datasets
                    </div>
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
                  Centralized governance (strong data office) ensures
                  consistency but becomes a bottleneck at 200+ teams, with
                  approval delays causing engineers to create shadow datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Federated governance (data mesh) pushes ownership to domains,
                  scaling organizationally but risking inconsistent practices
                  across 50+ teams with different interpretations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid models are most common: core compliance (GDPR, SOX,
                  PII) centrally enforced via automation, domain policies (SLAs,
                  metrics) federated to teams
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Access control often uses delegation: central security defines
                  role based frameworks and sensitive classifications, domains
                  grant access using delegated admin
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The critical failure mode is inconsistent enforcement, where
                  some teams follow governance while others ignore it, creating
                  false confidence without protection
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
                  A company with 200 engineering teams using centralized
                  approval sees 3 to 5 day delays for new dataset onboarding,
                  causing engineers to create unapproved datasets in personal S3
                  buckets that bypass retention and access controls
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  In a federated model, the payments domain defines a 99.5%
                  freshness SLA for transaction data while the marketing domain
                  uses 95%, making it hard to build cross domain real time
                  dashboards with consistent latency expectations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A hybrid approach enforces GDPR 30 day deletion centrally via
                  automated lifecycle jobs while allowing the ML platform team
                  to define their own feature freshness SLAs (sub second for
                  serving, hourly for training)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataGovernanceFrameworkCentralizedVsFederatedGovernanceModels;
