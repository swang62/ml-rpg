import type { Component } from "solid-js";

const LessonDataProfilingHowDataProfilingWorksAtScale: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          How Data Profiling Works at Scale
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Core Mechanism:</strong>
          Data profiling at scale operates as a distributed computation problem.
          For each column in a dataset, workers compute local statistics on
          chunks of data, then merge those partial results into final metrics.
          The key is using algorithms that support efficient parallel
          aggregation.
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Map Phase:</strong> Each worker reads a partition and
                computes local statistics: row count, null count, min and max,
                sum for numerics, approximate distinct count using HyperLogLog,
                and histogram buckets.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Reduce Phase:</strong> Partial aggregates merge into
                global statistics. Counts add, min and max compare, HyperLogLog
                sketches merge to estimate total distinct values, histograms
                combine to approximate distribution.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Storage:</strong> Results go into a metadata catalog
                keyed by dataset, column, and time partition. Metrics also
                export to monitoring systems for alerting.
              </div>
            </div>
          </div>
          <strong>Real Production Numbers:</strong>
          Consider profiling a 1 Terabyte (TB) daily partition in a data
          warehouse. With 100 worker nodes, each processes roughly 10 Gigabytes
          (GB). Reading at 200 Megabytes per second (MB/s), that is 50 seconds
          of I/O per worker. Computing statistics adds another 30 to 60 seconds.
          With good parallelism, total wall clock time is under 10 minutes for
          p50 latency, with p99 around 20 minutes.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Profiling Performance At Scale
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">1 TB</div>
                <div style="font-size: 10px; font-weight: 600">DAILY DATA</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">10 min</div>
                <div style="font-size: 10px; font-weight: 600">P50 LATENCY</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">100</div>
                <div style="font-size: 10px; font-weight: 600">WORKERS</div>
              </div>
            </div>
          </div>
          <strong>Approximate Algorithms Enable Scale:</strong>
          Full exact computation becomes prohibitively expensive. HyperLogLog
          estimates distinct counts with 1 to 2 percent error using only
          kilobytes of memory per column, versus gigabytes for exact sets.
          Reservoir sampling provides quantiles from a fixed size sample. T
          Digest sketches approximate percentiles accurately. These trade tiny
          accuracy loss for massive cost savings.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> An ecommerce company ingesting 5 TB
            of raw events daily uses lightweight profiling on 0.1 to 1 percent
            samples during ingestion for near real time alerts, then runs
            comprehensive batch profiling nightly on new partitions.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Raw Data Partitions</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  1 TB / 100 workers = 10 GB each
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Map: Local Stats</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  counts, min/max, HyperLogLog
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">
                  Reduce: Merge Aggregates
                </strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Global statistics per column
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Metadata Catalog</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Stored + exported to monitoring
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
                Distributed profiling uses map reduce pattern: workers compute
                local statistics, then merge into global metrics with algorithms
                supporting efficient aggregation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                For a 1 TB partition with 100 workers, profiling completes in
                under 10 minutes p50 and 20 minutes p99 by parallelizing
                computation and I/O
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Approximate algorithms like HyperLogLog for distinct counts and
                T Digest for quantiles reduce memory from gigabytes to kilobytes
                with only 1 to 2 percent error
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Production systems use layered approach: lightweight sampling
                during ingestion for fast alerts, comprehensive batch profiling
                nightly for detailed analysis
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
                HyperLogLog estimates 1.2 billion distinct
                &lt;code&gt;user_id&lt;/code&gt; values in a 500 GB table using
                only 12 KB of memory per worker, with final estimate accurate
                within 1.5%
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Reservoir sampling of 100,000 rows from 10 billion events
                provides quantiles for &lt;code&gt;order_total&lt;/code&gt;
                distribution accurate enough for query optimization
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataProfilingHowDataProfilingWorksAtScale;
