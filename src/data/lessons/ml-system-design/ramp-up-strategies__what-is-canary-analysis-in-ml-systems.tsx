import type { Component } from "solid-js";

const LessonRampUpStrategiesWhatIsCanaryAnalysisInMlSystems: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Canary Analysis in ML Systems?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definition
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>Canary analysis</strong> gradually exposes a new model or
              feature to a small percentage of production traffic, monitoring
              for problems before full deployment. The name comes from coal
              miners using canaries to detect toxic gases: if the canary dies,
              stop digging.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            WHY CANARIES ARE ESSENTIAL FOR ML
          </p>
          <p style="margin-top: 0">
            ML models can pass all offline tests with excellent metrics (0.85
            MAP, 0.92 AUC) yet fail catastrophically in production. Reasons
            include training-serving skew, feature pipeline bugs, distribution
            shift, or resource contention. Offline evaluation cannot catch these
            issues because it does not use live traffic, real feature stores, or
            production infrastructure.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            THREE DIMENSIONS OF CANARY EVALUATION
          </p>
          <p style="margin-top: 0">
            <strong>System reliability:</strong> P95/P99 latency, error rates,
            memory usage. Catches infrastructure issues immediately.
            <br />
            <strong>Product metrics:</strong> CTR, conversion rate, engagement.
            Catches model quality problems over hours.
            <br />
            <strong>Data quality:</strong> Feature null rates, value
            distributions, drift detection. Catches feature pipeline issues.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> System metrics fail fast (minutes),
            product metrics fail slow (hours). Canaries must monitor both with
            appropriate time windows.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            TYPICAL RAMP SCHEDULE
          </p>
          <p style="margin-top: 0">
            Start at 0.5-1% traffic for 30-60 minutes to catch immediate
            failures. If healthy, increase to 5% for 2 hours, then 25% for 12
            hours. Each step has automated gates that check metrics before
            proceeding. Full ramp from 1% to 100% typically takes 24-48 hours.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; gap: 24px; align-items: flex-start; justify-content: center">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 130px; text-align: center">
                  <strong style="font-size: 13px">Baseline Model</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    95% traffic
                  </div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 11px">
                  <div>
                    <strong>P95:</strong> 115ms
                  </div>
                  <div>
                    <strong>CTR:</strong> 3.2%
                  </div>
                  <div>
                    <strong>Errors:</strong> 0.08%
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 130px; text-align: center">
                  <strong style="font-size: 13px">Canary Model</strong>
                  <div style="font-size: 12px; margin-top: 4px">5% traffic</div>
                </div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 11px">
                  <div>
                    <strong>P95:</strong> 118ms
                  </div>
                  <div>
                    <strong>CTR:</strong> 3.35%
                  </div>
                  <div>
                    <strong>Errors:</strong> 0.09%
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center">
              <strong style="font-size: 12px">
                Decision: PASS → Ramp to 25%
              </strong>
              <div style="font-size: 11px; margin-top: 4px">
                Latency delta +3ms ✓ CTR lift +0.15% ✓
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Canary exposes new model to small traffic percentage, monitoring
                three dimensions: system reliability, product metrics, and data
                quality
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                System metrics fail fast (minutes); product metrics fail slow
                (hours); canaries must monitor both with appropriate time
                windows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Typical ramp: 1% for 30 min → 5% for 2 hours → 25% for 12 hours
                → 50% → 100%, with automated gates between steps
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                ML models can pass offline tests yet fail in production due to
                training-serving skew, feature bugs, or distribution shift
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
                When explaining canary deployment, cover the three dimensions:
                system metrics (latency, errors), product metrics (CTR), and
                data quality (feature nulls)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mention that offline evaluation cannot catch production failures
                because it does not use live traffic or real feature stores
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Describe a typical ramp schedule with concrete times: 1% for 30
                min, 5% for 2 hours, 25% for 12 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonRampUpStrategiesWhatIsCanaryAnalysisInMlSystems;
