import type { Component } from "solid-js";

const LessonTimeSeriesModelingTimePartitioningAndStorageTiersHowSystemsScaleBillionsOfPoints: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Time Partitioning and Storage Tiers: How Systems Scale Billions of
            Points
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Partitioning Strategy:
            </div>
            Time series systems partition data into contiguous time chunks,
            typically 1 hour, 6 hours, or 1 day windows. Each partition becomes
            a natural unit for storage, compaction, and lifecycle management.
            New writes go to the current hot partition residing on fast storage
            with in memory indices. Once a partition's time window closes and
            most writes finish, it gets compacted and moved to cheaper storage.
            This pattern minimizes random writes and exploits sequential disk
            access, which is 50 to 100 times faster than random access on
            spinning disks and still 10 times faster on SSDs. Within each
            partition, data is sorted first by metric identity (a hash of
            measurement name plus sorted tags), then by timestamp. This allows
            efficient scans of a single time series or a group of series sharing
            a metric and tag subset. You can read an entire day for one metric
            with a single sequential scan, rather than hopping around an index.
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Hot Tier (1-3 days)</strong>
                  <br />
                  <span style="font-size: 12px">
                    SSD, In-Memory Index
                    <br />
                    10-200ms queries
                  </span>
                </div>
                <div style="font-size: 24px; font-weight: bold">
                  ↓ Compaction
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">
                    Warm Tier (30-90 days)
                  </strong>
                  <br />
                  <span style="font-size: 12px">
                    Compressed, 1min rollups
                    <br />
                    200ms-2s queries
                  </span>
                </div>
                <div style="font-size: 24px; font-weight: bold">
                  ↓ Downsampling
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Cold Tier (1-3 years)</strong>
                  <br />
                  <span style="font-size: 12px">
                    Object Storage, Daily aggs
                    <br />
                    1-5s queries
                  </span>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Multi Tier Architecture:
            </div>
            Uber M3 exemplifies this approach with a coordinator layer accepting
            writes and queries, a short term store keeping hours to days of high
            resolution data, and a long term store backed by distributed object
            storage for compressed downsampled data. Requests hit the short term
            tier first for speed, falling back to long term storage for older
            ranges. This architecture allows dashboard queries over the last
            hour to complete in 50 to 100 milliseconds, while a capacity
            planning query over 6 months of daily data takes 2 to 4 seconds,
            which is acceptable for that use case.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Netflix keeps 1 second resolution
              metrics for 7 days, 1 minute rollups for 90 days, and daily
              aggregates for multiple years. This tiering reduces storage from
              approximately 600 terabytes of raw data to under 50 terabytes
              across all tiers for their fleet metrics.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Compression and Encoding:
            </div>
            Numeric values benefit enormously from delta encoding, run length
            encoding, or Gorilla style compression, exploiting small differences
            between consecutive values and timestamps. A raw point might be 16
            bytes (8 bytes timestamp, 8 bytes double precision value), but
            smooth series compress to 1 to 3 bytes per point on average. This
            yields 5 to 20 times size reduction. Keeping more data in memory
            directly impacts how wide a time window you can scan with low
            latency. If you have 64 gigabytes of memory and 10 times
            compression, you can hold roughly 200 billion raw equivalent points
            in memory for instant access.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Trade Off:
            </div>
            Time partitioning and tiering optimize for recent data queries and
            write throughput but sacrifice flexibility for arbitrary time range
            joins. You cannot efficiently join a metric from 1 month ago with
            live data from today if they live in different storage systems.
            Cross partition queries require scatter gather patterns that add
            latency. The design assumes most valuable queries focus on recent
            contiguous windows, which holds true for observability dashboards
            and alerting but less so for some analytical workloads that need
            random access across long spans.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partitioning by time windows (1 hour to 1 day) enables append
                  only writes and sequential scans, which are 10 to 100 times
                  faster than random access depending on storage medium.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot tier on SSD with in memory indices serves recent 1 to 3
                  days at 10 to 200 millisecond query latencies, handling
                  dashboard and alerting use cases.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warm and cold tiers use compression and downsampling (1 minute
                  to daily rollups), trading query speed for storage efficiency,
                  reducing 600 terabytes to under 50 terabytes at Netflix scale.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gorilla style compression achieves 5 to 20 times size
                  reduction by delta encoding timestamps and values, fitting 200
                  billion raw equivalent points in 64 gigabytes of memory.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi tier design assumes most queries target recent
                  contiguous windows; cross partition joins or arbitrary time
                  range queries incur scatter gather latency penalties.
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
                  Uber M3 stores last 48 hours on SSD with in memory index, 30
                  days in compressed warm tier on local disks, and years of
                  daily aggregates in Amazon S3.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A dashboard query for last 1 hour CPU by service scans 3600
                  seconds of data from hot tier in 80 milliseconds; a 6 month
                  capacity trend query reads daily aggregates from cold tier in
                  3 seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  With Gorilla compression, a series with values oscillating
                  between 50.0 and 51.0 every second compresses from 16 bytes
                  per point to under 2 bytes per point.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeSeriesModelingTimePartitioningAndStorageTiersHowSystemsScaleBillionsOfPoints;
