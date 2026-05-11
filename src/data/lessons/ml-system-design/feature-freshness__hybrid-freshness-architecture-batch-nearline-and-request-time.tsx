import type { Component } from "solid-js";

const LessonFeatureFreshnessHybridFreshnessArchitectureBatchNearlineAndRequestTime: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hybrid Freshness Architecture: Batch, Nearline, and Request Time
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Lane Architecture
            </p>
            <p style="margin-top: 0">
              Production ML systems at scale use a three lane architecture to
              balance freshness, latency, and cost. The batch lane computes
              features daily or hourly from data warehouses, achieving high
              throughput and low cost per feature but accepting staleness
              measured in hours. The nearline lane uses stream processing to
              update features within seconds to minutes, handling moderate
              velocity signals at 10 to 100x the cost of batch. The request time
              lane computes cheap features like current time, device type, or
              simple lookups during inference, maximizing freshness but limited
              to sub millisecond computations.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Uber Example
            </p>
            <p style="margin-top: 0">
              Low volatility features like driver lifetime rating and user home
              location are batch computed daily. High volatility features like
              nearby driver supply and surge multiplier use nearline streaming
              with seconds of staleness. Request time features include current
              GPS coordinates, request timestamp, and device properties computed
              at inference with zero staleness.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fallback Cascades
            </p>
            <p style="margin-top: 0">
              When nearline features are stale beyond SLA, the serving layer
              falls back to the most recent batch value plus a freshness penalty
              in the feature vector. This ensures predictions continue with
              graceful degradation rather than failing hard. The model is
              trained with stale features occasionally included to make it
              robust to fallback scenarios.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Allocation
            </p>
            <p style="margin-top: 0">
              A typical breakdown sees batch features at $0.01 per million
              feature reads, nearline at $0.10 to $1.00, and request time at
              negligible marginal cost but high infrastructure fixed cost for
              low latency compute. Engineering teams assign features to lanes
              based on freshness sensitivity analysis: move to nearline only if
              offline A/B tests show measurable quality gain justifying the 10
              to 100x cost increase.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 4px; font-size: 15px">
                  Hybrid Freshness Architecture
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Batch Lane</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Daily/Hourly | Data Warehouse → S3
                    <br />
                    User embeddings, lifetime value
                    <br />
                    Cost: $0.02/GB·month | Age: 24h
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Nearline Lane</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Streaming | Kafka → Redis/Cassandra
                    <br />
                    Supply counts, session activity
                    <br />
                    Cost: $2–5/GB·month | Age: 5–300s
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Request Time Lane</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Compute on demand | &lt; 1ms budget
                    <br />
                    Time of day, device type, distance
                    <br />
                    Cost: CPU only | Age: 0s
                  </div>
                </div>
                <div style="margin-top: 8px; text-align: center; font-size: 13px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <strong>Assembler merges lanes:</strong> prefer nearline →
                  fallback batch → default
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
                  Cost scales exponentially with freshness requirements. Batch
                  features cost $0.02 per GB month in object storage versus $2
                  to $5 per GB month for in memory nearline stores, a 100x to
                  250x difference.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber allocates 5 to 15ms p99 for feature retrieval out of a 20
                  to 50ms total inference budget at 100k plus QPS. This forces
                  most features to be precomputed and limits request time
                  computation to sub millisecond operations.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix proved through A/B tests that moving user embeddings
                  from weekly to daily refresh improved engagement by only 0.3%,
                  not justifying real time infrastructure. Context features
                  (device, time) computed at request time delivered 2% lift at
                  minimal cost.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Burst factors of 5x to 10x are common during peak events.
                  Planning for average load causes freshness SLA violations when
                  viral content or dinner rush hits. DoorDash provisions
                  nearline capacity for p99 load, not average.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fallback ordering prevents total failure. If nearline is
                  stale, use last known batch value. If batch is unavailable,
                  use static defaults. LinkedIn's Feathr explicitly encodes this
                  cascade in feature definitions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hot key mitigation through sharding is essential. Instead of
                  one counter per entity that gets thousands of updates per
                  second, maintain 10 sharded counters and sum them on read,
                  spreading write load.
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
                  Uber marketplace predictions merge 70% batch features (driver
                  stats, user history), 25% nearline features (supply density,
                  surge signals with 60s TTL), and 5% request time features
                  (current distance, time of day).
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  DoorDash stream processes store busy state as a 30 minute
                  sliding window with 5 minute watermark. During dinner peak,
                  one popular store can generate 3000 orders per hour. They
                  shard the counter 10 ways to avoid overwhelming a single
                  partition.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn Venice serves features with p99 read latency under
                  10ms by keeping hot working sets in memory. A feature for
                  "profile views in last 7 days" lives in nearline storage,
                  while "total career history" is batch loaded daily.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureFreshnessHybridFreshnessArchitectureBatchNearlineAndRequestTime;
