import type { Component } from "solid-js";

const LessonDataGovernanceFrameworkHowGovernanceEnforcementWorksAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Governance Enforcement Works at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Architecture Pattern:</strong> Modern data governance
            uses a horizontal control plane that sits across your entire data
            stack: ingestion systems, data lakes, warehouses, feature stores,
            and serving layers. This control plane consists of three core
            services that work together.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Metadata Query Performance
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100K</div>
                  <div style="font-size: 10px; font-weight: 600">
                    DATASETS MANAGED
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    &lt; 200ms
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 LATENCY
                  </div>
                </div>
              </div>
            </div>
            <strong>The Three Service Pattern:</strong> First, a{" "}
            <strong>metadata store</strong> holds all dataset information:
            schemas, owners, classifications (public, internal, restricted,
            PII), SLAs, and lineage. This must handle thousands of reads per
            second since it backs catalog UIs, query planners, and policy
            evaluations. Companies typically implement this with a graph or
            document store for lineage relationships and a key value store for
            fast metadata lookups. Second, a <strong>policy engine</strong>{" "}
            evaluates access rules in real time. When a product analyst queries
            a table joining user events with payment data, the policy engine
            checks: user identity, data classification, and region. It returns a
            decision: show raw values, show masked values, or deny access. For
            10x scale, this engine uses caching, deny by default semantics, and
            batch evaluation for large queries. Third,{" "}
            <strong>lineage collectors</strong> instrument orchestrators and
            processing engines. Each job run reports input datasets, output
            datasets, code version, and runtime parameters. For streaming
            systems, lineage tracks at topic and consumer group level, not per
            event. This builds a directed acyclic graph supporting impact
            analysis and root cause investigation.
            <strong>Real Enforcement Example:</strong> Consider a General Data
            Protection Regulation (GDPR) compliance scenario. Your governance
            system marks the <code>users.email</code> column as PII with EU
            region restriction and 30 day retention. When a data scientist in
            the US tries to query this column, the policy engine denies access.
            When an EU based customer support agent queries it, access is
            granted but logged for audit. After 30 days, an automated lifecycle
            job deletes or anonymizes that data based on retention metadata.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Uber and Airbnb integrate
              governance directly into their data portals. Before using a
              dataset, analysts see freshness status, quality metrics, and owner
              contact information. This prevents the classic problem where
              someone builds a dashboard on stale or deprecated data.
            </div>
            <strong>The Critical Integration Points:</strong> Governance
            metadata must be queryable from query engines (Spark, Presto),
            orchestrators (Airflow, Temporal), access gateways (API layers,
            notebooks), and storage systems (S3, HDFS). This means your metadata
            service becomes a critical dependency. Many companies run it in
            multiple availability zones with aggressive caching layers (5 to 15
            minute Time To Live values) to survive outages while maintaining
            policy enforcement during normal operation.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Query Request</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Analyst queries payment table
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Policy Engine Check</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    User + Classification + Region
                  </div>
                </div>
                <div style="display: flex; gap: 8px; width: 100%">
                  <div style="flex: 1; border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">GRANT</strong>
                    <div style="font-size: 10px">Log access</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">MASK</strong>
                    <div style="font-size: 10px">Tokenize PII</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">DENY</strong>
                    <div style="font-size: 10px">Region violation</div>
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
                  Governance operates as a horizontal control plane with three
                  core services: metadata store (catalog), policy engine (access
                  control), and lineage collectors (tracking)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The metadata store must maintain p99 latency under 200ms while
                  serving thousands of queries per second from catalog UIs,
                  query planners, and policy evaluations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Policy engines use caching (5 to 15 minute TTL), deny by
                  default semantics, and batch evaluation to scale to 10x
                  traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lineage collectors instrument orchestrators and engines to
                  build directed acyclic graphs tracking data flows, enabling
                  impact analysis and root cause investigation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Access decisions happen in real time: masking or tokenizing
                  PII adds 10 to 30 percent query complexity and latency
                  overhead but is required for GDPR compliance
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
                  When a job processes 500K events per second, lineage is
                  tracked at topic and consumer group level (not per event) to
                  avoid overwhelming the metadata store with millions of lineage
                  writes per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A policy engine evaluating access for a query joining 10
                  tables must complete authorization checks in under 50ms to
                  keep total query overhead acceptable, requiring cached policy
                  evaluation and efficient metadata lookups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For GDPR right to be forgotten requests, the governance system
                  uses lineage to identify all derived datasets containing a
                  user's identifier, then triggers deletion jobs across data
                  lake, warehouse, feature store, and backup systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataGovernanceFrameworkHowGovernanceEnforcementWorksAtScale;
