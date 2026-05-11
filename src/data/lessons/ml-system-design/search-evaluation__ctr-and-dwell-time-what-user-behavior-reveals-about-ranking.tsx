import type { Component } from "solid-js";

const LessonSearchEvaluationCtrAndDwellTimeWhatUserBehaviorRevealsAboutRanking: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            CTR and Dwell Time: What User Behavior Reveals About Ranking
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
                <strong>CTR</strong> and <strong>Dwell Time</strong> measure
                real user behavior, revealing what users actually do rather than
                what labels say they should do.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CTR: Clicks Divided by Impressions
            </p>
            <p style="margin-top: 0">
              CTR = clicks / impressions. If 1000 users see a result and 50
              click, CTR = 5%. A 5% to 5.25% lift (5% relative) is often
              significant. To detect this reliably, you need roughly 100,000
              impressions per experiment arm with 80% statistical power.
            </p>
            <p>
              CTR has a flaw: it measures attraction, not satisfaction.
              Clickbait gets high CTR but angry users. A sensationalized title
              might double CTR while halving retention. CTR alone cannot
              distinguish "users found what they wanted" from "users were
              tricked."
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dwell Time: Engagement After the Click
            </p>
            <p style="margin-top: 0">
              Dwell time measures how long users spend on the destination after
              clicking. Long dwell (2+ minutes) suggests content matched
              expectations. Short dwell (under 10 seconds) suggests
              disappointment. Combining CTR with dwell separates genuine
              relevance from clickbait.
            </p>
            <p>
              Measurement is tricky: you need to track when users navigate away,
              requiring JavaScript or detecting when they return to search. For
              external links, dwell measurement is approximate.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Using CTR and Dwell Together
            </p>
            <p style="margin-top: 0">
              <strong>High CTR, high dwell:</strong> Attracted and satisfied.
              The goal. <strong>High CTR, low dwell:</strong> Clickbait.{" "}
              <strong>Low CTR, high dwell:</strong> Hidden gem.{" "}
              <strong>Low CTR, low dwell:</strong> Irrelevant.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Optimizing CTR alone leads to
              clickbait. Optimizing dwell alone ignores discoverability. The
              combination reveals true quality.
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
                  CTR = clicks / impressions. A 5% relative lift is often
                  significant. Need ~100K impressions per arm.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CTR measures attraction, not satisfaction. Clickbait gets high
                  CTR but disappoints.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dwell time: long (2+ min) = satisfied, short (&lt;10 sec) =
                  disappointed.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combine CTR and dwell to separate genuine relevance from
                  clickbait.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High CTR + high dwell = goal. High CTR + low dwell =
                  clickbait.
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
                  Explain the CTR trap: optimizing alone leads to clickbait.
                  Pair with dwell.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use 2x2: high/low CTR × high/low dwell = goal/clickbait/hidden
                  gem/irrelevant.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sample size: ~100K impressions per arm to detect 5% relative
                  lift.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonSearchEvaluationCtrAndDwellTimeWhatUserBehaviorRevealsAboutRanking;
