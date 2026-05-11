import type { Component } from "solid-js";

const LessonIcebergTableFormatFailureModesAndOperationalPitfallsAtPetabyteScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Operational Pitfalls at Petabyte Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Catalog Availability Crisis:</strong>
            The catalog is the single point of coordination for Iceberg commits.
            If Hive Metastore or your cloud catalog service goes down, all
            writes block. Reads continue working on the last known snapshot, but
            no new data arrives. This is a stale data scenario, not data
            corruption, but it breaks real time pipelines. The edge case that
            bites teams: catalog slowness, not just downtime. If catalog latency
            spikes from 50 milliseconds to 5 seconds due to load or network
            issues, every commit now takes 5+ seconds. High frequency writers (1
            commit per second per table) start piling up, retry storms begin,
            and eventually writers timeout and fail. Jobs lose data if they do
            not buffer and retry correctly.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Design your catalog for high
              availability with at least 3 nodes, replication, and p99 latency
              below 200 milliseconds even under load. Monitor catalog health as
              closely as your database, because it IS your database's
              coordinator.
            </div>
            <strong>Metadata Bloat at Extreme Scale:</strong>
            Each data file requires one manifest entry, typically 100 to 200
            bytes. With 10 million small files (common with aggressive
            streaming), manifests total 1 to 2 GB. Query planning must read
            these manifests, which pushes planning time from 100 milliseconds to
            10 to 30 seconds. Interactive queries become impossible. The failure
            happens gradually. At 100,000 files, planning takes 200 milliseconds
            and nobody notices. At 1 million files, planning takes 2 seconds and
            analysts complain about slowness. At 10 million files, planning
            takes 30 seconds and Trino queries timeout. By then, fixing it
            requires days of compaction jobs to merge small files into properly
            sized ones. Real world trigger: a streaming job configured to flush
            every 1 minute writes 5 MB files because event rate is low. Over 6
            months, it creates 260,000 files per table. Across 50 tables, that
            is 13 million files. Manifest size explodes, queries grind to a
            halt, and the team spends a week running emergency compaction.
            <strong>Snapshot Expiration Gotchas:</strong>
            Snapshots accumulate over time. Best practice is expiring old
            snapshots after retention period (7 to 30 days typical). But here is
            the trap: long running queries hold references to old snapshots. If
            you expire a snapshot while a query is still reading it, that query
            fails with missing file errors. The correct sequence is expire
            snapshots older than your maximum query duration plus buffer. If
            queries can run up to 6 hours, expire snapshots older than 12 hours
            or 1 day to be safe. But teams often set aggressive expiration (1
            hour) to save storage costs, then discover nightly batch jobs that
            run for 4 hours start failing randomly. Worse edge case: partially
            failed cleanup. The expiration job marks snapshots expired and
            starts deleting data files. If the job crashes halfway, some files
            are deleted but metadata still references them. Future time travel
            queries to that snapshot fail. Recovery requires either restoring
            files from backup or manually repairing metadata, both painful.
            <strong>Concurrency Retry Storms:</strong>
            Optimistic concurrency requires losers to retry. In theory,
            conflicts are rare. In practice, if you have 20 writers all
            committing to the same table every minute, conflicts spike. Each
            conflict causes a retry, which might conflict again, causing
            exponential backoff. Writers fall behind, queues fill, and
            eventually you have 100 concurrent writers all retrying, hammering
            the catalog. This happened at a company running 50 streaming jobs
            per Kafka topic, all writing to one Iceberg table. At low volume,
            conflicts were under 1%. During a traffic spike to 10x normal,
            conflict rate hit 30%, retry amplification pushed catalog load to
            50x normal, and the catalog became unresponsive. The fix was
            batching writes more aggressively (buffer 5 minutes instead of 1
            minute) to reduce commit frequency from 50 per minute to 10 per
            minute.
            <strong>Eventual Consistency on Object Storage:</strong>
            Object stores like S3 are eventually consistent for listings, though
            consistency has improved over time. The risk: a writer commits
            snapshot N, updating the catalog pointer. A reader immediately
            queries and gets snapshot N from the catalog, but the manifest or
            data files are not yet visible through S3 list operations. The query
            fails with file not found. Iceberg mitigates this by design: readers
            do not rely on directory listings. They read explicit file paths
            from manifests. But during metadata file writes, there is a brief
            window where the catalog points to a metadata file that is not yet
            readable. Most implementations retry transparently, but in rare
            cases, you see transient errors. The workaround is retry logic in
            readers and ensuring catalog updates happen after object storage
            writes are confirmed, with small delays if needed.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Failure Progression
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">
                    100ms commits
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    CATALOG SLOW
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    5s commits
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    RETRY STORM
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    Writes fail
                  </div>
                </div>
              </div>
            </div>
            <strong>Prevention Strategy:</strong>
            Monitor four key metrics. First, catalog p99 latency (target under
            200 milliseconds). Second, manifest file count and total size per
            table (target under 1000 manifests, under 100 MB total per table).
            Third, commit conflict rate (target under 5%). Fourth, snapshot
            count (target expiring regularly, keeping 7 to 30 days). Set alerts
            before these degrade to failure thresholds, not after.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Catalog failures block all writes but not reads. Slow catalog
                  performance (p99 over 500 milliseconds) is more dangerous than
                  downtime because it causes cascading retry storms across
                  hundreds of writers.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata bloat from millions of small files is the most common
                  operational problem. Query planning degrades from 100
                  milliseconds to 30+ seconds, breaking interactive workloads.
                  Compaction to 512 MB to 1 GB file sizes is essential.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snapshot expiration must account for maximum query duration
                  plus buffer. Expiring snapshots too aggressively causes long
                  running queries to fail with missing file errors partway
                  through execution.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimistic concurrency works well at low conflict rates (under
                  5%) but breaks down at high concurrency. Conflict rates above
                  20% trigger retry storms that can crash the catalog. Batch
                  writes more aggressively to reduce commit frequency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Eventually consistent object stores can cause transient file
                  not found errors if readers query immediately after a commit.
                  Implement retry logic in readers to handle brief inconsistency
                  windows (typically under 1 second).
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
                  A streaming platform runs 100 jobs writing to shared Iceberg
                  tables. During a Black Friday traffic spike, commit rate jumps
                  from 10 per second to 50 per second. Conflict rate spikes to
                  40%, retry amplification hits 10x, catalog collapses under 500
                  requests per second. Solution: increase write batching from 1
                  minute to 5 minutes, reducing commit frequency.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An analytics team sets snapshot expiration to 6 hours to save
                  storage costs. A nightly ETL job runs for 8 hours processing a
                  full table scan. Halfway through, snapshots it depends on get
                  expired, causing file not found errors. Job fails after 4
                  hours of wasted compute. Solution: change expiration to 24
                  hours or run shorter incremental jobs.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIcebergTableFormatFailureModesAndOperationalPitfallsAtPetabyteScale;
