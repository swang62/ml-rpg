import type { Component } from "solid-js";

const LessonPositionBiasFeedbackLoopsFailureModesPropensityErrorsFormatChangesAndDelayedLoops: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Propensity Errors, Format Changes, and Delayed Loops
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROPENSITY ESTIMATION ERRORS
            </p>
            <p style="margin-top: 0">
              If propensity estimates are wrong, IPS makes things worse. Common
              causes: using production model propensity when the actual model
              was different (training serving skew), not accounting for position
              randomization policy, ignoring user level personalization in
              propensity calculation. Validate propensity by comparing estimated
              versus empirical distribution of impressions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DISPLAY FORMAT CHANGES
            </p>
            <p style="margin-top: 0">
              Position bias curves change when display format changes. Moving
              from a list to a grid changes which positions get attention.
              Adding a carousel above the main list shifts all position curves
              down. If you apply an old position model to a new format,
              debiasing is wrong. Remeasure position curves after any UI change
              and retrain position models.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Warning:</strong> Mobile and desktop have different
              position bias curves. A model trained on desktop data will
              misbehave on mobile traffic. Segment by device type.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              EXPLORATION GONE WRONG
            </p>
            <p style="margin-top: 0">
              Too much exploration (over 10%) visibly hurts user experience and
              triggers complaints. Too little (under 1%) leaves you blind.
              Unbalanced exploration (always exploring the same item types)
              creates new biases. Monitor exploration coverage: are all item
              categories getting explored proportionally? Is exploration
              distributed across user segments?
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DELAYED FEEDBACK LOOPS
            </p>
            <p style="margin-top: 0">
              Some feedback loops take months to manifest. The model slowly
              narrows its recommendations, but daily metrics look fine. By the
              time engagement drops, the problem is severe. Track catalog
              coverage over 90 day windows. If coverage trends down
              consistently, you have a slow feedback loop even if daily metrics
              are stable.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px">
                <strong style="font-size: 15px">
                  Common Failure Modes in Production
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Training Serving Skew</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Tree models learn: if pos &lt; 3 then +2.0
                  </div>
                  <div style="font-size: 11px">
                    At inference: pos removed → rank collapses
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Context Mismatch</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Desktop curve: pos 5 at 40% visibility
                  </div>
                  <div style="font-size: 11px">
                    Mobile: pos 5 below fold at 8% visibility
                  </div>
                  <div style="font-size: 11px">
                    Reusing curve → 32% miscalibration
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Data Drift</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pre shift: 60 sec sessions, curve A
                  </div>
                  <div style="font-size: 11px">
                    Post shift: 180 sec sessions, scroll 3x deeper
                  </div>
                  <div style="font-size: 11px">
                    Old curve undercorrects by 18 to 40%
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
                  Wrong propensity makes IPS worse: validate by comparing
                  estimated vs empirical impression distribution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  UI changes invalidate position curves: list to grid, adding
                  carousel, all require remeasurement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mobile and desktop have different position bias - segment by
                  device type
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exploration 10%+ hurts UX visibly; under 1% leaves you blind;
                  monitor category coverage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Slow feedback loops take months: track 90-day catalog coverage
                  trends even when daily metrics look fine
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
                  Describe training-serving skew: production model changed but
                  training still uses old propensity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain format change: list to grid shifts attention from
                  position 5 to position 6
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss delayed detection: daily engagement stable but 90-day
                  catalog coverage dropping 2% per month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPositionBiasFeedbackLoopsFailureModesPropensityErrorsFormatChangesAndDelayedLoops;
