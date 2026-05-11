import type { Component } from "solid-js";

const LessonMultiModelServingColdStartStormsAndModelThrashingDetectionAndMitigation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Cold Start Storms and Model Thrashing: Detection and Mitigation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Cold Start Storms Look Like
            </p>
            <p style="margin-top: 0">
              Cold start storms occur when bursty traffic simultaneously hits
              many cold models in an on demand system, triggering a cascade of
              load/evict cycles that saturates IO, spikes CPU for
              deserialization, and inflates p95/p99 latency by seconds. The
              symptom is bimodal latency distribution: hot model requests remain
              fast (p50 of 50ms), but cold requests spike to multi second p95 (2
              to 10 seconds) during the storm. Model thrashing is the steady
              state version: continuous eviction and reloading of the same
              models because cache capacity is too small relative to the working
              set.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Root Cause
            </p>
            <p style="margin-top: 0">
              Cache capacity versus working set mismatch combined with traffic
              patterns. If you have 500 models but cache capacity for only 50,
              and traffic is evenly distributed, every request has a 90% chance
              of being cold. Worse, if traffic arrives in bursts (batch jobs
              hitting 100 different models simultaneously), the system tries to
              load many models in parallel, overwhelming object storage
              bandwidth (S3 throttling at 3500 requests per second per prefix)
              and local disk IO. Logs show high concurrent load counts, artifact
              fetch timeouts, and LRU eviction rates spiking to hundreds per
              minute.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pre-warming and Pinning
            </p>
            <p style="margin-top: 0">
              Pre-warm the top N models (by traffic volume) on startup, keeping
              them resident and marking them as non evictable. If the top 50
              models account for 80% of traffic, pinning them eliminates cold
              starts for most requests. For the remaining long tail, set
              admission control limiting parallel loads to 1 to 2 per host:
              queue cold load requests and serialize them, preventing IO
              saturation at the cost of longer waits for tail models. Reserve 20
              to 30% of RAM/VRAM as headroom for thrash absorption.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Size-Aware Eviction
            </p>
            <p style="margin-top: 0">
              Standard LRU evicts by recency alone, but large models (1GB) evict
              10 small models (100MB each), worsening thrash. Size aware LRU
              evicts based on cost per byte (access frequency divided by size),
              keeping frequently accessed small models resident longer. Cohort
              sharding is the ultimate fix: partition the model fleet into size
              or traffic cohorts (hot tier, warm tier, cold tier) and deploy
              separate serving pools with tailored cache sizes and autoscaling
              policies.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="text-align: center; margin-bottom: 6px">
                    <strong style="font-size: 13px">
                      Cold Start Storm Detected
                    </strong>
                  </div>
                  <div style="font-size: 10px; margin-bottom: 3px">
                    Burst: 80 models requested in 10 seconds
                  </div>
                  <div style="font-size: 10px; margin-bottom: 3px">
                    Cache capacity: 20 models
                  </div>
                  <div style="font-size: 10px">
                    Result: 60 cold loads + thrashing
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Symptoms
                </div>
                <div style="display: flex; gap: 8px">
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px">
                    <div style="font-size: 10px; font-weight: bold; margin-bottom: 4px">
                      Latency
                    </div>
                    <div style="font-size: 9px">p50: 50ms → 50ms</div>
                    <div style="font-size: 9px">p95: 120ms → 8s</div>
                    <div style="font-size: 9px">p99: 200ms → 15s</div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 8px; border-radius: 6px">
                    <div style="font-size: 10px; font-weight: bold; margin-bottom: 4px">
                      System
                    </div>
                    <div style="font-size: 9px">Disk IO: 90% util</div>
                    <div style="font-size: 9px">S3 requests: 400/s</div>
                    <div style="font-size: 9px">Evictions: 150/min</div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Mitigations
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-size: 10px; margin-bottom: 3px">
                    <strong>1.</strong> Pin top 50 models (80% traffic)
                  </div>
                  <div style="font-size: 10px; margin-bottom: 3px">
                    <strong>2.</strong> Admission control: max 2 parallel loads
                  </div>
                  <div style="font-size: 10px; margin-bottom: 3px">
                    <strong>3.</strong> Pre-warm on deploy from forecast
                  </div>
                  <div style="font-size: 10px">
                    <strong>4.</strong> Shard by cohort: hot/warm/cold tiers
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
                  Cold start storms inflate p95/p99 by seconds (2 to 10s) when
                  bursty traffic hits many cold models simultaneously,
                  saturating IO and causing load/evict thrashing with eviction
                  rates spiking to 150+ per minute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Root cause is cache capacity versus working set mismatch: 500
                  models with cache for 50 means 90% cold hit rate; even
                  distribution makes every request likely cold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre-warming and pinning top N models (for example, top 50
                  accounting for 80% traffic) eliminates most cold starts; mark
                  them non evictable to prevent thrashing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Admission control limits parallel loads to 1 to 2 per host,
                  serializing cold loads to prevent IO saturation at cost of
                  longer tail latency for rare models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Size aware LRU evicts by cost per byte (access frequency
                  divided by size) instead of recency alone, preventing large
                  1GB models from evicting 10 small 100MB models
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
                  Amazon SageMaker MME customer serving 1200 product category
                  models: pre-warmed top 100 models (covering 75% traffic) on
                  deploy, reduced p99 from 12 seconds to 800ms, cut eviction
                  rate from 200/min to 15/min
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation system during prime time surge: 300
                  user segment models requested simultaneously, triggered cold
                  start storm with p95 spiking to 6 seconds; added admission
                  control limiting 2 parallel loads per host, p95 dropped to 1.2
                  seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stripe fraud detection with cohort sharding: 20 high volume
                  merchant models in hot tier (pinned), 200 medium volume in
                  warm tier (aggressive caching), 500 low volume in cold tier
                  (accept 5s p99); reduced infrastructure cost 40% versus
                  uniform deployment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiModelServingColdStartStormsAndModelThrashingDetectionAndMitigation;
