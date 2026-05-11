import type { Component } from "solid-js";

const LessonDifferentialPrivacyFailureModesAndEdgeCasesInDifferentialPrivacy: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Differential Privacy
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>DP Failure Modes:</strong> Differential privacy
              implementations fail through budget exhaustion, sensitivity
              miscalculation, composition attacks, and auxiliary information
              attacks. Each failure can completely negate privacy guarantees
              while appearing to work correctly.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Budget Exhaustion
            </p>
            <p>
              Every DP query consumes privacy budget. Run enough queries and the
              cumulative epsilon becomes so large that privacy is meaningless.
              Example: 1000 queries each with epsilon=0.01 sum to epsilon=10,
              which provides almost no privacy protection. Worse: an attacker
              who can submit queries directly can deliberately exhaust the
              budget. Mitigation: strict query limits, per-user rate limiting,
              budget reset policies, and monitoring for unusual query patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sensitivity Miscalculation
            </p>
            <p>
              Noise must be calibrated to query sensitivity (how much one record
              can change the output). If sensitivity is underestimated, noise is
              too small and privacy leaks. Common mistakes: assuming bounded
              input ranges that are not actually enforced, ignoring that the
              same record might appear in multiple groups (join queries), or
              using average sensitivity when worst-case is required. Example:
              salary sum with assumed max 200,000 USD. If someone earns
              1,000,000 USD, sensitivity is 5x higher than assumed, and the
              noise provides 5x less privacy.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Auxiliary Information Attacks
            </p>
            <p>
              DP protects against inference from query results alone. But
              attackers may have auxiliary information. If an attacker knows 99
              of 100 records in a group, a DP count of that group reveals the
              100th record with high confidence despite the noise. DP does not
              protect against this—it only bounds what can be learned from the
              DP release itself. Combining DP releases with external data
              sources can circumvent privacy guarantees. Defense: minimize
              auxiliary information through data minimization and access
              controls.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Testing Strategy:</strong> Validate DP implementations
              with adversarial testing: attempt membership inference, try to
              reconstruct individual records, test edge cases with extreme
              values. If attacks succeed on test data, production privacy is
              compromised.
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
                  Budget exhaustion: 1000 queries at epsilon=0.01 sums to
                  epsilon=10 (no protection)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sensitivity miscalculation: underestimated noise provides less
                  privacy than claimed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Auxiliary information can circumvent DP guarantees despite
                  correct implementation
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
                  Salary sum with assumed 200K max: 1M earner creates 5x less
                  protection than claimed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Attacker knowing 99 of 100 records can infer the 100th despite
                  DP noise
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDifferentialPrivacyFailureModesAndEdgeCasesInDifferentialPrivacy;
