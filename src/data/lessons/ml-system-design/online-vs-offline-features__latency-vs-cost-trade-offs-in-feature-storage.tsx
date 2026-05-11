import type { Component } from "solid-js";

const LessonOnlineVsOfflineFeaturesLatencyVsCostTradeOffsInFeatureStorage: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Latency vs Cost Trade-offs in Feature Storage
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Differential
            </p>
            <p style="margin-top: 0">
              Online feature stores deliver millisecond latency through high
              availability in memory or SSD optimized databases like Redis,
              DynamoDB, or Cassandra, but this performance comes at 10 to 50x
              higher cost per gigabyte month compared to offline object storage
              like S3 or data lakes. A production recommendation system might
              pay $50 per gigabyte month for Redis versus $1 per gigabyte month
              for S3, making the choice of which features live online a critical
              cost optimization decision.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Operational Complexity
            </p>
            <p style="margin-top: 0">
              Scales with online requirements. Multi region replication for
              99.99% availability, automated failover, consistent hashing for
              sharding, and aggressive TTL policies to prevent unbounded growth
              all add engineering overhead. DoorDash reported managing 10,000+
              QPS per service with burst handling and sub 10ms p99 latency
              requires sophisticated autoscaling, partition aware back pressure
              handling, and circuit breakers to fallback to default values
              during incidents.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework
            </p>
            <p style="margin-top: 0">
              Centers on latency sensitivity versus feature cardinality. User
              facing ranking, fraud detection, and dynamic pricing need 5 to
              50ms incremental latency budgets where online features materially
              affect CTR or conversion rates. In contrast, churn prediction, LTV
              modeling, and nightly batch recommendations can use offline only
              features since decisions occur outside request paths. Most
              production systems adopt a hybrid: 10 to 100 latency critical
              features online plus 100 to 1000 rich features precomputed offline
              and cached.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Aware Design
            </p>
            <p style="margin-top: 0">
              Constrains online footprint through aggressive strategies. Netflix
              quantizes feature vectors to reduce memory, downsamples long tail
              entities with low request rates, and evicts stale entries via TTLs
              measured in hours to days. For features accessed less than once
              per hour per entity, the cache miss penalty of fetching from
              offline storage often beats the cost of maintaining online
              replicas across all regions.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online in memory storage costs 10 to 50 times more per
                  gigabyte month than offline object storage, making feature
                  selection a critical cost optimization ($50/GB/month Redis vs
                  $1/GB/month S3)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi region replication and high availability infrastructure
                  adds significant operational complexity: consistent hashing,
                  automated failover, partition management, and back pressure
                  handling
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid architectures balance cost and latency by keeping 10 to
                  100 critical features online (real time counters, embeddings)
                  and 100 to 1000 features offline (historical aggregates,
                  segments)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Aggressive TTL policies are essential: evict entities not
                  accessed in hours to days to prevent unbounded growth, with
                  Netflix targeting cache hit ratios above 95% on hot entities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quantization and downsampling reduce online footprint with
                  acceptable accuracy loss: compress float32 embeddings to int8
                  (4x memory reduction) with less than 1% model quality
                  degradation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Request budgets force prioritization: if total feature fetch
                  must stay under 15ms p99, bundle essential features first and
                  drop or approximate non critical features under load
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
                  Meta Ads ranking: Keeps sub second freshness counters online
                  for high impact features (click rate last hour) costing
                  millions monthly, while batch derived audience segments stay
                  offline and sync daily
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber: Maintains streaming aggregates like "trips in last 5
                  minutes" online with minutes of freshness, but computes
                  complex driver behavior features offline in Spark jobs running
                  on cheaper batch compute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  DoorDash: Serves 10,000+ QPS with p99 under 10ms by bundling
                  top 50 features per entity into single key value lookup,
                  falling back to cached defaults during regional outages to
                  maintain availability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonOnlineVsOfflineFeaturesLatencyVsCostTradeOffsInFeatureStorage;
