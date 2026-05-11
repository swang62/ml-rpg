import type { Component } from "solid-js";

const LessonDataCatalogSystemsBuildingVsBuyingCatalogTradeOffsAndAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Building vs Buying: Catalog Trade offs and Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Decision:</strong>
            Should you build a data catalog in house or adopt an existing
            solution? This choice depends on scale, complexity, and how critical
            discovery is to your data platform.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Manual Documentation
                </div>
                <div style="font-size: 12px">
                  Wikis, spreadsheets. Works under 50 tables, zero automation.
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Automated Catalog
                </div>
                <div style="font-size: 12px">
                  Event driven, scales to millions of entities, requires
                  integration effort.
                </div>
              </div>
            </div>
            Manual documentation (wikis, spreadsheets, internal docs) works when
            you have one warehouse and fewer than 50 tables. Everyone knows
            where the data lives and what it means. The moment you add a second
            warehouse or grow past 100 tables, manual approaches break down.
            Documentation becomes stale within weeks. Nobody knows which tables
            are deprecated. Lineage lives in people's heads. A catalog solves
            this by automating discovery, tracking lineage through actual job
            execution, and staying current through continuous ingestion. The
            trade off is upfront investment: you need connectors to every
            system, standardized event formats, and operational overhead to keep
            ingestion pipelines healthy.
            <strong>Catalog vs Semantic Layer:</strong>
            Some teams confuse a catalog with a semantic layer or virtualized
            data access system. A semantic layer sits on the query path,
            enforcing a single logical schema over underlying data sources.
            Every query goes through it. This provides strong guarantees: all
            users see the blessed definitions and access patterns. A catalog is
            lighter weight. It does not intercept queries. It discovers,
            documents, and recommends, but analysts can still query any table
            directly. This makes adoption easier and less risky to core data
            processing. The trade off is weaker enforcement: a catalog cannot
            guarantee that everyone uses the blessed datasets, only encourage it
            through search ranking and certification badges. Choose a semantic
            layer when you need strict governance over a specific domain, like
            financial reporting where every query must use approved metric
            definitions. Choose a catalog when you need broad discovery across a
            heterogeneous platform where different teams have different needs.
            <strong>Warehouse Schema Views as Implicit Catalog:</strong>
            Some companies try to use their warehouse's information schema views
            as an implicit catalog. You can query{" "}
            <code>INFORMATION_SCHEMA.TABLES</code> to list all tables and{" "}
            <code>INFORMATION_SCHEMA.COLUMNS</code> for schema. For a small,
            warehouse centric team, this is simple and requires zero additional
            infrastructure. This approach breaks at moderate scale. First, it
            only covers data in that warehouse. You have no visibility into data
            lakes, streaming topics, or external APIs. Second, you get no cross
            system lineage. You can't see that a warehouse table feeds a
            dashboard or that a Kafka topic feeds a warehouse table. Third, you
            lose governance features like certification workflows, usage
            tracking, and search ranking. The trade off is operational
            simplicity versus platform visibility. Use schema views when you
            truly have a single warehouse and under 500 tables. Beyond that, the
            lack of lineage and cross system discovery becomes painful.
            <strong>Freshness vs Cost:</strong>
            Real time metadata (under 1 second latency) sounds appealing but is
            expensive. You need low latency event buses, streaming processors,
            and cache invalidation at every layer. For most use cases, this is
            overkill.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The question isn't 'how fresh can we make metadata?' It's 'what
                latency breaks which use cases?'"
              </div>
            </div>
            For search and discovery, 1 to 5 minute delays are fine. Analysts
            don't need to find a table within seconds of its creation. For
            impact analysis before deploying a schema change, 5 minute delays
            are acceptable. You're planning changes hours or days in advance.
            The one case where sub second freshness might matter is automated
            systems that deploy changes based on catalog metadata. For example,
            a service that auto scales consumers based on lineage. Even then,
            you can design with eventual consistency in mind: make decisions
            idempotent, add safety delays, or use circuit breakers. Most
            production catalogs accept minute level delays, which simplifies
            architecture and cuts infrastructure costs by 5x to 10x compared to
            real time ingestion.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Manual documentation works under 50 tables but breaks beyond
                  100, while automated catalogs scale to millions of entities at
                  the cost of integration complexity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Catalogs do not sit on the query path, making them easier to
                  adopt than semantic layers but offering weaker enforcement of
                  blessed datasets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Using warehouse schema views as an implicit catalog works for
                  under 500 tables in a single warehouse but provides no cross
                  system lineage or governance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real time metadata under 1 second is expensive and rarely
                  needed; minute level delays reduce infrastructure cost by 5x
                  to 10x while meeting most use cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose catalogs for broad discovery across heterogeneous
                  platforms, semantic layers for strict governance over specific
                  domains, manual docs only for tiny single warehouse
                  environments
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
                  A startup with 30 tables in one Snowflake warehouse uses a
                  shared Notion doc to track ownership and definitions. At 200
                  tables across Snowflake, Redshift, and S3, they build a
                  catalog because manual docs are stale within days.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A bank enforces all financial reporting through a semantic
                  layer that validates metric definitions. They also run a
                  catalog for discovery across 50+ data sources, keeping the
                  systems separate to balance strict governance with broad
                  visibility.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An e-commerce company considered real time catalog updates.
                  Analysis showed 95% of use cases (search, impact analysis,
                  documentation) worked fine with 2 minute delays. They chose
                  batch ingestion, reducing their Kafka cluster size from 20
                  nodes to 4.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataCatalogSystemsBuildingVsBuyingCatalogTradeOffsAndAlternatives;
