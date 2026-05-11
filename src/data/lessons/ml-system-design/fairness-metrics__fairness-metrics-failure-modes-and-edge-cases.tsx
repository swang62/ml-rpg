import type { Component } from "solid-js";

const LessonFairnessMetricsFairnessMetricsFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Fairness Metrics Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Simpson Paradox in Fairness
            </p>
            <p style="margin-top: 0">
              A model can appear fair in aggregate but be unfair in every
              subgroup. Example: overall hiring rates are equal (50% each for
              men and women). But in engineering, men at 60%, women at 40%. In
              marketing, men at 40%, women at 60%. If more women apply to
              marketing and more men to engineering, aggregates look fair while
              discrimination exists in every department. Always compute metrics
              at multiple granularities.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Intersectionality Blindness
            </p>
            <p style="margin-top: 0">
              Checking gender and race separately misses bias against
              intersectional groups. A model might be fair for women overall and
              for Black applicants overall, but biased against Black women.
              Intersectional groups are smaller. With 10,000 samples: 5,000
              women (sufficient), 1,000 Black applicants (marginal), 200 Black
              women (insufficient for reliable metrics). Prioritize checking
              vulnerable intersections even with limited data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Proxy Variable Leakage
            </p>
            <p style="margin-top: 0">
              You removed race, but zip code is 85% predictive of race. Removed
              gender, but first name is 90% predictive. Models find proxies.
              Detection: train a classifier to predict the protected attribute
              from model features. If AUC exceeds 0.7, significant proxy
              information leaks. Mitigation: adversarial debiasing or feature
              removal guided by proxy detection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feedback Loop Amplification
            </p>
            <p style="margin-top: 0">
              If a biased model approves fewer loans to Group A, Group A
              generates less data, making the model more uncertain, leading to
              fewer approvals. Bias amplifies over time. Detection: track
              metrics over time, not just at deployment. Mitigation: exploration
              mechanisms ensuring minimum representation of all groups in
              positive outcomes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> A single deployment check is
              insufficient. Bias emerges at different granularities, through
              proxies, and amplifies over time. Continuous multi-level
              monitoring is essential.
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
                  Simpson paradox: aggregate fairness can hide subgroup
                  discrimination and vice versa
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Intersectionality: checking gender and race separately misses
                  bias against combined groups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Proxy variables (zip code, names) leak protected information
                  even when explicitly removed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feedback loops amplify bias over time as biased predictions
                  affect future data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single deployment check insufficient: need continuous
                  multi-level monitoring
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
                  Explain Simpson paradox: fair aggregate but biased in every
                  department
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention proxy detection: classifier predicting protected
                  attribute with AUC above 0.7 indicates leakage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFairnessMetricsFairnessMetricsFailureModesAndEdgeCases;
