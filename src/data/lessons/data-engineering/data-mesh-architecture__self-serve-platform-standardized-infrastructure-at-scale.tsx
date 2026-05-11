import type { Component } from "solid-js";

const LessonDataMeshArchitectureSelfServePlatformStandardizedInfrastructureAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Self Serve Platform: Standardized Infrastructure at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Platform Challenge:</strong>
            When you decentralize data ownership to 50 domains, you face a risk:
            each domain reinventing storage patterns, security configurations,
            and monitoring. This creates chaos. The self serve platform solves
            this by abstracting common concerns into standardized, automated
            capabilities that every domain uses.
            <strong>Core Platform Capabilities:</strong>
            The platform provides an event backbone for streaming, typically
            Kafka or similar at massive scale handling 100,000 to 500,000 events
            per second across all domains. It offers provisioning APIs where a
            domain declares "I need a partitioned table updated from this
            stream" and the platform spins up storage, compute, and access
            control automatically. Orchestration handles both batch and
            streaming workflows, scheduling transformations and ensuring
            dependencies run in the correct order. A unified metadata and
            catalog service is critical. Every data product registers here with
            schemas, lineage, SLOs, and documentation. When an analyst searches
            for payment data, they discover Payment Failed Events with full
            context: who owns it, what the schema is, what the freshness
            guarantee is, and who else uses it. Without this catalog at scale,
            you would have 200+ data products scattered across systems with no
            discoverability.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Domain declares requirements:</strong> "Partitioned
                  table from Kafka topic <code>orders.events</code>, updated
                  every 5 minutes, PII fields <code>customer_email</code> and{" "}
                  <code>shipping_address</code> tagged."
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Platform provisions infrastructure:</strong> Creates
                  storage bucket, configures encryption at rest, sets up
                  streaming ingestion job, applies retention policy (90 days),
                  configures role based access control.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Automated governance applied:</strong> PII fields
                  automatically masked by default, schema registered in catalog,
                  monitoring dashboard created with ingestion lag and query
                  latency graphs, lineage tracked from source topic to product.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Product goes live:</strong> Available in catalog
                  within minutes. Consumers can discover, request access, and
                  start querying with SLOs enforced automatically.
                </div>
              </div>
            </div>
            <strong>Governance Embedded in Tooling:</strong>
            Federated governance defines global standards: naming conventions
            for fields like <code>user_id</code> versus <code>customer_id</code>
            , security policies for encryption and access, data classification
            levels (public, internal, confidential), and required quality
            checks. The key insight is these rules are not enforced by manual
            review. They are embedded in the platform. When a domain creates a
            new product exposing user identifiers, the platform automatically
            checks which fields are sensitive based on classification policies.
            It configures masking, restricts access to approved roles, and tags
            the product for compliance audits. If a domain tries to create a
            product with a retention period violating regulatory requirements
            (for example, keeping PII longer than allowed), the platform rejects
            it at provisioning time. This computational governance is what makes
            data mesh viable at scale. Manual governance through tickets and
            reviews does not scale to 200 data products and hundreds of
            engineers making changes daily.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Building a "platform" that is
              just a wiki of instructions for manual setup. True self serve
              means declarative APIs and automation. If domain teams still file
              tickets and wait for the platform team to provision resources, you
              have not achieved self serve at all.
            </div>
            <strong>Integration Patterns:</strong>
            For existing systems, the platform supports multiple integration
            patterns. Change Data Capture (CDC) from monolithic databases can
            feed domain products with analytical freshness under 5 minutes end
            to end. Event sourcing from operational microservices enables near
            real time products with sub second latency for use cases like fraud
            detection. Where only batch APIs are available, scheduled pulls
            might have hourly or daily refresh, which affects downstream SLAs
            and must be documented in the product contract.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The platform provides event backbone (Kafka scale 100k to 500k
                  events per second), provisioning APIs, orchestration for batch
                  and streaming, and unified metadata catalog
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Domain teams declare requirements at high level. Platform
                  automates infrastructure: storage, encryption, access control,
                  schema registration, monitoring, all provisioned in minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Governance rules are embedded in tooling, not manual review.
                  Platform automatically enforces encryption, masking of PII
                  fields, retention policies, and compliance tags at
                  provisioning time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  True self serve means declarative APIs and automation. If
                  domains still file tickets and wait for manual provisioning,
                  you have not achieved self serve
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Integration supports Change Data Capture (CDC) with under 5
                  minute freshness, event sourcing with sub second latency, and
                  batch APIs with hourly or daily refresh depending on source
                  system capabilities
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
                  When Orders domain declares a new product from Kafka topic
                  &lt;code&gt;orders.events&lt;/code&gt;, the platform
                  provisions storage, sets up streaming ingestion every 5
                  minutes, applies encryption, masks PII fields
                  &lt;code&gt;customer_email&lt;/code&gt; and
                  &lt;code&gt;shipping_address&lt;/code&gt;, and creates
                  monitoring dashboards, all within minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At scale with 200+ data products, computational governance
                  automatically tags products with sensitive data for compliance
                  audits. When auditors request impact analysis for a regulation
                  change, the platform queries metadata to identify all affected
                  products instantly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CDC from a legacy monolithic database feeds the Customer
                  Profile data product with analytical freshness under 5
                  minutes, allowing the domain to expose clean analytical views
                  while the operational system remains unchanged
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMeshArchitectureSelfServePlatformStandardizedInfrastructureAtScale;
