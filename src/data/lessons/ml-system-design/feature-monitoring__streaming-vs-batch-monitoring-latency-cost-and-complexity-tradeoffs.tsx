import type { Component } from "solid-js";

const LessonFeatureMonitoringStreamingVsBatchMonitoringLatencyCostAndComplexityTradeoffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Streaming vs Batch Monitoring: Latency, Cost, and Complexity
            Tradeoffs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Architecture Spectrum
            </p>
            <p style="margin-top: 0">
              Monitoring architecture sits on a spectrum between streaming (real
              time aggregation) and batch (periodic computation). The choice
              affects detection latency, infrastructure cost, and operational
              complexity. Most production systems use a combination tuned to
              feature criticality and freshness requirements.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Streaming Monitoring
            </p>
            <p style="margin-top: 0">
              Emits a lightweight event for every inference, maintaining rolling
              window aggregates in memory with 1 to 5 minute detection latency.
              Requires always on infrastructure (Flink, Kafka Streams, or custom
              services) that processes every request. Cost scales with request
              volume: at 10,000 QPS, processing 864 million events per day
              demands significant compute and storage. Best suited for high
              value, latency sensitive features where catching drift within
              minutes justifies the cost.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Monitoring
            </p>
            <p style="margin-top: 0">
              Periodically processes logs (hourly or daily), computing feature
              statistics from cold storage with detection latency ranging from 1
              to 24 hours. Dramatically cheaper since compute runs only during
              batch windows and storage uses commodity object stores. For
              features where hourly detection suffices, batch monitoring costs
              10 to 50x less than streaming equivalents. Most features at most
              companies can tolerate batch monitoring.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tiered Strategy
            </p>
            <p style="margin-top: 0">
              Implement tiered monitoring where critical features (top 10 by
              importance, fraud signals, safety features) use streaming with 5
              minute detection. Important features (top 50) use hourly batch.
              Remaining features use daily batch. This stratification optimizes
              cost while maintaining rapid detection for high impact signals.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Log Sampling Trade-offs
            </p>
            <p style="margin-top: 0">
              For extremely high volume systems, sample logs for batch
              monitoring (1 to 10 percent sample rates). Statistical
              significance degrades: detecting 5 percent drift requires larger
              samples than detecting 20 percent drift. Adaptive sampling over
              samples rare events (errors, outliers) while under sampling common
              patterns.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                    Streaming
                  </strong>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    Latency: 1–5 min
                  </div>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    CPU: +1–2% serving
                  </div>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    Infra: 2×8vCPU agg
                  </div>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    Example: 5k TPS
                  </div>
                  <div style="font-size: 11px">Exposure: 300k txn</div>
                  <div style="font-size: 10px; margin-top: 6px">
                    High risk, real-time systems
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                    Batch
                  </strong>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    Latency: 1–24 hours
                  </div>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    CPU: 0% serving
                  </div>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    Infra: scheduled job
                  </div>
                  <div style="font-size: 11px; margin-bottom: 3px">
                    Example: daily
                  </div>
                  <div style="font-size: 11px">Exposure: 18M txn</div>
                  <div style="font-size: 10px; margin-top: 6px">
                    Low risk, cost-sensitive systems
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
                  Streaming monitoring achieves 1 to 5 minute detection latency
                  by maintaining in memory rolling aggregates; fraud system at
                  5k TPS detects issues within 60 to 180 seconds, limiting
                  exposure to 300k to 900k transactions versus 18M with hourly
                  batch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CPU overhead for streaming: 1 to 2% of serving resources at
                  1:10 sampling; 5k TPS with 150 features requires two 8 vCPU
                  aggregator instances to handle 75k updates per second with
                  headroom for approximate algorithms (t-digest, HyperLogLog)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch monitoring processes logs periodically (hourly to
                  daily), zero marginal serving cost, suitable for low risk
                  workloads where 12 to 24 hour detection latency is acceptable
                  (weekly retrained models, low volume services)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sampling strategies: start with 1:10 for high QPS (reduces CPU
                  by 90%), validate drift metric stability versus full stream;
                  low traffic segments may need 1:1 sampling or extended windows
                  to reach minimum 5k events per window
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid pattern: stream critical path features (identity,
                  location, price) with 5 minute windows and SPC alerts, batch
                  monitor secondary features with daily windows for trend
                  analysis and correlation studies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Storage tradeoff: streaming retains only rolling state
                  (roughly 30 MB per model), batch requires sampled logs (0.1 to
                  1% of traffic) with 30 to 90 day retention for forensics,
                  adding terabytes for high throughput systems
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
                  Uber Michelangelo: streaming for critical path features (user
                  location, request time) with 5 min windows, batch for
                  secondary features and daily trend dashboards; segmented by
                  city to localize drift before global rollout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix ranking: streaming monitors prediction distribution
                  and acceptance rate (feedback loop risk, needs fast
                  detection), batch monitoring for detailed per feature drift
                  analysis across thousands of features, informing weekly
                  retrain decisions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb pricing model: batch daily monitoring sufficient for 24
                  to 72 hour label delays; streaming overlay for prediction
                  drift and approval rate as early warning, triggering
                  investigation before labels arrive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureMonitoringStreamingVsBatchMonitoringLatencyCostAndComplexityTradeoffs;
