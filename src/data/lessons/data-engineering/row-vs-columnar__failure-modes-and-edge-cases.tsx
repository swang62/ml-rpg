import type { Component } from "solid-js";

const LessonRowVsColumnarFailureModesAndEdgeCases: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Failure Modes and Edge Cases
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>Mismatched Format and Workload:</strong>
          The most common failure is using the wrong format for your access
          pattern. Running heavy analytics directly on a row based OLTP database
          causes catastrophic problems at scale. Consider a 5 TB transactional
          database with hot user facing traffic. A data analyst runs a daily
          aggregation scanning entire tables. This causes lock contention on hot
          rows, page cache eviction for frequently accessed data, and large
          replication lag. Your p99 latencies for user facing traffic jump from
          20 milliseconds to 500 milliseconds, even though the analytical query
          technically "works." Production incidents at companies often trace
          back to this exact scenario: an expensive analytical query bringing
          down the operational database.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              OLTP Database Under Analytics Load
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                <div style="font-size: 16px; font-weight: 800">p99: 20ms</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  ANALYTICS QUERY
                </div>
                <div style="font-size: 16px; font-weight: 800">p99: 500ms</div>
              </div>
            </div>
          </div>
          <strong>Columnar for Point Lookups:</strong>
          The symmetric failure happens when teams try to use a pure columnar
          warehouse as the backing store for an API serving per user dashboards.
          Point lookups touching 200 columns for a single user require reading
          from many column segments, sometimes across multiple files and nodes.
          Latency jumps from tens of milliseconds in a row store to hundreds of
          milliseconds or even seconds, especially under concurrency. Columnar
          systems are tuned for throughput, not tail latency. A production
          example: a team built a customer dashboard querying Redshift directly.
          Under 1,000 concurrent users, p99 latency hit 8 seconds, causing
          timeout errors and poor user experience. Moving to a row based cache
          fixed this.
          <strong>Update and Delete Problems:</strong>
          Columnar formats usually treat data as append only and implement
          updates as delete plus reinsert in a new batch. At high update rates,
          for example millions of updates per hour on a 10 TB table, this leads
          to many small fragments and frequent compaction jobs. If compaction
          falls behind, queries slow down because they need to read more files
          and reconcile versions. This is a common failure mode in large data
          lakes. One company saw query times grow from 30 seconds to 10 minutes
          over a week as fragments accumulated, until an emergency compaction
          window brought performance back.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> Columnar write amplification means a
            single row update might trigger rewriting an entire 100 MB column
            chunk, multiplied by number of updated columns.
          </div>
          <strong>Sparse Wide Tables:</strong>
          If most columns are null for most rows, row stores waste space on
          those nulls or per row metadata. Columnar storage can skip entire null
          segments efficiently, which is a win. However, if access patterns
          frequently need "all non null attributes for an entity,"
          reconstructing wide rows from many sparse columns hurts performance. A
          concrete case: a user attributes table with 500 optional fields where
          average user has 20 populated. Columnar storage compresses well, but
          queries fetching "all attributes for user X" must check 500 column
          chunks, even though 480 are null. Adding a row oriented cache for this
          access pattern solved the issue.
          <strong>Consistency Between Stores:</strong>
          Operationally, consistency between the OLTP row store and the OLAP
          columnar store is a failure area. If CDC pipelines lag by tens of
          minutes during peak traffic, dashboards built on columnar data become
          stale. For some businesses, this is acceptable. For others, like real
          time fraud detection, it is a critical correctness issue. One
          financial services company had a 15 minute CDC lag that allowed
          fraudulent transactions to complete before appearing in their
          monitoring dashboard.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="margin-bottom: 12px; text-align: center; font-weight: 700; font-size: 13px">
              Write Amplification in Columnar Updates
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 90%; text-align: center; font-size: 12px">
                <strong>Update 1 row</strong> (5 columns changed)
              </div>
              <div style="font-size: 20px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 90%; text-align: center; font-size: 11px">
                Read 5 column chunks (100 MB each)
              </div>
              <div style="font-size: 20px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 90%; text-align: center; font-size: 11px">
                Modify values, rewrite 5 chunks (500 MB total)
              </div>
              <div style="font-size: 20px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 90%; text-align: center; font-size: 11px">
                <strong>Write Amplification:</strong> 500 MB written for 1 row
                update
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
                Running analytical scans on row based OLTP databases causes p99
                latency to spike from 20 milliseconds to 500 milliseconds due to
                lock contention and cache eviction
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Using columnar stores for point lookups increases latency from
                tens of milliseconds to seconds because reconstructing one row
                requires reading many column segments
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                High update rates (millions per hour) on columnar tables create
                fragment accumulation, degrading query performance from 30
                seconds to 10 minutes without compaction
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                CDC pipeline lag between row OLTP and columnar OLAP stores
                creates consistency issues, with 15 minute delays enabling fraud
                in real time detection scenarios
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Columnar write amplification means updating one row in 5 columns
                requires rewriting 500 MB of column chunks even though logical
                change is tiny
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
                Production incident: data analyst query scanning 5 TB user table
                on MySQL OLTP cluster caused 30 minute outage as replication lag
                hit 2 hours
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Customer dashboard backed by Redshift columnar store: p99
                latency reached 8 seconds under 1,000 concurrent users doing
                single user lookups
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Data lake with 10 TB table receiving 2 million updates per hour:
                query times grew 20x over one week as compaction fell behind
                fragment creation rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonRowVsColumnarFailureModesAndEdgeCases;
