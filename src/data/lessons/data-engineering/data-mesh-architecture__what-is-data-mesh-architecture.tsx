import type { Component } from "solid-js";

const LessonDataMeshArchitectureWhatIsDataMeshArchitecture: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Data Mesh Architecture?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>Data Mesh</strong> is an organizational and architectural
              approach that decentralizes analytical data ownership by aligning
              it with business domains, treating data as a product with clear
              ownership, quality standards, and self serve infrastructure.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          Traditional centralized data platforms create bottlenecks at scale. In
          a large organization with 50 product domains and 500 microservices
          ingesting 100,000 to 500,000 events per second, a single central data
          team becomes overwhelmed. When every domain needs their data modeled
          and served through this one team, lead times stretch from weeks to
          months. Business analysts wait 2 to 3 months just to access a new
          dataset, and quality issues discovered downstream are hard to fix
          because the people who understand the business logic do not control
          the data pipeline.
          <strong>How Data Mesh Solves This:</strong>
          Data mesh breaks the bottleneck by distributing ownership. Each
          business domain, such as Payments, Orders, or Catalog, owns its
          analytical data end to end. The Payments team owns Payment Transaction
          data products, defines their schemas, ensures quality, and sets
          Service Level Objectives (SLOs) like "data freshness under 10 minutes
          at p95" or "record accuracy above 99.5%." A centralized self serve
          platform provides standardized infrastructure: event streaming,
          storage, transformation engines, schema registries, and a global
          catalog. Domain teams use these building blocks but control their own
          pipelines. This means a domain can provision a new analytical table in
          minutes, not weeks.
          <strong>Three Core Pillars:</strong>
          First, domain oriented decentralized data ownership. Each domain team
          is responsible for their analytical data products. Second, data as a
          product thinking. Each product has clear contracts, documentation,
          SLOs, and quality metrics. Third, self serve data infrastructure as a
          platform that abstracts storage, compute, security, and governance so
          domain teams can move fast without reinventing everything.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Companies like Netflix, Zalando, and
            Intuit use data mesh principles. Zalando runs over 200 domain data
            products with a central platform handling identity, access
            management, and lineage tracking.
          </div>
          The approach applies to the analytical plane, not operational Online
          Transaction Processing (OLTP) systems. Your operational microservices
          still handle live transactions. Data mesh reorganizes how analytical
          data flows, gets modeled, and gets consumed for analytics and machine
          learning.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
            <div style="display: flex; gap: 16px; justify-content: space-around; align-items: flex-start">
              <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px">
                  TRADITIONAL (CENTRALIZED)
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Orders Domain</strong>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Payments Domain</strong>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Catalog Domain</strong>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Central Data Team</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Bottleneck: 2-3 month wait
                  </div>
                </div>
              </div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px">
                  DATA MESH (DECENTRALIZED)
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Orders Domain</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    Owns Orders Data Product
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Payments Domain</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    Owns Payment Data Product
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Catalog Domain</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    Owns Catalog Data Product
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↑</div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Self-Serve Platform</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Minutes to provision
                  </div>
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
                Data mesh solves the bottleneck problem where a single central
                team cannot scale to support dozens of domains with 100k+ events
                per second
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Each business domain owns its analytical data products end to
                end, including quality, schemas, and Service Level Objectives
                (SLOs)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                A self serve platform provides standardized infrastructure
                (storage, streaming, catalog) so domains can provision resources
                in minutes instead of weeks
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Zalando runs over 200 domain data products, showing this
                approach works at production scale with many autonomous teams
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data mesh focuses on analytical data, not operational
                transaction processing. Your OLTP services continue to handle
                live transactions independently
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
                An ecommerce company with 50 domains ingesting 500k events per
                second during peak would have the Orders team own Orders Fact
                data products, the Payments team own Payment Transaction
                products, each with defined SLOs like data freshness under 10
                minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix organizes data by business areas with domain owned
                pipelines and schemas, while a strong central platform handles
                common infrastructure and tooling
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Intuit moved from a single central data organization to domain
                aligned ownership, reducing dependency on a central backlog and
                improving time to insight for analytics teams
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataMeshArchitectureWhatIsDataMeshArchitecture;
