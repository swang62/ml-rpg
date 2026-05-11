import type { Component } from "solid-js";

const LessonHoldoutGroupsLongTermMeasurementAndCumulativeImpact: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Long-term Measurement and Cumulative Impact
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Long-term holdout measurement</strong> reveals
                cumulative experiment impact through metrics like annual
                retention, lifetime value, and total engagement that short
                experiments cannot capture.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Metrics That Require Holdouts
            </p>
            <p style="margin-top: 0">
              12-month retention, lifetime value (LTV), annual subscription
              renewal rate, cumulative support contacts. These cannot be
              measured in 2-4 week experiments. Holdouts running 6-12+ months
              reveal whether cumulative optimizations actually improve long-term
              outcomes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cumulative Impact Measurement
            </p>
            <p style="margin-top: 0">
              Compare holdout to production monthly. Track the delta over time.
              If experiments are net positive, the gap should widen (production
              pulls ahead). If experiments cause cumulative harm, the gap
              narrows or inverts. This is the primary signal for whether your
              experimentation program creates value.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Early experiments often show
              cumulative benefit. Over years, diminishing returns may appear.
              Holdouts detect when experimentation shifts from value-creating to
              value-neutral or harmful.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Reporting and Decision Making
            </p>
            <p style="margin-top: 0">
              Report holdout results quarterly to leadership. Use findings to
              justify experimentation investment, adjust guardrail thresholds,
              or flag concerning trends. Holdout data informs meta-decisions
              about how to experiment, not just what to ship.
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
                  Holdouts measure 12-month retention, LTV, renewal rates
                  impossible in short experiments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Track production vs holdout delta over time: widening gap =
                  experiments create value
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Holdouts detect when experimentation shifts from
                  value-creating to value-neutral or harmful
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Report quarterly to leadership; informs meta-decisions about
                  experimentation strategy
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
                  When measuring cumulative impact: track monthly delta between
                  holdout and production on LTV/retention
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For interpretation: widening gap means experiments create
                  value; narrowing gap means diminishing returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHoldoutGroupsLongTermMeasurementAndCumulativeImpact;
