import type { Component } from "solid-js";

const LessonMultiModelServingOnDemandLoadingVsMultiDeployedLatencyAndCostTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            On-Demand Loading vs Multi-Deployed: Latency and Cost Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Trade-off
            </p>
            <p style="margin-top: 0">
              The choice between on demand loading and multi-deployed patterns
              is a trade off between cost efficiency and latency predictability.
              On demand loading fetches models lazily from object storage on
              first request and caches them with LRU eviction when capacity is
              reached. Multi-deployed keeps all model versions permanently
              resident in memory with fixed traffic splits, never triggering
              cold loads.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When On-Demand Excels
            </p>
            <p style="margin-top: 0">
              On demand loading excels for long tail workloads where most models
              receive sparse traffic. Consider a fleet of 1000 models where 900
              receive under 0.1 QPS: dedicating one instance per model wastes
              idle capacity. By sharing a 20 node fleet with on demand loading,
              you achieve 50x better utilization. The cost is bimodal latency.
              Hot models serve at normal speed (p50 of 45ms for small CPU
              models). Cold loads add model fetch and deserialization time: 100
              to 800ms for models under 100MB on SSD cache, or 2 to 20 seconds
              for gigabyte scale NLP models pulled from S3.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Multi-Deployed Wins
            </p>
            <p style="margin-top: 0">
              Multi-deployed patterns are used when p95 latency SLOs are strict
              and traffic is concentrated. Running A/B tests with 95/5 canary
              splits keeps both model versions hot, trading roughly 2x memory
              cost for stable p95 with negligible routing overhead (under 1ms).
              This works when model count is low (typically 2 to 5 versions per
              endpoint) and each model fits comfortably in device memory. For
              LLMs requiring 6 to 8GB of VRAM per 7B model, multi-deployed on a
              single 40GB GPU is limited to 4 to 5 models maximum.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Cold Start Storm Failure
            </p>
            <p style="margin-top: 0">
              If on demand loading faces bursty traffic hitting many cold models
              simultaneously, you get a cold start storm where load/evict cycles
              thrash, IO saturates pulling artifacts, and p95 spikes by seconds.
              Mitigation requires pre-warming the top N models, pinning critical
              models in cache to prevent eviction, and admission control
              limiting parallel loads to 1 to 2 per host.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="text-align: center; margin-bottom: 8px">
                    <strong style="font-size: 14px">On-Demand Loading</strong>
                  </div>
                  <div style="font-size: 11px; margin-bottom: 6px">
                    <strong>Hot path:</strong> 45ms p50
                  </div>
                  <div style="font-size: 11px; margin-bottom: 6px">
                    <strong>Cold path:</strong> +800ms to +5s
                  </div>
                  <div style="font-size: 11px; margin-bottom: 6px">
                    <strong>Memory:</strong> 8GB / 40GB used
                  </div>
                  <div style="font-size: 11px; margin-bottom: 6px">
                    <strong>Cost:</strong> $500/month
                  </div>
                  <div style="font-size: 11px">
                    <strong>Models:</strong> 200 (10 hot)
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="text-align: center; margin-bottom: 8px">
                    <strong style="font-size: 14px">Multi-Deployed</strong>
                  </div>
                  <div style="font-size: 11px; margin-bottom: 6px">
                    <strong>Hot path:</strong> 45ms p50
                  </div>
                  <div style="font-size: 11px; margin-bottom: 6px">
                    <strong>Cold path:</strong> Never
                  </div>
                  <div style="font-size: 11px; margin-bottom: 6px">
                    <strong>Memory:</strong> 32GB / 40GB used
                  </div>
                  <div style="font-size: 11px; margin-bottom: 6px">
                    <strong>Cost:</strong> $2000/month
                  </div>
                  <div style="font-size: 11px">
                    <strong>Models:</strong> 4 (all hot)
                  </div>
                </div>
              </div>
              <div style="margin-top: 10px; padding: 8px; border: 2px solid; border-radius: 6px; font-size: 11px; text-align: center">
                <strong>Trade-off:</strong> On-demand gives 4x lower cost but
                p95 can spike to 5s during cold loads
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
                  On demand loading achieves 3 to 10x cost reduction for long
                  tail workloads (most models under 0.1 QPS) by sharing
                  infrastructure, but cold loads add 100ms to 20 seconds latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-deployed keeps all models resident in memory for stable
                  p95, used for A/B testing where both model versions must have
                  predictable latency, trading roughly 2x higher memory cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start time correlates with artifact size: models under
                  100 megabytes load in 100 to 800ms from SSD, gigabyte scale
                  models take 2 to 20 seconds from S3
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For 7 billion parameter large language models requiring 6 to 8
                  gigabytes VRAM each, a 40 gigabyte GPU supports at most 4 to 5
                  resident models before memory pressure causes failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start storms occur when bursty traffic hits many cold
                  models, causing load/evict thrashing and p95 spikes; mitigate
                  by pinning top N models and limiting parallel loads to 1 to 2
                  per host
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
                  Amazon SageMaker MME customer hosting 800 fraud detection
                  models on 15 instances with on demand loading: p50 of 40ms
                  hot, p95 of 1.2 seconds including occasional cold loads,
                  versus $25K/month for dedicated endpoints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Vertex AI A/B test with two ranking models (200MB each)
                  kept resident on 16GB GPU: both serve at p95 of 65ms, traffic
                  split 95/5, zero cold starts over 2 week experiment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber trip pricing serving 50 city specific models on shared
                  fleet: top 10 cities pinned in cache (70% of traffic),
                  remaining 40 cities served on demand with p99 of 2 seconds
                  during cold loads
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiModelServingOnDemandLoadingVsMultiDeployedLatencyAndCostTradeOffs;
