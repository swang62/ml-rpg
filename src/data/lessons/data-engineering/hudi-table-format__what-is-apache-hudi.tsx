import type { Component } from "solid-js";

const LessonHudiTableFormatWhatIsApacheHudi: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Apache Hudi?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>Apache Hudi</strong> (Hadoop Upserts Deletes and
              Incrementals) brings database like record level updates, deletes,
              and change tracking to data lakes stored in object storage like
              S3.
            </div>
          </div>
          <strong>The Core Problem:</strong> Traditional data lakes store data
          in immutable Parquet files, which is perfect for batch analytics. But
          what happens when 5 percent of your 10 TB table changes daily? You
          face a brutal choice: either rescan and rewrite nearly 100 percent of
          the data (taking over 10 hours and wasting enormous compute), or
          accept stale data that's only refreshed weekly. Neither option works
          when you need fresh analytics with minute to hour latency at
          reasonable cost.
          <strong>How Hudi Solves This:</strong> Hudi adds a table abstraction
          on top of object storage that tracks every record using primary keys.
          Instead of treating files as immutable blobs, Hudi maintains an index
          that maps record keys to file locations and a timeline of all commits.
          When new data arrives, Hudi looks up existing records using the index
          (often Bloom filters), finds which files contain them, and efficiently
          updates just those files. For that 10 TB table with 5 percent daily
          changes, you now process only the 500 GB that actually changed, not
          all 10 TB.
          <strong>The Impact:</strong> At Uber Eats, a menu table with 11
          billion records where 500 million change daily previously took over 12
          hours to process with full scans. With Hudi incremental processing,
          the same pipeline completes in under 4 hours while cutting compute
          costs by 50 percent.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> Think of Hudi as bringing database
            UPDATE and DELETE capabilities to your data lake, but keeping the
            cost and scale benefits of cheap object storage and columnar
            formats.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">CDC Stream</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  50k writes/sec
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Hudi Upsert</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Index + Timeline
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">S3 Parquet</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Only 5% rewritten
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
                Hudi enables record level upserts and deletes on data lake files
                by maintaining indexes that map primary keys to file locations
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The timeline tracks all commits as immutable instants, providing
                snapshot isolation and enabling incremental queries that return
                only changed rows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Processing only changed data reduces compute from hours to
                minutes. Uber Eats cut a 12+ hour pipeline to under 4 hours
                while halving costs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hudi works on standard object storage like S3 with columnar
                Parquet, avoiding expensive proprietary storage while gaining
                update capabilities
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Queries can read the latest snapshot, read optimized base files
                tolerating some staleness, or pull incremental changes since
                last checkpoint
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
                A 10 TB table with 5% daily changes: traditional approach
                rescans all 10 TB taking 10+ hours. Hudi processes only the 500
                GB that changed
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Uber Eats menu table: 11 billion records, 500 million change
                daily. Pipeline time dropped from 12+ hours to under 4 hours
                with 50% cost savings
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                OLTP database emits 50k to 200k write operations per second via
                CDC into Kafka. Hudi continuously upserts into S3 tables with
                minutes of latency
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonHudiTableFormatWhatIsApacheHudi;
