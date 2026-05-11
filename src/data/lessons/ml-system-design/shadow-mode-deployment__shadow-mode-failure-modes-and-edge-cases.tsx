import type { Component } from "solid-js";

const LessonShadowModeDeploymentShadowModeFailureModesAndEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Shadow Mode Failure Modes and Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Shadow Mode Pitfalls:</strong> Shadow validation can give
              false confidence when the shadow environment does not accurately
              represent production, when comparison metrics are misleading, or
              when side effects are not properly isolated.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Environment Mismatch
            </p>
            <p>
              Shadow may not match production exactly. Common mismatches:
              different feature store versions (shadow reads stale features),
              different timeout settings (shadow has generous timeouts that
              production will not have), different hardware (shadow on CPU while
              production uses GPU), or different traffic distribution (if shadow
              only sees sampled traffic). A model that performs well in shadow
              may fail in production due to these environmental differences.
              Audit shadow setup against production configuration before
              trusting results.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Misleading Comparison Metrics
            </p>
            <p>
              High agreement rate between shadow and production does not mean
              the shadow model is good—it might mean both models make the same
              mistakes. If production model has 80% accuracy and shadow agrees
              95% of the time, shadow accuracy is roughly 80%, not 95%. Compare
              shadow predictions against ground truth (actual outcomes), not
              just against production predictions. Also track: cases where
              shadow and production disagree and shadow was right (improvement),
              versus disagree and shadow was wrong (regression).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Hidden Side Effects
            </p>
            <p>
              Models can have side effects beyond predictions. A recommendation
              model might write to a user preference cache. A fraud model might
              trigger downstream alerts. If shadow model executes these side
              effects, it can corrupt state or cause duplicate actions. Shadow
              must be truly read-only: mock external calls, disable writes,
              ensure no downstream systems react to shadow outputs. Audit all
              code paths the model can trigger, not just the prediction return
              value.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Validation Checklist:</strong> Before trusting shadow
              results: (1) verify environment matches production, (2) compare
              against ground truth not just production, (3) confirm all side
              effects are disabled, (4) test with production-representative
              traffic.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">⚠️ Side Effect Failure</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Shadow calls billing API → Double charges users
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">⚠️ State Divergence</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Cold cache in shadow → 200ms vs 80ms live (false alarm)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">⚠️ Sampling Bias</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Only mirror US traffic → Miss APAC latency issues
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">⚠️ Label Censoring</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    7 day conversion window → Early metrics misleading
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">✓ Mitigation</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Read only credentials + Cache warmup + Stratified sampling +
                    Time windowed joins
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
                  Environment mismatch (features, timeouts, hardware)
                  invalidates shadow results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High agreement with production does not mean good
                  accuracy—compare against ground truth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow must be read-only: mock external calls, disable writes,
                  no downstream triggers
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
                  95% agreement with 80% accurate production model means 80%
                  shadow accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommendation model writing to preference cache corrupts
                  state if not disabled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonShadowModeDeploymentShadowModeFailureModesAndEdgeCases;
