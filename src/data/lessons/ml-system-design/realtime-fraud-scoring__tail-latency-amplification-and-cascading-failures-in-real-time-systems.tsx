import type { Component } from "solid-js";

const LessonRealtimeFraudScoringTailLatencyAmplificationAndCascadingFailuresInRealTimeSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Tail Latency Amplification and Cascading Failures in Real-Time
            Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tail Latency Amplification
            </p>
            <p>
              A single slow dependency can dominate overall latency. If a
              request fans out to 10 services and waits for all to respond, the
              slowest service determines total latency. With 99th percentile
              latency at 100ms for each service, the aggregate P99 becomes 250ms
              or worse—the probability of hitting at least one slow response
              compounds across services.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Mitigation Pattern:</strong> Set aggressive timeouts on
              each dependency. If feature store does not respond in 15ms,
              proceed with cached or default values. Do not let one slow
              component block the entire request path.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cascading Failures
            </p>
            <p>
              When one service slows down, requests queue up. Queued requests
              consume memory and connection pool slots. Upstream services retry
              failed requests, multiplying load. The slow service becomes
              slower, causing more retries, until the entire system collapses.
              This cascade can take down healthy services that depend on the
              degraded one.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Circuit Breakers
            </p>
            <p>
              Circuit breakers prevent cascade by failing fast. After N
              consecutive failures or P percent error rate, the circuit
              opens—all requests immediately return errors without attempting
              the downstream call. After a cooldown period, the circuit
              half-opens: a few test requests go through. If they succeed, the
              circuit closes and normal operation resumes.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Circuit breakers need graceful
              degradation paths. When the feature store circuit opens, the model
              must work with fewer features or default values. Design degraded
              modes during normal operation, not during incidents.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Timeout Budgets
            </p>
            <p>
              Propagate deadline through the request. If total budget is 50ms
              and 20ms have elapsed, downstream services know they have 30ms
              remaining. Services that cannot complete in the remaining budget
              return immediately rather than starting work that will be
              discarded.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: bold; font-size: 14px">
                Tail Latency Amplification
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Normal Load</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Feature Store: p50=5ms, p99=50ms
                  </div>
                  <div style="font-size: 12px">Scoring: p50=10ms, p99=80ms</div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Burst Traffic
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Queues Fill</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Slow requests block thread pool
                  </div>
                  <div style="font-size: 12px">
                    Head of line blocking begins
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Death Spiral</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Timeouts trigger retries: 2x to 10x load
                  </div>
                  <div style="font-size: 12px">
                    Average latency climbs from 10ms to 500ms+
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Cascading Failure</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Upstream timeouts, system collapse
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
                  Fan-out amplifies tail latency: 10 services at P99 100ms each
                  yields aggregate P99 of 250ms or worse
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Circuit breakers prevent cascades by failing fast after N
                  failures—but require graceful degradation paths
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Propagate deadline through requests so downstream services
                  know remaining budget and can fail early
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
                  Set aggressive dependency timeouts: if feature store misses
                  15ms deadline, proceed with cached or default values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain circuit breaker states: closed (normal), open (fail
                  fast), half-open (test recovery)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeFraudScoringTailLatencyAmplificationAndCascadingFailuresInRealTimeSystems;
