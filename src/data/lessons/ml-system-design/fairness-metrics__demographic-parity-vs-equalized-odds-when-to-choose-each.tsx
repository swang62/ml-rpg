import type { Component } from "solid-js";

const LessonFairnessMetricsDemographicParityVsEqualizedOddsWhenToChooseEach: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Demographic Parity vs Equalized Odds: When to Choose Each
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Fundamental Tension
            </p>
            <p style="margin-top: 0">
              Demographic parity and equalized odds cannot both be satisfied
              simultaneously (except in trivial cases). This is mathematically
              proven: if base rates differ between groups, achieving one metric
              necessarily violates the other. If 60% of Group A qualifies and
              40% of Group B qualifies, equal approval rates means different
              error rates, and vice versa. You must choose.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Demographic Parity
            </p>
            <p style="margin-top: 0">
              <strong>Historical bias dominates:</strong> If past data reflects
              systemic discrimination rather than true qualification
              differences. Hiring from eras when groups were excluded does not
              reflect ability. <strong>Base rates are unreliable:</strong> If
              observed differences stem from biased measurement or unequal
              access rather than true differences.{" "}
              <strong>Representation matters:</strong> When diverse
              representation itself creates value (jury selection, political
              roles), equal rates may be the goal regardless of qualifications.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Equalized Odds
            </p>
            <p style="margin-top: 0">
              <strong>Labels are trustworthy:</strong> If ground truth labels
              are accurate (medical diagnoses confirmed by tests, fraud
              confirmed by investigation), equalized odds ensures the model does
              not harm one group. <strong>Individual fairness matters:</strong>{" "}
              Equal error rates mean equally qualified people have equal
              chances. <strong>Base rate differences are legitimate:</strong> If
              qualification differences reflect genuine factors (age correlates
              with health conditions), forcing equal rates would be
              inappropriate.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework
            </p>
            <p style="margin-top: 0">
              Ask: Do you trust the labels? Biased labels make equalized odds
              perpetuate bias. Do you trust the base rates? If observed
              differences reflect true differences, demographic parity penalizes
              qualified individuals. Production systems often use relaxed
              versions tolerating 10-20% deviation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The choice between metrics is
              philosophical, not technical. What does fair mean in your context?
              Different stakeholders may reasonably disagree.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Demographic Parity</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    ✓ Allocation fairness
                    <br />✓ Real time monitoring
                    <br />✓ No labels needed
                    <br />✗ Ignores qualification
                    <br />✗ Accuracy loss 2 to 10%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Equalized Odds</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    ✓ Procedural fairness
                    <br />✓ Equal error rates
                    <br />✓ Respects qualification
                    <br />✗ Requires delayed labels
                    <br />✗ Breaks calibration
                  </div>
                </div>
                <div style="grid-column: 1 / -1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Cannot achieve all three: Parity + Equalized Odds +
                    Calibration
                  </strong>
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
                  Both metrics cannot be satisfied simultaneously when base
                  rates differ (impossibility theorem)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose demographic parity when: historical bias, unreliable
                  base rates, representation value
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose equalized odds when: trustworthy labels, individual
                  fairness, legitimate base rate differences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two key questions: Do you trust the labels? Do you trust the
                  base rates?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production often uses relaxed versions tolerating 10-20%
                  deviation from exact equality
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
                  Frame choice as philosophical: what does fair mean in your
                  context?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention impossibility theorem proves both cannot be satisfied
                  simultaneously
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFairnessMetricsDemographicParityVsEqualizedOddsWhenToChooseEach;
