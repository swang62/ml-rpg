import type { Component } from "solid-js";

const LessonFilePartitioningFailureModesSkewLateDataAndEvolution: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Skew, Late Data, and Evolution
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Data Skew Breaking Parallelism:</strong> Partition skew
            occurs when data distribution across partitions is highly uneven.
            Suppose you partition by <code>region</code> and 70% of traffic
            comes from "US". The US partitions will be 3x to 5x larger than
            others. When a query processes all regions, execution time is
            dominated by the slowest partition, and parallelism becomes useless.
            The math is brutal. If you have 100 workers processing 100
            partitions, but one partition contains 500 GB while others average
            50 GB, that single partition takes 10x longer to process. Your 100
            worker cluster effectively becomes a 1 worker system for that query
            because 99 workers finish early and sit idle waiting for the
            straggler.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Skewed Partition Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    99 workers
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    IDLE IN 2 MIN
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">1 worker</div>
                  <div style="font-size: 10px; font-weight: 600">
                    RUNS 20 MIN
                  </div>
                </div>
              </div>
            </div>
            Mitigation strategies include hybrid partitioning where you split
            large partitions further. For example, <code>region=US</code> can be
            subdivided into <code>region=US/subregion=West</code>,{" "}
            <code>region=US/subregion=East</code>. Another approach is to add
            hash bucketing within skewed partitions:{" "}
            <code>region=US/bucket=047</code> where bucket is hash(user_id) mod
            64. This distributes the US traffic across 64 buckets while keeping
            other regions as single partitions.
            <strong>Late Arriving Data:</strong> Time based partitions assume
            data arrives promptly. In reality, mobile devices go offline,
            upstream systems lag, or batch jobs retry. If your partition is{" "}
            <code>dt=2024-12-25</code> and events for that date trickle in for 3
            days, you face a choice: reopen and rewrite the partition, or
            maintain a separate late data partition. Reopening partitions breaks
            immutability assumptions. Downstream incremental jobs that already
            processed <code>dt=2024-12-25</code> must detect and reprocess it.
            This requires tracking partition modification timestamps and
            complicates dependency management. At scale, continuous partition
            rewrites also interfere with compaction jobs and increase storage
            churn. The alternative is a dedicated late data strategy. Some
            systems maintain <code>dt=2024-12-25/late=true</code> partitions and
            periodically merge them with main partitions. Others accept eventual
            consistency and document that queries must union current and late
            partitions for complete accuracy. Airbnb uses a 3 day grace period:
            data arriving within 3 days goes to the main partition, older
            arrivals go to a backfill partition that is processed separately.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Late data is not an edge case at
              scale. In systems processing billions of mobile events daily, 2%
              to 5% of events arrive over 24 hours late, and 0.5% arrive over 1
              week late.
            </div>
            <strong>Partition Evolution Challenges:</strong> After operating for
            a year, teams often realize the original partition scheme was wrong.
            Maybe you partitioned only by date but now need hourly granularity.
            Or you partitioned by <code>user_id</code> directly and metadata
            exploded to 10 million partitions. Repartitioning 500 TB is not
            trivial. Full rewrite takes days to weeks of compute time and
            doubles storage during the migration. Systems like Apache Iceberg
            support partition evolution where new data uses the new scheme and
            old data keeps the old scheme. Queries transparently handle mixed
            layouts by applying appropriate pruning logic to each segment. This
            avoids rewriting everything but adds complexity to query planning. A
            common failure mode is planning timeouts when partition schemas mix.
            If you have 50,000 old hourly partitions plus 10,000 new daily
            partitions, and a query spans both, the planner must build a unified
            execution plan across heterogeneous layouts. This can push planning
            time from seconds to tens of seconds, especially in systems with
            naive metadata handling. The solution is to gradually backfill old
            data using background jobs, retiring mixed schemas within a bounded
            time window like 90 days.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="font-size: 12px; font-weight: 700; margin-bottom: 12px; text-align: center">
                LATE DATA HANDLING TIMELINE
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Day 0: Normal Ingestion
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    95% of dt=2024-12-25 data arrives
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Day 1-3: Grace Period</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Additional 3% trickles in, merged to main partition
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Day 4+: Late Data</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Remaining 2% goes to dt=2024-12-25/late=true
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
                  Skewed partitions where one partition is 5x to 10x larger than
                  others destroy parallelism, causing 99 workers to sit idle
                  while 1 worker processes the oversized partition for 10x
                  longer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving data affects 2% to 5% of mobile events at scale,
                  forcing choice between reopening partitions (breaking
                  immutability) or maintaining separate late data partitions
                  with 3 day grace periods
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition evolution after realizing wrong initial scheme
                  requires either expensive full rewrites of 500+ TB or complex
                  mixed schema handling where old and new layouts coexist during
                  gradual migration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixed partition schemas during evolution can push query
                  planning from under 1 second to over 10 seconds when spanning
                  50,000 old partitions plus 10,000 new partitions
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
                  A dataset partitioned by region where 70% of 500 GB daily data
                  lands in region=US creates a 350 GB partition that takes 20
                  minutes to process while 99 other regional partitions finish
                  in 2 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb uses 3 day grace period for late data: events arriving
                  within 3 days merge to main partition, older arrivals go to
                  separate backfill partition processed independently to avoid
                  continuous rewrites
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFilePartitioningFailureModesSkewLateDataAndEvolution;
