import type { Component } from "solid-js";

const LessonBatchVsRealtimeInferenceProductionImplementationPatterns: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation Patterns
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Stage Retrieval and Ranking
            </p>
            <p style="margin-top: 0; margin-bottom: 0">
              This is the dominant pattern at scale. Stage one (retrieval) is
              batch or nearline: precompute embeddings, generate candidate sets
              using approximate nearest neighbors, write to storage. Stage two
              (ranking) is online: fetch top K candidates (K typically 100 to
              1000), apply real-time filters, score with a compact model, return
              top N. Why split? Retrieval over billions of items is too
              expensive to do online. But retrieval does not need per request
              context. Ranking over hundreds of candidates is cheap enough for
              real-time and benefits hugely from fresh context like current
              session or device type. Concrete numbers: YouTube might have 1
              billion videos. Batch computes embeddings for all videos and top
              1000 candidates per user daily. Online ranking scores those 1000
              candidates in 20 to 40 milliseconds using session features. Total
              latency: 5ms candidate fetch plus 30ms ranking equals 35ms,
              fitting easily in a 150ms page render budget.
            </p>
            <div style="margin: 20px 0 20px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  1
                </div>
                <div style="flex: 1">
                  <strong>Batch candidate generation:</strong> Compute
                  embeddings and approximate nearest neighbors for billions of
                  items, write top 1000 per user to storage.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  2
                </div>
                <div style="flex: 1">
                  <strong>Online candidate fetch:</strong> Read precomputed list
                  from Redis or similar, typically under 5ms.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  3
                </div>
                <div style="flex: 1">
                  <strong>Real-time ranking:</strong> Score candidates with
                  compact model and fresh features in 20 to 40ms.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px">
                <div style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; margin-top: 2px">
                  4
                </div>
                <div style="flex: 1">
                  <strong>Apply filters and return:</strong> Remove watched
                  items, diversity filters, return final top N.
                </div>
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Nearline Features: The Middle Ground
            </p>
            <p style="margin-top: 0">
              Some features need fresher than batch but not full real-time.
              Nearline means minute level freshness using streaming
              aggregations. Examples: <code>purchases_last_hour</code>,{" "}
              <code>clicks_in_session</code>, <code>recent_searches</code>.
              Implementation: Kafka or Kinesis streams feed aggregation jobs
              that write to a low latency store every 1 to 5 minutes. Online
              serving reads these alongside batch features. This bridges the
              gap: batch provides long term signals (user demographics,
              historical preferences), nearline provides recent activity, online
              adds immediate context.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cascaded Models with Timeouts
            </p>
            <p style="margin-top: 0">
              Use a sequence of increasingly expensive models with early exits.
              First model is ultra fast (5ms), catches 80% of cases. Second
              model is more accurate but slower (30ms), handles edge cases. Each
              stage has a strict timeout; if exceeded, return the previous
              stage's result. Example in fraud detection: Stage one uses a
              simple rule based check (2ms). Stage two uses a tree ensemble
              (10ms). Stage three uses a neural network (40ms). Total budget is
              50ms. If stage three times out, fall back to stage two prediction.
              This protects tail latency while allowing sophisticated models
              when time permits.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Admission Control and Load Shedding
            </p>
            <p style="margin-top: 0">
              When traffic spikes beyond capacity, you must shed load
              intelligently. Not all requests have equal value. Priority queue:
              critical paths (payment processing, safety checks) get capacity
              first. Lower priority paths (analytics, telemetry, non critical
              recommendations) get shed. Implementation: assign priority scores
              to request types. When queue depth exceeds threshold or latency
              breaches Service Level Objectives (SLOs), reject lowest priority
              requests with HTTP 503. This keeps the system serving high value
              traffic within SLOs rather than dragging everything into timeout
              land.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The goal is not to serve every request. The goal is to serve
                high value requests within SLO. Shed the tail to protect the
                head."
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Snapshot Semantics and Atomic Cutover
            </p>
            <p style="margin-top: 0">
              Batch jobs should never write directly to production tables. Write
              to versioned snapshots: <code>predictions_v125</code>. Validate
              the snapshot: check coverage (all expected entities present),
              sanity checks (no negative scores), A/B test if possible. Only
              then atomically switch the pointer:{" "}
              <code>predictions_current</code> now points to <code>v125</code>.
              This enables instant rollback. Production metrics tank? Flip the
              pointer back to <code>v124</code> in seconds. No data corruption,
              no partial states, no multi hour recovery.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Planning for Real-time
            </p>
            <p style="margin-top: 0">
              Concurrency approximately equals queries per second (QPS)
              multiplied by p99 latency. At 15,000 QPS with 60ms p99, you need
              15,000 multiplied by 0.06 equals 900 concurrent request slots.
              Each instance handles perhaps 50 concurrent requests, so you need
              18 instances minimum. Add 30% headroom for bursts and failures: 24
              instances. But this is steady state. Autoscaling lags 2 to 5
              minutes. If traffic doubles in 30 seconds (common during events),
              you will violate SLOs until scale up completes. Solution: keep
              warm pools at 150% of predicted peak, or use predictive scaling
              that anticipates traffic patterns.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Uber style systems blend batch
              long term features (driver reliability, historical demand),
              nearline counters (recent cancellations updated every minute), and
              online context (current location, weather) to make dispatch
              decisions in under 100ms p95.
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
                  Two stage retrieval and ranking splits work: batch generates
                  candidate sets from billions of items, online ranks hundreds
                  of candidates with fresh context in under 50ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Nearline features provide minute level freshness via streaming
                  aggregations, bridging batch (hours) and real-time
                  (milliseconds) without full online training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cascaded models with timeouts protect tail latency: sequence
                  of increasingly expensive models with early exits, strict per
                  stage budgets, fallback on timeout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Admission control and load shedding protect Service Level
                  Objectives (SLOs) during overload by prioritizing high value
                  requests and rejecting low priority traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snapshot semantics for batch jobs enable instant rollback:
                  write to versioned tables, validate, atomically cutover, flip
                  back on errors
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
                  YouTube two stage: batch computes 1000 candidates per user
                  daily, online fetches in 5ms and ranks in 30ms, total 35ms
                  fits in 150ms page budget
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Nearline streaming aggregations update
                  &lt;code&gt;clicks_last_hour&lt;/code&gt; every 1 to 5
                  minutes, providing middle ground between daily batch and full
                  real-time inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fraud cascaded models: rule check (2ms) catches 80%, tree
                  ensemble (10ms) handles edge cases, neural network (40ms) for
                  complex patterns, fallback on timeout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchVsRealtimeInferenceProductionImplementationPatterns;
