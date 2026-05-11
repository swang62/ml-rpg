import type { Component } from "solid-js";

const LessonHoldoutGroupsHoldoutAssignmentDeterministicHashingAndCohortManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Holdout Assignment: Deterministic Hashing and Cohort Management
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
                <strong>Holdout assignment</strong> uses deterministic hashing
                with a fixed salt to permanently assign users to holdout or
                production. The assignment must be stable across months/years.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Deterministic Assignment
            </p>
            <p style="margin-top: 0">
              Use{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                hash(user_id + "holdout_v1") mod 100 &lt; 5
              </code>{" "}
              for 5% holdout. The salt "holdout_v1" stays constant indefinitely.
              Unlike experiments, holdout salt never changes - the same users
              stay in holdout forever.
            </p>
            <p>
              This differs from experiment assignment where salt changes per
              experiment. Holdout salt is permanent infrastructure, not per-test
              configuration.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cohort Management
            </p>
            <p style="margin-top: 0">
              New users joining after holdout creation are assigned to holdout
              or production based on the same hash. This maintains 5% holdout
              ratio over time. User churn affects both groups equally,
              maintaining balance.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> For time-limited holdouts (6-12
              month refresh), change the salt ("holdout_v2") to reshuffle. This
              creates a fresh random assignment, but loses continuity of
              long-term measurement.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Independence from Experiments
            </p>
            <p style="margin-top: 0">
              Holdout assignment must be independent from experiment assignment.
              Use different salt families. A user in holdout should still be
              randomly assigned to experiment buckets (but never see the
              treatment since features are gated on non-holdout status).
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">User ID + Salt</strong>
                  <div style="margin-top: 6px; font-size: 12px; font-family: monospace">
                    hash("user_12345" + "Q1_2024_universal")
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Hash to Range [0, 99]</strong>
                  <div style="margin-top: 6px; font-size: 12px">Result: 73</div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">Holdout</strong>
                    <div style="margin-top: 4px; font-size: 12px">
                      0 to 4<br />
                      (5%)
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">Shipped</strong>
                    <div style="margin-top: 4px; font-size: 12px">
                      5 to 99
                      <br />
                      (95%)
                      <br />✓ 73
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
                  Use deterministic hash with fixed salt: hash(user_id +
                  "holdout_v1") mod 100 &lt; 5 for 5%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Holdout salt is permanent infrastructure, unlike experiment
                  salts that change per test
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  New users assigned by same hash, maintaining ratio; user churn
                  affects both groups equally
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Holdout assignment must be independent from experiment
                  assignment (different salt families)
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
                  When explaining assignment: describe permanent salt
                  (holdout_v1) that never changes unlike experiment salts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For refresh: change salt to v2 for new random assignment, but
                  loses measurement continuity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHoldoutGroupsHoldoutAssignmentDeterministicHashingAndCohortManagement;
