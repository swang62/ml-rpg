import type { Component } from "solid-js";

const LessonTimeSeriesModelingOutOfOrderAndLateArrivingDataHandlingTimeSeriesReality: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Out of Order and Late Arriving Data: Handling Time Series Reality
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Reality of Distributed Systems:
            </div>
            Time series systems often assume data arrives in time order, with
            timestamps strictly increasing per series. Reality is messier.
            Network partitions delay packets. Mobile devices go offline for
            hours. Internet of Things (IoT) sensors buffer locally and send
            batches when connectivity returns. Distributed microservices with
            clock skew or retries send metrics with timestamps in the past. When
            a data point with timestamp 10:05:00 arrives after you have already
            written and indexed data up to 10:10:00, you face an out of order
            write.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Storage Challenge:
            </div>
            Most time series storage formats optimize for appending to the end
            of a sorted sequence. Inserting a point in the middle of an already
            written and compressed partition requires rewriting or maintaining
            complex insertion structures. If you stored 5 minutes of data in a
            compressed block with delta encoding, inserting one old point can
            force decompressing, reordering, and recompressing the entire block.
            At scale, this is prohibitively expensive. Systems handle this by
            defining an out of order tolerance window, for example 10 minutes or
            1 hour. Data arriving within this window is buffered in memory or a
            mutable structure, and periodically merged and flushed to storage.
            Data older than the window is either rejected with an error or
            written to a separate late data partition that is queried less
            frequently.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Clock skew across data centers can
              introduce subtle out of order issues. If servers in two regions
              have clocks offset by 30 seconds, metrics from both regions can
              interleave out of order at the central collector. Using Network
              Time Protocol (NTP) or Precision Time Protocol (PTP) to keep
              clocks synchronized within milliseconds is essential for high
              resolution time series.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Query Implications:
            </div>
            When queries run over recent time ranges that overlap with the out
            of order window, they must merge data from both the mutable buffer
            and the immutable storage. This adds query complexity and latency. A
            query for the last 15 minutes might need to scan committed storage
            up to 15 minutes ago, then merge with in memory buffers holding the
            last 10 minutes plus any out of order points. If the buffer holds 10
            million points and is not well indexed, this merge can add tens of
            milliseconds.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Late Data and Backfilling:
            </div>
            Some use cases require accepting data hours or days late. IoT
            devices that go offline for extended periods or batch processing
            jobs that recompute historical metrics both produce late data.
            Systems like Apache Druid and InfluxDB allow backfilling, where you
            write data with old timestamps into historical partitions. This can
            trigger recompaction and invalidate cached query results, so it is
            typically reserved for infrequent corrections or reprocessing, not
            normal operation. For machine learning pipelines, late data
            introduces training versus serving skew. If you train a forecasting
            model on complete historical data but serve predictions using real
            time incomplete data, model performance can degrade. Data
            engineering best practice is to define cutoff times, for example
            training on data finalized 1 hour after the time window to allow
            late arrivals to settle, and documenting this lag for consumers.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Example:
            </div>
            A large scale IoT system collects sensor data from industrial
            equipment that can lose connectivity for hours. The system accepts
            data up to 4 hours late, writing it to a late data partition.
            Queries for real time dashboards only read the main partition,
            showing partial data until late arrivals are merged in a nightly
            batch job. This trade off prioritizes query speed for most users
            while ensuring eventual completeness for compliance and analytics
            workloads that run on the merged data.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Edge Case:
            </div>
            Time zone issues compound out of order problems. If clients send
            timestamps in local time without clear time zone information,
            daylight saving transitions can cause ambiguous or duplicate
            timestamps. For example, when clocks fall back 1 hour, the hour
            between 1:00 and 2:00 occurs twice. If two data points have the same
            local timestamp, storage systems cannot disambiguate order. The
            solution is to store all timestamps in Coordinated Universal Time
            (UTC) with epoch seconds or milliseconds, and convert to local time
            only for display.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">In Order Window</strong>
                  <br />
                  <span style="font-size: 11px">
                    10:05, 10:06, 10:07, 10:08, 10:09, 10:10
                    <br />
                    Current time: 10:10 → Write committed
                  </span>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ⚠️ Late point arrives: 10:07
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Out of Order Tolerance (10 min)
                  </strong>
                  <br />
                  <span style="font-size: 11px">
                    Point at 10:07 within window → Buffered in memory
                    <br />
                    Merged before next flush
                  </span>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ❌ Very late point: 9:50
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Beyond Tolerance</strong>
                  <br />
                  <span style="font-size: 11px">
                    Point at 9:50 is 20 min late → Rejected or Late Partition
                    <br />
                    Option: Backfill in nightly batch job
                  </span>
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
                  Out of order writes occur when network delays, mobile offline
                  periods, or clock skew cause data with old timestamps to
                  arrive after newer data is already written and compressed.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Systems define an out of order tolerance window (10 minutes to
                  1 hour), buffering recent data in memory for merging; data
                  beyond this window is rejected or written to late data
                  partitions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Queries over recent ranges must merge mutable in memory
                  buffers (holding out of order points) with immutable storage,
                  adding tens of milliseconds latency when buffers hold millions
                  of points.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clock skew across data centers (30 seconds or more without NTP
                  or PTP synchronization) causes subtle out of order
                  interleaving, requiring tight clock synchronization within
                  milliseconds for high resolution series.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late data backfilling (hours or days old) triggers
                  recompaction and invalidates cached query results, suitable
                  for infrequent corrections but not normal operation; IoT
                  systems accept up to 4 hours late data in separate partitions.
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
                  An IoT system accepts sensor data up to 4 hours late, writing
                  to a late data partition; real time dashboards query only the
                  main partition for speed, while nightly batch jobs merge late
                  arrivals for compliance analytics.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A distributed system with 30 second clock skew between regions
                  sees metrics from both interleave out of order at the central
                  collector; deploying NTP reduces skew to under 10
                  milliseconds, eliminating the issue.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A time series store defines 10 minute out of order window; a
                  point at timestamp 10:07 arriving at 10:12 is buffered and
                  merged, but a point at 9:50 arriving at 10:12 is rejected
                  because it is 22 minutes late.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeSeriesModelingOutOfOrderAndLateArrivingDataHandlingTimeSeriesReality;
