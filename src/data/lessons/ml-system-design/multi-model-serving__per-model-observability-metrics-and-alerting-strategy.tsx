import type { Component } from "solid-js";

const LessonMultiModelServingPerModelObservabilityMetricsAndAlertingStrategy: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Per-Model Observability: Metrics and Alerting Strategy
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Per-Model Metrics Matter
            </p>
            <p style="margin-top: 0">
              In multi-model serving, aggregate metrics hide per model problems:
              one hot or misbehaving model can skew fleet wide averages while
              other models suffer silently. Effective observability requires per
              model metric collection tracking latency, throughput, cache hit
              rate, error rate, and resource consumption separately for each
              model identifier. This enables precise diagnosis (which model is
              slow?) and fair capacity allocation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Critical Metrics per Model
            </p>
            <p style="margin-top: 0">
              P50/p95/p99 latency split by hot versus cold path, distinguishing
              normal inference time from cold load overhead. A model showing p50
              of 40ms but p95 of 3 seconds indicates 5% cold hit rate. Cache hit
              rate (requests served from memory divided by total requests)
              quantifies cache effectiveness; under 80% suggests the model is
              thrashing. Request rate (QPS) and error rate (failures divided by
              requests) identify traffic hotspots and failing models. Memory
              footprint and GPU utilization per model reveal resource hogs that
              may need dedicated capacity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Storage and Querying at Scale
            </p>
            <p style="margin-top: 0">
              Production systems use dimensioned metrics with model ID as a tag,
              stored in time series databases like Prometheus or CloudWatch. For
              a fleet of 500 models, this generates 500 times N metric streams
              (where N is metrics per model), requiring efficient storage and
              query patterns. Common practice is to pre-aggregate the top K
              models (top 50 by traffic) into high resolution dashboards and use
              lower resolution or sampled metrics for the long tail.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Alerting Strategy
            </p>
            <p style="margin-top: 0">
              Alert on per model SLO violations: if any single model exceeds p95
              latency target (200ms) for 5 minutes, trigger an alert. Monitor
              cold start counts and eviction rates: sustained cold load rate
              over 10% suggests cache undersizing. The key insight is that
              multi-model systems are not one black box but N independent
              services sharing infrastructure, and you must observe them as such
              to maintain per model SLOs and debug hotspots or failures isolated
              to specific models.
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
                  Per model metrics are essential because aggregate metrics hide
                  individual model problems; one hot model can skew fleet wide
                  p95 while other models suffer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Critical metrics per model: p50/p95/p99 split by hot versus
                  cold path, cache hit rate (target over 80%), request rate
                  (QPS), error rate, and memory footprint
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bimodal latency (for example, p50 of 40ms but p95 of 3
                  seconds) indicates 5% cold hit rate; cache hit rate under 80%
                  suggests model is thrashing and needs pinning or larger cache
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use dimensioned metrics with model ID tag in Prometheus or
                  CloudWatch; pre-aggregate top 50 models into high resolution
                  dashboards, sample long tail to control storage cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alert on per model SLO violations (for example, p95 over 200ms
                  for 5 minutes) and cold load rate over 10%, which signals
                  cache undersizing or traffic surge
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
                  Amazon SageMaker MME emits per model CloudWatch metrics:
                  ModelInvocationLatency, ModelLoadingTime, ModelCacheHit;
                  customer sets alarm when any model p95 exceeds 500ms for 10
                  minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta TorchServe deployment tracking 80 models: Grafana
                  dashboard showing per model QPS and p95 latency heatmap,
                  alerts fire when any model error rate exceeds 1% or cache hit
                  drops below 75%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation system: per model metrics include
                  prediction_staleness (hours since last retrain),
                  feature_extraction_ms, and inference_ms; alerts trigger if
                  staleness exceeds 48 hours for core ranking models
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiModelServingPerModelObservabilityMetricsAndAlertingStrategy;
