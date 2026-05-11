import type { Component } from "solid-js";

const LessonTimeSeriesModelingCardinalityExplosionTheSilentKillerOfTimeSeriesSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cardinality Explosion: The Silent Killer of Time Series Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              What is Cardinality:
            </div>
            Cardinality in time series systems refers to the number of unique
            combinations of measurement name and tag values, which equals the
            number of distinct time series you track. A metric like
            http_requests with tags for service (10 values), region (5 values),
            and status_code (10 values) yields 10 times 5 times 10 equals 500
            unique series. Each series needs its own index entry, metadata, and
            storage structures. When cardinality explodes from thousands to
            millions, memory usage spikes, ingestion slows, and queries fail.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Explosion Scenario:
            </div>
            Consider a team that instruments a high volume API with a metric
            tagged by endpoint, method, region, and decides to add user_id as a
            tag to debug a specific customer issue. If you have 1 million active
            users hitting 100 endpoints across 5 regions, you suddenly have
            1,000,000 times 100 times 5 equals 500 million unique series. If
            each series consumes 1 kilobyte of index memory, you need 500
            gigabytes just for the index. Systems designed for 100 thousand to 1
            million series now face 500 million. Datadog and InfluxData both
            emphasize cardinality controls because this failure mode is common
            and catastrophic. At Datadog scale, unbounded cardinality can cause
            ingestion queues to back up, coordinator nodes to run out of memory,
            and query performance to degrade from milliseconds to timeouts. In
            severe cases, the system rejects new series or drops data to avoid
            total failure.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> High cardinality tags like user
              identifiers, request identifiers, or session tokens should live in
              logs or traces, not metric tags. Metrics aggregate across many
              events; logs capture individual events with arbitrary detail.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Strategies to Control Cardinality:
            </div>
            First, choose tag dimensions carefully. Good tags are low
            cardinality and stable over time: environment (production, staging),
            region (us_west, eu_central), service name, host or pod identifier
            if bounded by fleet size. Bad tags are unbounded: user_id, trace_id,
            timestamp strings, dynamically generated identifiers. Second,
            enforce limits at ingestion time. Many systems set a maximum like 1
            million active series per metric per tenant. When a new series
            arrives that would exceed the limit, the system either rejects it
            with a clear error or applies sampling. This prevents runaway
            cardinality from one misconfigured service. Third, monitor
            cardinality actively. Track the number of unique series per metric
            and alert when growth rate exceeds expected patterns. A sudden 10
            times jump in cardinality often indicates a bug in instrumentation,
            such as accidentally including a unique identifier in a tag.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Trade Off:
            </div>
            Limiting cardinality means losing granularity. If you cannot tag by
            user_id, you cannot directly query metrics for a single user without
            correlating with logs or traces. The design assumes you aggregate
            across many users or requests, using metrics for trends and alerts,
            while drilling into individual cases with logs. This separation of
            concerns is central to observability architecture but requires
            discipline.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Real World Impact:
            </div>
            At a company running a large scale time series system, a single
            misconfigured microservice introduced a tag with request_id,
            generating 50 million new series in 10 minutes. The ingestion
            cluster memory utilization spiked from 60 percent to 95 percent,
            causing garbage collection pauses and write timeouts. Dashboards
            querying unrelated metrics slowed to 10 to 20 second load times due
            to index contention. The incident was resolved by blocking the
            offending metric at the ingestion layer and educating the team on
            cardinality best practices.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Low Cardinality (Safe)
                  </strong>
                  <br />
                  <span style="font-size: 12px">
                    service (10) × region (5) × status (10)
                    <br />= <strong>500 series</strong>
                  </span>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ⚠️ Adding user_id tag
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    High Cardinality (Explosion)
                  </strong>
                  <br />
                  <span style="font-size: 12px">
                    service (10) × region (5) × status (10) × user_id (1M)
                    <br />= <strong>500 million series</strong>
                    <br />
                    Index memory: 500GB @ 1KB per series
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
                  Cardinality equals unique combinations of metric name and tag
                  values; adding a tag with 1 million values to a metric with
                  500 series explodes it to 500 million series.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each series consumes index memory (typically 1 kilobyte or
                  more), so 500 million series requires 500 gigabytes of memory,
                  causing out of memory errors and ingestion failures.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Good tags are low cardinality and stable (service, region,
                  environment); bad tags are unbounded (user_id, request_id,
                  trace_id, dynamically generated strings).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Systems enforce limits like 1 million active series per metric
                  per tenant, rejecting or sampling new series beyond the limit
                  to prevent runaway cardinality.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cardinality explosion incidents at scale cause memory spikes
                  from 60 percent to 95 percent utilization, garbage collection
                  pauses, write timeouts, and dashboard queries degrading from
                  milliseconds to 10+ seconds.
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
                  A microservice adds request_id tag to http_requests metric,
                  generating 50 million new series in 10 minutes, spiking memory
                  from 60 percent to 95 percent and causing write timeouts.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Datadog limits customers to around 1 million custom metrics
                  per account by default, enforcing this at ingestion to avoid
                  cardinality explosions that could destabilize the platform.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A safe metric design: http_requests with tags &#123;service:
                  checkout, region: us_east, status: 200, method: POST&#125;
                  yields 10 services times 5 regions times 10 statuses times 5
                  methods equals 2500 series, well within limits.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeSeriesModelingCardinalityExplosionTheSilentKillerOfTimeSeriesSystems;
