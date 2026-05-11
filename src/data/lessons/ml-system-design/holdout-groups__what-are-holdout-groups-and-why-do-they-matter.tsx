import type { Component } from "solid-js";

const LessonHoldoutGroupsWhatAreHoldoutGroupsAndWhyDoTheyMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are Holdout Groups and Why Do They Matter?
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
                <strong>Holdout groups</strong> are a permanent subset of users
                (typically 1-10%) who never see new features, providing a
                baseline to measure cumulative long-term impact of all shipped
                changes.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Holdouts Matter
            </p>
            <p style="margin-top: 0">
              Individual A/B tests measure short-term effects. But many small
              changes compound over months. A feature that lifts engagement 1%
              might reduce retention 0.5% - invisible in a 2-week test,
              devastating over a year. Holdouts reveal this cumulative impact.
            </p>
            <p>
              Without holdouts, you cannot measure total improvement from all
              experiments. Each experiment compares against the current state,
              but the current state keeps changing. Holdouts freeze a baseline
              for long-term comparison.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Holdout Types
            </p>
            <p style="margin-top: 0">
              <strong>Universal holdout:</strong> excluded from ALL new
              features. Measures total experimentation value.{" "}
              <strong>Feature holdout:</strong> excluded from specific feature
              area (e.g., all recommendation changes). Measures area-specific
              value. <strong>Time-limited holdout:</strong> held for specific
              period (6-12 months), then refreshed.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Larger holdouts give more
              statistical power but sacrifice revenue/engagement from holding
              back improvements. 5% holdout is common balance.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Long-Term Measurement
            </p>
            <p style="margin-top: 0">
              Compare holdout to production on metrics like 90-day retention,
              lifetime value, annual revenue. These long-latency metrics are
              impossible to measure in standard 2-4 week experiments.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Standard A/B Test</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Duration: 1 to 3 weeks
                    <br />
                    Split: 50% Control / 50% Treatment
                    <br />
                    Detects: Immediate impact
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  vs
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Holdout Group</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Duration: 3+ months
                    <br />
                    Split: 1 to 10% Holdout / 90 to 99% Shipped
                    <br />
                    Detects: Long term impact, novelty decay
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; font-size: 12px">
                  <strong>Pinterest Example:</strong> 7% DAU lift → 2.5% at 6
                  months → 4% after new feature
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
                  Holdouts are permanent subset (1-10%) who never see new
                  features, providing baseline for cumulative impact
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Individual tests miss compounding effects: 1% engagement lift
                  with 0.5% retention drop is invisible short-term
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Universal holdout measures total experimentation value;
                  feature holdout measures specific area value
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  5% holdout balances statistical power against lost revenue
                  from withholding improvements
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
                  When explaining holdouts: describe measuring 90-day retention
                  and LTV impossible in 2-week experiments
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For holdout types: universal (all features), feature-specific
                  (one area), time-limited (6-12 months then refresh)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHoldoutGroupsWhatAreHoldoutGroupsAndWhyDoTheyMatter;
