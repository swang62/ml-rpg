import type { Component } from "solid-js";

const LessonFeatureMonitoringFeatureMonitoringFailureModesSchemaChangesLabelDelaysAndFeedbackLoops: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Monitoring Failure Modes: Schema Changes, Label Delays, and
            Feedback Loops
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Schema and Unit Changes
            </p>
            <p style="margin-top: 0">
              Feature monitoring fails in subtle ways that naive implementations
              miss, leading to either undetected regressions or overwhelming
              alert fatigue. Schema and unit changes masquerade as drift. A
              temperature feature switching from Fahrenheit to Celsius causes
              PSI to spike to 0.8 and K-S tests to reject with p less than
              0.001, but this is a data contract violation, not true concept
              drift. The fix is schema validation gates upstream of drift
              detection that catch type and unit changes before they reach
              statistical monitoring.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Label Delay Blind Spots
            </p>
            <p style="margin-top: 0">
              Ground truth labels arrive hours to weeks after predictions (fraud
              confirmed after investigation, conversion tracked after
              attribution window). During this delay, feature drift monitoring
              operates without outcome signal. A feature could drift while model
              performance appears stable because stale labels mask the impact.
              The mitigation is synthetic evaluation: compare predictions on
              current features against holdout golden datasets with known
              outcomes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feedback Loop Drift
            </p>
            <p style="margin-top: 0">
              Model predictions influence user behavior which generates future
              training data. A recommendation model that promotes certain
              content causes users to engage more with that content, shifting
              future feature distributions toward what the model already favors.
              This creates self fulfilling drift that statistical tests detect
              as anomaly, but the underlying cause is the model itself.
              Distinguishing organic drift from model induced drift requires
              counterfactual analysis and randomized holdouts.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Alert Fatigue
            </p>
            <p style="margin-top: 0">
              Overly sensitive thresholds or too many monitored features
              generate hundreds of daily alerts, causing teams to ignore
              monitoring entirely. The fix is tiered alerting (page for
              critical, ticket for important, log for informational), automatic
              triage that correlates alerts across features, and threshold
              tuning based on historical false positive rates. Target less than
              5 actionable alerts per day per team.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema changes masked as drift: temperature Fahrenheit to
                  Celsius or currency 100x scaling trigger PSI spikes (0.8+) and
                  K-S rejections, but root cause is data contract violation; fix
                  requires schema versioning and unit metadata at feature
                  boundary, not retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multiple hypothesis inflation: 1,000 features across 10
                  segments yield 10,000 tests per window, expecting 500 false
                  positives at p=0.05 under null hypothesis; mitigate with
                  effect size thresholds (PSI &gt; 0.2), minimum sample counts
                  (5k+ events), and alert budgets prioritizing top 20 features
                  by SHAP importance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Label delays create concept drift blind spots: feature
                  distributions stable while P(Y|X) degrades; use proxy signals
                  (prediction drift Wasserstein &gt; 0.1, SHAP shift, acceptance
                  rate drop) for early warning, confirm with delayed labels
                  before automated actions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High cardinality categorical explosion: new category rate
                  spikes during campaigns or product launches; track estimated
                  cardinality via HyperLogLog, cap per category alerts, focus on
                  cohort level business impact rather than per value drift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops create self induced drift: recommender exposure
                  bias shifts item distributions, monitoring compares to
                  training baseline that was itself biased; use counterfactual
                  logging or randomized control traffic for unbiased baseline,
                  deploy with canary comparison dashboards
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data sparsity in low traffic segments: windows with fewer than
                  5k events produce unstable estimates; enforce minimum counts,
                  extend window duration (1 to 6 hours), merge similar cohorts,
                  or fall back to global guardrails for small segments
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
                  Uber currency scaling incident: ride fare feature switched
                  from dollars to cents (100x), PSI spiked to 0.9 across all
                  markets; monitoring paged on-call, root cause analysis found
                  upstream schema migration; fix was schema contract enforcement
                  at feature ingestion, not model rollback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation feedback loop: model promotes popular
                  content, increasing its popularity, causing continuous drift
                  alerts; solution was dual baseline monitoring (static training
                  vs rolling 7 day) plus counterfactual logging with 5%
                  randomized traffic for unbiased distribution tracking
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb pricing label delays: acceptance decisions arrive 24 to
                  72 hours after prediction; feature monitoring stable but
                  conversion rate dropped 15% over 3 days; added prediction
                  drift and approval rate proxy alerts, confirmed with delayed
                  labels before triggering retrain, reducing detection lag from
                  72 to 12 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureMonitoringFeatureMonitoringFailureModesSchemaChangesLabelDelaysAndFeedbackLoops;
