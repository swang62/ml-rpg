import type { Component } from "solid-js";

const LessonMetadataManagementCentralizedVsFederatedMetadataTheTradeOff: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Centralized vs Federated Metadata: The Trade-Off
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Decision:
            </div>
            One of the most critical architectural choices in metadata
            management is whether to centralize all metadata in a single catalog
            or federate it across domain owned systems. This trade-off appears
            frequently in system design interviews because it reveals how you
            think about organizational scalability versus technical consistency.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Centralized Catalog
                </div>
                <div style="font-size: 12px">
                  Single search surface, global policies, consistent lineage
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Federated (Data Mesh)
                </div>
                <div style="font-size: 12px">
                  Domain autonomy, faster iteration, local tooling
                </div>
              </div>
            </div>
            <strong>Centralized Catalogs: The Case for Consistency</strong>
            Centralized systems like AWS Glue Data Catalog or Databricks Unity
            Catalog give you consistency and global enforcement. You get a
            single search surface where analysts can find any dataset regardless
            of domain. Governance policies such as "any PII column must be
            masked for non-privileged users" apply uniformly across batch
            pipelines, streaming systems, and ML workflows. Lineage views span
            the entire organization, showing how a change in one team's table
            affects another team's dashboard. This is crucial for regulated
            environments. A financial services company with compliance
            requirements cannot tolerate gaps in lineage or inconsistent PII
            tagging across 50 teams. The centralized catalog becomes the source
            of truth for auditors. However, centralization can slow teams down.
            If onboarding a new data source requires central approval, schema
            reviews, and complex workflows, teams may wait days or weeks. At
            organizations with hundreds of data engineers, this becomes a
            bottleneck. Additionally, the central team must support every
            storage system, format, and integration, which scales poorly.
            <strong>Federated Catalogs: The Data Mesh Approach</strong>
            Federated or data mesh architectures flip this. Each domain (for
            example, payments, recommendations, fraud detection) owns its
            portion of the metadata, possibly with its own tooling and
            standards. A lightweight central layer aggregates only high-level
            metadata: dataset names, owners, and descriptions. Detailed schemas,
            lineage, and policies remain domain owned. This improves local
            autonomy and speed. The payments team can iterate on their schema
            evolution strategy without coordinating with central platform teams.
            They can choose tools that fit their specific needs. The trade-off
            is inconsistency. One domain might tag PII as{" "}
            <code>sensitive_data</code>, another as <code>pii_flag</code>, and a
            third might not tag it at all. Cross domain lineage becomes best
            effort: if the payments domain and recommendations domain use
            different lineage tools, tracing a flow from one to the other
            requires manual reconciliation. Discovery suffers too: analysts must
            search multiple catalogs or rely on tribal knowledge about which
            domain owns what.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The choice is not 'centralized is always better.' It's: what's
                your org size, regulatory requirements, and tolerance for
                inconsistency?"
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Choose Each:
            </div>
            Choose centralized when you have strong compliance needs (PCI,
            HIPAA, GDPR), relatively mature data teams that can agree on
            standards, and a platform team with capacity to support
            centralization. Organizations under 500 data practitioners often
            succeed with centralization. Choose federated when you have hundreds
            of autonomous teams, rapid iteration is critical, and you can
            tolerate some inconsistency in exchange for speed. Organizations
            with 1000+ data engineers and strong domain ownership culture (like
            data mesh practitioners) lean federated. Many organizations end up
            hybrid: centralized for critical metadata like access control and
            PII tagging, federated for domain-specific details like business
            glossaries and custom lineage.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralized catalogs provide consistency, global policy
                  enforcement, and complete lineage but can become bottlenecks
                  when onboarding new sources or evolving schemas across
                  hundreds of teams
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Federated or data mesh catalogs give domain teams autonomy and
                  speed but lead to inconsistent standards, gaps in cross-domain
                  lineage, and harder discovery across multiple systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The decision depends on organization size and regulatory
                  needs: centralized works well for under 500 practitioners with
                  compliance requirements; federated scales better for 1000+
                  engineers with strong domain ownership
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Many organizations adopt hybrid approaches: centralized for
                  critical governance (access control, PII tagging) and
                  federated for domain-specific metadata (business glossaries,
                  custom lineage)
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
                  A bank with PCI compliance requirements uses a centralized
                  catalog to enforce "all credit card columns must be encrypted
                  and tagged" globally. Any violation blocks deployment. This
                  consistency is worth the slower onboarding process.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A tech company with 2000 data engineers adopts a data mesh
                  approach. Each product domain owns its catalog. The central
                  platform aggregates only dataset names and owners.
                  Cross-domain lineage is manual but teams iterate 10x faster on
                  local schemas.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A hybrid setup: AWS Glue Data Catalog stores schemas and
                  access policies centrally for consistent security. Each domain
                  team uses Datahub or custom tools for detailed lineage and
                  business metadata, pushing summaries to Glue.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMetadataManagementCentralizedVsFederatedMetadataTheTradeOff;
