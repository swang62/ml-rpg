import type { Component } from "solid-js";

const LessonFeatureMonitoringStaticVsDynamicBaselinesChoosingYourReferenceDistribution: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Static vs Dynamic Baselines: Choosing Your Reference Distribution
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Baselines Represent
            </p>
            <p style="margin-top: 0">
              Baseline selection fundamentally determines what your monitoring
              system considers normal versus anomalous. The baseline is the
              reference distribution against which live data is compared.
              Choosing incorrectly leads to either missed regressions or
              constant false alarms as natural variation triggers alerts.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Static Baselines
            </p>
            <p style="margin-top: 0">
              A static baseline uses the final training dataset distribution as
              the permanent reference point. Every live window is compared
              against this frozen snapshot from training time. This approach
              simplifies reasoning and excels at regression detection because
              any shift from training is immediately visible. However, static
              baselines struggle with seasonal patterns: holiday traffic, summer
              versus winter behavior, or Monday versus weekend patterns all
              trigger drift alerts even when the model handles them correctly.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Baselines
            </p>
            <p style="margin-top: 0">
              Dynamic baselines adapt over time, comparing current windows
              against recent history (last 7 to 30 days) rather than a fixed
              training snapshot. This approach filters out seasonal patterns and
              natural evolution, only alerting on sudden deviations from recent
              trends. The risk is slow drift: gradual changes that compound over
              months remain undetected because each comparison window looks
              similar to the previous one.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hybrid Approach
            </p>
            <p style="margin-top: 0">
              Production systems often combine both. Static baselines with wide
              thresholds catch major regressions. Dynamic baselines with tight
              thresholds catch sudden anomalies. Periodic comparison of current
              distributions to original training distributions catches slow
              drift that dynamic monitoring misses.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Baseline Refresh Strategy
            </p>
            <p style="margin-top: 0">
              After model retraining, update static baselines to reflect new
              training data. Version baselines alongside model artifacts to
              maintain audit trails and enable rollback comparison when
              investigating production issues.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 12px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                    Static Baseline
                  </strong>
                  <div style="font-size: 11px; margin-bottom: 4px">
                    Training: mean=42.3
                  </div>
                  <div style="font-size: 11px; margin-bottom: 4px">
                    Day 1: mean=43.1 ✓
                  </div>
                  <div style="font-size: 11px; margin-bottom: 4px">
                    Day 14: mean=44.8 ✓
                  </div>
                  <div style="font-size: 11px; margin-bottom: 4px">
                    Day 30: mean=47.2 🔥
                  </div>
                  <div style="font-size: 10px; margin-top: 6px">
                    Catches long-term drift
                    <br />
                    False alarms on seasonality
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                    Dynamic (7-day)
                  </strong>
                  <div style="font-size: 11px; margin-bottom: 4px">
                    Day 1: 42.3 vs 43.1 ✓
                  </div>
                  <div style="font-size: 11px; margin-bottom: 4px">
                    Day 14: 43.8 vs 44.8 ✓
                  </div>
                  <div style="font-size: 11px; margin-bottom: 4px">
                    Day 30: 46.5 vs 47.2 ✓
                  </div>
                  <div style="font-size: 10px; margin-top: 6px">
                    Adapts to slow changes
                    <br />
                    May hide long-term drift
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
                  Static baseline uses frozen training distribution; excels at
                  regression detection and compliance validation but generates
                  false positives under seasonality or growth (streaming
                  platform: 5 to 8% time of day variance causes twice daily
                  alerts)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic baseline uses rolling window (typically 7 or 28 days)
                  as reference; reduces false positives by over 70% for seasonal
                  patterns but can chase drift, hiding gradual degradation over
                  weeks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dual baseline strategy compares live traffic to both static
                  (training) and rolling (7 day) baselines; both firing
                  indicates high confidence incident, only static firing
                  requires investigation of evolution versus regression
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Baseline update cadence: static updated only on retraining
                  (weeks to months), rolling recomputed continuously;
                  marketplace models use 28 day rolling for demand seasonality,
                  1 day rolling for fraud detection urgency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Memory overhead: static baseline is fixed cost (roughly 20 KB
                  per feature per segment), rolling baseline requires
                  maintaining window state (7 days at 1 hour resolution adds 168
                  snapshots, roughly 3.4 MB per feature if storing full
                  histograms)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema validation always uses static baselines: categorical
                  vocabulary changes, unit conversions (Fahrenheit to Celsius),
                  or scale shifts (currency 100x) must breach static baseline to
                  trigger data contract incidents
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
                  Netflix streaming service: rolling 7 day baseline by hour of
                  day handles consumer traffic waves (evening peak 2x morning
                  traffic), static baseline catches model version regressions or
                  upstream pipeline changes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber pricing model: dual baseline with static training
                  distribution (6 month old) and 1 day rolling baseline; sudden
                  city-level demand spike (concert, event) breaches rolling
                  only, long term demographic shift breaches both, triggering
                  retrain
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline: static training baselines stored with feature
                  definitions, used for deployment validation; 28 day rolling
                  baselines for prediction acceptance rate monitoring to handle
                  holiday and summer travel seasonality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureMonitoringStaticVsDynamicBaselinesChoosingYourReferenceDistribution;
