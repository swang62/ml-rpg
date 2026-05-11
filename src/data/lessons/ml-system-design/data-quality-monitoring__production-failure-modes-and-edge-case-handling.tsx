import type { Component } from "solid-js";

const LessonDataQualityMonitoringProductionFailureModesAndEdgeCaseHandling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Failure Modes and Edge Case Handling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              UPSTREAM PIPELINE FAILURES
            </p>
            <p>
              ML features depend on upstream data pipelines. When an upstream
              job fails silently (produces wrong data without errors), features
              become corrupted. The ML model sees garbage and produces garbage
              predictions.
            </p>
            <p>
              <strong>Detection:</strong> Monitor upstream job completion and
              data freshness. Set expectations on feature staleness. A feature
              that should update hourly but has not updated in 3 hours indicates
              pipeline failure.
            </p>
            <p>
              <strong>Response:</strong> Fall back to cached or default values.
              Alert data engineering. Block model serving if critical features
              are unavailable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SCHEMA EVOLUTION ISSUES
            </p>
            <p>
              Upstream data schemas change: new columns added, columns renamed,
              types changed. If ML pipelines are not updated, they may read
              wrong columns or fail to parse.
            </p>
            <p>
              <strong>Detection:</strong> Validate schema at ingestion. Check
              column names, types, and cardinality against expectations. Fail
              fast when schema violations occur.
            </p>
            <p>
              <strong>Prevention:</strong> Use schema registries. Require
              backward compatibility for schema changes. Version schemas and
              feature definitions together.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CARDINALITY EXPLOSION
            </p>
            <p>
              Categorical features can have new values appear in production that
              were not in training. A country feature trained on 50 countries
              suddenly sees traffic from 200 countries. Unknown categories cause
              prediction errors or silent degradation.
            </p>
            <p>
              <strong>Detection:</strong> Monitor cardinality over time. Alert
              when new categories appear. Track percentage of requests with
              unknown categories.
            </p>
            <p>
              <strong>Response:</strong> Map unknown categories to an{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                OTHER
              </code>{" "}
              bucket. Retrain periodically to incorporate new categories. For
              critical features, fail requests with unknown categories.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GRADUAL DEGRADATION
            </p>
            <p>
              Not all failures are sudden. Data quality can degrade gradually:
              null rates increasing 0.5% per week, feature means drifting
              slowly. By the time anyone notices, significant damage is done.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Comprehensive monitoring catches
              more issues but costs more and produces more alerts. Focus
              monitoring intensity on features with highest business impact.
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
                  Upstream failures: monitor job completion and feature
                  freshness; fall back to cached values; block serving if
                  critical
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution: validate at ingestion against expectations;
                  use schema registries; version together with features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cardinality explosion: new categories in production cause
                  errors; map unknown to OTHER bucket; retrain to incorporate
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
                  Interview Tip: Explain how upstream pipeline failures
                  propagate silently to model predictions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe handling unknown categorical values:
                  OTHER bucket, alerting, periodic retraining.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityMonitoringProductionFailureModesAndEdgeCaseHandling;
