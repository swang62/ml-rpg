import type { Component } from "solid-js";

const LessonOltpVsOlapImplementationStreamingCdcScdModelingQueryGuardrailsAndObservability: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation: Streaming CDC, SCD Modeling, Query Guardrails, and
            Observability
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Implementing reliable data movement from OLTP to OLAP starts with
            change data capture from write ahead logs. Configure CDC connectors
            to tail the log with at least once delivery guarantees, then ensure
            idempotency at the warehouse sink using deterministic primary keys
            derived from source keys plus version or timestamp fields. For
            example, derive a surrogate key as hash(order_id, updated_at) so
            that replaying an update event is idempotent: the merge or upsert
            operation matches the existing row and applies the update once.
            Validate completeness by reconciling row counts and aggregate sums
            over sliding time windows (example: compare order count and total
            revenue between source OLTP and target OLAP every 5 minutes, alert
            on drift over 0.1 percent). Automate backfills using snapshot plus
            delta replay from a bookmark, with safeguards to detect and skip
            already applied ranges to avoid duplication. Model slowly changing
            dimensions correctly to maintain historical accuracy. For dimensions
            that change rarely but matter for time travel (customer region,
            product category), use Type 2 SCD: add effective_from and
            effective_to timestamp columns and a surrogate key. When a customer
            moves from region US to region EU, insert a new dimension row with a
            new surrogate key, close the old row's effective_to, and update all
            subsequent fact inserts to reference the new surrogate key. Fact to
            dimension joins now include a time predicate (fact.order_date
            BETWEEN dim.effective_from AND dim.effective_to) to correctly
            attribute historical orders. For high velocity dimensions that
            change too frequently to version (example: real time inventory
            levels), denormalize a snapshot into facts at event time or use Type
            1 updates and accept that historical queries will reflect current
            state. Enforce query guardrails to prevent cost and performance
            runaway. Implement query cost estimation based on bytes to scan and
            reject interactive queries exceeding thresholds (example: block
            queries scanning more than 1 TB without explicit approval). Set per
            query memory limits and timeouts (example: 10 GB RAM, 5 minute
            timeout for interactive; 100 GB and 60 minutes for batch). Use
            adaptive join strategies to handle skew: broadcast small dimension
            tables to all workers, apply salting (add random prefix to skewed
            keys to split hot partitions), and configure dynamic partition
            pruning to push filters into scans. Monitor and enforce admission
            control: limit concurrent queries per user or team, queue excess
            queries, and prioritize by Service Level Objective (SLO) tier
            (interactive over batch). Observability is critical for both OLTP
            and OLAP. For OLTP, track p50, p95, p99 transaction latency, lock
            wait times, deadlock rates per minute, replication lag in seconds,
            and maintain error budgets (example: 99.9 percent of transactions
            must complete successfully within 100 ms). Capacity plan with
            headroom: provision for 2 to 3 times daily peak Queries Per Second
            (QPS) to handle traffic spikes. For OLAP, track end to end data
            freshness (event time to query time lag), bytes scanned per query,
            average and 95th percentile query duration, and cache hit rates. Set
            Service Level Indicators (SLIs) for freshness (example: operational
            dashboards must have data fresher than 2 minutes; alert if lag
            exceeds 5 minutes) and enforce spending alerts (example: notify when
            daily scan volume exceeds budget by 20 percent).
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Implement idempotent CDC sinks using deterministic keys like
                  hash(order_id, updated_at); reconcile counts and sums between
                  OLTP and OLAP every 5 minutes, alert on drift over 0.1 percent
                  to catch duplication or loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use Type 2 slowly changing dimensions with effective_from,
                  effective_to, and surrogate keys for time travel accuracy;
                  fact to dimension joins include time predicates (fact.date
                  BETWEEN dim.effective_from AND effective_to)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enforce query guardrails: reject interactive queries scanning
                  over 1 TB without approval, set memory limits (10 GB
                  interactive, 100 GB batch) and timeouts (5 min vs 60 min), use
                  salting and broadcast joins to handle skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OLTP observability: track p99 latency, lock waits,
                  deadlocks/min, replication lag; maintain error budgets (99.9
                  percent under 100 ms); capacity plan for 2 to 3x daily peak
                  QPS to absorb spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OLAP observability: track freshness SLI (event time to query
                  time), bytes scanned, p95 query duration, cache hit rate;
                  alert when operational dashboard freshness exceeds 5 minutes
                  or daily scan cost exceeds budget by 20 percent
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
                  Amazon order CDC: tails write ahead log with at least once
                  delivery, uses upsert with (order_id, version) key; reconciles
                  order count and revenue sum every 5 min, caught 0.3 percent
                  drift indicating connector lag
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google customer dimension: Type 2 SCD with surrogate key; when
                  customer changes region, inserts new row with new key and
                  closes old effective_to; historical revenue queries join on
                  fact.order_date BETWEEN dim.effective_from AND effective_to
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber analytics: enforces 500 GB scan limit for interactive
                  queries; analyst attempted 2 TB full history scan, query
                  rejected with message to use batch queue or add date filter;
                  saved estimated $400 in compute cost
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOltpVsOlapImplementationStreamingCdcScdModelingQueryGuardrailsAndObservability;
