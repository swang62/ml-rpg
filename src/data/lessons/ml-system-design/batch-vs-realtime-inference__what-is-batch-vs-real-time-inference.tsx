import type { Component } from "solid-js";

const LessonBatchVsRealtimeInferenceWhatIsBatchVsRealTimeInference: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Batch vs Real-time Inference?
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
                <strong>Batch inference</strong> processes large datasets on a
                schedule (hourly/daily) to generate predictions in bulk.{" "}
                <strong>Real-time inference</strong> generates predictions on
                demand in milliseconds for immediate use.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Difference
            </p>
            <p style="margin-top: 0">
              Batch inference is like cooking meals in advance for the entire
              week. You spend a few hours on Sunday preparing everything, store
              it, and consume it later. Real-time inference is like ordering
              from a restaurant: you request exactly what you want right now,
              and it arrives in minutes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Batch Inference Works
            </p>
            <p style="margin-top: 0">
              You spin up a large fleet of compute resources, process millions
              or billions of records, write predictions to storage (often called
              a prediction store), then shut down. The predictions are keyed by
              entity like <code>user_id</code> or <code>item_id</code> with a
              Time To Live (TTL). Applications read these precomputed
              predictions later with zero compute on the hot path. For example,
              a recommendation system might compute top 100 videos for each of
              200 million users every night. That is 20 billion predictions
              written to storage. When a user opens the app, you simply look up
              their precomputed list.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Real-time Inference Works
            </p>
            <p style="margin-top: 0">
              An always running service receives requests, loads the model,
              fetches features, runs inference, and returns predictions within
              strict latency budgets. Think payment fraud detection: when you
              click "Buy Now", the system must score the transaction in under 50
              milliseconds to decide whether to approve or block it. The system
              must handle burst traffic, maintain low tail latency (p95/p99),
              and stay online 24/7. No precomputation, no storage lookup. Fresh
              prediction every single time.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Most production systems use both.
              Compute expensive signals offline in batch, then do lightweight
              contextualization online. Netflix computes candidate videos in
              batch but re-ranks them in real-time using your current session.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; gap: 20px; justify-content: center">
                <div style="flex: 1; border: 2px solid; padding: 16px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 12px; font-size: 14px; text-align: center">
                    BATCH INFERENCE
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <div style="margin-bottom: 8px">
                      Schedule: Every 24 hours
                    </div>
                    <div style="margin-bottom: 8px">Input: 1B records</div>
                    <div style="margin-bottom: 8px">Duration: 2 hours</div>
                    <div style="margin-bottom: 8px">
                      Storage: Prediction Store
                    </div>
                    <div style="font-weight: 600">SLA: Job completion</div>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 16px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 12px; font-size: 14px; text-align: center">
                    REAL-TIME INFERENCE
                  </div>
                  <div style="font-size: 12px; line-height: 1.6">
                    <div style="margin-bottom: 8px">Schedule: On demand</div>
                    <div style="margin-bottom: 8px">Input: 1 request</div>
                    <div style="margin-bottom: 8px">Duration: 20ms</div>
                    <div style="margin-bottom: 8px">
                      Storage: No persistence
                    </div>
                    <div style="font-weight: 600">SLA: p99 latency</div>
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
                  Batch inference optimizes for throughput and cost efficiency
                  by processing large datasets on a schedule, with Service Level
                  Agreements (SLAs) measured in job completion time (minutes to
                  hours)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real-time inference optimizes for tail latency and freshness,
                  with SLAs measured in per request p95/p99 latency (typically 5
                  to 100ms for traditional models)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch predictions are materialized into a prediction store
                  keyed by entity with TTL, consumed later with no compute on
                  the hot path
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Real-time systems must be always on, handle traffic spikes,
                  and manage cascading dependencies within strict latency
                  budgets
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Most production ML uses hybrid: compute heavy signals offline
                  in batch, do lightweight contextualization online to balance
                  cost and freshness
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
                  Netflix computes top 100 candidate videos per user daily in
                  batch (200M users × 100 videos = 20B predictions), then
                  re-ranks online with session context in under 100ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Payment fraud detection scores transactions in real-time
                  within 50ms to block or approve immediately, while nightly
                  batch jobs update risk aggregates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ad auction bidders keep model scoring under 5 to 20ms to fit
                  within 100ms exchange deadline, handling tens of thousands of
                  queries per second
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchVsRealtimeInferenceWhatIsBatchVsRealTimeInference;
