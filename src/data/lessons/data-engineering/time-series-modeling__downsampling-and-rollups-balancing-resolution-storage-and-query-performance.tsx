import type { Component } from "solid-js";

const LessonTimeSeriesModelingDownsamplingAndRollupsBalancingResolutionStorageAndQueryPerformance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Downsampling and Rollups: Balancing Resolution, Storage, and Query
            Performance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Problem:
            </div>
            Raw high resolution time series data grows explosively. Consider a
            fleet of 10,000 servers, each emitting 1,000 metrics every 10
            seconds. That is 1 million data points every 10 seconds, or 6
            million per minute, 8.64 billion per day. At 16 bytes per raw point,
            you accumulate 138 gigabytes per day, over 50 terabytes per year.
            Even with 10 times compression, you face 5 terabytes annually.
            Querying a 6 month dashboard over this volume is impractical.
            Downsampling and rollups solve this by precomputing aggregates at
            coarser granularities.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              How Downsampling Works:
            </div>
            A background process or streaming job reads raw high resolution
            partitions and writes downsampled series. For example, converting 1
            second data to 1 minute aggregates involves reading 60 points,
            computing aggregates like sum, count, min, max, and percentiles,
            then writing one output point per minute. You might keep 10 second
            resolution for 7 days, 1 minute resolution for 90 days, 1 hour
            resolution for 1 year, and daily resolution indefinitely. Careful
            choice of aggregation functions is critical. For counters like
            request counts, you need both rate (requests per second) and
            cumulative sum. For latency, you need quantiles or histograms, not
            just averages, because averages hide tail behavior. A service with
            average latency of 50 milliseconds but 99th percentile at 2 seconds
            has a serious problem that averages mask. Systems like Datadog
            precompute multiple quantiles (50th, 75th, 95th, 99th) at each
            rollup level.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Naively downsampling by
              averaging loses critical information. A CPU metric oscillating
              between 10 percent and 90 percent every second averages to 50
              percent over 1 minute, hiding the spikes that cause user facing
              latency. Preserving min, max, and percentiles alongside mean is
              essential.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Storage and Query Trade Offs:
            </div>
            Downsampling reduces data volume by the downsampling ratio.
            Converting 1 second data to 1 minute reduces volume by 60 times.
            Going from 1 minute to 1 hour reduces by another 60 times. This
            compounds: 1 second to 1 hour is 3600 times reduction. Combined with
            compression, you can store years of data at manageable cost.
            However, downsampling is lossy. Once you aggregate 60 seconds into
            one point, you cannot recover the sub minute patterns. If a spike
            lasted 5 seconds within a 1 minute window, it may be invisible in
            the rolled up data unless you preserved max or percentiles. For
            machine learning models that rely on detecting anomalies at fine
            timescales, this loss matters. Forecasting models trained on daily
            data cannot predict intraday seasonality.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Implementation Patterns:
            </div>
            Streaming rollups compute aggregates in real time as data arrives,
            using tumbling or sliding windows. This minimizes latency between
            raw data and rollups, enabling dashboards to query 1 minute
            aggregates within seconds of the minute boundary. Batch rollups
            process completed partitions, offering simpler logic but higher
            latency. Netflix and Uber both use multi stage rollup pipelines. Raw
            data flows into the first stage, which computes 1 minute rollups. A
            second stage reads 1 minute data and produces hourly rollups. A
            third stage creates daily aggregates. Each stage can run
            independently and be replayed if bugs are found in aggregation
            logic.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Scale:
            </div>
            At Netflix, capacity planning relies on months of historical data
            aggregated daily. These pipelines read terabytes of raw metrics,
            apply rollups with correct aggregation (sum for counters,
            percentiles for latency), and output gigabytes of daily series. This
            informs decisions to add or remove thousands of instances, directly
            impacting millions of dollars in infrastructure cost annually.
            Without downsampling, querying 6 months of raw second resolution
            data would take minutes or fail entirely, making this analysis
            impractical.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Edge Cases:
            </div>
            Missing data and gaps complicate rollups. If some raw points are
            missing due to network issues or host downtime, do you output a
            partial aggregate, interpolate, or skip the window? Different
            choices suit different use cases. Alerting systems often prefer
            partial aggregates to detect issues quickly. Forecasting pipelines
            prefer complete data and may interpolate or discard incomplete
            windows. Data modeling must specify these policies explicitly, or
            downstream consumers will implement inconsistent logic.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Raw: 10s resolution (7 days)
                  </strong>
                  <br />
                  <span style="font-size: 11px">
                    8.64B points/day → 138GB/day raw
                  </span>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ 6x reduction
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Rollup: 1min resolution (90 days)
                  </strong>
                  <br />
                  <span style="font-size: 11px">
                    Aggregate: sum, count, min, max, p95, p99
                  </span>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ 60x reduction
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Rollup: 1hr resolution (1 year)
                  </strong>
                  <br />
                  <span style="font-size: 11px">
                    3600x total reduction from raw
                  </span>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ 24x reduction
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Rollup: Daily resolution (indefinite)
                  </strong>
                  <br />
                  <span style="font-size: 11px">
                    Capacity planning, trend analysis
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
                  Raw 10 second data from 10,000 servers with 1,000 metrics
                  generates 8.64 billion points per day (138 gigabytes raw, 13.8
                  gigabytes with 10x compression), making long term storage and
                  queries impractical without downsampling.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Downsampling to 1 minute reduces volume by 6 times, to 1 hour
                  by 360 times, to daily by 8640 times, compounding to enable
                  years of retention at manageable cost.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Aggregation functions must preserve critical information: for
                  counters compute rate and sum, for latency compute percentiles
                  (50th, 95th, 99th) not just averages, because averages hide
                  tail behavior.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Downsampling is lossy; a 5 second spike within a 1 minute
                  window disappears unless you preserve min, max, or
                  percentiles, breaking anomaly detection and intraday
                  seasonality forecasting.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi stage pipelines (raw to 1 minute to 1 hour to daily)
                  enable independent stages that can be replayed if aggregation
                  bugs are found, and support different retention policies per
                  resolution.
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
                  Netflix capacity planning reads months of daily rollups
                  (gigabytes) instead of raw second data (terabytes), enabling
                  queries that inform decisions to add or remove thousands of
                  instances, impacting millions in infrastructure cost.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A CPU metric oscillating between 10 percent and 90 percent
                  every second averages to 50 percent over 1 minute, hiding
                  spikes; preserving max (90 percent) and p95 (85 percent)
                  reveals the true behavior.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber M3 runs streaming rollups computing 1 minute aggregates
                  within 10 seconds of the minute boundary, feeding dashboards
                  and alerting with minimal latency compared to batch rollups
                  that process completed partitions.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeSeriesModelingDownsamplingAndRollupsBalancingResolutionStorageAndQueryPerformance;
