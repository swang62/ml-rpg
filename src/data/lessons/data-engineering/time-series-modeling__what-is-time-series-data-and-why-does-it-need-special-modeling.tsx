import type { Component } from "solid-js";

const LessonTimeSeriesModelingWhatIsTimeSeriesDataAndWhyDoesItNeedSpecialModeling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Time Series Data and Why Does It Need Special Modeling?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Problem:
            </div>
            Time series data is fundamentally different from typical
            transactional or relational data. Every measurement has a timestamp,
            and the order in time matters deeply. Think about CPU utilization
            recorded every 10 seconds, stock prices ticked every millisecond, or
            ride counts per city per minute. The critical property is that
            queries almost always constrain by time ranges, and most operations
            scan contiguous windows rather than jumping around randomly.
            Traditional relational modeling falls short here. You could store
            metrics in a generic table with columns for timestamp, metric name,
            and value, but scanning a billion rows to fetch one week of data for
            a single metric becomes painfully slow. You end up with either
            massive indices that bloat memory or sequential scans that kill
            latency.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Structure:
            </div>
            A time series record typically has four components: a measurement
            name (such as http_requests), a timestamp at second or millisecond
            precision, a set of tag dimensions (like service, region,
            status_code), and one or more numeric fields (count, latency at 95th
            percentile). This pattern appears across systems from InfluxDB to
            Prometheus to internal stores at Netflix and Uber.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Treating time series like
              events with arbitrary fields. Time series stores optimize for
              fixed metric schemas with low cardinality dimensions. High
              cardinality tags like user identifiers or request identifiers can
              explode your index from 100 thousand series to 100 million,
              causing memory thrashing and ingestion failures.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Decomposing Patterns:
            </div>
            Time series analysis often breaks data into trend, seasonality,
            cyclical variations, and noise. Trend is the long term direction,
            like 2 percent monthly traffic growth. Seasonality has fixed
            periods, such as daily peaks at 9:00 and 20:00 or weekend drops.
            Cyclical behavior has variable length economic or product cycles.
            Noise is everything else, like a one time spike from an outage. Many
            machine learning models assume stationarity, meaning stable mean and
            variance over time, so data engineers apply transformations like
            differencing or moving averages before feeding data to forecasting
            pipelines.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Why Special Modeling Matters:
            </div>
            Production systems at scale handle millions of writes per second.
            Uber M3 ingests around 20 million metrics per second with 99th
            percentile latency under 5 seconds. Datadog processes trillions of
            points daily. These systems achieve this by partitioning data by
            time, storing values in append only fashion, and compressing numeric
            columns. Hot data for the last 1 to 3 days lives on Solid State
            Drives (SSDs) with query latencies between 10 and 200 milliseconds.
            Colder data for 30 to 400 days sits in compressed form on cheaper
            storage with acceptable latencies of 1 to 5 seconds. Traditional
            databases cannot deliver this combination of write throughput and
            read performance for time ordered access patterns.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time series data is ordered measurements where queries
                  constrain by time ranges, requiring sequential access patterns
                  rather than random lookups.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A typical record has measurement name, timestamp, tag
                  dimensions (low cardinality like region or service), and
                  numeric fields (count, latency percentiles).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decomposition into trend, seasonality, cycles, and noise helps
                  machine learning models that assume stationarity, often
                  requiring transformations before analysis.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems like Uber M3 handle 20 million metrics per
                  second with sub 5 second latency by partitioning by time and
                  using append only writes.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot recent data (1 to 3 days) on SSDs delivers 10 to 200
                  millisecond queries, while compressed cold data (30 to 400
                  days) accepts 1 to 5 second latencies.
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
                  Uber M3 ingests 20 million metrics per second, with
                  measurement like http_requests, tags &#123;service:
                  ride_matching, region: us_west, status: 200&#125;, fields
                  &#123;count: 4520, p95_latency_ms: 45&#125;.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix tracks CPU utilization per instance every 10 seconds,
                  decomposing into hourly seasonality (peak at streaming prime
                  time) and monthly trend (fleet growth).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Datadog processes trillions of points daily, keeping 1 day of
                  raw second resolution data on SSD and 90 days of 1 minute
                  aggregates in compressed object storage.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeSeriesModelingWhatIsTimeSeriesDataAndWhyDoesItNeedSpecialModeling;
