import type { Component } from "solid-js";

const LessonBatchVsRealtimeInferenceBatchInferenceThroughputOverLatency: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Batch Inference: Throughput Over Latency
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Batch Philosophy
            </p>
            <p style="margin-top: 0">
              Batch inference says "I will wait to accumulate work, then blast
              through it all at once using massive parallelism." You are not
              optimizing for how fast one prediction completes. You are
              optimizing for how many predictions per dollar and how efficiently
              you use compute.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Execution Model
            </p>
            <p style="margin-top: 0">
              Batch jobs are embarrassingly parallel and bursty. You spin up
              thousands of Central Processing Unit (CPU) cores or Graphics
              Processing Unit (GPU) instances, partition your dataset across
              them, process everything in a coordinated window, write results,
              then shut down to zero. Consider a recommendation system
              generating candidates for 500 million users. You partition users
              into 10,000 chunks of 50,000 each. Each worker loads the model
              once, streams through its chunk, and writes predictions to
              storage. The entire job runs for 90 minutes using 10,000 cores,
              then terminates. Total cost: compute time only, no idle capacity.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Large Language Model Batch Efficiency
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">3x to 10x</div>
                  <div style="font-size: 10px; font-weight: 600">
                    GPU UTILIZATION
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">24 hours</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COMPLETION SLA
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Batch Wins
            </p>
            <p style="margin-top: 0">
              Batch is ideal when utility decays slowly. Churn prediction for
              next month does not need to update every second. Weekly email
              campaign targeting can use predictions computed overnight. Content
              moderation backfills can run on 24 hour windows. The key question:
              does freshness matter enough to justify 5x to 20x higher cost?
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Pattern: Prediction Store
            </p>
            <p style="margin-top: 0">
              The standard architecture writes predictions to a key value store
              indexed by entity. Schema: <code>user_id</code> → &#123;
              <code>prediction_scores</code>, <code>model_version</code>,{" "}
              <code>timestamp</code>, <code>ttl</code>&#125;. Applications read
              predictions by key lookup, never recomputing. This decouples
              inference cost from serving queries per second (QPS). For example,
              YouTube might materialize top 1000 candidate video IDs per user
              daily. When you open the app, the service reads your precomputed
              list (1 Redis lookup, under 5ms), applies online filters, and
              returns results. Zero inference compute on the hot path.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Straggler Problem
            </p>
            <p style="margin-top: 0">
              A few partitions often dominate compute time due to data skew.
              Maybe 95% of users finish in 60 minutes, but 5% with massive
              histories take 3 hours. Your job completion time is the slowest
              partition. Mitigation: dynamic repartitioning, speculative
              execution for slow tasks, or capping per entity work.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Partial materialization
              failures leave a mix of old and new predictions in storage.
              Consumers see inconsistent results. Use versioned snapshots: write
              to <code>predictions_v123</code>, validate, then atomically flip
              consumers to the new version.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Raw Data</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    500M users, 1TB
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Batch Processing</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    10K workers, 90 min
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Prediction Store</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Key: user_id, TTL: 24h
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Application Lookup</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5ms read, no compute
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
                  Batch maximizes throughput per dollar by using massive
                  parallelism in short bursts, then shutting down to zero idle
                  cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Predictions are materialized in a prediction store keyed by
                  entity, decoupling inference cost from serving QPS
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch is ideal when freshness requirements are relaxed (hours
                  to days) and utility decays slowly, like churn prediction or
                  weekly targeting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large Language Model batch workloads achieve 3x to 10x better
                  GPU utilization compared to real-time serving, with completion
                  SLAs up to 24 hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Straggler tasks due to data skew can dominate job completion
                  time; use dynamic repartitioning or speculative execution to
                  mitigate
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
                  OpenAI and major cloud providers offer batch APIs with up to
                  24 hour completion windows for large Language Model jobs,
                  trading latency for 50% cost reduction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  YouTube style systems materialize top 1000 candidate videos
                  per user daily, enabling 5ms Redis lookups at serving time
                  with zero inference compute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommendation batch job: 10,000 workers process 500M users in
                  90 minutes, write 50B predictions to storage, then terminate
                  to eliminate idle capacity cost
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchVsRealtimeInferenceBatchInferenceThroughputOverLatency;
