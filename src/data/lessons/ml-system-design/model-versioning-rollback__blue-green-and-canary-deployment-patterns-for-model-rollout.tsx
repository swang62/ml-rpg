import type { Component } from "solid-js";

const LessonModelVersioningRollbackBlueGreenAndCanaryDeploymentPatternsForModelRollout: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Blue Green and Canary Deployment Patterns for Model Rollout
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Blue Green Deployment
            </p>
            <p style="margin-top: 0">
              Blue green runs old and new model stacks in parallel, then
              switches all traffic at once by flipping a load balancer or router
              configuration. The old stack stays warm for instant rollback if
              issues emerge. Netflix uses red black (their term for blue green)
              extensively: the flip takes seconds, and the old server group
              remains ready for immediate reversion. This pattern doubles
              compute during the transition window but provides the fastest
              rollback path. A typical blue green window at Netflix lasts 15 to
              30 minutes before the old stack is torn down.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Canary Deployment
            </p>
            <p style="margin-top: 0">
              Canary gradually shifts traffic from 1 percent to 5 percent to 25
              percent to 50 percent to 100 percent while monitoring SLOs and
              KPIs at each stage. Uber's typical path for ranking or ETA models
              follows shadow then 1 to 5 percent canary, enforcing session
              stickiness so individual users see consistent predictions. Each
              canary stage runs for minutes to hours depending on metric
              confidence: infrastructure metrics like p99 latency stabilize in 5
              to 30 minutes, but business KPIs like conversion rate need hours
              to achieve statistical significance.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Speed vs Safety Trade-off
            </p>
            <p style="margin-top: 0">
              Blue green catches regressions quickly across 100 percent of
              traffic but risks larger blast radius. If the new model has a bug,
              all users are affected until rollback completes. Canary limits
              impact to small cohorts but extends rollout timelines and requires
              statistical rigor to detect small KPI deltas. Detecting a 0.5
              percent conversion rate drop requires tens of thousands of
              samples, which might take hours at lower traffic volumes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Configuration
            </p>
            <p style="margin-top: 0">
              LinkedIn runs billions of predictions daily with tens of
              milliseconds p99 per subcall budgets; their canaries start at 1
              percent with strict guardrails on latency inflation and error rate
              spikes to protect aggregate page load times. Guardrails include:
              p99 latency inflation less than 20 percent, error rate increase
              less than 0.5 percentage points, CPU utilization delta less than
              10 percent. Any breach triggers automatic rollback within 5
              minutes.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; gap: 20px; justify-content: space-around">
                <div style="flex: 1">
                  <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                    Blue Green Deployment
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 8px; align-items: center">
                    <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 120px; text-align: center; font-size: 12px">
                      <strong>Old Stack</strong>
                      <br />
                      (Blue)
                      <br />
                      100% traffic
                    </div>
                    <div style="font-size: 20px; font-weight: bold">
                      ↓ flip (seconds)
                    </div>
                    <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; width: 120px; text-align: center; font-size: 12px">
                      <strong>New Stack</strong>
                      <br />
                      (Green)
                      <br />
                      100% traffic
                    </div>
                    <div style="font-size: 11px; margin-top: 4px; text-align: center">
                      Old stack stays warm
                      <br />
                      for instant rollback
                    </div>
                  </div>
                </div>
                <div style="flex: 1">
                  <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                    Canary Deployment
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px">
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 6px">
                      <strong>1% canary</strong> (5–30 min)
                      <br />
                      Infra SLOs
                    </div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 6px">
                      <strong>5% canary</strong> (30–60 min)
                      <br />
                      Early KPIs
                    </div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 6px">
                      <strong>25% canary</strong> (1–3 hrs)
                      <br />
                      Business metrics
                    </div>
                    <div style="border: 2px solid; padding: 6px 10px; border-radius: 6px">
                      <strong>100% rollout</strong>
                      <br />
                      Full production
                    </div>
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
                  Blue green flips 100 percent of traffic in seconds via load
                  balancer switch and keeps the old stack warm for instant
                  rollback, but doubles compute during transition and risks
                  larger blast radius
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canary starts at 1 to 5 percent with session stickiness and
                  ramps to 25/50/100 percent while monitoring; infrastructure
                  SLOs stabilize in 5 to 30 minutes but business KPIs need hours
                  for statistical confidence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix uses automated canary analysis (Kayenta tool) to
                  compare baseline and canary metrics with statistical
                  significance tests, triggering rollback on latency or error
                  rate deviations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber enforces p99 inference latency budgets under 50
                  milliseconds for online services; canary stages monitor both
                  infrastructure regressions (CPU, memory, tail latencies) and
                  business KPIs like dispatch accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Short canary windows catch infrastructure failures quickly but
                  may miss small KPI deltas requiring hours of data; low traffic
                  segments need broader canaries or longer windows for
                  statistical power
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
                  Airbnb's Bighead platform runs shadow deployments for several
                  days mirroring 100 percent of production requests to observe
                  drift and cost, then graduates to 5 percent canary before blue
                  green promotion for instant rollback capability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn starts ranking model canaries at 1 percent with
                  strict p99 latency guardrails (tens of milliseconds per
                  subcall) to protect aggregate page latency, ramping over hours
                  as business metrics converge
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelVersioningRollbackBlueGreenAndCanaryDeploymentPatternsForModelRollout;
