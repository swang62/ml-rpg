import type { Component } from "solid-js";

const LessonPredictionDriftSliceLevelMonitoringAndDimensionalityManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Slice Level Monitoring and Dimensionality Management
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY SLICE-LEVEL MONITORING
            </p>
            <p>
              Aggregate prediction drift can be stable while specific segments
              experience significant drift. A recommendation model might
              maintain stable overall predictions while predictions for new
              users drift significantly. Monitoring only aggregates misses this.
            </p>
            <p>
              Slices are meaningful subsets of your population: user segments
              (new vs returning), product categories, geographic regions, device
              types. Choose slices aligned with business priorities and where
              you expect differential behavior.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DIMENSIONALITY CHALLENGES
            </p>
            <p>
              Monitoring every possible slice creates combinatorial explosion. 5
              dimensions with 10 values each = 100,000 possible slices. You
              cannot monitor all of them individually.
            </p>
            <p>
              <strong>Prioritization strategies:</strong>
            </p>
            <p>
              • Monitor high-business-impact slices manually (top 10 customer
              segments, major product categories)
            </p>
            <p>
              • Use anomaly detection to surface unusual slices automatically
            </p>
            <p>
              • Aggregate related slices (all European countries vs. individual
              countries)
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AUTOMATIC SLICE DISCOVERY
            </p>
            <p>
              Instead of defining slices manually, use algorithms to discover
              which slices have unusual drift:
            </p>
            <p>
              <strong>Decision tree slicing:</strong> Train a decision tree to
              predict whether a sample is from baseline or current period.
              Leaves with high purity indicate slices with significant drift.
            </p>
            <p>
              <strong>Subgroup discovery:</strong> Systematically search for
              subgroups where drift exceeds threshold. Beam search or rule-based
              methods can enumerate candidate slices efficiently.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SAMPLE SIZE CONSIDERATIONS
            </p>
            <p>
              Small slices have high variance. Detecting drift in a slice with
              100 samples is statistically unreliable. Set minimum sample size
              thresholds (typically 500-1000) below which you do not alert on
              drift.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> More granular slicing catches
              more localized issues but increases false positive rate and
              compute cost. Start coarse, add granularity for high-priority
              segments.
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
                  Aggregate drift can hide segment-specific drift; monitor
                  high-business-impact slices manually
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dimensionality explosion: 5 dimensions × 10 values = 100K
                  slices; prioritize, aggregate, or use auto-discovery
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automatic discovery: decision tree slicing, subgroup
                  discovery; minimum 500-1000 samples per slice for reliability
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
                  Interview Tip: Explain dimensionality challenge with concrete
                  numbers: dimensions × values = combinatorial explosion.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe decision tree slicing: predict
                  baseline vs current, leaves show drifting slices.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPredictionDriftSliceLevelMonitoringAndDimensionalityManagement;
