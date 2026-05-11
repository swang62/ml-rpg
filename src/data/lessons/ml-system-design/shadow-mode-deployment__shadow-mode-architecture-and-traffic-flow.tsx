import type { Component } from "solid-js";

const LessonShadowModeDeploymentShadowModeArchitectureAndTrafficFlow: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Shadow Mode Architecture and Traffic Flow
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Shadow Architecture:</strong> A traffic mirroring setup
              where production requests are duplicated to the shadow model. The
              production path serves users normally while the shadow path
              processes the same requests in parallel, logging results without
              affecting user experience.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Traffic Mirroring Patterns
            </p>
            <p>
              <strong>Synchronous mirroring:</strong> Request arrives, load
              balancer duplicates it to both production and shadow, waits for
              production response, returns to user (shadow response discarded).
              Shadow latency does not affect user experience but increases load
              balancer complexity. <strong>Asynchronous mirroring:</strong>{" "}
              Request logged to a queue (Kafka, SQS), shadow model consumes from
              queue. Decouples shadow processing from request path, but
              introduces delay between request and shadow evaluation. Choose
              synchronous for latency validation, asynchronous for pure
              prediction comparison.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Isolation Requirements
            </p>
            <p>
              Shadow model failures must not affect production. Isolation
              mechanisms: separate infrastructure (different pods, different
              nodes), resource limits (CPU/memory caps prevent shadow from
              starving production), circuit breakers (disable shadow if it
              starts failing), and network isolation (shadow cannot make calls
              that modify state). The principle: shadow can observe but never
              mutate. If shadow mode can crash production or corrupt data, it
              defeats the purpose of risk-free validation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Logging and Comparison
            </p>
            <p>
              Log both predictions with matching request IDs for later analysis.
              Essential fields: request ID (to join production and shadow),
              timestamp, input features (for debugging divergences), production
              prediction, shadow prediction, and latency for both. Store logs in
              a queryable system (data warehouse, time-series database) for
              analysis. Dashboard should show: prediction agreement rate,
              latency comparison, error rate comparison, and feature coverage
              (what percentage of production requests shadow successfully
              processed).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Implementation Choice:</strong> Start with asynchronous
              mirroring (simpler, lower risk), graduate to synchronous when you
              need accurate latency measurement.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Edge Gateway</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Mirror + Correlation ID
                  </div>
                </div>
                <div style="display: flex; gap: 16px; justify-content: space-between">
                  <div style="flex: 1; display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="font-size: 18px; font-weight: bold">↓ Sync</div>
                    <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 100%; text-align: center">
                      <strong style="font-size: 12px">Live Model</strong>
                      <div style="font-size: 11px; margin-top: 4px">
                        p99: 130ms
                        <br />
                        Serves users
                      </div>
                    </div>
                  </div>
                  <div style="flex: 1; display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="font-size: 18px; font-weight: bold">
                      ↓ Async Queue
                    </div>
                    <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 100%; text-align: center">
                      <strong style="font-size: 12px">Shadow Model</strong>
                      <div style="font-size: 11px; margin-top: 4px">
                        p99 budget: 180ms
                        <br />
                        Logs predictions
                      </div>
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Evaluation Stream</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Difference Analyzer + Label Joiner
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Metrics Dashboard</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    AUC, NDCG, Latency SLOs
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
                  Synchronous mirroring validates latency; asynchronous
                  decouples shadow from request path
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow must be isolated: separate resources, circuit breakers,
                  no state mutations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log both predictions with matching request IDs for comparison
                  analysis
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
                  Synchronous: load balancer duplicates to both, returns
                  production response only
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dashboard shows agreement rate, latency comparison, error
                  rates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonShadowModeDeploymentShadowModeArchitectureAndTrafficFlow;
