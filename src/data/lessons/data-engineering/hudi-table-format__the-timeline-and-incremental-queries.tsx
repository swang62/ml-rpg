import type { Component } from "solid-js";

const LessonHudiTableFormatTheTimelineAndIncrementalQueries: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          The Timeline and Incremental Queries
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>Understanding the Timeline:</strong> Every operation in Hudi
          (insert, upsert, delete, compaction) gets assigned an instant time
          that acts like a commit identifier. These instants form an immutable
          timeline stored as metadata in the table directory. The timeline
          provides two critical capabilities: snapshot isolation for readers and
          the foundation for incremental processing.
          <strong>Snapshot Isolation:</strong> Writers follow a two phase
          protocol. First, they write data files and create a pending instant on
          the timeline. Then they atomically mark that instant as committed.
          Readers only see completed commits, so they always get a consistent
          snapshot even while concurrent writes are happening. This is similar
          to Multi Version Concurrency Control (MVCC) in databases, but
          implemented on top of object storage using instant markers in the
          timeline.
          <strong>Incremental Queries Explained:</strong> This is where Hudi
          becomes transformative for downstream processing. Instead of reading
          the entire table, you query only the changes between two commit
          instants. A downstream consumer stores its last processed commit
          instant (for example, timestamp 20240115100000). On the next run, it
          issues an incremental query: "Give me all rows that changed between
          20240115100000 and now." Hudi scans the timeline, identifies which
          files were modified in commits after that instant, and returns only
          those changed rows.
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Consumer reads checkpoint:</strong> Last processed
                instant is 20240115100000
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Query timeline:</strong> Fetch changes from
                20240115100000 to latest commit 20240115103000
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Process deltas:</strong> Read only modified files, about
                2 GB instead of 500 GB full table
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                4
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Update checkpoint:</strong> Atomically save
                20240115103000 as new last processed instant
              </div>
            </div>
          </div>
          <strong>Production Impact:</strong> For the Uber Eats example, weekly
          aggregation jobs that previously scanned 100 percent of the multi
          terabyte menu table now use incremental queries to process only the 5
          percent that changed. Job time dropped from 4 to 5 hours down to 45
          minutes. This pattern cascades through data pipelines. If Table A
          feeds Table B feeds Table C, each stage can use incremental
          processing. A change to 1000 rows in Table A propagates through the
          entire pipeline touching only those 1000 rows plus derived results,
          not billions of unchanged rows.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Incremental queries depend on
            checkpoint management. If a consumer loses its checkpoint or rewinds
            incorrectly, it can miss commits (data loss) or reprocess
            duplicates. Store checkpoints in durable storage like a metadata
            database and make downstream processing idempotent.
          </div>
          <strong>Query Modes Summary:</strong> Hudi exposes three ways to read
          data. Snapshot queries give the latest complete view, perfect for
          dashboards. Read optimized queries read only compacted base files,
          tolerating slight staleness for maximum speed. Incremental queries
          return only changes, the key to efficient pipelines.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="font-weight: 700; text-align: center; margin-bottom: 12px; font-size: 14px">
              Hudi Timeline with Incremental Processing
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="display: flex; align-items: center; gap: 8px">
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 11px; font-weight: 600">
                  Commit 10:00
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 11px; font-weight: 600">
                  Commit 10:30
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 11px; font-weight: 600">
                  Commit 11:00
                </div>
              </div>
              <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px">
                <strong>Incremental Query:</strong> FROM 10:00 TO 11:00
                <br />
                <span style="font-size: 11px">
                  Returns only rows changed in 10:30 and 11:00 commits
                </span>
              </div>
              <div style="margin-top: 4px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px">
                <strong>Result:</strong> 2 GB delta instead of 500 GB full scan
                <br />
                <span style="font-size: 11px">250x less data processed</span>
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
                The timeline tracks all commits as immutable instants, providing
                snapshot isolation where readers only see completed commits
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Incremental queries return only rows changed between two commit
                instants, dramatically reducing data scanned by downstream
                pipelines
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Uber Eats reduced weekly aggregation from 4 to 5 hours to 45
                minutes by processing only the 5 percent of rows that changed,
                not rescanning 100 percent
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Checkpoint management is critical. Consumers store last
                processed instant and must handle checkpoint loss to avoid
                missing data or duplicate processing
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Three query modes serve different needs: snapshot for latest
                complete view, read optimized for fast scans tolerating
                staleness, incremental for efficient delta processing
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
                A 500 GB table with 2 GB of daily changes: incremental query
                reads 2 GB vs 500 GB full scan, reducing processing from 30
                minutes to under 1 minute
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Consumer stores checkpoint 20240115100000, queries changes to
                20240115103000, processes deltas, atomically updates checkpoint
                to 20240115103000
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                If consumer loses checkpoint and rewinds to old instant, it
                might reprocess 1 week of commits (7 GB) instead of 1 day (2
                GB), causing duplicate downstream results
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonHudiTableFormatTheTimelineAndIncrementalQueries;
