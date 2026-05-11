import type { Component } from "solid-js";

const LessonOltpVsOlapKeyTradeoffsNormalizationConsistencyFreshnessAndCostModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Key Tradeoffs: Normalization, Consistency, Freshness, and Cost
            Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            The normalization versus denormalization tradeoff shapes everything.
            OLTP prefers normalized schemas to reduce write amplification and
            maintain integrity: when a customer updates their address, you
            change one row in the customers table rather than updating millions
            of order records. Every order references customer_id as a foreign
            key, and joins happen at query time. This keeps writes fast but
            makes analytical queries expensive: computing revenue by customer
            region requires joining orders to customers to addresses, scanning
            indexes and performing nested loops or hash joins that add latency
            and memory pressure. OLAP inverts this: denormalize the customer's
            region directly into the order fact table at ingestion time. Now
            revenue by region is a simple columnar scan and group by, no joins
            required. The tradeoff is that dimension updates must propagate to
            all historical facts, which OLAP solves with slowly changing
            dimensions (SCD): maintain effective_from and effective_to dates and
            surrogate keys so you can correctly attribute historical orders to
            the customer's region at that point in time. Consistency model
            versus availability and geo latency is another fundamental tradeoff.
            Strong consistency across regions increases commit latency by tens
            to over 100 milliseconds because the system must achieve consensus
            via algorithms like Paxos or Raft across wide area network (WAN)
            links. Google's global OLTP uses TrueTime to bound uncertainty and
            achieve external consistency, adding observable latency for cross
            region writes but enabling transactional invariants like preventing
            a user from spending more than their budget across all regions
            simultaneously. Most companies choose regional strong consistency
            with asynchronous cross region replication for OLTP, accepting
            Recovery Point Objective (RPO) near zero and Recovery Time Objective
            (RTO) of minutes if a region fails. OLAP often tolerates eventual
            consistency during ingestion because analytical queries aggregate
            over millions of rows where a few seconds of lag on a handful of
            updates is negligible. Freshness versus isolation is the operational
            heart of the split. Querying OLTP directly for analytics gives zero
            lag data but risks lock contention, memory exhaustion from large
            result sets, and latency spikes that violate Service Level
            Objectives (SLOs) for user facing transactions. A single analyst
            running an ad hoc query that scans 10 million rows can spike CPU and
            I/O, increasing p99 transaction latency from 20 ms to 500 ms and
            triggering cascading failures. Exporting via CDC and ingesting into
            OLAP introduces freshness lag—seconds for streaming with Kafka and
            Flink, minutes to hours for batch with scheduled Extract Transform
            Load (ETL) jobs—but provides complete workload isolation. The choice
            depends on business requirements: operational dashboards for supply
            demand or fraud detection may require sub minute freshness and tight
            Service Level Indicators (SLIs), while monthly reporting tolerates
            daily batch. Cost models diverge sharply. OLTP cost scales with
            write amplification (maintaining multiple indexes), storage of
            primary and secondary indexes on fast Solid State Drives (SSDs), and
            provisioned Input/Output Operations Per Second (IOPS). A heavily
            indexed table might incur 5x write amplification: one logical insert
            triggers five physical writes. Provisioning for 100,000 sustained
            IOPS can cost thousands of dollars per month. OLAP cost scales with
            data scanned (pay per terabyte in many cloud warehouses), compute
            slots or virtual warehouses, and storage of historical partitions
            and materialized aggregates. Over aggregating every dimension
            combination causes cube explosion: materializing revenue by all
            combinations of date, region, product, and customer segment creates
            billions of aggregate rows that bloat storage costs. Under
            aggregating increases query latency and compute cost because every
            query must scan raw facts. The optimization is to materialize
            aggregates along the most common query patterns (say, by day and
            region) and let less frequent queries compute on the fly, accepting
            higher latency for lower storage cost.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Normalization (OLTP) minimizes write amplification but makes
                  analytical joins expensive; denormalization (OLAP) eliminates
                  runtime joins but requires slowly changing dimension (SCD)
                  tracking with effective dates and surrogate keys to maintain
                  historical correctness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Strong cross region consistency adds tens to 100+ ms commit
                  latency for global transactions; most OLTP uses regional
                  strong consistency with async replication (RPO near zero, RTO
                  minutes) while OLAP tolerates eventual consistency during
                  ingestion
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Freshness versus isolation tradeoff: direct OLTP queries give
                  zero lag but risk lock contention and latency spikes (p99 from
                  20 ms to 500 ms); CDC introduces seconds to hours lag but
                  provides complete workload isolation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  OLTP cost scales with write amplification (5x for heavily
                  indexed tables), provisioned IOPS (thousands per month for
                  100K sustained), and fast SSD storage; OLAP cost scales with
                  data scanned (pay per TB), compute slots, and materialized
                  aggregate storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Aggregate cube explosion: materializing all dimension
                  combinations creates billions of rows; the optimization is to
                  materialize only common query patterns (day + region) and
                  compute less frequent aggregations on the fly, trading query
                  latency for storage cost
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
                  Amazon orders: OLTP stores customer_id foreign key
                  (normalized); OLAP denormalizes customer region into order
                  fact table at ingestion, avoiding joins. Uses Type 2 SCD with
                  effective_from/to when customer moves regions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Ads billing: external consistency across regions for
                  budget enforcement adds tens of ms to cross region writes but
                  prevents overspend; analytical queries tolerate eventual
                  consistency for reporting lag
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber analytics: streaming CDC gives sub minute freshness for
                  operational heatmaps (isolation maintained), while direct OLTP
                  queries during incident caused p99 latency spike from 30 ms to
                  600 ms affecting rider experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOltpVsOlapKeyTradeoffsNormalizationConsistencyFreshnessAndCostModels;
