import type { Component } from "solid-js";

const LessonFilePartitioningTheSmallFileProblemAndCompaction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            The Small File Problem and Compaction
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>What Breaks at Scale:</strong> The small file problem is the
            most common operational failure in partitioned data lakes. It
            happens when streaming ingestion or frequent micro batches write
            thousands of tiny files, typically 1 to 10 MB each, across many
            partitions. While total data volume might be modest, the sheer file
            count becomes the bottleneck. Here is why this matters. Modern query
            engines like Presto, Spark, or Trino issue one metadata request per
            file to get statistics and schema. If a partition contains 10,000
            small files instead of 40 optimally sized files, the planning phase
            alone can take 30 seconds instead of 1 second. Object stores like
            Amazon S3 charge per request, so listing operations on millions of
            files can add hundreds of dollars per day in unexpected costs.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Query Planning Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    40 FILES (256MB)
                  </div>
                  <div style="font-size: 16px; font-weight: 800">1 sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    10,000 FILES (1MB)
                  </div>
                  <div style="font-size: 16px; font-weight: 800">30 sec</div>
                </div>
              </div>
            </div>
            <strong>How Compaction Works:</strong> Compaction is a background
            process that periodically scans partitions for small files and
            rewrites them into larger, optimally sized files. A typical
            compaction job runs hourly or daily and targets partitions with file
            counts above a threshold, often 200 to 500 files. The process reads
            all small files in a partition, merges their data while preserving
            sort order if applicable, then writes out new files of 128 to 512 MB
            each. The old small files are marked for deletion but kept
            temporarily to support time travel queries. After a grace period
            (typically 7 days), they are permanently removed.
            <strong>Real Production Strategy:</strong> Airbnb runs compaction
            jobs every 6 hours on active partitions (last 3 days) and daily on
            older partitions. They target 256 MB compressed file size and
            maintain file counts under 300 per partition. This keeps query
            planning under 2 seconds for typical queries while managing a multi
            petabyte data lake. The write path also matters. Streaming sinks
            buffer data for 5 to 15 minutes before flushing files, balancing
            latency against file size. Some systems use a bucketing strategy
            where each writer handles a fixed set of partition combinations,
            reducing the number of simultaneously open files from thousands to
            dozens.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Teams often notice the small
              file problem only after scale grows 10x. A system that writes 100
              files per hour works fine initially but creates 876,000 files per
              year. Without compaction, queries degrade from seconds to minutes
              as metadata overhead dominates.
            </div>
            <strong>Monitoring Key Metrics:</strong> Track files per partition
            (alert above 500), average file size (alert below 64 MB), and
            partition planning time (alert above 5 seconds). Also monitor
            compaction lag: the delay between data write and compaction
            completion. If compaction cannot keep up with ingestion rate, you
            need to increase compaction parallelism or adjust write buffering.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Small files (under 10 MB) cause query planning to dominate
                  execution time, turning 1 second plans into 30 second waits
                  when file counts reach thousands per partition
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compaction rewrites small files into 128 to 512 MB optimized
                  files hourly or daily, keeping file counts under 300 to 500
                  per partition for sub 2 second planning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming sinks buffer data for 5 to 15 minutes before
                  flushing to balance write latency against file size,
                  preventing micro batches from creating thousands of tiny files
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Object storage charges per request, so 10,000 list operations
                  daily on millions of files can add hundreds of dollars in
                  unexpected monthly costs
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
                  Airbnb compacts partitions every 6 hours for recent data and
                  daily for older data, maintaining 256 MB files and under 300
                  files per partition across petabytes of data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A ride sharing platform initially wrote 1 MB files every
                  minute, accumulating 876,000 files yearly, causing query
                  planning to degrade from 2 seconds to 45 seconds before
                  implementing hourly compaction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFilePartitioningTheSmallFileProblemAndCompaction;
