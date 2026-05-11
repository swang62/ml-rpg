import type { Component } from "solid-js";

const LessonMetadataManagementMetadataCatalogFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Metadata Catalog Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Subtle Failures:
            </div>
            When a metadata system fails, the impact is often subtle and long
            lasting, making these failures particularly dangerous in production.
            Interviewers care deeply about this because it reveals whether you
            understand operational reality beyond the happy path.
            <strong>Failure Mode 1: Stale or Incomplete Metadata</strong>
            The most common failure is stale metadata. If crawlers or ingestion
            jobs fall behind due to backpressure or bugs, the catalog might show
            a table as "updated hourly" when the upstream pipeline has been
            failing for 12 hours. Dashboards then silently use outdated data,
            leading to wrong business decisions. To mitigate this, robust
            systems track freshness separately. They record the latest
            successful job run time as a separate field and surface SLA breaches
            explicitly in the UI. For example, if a table's SLA is "update every
            hour" and the last update was 3 hours ago, the catalog marks it with
            a warning icon. Teams set up alerts when critical tables breach
            freshness SLAs.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Freshness Tracking Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">Update OK</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">+3 HOURS</div>
                  <div style="font-size: 16px; font-weight: 800">
                    Pipeline Fails
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    SLA BREACH
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    Alert Fires
                  </div>
                </div>
              </div>
            </div>
            <strong>Failure Mode 2: Schema Drift Not Captured</strong>
            Schema drift happens when a source system changes a column from
            integer to string, or starts sending a new nested field, but the
            catalog does not capture this change promptly. Consumers that rely
            on cataloged schemas see runtime errors or silent data truncation.
            The root cause is often eventual consistency in schema discovery. A
            connector might poll for schema changes every 15 minutes. If a
            breaking change happens immediately after a poll, consumers have a
            15 minute window where they see stale schemas. Robust systems treat
            the schema registry and catalog as part of the ingestion contract.
            They enforce fail fast behaviors: if a connector detects a schema
            incompatibility (for example, a new required field), it stops
            ingestion and alerts immediately rather than silently dropping data.
            Some systems use schema evolution tools like Confluent Schema
            Registry to enforce compatibility rules (backward, forward, full) at
            write time.
            <strong>
              Failure Mode 3: Catalog Becomes a Single Point of Failure
            </strong>
            If the authorization layer depends on catalog metadata to make
            policy decisions, a catalog outage can block all queries. This is
            catastrophic: a 5 minute catalog outage means 5 minutes of zero data
            access across the organization. To avoid this, teams often cache
            critical metadata in query engines. For example, Spark might cache
            table schemas and basic access rules locally with a 5 minute time to
            live (TTL). If the catalog is unreachable, Spark serves from cache
            with slightly stale data. This degrades gracefully: queries continue
            but with outdated policies. Catalogs are designed for high
            availability: 99.9 percent or better, with multi-region redundancy
            and read replicas that serve slightly stale data if needed. Some
            implementations use consensus systems like Raft or Paxos to ensure
            the catalog itself does not lose data during node failures.
            <strong>
              Failure Mode 4: Lineage Cycles and Incorrect Dependencies
            </strong>
            In complex directed acyclic graphs (DAGs) with branching and
            backfills, naive lineage reconstruction from logs can produce cycles
            or incorrect dependency chains. For example, if a backfill job runs
            out of order, log based lineage might show table B depending on
            table A, when actually table A depends on table B. This breaks
            impact analysis. If you change table A's schema, the catalog might
            incorrectly report that table B is affected, causing unnecessary
            alerts and blocking deployments. Systems like Delta Lake help by
            providing transaction logs that capture operations deterministically
            with timestamps and version numbers. Lineage engines must handle
            late arriving events, deduplication, and versioning. Some
            implementations use checksums or cryptographic hashes of data to
            verify lineage correctness: if table B claims to depend on table A
            version 5, the engine verifies that table B's data actually contains
            hashes matching table A version 5.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Metadata often contains
              sensitive information such as PII tags or financial data
              classifications. A misconfigured catalog might expose these tags
              broadly, revealing internal data classifications even if the
              underlying data is protected. Treat the catalog as sensitive and
              apply row and column level security on metadata itself.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Interview Insight:
            </div>
            When discussing metadata systems in interviews, mentioning these
            failure modes and mitigations shows deep operational experience. The
            key pattern is: measure freshness separately from existence, enforce
            fail fast on schema changes, cache critical metadata for graceful
            degradation, and treat lineage as a versioned, verifiable artifact
            rather than a best effort log.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stale metadata is the most common failure: if ingestion lags
                  by hours, dashboards silently use outdated data. Robust
                  systems track freshness separately with explicit SLA breach
                  alerts when tables miss update windows.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema drift not captured in the catalog causes runtime errors
                  when consumers expect one type but receive another. Fail fast
                  ingestion that stops on incompatible changes prevents silent
                  data loss.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If authorization depends on the catalog, an outage blocks all
                  queries. Mitigate by caching critical metadata (schemas, basic
                  policies) in query engines with 5 minute TTL for graceful
                  degradation during catalog failures.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Lineage cycles and incorrect dependencies break impact
                  analysis. Transaction logs from Delta Lake or Iceberg provide
                  deterministic lineage, and some systems verify correctness
                  using data hashes to ensure claimed dependencies are real.
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
                  A critical revenue dashboard shows stale data for 6 hours
                  because the upstream pipeline failed, but the catalog still
                  displayed "last updated: 1 hour ago." The fix: track the
                  actual pipeline run timestamp separately and alert when it
                  exceeds the 2 hour SLA.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A source system changes a user ID column from integer to
                  string. The catalog's schema crawler runs every 15 minutes.
                  For 12 minutes, consumers read with the old schema, causing
                  parse errors. The solution: real time schema change events
                  with fail fast ingestion that blocks writes on
                  incompatibility.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The catalog experiences a 10 minute outage. Query engines have
                  cached schemas and basic access rules with 5 minute TTL. Most
                  queries continue with slightly stale policies. High security
                  queries that require fresh policy checks are delayed but not
                  completely blocked.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMetadataManagementMetadataCatalogFailureModesAndEdgeCases;
