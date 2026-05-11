import type { Component } from "solid-js";

const LessonBatchVsRealtimeInferenceRealTimeInferenceLatencyUnderPressure: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Real-time Inference: Latency Under Pressure
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Real-time Challenge
            </p>
            <p style="margin-top: 0">
              Real-time inference means you have 5 to 100 milliseconds to fetch
              features, run a model, and return a prediction, at sustained
              queries per second with traffic spikes. Miss your latency budget
              and users see loading spinners, transactions time out, or ads fail
              to render. The math is unforgiving: at 10,000 QPS with 50ms p99
              latency target, you need enough concurrency to absorb bursts
              without queueing. Concurrency approximately equals QPS multiplied
              by p99 latency: 10,000 multiplied by 0.05 = 500 concurrent
              requests in flight. Provision too few instances and your p99
              explodes. Provision too many and you pay for idle capacity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Latency Budget Breakdown
            </p>
            <p style="margin-top: 0">
              Consider a payment fraud check with 50ms total budget. You might
              allocate: feature reads from database (15ms), model inference
              (10ms), safety checks (5ms), network overhead (10ms), buffer
              (10ms). Every component must respect its sub budget or the whole
              system breaches Service Level Objectives (SLOs). Ad auction
              systems are even tighter. Exchanges enforce approximately 100ms
              end to end. Bidders keep model scoring under 5 to 20ms to leave
              room for network hops, candidate retrieval, and feature fetch. At
              Meta or Google scale, that is tens of thousands of QPS sustained
              with sharp event driven spikes.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Real-time Latency Budgets
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5 to 20ms</div>
                  <div style="font-size: 10px; font-weight: 600">
                    MODEL SCORING
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    50 to 100ms
                  </div>
                  <div style="font-size: 10px; font-weight: 600">TOTAL p99</div>
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Micro-batching: The Secret Weapon
            </p>
            <p style="margin-top: 0">
              GPU inference is expensive per request but efficient in batches.
              Micro-batching waits 5 to 20 milliseconds to accumulate a small
              batch (2 to 16 requests), then scores them together. This improves
              GPU utilization 3x to 5x while keeping p99 latency tolerable. The
              trade-off: waiting adds base latency. If your budget is 50ms and
              you wait 10ms to batch, you have only 40ms left for actual
              inference. Tune batch window and size based on traffic patterns
              and latency constraints.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Real-time Is Worth It
            </p>
            <p style="margin-top: 0">
              Choose real-time when per interaction value is high and wrong or
              late decisions incur immediate loss. Payment fraud costs merchants
              chargebacks and fees. Ad auctions lose revenue if you cannot bid
              in time. Ride dispatch degrades if ETA predictions are stale by
              minutes. But real-time is expensive. Always on capacity, warm
              pools to avoid cold start penalties (5 to 30 seconds to load
              models), redundancy for availability. You are paying for p99
              performance 24/7, even during low traffic hours.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Tail latency is what matters.
              Averages hide outliers. Optimize for p95 and p99, not p50. Use per
              component timeouts and circuit breakers to prevent one slow
              dependency from cascading failures across the system.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Request Arrives</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    50ms budget starts
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Feature Fetch</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    15ms from feature store
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Model Inference</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    10ms GPU scoring
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Return Prediction</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    35ms used, 15ms buffer
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
                  Real-time inference requires strict per request p95/p99
                  latency (5 to 100ms for traditional models), with always on
                  capacity to handle sustained and spiky traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Latency budgets must be allocated across components: feature
                  reads (15ms), model scoring (10ms), safety checks (5ms), with
                  buffers for network and outliers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Micro-batching waits 5 to 20ms to accumulate small batches (2
                  to 16 requests), improving GPU utilization 3x to 5x while
                  meeting latency constraints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Concurrency requirements scale with QPS and latency: at 10,000
                  QPS with 50ms p99, you need approximately 500 concurrent
                  request slots provisioned
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose real-time when per interaction value is high and
                  decisions must be immediate (fraud detection, ad auctions,
                  dispatch), accepting 5x to 20x higher cost than batch
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
                  Payment fraud scoring at Stripe completes in under 50ms p99
                  while handling 5,000 to 50,000 QPS during peak checkout hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ad bidders keep model inference under 5 to 20ms to fit within
                  100ms exchange deadline, handling tens of thousands of
                  sustained QPS with event spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber dispatch and ETA predictions complete in under 50 to
                  100ms p95 to keep app interactions snappy, blending batch
                  aggregates with nearline features
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchVsRealtimeInferenceRealTimeInferenceLatencyUnderPressure;
