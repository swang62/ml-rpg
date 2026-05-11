import type { Component } from "solid-js";

const LessonMlCostOptimizationFailureModesCapacityCrunchesInterruptionStormsAndCostSpikes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Capacity Crunches, Interruption Storms, and Cost
            Spikes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Cost Optimization Failures:</strong> Aggressive cost
              optimization can backfire through capacity crunches (no instances
              available), interruption storms (mass terminations), and cost
              spikes (fallback to expensive instances). Each failure mode
              requires specific detection and mitigation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Crunches
            </p>
            <p>
              Spot instances are not always available. During high-demand
              periods, your requests for spot capacity may go unfulfilled for
              hours or days. Symptoms: autoscaler requests instances, cloud
              provider returns "insufficient capacity," workloads queue
              indefinitely. This particularly affects GPU instances during ML
              hype cycles. Mitigation: maintain on-demand fallback, diversify
              across regions (not just zones), implement capacity reservation
              for critical workloads, and monitor spot availability trends to
              anticipate crunches.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              Interruption Storms
            </p>
            <p>
              Correlated interruptions can terminate large portions of your
              fleet simultaneously. A single provider capacity event might
              reclaim hundreds of instances across your workloads. Symptoms:
              sudden drop in available capacity, multiple jobs failing
              simultaneously, cascading failures as remaining instances become
              overloaded. Mitigation: diversification (discussed earlier),
              circuit breakers that halt new work during storms, graceful
              degradation that prioritizes critical workloads, and post-storm
              recovery automation that relaunches capacity systematically.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Spikes
            </p>
            <p>
              Aggressive autoscaling combined with spot unavailability can cause
              cost spikes. Scenario: traffic increases, spot not available,
              autoscaler launches expensive on-demand instances, bill triples.
              Or: misconfigured autoscaling launches too many instances, or
              fails to scale down after load decreases. Mitigation: hard caps on
              maximum instances, budget alerts with automatic shutdown, regular
              cost monitoring dashboards, and post-incident reviews for
              unexpected cost increases. A 10-minute misconfiguration can cost
              thousands of dollars on GPU instances.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Monitoring Checklist:</strong> Track spot fulfillment
              rate, interruption frequency, cost per day/week with alerts on
              anomalies, and queue depth during capacity events.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Capacity Crunch Cascade
                  </strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    1. Spot unavailable, provisioning stalls
                  </div>
                  <div style="margin-top: 3px; font-size: 11px">
                    2. Queue depth grows, triggers more scale out
                  </div>
                  <div style="margin-top: 3px; font-size: 11px">
                    3. Fallback to on demand after 5min timeout
                  </div>
                  <div style="margin-top: 3px; font-size: 11px">
                    4. Cost spikes $10K/day → $80K/day
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Mitigation</strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    Workload tiers: Pause best effort jobs first
                  </div>
                  <div style="margin-top: 3px; font-size: 11px">
                    Budget alerts: 85% warning, 100% hard stop
                  </div>
                  <div style="margin-top: 3px; font-size: 11px">
                    Pool limits: Max 20 to 30% per pool
                  </div>
                  <div style="margin-top: 3px; font-size: 11px">
                    Stabilization: 5 to 10min scale in window
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
                  Capacity crunches: spot unavailable for hours during
                  high-demand periods
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interruption storms: correlated terminations affect large
                  fleet portions simultaneously
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost spikes: 10-minute misconfiguration can cost thousands on
                  GPU instances
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
                  Circuit breakers halt new work during interruption storms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Budget alerts with automatic shutdown prevent runaway costs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMlCostOptimizationFailureModesCapacityCrunchesInterruptionStormsAndCostSpikes;
