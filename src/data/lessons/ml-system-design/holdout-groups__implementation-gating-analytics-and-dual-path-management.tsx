import type { Component } from "solid-js";

const LessonHoldoutGroupsImplementationGatingAnalyticsAndDualPathManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementation: Gating, Analytics, and Dual Path Management
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
                <strong>Holdout implementation</strong> requires feature gating,
                dual-path code management, and analytics infrastructure to track
                both experiences over extended periods.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Gating
            </p>
            <p style="margin-top: 0">
              Every feature check becomes:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                if (!isHoldout(user) &amp;&amp; featureEnabled(feature, user))
              </code>
              . Holdout check must come first and short-circuit. This pattern
              ensures holdout users never see new features regardless of
              experiment assignment.
            </p>
            <p>
              Centralize the isHoldout check in a single service. Every feature
              team imports this check rather than implementing their own. This
              prevents bugs where one team forgets the holdout check.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dual Path Management
            </p>
            <p style="margin-top: 0">
              Old code paths must be maintained for holdout users. When you
              refactor the recommendation system, holdout users still need the
              old recommender. This creates maintenance burden: bug fixes in
              both paths, testing both paths, potential divergence over time.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Some changes cannot have dual
              paths (infrastructure migrations, API deprecations). These break
              holdout validity. Accept that holdout measures application-layer
              changes only, not infrastructure.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Analytics Infrastructure
            </p>
            <p style="margin-top: 0">
              Track holdout status on every event. Build dashboards comparing
              holdout vs production on key long-term metrics. Set up automated
              alerts when holdout deviates significantly. Report weekly/monthly
              on cumulative impact.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Request Arrives</strong>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    1. Check Universal Holdout
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    hash(user_id + salt) → 5% held out
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    2. Check Feature Holdouts
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Per feature logic if not in universal
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">
                    3. Normal Feature Flags
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
                  Feature check pattern: if (!isHoldout(user) &amp;&amp;
                  featureEnabled(feature, user)) - holdout check first
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Centralize isHoldout check in single service to prevent teams
                  forgetting the check
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Old code paths must be maintained for holdout users, creating
                  dual maintenance burden
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Infrastructure changes (migrations, API deprecations) cannot
                  have dual paths, breaking holdout validity
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
                  When implementing: describe centralized isHoldout service that
                  all feature teams import
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For infrastructure: explain that holdout measures
                  application-layer changes only, not infrastructure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHoldoutGroupsImplementationGatingAnalyticsAndDualPathManagement;
