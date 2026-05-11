import type { Component } from "solid-js";

const LessonDataDriftDetectionFailureModesAndEdgeCasesInProductionDriftDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Production Drift Detection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FALSE POSITIVES: EXPECTED VARIATION
            </p>
            <p>
              The most common failure: alerting on normal variation. Daily
              patterns, weekly cycles, seasonal effects, and random sampling
              noise can trigger drift alerts even when nothing is wrong.
            </p>
            <p>
              Mitigation: establish baseline variability. Track drift metrics
              over time. Set thresholds based on historical percentiles (e.g.,
              alert only when drift exceeds 99th percentile of historical
              values). Account for known patterns (weekends, holidays) in
              baseline.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FALSE NEGATIVES: MISSED DRIFT
            </p>
            <p>
              <strong>Segment-level drift:</strong> Aggregate drift metrics may
              be stable while specific segments drift significantly. A user
              segment comprising 5% of traffic could drift 10x normal levels
              without moving aggregate metrics.
            </p>
            <p>
              <strong>Feature interaction drift:</strong> Individual features
              may be stable, but their joint distribution changes. Feature A and
              Feature B both stable individually, but their correlation shifts.
              Most drift detection misses this.
            </p>
            <p>
              Mitigation: monitor segment-level metrics for high-priority
              segments. For feature interactions, monitor prediction
              distribution (captures joint effects) alongside individual
              features.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA QUALITY MASQUERADING AS DRIFT
            </p>
            <p>
              Upstream pipeline failures can look like drift. A feature that
              suddenly becomes all zeros is not drift—it is a bug. A feature
              with missing values filled incorrectly changes distribution
              without real-world change.
            </p>
            <p>
              Distinguish drift from bugs: check data quality metrics (null
              rates, cardinality, value ranges) before investigating drift. A
              sudden spike in nulls is a pipeline issue, not drift.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THRESHOLD SENSITIVITY
            </p>
            <p>
              Thresholds that are too tight create alert fatigue. Thresholds too
              loose miss real drift. There is no universal right threshold—it
              depends on feature stability, business impact of drift, and
              tolerance for false alarms.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Start with loose thresholds and
              tighten based on experience. Alert fatigue is often worse than
              missed drift—exhausted teams ignore all alerts.
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
                  False positives from daily/weekly/seasonal patterns; set
                  thresholds based on historical percentiles, not fixed values
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segment-level and feature interaction drift can be missed by
                  aggregate metrics; monitor prediction distribution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distinguish drift from data quality bugs: check null rates,
                  cardinality, value ranges first
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
                  Interview Tip: Explain segment-level drift—5% of users can
                  drift significantly without moving aggregates.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe how to distinguish drift from pipeline
                  bugs using data quality checks.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataDriftDetectionFailureModesAndEdgeCasesInProductionDriftDetection;
