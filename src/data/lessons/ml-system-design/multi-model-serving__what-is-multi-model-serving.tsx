import type { Component } from "solid-js";

const LessonMultiModelServingWhatIsMultiModelServing: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Multi-Model Serving?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>Multi-model serving</strong> puts multiple machine
              learning models behind a single logical endpoint, where each
              request carries a model identifier that tells the system which
              model to invoke. Instead of deploying one endpoint per model, you
              share infrastructure across tens to thousands of models.
            </div>
          </div>
          <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Request Flow
          </p>
          <p style="margin-top: 0">
            The system routes each request based on model identity (passed
            explicitly in metadata or implicitly via routing rules), loads the
            target model if needed, and executes inference. This is
            fundamentally different from single model endpoints where one URL
            maps to one model. For example, SageMaker Multi-Model Endpoints
            customers commonly host 100 to 1000+ models on just 10 to 20
            instances instead of dedicating one instance per model, achieving 3
            to 10x cost reduction.
          </p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Three Core Patterns
          </p>
          <p style="margin-top: 0">
            On demand multi-model uses lazy loading where models are fetched
            from object storage on first request and cached in memory with LRU
            eviction, maximizing hardware utilization for long tail traffic.
            Multi-deployed endpoints keep multiple model versions loaded
            concurrently with fixed traffic splits for A/B testing, trading
            higher memory cost for stable latency. Gateway level aggregation
            routes through a reverse proxy to per model backend pools,
            maintaining isolation while offering centralized policy control.
          </p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Key Architectural Components
          </p>
          <p style="margin-top: 0">
            A request router extracts model identity from the request. A model
            registry tracks metadata like size and version. A model store
            (typically object storage like S3) holds the artifacts. A cache
            layer (in-memory or GPU) holds loaded models. Per model
            observability tracks metrics like p50/p95/p99 latency, cache hit
            rate, and cold start frequency for each model independently.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">
                  Request: &#123;model_id: "fraud_v2"&#125;
                </strong>
              </div>
              <div style="font-size: 22px; font-weight: bold; text-align: center">
                ↓
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                <strong style="font-size: 13px">Router + Model Cache</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Check if fraud_v2 is hot
                </div>
              </div>
              <div style="display: flex; gap: 20px; justify-content: center; align-items: center">
                <div style="flex: 1; text-align: right; font-size: 11px; font-weight: bold">
                  Cache Hit
                </div>
                <div style="flex: 1; text-align: left; font-size: 11px; font-weight: bold">
                  Cache Miss
                </div>
              </div>
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Inference</strong>
                  <div style="font-size: 10px; margin-top: 3px">p50: 45ms</div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Load from S3</strong>
                  <div style="font-size: 10px; margin-top: 3px">
                    +800ms cold start
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Single endpoint serves multiple models by routing requests based
                on model identifier in metadata or URL path
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Amazon SageMaker MME users achieve 3 to 10x cost reduction by
                consolidating hundreds to thousands of models on tens of
                instances instead of one per model
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                On demand loading maximizes utilization for long tail models
                with sparse traffic (under 0.1 QPS) but adds cold start latency
                of 100ms to 20 seconds depending on model size
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Multi-deployed pattern keeps all models hot in memory for stable
                p95 latency, used by Google Vertex AI for A/B testing with 95/5
                traffic splits
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Gateway aggregation provides strong isolation by routing to
                dedicated per model backend pools while exposing a unified
                external API
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
                Stripe fraud detection serving 200+ merchant specific models
                behind one endpoint, each model under 1 QPS, shared fleet of 15
                GPU instances with on demand loading
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix recommendation system using multi-deployed endpoints to
                canary new ranking models with 90/10 traffic split, both
                versions kept resident in memory
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Meta TorchServe hosting 50 to 100 computer vision models per GPU
                instance with dynamic batching, routing by model name in request
                header
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonMultiModelServingWhatIsMultiModelServing;
