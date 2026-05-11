import type { Component } from "solid-js";

const LessonMapreduceBatchProcessingPerformanceModelIoBoundsAndCapacityPlanning: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Batch Processing Performance Model: I/O Bounds and Capacity Planning
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            MapReduce job runtime is fundamentally limited by three sequential
            bulk data transfers: reading input from storage, shuffling
            intermediate data across the network, and writing output back to
            storage. For a job processing S bytes of input with aggregate
            cluster disk read throughput D_read, network bandwidth B_net, and
            write throughput D_write, the theoretical lower bound is T_job ≥
            max(S/D_read, S_shuffle/B_net, S_out/D_write) plus scheduling and
            task overhead. Real jobs are typically bottlenecked by whichever
            phase moves the most bytes relative to available bandwidth. Consider
            a concrete example: a 200 node cluster where each node reads at 200
            megabytes per second from disk and has 10 gigabit per second network
            (approximately 1.25 gigabytes per second). Aggregate read capacity
            is roughly 40 gigabytes per second and conservative shuffle capacity
            accounting for cross rack bisection limits is 100 to 150 gigabytes
            per second. Processing 1 petabyte (1000 terabytes) with a typical
            map output ratio of 0.3 (300 terabytes shuffled) and reduce output
            ratio of 0.1 (100 terabytes written) yields: read phase takes 1000
            TB / 40 GB per second equals roughly 7 hours, shuffle phase takes
            300 TB / 120 GB per second equals roughly 7 hours, write phase takes
            100 TB / 40 GB per second equals 2.5 hours. Expect 7 to 10 hour wall
            clock time after straggler effects and overhead. The architectural
            levers for optimization are partition sizing (create enough tasks to
            saturate all machines without drowning in scheduling overhead),
            early reduction via combiners (shrink shuffle volume before network
            transfer), and skew mitigation (prevent hot partitions from becoming
            the long tail). Yahoo's 2008 TeraSort benchmark sorted 1 terabyte in
            209 seconds across 910 nodes, achieving 4.9 gigabytes per second end
            to end throughput including all phases, demonstrating that well
            tuned MapReduce can approach hardware limits when data is uniformly
            distributed.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three phase I/O model: job time is bounded by slowest of input
                  read, shuffle transfer, and output write relative to available
                  bandwidth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real capacity planning example: 200 node cluster with 200
                  megabytes per second disk and 10 gigabit per second network
                  processes 1 petabyte in 7 to 10 hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shuffle volume often dominates: a 0.3 map output ratio on 1
                  petabyte input creates 300 terabytes of network transfer,
                  easily saturating bisection bandwidth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combiners provide the biggest optimization win:
                  pre-aggregating before shuffle can reduce network bytes by 10x
                  to 100x for associative operations like sum or count
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Yahoo TeraSort 2008 achieved 4.9 gigabytes per second
                  sustained throughput sorting 1 terabyte on 910 nodes, showing
                  near hardware efficiency is possible with uniform data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Task granularity matters: too few large tasks underutilize the
                  cluster, too many tiny tasks waste time in scheduling and
                  setup (aim for several minute task durations)
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
                  Aggregation job with combiner: 1 TB input, mappers emit 500
                  GB, combiner reduces to 50 GB shuffled, final output 5 GB.
                  Shuffle drops from hours to minutes by pre-aggregating.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Join without combiner: 1 TB dimension table + 10 TB fact table
                  = 11 TB shuffle (all data moves). With map side broadcast of
                  dimension, shuffle is zero since join happens in mappers.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Skewed job: 1000 reducers process 10 TB, but one hot key
                  routes 1 TB to a single reducer. That reducer takes 10x longer
                  than others, job time determined by this single straggler.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMapreduceBatchProcessingPerformanceModelIoBoundsAndCapacityPlanning;
