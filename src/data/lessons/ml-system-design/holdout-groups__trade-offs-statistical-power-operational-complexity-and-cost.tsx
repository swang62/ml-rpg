import type { Component } from "solid-js";

const LessonHoldoutGroupsTradeOffsStatisticalPowerOperationalComplexityAndCost: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Statistical Power, Operational Complexity, and Cost
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
                <strong>Holdout trade-offs</strong> balance measurement power
                against the cost of withholding improvements from users. Every
                holdout user misses shipped features and represents lost value.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Statistical Power
            </p>
            <p style="margin-top: 0">
              Larger holdout = more power to detect differences. With 5% holdout
              (50K users on 1M total), you can detect 5% relative differences in
              long-term metrics. With 1% holdout (10K users), you need 10%+
              differences to detect reliably. Power depends on holdout size,
              metric variance, and observation period.
            </p>
            <p>
              High-variance metrics (revenue, LTV) need larger holdouts.
              Low-variance metrics (retention) can work with smaller ones.
              Calculate required holdout size based on your most important
              long-term metric.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Opportunity Cost
            </p>
            <p style="margin-top: 0">
              If shipped features improve revenue 10%, a 5% holdout loses 0.5%
              of total revenue (5% × 10%). For $100M annual revenue, thats
              $500K/year. This cost must be justified by the value of long-term
              measurement and catching cumulative harm that would cost more if
              undetected.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Holdout users see outdated
              experience. Over years, the gap widens dramatically. Ethics and
              user expectations may limit how long you can maintain holdouts
              without refresh.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Operational Complexity
            </p>
            <p style="margin-top: 0">
              Every feature must check holdout status and branch code paths.
              Support and ops must handle two product versions. Bug fixes must
              be applied to both paths. Testing must cover both paths. This
              complexity scales linearly with feature count and holdout
              duration.
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
                  5% holdout can detect 5% relative differences; 1% holdout
                  needs 10%+ differences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  If features improve revenue 10%, 5% holdout loses 0.5% of
                  total revenue as opportunity cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Holdout users see increasingly outdated experience over years;
                  ethics may limit duration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Every feature must branch on holdout status; complexity scales
                  with feature count
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
                  When calculating cost: 5% holdout × 10% improvement = 0.5%
                  revenue loss ($500K on $100M)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For power discussion: describe relationship between holdout
                  size, metric variance, and detectable effect size
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHoldoutGroupsTradeOffsStatisticalPowerOperationalComplexityAndCost;
