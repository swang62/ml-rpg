import type { Component } from "solid-js";

const LessonExperimentDesignHowDoesEventTriggeredAssignmentReduceNoise: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Does Event Triggered Assignment Reduce Noise?
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
                <strong>Event-triggered assignment</strong> restricts
                randomization to users who reach a qualifying event, excluding
                users who could never be affected by the treatment.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Dilution Problem
            </p>
            <p style="margin-top: 0">
              Top-of-funnel assignment randomizes all users on first request.
              For a checkout experiment, this includes users who never browse
              products, never add to cart, never reach checkout. These users
              contribute zero signal but add variance, diluting your ability to
              detect effects.
            </p>
            <p>
              If only 5% of users reach checkout, you are measuring the
              treatment effect on 100% of users but only 5% could possibly be
              affected. The 95% dilution multiplies your required sample size by
              roughly 20x.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Triggering at the Right Moment
            </p>
            <p style="margin-top: 0">
              For a checkout experiment, trigger assignment when user reaches
              checkout page. For a recommendation algorithm, trigger at first
              recommendation display. The trigger event should be the last
              moment before treatment exposure.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> The trigger event must happen
              BEFORE the user can see the treatment. If you assign after showing
              the treatment, you introduce selection bias - users who bounced
              immediately are never assigned.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Trade-offs
            </p>
            <p style="margin-top: 0">
              Event-triggered experiments have smaller sample (only triggered
              users) but cleaner signal. They cannot measure upstream effects
              (does treatment change funnel entry rate?). Use top-of-funnel
              assignment when measuring total business impact; use
              event-triggered when measuring feature-specific effects.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; gap: 16px">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="text-align: center; font-weight: bold; font-size: 13px; margin-bottom: 4px">
                    Top of Funnel
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">All Users</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      646,290 samples
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Randomize</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      High noise
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Duration</strong>
                    <div style="font-size: 11px; margin-top: 4px; font-weight: bold">
                      181 days
                    </div>
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="text-align: center; font-weight: bold; font-size: 13px; margin-bottom: 4px">
                    Event Triggered
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Add to Cart</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      29,502 samples
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Randomize</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Low noise
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold; text-align: center">
                    ↓
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 12px">Duration</strong>
                    <div style="font-size: 11px; margin-top: 4px; font-weight: bold">
                      41 days
                    </div>
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
                  Top-of-funnel assignment dilutes signal by including users who
                  never encounter the treatment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If only 5% reach the feature, 95% dilution multiplies required
                  sample by ~20x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trigger at the last moment before treatment exposure to
                  maximize signal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event-triggered experiments cannot measure upstream funnel
                  effects
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
                  When asked about dilution: explain that 5% checkout rate means
                  95% dilution, 20x sample multiplier
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For trigger timing: emphasize assigning BEFORE treatment
                  exposure to avoid selection bias
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonExperimentDesignHowDoesEventTriggeredAssignmentReduceNoise;
