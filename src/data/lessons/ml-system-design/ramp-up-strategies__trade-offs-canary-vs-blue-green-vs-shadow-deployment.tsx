import type { Component } from "solid-js";

const LessonRampUpStrategiesTradeOffsCanaryVsBlueGreenVsShadowDeployment: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade Offs: Canary vs Blue Green vs Shadow Deployment
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CANARY DEPLOYMENT
            </p>
            <p style="margin-top: 0">
              Canary gradually increases traffic from 1% to 100% over 24-48
              hours, monitoring system and product metrics at each step.{" "}
              <strong>Pros:</strong> Catches problems early with minimal blast
              radius, validates product impact with real users.{" "}
              <strong>Cons:</strong> Slow (days not minutes), requires 5-10%
              extra capacity during parallel operation, complex metric
              infrastructure.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BLUE-GREEN DEPLOYMENT
            </p>
            <p style="margin-top: 0">
              Blue-green runs two identical environments. Deploy to green
              (inactive), validate with synthetic tests, then atomically switch
              the load balancer. <strong>Pros:</strong> Fast cutover (seconds),
              instant rollback, simple mental model. <strong>Cons:</strong>{" "}
              Requires 2x capacity, validates only system health (synthetic
              tests cannot measure user behavior), all users hit the new version
              simultaneously.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SHADOW DEPLOYMENT
            </p>
            <p style="margin-top: 0">
              Shadow duplicates production traffic to the new version without
              affecting user responses. <strong>Pros:</strong> Zero user impact,
              validates latency and resource usage under real load, useful for
              cache warming. <strong>Cons:</strong> Cannot measure user behavior
              (users do not see shadow responses), doubles request volume
              (cost), only validates system metrics.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Shadow validates system health;
              canary validates user impact. Use shadow first to warm caches and
              validate latency, then canary to measure CTR.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE EACH
            </p>
            <p style="margin-top: 0">
              <strong>Use canary:</strong> ML models, ranking changes, anything
              where user behavior matters. <strong>Use blue-green:</strong>{" "}
              Schema migrations, infrastructure changes, emergency rollbacks.{" "}
              <strong>Use shadow:</strong> New services before canary, cache
              warming, validating feature pipelines under load.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 14px">
                  Deployment Pattern Comparison
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 4px">
                    Canary
                  </div>
                  <div style="font-size: 11px">
                    <strong>Time:</strong> 24-48h progressive •{" "}
                    <strong>Capacity:</strong> +5-10% parallel •{" "}
                    <strong>Validates:</strong> System + Product + Data
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 4px">
                    Blue Green
                  </div>
                  <div style="font-size: 11px">
                    <strong>Time:</strong> Minutes atomic switch •{" "}
                    <strong>Capacity:</strong> 2x full stack •{" "}
                    <strong>Validates:</strong> System only (synthetic)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 4px">
                    Shadow
                  </div>
                  <div style="font-size: 11px">
                    <strong>Time:</strong> Hours validation •{" "}
                    <strong>Capacity:</strong> +5% duplicate •{" "}
                    <strong>Validates:</strong> System + Data (no user impact)
                  </div>
                </div>
              </div>
              <div style="margin-top: 10px; padding: 8px; border: 2px solid; border-radius: 6px; font-size: 11px">
                <strong>Use canary when:</strong> High risk ML changes, user
                impact unknown, feedback loops possible
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
                  Canary: 24-48 hours, 5-10% extra capacity, validates both
                  system and product metrics with real users
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Blue-green: seconds to cutover, 2x capacity, validates only
                  system health (synthetic tests), atomic rollback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow: zero user impact, doubles request volume, validates
                  system metrics only (cannot measure user behavior)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use shadow first to warm caches and validate latency, then
                  canary to measure product impact
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
                  When asked about deployment strategies, compare all three:
                  canary for ML, blue-green for infra changes, shadow for warmup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain why ML needs canary: models can pass offline tests but
                  fail online due to training-serving skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the shadow-then-canary pattern: shadow at 5% for 1
                  hour to warm caches, then canary at 1% to measure CTR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRampUpStrategiesTradeOffsCanaryVsBlueGreenVsShadowDeployment;
