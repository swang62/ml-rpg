import type { Component } from "solid-js";

const LessonDataLakeArchitectureOrganizationalPatternsCentralizedVsDecentralizedLakes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Organizational Patterns: Centralized vs Decentralized Lakes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Organizational Challenge:</strong>
            Technical architecture is only half the story. At scale, the harder
            problem is organizational: who owns what, who can access what, and
            how teams coordinate without blocking each other. Data lake
            architecture patterns must solve social problems, not just technical
            ones. There are two fundamental approaches, each solving different
            problems at different company scales.
            <strong>Centralized Lake Pattern:</strong>
            One central team owns the lake infrastructure, storage accounts, and
            governance. All data flows through central pipelines into a shared
            namespace. The central team maintains the catalog, enforces data
            quality standards, and manages access controls. This works
            beautifully at 100 to 500 TB scale with a few dozen teams. You get
            consistent tooling, unified governance, and clear ownership. Cost is
            controlled because the central team sees all usage. Data discovery
            is easy because everything is in one place. The failure mode appears
            around 10x scale or 100 plus teams. The central team becomes a
            bottleneck. Domain teams wait weeks for schema approvals or new
            dataset onboarding. Innovation slows because every change requires
            central coordination. Teams start building shadow data
            infrastructure to move faster, undermining the whole model.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Organizational Scaling Limits
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">20 teams</div>
                  <div style="font-size: 10px; font-weight: 600">
                    CENTRALIZED WORKS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    100+ teams
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    BOTTLENECK RISK
                  </div>
                </div>
              </div>
            </div>
            <strong>Decentralized Lake Pattern (Data Mesh):</strong>
            Each domain or business unit owns its own lake zone, sometimes even
            separate storage accounts or cloud projects. Domains control their
            own ingestion pipelines, schemas, and Service Level Agreements
            (SLAs). A central platform team provides shared tooling, templates,
            and global discovery services, but domains make their own decisions.
            This scales organizationally. A payments team can iterate on fraud
            models without waiting for approval from a central analytics team.
            Ownership is clear: if payment data quality degrades, the payments
            domain is accountable. The trade offs are real. Governance becomes
            distributed, making it harder to enforce consistent data quality or
            prevent duplicate work. Cost control is weaker because no single
            team sees the full picture. You might discover that three domains
            are independently ingesting the same third party dataset, tripling
            cost. Cross domain queries become harder because data contracts and
            schemas vary.
            <strong>Hybrid Reality:</strong>
            Most large companies end up with a hybrid model. A central platform
            team owns core infrastructure (storage accounts, networking,
            identity management) and provides self service tools. Domains own
            their data products and publish them to a global catalog with
            metadata and Service Level Objectives (SLOs). Central governance
            sets baseline policies (like data retention rules and privacy
            controls) but domains implement them. AWS typically recommends a
            central data lake account for shared datasets, with each business
            unit having its own account for domain specific data. Cross account
            access is managed through Lake Formation or similar resource
            sharing. Databricks promotes a lakehouse model with Unity Catalog
            providing centralized governance while domains maintain autonomy
            over their tables.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralized patterns reduce operational overhead and improve
                  consistency, with companies reporting 30 to 50 percent lower
                  infrastructure costs compared to fragmented approaches, but
                  create bottlenecks that slow innovation when teams exceed 50
                  to 100 engineers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decentralized patterns scale organizationally by giving
                  domains autonomy, but require strong cultural practices around
                  data contracts and observability to prevent quality
                  degradation and duplicate work
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid models dominate at scale, with central teams providing
                  platforms and guardrails (security, compliance, cost
                  monitoring) while domains own data products and Service Level
                  Agreements (SLAs)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The organizational pattern choice impacts time to value more
                  than technology choice: centralized teams might take 4 to 6
                  weeks to onboard new datasets, while decentralized domains can
                  move in days but risk creating inconsistent data definitions
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
                  A 500 person company with centralized data engineering uses a
                  single AWS account for the lake, one Glue catalog, and a 15
                  person central team managing all ingestion, achieving 99.9
                  percent uptime but 3 week average time to onboard new data
                  sources
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 5000 person company adopts a domain oriented model where 12
                  business units each own lake zones in separate projects,
                  publishing datasets to a shared discovery portal, enabling
                  domain teams to iterate in 2 to 3 days but requiring a data
                  quality framework to maintain trust
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A financial services firm uses hybrid organization: a central
                  platform team manages the S3 infrastructure and IAM policies,
                  domains own their raw and refined zones, and a governance
                  council reviews cross domain dependencies quarterly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataLakeArchitectureOrganizationalPatternsCentralizedVsDecentralizedLakes;
