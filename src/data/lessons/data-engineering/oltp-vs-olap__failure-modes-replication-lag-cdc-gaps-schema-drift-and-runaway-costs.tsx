import type { Component } from "solid-js";

const LessonOltpVsOlapFailureModesReplicationLagCdcGapsSchemaDriftAndRunawayCosts: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Replication Lag, CDC Gaps, Schema Drift, and Runaway
            Costs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Replication lag and read your writes violations are common OLTP
            pitfalls when using read replicas for scaling or mixed workloads.
            Read replicas can lag under load, especially during heavy write
            bursts or large transactions. Clients routing reads to replicas may
            observe stale state: a user updates their profile, the write commits
            to the primary, but their next read hits a lagging replica and shows
            the old value. Monitor replication lag via logical log sequence
            positions or replication delay metrics; set alerting thresholds (for
            example, alert when lag exceeds 5 seconds) and route critical reads
            requiring read your writes consistency to primaries or employ
            session stickiness to pin a user's session to a single replica.
            Change Data Capture pipelines introduce their own failure modes. Log
            based CDC can drop or duplicate events during connector failovers,
            network partitions, or when reading from a failed over primary with
            a different log position. Without idempotent upserts (using
            deterministic primary keys and versioning) and exactly once
            semantics at sinks, OLAP facts can be double counted: the same order
            gets inserted twice, inflating revenue by millions. Table
            reorganizations like type changes, tablespace moves, or vacuum full
            can reset log positions, triggering full table backfills that flood
            downstream systems with terabytes of data and overwhelm ingestion
            capacity, causing freshness to degrade from seconds to hours and
            breaching operational SLIs. Schema drift and slowly changing
            dimension (SCD) handling break pipelines in subtle ways. Evolving
            schemas—column type changes (integer to bigint), column renames, or
            dimension rekeys (changing how product_id is assigned)—break Extract
            Transform Load (ETL) or Extract Load Transform (ELT) jobs if not
            handled carefully. Incorrectly handling SCDs leads to time travel
            inaccuracies: if you update a customer's region in place (Type 1
            SCD) instead of versioning with effective dates (Type 2), historical
            revenue reports will retroactively attribute all past orders to the
            new region, violating financial reconciliation. Data skew and join
            blow ups cause resource exhaustion: a single high traffic customer
            or product can create a hot key that causes partition skew,
            resulting in one worker processing gigabytes while others sit idle.
            Cross joins or insufficient filter predicates can explode the join
            graph, generating trillions of intermediate rows that spill to disk
            and run for hours before out of memory termination. Cost runaway is
            a production reality. Ad hoc queries that scan full history—querying
            all orders ever without date filters on a petabyte scale table—can
            spike costs by orders of magnitude in pay per scan cloud warehouses,
            generating five or six figure bills for a single query.
            Materializing too many aggregate combinations causes cube explosion:
            precomputing revenue by every combination of 10 dimensions with 10
            values each creates 10 billion aggregate rows. Engineers must
            enforce guardrails: reject full history scans in interactive
            contexts, implement query cost estimation and approval workflows for
            expensive queries, and set per user or per team spending limits with
            automatic query cancellation when exceeded.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="font-weight: 700; font-size: 15px; margin-bottom: 12px; text-align: center">
                Common Failure Modes
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Replication Lag</strong>
                  <div style="font-size: 12px; margin-top: 4px; line-height: 1.5">
                    Replica lags 30s under write burst → User reads stale
                    profile data → Read-your-writes violation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">CDC Duplication</strong>
                  <div style="font-size: 12px; margin-top: 4px; line-height: 1.5">
                    Connector failover → Order event replayed → Revenue double
                    counted without idempotent upsert
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Schema Drift</strong>
                  <div style="font-size: 12px; margin-top: 4px; line-height: 1.5">
                    Column type change (int → bigint) → ETL parser fails →
                    Pipeline stuck, freshness degrades to hours
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Cost Runaway</strong>
                  <div style="font-size: 12px; margin-top: 4px; line-height: 1.5">
                    Ad hoc full history scan (no date filter) → Query scans 50
                    TB → $5,000 bill for single query
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
                  Replication lag causes read your writes violations when
                  replicas lag under load; monitor lag via log positions, alert
                  at thresholds (example: 5 seconds), route critical reads to
                  primary or use session stickiness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CDC pipelines can drop or duplicate events during failover;
                  without idempotent upserts using deterministic keys and
                  exactly once semantics, facts get double counted (orders
                  inserted twice, inflating revenue)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Table reorganizations (vacuum, type changes) can reset CDC log
                  positions, triggering full backfills that flood ingestion with
                  terabytes and degrade freshness from seconds to hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incorrect slowly changing dimension handling (Type 1 in place
                  updates instead of Type 2 versioning) causes time travel
                  inaccuracies where historical reports retroactively attribute
                  data to new dimension values, breaking financial
                  reconciliation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost runaway from ad hoc full history scans can spike bills by
                  orders of magnitude (example: petabyte scan generates six
                  figure cost); enforce guardrails with query cost estimation,
                  approval workflows, and per team spending limits with auto
                  cancellation
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
                  Uber trip database: replica lag spiked to 45 seconds during
                  peak, causing riders to see stale trip status; mitigation was
                  to route status reads to primary and set lag alert at 10
                  seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon analytics pipeline: CDC connector failover during
                  schema migration caused 3 hours of duplicate order events;
                  required idempotent merge using (order_id, version) composite
                  key to deduplicate in warehouse
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta data warehouse: engineer ran ad hoc query without date
                  filter, scanned 80 TB of historical events, generated $12,000
                  bill; implemented query cost estimator and approval gate for
                  queries over 5 TB scan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOltpVsOlapFailureModesReplicationLagCdcGapsSchemaDriftAndRunawayCosts;
