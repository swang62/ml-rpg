import type { Component } from "solid-js";

const LessonWhatIsRandomizationAndStickyBucketingInExperiments: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Randomization and Sticky Bucketing in Experiments?
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
                <strong>Randomization</strong> assigns users to experiment
                variants using a deterministic hash.{" "}
                <strong>Sticky bucketing</strong> ensures the same user always
                sees the same variant throughout the experiment.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Deterministic Hashing
            </p>
            <p style="margin-top: 0">
              Instead of flipping a coin per request, compute{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                hash(user_id + experiment_id) mod 100
              </code>
              . Result 0-49 means control, 50-99 means treatment. Same inputs
              always produce same output, so User 12345 in Experiment ABC always
              lands in the same bucket.
            </p>
            <p>
              Including experiment_id prevents cross-experiment correlation.
              Without it, User 12345 would always be in control (or treatment)
              across all experiments, creating systematic bias.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Stable Unit Identifiers
            </p>
            <p style="margin-top: 0">
              The unit ID must persist across sessions. Logged-in user IDs are
              most reliable. For logged-out users, use device fingerprint plus
              client ID stored in local storage. Accept that 5-15% of traffic
              will have inconsistent assignment due to storage clearing.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Unstable identifiers (IP,
              session ID) cause users to flip between variants, corrupting your
              data. Stable identifiers work cross-session but may not work
              cross-device.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Assignment Timing
            </p>
            <p style="margin-top: 0">
              Assign at first exposure to the feature, not at page load. If your
              experiment affects checkout, assign at checkout page. This reduces
              dilution from users who never reach the affected feature.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">User ID: 847291</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Experiment ID: rec_model_v2
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Hash Function</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    hash(847291, rec_model_v2) → 0.6431
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Control</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      0.0 to 0.5
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Treatment</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      0.5 to 1.0
                    </div>
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Assigned: Treatment</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Sticky across all sessions
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
                  Deterministic hashing (user_id + experiment_id) ensures same
                  user always sees same variant across sessions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Including experiment_id in hash prevents cross-experiment
                  correlation that would bias simultaneous tests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Stable identifiers (user IDs &gt; device IDs &gt; cookies) are
                  critical; unstable IDs corrupt results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Assign at first exposure to the feature, not at page load, to
                  reduce dilution
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
                  When explaining bucketing: describe hash(user_id +
                  experiment_id) mod 100, emphasizing determinism for
                  consistency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For logged-out users: mention device fingerprint + client ID,
                  accepting 5-15% inconsistent assignment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonWhatIsRandomizationAndStickyBucketingInExperiments;
