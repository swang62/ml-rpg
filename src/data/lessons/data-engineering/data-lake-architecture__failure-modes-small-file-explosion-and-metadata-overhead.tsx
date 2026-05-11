import type { Component } from "solid-js";

const LessonDataLakeArchitectureFailureModesSmallFileExplosionAndMetadataOverhead: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Small File Explosion and Metadata Overhead
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Problem No One Warns You About:</strong>
            Data lake architectures have a dirty secret. They work great in
            demos with well behaved batch data, but at production scale, two
            failure modes dominate: small file explosion and metadata management
            breakdown. These issues can take a smoothly running system and drive
            query latencies from seconds to minutes, or cause total system
            unavailability.
            <strong>Small File Explosion:</strong>
            Streaming pipelines are the usual culprit. Imagine ingesting
            clickstream events at 100,000 events per second. A naive
            implementation writes every micro batch (say every 10 seconds) as a
            separate file. That's 8,640 files per day per partition. With 50
            partitions (maybe by region and hour), you generate 432,000 files
            daily. After a month, that's 13 million files. The problem hits when
            you query. Query engines like Presto or Spark need to open each
            file, read its footer to get schema and statistics, then decide what
            to scan. Opening 13 million files means 13 million object store list
            and metadata operations. Even at 5 milliseconds per operation
            (optimistic), that's 18 hours just for query planning before reading
            any data.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Query Planning Overhead
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">HEALTHY</div>
                  <div style="font-size: 16px; font-weight: 800">100 files</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">EXPLOSION</div>
                  <div style="font-size: 16px; font-weight: 800">
                    100K files
                  </div>
                </div>
              </div>
            </div>
            Object stores also have rate limits. Amazon S3 allows 5,500 GET
            requests per second per prefix. If your query needs to list 100,000
            files under one prefix, you hit throttling, causing retries and
            cascading delays.
            <strong>The Fix (Compaction Jobs):</strong>
            You must run periodic compaction. A background job reads small
            files, merges them into larger files (target 128 MB to 1 GB), and
            replaces the originals. For a high volume stream, you might compact
            every hour, reading the previous hour's micro batches and
            consolidating them. But compaction is not free. Reading 1 TB of
            small files, merging, and writing back as larger files takes 10 to
            15 minutes on a modest cluster. During compaction, queries might see
            inconsistent results if reads happen mid process. You need
            coordination: either making compaction atomic (using table formats
            like Delta Lake with transaction logs) or accepting eventual
            consistency. At scale, compaction becomes a major operational
            concern. One company reported running continuous compaction jobs
            consuming 20 percent of total cluster capacity just to keep file
            counts manageable.
            <strong>Metadata Management Breakdown:</strong>
            Data catalogs seem simple in demos. Register a table, it tracks
            schema and location, done. But at 10,000 plus tables with evolving
            schemas and millions of partitions, the catalog becomes a single
            point of failure. Catalog queries to discover partition metadata can
            timeout. Services like AWS Glue impose API rate limits: 100 requests
            per second for metadata operations. If you have 50 concurrent users
            each running queries that need partition discovery, you quickly hit
            limits, causing query failures. Schema evolution causes silent bugs.
            A producer adds a new field to event payloads, but the catalog is
            not updated. Queries continue using the old schema, silently
            dropping the new field. Metrics built on that field are wrong, and
            no one notices for days until someone investigates an anomaly.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> At one company, a mobile app team
              deployed a change that added a new enum value. Downstream jobs had
              not updated their schema, so they filtered out events with the
              unknown enum. This silently dropped 15 percent of mobile events
              for 3 days before anyone noticed the user count anomaly.
            </div>
            <strong>Mitigation Strategies:</strong>
            For small files, enforce minimum batch sizes or use buffering. Write
            events to a queue or buffer service (like Kafka or Kinesis), then
            flush to the lake only when you accumulate enough data for
            reasonably sized files. Some teams target 10 to 20 thousand events
            per file, achieving 50 to 100 MB compressed Parquet files. For
            metadata, implement automatic schema discovery and validation. Run
            daily jobs that scan raw data, extract schemas, and compare against
            the catalog. Alert on drift. Use versioned schemas with
            compatibility checks, so breaking changes require explicit
            approvals. Additionally, design partitioning carefully. Avoid high
            cardinality partition keys (like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            ) that create millions of directories. Stick to lower cardinality
            dimensions like date and region, keeping partition count under
            10,000 per table when possible. These are not academic concerns.
            Every large scale data lake hits these failure modes. Planning for
            them upfront saves months of painful debugging later.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Streaming Writes</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Every 10 sec → 1 file
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold">
                  ↓ 8,640 files/day
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Small File Problem</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Query plans take minutes
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold">
                  ↓ Compaction
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 100%; text-align: center">
                  <strong style="font-size: 13px">Merged Files</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    100 MB each, fast queries
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
                  Small file explosion occurs when streaming writes create
                  thousands of tiny files, causing query planning to dominate
                  execution time: opening 100,000 files at 5 ms each adds 8
                  minutes of overhead before scanning any data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compaction jobs are mandatory at scale, typically consuming 10
                  to 20 percent of total compute capacity to continuously merge
                  small files into 128 MB to 1 GB targets, preventing query
                  degradation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata catalogs become bottlenecks when table counts exceed
                  10,000 or partition counts reach millions, with API rate
                  limits (like AWS Glue's 100 requests per second) causing query
                  failures during high concurrency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution without validation causes silent data loss:
                  producers add fields that old consumers ignore, or enum values
                  that filters reject, leading to metrics that quietly drift
                  from reality
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
                  A real time analytics pipeline writing 1 million events per
                  minute to S3 in 10 second micro batches generated 6 million
                  files per day, increasing query planning time from 2 seconds
                  to 12 minutes, solved by hourly compaction reducing file count
                  by 95 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A company hit AWS Glue API throttling when 80 concurrent
                  analysts ran morning reports, each querying tables with 50,000
                  partitions, causing 30 percent of queries to fail with
                  metadata fetch timeouts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A schema drift incident occurred when a mobile app added a new
                  event type without updating the lake catalog, downstream
                  aggregation jobs silently skipped 2 million events over a
                  weekend, causing Monday morning dashboards to show a false 40
                  percent drop in mobile engagement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataLakeArchitectureFailureModesSmallFileExplosionAndMetadataOverhead;
