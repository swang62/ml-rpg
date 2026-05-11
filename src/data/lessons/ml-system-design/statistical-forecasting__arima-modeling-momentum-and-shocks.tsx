import type { Component } from "solid-js";

const LessonStatisticalForecastingArimaModelingMomentumAndShocks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            ARIMA: Modeling Momentum and Shocks
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Idea
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>ARIMA</strong> forecasts by modeling momentum (values
                stay high if they were high) and shock recovery (surprises
                fade). Written as{" "}
                <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                  ARIMA(p, d, q)
                </code>
                .
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AR: MOMENTUM
            </p>
            <p style="margin-top: 0">
              Predicts today from recent days. If prices were rising, they tend
              to keep rising.{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                today = w₁×yesterday + w₂×2_days_ago
              </code>
              . Parameter p = past days used. AR(1) uses yesterday; AR(2) uses
              two days.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MA: SHOCK RECOVERY
            </p>
            <p style="margin-top: 0">
              Models how prediction errors (shocks) fade. A surprise causes a
              spike, then dissipates. Parameter q = past errors that matter.
              MA(1) = yesterday shock affects today; MA(2) = shocks linger 2
              periods.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> AR = "values have inertia." MA =
              "shocks fade." Most real data has both momentum and shock effects.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              I: REMOVING TRENDS
            </p>
            <p style="margin-top: 0">
              ARIMA needs stationary data (no trend). Differencing removes
              trends:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                diff = today - yesterday
              </code>
              . Parameter d = times to difference. d=1 handles linear trends;
              d=2 (rare) handles accelerating trends.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING P, D, Q
            </p>
            <p style="margin-top: 0">
              Start with d: difference until data looks flat (usually 0 or 1).
              Then examine correlations to pick p and q. Automated tools test
              combinations. Common start: ARIMA(1,1,1). For seasonal data,
              SARIMA adds seasonal terms.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> ARIMA is flexible but harder to
              tune. Clear trend/seasonality → ETS. Complex autocorrelation →
              ARIMA.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Data Layer</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Raw events → Aggregate to grain (5min/hourly/daily)
                    <br />
                    Timezone normalize, calendar aware
                    <br />
                    Partition by series key and time
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Modeling Layer</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Train per series: ETS 250ms, ARIMA 500ms
                    <br />
                    2,000 workers → 16K fits/sec
                    <br />
                    Store state: component vectors or coefficients
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Serving Layer</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Online: 1 to 5ms per series, p99 &lt; 100ms
                    <br />
                    Return P10, P50, P90 quantiles
                    <br />
                    Reconcile hierarchies before publish
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Consumers</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Autoscaling, replenishment, pricing
                    <br />
                    Finance dashboards, capacity planning
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
                  AR (autoregressive) captures momentum—if values were high,
                  they tend to stay high
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MA (moving average) captures shock recovery—unexpected events
                  that fade over time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  I (integrated) = differencing to remove trends; d=1 handles
                  most trending data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ARIMA(p,d,q): p=past values used, d=differencing times, q=past
                  errors used
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  More flexible than ETS but harder to tune; use when
                  autocorrelation patterns are complex
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
                  Explain AR as momentum (inertia) and MA as shock recovery
                  (fading surprises)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Know that differencing removes trends—subtract today from
                  yesterday to get stationary data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalForecastingArimaModelingMomentumAndShocks;
