import type { Component } from "solid-js";

const LessonAutomatedRollbackCanaryAnalysisVsBlueGreenVsRollingUpdates: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Canary Analysis vs Blue Green vs Rolling Updates
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Comparison
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Canary</strong> trades rollout speed for safety and
                data-driven confidence. <strong>Blue-green</strong> offers
                instant rollback but full exposure.{" "}
                <strong>Rolling updates</strong> are simple but blend metrics.{" "}
                <strong>Shadow mode</strong> provides risk-free validation.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BLUE-GREEN
            </p>
            <p style="margin-top: 0">
              Swap all traffic in seconds between two full environments
              (blue=current, green=new). If green is broken, 100% of users see
              failures until flip back. Requires 2× capacity during cutover.
              Fast rollback but all-or-nothing blast radius.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ROLLING UPDATES
            </p>
            <p style="margin-top: 0">
              Gradually replace instances one or few at a time until fleet is
              updated. Rollback requires another rolling cycle in reverse (tens
              of minutes). No extra capacity cost. Simple orchestration.
              Downside: metrics blend old and new versions throughout rollout,
              making detection slow.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SHADOW MODE
            </p>
            <p style="margin-top: 0">
              Mirror traffic to canary for measurement, primary responses still
              go to users—zero user impact. Powerful for ML: compare prediction
              distributions and latency under live load before real exposure.
              Cannot catch issues from real user state changes or high write
              rates. Adds compute overhead (doubles read traffic).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Decision Guide:</strong> Blue-green for instant
              rollback or schema changes. Rolling for simplicity with strong
              pre-prod testing. Shadow for initial ML validation. Canary when
              offline metrics do not predict production behavior well.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CANARY TRADE-OFFS
            </p>
            <p style="margin-top: 0">
              Canary exposes 5-10% initially (limited blast radius), takes 15-30
              min to ramp to 50%, needs only 1.1-1.2× capacity. Rollback is
              immediate. Requires routing complexity, observability pipelines,
              and enough traffic volume for statistical validity.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Canary</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Blast radius: 5 to 10% initially
                    <br />
                    Rollback: Immediate (minutes)
                    <br />
                    Ramp time: 15 to 30 min to 50%
                    <br />
                    Capacity: 1.1 to 1.2x during ramp
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Blue Green</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Blast radius: 100% on cutover
                    <br />
                    Rollback: Immediate (seconds)
                    <br />
                    Ramp time: Instant flip
                    <br />
                    Capacity: 2x during cutover
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Rolling Update</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Blast radius: Gradual, all eventually
                    <br />
                    Rollback: Slow (reverse roll)
                    <br />
                    Ramp time: Tens of minutes
                    <br />
                    Capacity: 1x, no overhead
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Shadow/Mirror</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Blast radius: 0% user impact
                    <br />
                    Rollback: Not needed
                    <br />
                    Ramp time: Validation only
                    <br />
                    Capacity: 2x for reads
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
                  Blue green flips 100 percent of traffic instantly with 2 times
                  capacity cost, canary ramps over 15 to 30 minutes with 1.1 to
                  1.2 times capacity but limits blast radius to 5 to 10 percent
                  initially
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rolling updates have zero capacity overhead and simple
                  orchestration but slow rollback (requires reverse rolling
                  cycle), canary rollback is immediate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow traffic provides zero user impact validation for ML
                  models (compare predictions and latency under load) but cannot
                  catch write side effects or state dependent issues, adds
                  compute overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canary is ideal for ML when offline metrics do not predict
                  production behavior and you need to measure real user CTR,
                  conversion, or prediction quality under actual traffic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose blue green for instant cutover needs or incompatible
                  schema changes, rolling for simplicity with strong testing,
                  shadow then canary for ML model validation
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
                  Uber uses shadow mode for new ML models to validate inference
                  latency and prediction distributions under live load, then
                  switches to 5 percent canary to measure real trip acceptance
                  rates before full rollout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google runs shadow traffic for search ranking changes to
                  compare result quality and latency, catching issues with zero
                  user impact before exposing even 1 percent of production
                  traffic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAutomatedRollbackCanaryAnalysisVsBlueGreenVsRollingUpdates;
