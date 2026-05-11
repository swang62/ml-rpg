import type { Component } from "solid-js";

const LessonDataDiscoveryCentralizedVsFederatedCatalogArchitectureTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Centralized vs Federated: Catalog Architecture Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Governance Tension:
            </div>
            Designing a discovery system forces a fundamental choice:
            centralized catalog with global control, or federated catalogs with
            domain autonomy. This is not just an implementation detail. It
            shapes how fast teams can move, how consistent governance is, and
            where bottlenecks appear.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Centralized Catalog
                </div>
                <div style="font-size: 12px">
                  Single source of truth, consistent policies, potential
                  bottleneck
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Federated Catalogs
                </div>
                <div style="font-size: 12px">
                  Domain autonomy, harder global consistency, scalable ownership
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Centralized: Control and Consistency:
            </div>
            A centralized catalog means one metadata store, one schema, one set
            of policies. All teams publish metadata to the same system. This
            simplifies search: users query one place and get globally consistent
            results. Governance is easier because you can enforce naming
            conventions, require ownership tags, and apply classification rules
            uniformly. The downside is scalability of operations, not
            technology. The central team becomes a bottleneck for onboarding new
            data sources, approving schema changes, and handling support
            requests. If 200 teams want to publish datasets, the central team
            reviews 200 integration requests. Latency to add a new source can
            stretch to weeks.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Federated: Autonomy and Scale:
            </div>
            Federated catalogs follow the Data Mesh philosophy: domains own
            their catalogs and a global search layer aggregates them. Each
            domain team manages their own metadata, schema evolution, and
            documentation. The central platform provides standards and APIs, but
            domains have autonomy. This scales operationally: the payments
            domain can add 50 new datasets without asking permission from a
            central team. But it makes global consistency harder. Domains might
            use different naming conventions or classification schemes. Cross
            domain lineage becomes complex when you need to trace data through
            multiple federated catalogs.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When to Choose Each:
            </div>
            The decision depends on organizational structure and data maturity.
            Choose centralized when you have fewer than 20 to 30 data producing
            teams, strong regulatory requirements demanding uniform governance,
            or a centralized data platform team with capacity to scale
            operations. Financial services and healthcare companies often go
            this route because consistent compliance enforcement is critical.
            Choose federated when you have 50 plus autonomous product teams,
            domain teams with strong data engineering capability, or a culture
            prioritizing speed over consistency. Tech companies with mature Data
            Mesh implementations, where domains already own production services
            end to end, often extend this to metadata ownership.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Hybrid Reality:
            </div>
            Many large organizations adopt a hybrid: strong central catalog with
            domain level curation rights. The central platform owns the
            infrastructure, schema, and core policies. Domains have delegated
            authority to document, classify, and deprecate their own datasets
            without central approval. Global policies like PII detection run
            centrally, but domains can add custom business metadata.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The right answer is not purely centralized or purely federated.
                It is where you place the control points: centralize what must
                be consistent (security, lineage), federate what benefits from
                local knowledge (documentation, business context)."
              </div>
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 16px">
                Hybrid Catalog Architecture
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Central Platform</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Infrastructure + Core Policies
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Payments</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      Domain Catalog
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">User Data</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      Domain Catalog
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Analytics</strong>
                    <div style="font-size: 10px; margin-top: 2px">
                      Domain Catalog
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Global Search Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Aggregates all domains
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
                  Centralized catalogs ensure consistent governance and simplify
                  search, but the central team can become an operational
                  bottleneck for 50 plus data producing teams
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Federated catalogs following Data Mesh principles scale
                  operationally by giving domains autonomy, but make global
                  consistency and cross domain lineage harder
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose centralized for fewer than 20 to 30 teams with strong
                  compliance needs; choose federated for 50 plus autonomous
                  teams with mature data engineering
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid models centralize what must be consistent like security
                  policies and lineage tracking while federating local knowledge
                  like documentation and business context
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
                  A financial services company with 25 data teams uses a
                  centralized catalog to enforce uniform PII classification
                  required by regulators, with a central team approving all new
                  data source integrations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A tech company with 80 product teams uses federated catalogs
                  where each domain manages their own metadata, while a global
                  search layer aggregates all domains and enforces only critical
                  security policies centrally
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataDiscoveryCentralizedVsFederatedCatalogArchitectureTradeOffs;
