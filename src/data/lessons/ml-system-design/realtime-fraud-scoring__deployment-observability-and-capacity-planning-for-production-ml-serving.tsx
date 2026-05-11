import type { Component } from "solid-js";

const LessonRealtimeFraudScoringDeploymentObservabilityAndCapacityPlanningForProductionMlServing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Deployment, Observability, and Capacity Planning for Production ML
            Serving
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Latency Observability
            </p>
            <p>
              Track latency at every stage: feature retrieval P50/P99, inference
              P50/P99, total request P50/P99. Histogram metrics reveal
              distribution shape—a bimodal distribution suggests two different
              code paths. Alert on P99 exceeding SLA, not just average.
              Dashboard tail latency trends to catch degradation before it
              impacts users.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Metrics:</strong> Request rate, error rate, latency
              percentiles (P50, P95, P99), model prediction distribution,
              feature store hit rate. These six metrics expose most production
              issues.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Canary Deployments
            </p>
            <p>
              New model versions may have different latency characteristics.
              Deploy to 1% of traffic first, compare latency metrics against
              baseline. If P99 regresses, roll back immediately. Gradual rollout
              (1% → 10% → 50% → 100%) catches issues before full impact. Shadow
              mode runs the new model alongside production without affecting
              responses—useful for validating accuracy before latency testing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Planning
            </p>
            <p>
              Estimate peak QPS from historical traffic patterns plus growth
              projections. Add 2-3x headroom for traffic spikes (promotions,
              viral events). Each inference server handles a fixed QPS at target
              latency—divide peak QPS by per-server capacity to get fleet size.
              Autoscaling helps but has spin-up latency; pre-scale before known
              traffic events.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Cost Optimization:</strong> GPUs are expensive. Use CPUs
              for simple models (linear, small trees). Reserve GPUs for neural
              networks where the throughput gain justifies cost. Profile actual
              inference time—many GPU deployments are CPU-bound on feature
              preprocessing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Graceful Degradation
            </p>
            <p>
              Design fallback modes: if the model times out, return a default
              score. If feature store is down, run the model with available
              features only. Document degradation modes and their accuracy
              impact before incidents occur.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: bold; font-size: 14px">
                Deployment &amp; Observability
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Canary Deploy: 1 to 5% Traffic</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Monitor p99 latency, error rate
                  </div>
                  <div style="font-size: 12px">
                    Auto rollback if regression &gt; 10%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Shadow Traffic</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Send requests to old + new models
                  </div>
                  <div style="font-size: 12px">
                    Serve old, log both for comparison
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Observability: Latency Breakdown</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Track p50/p95/p99 per stage
                  </div>
                  <div style="font-size: 12px">
                    Feature freshness, cache hit rate
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Saturation Metrics</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    CPU &gt; 70%, queue depth &gt; 10% capacity
                  </div>
                  <div style="font-size: 12px">
                    SLO burn alerts before user impact
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong>Capacity: 2 to 3x Peak + Failover</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Test synthetic bursts, fault injection
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
                  Track six key metrics: request rate, error rate, latency
                  percentiles, prediction distribution, feature store hit rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canary deployments (1% → 10% → 50% → 100%) catch latency
                  regressions before full impact
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Add 2-3x capacity headroom for traffic spikes; autoscaling has
                  spin-up latency, so pre-scale for known events
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
                  Alert on P99 latency exceeding SLA, not average—bimodal
                  distributions indicate different code paths worth
                  investigating
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Profile GPU deployments: many are actually CPU-bound on
                  feature preprocessing, wasting expensive GPU resources
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimeFraudScoringDeploymentObservabilityAndCapacityPlanningForProductionMlServing;
