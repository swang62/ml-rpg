import type { Component } from "solid-js";

const LessonDataQualityMonitoringWhatIsDataQualityMonitoringInMlSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Data Quality Monitoring in ML Systems?
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
                <strong>Data quality monitoring</strong> validates that input
                data meets expected standards before reaching ML models,
                catching issues like missing values, schema violations, and
                value range anomalies.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY DATA QUALITY MATTERS
            </p>
            <p>
              ML models are only as good as their data. A model trained on clean
              data will fail silently when fed garbage. Unlike traditional
              software that crashes on bad input, ML models produce
              predictions—they just produce wrong predictions.
            </p>
            <p>
              Data quality issues are the leading cause of ML system failures in
              production. Studies show 60-80% of ML pipeline failures trace back
              to data issues: missing features, schema changes, value range
              violations, or upstream pipeline failures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              QUALITY DIMENSIONS
            </p>
            <p>
              <strong>Completeness:</strong> Are all expected values present?
              Null rates, missing features, partial records.
            </p>
            <p>
              <strong>Consistency:</strong> Do values follow expected formats
              and constraints? Categorical values match expected set, numerical
              values in valid ranges.
            </p>
            <p>
              <strong>Timeliness:</strong> Is data fresh enough? Stale data
              (features computed on old data) can be as harmful as missing data.
            </p>
            <p>
              <strong>Accuracy:</strong> Do values represent reality? Hardest to
              measure—requires ground truth comparison or domain knowledge.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA QUALITY VS DATA DRIFT
            </p>
            <p>
              Data quality and data drift are related but distinct. Data quality
              issues are bugs—the data is wrong. Data drift is the world
              changing—the data is correct but different from training. A
              feature becoming all nulls is a quality issue. A feature
              distribution shifting because user behavior changed is drift.
            </p>
            <p>
              Different responses: quality issues need bug fixes; drift needs
              model adaptation. Detecting which you are dealing with is crucial
              for taking the right action.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Data quality monitoring is your
              first line of defense. Catch bad data before it reaches the model,
              rather than debugging wrong predictions later.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 10px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Metrics</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Volume, Missingness
                      <br />
                      Distribution Shifts
                      <br />
                      Freshness Lag
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Metadata</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Schema Changes
                      <br />
                      Job Runtime
                      <br />
                      Backfill Markers
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Lineage</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Upstream Sources
                      <br />
                      Downstream Impact
                      <br />
                      Column Transforms
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Alert with Context</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    PSI 0.25 on user_age feature
                    <br />
                    Affects 3 models, 2M users
                    <br />
                    Upstream job XYZ schema change
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
                  60-80% of ML pipeline failures trace to data issues: missing
                  features, schema changes, value range violations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quality dimensions: completeness (nulls), consistency
                  (formats), timeliness (freshness), accuracy (correctness)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Quality issues are bugs needing fixes; drift is the world
                  changing needing model adaptation—distinguish them
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
                  Interview Tip: Explain why ML models fail silently on bad
                  data—they produce predictions, just wrong ones.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Distinguish data quality from data drift: nulls
                  = quality issue; distribution shift = drift.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityMonitoringWhatIsDataQualityMonitoringInMlSystems;
