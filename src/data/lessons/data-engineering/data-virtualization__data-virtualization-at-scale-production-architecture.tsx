import type { Component } from "solid-js";

const LessonDataVirtualizationDataVirtualizationAtScaleProductionArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Data Virtualization at Scale: Production Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Scale:
            </div>
            At FAANG scale companies, data virtualization complements rather
            than replaces warehouses and data lakes. Consider an e-commerce
            company with a complex data landscape: 3 regional transactional
            databases handling 5,000 to 10,000 writes per second each, a CRM
            SaaS system, a Snowflake or BigQuery warehouse with 500 TB of
            historical events, and object storage ingesting 5 TB of clickstream
            logs daily. The business demands a Customer 360 API and real time
            dashboards. Product teams need single customer lookups with p50
            latency under 200ms and p99 under 800ms. Analytics needs dashboards
            refreshing in under 2 to 5 seconds at p95 while joining across
            multiple systems.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Three Layer Architecture:
            </div>
            Production systems use a layered approach. First, the connection
            layer contains specialized adapters for each source, handling
            authentication, pagination, query dialect translation, and
            statistics collection. Each connector tracks average response times
            and row counts to feed the optimizer. Second, the abstraction and
            semantic layer defines logical models and business entities. This
            layer maps virtual "Customer" or "Order" schemas onto fragmented
            physical sources. It includes calculated fields, data quality rules,
            and standardized business definitions shared across teams. When
            marketing and finance both query "revenue," they get the same
            definition despite different underlying tables. Third, the
            consumption layer provides SQL interfaces for BI tools, APIs for
            services, and domain specific query languages. This layer enforces
            row and column level security, data masking, and auditing. Even if a
            source database has weak access controls, the virtual layer ensures
            compliance policies are consistently applied.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> The query engine nodes are
              stateless and deployed behind load balancers for horizontal
              scaling. Metadata catalogs live in strongly consistent stores with
              high availability. Query execution is distributed, with each node
              capable of orchestrating subqueries and performing joins
              independently.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Hybrid Materialization Strategy:
            </div>
            Most large organizations end up with a hybrid pattern. They
            materialize the most expensive query patterns as views in the
            warehouse or lakehouse, achieving 10x to 50x performance gains for
            heavy analytical scans. Less critical aggregations or rarely queried
            datasets remain purely virtual, avoiding storage costs and keeping
            data fresh.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Workload Distribution
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">70%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    MATERIALIZED
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">30%</div>
                  <div style="font-size: 10px; font-weight: 600">VIRTUAL</div>
                </div>
              </div>
            </div>
            Operationally, teams monitor per source error rates, p95 and p99
            latencies, cache hit ratios, and query plans that frequently time
            out. Admission control and query quotas protect fragile backends
            like SaaS APIs from being overwhelmed by unexpected dashboard
            popularity.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Production Data Virtualization Stack
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Consumption Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    SQL APIs, BI Tools, Security &amp; Auditing
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↕
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Semantic Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Virtual Schemas, Business Logic, Metadata
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↕
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Connection Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Adapters, Query Translation, Statistics
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↕
                </div>
                <div style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap">
                  <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>PostgreSQL</strong>
                  </div>
                  <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>Salesforce</strong>
                  </div>
                  <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>Snowflake</strong>
                  </div>
                  <div style="border: 2px solid; padding: 6px 10px; border-radius: 4px; font-size: 11px; text-align: center">
                    <strong>S3</strong>
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
                  Production architectures use three layers: connection layer
                  for source adapters, semantic layer for business logic and
                  virtual schemas, and consumption layer for user interfaces and
                  security
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real systems at scale handle 5,000 to 10,000 writes per second
                  across regional databases and 500 TB data warehouses while
                  targeting p50 latencies under 200ms for single customer
                  lookups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Most large organizations adopt hybrid patterns where 70% of
                  workloads use materialized views in warehouses for performance
                  and 30% remain purely virtual for freshness and cost
                  efficiency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stateless query engine nodes deployed behind load balancers
                  enable horizontal scaling, while strongly consistent metadata
                  stores ensure schema changes and security policies propagate
                  correctly
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
                  Google BigQuery and DataPlex provide federated query features
                  as specialized data virtualization, allowing cross system
                  views and governance across multi cloud and on premises
                  systems without full data movement.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A financial services company uses Denodo to virtualize 50 plus
                  backend systems. High traffic customer profile queries (80% of
                  load) are served from materialized views in Snowflake with sub
                  100ms latency. Rare compliance reports spanning 20 systems
                  remain purely virtual, trading 5 to 10 second latency for data
                  freshness and avoiding petabytes of duplicate storage.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataVirtualizationDataVirtualizationAtScaleProductionArchitecture;
