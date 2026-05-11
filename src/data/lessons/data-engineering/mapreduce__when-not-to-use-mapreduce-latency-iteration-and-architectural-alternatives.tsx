import type { Component } from "solid-js";

const LessonMapreduceWhenNotToUseMapreduceLatencyIterationAndArchitecturalAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            When NOT to Use MapReduce: Latency, Iteration, and Architectural
            Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            MapReduce excels at full table scans, heavy extract transform load
            (ETL) pipelines, and global aggregations over terabytes to petabytes
            when you can tolerate minutes to hours of latency. However, it is
            fundamentally the wrong tool for three critical use cases: low
            latency workloads, highly iterative algorithms, and small
            interactive datasets. The batch oriented disk checkpoint model that
            provides fault tolerance becomes a liability when your requirements
            demand subsecond response times, iterative refinement with small
            deltas, or ad hoc exploratory queries. For real time use cases
            requiring subsecond to sub minute latency (streaming aggregations,
            per event scoring, sliding window analytics), stream processing
            frameworks like Apache Flink or Google Dataflow are purpose built.
            These systems maintain in memory state, process events incrementally
            as they arrive, and provide microsecond to millisecond per record
            latency instead of MapReduce's multi hour batch windows. For
            example, fraud detection scoring each transaction within 100
            milliseconds is impossible with batch MapReduce but straightforward
            with stream processing stateful operators. Highly iterative
            algorithms expose MapReduce's weaknesses most clearly. Machine
            learning training that refines model parameters over dozens of
            iterations, graph algorithms like PageRank that propagate scores
            until convergence, or clustering algorithms that iteratively update
            centroids all require reading the same data repeatedly. MapReduce's
            disk materialization between stages means each iteration pays full
            read write cost. A 10 iteration algorithm on 1 terabyte of data
            performs 10 terabytes of reads and writes per iteration, totaling
            100 terabytes of I/O. DAG engines like Apache Spark that cache
            intermediate data in memory across iterations reduce this to one
            initial read plus in memory updates, cutting runtime from hours to
            minutes. For small datasets needing interactive queries (gigabytes
            queried in seconds), massively parallel processing (MPP) databases
            like BigQuery, Redshift, or Snowflake provide columnar storage,
            query optimization, and sub second response times that MapReduce
            cannot match.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MapReduce optimizes for throughput on large bounded datasets
                  with minutes to hours latency; wrong fit for subsecond or sub
                  minute real time requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stream processing (Flink, Dataflow) provides microsecond to
                  millisecond per event latency with in memory stateful
                  operators, versus MapReduce's multi hour batch windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iterative algorithms (machine learning, graph PageRank) pay
                  10x to 100x I/O penalty with MapReduce disk materialization;
                  Spark style in memory caching cuts hours to minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Concrete example: 10 iteration ML training on 1 TB data with
                  MapReduce performs 100 TB total I/O (10 TB read + write per
                  iteration); in memory engine does 1 TB read + memory updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Small interactive queries (gigabytes, subsecond latency)
                  better served by MPP databases (BigQuery, Redshift) with
                  columnar storage and query optimization than batch MapReduce
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cloud cost implication: running MapReduce for real time
                  workloads wastes money keeping clusters idle between batches;
                  stream processors and serverless queries amortize cost across
                  continuous load
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
                  Fraud detection: scoring 10,000 transactions per second with
                  100 millisecond latency requires stream processing with in
                  memory models; batch MapReduce running every 5 minutes
                  introduces unacceptable detection delay.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PageRank on web graph: 50 iterations to convergence on 1 TB
                  graph. MapReduce: 50 TB read + 50 TB write = 100 TB I/O, 10+
                  hours. Spark with caching: 1 TB read + in memory iterations,
                  under 1 hour.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ad hoc analytics: data analyst exploring 10 GB sales dataset
                  with 20 queries in a session. MapReduce job startup overhead
                  (minutes per query) kills productivity; BigQuery returns
                  results in 1 to 5 seconds per query.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMapreduceWhenNotToUseMapreduceLatencyIterationAndArchitecturalAlternatives;
