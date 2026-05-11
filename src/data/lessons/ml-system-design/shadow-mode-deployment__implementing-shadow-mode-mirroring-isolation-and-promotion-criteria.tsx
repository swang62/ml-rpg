import type { Component } from "solid-js";

const LessonShadowModeDeploymentImplementingShadowModeMirroringIsolationAndPromotionCriteria: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementing Shadow Mode: Mirroring, Isolation, and Promotion
            Criteria
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Shadow Implementation:</strong> A complete shadow
              deployment requires traffic mirroring infrastructure, isolation
              mechanisms to prevent shadow failures from affecting production,
              and clear promotion criteria that define when shadow validation is
              sufficient to proceed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Traffic Mirroring Implementation
            </p>
            <p>
              At the load balancer or service mesh level, duplicate incoming
              requests to the shadow endpoint. Implementation options: Envoy
              proxy with mirror policy (duplicates percentage of traffic),
              custom middleware that forwards requests asynchronously, or
              Kafka-based replay where requests are logged and shadow consumes
              from the log. Key requirements: shadow receives identical inputs
              (same features, same timestamps), mirroring does not add latency
              to production path, and failed shadow requests do not retry
              (shadow failures should be logged but not retried).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Isolation Mechanisms
            </p>
            <p>
              Deploy shadow on separate infrastructure with resource quotas.
              Container-level: separate pods with CPU and memory limits.
              Network-level: shadow cannot reach production databases or
              external services (use mocks or read replicas). Failure-level:
              circuit breaker disables shadow if error rate exceeds threshold,
              preventing cascade failures. Monitoring-level: separate dashboards
              and alerts for shadow, so shadow issues do not pollute production
              monitoring. The goal: shadow can fail completely without any
              production impact.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Promotion Criteria
            </p>
            <p>
              Define explicit criteria for promoting shadow to production.
              Quantitative criteria: prediction quality within X% of production
              (or better), latency p99 under Y milliseconds, error rate under
              Z%. Duration criteria: metrics stable for N days. Coverage
              criteria: processed representative samples of all user segments
              and request types. Document criteria before starting shadow—avoid
              moving goalposts. If shadow fails criteria, investigate root cause
              before re-running, do not just extend duration hoping issues
              resolve themselves.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Automation:</strong> Build promotion as a pipeline: shadow
              deploys automatically, metrics collection runs automatically,
              promotion decision is automated based on pre-defined criteria.
              Human approval only for exceptions.
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
                  Traffic mirroring via service mesh, middleware, or Kafka-based
                  replay
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Isolation: separate pods, network restrictions, circuit
                  breakers, separate monitoring
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Define promotion criteria before starting: quality, latency,
                  error rate, duration
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
                  Envoy proxy mirror policy duplicates percentage of traffic to
                  shadow
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Circuit breaker disables shadow if error rate exceeds
                  threshold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonShadowModeDeploymentImplementingShadowModeMirroringIsolationAndPromotionCriteria;
